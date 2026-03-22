# Java后端实习面试高频场景题

## 一、高并发场景

### 1.1 秒杀系统设计

**问题：** 设计一个秒杀系统，如何处理高并发、超卖、恶意请求等问题？

**考察点：** 高并发处理、分布式锁、缓存、限流

**详细解答：**

#### 1.1.1 系统架构设计
```
客户端 → CDN → 负载均衡 → 应用服务器 → 缓存 → 数据库
                    ↓
                消息队列
                    ↓
              订单处理服务
```

#### 1.1.2 关键技术点

**1. 前端优化：**
- 页面静态化，CDN缓存
- 验证码防止机器人
- 按钮置灰防止重复点击
- 请求排队提示

**2. 应用层优化：**
- 限流：令牌桶算法限制请求频率
- 缓存预热：提前加载商品信息到Redis
- 队列削峰：使用消息队列缓冲请求

**3. 数据层优化：**
- Redis原子操作扣减库存：`DECR stock_key`
- 异步写入数据库
- 库存分段减少热点

#### 1.1.3 核心代码实现
```java
// Redis扣减库存
public boolean deductStock(String productId) {
    String script = "if redis.call('exists', KEYS[1]) == 1 then " +
                   "if tonumber(redis.call('get', KEYS[1])) > 0 then " +
                   "return redis.call('decr', KEYS[1]) " +
                   "end " +
                   "end " +
                   "return -1";

    Long stock = redisTemplate.execute(
        new DefaultRedisScript<>(script, Long.class),
        Arrays.asList("stock:" + productId)
    );

    return stock != null && stock >= 0;
}

// 秒杀接口
@PostMapping("/seckill")
public Result seckill(@RequestParam String productId,
                     @RequestParam String userId) {
    // 1. 限流
    if (!rateLimiter.tryAcquire()) {
        return Result.fail("请求过于频繁");
    }

    // 2. 验证库存
    if (!deductStock(productId)) {
        return Result.fail("库存不足");
    }

    // 3. 发送消息到队列
    kafkaTemplate.send("seckill_topic",
        productId + ":" + userId);

    return Result.success("秒杀成功");
}
```

#### 1.1.4 防超卖方案
1. **Redis预减库存**：使用Lua脚本保证原子性
2. **数据库乐观锁**：`UPDATE stock SET count = count - 1 WHERE id = ? AND count > 0`
3. **分布式锁**：防止同一用户重复下单

---

### 1.2 高并发下单系统

**问题：** 如何设计一个支持高并发的下单系统？

**考察点：** 分布式事务、幂等性、性能优化

**详细解答：**

#### 1.2.1 系统挑战
- 库存扣减的原子性
- 订单创建的幂等性
- 支付状态的同步
- 高并发下的性能

#### 1.2.2 解决方案

**1. 分布式事务：**
```java
// 使用TCC模式
@Service
public class OrderService {
    @Transactional
    public Order createOrder(OrderRequest request) {
        // Try阶段：冻结库存
        inventoryService.freezeStock(request.getProductId(),
                                   request.getQuantity());

        // 创建订单
        Order order = createOrderInDB(request);

        // Confirm阶段：确认订单
        inventoryService.confirmStock(request.getProductId(),
                                    request.getQuantity());

        return order;
    }
}
```

**2. 幂等性保证：**
```java
// 使用唯一业务ID
public Order createOrder(String bizId, OrderRequest request) {
    // 检查是否已处理过
    if (orderMapper.existsByBizId(bizId)) {
        return orderMapper.findByBizId(bizId);
    }

    // 创建订单
    Order order = new Order();
    order.setBizId(bizId);
    // ... 设置其他字段

    orderMapper.insert(order);
    return order;
}
```

**3. 性能优化：**
- 读写分离：订单查询走从库
- 缓存：商品信息、用户信息缓存
- 异步：发送短信、邮件等异步处理

---

## 二、分布式系统场景

### 2.1 分布式ID生成

**问题：** 如何设计一个分布式ID生成器？

**考察点：** 分布式系统、ID生成算法、性能

**详细解答：**

#### 2.1.1 方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| UUID | 简单、唯一 | 无序、太长 | 小规模系统 |
| 数据库自增 | 简单、有序 | 单点故障、性能差 | 单数据库 |
| Redis自增 | 性能好 | 需要维护Redis | 中等规模 |
| 雪花算法 | 性能好、有序 | 时钟回拨问题 | 大规模分布式 |

#### 2.1.2 雪花算法实现
```java
public class SnowflakeIdGenerator {
    // 起始时间戳 (2020-01-01)
    private final static long START_TIMESTAMP = 1577808000000L;

    // 位数分配
    private final static long SEQUENCE_BITS = 12L;
    private final static long WORKER_ID_BITS = 10L;
    private final static long TIMESTAMP_BITS = 41L;

    // 最大值
    private final static long MAX_SEQUENCE = ~(-1L << SEQUENCE_BITS);
    private final static long MAX_WORKER_ID = ~(-1L << WORKER_ID_BITS);

    // 位移
    private final static long WORKER_ID_SHIFT = SEQUENCE_BITS;
    private final static long TIMESTAMP_SHIFT = SEQUENCE_BITS + WORKER_ID_BITS;

    private long workerId;
    private long sequence = 0L;
    private long lastTimestamp = -1L;

    public synchronized long nextId() {
        long timestamp = timeGen();

        // 时钟回拨处理
        if (timestamp < lastTimestamp) {
            throw new RuntimeException("时钟回拨异常");
        }

        // 同一毫秒内生成
        if (timestamp == lastTimestamp) {
            sequence = (sequence + 1) & MAX_SEQUENCE;
            if (sequence == 0L) {
                // 等待下一毫秒
                timestamp = tilNextMillis(lastTimestamp);
            }
        } else {
            sequence = 0L;
        }

        lastTimestamp = timestamp;

        return ((timestamp - START_TIMESTAMP) << TIMESTAMP_SHIFT) |
               (workerId << WORKER_ID_SHIFT) |
               sequence;
    }

    private long tilNextMillis(long lastTimestamp) {
        long timestamp = timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = timeGen();
        }
        return timestamp;
    }

    private long timeGen() {
        return System.currentTimeMillis();
    }
}
```

#### 2.1.3 时钟回拨解决方案
1. **等待**：如果回拨时间很短，可以等待时钟追上
2. **报警**：通知运维人员处理
3. **备用方案**：切换到其他ID生成方式

---

### 2.2 分布式锁实现

**问题：** 如何实现一个可靠的分布式锁？

**考察点：** 分布式系统、锁机制、Redis、Zookeeper

**详细解答：**

#### 2.2.1 Redis分布式锁
```java
public class RedisDistributedLock {
    private final StringRedisTemplate redisTemplate;
    private final ThreadLocal<String> lockThread = new ThreadLocal<>();

    // 获取锁
    public boolean tryLock(String key, long expireTime, long timeout) {
        String value = UUID.randomUUID().toString();
        long startTime = System.currentTimeMillis();

        while (System.currentTimeMillis() - startTime < timeout) {
            // SET key value EX expireTime NX
            Boolean success = redisTemplate.opsForValue()
                .setIfAbsent(key, value, Duration.ofMillis(expireTime));

            if (success != null && success) {
                lockThread.set(value);
                return true;
            }

            try {
                Thread.sleep(100); // 短暂等待
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return false;
            }
        }
        return false;
    }

    // 释放锁
    public boolean unlock(String key) {
        String value = lockThread.get();
        if (value == null) return false;

        // 使用Lua脚本保证原子性
        String script = "if redis.call('get', KEYS[1]) == ARGV[1] " +
                       "then return redis.call('del', KEYS[1]) " +
                       "else return 0 end";

        Long result = redisTemplate.execute(
            new DefaultRedisScript<>(script, Long.class),
            Collections.singletonList(key),
            value
        );

        if (result != null && result > 0) {
            lockThread.remove();
            return true;
        }
        return false;
    }
}
```

#### 2.2.2 Redisson实现
```java
// 使用Redisson客户端
public void redissonLockExample() {
    RLock lock = redissonClient.getLock("myLock");
    try {
        // 尝试获取锁，等待10秒，锁自动释放时间30秒
        boolean res = lock.tryLock(10, 30, TimeUnit.SECONDS);
        if (res) {
            // 执行业务逻辑
            doSomething();
        }
    } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
    } finally {
        if (lock.isHeldByCurrentThread()) {
            lock.unlock();
        }
    }
}
```

#### 2.2.3 注意事项
1. **锁的过期时间**：避免死锁
2. **锁的续期**：长时间任务需要续期
3. **锁的可重入**：同一线程可以重复获取
4. **锁的公平性**：避免饥饿

---

## 三、缓存场景

### 3.1 缓存穿透、击穿、雪崩

**问题：** 如何解决缓存穿透、击穿、雪崩问题？

**考察点：** 缓存设计、异常处理、系统稳定性

**详细解答：**

#### 3.1.1 缓存穿透
**问题：** 查询不存在的数据，导致请求直接打到数据库

**解决方案：**
```java
public Object getData(String key) {
    // 1. 查询缓存
    Object cacheValue = redisTemplate.opsForValue().get(key);
    if (cacheValue != null) {
        // 空值缓存，防止穿透
        if (NULL_VALUE.equals(cacheValue)) {
            return null;
        }
        return cacheValue;
    }

    // 2. 布隆过滤器拦截
    if (!bloomFilter.mightContain(key)) {
        return null;
    }

    // 3. 查询数据库
    Object dbValue = database.query(key);
    if (dbValue == null) {
        // 缓存空值，有效期较短
        redisTemplate.opsForValue()
            .set(key, NULL_VALUE, Duration.ofMinutes(5));
        return null;
    }

    // 4. 写入缓存
    redisTemplate.opsForValue()
        .set(key, dbValue, Duration.ofHours(1));

    return dbValue;
}
```

#### 3.1.2 缓存击穿
**问题：** 热点数据过期，大量请求同时打到数据库

**解决方案：**
```java
public Object getHotData(String key) {
    Object value = redisTemplate.opsForValue().get(key);
    if (value != null) {
        return value;
    }

    // 使用分布式锁
    RLock lock = redissonClient.getLock("lock:" + key);
    try {
        if (lock.tryLock(5, TimeUnit.SECONDS)) {
            // 双重检查
            value = redisTemplate.opsForValue().get(key);
            if (value != null) {
                return value;
            }

            // 查询数据库
            value = database.query(key);

            // 设置较长的过期时间
            redisTemplate.opsForValue()
                .set(key, value, Duration.ofHours(1));

            return value;
        } else {
            // 等待其他线程加载完成
            Thread.sleep(100);
            return getHotData(key);
        }
    } catch (Exception e) {
        throw new RuntimeException(e);
    } finally {
        if (lock.isHeldByCurrentThread()) {
            lock.unlock();
        }
    }
}
```

#### 3.1.3 缓存雪崩
**问题：** 大量缓存同时过期，数据库压力骤增

**解决方案：**
1. **随机过期时间**：在基础过期时间上添加随机值
2. **永不过期**：热点数据不过期，异步更新
3. **多级缓存**：本地缓存 + 分布式缓存

```java
// 随机过期时间
public void setWithRandomExpire(String key, Object value) {
    // 基础1小时 + 随机0-30分钟
    long expireTime = 3600 + new Random().nextInt(1800);
    redisTemplate.opsForValue()
        .set(key, value, Duration.ofSeconds(expireTime));
}
```

---

## 四、数据库场景

### 4.1 分库分表实践

**问题：** 如何设计分库分表方案？

**考察点：** 数据库设计、数据迁移、查询优化

**详细解答：**

#### 4.1.1 分片策略

**1. 水平分片：**
- **范围分片**：按ID范围、时间范围
- **哈希分片**：按ID哈希值
- **地理分片**：按地理位置

**2. 垂直分片：**
- **按业务拆分**：用户库、订单库、商品库
- **按字段拆分**：大字段单独存储

#### 4.1.2 分片键选择
```java
// 用户ID分片
public class UserIdShardingAlgorithm implements PreciseShardingAlgorithm<Long> {
    @Override
    public String doSharding(Collection<String> availableTargetNames,
                           PreciseShardingValue<Long> shardingValue) {
        Long userId = shardingValue.getValue();
        String suffix = String.valueOf(userId % 4); // 4个库
        for (String tableName : availableTargetNames) {
            if (tableName.endsWith(suffix)) {
                return tableName;
            }
        }
        throw new IllegalArgumentException("No table found");
    }
}
```

#### 4.1.3 跨分片查询
1. **全局表**：所有分片都有的公共表
2. **ER表**：关联表使用相同分片规则
3. **中间件**：使用ShardingSphere、MyCat等

---

## 五、消息队列场景

### 5.1 消息可靠性保证

**问题：** 如何保证消息的可靠传输？

**考察点：** 消息队列、可靠性、幂等性

**详细解答：**

#### 5.1.1 生产者可靠性
```java
// RocketMQ事务消息
@Service
public class TransactionProducer {
    @Autowired
    private TransactionMQProducer producer;

    public void sendTransactionalMessage(String topic, String tag,
                                        Object message) {
        Message msg = new Message(topic, tag,
                                JSON.toJSONBytes(message));

        producer.sendMessageInTransaction(msg, new TransactionListener() {
            @Override
            public LocalTransactionState executeLocalTransaction(Message msg,
                                                               Object arg) {
                try {
                    // 执行本地事务
                    doLocalTransaction(msg);
                    return LocalTransactionState.COMMIT_MESSAGE;
                } catch (Exception e) {
                    return LocalTransactionState.ROLLBACK_MESSAGE;
                }
            }

            @Override
            public LocalTransactionState checkLocalTransaction(Message msg) {
                // 检查本地事务状态
                return checkTransactionState(msg);
            }
        });
    }
}
```

#### 5.1.2 消费者可靠性
```java
// 手动确认模式
@RabbitListener(queues = "order.queue")
public void processMessage(Message message, Channel channel) {
    try {
        // 1. 幂等性检查
        if (isDuplicate(message.getMessageId())) {
            channel.basicAck(message.getMessageId(), false);
            return;
        }

        // 2. 执行业务逻辑
        processOrder(message);

        // 3. 记录处理日志
        saveProcessLog(message.getMessageId());

        // 4. 手动确认
        channel.basicAck(message.getMessageId(), false);

    } catch (Exception e) {
        // 5. 异常处理
        if (message.getRedeliveryCount() < 3) {
            // 重试
            channel.basicNack(message.getMessageId(), false, true);
        } else {
            // 进入死信队列
            channel.basicNack(message.getMessageId(), false, false);
        }
    }
}
```

#### 5.1.3 幂等性保证
1. **唯一ID**：每条消息有唯一ID
2. **处理日志**：记录已处理的消息ID
3. **业务幂等**：业务逻辑支持重复执行

---

## 六、系统设计场景

### 6.1 短网址系统设计

**问题：** 设计一个短网址系统，支持高并发访问

**考察点：** 系统设计、算法设计、性能优化

**详细解答：**

#### 6.1.1 系统需求
- 长URL转短URL
- 短URL重定向到长URL
- 访问统计
- 高并发支持

#### 6.1.2 核心算法
```java
public class ShortUrlGenerator {
    private static final String BASE62 =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    private static final int BASE = 62;

    // ID转Base62
    public String idToShortUrl(long id) {
        StringBuilder sb = new StringBuilder();
        while (id > 0) {
            sb.append(BASE62.charAt((int)(id % BASE)));
            id /= BASE;
        }
        return sb.reverse().toString();
    }

    // Base62转ID
    public long shortUrlToId(String shortUrl) {
        long id = 0;
        for (char c : shortUrl.toCharArray()) {
            if ('a' <= c && c <= 'z') {
                id = id * BASE + c - 'a';
            } else if ('A' <= c && c <= 'Z') {
                id = id * BASE + c - 'A' + 26;
            } else if ('0' <= c && c <= '9') {
                id = id * BASE + c - '0' + 52;
            }
        }
        return id;
    }
}
```

#### 6.1.3 系统架构
```
客户端 → CDN → 负载均衡 → 应用服务器 → Redis → 数据库
                                    ↓
                                统计服务
```

#### 6.1.4 性能优化
1. **CDN缓存**：短URL页面缓存
2. **Redis缓存**：热点URL映射
3. **异步统计**：访问数据异步处理
4. **数据库优化**：读写分离、索引优化

---

### 6.2 实时排行榜系统

**问题：** 设计一个实时排行榜系统

**考察点：** 实时计算、数据结构、性能优化

**详细解答：**

#### 6.2.1 数据结构设计
```java
// 使用Redis ZSet
public class RankingSystem {
    private final RedisTemplate<String, Object> redisTemplate;

    // 更新分数
    public void updateScore(String userId, double score) {
        redisTemplate.opsForZSet()
            .add("ranking:score", userId, score);
    }

    // 获取排行榜
    public List<RankingItem> getRanking(int topN) {
        Set<ZSetOperations.TypedTuple<Object>> tuples =
            redisTemplate.opsForZSet()
                .reverseRangeWithScores("ranking:score", 0, topN - 1);

        List<RankingItem> result = new ArrayList<>();
        int rank = 1;
        for (ZSetOperations.TypedTuple<Object> tuple : tuples) {
            result.add(new RankingItem(
                rank++,
                tuple.getValue().toString(),
                tuple.getScore()
            ));
        }
        return result;
    }

    // 获取用户排名
    public Long getUserRank(String userId) {
        Long rank = redisTemplate.opsForZSet()
            .reverseRank("ranking:score", userId);
        return rank != null ? rank + 1 : null;
    }
}
```

#### 6.2.2 大数据量处理
1. **分片存储**：按分数段分片
2. **定时持久化**：定期写入数据库
3. **冷热分离**：活跃用户和冷用户分开存储

#### 6.2.3 实时性保证
1. **内存计算**：Redis内存操作
2. **增量更新**：只更新变化的部分
3. **多级缓存**：本地缓存 + Redis

---

## 总结

### 高频场景题特点：
1. **结合实际**：基于真实业务场景
2. **考察全面**：涉及多个技术点
3. **注重实践**：要求具体实现方案
4. **关注细节**：异常处理和边界情况

### 准备建议：
1. **理解原理**：不只是记住答案，要理解背后的原理
2. **动手实践**：自己实现相关功能
3. **思考扩展**：考虑各种边界情况和异常处理
4. **关注性能**：时间复杂度、空间复杂度分析

### 常见考察方向：
- **高并发**：秒杀、抢购、限时活动
- **分布式**：ID生成、分布式锁、分布式事务
- **缓存**：穿透、击穿、雪崩解决方案
- **数据库**：分库分表、索引优化、SQL调优
- **消息队列**：可靠性、顺序性、重复消费
- **系统设计**：短网址、排行榜、聊天系统
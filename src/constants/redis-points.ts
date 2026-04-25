// Redis 面试题
import { InterviewPoint } from './command-types';

export const REDIS_POINTS: InterviewPoint[] = [
  {
   id: 'redis-1',
   question: 'Redis 为什么这么快？',
    answer: '【六大核心因素】\n\n1. 完全基于内存操作\n   - 数据存储在内存中，读写速度达到纳秒级\n   - 避免了磁盘 I/O 的机械延迟（毫秒级）\n   - 使用简单动态字符串（SDS）、哈希表等高效数据结构\n\n2. 单线程模型（核心处理）\n   - 网络 I/O 使用多路复用（epoll/kqueue），但命令执行是单线程\n   - 避免了多线程上下文切换开销（约几微秒到几十微秒）\n   - 无需考虑锁竞争问题，简化了实现\n   - 瓶颈：CPU 和网络带宽，而非锁竞争\n\n3. 非阻塞 I/O 多路复用机制\n   - epoll（Linux）/kqueue（BSD）/select（兼容）\n   - 单个线程管理多个 socket 连接\n   - 事件驱动：可读/可写事件触发回调\n   - 高并发下性能优异（万级连接）\n\n4. 高效的数据结构\n   - SDS：O(1) 获取长度、二进制安全、防缓冲区溢出\n   - 跳表（SkipList）：范围查询 O(logN)\n   - 压缩列表（ZipList）：节省内存\n   - 快速列表（QuickList）：结合链表和 ZipList\n\n5. 合理的系统优化\n   - 关闭 swap：vm.swappiness=0\n   - 开启 THP（透明大页）：提升内存访问效率\n   - 绑核：taskset 绑定 CPU 核心，减少缓存失效\n\n6. 持久化优化\n   - RDB：fork 子进程，Copy-on-Write\n   - AOF：后台线程异步刷盘（fsync every second）',
    analogy: 'Redis 就像一个手速极快的单身柜员，他只处理内存里的简单表格，而且不需要跟同事抢笔（锁），所以处理速度惊人。',
    importance: 'high'
  },
  {
   id: 'redis-2',
   question: 'Redis 的持久化机制有哪些？',
    answer: '1. RDB（快照）：定时将内存数据保存到磁盘，恢复快但可能丢失最后一次快照后的数据。2. AOF（追加日志）：记录每个写操作，数据安全性高但文件大、恢复慢。通常建议两者结合使用。',
    analogy: 'RDB 就像每天存一次游戏存档；AOF 就像录制你的整个游戏操作过程。存档恢复快 but 会掉进度，录像恢复慢 but 能还原所有操作。',
    importance: 'high'
  },
  {
   id: 'redis-3',
   question: '什么是缓存雪崩、缓存击穿、缓存穿透？',
    answer: '【缓存雪崩（Cache Avalanche）】\n- 定义：大量缓存在同一时间过期，或 Redis 宕机，导致请求全部涌向数据库\n- 危害：数据库压力骤增，可能宕机\n- 解决方案：\n  1. 随机过期时间：在原有 TTL 基础上加随机值（如 1-5 分钟）\n  2. 热点数据永不过期：后台定时更新\n  3. 多级缓存：本地缓存（Caffeine）+ Redis\n  4. 限流降级：Sentinel/Hystrix 保护数据库\n  5. 高可用架构：Redis Cluster/Sentinel\n\n【缓存击穿（Cache Breakdown）】\n- 定义：某个热点 Key 过期，瞬间大量请求击垮数据库\n- 特征：单个 Key 高并发（如明星八卦、秒杀商品）\n- 解决方案：\n  1. 互斥锁（Mutex）：查询数据库前加分布式锁（SETNX）\n  2. 逻辑过期：不设置 TTL，后台异步更新\n  3. 布隆过滤器预判：提前拦截不存在 Key\n\n【缓存穿透（Cache Penetration）】\n- 定义：请求的数据在缓存和数据库中都不存在，导致每次都查库\n- 危害：恶意攻击者利用此漏洞压垮数据库\n- 解决方案：\n  1. 缓存空值：查询为空也缓存（TTL 较短，如 5 分钟）\n  2. 布隆过滤器（Bloom Filter）：拦截不存在的 Key\n     - 原理：Hash 函数 + BitMap，误判率低\n     - 缺点：不支持删除（可用 Counting Bloom Filter）\n  3. 参数校验：ID<=0 直接拦截\n\n【区别总结】\n- 雪崩：大面积过期（批量）\n- 击穿：热点 Key 过期（单点）\n- 穿透：数据根本不存在（伪造）',
    analogy: '雪崩：超市所有收银员同时下班，顾客全堵了；击穿：某个热点 Key 过期，瞬间大量请求击垮数据库；穿透：有人去超市买原子弹，收银员查不到，经理也查不到。',
    importance: 'high'
  },
  {
   id: 'redis-4',
   question: 'Redis 的过期策略 and 淘汰机制是什么？',
    answer: '过期策略：定期删除 + 惰性删除。淘汰机制：当内存不足时，根据配置（如 allkeys-lru, volatile-lru 等）删除数据。LRU 是最近最少使用，LFU 是最不经常使用。',
    analogy: '过期策略：保质期到了，超市员工定期巡检扔掉，或者顾客买的时候发现过期再扔。淘汰机制：超市货架满了，要把最久没人买的东西撤下来给新品腾位置。',
    importance: 'high'
  },
  {
   id: 'redis-5',
   question: 'Redis 分布式锁是如何实现的？',
    answer: '【基础实现】\n\n1. SETNX 方案\n   - 命令：SETNX lock_key unique_value\n   - 问题：忘记设置过期时间会死锁\n   - 改进：SET key value NX EX seconds（原子操作）\n\n2. 标准实现（推荐）\n   ```\n   SET lock_key unique_value NX EX 30\n   ```\n   - NX：Not Exists，不存在时才设置\n   - EX：过期时间（秒）\n   - unique_value：UUID+ 线程 ID，释放时验证\n\n【释放锁的正确姿势】\n- 问题：直接 DEL 可能误删别人的锁（锁过期后被别人获取）\n- 解决：Lua 脚本保证原子性\n   ```lua\n   if redis.call("get", KEYS[1]) == ARGV[1] then\n       return redis.call("del", KEYS[1])\n   else\n       return 0\n   end\n   ```\n\n【进阶问题及解决】\n\n1. 锁过期但业务未完成\n   - 现象：锁自动释放，其他线程获取锁导致并发问题\n   - 解决：看门狗机制（WatchDog）\n     - Redisson 实现：后台线程每 10 秒续期（expire）\n     - 前提：必须指定 leaseTime，否则不续期\n\n2. 主从切换导致锁丢失\n   - 现象：Master 获取锁后未同步到 Slave 就宕机\n   - 解决：Redlock 算法（多节点分布式锁）\n     - 向 N/2+1 个节点申请锁\n     - 总耗时 < 锁有效期\n     - 所有锁剩余时间 > 业务执行时间\n\n【Redisson 实现】\n- 可重入：Hash 存储线程标识 + 重入次数\n- 自动续期：WatchDog 每 10 秒 expire 30 秒\n- 公平锁：先入队列优先获取\n- 联锁（MultiLock）：同时获取多个锁',
    analogy: '分布式锁就像公共厕所的门锁。谁先抢到谁进去（SETNX），进去后自动上锁并设置一个时间（防止人在里面晕倒出不来），出来时把锁打开。',
    importance: 'high'
  },
  {
   id: 'redis-6',
   question: 'Redis 的主从复制原理？',
    answer: '【主从复制作用】\n1. 数据冗余：Master 数据同步到 Slave\n2. 故障恢复：Master 宕机后 Slave 可接管\n3. 读写分离：Master 写，Slave 读\n4. 高可用基础：哨兵和集群的基础\n\n【复制流程】\n\n1. 全量复制（初次连接）\n   - Slave 发送 SYNC 命令\n   - Master 执行 bgsave 生成 RDB\n   - Master 将 RDB 发送给 Slave\n   - Slave 加载 RDB\n   - Master 将缓冲区的写命令发送给 Slave\n\n2. 增量复制（断线重连）\n   - Slave 发送 PSYNC offset\n   - Master 判断 offset 是否在复制缓冲区\n   - 若在则只发送缺失的命令（部分复制）\n   - 若否则重新全量复制\n\n【关键机制】\n1. 心跳检测：每秒发送 PING 检测连接\n2. 复制偏移量：记录已同步的位置\n3. 复制积压缓冲区：默认 1MB，存储最近写命令\n4. 无锁复制：Master 复制过程不阻塞\n\n【延迟问题】\n- 网络延迟：同城部署\n- 主库压力：避免在大 Key 操作时复制\n- 异步复制：可能丢失数据',
    analogy: '主从复制就像老师讲课，学生记笔记。全量同步是老师给学生一份完整的讲义；增量同步是老师讲一句，学生记一句。',
    importance: 'medium'
  },
  {
   id: 'redis-7',
   question: '什么是 Redis 哨兵（Sentinel）模式？',
    answer: '【哨兵作用】\nRedis 高可用方案，负责监控、选主、通知。\n\n【核心功能】\n\n1. 监控（Monitoring）\n   - 检查 Master 和 Slave 是否正常运行\n   - 通过发送 PING 命令判断健康状态\n\n2. 自动故障转移（Failover）\n   触发条件：Master 主观下线 -> 客观下线\n   流程：\n   - 哨兵选举出领导者\n   - 领导者选择最优 Slave（优先级高、复制进度新）\n   - 发送 SLAVEOF NO ONE 提升为 Master\n   - 通知其他 Slave 更新配置\n   - 客户端收到消息更新连接\n\n3. 配置中心\n   - 服务发现：客户端查询当前 Master 地址\n   - 故障通知：推送新的 Master 信息\n\n【部署建议】\n1. 哨兵节点数：奇数（3 或 5），避免脑裂\n2. 跨机房部署：提高容灾能力\n3. 法定人数（quorum）：判定下线的最少哨兵数\n4. 异步复制：可能丢失数据（至少 1 秒）\n\n【局限性】\n- 写性能受限：单 Master 架构\n- 容量受限：受单机内存限制\n- 需要配合主从使用',
    analogy: '哨兵就像监控摄像头和值班保安。一旦发现老板（Master）不在了，保安立刻从员工里挑个当代理老板。',
    importance: 'high'
  },
  {
   id: 'redis-8',
   question: 'Redis Cluster（集群）的原理？',
    answer: '【集群架构】\n去中心化的多节点架构，支持水平扩展。\n\n【数据分片】\n\n1. 哈希槽（Hash Slot）\n   - 总共 16384 个槽\n   - 计算公式：CRC16(key) % 16384\n   - 每个节点负责一部分槽（如 0-5000）\n\n2. 节点分配\n   - Master 节点：处理读写、故障转移\n   - Slave 节点：备份、故障时接替 Master\n   - 建议配置：3 主 3 从（最小高可用）\n\n【通信机制】\n\n1. Gossip 协议\n   - 节点间定期交换信息\n   - 传播内容：节点状态、槽位信息\n   - 特点：最终一致性，避免单点故障\n\n2. 总线机制\n   - 专用通信端口（业务端口 +10000）\n   - 传输故障检测、配置更新等消息\n\n【客户端路由】\n1. 智能客户端：缓存槽位映射\n2. 重定向：MOVED（永久）、ASK（临时）\n3. 批量操作：同一 slot 的 key 才能批量\n\n【扩容缩容】\n- 重新分配槽位\n- 迁移数据（在线进行）\n- 不影响服务\n\n【与哨兵对比】\n- 哨兵：主从 + 自动故障转移\n- 集群：分布式 + 水平扩展',
    analogy: '集群就像连锁超市。每个分店负责一个片区的配送。你根据你的住址（Key）去对应的分店买东西。',
    importance: 'high'
  },
  {
   id: 'redis-9',
   question: 'Redis 常见的数据结构有哪些？',
    answer: '1. String：基础字符串。2. List：双向链表。3. Hash：哈希表。4. Set：无序集合。5. ZSet：有序集合（跳表实现）。',
    analogy: 'String 是便利贴；List 是排队队列；Hash 是个人信息卡；Set 是朋友圈点赞名单；ZSet 是游戏排行榜。',
    importance: 'high'
  },
  {
   id: 'redis-10',
   question: 'Redis 如何实现消息队列？',
    answer: '1. 使用 List 的 `LPUSH` 和 `BRPOP`。2. 使用 Pub/Sub（发布订阅）模式。3. 使用 Stream（Redis 5.0+ 引入，支持持久化和消费组）。',
    analogy: 'List 就像传达室的信箱；Pub/Sub 就像广播电台；Stream 就像顺丰快递，有单号、能追踪、能签收。',
    importance: 'medium'
  },
  {
   id: 'redis-11',
   question: 'Redis 底层数据结构有哪些？',
    answer: '1. SDS（简单动态字符串）：用于 String。2. LinkedList/Quicklist：用于 List。3. Dict（哈希表）：用于 Hash。4. SkipList（跳表）：用于 ZSet。5. Intset：整数集合。6. ZipList：压缩列表（节省内存）。',
    analogy: 'SDS 像【可伸缩的绳子】；LinkedList 像【串珠子】；Dict 像【字典目录】；SkipList 像【多层立交桥】（层数越高跳过越多节点）；Intset 像【专门装整数的盒子】；ZipList 像【压缩饼干】（省空间但访问慢）。',
    importance: 'high'
  },
  {
   id: 'redis-12',
   question: 'Redis 为什么使用跳表而不是红黑树？',
    answer: '1. 实现简单，性能与平衡树相当。2. 范围查询效率高（O(logN + M)）。3. 并发环境下更容易实现。4. 代码更简洁，bug 更少。',
    analogy: '跳表像【地铁换乘】：虽然站点多，但你可以坐快车（高层指针）跳过很多站；红黑树像【迷宫】，虽然理论上快，但实际找路复杂。',
    importance: 'high'
  },
  {
   id: 'redis-13',
   question: 'Redis 集群（Cluster）的数据分片原理？',
    answer: '采用哈希槽（Hash Slot）机制，共 16384 个槽。Key 通过 CRC16(key) % 16384 计算槽位。每个节点负责一部分槽。支持主从复制和高可用。',
    analogy: '就像【快递分拣中心】：总共 16384 个格子，根据地址（Key）算出放哪个格子，每个快递员（节点）负责一片区域的格子。',
    importance: 'high'
  },
  {
   id: 'redis-14',
   question: 'Redis 如何处理大 Key 和热 Key？',
    answer: '大 Key（BigKey）：指 value 很大的键。处理：拆分、异步删除、使用合适数据结构。热 Key（HotKey）：访问频率极高的键。处理：本地缓存、多副本、读写分离、限流。',
    analogy: '大 Key 像【超大包裹】：得拆成几个小包裹（拆分），或者用专用车辆运输（异步删除）。热 Key 像【网红商品】：得多开几个窗口卖（多副本），或者限购（限流）。',
    importance: 'high'
  },
  {
   id: 'redis-15',
   question: 'Redis 的内存淘汰策略有哪些？',
    answer: '1. noeviction：不淘汰，写操作报错。2. allkeys-lru：所有 key 用 LRU。3. volatile-lru：仅过期 key 用 LRU。4. allkeys-random：随机淘汰。5. volatile-ttl：按 TTL 淘汰。',
    analogy: '就像【清理衣柜】：noeviction 是【塞不下了就不买了】；allkeys-lru 是【把最久没穿的衣服扔掉】；volatile-lru 是【只扔换季衣服】；random 是【闭眼随便扔】。',
    importance: 'high'
  },
  {
   id: 'redis-16',
   question: 'Redis 事务（MULTI/EXEC）的特点？',
    answer: '1. 不保证原子性：中间命令失败不影响其他命令。2. 不支持回滚。3. 命令批量执行，减少网络开销。4. 执行期间其他客户端不会插入命令。',
    analogy: 'Redis 事务像【自助餐】：你拿了一堆菜（MULTI），最后一起结账（EXEC）。如果某个菜没了（失败），不影响其他菜，也不会退钱（不回滚）。',
    importance: 'medium'
  },
  {
   id: 'redis-17',
   question: 'Redis 性能瓶颈主要在哪里？如何优化？',
    answer: '瓶颈：1. 网络 I/O。2. 内存容量。3. 单线程 CPU。优化：1. 使用 pipeline 批量操作。2. 避免 BigKey。3. 合理设置过期时间。4. 使用连接池。5. 禁用危险命令（如 KEYS）。6. 持久化策略调优。',
    analogy: '优化 Redis 像【提升咖啡店效率】：pipeline 是【一次性能做多杯】；避免 BigKey 是【不接超大订单】；连接池是【养几个熟客专属座位】；禁用 KEYS 是【不许顾客翻遍整个咖啡豆仓库】。',
    importance: 'high'
  },
  {
   id: 'redis-18',
   question: '什么是缓存预热和缓存降级？',
    answer: '缓存预热：系统上线前预先加载热点数据到缓存。缓存降级：当缓存服务故障时，直接查数据库或返回默认值，保证核心功能可用。',
    analogy: '缓存预热像【开业前进货】：店还没开，先把热门商品摆上货架。缓存降级像【收银系统坏了】：先用手记账，等系统恢复后再录入。',
    importance: 'medium'
  },
  {
   id: 'redis-19',
   question: 'Redis 和 Memcached 的区别？',
    answer: '1. 数据类型：Redis 支持多种，Memcached 只支持 string。2. 持久化：Redis 支持，Memcached 不支持。3. 分布式：Memcached 需客户端实现，Redis 原生支持。4. 内存管理：Redis 更灵活。',
    analogy: 'Redis 像【瑞士军刀】，功能全面；Memcached 像【水果刀】，专注切东西（缓存）这一件事，简单高效。',
    importance: 'medium'
  }
,
  {
   id: 'redis-20',
   question: 'Redis 和数据库如何保持一致性？',
   answer: '这题面试里最常见的回答是 Cache Aside 模式。\n\n常见流程：\n- 读：先查缓存，缓存没有再查数据库并回填缓存\n- 写：先更新数据库，再删除缓存\n\n为什么通常是“更新数据库 + 删除缓存”：\n- 因为直接更新缓存更容易把复杂逻辑写乱\n- 删除缓存让下次读请求自然回源重建\n\n常见问题：\n1. 删除缓存后并发读导致旧值回填\n2. 数据库成功了但删缓存失败\n3. 主从延迟导致读到旧值\n\n常见优化：\n- 延迟双删\n- MQ 异步重删\n- 热点数据短 TTL + 主动刷新\n- 对关键场景引入订阅 binlog 做缓存订正\n\n面试落点：\n- 不要说“绝对强一致”，大多数缓存系统追求的是高概率一致和最终一致。',
   analogy: '缓存和数据库一致性像公告栏和正式档案，正式档案先改，公告栏旧了就撕掉，让下一个人重新按档案贴新公告。',
   importance: 'high'
  },
  {
   id: 'redis-21',
   question: 'Redis 的 ZSet 和 Hash 分别适合什么场景？',
   answer: 'Hash 适合存一个对象的多个字段，例如用户资料、商品属性、购物车条目。\n\n优点：\n- 字段级读写方便\n- 比直接存整段 JSON 更利于局部更新\n\nZSet 适合“既要去重，又要按分数排序”的场景，例如：\n- 排行榜\n- 延时任务\n- 热搜权重排序\n- 最近活跃用户列表\n\n面试回答时可以总结为：\n- Hash 解决“对象字段组织”\n- ZSet 解决“排序 + 范围查询”',
   analogy: 'Hash 像一张用户信息卡，ZSet 像会自动排好名次的排行榜。',
   importance: 'medium'
  },
  {
   id: 'redis-22',
   question: 'Redisson 的 RLock、看门狗、RRateLimiter 分别解决什么问题？',
   answer: 'Redisson 是基于 Redis 做的一套高级分布式工具封装。\n\n1. RLock\n- 对 Redis 分布式锁做了对象化封装\n- 支持可重入、自动续期、阻塞等待等能力\n\n2. 看门狗（Watch Dog）\n- 解决“业务没执行完，锁先过期”的问题\n- Redisson 默认会在锁未主动释放时自动续期\n- 这样长任务执行过程中锁不会轻易失效\n\n3. RRateLimiter\n- 用来做分布式限流\n- 适合接口防刷、活动限流、用户级配额控制\n\n面试里可以再补一句：\n- 用原生 Redis 也能自己拼这些能力\n- 但 Redisson 把常见边界问题已经封装好了，工程里更省心。',
   analogy: 'RLock 像智能门锁，看门狗像自动续电系统，RRateLimiter 像门口的闸机限流器。',
   importance: 'high'
  }
];

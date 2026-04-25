// 系统设计面试题
import { InterviewPoint } from './command-types';

export const DESIGN_POINTS: InterviewPoint[] = [
  {
   id: 'design-1',
   question: '如何设计一个秒杀系统？',
    answer: '【秒杀系统特点】\n- 瞬时高并发：开售瞬间 QPS 可达 10 万+\n- 库存极少：热门商品可能只有几百个\n- 读写比极高：99% 读（查询）vs 1% 写（下单）\n- 防作弊：黄牛刷单、脚本抢购\n\n【分层过滤架构】（从上到下逐层拦截）\n\n1. 客户端层\n   - 按钮置灰：点击后禁用，防止重复提交\n   - 验证码：滑块、图形验证，增加机器成本\n   - 静态资源 CDN：HTML/CSS/JS 缓存在 CDN\n\n2. 网关层（Nginx/OpenResty）\n   - IP 限流：单个 IP 每秒只允许 N 次请求\n   - 黑名单：识别恶意 IP 直接拒绝\n   - URL 限流：限制秒杀接口访问频率\n   - 令牌桶算法：控制总体流量\n\n3. 服务层\n   - 缓存预热：提前将库存加载到 Redis\n   - 库存预扣：Lua 脚本原子减库存\n     ```lua\n     local stock = tonumber(redis.call("get", KEYS[1]))\n     if stock and stock > 0 then\n         return redis.call("decr", KEYS[1])\n     else\n         return -1\n     end\n     ```\n   - 熔断降级：库存为 0 后直接返回，不再查库\n\n4. 消息队列层\n   - 异步下单：扣减成功后发 MQ，后台创建订单\n   - 削峰填谷：按数据库处理能力消费\n   - 超时关单：延迟队列处理未支付订单\n\n5. 数据库层\n   - 乐观锁扣库存：UPDATE stock SET num=num-1 WHERE id=? AND num>0\n   - 分库分表：订单表按用户 ID 分片\n   - 读写分离：主库写，从库查\n\n【防刷单策略】\n- 实名认证：绑定手机号、身份证\n- 风控系统：识别异常行为（频繁请求、同一收货地址）\n- 设备指纹：识别同一设备\n- 限购规则：每人限购 N 件\n\n【兜底方案】\n- 排队页面：显示"前方还有 XXX 人"\n- 降级页面：活动太火爆，稍后再试\n- 监控告警：实时监控系统负载',
    analogy: '秒杀就像春运抢票：先排队领号（限流），进站安检（验证码），最后到窗口发现没票了（异步处理）。',
    importance: 'high'
  },
  {
   id: 'design-2',
   question: '如何设计一个短链接生成器？',
    answer: '1. 使用 62 进制转换。2. 数据库存储长短链接映射。3. 使用布隆过滤器或 Redis 缓存热点链接。4. 考虑高并发下的 ID 生成（雪花算法）。',
    analogy: '短链接就像超市的存包柜条码。一长串东西（长链接）换成一个小纸条（短链接），扫一下就能找到原来的东西。',
    importance: 'medium'
  },
  {
   id: 'design-3',
   question: '如何设计一个高并发系统？',
    answer: '【高并发系统设计六大核心】\n\n1. 分层架构（纵向拆分）\n   CDN 层：静态资源（图片、CSS、JS）缓存到边缘节点\n   网关层：负载均衡、限流、鉴权、路由\n   服务层：无状态微服务，水平扩展\n   缓存层：多级缓存（本地缓存 + 分布式缓存）\n   数据层：分库分表、读写分离\n\n2. 水平扩展（Scale Out）\n   - 无状态服务：Session 存 Redis，不依赖本地\n   - 负载均衡：Nginx（L7）、LVS（L4）、DNS（L3）\n   - 弹性伸缩：根据 CPU/内存使用率自动扩缩容\n   - 容器化：Docker+K8s 快速部署\n\n3. 缓存策略\n   - 多级缓存：\n     L1：Caffeine/Guava（进程内，纳秒级）\n     L2：Redis/Cluster（分布式，毫秒级）\n   - 缓存策略：\n     Cache Aside：先更 DB，再删缓存\n     Read Through：缓存不命中自动查 DB\n     Write Through：先写缓存，异步刷 DB\n   - 热点数据：永不过期，后台定时更新\n\n4. 异步处理\n   - 消息队列：解耦、削峰、延迟\n   - 线程池：IO 密集型任务异步执行\n   - CompletableFuture：异步编排\n   - Reactor 模型：Netty 高并发网络 I/O\n\n5. 限流降级\n   - 限流算法：\n     计数器、滑动窗口、漏桶、令牌桶\n   - 熔断器：Hystrix/Sentinel\n     状态：Closed（正常）-> Open（熔断）-> Half-Open（试探）\n   - 降级策略：\n     返回默认值、缓存数据、友好提示\n\n6. 监控告警\n   - 指标监控：QPS、RT、成功率、CPU、内存\n   - 链路追踪：SkyWalking/Zipkin\n   - 日志聚合：ELK（Elasticsearch+Logstash+Kibana）\n   - 告警通知：钉钉、企业微信、短信、电话\n\n【数据库优化】\n- 索引优化：覆盖索引、联合索引\n- SQL 优化：避免全表扫描、分页优化\n- 连接池：HikariCP、Druid\n- 分库分表：ShardingSphere、MyCat\n\n【实战案例】\n淘宝双 11：CDN+ 边缘计算 + 单元化架构 + 异地多活',
    analogy: '高并发系统像【大型游乐场】：门口限流（限流）、快速通道（缓存）、项目分散人流（分库分表）、紧急预案（降级）、实时监控（监控告警）。',
    importance: 'high'
  },
  {
   id: 'design-4',
   question: '什么是微服务架构？优缺点？',
    answer: '将单体应用拆分成一组小型服务，每个服务运行在独立进程中，通过轻量级通信机制协作。优点：解耦、独立部署、技术多样。缺点：复杂度高、运维成本大、数据一致性难。',
    analogy: '微服务像【连锁餐饮集团】：每个店（服务）独立经营，有自己特色，总部协调（服务治理）。优点是灵活，缺点是管理复杂。',
    importance: 'high'
  },
  {
   id: 'design-5',
   question: '数据库设计三范式是什么？',
    answer: '1NF：字段不可再分。2NF：非主键字段完全依赖主键（消除部分依赖）。3NF：非主键字段直接依赖主键（消除传递依赖）。实际设计中可适当反范式优化性能。',
    analogy: '1NF 像【地址不能写成"中国北京市海淀区"】，要分开成省市区；2NF 像【订单明细里不能有商品信息】，那是商品表的事；3NF 像【员工表里不能有部门名称】，那是部门表的事。',
    importance: 'medium'
  },
  {
   id: 'design-6',
   question: '什么是读写分离？如何实现？',
    answer: '主库负责写，从库负责读。实现方式：1. 程序代码控制（根据 SQL 类型路由）。2. 中间件（MyCat、ShardingSphere）。难点：主从延迟导致的数据不一致。',
    analogy: '读写分离像【公司文件管理】：老板（主库）负责修改文件，秘书们（从库）负责复印分发给大家看。老板刚改完，秘书可能还没更新（主从延迟）。',
    importance: 'high'
  },
  {
   id: 'design-7',
   question: '如何保证系统的高可用（HA）？',
    answer: '1. 冗余部署：多实例、多机房、多活。2. 故障转移：自动切换。3. 限流熔断：防止雪崩。4. 灰度发布：逐步放量。5. 容灾演练。目标：99.99% 可用性（年停机不超 1 小时）。',
    analogy: '高可用作【飞机双引擎】：一个坏了另一个还能工作；限流熔断像【保险丝】，电流过大自动跳闸；灰度发布像【试运营】，先让一部分人用。',
    importance: 'high'
  },
  {
   id: 'design-8',
   question: '如何设计一个高并发下单系统？',
    answer: '【核心挑战】\n- 库存扣减的原子性\n- 订单创建的幂等性\n- 支付状态的同步\n- 高并发下的性能\n\n【解决方案】\n\n1. 分布式事务（TCC模式）\n   - Try阶段：冻结库存，创建订单\n   - Confirm阶段：确认扣减库存\n   - Cancel阶段：释放冻结库存\n   ```java\n   // 幂等性保证\n   public Order createOrder(String bizId, OrderRequest request) {\n       if (orderMapper.existsByBizId(bizId)) {\n           return orderMapper.findByBizId(bizId);\n       }\n       // 创建订单逻辑\n   }\n   ```\n\n2. 性能优化\n   - 读写分离：订单查询走从库\n   - 缓存：商品信息、用户信息缓存到Redis\n   - 异步处理：短信、邮件等异步发送\n   - 分库分表：按用户ID或订单ID分片\n\n3. 库存管理\n   - Redis预扣库存：使用Lua脚本保证原子性\n   - 数据库最终扣减：异步更新\n   - 库存分段：减少热点数据竞争',
    analogy: '高并发下单就像演唱会抢票：先冻结座位（Try），确认支付后真正占用（Confirm），超时或取消释放座位（Cancel）。',
    importance: 'high'
  },
  {
   id: 'design-9',
   question: '如何设计一个实时排行榜系统？',
    answer: '【核心需求】\n- 实时更新用户分数\n- 快速获取排行榜\n- 支持分页查询\n- 高并发访问\n\n【技术方案】\n\n1. 数据结构选择\n   - Redis ZSet（有序集合）：天然支持排序\n   - score：用户分数\n   - member：用户ID\n\n2. 核心操作\n   ```java\n   // 更新分数\n   redisTemplate.opsForZSet().add("ranking:score", userId, score);\n   \n   // 获取排行榜（倒序）\n   Set<TypedTuple<Object>> tuples = redisTemplate.opsForZSet()\n       .reverseRangeWithScores("ranking:score", 0, topN - 1);\n   \n   // 获取用户排名\n   Long rank = redisTemplate.opsForZSet().reverseRank("ranking:score", userId);\n   ```\n\n3. 性能优化\n   - 内存存储：Redis内存操作，性能极高\n   - 原子操作：ZSet操作是原子的\n   - 持久化：RDB+AOF保证数据不丢失\n   - 集群：Redis Cluster支持横向扩展\n\n4. 扩展功能\n   - 分区排行榜：按时间、地区、类别分区\n   - 历史排行榜：定时快照保存历史数据\n   - 增量更新：只更新变化的分数',
    analogy: '实时排行榜就像体育比赛的记分板，Redis ZSet就是那个会自动排序的电子屏，谁得分高谁就排前面。',
    importance: 'medium'
  },
  {
   id: 'design-10',
   question: '如何设计一个分布式ID生成器？',
    answer: '【需求场景】\n- 分库分表需要全局唯一ID\n- 订单号、用户ID等业务标识\n- 趋势递增、信息安全\n\n【解决方案】\n\n1. UUID\n   - 优点：本地生成、性能高\n   - 缺点：无序、太长、不适合做数据库主键\n\n2. 数据库自增\n   - 优点：简单、递增\n   - 缺点：单点故障、性能瓶颈\n   - 优化：双主键交替自增（1,3,5...和2,4,6...）\n\n3. Redis INCR\n   - 优点：性能高、递增\n   - 缺点：需要维护Redis、重启后可能重复\n\n4. 雪花算法（Snowflake）\n   ```\n   64位 = 1位符号 + 41位时间戳 + 10位机器ID + 12位序列号\n   ```\n   - 优点：趋势递增、高性能、分布式\n   - 缺点：时钟回拨问题、机器ID需要配置\n\n5. Leaf（美团）\n   - 号段模式：批量获取ID段\n   - 雪花算法：解决时钟回拨\n\n【推荐方案】\n- 一般场景：雪花算法\n- 超高并发：Leaf\n- 简单应用：Redis INCR',
    analogy: '分布式ID生成器就像全国身份证号：省市区（机器ID）+出生日期（时间戳）+顺序号（序列号），保证全国唯一。',
    importance: 'high'
  }
,
  {
   id: 'design-11',
   question: '如何保证缓存和数据库一致性？',
    answer: '系统设计面试里这题最常见的主线是 Cache Aside。\n\n常见做法：\n- 读：先查缓存，没命中再查数据库并回填缓存\n- 写：先更新数据库，再删除缓存\n\n为什么不是“先更数据库再更缓存”：\n- 因为缓存更新逻辑更复杂\n- 并发场景下更容易写乱\n\n还要补充的问题：\n- 删缓存失败怎么办\n- 并发读导致旧值回填怎么办\n- 主从延迟导致读到旧值怎么办\n\n常见增强方案：\n- 延迟双删\n- MQ 异步重删\n- binlog 订阅做订正\n- 热点数据主动刷新\n\n答题关键：\n- 大部分业务追求的是最终一致，不是绝对实时强一致。',
    analogy: '缓存和数据库像公告栏和正式档案，档案改完后先把公告撕掉，等下一个人来时再按新档案重贴。',
    importance: 'high'
  },
  {
   id: 'design-12',
   question: '什么是令牌桶限流？适合什么场景？',
    answer: '令牌桶的核心思想是：系统按固定速率往桶里放令牌，请求来了先拿令牌，拿到才能继续执行，拿不到就限流或排队。\n\n特点：\n- 能限制平均速率\n- 允许一定程度的突发流量\n- 比简单计数器更平滑\n\n适用场景：\n- API 网关限流\n- 秒杀活动入口保护\n- 用户级接口频控\n- 第三方调用配额控制\n\n面试里可以顺带区分：\n- 令牌桶允许突发\n- 漏桶更强调匀速流出。',
    analogy: '令牌桶像地铁闸机定时放行票券，乘客来了先拿票，拿到票再进站，没有票就得等。',
    importance: 'high'
  },
  {
   id: 'design-13',
   question: '高并发下库存扣减一致性一般怎么做？',
    answer: '库存扣减最核心的问题是不能超卖。\n\n常见方案：\n1. 数据库条件更新\n- \`update ... set stock = stock - 1 where stock > 0\`\n- 简单直接，但高并发下压力容易集中到数据库\n\n2. Redis 预扣库存 + 异步落库\n- 先在 Redis 用 Lua 脚本原子扣减\n- 成功后再发 MQ 异步创建订单或落库\n- 更适合秒杀类高并发场景\n\n3. 冻结库存 / 预占库存\n- 下单先占库存\n- 支付成功再正式扣减\n- 超时未支付再释放\n\n4. 幂等和补偿\n- 订单重复提交要去重\n- 异常场景要有回滚或补偿机制\n\n答题重点：\n- 先讲“防超卖”\n- 再讲“高并发下不要全打数据库”\n- 最后补“支付成功、超时释放、补偿对账”。',
    analogy: '库存扣减像演唱会座位锁座，先把座位占住，再支付确认，超时没付款就放回去。',
    importance: 'high'
  }
];

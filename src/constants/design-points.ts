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
  }
];

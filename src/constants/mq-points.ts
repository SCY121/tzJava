// 消息队列面试题
import { InterviewPoint } from './command-types';

export const MQ_POINTS: InterviewPoint[] = [
  {
   id: 'mq-1',
   question: '为什么要使用消息队列？',
    answer: '【三大核心作用】\n\n1. 解耦（Decoupling）\n   - 场景：订单系统需通知库存、物流、积分、短信等多个系统\n   - 问题：接口依赖复杂，任一系统故障影响全局\n   - 解决：订单系统发消息到 MQ，各系统订阅消费\n   - 优势：降低耦合、独立演进、故障隔离\n\n2. 异步（Asynchronous）\n   - 场景：用户注册后需发送邮件、初始化数据等\n   - 串行耗时：100ms+200ms+50ms=350ms\n   - 异步耗时：100ms（邮件等后台处理）\n   - 优势：提升响应速度、改善用户体验\n\n3. 削峰填谷（Peak Load Leveling）\n   - 场景：秒杀活动瞬时 10 万 QPS，数据库只能扛 2000 QPS\n   - 方案：请求先入 MQ，后端按能力消费\n   - 优势：保护数据库、避免雪崩、平滑流量\n\n【其他应用场景】\n\n4. 延时处理\n   - 订单 30 分钟未支付自动取消\n   - 会员到期前 7 天提醒\n\n5. 分布式事务\n   - 事务消息保证最终一致性\n\n6. 日志采集\n   - Kafka 收集各服务日志，统一分析\n\n7. 数据流处理\n   - 实时计算（Flink/Storm）消费 MQ 做数据分析\n\n【引入 MQ 带来的问题】\n\n1. 系统可用性降低：MQ 挂了影响上下游\n   - 解决：集群部署、多副本、自动故障转移\n\n2. 消息丢失风险：生产者/MQ/消费者环节都可能丢\n   - 解决：持久化、ACK 机制、事务消息\n\n3. 数据一致性：分布式环境下难保证\n   - 解决：最终一致性、幂等设计、对账机制\n\n4. 复杂度增加：需考虑顺序、重复、积压等问题\n   - 解决：规范化、监控告警、链路追踪',
    analogy: 'MQ 就像快递柜。快递员（生产者）把货放下就走，不需要等收件人（消费者）在家。收件人有空再去取。',
    importance: 'high'
  },
  {
   id: 'mq-2',
   question: '如何保证消息不丢失？',
    answer: '【消息丢失的五个环节及解决】\n\n1. 生产者发送阶段丢失\n   问题：网络抖动、MQ 宕机导致消息未到达\n   解决：\n   - 事务消息：RabbitMQ 使用 transaction，Kafka/RocketMQ 使用事务\n   - 确认机制：RabbitMQ Confirm 模式，Kafka acks=all\n   - 重试机制：失败自动重试（最多 3 次）\n   - 本地消息表：先落库再发送，定时补偿\n\n2. MQ 接收阶段丢失\n   问题：MQ 收到消息但未持久化就宕机\n   解决：\n   - 持久化：RabbitMQ 队列和消息都设 durable=true\n   - Write Ahead Log：RocketMQ/Kafka 先写 CommitLog 再内存\n   - 同步刷盘：syncFlush（安全但慢）vs asyncFlush（快但有风险）\n   - 多副本：主从架构，Master 挂 Slave 接管\n\n3. MQ 存储阶段丢失\n   问题：磁盘损坏、误删除\n   解决：\n   - RAID 磁盘阵列\n   - 多机房异地备份\n   - 设置合理的过期时间（不过期或较长）\n\n4. 消费者拉取阶段丢失\n   问题：消费者拉到消息后崩溃\n   解决：\n   - 手动 ACK：业务处理成功后再确认\n   - 批量 ACK：一批消息处理完一起确认\n   - 注意：关闭 autoAck\n\n5. 消费者处理阶段丢失\n   问题：业务逻辑异常、未捕获错误\n   解决：\n   - try-catch 包裹消费逻辑\n   - 失败重试：延迟重试队列（1s/10s/1min/10min）\n   - 死信队列：多次失败后转 DLQ，人工介入\n   - 日志记录：完整记录消息内容和堆栈\n\n【各 MQ 的最佳实践】\n\nRabbitMQ：\n- 生产者开启 Confirm\n- 队列和 Exchange 设置 durable\n- 消费者手动 ACK\n\nKafka：\n- producer：acks=all, retries=3, min.insync.replicas=2\n- broker：unclean.leader.election.enable=false\n- consumer：enable.auto.commit=false\n\nRocketMQ：\n- 同步发送 + 重试\n- 刷盘策略：SYNC_FLUSH\n- 从节点同步：SYNC_SLAVE\n- 消费者返回 CONSUME_SUCCESS',
    analogy: '就像寄挂号信：寄信人要拿到回执（确认），邮局要登记入库（持久化），收信人要签字（ACK）。',
    importance: 'high'
  },
  {
   id: 'mq-3',
   question: '如何处理重复消费（幂等性）？',
    answer: '在消费端实现幂等。方法：1. 数据库唯一索引。2. 利用 Redis 记录已处理的消息 ID。3. 业务逻辑判断（如订单状态检查）。',
    analogy: '就像去银行取钱，不管你按几次取款按钮，只要流水号一样，系统只给你扣一次钱。',
    importance: 'high'
  },
  {
   id: 'mq-4',
   question: 'Kafka、RocketMQ、RabbitMQ 的区别？',
    answer: 'Kafka：高吞吐，适合日志采集，可能丢消息。RocketMQ：阿里出品，支持事务消息、延迟消息，金融级可靠。RabbitMQ：基于 Erlang，路由功能强大，但吞吐量较低。',
    analogy: 'Kafka 像【货运列车】，拉得多跑得快；RocketMQ 像【武装押运车】，安全可靠还带保险；RabbitMQ 像【快递专车】，灵活但拉不了太多。',
    importance: 'high'
  },
  {
   id: 'mq-5',
   question: '如何保证消息的顺序性？',
    answer: '1. 生产者：将同一订单/用户的消息发到同一个队列（分区）。2. 消费者：单线程消费或使用内存队列串行化。注意：全局顺序会牺牲性能。',
    analogy: '就像【快递配送】：同一个人的包裹都放到同一个配送车（分区），由同一个快递员送（单线程），这样就不会乱序。',
    importance: 'high'
  },
  {
   id: 'mq-6',
   question: '什么是延迟队列？如何实现？',
    answer: '延迟队列是消息投递后不立即消费，而是等待指定时间。实现：1. RabbitMQ 使用死信队列 + TTL。2. RocketMQ 原生支持。3. Kafka 使用时间轮算法。4. Redis 使用 ZSet。',
    analogy: '延迟队列像【定时闹钟】：你设定好时间，到点了才会响。适用于订单超时取消、任务定时执行。',
    importance: 'medium'
  },
  {
   id: 'mq-7',
   question: '什么是事务消息？实现原理？',
    answer: '事务消息保证本地事务和消息发送的原子性。原理：1. 发送 half 消息（预备）。2. 执行本地事务。3. 根据事务结果 commit/rollback。4. 回查机制补偿。',
    analogy: '就像【网购担保交易】：你先付款到支付宝（half 消息），卖家发货（本地事务），你确认收货后支付宝才打款（commit）。如果没收到货，就退款（rollback）。',
    importance: 'high'
  },
  {
   id: 'mq-8',
   question: '消息积压了怎么办？',
    answer: '1. 临时扩容：增加消费者实例。2. 优化消费逻辑：减少单个消息处理时间。3. 批量消费。4. 降级非核心业务。5. 排查原因：是否消费失败或死锁。',
    analogy: '消息积压像【高速公路堵车】：可以【多开收费口】（扩容消费者）、【提高通行速度】（优化逻辑）、【允许免费通行】（降级）、【调查是不是有事故】（排查原因）。',
    importance: 'high'
  }
  ,
  {
   id: 'mq-9',
   question: 'Kafka 和 RabbitMQ 的基本概念分别是什么？',
    answer: 'Kafka 里常见概念有 Producer、Consumer、Topic、Partition、Consumer Group。它偏高吞吐日志流和大数据场景。RabbitMQ 常见概念有 Producer、Exchange、Queue、Binding、Consumer，它路由模型更灵活，更适合业务消息和复杂投递场景。',
    analogy: 'Kafka 像超长传送带，消息按分区连续流动；RabbitMQ 像分拣中心，先到交换机再按规则投递到不同队列。',
    importance: 'medium'
  }
];

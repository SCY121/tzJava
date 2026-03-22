// 分布式系统面试题
import { InterviewPoint } from './command-types';

export const DISTRIBUTED_POINTS: InterviewPoint[] = [
  {
   id: 'dist-1',
   question: '什么是 CAP 理论？',
    answer: '【CAP 三大要素】\n\n1. Consistency（一致性）\n   - 定义：所有节点在同一时间看到的数据完全一致\n   - 类型：强一致性（立即一致）、弱一致性（不保证）、最终一致性（一段时间后一致）\n   - 实现：需要牺牲可用性（如等待数据同步完成）\n\n2. Availability（可用性）\n   - 定义：每次请求都能获得响应，无论成功失败\n   - 要求：系统必须在有限时间内响应\n   - 冲突：网络分区时，若保证一致性则无法响应（不可用）\n\n3. Partition Tolerance（分区容错性）\n   - 定义：系统在任意网络分区故障下仍能运行\n   - 现实：分布式系统必须满足 P（网络不可靠是常态）\n\n【CP vs AP 选择】\n\n1. CP 系统（保证一致性 + 分区容错）\n   - 代表：Zookeeper、HBase、Redis Cluster\n   - 场景：金融交易、库存管理\n   - 表现：主从切换时短暂不可用（选举期间）\n\n2. AP 系统（保证可用性 + 分区容错）\n   - 代表：Eureka、Cassandra、DynamoDB\n   - 场景：社交 feed 流、商品浏览\n   - 表现：可能读到旧数据（最终一致性）\n\n【BASE 理论】\n- Basically Available（基本可用）：允许损失部分可用性\n- Soft State（软状态）：允许中间状态\n- Eventually Consistent（最终一致性）：一段时间后达成一致\n\n【实际应用】\n- 支付宝转账：CP（必须保证金额准确）\n- 微博点赞：AP（延迟几秒无所谓）\n- 电商库存：CP（不能超卖）\n- 商品详情：AP（价格描述可短暂不一致）',
    analogy: '就像找对象：长得帅（C）、有钱（A）、性格好（P）。你很难全都要，通常得放弃一个。',
    importance: 'high'
  },
  {
   id: 'dist-2',
   question: '分布式事务的解决方案有哪些？',
    answer: '【2PC（Two-Phase Commit）】\n\n阶段一（准备）：\n- 协调者询问所有参与者是否可以提交\n- 参与者执行本地事务但不提交，记录 undo/redo log\n- 返回 Yes/No\n\n阶段二（提交/回滚）：\n- 若全部 Yes，协调者发送 Commit 指令\n- 若有任一 No，发送 Rollback 指令\n- 参与者执行并提交，释放资源\n\n缺点：\n- 性能差：阻塞等待，占用资源\n- 单点故障：协调者挂了全系统瘫痪\n- 数据不一致：阶段二网络故障可能导致不一致\n\n【3PC（Three-Phase Commit）】\n\n增加 PreCommit 阶段：\n- CanCommit -> PreCommit -> DoCommit\n- 超时自动提交（减少阻塞）\n- 但仍未彻底解决问题\n\n【TCC（Try-Confirm-Cancel）】\n\n1. Try 阶段：预留资源\n   - 检查并锁定资源（如冻结账户余额）\n   - 不涉及业务操作\n\n2. Confirm 阶段：确认执行\n   - 使用预留资源执行业务\n   - 幂等性保证（可能重试）\n\n3. Cancel 阶段：取消执行\n   - 释放 Try 阶段预留的资源\n   - 回滚操作\n\n优点：非阻塞、性能高\n缺点：代码侵入性强、需实现三个接口\n\n【本地消息表（最终一致性）】\n\n1. A 系统：本地事务 = 写业务表 + 写消息表\n2. 定时任务：扫描消息表，发送到 MQ\n3. B 系统：消费消息，执行业务\n4. 失败重试：最大重试次数，人工介入\n\n优点：简单可靠、易实现\n缺点：实时性差、有延迟\n\n【Seata 框架】\n\n阿里开源的一站式分布式事务解决方案：\n- AT 模式：无侵入，基于 SQL 解析自动生成回滚日志\n- TCC 模式：手动实现 Try/Confirm/Cancel\n- Saga 模式：长事务，每个操作有补偿动作\n- XA 模式：基于数据库原生 XA 协议',
    analogy: 'TCC 就像订酒店：Try（预占房间）-> Confirm（正式入住扣款）-> Cancel（取消预订退款）。',
    importance: 'high'
  },
  {
   id: 'dist-3',
   question: '什么是分布式锁？',
    answer: '在分布式环境下，保证同一时间只有一个节点的线程能执行特定代码。常用实现：Redis（SETNX）、Zookeeper（临时顺序节点）。',
    analogy: '就像多个人抢一个公共电话亭，谁先抢到谁进去锁门，后面的人只能等。',
    importance: 'high'
  },
  {
   id: 'dist-4',
   question: '常见的一致性算法有哪些？',
    answer: '1. Paxos：经典但复杂。2. Raft：易于理解，Leader-Follower 架构。3. ZAB：Zookeeper 使用，支持崩溃恢复。4. Gossip：最终一致性，用于 Dynamo/Cassandra。',
    analogy: 'Paxos 像【议会投票】，流程复杂但严谨；Raft 像【班长管班级】，班长说了算，班长倒了选新班长；Gossip 像【八卦传播】，大家互相传话，最后都知道。',
    importance: 'high'
  },
  {
   id: 'dist-5',
   question: '什么是服务发现？如何实现？',
    answer: '服务发现是自动检测服务实例的 IP 和端口。模式：1. 客户端发现（Eureka）。2. 服务端发现（Consul + Nginx）。实现：注册中心维护服务列表，健康检查剔除故障节点。',
    analogy: '服务发现像【114 查号台】：你要找某个公司（服务），打电话问 114（注册中心），它告诉你电话号码（IP+ 端口）。公司搬了或倒闭了，114 会更新。',
    importance: 'medium'
  },
  {
   id: 'dist-6',
   question: '什么是配置中心？有什么作用？',
    answer: '集中管理和动态推送配置信息。代表产品：Apollo、Nacos、Spring Cloud Config。作用：1. 统一管理。2. 实时生效。3. 版本管理。4. 灰度发布。',
    analogy: '配置中心像【公司公告栏】：规章制度（配置）都贴在这里，改了马上通知所有人，不用挨个部门跑。',
    importance: 'medium'
  },
  {
   id: 'dist-7',
   question: '什么是链路追踪？为什么需要？',
    answer: '链路追踪是记录请求在所有微服务间的调用路径。代表：SkyWalking、Zipkin、Jaeger。用于：1. 性能分析。2. 故障定位。3. 依赖梳理。核心概念是 TraceID 和 SpanID。',
    analogy: '链路追踪像【快递物流跟踪】：从下单到签收，每个中转站（服务）都扫描记录，你能看到包裹在哪、哪个环节慢了、有没有丢件。',
    importance: 'medium'
  },
  {
   id: 'dist-8',
   question: '什么是负载均衡？常见算法有哪些？',
    answer: '将流量分发到多个服务实例。算法：1. 轮询。2. 加权轮询。3. 随机。4. 加权随机。5. 最小连接数。6. 一致性哈希。实现：Nginx、Ribbon、LVS。',
    analogy: '负载均衡像【银行叫号系统】：轮询是挨个叫号；加权是给 VIP 客户更多机会；最小连接是看哪个窗口人少去哪个。',
    importance: 'high'
  }
];

import { Command, InterviewPoint } from './command-types';

export const JAVA_SYSTEMATIC_POINTS: InterviewPoint[] = [
  {
    id: 'java-sys-1',
    question: '抽象类和接口怎么区分？面试里应该怎么选型？',
    answer: `这题不要只背“一个能有实现，一个不能”，面试官更关心你是否理解两者的设计边界。

### 抽象类更适合什么场景
- 多个子类之间有明显的“is-a”关系
- 需要抽取公共状态、公共实现或模板方法
- 希望对子类能力做部分约束，但又保留扩展点

### 接口更适合什么场景
- 更强调能力约定，而不是继承体系
- 需要跨层、跨模块解耦
- 一个类可能同时具备多种能力，比如可序列化、可比较、可运行

### Java 8 之后接口为什么更常用
- 接口支持 default 方法和 static 方法
- 既能保留扩展能力，又能维持较好的解耦

### 面试回答建议
可以直接说：
1. 抽象类强调“公共骨架”
2. 接口强调“行为契约”
3. 如果需要共享状态和模板逻辑，更偏抽象类
4. 如果只是定义能力并希望低耦合扩展，更偏接口`,
    analogy: '抽象类像同一家公司里一套通用岗位规范，接口更像行业资格证，谁拿到了都可以按这个标准办事。',
    importance: 'high',
  },
  {
    id: 'java-sys-2',
    question: '==、equals()、hashCode() 之间的关系怎么答才完整？',
    answer: `### 先分清比较的对象
- \`==\`：比较基本类型时比的是值，比较引用类型时比的是地址
- \`equals()\`：默认还是比较地址，但很多类会重写成“比较内容”

### 为什么 hashCode 不能单独讲
只要一个类重写了 \`equals()\`，通常就必须一起重写 \`hashCode()\`，否则在 HashMap、HashSet 这类哈希容器里会出问题。

### 必须记住的约束
1. 如果两个对象 \`equals()\` 为 true，那么它们的 \`hashCode()\` 必须相同
2. 两个对象 \`hashCode()\` 相同，不代表 \`equals()\` 一定为 true
3. \`hashCode()\` 只是为了更快缩小查找范围，不是最终判等依据

### 典型面试追问
- 为什么 HashSet 里会出现“逻辑相同对象却存了两份”？
  - 因为只重写了 equals 没重写 hashCode
- 为什么字符串常量比较时 \`==\` 有时也会是 true？
  - 因为字符串常量池会复用对象引用`,
    analogy: 'hashCode 像先按楼层分区，equals 像进门后核对身份证，前者负责粗筛，后者负责最终确认。',
    importance: 'high',
  },
  {
    id: 'java-sys-3',
    question: 'final、static、this、super 这些关键字怎么系统回答？',
    answer: `### final
- 修饰变量：值不能再变
- 修饰方法：不能被重写
- 修饰类：不能被继承
- 常见场景：常量、不可变对象、稳定设计边界

### static
- 属于类，不属于具体对象
- 常见于工具方法、静态常量、单例入口
- 典型追问：static 方法里为什么不能直接用 this
  - 因为 this 属于对象，static 上下文里没有当前对象

### this
- 指向当前对象
- 常用于区分成员变量和局部变量重名
- 也能用于构造器中调用本类其他构造器：\`this(...)\`

### super
- 指向父类部分
- 常用于调用父类构造器或父类方法
- 在子类重写父类逻辑后，若还要复用父类实现，通常会显式使用 \`super.xxx()\`

### 面试总结句
这几个关键字本质上是在回答三类问题：对象归属、继承边界、类级别共享。`,
    analogy: 'this 像“我自己”，super 像“我爸那套能力”，static 像“公司公共资源”，final 像“锁死不可再改的规则”。',
    importance: 'medium',
  },
  {
    id: 'java-sys-4',
    question: '反射机制的原理、优缺点和典型使用场景是什么？',
    answer: `### 什么是反射
运行时动态获取类的信息，并且可以创建对象、访问属性、调用方法。

### 反射能做什么
- 获取类名、字段、方法、构造器
- 动态创建实例
- 绕过编译期静态绑定，按字符串调用方法
- 配合注解、配置文件实现通用框架能力

### 常见使用场景
- Spring 容器创建 Bean
- MyBatis 映射结果集到对象
- JDK 动态代理
- 序列化与反序列化框架
- 插件化、通用工具库

### 优点
- 灵活
- 扩展性好
- 框架开发非常重要

### 缺点
- 性能一般弱于直接调用
- 破坏封装性
- 代码可读性和安全性相对差

### 面试要补的一句
反射不是日常业务代码的首选，而是框架层为了换取灵活性常用的能力。`,
    analogy: '反射像拿到一个人的完整档案和万能钥匙，不仅能看信息，还能临时让他执行某件事。',
    importance: 'high',
  },
  {
    id: 'java-sys-5',
    question: '序列化和反序列化是怎么回事？为什么 serialVersionUID 很重要？',
    answer: `### 序列化
把对象状态转换成可传输、可存储的字节流。

### 反序列化
把字节流重新还原成对象。

### 常见用途
- 网络传输
- 缓存存储
- 消息队列
- 文件持久化

### serialVersionUID 的作用
它是类版本标识。
- 序列化时会把这个版本号写进去
- 反序列化时会校验本地类和流中的版本号是否一致
- 如果不一致，可能抛出 \`InvalidClassException\`

### 为什么建议显式定义
如果不手动指定，JVM 会根据类结构自动生成
- 一旦类有细微变动，自动生成值可能变化
- 会影响历史数据反序列化

### 面试里要顺手补充
- Java 原生序列化不一定是最推荐的生产方案
- 很多场景更常用 JSON、ProtoBuf、Kryo 这类格式`,
    analogy: '序列化像把实物打包寄走，serialVersionUID 像包装箱上的版本标签，收货时要确认版本对得上。',
    importance: 'medium',
  },
  {
    id: 'java-sys-6',
    question: 'Java 8 新特性里，面试最应该答哪几类？',
    answer: `不要把 Java 8 答成“只会 Lambda”。建议按 4 组来答。

### 1. Lambda 表达式
- 让函数式编程写法更简洁
- 常和集合遍历、函数式接口一起出现

### 2. Stream API
- 用声明式方式做过滤、映射、归约、分组
- 优点是表达力强，但不意味着所有场景都更快

### 3. 函数式接口
- 比如 \`Predicate\`、\`Function\`、\`Consumer\`、\`Supplier\`
- 是 Lambda 的承载抽象

### 4. 日期时间 API
- \`LocalDate\`、\`LocalDateTime\`、\`Instant\`
- 解决旧版 Date/Calendar 可读性差、线程不安全等问题

### 其他可补充
- Optional
- 接口 default 方法
- 方法引用
- CompletableFuture（如果面试偏并发）

### 答题建议
最后补一句：Java 8 最大价值不只是“语法新”，而是让集合处理、时间处理、异步编排这几类代码风格明显升级。`,
    analogy: 'Java 8 像一次工具箱升级，原来很多繁琐的手工活，现在可以用更顺手的新工具完成。',
    importance: 'medium',
  },
];

export const JUC_SYSTEMATIC_POINTS: InterviewPoint[] = [
  {
    id: 'juc-sys-1',
    question: 'happens-before 原则怎么理解？为什么它是并发题的底层逻辑？',
    answer: `### 本质
happens-before 不是某个具体 API，而是 Java 内存模型里判断“一个操作结果对另一个操作是否可见”的规则。

### 常见规则
- 程序次序规则：同一线程内前面的操作先于后面的操作
- 锁规则：解锁先于后续对同一把锁的加锁
- volatile 规则：对 volatile 变量的写先于后续读
- 线程启动规则：Thread.start() 先于线程内执行
- 线程终止规则：线程中的所有操作先于其他线程感知其结束

### 面试为什么爱问
因为很多问题表面看是“线程安全”，本质都落到：
1. 可见性
2. 有序性
3. 原子性

其中 happens-before 主要负责解释可见性和有序性。`,
    analogy: '它像并发世界里的因果顺序表，只有满足这张表里的规则，后面的线程才有资格“看到”前面的结果。',
    importance: 'high',
  },
  {
    id: 'juc-sys-2',
    question: '多线程之间有哪些常见通信方式？各自适合什么场景？',
    answer: `### 1. wait / notify / notifyAll
- 基于对象监视器
- 适合经典生产者消费者模型
- 使用时必须配合同步块

### 2. Lock + Condition
- 比 wait/notify 更灵活
- 可以有多个条件队列
- 更适合复杂同步场景

### 3. volatile 共享标志位
- 适合一个线程发信号，其他线程感知状态变化
- 解决可见性，不解决复合操作原子性

### 4. 阻塞队列
- 比如 ArrayBlockingQueue、LinkedBlockingQueue
- 生产者消费者场景非常常见
- 工程里比手写 wait/notify 更推荐

### 5. CountDownLatch / CyclicBarrier / Semaphore
- 属于并发工具类层面的协作方式
- 适合线程编排、阶段同步、限流控制

### 面试答题建议
不要只背 API 名字，最好按“信号通知、条件等待、队列解耦、阶段协作”四类去回答。`,
    analogy: '线程通信像多人协作：有时靠喊话，有时靠排队，有时靠门禁，有时靠倒计时统一行动。',
    importance: 'high',
  },
  {
    id: 'juc-sys-3',
    question: 'CountDownLatch、CyclicBarrier、Semaphore 三者怎么区分？',
    answer: `### CountDownLatch
- 一个或多个线程等待其他线程执行完成
- 计数减到 0 后放行
- 不能复用

### CyclicBarrier
- 一组线程相互等待，等所有线程都到达屏障点再一起继续
- 可以复用

### Semaphore
- 控制同时访问某个资源的线程数量
- 本质是限流和资源许可证模型

### 典型场景
- CountDownLatch：主线程等多个子任务完成
- CyclicBarrier：多线程分阶段并行计算后统一汇合
- Semaphore：限制数据库连接、接口并发数、某方法同时执行数

### 一句话区分
- Latch：我等你们
- Barrier：大家互等
- Semaphore：一次只允许这么多人进去`,
    analogy: 'Latch 像等所有人写完卷子再收卷，Barrier 像所有选手到齐再鸣枪，Semaphore 像场馆入口一次只放固定人数进场。',
    importance: 'high',
  },
  {
    id: 'juc-sys-4',
    question: 'CompletableFuture 和普通线程池 submit 相比，价值在哪里？',
    answer: `### 先说 submit 的问题
普通 \`executor.submit()\` 只是把任务扔出去执行，后续编排、依赖关系、异常传播都要自己处理。

### CompletableFuture 的核心价值
- 支持异步任务编排
- 支持串行、并行、汇总、异常处理
- 能把复杂异步流程写得更结构化

### 常见能力
- thenApply：拿上一步结果继续处理
- thenCompose：串联异步任务
- thenCombine：合并两个异步结果
- allOf：等多个任务全部完成
- exceptionally / handle：处理异常

### 面试建议
不要说“CompletableFuture 就是更高级的 Future”
更准确的说法是：
- Future 更像“拿结果的句柄”
- CompletableFuture 更像“异步编排框架”`,
    analogy: 'submit 像把多个零工单独派出去，CompletableFuture 像一张可编排的施工计划表，知道谁依赖谁、谁完成后接谁。',
    importance: 'medium',
  },
  {
    id: 'juc-sys-5',
    question: 'ThreadLocal 为什么会引发内存泄漏？怎么避免？',
    answer: `### 根因
ThreadLocalMap 的 key 是弱引用，但 value 不是弱引用。

### 为什么会泄漏
- ThreadLocal 对象本身没被强引用后，key 可能被 GC
- 但 value 还挂在长期存活的线程对象上
- 如果线程来自线程池，就会长时间不结束
- 于是形成“key 没了，value 还在”的脏数据残留

### 常见场景
- 用户上下文
- 数据源切换
- TraceId
- 分页上下文

### 正确做法
一定要在使用完后 \`remove()\`
\`\`\`java
try {
    THREAD_LOCAL.set(value);
    // business
} finally {
    THREAD_LOCAL.remove();
}
\`\`\`

### 面试总结
ThreadLocal 不是不能用，而是在线程池环境下一定要有清理意识。`,
    analogy: '像员工工位抽屉里临时放东西，如果人走了标签没了，但抽屉一直没人清理，旧东西就会一直堆着。',
    importance: 'high',
  },
  {
    id: 'juc-sys-6',
    question: '线程池除了会配参数，面试里还应该怎么答“监控和治理”？',
    answer: `如果只会背核心线程数、最大线程数、阻塞队列，答案其实是不完整的。

### 监控至少看什么
- 活跃线程数
- 队列长度
- 已完成任务数
- 拒绝次数
- 平均执行耗时
- 最大执行耗时

### 治理动作
- 区分 CPU 密集和 IO 密集任务
- 核心线程数按场景分开配置
- 使用有界队列，避免无上限堆积
- 明确拒绝策略，不要默认糊过去
- 重要任务池隔离，避免互相拖死

### 排障时怎么答
如果线程池出问题，我会先判断是：
1. 线程不够
2. 队列打满
3. 任务执行过慢
4. 下游阻塞导致池子被拖死

然后再决定是扩容、限流、隔离还是降级。`,
    analogy: '线程池治理像餐厅后厨管理，不只要知道灶台有几个，还要看排队订单、厨师忙闲、出餐速度和是否需要分餐线。',
    importance: 'medium',
  },
];

export const JVM_SYSTEMATIC_POINTS: InterviewPoint[] = [
  {
    id: 'jvm-sys-1',
    question: 'JVM 运行时数据区应该怎么系统回答？',
    answer: `### 线程私有
- 程序计数器：记录当前线程字节码执行位置
- Java 虚拟机栈：方法调用栈、局部变量表、操作数栈
- 本地方法栈：服务于 native 方法

### 线程共享
- 堆：对象实例和数组的主要存放区域
- 方法区：类元信息、常量、静态变量、JIT 编译代码等

### 面试高频补充
- 堆是 GC 主要发生区域
- 栈主要跟线程和方法调用生命周期一致
- 程序计数器是唯一几乎不会 OOM 的区域

### 常见追问
- 对象一定在堆上吗？
  - 一般这么说，但随着逃逸分析和标量替换，某些对象可能不一定真的落堆`,
    analogy: 'JVM 运行时数据区像一栋办公楼：堆是开放工位区，栈是每个人手边的临时操作台，方法区像共享制度库和资料室。',
    importance: 'high',
  },
  {
    id: 'jvm-sys-2',
    question: '类加载的完整过程和双亲委派模型怎么串起来讲？',
    answer: `### 类加载过程
1. 加载：把 class 文件读入内存
2. 验证：校验字节码是否合法
3. 准备：给静态变量分配内存并设默认值
4. 解析：把符号引用替换成直接引用
5. 初始化：执行静态变量赋值和 static 代码块

### 双亲委派模型
类加载时先让父加载器尝试加载，父加载器加载不了，子加载器再自己加载。

### 好处
- 避免类重复加载
- 保证核心类库安全
- 比如不会轻易让你自定义一个假的 \`java.lang.String\`

### 常见追问
- 为什么 SPI、Tomcat、热部署会打破双亲委派？
  - 因为有些场景需要子加载器反向加载，保证隔离或插件化`,
    analogy: '双亲委派像逐级上报机制，先问上级有没有这份文件，上级没有才轮到自己处理。',
    importance: 'high',
  },
  {
    id: 'jvm-sys-3',
    question: 'Full GC 一般由什么触发？线上应该怎么排查？',
    answer: `### 常见触发原因
- 老年代空间不足
- 大对象直接进入老年代后撑满
- Survivor 区放不下导致晋升压力过大
- 元空间不足
- 显式调用 \`System.gc()\`
- CMS/G1 等回收器在特定阶段退化

### 排查思路
1. 先看 GC 日志
2. 关注 Full GC 前后堆变化和频率
3. 看是堆问题、元空间问题还是某类对象持续堆积
4. 结合监控看流量、发布、缓存、线程池、MQ 积压是否有相关变化
5. 必要时 dump 堆，配合 MAT 看大对象和引用链

### 面试不要只说“调大堆”
真正正确的回答是：
- 先定位为什么回收不掉
- 再决定是代码问题、对象生命周期问题、参数问题还是流量问题`,
    analogy: 'Full GC 像一次彻底大扫除，但如果扫完屋里还是很满，问题往往不是“扫得不够勤”，而是东西一直在被源源不断堆进来。',
    importance: 'high',
  },
  {
    id: 'jvm-sys-4',
    question: 'G1 和 CMS、Parallel 这些回收器该怎么对比？',
    answer: `### Parallel
- 更强调吞吐量
- 适合批处理、后台任务

### CMS
- 目标是低停顿
- 老年代并发回收
- 缺点是会有碎片、维护成本高，已被逐步淘汰

### G1
- 面向服务端的通用型低停顿回收器
- 把堆划成多个 Region
- 可以按收益优先回收垃圾最多的区域
- 兼顾吞吐和停顿时间控制

### 面试结论
如果业务是典型后端服务，G1 通常是更常见的默认选择；
如果特别强调吞吐量，可考虑 Parallel；
CMS 更多是历史项目经验题。`,
    analogy: 'Parallel 像集中大扫除，CMS 像边营业边打扫，G1 像按区域分片精细清扫，优先处理最脏的地方。',
    importance: 'medium',
  },
  {
    id: 'jvm-sys-5',
    question: '线上 OOM 了，完整排查思路应该怎么说？',
    answer: `### 第一步：先分类型
- Java heap space
- Metaspace
- GC overhead limit exceeded
- Direct buffer memory
- Unable to create new native thread
- StackOverflowError

### 第二步：结合现象判断范围
- 是流量突增后出现
- 还是发布后逐渐上升
- 是缓存对象、集合、线程还是类加载异常

### 第三步：拿证据
- GC 日志
- 堆 dump
- 线程 dump
- 监控图（内存、线程、请求、队列）

### 第四步：找根因
- 对象泄漏
- 线程泄漏
- 动态生成类过多
- 直接内存没释放
- 参数设置不合理

### 第五步：给治理方案
- 修代码
- 收敛缓存
- 限流降级
- 优化对象生命周期
- 调整 JVM 参数

### 面试建议
回答一定要像线上排障，而不是只背某一个命令。`,
    analogy: 'OOM 排查像查仓库爆仓，先看是哪种货堆满了，再调监控、盘库存、找来源，最后才能决定清仓还是扩仓。',
    importance: 'high',
  },
];

export const SPRING_SYSTEMATIC_POINTS: InterviewPoint[] = [
  {
    id: 'spring-sys-1',
    question: 'Spring 容器启动流程怎么答更完整？',
    answer: `### 宏观流程
1. 读取配置类 / XML / 注解扫描路径
2. 解析并注册 BeanDefinition
3. 执行 BeanFactoryPostProcessor
4. 注册 BeanPostProcessor
5. 实例化非懒加载单例 Bean
6. 依赖注入、初始化、代理增强
7. 容器启动完成，对外提供 Bean

### 面试重点
- BeanDefinition 是启动期很关键的中间表示
- BeanFactoryPostProcessor 改的是“定义”
- BeanPostProcessor 改的是“对象”
- AOP 代理通常发生在 Bean 初始化后阶段

### 这样回答更像懂原理
不要把它讲成“扫描注解然后就能用了”，要讲出定义注册、扩展点、实例化、代理增强这几层。`,
    analogy: 'Spring 启动像先整理岗位编制表，再招人入职，最后给需要的人配工牌和权限系统。',
    importance: 'high',
  },
  {
    id: 'spring-sys-2',
    question: 'Spring 事务传播行为有哪些？面试最重要的是哪几个？',
    answer: `最常用、最值得重点答的是这几个：

### REQUIRED
- 默认值
- 有事务就加入，没有就新建

### REQUIRES_NEW
- 不管外层有没有事务，自己都新开一个
- 外层事务会被挂起

### SUPPORTS
- 有事务就加入，没有就按非事务执行

### NOT_SUPPORTED
- 明确按非事务方式执行
- 如果外层有事务，则挂起

### MANDATORY
- 必须在事务里执行，没有事务就报错

### NESTED
- 有点像事务里的保存点
- 依赖底层数据库和事务管理器能力

### 面试怎么答
通常至少把 REQUIRED、REQUIRES_NEW、NESTED 的区别讲清楚，这已经够用了。`,
    analogy: 'REQUIRED 像有队伍就跟着走，REQUIRES_NEW 像自己单独开一条线，NESTED 像大任务里先打一个可回退的小检查点。',
    importance: 'high',
  },
  {
    id: 'spring-sys-3',
    question: 'BeanFactoryPostProcessor 和 BeanPostProcessor 有什么区别？',
    answer: `### BeanFactoryPostProcessor
- 作用对象：BeanDefinition
- 作用时机：Bean 实例化之前
- 典型用途：修改 Bean 定义、属性占位符解析

### BeanPostProcessor
- 作用对象：Bean 实例
- 作用时机：Bean 初始化前后
- 典型用途：依赖注入、AOP 代理、通用增强

### 面试一句话区分
- 前者改“图纸”
- 后者改“成品”`,
    analogy: '一个是在开工前改施工图，一个是在房子建好后做精装和加装智能门锁。',
    importance: 'medium',
  },
  {
    id: 'spring-sys-4',
    question: '@Autowired 和 @Resource 的区别是什么？',
    answer: `### @Autowired
- Spring 提供
- 默认按类型注入
- 可以配合 @Qualifier 按名称进一步限定

### @Resource
- JSR-250 标准注解
- 默认更偏向按名称注入，再兜底按类型

### 面试里怎么说更稳
- 日常 Spring 项目里 \`@Autowired + @Qualifier\` 更常见
- 如果强调规范兼容，也可能用 \`@Resource\`
- 真正关键不只是“按名称还是按类型”，而是你有没有意识到多实现类注入时需要明确指定`,
    analogy: '@Autowired 像先按岗位类型找人，@Resource 像先按指定名字点人。',
    importance: 'medium',
  },
  {
    id: 'spring-sys-5',
    question: '什么情况下会考虑自定义 Spring Boot Starter？',
    answer: `### 适合场景
- 团队内部有一套通用能力要复用
- 比如统一日志、监控、鉴权、消息接入、SDK 封装
- 希望业务项目只引依赖、配配置，就能开箱即用

### 核心组成
- 自动配置类
- 条件注解
- 配置属性类
- 在新版 Spring Boot 中通过 \`AutoConfiguration.imports\` 进行自动装配声明

### 面试回答建议
不要把它说成“只是封装几个依赖”
更准确的说法是：Starter 的价值在于把依赖、默认配置、自动装配和扩展能力打成一套标准接入方式。`,
    analogy: 'Starter 像公司内部统一发放的标准接入包，业务方只要领包登记，就能按规范接入同一套基础设施。',
    importance: 'medium',
  },
];

export const REDIS_SYSTEMATIC_POINTS: InterviewPoint[] = [
  {
    id: 'redis-sys-1',
    question: 'Redis 常见数据类型分别适合什么业务场景？',
    answer: `### String
- 缓存对象、计数器、分布式锁、简单状态值

### Hash
- 适合对象字段存储
- 比如用户信息、商品属性

### List
- 适合消息列表、时间顺序记录

### Set
- 适合去重、标签、共同好友

### ZSet
- 适合排行榜、延迟队列、带分值排序场景

### 面试答题建议
不要只背名字，要把“类型特征”和“业务场景”绑定起来。`,
    analogy: 'Redis 的不同数据类型就像不同规格的收纳盒，关键不是盒子名字，而是你装什么最合适。',
    importance: 'high',
  },
  {
    id: 'redis-sys-2',
    question: '什么是 BigKey 和 HotKey？为什么线上要特别关注？',
    answer: `### BigKey
- 单个 key 对应的数据量特别大
- 影响网络传输、持久化、主从复制和删除耗时

### HotKey
- 某个 key 被极高频访问
- 容易形成单点压力和热点竞争

### 风险
- BigKey 可能让删除、迁移、AOF/RDB 变慢
- HotKey 可能让单节点被打爆

### 常见治理
- 拆分大 key
- 热点本地缓存
- 多级缓存
- 热点隔离和限流
- 异步删除大 key`,
    analogy: 'BigKey 像一件超大件货物，搬一次就很费劲；HotKey 像超火爆窗口，所有人都挤到那一个柜台去办事。',
    importance: 'medium',
  },
  {
    id: 'redis-sys-3',
    question: 'Redis 的过期删除和内存淘汰机制应该怎么系统回答？',
    answer: `### 过期删除
- 惰性删除：访问 key 时才判断是否过期
- 定期删除：后台抽样扫描并清理过期 key

### 为什么不用纯定时删除
- 如果每个 key 都严格定时删除，系统开销太大

### 内存淘汰
当内存达到上限，会按策略淘汰：
- noeviction
- allkeys-lru
- allkeys-lfu
- volatile-lru
- volatile-ttl 等

### 面试回答重点
过期删除解决“key 到期后怎么清”
内存淘汰解决“内存打满后怎么舍弃”`,
    analogy: '过期删除像食品过保质期后的清理机制，内存淘汰像仓库满了以后必须先下架一部分货。',
    importance: 'high',
  },
  {
    id: 'redis-sys-4',
    question: 'Redis 和数据库的一致性问题，面试里怎么答更稳？',
    answer: `### 先表明态度
缓存和数据库很难天然强一致，实际项目通常追求“最终一致性”。

### 常见方案
1. 先更新数据库，再删缓存
2. 延时双删
3. 异步消息通知删除缓存
4. 通过 binlog 订阅做缓存变更

### 为什么常说“更新 DB 再删缓存”
因为“更新缓存”更容易在并发下覆盖新值；
删缓存相对简单，后续读请求可以回源重建。

### 面试补充
- 如果业务要求强一致，就不能只靠普通缓存策略
- 可能需要加锁、串行化、读写隔离甚至重新设计业务流程`,
    analogy: '缓存一致性像公告栏和后台台账同步，现实里很难做到绝对同时更新，重点是让它们尽快重新对齐。',
    importance: 'high',
  },
  {
    id: 'redis-sys-5',
    question: 'Redis Sentinel 和 Cluster 分别适合什么场景？',
    answer: `### Sentinel
- 解决主从高可用和自动故障转移
- 更偏“单主多从”架构
- 不负责真正的数据分片

### Cluster
- 既考虑高可用，也考虑水平扩容
- 基于 slot 做分片
- 适合数据量和并发都持续增长的场景

### 面试总结
- Sentinel 偏高可用
- Cluster 偏高可用 + 分布式扩容`,
    analogy: 'Sentinel 像给一套门店安排值班经理，Cluster 像把店开成连锁并按片区分流客人。',
    importance: 'medium',
  },
];

export const MYSQL_SYSTEMATIC_POINTS: InterviewPoint[] = [
  {
    id: 'mysql-sys-1',
    question: 'EXPLAIN 执行计划里，面试最该重点看哪些字段？',
    answer: `### type
访问方式，越往左通常越好：
\`system > const > eq_ref > ref > range > index > ALL\`

### key
实际使用的索引

### rows
预估扫描行数，通常越少越好

### Extra
尤其关注：
- Using index
- Using where
- Using filesort
- Using temporary

### 面试建议
不要只说“我会看 EXPLAIN”
要说清：我会先看有没有走索引，再看扫描行数，再看有没有排序和临时表带来的额外代价。`,
    analogy: 'EXPLAIN 像一张路线规划图，重点看是不是走了高速、要经过多少站、有没有绕远路和堵点。',
    importance: 'high',
  },
  {
    id: 'mysql-sys-2',
    question: '联合索引和最左前缀原则怎么理解？',
    answer: `### 联合索引
一个索引里包含多个列，比如 \`(a, b, c)\`

### 最左前缀原则
MySQL 使用联合索引时，会优先从最左边开始连续匹配。

### 举例
索引是 \`(a,b,c)\`
- 可以用到：a、(a,b)、(a,b,c)
- 一般不能直接跳过 a 去只用 b 或 c

### 常见失效场景
- 跳过最左列
- 在索引列上做函数计算
- 范围查询后后续列利用受限
- 隐式类型转换

### 面试回答重点
联合索引不是“建得越多越好”，而是要围绕真实查询条件顺序设计。`,
    analogy: '联合索引像按“省-市-区”编排的地址目录，你可以从省开始一路往下找，但不能直接只拿区去快速定位。',
    importance: 'high',
  },
  {
    id: 'mysql-sys-3',
    question: '深分页为什么慢？通常怎么优化？',
    answer: `### 为什么慢
\`limit 100000, 20\` 这类 SQL，数据库往往要先扫描并跳过前面很多行，代价很高。

### 常见优化
1. 覆盖索引 + 子查询
2. 基于主键或有序字段做游标翻页
3. 业务上限制最大翻页深度

### 更推荐的思路
如果是用户前台列表，通常不建议无限翻到很后面；
如果是后台批处理，更适合“按主键范围”而不是“按页码”推进。`,
    analogy: '深分页像从一本很厚的书里每次都从第一页开始翻到第 500 页再读一行，真正慢的是前面那些被白白翻过去的过程。',
    importance: 'high',
  },
  {
    id: 'mysql-sys-4',
    question: 'binlog、redo log、undo log 分别解决什么问题？',
    answer: `### redo log
- InnoDB 层日志
- 保证持久性
- 崩溃恢复时重做已提交事务

### undo log
- InnoDB 层日志
- 保证原子性
- 回滚事务，也为 MVCC 提供历史版本

### binlog
- Server 层日志
- 记录逻辑变更
- 常用于主从复制和数据恢复

### 面试记忆方式
- redo：向前重做
- undo：向后撤销
- binlog：对外同步和归档`,
    analogy: 'redo 像施工补做记录，undo 像回退方案，binlog 像总台变更流水，方便同步给其他系统。',
    importance: 'high',
  },
  {
    id: 'mysql-sys-5',
    question: 'MySQL 主从同步的主线流程怎么答？',
    answer: `### 主流程
1. 主库写入 binlog
2. 从库 IO 线程拉取主库 binlog，写入 relay log
3. 从库 SQL 线程或 worker 线程重放 relay log

### 价值
- 读写分离
- 高可用切换
- 备份与容灾

### 面试追问常见点
- 主从延迟怎么判断
- 延迟大了怎么办
- 为什么从库读可能读到旧数据

### 答题建议
顺手补一句：主从复制本质是异步或半同步，不能天然保证强一致读。`,
    analogy: '像总店先记账，再把流水抄给分店，分店收到后再按流水更新自己的台账。',
    importance: 'medium',
  },
];

export const NETWORK_SYSTEMATIC_POINTS: InterviewPoint[] = [
  {
    id: 'network-sys-1',
    question: '为什么 TCP 建立连接要三次握手，断开连接通常要四次挥手？',
    answer: `### 三次握手
核心目标是确认双方的发送和接收能力都正常。

1. 客户端发 SYN：我想连你
2. 服务端回 SYN + ACK：我收到了，而且我也准备好了
3. 客户端回 ACK：我也确认你这边没问题

如果只有两次，不足以让双方都确认“彼此的收发能力”。

### 四次挥手
TCP 是全双工连接，双方关闭发送方向通常要分开确认。

1. 一方发 FIN
2. 对方回 ACK，表示“我知道你不再发了”
3. 对方处理完剩余数据后，再发 FIN
4. 最后对方回 ACK

### TIME_WAIT
主动关闭方通常会进入 TIME_WAIT，目的是保证最后的 ACK 能重发，并让旧连接残留报文自然消失。`,
    analogy: '握手像先互相确认“我能听到你、你也能听到我”；挥手像电话双方分别说“我先不说了”“等我把最后几句讲完”。',
    importance: 'high',
  },
  {
    id: 'network-sys-2',
    question: 'TCP 为什么可靠？它靠哪些机制保证可靠传输？',
    answer: `TCP 的可靠，不是靠某一个点，而是多种机制共同作用。

### 主要机制
- 序列号：保证数据有序
- 确认应答 ACK：确认哪些数据到了
- 超时重传：没收到确认就重发
- 校验和：校验数据传输是否损坏
- 滑动窗口：提升吞吐同时控制在途数据量
- 流量控制：避免接收方被打爆
- 拥塞控制：避免网络被打爆

### 面试答题建议
不要只说“有 ACK 和重传”
完整答案应该把“有序、确认、重传、流量、拥塞”这几条串起来。`,
    analogy: '像寄重要文件：每一页都编号，到一页确认一页，丢了就补寄，还得看收件方处理能力和整条运输线路是否拥堵。',
    importance: 'high',
  },
  {
    id: 'network-sys-4',
    question: 'HTTP 缓存和 304 协商缓存怎么答更完整？',
    answer: `### 强缓存
浏览器直接判断资源是否还能用，不发请求或少发请求。

常见响应头：
- Cache-Control
- Expires

### 协商缓存
浏览器会带上条件信息问服务端“资源有没有变”。

常见组合：
- ETag + If-None-Match
- Last-Modified + If-Modified-Since

### 304 的含义
资源没有变化，服务端告诉浏览器继续用本地缓存。

### 面试答题建议
按“强缓存先、协商缓存后”的顺序回答最清晰。`,
    analogy: '强缓存像手里有有效期没过的通行证直接进门，协商缓存像到门口再问保安一句“我这张证还有效吗？”。',
    importance: 'medium',
  },
  {
    id: 'network-sys-5',
    question: 'SSE、长轮询、WebSocket 这三种实时推送方式怎么区分？',
    answer: `### 长轮询
- 客户端发请求，服务端有结果才返回
- 返回后客户端再发下一次
- 实现简单，但连接和请求开销较高

### SSE
- 基于 HTTP 的服务端推送
- 适合服务端持续向浏览器单向输出文本流
- 很适合 AI 流式返回、通知流

### WebSocket
- 全双工长连接
- 客户端和服务端都能主动发消息
- 更适合聊天、协同编辑、游戏等强实时双向场景

### 面试结论
- 单向实时输出，SSE 很常见
- 双向交互，WebSocket 更合适
- 长轮询多是历史兼容或简单场景方案`,
    analogy: '长轮询像不断打电话问“有消息了吗”，SSE 像一直接听广播，WebSocket 像双方都在线的对讲机。',
    importance: 'medium',
  },
];

export const OS_SYSTEMATIC_POINTS: InterviewPoint[] = [
  {
    id: 'os-sys-1',
    question: '系统调用是什么？为什么会带来用户态和内核态切换？',
    answer: `应用程序很多能力不能直接做，比如读磁盘、发网络包、创建进程，这些都要通过系统调用请求操作系统内核代为执行。

### 为什么会切换
- 用户态权限受限
- 内核态掌握硬件和关键资源访问能力
- 所以需要从用户态陷入内核态，执行完再返回

### 面试要点
- 系统调用本身不是坏事，但切换有成本
- 高并发系统优化时常会关注减少无效系统调用和上下文切换`,
    analogy: '像普通员工不能直接进机房改总闸，必须通过正式申请让值班管理员代操作。',
    importance: 'high',
  },
  {
    id: 'os-sys-2',
    question: '页表和 TLB 分别解决什么问题？',
    answer: `### 页表
- 负责虚拟地址到物理地址的映射
- 是虚拟内存机制的基础

### TLB
- Translation Lookaside Buffer
- 是页表映射的高速缓存
- 用来减少每次地址转换都查完整页表的开销

### 面试为什么常一起问
因为页表解决“映射关系有没有”，TLB 解决“映射关系查得快不快”。`,
    analogy: '页表像完整地址簿，TLB 像手边常用联系人速查表。',
    importance: 'high',
  },
  {
    id: 'os-sys-3',
    question: '堆和栈在操作系统/运行时层面可以怎么理解？',
    answer: `### 栈
- 主要跟函数调用生命周期绑定
- 分配和回收快
- 空间通常较小

### 堆
- 更灵活，适合动态分配
- 生命周期不一定跟方法调用一致
- 管理成本更高，容易产生碎片和回收问题

### 面试答题建议
可以把“栈快、跟调用走；堆灵活、需管理”这条主线说清楚，再结合语言运行时补充。`,
    analogy: '栈像手边临时工作台，用完就清；堆像公共仓储区，灵活但管理复杂。',
    importance: 'medium',
  },
  {
    id: 'os-sys-4',
    question: '常见进程通信方式怎么对比？',
    answer: `### 管道
- 简单，常见于父子进程

### 消息队列
- 适合结构化消息传递

### 共享内存
- 速度快
- 但同步控制要自己处理

### 信号量
- 主要用于同步和互斥

### Socket
- 最通用
- 跨进程、跨机器都能用

### 面试总结
IPC 不只是“会列举”，更重要是知道谁更快、谁更通用、谁更适合同步控制。`,
    analogy: '有的是传纸条，有的是共享白板，有的是打电话，有的是靠门禁控制谁先进去。',
    importance: 'high',
  },
  {
    id: 'os-sys-5',
    question: '如果线上出现 CPU 飙高、内存打满、磁盘爆满，操作系统层面怎么排查？',
    answer: `### CPU 飙高
- 先看 top / pidstat 找高 CPU 进程
- 再定位线程或具体业务热点

### 内存打满
- 看 free、top、smem
- 分清是缓存占用、进程占用还是 OOM 风险

### 磁盘爆满
- 先 df -h 看哪个分区满
- 再用 du 逐级找大目录和大文件

### 面试回答建议
一定要讲“先全局、再局部”的排查顺序，而不是一上来就堆命令。`,
    analogy: '像大楼出故障时，先看是哪一层出问题，再进具体房间排查，而不是全楼乱翻。',
    importance: 'high',
  },
];

export const MQ_SYSTEMATIC_POINTS: InterviewPoint[] = [
  {
    id: 'mq-sys-1',
    question: '消息消费语义里的 at most once、at least once、exactly once 怎么区分？',
    answer: `### at most once
- 最多一次
- 可能丢，但不会重复

### at least once
- 至少一次
- 可能重复，但尽量不丢

### exactly once
- 理论上既不丢也不重
- 实际工程实现成本高，通常依赖特定组件能力和业务幂等配合

### 面试答题建议
大多数业务系统更常落在“至少一次 + 消费端幂等”。`,
    analogy: '像快递投递：最多一次可能丢件，至少一次可能重复送，恰好一次则是最理想但实现最难的状态。',
    importance: 'medium',
  },
  {
    id: 'mq-sys-2',
    question: 'Kafka Consumer Group 和 Rebalance 是什么？',
    answer: `### Consumer Group
- 多个消费者组成一个消费组
- 一个分区同一时刻只会被组内一个消费者消费

### Rebalance
- 当消费者上下线或分区变化时，组内会重新分配分区

### 风险点
- Rebalance 期间会有短暂停顿
- 如果设计不好，可能影响消费稳定性

### 面试建议
回答时最好补一句：
Kafka 的横向扩展能力和 Consumer Group 强相关，但分区数和消费者数关系会直接影响并发上限。`,
    analogy: '像一组快递员分片区送货，人员变化后要重新分区，这个重新划片过程就是 rebalance。',
    importance: 'medium',
  },
  {
    id: 'mq-sys-3',
    question: '顺序消息在工程上通常怎么保证？',
    answer: `### 核心前提
顺序性通常不是全局顺序，而是“同一个业务键的局部顺序”。

### 常见做法
- 生产端按业务键路由到同一队列/分区
- 消费端对该队列/分区串行消费
- 必要时业务侧再做版本号或状态校验

### 为什么不追求全局顺序
因为全局顺序通常意味着吞吐明显下降，扩展性也会变差。`,
    analogy: '像同一个用户的工单始终交给同一条处理线，保证这条线内部顺序，但不强求全公司所有工单都按一个总顺序排。',
    importance: 'high',
  },
  {
    id: 'mq-sys-4',
    question: '重试队列、死信队列在消息治理里各自是什么角色？',
    answer: `### 重试队列
- 给临时失败的消息一个再次处理机会
- 常见做法是按不同延迟级别逐步重试

### 死信队列
- 多次重试仍失败后，把消息转移出去
- 避免坏消息一直阻塞主流程

### 面试重点
重试解决“暂时失败”
死信解决“长期失败或脏数据”

### 工程建议
- 死信队列一定要能被监控和人工处理
- 否则只是把问题换了个地方堆着`,
    analogy: '重试队列像复检窗口，死信队列像疑难件暂存区。',
    importance: 'medium',
  },
  {
    id: 'mq-sys-5',
    question: '如果 MQ 大面积积压，排查时先看什么？',
    answer: `### 先判断是哪里慢
1. 生产速度突然增大
2. 消费能力下降
3. 某个下游依赖变慢
4. 消费逻辑异常重试导致堆积

### 常见检查项
- 消费组 lag
- 消费失败率
- 单条处理耗时
- 下游数据库/接口是否超时
- 是否发生 rebalance、锁竞争、线程池打满

### 处理思路
- 临时扩容消费者
- 优化消费逻辑
- 降级非核心处理
- 必要时按优先级分流消息`,
    analogy: '像仓库爆仓时，先确认是货突然进太多，还是卸货口堵了，还是后面运输车不来了。',
    importance: 'high',
  },
];

export const DISTRIBUTED_SYSTEMATIC_POINTS: InterviewPoint[] = [
  {
    id: 'dist-sys-1',
    question: '注册中心和配置中心分别解决什么问题？为什么经常一起出现？',
    answer: `### 注册中心
- 解决服务地址发现问题
- 谁上线了、谁下线了、该请求谁

### 配置中心
- 解决配置统一管理和动态变更问题
- 比如数据库地址、开关、限流阈值

### 为什么经常一起出现
微服务系统既要知道“服务在哪”，也要知道“参数怎么配”，所以这两类能力经常同平台承载。`,
    analogy: '注册中心像公司通讯录，配置中心像公司统一制度和参数公告栏。',
    importance: 'medium',
  },
  {
    id: 'dist-sys-2',
    question: '为什么很多分布式系统都要单独设计幂等性？',
    answer: `因为在分布式环境里，重复请求和重复消费是常态，不是例外。

### 典型来源
- 网络重试
- MQ 重复投递
- 前端重复提交
- 服务超时后上游再次调用

### 常见实现
- 唯一业务单号
- 数据库唯一约束
- 幂等表 / 去重表
- 状态机校验
- Redis 去重键

### 面试建议
幂等性的本质是：同一业务请求执行多次，结果仍然和执行一次一致。`,
    analogy: '像银行转账单据，不管提交几次，同一流水号的操作都只能真正生效一次。',
    importance: 'high',
  },
  {
    id: 'dist-sys-3',
    question: '常见分布式 ID 方案有哪些？怎么选？',
    answer: `### 数据库自增
- 简单
- 但扩展性一般，跨库麻烦

### UUID
- 全局唯一方便
- 但太长、无序，不利于索引

### Redis/Incr
- 实现简单
- 依赖中心节点可用性

### 雪花算法
- 常见于分布式系统
- 通常由时间戳 + 机器号 + 序列号组成
- 有趋势递增特性

### 面试建议
答题时从“唯一性、趋势有序、性能、可扩展性、是否依赖中心节点”几个维度讲。`,
    analogy: '分布式 ID 像给全国快递包裹编号，既要保证不撞号，还最好能大致按时间顺序排。',
    importance: 'medium',
  },
  {
    id: 'dist-sys-4',
    question: '限流、熔断、降级三者怎么区分？',
    answer: `### 限流
- 入口就控制流量
- 防止系统被打爆

### 熔断
- 当下游持续失败时，先快速失败，避免把调用链全部拖死

### 降级
- 在系统压力大或依赖异常时，主动关闭非核心功能，保住主流程

### 面试一句话总结
- 限流防过载
- 熔断防扩散
- 降级保核心`,
    analogy: '限流像商场门口限流，熔断像发现电梯故障后先停运，降级像高峰期先关闭部分非核心服务窗口。',
    importance: 'high',
  },
  {
    id: 'dist-sys-5',
    question: '高并发下库存扣减和缓存一致性为什么难？面试里怎么答？',
    answer: `### 库存扣减难点
- 高并发下容易超卖
- 数据库行锁可能成为瓶颈
- 下单、支付、取消之间状态复杂

### 常见做法
- 预扣库存
- 数据库乐观锁 / 版本号
- Redis 预减 + 异步落库
- MQ 串行化部分流程

### 缓存一致性难点
- 读写并发
- 删除缓存与写库时序问题
- 热点 key 失效瞬间冲击数据库

### 面试建议
要承认它不是单点技术题，而是“并发控制 + 一致性 + 业务状态机”的综合题。`,
    analogy: '像演唱会抢票，既要防止同一张票卖给两个人，又要确保前台显示和后台库存别长期对不上。',
    importance: 'high',
  },
];

export const LINUX_COMMAND_SUPPLEMENTS: Command[] = [
  {
    id: 'linux-ss',
    command: 'ss',
    description: '查看端口监听和连接状态',
    category: 'network',
    example: 'ss -lntp | grep 8080',
    explanation: '`-l` 表示 listening，只看监听端口；`-n` 表示数字格式显示，不做域名解析；`-t` 表示 TCP；`-p` 显示进程信息。排查“服务起了但访问不到”“端口是否真的监听”时非常高频。',
  },
  {
    id: 'linux-lsof',
    command: 'lsof',
    description: '查看文件或端口被哪个进程占用',
    category: 'system',
    example: 'lsof -i :8080',
    explanation: '`-i :8080` 表示查看占用 8080 端口的进程。它非常适合排查“端口被谁占了”“日志文件被哪个进程持有”。',
  },
  {
    id: 'linux-free',
    command: 'free',
    description: '查看内存使用情况',
    category: 'system',
    example: 'free -h',
    explanation: '`-h` 以易读单位显示。面试里不要只看 used，要结合 buff/cache 和 available 一起判断是不是“真缺内存”。',
  },
  {
    id: 'linux-vmstat',
    command: 'vmstat',
    description: '查看系统运行、内存和上下文切换状态',
    category: 'system',
    example: 'vmstat 1 5',
    explanation: '`vmstat 1 5` 表示每 1 秒采样一次，共看 5 次。适合快速判断 CPU、上下文切换、swap、阻塞队列是否异常。',
  },
  {
    id: 'linux-iostat',
    command: 'iostat',
    description: '查看磁盘 IO 负载情况',
    category: 'system',
    example: 'iostat -x 1 5',
    explanation: '`-x` 看扩展统计，适合排查磁盘 IO 高、await 高、util 高这类问题。面试里常和磁盘满、磁盘慢一起问。',
  },
  {
    id: 'linux-journalctl',
    command: 'journalctl',
    description: '查看 systemd 服务日志',
    category: 'log',
    example: 'journalctl -u nginx -n 100 --no-pager',
    explanation: '`-u` 指定服务单元，`-n 100` 查看最近 100 行，`--no-pager` 直接输出不翻页。排查 systemd 管理的服务启动失败时很常见。',
  },
];

export const DOCKER_COMMAND_SUPPLEMENTS: Command[] = [
  {
    id: 'docker-top',
    command: 'docker top',
    description: '查看容器内进程',
    category: 'container',
    example: 'docker top web',
    explanation: '适合确认容器里主进程到底是什么，以及是否真的在跑应用进程。排查“容器起了但服务不工作”时很有用。',
  },
  {
    id: 'docker-events',
    command: 'docker events',
    description: '实时查看 Docker 事件流',
    category: 'monitor',
    example: 'docker events',
    explanation: '可以看到容器启动、停止、重启、网络变化等事件。适合排查容器反复重启或被外部系统拉起/停止的问题。',
  },
  {
    id: 'docker-df',
    command: 'docker system df',
    description: '查看 Docker 资源占用',
    category: 'cleanup',
    example: 'docker system df',
    explanation: '快速看镜像、容器、卷和构建缓存各占了多少空间，是排查 Docker 磁盘膨胀的第一步。',
  },
  {
    id: 'docker-history',
    command: 'docker history',
    description: '查看镜像分层历史',
    category: 'image',
    example: 'docker history my-app:1.0',
    explanation: '适合分析镜像为什么这么大、哪一层变胖了。面试里讲 Dockerfile 优化时很适合提到它。',
  },
  {
    id: 'docker-login',
    command: 'docker login',
    description: '登录镜像仓库',
    category: 'image',
    example: 'docker login registry.example.com',
    explanation: '推送私有仓库前的基础动作。面试里常顺带问镜像仓库鉴权、CI/CD 推送流程。',
  },
];

export const LINUX_DOC_SUPPLEMENTS = [
  {
    title: 'Linux 服务启动失败的完整排查链路',
    content: `
这类题目非常高频，回答时最重要的是顺序感。

### 建议的排查顺序
1. 先确认服务进程是否存在
2. 再确认端口是否真的监听
3. 再看本机访问是否正常
4. 然后看防火墙、代理、负载均衡
5. 最后再回到配置和依赖服务问题

### 常见命令
\`\`\`bash
ps -ef | grep nginx
ss -lntp | grep 8080
curl -I http://127.0.0.1:8080
journalctl -u nginx -n 100 --no-pager
\`\`\`

### 面试里可以顺手补充
- 如果是 Java 服务，还要看 JVM 参数和启动日志
- 如果是 systemd 服务，优先用 \`journalctl\` 看服务日志
- 如果本机能通、外部不能通，优先怀疑端口暴露、防火墙、网关或代理链路
    `,
  },
  {
    title: 'CPU 飙高、内存打满、磁盘爆满怎么答',
    content: `
### CPU 飙高
- 先看 \`top\` / \`pidstat\` 找高 CPU 进程
- 再定位线程或具体热点逻辑

### 内存打满
- 先看 \`free -h\`、\`top\`
- 不要只看 used，要一起看 available 和 buff/cache
- 再判断是业务进程泄漏、缓存占用还是系统页缓存

### 磁盘爆满
- 先 \`df -h\` 确认哪个分区满
- 再 \`du -sh\` 逐层往下找
- 如果是 Docker 或日志，要特别看容器日志、镜像层和历史包

### 面试表达建议
不要把命令堆出来就结束，最好补一句“先全局、再局部、最后定点处理”。`,
  },
  {
    title: '日志排查、grep/awk/sed 参数应该怎么讲',
    content: `
### 常见日志排查动作
\`\`\`bash
tail -n 200 app.log
tail -f app.log
grep -n "ERROR" app.log
awk '{print $1, $2, $NF}' app.log
sed -n '1,20p' app.log
\`\`\`

### 参数解释
- \`tail -n 200\`：看最后 200 行
- \`tail -f\`：持续追踪追加日志
- \`grep -n\`：显示匹配行和行号
- \`grep -i\`：忽略大小写
- \`grep -r\`：递归目录搜索
- \`sed -n '1,20p'\`：只打印第 1 到 20 行

### 面试官真正想听什么
- 你知道先看最近错误
- 你知道怎么快速过滤关键字段
- 你知道如何把日志现象和服务故障对应起来`,
  },
  {
    title: 'systemctl、journalctl、crontab 这类服务管理题怎么答',
    content: `
### systemctl
- 管 systemd 服务状态
- 常见动作：start、stop、restart、status、enable

### journalctl
- 看 systemd 服务日志
- 很适合排查服务启动失败、重启失败

### crontab
- 管定时任务
- 高频追问是：为什么定时任务里执行结果和手工执行不一样

### 常见原因
- PATH 环境不同
- 工作目录不同
- 权限用户不同
- 输出被重定向了，误以为没执行

### 面试建议
讲这类题时，不要只背命令，最好补一个真实故障场景。`,
  },
];

export const DOCKER_DOC_SUPPLEMENTS = [
  {
    title: '容器启动后马上退出，排查时先看什么',
    content: `
### 第一原则
容器是否存活，取决于主进程是否还在。

### 常见排查顺序
1. \`docker ps -a\` 看退出状态码
2. \`docker logs\` 看容器标准输出
3. \`docker inspect\` 看启动命令、环境变量、挂载和端口
4. \`docker top\` 或进入容器确认真实进程

### 高频原因
- CMD / ENTRYPOINT 写错
- 启动脚本执行完就退出
- 依赖配置缺失
- 端口、挂载、权限问题
- 应用本身启动失败

### 面试补充
容器不是虚拟机，主进程没了，容器通常就结束了。`,
  },
  {
    title: 'Docker 网络、端口映射和容器互通怎么讲',
    content: `
### 常见网络模式
- bridge：默认模式，最常见
- host：直接使用宿主机网络栈
- none：不给网络

### 端口映射
\`\`\`bash
docker run -p 8080:80 nginx
\`\`\`
- 左边是宿主机端口
- 右边是容器端口

### 容器互通
- 同一自定义 bridge 网络里的容器通常可以直接按容器名访问
- Compose 场景里服务名本身就常被当作内网 DNS 名称

### 面试常见追问
- 为什么宿主机能通，容器里不通
- 为什么容器间访问失败
- 为什么映射了端口外部还是访问不到`,
  },
  {
    title: 'Volume 和 bind mount 有什么区别',
    content: `
### bind mount
- 直接把宿主机目录挂到容器里
- 灵活，但更依赖宿主机路径结构

### volume
- 由 Docker 管理的数据卷
- 更适合长期持久化和标准化管理

### 什么时候用哪个
- 本地开发、调试配置、挂源码：常用 bind mount
- 数据库数据、长期持久化：更推荐 volume

### 面试补充
如果只答“一个挂目录一个挂卷”，其实太浅，最好再补一句“谁更适合开发、谁更适合长期持久化”。`,
  },
  {
    title: '镜像体积过大时，Dockerfile 应该怎么优化',
    content: `
### 典型优化思路
1. 选更小的基础镜像
2. 使用多阶段构建
3. 合理利用缓存层
4. 用 \`.dockerignore\` 排除无关文件
5. 不把构建工具、源码、临时文件带进最终运行镜像

### 常见坏味道
- 把整个项目目录一股脑 COPY 进去
- Maven/Node 构建缓存和源码都留在最终镜像
- 一个 RUN 一层，但层里内容又很杂乱

### 面试总结句
镜像优化不只是为了“省空间”，还关系到构建速度、传输成本和发布效率。`,
  },
  {
    title: 'Docker 在线上排障时的常见问题清单',
    content: `
### 常见问题
- 容器起不来
- 日志没有输出
- 端口映射不对
- 配置文件没生效
- 容器时间和宿主机不一致
- 卷挂载后权限异常
- 镜像太大拉取太慢
- Docker 日志和镜像层把磁盘写满

### 建议排查动作
\`\`\`bash
docker ps -a
docker logs --tail=200 app
docker inspect app
docker exec -it app /bin/sh
docker system df
\`\`\`

### 面试建议
Docker 排障题不需要炫命令，关键是把“容器、日志、网络、挂载、资源”这几条主线讲清楚。`,
  },
];

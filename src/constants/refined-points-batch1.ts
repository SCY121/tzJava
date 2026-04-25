import { InterviewPoint } from './command-types';

export const JAVA_REFINED_POINTS: InterviewPoint[] = [
  {
    id: 'java-refined-1',
    question: '面向对象的三大特性是什么？重写和重载有什么区别？',
    answer: `### 面向对象的三大特性
1. 封装
   - 把属性和方法封装到类里
   - 对外暴露必要能力，隐藏内部实现细节
   - 目的是真正做到“高内聚、低耦合”

2. 继承
   - 子类可以复用父类已有属性和方法
   - 能建立清晰的层次结构，减少重复代码
   - 但继承不是越多越好，继承过深会让代码难维护

3. 多态
   - 同一个父类引用，可以指向不同子类对象
   - 调用同名方法时，实际执行哪个实现，要看对象的真实类型
   - 这是面试里最常追问的点

### 重写和重载的区别
1. 重写 Override
   - 发生在父子类之间
   - 方法名、参数列表必须相同
   - 运行时决定执行哪个实现，体现的是运行时多态

2. 重载 Overload
   - 发生在同一个类中，也可以在父子类中形成重载
   - 方法名相同，但参数列表不同
   - 编译期就能确定调用哪个方法，体现的是编译时多态

### 面试回答重点
如果面试官问“多态怎么实现”，核心就答两点：
1. 编译看左边，运行看右边
2. 重写体现运行时多态，重载不是运行时多态`,
    analogy: '封装像把机器外壳盖起来，只暴露按钮；继承像子型号复用母型号底盘；多态像同一个遥控器，接到不同设备上执行不同动作。',
    importance: 'high',
  },
  {
    id: 'java-refined-2',
    question: 'Java 的 8 种基本数据类型和包装类有哪些？什么是自动装箱拆箱？',
    answer: `### 8 种基本数据类型
1. 整数型
   - byte
   - short
   - int
   - long

2. 浮点型
   - float
   - double

3. 字符型
   - char

4. 布尔型
   - boolean

### 对应包装类
1. byte -> Byte
2. short -> Short
3. int -> Integer
4. long -> Long
5. float -> Float
6. double -> Double
7. char -> Character
8. boolean -> Boolean

### 什么是自动装箱和拆箱
1. 自动装箱
   - 基本类型自动转成包装类
   - 例如：\`Integer x = 10;\`

2. 自动拆箱
   - 包装类自动转成基本类型
   - 例如：\`int y = x;\`

### 面试常见追问
1. 为什么包装类会有缓存
   - 例如 \`Integer.valueOf()\` 对 \`-128 ~ 127\` 做了缓存
   - 目的是减少频繁创建对象的开销

2. 为什么比较包装类要小心
   - \`==\` 比较的是引用
   - 有缓存时看起来可能“碰巧相等”，超出缓存范围就不一定了

### 一句话总结
基本类型更轻量，包装类更适合泛型、集合和框架场景，但要注意装箱拆箱和缓存带来的细节问题。`,
    analogy: '基本类型像直接写在纸上的数字，包装类像给这个数字套了一层对象外壳，方便放进集合和框架里传递。',
    importance: 'high',
  },
  {
    id: 'java-refined-3',
    question: 'String、StringBuilder、StringBuffer 有什么区别？',
    answer: `### 先说结论
1. String 不可变
2. StringBuilder 可变，线程不安全，但性能更好
3. StringBuffer 可变，线程安全，但性能相对低一些

### 为什么 String 不可变
1. 底层字符内容创建后不能修改
2. 这样可以支持字符串常量池复用
3. 也更适合作为 HashMap 的 key
4. 线程安全性更自然，不需要额外同步

### StringBuilder 和 StringBuffer 的区别
1. 二者都是可变字符序列
2. StringBuffer 的方法大多带同步控制
3. StringBuilder 没有同步开销，所以拼接性能更高

### 怎么选
1. 单线程大量字符串拼接
   - 优先用 StringBuilder

2. 多线程共享同一个可变字符串对象
   - 才考虑 StringBuffer

3. 少量拼接或固定文本
   - 直接用 String 即可

### 面试回答重点
不要只背“线程安全不安全”。
真正要讲清楚的是：
1. 可变性
2. 线程安全
3. 性能差异产生的原因`,
    analogy: 'String 像印好的标签纸，内容不能改；StringBuilder 像白板，改起来快；StringBuffer 像带锁的白板，安全但慢一点。',
    importance: 'high',
  },
  {
    id: 'java-refined-4',
    question: 'Java 集合框架中 List、Set、Map 的区别是什么？常见实现类有哪些？',
    answer: `### 三大接口的核心区别
1. List
   - 有序
   - 可重复
   - 按下标访问

2. Set
   - 不允许重复
   - 一般不强调按下标访问

3. Map
   - 存储 key-value
   - key 不能重复，value 可以重复

### 常见实现类
1. List
   - ArrayList：底层动态数组，查询快，尾插快，中间插入删除慢
   - LinkedList：底层双向链表，插入删除方便，但随机访问慢

2. Set
   - HashSet：底层基于 HashMap，去重快
   - LinkedHashSet：保留插入顺序
   - TreeSet：自动排序

3. Map
   - HashMap：最常用，查找性能高
   - LinkedHashMap：保留插入顺序或访问顺序
   - TreeMap：按 key 排序
   - ConcurrentHashMap：并发安全场景常用

### 面试怎么答更完整
1. 先讲语义差异
2. 再讲底层结构
3. 最后讲使用场景

### 场景举例
1. 需要保序且允许重复，用 List
2. 需要去重，用 Set
3. 需要按键查值，用 Map`,
    analogy: 'List 像排队名单，Set 像不允许重复报名的花名册，Map 像通讯录，通过名字找电话号码。',
    importance: 'high',
  },
  {
    id: 'java-refined-5',
    question: 'HashMap 的底层原理是什么？put 和 get 的流程是怎样的？',
    answer: `### 底层数据结构
1. JDK 1.8 里，HashMap 底层是“数组 + 链表 + 红黑树”
2. 大多数情况下先定位到数组桶
3. 桶里发生哈希冲突时，先挂链表
4. 冲突严重时再转成红黑树

### put 流程
1. 先对 key 计算 hash
2. 根据 hash 定位桶下标
3. 如果桶为空，直接放进去
4. 如果桶不为空，判断是否是同一个 key
   - 是，则覆盖 value
   - 否，则挂到链表尾部或插入树结构
5. 插入后判断是否需要扩容

### get 流程
1. 先算 key 的 hash
2. 定位到对应桶
3. 先比较桶头节点
4. 如果不是目标，再沿链表或红黑树继续查找

### 为什么会扩容
1. HashMap 默认负载因子是 0.75
2. 当元素个数超过阈值时会扩容
3. 扩容本质是新建更大数组，再重新分布元素

### 线程安全问题
1. HashMap 本身不是线程安全的
2. 并发修改可能出现数据覆盖、链表结构异常等问题
3. 并发场景优先考虑 ConcurrentHashMap

### 面试回答重点
这题要把“结构、冲突、扩容、线程安全”四个点讲全，才算完整。`,
    analogy: 'HashMap 像把快递按柜门编号分桶存放，算出编号就先找柜门；同一个柜门东西太多时，先串起来，太多再改成更高效的树形整理。',
    importance: 'high',
  },
  {
    id: 'java-refined-6',
    question: 'Java 的异常体系是怎样的？检查型异常和非检查型异常有什么区别？',
    answer: `### 异常体系
1. 最顶层是 Throwable
2. Throwable 下分两大类：
   - Error
   - Exception

### Error
1. 一般表示 JVM 或系统级严重问题
2. 例如内存溢出、栈溢出
3. 通常业务代码不应该主动处理

### Exception
1. 表示程序运行过程中出现的异常情况
2. 又分为：
   - 检查型异常 Checked Exception
   - 非检查型异常 Unchecked Exception

### 检查型异常
1. 编译器强制要求处理
2. 要么 try-catch，要么 throws
3. 常见如 IOException、SQLException

### 非检查型异常
1. 编译器不强制处理
2. 通常继承 RuntimeException
3. 常见如 NullPointerException、IndexOutOfBoundsException

### 面试怎么答更好
1. 先讲体系
2. 再讲 checked 和 unchecked 的区别
3. 最后补一句：业务里不要滥用 Exception 兜底，要按语义分类处理

### 实战建议
1. 可恢复异常，尽量显式处理
2. 编程错误类异常，优先修代码而不是强行吞掉`,
    analogy: 'Error 像整栋楼断电，普通住户基本处理不了；Exception 更像某个房间出故障，可以定位和处理。',
    importance: 'high',
  },
  {
    id: 'java-refined-7',
    question: '抽象类和接口的区别？什么时候使用抽象类，什么时候使用接口？',
    answer: `### 核心区别
1. 抽象类更强调“公共骨架”
2. 接口更强调“能力约定”

### 抽象类适合什么场景
1. 多个子类之间有明显共性
2. 需要抽取公共状态和公共实现
3. 希望在父类里统一定义一部分模板逻辑

### 接口适合什么场景
1. 只想定义行为规范，不关心具体状态
2. 需要低耦合扩展
3. 一个类可能同时具备多种能力

### Java 8 之后为什么接口更常用
1. 接口支持 default 方法
2. 接口支持 static 方法
3. 很多场景下既能保留扩展性，又能减少继承层级

### 面试回答模板
1. 需要共享状态和模板实现，用抽象类
2. 只定义能力边界、追求解耦扩展，用接口
3. 在现代 Java 设计里，接口通常更符合组合优于继承的思路`,
    analogy: '抽象类像公司统一岗位规范和公共流程，接口像行业资格认证，谁满足约定就能接入。',
    importance: 'high',
  },
  {
    id: 'java-refined-8',
    question: '== 和 equals() 有什么区别？hashCode() 和 equals() 又是什么关系？',
    answer: `### == 和 equals() 的区别
1. \`==\`
   - 基本类型比较值
   - 引用类型比较地址

2. \`equals()\`
   - 默认还是比较地址
   - 很多类会重写成“比较内容”

### hashCode() 和 equals() 的关系
1. 如果两个对象 \`equals()\` 为 true
   - 它们的 \`hashCode()\` 必须相同

2. 如果两个对象 \`hashCode()\` 相同
   - 它们的 \`equals()\` 不一定为 true

### 为什么要一起重写
1. 因为 HashMap、HashSet 这类容器先看 hashCode
2. 再在可能冲突的范围内用 equals 判断是否相等
3. 只重写 equals 不重写 hashCode，集合行为就会出问题

### 面试高频追问
1. 为什么逻辑相等的对象放进 HashSet 还能出现两份
   - 因为 hashCode 没按规则重写

2. String 为什么适合作为 HashMap key
   - 不可变
   - hashCode 稳定

### 一句话总结
\`hashCode()\` 负责缩小查找范围，\`equals()\` 负责最终判等。`,
    analogy: 'hashCode 像先按楼层分区，equals 像进门后核对身份证，前者做粗筛，后者做最终确认。',
    importance: 'high',
  },
  {
    id: 'java-refined-9',
    question: '什么是序列化和反序列化？常见方案怎么选？',
    answer: `### 什么是序列化
1. 把内存中的对象转换成可传输、可存储的格式
2. 常见用途：
   - 网络传输
   - 缓存存储
   - 持久化落盘

### 什么是反序列化
1. 把字节流或文本内容还原成对象

### 常见方案
1. Java 原生序列化
   - 使用方便
   - 但性能一般，可读性差，跨语言能力差

2. JSON
   - 可读性好
   - 跨语言友好
   - Web 场景很常用

3. Protobuf / Kryo 等二进制方案
   - 更节省体积
   - 性能更好
   - 更适合高性能服务通信

### 怎么选
1. 前后端接口、开放场景
   - 多用 JSON

2. 微服务内部高性能通信
   - 可考虑 Protobuf 等二进制协议

3. 纯 Java 内部且追求简单
   - 可以了解原生序列化，但生产上通常不优先推荐

### 面试回答重点
不要只定义概念，要补“为什么现在很多系统不推荐 Java 原生序列化”。`,
    analogy: '序列化像把办公室里的立体物品打包成标准运输箱，反序列化就是到目的地再拆箱还原。',
    importance: 'medium',
  },
  {
    id: 'java-refined-10',
    question: 'Java 应用性能排查一般从哪里开始？',
    answer: `### 排查顺序不要乱
性能排查最怕一上来就猜。建议按“现象 -> 指标 -> 定位 -> 根因”走。

### 第一步：先看现象
1. 是响应慢
2. 还是吞吐下降
3. 还是偶发超时
4. 还是 CPU、内存、GC 异常

### 第二步：先看基础指标
1. CPU 使用率
2. 内存占用
3. GC 次数和停顿时间
4. 线程数和线程状态
5. 接口 RT、QPS、错误率

### 第三步：再看 Java 侧重点
1. 线程栈
   - 看是否有锁竞争、死循环、阻塞

2. GC 日志和堆情况
   - 看是否频繁 Young GC / Full GC

3. 热点方法
   - 看是否存在慢 SQL、远程调用慢、热点代码异常耗时

### 常用工具
1. top / vmstat / iostat
2. jps / jstack / jmap / jstat
3. Arthas
4. APM 和业务监控平台

### 面试回答模板
我一般会先确认是系统资源问题、JVM 问题还是业务链路问题，再结合线程、GC、SQL 和外部依赖逐层缩小范围。`,
    analogy: '性能排查像查交通堵点，先看是整座城拥堵、某条主路堵，还是某个路口事故，不能一开始就盯着某一辆车。',
    importance: 'medium',
  },
];

export const JUC_REFINED_POINTS: InterviewPoint[] = [
  {
    id: 'juc-refined-1',
    question: 'volatile 关键字的作用是什么？',
    answer: `### volatile 的两个核心作用
1. 保证可见性
   - 一个线程修改变量后，其他线程能尽快看到最新值

2. 禁止指令重排
   - 在特定场景下保证代码执行顺序符合预期

### 它不能保证什么
1. 不能保证复合操作的原子性
2. 比如 \`i++\` 仍然不是线程安全的

### 适用场景
1. 状态标记位
2. 双重检查单例里的实例引用
3. 一个线程写、多个线程读的简单共享变量

### 面试常见追问
如果既要可见性又要原子性怎么办？
1. 用 synchronized
2. 或者用 Lock
3. 或者用 Atomic 类`,
    analogy: 'volatile 像在公告栏贴最新通知，所有人都看同一块板，但它不负责保证两个人不会同时改同一份表格。',
    importance: 'high',
  },
  {
    id: 'juc-refined-2',
    question: '谈谈你对 AQS 的理解？',
    answer: `### AQS 是什么
1. AQS 全称是 AbstractQueuedSynchronizer
2. 它是 Java 并发包里很多同步器的基础框架
3. 例如 ReentrantLock、CountDownLatch、Semaphore 都基于它实现

### 核心思想
1. 用一个 state 变量表示同步状态
2. 竞争失败的线程进入等待队列
3. 当前线程释放资源后，再唤醒后继节点继续竞争

### 你要记住的三个点
1. state
   - 表示锁状态或资源状态

2. CLH 风格双向队列
   - 用来维护等待线程

3. 模板方法
   - 子类只需要实现 tryAcquire、tryRelease 等关键逻辑

### 面试回答重点
不要把 AQS 说成“就是队列”。
更准确的说法是：
它是“state + 等待队列 + CAS + 模板方法”组合起来的一套同步器骨架。`,
    analogy: 'AQS 像一个通用闸机系统，state 决定闸门状态，队列维护排队人群，具体规则由不同业务自己定。',
    importance: 'high',
  },
  {
    id: 'juc-refined-3',
    question: '线程池的核心参数有哪些？',
    answer: `### ThreadPoolExecutor 七大核心参数
1. corePoolSize
   - 核心线程数

2. maximumPoolSize
   - 最大线程数

3. keepAliveTime
   - 非核心线程空闲存活时间

4. unit
   - keepAliveTime 的时间单位

5. workQueue
   - 任务队列

6. threadFactory
   - 线程工厂，用来自定义线程名等信息

7. handler
   - 拒绝策略

### 面试里重点讲哪几个
1. corePoolSize
2. maximumPoolSize
3. workQueue
4. handler

### 为什么这四个最重要
因为它们决定了线程池在高并发下是：
1. 扩线程
2. 排队
3. 还是拒绝任务`,
    analogy: '线程池像一个工位系统，核心线程是常驻工位，最大线程是临时加开的工位，队列是等候区，拒绝策略是人满之后怎么处理。',
    importance: 'high',
  },
  {
    id: 'juc-refined-4',
    question: '线程池的工作原理（执行流程）是怎样的？',
    answer: `### 提交任务后的典型流程
1. 如果当前线程数小于 corePoolSize
   - 直接创建核心线程执行任务

2. 如果核心线程已满
   - 尝试把任务放入阻塞队列

3. 如果队列也满了，但线程数还没到 maximumPoolSize
   - 创建非核心线程处理任务

4. 如果线程数已经达到 maximumPoolSize，队列也满
   - 执行拒绝策略

### 线程回收
1. 非核心线程空闲超过 keepAliveTime 会被回收
2. 核心线程默认不回收，但可以配置允许超时

### 面试回答重点
这题一定要按顺序答：
先看核心线程，再看队列，再看最大线程，最后看拒绝策略。`,
    analogy: '像餐厅接客：先安排固定服务员，忙不过来先让客人排队，排队区满了再加临时服务员，再满就只能拒绝接单。',
    importance: 'high',
  },
  {
    id: 'juc-refined-5',
    question: 'synchronized 和 ReentrantLock 有什么区别？',
    answer: `### 共同点
1. 都能实现互斥同步
2. 都可保证临界区线程安全

### synchronized 的特点
1. Java 内置关键字
2. 使用简单
3. JVM 层面实现
4. 自动加锁和释放锁

### ReentrantLock 的特点
1. 属于显式锁
2. 需要手动 lock / unlock
3. 支持可中断获取锁
4. 支持超时获取锁
5. 支持公平锁
6. 支持多个 Condition

### 怎么选
1. 逻辑简单、同步块清晰
   - 优先 synchronized

2. 需要更灵活的并发控制
   - 选 ReentrantLock

### 面试回答重点
不要停留在“一个是关键字，一个是类”。
真正差异在：
1. 可中断
2. 可超时
3. 公平锁
4. 多条件队列`,
    analogy: 'synchronized 像自动门锁，关门就锁；ReentrantLock 像高级门禁系统，可以设置公平排队、超时、条件唤醒。',
    importance: 'high',
  },
  {
    id: 'juc-refined-6',
    question: 'sleep() 和 wait() 的区别是什么？',
    answer: `### 先说本质区别
1. sleep 是 Thread 的静态方法
2. wait 是 Object 的方法

### 行为区别
1. sleep
   - 让当前线程休眠指定时间
   - 不会释放锁

2. wait
   - 让线程进入等待状态
   - 会释放当前持有的对象锁
   - 必须在 synchronized 代码块中调用

### 唤醒方式
1. sleep
   - 时间到了自动恢复

2. wait
   - 需要 notify / notifyAll 唤醒
   - 或者超时自动结束等待

### 面试回答模板
sleep 是“抱着锁睡觉”，wait 是“把锁交出来后等通知”。`,
    analogy: 'sleep 像人在会议室里打盹但还占着房间；wait 像先把会议室让出来，等别人叫你再回来。',
    importance: 'high',
  },
  {
    id: 'juc-refined-7',
    question: '谈谈你对 ThreadLocal 的理解？',
    answer: `### ThreadLocal 是什么
1. ThreadLocal 不是用来解决共享问题的
2. 它是给每个线程单独保存一份变量副本

### 典型场景
1. 保存用户上下文
2. 保存 traceId
3. 保存数据库连接或事务上下文

### 实现思路
1. 每个 Thread 对象内部有一个 ThreadLocalMap
2. ThreadLocal 作为 key
3. 实际值作为 value
4. 所以本质是“变量存在线程对象里”

### 常见风险
1. 线程池复用线程时，如果不 remove，旧数据可能串线程
2. key 是弱引用，value 可能残留，导致内存泄漏风险

### 正确使用建议
1. 用完及时 remove
2. 尤其在线程池场景必须养成清理习惯`,
    analogy: 'ThreadLocal 像给每个员工一个独立抽屉，同名资料放进去互不干扰，但下班前要记得清空抽屉。',
    importance: 'high',
  },
  {
    id: 'juc-refined-8',
    question: '什么是 CAS (Compare And Swap)？',
    answer: `### CAS 是什么
1. Compare And Swap，比较并交换
2. 是一种无锁并发的核心原子操作

### 工作过程
1. 先拿到内存中的旧值
2. 比较这个值是否还是预期值
3. 如果是，就更新成新值
4. 如果不是，说明被别人改过，当前操作失败，再重试

### 优点
1. 不需要加重量级锁
2. 在低冲突场景性能很好

### 缺点
1. 自旋会消耗 CPU
2. 只能保证单个变量的原子操作
3. 存在 ABA 问题

### ABA 怎么理解
1. 一个值从 A 变成 B
2. 又从 B 变回 A
3. CAS 看起来没变，其实中间已经被改过

### 常见解决思路
1. 加版本号
2. 使用 AtomicStampedReference`,
    analogy: 'CAS 像你去改公告：先确认公告还是你刚才看到的那版，如果没变就贴新稿，变了就说明别人先改了。',
    importance: 'high',
  },
  {
    id: 'juc-refined-9',
    question: 'CyclicBarrier 和 CountDownLatch 的区别？',
    answer: `### CountDownLatch
1. 更像倒计时门闩
2. 一个或多个线程等待其他线程完成
3. 计数减到 0 后，等待线程继续执行
4. 不能重复使用

### CyclicBarrier
1. 更像栅栏
2. 多个线程互相等待，等所有人都到齐再一起继续
3. 可以循环复用

### 场景区别
1. CountDownLatch
   - 主线程等多个子任务完成

2. CyclicBarrier
   - 多个线程分阶段协同执行

### 面试回答重点
CountDownLatch 强调“一个等多个”。
CyclicBarrier 强调“多个互等，齐了再走”。`,
    analogy: 'CountDownLatch 像老板等员工干完活再开会；CyclicBarrier 像团队闯关，所有人到集合点后才能进入下一关。',
    importance: 'high',
  },
  {
    id: 'juc-refined-10',
    question: 'CompletableFuture 的作用是什么？如何使用？',
    answer: `### 作用
1. 用来编排异步任务
2. 支持任务串联、任务组合、异常处理
3. 比传统 Future 更适合表达复杂异步流程

### 常用能力
1. thenApply
   - 上一步结果加工后传给下一步

2. thenCompose
   - 异步任务串联

3. thenCombine
   - 两个异步任务结果合并

4. allOf / anyOf
   - 等多个任务全部完成，或任一完成

5. exceptionally / handle
   - 异常处理

### 面试如何回答
1. 它不是单纯“异步提交任务”
2. 它更大的价值在于“声明式编排异步流程”

### 使用建议
1. 尽量显式指定线程池
2. 不要把复杂业务链写成一串难维护的回调链`,
    analogy: 'CompletableFuture 像一个异步流程编排器，不只是把任务丢出去跑，而是把“谁先做、谁后做、失败怎么办”都串起来。',
    importance: 'high',
  },
  {
    id: 'juc-refined-11',
    question: '多线程之间常见的通信方式有哪些？',
    answer: `### 常见通信方式
1. wait / notify / notifyAll
   - 基于对象监视器

2. Condition
   - 配合 Lock 使用
   - 比 wait / notify 更灵活

3. volatile
   - 适合简单状态通知

4. CountDownLatch / CyclicBarrier / Semaphore
   - 适合线程协同控制

5. BlockingQueue
   - 生产者消费者模型很常用

6. ThreadLocal
   - 严格来说更偏线程隔离，不是传统共享通信

### 面试回答建议
先按“低级到高级”来答：
1. 基础同步原语
2. JUC 工具类
3. 阻塞队列这类高层抽象

### 实战里最常见的
1. 阻塞队列
2. 线程池
3. CompletableFuture
4. 各类并发同步器`,
    analogy: '多线程通信就像多人协作，有的靠喊话通知，有的靠等红绿灯，有的靠共享队列传材料。',
    importance: 'medium',
  },
  {
    id: 'juc-refined-12',
    question: '什么是虚拟线程？它适合什么场景？',
    answer: `### 什么是虚拟线程
1. 虚拟线程是 JDK 新引入的轻量级线程模型
2. 它不是直接和操作系统线程一一绑定
3. 而是由 JVM 负责调度到少量平台线程上执行

### 它解决什么问题
1. 传统线程成本较高
2. 大量阻塞型任务时，平台线程很容易成为瓶颈
3. 虚拟线程能让“一个请求一个线程”的模型重新变得可行

### 适合什么场景
1. I/O 密集型任务
2. 高并发请求处理
3. 大量短时阻塞任务

### 不适合什么场景
1. 纯 CPU 密集计算
2. 大量依赖 ThreadLocal 且清理不规范的旧代码

### 面试回答重点
虚拟线程不是让 CPU 更快，而是让阻塞等待的并发模型更轻。`,
    analogy: '平台线程像实体工位，虚拟线程像电子排号，等待中的任务不必一直占着真实工位。',
    importance: 'medium',
  },
];

export const JVM_REFINED_POINTS: InterviewPoint[] = [
  {
    id: 'jvm-refined-1',
    question: '谈谈 JVM 的内存区域划分？',
    answer: `### JVM 运行时数据区主要包括
1. 程序计数器
   - 记录当前线程执行到哪条字节码指令

2. Java 虚拟机栈
   - 每个线程私有
   - 存放栈帧、局部变量表、操作数栈等

3. 本地方法栈
   - 为 Native 方法服务

4. 堆
   - 线程共享
   - 几乎所有对象实例都在这里分配

5. 方法区
   - 存放类元信息、常量、静态变量、JIT 编译代码等

### 面试回答重点
1. 线程私有区
   - 程序计数器、虚拟机栈、本地方法栈

2. 线程共享区
   - 堆、方法区

### 高频追问
哪块最容易 OOM？
1. 堆
2. 元空间
3. 栈也可能因为递归过深溢出`,
    analogy: 'JVM 内存像一栋办公楼：每个员工有自己的工位和手边资料，整家公司共享仓库、档案室和公共资源区。',
    importance: 'high',
  },
  {
    id: 'jvm-refined-2',
    question: '常见的垃圾回收算法有哪些？',
    answer: `### 三种经典算法
1. 标记-清除
   - 先标记存活对象
   - 再清理无用对象
   - 优点是实现直接
   - 缺点是会产生内存碎片

2. 复制算法
   - 把存活对象复制到另一块区域
   - 原区域整体清空
   - 优点是实现简单、碎片少
   - 缺点是空间利用率低

3. 标记-整理
   - 先标记，再把存活对象往一端移动
   - 最后清理边界外内存
   - 优点是没有碎片
   - 缺点是整理成本更高

### 分代收集里的常见使用
1. 新生代多用复制算法
2. 老年代更常结合标记-清除或标记-整理思想

### 面试回答重点
不要只背名字，要把“优缺点”和“为什么分代里这样选”讲出来。`,
    analogy: '标记清除像把垃圾点出来后直接扫掉，复制算法像把有用物品搬到新房间，标记整理像先整理归位再清空边角。',
    importance: 'high',
  },
  {
    id: 'jvm-refined-3',
    question: '什么是双亲委派模型？',
    answer: `### 双亲委派是什么
1. 类加载请求来了以后
2. 当前类加载器不会马上自己加载
3. 而是先把请求往上交给父加载器
4. 父加载器加载不了，子加载器再尝试自己加载

### 典型层级
1. 启动类加载器 Bootstrap ClassLoader
2. 扩展类加载器 Extension ClassLoader
3. 应用类加载器 Application ClassLoader

### 好处
1. 避免同一个类被重复加载
2. 保证 Java 核心类库的安全性
3. 统一类加载行为

### 面试高频追问
为什么 String 不能被自己写的同名类替换？
1. 因为核心类优先由更高层的类加载器加载

### 补充一句
双亲委派不是绝对不能打破，但打破通常是框架或容器出于隔离需要的特殊设计。`,
    analogy: '像层层上报审批，先问总部能不能处理，总部不处理才轮到下级自己办。',
    importance: 'high',
  },
  {
    id: 'jvm-refined-4',
    question: '如何排查 OOM (OutOfMemoryError)？',
    answer: `### 先分清是哪类 OOM
1. Java heap space
2. Metaspace
3. GC overhead limit exceeded
4. unable to create new native thread
5. Direct buffer memory

### 通用排查思路
1. 看报错类型
2. 看 JVM 参数
3. 看 GC 日志
4. 导出堆转储文件
5. 用 MAT、jmap、Arthas 等工具分析大对象和引用链

### 常见排查重点
1. 是对象真的太多
2. 还是对象泄漏回收不了
3. 是不是缓存、集合、ThreadLocal、消息堆积导致

### 面试回答模板
我会先判断 OOM 类型，再结合 GC 日志和堆分析定位是内存不够还是内存泄漏，最后沿引用链找到具体对象来源。`,
    analogy: 'OOM 排查像查仓库爆满，先看是货真太多、旧货没清掉，还是又开了太多新库位。',
    importance: 'high',
  },
  {
    id: 'jvm-refined-5',
    question: 'JVM 中堆和栈的区别是什么？',
    answer: `### 堆
1. 线程共享
2. 主要存对象实例
3. 是 GC 重点管理区域

### 栈
1. 线程私有
2. 存方法调用对应的栈帧
3. 包括局部变量、操作数栈、返回地址等

### 区别总结
1. 生命周期
   - 栈随线程和方法调用变化
   - 堆中的对象可跨方法存在

2. 管理方式
   - 栈自动分配和回收
   - 堆由 GC 负责回收

3. 常见问题
   - 堆容易 OOM
   - 栈容易 StackOverflowError

### 面试回答重点
不要简单说“堆存对象，栈存基本类型”。
更准确的说法是：
栈存的是局部变量和引用，引用指向的对象通常在堆里。`,
    analogy: '栈像员工手边临时工作台，堆像共享仓库，工作台上放的是索引和临时资料，真正的大件货物在仓库里。',
    importance: 'high',
  },
  {
    id: 'jvm-refined-6',
    question: '简单介绍一下类加载的过程？',
    answer: `### 类加载的五个主要阶段
1. 加载
   - 把字节码文件读进内存，生成 Class 对象

2. 验证
   - 校验字节码是否合法、安全

3. 准备
   - 为类变量分配内存并赋默认值

4. 解析
   - 把符号引用转换成直接引用

5. 初始化
   - 执行类变量显式赋值和静态代码块

### 面试常见追问
什么时候会触发初始化？
1. new 对象
2. 访问类的静态变量
3. 调用类的静态方法
4. 反射主动使用类

### 回答建议
顺序一定别乱，尤其是“准备”和“初始化”的区别要讲清楚。`,
    analogy: '类加载像新员工入职：先录入资料，再做合规审查，再分配基础工位，再把系统权限指到真实资源，最后正式上岗。',
    importance: 'high',
  },
  {
    id: 'jvm-refined-7',
    question: 'CMS 和 G1 垃圾回收器有什么区别？',
    answer: `### CMS
1. 以缩短停顿时间为目标
2. 老年代回收为主
3. 采用标记-清除思路
4. 缺点是会产生内存碎片
5. 对 CPU 更敏感

### G1
1. 面向服务端的大堆场景
2. 把堆划分成多个 Region
3. 能按回收收益优先选择回收区域
4. 更容易兼顾吞吐和停顿
5. 整体可预测性更好

### 面试怎么比较
1. CMS 更老，低停顿但碎片问题明显
2. G1 更现代，适合更大的堆和更复杂的服务端场景

### 实战结论
在新版本 JDK 和主流生产环境里，G1 更常见。`,
    analogy: 'CMS 像老式清洁队，清得快但容易留下零散空位；G1 像分区域精细保洁，能优先清最脏、收益最高的区域。',
    importance: 'medium',
  },
  {
    id: 'jvm-refined-8',
    question: 'Java 中的四种引用类型是什么？',
    answer: `### 四种引用
1. 强引用
   - 最常见
   - 只要强引用还在，对象一般不会被回收

2. 软引用
   - 内存紧张时可能被回收
   - 常用于缓存

3. 弱引用
   - 下一次 GC 时通常就会被回收
   - 常见于 ThreadLocalMap 的 key

4. 虚引用
   - 不影响对象生命周期
   - 主要用于跟踪对象被回收的时机

### 面试回答重点
要讲出强弱顺序：
强引用最强，软引用次之，弱引用更弱，虚引用最弱。`,
    analogy: '强引用像长期正式合同，软引用像可回收备用资源，弱引用像临时便签，虚引用更像回收通知预约单。',
    importance: 'medium',
  },
  {
    id: 'jvm-refined-9',
    question: 'JVM 调优有哪些常用参数？',
    answer: `### 最常见的参数
1. \`-Xms\`
   - 初始堆大小

2. \`-Xmx\`
   - 最大堆大小

3. \`-Xmn\`
   - 新生代大小

4. \`-XX:MetaspaceSize\`
   - 元空间初始阈值

5. \`-XX:MaxMetaspaceSize\`
   - 元空间最大值

6. \`-XX:+UseG1GC\`
   - 指定 GC 策略

7. \`-Xlog:gc*\` 或 GC 日志相关参数
   - 用于观察回收行为

### 调优原则
1. 先监控，再调参
2. 不要脱离业务负载瞎改
3. 调参目标要明确
   - 是降停顿
   - 还是降 Full GC
   - 还是提升吞吐

### 面试回答重点
说参数只是第一层，更重要的是你知道它们分别影响哪块内存、哪类问题。`,
    analogy: 'JVM 参数像机房控制面板，每个旋钮都能调，但前提是你知道自己要解决的是温度问题、供电问题还是流量问题。',
    importance: 'medium',
  },
  {
    id: 'jvm-refined-10',
    question: '线上 Full GC 频繁时一般怎么排查？',
    answer: `### 第一步：确认现象
1. Full GC 多久一次
2. 每次停顿多久
3. 是否伴随接口 RT 抖动或超时

### 第二步：看 GC 日志和监控
1. 老年代使用率是否持续升高
2. 回收后是否回不下去
3. 是否存在晋升失败、元空间压力等信号

### 第三步：排查常见原因
1. 大对象过多
2. 对象存活时间变长
3. 内存泄漏
4. 缓存配置不合理
5. ThreadLocal 没清理
6. 消息堆积或请求积压

### 第四步：工具定位
1. jstat 看 GC 趋势
2. jmap 导堆
3. MAT 看大对象和引用链
4. Arthas 辅助看热点行为

### 回答模板
我会先确认 Full GC 是偶发还是持续，然后结合 GC 日志、堆快照和对象引用链，区分是正常容量不够还是异常对象回收不掉。`,
    analogy: '频繁 Full GC 像仓库总清仓越来越频繁，先看是货量真超了，还是有一批旧货始终清不掉。',
    importance: 'high',
  },
];

export const SPRING_REFINED_POINTS: InterviewPoint[] = [
  {
    id: 'spring-refined-1',
    question: '什么是 Spring 的 IOC 和 DI？',
    answer: `### IOC 是什么
1. IOC 全称 Inversion of Control，控制反转
2. 原来对象由业务代码自己 new
3. 现在对象创建和管理交给 Spring 容器

### DI 是什么
1. DI 全称 Dependency Injection，依赖注入
2. 容器在创建对象时，把它依赖的对象一起注入进去

### 它们的关系
1. IOC 是思想
2. DI 是实现 IOC 的常见手段

### 好处
1. 降低耦合
2. 方便测试
3. 方便统一管理对象生命周期

### 面试回答模板
Spring 不只是帮我 new 对象，而是把对象的创建、装配、生命周期都托管起来，让业务代码更关注自身职责。`,
    analogy: 'IOC 像把招聘和岗位分配交给人事系统，DI 像人事在员工入职时把工牌、电脑、权限一次性配好。',
    importance: 'high',
  },
  {
    id: 'spring-refined-2',
    question: 'Spring AOP 的原理是什么？',
    answer: `### AOP 是什么
1. AOP 是面向切面编程
2. 用来把日志、事务、权限、监控这类通用逻辑从业务代码里抽出来

### Spring AOP 的实现方式
1. 如果目标类实现了接口
   - 通常用 JDK 动态代理

2. 如果目标类没有实现接口
   - 通常用 CGLIB 生成子类代理

### 代理对象做了什么
1. 调用目标方法前执行前置逻辑
2. 调用目标方法后执行后置逻辑
3. 出异常时执行异常通知
4. 也可以用环绕通知把整个调用链包起来

### 面试回答重点
Spring AOP 的核心不是“切面”这个词，而是“通过代理对象在不改业务代码的前提下织入横切逻辑”。`,
    analogy: 'AOP 像在不改原业务流程的前提下，在入口加安检、在出口加日志、在异常时自动报警。',
    importance: 'high',
  },
  {
    id: 'spring-refined-3',
    question: 'Spring Bean 的生命周期？',
    answer: `### 大致流程
1. 实例化
   - 容器创建 Bean 对象

2. 属性填充
   - 注入依赖

3. Aware 回调
   - 例如 BeanNameAware、BeanFactoryAware

4. BeanPostProcessor 前置处理

5. 初始化
   - @PostConstruct
   - InitializingBean
   - init-method

6. BeanPostProcessor 后置处理
   - AOP 代理通常也和这一阶段有关

7. 使用阶段

8. 销毁
   - @PreDestroy
   - DisposableBean
   - destroy-method

### 面试回答重点
只背“创建到销毁”不够，要把“前后置处理器”和“初始化回调”讲出来。`,
    analogy: 'Bean 生命周期像员工入职流程：先建档、配资源、做岗前处理、正式上岗，最后离职回收资源。',
    importance: 'high',
  },
  {
    id: 'spring-refined-4',
    question: 'Spring Boot 自动配置原理？',
    answer: `### 核心目标
自动配置的本质是：
根据当前依赖和环境条件，帮你自动装配一批合适的 Bean。

### 核心机制
1. \`@SpringBootApplication\`
   - 里面包含 \`@EnableAutoConfiguration\`

2. 自动配置类加载
   - Spring Boot 会从约定位置加载自动配置类

3. 条件装配
   - 典型如 \`@ConditionalOnClass\`
   - \`@ConditionalOnMissingBean\`
   - \`@ConditionalOnProperty\`

### 为什么它这么方便
1. 引了 starter
2. 类路径里有相关依赖
3. 条件满足时就自动生效

### 面试回答重点
不要只说“它帮我们省配置”。
要说清楚：
1. 自动配置类从哪来
2. 为什么不是无脑生效
3. 条件注解怎么控制装配`,
    analogy: '自动配置像智能会议室，识别到你带了投影仪、麦克风和参会系统，就自动把对应设备都接好，但前提是条件满足。',
    importance: 'high',
  },
  {
    id: 'spring-refined-5',
    question: 'Spring 事务失效的场景有哪些？',
    answer: `### 高频失效场景
1. 方法不是 public
   - 代理通常拦不到

2. 自调用
   - 同类内部方法直接调用，不经过代理对象

3. 异常被吞掉
   - 事务管理器感知不到异常，无法回滚

4. 抛出的不是默认回滚异常
   - 默认只对 RuntimeException 和 Error 回滚

5. 数据源或事务管理器没配对

6. 方法根本没被 Spring 管理

### 面试回答重点
最常讲的两个：
1. 自调用导致事务失效
2. 默认只回滚运行时异常

### 一句话总结
事务能不能生效，关键看“有没有走代理”和“异常有没有正确抛给事务管理器”。`,
    analogy: '事务像一道防护门，只有真正走过门禁系统才会被保护；自己从内部绕过去，门禁根本感知不到。',
    importance: 'high',
  },
  {
    id: 'spring-refined-6',
    question: 'Spring Bean 的作用域有哪些？',
    answer: `### 常见作用域
1. singleton
   - 默认作用域
   - 容器中通常只有一个实例

2. prototype
   - 每次获取都会创建新对象

3. request
   - 每次 HTTP 请求一个实例

4. session
   - 每个会话一个实例

5. application
   - 整个应用范围共享

### 怎么理解
1. singleton 最常用
2. prototype 更适合有状态且不共享的对象
3. request / session 是 Web 场景下更常见的范围

### 面试回答重点
不仅要背名字，还要说出：
1. 默认是哪个
2. Web 作用域和普通 Bean 的区别`,
    analogy: '作用域像资源发放范围：有的是全公司共享一份，有的是每次申请都新给一份，有的是每次来访单独给一份。',
    importance: 'medium',
  },
  {
    id: 'spring-refined-7',
    question: 'Spring 如何解决循环依赖？',
    answer: `### 先说结论
1. Spring 主要解决的是单例 Bean 的属性注入循环依赖
2. 构造器循环依赖通常无法直接解决

### 为什么能解决属性注入循环依赖
Spring 用了三级缓存思路：

1. 一级缓存
   - 存放完全初始化好的单例 Bean

2. 二级缓存
   - 存放提前暴露的半成品 Bean

3. 三级缓存
   - 存放 Bean 的早期对象工厂
   - 必要时还能配合 AOP 提前暴露代理对象

### 解决流程
1. A 创建过程中需要 B
2. B 创建过程中又需要 A
3. Spring 从早期暴露区域拿到 A 的引用给 B
4. 两边初始化完成后再放入一级缓存

### 面试回答重点
这题别只说“三级缓存”，要讲清楚三级缓存分别存什么、为什么要三级而不是一级。`,
    analogy: '像两个部门互相等盖章，Spring 先给你一份临时可识别凭证，让流程继续走，等正式材料都齐了再换成最终版。',
    importance: 'high',
  },
  {
    id: 'spring-refined-8',
    question: '@Transactional 注解的原理是什么？',
    answer: `### 原理核心
1. \`@Transactional\` 本质上也是通过 AOP 代理实现
2. 调用目标方法前开启事务
3. 方法正常结束时提交事务
4. 方法抛出符合规则的异常时回滚事务

### 执行链路
1. 进入代理对象
2. 事务拦截器读取事务属性
3. 事务管理器开启事务
4. 执行业务方法
5. 根据结果决定提交还是回滚

### 事务相关信息从哪来
1. 传播行为
2. 隔离级别
3. 超时时间
4. 回滚规则

### 面试回答重点
不要把它讲成“加了注解就自动有事务”。
更准确地说：
它依赖的是 Spring 代理 + 事务拦截器 + 事务管理器。`,
    analogy: '像每次进入财务审批前，先由系统自动开启一个“事务工单”，流程成功就归档，出错就整单撤回。',
    importance: 'high',
  },
  {
    id: 'spring-refined-9',
    question: 'Spring MVC 处理一次请求的流程是什么？',
    answer: `### 典型流程
1. 请求先到 DispatcherServlet
2. DispatcherServlet 找 HandlerMapping
3. HandlerMapping 定位到具体处理器
4. 通过 HandlerAdapter 调用目标 Controller 方法
5. 执行业务逻辑并返回结果
6. 结果交给视图解析器，或者直接返回 JSON
7. 最终响应给客户端

### 你要抓住的核心角色
1. DispatcherServlet
   - 前端控制器，统一入口

2. HandlerMapping
   - 负责找谁处理

3. HandlerAdapter
   - 负责怎么调

4. ViewResolver
   - 负责怎么渲染

### 面试回答重点
把它讲成“统一入口 -> 找处理器 -> 调处理器 -> 组装响应”最清楚。`,
    analogy: 'Spring MVC 像医院导诊台：先统一挂号，再分配到对应科室，再由医生处理，最后给你检查结果或处方。',
    importance: 'high',
  },
  {
    id: 'spring-refined-10',
    question: 'Spring 事务传播机制有哪些？面试里重点说哪几个？',
    answer: `### 常见传播行为
1. REQUIRED
   - 默认值
   - 有事务就加入，没有就新建

2. REQUIRES_NEW
   - 不管外部有没有事务，都新开一个事务

3. SUPPORTS
   - 有事务就加入，没有就非事务执行

4. MANDATORY
   - 必须在事务中执行，没有就报错

5. NOT_SUPPORTED
   - 以非事务方式执行

6. NEVER
   - 必须没有事务，有事务就报错

7. NESTED
   - 在当前事务里嵌套一个子事务语义

### 面试重点说哪几个
1. REQUIRED
2. REQUIRES_NEW
3. NESTED

### 为什么重点是这三个
因为最容易考业务差异：
1. 是加入外层事务
2. 还是新开独立事务
3. 还是走保存点式嵌套

### 面试回答建议
传播机制不要全背解释一遍，重点讲默认行为和业务差异最明显的那几个。`,
    analogy: '传播机制像审批单流转规则：有的跟主单一起走，有的必须单开新单，有的则是在主单里开子单。',
    importance: 'high',
  },
];

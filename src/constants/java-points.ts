import { InterviewPoint } from './command-types';

export const JAVA_POINTS: InterviewPoint[] = [
  {
    id: 'java-1',
    question: '面向对象的三大特性是什么？重写和重载有什么区别？',
    answer: `【面向对象三大特性】

1. 封装
   - 把属性和方法包装到类里，对外暴露必要接口
   - 好处是隐藏实现细节、控制访问权限、降低耦合

2. 继承
   - 子类复用父类的属性和行为
   - 好处是代码复用、便于扩展

3. 多态
   - 同一个父类引用，指向不同子类对象，调用同名方法时表现不同
   - 本质依赖继承、方法重写和运行时动态绑定

【重写 vs 重载】

1. 重写（Override）
   - 发生在父子类之间
   - 方法名、参数列表相同
   - 返回值类型兼容，访问权限不能更严格
   - 运行期决定调用哪个实现，是运行时多态

2. 重载（Overload）
   - 发生在同一个类中，也可以父子类同时存在
   - 方法名相同，但参数列表不同
   - 和返回值无关
   - 编译期就确定调用哪个方法

【面试回答重点】
- 多态最关键的是“编译看左边，运行看右边”
- 成员变量没有多态，只有成员方法有多态`,
    analogy: '重写像同一岗位不同员工各自的工作方式；重载像同一个人面对不同场景用不同处理流程。',
    importance: 'high'
  },
  {
    id: 'java-2',
    question: 'Java 的 8 种基本数据类型和包装类有哪些？什么是自动装箱拆箱？',
    answer: `【8 种基本数据类型】

- 整数：byte、short、int、long
- 浮点：float、double
- 字符：char
- 布尔：boolean

【对应包装类】

- Byte、Short、Integer、Long
- Float、Double
- Character
- Boolean

【自动装箱和拆箱】

1. 自动装箱
   - 基本类型自动转换成包装类型
   - 例如：Integer x = 10;

2. 自动拆箱
   - 包装类型自动转换成基本类型
   - 例如：int y = x;

【注意点】

1. 包装类可以为 null，基本类型不可以
2. 集合里只能放对象，不能直接放基本类型
3. 频繁装箱拆箱会有额外开销

【缓存机制】

- Integer.valueOf 默认缓存 -128 到 127
- 这个范围内用 valueOf 返回的是同一个对象
- 所以 Integer a = 127; Integer b = 127; a == b 为 true
- 超出范围通常会创建新对象`,
    analogy: '基本类型像散装零件，包装类像带盒子的标准件，方便放进集合和框架里使用。',
    importance: 'high'
  },
  {
    id: 'java-3',
    question: 'String、StringBuilder、StringBuffer 有什么区别？',
    answer: `【共同点】

- 都用于处理字符串

【区别】

1. String
   - 不可变对象
   - 每次拼接都会生成新对象
   - 适合少量字符串操作

2. StringBuilder
   - 可变字符串
   - 线程不安全
   - 性能最好，适合单线程下频繁拼接

3. StringBuffer
   - 可变字符串
   - 线程安全，很多方法带 synchronized
   - 性能通常低于 StringBuilder

【面试结论】

- 少量操作用 String
- 单线程频繁拼接用 StringBuilder
- 多线程共享修改才考虑 StringBuffer`,
    analogy: 'String 像写死的纸条，改一次重写一张；Builder 像草稿板；Buffer 像带锁的草稿板。',
    importance: 'high'
  },
  {
    id: 'java-4',
    question: 'Java 集合框架中 List、Set、Map 的区别是什么？常见实现类有哪些？',
    answer: `【三大接口】

1. List
   - 有序，可重复，可按下标访问

2. Set
   - 无重复，通常不强调下标

3. Map
   - 键值对结构，key 不可重复，value 可重复

【常见实现类】

1. List
   - ArrayList：底层动态数组，查询快，增删中间元素慢
   - LinkedList：底层双向链表，增删快，随机访问慢

2. Set
   - HashSet：基于 HashMap，无序，查找快
   - LinkedHashSet：有插入顺序
   - TreeSet：有序，底层红黑树

3. Map
   - HashMap：最常用，允许一个 null key 和多个 null value
   - LinkedHashMap：保留插入顺序或访问顺序
   - TreeMap：按 key 排序
   - Hashtable：线程安全但现在较少直接使用

【使用建议】

- 查得多用 ArrayList
- 频繁头尾插入可考虑 LinkedList
- 去重常用 HashSet
- 键值查询首选 HashMap`,
    analogy: 'List 像排队名单，Set 像去重后的签到表，Map 像学号和学生信息的对照表。',
    importance: 'high'
  },
  {
    id: 'java-5',
    question: 'HashMap 的底层原理是什么？put 和 get 的流程是怎样的？',
    answer: `【底层结构】

- JDK 1.8 中是数组 + 链表 + 红黑树
- 当链表长度超过阈值且数组容量足够时，链表会树化为红黑树

【put 流程】

1. 计算 key 的 hash
2. 根据 hash 定位数组下标
3. 如果桶为空，直接插入
4. 如果桶不为空，判断是同 key 覆盖、链表追加还是树节点插入
5. 插入后判断是否需要扩容

【get 流程】

1. 先算 hash 找桶
2. 桶首节点先比较
3. 如果没命中，再遍历链表或红黑树查找

【扩容机制】

- 默认容量 16，负载因子 0.75
- 元素数量超过 threshold 时扩容为原来的 2 倍
- 扩容时需要重新分配节点位置

【线程不安全原因】

- 多线程同时 put 可能数据覆盖
- 扩容时可能出现链表结构问题
- 并发场景应优先用 ConcurrentHashMap`,
    analogy: 'HashMap 像按编号分桶的快递柜，先算出该放哪个柜子，再在柜子里找具体包裹。',
    importance: 'high'
  },
  {
    id: 'java-6',
    question: 'Java 的异常体系是怎样的？检查型异常和非检查型异常有什么区别？',
    answer: `【异常体系】

- 顶层父类是 Throwable
- Throwable 下分为 Error 和 Exception

1. Error
   - 系统级严重错误，通常程序难以恢复
   - 例如 OutOfMemoryError、StackOverflowError

2. Exception
   - 程序层面可以处理的问题

【检查型异常 vs 非检查型异常】

1. 检查型异常
   - 编译器强制处理
   - 需要 try-catch 或 throws
   - 例如 IOException、SQLException

2. 非检查型异常
   - 继承 RuntimeException
   - 编译器不强制处理
   - 例如 NullPointerException、IndexOutOfBoundsException

【实践建议】

- 能在当前层处理就处理
- 不能处理就向上抛出
- 不要随意吞异常，至少记录日志和上下文信息`,
    analogy: '检查型异常像必须填写的事故报告；运行时异常像现场临时发现的问题，不一定能提前报备。',
    importance: 'medium'
  },
  {
    id: 'java-7',
    question: '什么是反射？反射的使用场景有哪些？',
    answer: `【什么是反射】

- 程序在运行时获取类的信息，并动态创建对象、调用方法、访问字段的机制

【常见能力】

1. 获取 Class 对象
2. 获取构造器、方法、字段
3. 动态创建实例
4. 动态调用方法
5. 读取或修改属性

【典型场景】

1. Spring 容器创建和管理 Bean
2. MyBatis 映射结果集到对象
3. 注解解析
4. 通用框架和插件化系统

【优缺点】

- 优点：灵活、解耦、扩展性强
- 缺点：性能略低、破坏封装、代码可读性变差`,
    analogy: '反射像根据人员档案临时查到一个人会什么技能，再动态安排他去做对应工作。',
    importance: 'medium'
  },
  {
    id: 'java-8',
    question: '字节流、字符流、缓冲流有什么区别？',
    answer: `【字节流】

- 以字节为单位处理数据
- 适合图片、视频、压缩包等二进制文件
- 常见类：InputStream、OutputStream

【字符流】

- 以字符为单位处理数据
- 适合文本文件
- 本质上对字节流做了编码解码
- 常见类：Reader、Writer

【缓冲流】

- 在原始流外面再包一层缓冲区
- 减少磁盘或网络的实际读写次数
- 常见类：BufferedInputStream、BufferedReader

【怎么选】

- 处理文本优先字符流
- 处理二进制优先字节流
- 性能要求高时配合缓冲流使用`,
    analogy: '字节流像按原始颗粒搬货，字符流像按翻译后的文字搬货，缓冲流像先攒一车再一起运。',
    importance: 'medium'
  },
  {
    id: 'java-9',
    question: 'final、static、this、super 分别有什么作用？',
    answer: `【final】

- 修饰类：不能被继承
- 修饰方法：不能被重写
- 修饰变量：只能赋值一次

【static】

- 属于类，不属于对象
- 可修饰成员变量、方法、代码块、内部类
- 静态方法不能直接访问非静态成员

【this】

- 表示当前对象
- 用于区分成员变量和局部变量
- 可以调用当前类构造器 this(...)

【super】

- 表示父类对象部分
- 可访问父类成员
- 可调用父类构造器 super(...)

【面试要点】

- this 解决“当前对象是谁”
- super 解决“父类版本是谁”
- static 体现“类级别共享”
- final 体现“不可变或不可扩展”`,
    analogy: 'this 像“我本人”，super 像“我爸那一套”，static 像公司公共资源，final 像写死不能改的规则。',
    importance: 'medium'
  },
  {
    id: 'java-10',
    question: '== 和 equals() 有什么区别？hashCode() 和 equals() 又是什么关系？',
    answer: `【== 的含义】

1. 基本类型
   - 比较值是否相等

2. 引用类型
   - 比较是否是同一个对象地址

【equals() 的含义】

- 默认继承 Object.equals，本质也是比较地址
- 很多类会重写 equals，用于比较”内容是否相等”
- 例如 String 重写了 equals 比较字符内容

【hashCode() 和 equals() 的关系】

1. 如果两个对象 equals 相等，那么它们的 hashCode 必须相等
2. hashCode 相等，equals 不一定相等
3. 重写 equals 通常也要重写 hashCode

【为什么重要】

- HashMap、HashSet 先用 hashCode 定位桶，再用 equals 判断是否同一个键
- 只重写 equals 不重写 hashCode 会导致集合行为异常`,
    analogy: 'hashCode 像先按楼栋分区，equals 像到了楼层后再核对是不是同一个住户。',
    importance: 'high'
  },
  {
    id: 'java-11',
    question: 'volatile关键字的作用和原理是什么？',
    answer: `【volatile的作用】

1. 保证可见性
   - 一个线程修改volatile变量后，其他线程能立即看到最新值
   - 强制从主内存读写，不缓存到工作内存

2. 禁止指令重排序
   - 防止编译器和处理器对指令进行重排序优化
   - 保证代码执行顺序的一致性

3. 不保证原子性
   - 不能替代synchronized进行复合操作
   - i++操作仍然需要同步

【底层原理】

1. 内存屏障（Memory Barrier）
   - 写操作：插入StoreStore + StoreLoad屏障
   - 读操作：插入LoadLoad + LoadStore屏障
   - 阻止屏障前后的指令重排序

2. Lock前缀指令
   - 处理器执行带Lock的指令时，会锁定缓存行
   - 强制刷新到主内存，并使其他处理器的缓存失效

【使用场景】

1. 状态标志\n   - private volatile boolean shutdown = false\n   - public void stop() { shutdown = true; }\n\n2. 双重检查锁定（DCL）\n   - private volatile static Singleton instance\n\n3. 读写分离\n   - 写少读多的场景\n   - 确保读取到最新值\n\n【注意事项】\n- 不能用于计数器等需要原子操作的场景\n- 性能开销比synchronized小，但功能有限`,
    analogy: 'volatile就像公告栏上的通知，写的人必须贴上去（写主存），看的人必须去看公告栏（读主存），不能只看自己抄的副本（工作内存）。',
    importance: 'high'
  },
  {
    id: 'java-12',
    question: '抽象类和接口的区别？什么时候使用抽象类，什么时候使用接口？',
    answer: `【抽象类 vs 接口】

【抽象类特点】
1. 可以有抽象方法和具体方法
2. 可以有成员变量（各种访问权限）
3. 可以有构造方法
4. 类只能继承一个抽象类（单继承）
5. 用于”is-a”关系（是一个）

【接口特点】
1. Java 8前只能有抽象方法
2. Java 8后可以有默认方法、静态方法
3. Java 9后可以有私有方法
4. 只能有常量（public static final）
5. 类可以实现多个接口（多实现）
6. 用于”has-a”关系（具有某种能力）

【如何选择】

使用抽象类当：
1. 需要在基类中定义具体实现
2. 需要定义非static或非final的成员变量
3. 需要定义构造方法
4. 子类之间有紧密的”is-a”关系

使用接口当：
1. 只定义行为规范，不提供实现
2. 需要多重继承
3. 不同类的对象具有相同行为
4. 定义契约，让不同实现类遵循

【Java 8+ 接口增强】\n- 抽象方法：void doSomething()\n- 默认方法：default void doDefault() { System.out.println(“Default implementation”); }\n- 静态方法：static void doStatic() { System.out.println(“Static method”); }\n\n【设计原则】\n- 接口定义能力，抽象类提供部分实现\n- 优先使用接口（更灵活）\n- 抽象类适合模板方法模式`,
    analogy: '抽象类像【父亲】，孩子只能有一个亲生父亲，但父亲可以给一些遗传特征（具体方法）；接口像【技能证书】，一个人可以有多个证书（多实现），每个证书定义了你会做什么（抽象方法）。',
    importance: 'high'
  },
  {
    id: 'java-13',
    question: 'try-catch-finally的执行顺序？return语句在finally之前还是之后执行？',
    answer: `【执行顺序】

1. try中无异常：
   try → finally

2. try中有异常，catch能处理：
   try → catch → finally

3. try中有异常，catch不能处理：
   try → finally → 抛出异常

4. try和catch中都有return：
   finally总是最后执行

【return执行机制】\n\n1. finally中的return会覆盖try/catch中的return\n   - public int test() { try { return 1; } finally { return 2; } } // 最终返回2\n\n2. finally中修改基本类型变量不影响返回值\n   - int x = 1; try { return x; } finally { x = 2; } // 不影响返回值，仍然返回1\n\n3. finally中修改引用类型变量会影响返回值\n   - StringBuilder sb = new StringBuilder(“hello”); try { return sb; } finally { sb.append(“ world”); } // 返回”hello world”

【最佳实践】
1. 不要在finally中使用return
2. finally主要用于资源清理
3. 使用try-with-resources管理资源

【异常处理原则】
1. 具体异常优先于通用异常
2. 不要吞异常，至少记录日志
3. 异常信息要包含上下文`,
    analogy: 'try-catch-finally就像做饭：try是正常炒菜，catch是处理糊锅，finally是关火关气。即使菜炒好了（return），最后也必须关火关气。但如果在关火时又往锅里加了调料（finally中修改引用），菜的味道就变了。',
    importance: 'medium'
  }
,
  {
    id: 'java-14',
    question: '什么是序列化和反序列化？常见方案怎么选？',
    answer: `序列化是把对象状态转换成可传输、可存储的字节序列；反序列化是把字节序列再恢复成对象。

常见场景：
- 对象落盘
- 网络传输
- RPC 调用
- 缓存对象

JDK 原生序列化特点：
- 直接实现 \`Serializable\`
- 使用简单
- 可读性差、体积大、性能一般
- 强依赖类结构，跨语言能力差

常见替代方案：
- JSON：可读性好，适合接口传输，但体积通常更大
- Protobuf：体积小、性能好、跨语言能力强，适合 RPC 和服务间通信
- Hessian / Kryo：常见于高性能内部通信场景

面试回答可以这样落：
1. 先说明“对象 -> 字节流 -> 对象”的本质
2. 再说原生序列化的优缺点
3. 最后补充真实项目里更常用 JSON 或 Protobuf 这类方案`,
    analogy: '序列化像把家具拆成标准包装箱方便运输，反序列化像到目的地后再重新组装。',
    importance: 'medium'
  },
  {
    id: 'java-15',
    question: 'Java 8 最重要的新特性有哪些？',
    answer: `Java 8 面试里最常问的不是把特性背全，而是能不能讲清它们解决了什么问题。

高频特性：
1. Lambda 表达式
- 让函数式写法更简洁
- 常用于集合遍历、排序、回调

2. Stream API
- 支持声明式数据处理
- 常见操作有 \`filter\`、\`map\`、\`sorted\`、\`collect\`
- 优点是代码更聚焦“做什么”，不是“怎么循环”

3. 函数式接口
- 典型有 \`Function\`、\`Consumer\`、\`Supplier\`、\`Predicate\`
- 是 Lambda 的基础

4. Optional
- 用于显式表达“值可能为空”
- 减少空指针的低级判断

5. 新时间 API
- \`LocalDate\`、\`LocalDateTime\`、\`Instant\`
- 解决旧 \`Date\` / \`Calendar\` 可读性差、线程不安全的问题

6. 接口默认方法
- 接口可以提供默认实现，便于框架扩展

7. CompletableFuture
- 支持更流畅的异步编排

注意点：
- Stream 不适合所有场景，复杂链式调用过长会降低可读性
- Optional 主要用于返回值语义，不建议滥用到字段和参数`,
    analogy: 'Java 8 像把手写流水账升级成带公式的电子表格，很多样板代码都被抽掉了。',
    importance: 'high'
  },
  {
    id: 'java-16',
    question: '单例模式有哪些写法？哪种更推荐？',
    answer: `常见写法有：

1. 饿汉式
- 类加载时就创建实例
- 简单直接，线程安全
- 缺点是可能提前占用资源

2. 懒汉式
- 第一次使用时再创建
- 需要处理线程安全问题

3. 双重检查锁（DCL）
- 先判空，再加锁，再判空
- 通常要配合 \`volatile\`
- 兼顾延迟加载和并发性能

4. 静态内部类
- 利用类加载机制保证线程安全
- 延迟加载、实现简洁
- 是面试中很推荐的一种写法

5. 枚举单例
- 最简洁，也能防反射和反序列化破坏
- 在工程里很稳

推荐回答：
- 如果是面试手写，静态内部类和 DCL 最常见
- 如果强调防反射、防反序列化，枚举单例更稳`,
    analogy: '单例像公司里唯一的一把总钥匙，关键是既要保证只有一把，还要保证并发取用时不会复制出第二把。',
    importance: 'high'
  },
  {
    id: 'java-17',
    question: '工厂模式和抽象工厂模式有什么区别？',
    answer: `工厂模式的核心是“把对象创建逻辑从业务代码里拿出去”。

简单工厂：
- 一个工厂类根据参数创建不同对象
- 优点是调用方简单
- 缺点是工厂职责容易越来越重

工厂方法：
- 每种产品对应一个工厂
- 符合开闭原则，扩展更自然

抽象工厂：
- 面向“产品族”创建对象
- 一次创建一组彼此匹配的对象
- 适合同一套风格、同一套环境下的多个组件组合创建

区别总结：
- 工厂方法关注“一个产品怎么创建”
- 抽象工厂关注“一组关联产品怎么一起创建”

典型场景：
- 数据库驱动切换
- UI 组件主题切换
- 不同厂商 SDK 适配`,
    analogy: '工厂方法像单独生产手机；抽象工厂像一次性配齐手机、耳机、充电器这一整套产品族。',
    importance: 'medium'
  },
  {
    id: 'java-18',
    question: 'Java 应用性能排查一般从哪里开始？',
    answer: `面试里不要一上来就说某个命令，而要讲出排查顺序。

常见思路：
1. 先看现象
- CPU 高
- 内存涨
- Full GC 频繁
- 接口 RT 变慢
- 线程堆积

2. 再定方向
- CPU 高：先看热点线程，再看线程栈
- 内存高：看堆使用、对象分布、GC 情况
- 响应慢：看慢 SQL、外部依赖、线程池队列

3. 常用工具
- \`top\` / \`htop\`：看系统负载
- \`jps\`：找 Java 进程
- \`jstack\`：看线程栈、死锁、阻塞点
- \`jmap -histo\` / heap dump：看对象分布
- \`jstat\`：看 GC 指标
- Arthas：线上排查非常高频

4. 最后落到根因
- 是代码问题、配置问题、SQL 问题，还是依赖抖动

面试高频加分点：
- 先监控、再定位、后优化
- 不要只会“加机器”`,
    analogy: '性能排查像医院问诊，先看症状，再做化验，最后才能下结论开药。',
    importance: 'high'
  },
  {
    id: 'java-19',
    question: '反射为什么灵活，但在性能和安全上要谨慎使用？',
    answer: `反射的价值在于“运行时动态拿到类信息并执行”，所以框架里大量使用它，比如 Spring 的依赖注入、AOP、注解处理。

但要谨慎的原因主要有三点：
1. 性能开销更高
- 反射调用比直接调用多了一层元数据解析和访问检查
- 高频主链路不适合重度依赖反射

2. 可读性和可维护性更差
- 调用关系不直观
- 出问题时排查难度更高

3. 安全边界更敏感
- setAccessible 这类能力会绕过部分封装限制
- 如果滥用，容易破坏封装性

面试回答建议：
- 业务代码少直接用
- 框架底层会用
- 热路径尽量避免频繁反射，可结合缓存、字节码增强等优化`,
    analogy: '反射像万能钥匙，确实方便，但开门慢一点，而且权限边界更需要控制。',
    importance: 'medium'
  },
  {
    id: 'java-20',
    question: 'serialVersionUID 有什么作用？为什么序列化类通常建议显式声明？',
    answer: `serialVersionUID 是序列化版本号，用来校验反序列化时类结构是否兼容。

为什么建议显式声明：
1. 避免编译器自动生成
- 自动生成受类结构变化影响
- 一改字段就可能变

2. 便于控制兼容性
- 你可以明确决定“这次改动是否允许兼容旧数据”

3. 降低线上反序列化失败风险
- 否则可能出现 InvalidClassException

面试里可以顺手补一句：
- 如果类只是临时对象、不参与序列化落盘或远程传输，可以不太关注
- 但一旦涉及缓存、消息、文件持久化，最好显式声明`,
    analogy: 'serialVersionUID 像文件格式版本号，版本对不上，旧文件就可能打不开。',
    importance: 'medium'
  }
];

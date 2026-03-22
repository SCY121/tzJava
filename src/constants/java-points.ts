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
- 很多类会重写 equals，用于比较“内容是否相等”
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
  }
];

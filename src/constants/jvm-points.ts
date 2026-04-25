// JVM 面试题
import { InterviewPoint } from './command-types';

export const JVM_POINTS: InterviewPoint[] = [
  {
   id: 'jvm-memory',
   question: '谈谈 JVM 的内存区域划分？',
   answer: 'JVM 内存主要分为线程私有区域和线程共享区域：\n\n【线程私有】\n1. 程序计数器（Program Counter Register）：记录当前线程执行的字节码行号，是唯一不会 OOM 的区域\n2. 虚拟机栈（Java Virtual Machine Stack）：描述 Java 方法执行的内存模型，每个方法执行时创建栈帧，包含局部变量表、操作数栈、动态链接、方法出口\n3. 本地方法栈（Native Method Stack）：为 Native 方法服务\n\n【线程共享】\n1. 堆（Heap）：存放对象实例和数组，是 GC 管理的主要区域，可细分为新生代（Eden + 2 Survivor）和老年代\n2. 方法区（Method Area）：存储类信息、常量、静态变量、即时编译后的代码。JDK8 后使用元空间（Metaspace）实现，使用本地内存\n\n【JDK8 变化】\n- 永久代（Permanent Generation）被元空间替代，字符串常量池移到堆中\n- 元空间不受 JVM 堆大小限制，受系统总内存限制',
   analogy: '想象一个餐厅：堆是【大厅厨房】，所有厨师共享；栈是【每个厨师的私人记事本】，记录自己正在做的菜和进度；方法区是【菜谱库】，存放所有菜品的制作方法；程序计数器是【厨师当前的操作步骤标记】。',
   importance: 'high'
  },
  {
   id: 'jvm-gc',
   question: '常见的垃圾回收算法有哪些？',
   answer: '【标记 - 清除（Mark-Sweep）】\n- 过程：标记出所有需要回收的对象，然后统一清除\n- 缺点：效率不高（两次遍历）、产生大量不连续碎片\n- 应用：CMS 回收器的基础\n\n【标记 - 复制（Mark-Copy）】\n- 过程：将内存分为两块等大区域，每次只用一块。GC 时将存活对象复制到另一块，然后清空原区域\n- 优点：无碎片、效率高\n- 缺点：内存利用率低（仅 50%）\n- 应用：新生代回收（Serial、ParNew）\n\n【标记 - 整理（Mark-Compact）】\n- 过程：标记存活对象，然后向一端移动整理，最后清理边界外内存\n- 优点：无碎片、内存利用率高\n- 缺点：移动对象成本高\n- 应用：老年代回收（Parallel Old）\n\n【分代收集（Generational Collection）】\n- 根据对象生命周期不同采用不同算法\n- 新生代：复制算法（Minor GC）\n- 老年代：标记整理/标记清除（Major/Full GC）\n- 现代回收器：G1、ZGC 采用 Region 分区，可预测停顿时间',
   analogy: '标记 - 清除就像【只把垃圾扔掉但不整理房间】，久了会有空隙；标记 - 复制就像【把有用物品搬到新房间，旧房间整个清空】；标记 - 整理就像【扔掉垃圾后把家具挪齐】，腾出大块空间。',
   importance: 'high'
  },
  {
   id: 'jvm-classloader',
   question: '什么是双亲委派模型？',
   answer: '【工作原理】\n当一个类加载器收到类加载请求时：\n1. 首先检查该类是否已被加载\n2. 若未加载，委托给父类加载器处理\n3. 递归向上，直到启动类加载器（Bootstrap ClassLoader）\n4. 只有父类反馈无法加载时，子类才尝试自己加载\n\n【类加载器层次】\n1. 启动类加载器（Bootstrap）：C++ 实现，加载 JAVA_HOME/lib 核心类库（rt.jar），无法被 Java 代码引用\n2. 扩展类加载器（Extension）：加载 JAVA_HOME/lib/ext 目录的类\n3. 应用类加载器（Application）：加载 classpath 下的类，可通过 ClassLoader.getSystemClassLoader() 获取\n4. 自定义类加载器：继承 ClassLoader 类\n\n【优势】\n1. 保证安全性：防止核心 API 被篡改（如自定义 java.lang.String）\n2. 避免重复加载：保证类的唯一性\n\n【破坏双亲委派】\n1. SPI 机制（如 JDBC 接口）：父类加载器需要加载子类加载器路径的类\n2. 热部署：Tomcat 自定义类加载器实现应用隔离\n3. 模块化：OSGi 实现模块化热插拔',
   analogy: '就像【孩子想买玩具】，先问爸爸，爸爸问爷爷。爷爷说买不了，爸爸才考虑买，爸爸也买不了，孩子才自己攒钱买。保证了核心类（如 String）的安全性。',
   importance: 'high'
  },
  {
   id: 'jvm-oom',
   question: '如何排查 OOM (OutOfMemoryError)？',
   answer: '【OOM 类型及排查】\n\n1. Java heap space（堆内存溢出）\n   - 原因：对象过多或内存泄漏\n   - 排查：jmap -dump:format=b,file=heap.hprof <pid> 生成 dump 文件，用 MAT/JProfiler 分析\n   - 解决：增大 -Xmx、修复内存泄漏、优化数据结构\n\n2. Metaspace（元空间溢出）\n   - 原因：加载类过多（如动态代理、CGLib）\n   - 排查：jstat -gcutil 查看元空间使用率\n   - 解决：增大 -XX:MaxMetaspaceSize、减少动态代理使用\n\n3. Unable to create new native thread\n   - 原因：线程数过多，超过系统限制\n   - 排查：ulimit -u 查看用户最大进程数\n   - 解决：减少线程数、使用线程池\n\n4. Direct buffer memory\n   - 原因：NIO 直接内存不足\n   - 解决：增大 -XX:MaxDirectMemorySize\n\n【实战步骤】\n1. 添加参数：-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/path\n2. 分析工具：MAT（Memory Analyzer Tool）的 Dominator Tree 找大对象，Histogram 看类数量\n3. 常见泄漏：ThreadLocal 未 remove、静态集合类无限增长、未关闭的资源连接',
   analogy: '就像【家里垃圾堆满了】，你需要翻翻垃圾袋（dump 文件），看看是谁扔了这么多没用的东西（大对象），然后把源头堵住（修复泄漏）。',
   importance: 'medium'
  },
  {
   id: 'jvm-heap-stack',
   question: 'JVM 中堆和栈的区别是什么？',
   answer: '1. 物理地址：堆是不连续的，栈是连续的；2. 内存分配：堆是运行时分配，栈是编译时分配；3. 存放内容：堆存放对象实例和数组，栈存放局部变量、操作数栈、动态链接等；4. 线程共享：堆是线程共享的，栈是线程私有的。',
   analogy: '堆就像【公共图书馆的藏书】，大家都能借阅；栈就像【你随身带的笔记本】，只记录你自己的事情。',
   importance: 'high'
  },
  {
   id: 'jvm-heap-division',
   question: 'JVM 堆内存是如何划分的？',
   answer: '主要分为新生代（Young Generation）和老年代（Old Generation）。新生代又细分为 Eden 区、Survivor From 区（S0）和 Survivor To 区（S1），默认比例为 8:1:1。',
   analogy: '就像【公司的职级系统】：Eden 是【实习生工位】，刚入职的都在这；Survivor 是【转正考察期】，表现好（活过 GC）的能留下；老年代是【资深员工区】，只有经过多次考核（多次 GC）的员工才能进入。',
   importance: 'high'
  },
  {
   id: 'jvm-class-loading-process',
   question: '简单介绍一下类加载的过程？',
   answer: '类加载过程分为五个阶段：\n\n1. 加载（Loading）：通过全限定类名获取二进制字节流，将静态存储结构转化为方法区的运行时数据结构，生成 java.lang.Class 对象作为访问入口\n\n2. 验证（Verification）：文件格式验证（魔数、版本号、常量池），元数据验证（语义检查、父类检查），字节码验证（数据流和控制流分析），符号引用验证（确保解析动作正常执行）\n\n3. 准备（Preparation）：为类变量分配内存并设置零值，static final 常量直接赋值为编译期结果\n\n4. 解析（Resolution）：将常量池内的符号引用替换为直接引用，包括类/接口、字段、方法、接口方法、方法类型、方法句柄、调用点限定符的解析\n\n5. 初始化（Initialization）：执行类构造器<clinit>()方法，按程序员的赋值语句执行初始化，遵循双亲委派模型，保证线程安全',
   analogy: '就像【新员工入职】：加载是【HR 收到简历】；验证是【核实学历真伪】；准备是【分配工位和电脑】；解析是【把名字和具体的工号对应起来】；初始化是【正式开始干活】。',
   importance: 'medium'
  },
  {
   id: 'jvm-gc-collectors',
   question: 'CMS 和 G1 垃圾回收器有什么区别？',
   answer: '【CMS（Concurrent Mark Sweep）】\n\n特点：\n- 目标：获取最短回收停顿时间\n- 算法：标记 - 清除算法\n- 运行模式：并发收集、低停顿\n\n运作步骤：\n1. 初始标记（STW）：标记 GC Roots 能直接关联的对象\n2. 并发标记：从 GC Roots 开始遍历可达对象\n3. 重新标记（STW）：修正并发期间变动的记录\n4. 并发清除：清理可回收对象\n\n缺点：\n- 产生内存碎片\n- 对 CPU 资源敏感\n- 无法处理浮动垃圾\n- Full GC 时停顿时间长\n\n【G1（Garbage First）】\n\n特点：\n- 目标：可预测的停顿时间模型\n- 算法：标记 - 整理算法（局部复制）\n- 内存布局：Region 分区（不要求连续）\n\n运作步骤：\n1. 初始标记（STW）\n2. 并发标记\n3. 最终标记（STW）\n4. 筛选回收（STW）：优先回收价值最大的 Region\n\n优势：\n- 不产生内存碎片\n- 可预测停顿时间\n- 适合大堆内存（6GB+）\n- 避免 Full GC\n\n【选择建议】\n- 4GB 以下堆：Parallel Scavenge + Parallel Old\n- 4-8GB 堆：CMS\n- 8GB+ 堆：G1 或 ZGC',
   analogy: 'CMS 就像是【见缝插针的清洁工】，看到垃圾就扫，但扫完后房间里还是乱七八糟；G1 就像是【区域化管理的保洁团队】，把房间分成小块，哪块最脏先扫哪块，还能顺便把家具摆齐。',
   importance: 'high'
  },
  {
   id: 'jvm-references',
   question: 'Java 中的四种引用类型是什么？',
   answer: '【强引用（Strong Reference）】\n- 定义：代码中普遍存在的引用，如 Object obj = new Object()\n- 特性：只要强引用存在，GC 绝不回收\n- 问题：可能导致内存泄漏（如集合类只增不减）\n\n【软引用（Soft Reference）】\n- 定义：描述还有用但非必需的对象\n- 特性：内存溢出前会回收这些对象\n- 应用：实现内存敏感的缓存（如图片缓存）\n- API：SoftReference<T>\n\n【弱引用（Weak Reference）】\n- 定义：描述非必需的对象\n- 特性：下次 GC 发生时必定回收\n- 应用：临时映射关系（如 ThreadLocal）\n- API：WeakReference<T>\n\n【虚引用（Phantom Reference）】\n- 定义：最弱的引用，不影响对象生命周期\n- 特性：无法通过虚引用获取对象实例\n- 作用：跟踪对象被回收的状态\n- 应用：管理堆外内存（DirectByteBuffer）\n- API：PhantomReference<T> + ReferenceQueue\n\n【引用强度排序】\n强引用 > 软引用 > 弱引用 > 虚引用',
   analogy: '强引用是【亲生骨肉】，再穷也要养；软引用是【远房亲戚】，家里有粮就管饭，没粮就顾不上了；弱引用是【路人甲】，清洁工（GC）一过来就得走；虚引用是【影子】，你甚至感觉不到它的存在。',
   importance: 'medium'
  },
  {
   id: 'jvm-leak-overflow',
   question: '内存泄漏和内存溢出有什么区别？',
   answer: '【内存溢出（OutOfMemoryError）】\n\n定义：\n- 程序申请内存时，没有足够的内存供其使用\n- JVM 无法为新对象分配内存空间\n\n常见类型：\n1. Java heap space：堆内存不足\n2. Metaspace：元空间不足\n3. Unable to create new native thread：线程数超限\n4. Direct buffer memory：直接内存不足\n\n原因：\n- 内存太小，不足以支撑业务\n- 存在内存泄漏，逐渐耗尽内存\n- 大对象过多，占用大量内存\n\n【内存泄漏（Memory Leak）】\n\n定义：\n- 程序申请内存后，无法释放已申请的内存空间\n- 对象已经无用，但 GC Roots 仍能引用到\n\n常见场景：\n1. 静态集合类：static Map/List 只增不减\n2. 未关闭的资源：数据库连接、IO 流\n3. ThreadLocal 未 remove：线程池场景\n4. 监听器未注销：注册后忘记移除\n5. 不合理的作用域：长生命周期对象持有短生命周期对象引用\n\n【排查方法】\n1. jmap 生成 dump 文件\n2. MAT 分析 Dominator Tree\n3. 查看 Histogram 找出异常多的对象\n4. 分析 GC Roots 引用链',
   analogy: '内存溢出就像【杯子太小水太多】，装不下了；内存泄漏就像【杯子漏了】，虽然水还没满，但一直在流失，最后也没水喝了。',
   importance: 'high'
  },
  {
   id: 'jvm-string-pool',
   question: 'String s = new String("abc") 创建了几个对象？',
   answer: '会创建 1 个或 2 个对象。如果字符串常量池中没有"abc"，则会在常量池中创建一个对象，并在堆中创建一个 String 对象；如果常量池中已有"abc"，则只在堆中创建一个 String 对象。',
   analogy: '就像【去复印店印资料】：如果店里没有原件（常量池），老板先得弄一份原件，再给你印一份（堆对象）；如果店里已经有原件了，直接给你印一份就行。',
   importance: 'medium'
  },
  {
   id: 'jvm-object-lifecycle',
   question: '简单谈谈一个 Java 对象的生命周期？',
   answer: '1. 创建阶段（分配内存、初始化）；2. 应用阶段（被引用）；3. 不可见阶段（超出作用域）；4. 不可达阶段（无引用指向）；5. 收集阶段（GC 标记）；6. 终结阶段（调用 finalize）；7. 对象空间重分配。',
   analogy: '就像【一个人的职场生涯】：入职（创建）-> 在岗（应用）-> 离岗（不可见）-> 退休（不可达）-> 销户（收集/重分配）。',
   importance: 'low'
  },
  {
   id: 'jvm-jmm',
   question: '谈谈你对 Java 内存模型 (JMM) 的理解？',
   answer: '【JMM 定义】\nJava Memory Model 是一种规范，定义了 Java 虚拟机如何与计算机内存（RAM）进行交互。它解决了多线程环境下的可见性、原子性和有序性问题。\n\n【核心概念】\n1. 主内存（Main Memory）：所有线程共享的内存区域，存储变量副本\n2. 工作内存（Working Memory）：每个线程私有，存储自己使用变量的副本\n\n【三大问题】\n1. 可见性：一个线程修改共享变量后，其他线程能否立即得知\n   - 解决：volatile、synchronized、final\n2. 原子性：一个或多个操作要么全部执行成功，要么都不执行\n   - 解决：synchronized、Lock、Atomic 类\n3. 有序性：程序执行的顺序按照代码先后顺序\n   - 解决：volatile（禁止重排序）、happens-before 原则\n\n【happens-before 原则】\n1. 程序次序规则：单线程内按代码顺序\n2. 锁定解锁规则：unlock 发生在 lock 之后\n3. volatile 变量规则：write 发生在 read 之后\n4. 传递性规则：A happens-before B, B happens-before C => A happens-before C\n5. 线程启动规则：start() 发生在该线程的每个动作之前\n6. 线程终止规则：线程的所有操作发生在 termination 之前',
   analogy: '就像【总公司和分公司】：总公司有【总账本】（主内存），每个分公司有自己的【小账本】（工作内存）。分公司干完活得把数据同步回总公司，别人才能看到。',
   importance: 'high'
  },
  {
   id: 'jvm-stack-pointer',
   question: '栈中存的到底是指针还是对象？',
   answer: '栈中存放的是基本数据类型的值和对象的引用（即指针），而对象实例本身存放在堆中。',
   analogy: '就像【你的书架】：书架上放的是【书的索引卡片】（栈中的引用），而真正的【书】（对象）存在仓库（堆）里。',
   importance: 'medium'
  },
  {
   id: 'jvm-pc-private',
   question: '程序计数器为什么是私有的？',
   answer: '程序计数器记录当前线程执行的字节码行号。为了线程切换后能恢复到正确的执行位置，每个线程必须有独立的计数器。',
   analogy: '就像【每个人看书时的书签】：如果大家共用一个书签，你刚看到第 10 页，别人翻到了第 50 页，你回来就不知道自己看到哪了。',
   importance: 'medium'
  },
  {
   id: 'jvm-method-area',
   question: '方法区中都存放了哪些东西？',
   answer: '存放已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等。',
   analogy: '就像【工厂的模具库】：里面放的是生产各种产品的【模具】（类信息）和【标准参数】（常量、静态变量）。',
   importance: 'medium'
  },
  {
   id: 'jvm-gc-trigger',
   question: '如何触发垃圾回收？',
   answer: '【自动触发】\n\n1. Minor GC（新生代 GC）\n   - 触发条件：Eden 区空间不足\n   - 回收对象：新生代中的对象\n   - 停顿时间：短（毫秒级）\n   - 回收算法：标记 - 复制\n\n2. Major/Full GC（老年代 GC）\n   - 触发条件：\n     * 老年代空间不足\n     * 元空间/永久代空间不足\n     * System.gc() 建议触发\n     * Minor GC 后存活对象超过 Survivor 容量\n   - 回收对象：整个堆（新生代 + 老年代）+ 方法区\n   - 停顿时间：长（秒级）\n   - 回收算法：标记 - 整理/标记 - 清除\n\n【手动触发】\n\nSystem.gc()\n- 作用：建议 JVM 进行 Full GC\n- 问题：不保证立即执行，可能被忽略\n- 风险：带来不必要的性能开销\n- 建议：生产环境禁用（-XX:+DisableExplicitGC）\n\n【GC 日志分析】\n- 开启参数：-Xloggc:/path/gc.log -XX:+PrintGCDetails\n- 关键指标：GC 频率、停顿时间、回收效率',
   analogy: '就像【倒垃圾】：1. 垃圾桶满了（Eden 满），环卫工自动来收；2. 你给环卫局打电话（System.gc），求他们来收，但他们不一定马上来。',
   importance: 'medium'
  },
  {
   id: 'jvm-bytecode-structure',
   question: 'Java 字节码文件结构是怎样的？',
   answer: 'Class 文件包含：魔数（0xCAFEBABE）、版本号、常量池、访问标志、当前类索引、父类索引、接口索引、字段表、方法表、属性表。其中常量池是核心，存放字面量和符号引用。',
   analogy: '就像【身份证】：开头是国徽（魔数），然后是签发日期（版本），姓名地址（常量池），照片（类信息），最后还有各种防伪标记（属性表）。',
   importance: 'medium'
  },
  {
   id: 'jvm-jit-compilation',
   question: '什么是 JIT 编译器？它的工作原理是什么？',
   answer: '【JIT 定义】\nJust-In-Time Compiler，在运行时将热点代码编译成本地机器码，提高执行效率。\n\n【为什么需要 JIT】\n- 解释执行：字节码逐行翻译，速度慢但启动快\n- 编译执行：直接执行机器码，速度快但启动慢\n- JIT：结合两者优势，热点代码编译优化\n\n【工作原理】\n\n1. 热点探测\n   - 基于计数器：方法调用计数器、回边计数器\n   - 热点判定：超过阈值即认定为热点代码\n\n2. 分层编译（Tiered Compilation）\n   - C1 编译器（Client）：快速编译，轻量优化\n   - C2 编译器（Server）：深度优化，耗时较长\n   - 策略：根据代码热度选择不同编译级别\n\n3. 优化技术\n   - 方法内联：消除方法调用开销\n   - 逃逸分析：判断对象作用域范围\n   - 锁优化：偏向锁、轻量级锁\n   - 死代码消除：移除不会执行的代码\n\n【执行流程】\n解释执行 -> 热点探测 -> C1 编译 -> C2 编译 -> 执行优化后的机器码',
   analogy: '就像【翻译官】：刚开始是逐句翻译（解释执行），发现某段话老是被问到（热点代码），就直接把整段话背下来（编译成机器码），下次直接说，不用再想。',
   importance: 'high'
  },
  {
   id: 'jvm-gc-tuning',
   question: 'JVM 调优有哪些常用参数？',
   answer: '【堆内存设置】\n-Xms：初始堆大小（建议与-Xmx 相同，避免震荡）\n-Xmx：最大堆大小（根据物理内存，通常不超过 70%）\n-Xmn：新生代大小（通常为堆的 1/3-1/4）\n\n【新生代比例】\n-XX:NewRatio：老年代/新生代比例（默认 2）\n-XX:SurvivorRatio：Eden/Survivor 比例（默认 8）\n\n【GC 算法选择】\n-XX:+UseSerialGC：串行收集器（单核/客户端）\n-XX:+UseParallelGC：并行收集器（多核/吞吐量优先）\n-XX:+UseConcMarkSweepGC：CMS 收集器（低延迟）\n-XX:+UseG1GC：G1 收集器（大堆/可预测停顿）\n-XX:+UseZGC：ZGC 收集器（超低停顿，JDK11+）\n\n【GC 日志】\n-XX:+PrintGCDetails：输出详细 GC 日志\n-XX:+PrintGCDateStamps：打印时间戳\n-Xloggc:/path/gc.log：指定日志文件\n-XX:+UseGCLogFileRotation：日志滚动\n\n【OOM 分析】\n-XX:+HeapDumpOnOutOfMemoryError：OOM 时生成 dump\n-XX:HeapDumpPath=/path：指定 dump 文件路径\n\n【其他优化】\n-XX:MaxMetaspaceSize：元空间最大值\n-XX:+DisableExplicitGC：禁用 System.gc()\n-XX:MaxGCPauseMillis：期望的最大停顿时间（G1）\n-XX:ParallelGCThreads：并行 GC 线程数',
   analogy: '就像【调整汽车引擎】：-Xms/-Xmx 是油箱大小；NewRatio 是变速箱速比；PrintGCDetails 是行车记录仪；HeapDumpOnOutOfMemoryError 是黑匣子（出事故时记录数据）。',
   importance: 'high'
  },
  {
   id: 'jvm-classloader-types',
   question: 'JVM 有哪些类加载器？',
   answer: '1. 启动类加载器（Bootstrap）：加载 JAVA_HOME/lib 下的核心类库。2. 扩展类加载器（Extension）：加载 JAVA_HOME/lib/ext 目录的类。3. 应用类加载器（Application）：加载 classpath 下的类。4. 自定义类加载器。',
   analogy: '就像【学校的教育体系】：启动类加载器是教育部统一教材；扩展类加载器是学校自编教材；应用类加载器是老师发的辅导资料；自定义类加载器是你自己买的课外书。',
   importance: 'high'
  },
  {
   id: 'jvm-thread-context-switch',
   question: '线程上下文切换的开销有多大？如何减少？',
   answer: '上下文切换需要保存当前线程状态（程序计数器、栈、寄存器等）并恢复新线程状态，耗时约几微秒到几十微秒。减少方法：1. 使用 CAS 等无锁方案。2. 减少锁竞争。3. 使用 ThreadLocal 避免共享。4. 协程（轻量级线程）。',
   analogy: '就像【换演员上台】：每次换人都得把前一个的道具收走（保存状态），把新人的道具摆好（恢复状态），这个过程中观众只能干等。减少换人次数就能提高效率。',
   importance: 'medium'
  },
  {
   id: 'jvm-string-table',
   question: 'StringTable 的位置变化（JDK6 vs JDK8）？为什么要变？',
   answer: 'JDK6 及之前：StringTable 在永久代（方法区）。JDK7：移到堆中。JDK8：元空间替代永久代，但 StringTable 仍在堆中。原因：字符串是运行时创建最多的对象之一，放在堆中便于 GC 管理，且避免 OOM。',
   analogy: '就像【图书馆的热门书架】：原来放在地下室（永久代），空间小还容易满；后来搬到一楼大厅（堆），空间大还好管理。',
   importance: 'medium'
  },
  {
   id: 'jvm-safepoint',
   question: '什么是安全点（SafePoint）？',
   answer: '安全点是程序执行过程中可以进入 GC 的状态点。线程必须到达安全点才能暂停进行 GC。通常在方法调用、循环回跳、异常跳转等位置设置安全点。',
   analogy: '就像【跑步比赛的补水站】：你不能在任意位置停下来喝水，必须到指定的补水站（安全点）才能停。GC 就是教练要给大家讲战术，所有人都得到补水站集合。',
   importance: 'high'
  },
  {
   id: 'jvm-escape-analysis',
   question: '什么是逃逸分析？有什么作用？',
   answer: '逃逸分析判断对象的作用域是否会超出当前方法或线程。如果对象不逃逸，可以进行：1. 栈上分配（标量替换）。2. 同步消除（锁消除）。3. 连续分配。这能大幅提升性能。',
   analogy: '就像【出差报销】：如果一个员工只在本地干活（不逃逸），公司就给他配共享单车（栈上分配，快且省）；如果要全国跑（逃逸），就得给他配专车（堆上分配，安全但慢）。',
   importance: 'high'
  },
  {
   id: 'jvm-compressed-oops',
   question: '什么是压缩指针（Compressed Oops）？',
   answer: '64 位 JVM 中，对象指针默认 64 位，占用更多内存。开启压缩后（-XX:+UseCompressedOops），指针被压缩成 32 位，节省约 30% 堆内存，且支持最大 32GB 堆。超过 32GB 后自动失效。',
   analogy: '就像【压缩饼干】：本来 64 克的饼干（指针），压缩成 32 克，味道不变但更省空间。这样你的背包（堆）能装更多东西。',
   importance: 'medium'
  },
  {
   id: 'jvm-finalize',
   question: 'finalize() 方法有什么问题？',
   answer: '1. 执行时机不确定，可能很久才被调用。2. 只执行一次，即使对象复活也不会再执行。3. 性能开销大，需要额外队列管理。4. 可能导致对象复活。JDK9 已废弃，建议使用 try-finally 或 Cleaner。',
   analogy: '就像【临终遗嘱】：你不知道什么时候会立遗嘱（执行时机不定），而且遗嘱只能立一次（即使你活过来也不能再改），还请了个律师专门盯着（性能开销）。',
   importance: 'medium'
  }
  ,
  {
   id: 'jvm-20',
   question: '如何判断一个对象是否可以被回收？',
    answer: '主流 JVM 采用可达性分析而不是单纯引用计数。它会从 GC Roots 出发向下搜索，若对象和 GC Roots 之间没有任何引用链相连，就说明对象不可达，可以被回收。GC Roots 常见有栈帧中的局部变量、方法区静态引用、常量引用、JNI 引用等。引用计数实现简单，但无法解决循环引用问题。',
    analogy: '对象回收像查一个人是否还能联系到公司主线，只要从总机一路找不到他，说明这个人已经脱离系统，可以清理。',
    importance: 'high'
  }
,
  {
   id: 'jvm-full-gc-troubleshoot',
   question: '线上 Full GC 频繁时一般怎么排查？',
   answer: '面试里这题重点不是背命令，而是排查顺序。\n\n常见步骤：\n1. 先确认现象\n- GC 日志里 Full GC 是否真的频繁\n- 每次停顿多久\n- 回收后堆占用是否仍然居高不下\n\n2. 再看方向\n- 老年代是不是被大对象、长生命周期对象顶满\n- 元空间是不是持续增长\n- 是否有缓存、集合、ThreadLocal 没释放\n- 是否短时间创建了大量对象导致晋升过快\n\n3. 常用工具\n- \`jstat -gc\` 看各代使用情况\n- \`jmap -histo\` 看对象分布\n- dump 堆后用 MAT / JProfiler / YourKit 分析引用链\n- \`jstack\` 配合看是否有线程堆积导致对象无法释放\n\n4. 常见根因\n- 内存泄漏\n- 缓存无限增长\n- 不合理的 JVM 参数\n- 大批量查询 / 大对象加载\n- 动态生成类过多导致元空间膨胀\n\n5. 处理思路\n- 先找对象为什么活着\n- 再决定改代码、改参数还是改业务流程。',
   analogy: 'Full GC 排查像排查仓库为什么总是爆仓，关键不是只看“满了”，而是找出到底是哪类货一直搬不出去。',
   importance: 'high'
  }
];

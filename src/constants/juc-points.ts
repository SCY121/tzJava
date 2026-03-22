// JUC 并发编程面试题
import { InterviewPoint } from './command-types';

export const JUC_POINTS: InterviewPoint[] = [
  {
   id: 'juc-volatile',
   question: 'volatile 关键字的作用是什么？',
   answer: '【两大核心作用】\n\n1. 可见性（Visibility）\n   - 一个线程修改 volatile 变量后，新值立即刷新到主内存\n   - 其他线程读取时，强制从主内存重新加载，而非使用工作内存缓存\n   - 实现原理：Lock 前缀指令触发 CPU 缓存一致性协议（MESI）\n\n2. 禁止指令重排序（Ordering）\n   - JVM 通过内存屏障（Memory Barrier）禁止特定类型的重排序\n   - 保证有序性：volatile 写之前的操作不会被重排到写之后，读之后的操作不会被重排到读之前\n   - 典型应用：双重检查锁单例模式（DCL）\n\n【局限性】\n- 不保证原子性：如 i++ 操作包含读 - 改 - 写三步，volatile 无法保证中间状态不被干扰\n- 解决方案：AtomicInteger 等原子类（CAS+volatile）、synchronized、ReentrantLock\n\n【使用场景】\n1. 状态标志位：如 volatile boolean flag\n2. 单次安全发布：配置信息、单例\n3. 独立观察值：如温度传感器读数\n4. 与其他变量无关的场景',
   analogy: '就像【公告栏】。如果不加 volatile，每个员工可能只看自己手里的旧通知；加了之后，所有人必须去公告栏看最新的。',
   importance: 'high'
  },
  {
   id: 'juc-aqs',
   question: '谈谈你对 AQS 的理解？',
   answer: '【核心概念】\nAQS（AbstractQueuedSynchronizer）是构建锁和同步器的框架，由 Doug Lea 设计\n\n【核心组件】\n1. State 变量：volatile int，表示同步状态\n   - ReentrantLock：0 表示无锁，1 表示有锁，>1 表示重入次数\n   - CountDownLatch：初始值 N，每 countDown() 一次减 1\n   - Semaphore：可用许可数量\n\n2. CLH 队列：FIFO 的双向链表，等待线程的队列\n   - Node 节点：包含线程引用、等待状态、前后驱节点\n   - 自旋等待：减少上下文切换开销\n\n【资源获取流程】\n1. tryAcquire()：尝试获取资源，成功则返回\n2. 失败则 addWaiter()：封装 Node 加入队列尾部\n3. acquireQueued()：自旋检查前驱是否是头节点\n4. 是则再次尝试获取，失败则 park() 阻塞\n5. 被唤醒后继续竞争\n\n【资源共享方式】\n1. Exclusive（独占）：ReentrantLock、ReentrantReadWriteLock.WriteLock\n2. Share（共享）：CountDownLatch、Semaphore、ReentrantReadWriteLock.ReadLock\n\n【公平 vs 非公平】\n- 公平锁：先判断队列是否有前驱节点，有则排队\n- 非公平锁：直接尝试 CAS 获取，失败再排队（性能更好，减少唤醒开销）',
   analogy: '就像【银行柜台排队系统】。state 是【柜台是否有人】，队列是【排队的客户】。AQS 负责管理谁该进去，谁该排队。',
   importance: 'high'
  },
  {
   id: 'juc-threadpool',
   question: '线程池的核心参数有哪些？',
   answer: '【7 大核心参数】（ThreadPoolExecutor 构造函数）\n\n1. corePoolSize（核心线程数）\n   - 长期存活的线程数，即使空闲也不会被回收（allowCoreThreadTimeOut=false）\n   - 设置建议：CPU 密集型 = CPU 核数 +1；IO 密集型 = CPU 核数 * 2\n\n2. maximumPoolSize（最大线程数）\n   - 允许创建的最大线程数\n   - 非核心线程空闲超过 keepAliveTime 会被回收\n\n3. keepAliveTime（空闲线程存活时间）\n   - 非核心线程最大空闲时间，超时回收\n\n4. unit（时间单位）\n\n5. workQueue（任务队列）\n   - ArrayBlockingQueue：有界队列，防止 OOM\n   - LinkedBlockingQueue：无界队列，可能导致 OOM\n   - SynchronousQueue：不存储元素，直接移交，适合突发流量\n   - PriorityBlockingQueue：带优先级的无界队列\n\n6. threadFactory（线程工厂）\n   - 自定义线程名称、优先级、守护线程等\n   - 建议使用 Guava ThreadFactoryBuilder 或 Apache Commons PoolThreadFactory\n\n7. handler（拒绝策略）\n   - AbortPolicy：抛异常（默认）\n   - CallerRunsPolicy：调用者线程执行\n   - DiscardOldestPolicy：丢弃最老任务\n   - DiscardPolicy：直接丢弃\n\n【合理配置】\n- 监控指标：活跃线程数、队列大小、任务完成数\n- 动态调整：通过 setCorePoolSize() 等方法运行时调整',
   analogy: '就像【咖啡店】。核心线程是【正式员工】，任务队列是【排队区】，最大线程是【临时工】，拒绝策略是【店里实在坐不下了，告诉客人去别家】。',
   importance: 'high'
  },
  {
   id: 'juc-cas',
   question: '什么是 CAS (Compare And Swap)？',
   answer: '【基本原理】\nCAS 是一种乐观锁技术，包含三个操作数：\n- V：内存地址 V 的值\n- A：预期原值\n- B：新值\n如果 V 的值等于 A，则将 V 更新为 B，否则不更新并返回 V 的当前值。整个过程是原子操作。\n\n【硬件实现】\n- 基于 CPU 的 CMPXCHG 指令（x86 架构）\n- Lock 前缀保证多核环境下的原子性\n- 性能远高于加锁（无需上下文切换）\n\n【Java 中的应用】\n- Unsafe 类：compareAndSwapInt/Object/Long()\n- AtomicInteger：getAndIncrement() 底层就是 CAS\n- AQS 的 state 变量更新\n\n【三大问题】\n\n1. ABA 问题\n   - 现象：V 从 A 变 B 又变回 A，CAS 误以为没变过\n   - 解决：版本号机制（AtomicStampedReference）\n   - 示例：支票被偷改金额后又改回，验钞机发现不了\n\n2. 循环时间长开销大\n   - 自旋 CAS 长时间不成功会给 CPU 带来很大开销\n   - 解决：自适应自旋（根据前次经验调整自旋次数）\n\n3. 只能保证一个共享变量的原子操作\n   - 多个变量需使用 AtomicReference 包裹\n   - 或使用锁机制',
   analogy: '就像【去超市买最后一瓶可乐】，你先看一眼架子上是不是还在（预期值），如果是，你就拿走（更新值）。如果被别人拿了，你就失败了。',
   importance: 'medium'
  },
  {
   id: 'juc-threadpool-workflow',
   question: '线程池的工作原理（执行流程）是怎样的？',
   answer: '1. 提交任务，判断核心线程池是否已满；2. 未满则创建核心线程执行；3. 已满则判断阻塞队列是否已满；4. 未满则放入队列；5. 已满则判断最大线程数是否已满；6. 未满则创建非核心线程执行；7. 已满则执行拒绝策略。',
   analogy: '就像【银行办业务】：核心线程是【正式窗口】，队列是【等候区座椅】，最大线程是【临时加开的窗口】，拒绝策略是【保安告诉客户明天再来】。',
   importance: 'high'
  },
  {
   id: 'juc-rejection-policy',
   question: '线程池有哪些拒绝策略？',
   answer: '1. AbortPolicy：直接抛出异常（默认）；2. CallerRunsPolicy：由提交任务的线程执行；3. DiscardOldestPolicy：丢弃队列中最老的任务；4. DiscardPolicy：直接丢弃任务。',
   analogy: 'AbortPolicy 是【直接翻脸】；CallerRunsPolicy 是【谁叫我干谁自己干】；DiscardOldestPolicy 是【喜新厌旧】；DiscardPolicy 是【装作没看见】。',
   importance: 'medium'
  },
  {
   id: 'juc-sync-lock',
   question: 'synchronized 和 ReentrantLock 有什么区别？',
   answer: '1. 实现层面：sync 是 JVM 关键字，Lock 是 API 层面的类；2. 灵活性：Lock 支持公平锁、可中断、超时获取等高级功能；3. 释放方式：sync 自动释放，Lock 必须手动在 finally 中释放。',
   analogy: 'synchronized 就像是【自动感应门】，你走过去就开，走开就关；ReentrantLock 就像是【带钥匙的防盗门】，你得手动开锁，走的时候还得记得反锁。',
   importance: 'high'
  },
  {
   id: 'juc-sleep-wait',
   question: 'sleep() 和 wait() 的区别是什么？',
   answer: '1. 来源：sleep 来自 Thread 类，wait 来自 Object 类；2. 锁释放：sleep 不释放锁，wait 释放锁；3. 使用范围：wait 必须在同步块中使用，sleep 可以在任何地方使用。',
   analogy: 'sleep 就像是【抱着被子睡觉】，谁也别想抢我的被子（锁）；wait 就像是【把被子放下，去排队等通知】，等通知到了再回来拿被子。',
   importance: 'high'
  },
  {
   id: 'juc-threadlocal',
   question: '谈谈你对 ThreadLocal 的理解？',
   answer: '【核心原理】\nThreadLocal 为每个线程提供了一个变量副本，实现了线程间的数据隔离。底层通过 ThreadLocalMap 存储，Key 是 ThreadLocal 实例，Value 是要存储的值。\n\n【数据结构】\n1. Thread 类包含 threadLocals 字段（ThreadLocalMap 类型）\n2. ThreadLocalMap 是定制化的 HashMap\n3. Entry 继承 WeakReference，Key 是弱引用\n\n【应用场景】\n1. 数据库连接管理：每个线程独立的 Connection\n2. Session 管理：Web 请求链路中传递用户信息\n3.  SimpleDateFormat：线程不安全的日期格式化器\n4. MDC 日志上下文：追踪请求链路\n\n【内存泄漏问题】\n原因：\n- Key 是弱引用，会被 GC 回收\n- Value 是强引用，若 ThreadLocal 被回收，Entry 变成 key=null\n- 线程池场景下线程长期存活，Value 无法释放\n\n解决方案：\n- 使用完立即调用 remove()\n- finally 块中清理：try { ... } finally { threadLocal.remove(); }\n\n【与 InheritableThreadLocal】\n- ThreadLocal：子线程无法继承父线程的值\n- InheritableThreadLocal：子线程可以继承，但修改不影响父线程',
   analogy: '就像【每个学生都有一套自己的文具盒】，虽然大家都在同一个教室（进程）里考试，但每个人都用自己的笔，互不干扰。',
   importance: 'medium'
  },
  {
   id: 'juc-lock-types',
   question: '什么是悲观锁和乐观锁？',
   answer: '悲观锁认为每次拿数据都会被修改，所以每次都会加锁（如 synchronized）；乐观锁认为每次拿数据都不会被修改，只在更新时判断有没有人动过（如 CAS）。',
   analogy: '悲观锁就像【出门必带伞】，总觉得会下雨；乐观锁就像【看到下雨才买伞】，觉得大部分时间都是晴天。',
   importance: 'medium'
  },
  {
   id: 'juc-sync-upgrade',
   question: 'synchronized 锁升级的过程是怎样的？',
   answer: '【锁状态升级流程】\n无锁 -> 偏向锁 -> 轻量级锁 -> 重量级锁\n\n【1. 偏向锁（Biased Locking）】\n目的：消除数据无竞争下的同步原语\n触发：第一个访问锁的线程\n实现：\n- Mark Word 记录线程 ID（偏向模式）\n- 该线程再次进入时无需 CAS\n撤销条件：\n- 其他线程尝试获取锁\n- JVM 到达安全点（SafePoint）\n\n【2. 轻量级锁（Lightweight Locking）】\n目的：在无竞争情况下减少重量级锁的开销\n触发：存在其他线程竞争\n实现：\n- 线程在栈帧中创建锁记录（Lock Record）\n- CAS 将对象头 Mark Word 替换为指向锁记录的指针\n- 成功则获得锁，失败则自旋\n自旋：等待几微秒到几十微秒，期待锁持有者快速释放\n\n【3. 重量级锁（Heavyweight Locking）】\n目的：处理激烈竞争\n触发：\n- 自旋超过一定次数（默认 10 次）\n- 一个以上线程等待锁\n实现：\n- Mark Word 升级为 ObjectMonitor（管程）\n- 未获得锁的线程进入阻塞队列\n- 依赖操作系统的 Mutex Lock\n\n【JDK6 优化】\n- 引入自适应自旋：根据前次经验调整自旋次数\n- 锁消除：JIT 编译时移除不可能共享的资源锁\n- 锁粗化：合并连续的小锁操作',
   analogy: '就像【谈恋爱】：偏向锁是【单相思】，只要你来就给你开门；轻量级锁是【有竞争者了，大家在门口转圈（自旋）看谁先抢到】；重量级锁是【竞争太激烈，直接找家长（操作系统）来仲裁，没抢到的去排队睡觉】。',
   importance: 'high'
  },
  {
   id: 'juc-shutdown',
   question: 'shutdown() 和 shutdownNow() 有什么区别？',
   answer: 'shutdown() 会停止接收新任务，但会等待已提交的任务执行完；shutdownNow() 会尝试停止正在执行的任务，并返回队列中未执行的任务列表。',
   analogy: '就像【餐厅打烊】：shutdown 是【不再接待新客人，但让已经坐下的客人吃完】；shutdownNow 是【不仅不接新客，还让正在吃的客人赶紧走，没上的菜也不做了】。',
   importance: 'medium'
  },
  {
   id: 'juc-thread-states',
   question: 'Java 线程有哪些状态？',
   answer: '【六大状态】（定义在 Thread.State 枚举中）\n\n1. NEW（新建）\n- 特征：已创建但未启动（未调用 start()）\n- 示例：new Thread()\n\n2. RUNNABLE（可运行）\n- 特征：正在 Java 虚拟机中执行，可能正在等待操作系统资源\n- 包含：就绪（Ready）+ 运行中（Running）\n- 示例：调用 start() 后\n\n3. BLOCKED（阻塞）\n- 特征：等待获取监视器锁（synchronized）\n- 触发：进入 synchronized 代码块/方法时锁被占用\n- 示例：争抢对象锁失败\n\n4. WAITING（无限期等待）\n- 特征：等待其他线程执行特定动作\n- 触发方式：\n  * Object.wait()（无超时）\n  * Thread.join()（无超时）\n  * LockSupport.park()\n- 特点：需要被显式唤醒\n\n5. TIMED_WAITING（限期等待）\n- 特征：在指定时间内等待\n- 触发方式：\n  * Thread.sleep(time)\n  * Object.wait(timeout)\n  * Thread.join(timeout)\n  * LockSupport.parkNanos()\n- 特点：超时后自动返回\n\n6. TERMINATED（终止）\n- 特征：线程已执行完成\n- 触发：run() 方法正常结束或异常退出\n\n【状态转换】\nNEW -> RUNNABLE -> (BLOCKED/WAITING/TIMED_WAITING) <-> RUNNABLE -> TERMINATED',
   analogy: '就像【上班族的一天】：NEW 是【刚入职】；RUNNABLE 是【正在工位干活】；BLOCKED 是【在会议室门口等开门】；WAITING 是【等老板发工资】；TIMED_WAITING 是【定个闹钟午睡】；TERMINATED 是【离职】。',
   importance: 'high'
  },
  {
   id: 'juc-countdownlatch',
   question: 'CountDownLatch 的作用是什么？',
   answer: '允许一个或多个线程等待其他线程完成操作。它维护一个计数器，每调用一次 countDown() 计数器减一，当计数器为 0 时，在 await() 上等待的线程被唤醒。',
   analogy: '就像【拼团购物】：必须凑够 5 个人（计数器为 5），团长（主线程）才会下单发货。',
   importance: 'medium'
  },
  {
   id: 'juc-creation',
   question: 'Java 中创建线程的方式有哪些？',
   answer: '1. 继承 Thread 类；2. 实现 Runnable 接口；3. 实现 Callable 接口（带返回值）；4. 使用线程池。',
   analogy: '就像【去目的地】：1. 自己开车（继承 Thread）；2. 坐公交车（实现 Runnable）；3. 打车并要求发票（实现 Callable）；4. 租车公司的车队（线程池）。',
   importance: 'high'
  },
  {
   id: 'juc-stop-thread',
   question: '如何停止一个线程的运行？',
   answer: '不建议使用 stop()（已废弃，不安全）。建议使用：1. 设置标志位；2. 调用 interrupt() 方法配合 isInterrupted() 检查。',
   analogy: '就像【让员工下班】：stop() 是【直接断电】，可能导致工作没保存；标志位是【发个微信通知】，员工干完手头的活就走。',
   importance: 'medium'
  },
  {
   id: 'juc-notify-all',
   question: 'notify() 和 notifyAll() 有什么区别？',
   answer: 'notify() 随机唤醒一个在等待队列中的线程；notifyAll() 唤醒所有在等待队列中的线程，让他们去竞争锁。',
   analogy: '就像【下课】：notify() 是老师叫【某一个同学】起来回答问题；notifyAll() 是老师说【下课了】，所有同学都冲向食堂。',
   importance: 'medium'
  },
  {
   id: 'juc-aqs-fair',
   question: '如何用 AQS 实现一个可重入的公平锁？',
   answer: '1. 可重入：检查当前线程是否是已持有锁的线程，若是则 state + 1；2. 公平：在尝试获取锁前，先判断等待队列中是否有前驱节点（hasQueuedPredecessors）。',
   analogy: '就像【排队领奶茶】：公平锁是【必须看前面有没有人排队】，有人就得去后面；可重入是【你已经领了一杯，想再领一杯，店员认识你直接给你】。',
   importance: 'high'
  },
  {
   id: 'juc-cas-drawback',
   question: 'CAS 有什么缺点？',
   answer: '1. ABA 问题（值变了又变回去了）；2. 自旋时间长开销大；3. 只能保证一个共享变量的原子操作。',
   analogy: '就像【看守行李】：你离开一会儿，行李被换了一个一模一样的（ABA），你回来以为没动过。',
   importance: 'medium'
  },
  {
   id: 'juc-scenario-print',
   question: '场景题：多线程打印奇偶数，怎么控制顺序？',
   answer: '可以使用 wait/notify 机制，或者使用两个 Semaphore，或者使用 ReentrantLock 配合 Condition。',
   analogy: '就像【接力赛】：跑完奇数的同学拍一下跑偶数的同学（notify），然后自己休息（wait）。',
   importance: 'medium'
  },
  {
   id: 'juc-singleton-volatile',
   question: '单例模式既然已经用了 synchronized，为什么还要加 volatile？',
   answer: '主要是为了禁止指令重排序。创建对象不是原子操作，分为：分配内存、初始化对象、设置引用指向内存。如果不加 volatile，可能拿到一个未初始化的对象。',
   analogy: '就像【盖房子】：正常是【打地基 -> 装修 -> 挂牌】。如果不禁止重排，可能【挂牌】跑到了【装修】前面，别人看到牌子以为能住了，进去发现还没装修。',
   importance: 'high'
  },
  {
   id: 'juc-atomic-classes',
   question: 'Java 有哪些原子类（Atomic）？原理是什么？',
   answer: '1. 基本类型：AtomicInteger、AtomicLong、AtomicBoolean。2. 数组：AtomicIntegerArray。3. 引用：AtomicReference。4. 字段更新器：AtomicIntegerFieldUpdater。原理都是 CAS + volatile。',
   analogy: '就像【自动售货机】：你投币（CAS 操作），机器检查余额（volatile 保证可见性），然后出货，整个过程不需要锁。',
   importance: 'high'
  },
  {
   id: 'juc-longadder',
   question: 'LongAdder 和 AtomicLong 有什么区别？',
   answer: 'AtomicLong 是单个 volatile 变量 + CAS，高并发时 CAS 竞争激烈性能下降。LongAdder 采用分段累加，每个线程累加自己的 Cell，最后求和。适合读多写少场景。',
   analogy: '就像【银行柜台】：AtomicLong 是只有一个窗口，大家排队办业务；LongAdder 是多个窗口，每个人去不同窗口，最后把各窗口的总额加起来。',
   importance: 'high'
  },
  {
   id: 'juc-completablefuture',
   question: 'CompletableFuture 的作用是什么？如何使用？',
   answer: '用于异步编程，支持链式调用和组合。常用方法：supplyAsync（异步执行）、thenApply（转换结果）、thenAccept（消费结果）、exceptionally（异常处理）、allOf（等待所有完成）。',
   analogy: '就像【点外卖 APP】：下单（supplyAsync）-> 商家接单制作 -> 骑手配送（thenApply）-> 送到你手上（thenAccept）-> 如果洒了申请理赔（exceptionally）。',
   importance: 'high'
  },
  {
   id: 'juc-cyclicbarrier',
   question: 'CyclicBarrier 和 CountDownLatch 的区别？',
   answer: 'CountDownLatch 是倒计数器，一个或多个线程等待其他线程完成，不可重用。CyclicBarrier 是循环屏障，一组线程互相等待，到达屏障点后继续执行，可重用。',
   analogy: 'CountDownLatch 像【拼图游戏】：必须所有人都拼完（countDown），才能开启下一关。CyclicBarrier 像【等人到齐开饭】：每道菜上齐（屏障点），大家才开始吃，吃完等下一道。',
   importance: 'medium'
  },
  {
   id: 'juc-semaphore',
   question: 'Semaphore（信号量）的作用是什么？',
   answer: '控制同时访问特定资源的线程数量。通过 acquire() 获取许可，release() 释放许可。适用于限流场景，如数据库连接池、停车场管理等。',
   analogy: '就像【停车场的车位】：总共只有 100 个车位（permits），进来一辆车 acquire()，出去一辆车 release()。满了就得在外面等。',
   importance: 'medium'
  },
  {
   id: 'juc-stampedlock',
   question: 'StampedLock 有什么特点？',
   answer: 'JDK8 引入的乐观锁实现，支持读锁、写锁和乐观读。返回一个 stamp 作为版本号。读操作不互斥，性能高于 ReentrantReadWriteLock。但不支持重入，可能饥饿。',
   analogy: '就像【图书馆借书】：读锁是多人同时看同一本书（不互斥），写锁是只能一个人修改批注。乐观读是先看书，还的时候检查有没有被别人改过（validate）。',
   importance: 'high'
  },
  {
   id: 'juc-forkjoin',
   question: 'Fork/Join 框架的原理是什么？',
   answer: '基于分治思想，将大任务拆分成小任务（Fork），递归处理，最后合并结果（Join）。使用工作窃取算法：空闲线程从其他线程队列尾部窃取任务，提高 CPU 利用率。',
   analogy: '就像【老师布置作业】：把全班分成若干小组（Fork），每组完成一部分，最后汇总（Join）。做得快的组可以去帮别的组（工作窃取）。',
   importance: 'medium'
  },
  {
   id: 'juc-locksupport',
   question: 'LockSupport.park() 和 unpark() 的原理？',
   answer: 'LockSupport 是底层线程阻塞工具类，基于 UNSAFE 的 native 方法实现。park() 阻塞当前线程，unpark(thread) 唤醒指定线程。与 sleep 不同，unpark 可以在 park 之前调用，不会丢失唤醒信号。',
   analogy: '就像【叫起床】：sleep 是你定了闹钟，别人叫你听不到；park/unpark 是别人可以提前拍一下你肩膀（unpark），你再躺下睡（park），醒来后记得有人叫过你。',
   importance: 'medium'
  },
  {
   id: 'juc-condition',
   question: 'Condition 和 Object 的 wait/notify 有什么区别？',
   answer: 'Condition 是 Lock 配套的，可以实现多条件等待（可以有多个 Condition 实例）。wait/notify 是 Object 的方法，每个对象只有一个等待队列。Condition 更灵活。',
   analogy: '就像【医院候诊】：wait/notify 是所有病人在一个房间等（只有一个队列）；Condition 是内科、外科、儿科各有候诊区（多个队列），互不干扰。',
   importance: 'high'
  },
  {
   id: 'juc-readwritelock',
   question: 'ReentrantReadWriteLock 的应用场景？',
   answer: '适用于读多写少的场景。读锁是共享的（多个线程可同时读），写锁是独占的。支持锁降级（先写锁再读锁），不支持锁升级。',
   analogy: '就像【公告栏】：读锁是多人同时看公告（共享），写锁是管理员贴新公告时不许别人看（独占）。',
   importance: 'medium'
  },
  {
   id: 'juc-thread-pool-monitor',
   question: '如何监控线程池的状态？',
   answer: '通过线程池的 getPoolSize()、getActiveCount()、getQueue().size() 等方法。也可以自定义 ThreadFactory 记录线程信息，或使用 Micrometer 等监控工具。',
   analogy: '就像【餐厅经理巡店】：看有几个服务员在岗（getPoolSize）、几个在忙（getActiveCount）、门口等位的有几人（queue.size）。',
   importance: 'low'
  }
];

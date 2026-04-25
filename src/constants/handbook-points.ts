import { InterviewPoint } from './command-types';

export const REDIS_HANDBOOK_POINTS: InterviewPoint[] = [
    {
        "id":  "redis-handbook-1",
        "question":  "什么是缓存穿透？",
        "answer":  "**所属专题：Redis缓存三兄弟：缓存雪崩、缓存击穿、缓存穿透**\n\n查询一个**不存在**的数据，mysql查询不到数据也不会直接写入缓存，就会导致每次请求都查询数据库\n\n**解决方案一**：缓存数据，查询返回结果为空，仍把这个空结果进行缓存 {key:1,value:null}\n\n优点：简单\n\n缺点：1.消耗内存 2.不一致\n\n**解决方案二：** 在查缓存前加一个布隆过滤器\n\n优点：内存占用较少，没有多余key\n\n缺点：实现复杂，存在误判",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-2",
        "question":  "什么是布隆过滤器？",
        "answer":  "**所属专题：Redis缓存三兄弟：缓存雪崩、缓存击穿、缓存穿透**\n\n布隆过滤器通过位图(bitmap)实现:一个以位为单位的数组，数组中每个单元只能存储二进制数0或1\n\n通过多个hash函数获取hash值，根据hash将对应位置**改为1**\n\n**作用：** 检索一个元素是否在集合中\n\n**出现误判怎么办：** 扩大hash函数使用数量、布隆计数过滤器（利于删除）",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-3",
        "question":  "什么是缓存击穿？",
        "answer":  "**所属专题：Redis缓存三兄弟：缓存雪崩、缓存击穿、缓存穿透**\n\n给某一个key设置了过期时间，当key过期时，恰好这个时间点对这个key有大量的**并发**请求，这些并发请求会把DB瞬间压垮(DB查到数据更新缓存来不及)\n\n**解决方案一：** 互斥锁\n\n优点：强一致 （其他线程需要等待缓存更新）\n\n缺点：性能差\n\n**解决方案二：** 不设置过期时间\n\n优点：性能好\n\n缺点：不能保证缓存和DB数据一致",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-4",
        "question":  "什么是缓存雪崩？",
        "answer":  "**所属专题：Redis缓存三兄弟：缓存雪崩、缓存击穿、缓存穿透**\n\n同一时段大量的缓存key同时失效或者服务器宕机，导致大量请求到达DB，把DB压垮\n\n**解决方案一：** 给不同的Key的TTL添加随机值\n\n**解决方案二：** 利用Redis集群提高服务的可用性\n\n**解决方案三：** 给缓存业务添加降限流策略（**保底策略**）\n\n**解决方案四：** 给业务添加多级缓存",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-5",
        "question":  "双写一致？",
        "answer":  "**所属专题：缓存一致性**\n\n当修改了数据库的同时也要更新缓存中的数据，保证缓存和数据库一致\n\n**读操作：** 缓存命中，直接返回；缓存未命中查询数据库，更新缓存，设定超时时间\n\n**写操作**：\n\n1.延时双删（【读+写并发】下不能严格保持强一致）：删除缓存-\u003e更新数据库-\u003e延时-\u003e删除缓存\n\n2.先更新数据库、再删除缓存（【读+写并发】下同样不能严格避免强一致）\n\n本质上时删除、更新缓存的速度很快，可以和前一条操作看作一个接近原子操作。\n\n**保证强一致的业务场景**：分布式锁、读写锁 （读和读共享，写和其他读写互斥）\n\n**允许延迟的业务场景：** 采用异步通知，1.利用MQ中间件，更新数据后，通知缓存删除 2.利用canal中间件，伪装为mysql的一个从节点，通过读取binlog数据更新缓存",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-6",
        "question":  "什么是RDB？",
        "answer":  "**所属专题：Redis持久化**\n\nRDB Redis数据备份文件（Redis Database Backupfile），也叫Redis数据快照。\n\n把文件内存中的所有数据记录到磁盘中。\n\nsave:Redis主进程执行RDB\n\nbgsave:另外启动一个子进程执行RDB\n\n**RDB的执行原理**：bgsave开始会fork主进程得到子进程，读时共享，写时复制。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-7",
        "question":  "什么是AOF？",
        "answer":  "**所属专题：Redis持久化**\n\nAOF 追加文件（Append Only File），写命令日志文件。\n\nAOF重写：`set num 123` 后记录`set num 666` ，重写后会变成只记录set num 666.",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-8",
        "question":  "AOF持久化是怎么实现的？",
        "answer":  "**所属专题：Redis持久化**\n\nRedis提供了三种AOF日志回写硬盘的策略：Always（执行一次redis命令进行I/O一次）、Everysec（每隔1s一次）、No（交给操作系统），可靠性上从高到底、性能上从低到高。\n\n随着命令越多，AOF文件体积会越来越大，为了避免日志过大，Redis进入AOF重写。\n\n**AOF重写**：\n\n1.启动bgrewriteaof子进程，读时共享物理内存、若主线程修改key-value时会发生写时复制\n\n2.子进程会根据主进程的aof_buffer，重新生成一个AOF日志，当完成后替换旧的AOF日志\n\n3.主进程在生成子进程AOF日志时若修改key-value，则放入AOF重写缓存区，追加到子进程生成的新AOF日志。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-9",
        "question":  "RDB持久化时怎么实现的？",
        "answer":  "**所属专题：Redis持久化**\n\nRDB会开启bgsave子进程，同样，读时共享物理内存，写时复制：\n\n若RDB持久化期间发生了主进程修改了key-value，则写时复制，新修改的key-value数据需要等到下一次的bgsave子进程处理了。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-10",
        "question":  "大key如何影响持久化？",
        "answer":  "**所属专题：Redis持久化**\n\n1.AOF写入磁盘：会阻塞主线程\n\n2.AOF重写：如果AOF过大，会触发AOF重写，子进程bgrewriteaof会复制父进程页表，该页表可能很大。此外，当主进程修改大key，会发生写时复制，写时复制需要时间。\n\n3.RDB：子进程bgsave会复制父进程save页面，该页表可能很大。此外，当主进程修改大key，会发生写时复制，写时复制需要时间。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-11",
        "question":  "RDB和AOF对比？",
        "answer":  "**所属专题：Redis持久化**\n\n**执行方式：** RDB定时对整个内存做快照，AOF记录每一次执行命令\n\n**数据完整性：** RDB不完整，AOF相对完整\n\n**文件大小**：RDB有压缩相对小,AOF大\n\n**恢复：** RDB快，AOF慢\n\n**使用场景**：RDB用于可容忍数分钟数据丢失，追求更快启动速度场景；AOF用于数据安全性较高场景\n\n所以有一种混合持久化方案：AOF文件前半部分时RDB格式全量数据，后半部分时AOF格式的增量数据。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-12",
        "question":  "key过期后怎么办？",
        "answer":  "**所属专题：Redis过期淘汰策略**\n\n**1.定时删除**：在设置key过期时间，创建一个定时时间，时间到达时，事件处理器自动执行key的删除\n\n**优点**：对内存占用友好\n\n**缺点**：对性能不友好\n\n**1.惰性删除**：使用key时才检查是否过期\n\n**优点：** 对性能友好\n\n**缺点**：对内存占用不友好\n\n**3.定期删除**： 每隔一段时间，对一部分key进行检查，删除里面过期的key，直到下一次检查中过期key比例小于25%\n\n**两种模式：** slow（淘汰频率固定）、fast（淘汰频率不固定）\n\n对性能和内存占用的一种折衷方案！\n\n因此，Redis是**惰性删除+定期删除**。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-13",
        "question":  "内存不够怎么办？",
        "answer":  "**所属专题：Redis数据淘汰策略**\n\n常见4种：\n\n1.不淘汰任何key，但是不允许写入新数据(默认)\n\n2.LRU（Least Recently Used） 删除最久没有被使用到的key\n\n3.LFU（Least Frequently Used）删除使用频率最少的key\n\n4.随机删除\n\n注意：2、3、4可以针对过期数据进行淘汰、也可以针对所有数据进行淘汰。\n\n除此以外，针对过期数据淘汰，还可以用ttl优先淘汰更早过期的key。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-14",
        "question":  "如何用Redis实现分布式锁？",
        "answer":  "**所属专题：Redis分布式锁篇**\n\n使用setnx命令\n\n获取锁：`SET lock value NX EX 10`\n\n释放锁：`DEL key`",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-15",
        "question":  "如何确定Redis分布式锁的过期时间？",
        "answer":  "**所属专题：Redis分布式锁篇**\n\nwatch dog给锁续期（默认每隔10s续期一次）\n\n没有锁的线程会忙等待\n\nlua脚本保证redis原子性",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-16",
        "question":  "Redisson实现分布式锁可重入？",
        "answer":  "**所属专题：Redis分布式锁篇**\n\n利用hash结构记录线程id和锁重入次数\n\n| KEY  | VALUE                                                       |\n| ---- | ----------------------------------------------------------- |\n| 锁名 | {field：thread1, value：0} //field为线程id，value为重入次数 |",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-17",
        "question":  "Redisson锁能解决主从数据一致性吗？",
        "answer":  "**所属专题：Redis分布式锁篇**\n\n为了保证强一致性，使用红锁（red lock），保证java应用同时对n/2+1个redisson服务获取相同锁操作。但是**性能太低**，可以使用**zookeeper**保证数据强一致性。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-18",
        "question":  "主从同步是什么？",
        "answer":  "**所属专题：Redis集群(高并发主从、高可用哨兵)**\n\n主从集群：主节点写操作，从节点读操作，**读写分离**。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-19",
        "question":  "主从同步流程？",
        "answer":  "**所属专题：Redis集群(高并发主从、高可用哨兵)**\n\n**全量同步（第一次同步）**：\n\n1. 从节点发起请求数据同步（replication id、offset），主节点判断是不是第一次同步，replid是否一致\n2. 是第一次，返回主节点的数据版本信息，replid相同\n3. 从节点请求同步-\u003e主节点执行bgsave，生成RDB发送到从节点-\u003e主节点记录RDB期间所有命令repl_baklog（根据offset）-\u003e主节点发送repl_baklog中命令\n\n**增量同步（不是第一次同步**）：\n\n1.从节点请求主节点同步数据，主节点判断是不是第一次，不是第一次，replid不相同\n\n2.主节点从repl_backlog_buffer获取offset值后的写操作数据，发送给从节点进行数据同步",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-20",
        "question":  "哨兵模式是什么？",
        "answer":  "**所属专题：Redis集群(高并发主从、高可用哨兵)**\n\n主节点宕机，主从集群故障自动恢复\n\n**监控：** 检查主节点和从节点状态\n\n**自动故障恢复：** 如果主节点故障，会选择一个从节点变成主节点\n\n**通知：** 通知redis客户端redis服务的变更",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-21",
        "question":  "哨兵选主规则？",
        "answer":  "**所属专题：Redis集群(高并发主从、高可用哨兵)**\n\n1.判断主从节点断开时长，超过指定时长排除\n\n2.判断优先级（config里设置），越小优先级越高\n\n3.如果优先级一样，**判断从节点offset值，越大优先级越好**\n\n4.最后判断从节点id，越小优先级越高",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-22",
        "question":  "脑裂？",
        "answer":  "**所属专题：Redis集群(高并发主从、高可用哨兵)**\n\n哨兵模式中，主节点并没有宕机，而是与其他从节点网络出现问题，导致哨兵又选了一个主节点。\n\n客户端数据仍然传给原主节点，当网络正常后，原主节点变成从节点会删除自己的本地数据，做全量同步，此时客户端之前写的数据产生了丢失。\n\n**如何解决脑裂：**\n\n当主节点的从节点少于1个或者主节点和从节点数据同步的延时超过5秒，客户端不能写数据到该主节点。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-23",
        "question":  "分片集群？",
        "answer":  "**所属专题：Redis集群(高并发主从、高可用哨兵)**\n\n为了解决：\n\n1.海量数据存储，一个master主节点不够\n\n2.写并发\n\n**解决：**\n\n1.集群中有多个master，每个master保存不同数据\n\n2.每个master可以有多个slave节点\n\n3.master通过ping检测彼此健康状态(不需要哨兵)\n\n4.客户端请求可以访问集群中任意节点，最终都会转发到正确节点（根据key哈希值和哈希槽取余，具体公式为：CRC16(key) % 16384）\n\n注：16384的原因是ping的消息头不需要65536（8kb）那么大，同时redis集群主节点一般不会超过1000个（超过网络可能拥塞），同时能降低redis文件的压缩率。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-24",
        "question":  "Redis是单线程，为什么还是那么快？",
        "answer":  "**所属专题：Redis单线程**\n\n1.纯内存操作 2.避免线程上下文切换和避免考虑线程安全 3.使用I/0多路复用模型",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-25",
        "question":  "I/O多路复用是什么？",
        "answer":  "**所属专题：Redis单线程**\n\nredis的性能瓶颈是网络I/0\n\n三种方式：select poll epoll（与前二者不同，会在通知用户进程时就把socket写入用户空间，不需要挨个遍历socket来判断是否就绪）\n\n核心：通知单个线程监听多个socket，并在某个socket可读可写得到通知，避免无效等待，充分利用cpu资源",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "redis-handbook-26",
        "question":  "Redis网络模型？",
        "answer":  "**所属专题：Redis单线程**\n\n使用I/0多路复用+事件处理器 应对多个socket请求\n\n连接应答处理器\n\n命令回复处理器：多线程处理回复时间\n\n命令请求处理器：多线程增加命令转换速度",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    }
];

export const MYSQL_HANDBOOK_POINTS: InterviewPoint[] = [
    {
        "id":  "mysql-handbook-1",
        "question":  "在MySQL中，如何定位慢查询？",
        "answer":  "**所属专题：MySQL优化**\n\n**方案一**：开源工具\n\n测试工具：Arthas\n\n运维工具：Prometheus、Skywalking\n\n**方案二**：MySQL自带慢日志\n\nlong_query_time （执行耗时超过此值则记录）\n\nslow_query_log=1 （开启慢日志）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-2",
        "question":  "这个SQL语句执行很慢，如何分析？",
        "answer":  "**所属专题：MySQL优化**\n\n**explain**命令观察select语句\n\npossible_key 当前sql可能会使用到的索引\n\nkey 当前sql实际命中的索引\n\nkey_len 索引占用的大小\n\ntype 这条sql的连接的类型 （性能好坏为null、system、const、eq_ref、ref、range、index、all）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-3",
        "question":  "什么是索引？",
        "answer":  "**所属专题：MySQL优化**\n\n索引是帮助MySQL高效获取数据的数据结构(有序)。在数据之外，数据库系统还维护者满足特定查找算法的数据结构（B+树），这些数据结构以某种方式引用（指向）数据。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-4",
        "question":  "为什么InnoDB默认为B+树，B树和B+树区别？",
        "answer":  "**所属专题：MySQL优化**\n\n1.B树每一层根节点需要额外存储数据，而B+树只在最底层叶子节点存储数据\n\n2.B+树最底层叶子节点之间采用了双向链表\n\n**优势：** 磁盘读写代价更低 （只在最底层存储数据）、查询效率B+树稳定（都需要查到最底层）、B+树便于扫库和区间查询（双向链表）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-5",
        "question":  "聚簇索引和非聚簇索引？",
        "answer":  "**所属专题：MySQL优化**\n\n聚簇索引：数据与索引放到一块，B+树保存了整行数据，有且只有一个\n\n非聚簇索引（二级索引）：数据与索引分开存储，B+树的叶子节点保存对应的主键，可以有多个",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-6",
        "question":  "回表查询？",
        "answer":  "**所属专题：MySQL优化**\n\n通过二级索引找到对应主键值，到聚簇索引中查找整行数据",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-7",
        "question":  "覆盖索引？",
        "answer":  "**所属专题：MySQL优化**\n\n查询使用了索引，并且需要返回的列，在该索引中已经全部能够找到，不需要回表查询",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-8",
        "question":  "MySQL超大分页怎么处理？",
        "answer":  "**所属专题：MySQL优化**\n\n在数据量比较大时，limit分页查询，效率低\n\n`select * from a limit 90000，10` 差\n\n`select * from a,(select id from a order by id limit 90000,10) b where a.id=b.id;` 好\n\n解决方案：覆盖索引+子查询。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-9",
        "question":  "创建索引的原则？",
        "answer":  "**所属专题：MySQL优化**\n\n1.表数据量大，查询比较频繁\n\n2.查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引\n\n3.尽量选择区分度高的列作为索引，尽量建立唯一索引。\n\n4.如果是字符串，建议前缀索引\n\n5.尽量使用联合索引，它很多时候可以覆盖索引\n\n6.控制索引数量，索引越多，维护索引结构代价越大，影响增删改效率\n\n7.如果索引列不能存储null值，建表时使用not null约束",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-10",
        "question":  "什么情况索引失效？",
        "answer":  "**所属专题：MySQL优化**\n\n1.**模** 模糊查询（左模糊、左右模糊）\n\n2.**型** 数据类型不符\n\n3.**数** 使用内部函数\n\n4.**空** 索引字段为null\n\n5.**运** 运算\n\n6.**最** 最左前缀、范围查询右边列索引失效\n\n7.**快** 全表查询速度比索引快\n\n**口诀**：模型数空运最快",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-11",
        "question":  "谈谈你对SQL优化的经验？",
        "answer":  "**所属专题：MySQL优化**\n\n一、表的设计优化\n\n1.设计合适的数值（tinyint int bigint ）\n\n2.设计合适的字符串类型（char varchar）char定长，varchar可变\n\n二、sql语句优化\n\n1.避免select *\n\n2.避免索引失效\n\n3.join优化 建议用inner join 而不用left inner join 或者 right inner join。因为内连接会对两个表优化，把小表放在外边，大表放在里表（mysql只需要少量次数的连接来连接小表）。\n\n4.union all代替 union，union 会过滤一次重复的行\n\n三、主从复制、读写分离\n\n如果读多写少，可以读和写分离（和redis类似）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-12",
        "question":  "什么是事务？",
        "answer":  "**所属专题：MySQL事务**\n\n事务是一组操作的集合，它是一个不可分割的工作单位，要么同时成功，要么同时失败",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-13",
        "question":  "事务的特性？",
        "answer":  "**所属专题：MySQL事务**\n\n原子性、一致性、隔离性、持久性。结合案例说明。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-14",
        "question":  "并发事务带来哪些问题，如何解决？",
        "answer":  "**所属专题：MySQL事务**\n\n并发事务问题：脏读、不可重复读、幻读\n\n**脏读：** 一个事务读到另一个事务还没有提交的数据。\n\n**不可重复读：** 一个事务先后读同一个记录，但两次的数据不同。\n\n**幻读：** 真实的数据行发生改变（插入或者删除），而读感知不到。\n\n解决办法：4种隔离级别\n\n**未提交读：** 出现脏读、不可重复读、幻读\n\n**读已提交：** 出现不可重复读、幻读\n\n**可重复读：** 出现幻读\n\n**串行化：** 不会出现问题",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-15",
        "question":  "事务的隔离性如何保证？",
        "answer":  "**所属专题：MySQL事务**\n\n1.排他锁：一个事务获得了一个数据行的锁，其他事务不能获取该行排他锁\n\n2.mvcc：多版本并发控制",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-16",
        "question":  "事务中的隔离级别是如何保证的呢？",
        "answer":  "**所属专题：MySQL事务**\n\nMVCC。维护一个数据的多个版本，使读写操作没有冲突。\n\n- 隐藏字段：\n\n  trx_id(事务id)，记录每一次操作的事务id，是自增的\n\n  roll_pointer(回滚指针），指向上一个版本的事务版本记录地址\n\n- undo log：\n\n  回滚日志：存储老版本数据\n\n  版本链：多个事务并行操作某一行记录，记录不同事务修改数据的版本，通过roll_point形成链表\n\n  四个字段：活跃事务集合、最小事务、最大事务、当前事务。\n\n- readView\n\n  根据readView的匹配规则和当前的一些事务id判断该访问哪个版本的数据\n\n  不同的隔离级别快照读是不一样的，最终访问界别不一样\n\n  读已提交：每一次执行快照读生成readView\n\n  可重复读：仅在事务第一次执行快照读时生成readView，后续复用",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-17",
        "question":  "事务的持久性、一致性、原子性如何保证？",
        "answer":  "**所属专题：MySQL事务**\n\n**undo log 和redo log的区别**\n\nredo log：记录的是数据页的物理变化，服务器宕机可以用来同步数据\n\nundo log：记录的是逻辑日志，当事务回滚时，通过逆操作恢复原来的数据\n\nredo log保证了事务的持久性，undo log保证了事务的一致性和原子性",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-18",
        "question":  "MySQL主从同步？",
        "answer":  "**所属专题：MySQL其他**\n\nMySQL主从复制的核心就是二进制日志**Binlog**\n\n1.主库事务提交，会把数据变更记录在Binlog中\n\n2.从库读取Binlog，写入从库中继日志relay Log\n\n3.从库重做中继日志中的事件，将改变反映它自己的数据",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-19",
        "question":  "分库分表？",
        "answer":  "**所属专题：MySQL其他**\n\n单表1000W或者超过20G\n\n1.水平分库 将一个库的数据拆分到多个库中，解决海量数据存储和高并发的问题\n\n2.水平分表 解决单表存储和性能的问题\n\n3.垂直分库 根据业务进行拆分，高并发下提高磁盘IO和网络连接数\n\n4.垂直分表 冷热数据分离",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mysql-handbook-20",
        "question":  "MySQL有哪几种锁？",
        "answer":  "**所属专题：MySQL其他**\n\n1.全局锁：\n\n```sql\nflush tables with read lock\n```\n\n2.表级锁：表锁、元数据锁（MDL）、意向锁、AUTO-INC锁\n\n3.行级锁：记录锁（Record Lock）、间隙锁（Gap Lock）、临键锁（Next-Key Lock）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    }
];

export const SPRING_HANDBOOK_POINTS: InterviewPoint[] = [
    {
        "id":  "spring-handbook-1",
        "question":  "Spring框架的单例bean是线程安全的吗？",
        "answer":  "**不是线程安全**\n\nSpring的@Scope注解默认值是singleton单例\n\n因为一般bean中注入无状态对象，没有线程安全问题，如果在bean中定义可修改的成员变量，需要考虑线程安全问题，可以考虑多例或者加锁。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "spring-handbook-2",
        "question":  "什么是AOP？",
        "answer":  "**AOP：** 面向切面编程，公共模块复用，降低耦合\n\n**AOP常见用途**：记录操作日志、缓存、spring实现事务，拦截器\n\n它们使用aop的环绕通知around\n\naop一般涉及的注解：@Aspect、@PointCut、五种通知方式 @Before、@Around、@AfterReturing、@AfterThrowing、@After\n\n**AOP实现原理**：动态代理 - 在运行时在内存中“临时”生成 AOP 动态代理类，因此也被称为运行时增强。\n\nJDK 动态代理：通过反射来接收被代理的类，并且要求被代理的类必须实现一个接口 。JDK 动态代理的核心是 InvocationHandler 接口和 Proxy 类\n\nCGLIB 动态代理：如果目标类没有实现接口，那么AOP会选择使用CGLIB来动态代理目标类。CGLIB（Code Generation Library），是一个代码生成的类库，可以在运行时动态的生成某个类的子类，注意，CGLIB是通过继承的方式做的动态代理，因此如果某个类被标记为final，那么它是无法使用CGLIB做动态代理的。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "spring-handbook-3",
        "question":  "Spring中的事务如何实现的？",
        "answer":  "声明式事务，通过AOP，在业务进行前开启事务，结束之后提交或者回滚事务",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "spring-handbook-4",
        "question":  "Spring中的事务失效场景？",
        "answer":  "1.try_catch:事务通知只有捉到了目标抛出异常，才能后续回滚。如果目标自己处理掉，事务无法知晓\n\n解决办法：\n\n```java\nthrow new RuntimeError(e)\n```\n\n2.Spring默认只会回滚非检查异常\n\n解决办法：配置rollbackFor属性\n\n```java\n@Transactional(rollbackFor=Exception.class)\n```\n\n3.Spring为方法创建代理、添加事务、前提是方法public\n\n解决办法：方法设置为public\n\n4.Spring方法自调用@Transactional方法失效\n\n解决办法：外部引用，注入自身代理类，把@Transactional方法变成一个Service",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "spring-handbook-5",
        "question":  "Spring的生命周期（构造+赋值分离）？",
        "answer":  "1.调用BeanDefinition获取bean的定义信息\n\n2.调用构造函数实例化bean\n\n3.bean的依赖注入\n\n4.处理Aware接口（BeanNameAware、BeanFactoryAware、ApplicationContextAware）\n\n5.Bean的后置处理器BeanPostProcessor-前置\n\n6.初始化方法（InitializingBean、init-method）\n\n7.Bean的后置处理器BeanPostProcessor-后置\n\n8.销毁bean",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "spring-handbook-6",
        "question":  "Spring的循环引用？",
        "answer":  "循环依赖：两个或两个以上的bean互相持有对方，形成闭环\n\n循环依赖在spring中允许，根据**三级缓存**解决大部分循环依赖\n\n1.一级缓存：单例池，缓存已经经历了完整生命周期、已经初始化的bean对象\n\n2.二级缓存：缓存早期bean对象（生命周期还没走完）\n\n3.三级缓存：缓存的是ObjectFactory，表示对象工厂，用来创建某个对象的\n\n构造方法出现了循环依赖怎么解决？\n\n使用@Lazy进行懒加载",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "spring-handbook-7",
        "question":  "SpringMVC的执行流程？",
        "answer":  "1.用户发送出请求到前端控制器DispatcherServlet（前端控制器）\n\n2.DispatcherServlet收到请求调用HandlerMapping（处理器映射器）\n\n3.HandlerMapping找到对应处理器，生成处理器对象以及处理器拦截器，返回DispatcherServlet\n\n4.DispatcherServlet调用HandlerAdapter（处理器适配器）\n\n5.HandlerAdapter经过处理器适配器调用具体的处理器（Handler/Controller）\n\n6.Controller方法上添加@ResponseBody，通过HttpMessageConverter将结果返转为JSON并响应",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "spring-handbook-8",
        "question":  "SpringBoot自动配置原理？",
        "answer":  "1.SpringBoot的引导类有一个注解@SpirngBootApplication，这个注解对三个注解做了封装：\n\n@SpringBootConfiguration\n\n@EnableAutoConfiguration\n\n@ComponentScan\n\n2.@EnableAutoConfiguration是实现自动化配置的核心注解，它通过import导入配置选择器。\n\n内部读取了Jar包的classpath路径下META-INF/spirng-factories文件中的配置类全类名，配置类中所定义的bean会根据**条件注解所指定条件**决定是否将其导入Spring容器\n\n3.条件判断会有像@ConditionalOnClass这样的注解，判断是否有对应的class文件，如果有则加载该类，把这个配置类的所有bean放入spring容器中使用。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "spring-handbook-9",
        "question":  "Spring框架常见注解？",
        "answer":  "**Spring：**\n\n@Component、@Controller、@Service、@Repository 使用在类用于实例化Bean\n\n@Autowired、@Qualifier 依赖注入\n\n@Scope 标注Bean的作用范围\n\n@Configuration 配置类，当创建容器时会从该类上加载注解\n\n@ComponentScan 用于指定Spirng初始化容器要扫描的包\n\n@Bean 用在方法上，标注该方法返回值存储到Spring容器中\n\n@Import 使用@Import导入的类会被加载到IOC容器中\n\n@Aspect、@Before、@After、@Around、@Pointcut AOP\n\n**SpringMVC：**\n\n@RequestMapping 用于映射请求，可用在类和方法上\n\n@RequestBody http请求的json数据转换为java对象，接收前端\n\n@RequestParam 指定请求参数名称\n\n@PathVariable 路径参数\n\n@ResponseBody Controller返回对象转化为json，返回给前端\n\n@RequestHeader 获取指定的请求头\n\n@RestController @Controller+@ResponseBody\n\n**SpringBoot:**\n\n@SpringBootConfiguration 组合了@Configuration注解，实现配置文件功能\n\n@EnableAutoConfiguration 打开自动配置的功能\n\n@ComponentScan spring组件扫描",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "spring-handbook-10",
        "question":  "MyBatis执行流程？",
        "answer":  "加载配置文件-\u003e构建Sql会话工厂(SqlSessionFactory)-\u003e构建Sql会话(SqlSession)-\u003eExecutor执行器-\u003eMappendStatement对象（Executor接口执行方法中有一个MappendStatement参数，封装了映射信息）-\u003e输入参数映射-\u003e输出参数映射",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "spring-handbook-11",
        "question":  "MyBatis延迟加载？",
        "answer":  "延迟加载：需要用数据才加载，不需要数据就不加载\n\nMybatis支持一对一关联对象和一对多关联集合对象延迟加载\n\nMybatis配置文件可以通过lazyLoadingEnabled=true|false，默认关闭。\n\n底层使用了**CGLIB**创建目标对象的代理对象",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "spring-handbook-12",
        "question":  "MyBatis一级、二级缓存？",
        "answer":  "一级缓存，作用域Session，默认\n\n二级缓存，作用域namespace和mapper，不依赖SqlSession\n\n当某个作用域下缓存进行了**增删改**，该作用域下所有所有select中的缓存被clear",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    }
];

export const JAVA_HANDBOOK_POINTS: InterviewPoint[] = [
    {
        "id":  "java-handbook-1",
        "question":  "ArrayList底层原理实现？",
        "answer":  "**所属专题：List**\n\n动态数组\n\n初始化容量为0，除非使用有参构造\n\n当第一次添加数据才会初始化容量为10或者\u003e10的有参构造值，后续1.5倍扩容（grow(),拷贝数组）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "java-handbook-2",
        "question":  "如何实现数组和List之间的转换？",
        "answer":  "**所属专题：List**\n\n数组转List：Arrays.asList(array) //List后续受数组影响\n\nList转数组：list.toArray(new xx[list.size()]) //数组后续不受List影响",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "java-handbook-3",
        "question":  "ArrayList和LinkedList的区别？",
        "answer":  "**所属专题：List**\n\n1.底层结构：ArrayList动态数组，LinkedList动态双链表\n\n2.时间复杂度：ArrayList查O(1)、LinkedList查O(n) | ArrayList删除插入平均O(n)、LinkedList删除插入平均O(n)\n\n3.空间占用：ArrayList占用内存更小，LinkedList更大\n\n4.线程安全：都不安全，如需安全可以使用\n\n```java\nCollections.synchronizedList(new ArrayList());\n\nCollections.synchronizedList(new LinkedList());\n```",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "java-handbook-4",
        "question":  "红黑树？",
        "answer":  "**所属专题：Map**\n\n红黑树：自平衡二叉搜索树\n\n红黑规则都是希望红黑树能够保持平衡\n\n红黑树的时间复杂度：查找、添加、删除都是O(logn)\n\n性质1：节点要么红色、要么黑色\n\n性质2：根节点是黑色\n\n性质3：叶子节点都是黑色空节点\n\n性质4：红色节点子节点都是黑色\n\n性质5：从任意节点到其叶子节点路径包含相同数目的黑色节点",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "java-handbook-5",
        "question":  "HashMap的实现原理？",
        "answer":  "**所属专题：Map**\n\n数据结构：数组+链表或红黑树\n\n1.根据key的hashCode重新hash计算出数组下标\n\n2.存储时，如果出现hash相同的key：\n\na.key相同，覆盖\n\nb.key不相同，hash冲突，将key-value放入链表或红黑树\n\n3.获取时，对比hash值位置和key值",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "java-handbook-6",
        "question":  "HashMap的JDK1.7和JDK1.8有什么区别？",
        "answer":  "**所属专题：Map**\n\njdk1.7：数组+链表。头插法（多线程有环链表风险）。\n\njdk1.8：数组+链表|红黑树。尾插法（多线程无环链表风险）。数组长度达到64且链表长度超过8，链表变为红黑树（降低时间复杂度）。红黑树小于6节点退化成链表。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "java-handbook-7",
        "question":  "HashMap的put方法具体流程？",
        "answer":  "**所属专题：Map**\n\n1.判断table是否为空，为空初始化大小为16的table\n\n2.根据键值key计算hash得到数组索引\n\n3.判断table[i]==null，成立直接节点添加\n\n4.如果table[i]!=null:\n\n 4.1 key相同，覆盖value\n\n 4.2 key不同，是红黑树，在红黑树操作\n\n 4.3 key不同，是链表，尾插后判断是否要转化为红黑树\n\n5.插入成功后，判断键值对数量size是否超过了最大容量threshold（数组长度*0.75），如果超过，进行扩容",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "java-handbook-8",
        "question":  "HashMap的扩容机制？",
        "answer":  "**所属专题：Map**\n\nresize():第一次添加数组初始初始化数组长度为16，后续超过数组长度*0.75就2倍扩容\n\n扩容会创建新数组，把老数组数据移到新数组：\n\n1.没有hash冲突，直接e.hash\u0026(newCap-1)\n\n2.如果是红黑树，走红黑树的添加\n\n3.如果是链表，则需要遍历链表，可能拆分链表，判断(e.hash\u0026oldCap)是否为0.\n\n 3.1 为0则在原位置上\n\n 3.2 不为0则原位置+原数组的大小\n\n`e.hash\u0026oldCap==0, 则(2oldCap-1)\u0026e.hash=(oldCap-1)\u0026e.hash`\n\n`e.hash\u0026oldCap!=0, 则(2oldCap-1)\u0026e.hash=(oldCap-1)\u0026e.hash+oldCap`",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "java-handbook-9",
        "question":  "HashMap的寻址运算？",
        "answer":  "**所属专题：Map**\n\n1.计算对象的hashCode()\n\n2.调用hash()方法进行二次哈希，hashcode值右移动16位再异或运算（使hash值分布更均匀）\n\n3.（capacity-1）\u0026hash得到索引位置 （与取模结果一样，CPU运行更快）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "java-handbook-10",
        "question":  "HashMap在JDK1.7的多线程死循环问题？",
        "answer":  "**所属专题：Map**\n\njdk1.7多线程头插法会导致发生哈希冲突时，链表成环。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    }
];

export const JUC_HANDBOOK_POINTS: InterviewPoint[] = [
    {
        "id":  "juc-handbook-1",
        "question":  "线程和进程的区别？",
        "answer":  "**所属专题：线程基础**\n\n进程是资源分配的基本单元，线程是CPU调度的最小单元。\n\n1.进程是正在运行的程序实例，包含了线程。\n\n2.进程上下文切换开销较大，线程开销较小\n\n3.不同进程使用不同内存空间，当前进程下的所有线程可以共享内存空间(堆区、元空间区)",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-2",
        "question":  "并发与并行的区别？",
        "answer":  "**所属专题：线程基础**\n\n并发是同一时间段应对多件事情的能力\n\n并行是同一时间点应对多个事务",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-3",
        "question":  "创建线程的方式有哪些？",
        "answer":  "**所属专题：线程基础**\n\n1.继承Thread类 2.实现Callable接口 3.实现Runnable接口 4.使用线程池创建",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-4",
        "question":  "Runnable和Callable有什么区别？",
        "answer":  "**所属专题：线程基础**\n\n1.Runnable接口run()没有返回值，Callable接口call()有返回值（配合泛型、FutreTask）\n\n2.Callable接口的call()方法允许抛出异常，Runnable接口run()不允许抛出异常，只能内部消化",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-5",
        "question":  "线程的run()和start()有什么区别？",
        "answer":  "**所属专题：线程基础**\n\nstart()用来启动线程，只能执行一次\n\nrun()就是普通的函数，可以被多次调用",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-6",
        "question":  "线程包括哪些状态，之间如何转换？",
        "answer":  "**所属专题：线程基础**\n\n1.new(新建) 2.runnable(可运行) 3.waiting(等待) 4.time_waiting(计时等待) 5.blocked(阻塞) 6.terminated(终止)",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-7",
        "question":  "T1、T2、T3三个线程，如何保证它们按照顺序执行？",
        "answer":  "**所属专题：线程基础**\n\n1.可以使用join解决\n\n2.共用一个互斥锁，全局变量对应哪个线程执行，执行完notifyAll()",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-8",
        "question":  "notify()和notifyAll()的区别？",
        "answer":  "**所属专题：线程基础**\n\nnotifyAll：唤醒所有wait线程\n\nnotify：随机唤醒一个wait线程",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-9",
        "question":  "wait()和sleep()的不同？",
        "answer":  "**所属专题：线程基础**\n\n**共同点：** wait()和sleep()的效果都是让当前线程进入等待状态，放弃CPU执行权。\n\n**不同点：** wait()必须与锁搭配使用，会释放锁，等通知（放弃CPU，你们可以用）\n\nsleep()如果在synchronized中，不会释放锁，一只等待直到计时结束（放弃CPU，你们也别想用）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-10",
        "question":  "如何停止一个正在运行的线程？",
        "answer":  "**所属专题：线程基础**\n\n1.使用退出标志\n\n2.使用interrupt方法中断线程\n\n 2.1打断阻塞线程，会抛出InterruptedException异常，可以try-catch捕获\n\n 2.2打断正常线程，根据打断状态来标记是否退出线程，打断状态isInterrupted()函数来判断",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-11",
        "question":  "synchronized关键字的底层原理？",
        "answer":  "**所属专题：线程安全**\n\nsynchronized底层涉及偏向锁、轻量级锁、重量级锁，其中重量级锁由**Monitor**实现，是jvm级别的一个对象（锁）。他有三个属性：\n\n**Owner**：存储当前获取锁的线程，只可以有一个线程获取\n\n**EntryList**：没有获取锁，阻塞状态的线程\n\n**WaitSet**：调用了wait，等待状态的线程\n\n**关联：** 当加了synchronized时，对象头的markword中会加入Monitor的引用地址（指针），从而指向它。\n\n补充：对象在存储在堆中，具体又可分为1.对象头（markword、klassword） 2.实例数据（成员变量、成员函数等） 3.对其填充（保持8的整数倍）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-12",
        "question":  "轻量级锁？",
        "answer":  "**所属专题：线程安全**\n\n**多个线程加锁的时间是错开的（无竞争），可以使用轻量级锁。**\n\n**轻量级锁修改了对象头的锁标志，相对重量级锁性能提升很多，每次修改都是CAS操作。**\n\n**加锁流程：**\n\n1.在线程中创建一个Lock Record，将obj字段指向锁对象。\n\n2.通过CAS指令将Lock Record的地址存储在对象头的mark word中，如果对象处于无所状态则修改成功，代表该线程获得了轻量级锁。\n\n3.如果当前线程已经持有该锁了，代表这是一次锁重入。设置Lock Record第一部分为null，起到重入计数的作用。\n\n4.如果CAS修改失败，说明发生了竞争，需要膨胀为重量级锁。\n\n**解锁过程：**\n\n1.遍历线程栈，找到所有obj字段等于当前锁对象的Lock Record。\n\n2.如果Lock Record的Mark Word为null，代表这是一次重入，将obj设置为null后continue\n\n3.如果Lock Record的Mark Word不为null，则利用CAS指令将对象的mark word恢复成无锁状态。失败则膨胀为重量级锁。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-13",
        "question":  "偏向锁？",
        "answer":  "**所属专题：线程安全**\n\n**一段时间内都被一个线程使用锁，可以使用偏向锁。**\n\n第一次获取锁时，会有一个CAS操作，之后改线程再获取锁，只需要判断mark word中是否是自己的线程id即可。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-14",
        "question":  "三种锁比较？",
        "answer":  "**所属专题：线程安全**\n\n重量级锁：底层使用Monitor实现，里面涉及到用户态和内核态切换、线程上下文切换，性能差\n\n轻量级锁：线程加锁时间错开，轻量级修改对象头的锁标志，相对于重量级锁性能提升很多。每次修改都是CAS操作，保证原子性\n\n偏向锁：一段时间内都只被一个线程使用锁。第一次获取锁会有一个CAS操作，之后该线程再获取锁，只要判断mark word中是否是自己线程id即可，而不是开销较大的CAS命令",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-15",
        "question":  "JMM是什么？",
        "answer":  "**所属专题：线程安全**\n\nJMM（java Memory Model）java内存模型，定义了**共享内存**中**多线程读写操作**的规范。\n\n本质上，多个CPU处理执行多个线程，CPU之间使用的数据是L1、L2缓存，需要读写的数据在共享内存上。为了保障可见性（JIT会优化代码）和防止重排序（处理器会重排指令），所以通常使用synchronized或volatile实现。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-16",
        "question":  "volatile的理解？",
        "answer":  "**所属专题：线程安全**\n\n①保证线程的可见性\n\n用volatile修饰共享变量，能够防止编译器优化发生，让一个线程对共享变量的修改对另一个线程可见\n\n②禁止指令重排序\n\n用volatile修饰共享变量会在读、写共享变量时加入不同的屏障，阻止其他读写操作越过屏障，从而达到阻止重排序的效果",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-17",
        "question":  "CAS的理解？",
        "answer":  "**所属专题：线程安全**\n\nCAS（Compare and Swap），乐观锁思想+自旋思想，在无锁状态保护线程操作原子性\n\n底层是调用Unsafe类方法，由操作系统提供，其他语言实现",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-18",
        "question":  "乐观锁和悲观锁的区别？",
        "answer":  "**所属专题：线程安全**\n\nCAS基于乐观锁：最乐观估计，不怕别的线程来修改共享变量，**修改了也没关系，再重试**\n\nsynchronized基于悲观锁：最悲观的估计，**我上锁了都别想操作**，除非我放弃锁",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-19",
        "question":  "AQS的理解？",
        "answer":  "**所属专题：线程安全**\n\nAQS（AbstractQueuedSynchronizer）多线程的抽象队列同步器，是锁基础框架，ReentranLock、Semaphore都是基于AQS实现\n\n1.AQS维护了双链表的先进先出队列，队列存储排序线程\n\n2.AQS有state属性，默认0（无锁），1（有锁）\n\n3.线程对state修改时使用了cas操作，保证多线程修改的原子性",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-20",
        "question":  "ReentrantLock的实现原理？",
        "answer":  "**所属专题：线程安全**\n\nReentrantLock支持重入、支持中断、支持公平锁和非公平锁、支持锁超时、多个条件变量\n\n底层采用**CAS+AQS队列**实现",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-21",
        "question":  "Synchronized和Lock有什么区别？",
        "answer":  "**所属专题：线程安全**\n\n**1.语法层面：**\n\nsynchronized是关键字，源码在jvm，c++实现\n\nLock是接口，jdk提供，java实现\n\n使用synchronized时，退出同步代码块会自动释放，Lock需要手动finally释放\n\n**2.功能层面：**\n\n二者都属于悲观锁，支持互斥、同步、锁重入\n\nLock提供了许多synchronized不具备的功能，比如ReentrantLock 支持重入、支持中断、支持公平锁和非公平锁、支持锁超时、多个条件变量\n\n**3.性能方面：**\n\n在没有竞争时，synchronized做了很多优化，如偏向锁、轻量锁\n\n在竞争激励时，Lock实现会提供更好的性能",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-22",
        "question":  "死锁？",
        "answer":  "**所属专题：线程安全**\n\nⅠ死锁产生条件：\n\n1.互斥条件\n\n2.请求与保持\n\n3.不可剥夺\n\n4.头尾相连的循环等待\n\nⅡ打破死锁：\n\n1.一次性申请所有资源(破坏条件2)。\n\n2.在线程满足一定条件时，释放掉已占有的资源。比如线程尝试获取锁的时候加上一定的时限，超过时限则放弃对该锁的请求，并释放自己占有的锁。（破坏条件3）\n\n3.设计时考虑清楚锁的顺序，尽量减少嵌在的加锁交互数量。可以让系统为每类资源赋予一个编号，每个线程按照编号请求资源，然后释放则相反。（破坏条件4）\n\n4.死锁检测。\n\nⅢ检查死锁：\n\n1.使用jps、jstack查看运行线程、线程运行情况\n\n2.使用可视化工具jconsole、VisualVM",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-23",
        "question":  "ConcurrentHashMap？",
        "answer":  "**所属专题：线程安全**\n\n底层数据结构：\n\njdk1.7采用分组（segment）的数组+链表实现\n\njdk1.8采用的数据结构跟Hashmap1.8的结构一样\n\n加锁方式：\n\njdk1.7采用segment分段锁，底层使用的是ReentrantLock\n\njdk1.8采用CAS添加新节点，采用synchronized锁定链表或者红黑树首节点，相对Segment分段锁粒度更细，性能更好",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-24",
        "question":  "导致并发程序问题出现的根本原因是什么？",
        "answer":  "**所属专题：线程安全**\n\n原子性（synchronized，lock），可见性（volatile，synchronized，lock），有序性（volatile）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-25",
        "question":  "线程池的核心参数？",
        "answer":  "**所属专题：线程池**\n\n```java\npublic ThreadPoolExecutor(\nint corePoolSize,   //核心线程数目\nint maximumPoolSize,  //最大线程数目（核心线程+临时线程）\nlong keepAliveTime,      //临时线程的生存时间，生存时间内没有新任务，此线程资源会释放\nTimeUnit unit,        //临时线程的生存单位    \nBlockingQueueworkQueue,    //当没有空闲核心线程，新来任务排队，队列满创建临时 线程\nThreadFactory threadFactory,    //可以定制线程对象的创建，例如线程名字，守护线程等\nRejectExecutionHandler handler)    //拒绝策略，当所有线程都忙，队列满了，会触发拒绝策略\n```\n\nAbortPolicy 拒绝任务并抛出异常\n\nCallerRunsPolicy 调用线程执行该任务\n\nDiscardOldestPolicy 丢弃队列中最老任务，放入新任务\n\nDiscardPolicy 拒绝任务，但不抛出异常",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-26",
        "question":  "线程池中有哪些常见的阻塞队列？",
        "answer":  "**所属专题：线程池**\n\n1.**ArrayBlockingQueue**： 基于数组结构的有界阻塞队列，FIFO\n\n2.**LinkedBlockingQueue**：基于链表结构的有界阻塞队列，FIFO\n\n3.DelayedWorkQueue：是一个优先级队列，每个任务都可以执行时间，执行时间靠前的优先出队\n\n4.SynchronousQueue：不存储元素的阻塞队列，每个插入操作都必须等待一个移除操作\n\n**ArrayBlockingQueue和LinkedBlockingQueue区别：**\n\nArrayBlockingQueue强制有界，底层数组，初始化数组，一把锁锁住整个数组，效率低\n\nLinkedBlockingQueue可无界可有界，底层链表，创建节点才添加数据，两把锁（头尾），效率高",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-27",
        "question":  "如何确定核心线程数？",
        "answer":  "**所属专题：线程池**\n\n①高并发、任务执行时间短-\u003e(CPU核数+1)，减少线程上下文切换\n\n②并发不高、任务执行时间长\n\nIO密集型任务-\u003e(CPU核数*2+1)\n\n计算密集任务-\u003e(CPU核数+1)",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-28",
        "question":  "线程池的种类有哪些？",
        "answer":  "**所属专题：线程池**\n\nExecutors.newFiexedThreadPool(nThread)//固定大小线程池，核心线程是nThread，无临时线程\n\nExecutors.newSingleThreadExecutor() //适用于按照顺序执行的任务，只有一个核心线程\n\nExecutors.newCachedThreadPool() //适用于执行密集，但是执行时间较短，全都是临时线程，每来一个任务看看有没有临时线程，没有就创建临时线程，因为队列是空的\n\nExecutors.newScheduledThreadPool(nThread) //延时的线程，支持定时、周期性执行任务",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-29",
        "question":  "为什么不建议使用Executors创建线程池？",
        "answer":  "**所属专题：线程池**\n\nFixedThreadPool和SingleThreadPool：\n\n队列长度为Interger.MAX_VALUE,大量请求容易OOM（out of memory）\n\nCachedThreadPool：\n\n最大线程为Interger.MAX_VALUE,容易OOM",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-30",
        "question":  "多线程使用场景？",
        "answer":  "**所属专题：线程池**\n\n1.数据汇总：通过多线程分别运行不依赖的业务，比串行单线程依次执行耗时少\n\n2.异步线程：为了避免下一级方法影响上一级方法（性能考虑），可以使用异步线程调用下一个方法（不需要下一级方法返回值），可以提升方法响应时间\n\n3.批量导入：使用线程池+CountDownLatch批量把数据库数据导入到了ES中，避免OOM",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-31",
        "question":  "如何控制某个方法并发访问线程的数量？",
        "answer":  "**所属专题：线程池**\n\n使用Semaphore信号量：\n\n1.创建Semaphore对象，给一个容量\n\n2.acquire()可以请求一个信号量，信号量-1\n\n3.release()可以释放一个信号量，信号量+1",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "juc-handbook-32",
        "question":  "ThreadLocal的理解？",
        "answer":  "**所属专题：线程池**\n\n1.ThreadLocal可以实现【资源对象】线程隔离，避免线程安全\n\n2.ThreadLocal实现了线程内资源共享\n\n3.每个线程内有一个ThreadLocalMap类型成员变量，用来存储资源对象\n\n a) set方法，以ThreadLocal自己作为key，资源对象为value\n\n b) get方法，以ThreadLocal自己作为key，返回资源对象value\n\n c) remove方法，以ThreadLocal自己作为key，一处当前线程关联资源值\n\n**内存泄露**：ThreadLocalMap中的key是弱引用，会被GC回收，而value是强引用，不会被回收。建议主动remove释放key、value。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    }
];

export const JVM_HANDBOOK_POINTS: InterviewPoint[] = [
    {
        "id":  "jvm-handbook-1",
        "question":  "JVM是什么？",
        "answer":  "**所属专题：JVM组成**\n\nJVM（Java Virtual Machine）Java虚拟机（java二进制字节码运行环境）\n\n1.JVM和JDK、JRE的关系：JDK包括JRE包括JVM\n\nJDK（Java Development Kit），包含JRE和开发工具如java、javac、jar、javadoc\n\nJRE（Java Runtime Environment），包含JVM和java核心类库\n\n2.JVM能实现一次编译、多次运行（不同系统），因为.class文件可以被不同系统上不同的JVM分别处理。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-2",
        "question":  "什么是程序计数器？",
        "answer":  "**所属专题：JVM组成**\n\n线程私有的，记录正在执行的字节码指令地址",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-3",
        "question":  "什么是Java堆？",
        "answer":  "**所属专题：JVM组成**\n\n线程共享：主要用来保存对象实例，数组等，当内存无法分配满了，抛出OOM\n\n组成：**年轻代+老年代**\n\n年轻代分为Eden、S0、S1区\n\n老年代存储生命周期较长的对象实例、数组",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-4",
        "question":  "什么是虚拟机栈？",
        "answer":  "**所属专题：JVM组成**\n\nJava Virtual machine Stacks\n\n每个线程运行时所需要的内存，成为虚拟机栈，先进后出\n\n每个栈由多个栈帧（frame）组成，对应着每次方法调用时占用的内存\n\n每个线程只有一个活动栈帧，对应当前执行的那个方法\n\n1.垃圾回收不涉及栈内存，栈内存会自动弹出释放\n\n2.栈内存默认分配1024K，过大会导致线程数变少\n\n3.方法内的局部变量需要逃逸分析\n\n4.栈帧过多导致内存溢出，比如递归调用",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-5",
        "question":  "堆栈区别是什么？",
        "answer":  "**所属专题：JVM组成**\n\n1.栈内存存储局部变量和方法调用，堆内存存储java对象和数组。栈不需要GC回收，堆需要。\n\n2.多线程不共享栈内存，共享堆内存\n\n3.两者内存不足都会报错，栈是StackOverFlow、堆是OutOfMemory。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-6",
        "question":  "方法区是什么？",
        "answer":  "**所属专题：JVM组成**\n\n线程共享：存储类信息、运行时长量池\n\n启动虚拟机创建、关闭释放\n\n内存不足抛出OutOfMemory：Metaspace\n\n**常量池：** 可以看作一张表，虚拟机指令根据常量表找到要执行的类名、方法名、参数类型、字面量等信息\n\n**运行时长量：** 当类被加载，常量池信息放入运行时长量池，里面的符号地址变为真实地址",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-7",
        "question":  "你听过直接内存吗？",
        "answer":  "**所属专题：JVM组成**\n\n并不属于JVM内存结构，是虚拟机系统内存\n\n常见于NIO操作，用于数据缓冲区，分配回收成本较高，但读写性能高，不受JVM内存回收管理",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-8",
        "question":  "什么是类加载器？",
        "answer":  "**所属专题：类加载器**\n\n将字节码文件加载到JVM中，从而java程序能够启动起来",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-9",
        "question":  "类加载器有哪些？",
        "answer":  "**所属专题：类加载器**\n\n启动类加载器（BootStrap ClassLoader）：加载JAVA_HOME/jre/lib下的库\n\n扩展类加载器（ExtClassLoader）：加载JAVA_HOME/jre/lib/ext下的库\n\n应用类加载器（AppClassLoader）：用于加载classPath下的类\n\n自定义类加载器（CustomizeClassLoader）：自定义类继承ClassLoader，实现自定义加载规则",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-10",
        "question":  "什么是双亲委派模型？",
        "answer":  "**所属专题：类加载器**\n\n加载某一个类，会委托上一级的加载器加载，如果上级也有上级，则会向上继续委托，如果该类委托上级没有加载，则子加载器尝试加载该类\n\n**为什么采用它：**\n\n1.避免类重复被加载\n\n2.为了安全，保证类库API不会被修改",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-11",
        "question":  "类装载的执行过程？",
        "answer":  "**所属专题：类加载器**\n\n加载：查找和导入class文件\n\n验证：保证加载类的准确性\n\n准备:为类变量分配内存并设置类变量初始值\n\n解析：把类中的符号引用转换为直接引用\n\n初始化：对类的静态变量、代码块执行初始化操作\n\n使用：JVM开始从入口方法执行用户程序\n\n卸载：程序执行完毕，JVM销毁创建的class对象",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-12",
        "question":  "对象什么时候被回收？",
        "answer":  "**所属专题：垃圾回收**\n\n**引用计数法：** 记录对象引用次数，为0回收，但容易出现对象的循环引用，导致内存泄露\n\n**可达性分析：** 通过GC Root引用链依次寻找对象，寻找不到就是垃圾",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-13",
        "question":  "JVM垃圾回收算法有哪些？",
        "answer":  "**所属专题：垃圾回收**\n\n**1.标记清除算法：** 通过可达性分析并标记垃圾，对垃圾回收\n\n优点：标记和清楚速度较快 缺点：造成内存碎片\n\n**2.标记整理算法（老年代）**：标记清除之后，还会把存活对象整理在一起，避免内存碎片\n\n**3.标记复制算法（新生代）**：需要两块内存空间，存活对象放入另一块内存，并清空前一块内存",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-14",
        "question":  "JVM中的分代回收？",
        "answer":  "**所属专题：垃圾回收**\n\n划分为新生代（Eden、s0、s1区）和老年代。\n\n新创建的对象在新生代Eden区，当Eden内存不足时，垃圾回收算法将Eden区和s0（or s1）的存活对象复制到另外的s1（or s0）中，当幸存区对象熬过15次回收，进入老年代",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-15",
        "question":  "MinorGC、MixedGC、FullGC的区别？",
        "answer":  "**所属专题：垃圾回收**\n\n1.YoungGC（MinorGC） 发生在新生代垃圾回收，暂停时间段\n\n2.MixedGC 新生代+老年代部分区域垃圾回收，G1收集器特有\n\n3.FullGC：新生代+老年代完整垃圾回收，暂停时间长，应避免",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-16",
        "question":  "JVM有哪些垃圾回收器？",
        "answer":  "**所属专题：垃圾回收**\n\n1.串行垃圾回收器：serial作用新生代 复制算法，serial old作用老年代 整理算法\n\n2.并行垃圾回收器：parallel new作用新生代 复制算法，parallel old作用于老年代 整理算法\n\n3.CMS（并发）垃圾回收器：作用老年代，标记-清除，标记和清除时和用户工作线程并行执行。几次后可以进行一次整理防止内存碎片\n\n4.G1垃圾回收器（jdk9之后默认）：作用在新生代和老年代",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-17",
        "question":  "详细聊一下G1垃圾回收器？",
        "answer":  "**所属专题：垃圾回收**\n\n三个阶段：**新生代回收（young GC）、混合回收（mixed GC）、全部回收（full GC）**\n\n划分多个区域，每个区域都可以充当Eden、survivor、old、humongous\n\n采用复制算法，响应时间和吞吐量兼顾\n\n如果mixed GC过程中复制失败（内存不足），触发Full GC，通过serial GC 整理算法",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "jvm-handbook-18",
        "question":  "强引用、软引用、弱引用、虚引用的区别？",
        "answer":  "**所属专题：垃圾回收**\n\n**强引用：** 只需要GC Roots能找到，就不会回收\n\n**软引用：** 需要配合SoftReference使用，当多次垃圾回收后内存依旧不够会回收软引用\n\n**弱引用：** 需要配合WeakReference使用，只要进行垃圾回收，弱引用对象就被回收\n\n**虚引用：** 必须配合引用队列，被引用对象回收时，将虚引用入队，由Reference Handler线程调用虚引用相关方法直接释放内存",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    }
];

export const DISTRIBUTED_HANDBOOK_POINTS: InterviewPoint[] = [
    {
        "id":  "distributed-handbook-1",
        "question":  "SpringCloud 5大组件有哪些？",
        "answer":  "**所属专题：SpringCloud**\n\n通常情况下：\n\n1.Nacos/Eureka：注册中心\n\n2.Ribbon：负载均衡\n\n3.Feign：远程调用\n\n4.Sentinel：服务保护\n\n5.Gateway：网关",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-2",
        "question":  "服务注册和发现是什么意思？Spring Cloud如何实现服务注册发现？",
        "answer":  "**所属专题：SpringCloud**\n\n项目采用nacos作为服务中心，是SpringCloud体系一个核心组件。\n\n1.服务注册：服务提供者需要把自己信息注册到nacos，比如服务名称，ip，端口等\n\n2.服务发现：消费者向nacos拉去服务列表信息，如果服务提供者有集群，则消费者会负载均衡发起调用\n\n3.服务监控：服务提供者会每隔x秒向nacos发送心跳，报告健康状态，如果nacos过了n*x秒还没收到心跳，从nacos中去除（对于临时实例）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-3",
        "question":  "Nacos和Eureka的区别？",
        "answer":  "**所属专题：SpringCloud**\n\n**共同点：**\n\n1.都支持服务注册、拉取\n\n2.都支持服务提供者心跳方式做健康检测\n\n**不同点：**\n\n1.Nacos支持服务端主动检测提供者状态：非临时实例主动检测、临时实例心跳模式\n\n2.临时实例心跳不正常剔除，非临时实例则不会被剔除\n\n3.Nacos支持服务列表变更的消息推送模式，服务列表更新更及时\n\n4.Nacos集群默认采用AP方式，当集群中存在非临时实例，采用CP模式；Eureka采用AP方式\n\n额外：Nacos还提供了配置中心，而Eureka只有注册中心",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-4",
        "question":  "微服务如何实现负载均衡？",
        "answer":  "**所属专题：SpringCloud**\n\n微服务的负载均衡主要使用了一个组件Ribbon，比如，我在feign远程调用的过程中，底层负载均衡就是使用了Ribbon。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-5",
        "question":  "Ribbon的负载均衡策略有哪些？",
        "answer":  "**所属专题：SpringCloud**\n\n1.RoundRobinRule：轮询\n\n2.WeightedResponseTimeRule：权重，响应时间越长，权重越小\n\n3.RandomRule：随机\n\n4.ZoneAvoidanceRule：区域敏感策略，先Zone对服务分类和选择，然后Zone内的多个服务做轮询（默认）",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-6",
        "question":  "如何自定义负载均衡策略？",
        "answer":  "**所属专题：SpringCloud**\n\n1.创建IRule接口，@Bean注解并让他被Spring容器管理，可以指定负载均衡策略（全局）\n\n2.在客户端配置文件，可以配置某一服务调用的负载均衡策略（局部）",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-7",
        "question":  "什么是服务雪崩，如何解决这个问题？",
        "answer":  "**所属专题：SpringCloud**\n\n**服务雪崩**：一个服务失败，导致整个链路的服务都失败的情况\n\n解决：\n\n1.**服务降级（针对某个服务内接口）**：下游服务自我保护的方式，确保服务不会受请求突增影响变得不可用，不可用走降级的逻辑，保证服务不会崩溃，一般与feign接口整合，，编写降级逻辑\n\n2.**服务熔断（针对某个服务）**：默认关闭，需要手动打开。三种状态：关闭、打开、半-打开。如果检测10秒内请求失败50%，那么进入打开熔断状态，5秒后重新尝试请求下游服务，进入半-打开状态，如果不能响应，继续走熔断机制，否则正常请求，回到熔断关闭状态。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-8",
        "question":  "微服务系统如何做监控？",
        "answer":  "**所属专题：SpringCloud**\n\n采用skywalking进行监控\n\n1.skywalking主要监控接口、服务、物理实例的一些状态。特别是压测的时候可以看到众多服务中哪个服务和接口比较慢，可以针对性分析和优化。\n\n2.skywalking设置了告警规则，如果报错，第一时间给相关负责人发送邮件和短信。",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-9",
        "question":  "为什么要限流？",
        "answer":  "**所属专题：微服务业务**\n\n并发量大需要限流。\n\n**解决办法**：\n\n1.**nginx**限流：\n\n漏桶算法：固定速率处理请求\n\n控制并发数：限制单个ip的链接数和并发链接的总数\n\n2.**网关限流**\n\n令牌桶算法：依靠局部过滤器RequestRateLimiter，生成令牌，固定速率生成令牌，只有有令牌才能处理请求（应对流量突增）\n\n可以根据ip或者路径限流，设置每秒填充平均速率，和令牌桶总容量",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-10",
        "question":  "解释一下CAP和BASE？",
        "answer":  "**所属专题：微服务业务**\n\n1.CAP定理（一致性、可用性、分区容错性）\n\n分布式通过网络连接，一定会出现分区问题（P）\n\n当分区出现时，系统的一致性(C)和可用性(A)就无法同时满足\n\n2.BASE理论\n\n基本可用、软状态（中间状态）、最终一致\n\n3.解决分布式事务的思想和模型：\n\nⅠ最终一致思想：各分支事务分别执行并提交，如果有不一致的情况，再想办法恢复数据（AP）\n\nⅡ 强一致思想：各分支事务执行完业务不需要提交，等待彼此都完成后统一提交或回滚（CP）",
        "importance":  "medium",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-11",
        "question":  "分布式事务解决方案？",
        "answer":  "**所属专题：微服务业务**\n\n只要发生了多个服务之间的**写**操作，都需要进行分布式事务控制\n\n比如，采用seata|MQ\n\n1.seta的XA模式，CP，需要互相等待各个分支事务提交，可以保证强一致性，性能差（银行）\n\n2.seta的AT模式，AP，底层使用undo log实现，性能好（互联网）\n\n3.seta的TCC模式，介于AP和CP，性能较好，不过需要人工编码实现（银行）\n\n4.MQ模式实现分布式事务，在A服务写数据时，需要在同一个事务内发送消息到另外一个事务，异步，性能最好（互联网）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-12",
        "question":  "分布式服务的接口幂等性如何设计？",
        "answer":  "**所属专题：微服务业务**\n\n幂等：多次调用某方法或者某接口，可以保证**重复调用的结果和单次调用的结果一致**（比如用户多次完成订单支付和一次订单支付）\n\n1.如果新增数据，可以数据库唯一索引\n\n2.如果新增或者修改数据（推荐）\n\n\t2.1 **分布式锁**：性能低\n\t\n\t2.2 **token+redis**：性能好（第一次请求生成token给前端，第二次携带token，到redis校验，通过则处理，并删除token，失败则直接返回不处理）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "distributed-handbook-13",
        "question":  "分布式任务调度：xxl-job路由策略有哪些？执行失败怎么办？大量数据都需要同时执行怎么解决？",
        "answer":  "**所属专题：微服务业务**\n\n**路由策略**：轮询、故障转移、分片广播...\n\n**执行失败怎么解决**：\n\n1.路由策略故障转移，使用健康实例执行任务\n\n2.设置重试次数\n\n3.查看日志+邮件告警来通知相关负责人解决\n\n**大数据量并行任务同时都需要执行**：\n\n1.路由策略分片广播，多个实例一块去执行\n\n2.任务按取模分配到各个实例执行",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    }
];

export const MQ_HANDBOOK_POINTS: InterviewPoint[] = [
    {
        "id":  "mq-handbook-1",
        "question":  "RabbitMQ如何保证消息不丢失？",
        "answer":  "**所属专题：RabbitMQ**\n\n1.生产者确认机制：保证生产者消息到达队列\n\n2.MQ持久化：对交换机、队列、消息持久化，确保消息在队列中部丢失\n\n3.开启消费者确认机制为auto：由Spring确认消息处理成功后完成ack，失败重试多次\n\n注：消费者失败多次将消息投送到异常交换机，由人工处理",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mq-handbook-2",
        "question":  "RabbitMQ消息重复消费如何解决？",
        "answer":  "**所属专题：RabbitMQ**\n\n网络抖动or消费者挂了，导致RabbitMQ没有收到消费者确认，重复发送消息\n\n解决办法：每条消息设置唯一的消息id，消费者第一次处理后记录，后续不处理",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mq-handbook-3",
        "question":  "RabbitMQ中死信交换机？（RabbitMQ延时队列有了解过吗）？",
        "answer":  "**所属专题：RabbitMQ**\n\n1.场景：比如超时订单\n\n延时队列就是用到了**死信交换机**+**TTL**（消息存活时间）实现的\n\n消息超时未消费就会变成死信（或者被拒绝消费、队列满了）\n\n2.延迟队列插件实现延迟队列DelayExchange\n\n声明一个交换机，添加delayed属性为true\n\n发送消息时，添加x-delay头，值为超时时间",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mq-handbook-4",
        "question":  "RabbitMQ百万消息堆积在MQ，如何解决？",
        "answer":  "**所属专题：RabbitMQ**\n\n1.增加更多消费者，提高消费速度\n\n2.在消费者内开启线程池加快消息处理速度\n\n3.扩大队列容积，提高堆积上线，采用惰性队列（基于磁盘存储而非内存了）",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    },
    {
        "id":  "mq-handbook-5",
        "question":  "RabbitMQ的高可用机制有了解过嘛？",
        "answer":  "**所属专题：RabbitMQ**\n\n**可采用集群，镜像队列。**\n\n1.镜像队列，本质是一主多从，所有操作都是主节点完成，然后同步给镜像节点。\n\n2.主机宕机，镜像节点代替成为新的主节点（如果主从同步完成前，主就宕机了，可能数据丢失）\n\n**出现数据丢失怎么解决？**\n\n采用仲裁队列，主从同步基于 Raft 协议，能保证强一致性。",
        "importance":  "high",
        "analogy":  "《Java面试手册》补充题，适合和当前站点高频题一起复盘。"
    }
];


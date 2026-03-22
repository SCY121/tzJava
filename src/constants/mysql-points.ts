// MySQL 面试题
import { InterviewPoint } from './command-types';

export const MYSQL_POINTS: InterviewPoint[] = [
  {
  id: 'mysql-1',
  question: 'MySQL 的索引结构是什么？为什么使用 B+ 树？',
   answer: '【B+ 树结构特点】\n\n1. 非叶子节点不存储数据\n   - 只存储索引键值和子节点指针\n   - 优势：单个节点能容纳更多索引项（通常 1KB-16KB）\n   - 结果：降低树的高度（通常 3-4 层支持千万级数据）\n   - 效果：减少磁盘 I/O 次数（每次 I/O 读取一个节点）\n\n2. 叶子节点存储所有数据\n   - 所有数据行都存储在叶子节点\n   - 叶子节点之间有双向指针连接（Previous/Next）\n   - 优势：非常适合范围查询（ORDER BY、BETWEEN）\n   - 对比 B 树：B 树的非叶子节点也存储数据，范围查询需要中序遍历\n\n3. 平衡多路查找树\n   - 所有叶子节点在同一层\n   - 查询复杂度稳定 O(logN)\n   - 多路：每个节点有多个子节点（通常 100-1000）\n\n【为什么不用其他结构】\n\n1. 二叉树/红黑树：树太高（千万数据约 24 层），I/O 次数太多\n2. Hash 索引：\n   - 优点：等值查询 O(1)\n   - 缺点：不支持范围查询、无法利用索引排序、存在 Hash 冲突\n3. B 树：\n   - 非叶子节点存储数据，降低了扇出（Fanout）\n   - 范围查询需要中序遍历，效率低\n\n【InnoDB vs MyISAM】\n- InnoDB：聚簇索引（数据和索引在一起）\n- MyISAM：非聚簇索引（叶子节点存储数据地址指针）\n\n【页大小选择】\n- 默认 16KB：经过大量实验得出的最优值\n- 太小：树变高，I/O 次数增加\n- 太大：浪费内存，缓存命中率下降',
   analogy: 'B+ 树就像图书馆的索引卡片目录。非叶子节点是"楼层 - 书架"指引，叶子节点是具体的书架。书架之间有通道，你可以看完这个架子直接去下一个，而不需要回大厅看目录。',
   importance: 'high'
  },
  {
  id: 'mysql-2',
  question: '什么是聚簇索引和非聚簇索引？',
   answer: '聚簇索引（Clustered Index）：数据行和索引存储在一起，叶子节点直接存储整行数据。InnoDB 的主键索引就是聚簇索引。非聚簇索引（Secondary Index）：索引和数据分开存储，叶子节点存储的是主键值。查询时通常需要"回表"（先查到主键，再根据主键去聚簇索引查数据）。',
   analogy: '聚簇索引就像字典的正文，按拼音排序，查到拼音就直接看到了解释。非聚簇索引就像字典前面的部首索引，查到部首后告诉你这个字在第几页（主键），你还得翻到那一页才能看到解释。',
   importance: 'high'
  },
  {
  id: 'mysql-3',
  question: '事务的 ACID 特性是什么？MySQL 如何保证？',
   answer: '【ACID 四大特性】\n\n1. 原子性（Atomicity）\n   - 定义：事务是不可分割的最小工作单位，要么全部成功，要么全部失败\n   - MySQL 实现：Undo Log（回滚日志）\n     - 记录事务的所有修改操作的逆向操作\n     - 事务回滚时，按相反顺序执行 Undo Log\n     - 崩溃恢复时，撤销未提交的事务\n   - 示例：INSERT 对应 DELETE，UPDATE 对应反向 UPDATE\n\n2. 一致性（Consistency）\n   - 定义：事务执行前后，数据库从一个一致性状态变换到另一个一致性状态\n   - 表现：数据不会凭空消失或增加（转账总额不变）\n   - 实现：由原子性、隔离性、持久性共同保证\n   - 约束：外键、唯一约束、Check 约束\n\n3. 隔离性（Isolation）\n   - 定义：并发事务之间互不干扰\n   - MySQL 实现：锁机制 + MVCC（多版本并发控制）\n     - 锁：行锁、间隙锁、临键锁\n     - MVCC：ReadView + 隐藏列（创建/删除版本号）\n   - 隔离级别：读未提交 < 读已提交 < 可重复读 < 串行化\n\n4. 持久性（Durability）\n   - 定义：事务一旦提交，对数据的改变是永久的\n   - MySQL 实现：Redo Log（重做日志）+ WAL 技术\n     - Write-Ahead Logging：先写日志，再写磁盘\n     - 事务提交时，Redo Log 落盘（fsync）\n     - 崩溃恢复：重做已提交的 Redo Log\n   - 双缓冲机制：Redo Log Buffer -> Redo Log File -> 数据页\n\n【两阶段提交（2PC）】\n- 目的：保证 Redo Log 和 Binlog 的一致性\n- 准备阶段：引擎写入 Redo Log，状态 prepare\n- 提交阶段：Server 写入 Binlog，通知引擎提交 Redo Log\n- 崩溃恢复：检查 Redo Log 状态，prepare 则提交，无则回滚',
   analogy: '转账操作：要么都成功，要么都失败（原子性）；钱不会凭空消失（一致性）；两个人在不同柜台操作互不干扰（隔离性）；银行系统断电重启后记录还在（持久性）。',
   importance: 'high'
  },
  {
  id: 'mysql-4',
  question: '什么是 MVCC（多版本并发控制）？',
   answer: '【MVCC 核心原理】\n\nMVCC（Multi-Version Concurrency Control）通过在每行记录后面保存两个隐藏列以及 ReadView，使得读取操作不需要加锁，实现了"快照读"，大大提高了并发性能。\n\n【隐藏列】\n1. DB_TRX_ID：最近修改该行数据的事务 ID\n2. DB_ROLL_PTR：指向 Undo Log 的回滚指针\n3. DB_ROW_ID：隐藏主键（无主键时自动生成）\n\n【ReadView（读视图）】\n- 生成时机：\n  - RC 隔离级别：每次 SELECT 都生成新的 ReadView\n  - RR 隔离级别：第一次 SELECT 时生成，后续复用\n- 包含内容：\n  - m_ids：当前活跃（未提交）事务 ID 列表\n  - min_trx_id：m_ids 中最小的事务 ID\n  - max_trx_id：生成 ReadView 时的下一个事务 ID\n  - creator_trx_id：创建 ReadView 的事务 ID\n\n【可见性判断规则】\n给定事务 ID（trx_id），判断数据行版本是否可见：\n1. trx_id < min_trx_id：可见（事务在 ReadView 前已提交）\n2. trx_id >= max_trx_id：不可见（事务在 ReadView 后才启动）\n3. trx_id in m_ids：不可见（事务活跃中）\n4. 其他情况：可见（事务已提交）\n\n【快照读 vs 当前读】\n1. 快照读（Snapshot Read）：不加锁，读历史版本\n   - SELECT * FROM table WHERE ...\n   - 实现：MVCC + ReadView\n2. 当前读（Current Read）：加锁，读最新版本\n   - SELECT ... FOR UPDATE / LOCK IN SHARE MODE\n   - INSERT、UPDATE、DELETE\n   - 实现：锁机制（Record Lock、Gap Lock）\n\n【RR 隔离级别如何避免幻读】\n- 快照读：通过 MVCC 的 ReadView 保证\n- 当前读：通过 Next-Key Lock（记录锁 + 间隙锁）保证',
   analogy: 'MVCC 就像给数据库拍快照。你开始读的时候，系统给你一份当前的副本。别人在后面怎么改，你看到的还是你开始读那一刻的样子，这样大家互不干扰。',
   importance: 'high'
  },
  {
  id: 'mysql-5',
  question: 'MySQL 的隔离级别有哪些？',
   answer: '1. 读未提交（Read Uncommitted）：可能导致脏读。2. 读已提交（Read Committed）：解决脏读，可能导致不可重复读。3. 可重复读（Repeatable Read）：MySQL 默认级别，解决不可重复读，InnoDB 通过间隙锁在很大程度上解决了幻读。4. 串行化（Serializable）：最高级别，强制事务串行执行。',
   analogy: '读未提交：别人还没发出的朋友圈你就能看到（可能被撤回）；读已提交：别人发出来了你才能看到；可重复读：你刷朋友圈时，即使别人删了或改了，你这一屏看到的还是原来的；串行化：大家排队看，一个人看完下一个人才能看。',
   importance: 'high'
  },
  {
  id: 'mysql-6',
  question: '什么是回表查询？如何避免？',
   answer: '回表是指在使用非聚簇索引查询时，先查到主键值，再根据主键去聚簇索引查整行数据的过程。避免回表的方法是使用"索引覆盖"：即查询的所有列都在辅助索引中，这样就不需要再去聚簇索引查了。',
   analogy: '回表就像你查目录找到书号，还得去书架找书。索引覆盖就像目录上直接写了你想看的那一页的内容，你不用去书架了。',
   importance: 'medium'
  },
  {
  id: 'mysql-7',
  question: 'MySQL 慢查询如何优化？',
   answer: '【优化步骤】\n\n1. 定位慢查询\n   - 开启慢查询日志：slow_query_log=ON\n   - 阈值设置：long_query_time=1（秒）\n   - 分析工具：mysqldumpslow、pt-query-digest\n\n2. EXPLAIN 分析执行计划\n   重点关注字段：\n   - type：访问类型（至少达到 range 级别）\n     优劣：system > const > eq_ref > ref > range > index > ALL\n   - key：实际使用的索引\n   - rows：扫描行数（越少越好）\n   - Extra：额外信息\n     - Using index：覆盖索引（好）\n     - Using filesort：文件排序（需优化）\n     - Using temporary：临时表（需优化）\n\n3. 索引优化\n   - 添加缺失索引：CREATE INDEX\n   - 联合索引遵循最左前缀原则\n   - 避免索引失效：\n     - 不对索引列使用函数/计算\n     - 避免隐式类型转换（字符串加引号）\n     - LIKE 避免左模糊（%xxx）\n     - OR 连接条件都要有索引\n   - 覆盖索引：减少回表\n\n4. SQL 语句优化\n   - 避免 SELECT *：只查需要的列\n   - 小表驱动大表：EXISTS 优于 IN\n   - 优化 JOIN：\n     - 关联字段加索引\n     - 使用 STRAIGHT_JOIN 强制优化器选择驱动表\n   - 分页优化：LIMIT 10000,10 改为 WHERE id>10000 LIMIT 10\n   - 批量操作：批量 INSERT、UPDATE\n\n5. 架构优化\n   - 读写分离：主从复制，从库承担读请求\n   - 分库分表：水平拆分（按行）、垂直拆分（按列）\n   - 引入缓存：Redis 缓存热点数据\n   - 升级硬件：SSD、增加内存（Buffer Pool）\n\n6. 配置优化\n   - innodb_buffer_pool_size：物理内存的 50%-70%\n   - innodb_log_file_size：适当增大 Redo Log\n   - query_cache_size：查询缓存（MySQL 8.0 已移除）',
   analogy: '优化慢查询就像疏通交通。先看哪里堵（EXPLAIN），然后修路（加索引），或者分流（读写分离）。',
   importance: 'high'
  },
  {
  id: 'mysql-8',
  question: 'InnoDB 和 MyISAM 的区别？',
   answer: 'InnoDB 支持事务、行级锁、外键，是 MySQL 5.5 后的默认引擎。MyISAM 不支持事务，只支持表级锁，但查询速度快，适合读多写少的场景。',
   analogy: 'InnoDB 就像一家正规银行，安全第一，支持各种复杂操作；MyISAM 就像一个简易记账本，记账快但安全性差。',
   importance: 'medium'
  },
  {
  id: 'mysql-9',
  question: '什么是数据库连接池？为什么要用？',
   answer: '连接池预先创建并维护一定数量的数据库连接，应用需要时直接获取，用完归还。它可以避免频繁创建和销毁连接带来的性能开销，提高系统响应速度。',
   analogy: '连接池就像出租车公司。车都停在院子里，有人要用车直接开走，用完还回来。如果没有池子，每次有人要用车都得现买一辆，用完再卖掉。',
   importance: 'medium'
  },
  {
  id: 'mysql-10',
  question: '什么是分库分表？',
   answer: '当单表数据量过大（如超过千万级）或并发过高时，将数据分散到多个数据库或多个表中。垂直拆分是按业务拆分表，水平拆分是按行拆分数据。',
   analogy: '分库分表就像把一个巨大的仓库拆成多个小仓库。垂直拆分是按货物种类分（食品区、服装区）；水平拆分是按编号分（1-100 号货在 A 库，101-200 号在 B 库）。',
   importance: 'medium'
  },
  {
  id: 'mysql-11',
  question: 'MySQL 的锁机制是怎样的？',
   answer: 'InnoDB 实现了行锁和表锁。行锁通过索引实现，包括记录锁（锁记录）、间隙锁（锁间隙）、临键锁（锁记录 + 间隙）。表锁用于 DDL 操作。还有意向锁（IS/IX）用于表明下层有行锁。',
   analogy: '行锁就像【给具体座位贴封条】，别人不能坐这个位置；表锁像【整个房间封锁】，谁都不能进；间隙锁像【两个座位之间不许站人】；临键锁是【座位和前面空隙都不许占】。',
   importance: 'high'
  },
  {
  id: 'mysql-12',
  question: '如何分析 SQL 执行计划（EXPLAIN）？',
   answer: 'EXPLAIN 输出包含：id（查询序号）、select_type（查询类型）、table、type（访问类型）、possible_keys、key（实际使用索引）、rows（扫描行数）、Extra。重点关注 type（至少达到 range 级别）和 Extra（避免 Using filesort）。',
   analogy: 'EXPLAIN 就像【导航软件的路线规划】：type 告诉你走高速还是国道（性能差异），rows 告诉你要经过多少个路口，Extra 告诉你有没有堵车或施工。',
   importance: 'high'
  },
  {
  id: 'mysql-13',
  question: '索引失效的场景有哪些？',
   answer: "1. 对索引列使用函数或计算。2. 隐式类型转换（如字符串不加引号）。3. LIKE '%xxx' 左模糊匹配。4. OR 连接条件中有未建索引的列。5. 联合索引不满足最左前缀原则。6. != 或 <> 操作符。",
   analogy: '索引失效就像【地图导航失灵】：你给的条件太模糊（函数计算）、语言不通（类型转换）、或者只说"大概在东边"（左模糊），导航就找不到路了。',
   importance: 'high'
  },
  {
  id: 'mysql-14',
  question: '什么是覆盖索引？有什么优势？',
   answer: '覆盖索引是指查询的所有列都在索引中，不需要回表查聚簇索引。优势是减少 I/O 次数，大幅提升查询性能。可以通过 EXPLAIN 的 Extra 字段看到"Using index"。',
   analogy: '覆盖索引就像【字典的部首检字表】：你想查某个字的读音，在检字表里直接就能找到，不需要翻到正文那一页（回表）。',
   importance: 'high'
  },
  {
  id: 'mysql-15',
  question: '主从复制的原理是什么？',
   answer: '1. Master 将写操作写入 binlog（二进制日志）。2. Slave 的 I/O 线程读取 binlog 并写入 relay log（中继日志）。3. Slave 的 SQL 线程读取 relay log 并重放执行。支持异步复制、半同步复制。',
   analogy: '主从复制就像【老师讲课记笔记】：老师讲的每句话都录下来（binlog），课代表（I/O 线程）抄到自己的本子上（relay log），然后照着念给大家听（SQL 线程执行）。',
   importance: 'high'
  },
  {
  id: 'mysql-16',
  question: '什么是脏读、不可重复读、幻读？',
   answer: '脏读：读到别的事务未提交的修改。不可重复读：同一事务内两次读到的数据不一致（被别人修改提交）。幻读：同一事务内两次查询，第二次多了或少了记录（被别人插入或删除）。',
   analogy: '脏读：看到别人朋友圈草稿箱的内容（未发布）；不可重复读：早上看某人朋友圈 100 赞，晚上变 200 赞（被改）；幻读：早上看朋友圈有 10 条评论，下午发现有 11 条（被插队）。',
   importance: 'high'
  },
  {
  id: 'mysql-17',
  question: 'InnoDB 的间隙锁（Gap Lock）有什么作用？',
   answer: '间隙锁锁定一个范围但不包含记录本身，主要用于防止幻读。在 RR 隔离级别下，InnoDB 使用 Next-Key Lock（记录锁 + 间隙锁）来保证可重复读并避免幻读。',
   analogy: '间隙锁就像【地铁上的座位】：不仅这个座位有人（记录锁），连两边的扶手也不许别人碰（间隙），这样就不会有人挤进来（幻读）。',
   importance: 'high'
  },
  {
  id: 'mysql-18',
  question: 'Redo Log、Undo Log、Binlog 的区别？',
   answer: 'Redo Log：InnoDB 特有，物理日志，循环写入，保证持久性（WAL 技术）。Undo Log：逻辑日志，记录反向操作，保证原子性和 MVCC。Binlog：Server 层所有引擎都有，追加写入，用于主从复制和恢复。',
   analogy: 'Redo Log 像【行车记录仪】，记录你做了什么操作；Undo Log 像【后悔药】，做错了可以回到从前；Binlog 像【完整录像】，用于回放给别人看（从库）。',
   importance: 'high'
  },
  {
  id: 'mysql-19',
  question: '什么是缓冲池（Buffer Pool）？',
   answer: 'Buffer Pool 是 InnoDB 在内存中开辟的一块区域，用于缓存数据页和索引页。命中率直接影响数据库性能。包含空闲链表、刷新链表、LRU 链表等结构。',
   analogy: '缓冲池就像【书房的书架】：你经常看的书放在书架上（内存），不用每次都去图书馆（磁盘）借。书架越大，能放的书越多，找书越快。',
   importance: 'medium'
  },
  {
  id: 'mysql-20',
  question: 'MySQL 性能优化有哪些手段？',
   answer: '1. SQL 层面：优化查询语句、使用索引覆盖、避免 N+1 查询。2. 架构层面：读写分离、分库分表、引入缓存。3. 配置层面：调整 innodb_buffer_pool_size、max_connections 等参数。4. 硬件层面：SSD、增加内存。',
   analogy: '优化 MySQL 就像【提升餐厅效率】：SQL 优化是【改进菜谱】；架构优化是【开连锁店】；配置优化是【多雇服务员】；硬件升级是【换更好的厨具】。',
   importance: 'high'
  }
  ,
  {
   id: 'mysql-21',
   question: 'SQL 基础语法主要包括哪些？',
    answer: '面试里最基础的是增删改查四类语句。SELECT 用于查询，INSERT 用于插入，UPDATE 用于更新，DELETE 用于删除。回答时可以顺带提到 WHERE 条件、ORDER BY 排序、GROUP BY 分组、LIMIT 分页，因为这些通常会和索引、执行计划一起追问。',
    analogy: 'SELECT 像查档案，INSERT 像新建档案，UPDATE 像改档案，DELETE 像销档。',
    importance: 'medium'
  },
  {
   id: 'mysql-22',
   question: '内连接、左连接、右连接有什么区别？',
    answer: 'INNER JOIN 只返回两张表都匹配上的数据。LEFT JOIN 以左表为主，左表全部保留，右表匹配不上补 null。RIGHT JOIN 反过来，以右表为主。实际开发中 LEFT JOIN 更常用，因为主表和结果范围通常更明确。',
    analogy: '内连接像双方都到场才开会；左连接像左边名单全保留，右边没来的人位置空着；右连接反过来。',
    importance: 'medium'
  },
  {
   id: 'mysql-23',
   question: '创建索引有哪些原则？',
    answer: '优先给查询频繁、区分度高、用于 where、join、order by、group by 的字段建索引。不要给更新特别频繁、区分度很低、很短的小表字段乱建索引。联合索引要遵守最左前缀原则，同时关注覆盖索引收益和索引过多带来的写入成本。',
    analogy: '索引像给书做目录，常翻且容易区分的章节值得做目录，不常翻或者重复度很高的内容没必要额外建目录。',
    importance: 'high'
  },
  {
   id: 'mysql-24',
   question: '数据库三范式是什么？什么时候会做反范式设计？',
    answer: '第一范式要求字段不可再分，第二范式要求非主属性完全依赖主键，第三范式要求非主属性不传递依赖主键。范式越高冗余越少，但查询时可能需要更多关联。在高并发或读多写少场景下，为了减少 join、提升性能，会适当反范式，比如冗余用户名、商品标题快照等，本质是用空间换时间。',
    analogy: '范式像把仓库物品按规则分门别类；反范式像把常用工具提前放到手边，牺牲一点整洁换取效率。',
    importance: 'medium'
  }
];

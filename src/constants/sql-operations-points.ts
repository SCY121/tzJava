import { InterviewPoint } from './command-types';

export const SQL_OPERATION_POINTS: InterviewPoint[] = [
  {
    id: 'sql-op-01',
    question: 'SELECT、FROM、WHERE、ORDER BY、LIMIT 的执行意图怎么理解？',
    importance: 'high',
    answer: `### 核心作用
- \`SELECT\`：决定查哪些列
- \`FROM\`：决定从哪张表或结果集查
- \`WHERE\`：先过滤原始行
- \`ORDER BY\`：对结果排序
- \`LIMIT\`：限制返回条数

### 标准写法
\`\`\`sql
SELECT id, name, salary
FROM employee
WHERE salary >= 10000
ORDER BY salary DESC, id ASC
LIMIT 10;
\`\`\`

### 面试重点
- 一般是先过滤，再排序，再截取前 N 条
- \`ORDER BY\` 可以写多个字段
- \`LIMIT\` 常用于 TopN、分页、排行榜`,
  },
  {
    id: 'sql-op-02',
    question: 'JOIN 有哪些常见写法？什么时候必须想到 LEFT JOIN？',
    importance: 'high',
    answer: `### 常见 JOIN
- \`INNER JOIN\`：只保留两边都匹配上的记录
- \`LEFT JOIN\`：左表全部保留，右表匹配不上补 NULL
- \`SELF JOIN\`：同一张表自己连自己

### 示例
\`\`\`sql
SELECT e.name, d.name AS department_name
FROM employee e
LEFT JOIN department d
  ON e.department_id = d.id;
\`\`\`

### 什么时候要想到 LEFT JOIN
- 主表数据必须全部保留
- 想找“有 A 没有 B”的记录
- 典型题：没下单用户、无交易到访、没有奖金员工

### 高频误区
- \`LEFT JOIN\` 后把右表条件写进 \`WHERE\`，可能把外连接写成内连接
- 这时往往应该把条件写到 \`ON\` 里`,
  },
  {
    id: 'sql-op-03',
    question: 'GROUP BY、HAVING、聚合函数的关系是什么？',
    importance: 'high',
    answer: `### 区别
- \`GROUP BY\`：按维度分组
- 聚合函数：对每组统计，如 \`COUNT\`、\`SUM\`、\`AVG\`
- \`HAVING\`：对分组后的结果再过滤

### 示例
\`\`\`sql
SELECT department_id,
       COUNT(*) AS emp_count,
       AVG(salary) AS avg_salary
FROM employee
GROUP BY department_id
HAVING COUNT(*) >= 5;
\`\`\`

### 面试要点
- \`WHERE\` 过滤分组前的数据
- \`HAVING\` 过滤分组后的结果
- 看到“人数至少 5 的部门”，基本就是 \`GROUP BY + HAVING\``,
  },
  {
    id: 'sql-op-04',
    question: 'COUNT(*)、COUNT(列)、COUNT(DISTINCT 列) 应该怎么区分？',
    importance: 'medium',
    answer: `### 区别
- \`COUNT(*)\`：统计总行数
- \`COUNT(column)\`：统计该列不为 NULL 的行数
- \`COUNT(DISTINCT column)\`：统计去重后且不为 NULL 的值个数

### 示例
\`\`\`sql
SELECT
  COUNT(*) AS total_rows,
  COUNT(bonus) AS bonus_rows,
  COUNT(DISTINCT department_id) AS dept_count
FROM employee;
\`\`\`

### 面试结论
- 现代数据库里 \`COUNT(*)\` 很常用，也最推荐
- 真正常考的是 \`COUNT(column)\` 会忽略 NULL`,
  },
  {
    id: 'sql-op-05',
    question: 'CASE WHEN 在 SQL 里最常见的两个用途是什么？',
    importance: 'medium',
    answer: `### 用途 1：条件分类
\`\`\`sql
SELECT name,
       CASE
         WHEN salary < 10000 THEN 'low'
         WHEN salary <= 30000 THEN 'middle'
         ELSE 'high'
       END AS salary_level
FROM employee;
\`\`\`

### 用途 2：条件聚合
\`\`\`sql
SELECT
  SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) AS paid_count
FROM orders;
\`\`\`

### 高频场景
- 薪资分段
- 状态映射
- 统计通过数、取消数、支付数`,
  },
  {
    id: 'sql-op-06',
    question: '子查询、IN、EXISTS、NOT EXISTS 怎么选？',
    importance: 'medium',
    answer: `### 常见理解
- \`IN\`：更像“属于这个集合”
- \`EXISTS\`：更像“是否存在匹配记录”
- \`NOT EXISTS\`：更像“找不存在关联记录的数据”

### 示例
\`\`\`sql
SELECT c.name
FROM customer c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
);
\`\`\`

### 面试回答建议
- 语义上，\`NOT EXISTS\` 很适合“没买过、没下单、没访问过”
- 性能不能脱离执行计划和索引单独谈`,
  },
  {
    id: 'sql-op-07',
    question: '窗口函数是什么？ROW_NUMBER、RANK、DENSE_RANK 怎么选？',
    importance: 'high',
    answer: `### 窗口函数作用
在不丢失明细行的前提下做排名、累计、分组内统计。

### 三种排名函数
- \`ROW_NUMBER()\`：强制连续编号，不考虑并列
- \`RANK()\`：并列占同一名次，后面跳号
- \`DENSE_RANK()\`：并列占同一名次，后面不跳号

### 示例
\`\`\`sql
SELECT department_id,
       name,
       salary,
       DENSE_RANK() OVER (
         PARTITION BY department_id
         ORDER BY salary DESC
       ) AS rk
FROM employee;
\`\`\`

### 高频题型
- 每组 TopN
- 部门工资前三
- 排行榜
- 滚动统计`,
  },
  {
    id: 'sql-op-08',
    question: 'DISTINCT、去重、去重后排序这类操作怎么理解？',
    importance: 'medium',
    answer: `### 核心作用
\`DISTINCT\` 用于对查询结果去重。

### 示例
\`\`\`sql
SELECT DISTINCT department_id
FROM employee;
\`\`\`

### 去重后排序
\`\`\`sql
SELECT DISTINCT salary
FROM employee
ORDER BY salary DESC;
\`\`\`

### 面试重点
- 第二高薪水、唯一用户数、不同品类数都经常用到 \`DISTINCT\`
- 去重和分组能解决的问题有重合，但语义不完全一样`,
  },
  {
    id: 'sql-op-09',
    question: '分页 SQL 怎么写？为什么深分页慢？',
    importance: 'medium',
    answer: `### 基础分页
\`\`\`sql
SELECT id, name
FROM employee
ORDER BY id
LIMIT 20 OFFSET 40;
\`\`\`

### MySQL 常见写法
\`\`\`sql
SELECT id, name
FROM employee
ORDER BY id
LIMIT 40, 20;
\`\`\`

### 深分页为什么慢
- 因为数据库可能需要先扫描并跳过前面大量记录
- 比如 \`LIMIT 100000, 20\`，前面 10 万条很多时候都要参与处理

### 优化思路
- 尽量基于有序主键做翻页
- 用“上次最后一条 id”做条件，而不是一直 OFFSET`,
  },
  {
    id: 'sql-op-10',
    question: '索引在 SQL 面试里应该怎么讲，才不空泛？',
    importance: 'high',
    answer: `### 核心结论
索引的本质是帮助数据库更快定位数据，减少扫描行数。

### 面试里至少要讲清楚
- 哪些字段适合建索引：高频查询条件、排序字段、连接字段
- 索引的代价：占空间，插入更新删除会更慢
- 联合索引要注意最左前缀原则

### 示例
\`\`\`sql
CREATE INDEX idx_orders_user_time
ON orders(user_id, create_time);
\`\`\`

### 面试回答模板
如果某条 SQL 经常按 \`user_id\` 查，或者按 \`user_id + create_time\` 做过滤和排序，我会优先考虑联合索引，但也会注意写操作开销和索引是否真的被执行计划用上。`,
  },
  {
    id: 'sql-op-11',
    question: 'EXPLAIN 应该看什么？',
    importance: 'high',
    answer: `### 核心作用
\`EXPLAIN\` 用来查看 SQL 的执行计划。

### 常看字段
- \`type\`：访问类型，越接近 \`const\`、\`ref\`、\`range\` 越好
- \`key\`：实际使用了哪个索引
- \`rows\`：预计扫描多少行
- \`Extra\`：额外信息，比如 \`Using filesort\`、\`Using temporary\`

### 示例
\`\`\`sql
EXPLAIN
SELECT *
FROM orders
WHERE user_id = 1001
ORDER BY create_time DESC;
\`\`\`

### 面试重点
- 别只说“看有没有走索引”
- 还要看扫描行数大不大、有没有额外排序、有没有临时表`,
  },
  {
    id: 'sql-op-12',
    question: '事务、隔离级别、脏读、不可重复读、幻读怎么快速答？',
    importance: 'high',
    answer: `### ACID
- 原子性：要么都成功，要么都失败
- 一致性：事务前后数据保持一致
- 隔离性：并发事务互不干扰
- 持久性：提交后数据不会丢

### 四种隔离级别
- 读未提交：可能脏读
- 读已提交：解决脏读，但可能不可重复读
- 可重复读：解决不可重复读，MySQL 默认
- 串行化：最严格，并发能力最差

### 三种并发问题
- 脏读：读到别人没提交的数据
- 不可重复读：同一行前后读到不同值
- 幻读：前后两次范围查询结果条数不同

### 面试回答建议
先说定义，再说哪种隔离级别能避免什么问题，最后补一句 MySQL InnoDB 默认是可重复读。`,
  },
];

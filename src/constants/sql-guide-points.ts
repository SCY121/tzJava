import { InterviewPoint } from './command-types';

export const SQL_GUIDE_POINTS: InterviewPoint[] = [
  {
    id: 'sql-interview-01',
    question: '找出每个部门工资最高的员工',
    importance: 'high',
    answer: `### 题目目标
给定员工表，返回每个部门工资最高的员工姓名和工资。

### 常见表
\`\`\`text
Employee(id, name, salary, department_id)
\`\`\`

### 解题思路
- 先按部门分组求每个部门的最高工资
- 再回表找到对应员工
- 如果有并列最高，要一起返回

### 标准写法
\`\`\`sql
SELECT e.department_id, e.name, e.salary
FROM employee e
JOIN (
  SELECT department_id, MAX(salary) AS max_salary
  FROM employee
  GROUP BY department_id
) t
  ON e.department_id = t.department_id
 AND e.salary = t.max_salary;
\`\`\`

### 面试追问
- 如果要每个部门工资前三高，更适合用窗口函数
- 如果部门表也要查出来，可以再 JOIN department`,
  },
  {
    id: 'sql-interview-02',
    question: '找出每个部门工资前三高的员工',
    importance: 'high',
    answer: `### 题目目标
返回每个部门工资排名前 3 的员工，工资并列时也要保留。

### 解题思路
- 按部门分区
- 按工资降序排名
- 过滤排名小于等于 3 的记录

### 推荐写法
\`\`\`sql
SELECT department_id, name, salary
FROM (
  SELECT e.*,
         DENSE_RANK() OVER (
           PARTITION BY department_id
           ORDER BY salary DESC
         ) AS rk
  FROM employee e
) t
WHERE rk <= 3;
\`\`\`

### 为什么用 DENSE_RANK
- 并列工资算同一名次
- 不会像 ROW_NUMBER 那样把并列数据强行拆开`,
  },
  {
    id: 'sql-interview-03',
    question: '查找第二高薪水 / 第 N 高薪水',
    importance: 'high',
    answer: `### 第二高薪水
\`\`\`sql
SELECT (
  SELECT DISTINCT salary
  FROM employee
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS second_highest_salary;
\`\`\`

### 第 N 高薪水思路
- 先去重
- 再按工资倒序排列
- 用 LIMIT + OFFSET 取第 N 个

### 泛化写法
\`\`\`sql
SELECT salary
FROM (
  SELECT DISTINCT salary
  FROM employee
) t
ORDER BY salary DESC
LIMIT 1 OFFSET 2;
\`\`\`

### 面试追问
- 如果不存在第二高，子查询结果会是 NULL
- 一定要先 DISTINCT，否则重复工资会影响结果`,
  },
  {
    id: 'sql-interview-04',
    question: '找出没有下过单的用户',
    importance: 'high',
    answer: `### 题目目标
用户表有所有用户，订单表有下单记录，找出从未下单的用户。

### 常见写法 1：LEFT JOIN + IS NULL
\`\`\`sql
SELECT c.id, c.name
FROM customers c
LEFT JOIN orders o
  ON c.id = o.customer_id
WHERE o.customer_id IS NULL;
\`\`\`

### 常见写法 2：NOT EXISTS
\`\`\`sql
SELECT c.id, c.name
FROM customers c
WHERE NOT EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
);
\`\`\`

### 面试结论
- 两种都常见
- 语义上找“不存在关联记录”，\`NOT EXISTS\` 很自然
- 真正性能还要看索引和执行计划`,
  },
  {
    id: 'sql-interview-05',
    question: '统计每个用户的订单数和总金额',
    importance: 'high',
    answer: `### 解题思路
- 先按用户分组
- 用 COUNT 统计订单数
- 用 SUM 统计金额

### SQL
\`\`\`sql
SELECT user_id,
       COUNT(*) AS order_count,
       SUM(amount) AS total_amount
FROM orders
GROUP BY user_id;
\`\`\`

### 如果要求没下单的用户也显示
\`\`\`sql
SELECT u.id,
       u.name,
       COUNT(o.id) AS order_count,
       COALESCE(SUM(o.amount), 0) AS total_amount
FROM users u
LEFT JOIN orders o
  ON u.id = o.user_id
GROUP BY u.id, u.name;
\`\`\`

### 面试追问
- \`COUNT(o.id)\` 会忽略 NULL
- \`COALESCE\` 用于把 NULL 转成 0`,
  },
  {
    id: 'sql-interview-06',
    question: '删除重复数据，只保留一条',
    importance: 'high',
    answer: `### 经典场景
同一个邮箱或手机号出现多次，只保留 id 最小的一条。

### 自连接删除
\`\`\`sql
DELETE p1
FROM person p1
JOIN person p2
  ON p1.email = p2.email
 AND p1.id > p2.id;
\`\`\`

### 思路
- 重复组里让大 id 匹配到小 id
- 删除大 id，保留最小 id

### 面试注意点
- 先用 SELECT 验证删除范围
- 生产环境要先备份
- 如果题目要求保留最新数据，就把比较条件反过来`,
  },
  {
    id: 'sql-interview-07',
    question: '查找连续 3 天登录的用户 / 连续出现的数据',
    importance: 'medium',
    answer: `### 常见思路
- 固定连续长度时，可以用自连接
- 更复杂的连续区间，常用窗口函数

### 连续三次相同数字
\`\`\`sql
SELECT DISTINCT l1.num
FROM logs l1
JOIN logs l2
  ON l1.id = l2.id - 1
JOIN logs l3
  ON l1.id = l3.id - 2
WHERE l1.num = l2.num
  AND l2.num = l3.num;
\`\`\`

### 连续登录问题的核心
- 先定义“连续”按什么字段判断
- 是连续日期，还是连续 id
- 是否允许中间缺一天

### 面试追问
- 连续签到题通常会用日期减去排名构造分组
- 这类题最重要的是先把连续定义说清楚`,
  },
  {
    id: 'sql-interview-08',
    question: '求 TopN、排行榜、排名类题目怎么写',
    importance: 'high',
    answer: `### 排名函数
- \`ROW_NUMBER()\`：强制连续编号，不考虑并列
- \`RANK()\`：并列占同名次，后面跳号
- \`DENSE_RANK()\`：并列占同名次，后面不跳号

### 示例
\`\`\`sql
SELECT user_id,
       score,
       DENSE_RANK() OVER (ORDER BY score DESC) AS rk
FROM scores;
\`\`\`

### 每组 TopN 模板
\`\`\`sql
SELECT *
FROM (
  SELECT t.*,
         ROW_NUMBER() OVER (
           PARTITION BY category_id
           ORDER BY score DESC
         ) AS rn
  FROM t
) x
WHERE rn <= 3;
\`\`\`

### 面试重点
- 先判断是否有分组
- 再判断是否允许并列
- 然后选择 ROW_NUMBER / RANK / DENSE_RANK`,
  },
  {
    id: 'sql-interview-09',
    question: '如何统计转化率、通过率、取消率这类比例题',
    importance: 'medium',
    answer: `### 核心思路
- 分子通常是满足条件的数量
- 分母通常是总数量
- 用 \`SUM(CASE WHEN ... THEN 1 ELSE 0 END)\` 或条件聚合

### 示例
\`\`\`sql
SELECT
  ROUND(
    SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) * 1.0 / COUNT(*),
    2
  ) AS approve_rate
FROM orders;
\`\`\`

### 分组统计
\`\`\`sql
SELECT dt,
       ROUND(
         SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) * 1.0 / COUNT(*),
         2
       ) AS pay_rate
FROM orders
GROUP BY dt;
\`\`\`

### 面试追问
- 注意整数除法，通常要乘 \`1.0\`
- 如果分母可能为 0，要额外防御`,
  },
  {
    id: 'sql-interview-10',
    question: '面试里一看到 SQL 题，应该怎么快速判断写法',
    importance: 'high',
    answer: `### 四步法
1. 先看返回字段是什么
2. 再看主表是谁，是否必须保留主表全部数据
3. 判断要不要聚合、排序、窗口函数、去重
4. 最后补边界：NULL、重复值、并列、无匹配记录

### 快速信号
- 出现“每个、每类、每位”：往往要 \`GROUP BY\`
- 出现“即使没有也要显示”：往往要 \`LEFT JOIN\`
- 出现“前几名、排行、TopN”：往往要窗口函数
- 出现“没有下单、没有访问、没有交易”：往往要 \`LEFT JOIN + IS NULL\` 或 \`NOT EXISTS\`
- 出现“删除重复、保留一条”：往往要自连接或窗口函数

### 面试表达模板
“这题我先确定主表是 X，看是否要保留所有 X；然后按 Y 维度做聚合或排名；最后处理 NULL、重复值和边界情况。”`,
  },
];

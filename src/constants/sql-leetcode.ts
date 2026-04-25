import { InterviewPoint } from './command-types';

import { SQL_LEETCODE_META } from './sql-leetcode-meta';

type SqlQuestionInput = {
  id: string;
  title: string;
  importance?: InterviewPoint['importance'];
  schema: string;
  task: string;
  sql: string;
  points: string[];
};

const SQL_COLUMN_TYPE_MAP: Record<string, string> = {
  id: 'int',
  pid: 'int',
  num: 'int',
  x: 'int',
  y: 'int',
  z: 'int',
  age: 'int',
  area: 'int',
  gdp: 'bigint',
  income: 'int',
  lat: 'float',
  lon: 'float',
  turn: 'int',
  unit: 'int',
  units: 'int',
  price: 'int',
  new_price: 'int',
  amount: 'int',
  salary: 'int',
  bonus: 'int',
  rating: 'int',
  position: 'int',
  temperature: 'int',
  weight: 'int',
  quantity: 'int',
  population: 'bigint',
  games_played: 'int',
  experience_years: 'int',
  departmentid: 'int',
  managerid: 'int',
  reports_to: 'int',
  manager_id: 'int',
  supervisor: 'int',
  product_id: 'int',
  customer_id: 'int',
  employee_id: 'int',
  user_id: 'int',
  movie_id: 'int',
  contest_id: 'int',
  project_id: 'int',
  player_id: 'int',
  teacher_id: 'int',
  subject_id: 'int',
  dept_id: 'int',
  session_id: 'int',
  visit_id: 'int',
  transaction_id: 'int',
  sale_id: 'int',
  process_id: 'int',
  machine_id: 'int',
  article_id: 'int',
  author_id: 'int',
  tweet_id: 'int',
  viewer_id: 'int',
  follower_id: 'int',
  requester_id: 'int',
  accepter_id: 'int',
  department_id: 'int',
  delivery_id: 'int',
  account_id: 'int',
  patient_id: 'int',
  person_id: 'int',
  referee_id: 'int',
  student_id: 'int',
  reports_count: 'int',
  unique_id: 'int',
  product_key: 'int',
  empid: 'int',
  userid: 'int',
  customerid: 'int',
  recorddate: 'date',
  view_date: 'date',
  event_date: 'date',
  trans_date: 'date',
  order_date: 'date',
  sell_date: 'date',
  start_date: 'date',
  end_date: 'date',
  purchase_date: 'date',
  activity_date: 'date',
  visited_on: 'date',
  accept_date: 'date',
  change_date: 'date',
  created_at: 'date',
  customer_pref_delivery_date: 'date',
  time_stamp: 'datetime',
  timestamp: 'float',
  activity_type: 'enum',
  action: 'enum',
  state: 'enum',
  low_fats: 'enum',
  recyclable: 'enum',
  primary_flag: 'enum',
  name: 'varchar',
  movie: 'varchar',
  title: 'varchar',
  content: 'varchar',
  description: 'varchar',
  department: 'varchar',
  mail: 'varchar',
  email: 'varchar',
  result: 'varchar',
  country: 'varchar',
  class: 'varchar',
  continent: 'varchar',
  conditions: 'varchar',
  student: 'varchar',
  product: 'varchar',
  product_name: 'varchar',
  product_category: 'varchar',
  student_name: 'varchar',
  subject_name: 'varchar',
  query_name: 'varchar',
  patient_name: 'varchar',
  person_name: 'varchar',
  user_name: 'varchar',
  device_id: 'int',
  tiv_2015: 'float',
  tiv_2016: 'float',
  year: 'int',
};

function inferSqlColumnType(columnName: string) {
  const key = columnName.trim();
  return SQL_COLUMN_TYPE_MAP[key] ?? SQL_COLUMN_TYPE_MAP[key.toLowerCase()] ?? 'varchar';
}

function renderSqlSchemaTable(tableName: string, columns: string[]) {
  const rows = columns.map((column) => [column, inferSqlColumnType(column)]);
  const columnNameWidth = Math.max('Column Name'.length, ...rows.map(([column]) => column.length));
  const typeWidth = Math.max('Type'.length, ...rows.map(([, type]) => type.length));
  const border = `+${'-'.repeat(columnNameWidth + 2)}+${'-'.repeat(typeWidth + 2)}+`;

  return [
    tableName,
    border,
    `| ${'Column Name'.padEnd(columnNameWidth)} | ${'Type'.padEnd(typeWidth)} |`,
    border,
    ...rows.map(([column, type]) => `| ${column.padEnd(columnNameWidth)} | ${type.padEnd(typeWidth)} |`),
    border,
  ].join('\n');
}

function formatSqlSchema(schema: string) {
  const normalized = schema.trim();
  if (normalized.includes('Column Name')) {
    return normalized;
  }

  const blocks = normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\((.+)\)$/);
      if (!match) {
        return line;
      }

      const [, tableName, rawColumns] = match;
      const columns = rawColumns
        .split(',')
        .map((column) => column.trim())
        .filter(Boolean);

      return renderSqlSchemaTable(tableName, columns);
    });

  return blocks.join('\n\n');
}

function buildDefaultSqlDetail(task: string, points: string[]) {
  if (points.length === 0) {
    return `${task} 写 SQL 时先确认返回字段，再判断是否需要连接、分组、排序或条件聚合。`;
  }

  return `${task} 这题重点在于：${points.join('、')}。建议先明确主表，再补过滤、聚合和排序。`;
}

function buildDefaultSqlSampleInput(schema: string) {
  return `示意表结构如下，实际做题时可直接代入官方样例数据：\n\n${formatSqlSchema(schema)}`;
}

function buildDefaultSqlSampleOutput(title: string) {
  return `根据题目《${title}》的条件与返回字段，输出对应结果集。`;
}

function createSqlQuestion(input: SqlQuestionInput): InterviewPoint {
  const meta = SQL_LEETCODE_META[input.id];
  const answer = [
    '### 题目描述',
    meta?.detail ?? buildDefaultSqlDetail(input.task, input.points),
    '',
    '### 表结构',
    '```text',
    formatSqlSchema(input.schema),
    '```',
    '',
    '### 样例输入',
    '```text',
    meta?.sampleInput ?? buildDefaultSqlSampleInput(input.schema),
    '```',
    '',
    '### 样例输出',
    '```text',
    meta?.sampleOutput ?? buildDefaultSqlSampleOutput(input.title),
    '```',
    ...(meta?.sampleExplanation
      ? [
          '',
          '### 样例说明',
          meta.sampleExplanation,
        ]
      : []),
    '',
    '### 参考 SQL',
    '```sql',
    input.sql.trim(),
    '```',
    '',
    '### 关键点',
    ...input.points.map((point) => `- ${point}`),
  ].join('\n');

  return {
    id: input.id,
    question: input.title,
    answer,
    importance: input.importance ?? 'medium',
  };
}

export const SQL_LEETCODE_50: InterviewPoint[] = [
  createSqlQuestion({
    id: 'sql-01',
    title: '[1757] 可回收且低脂的产品',
    importance: 'low',
    schema: `
Products
+-------------+------+
| Column Name | Type |
+-------------+------+
| product_id  | int  |
| low_fats    | enum |
| recyclable  | enum |
+-------------+------+`,
    task: '查询既是低脂产品又是可回收产品的 product_id。',
    sql: `SELECT product_id
FROM Products
WHERE low_fats = 'Y' AND recyclable = 'Y';`,
    points: ['基础条件过滤', 'AND 条件组合'],
  }),
  createSqlQuestion({
    id: 'sql-02',
    title: '[584] 寻找用户推荐人',
    importance: 'low',
    schema: `
Customer
+------------+---------+
| Column Name| Type    |
+------------+---------+
| id         | int     |
| name       | varchar |
| referee_id | int     |
+------------+---------+`,
    task: '查询推荐人不是 2 的客户姓名，referee_id 为 NULL 也要保留。',
    sql: `SELECT name
FROM Customer
WHERE referee_id <> 2 OR referee_id IS NULL;`,
    points: ['NULL 需要单独判断', '题目本质是筛掉 referee_id = 2'],
  }),
  createSqlQuestion({
    id: 'sql-03',
    title: '[595] 大的国家',
    importance: 'low',
    schema: `
World(name, continent, area, population, gdp)`,
    task: '查询面积至少 3000000 或人口至少 25000000 的国家，返回 name、population、area。',
    sql: `SELECT name, population, area
FROM World
WHERE area >= 3000000 OR population >= 25000000;`,
    points: ['OR 条件过滤'],
  }),
  createSqlQuestion({
    id: 'sql-04',
    title: '[1148] 文章浏览 I',
    importance: 'low',
    schema: `
Views(article_id, author_id, viewer_id, view_date)`,
    task: '找出作者自己看过自己文章的作者 id，并按升序返回。',
    sql: `SELECT DISTINCT author_id AS id
FROM Views
WHERE author_id = viewer_id
ORDER BY id;`,
    points: ['DISTINCT 去重', '别名输出'],
  }),
  createSqlQuestion({
    id: 'sql-05',
    title: '[1683] 无效的推文',
    importance: 'low',
    schema: `
Tweets(tweet_id, content)`,
    task: '找出内容长度大于 15 的推文 ID。',
    sql: `SELECT tweet_id
FROM Tweets
WHERE CHAR_LENGTH(content) > 15;`,
    points: ['字符串长度函数'],
  }),
  createSqlQuestion({
    id: 'sql-06',
    title: '[1378] 使用唯一标识码替换员工 ID',
    importance: 'low',
    schema: `
Employees(id, name)
EmployeeUNI(id, unique_id)`,
    task: '返回每位员工的 unique_id 和 name，没有唯一标识码的员工也要保留。',
    sql: `SELECT eu.unique_id, e.name
FROM Employees e
LEFT JOIN EmployeeUNI eu
  ON e.id = eu.id;`,
    points: ['LEFT JOIN 保留员工表全部数据'],
  }),
  createSqlQuestion({
    id: 'sql-07',
    title: '[1068] 产品销售分析 I',
    importance: 'low',
    schema: `
Sales(sale_id, product_id, year, quantity, price)
Product(product_id, product_name)`,
    task: '返回每笔销售对应的产品名称、销售年份和价格。',
    sql: `SELECT p.product_name, s.year, s.price
FROM Sales s
JOIN Product p
  ON s.product_id = p.product_id;`,
    points: ['普通内连接'],
  }),
  createSqlQuestion({
    id: 'sql-08',
    title: '[1581] 进店却未进行过交易的顾客',
    importance: 'medium',
    schema: `
Visits(visit_id, customer_id)
Transactions(transaction_id, visit_id, amount)`,
    task: '统计每位顾客有到访但没有交易的次数。',
    sql: `SELECT v.customer_id, COUNT(*) AS count_no_trans
FROM Visits v
LEFT JOIN Transactions t
  ON v.visit_id = t.visit_id
WHERE t.transaction_id IS NULL
GROUP BY v.customer_id;`,
    points: ['LEFT JOIN + IS NULL 找未匹配记录', '按 customer_id 分组'],
  }),
  createSqlQuestion({
    id: 'sql-09',
    title: '[197] 上升的温度',
    importance: 'medium',
    schema: `
Weather(id, recordDate, temperature)`,
    task: '找出温度比前一天更高的记录 id。',
    sql: `SELECT w1.id
FROM Weather w1
JOIN Weather w2
  ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;`,
    points: ['自连接', 'DATEDIFF 比较前一天'],
  }),
  createSqlQuestion({
    id: 'sql-10',
    title: '[1661] 每台机器的进程平均运行时间',
    importance: 'medium',
    schema: `
Activity(machine_id, process_id, activity_type, timestamp)`,
    task: '计算每台机器所有进程的平均运行时间，保留 3 位小数。',
    sql: `SELECT a1.machine_id,
       ROUND(AVG(a2.timestamp - a1.timestamp), 3) AS processing_time
FROM Activity a1
JOIN Activity a2
  ON a1.machine_id = a2.machine_id
 AND a1.process_id = a2.process_id
WHERE a1.activity_type = 'start'
  AND a2.activity_type = 'end'
GROUP BY a1.machine_id;`,
    points: ['把 start 和 end 成对连接', '差值后求平均'],
  }),
  createSqlQuestion({
    id: 'sql-11',
    title: '[577] 员工奖金',
    importance: 'low',
    schema: `
Employee(empId, name, supervisor, salary)
Bonus(empId, bonus)`,
    task: '返回奖金小于 1000 或没有奖金的员工姓名和奖金。',
    sql: `SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b
  ON e.empId = b.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;`,
    points: ['NULL 也要保留'],
  }),
  createSqlQuestion({
    id: 'sql-12',
    title: '[1280] 学生们参加各科测试的次数',
    importance: 'medium',
    schema: `
Students(student_id, student_name)
Subjects(subject_name)
Examinations(student_id, subject_name)`,
    task: '输出每个学生参加每门考试的次数，即使没参加也要显示 0。',
    sql: `SELECT s.student_id,
       s.student_name,
       sub.subject_name,
       COUNT(e.subject_name) AS attended_exams
FROM Students s
CROSS JOIN Subjects sub
LEFT JOIN Examinations e
  ON s.student_id = e.student_id
 AND sub.subject_name = e.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
ORDER BY s.student_id, sub.subject_name;`,
    points: ['先造全量学生-科目组合', '再左连接考试记录'],
  }),
  createSqlQuestion({
    id: 'sql-13',
    title: '[570] 至少有 5 名直接下属的经理',
    importance: 'medium',
    schema: `
Employee(id, name, department, managerId)`,
    task: '找出至少有 5 名直接下属的经理姓名。',
    sql: `SELECT e.name
FROM Employee e
JOIN (
    SELECT managerId
    FROM Employee
    WHERE managerId IS NOT NULL
    GROUP BY managerId
    HAVING COUNT(*) >= 5
) t
  ON e.id = t.managerId;`,
    points: ['先分组统计经理，再回表取名字'],
  }),
  createSqlQuestion({
    id: 'sql-14',
    title: '[1934] 确认率',
    importance: 'medium',
    schema: `
Signups(user_id, time_stamp)
Confirmations(user_id, time_stamp, action)`,
    task: '计算每个用户的确认率，没有确认记录则返回 0，保留两位小数。',
    sql: `SELECT s.user_id,
       ROUND(IFNULL(AVG(CASE WHEN c.action = 'confirmed' THEN 1 ELSE 0 END), 0), 2) AS confirmation_rate
FROM Signups s
LEFT JOIN Confirmations c
  ON s.user_id = c.user_id
GROUP BY s.user_id;`,
    points: ['把 confirmed 转成 1', '没记录用 IFNULL 补 0'],
  }),
  createSqlQuestion({
    id: 'sql-15',
    title: '[620] 有趣的电影',
    importance: 'low',
    schema: `
Cinema(id, movie, description, rating)`,
    task: '找出描述不是 boring 且 id 为奇数的电影，按 rating 降序。',
    sql: `SELECT *
FROM Cinema
WHERE description <> 'boring'
  AND id % 2 = 1
ORDER BY rating DESC;`,
    points: ['基础过滤 + 排序'],
  }),
  createSqlQuestion({
    id: 'sql-16',
    title: '[1251] 平均售价',
    importance: 'medium',
    schema: `
Prices(product_id, start_date, end_date, price)
UnitsSold(product_id, purchase_date, units)`,
    task: '计算每个产品的平均售价，没卖出的返回 0。',
    sql: `SELECT p.product_id,
       ROUND(IFNULL(SUM(p.price * u.units) / SUM(u.units), 0), 2) AS average_price
FROM Prices p
LEFT JOIN UnitsSold u
  ON p.product_id = u.product_id
 AND u.purchase_date BETWEEN p.start_date AND p.end_date
GROUP BY p.product_id;`,
    points: ['区间连接', '加权平均'],
  }),
  createSqlQuestion({
    id: 'sql-17',
    title: '[1075] 项目员工 I',
    importance: 'low',
    schema: `
Project(project_id, employee_id)
Employee(employee_id, name, experience_years)`,
    task: '统计每个项目参与员工的平均工作年限，保留两位小数。',
    sql: `SELECT p.project_id,
       ROUND(AVG(e.experience_years), 2) AS average_years
FROM Project p
JOIN Employee e
  ON p.employee_id = e.employee_id
GROUP BY p.project_id;`,
    points: ['连接后分组求平均'],
  }),
  createSqlQuestion({
    id: 'sql-18',
    title: '[1633] 各赛事的用户注册率',
    importance: 'medium',
    schema: `
Users(user_id, user_name)
Register(contest_id, user_id)`,
    task: '计算每个比赛的注册率，按百分比降序，contest_id 升序。',
    sql: `SELECT contest_id,
       ROUND(COUNT(DISTINCT user_id) * 100 / (SELECT COUNT(*) FROM Users), 2) AS percentage
FROM Register
GROUP BY contest_id
ORDER BY percentage DESC, contest_id ASC;`,
    points: ['分母是用户总数', '分子要去重用户'],
  }),
  createSqlQuestion({
    id: 'sql-19',
    title: '[1211] 查询结果的质量和占比',
    importance: 'medium',
    schema: `
Queries(query_name, result, position, rating)`,
    task: '统计每个 query_name 的质量和差评占比，忽略 query_name 为 NULL 的记录。',
    sql: `SELECT query_name,
       ROUND(AVG(rating / position), 2) AS quality,
       ROUND(AVG(CASE WHEN rating < 3 THEN 1 ELSE 0 END) * 100, 2) AS poor_query_percentage
FROM Queries
WHERE query_name IS NOT NULL
GROUP BY query_name;`,
    points: ['条件聚合', 'AVG(0/1) 可直接求占比'],
  }),
  createSqlQuestion({
    id: 'sql-20',
    title: '[1193] 每月交易 I',
    importance: 'medium',
    schema: `
Transactions(id, country, state, amount, trans_date)`,
    task: '按月份和国家统计交易数量、已批准数量、总金额和已批准总金额。',
    sql: `SELECT DATE_FORMAT(trans_date, '%Y-%m') AS month,
       country,
       COUNT(*) AS trans_count,
       SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count,
       SUM(amount) AS trans_total_amount,
       SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount
FROM Transactions
GROUP BY DATE_FORMAT(trans_date, '%Y-%m'), country;`,
    points: ['DATE_FORMAT 取月份', '条件聚合'],
  }),
  createSqlQuestion({
    id: 'sql-21',
    title: '[1174] 即时食物配送 II',
    importance: 'medium',
    schema: `
Delivery(delivery_id, customer_id, order_date, customer_pref_delivery_date)`,
    task: '计算顾客首单中即时送达的比例，保留两位小数。',
    sql: `SELECT ROUND(AVG(order_date = customer_pref_delivery_date) * 100, 2) AS immediate_percentage
FROM Delivery
WHERE (customer_id, order_date) IN (
    SELECT customer_id, MIN(order_date)
    FROM Delivery
    GROUP BY customer_id
);`,
    points: ['先找到首单', '布尔表达式可直接参与 AVG'],
  }),
  createSqlQuestion({
    id: 'sql-22',
    title: '[550] 游戏玩法分析 IV',
    importance: 'medium',
    schema: `
Activity(player_id, device_id, event_date, games_played)`,
    task: '统计首登后第二天仍登录的玩家占比，保留两位小数。',
    sql: `SELECT ROUND(
         COUNT(DISTINCT a.player_id) / (SELECT COUNT(DISTINCT player_id) FROM Activity),
         2
       ) AS fraction
FROM Activity a
JOIN (
    SELECT player_id, MIN(event_date) AS first_login
    FROM Activity
    GROUP BY player_id
) f
  ON a.player_id = f.player_id
 AND DATEDIFF(a.event_date, f.first_login) = 1;`,
    points: ['先求首登日期', '再判断是否次日回访'],
  }),
  createSqlQuestion({
    id: 'sql-23',
    title: '[2356] 每位教师所教授的科目种类的数量',
    importance: 'low',
    schema: `
Teacher(teacher_id, subject_id, dept_id)`,
    task: '统计每位教师教了多少种不同科目。',
    sql: `SELECT teacher_id,
       COUNT(DISTINCT subject_id) AS cnt
FROM Teacher
GROUP BY teacher_id;`,
    points: ['DISTINCT 计数'],
  }),
  createSqlQuestion({
    id: 'sql-24',
    title: '[1141] 查询近 30 天活跃用户数',
    importance: 'low',
    schema: `
Activity(user_id, session_id, activity_date, activity_type)`,
    task: '统计截止 2019-07-27 的近 30 天内每天的活跃用户数。',
    sql: `SELECT activity_date AS day,
       COUNT(DISTINCT user_id) AS active_users
FROM Activity
WHERE activity_date BETWEEN DATE_SUB('2019-07-27', INTERVAL 29 DAY) AND '2019-07-27'
GROUP BY activity_date;`,
    points: ['近 30 天包含当天', '按日期分组、用户去重'],
  }),
  createSqlQuestion({
    id: 'sql-25',
    title: '[1070] 产品销售分析 III',
    importance: 'medium',
    schema: `
Sales(sale_id, product_id, year, quantity, price)`,
    task: '返回每个产品首年销售记录的 product_id、first_year、quantity、price。',
    sql: `SELECT s.product_id,
       s.year AS first_year,
       s.quantity,
       s.price
FROM Sales s
JOIN (
    SELECT product_id, MIN(year) AS first_year
    FROM Sales
    GROUP BY product_id
) t
  ON s.product_id = t.product_id
 AND s.year = t.first_year;`,
    points: ['先求最早年份，再连接原表'],
  }),
  createSqlQuestion({
    id: 'sql-26',
    title: '[596] 超过 5 名学生的课',
    importance: 'low',
    schema: `
Courses(student, class)`,
    task: '找出学生数不少于 5 的课程。',
    sql: `SELECT class
FROM Courses
GROUP BY class
HAVING COUNT(DISTINCT student) >= 5;`,
    points: ['HAVING 过滤聚合结果'],
  }),
  createSqlQuestion({
    id: 'sql-27',
    title: '[1729] 求关注者的数量',
    importance: 'low',
    schema: `
Followers(user_id, follower_id)`,
    task: '统计每个用户的粉丝数，并按 user_id 升序。',
    sql: `SELECT user_id,
       COUNT(*) AS followers_count
FROM Followers
GROUP BY user_id
ORDER BY user_id;`,
    points: ['简单分组计数'],
  }),
  createSqlQuestion({
    id: 'sql-28',
    title: '[619] 只出现一次的最大数字',
    importance: 'low',
    schema: `
MyNumbers(num)`,
    task: '返回只出现一次的最大数字，如果不存在则返回 NULL。',
    sql: `SELECT MAX(num) AS num
FROM (
    SELECT num
    FROM MyNumbers
    GROUP BY num
    HAVING COUNT(*) = 1
) t;`,
    points: ['先筛只出现一次的数，再取最大值'],
  }),
  createSqlQuestion({
    id: 'sql-29',
    title: '[1045] 买下所有产品的客户',
    importance: 'medium',
    schema: `
Customer(customer_id, product_key)
Product(product_key)`,
    task: '找出买齐所有产品的客户。',
    sql: `SELECT customer_id
FROM Customer
GROUP BY customer_id
HAVING COUNT(DISTINCT product_key) = (SELECT COUNT(*) FROM Product);`,
    points: ['客户买过的不同产品数要等于产品总数'],
  }),
  createSqlQuestion({
    id: 'sql-30',
    title: '[1731] 每位经理的下属员工数量',
    importance: 'medium',
    schema: `
Employees(employee_id, name, reports_to, age)`,
    task: '输出每位经理的员工编号、姓名、下属数量和下属平均年龄。',
    sql: `SELECT e.employee_id,
       e.name,
       COUNT(r.employee_id) AS reports_count,
       ROUND(AVG(r.age), 0) AS average_age
FROM Employees e
JOIN Employees r
  ON e.employee_id = r.reports_to
GROUP BY e.employee_id, e.name
ORDER BY e.employee_id;`,
    points: ['自连接找上下级关系'],
  }),
  createSqlQuestion({
    id: 'sql-31',
    title: '[1789] 每位员工的直属部门',
    importance: 'medium',
    schema: `
Employee(employee_id, department_id, primary_flag)`,
    task: '如果员工只有一个部门则直接返回；如果有多个部门则返回 primary_flag = Y 的直属部门。',
    sql: `SELECT employee_id, department_id
FROM Employee
WHERE primary_flag = 'Y'
   OR employee_id IN (
       SELECT employee_id
       FROM Employee
       GROUP BY employee_id
       HAVING COUNT(*) = 1
   );`,
    points: ['单部门员工直接保留', '多部门员工取主部门'],
  }),
  createSqlQuestion({
    id: 'sql-32',
    title: '[610] 判断三角形',
    importance: 'low',
    schema: `
Triangle(x, y, z)`,
    task: '判断每一行边长是否可以构成三角形。',
    sql: `SELECT x, y, z,
       CASE
         WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes'
         ELSE 'No'
       END AS triangle
FROM Triangle;`,
    points: ['三角形判定条件', 'CASE WHEN 输出结果'],
  }),
  createSqlQuestion({
    id: 'sql-33',
    title: '[180] 连续出现的数字',
    importance: 'medium',
    schema: `
Logs(id, num)`,
    task: '找出至少连续出现 3 次的数字。',
    sql: `SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1
JOIN Logs l2
  ON l1.id = l2.id - 1
JOIN Logs l3
  ON l1.id = l3.id - 2
WHERE l1.num = l2.num
  AND l2.num = l3.num;`,
    points: ['多次自连接判断连续记录'],
  }),
  createSqlQuestion({
    id: 'sql-34',
    title: '[1164] 指定日期的产品价格',
    importance: 'medium',
    schema: `
Products(product_id, new_price, change_date)`,
    task: '求 2019-08-16 当天所有产品价格，没有调整过价格的产品默认价格为 10。',
    sql: `SELECT p.product_id,
       IFNULL(t.new_price, 10) AS price
FROM (SELECT DISTINCT product_id FROM Products) p
LEFT JOIN (
    SELECT product_id, new_price
    FROM Products
    WHERE (product_id, change_date) IN (
        SELECT product_id, MAX(change_date)
        FROM Products
        WHERE change_date <= '2019-08-16'
        GROUP BY product_id
    )
) t
  ON p.product_id = t.product_id;`,
    points: ['找指定日期前最后一次变价', '没有历史变价则取默认价'],
  }),
  createSqlQuestion({
    id: 'sql-35',
    title: '[1204] 最后一个能进入巴士的人',
    importance: 'medium',
    schema: `
Queue(person_id, person_name, weight, turn)`,
    task: '巴士承重 1000，按排队顺序找最后一个还能上车的人。',
    sql: `SELECT person_name
FROM (
    SELECT person_name,
           SUM(weight) OVER (ORDER BY turn) AS total_weight
    FROM Queue
) t
WHERE total_weight <= 1000
ORDER BY total_weight DESC
LIMIT 1;`,
    points: ['窗口函数做前缀和'],
  }),
  createSqlQuestion({
    id: 'sql-36',
    title: '[1907] 按分类统计薪水',
    importance: 'medium',
    schema: `
Accounts(account_id, income)`,
    task: '统计低薪、中等薪资、高薪三个区间的人数，即使为 0 也要输出。',
    sql: `SELECT 'Low Salary' AS category, COUNT(*) AS accounts_count
FROM Accounts
WHERE income < 20000
UNION ALL
SELECT 'Average Salary' AS category, COUNT(*) AS accounts_count
FROM Accounts
WHERE income BETWEEN 20000 AND 50000
UNION ALL
SELECT 'High Salary' AS category, COUNT(*) AS accounts_count
FROM Accounts
WHERE income > 50000;`,
    points: ['固定三类结果用 UNION ALL 很直接'],
  }),
  createSqlQuestion({
    id: 'sql-37',
    title: '[1978] 上级经理已离职的公司员工',
    importance: 'low',
    schema: `
Employees(employee_id, name, manager_id, salary)`,
    task: '找出工资低于 30000 且经理已经不在员工表中的员工编号。',
    sql: `SELECT employee_id
FROM Employees
WHERE salary < 30000
  AND manager_id IS NOT NULL
  AND manager_id NOT IN (SELECT employee_id FROM Employees)
ORDER BY employee_id;`,
    points: ['NOT IN 反查不存在的经理'],
  }),
  createSqlQuestion({
    id: 'sql-38',
    title: '[626] 换座位',
    importance: 'medium',
    schema: `
Seat(id, student)`,
    task: '交换相邻座位上的学生，最后一个奇数座位如果无人可换则保持不变。',
    sql: `SELECT CASE
         WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id
         WHEN id % 2 = 1 THEN id + 1
         ELSE id - 1
       END AS id,
       student
FROM Seat
ORDER BY id;`,
    points: ['按奇偶位交换，最后一位特殊处理'],
  }),
  createSqlQuestion({
    id: 'sql-39',
    title: '[1321] 餐馆营业额变化增长',
    importance: 'high',
    schema: `
Customer(customer_id, name, visited_on, amount)`,
    task: '计算每天及前 6 天共 7 天的总营业额和平均营业额，只保留完整 7 天窗口。',
    sql: `WITH daily AS (
    SELECT visited_on, SUM(amount) AS amount
    FROM Customer
    GROUP BY visited_on
),
windowed AS (
    SELECT visited_on,
           SUM(amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount,
           ROUND(AVG(amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount,
           ROW_NUMBER() OVER (ORDER BY visited_on) AS rn
    FROM daily
)
SELECT visited_on, amount, average_amount
FROM windowed
WHERE rn >= 7;`,
    points: ['先按天汇总，再做 7 天窗口统计'],
  }),
  createSqlQuestion({
    id: 'sql-40',
    title: '[1341] 电影评分',
    importance: 'high',
    schema: `
Movies(movie_id, title)
Users(user_id, name)
MovieRating(movie_id, user_id, rating, created_at)`,
    task: '返回两个结果：评分次数最多的用户姓名，以及 2020-02 中平均评分最高的电影标题。',
    sql: `(SELECT u.name AS results
 FROM MovieRating mr
 JOIN Users u
   ON mr.user_id = u.user_id
 GROUP BY u.user_id, u.name
 ORDER BY COUNT(*) DESC, u.name ASC
 LIMIT 1)
UNION ALL
(SELECT m.title AS results
 FROM MovieRating mr
 JOIN Movies m
   ON mr.movie_id = m.movie_id
 WHERE DATE_FORMAT(mr.created_at, '%Y-%m') = '2020-02'
 GROUP BY m.movie_id, m.title
 ORDER BY AVG(mr.rating) DESC, m.title ASC
 LIMIT 1);`,
    points: ['一题两问，用 UNION ALL 拼结果'],
  }),
  createSqlQuestion({
    id: 'sql-41',
    title: '[602] 好友申请 II：谁有最多的好友',
    importance: 'medium',
    schema: `
RequestAccepted(requester_id, accepter_id, accept_date)`,
    task: '找出拥有最多好友的人和好友数。',
    sql: `SELECT id, COUNT(*) AS num
FROM (
    SELECT requester_id AS id FROM RequestAccepted
    UNION ALL
    SELECT accepter_id AS id FROM RequestAccepted
) t
GROUP BY id
ORDER BY num DESC
LIMIT 1;`,
    points: ['一条好友关系对双方都要计数'],
  }),
  createSqlQuestion({
    id: 'sql-42',
    title: '[585] 2016 年的投资',
    importance: 'high',
    schema: `
Insurance(pid, tiv_2015, tiv_2016, lat, lon)`,
    task: '统计 tiv_2015 重复出现且位置 lat、lon 唯一的投保人 2016 年总投资额。',
    sql: `SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016
FROM Insurance
WHERE tiv_2015 IN (
    SELECT tiv_2015
    FROM Insurance
    GROUP BY tiv_2015
    HAVING COUNT(*) > 1
)
AND (lat, lon) IN (
    SELECT lat, lon
    FROM Insurance
    GROUP BY lat, lon
    HAVING COUNT(*) = 1
);`,
    points: ['两个条件分别用子查询筛选'],
  }),
  createSqlQuestion({
    id: 'sql-43',
    title: '[185] 部门工资前三高的所有员工',
    importance: 'high',
    schema: `
Employee(id, name, salary, departmentId)
Department(id, name)`,
    task: '查询每个部门工资排名前三的员工，工资相同按同一名次处理。',
    sql: `SELECT d.name AS Department,
       t.name AS Employee,
       t.salary AS Salary
FROM (
    SELECT e.*,
           DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) AS rk
    FROM Employee e
) t
JOIN Department d
  ON t.departmentId = d.id
WHERE t.rk <= 3;`,
    points: ['按部门分区排名', 'DENSE_RANK 处理并列名次'],
  }),
  createSqlQuestion({
    id: 'sql-44',
    title: '[1667] 修复表中的名字',
    importance: 'low',
    schema: `
Users(user_id, name)`,
    task: '把名字修复成首字母大写，其余字母小写，并按 user_id 排序。',
    sql: `SELECT user_id,
       CONCAT(UPPER(LEFT(name, 1)), LOWER(SUBSTRING(name, 2))) AS name
FROM Users
ORDER BY user_id;`,
    points: ['字符串切片 + 大小写转换'],
  }),
  createSqlQuestion({
    id: 'sql-45',
    title: '[1527] 患某种疾病的患者',
    importance: 'medium',
    schema: `
Patients(patient_id, patient_name, conditions)`,
    task: '找出 conditions 中包含以 DIAB1 开头病症编码的患者。',
    sql: `SELECT *
FROM Patients
WHERE conditions LIKE 'DIAB1%'
   OR conditions LIKE '% DIAB1%';`,
    points: ['要按单词匹配，不是任意子串'],
  }),
  createSqlQuestion({
    id: 'sql-46',
    title: '[196] 删除重复的电子邮箱',
    importance: 'medium',
    schema: `
Person(id, email)`,
    task: '删除重复邮箱，只保留 id 最小的一条记录。',
    sql: `DELETE p1
FROM Person p1, Person p2
WHERE p1.email = p2.email
  AND p1.id > p2.id;`,
    points: ['自连接删除重复行'],
  }),
  createSqlQuestion({
    id: 'sql-47',
    title: '[176] 第二高的薪水',
    importance: 'medium',
    schema: `
Employee(id, salary)`,
    task: '返回第二高的薪水，不存在则返回 NULL。',
    sql: `SELECT (
    SELECT DISTINCT salary
    FROM Employee
    ORDER BY salary DESC
    LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
    points: ['DISTINCT 去重', '子查询为空时自然返回 NULL'],
  }),
  createSqlQuestion({
    id: 'sql-48',
    title: '[1484] 按日期分组销售产品',
    importance: 'medium',
    schema: `
Activities(sell_date, product)`,
    task: '按销售日期统计售出商品种数，并拼接商品名称列表。',
    sql: `SELECT sell_date,
       COUNT(DISTINCT product) AS num_sold,
       GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;`,
    points: ['GROUP_CONCAT 拼接字符串'],
  }),
  createSqlQuestion({
    id: 'sql-49',
    title: '[1327] 列出指定时间段内所有的下单产品',
    importance: 'medium',
    schema: `
Products(product_id, product_name, product_category)
Orders(product_id, order_date, unit)`,
    task: '找出 2020-02 下单总量不少于 100 的产品名称和数量。',
    sql: `SELECT p.product_name,
       SUM(o.unit) AS unit
FROM Products p
JOIN Orders o
  ON p.product_id = o.product_id
WHERE o.order_date BETWEEN '2020-02-01' AND '2020-02-29'
GROUP BY p.product_id, p.product_name
HAVING SUM(o.unit) >= 100;`,
    points: ['先按月份过滤，再聚合筛选'],
  }),
  createSqlQuestion({
    id: 'sql-50',
    title: '[1517] 查找拥有有效邮箱的用户',
    importance: 'medium',
    schema: `
Users(user_id, name, mail)`,
    task: '找出邮箱格式有效的用户，域名必须是 @leetcode.com。',
    sql: `SELECT *
FROM Users
WHERE mail REGEXP '^[A-Za-z][A-Za-z0-9_.-]*@leetcode\\.com$';`,
    points: ['正则匹配邮箱规则', '点号需要转义'],
  }),
];

export type SqlQuestionMeta = {
  detail?: string;
  sampleInput?: string;
  sampleOutput?: string;
  sampleExplanation?: string;
};

export const SQL_LEETCODE_META: Record<string, SqlQuestionMeta> = {
  'sql-01': {
    detail: '从 Products 表中筛选同时满足 `low_fats = "Y"` 和 `recyclable = "Y"` 的商品，只返回产品编号。题目考查最基础的条件过滤。',
    sampleInput: `Products
+------------+----------+------------+
| product_id | low_fats | recyclable |
+------------+----------+------------+
| 0          | Y        | N          |
| 1          | Y        | Y          |
| 2          | N        | Y          |
| 3          | Y        | Y          |
+------------+----------+------------+`,
    sampleOutput: `+------------+
| product_id |
+------------+
| 1          |
| 3          |
+------------+`,
    sampleExplanation: '只有 1 和 3 同时满足低脂且可回收两个条件。',
  },
  'sql-02': {
    detail: '从 Customer 表中找出推荐人不是 `2` 的客户，同时保留 `referee_id` 为 `NULL` 的客户。这里重点是 `NULL` 需要单独判断。',
    sampleInput: `Customer
+----+------+------------+
| id | name | referee_id |
+----+------+------------+
| 1  | Will | null       |
| 2  | Jane | null       |
| 3  | Alex | 2          |
| 4  | Bill | null       |
| 5  | Zack | 1          |
| 6  | Mark | 2          |
+----+------+------------+`,
    sampleOutput: `+------+
| name |
+------+
| Will |
| Jane |
| Bill |
| Zack |
+------+`,
    sampleExplanation: 'Alex 和 Mark 的推荐人是 2，需要排除。',
  },
  'sql-03': {
    detail: '从 World 表中找出“大国家”：面积至少为 3000000，或者人口至少为 25000000。返回国家名、人口和面积。',
    sampleInput: `World
+-------------+-----------+---------+------------+---------+
| name        | continent | area    | population | gdp     |
+-------------+-----------+---------+------------+---------+
| Afghanistan | Asia      | 652230  | 25500100   | 2034300 |
| Albania     | Europe    | 28748   | 2831741    | 1296000 |
| Algeria     | Africa    | 2381741 | 37100000   | 1886810 |
| Andorra     | Europe    | 468     | 78115      | 3712000 |
+-------------+-----------+---------+------------+---------+`,
    sampleOutput: `+-------------+------------+---------+
| name        | population | area    |
+-------------+------------+---------+
| Afghanistan | 25500100   | 652230  |
| Algeria     | 37100000   | 2381741 |
+-------------+------------+---------+`,
    sampleExplanation: 'Afghanistan 和 Algeria 至少满足一个条件，因此会被选中。',
  },
  'sql-04': {
    detail: '找出“作者自己阅读自己文章”的记录，即 `author_id = viewer_id`。结果需要去重，并按作者 id 升序返回。',
    sampleInput: `Views
+------------+-----------+-----------+------------+
| article_id | author_id | viewer_id | view_date  |
+------------+-----------+-----------+------------+
| 1          | 3         | 5         | 2019-08-01 |
| 1          | 3         | 3         | 2019-08-02 |
| 2          | 7         | 7         | 2019-08-01 |
| 2          | 7         | 6         | 2019-08-02 |
+------------+-----------+-----------+------------+`,
    sampleOutput: `+----+
| id |
+----+
| 3  |
| 7  |
+----+`,
    sampleExplanation: '作者 3 和 7 都看过自己的文章，因此输出这两个作者编号。',
  },
  'sql-05': {
    detail: '从 Tweets 表中找出无效推文。题目把长度大于 15 的内容定义为无效推文。',
    sampleInput: `Tweets
+----------+--------------------+
| tweet_id | content            |
+----------+--------------------+
| 1        | Vote for Biden     |
| 2        | Let us code SQL    |
| 3        | More than fifteen! |
+----------+--------------------+`,
    sampleOutput: `+----------+
| tweet_id |
+----------+
| 3        |
+----------+`,
    sampleExplanation: '第 3 条推文长度超过 15，因此属于无效推文。',
  },
  'sql-06': {
    detail: '并不是每个员工都在 EmployeeUNI 表里有唯一标识码，因此需要以 Employees 为主表做左连接，保留全部员工。',
    sampleInput: `Employees
+----+---------+
| id | name    |
+----+---------+
| 1  | Alice   |
| 7  | Bob     |
| 11 | Meir    |
| 90 | Winston |
+----+---------+

EmployeeUNI
+----+-----------+
| id | unique_id |
+----+-----------+
| 3  | 1         |
| 11 | 2         |
| 90 | 3         |
+----+-----------+`,
    sampleOutput: `+-----------+---------+
| unique_id | name    |
+-----------+---------+
| null      | Alice   |
| null      | Bob     |
| 2         | Meir    |
| 3         | Winston |
+-----------+---------+`,
    sampleExplanation: 'Alice 和 Bob 没有唯一标识码，也要保留。',
  },
  'sql-07': {
    detail: '根据 Sales 与 Product 的 `product_id` 进行内连接，输出每笔销售对应的产品名、销售年份和价格。',
    sampleInput: `Sales
+---------+------------+------+----------+-------+
| sale_id | product_id | year | quantity | price |
+---------+------------+------+----------+-------+
| 1       | 100        | 2008 | 10       | 5000  |
| 2       | 100        | 2009 | 12       | 5000  |
| 7       | 200        | 2011 | 15       | 9000  |
+---------+------------+------+----------+-------+

Product
+------------+--------------+
| product_id | product_name |
+------------+--------------+
| 100        | Nokia        |
| 200        | Apple        |
+------------+--------------+`,
    sampleOutput: `+--------------+------+-------+
| product_name | year | price |
+--------------+------+-------+
| Nokia        | 2008 | 5000  |
| Nokia        | 2009 | 5000  |
| Apple        | 2011 | 9000  |
+--------------+------+-------+`,
    sampleExplanation: 'Sales 负责销售事实，Product 负责产品名称，按 product_id 关联即可。',
  },
  'sql-08': {
    detail: 'Visits 记录顾客到访，Transactions 记录交易。题目要求统计“到访了但没有发生交易”的次数，因此要找出 Visits 中未匹配到交易的 visit_id。',
    sampleInput: `Visits
+----------+-------------+
| visit_id | customer_id |
+----------+-------------+
| 1        | 23          |
| 2        | 9           |
| 4        | 30          |
| 5        | 54          |
| 6        | 96          |
+----------+-------------+

Transactions
+----------------+----------+--------+
| transaction_id | visit_id | amount |
+----------------+----------+--------+
| 2              | 5        | 310    |
| 3              | 5        | 300    |
| 9              | 5        | 200    |
| 12             | 1        | 910    |
+----------------+----------+--------+`,
    sampleOutput: `+-------------+----------------+
| customer_id | count_no_trans |
+-------------+----------------+
| 9           | 1              |
| 30          | 1              |
| 96          | 1              |
+-------------+----------------+`,
    sampleExplanation: 'visit_id 2、4、6 没有交易记录，分别对应顾客 9、30、96。',
  },
  'sql-09': {
    detail: '比较相邻两天的温度，找出当天温度高于前一天的记录 id。常见解法是 Weather 自连接。',
    sampleInput: `Weather
+----+------------+-------------+
| id | recordDate | temperature |
+----+------------+-------------+
| 1  | 2015-01-01 | 10          |
| 2  | 2015-01-02 | 25          |
| 3  | 2015-01-03 | 20          |
| 4  | 2015-01-04 | 30          |
+----+------------+-------------+`,
    sampleOutput: `+----+
| id |
+----+
| 2  |
| 4  |
+----+`,
    sampleExplanation: '1 月 2 日和 1 月 4 日的温度都高于前一天。',
  },
  'sql-10': {
    detail: '同一个 `machine_id + process_id` 有一条 start 和一条 end。先把开始结束事件配对，再求每台机器的平均运行时间。',
    sampleInput: `Activity
+------------+------------+---------------+-----------+
| machine_id | process_id | activity_type | timestamp |
+------------+------------+---------------+-----------+
| 0          | 0          | start         | 0.712     |
| 0          | 0          | end           | 1.520     |
| 0          | 1          | start         | 3.140     |
| 0          | 1          | end           | 4.120     |
| 1          | 0          | start         | 0.550     |
| 1          | 0          | end           | 1.550     |
+------------+------------+---------------+-----------+`,
    sampleOutput: `+------------+-----------------+
| machine_id | processing_time |
+------------+-----------------+
| 0          | 0.894           |
| 1          | 1.000           |
+------------+-----------------+`,
    sampleExplanation: '机器 0 两个进程耗时分别为 0.808 和 0.980，平均约为 0.894。',
  },
};

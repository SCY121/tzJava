# Java后端实习面试精华题目（进阶篇）

## 四、计算机网络

### 4.1 网络协议基础

#### 4.1.1 OSI和TCP/IP模型
**问题：** OSI七层模型和TCP/IP四层模型的对应关系？

**参考答案：**
```
应用层（HTTP、FTP、SMTP）
├── 为应用程序提供网络服务
表示层（SSL/TLS、JPEG、ASCII）
├── 数据格式转换、加密解密
会话层（RPC、SQL）
├── 建立、管理和终止会话
传输层（TCP、UDP）
├── 端到端通信、流量控制
网络层（IP、ICMP、ARP）
├── 路由选择、逻辑寻址
数据链路层（以太网、PPP）
├── 物理寻址、差错检测
物理层（RJ45、光纤）
└── 比特流传输
```

**TCP/IP四层模型：**
- 应用层 = OSI应用层+表示层+会话层
- 传输层 = OSI传输层
- 网络层 = OSI网络层
- 网络接口层 = OSI数据链路层+物理层

#### 4.1.2 HTTP协议
**问题：** HTTP和HTTPS的区别？

**参考答案：**
| 特性 | HTTP | HTTPS |
|------|------|-------|
| 端口 | 80 | 443 |
| 安全性 | 明文传输 | 加密传输 |
| 性能 | 较快 | 较慢（加密开销） |
| 协议 | HTTP | HTTP + SSL/TLS |

**问题：** HTTP状态码分类？

**参考答案：**
- **1xx**：信息响应（100 Continue）
- **2xx**：成功（200 OK、201 Created）
- **3xx**：重定向（301永久、302临时、304未修改）
- **4xx**：客户端错误（400请求错误、401未授权、403禁止、404未找到）
- **5xx**：服务器错误（500内部错误、502网关错误、503服务不可用）

**问题：** GET和POST的区别？

**参考答案：**
| 特性 | GET | POST |
|------|-----|------|
| 参数位置 | URL中 | 请求体中 |
| 安全性 | 参数可见 | 参数不可见 |
| 数据长度 | 有限制 | 无限制 |
| 缓存 | 可被缓存 | 不可缓存 |
| 幂等性 | 幂等 | 非幂等 |

### 4.2 TCP协议

#### 4.2.1 TCP三次握手
**问题：** TCP三次握手过程？

**参考答案：**
```
客户端                    服务器
  |                         |
  |---- SYN=1, seq=x ----->|  第一次握手
  |<---- SYN=1, ACK=1, ----|  第二次握手
  |     seq=y, ack=x+1      |
  |---- ACK=1, seq=x+1 --->|  第三次握手
  |     ack=y+1              |
```

**为什么需要三次握手？**
- 确保双方都能发送和接收数据
- 防止已失效的连接请求到达服务器
- 同步双方的初始序列号

#### 4.2.2 TCP四次挥手
**问题：** TCP四次挥手过程？

**参考答案：**
```
客户端                    服务器
  |---- FIN=1, seq=u ----->|  第一次挥手
  |<---- ACK=1, seq=v, ----|  第二次挥手
  |     ack=u+1              |
  |<---- FIN=1, ACK=1, ----|  第三次挥手
  |     seq=w, ack=u+1       |
  |---- ACK=1, seq=u+1 --->|  第四次挥手
  |     ack=w+1              |
```

**为什么需要四次挥手？**
- TCP是全双工协议，需要分别关闭两个方向的连接
- 服务器可能还有数据要发送

#### 4.2.3 TCP特性
**问题：** TCP的可靠性如何保证？

**参考答案：**
1. **序列号和确认应答**：每个数据包都有序列号，接收方发送ACK确认
2. **超时重传**：发送方在一定时间内未收到ACK则重传
3. **滑动窗口**：流量控制，避免发送方发送过快
4. **拥塞控制**：慢启动、拥塞避免、快重传、快恢复
5. **校验和**：检测数据在传输过程中是否出错

**问题：** TCP拥塞控制算法？

**参考答案：**
- **慢启动**：拥塞窗口从1开始指数增长
- **拥塞避免**：窗口达到阈值后线性增长
- **快重传**：收到3个重复ACK立即重传
- **快恢复**：快重传后不进入慢启动

### 4.3 UDP协议

**问题：** TCP和UDP的区别？

**参考答案：**
| 特性 | TCP | UDP |
|------|-----|-----|
| 连接性 | 面向连接 | 无连接 |
| 可靠性 | 可靠传输 | 不可靠传输 |
| 有序性 | 保证顺序 | 不保证顺序 |
| 速度 | 较慢 | 较快 |
| 适用场景 | 文件传输、邮件 | 视频流、DNS、游戏 |

### 4.4 HTTP协议深入

#### 4.4.1 HTTP版本演进
**问题：** HTTP/1.1、HTTP/2.0、HTTP/3.0的主要改进？

**参考答案：**
**HTTP/1.0 → HTTP/1.1：**
- 持久连接（Keep-Alive）
- 管道化（Pipelining）
- Host头字段

**HTTP/1.1 → HTTP/2.0：**
- 二进制分帧
- 多路复用
- 头部压缩
- 服务器推送

**HTTP/2.0 → HTTP/3.0：**
- 基于QUIC协议（UDP）
- 0-RTT连接建立
- 改进的拥塞控制

**问题：** HTTP/2.0的多路复用如何解决队头阻塞？

**参考答案：**
- HTTP/1.1：一个TCP连接中，前一个请求阻塞后面的请求
- HTTP/2.0：通过二进制分帧层，将消息分解为独立的帧
- 不同stream的帧可以交错发送，互不干扰

#### 4.4.2 HTTP缓存
**问题：** HTTP缓存机制？

**参考答案：**
**强缓存：**
- **Expires**：绝对时间
- **Cache-Control**：相对时间（max-age）
- **no-cache**：不使用强缓存
- **no-store**：不缓存

**协商缓存：**
- **Last-Modified/If-Modified-Since**：基于修改时间
- **ETag/If-None-Match**：基于内容哈希

### 4.5 网络安全

#### 4.5.1 SSL/TLS
**问题：** HTTPS的SSL/TLS握手过程？

**参考答案：**
```
客户端                    服务器
  |---- ClientHello ------>|  支持的加密套件
  |<---- ServerHello ------|  选择的加密套件
  |<---- Certificate ------|  服务器证书
  |---- ClientKeyExchange->|  预主密钥
  |---- ChangeCipherSpec-->|  开始使用加密
  |---- Finished ---------->|  加密的握手消息
  |<---- ChangeCipherSpec--|
  |<---- Finished ---------|
```

#### 4.5.2 常见攻击防护
**问题：** CSRF攻击原理和防范？

**参考答案：**
**CSRF原理：**
- 攻击者诱导用户访问恶意网站
- 恶意网站发送请求到目标网站
- 浏览器自动携带用户的cookie

**防范措施：**
- CSRF Token
- Referer检查
- SameSite Cookie
- 验证码

**问题：** XSS攻击类型和防范？

**参考答案：**
**XSS类型：**
- **存储型XSS**：恶意脚本存储在服务器上
- **反射型XSS**：恶意脚本在URL中反射回页面
- **DOM型XSS**：通过修改DOM结构执行恶意脚本

**防范措施：**
- 输入验证和过滤
- 输出编码
- CSP（内容安全策略）
- HttpOnly cookie

### 4.6 网络编程

**问题：** 什么是IO多路复用？select、poll、epoll的区别？

**参考答案：**
**IO多路复用：** 一个线程处理多个IO事件

**select：**
- 文件描述符数量有限
- 每次调用都需要拷贝fd集合
- 时间复杂度O(n)

**poll：**
- 使用链表存储fd，无数量限制
- 时间复杂度O(n)

**epoll：**
- 事件驱动，只关注活跃的fd
- 时间复杂度O(1)
- 支持边缘触发（ET）和水平触发（LT）

## 五、操作系统

### 5.1 进程和线程

**问题：** 进程和线程的区别？

**参考答案：**
| 特性 | 进程 | 线程 |
|------|------|------|
| 资源分配 | 资源分配的基本单位 | 不拥有资源，共享进程资源 |
| 切换开销 | 大（需要切换地址空间） | 小（共享地址空间） |
| 通信方式 | IPC（管道、消息队列等） | 直接访问共享内存 |
| 健壮性 | 一个进程崩溃不影响其他进程 | 一个线程崩溃导致整个进程崩溃 |

**问题：** 线程间通信的方式？

**参考答案：**
1. **共享内存**：线程可以直接访问进程的共享内存空间
2. **互斥锁（Mutex）**：保护共享资源
3. **条件变量**：线程间同步
4. **信号量**：控制对共享资源的访问数量

### 5.2 内存管理

**问题：** 什么是虚拟内存？有什么好处？

**参考答案：**
**虚拟内存：** 为每个进程提供独立的虚拟地址空间

**好处：**
1. **内存隔离**：进程间内存相互隔离
2. **内存扩展**：可以使用硬盘空间扩展内存容量
3. **内存共享**：多个进程可以共享相同的物理内存页
4. **简化编程**：程序员不需要关心物理内存分配

**问题：** 常见的页面置换算法？

**参考答案：**
- **最佳置换（OPT）**：选择未来最长时间不被访问的页面
- **先进先出（FIFO）**：选择最先进入内存的页面
- **最近最少使用（LRU）**：选择最近最久未使用的页面
- **时钟算法（Clock）**：FIFO的改进版本

### 5.3 文件系统

**问题：** 什么是inode？

**参考答案：**
**inode：** 索引节点，存储文件的元数据

**包含信息：**
- 文件大小、所有者信息、权限信息
- 时间戳（创建、修改、访问）
- 数据块位置、链接计数

**问题：** 硬链接和软链接的区别？

**参考答案：**
**硬链接：**
- 多个文件名指向同一个inode
- 删除一个链接不影响其他链接
- 不能跨文件系统

**软链接：**
- 特殊的文件，内容是目标文件的路径
- 可以跨文件系统
- 目标文件删除后成为悬空链接

### 5.4 并发和同步

**问题：** 死锁的四个必要条件？如何预防？

**参考答案：**
**四个必要条件：**
1. **互斥条件**：资源一次只能被一个进程使用
2. **占有且等待**：进程持有资源同时等待其他资源
3. **不可抢占**：资源只能被持有者释放
4. **循环等待**：进程间形成循环等待链

**预防方法：**
- 破坏互斥：某些资源可以共享
- 破坏占有且等待：一次性申请所有资源
- 破坏不可抢占：允许强制回收资源
- 破坏循环等待：按顺序申请资源

### 5.5 Linux系统

**问题：** Linux进程状态有哪些？

**参考答案：**
- **R（TASK_RUNNING）**：运行或就绪
- **S（TASK_INTERRUPTIBLE）**：可中断睡眠
- **D（TASK_UNINTERRUPTIBLE）**：不可中断睡眠
- **T（TASK_STOPPED）**：暂停
- **Z（TASK_DEAD）**：僵尸进程
- **X（TASK_DEAD）**：死亡

**问题：** 常用的Linux命令？

**参考答案：**
**系统信息：**
```bash
uname -a        # 系统信息
df -h           # 磁盘使用情况
free -m         # 内存使用情况
top             # 进程信息
```

**文件操作：**
```bash
ls -la          # 列出文件
tail -f file    # 实时查看文件
grep pattern file # 搜索文本
find /path -name "*.txt" # 查找文件
```

**网络操作：**
```bash
netstat -tlnp   # 网络连接
ping host       # 测试连接
tcpdump -i eth0 # 抓包
```

**性能监控：**
```bash
iostat          # I/O统计
vmstat          # 虚拟内存统计
sar             # 系统活动报告
```

## 六、算法与数据结构

### 6.1 数组和字符串

**问题：** 两数之和

**题目：** 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

**参考答案：**
```java
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    throw new IllegalArgumentException("No solution");
}
// 时间复杂度：O(n)，空间复杂度：O(n)
```

**问题：** 最长回文子串

**题目：** 给定一个字符串，找到最长的回文子串。

**参考答案：**
```java
public String longestPalindrome(String s) {
    if (s == null || s.length() < 1) return "";
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
        int len1 = expandAroundCenter(s, i, i);
        int len2 = expandAroundCenter(s, i, i + 1);
        int len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substring(start, end + 1);
}
private int expandAroundCenter(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        left--; right++;
    }
    return right - left - 1;
}
// 时间复杂度：O(n²)，空间复杂度：O(1)
```

### 6.2 链表

**问题：** 反转链表

**题目：** 反转一个单链表。

**参考答案：**
```java
// 迭代法
public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}
// 时间复杂度：O(n)，空间复杂度：O(1)
```

**问题：** 环形链表

**题目：** 判断链表是否有环，找到环的入口。

**参考答案：**
```java
public ListNode detectCycle(ListNode head) {
    if (head == null) return null;
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) break;
    }
    if (fast == null || fast.next == null) return null;
    slow = head;
    while (slow != fast) {
        slow = slow.next;
        fast = fast.next;
    }
    return slow;
}
// 时间复杂度：O(n)，空间复杂度：O(1)
```

### 6.3 树和图

**问题：** 二叉树的层序遍历

**题目：** 按层遍历二叉树。

**参考答案：**
```java
public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> currentLevel = new ArrayList<>();
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            currentLevel.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(currentLevel);
    }
    return result;
}
// 时间复杂度：O(n)，空间复杂度：O(w)
```

**问题：** 验证二叉搜索树

**题目：** 判断给定的二叉树是否是有效的二叉搜索树。

**参考答案：**
```java
public boolean isValidBST(TreeNode root) {
    return isValidBST(root, null, null);
}
private boolean isValidBST(TreeNode node, Integer min, Integer max) {
    if (node == null) return true;
    if (min != null && node.val <= min) return false;
    if (max != null && node.val >= max) return false;
    return isValidBST(node.left, min, node.val) &&
           isValidBST(node.right, node.val, max);
}
// 时间复杂度：O(n)，空间复杂度：O(h)
```

### 6.4 动态规划

**问题：** 爬楼梯

**题目：** 爬n阶楼梯，每次可以爬1或2阶，有多少种不同的方法？

**参考答案：**
```java
public int climbStairs(int n) {
    if (n <= 2) return n;
    int prev1 = 1, prev2 = 2, current = 0;
    for (int i = 3; i <= n; i++) {
        current = prev1 + prev2;
        prev1 = prev2;
        prev2 = current;
    }
    return current;
}
// 时间复杂度：O(n)，空间复杂度：O(1)
```

**问题：** 最长递增子序列

**题目：** 找到数组中最长的严格递增子序列的长度。

**参考答案：**
```java
public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int num : nums) {
        int left = 0, right = tails.size();
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (tails.get(mid) < num) left = mid + 1;
            else right = mid;
        }
        if (left == tails.size()) tails.add(num);
        else tails.set(left, num);
    }
    return tails.size();
}
// 时间复杂度：O(nlogn)，空间复杂度：O(n)
```

### 6.5 排序和搜索

**问题：** 快速排序

**题目：** 实现快速排序算法。

**参考答案：**
```java
public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}
private int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return i + 1;
}
// 时间复杂度：平均O(nlogn)，最坏O(n²)
```

**问题：** 二分查找

**题目：** 实现二分查找算法。

**参考答案：**
```java
public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
// 时间复杂度：O(logn)，空间复杂度：O(1)
```

### 6.6 设计题

**问题：** LRU缓存

**题目：** 实现一个LRU（最近最少使用）缓存。

**参考答案：**
```java
class LRUCache {
    private class Node {
        int key, value; Node prev, next;
        Node(int key, int value) { this.key = key; this.value = value; }
    }
    private final int capacity;
    private final Map<Integer, Node> cache;
    private final Node head, tail;

    public LRUCache(int capacity) {
        this.capacity = capacity; this.cache = new HashMap<>();
        this.head = new Node(0, 0); this.tail = new Node(0, 0);
        head.next = tail; tail.prev = head;
    }

    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) return -1;
        moveToHead(node); return node.value;
    }

    public void put(int key, int value) {
        Node node = cache.get(key);
        if (node == null) {
            node = new Node(key, value);
            cache.put(key, node); addToHead(node);
            if (cache.size() > capacity) {
                Node tail = removeTail(); cache.remove(tail.key);
            }
        } else {
            node.value = value; moveToHead(node);
        }
    }
    // 辅助方法省略...
}
// 时间复杂度：get O(1), put O(1)
```

### 6.7 复杂度分析

**常见时间复杂度：**
- O(1)：常数时间
- O(logn)：对数时间（二分查找）
- O(n)：线性时间（遍历数组）
- O(nlogn)：线性对数时间（快速排序）
- O(n²)：平方时间（冒泡排序）
- O(2ⁿ)：指数时间
- O(n!)：阶乘时间

**常见空间复杂度：**
- O(1)：常数空间（原地算法）
- O(n)：线性空间（数组、链表）
- O(n²)：平方空间（二维数组）
- O(logn)：对数空间（递归栈）

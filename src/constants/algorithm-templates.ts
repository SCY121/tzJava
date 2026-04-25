import type { AlgorithmTemplate } from './command-types';

export const ALGORITHM_TEMPLATES: AlgorithmTemplate[] = [
  {
    id: 'template-array-two-pointers',
    title: '双指针模板',
    summary: '适合有序数组、左右夹逼、移除元素、盛水容器、三数之和等题型。',
    usage: '先明确左右指针各自代表什么，再根据条件移动左指针或右指针。',
    code: `public int solve(int[] nums) {
    int left = 0, right = nums.length - 1;
    int ans = 0;
    while (left < right) {
        // 根据题意更新答案
        ans = Math.max(ans, nums[left] + nums[right]);
        if (nums[left] < nums[right]) left++;
        else right--;
    }
    return ans;
}`,
  },
  {
    id: 'template-sliding-window',
    title: '滑动窗口模板',
    summary: '适合最长子串、最小覆盖子串、找到所有异位词、子数组和约束类问题。',
    usage: '右指针负责扩张窗口，左指针负责收缩窗口；每次都维护窗口是否合法。',
    code: `public int solve(String s) {
    int left = 0, ans = 0;
    Map<Character, Integer> map = new HashMap<>();
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        map.put(c, map.getOrDefault(c, 0) + 1);
        while (map.get(c) > 1) {
            char d = s.charAt(left++);
            map.put(d, map.get(d) - 1);
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
}`,
  },
  {
    id: 'template-binary-search',
    title: '二分查找模板',
    summary: '适合有序数组查找、答案二分、边界二分。',
    usage: '先明确查的是精确值、左边界还是右边界，再决定 mid 命中后往哪侧收缩。',
    code: `public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
  },
  {
    id: 'template-bfs-tree',
    title: '树层序遍历模板',
    summary: '适合二叉树层序遍历、最短层数、逐层处理节点等题型。',
    usage: '队列里放当前层节点，每次先记住 size，再处理这一层的所有节点。',
    code: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> ans = new ArrayList<>();
    if (root == null) return ans;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
        int size = q.size();
        List<Integer> level = new ArrayList<>();
        while (size-- > 0) {
            TreeNode node = q.poll();
            level.add(node.val);
            if (node.left != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        ans.add(level);
    }
    return ans;
}`,
  },
  {
    id: 'template-dfs-backtracking',
    title: '回溯模板',
    summary: '适合子集、组合、全排列、括号生成、N 皇后等搜索题。',
    usage: '路径 path 记录当前选择，for 循环枚举下一步，递归结束后撤销选择。',
    code: `List<List<Integer>> ans = new ArrayList<>();
List<Integer> path = new ArrayList<>();

public List<List<Integer>> subsets(int[] nums) {
    dfs(nums, 0);
    return ans;
}

private void dfs(int[] nums, int start) {
    ans.add(new ArrayList<>(path));
    for (int i = start; i < nums.length; i++) {
        path.add(nums[i]);
        dfs(nums, i + 1);
        path.remove(path.size() - 1);
    }
}`,
  },
  {
    id: 'template-linkedlist-fastslow',
    title: '链表快慢指针模板',
    summary: '适合找中点、判断环、寻找环入口、链表排序切分。',
    usage: 'slow 一次一步，fast 一次两步；根据题目不同，初始化位置可以略有变化。',
    code: `public ListNode middleNode(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
  },
  {
    id: 'template-merge-list',
    title: '链表归并模板',
    summary: '适合合并两个有序链表、排序链表、分治合并 K 个链表。',
    usage: 'dummy 统一处理头结点，cur 负责向后串链。',
    code: `private ListNode merge(ListNode a, ListNode b) {
    ListNode dummy = new ListNode(0), cur = dummy;
    while (a != null && b != null) {
        if (a.val < b.val) {
            cur.next = a;
            a = a.next;
        } else {
            cur.next = b;
            b = b.next;
        }
        cur = cur.next;
    }
    cur.next = (a != null) ? a : b;
    return dummy.next;
}`,
  },
  {
    id: 'template-monotonic-stack',
    title: '单调栈模板',
    summary: '适合每日温度、下一个更大元素、柱状图、接雨水等题型。',
    usage: '栈里存下标更常见；遇到破坏单调性的元素时持续弹栈并结算答案。',
    code: `public int[] dailyTemperatures(int[] nums) {
    int n = nums.length;
    int[] ans = new int[n];
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
            int j = stack.pop();
            ans[j] = i - j;
        }
        stack.push(i);
    }
    return ans;
}`,
  },
  {
    id: 'template-acm-array',
    title: 'ACM 数组输入模板',
    summary: '适合一维数组求和、双指针、排序、贪心、前缀和等最常见笔试题。',
    usage: '第一行读数组长度 n，接着读 n 个整数。数组类题目基本都能从这个模板起手。',
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextInt()) {
            int n = sc.nextInt();
            int[] nums = new int[n];
            for (int i = 0; i < n; i++) nums[i] = sc.nextInt();

            int ans = solve(nums);
            System.out.println(ans);
        }
    }

    static int solve(int[] nums) {
        int ans = 0;
        for (int x : nums) ans += x;
        return ans;
    }
}`,
  },
  {
    id: 'template-acm-matrix',
    title: 'ACM 二维数组模板',
    summary: '适合矩阵搜索、岛屿问题、BFS/DFS、动态规划表格题。',
    usage: '先读行列 m、n，再顺序读二维数组。矩阵题和网格题都很常用。',
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextInt()) {
            int m = sc.nextInt(), n = sc.nextInt();
            int[][] grid = new int[m][n];
            for (int i = 0; i < m; i++) {
                for (int j = 0; j < n; j++) {
                    grid[i][j] = sc.nextInt();
                }
            }

            System.out.println(solve(grid));
        }
    }

    static int solve(int[][] grid) {
        int ans = 0;
        for (int[] row : grid) {
            for (int x : row) ans += x;
        }
        return ans;
    }
}`,
  },
  {
    id: 'template-acm-char-grid',
    title: 'ACM 字符网格模板',
    summary: '适合字符矩阵、迷宫、岛屿、连通块搜索等题目。',
    usage: '先读行列，再逐行读字符串。像地图题、棋盘题、岛屿题经常这么读。',
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNextInt()) {
            int m = sc.nextInt(), n = sc.nextInt();
            char[][] grid = new char[m][n];
            for (int i = 0; i < m; i++) {
                String row = sc.next();
                for (int j = 0; j < n; j++) {
                    grid[i][j] = row.charAt(j);
                }
            }

            System.out.println(solve(grid));
        }
    }

    static int solve(char[][] grid) {
        int cnt = 0;
        for (char[] row : grid) {
            for (char c : row) {
                if (c == '1') cnt++;
            }
        }
        return cnt;
    }
}`,
  },
  {
    id: 'template-acm-linked-list',
    title: 'ACM 链表模板',
    summary: '适合反转链表、合并链表、排序链表、找中点等链表手撕题。',
    usage: '最常见的链表 ACM 写法就是把输入整数流直接串成链表，然后调用核心函数再打印。',
    code: `import java.util.*;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ListNode dummy = new ListNode(0), cur = dummy;
        while (sc.hasNextInt()) {
            cur.next = new ListNode(sc.nextInt());
            cur = cur.next;
        }

        ListNode head = solve(dummy.next);
        while (head != null) {
            System.out.print(head.val + (head.next == null ? "" : "->"));
            head = head.next;
        }
    }

    static ListNode solve(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
    }
}`,
  },
  {
    id: 'template-acm-tree-lite',
    title: 'ACM 二叉树简写模板',
    summary: '适合最近公共祖先、二叉树递归、树上 DFS 这类偏面试手撕的题。',
    usage: '树题面试时经常直接手动建一棵示例树，而不是现场写一整套 buildTree。',
    code: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int x) { val = x; }
}

public class Main {
    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(5);
        root.right = new TreeNode(1);

        TreeNode ans = solve(root, root.left, root.right);
        System.out.println(ans.val);
    }

    static TreeNode solve(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = solve(root.left, p, q);
        TreeNode right = solve(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`,
  },
  {
    id: 'template-acm-queue-bfs',
    title: 'ACM 队列 BFS 模板',
    summary: '适合最短步数、层序遍历、网格最短路、状态扩散等 BFS 题。',
    usage: '先把起点入队，循环弹出并扩展下一层。手撕时先明确状态、visited 和方向数组。',
    code: `import java.util.*;

public class Main {
    static int[] dx = {-1, 1, 0, 0};
    static int[] dy = {0, 0, -1, 1};

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt(), n = sc.nextInt();
        int[][] grid = new int[m][n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                grid[i][j] = sc.nextInt();
            }
        }
        System.out.println(bfs(grid));
    }

    static int bfs(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> q = new LinkedList<>();
        boolean[][] vis = new boolean[m][n];
        q.offer(new int[]{0, 0, 0});
        vis[0][0] = true;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int x = cur[0], y = cur[1], step = cur[2];
            if (x == m - 1 && y == n - 1) return step;
            for (int k = 0; k < 4; k++) {
                int nx = x + dx[k], ny = y + dy[k];
                if (nx < 0 || nx >= m || ny < 0 || ny >= n) continue;
                if (vis[nx][ny] || grid[nx][ny] == 1) continue;
                vis[nx][ny] = true;
                q.offer(new int[]{nx, ny, step + 1});
            }
        }
        return -1;
    }
}`,
  },
  {
    id: 'template-acm-graph',
    title: 'ACM 图邻接表模板',
    summary: '适合无向图遍历、连通块统计、拓扑前置建图等常见图题。',
    usage: '先读点数和边数，再建邻接表。图题的第一步通常就是把图结构组织出来。',
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), m = sc.nextInt();
        List<Integer>[] g = new ArrayList[n + 1];
        for (int i = 1; i <= n; i++) g[i] = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            int u = sc.nextInt(), v = sc.nextInt();
            g[u].add(v);
            g[v].add(u);
        }

        boolean[] vis = new boolean[n + 1];
        int cnt = 0;
        for (int i = 1; i <= n; i++) {
            if (!vis[i]) {
                dfs(i, g, vis);
                cnt++;
            }
        }
        System.out.println(cnt);
    }

    static void dfs(int u, List<Integer>[] g, boolean[] vis) {
        vis[u] = true;
        for (int v : g[u]) {
            if (!vis[v]) dfs(v, g, vis);
        }
    }
}`,
  },
  {
    id: 'template-acm-string',
    title: 'ACM 字符串模板',
    summary: '适合子串、异位词、回文、字符计数等字符串基础题。',
    usage: '字符串题在 ACM 里通常直接按 token 或整行读取，然后用双指针、哈希表或计数数组处理。',
    code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        while (sc.hasNext()) {
            String s = sc.next();
            String t = sc.next();
            System.out.println(solve(s, t));
        }
    }

    static boolean solve(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] cnt = new int[26];
        for (int i = 0; i < s.length(); i++) {
            cnt[s.charAt(i) - 'a']++;
            cnt[t.charAt(i) - 'a']--;
        }
        for (int x : cnt) {
            if (x != 0) return false;
        }
        return true;
    }
}`,
  },
];

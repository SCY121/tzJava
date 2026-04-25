export interface AlgorithmPoint {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  approach: string;
  code: string;
  url?: string;
  group?: string;
  slug?: string;
}

export const ALGORITHM_POINTS: AlgorithmPoint[] = [
  {
    id: 'algo-1',
    title: '1. LRU 缓存 (LRU Cache)',
    difficulty: 'Medium',
    description: '设计并实现一个满足 LRU (最近最少使用) 缓存 约束的数据结构。实现 LRUCache 类：\n- LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存\n- int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。\n- void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。',
    approach: '使用哈希表 + 双向链表。哈希表用于 O(1) 查找，双向链表用于 O(1) 删除和插入到头部（表示最近使用）。',
    url: 'https://leetcode.cn/problems/lru-cache/',
    code: `class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { key = k; value = v; }
    }
    private Map<Integer, Node> map = new HashMap<>();
    private Node head, tail;
    private int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insert(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        if (map.size() == capacity) {
            map.remove(tail.prev.key);
            remove(tail.prev);
        }
        Node node = new Node(key, value);
        insert(node);
        map.put(key, node);
    }

    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insert(Node node) {
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }
}`
  },
  {
    id: 'algo-2',
    title: '2. 反转链表 (Reverse Linked List)',
    difficulty: 'Easy',
    description: '给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。',
    approach: '迭代法：使用 prev, curr, next 三个指针。或者递归法。',
    url: 'https://leetcode.cn/problems/reverse-linked-list/',
    code: `public ListNode reverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
  },
  {
    id: 'algo-3',
    title: '3. 三数之和 (3Sum)',
    difficulty: 'Medium',
    description: '给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。',
    approach: '排序 + 双指针。固定一个数，另外两个数用双指针在剩余区间找。注意去重。',
    url: 'https://leetcode.cn/problems/3sum/',
    code: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int l = i + 1, r = nums.length - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                while (l < r && nums[l] == nums[l+1]) l++;
                while (l < r && nums[r] == nums[r-1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`
  },
  {
    id: 'algo-4',
    title: '4. 数组中的第K个最大元素 (Kth Largest Element in an Array)',
    difficulty: 'Medium',
    description: '给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。',
    approach: '快速选择算法（Quick Select）或者 最小堆（PriorityQueue）。',
    url: 'https://leetcode.cn/problems/kth-largest-element-in-an-array/',
    code: `public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int num : nums) {
        pq.offer(num);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}`
  },
  {
    id: 'algo-5',
    title: '5. 二叉树的锯齿形层序遍历 (Binary Tree Zigzag Level Order Traversal)',
    difficulty: 'Medium',
    description: '给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。',
    approach: 'BFS 层序遍历，使用双端队列（Deque）或者根据层数奇偶性反转 List。',
    url: 'https://leetcode.cn/problems/binary-tree-zigzag-level-order-traversal/',
    code: `public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    boolean leftToRight = true;
    while (!q.isEmpty()) {
        int size = q.size();
        LinkedList<Integer> level = new LinkedList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = q.poll();
            if (leftToRight) level.addLast(node.val);
            else level.addFirst(node.val);
            if (node.left != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        res.add(level);
        leftToRight = !leftToRight;
    }
    return res;
}`
  },
  {
    id: 'algo-6',
    title: '6. 合并区间 (Merge Intervals)',
    difficulty: 'Medium',
    description: '以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。',
    approach: '按起点排序，然后遍历合并。',
    url: 'https://leetcode.cn/problems/merge-intervals/',
    code: `public int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) return intervals;
    Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
    List<int[]> res = new ArrayList<>();
    int[] curr = intervals[0];
    res.add(curr);
    for (int[] interval : intervals) {
        if (interval[0] <= curr[1]) {
            curr[1] = Math.max(curr[1], interval[1]);
        } else {
            curr = interval;
            res.add(curr);
        }
    }
    return res.toArray(new int[res.size()][]);
}`
  },
  {
    id: 'algo-7',
    title: '7. 无重复字符的最长子串 (Longest Substring Without Repeating Characters)',
    difficulty: 'Medium',
    description: '给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。',
    approach: '滑动窗口 + HashMap/HashSet。',
    url: 'https://leetcode.cn/problems/longest-substring-without-repeating-characters/',
    code: `public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int max = 0, left = 0;
    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        if (map.containsKey(c)) {
            left = Math.max(left, map.get(c) + 1);
        }
        map.put(c, i);
        max = Math.max(max, i - left + 1);
    }
    return max;
}`
  },
  {
    id: 'algo-8',
    title: '8. 两数之和 (Two Sum)',
    difficulty: 'Easy',
    description: '给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。',
    approach: '使用 HashMap 存储遍历过的值及其索引。',
    url: 'https://leetcode.cn/problems/two-sum/',
    code: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return null;
}`
  },
  {
    id: 'algo-9',
    title: '9. 二叉树的层序遍历 (Binary Tree Level Order Traversal)',
    difficulty: 'Medium',
    description: '给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。',
    approach: '使用队列进行 BFS。',
    url: 'https://leetcode.cn/problems/binary-tree-level-order-traversal/',
    code: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
        int size = q.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = q.poll();
            level.add(node.val);
            if (node.left != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
        res.add(level);
    }
    return res;
}`
  },
  {
    id: 'algo-10',
    title: '10. 有效的括号 (Valid Parentheses)',
    difficulty: 'Easy',
    description: '给定一个只包括 \'(\'，\')\'，\'{\'，\'}\'，\'[\'，\']\' 的字符串 s ，判断字符串是否有效。',
    approach: '使用栈。遇到左括号入栈，遇到右括号出栈并匹配。',
    url: 'https://leetcode.cn/problems/valid-parentheses/',
    code: `public boolean isValid(String s) {
    Stack<Character> stack = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '[') stack.push(']');
        else if (c == '{') stack.push('}');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`
  },
  {
    id: 'algo-11',
    title: '11. 最大子数组和 (Maximum Subarray)',
    difficulty: 'Medium',
    description: '给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。子数组 是数组中的一个连续部分。',
    approach: '动态规划（Kadane 算法）。dp[i] 表示以 i 结尾的最大子数组和。',
    url: 'https://leetcode.cn/problems/maximum-subarray/',
    code: `public int maxSubArray(int[] nums) {
    int res = nums[0];
    int sum = 0;
    for (int num : nums) {
        if (sum > 0) sum += num;
        else sum = num;
        res = Math.max(res, sum);
    }
    return res;
}`
  },
  {
    id: 'algo-12',
    title: '12. 买卖股票的最佳时机 (Best Time to Buy and Sell Stock)',
    difficulty: 'Easy',
    description: '给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。',
    approach: '维护一个最低价格，遍历数组计算当前价格与最低价格的差值。',
    url: 'https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/',
    code: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;
    for (int price : prices) {
        if (price < minPrice) minPrice = price;
        else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
    }
    return maxProfit;
}`
  },
  {
    id: 'algo-13',
    title: '13. 二叉树的最近公共祖先 (Lowest Common Ancestor of a Binary Tree)',
    difficulty: 'Medium',
    description: '给定一个二叉树, 找到该树中两个指定节点的最近公共祖先 (LCA)。',
    approach: '递归。如果当前节点是 p 或 q，返回当前节点。递归左右子树，如果左右子树都有返回值，说明当前节点是 LCA。',
    url: 'https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/',
    code: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}`
  },
  {
    id: 'algo-14',
    title: '14. 螺旋矩阵 (Spiral Matrix)',
    difficulty: 'Medium',
    description: '给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。',
    approach: '设定上下左右四个边界，循环遍历并收缩边界。',
    url: 'https://leetcode.cn/problems/spiral-matrix/',
    code: `public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> res = new ArrayList<>();
    if (matrix.length == 0) return res;
    int u = 0, d = matrix.length - 1, l = 0, r = matrix[0].length - 1;
    while (true) {
        for (int i = l; i <= r; i++) res.add(matrix[u][i]);
        if (++u > d) break;
        for (int i = u; i <= d; i++) res.add(matrix[i][r]);
        if (--r < l) break;
        for (int i = r; i >= l; i--) res.add(matrix[d][i]);
        if (--d < u) break;
        for (int i = d; i >= u; i--) res.add(matrix[i][l]);
        if (++l > r) break;
    }
    return res;
}`
  },
  {
    id: 'algo-15',
    title: '15. 合并两个有序链表 (Merge Two Sorted Lists)',
    difficulty: 'Easy',
    description: '将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。',
    approach: '迭代法：使用哑节点（dummy node）和指针。或者递归法。',
    url: 'https://leetcode.cn/problems/merge-two-sorted-lists/',
    code: `public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }
    curr.next = l1 != null ? l1 : l2;
    return dummy.next;
}`
  },
  {
    id: 'algo-16',
    title: '16. 搜索旋转排序数组 (Search in Rotated Sorted Array)',
    difficulty: 'Medium',
    description: '整数数组 nums 按升序排列，数组中的值 互不相同 。在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转。给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。',
    approach: '二分查找。判断哪一半是有序的，再判断 target 是否在有序的那一半。',
    url: 'https://leetcode.cn/problems/search-in-rotated-sorted-array/',
    code: `public int search(int[] nums, int target) {
    int l = 0, r = nums.length - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;
        if (nums[l] <= nums[mid]) {
            if (target >= nums[l] && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[r]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return -1;
}`
  },
  {
    id: 'algo-17',
    title: '17. 最长回文子串 (Longest Palindromic Substring)',
    difficulty: 'Medium',
    description: '给你一个字符串 s，找到 s 中最长的回文子串。',
    approach: '中心扩散法：遍历每个字符，以其为中心向两边扩散。或者动态规划。',
    url: 'https://leetcode.cn/problems/longest-palindromic-substring/',
    code: `public String longestPalindrome(String s) {
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
}`
  },
  {
    id: 'algo-18',
    title: '18. 相交链表 (Intersection of Two Linked Lists)',
    difficulty: 'Easy',
    description: '给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。',
    approach: '双指针。两个指针分别遍历两个链表，遍历完后指向另一个链表的头部。如果相交，它们会在交点相遇。',
    url: 'https://leetcode.cn/problems/intersection-of-two-linked-lists/',
    code: `public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    if (headA == null || headB == null) return null;
    ListNode pA = headA, pB = headB;
    while (pA != pB) {
        pA = pA == null ? headB : pA.next;
        pB = pB == null ? headA : pB.next;
    }
    return pA;
}`
  },
  {
    id: 'algo-19',
    title: '19. 重排链表 (Reorder List)',
    difficulty: 'Medium',
    description: '给定一个单链表 L 的头节点 head ，单链表 L 表示为：L0 → L1 → … → Ln - 1 → Ln。请将其重新排列后变为：L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …',
    approach: '1. 找中点；2. 反转后半部分；3. 合并两部分。',
    url: 'https://leetcode.cn/problems/reorder-list/',
    code: `public void reorderList(ListNode head) {
    if (head == null || head.next == null) return;
    ListNode slow = head, fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next; fast = fast.next.next;
    }
    ListNode head2 = reverse(slow.next);
    slow.next = null;
    while (head != null && head2 != null) {
        ListNode n1 = head.next, n2 = head2.next;
        head.next = head2; head2.next = n1;
        head = n1; head2 = n2;
    }
}
private ListNode reverse(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev; prev = curr; curr = next;
    }
    return prev;
}`
  },
  {
    id: 'algo-20',
    title: '20. 二叉树的中序遍历 (Binary Tree Inorder Traversal)',
    difficulty: 'Easy',
    description: '给定一个二叉树的根节点 root ，返回它的 中序 遍历。',
    approach: '递归或者基于栈的迭代。',
    url: 'https://leetcode.cn/problems/binary-tree-inorder-traversal/',
    code: `public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    Stack<TreeNode> stack = new Stack<>();
    TreeNode curr = root;
    while (curr != null || !stack.isEmpty()) {
        while (curr != null) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        res.add(curr.val);
        curr = curr.right;
    }
    return res;
}`
  },
  {
    id: 'algo-21',
    title: '21. K 个一组翻转链表 (Reverse Nodes in k-Group)',
    difficulty: 'Hard',
    description: '给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。',
    approach: '分段处理。每 k 个节点进行反转，注意连接前后的关系。',
    url: 'https://leetcode.cn/problems/reverse-nodes-in-k-group/',
    code: `public ListNode reverseKGroup(ListNode head, int k) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode prev = dummy, end = dummy;
    while (end.next != null) {
        for (int i = 0; i < k && end != null; i++) end = end.next;
        if (end == null) break;
        ListNode start = prev.next, next = end.next;
        end.next = null;
        prev.next = reverse(start);
        start.next = next;
        prev = start; end = start;
    }
    return dummy.next;
}
private ListNode reverse(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev; prev = curr; curr = next;
    }
    return prev;
}`
  },
  {
    id: 'algo-22',
    title: '22. 全排列 (Permutations)',
    difficulty: 'Medium',
    description: '给定一个不含重复数字的数组 nums ，返回其所有可能的全排列 。你可以按任意顺序返回答案。',
    approach: '回溯算法。使用 boolean 数组记录已使用的数字。',
    url: 'https://leetcode.cn/problems/permutations/',
    code: `public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(res, new ArrayList<>(), nums, new boolean[nums.length]);
    return res;
}
private void backtrack(List<List<Integer>> res, List<Integer> temp, int[] nums, boolean[] used) {
    if (temp.size() == nums.length) {
        res.add(new ArrayList<>(temp));
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        temp.add(nums[i]);
        backtrack(res, temp, nums, used);
        used[i] = false;
        temp.remove(temp.size() - 1);
    }
}`
  },
  {
    id: 'algo-23',
    title: '23. 路径总和 II (Path Sum II)',
    difficulty: 'Medium',
    description: '给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有从根节点到叶子节点路径总和等于目标和的路径。',
    approach: '回溯算法。DFS 遍历二叉树，记录路径。',
    url: 'https://leetcode.cn/problems/path-sum-ii/',
    code: `public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
    List<List<Integer>> res = new ArrayList<>();
    dfs(root, targetSum, new ArrayList<>(), res);
    return res;
}
private void dfs(TreeNode root, int sum, List<Integer> path, List<List<Integer>> res) {
    if (root == null) return;
    path.add(root.val);
    if (root.left == null && root.right == null && sum == root.val) {
        res.add(new ArrayList<>(path));
    }
    dfs(root.left, sum - root.val, path, res);
    dfs(root.right, sum - root.val, path, res);
    path.remove(path.size() - 1);
}`
  },
  {
    id: 'algo-24',
    title: '24. 二叉树的右视图 (Binary Tree Right Side View)',
    difficulty: 'Medium',
    description: '给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。',
    approach: 'BFS 层序遍历，取每一层的最后一个节点。或者 DFS 记录深度。',
    url: 'https://leetcode.cn/problems/binary-tree-right-side-view/',
    code: `public List<Integer> rightSideView(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> q = new LinkedList<>();
    q.offer(root);
    while (!q.isEmpty()) {
        int size = q.size();
        for (int i = 0; i < size; i++) {
            TreeNode node = q.poll();
            if (i == size - 1) res.add(node.val);
            if (node.left != null) q.offer(node.left);
            if (node.right != null) q.offer(node.right);
        }
    }
    return res;
}`
  },
  {
    id: 'algo-25',
    title: '25. 爬楼梯 (Climbing Stairs)',
    difficulty: 'Easy',
    description: '假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？',
    approach: '动态规划。dp[i] = dp[i-1] + dp[i-2]。斐波那契数列。',
    url: 'https://leetcode.cn/problems/climbing-stairs/',
    code: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int temp = a + b;
        a = b; b = temp;
    }
    return b;
}`
  },
  {
    id: 'algo-26',
    title: '26. 两数相加 (Add Two Numbers)',
    difficulty: 'Medium',
    description: '给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。请你将两个数相加，并以相同形式返回一个表示和的链表。',
    approach: '模拟加法过程，注意进位。',
    url: 'https://leetcode.cn/problems/add-two-numbers/',
    code: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    int carry = 0;
    while (l1 != null || l2 != null || carry != 0) {
        int x = l1 != null ? l1.val : 0;
        int y = l2 != null ? l2.val : 0;
        int sum = x + y + carry;
        carry = sum / 10;
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        if (l1 != null) l1 = l1.next;
        if (l2 != null) l2 = l2.next;
    }
    return dummy.next;
}`
  },
  {
    id: 'algo-27',
    title: '27. 排序链表 (Sort List)',
    difficulty: 'Medium',
    description: '给你链表的头结点 head ，请将其按 升序 排列并返回排序后的链表。',
    approach: '归并排序。1. 找中点；2. 递归排序左右；3. 合并有序链表。',
    url: 'https://leetcode.cn/problems/sort-list/',
    code: `public ListNode sortList(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode slow = head, fast = head.next;
    while (fast != null && fast.next != null) {
        slow = slow.next; fast = fast.next.next;
    }
    ListNode tmp = slow.next; slow.next = null;
    ListNode left = sortList(head);
    ListNode right = sortList(tmp);
    return merge(left, right);
}
private ListNode merge(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }
        else { curr.next = l2; l2 = l2.next; }
        curr = curr.next;
    }
    curr.next = l1 != null ? l1 : l2;
    return dummy.next;
}`
  },
  {
    id: 'algo-28',
    title: '28. 二分查找 (Binary Search)',
    difficulty: 'Easy',
    description: '给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。',
    approach: '标准二分查找。注意边界条件。',
    url: 'https://leetcode.cn/problems/binary-search/',
    code: `public int search(int[] nums, int target) {
    int l = 0, r = nums.length - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`
  },
  {
    id: 'algo-29',
    title: '29. 平衡二叉树 (Balanced Binary Tree)',
    difficulty: 'Easy',
    description: '给定一个二叉树，判断它是否是高度平衡的二叉树。',
    approach: '递归计算高度。如果左右子树高度差大于 1，则不平衡。',
    url: 'https://leetcode.cn/problems/balanced-binary-tree/',
    code: `public boolean isBalanced(TreeNode root) {
    return height(root) != -1;
}
private int height(TreeNode root) {
    if (root == null) return 0;
    int left = height(root.left);
    if (left == -1) return -1;
    int right = height(root.right);
    if (right == -1) return -1;
    if (Math.abs(left - right) > 1) return -1;
    return Math.max(left, right) + 1;
}`
  },
  {
    id: 'algo-30',
    title: '30. 二叉树的后序遍历 (Binary Tree Postorder Traversal)',
    difficulty: 'Easy',
    description: '给定一个二叉树的根节点 root ，返回它的 后序 遍历。',
    approach: '递归或者迭代。迭代法可以使用两个栈，或者一个栈配合 prev 指针。',
    url: 'https://leetcode.cn/problems/binary-tree-postorder-traversal/',
    code: `public List<Integer> postorderTraversal(TreeNode root) {
    LinkedList<Integer> res = new LinkedList<>();
    if (root == null) return res;
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);
    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        res.addFirst(node.val);
        if (node.left != null) stack.push(node.left);
        if (node.right != null) stack.push(node.right);
    }
    return res;
}`
  },
  {
    id: 'algo-31',
    title: '31. 对称二叉树 (Symmetric Tree)',
    difficulty: 'Easy',
    description: '给你一个二叉树的根节点 root ， 检查它是否轴对称。',
    approach: '递归。判断左子树的左节点与右子树的右节点是否相等，以及左子树的右节点与右子树的左节点是否相等。',
    url: 'https://leetcode.cn/problems/symmetric-tree/',
    code: `public boolean isSymmetric(TreeNode root) {
    if (root == null) return true;
    return check(root.left, root.right);
}
private boolean check(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    return p.val == q.val && check(p.left, q.right) && check(p.right, q.left);
}`
  },
  {
    id: 'algo-32',
    title: '32. 子集 (Subsets)',
    difficulty: 'Medium',
    description: '给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。',
    approach: '回溯算法。遍历数组，每个元素都有选或不选两种可能。',
    url: 'https://leetcode.cn/problems/subsets/',
    code: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(res, new ArrayList<>(), nums, 0);
    return res;
}
private void backtrack(List<List<Integer>> res, List<Integer> temp, int[] nums, int start) {
    res.add(new ArrayList<>(temp));
    for (int i = start; i < nums.length; i++) {
        temp.add(nums[i]);
        backtrack(res, temp, nums, i + 1);
        temp.remove(temp.size() - 1);
    }
}`
  },
  {
    id: 'algo-33',
    title: '33. 组合总和 (Combination Sum)',
    difficulty: 'Medium',
    description: '给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。',
    approach: '回溯算法。元素可以重复使用，所以递归时 start 不加 1。',
    url: 'https://leetcode.cn/problems/combination-sum/',
    code: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(res, new ArrayList<>(), candidates, target, 0);
    return res;
}
private void backtrack(List<List<Integer>> res, List<Integer> temp, int[] candidates, int target, int start) {
    if (target < 0) return;
    if (target == 0) {
        res.add(new ArrayList<>(temp));
        return;
    }
    for (int i = start; i < candidates.length; i++) {
        temp.add(candidates[i]);
        backtrack(res, temp, candidates, target - candidates[i], i);
        temp.remove(temp.size() - 1);
    }
}`
  },
  {
    id: 'algo-34',
    title: '34. 单词搜索 (Word Search)',
    difficulty: 'Medium',
    description: '给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。',
    approach: '回溯算法 + DFS。遍历网格，对每个点进行 DFS 搜索。',
    url: 'https://leetcode.cn/problems/word-search/',
    code: `public boolean exist(char[][] board, String word) {
    for (int i = 0; i < board.length; i++) {
        for (int j = 0; j < board[0].length; j++) {
            if (dfs(board, word, i, j, 0)) return true;
        }
    }
    return false;
}
private boolean dfs(char[][] board, String word, int i, int j, int k) {
    if (k == word.length()) return true;
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != word.charAt(k)) return false;
    char temp = board[i][j];
    board[i][j] = '#';
    boolean res = dfs(board, word, i + 1, j, k + 1) || dfs(board, word, i - 1, j, k + 1) ||
                  dfs(board, word, i, j + 1, k + 1) || dfs(board, word, i, j - 1, k + 1);
    board[i][j] = temp;
    return res;
}`
  },
  {
    id: 'algo-35',
    title: '35. 岛屿数量 (Number of Islands)',
    difficulty: 'Medium',
    description: '给你一个由 \'1\'（陆地）和 \'0\'（水）组成的的二维网格，请你计算网格中岛屿的数量。',
    approach: 'DFS 或 BFS。遍历网格，遇到 "1" 时岛屿数加 1，并用 DFS 将相连的 "1" 全部置为 "0"。',
    url: 'https://leetcode.cn/problems/number-of-islands/',
    code: `public int numIslands(char[][] board) {
    int count = 0;
    for (int i = 0; i < board.length; i++) {
        for (int j = 0; j < board[0].length; j++) {
            if (board[i][j] == '1') {
                count++;
                dfs(board, i, j);
            }
        }
    }
    return count;
}
private void dfs(char[][] board, int i, int j) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] == '0') return;
    board[i][j] = '0';
    dfs(board, i + 1, j); dfs(board, i - 1, j);
    dfs(board, i, j + 1); dfs(board, i, j - 1);
}`
  },
  {
    id: 'algo-36',
    title: '36. 最长公共子序列 (Longest Common Subsequence)',
    difficulty: 'Medium',
    description: '给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。',
    approach: '动态规划。dp[i][j] 表示 text1 前 i 个字符 and text2 前 j 个字符的 LCS 长度。',
    url: 'https://leetcode.cn/problems/longest-common-subsequence/',
    code: `public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i-1) == text2.charAt(j-1)) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[m][n];
}`
  },
  {
    id: 'algo-37',
    title: '37. 编辑距离 (Edit Distance)',
    difficulty: 'Hard',
    description: '给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数 。你可以对一个单词进行如下三种操作：插入一个字符、删除一个字符、替换一个字符。',
    approach: '动态规划。dp[i][j] 表示 word1 前 i 个字符转换成 word2 前 j 个字符的最少操作数。',
    url: 'https://leetcode.cn/problems/edit-distance/',
    code: `public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i-1) == word2.charAt(j-1)) dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = Math.min(Math.min(dp[i-1][j], dp[i][j-1]), dp[i-1][j-1]) + 1;
        }
    }
    return dp[m][n];
}`
  },
  {
    id: 'algo-38',
    title: '38. 零钱兑换 (Coin Change)',
    difficulty: 'Medium',
    description: '给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。计算并返回可以凑成总金额所需的 最少的硬币个数 。',
    approach: '动态规划。dp[i] 表示凑成金额 i 所需的最少硬币数。',
    url: 'https://leetcode.cn/problems/coin-change/',
    code: `public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (i >= coin) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
  },
  {
    id: 'algo-39',
    title: '39. 接雨水 (Trapping Rain Water)',
    difficulty: 'Hard',
    description: '给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。',
    approach: '双指针。维护左右两边的最大高度，向中间靠拢。',
    url: 'https://leetcode.cn/problems/trapping-rain-water/',
    code: `public int trap(int[] height) {
    int l = 0, r = height.length - 1, lMax = 0, rMax = 0, res = 0;
    while (l < r) {
        lMax = Math.max(lMax, height[l]);
        rMax = Math.max(rMax, height[r]);
        if (lMax < rMax) {
            res += lMax - height[l]; l++;
        } else {
            res += rMax - height[r]; r--;
        }
    }
    return res;
}`
  },
  {
    id: 'algo-40',
    title: '40. 合并 K 个升序链表 (Merge k Sorted Lists)',
    difficulty: 'Hard',
    description: '给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。',
    approach: '优先队列（最小堆）。将每个链表的头节点放入堆中，每次弹出最小的并放入其下一个节点。',
    url: 'https://leetcode.cn/problems/merge-k-sorted-lists/',
    code: `public ListNode mergeKLists(ListNode[] lists) {
    if (lists == null || lists.length == 0) return null;
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
    for (ListNode node : lists) {
        if (node != null) pq.offer(node);
    }
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();
        curr.next = node;
        curr = curr.next;
        if (node.next != null) pq.offer(node.next);
    }
    return dummy.next;
}`
  },
  {
    id: 'algo-41',
    title: '41. 寻找两个正序数组的中位数 (Median of Two Sorted Arrays)',
    difficulty: 'Hard',
    description: '给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。',
    approach: '二分查找。在两个数组中寻找第 k 小的数。',
    url: 'https://leetcode.cn/problems/median-of-two-sorted-arrays/',
    code: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    int n = nums1.length, m = nums2.length;
    int left = (n + m + 1) / 2, right = (n + m + 2) / 2;
    return (getKth(nums1, 0, n - 1, nums2, 0, m - 1, left) + getKth(nums1, 0, n - 1, nums2, 0, m - 1, right)) * 0.5;
}
private int getKth(int[] nums1, int start1, int end1, int[] nums2, int start2, int end2, int k) {
    int len1 = end1 - start1 + 1, len2 = end2 - start2 + 1;
    if (len1 > len2) return getKth(nums2, start2, end2, nums1, start1, end1, k);
    if (len1 == 0) return nums2[start2 + k - 1];
    if (k == 1) return Math.min(nums1[start1], nums2[start2]);
    int i = start1 + Math.min(len1, k / 2) - 1, j = start2 + Math.min(len2, k / 2) - 1;
    if (nums1[i] > nums2[j]) return getKth(nums1, start1, end1, nums2, j + 1, end2, k - (j - start2 + 1));
    else return getKth(nums1, i + 1, end1, nums2, start2, end2, k - (i - start1 + 1));
}`
  },
  {
    id: 'algo-42',
    title: '42. 滑动窗口最大值 (Sliding Window Maximum)',
    difficulty: 'Hard',
    description: '给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。',
    approach: '单调队列。队列中存储索引，保证队列中的值单调递减。',
    url: 'https://leetcode.cn/problems/sliding-window-maximum/',
    code: `public int[] maxSlidingWindow(int[] nums, int k) {
    if (nums.length == 0 || k == 0) return new int[0];
    Deque<Integer> deque = new LinkedList<>();
    int[] res = new int[nums.length - k + 1];
    for (int i = 0; i < nums.length; i++) {
        while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) deque.pollLast();
        deque.addLast(i);
        if (deque.peekFirst() <= i - k) deque.pollFirst();
        if (i >= k - 1) res[i - k + 1] = nums[deque.peekFirst()];
    }
    return res;
}`
  },
  {
    id: 'algo-43',
    title: '43. 下一个排列 (Next Permutation)',
    difficulty: 'Medium',
    description: '整数数组的一个 排列  就是将其所有元素按一定顺序排列的一个序列。',
    approach: '1. 从后往前找第一个相邻升序对 (i, j)；2. 从后往前找第一个大于 nums[i] 的数并交换；3. 反转 j 之后的部分。',
    url: 'https://leetcode.cn/problems/next-permutation/',
    code: `public void nextPermutation(int[] nums) {
    int i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        int j = nums.length - 1;
        while (j >= 0 && nums[i] >= nums[j]) j--;
        swap(nums, i, j);
    }
    reverse(nums, i + 1);
}
private void swap(int[] nums, int i, int j) {
    int temp = nums[i]; nums[i] = nums[j]; nums[j] = temp;
}
private void reverse(int[] nums, int start) {
    int i = start, j = nums.length - 1;
    while (i < j) swap(nums, i++, j--);
}`
  },
  {
    id: 'algo-44',
    title: '44. 旋转图像 (Rotate Image)',
    difficulty: 'Medium',
    description: '给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。',
    approach: '1. 沿主对角线翻转；2. 沿垂直中线翻转。',
    url: 'https://leetcode.cn/problems/rotate-image/',
    code: `public void rotate(int[][] matrix) {
    int n = matrix.length;
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n / 2; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[i][n - 1 - j];
            matrix[i][n - 1 - j] = temp;
        }
    }
}`
  },
  {
    id: 'algo-45',
    title: '45. 字母异位词分组 (Group Anagrams)',
    difficulty: 'Medium',
    description: '给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。',
    approach: '对每个字符串排序后作为 HashMap 的 Key。',
    url: 'https://leetcode.cn/problems/group-anagrams/',
    code: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = String.valueOf(chars);
        if (!map.containsKey(key)) map.put(key, new ArrayList<>());
        map.get(key).add(s);
    }
    return new ArrayList<>(map.values());
}`
  },
  {
    id: 'algo-46',
    title: '46. 验证回文串 (Valid Palindrome)',
    difficulty: 'Easy',
    description: '如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。',
    approach: '双指针。忽略非字母数字字符，统一转小写。',
    url: 'https://leetcode.cn/problems/valid-palindrome/',
    code: `public boolean isPalindrome(String s) {
    int i = 0, j = s.length() - 1;
    while (i < j) {
        while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++;
        while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--;
        if (Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j))) return false;
        i++; j--;
    }
    return true;
}`
  },
  {
    id: 'algo-47',
    title: '47. 最小栈 (Min Stack)',
    difficulty: 'Medium',
    description: '设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。',
    approach: '使用辅助栈存储当前最小值。',
    url: 'https://leetcode.cn/problems/min-stack/',
    code: `class MinStack {
    private Stack<Integer> stack = new Stack<>();
    private Stack<Integer> minStack = new Stack<>();
    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) minStack.push(val);
    }
    public void pop() {
        if (stack.pop().equals(minStack.peek())) minStack.pop();
    }
    public int top() { return stack.peek(); }
    public int getMin() { return minStack.peek(); }
}`
  },
  {
    id: 'algo-48',
    title: '48. 用栈实现队列 (Implement Queue using Stacks)',
    difficulty: 'Easy',
    description: '请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）。',
    approach: '使用两个栈，一个用于入队，一个用于出队。',
    url: 'https://leetcode.cn/problems/implement-queue-using-stacks/',
    code: `class MyQueue {
    private Stack<Integer> s1 = new Stack<>();
    private Stack<Integer> s2 = new Stack<>();
    public void push(int x) { s1.push(x); }
    public int pop() {
        peek(); return s2.pop();
    }
    public int peek() {
        if (s2.isEmpty()) {
            while (!s1.isEmpty()) s2.push(s1.pop());
        }
        return s2.peek();
    }
    public boolean empty() { return s1.isEmpty() && s2.isEmpty(); }
}`
  },
  {
    id: 'algo-49',
    title: '49. 删除链表的倒数第 N 个结点 (Remove Nth Node From End of List)',
    difficulty: 'Medium',
    description: '给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。',
    approach: '双指针。快指针先走 N 步，然后快慢指针一起走。',
    url: 'https://leetcode.cn/problems/remove-nth-node-from-end-of-list/',
    code: `public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode first = dummy, second = dummy;
    for (int i = 1; i <= n + 1; i++) first = first.next;
    while (first != null) {
        first = first.next; second = second.next;
    }
    second.next = second.next.next;
    return dummy.next;
}`
  },
  {
    id: 'algo-50',
    title: '50. 回文链表 (Palindrome Linked List)',
    difficulty: 'Easy',
    description: '给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。',
    approach: '1. 找中点；2. 反转后半部分；3. 比较前半部分 and 反转后的后半部分。',
    url: 'https://leetcode.cn/problems/palindrome-linked-list/',
    code: `public boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) return true;
    ListNode slow = head, fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next; fast = fast.next.next;
    }
    ListNode secondHalf = reverse(slow.next);
    ListNode p1 = head, p2 = secondHalf;
    while (p2 != null) {
        if (p1.val != p2.val) return false;
        p1 = p1.next; p2 = p2.next;
    }
    return true;
}
private ListNode reverse(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev; prev = curr; curr = next;
    }
    return prev;
}`
  }
];

export const HOT_100_POINTS: AlgorithmPoint[] = [
  {
    id: 'hot-1',
    title: '1. 两数之和 (Two Sum)',
    difficulty: 'Easy',
    description: '给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。',
    approach: '使用哈希表存储每个数值及其对应的索引。遍历数组时，检查 target - nums[i] 是否已在哈希表中。',
    url: 'https://leetcode.cn/problems/two-sum/',
    code: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[0];
}`
  },
  {
    id: 'hot-2',
    title: '2. 字母异位词分组 (Group Anagrams)',
    difficulty: 'Medium',
    description: '给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。',
    approach: '对每个字符串进行排序，排序后的字符串作为哈希表的键，原始字符串列表作为值。',
    url: 'https://leetcode.cn/problems/group-anagrams/',
    code: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = String.valueOf(chars);
        if (!map.containsKey(key)) map.put(key, new ArrayList<>());
        map.get(key).add(s);
    }
    return new ArrayList<>(map.values());
}`
  },
  {
    id: 'hot-3',
    title: '3. 最长连续序列 (Longest Consecutive Sequence)',
    difficulty: 'Medium',
    description: '给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。请设计并实现时间复杂度为 O(n) 的算法解决此问题。',
    approach: '使用 HashSet 存储所有数字。遍历数字，如果 num - 1 不在集合中，说明 num 是 an 序列的起点，开始向后计数。',
    url: 'https://leetcode.cn/problems/longest-consecutive-sequence/',
    code: `public int longestConsecutive(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int num : nums) set.add(num);
    int longest = 0;
    for (int num : set) {
        if (!set.contains(num - 1)) {
            int currentNum = num;
            int currentStreak = 1;
            while (set.contains(currentNum + 1)) {
                currentNum += 1;
                currentStreak += 1;
            }
            longest = Math.max(longest, currentStreak);
        }
    }
    return longest;
}`
  },
  {
    id: 'hot-4',
    title: '4. 移动零 (Move Zeroes)',
    difficulty: 'Easy',
    description: '给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。请注意 ，必须在不复制数组的情况下原地对数组进行操作。',
    approach: '双指针。j 指针记录下一个非零元素应该存放的位置，遍历数组，遇到非零元素则与 j 位置交换。',
    url: 'https://leetcode.cn/problems/move-zeroes/',
    code: `public void moveZeroes(int[] nums) {
    int j = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            int temp = nums[i];
            nums[i] = nums[j];
            nums[j] = temp;
            j++;
        }
    }
}`
  },
  {
    id: 'hot-5',
    title: '5. 盛最多水的容器 (Container With Most Water)',
    difficulty: 'Medium',
    description: '给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。',
    approach: '双指针。左右指针分别指向数组两端，每次移动高度较小的指针，并更新最大面积。',
    url: 'https://leetcode.cn/problems/container-with-most-water/',
    code: `public int maxArea(int[] height) {
    int l = 0, r = height.length - 1;
    int ans = 0;
    while (l < r) {
        int area = Math.min(height[l], height[r]) * (r - l);
        ans = Math.max(ans, area);
        if (height[l] < height[r]) l++;
        else r--;
    }
    return ans;
}`
  },
  {
    id: 'hot-6',
    title: '6. 三数之和 (3Sum)',
    difficulty: 'Medium',
    description: '给你一个包含 n 个整数 of 数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。',
    approach: '排序 + 双指针。固定一个数，另外两个数用双指针在剩余区间找。注意去重。',
    url: 'https://leetcode.cn/problems/3sum/',
    code: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue;
        int l = i + 1, r = nums.length - 1;
        while (l < r) {
            int sum = nums[i] + nums[l] + nums[r];
            if (sum == 0) {
                res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                while (l < r && nums[l] == nums[l+1]) l++;
                while (l < r && nums[r] == nums[r-1]) r--;
                l++; r--;
            } else if (sum < 0) l++;
            else r--;
        }
    }
    return res;
}`
  },
  {
    id: 'hot-7',
    title: '7. 无重复字符的最长子串 (Longest Substring Without Repeating Characters)',
    difficulty: 'Medium',
    description: '给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。',
    approach: '滑动窗口 + 哈希表。维护一个窗口 [left, right]，窗口内不含重复字符。',
    url: 'https://leetcode.cn/problems/longest-substring-without-repeating-characters/',
    code: `public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int max = 0, left = 0;
    for (int i = 0; i < s.length(); i++) {
        if (map.containsKey(s.charAt(i))) {
            left = Math.max(left, map.get(s.charAt(i)) + 1);
        }
        map.put(s.charAt(i), i);
        max = Math.max(max, i - left + 1);
    }
    return max;
}`
  },
  {
    id: 'hot-8',
    title: '8. 找到字符串中所有字母异位词 (Find All Anagrams in a String)',
    difficulty: 'Medium',
    description: '给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。',
    approach: '滑动窗口 + 数组计数。使用长度为 26 的数组记录字符出现频率。',
    url: 'https://leetcode.cn/problems/find-all-anagrams-in-a-string/',
    code: `public List<Integer> findAnagrams(String s, String p) {
    List<Integer> res = new ArrayList<>();
    if (s.length() < p.length()) return res;
    int[] pCount = new int[26];
    int[] sCount = new int[26];
    for (int i = 0; i < p.length(); i++) {
        pCount[p.charAt(i) - 'a']++;
        sCount[s.charAt(i) - 'a']++;
    }
    if (Arrays.equals(pCount, sCount)) res.add(0);
    for (int i = 0; i < s.length() - p.length(); i++) {
        sCount[s.charAt(i) - 'a']--;
        sCount[s.charAt(i + p.length()) - 'a']++;
        if (Arrays.equals(pCount, sCount)) res.add(i + 1);
    }
    return res;
}`
  },
  {
    id: 'hot-9',
    title: '9. 和为 K 的子数组 (Subarray Sum Equals K)',
    difficulty: 'Medium',
    description: '给你一个整数数组 nums 和一个整数 k ，请你统计并返回 该数组中和为 k 的连续子数组的个数 。',
    approach: '前缀和 + 哈希表。哈希表存储前缀和出现的次数。',
    url: 'https://leetcode.cn/problems/subarray-sum-equals-k/',
    code: `public int subarraySum(int[] nums, int k) {
    int count = 0, pre = 0;
    Map<Integer, Integer> map = new HashMap<>();
    map.put(0, 1);
    for (int i = 0; i < nums.length; i++) {
        pre += nums[i];
        if (map.containsKey(pre - k)) {
            count += map.get(pre - k);
        }
        map.put(pre, map.getOrDefault(pre, 0) + 1);
    }
    return count;
}`
  },
  {
    id: 'hot-10',
    title: '10. 滑动窗口最大值 (Sliding Window Maximum)',
    difficulty: 'Hard',
    description: '给你一个整数数组 nums，有一个大小为 k 的滑动窗口从数组的最左侧移动到数组的最右侧。你只可以看到在滑动窗口内的 k 个数字。滑动窗口每次只向右移动一位。',
    approach: '单调队列。队列存储索引，保证队列对应的值是单调递减的。',
    url: 'https://leetcode.cn/problems/sliding-window-maximum/',
    code: `public int[] maxSlidingWindow(int[] nums, int k) {
    if (nums.length == 0 || k == 0) return new int[0];
    Deque<Integer> deque = new LinkedList<>();
    int[] res = new int[nums.length - k + 1];
    for (int i = 0; i < nums.length; i++) {
        while (!deque.isEmpty() && nums[deque.peekLast()] <= nums[i]) deque.pollLast();
        deque.addLast(i);
        if (deque.peekFirst() <= i - k) deque.pollFirst();
        if (i >= k - 1) res[i - k + 1] = nums[deque.peekFirst()];
    }
    return res;
}`
  },
  {
    id: 'hot-11',
    title: '11. 最小覆盖子串 (Minimum Window Substring)',
    difficulty: 'Hard',
    description: '给你一个字符串 s 、一个字符串 t 。返回 s 中包含 t 所有字符的最小子串。如果 s 中不存在符合条件的子串，则返回空字符串 "" 。',
    approach: '滑动窗口 + 哈希表。维护窗口内字符频率，当满足 t 的要求时尝试收缩左边界。',
    url: 'https://leetcode.cn/problems/minimum-window-substring/',
    code: `public String minWindow(String s, String t) {
    Map<Character, Integer> need = new HashMap<>();
    Map<Character, Integer> window = new HashMap<>();
    for (char c : t.toCharArray()) need.put(c, need.getOrDefault(c, 0) + 1);
    int left = 0, right = 0, valid = 0;
    int start = 0, len = Integer.MAX_VALUE;
    while (right < s.length()) {
        char c = s.charAt(right);
        right++;
        if (need.containsKey(c)) {
            window.put(c, window.getOrDefault(c, 0) + 1);
            if (window.get(c).equals(need.get(c))) valid++;
        }
        while (valid == need.size()) {
            if (right - left < len) {
                start = left;
                len = right - left;
            }
            char d = s.charAt(left);
            left++;
            if (need.containsKey(d)) {
                if (window.get(d).equals(need.get(d))) valid--;
                window.put(d, window.get(d) - 1);
            }
        }
    }
    return len == Integer.MAX_VALUE ? "" : s.substring(start, start + len);
}`
  },
  {
    id: 'hot-12',
    title: '12. 最大子数组和 (Maximum Subarray)',
    difficulty: 'Medium',
    description: '给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。',
    approach: '动态规划。dp[i] 表示以 i 结尾的最大子数组和。dp[i] = max(nums[i], dp[i-1] + nums[i])。',
    url: 'https://leetcode.cn/problems/maximum-subarray/',
    code: `public int maxSubArray(int[] nums) {
    int pre = 0, maxAns = nums[0];
    for (int x : nums) {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    }
    return maxAns;
}`
  },
  {
    id: 'hot-13',
    title: '13. 合并区间 (Merge Intervals)',
    difficulty: 'Medium',
    description: '以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间。',
    approach: '排序 + 遍历。按起点排序，如果当前区间起点小于等于结果集中最后一个区间的终点，则合并。',
    url: 'https://leetcode.cn/problems/merge-intervals/',
    code: `public int[][] merge(int[][] intervals) {
    if (intervals.length == 0) return new int[0][2];
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> merged = new ArrayList<>();
    for (int i = 0; i < intervals.length; i++) {
        int L = intervals[i][0], R = intervals[i][1];
        if (merged.size() == 0 || merged.get(merged.size() - 1)[1] < L) {
            merged.add(new int[]{L, R});
        } else {
            merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], R);
        }
    }
    return merged.toArray(new int[merged.size()][]);
}`
  },
  {
    id: 'hot-14',
    title: '14. 轮转数组 (Rotate Array)',
    difficulty: 'Medium',
    description: '给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。',
    approach: '数组翻转。1. 翻转整个数组；2. 翻转前 k 个；3. 翻转剩余部分。',
    url: 'https://leetcode.cn/problems/rotate-array/',
    code: `public void rotate(int[] nums, int k) {
    k %= nums.length;
    reverse(nums, 0, nums.length - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, nums.length - 1);
}
private void reverse(int[] nums, int start, int end) {
    while (start < end) {
        int temp = nums[start];
        nums[start] = nums[end];
        nums[end] = temp;
        start++; end--;
    }
}`
  },
  {
    id: 'hot-15',
    title: '15. 除自身以外数组的乘积 (Product of Array Except Self)',
    difficulty: 'Medium',
    description: '给你一个整数数组 nums，返回数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。',
    approach: '左右乘积列表。先计算每个元素左边的乘积，再在返回数组上直接计算右边的乘积并相乘。',
    url: 'https://leetcode.cn/problems/product-of-array-except-self/',
    code: `public int[] productExceptSelf(int[] nums) {
    int length = nums.length;
    int[] answer = new int[length];
    answer[0] = 1;
    for (int i = 1; i < length; i++) {
        answer[i] = nums[i - 1] * answer[i - 1];
    }
    int R = 1;
    for (int i = length - 1; i >= 0; i--) {
        answer[i] = answer[i] * R;
        R *= nums[i];
    }
    return answer;
}`
  },
  {
    id: 'hot-16',
    title: '16. 缺失的第一个正数 (First Missing Positive)',
    difficulty: 'Hard',
    description: '给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。',
    approach: '原地哈希。将数字 x 放到索引 x-1 的位置。遍历后第一个不匹配的位置即为缺失的正数。',
    url: 'https://leetcode.cn/problems/first-missing-positive/',
    code: `public int firstMissingPositive(int[] nums) {
    int n = nums.length;
    for (int i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            int temp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = temp;
        }
    }
    for (int i = 0; i < n; i++) {
        if (nums[i] != i + 1) return i + 1;
    }
    return n + 1;
}`
  },
  {
    id: 'hot-17',
    title: '17. 矩阵置零 (Set Matrix Zeroes)',
    difficulty: 'Medium',
    description: '给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。',
    approach: '使用第一行和第一列记录该行/列是否需要置零。额外使用两个变量记录第一行和第一列本身是否需要置零。',
    url: 'https://leetcode.cn/problems/set-matrix-zeroes/',
    code: `public void setZeroes(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    boolean row0 = false, col0 = false;
    for (int i = 0; i < m; i++) if (matrix[i][0] == 0) col0 = true;
    for (int j = 0; j < n; j++) if (matrix[0][j] == 0) row0 = true;
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
        }
    }
    if (col0) for (int i = 0; i < m; i++) matrix[i][0] = 0;
    if (row0) for (int j = 0; j < n; j++) matrix[0][j] = 0;
}`
  },
  {
    id: 'hot-18',
    title: '18. 螺旋矩阵 (Spiral Matrix)',
    difficulty: 'Medium',
    description: '给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。',
    approach: '层层遍历。设定上下左右四个边界，循环遍历并收缩边界。',
    url: 'https://leetcode.cn/problems/spiral-matrix/',
    code: `public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> order = new ArrayList<>();
    if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return order;
    int rows = matrix.length, columns = matrix[0].length;
    int left = 0, right = columns - 1, top = 0, bottom = rows - 1;
    while (left <= right && top <= bottom) {
        for (int column = left; column <= right; column++) order.add(matrix[top][column]);
        for (int row = top + 1; row <= bottom; row++) order.add(matrix[row][right]);
        if (left < right && top < bottom) {
            for (int column = right - 1; column > left; column--) order.add(matrix[bottom][column]);
            for (int row = bottom; row > top; row--) order.add(matrix[row][left]);
        }
        left++; right--; top++; bottom--;
    }
    return order;
}`
  },
  {
    id: 'hot-19',
    title: '19. 旋转图像 (Rotate Image)',
    difficulty: 'Medium',
    description: '给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。',
    approach: '原地旋转。1. 沿主对角线翻转；2. 沿垂直中线翻转。',
    url: 'https://leetcode.cn/problems/rotate-image/',
    code: `public void rotate(int[][] matrix) {
    int n = matrix.length;
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n / 2; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[i][n - 1 - j];
            matrix[i][n - 1 - j] = temp;
        }
    }
}`
  },
  {
    id: 'hot-20',
    title: '20. 搜索二维矩阵 II (Search a 2D Matrix II)',
    difficulty: 'Medium',
    description: '编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：每行的元素从左到右升序排列。每列的元素从上到下升序排列。',
    approach: '从右上角开始搜索。如果当前值大于 target，向左移；如果小于 target，向下移。',
    url: 'https://leetcode.cn/problems/search-a-2d-matrix-ii/',
    code: `public boolean searchMatrix(int[][] matrix, int target) {
    int m = matrix.length, n = matrix[0].length;
    int x = 0, y = n - 1;
    while (x < m && y >= 0) {
        if (matrix[x][y] == target) return true;
        if (matrix[x][y] > target) y--;
        else x++;
    }
    return false;
}`
  },
  {
    id: 'hot-21',
    title: '21. 相交链表 (Intersection of Two Linked Lists)',
    difficulty: 'Easy',
    description: '给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。',
    approach: '双指针。两个指针分别遍历 A+B 和 B+A，如果相交，它们会在相交点相遇。',
    url: 'https://leetcode.cn/problems/intersection-of-two-linked-lists/',
    code: `public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    if (headA == null || headB == null) return null;
    ListNode pA = headA, pB = headB;
    while (pA != pB) {
        pA = pA == null ? headB : pA.next;
        pB = pB == null ? headA : pB.next;
    }
    return pA;
}`
  },
  {
    id: 'hot-22',
    title: '22. 反转链表 (Reverse Linked List)',
    difficulty: 'Easy',
    description: '给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。',
    approach: '迭代。使用 prev 和 curr 指针，逐个反转节点的 next 指针。',
    url: 'https://leetcode.cn/problems/reverse-linked-list/',
    code: `public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
  },
  {
    id: 'hot-23',
    title: '23. 回文链表 (Palindrome Linked List)',
    difficulty: 'Easy',
    description: '给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。',
    approach: '快慢指针找中点 + 反转后半部分 + 比较。',
    url: 'https://leetcode.cn/problems/palindrome-linked-list/',
    code: `public boolean isPalindrome(ListNode head) {
    if (head == null || head.next == null) return true;
    ListNode slow = head, fast = head;
    while (fast.next != null && fast.next.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    ListNode secondHalf = reverse(slow.next);
    ListNode p1 = head, p2 = secondHalf;
    while (p2 != null) {
        if (p1.val != p2.val) return false;
        p1 = p1.next;
        p2 = p2.next;
    }
    return true;
}
private ListNode reverse(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
  },
  {
    id: 'hot-24',
    title: '24. 环形链表 (Linked List Cycle)',
    difficulty: 'Easy',
    description: '给你一个链表的头节点 head ，判断链表中是否有环。',
    approach: '快慢指针。快指针每次走两步，慢指针每次走一步，如果相遇则有环。',
    url: 'https://leetcode.cn/problems/linked-list-cycle/',
    code: `public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) return false;
    ListNode slow = head, fast = head.next;
    while (slow != fast) {
        if (fast == null || fast.next == null) return false;
        slow = slow.next;
        fast = fast.next.next;
    }
    return true;
}`
  },
  {
    id: 'hot-25',
    title: '25. 环形链表 II (Linked List Cycle II)',
    difficulty: 'Medium',
    description: '给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。',
    approach: '快慢指针。相遇后，将其中一个指针放回起点，两个指针同速前进，再次相遇点即为入环点。',
    url: 'https://leetcode.cn/problems/linked-list-cycle-ii/',
    code: `public ListNode detectCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            ListNode p = head;
            while (p != slow) {
                p = p.next;
                slow = slow.next;
            }
            return p;
        }
    }
    return null;
}`
  },
  {
    id: 'hot-26',
    title: '26. 合并两个有序链表 (Merge Two Sorted Lists)',
    difficulty: 'Easy',
    description: '将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 ',
    approach: '迭代。使用哑节点（dummy node）作为辅助，比较两个链表头节点，取较小者接入。',
    url: 'https://leetcode.cn/problems/merge-two-sorted-lists/',
    code: `public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }
    curr.next = l1 != null ? l1 : l2;
    return dummy.next;
}`
  },
  {
    id: 'hot-27',
    title: '27. 两数相加 (Add Two Numbers)',
    difficulty: 'Medium',
    description: '给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。',
    approach: '模拟加法。同时遍历两个链表，记录进位。',
    url: 'https://leetcode.cn/problems/add-two-numbers/',
    code: `public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    int carry = 0;
    while (l1 != null || l2 != null || carry != 0) {
        int sum = (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0) + carry;
        carry = sum / 10;
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
        if (l1 != null) l1 = l1.next;
        if (l2 != null) l2 = l2.next;
    }
    return dummy.next;
}`
  },
  {
    id: 'hot-28',
    title: '28. 删除链表的倒数第 N 个结点 (Remove Nth Node From End of List)',
    difficulty: 'Medium',
    description: '给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。',
    approach: '双指针。快指针先走 n 步，然后快慢指针同步走。',
    url: 'https://leetcode.cn/problems/remove-nth-node-from-end-of-list/',
    code: `public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode first = dummy, second = dummy;
    for (int i = 1; i <= n + 1; i++) first = first.next;
    while (first != null) {
        first = first.next;
        second = second.next;
    }
    second.next = second.next.next;
    return dummy.next;
}`
  },
  {
    id: 'hot-29',
    title: '29. 两两交换链表中的节点 (Swap Nodes in Pairs)',
    difficulty: 'Medium',
    description: '给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题。',
    approach: '迭代。使用哑节点，每次处理一对节点。',
    url: 'https://leetcode.cn/problems/swap-nodes-in-pairs/',
    code: `public ListNode swapPairs(ListNode head) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode temp = dummy;
    while (temp.next != null && temp.next.next != null) {
        ListNode node1 = temp.next;
        ListNode node2 = temp.next.next;
        temp.next = node2;
        node1.next = node2.next;
        node2.next = node1;
        temp = node1;
    }
    return dummy.next;
}`
  },
  {
    id: 'hot-30',
    title: '30. K 个一组翻转链表 (Reverse Nodes in k-Group)',
    difficulty: 'Hard',
    description: '给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。',
    approach: '分段反转。每次找到长度为 k 的一段，反转后连接。',
    url: 'https://leetcode.cn/problems/reverse-nodes-in-k-group/',
    code: `public ListNode reverseKGroup(ListNode head, int k) {
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode pre = dummy, end = dummy;
    while (end.next != null) {
        for (int i = 0; i < k && end != null; i++) end = end.next;
        if (end == null) break;
        ListNode start = pre.next;
        ListNode next = end.next;
        end.next = null;
        pre.next = reverse(start);
        start.next = next;
        pre = start;
        end = pre;
    }
    return dummy.next;
}
private ListNode reverse(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`
  },
  {
    id: 'hot-31',
    title: '31. 复制带随机指针的链表 (Copy List with Random Pointer)',
    difficulty: 'Medium',
    description: '给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点。',
    approach: '哈希表。第一次遍历复制节点并存入 Map，第二次遍历连接 next 和 random 指针。',
    url: 'https://leetcode.cn/problems/copy-list-with-random-pointer/',
    code: `public Node copyRandomList(Node head) {
    if (head == null) return null;
    Map<Node, Node> map = new HashMap<>();
    Node curr = head;
    while (curr != null) {
        map.put(curr, new Node(curr.val));
        curr = curr.next;
    }
    curr = head;
    while (curr != null) {
        map.get(curr).next = map.get(curr.next);
        map.get(curr).random = map.get(curr.random);
        curr = curr.next;
    }
    return map.get(head);
}`
  },
  {
    id: 'hot-32',
    title: '32. 排序链表 (Sort List)',
    difficulty: 'Medium',
    description: '给你链表的头节点 head ，请将其按 升序 排列并返回 排序后的链表 。',
    approach: '归并排序。快慢指针找中点，递归拆分，最后合并有序链表。',
    url: 'https://leetcode.cn/problems/sort-list/',
    code: `public ListNode sortList(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode slow = head, fast = head.next;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    ListNode tmp = slow.next;
    slow.next = null;
    ListNode left = sortList(head);
    ListNode right = sortList(tmp);
    return merge(left, right);
}
private ListNode merge(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) { curr.next = l1; l1 = l1.next; }
        else { curr.next = l2; l2 = l2.next; }
        curr = curr.next;
    }
    curr.next = l1 != null ? l1 : l2;
    return dummy.next;
}`
  },
  {
    id: 'hot-33',
    title: '33. 合并 K 个升序链表 (Merge k Sorted Lists)',
    difficulty: 'Hard',
    description: '给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。',
    approach: '优先队列。将所有链表的头节点放入最小堆，每次弹出最小的并接入结果链表。',
    url: 'https://leetcode.cn/problems/merge-k-sorted-lists/',
    code: `public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
    for (ListNode list : lists) if (list != null) pq.add(list);
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();
        curr.next = node;
        curr = curr.next;
        if (node.next != null) pq.add(node.next);
    }
    return dummy.next;
}`
  },
  {
    id: 'hot-34',
    title: '34. LRU 缓存 (LRU Cache)',
    difficulty: 'Medium',
    description: '请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。',
    approach: '哈希表 + 双向链表。哈希表实现 O(1) 查找，双向链表实现 O(1) 删除和插入。',
    url: 'https://leetcode.cn/problems/lru-cache/',
    code: `class LRUCache {
    class Node { int key, value; Node prev, next; }
    private Map<Integer, Node> cache = new HashMap<>();
    private int size, capacity;
    private Node head, tail;
    public LRUCache(int capacity) {
        this.capacity = capacity;
        head = new Node(); tail = new Node();
        head.next = tail; tail.prev = head;
    }
    public int get(int key) {
        Node node = cache.get(key);
        if (node == null) return -1;
        moveToHead(node);
        return node.value;
    }
    public void put(int key, int value) {
        Node node = cache.get(key);
        if (node == null) {
            Node newNode = new Node(); newNode.key = key; newNode.value = value;
            cache.put(key, newNode); addNode(newNode); ++size;
            if (size > capacity) { Node tail = popTail(); cache.remove(tail.key); --size; }
        } else { node.value = value; moveToHead(node); }
    }
}`
  },
  {
    id: 'hot-35',
    title: '35. 二叉树的中序遍历 (Binary Tree Inorder Traversal)',
    difficulty: 'Easy',
    description: '给定一个二叉树的根节点 root ，返回 它的 中序 遍历 。',
    approach: '递归或迭代。中序遍历顺序：左 -> 根 -> 右。',
    url: 'https://leetcode.cn/problems/binary-tree-inorder-traversal/',
    code: `public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    inorder(root, res);
    return res;
}
private void inorder(TreeNode root, List<Integer> res) {
    if (root == null) return;
    inorder(root.left, res);
    res.add(root.val);
    inorder(root.right, res);
}`
  },
  {
    id: 'hot-36',
    title: '36. 二叉树的最大深度 (Maximum Depth of Binary Tree)',
    difficulty: 'Easy',
    description: '给定一个二叉树，找出其最大深度。',
    approach: '递归。maxDepth = max(maxDepth(left), maxDepth(right)) + 1。',
    url: 'https://leetcode.cn/problems/maximum-depth-of-binary-tree/',
    code: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}`
  },
  {
    id: 'hot-37',
    title: '37. 翻转二叉树 (Invert Binary Tree)',
    difficulty: 'Easy',
    description: '给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。',
    approach: '递归。交换每个节点的左右子树。',
    url: 'https://leetcode.cn/problems/invert-binary-tree/',
    code: `public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode left = invertTree(root.left);
    TreeNode right = invertTree(root.right);
    root.left = right;
    root.right = left;
    return root;
}`
  },
  {
    id: 'hot-38',
    title: '38. 对称二叉树 (Symmetric Tree)',
    difficulty: 'Easy',
    description: '给你一个二叉树的根节点 root ， 检查它是否轴对称。',
    approach: '递归。判断左子树的左 and 右子树的右是否相等，以及左子树的右 and 右子树的左是否相等。',
    url: 'https://leetcode.cn/problems/symmetric-tree/',
    code: `public boolean isSymmetric(TreeNode root) {
    return check(root, root);
}
private boolean check(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    return p.val == q.val && check(p.left, q.right) && check(p.right, q.left);
}`
  },
  {
    id: 'hot-39',
    title: '39. 二叉树的层序遍历 (Binary Tree Level Order Traversal)',
    difficulty: 'Medium',
    description: '给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 （即逐层地，从左到右访问所有节点）。',
    approach: 'BFS。使用队列存储每一层的节点。',
    url: 'https://leetcode.cn/problems/binary-tree-level-order-traversal/',
    code: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        res.add(level);
    }
    return res;
}`
  },
  {
    id: 'hot-40',
    title: '40. 将有序数组转换为二叉搜索树 (Convert Sorted Array to Binary Search Tree)',
    difficulty: 'Easy',
    description: '给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。',
    approach: '递归。每次取数组中点作为根节点，递归构建左右子树。',
    url: 'https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/',
    code: `public TreeNode sortedArrayToBST(int[] nums) {
    return helper(nums, 0, nums.length - 1);
}
private TreeNode helper(int[] nums, int left, int right) {
    if (left > right) return null;
    int mid = (left + right) / 2;
    TreeNode root = new TreeNode(nums[mid]);
    root.left = helper(nums, left, mid - 1);
    root.right = helper(nums, mid + 1, right);
    return root;
}`
  },
  {
    id: 'hot-41',
    title: '41. 验证二叉搜索树 (Validate Binary Search Tree)',
    difficulty: 'Medium',
    description: '给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。',
    approach: '递归。维护当前节点值的上下界，确保左子树所有节点小于根节点，右子树所有节点大于根节点。',
    url: 'https://leetcode.cn/problems/validate-binary-search-tree/',
    code: `public boolean isValidBST(TreeNode root) {
    return isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE);
}
private boolean isValidBST(TreeNode node, long lower, long upper) {
    if (node == null) return true;
    if (node.val <= lower || node.val >= upper) return false;
    return isValidBST(node.left, lower, node.val) && isValidBST(node.right, node.val, upper);
}`
  },
  {
    id: 'hot-42',
    title: '42. 二叉搜索树中第 K 小的元素 (Kth Smallest Element in a BST)',
    difficulty: 'Medium',
    description: '给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。',
    approach: '中序遍历。BST 的中序遍历结果是升序序列，找到第 k 个元素即可。',
    url: 'https://leetcode.cn/problems/kth-smallest-element-in-a-bst/',
    code: `public int kthSmallest(TreeNode root, int k) {
    Deque<TreeNode> stack = new ArrayDeque<>();
    while (root != null || !stack.isEmpty()) {
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        if (--k == 0) return root.val;
        root = root.right;
    }
    return -1;
}`
  },
  {
    id: 'hot-43',
    title: '43. 二叉树的右视图 (Binary Tree Right Side View)',
    difficulty: 'Medium',
    description: '给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。',
    approach: 'BFS 层序遍历。每一层只取最后一个节点。',
    url: 'https://leetcode.cn/problems/binary-tree-right-side-view/',
    code: `public List<Integer> rightSideView(TreeNode root) {
    List<Integer> res = new ArrayList<>();
    if (root == null) return res;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            if (i == size - 1) res.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
    }
    return res;
}`
  },
  {
    id: 'hot-44',
    title: '44. 二叉树展开为链表 (Flatten Binary Tree to Linked List)',
    difficulty: 'Medium',
    description: '给你二叉树的根节点 root ，请你将它展开为一个单链表。',
    approach: '寻找前驱节点。对于当前节点，如果其左子节点不为空，找到左子树中最右边的节点，将其右指针指向当前节点的右子节点。',
    url: 'https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/',
    code: `public void flatten(TreeNode root) {
    TreeNode curr = root;
    while (curr != null) {
        if (curr.left != null) {
            TreeNode next = curr.left;
            TreeNode predecessor = next;
            while (predecessor.right != null) predecessor = predecessor.right;
            predecessor.right = curr.right;
            curr.left = null;
            curr.right = next;
        }
        curr = curr.right;
    }
}`
  },
  {
    id: 'hot-45',
    title: '45. 从前序与中序遍历序列构造二叉树 (Construct Binary Tree from Preorder and Inorder Traversal)',
    difficulty: 'Medium',
    description: '给定两个整数数组 preorder 和 inorder ，其中 preorder 是二叉树的先序遍历， inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。',
    approach: '递归。前序遍历的第一个元素是根节点，在中序遍历中找到根节点位置，划分左右子树。',
    url: 'https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    code: `private Map<Integer, Integer> indexMap;
public TreeNode buildTree(int[] preorder, int[] inorder) {
    int n = preorder.length;
    indexMap = new HashMap<>();
    for (int i = 0; i < n; i++) indexMap.put(inorder[i], i);
    return myBuildTree(preorder, inorder, 0, n - 1, 0, n - 1);
}
private TreeNode myBuildTree(int[] preorder, int[] inorder, int preL, int preR, int inL, int inR) {
    if (preL > preR) return null;
    int rootVal = preorder[preL];
    TreeNode root = new TreeNode(rootVal);
    int inRoot = indexMap.get(rootVal);
    int leftSize = inRoot - inL;
    root.left = myBuildTree(preorder, inorder, preL + 1, preL + leftSize, inL, inRoot - 1);
    root.right = myBuildTree(preorder, inorder, preL + leftSize + 1, preR, inRoot + 1, inR);
    return root;
}`
  },
  {
    id: 'hot-46',
    title: '46. 二叉树的最近公共祖先 (Lowest Common Ancestor of a Binary Tree)',
    difficulty: 'Medium',
    description: '给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。',
    approach: '递归。如果在左右子树中分别找到了 p 和 q，则当前节点为 LCA。',
    url: 'https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/',
    code: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left == null) return right;
    if (right == null) return left;
    return root;
}`
  },
  {
    id: 'hot-47',
    title: '47. 二叉树中的最大路径和 (Binary Tree Maximum Path Sum)',
    difficulty: 'Hard',
    description: '路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。',
    approach: '递归。计算每个节点作为路径最高点时的最大值，并返回其单边最大贡献。',
    url: 'https://leetcode.cn/problems/binary-tree-maximum-path-sum/',
    code: `int maxSum = Integer.MIN_VALUE;
public int maxPathSum(TreeNode root) {
    maxGain(root);
    return maxSum;
}
private int maxGain(TreeNode node) {
    if (node == null) return 0;
    int leftGain = Math.max(maxGain(node.left), 0);
    int rightGain = Math.max(maxGain(node.right), 0);
    int priceNewpath = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, priceNewpath);
    return node.val + Math.max(leftGain, rightGain);
}`
  },
  {
    id: 'hot-48',
    title: '48. 岛屿数量 (Number of Islands)',
    difficulty: 'Medium',
    description: '给你一个由 \'1\'（陆地）和 \'0\'（水）组成的的二维网格，请你计算网格中岛屿的数量。',
    approach: 'DFS。遍历网格，遇到 "1" 时岛屿数加 1，并用 DFS 将相连的 "1" 全部置为 "0"。',
    url: 'https://leetcode.cn/problems/number-of-islands/',
    code: `public int numIslands(char[][] grid) {
    int count = 0;
    for (int i = 0; i < grid.length; i++) {
        for (int j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == '1') {
                dfs(grid, i, j);
                count++;
            }
        }
    }
    return count;
}
private void dfs(char[][] grid, int i, int j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == '0') return;
    grid[i][j] = '0';
    dfs(grid, i + 1, j); dfs(grid, i - 1, j);
    dfs(grid, i, j + 1); dfs(grid, i, j - 1);
}`
  },
  {
    id: 'hot-49',
    title: '49. 腐烂的橘子 (Rotting Oranges)',
    difficulty: 'Medium',
    description: '在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：0 代表空单元格；1 代表新鲜橘子；2 代表腐烂橘子。',
    approach: 'BFS。将所有初始腐烂橘子入队，层序遍历模拟腐烂过程，记录时间。',
    url: 'https://leetcode.cn/problems/rotting-oranges/',
    code: `public int orangesRotting(int[][] grid) {
    int M = grid.length, N = grid[0].length;
    Queue<int[]> queue = new LinkedList<>();
    int count = 0;
    for (int r = 0; r < M; r++) {
        for (int c = 0; c < N; c++) {
            if (grid[r][c] == 1) count++;
            else if (grid[r][c] == 2) queue.add(new int[]{r, c});
        }
    }
    int round = 0;
    while (count > 0 && !queue.isEmpty()) {
        round++;
        int n = queue.size();
        for (int i = 0; i < n; i++) {
            int[] orange = queue.poll();
            int r = orange[0], c = orange[1];
            if (r-1 >= 0 && grid[r-1][c] == 1) { grid[r-1][c] = 2; count--; queue.add(new int[]{r-1, c}); }
            if (r+1 < M && grid[r+1][c] == 1) { grid[r+1][c] = 2; count--; queue.add(new int[]{r+1, c}); }
            if (c-1 >= 0 && grid[r][c-1] == 1) { grid[r][c-1] = 2; count--; queue.add(new int[]{r, c-1}); }
            if (c+1 < N && grid[r][c+1] == 1) { grid[r][c+1] = 2; count--; queue.add(new int[]{r, c+1}); }
        }
    }
    return count > 0 ? -1 : round;
}`
  },
  {
    id: 'hot-50',
    title: '50. 课程表 (Course Schedule)',
    difficulty: 'Medium',
    description: '你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。',
    approach: '拓扑排序（BFS）。统计入度，将入度为 0 的课程入队，不断移除其指向的课程的入度。',
    url: 'https://leetcode.cn/problems/course-schedule/',
    code: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    int[] indegrees = new int[numCourses];
    List<List<Integer>> adjacency = new ArrayList<>();
    for(int i = 0; i < numCourses; i++) adjacency.add(new ArrayList<>());
    for(int[] cp : prerequisites) {
        indegrees[cp[0]]++;
        adjacency.get(cp[1]).add(cp[0]);
    }
    Queue<Integer> queue = new LinkedList<>();
    for(int i = 0; i < numCourses; i++) if(indegrees[i] == 0) queue.add(i);
    while(!queue.isEmpty()) {
        int pre = queue.poll();
        numCourses--;
        for(int cur : adjacency.get(pre)) if(--indegrees[cur] == 0) queue.add(cur);
    }
    return numCourses == 0;
}`
  },
  {
    id: 'hot-51',
    title: '51. 实现 Trie (前缀树) (Implement Trie (Prefix Tree))',
    difficulty: 'Medium',
    description: 'Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。',
    approach: '字典树。每个节点包含 26 个子节点指针和一个布尔值标记是否为单词结尾。',
    url: 'https://leetcode.cn/problems/implement-trie-prefix-tree/',
    code: `class Trie {
    private Trie[] children;
    private boolean isEnd;
    public Trie() { children = new Trie[26]; isEnd = false; }
    public void insert(String word) {
        Trie node = this;
        for (char c : word.toCharArray()) {
            int index = c - 'a';
            if (node.children[index] == null) node.children[index] = new Trie();
            node = node.children[index];
        }
        node.isEnd = true;
    }
    public boolean search(String word) {
        Trie node = searchPrefix(word);
        return node != null && node.isEnd;
    }
    public boolean startsWith(String prefix) { return searchPrefix(prefix) != null; }
    private Trie searchPrefix(String prefix) {
        Trie node = this;
        for (char c : prefix.toCharArray()) {
            int index = c - 'a';
            if (node.children[index] == null) return null;
            node = node.children[index];
        }
        return node;
    }
}`
  },
  {
    id: 'hot-52',
    title: '52. 全排列 (Permutations)',
    difficulty: 'Medium',
    description: '给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。',
    approach: '回溯。使用 boolean 数组记录已使用的数字。',
    url: 'https://leetcode.cn/problems/permutations/',
    code: `public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(res, new ArrayList<>(), nums, new boolean[nums.length]);
    return res;
}
private void backtrack(List<List<Integer>> res, List<Integer> temp, int[] nums, boolean[] used) {
    if (temp.size() == nums.length) { res.add(new ArrayList<>(temp)); return; }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true; temp.add(nums[i]);
        backtrack(res, temp, nums, used);
        used[i] = false; temp.remove(temp.size() - 1);
    }
}`
  },
  {
    id: 'hot-53',
    title: '53. 子集 (Subsets)',
    difficulty: 'Medium',
    description: '给你一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。',
    approach: '回溯。每个元素都有选或不选两种状态。',
    url: 'https://leetcode.cn/problems/subsets/',
    code: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(res, new ArrayList<>(), nums, 0);
    return res;
}
private void backtrack(List<List<Integer>> res, List<Integer> temp, int[] nums, int start) {
    res.add(new ArrayList<>(temp));
    for (int i = start; i < nums.length; i++) {
        temp.add(nums[i]);
        backtrack(res, temp, nums, i + 1);
        temp.remove(temp.size() - 1);
    }
}`
  },
  {
    id: 'hot-54',
    title: '54. 电话号码的字母组合 (Letter Combinations of a Phone Number)',
    difficulty: 'Medium',
    description: '给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。',
    approach: '回溯。建立数字到字母的映射，逐位递归。',
    url: 'https://leetcode.cn/problems/letter-combinations-of-a-phone-number/',
    code: `private String[] map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
public List<String> letterCombinations(String digits) {
    List<String> res = new ArrayList<>();
    if (digits.length() == 0) return res;
    backtrack(res, new StringBuilder(), digits, 0);
    return res;
}
private void backtrack(List<String> res, StringBuilder sb, String digits, int index) {
    if (index == digits.length()) { res.add(sb.toString()); return; }
    String letters = map[digits.charAt(index) - '0'];
    for (char c : letters.toCharArray()) {
        sb.append(c);
        backtrack(res, sb, digits, index + 1);
        sb.deleteCharAt(sb.length() - 1);
    }
}`
  },
  {
    id: 'hot-55',
    title: '55. 组合总和 (Combination Sum)',
    difficulty: 'Medium',
    description: '给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 。',
    approach: '回溯。元素可以重复选取，所以递归时 start 不变。',
    url: 'https://leetcode.cn/problems/combination-sum/',
    code: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> res = new ArrayList<>();
    backtrack(res, new ArrayList<>(), candidates, target, 0);
    return res;
}
private void backtrack(List<List<Integer>> res, List<Integer> temp, int[] nums, int remain, int start) {
    if (remain < 0) return;
    if (remain == 0) { res.add(new ArrayList<>(temp)); return; }
    for (int i = start; i < nums.length; i++) {
        temp.add(nums[i]);
        backtrack(res, temp, nums, remain - nums[i], i);
        temp.remove(temp.size() - 1);
    }
}`
  },
  {
    id: 'hot-56',
    title: '56. 括号生成 (Generate Parentheses)',
    difficulty: 'Medium',
    description: '数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。',
    approach: '回溯。维护左括号和右括号的数量，确保左括号数 >= 右括号数。',
    url: 'https://leetcode.cn/problems/generate-parentheses/',
    code: `public List<String> generateParenthesis(int n) {
    List<String> res = new ArrayList<>();
    backtrack(res, "", 0, 0, n);
    return res;
}
private void backtrack(List<String> res, String cur, int open, int close, int max) {
    if (cur.length() == max * 2) { res.add(cur); return; }
    if (open < max) backtrack(res, cur + "(", open + 1, close, max);
    if (close < open) backtrack(res, cur + ")", open, close + 1, max);
}`
  },
  {
    id: 'hot-57',
    title: '57. 单词搜索 (Word Search)',
    difficulty: 'Medium',
    description: '给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true 。',
    approach: '回溯。DFS 遍历四个方向，使用标记位防止重复访问。',
    url: 'https://leetcode.cn/problems/word-search/',
    code: `public boolean exist(char[][] board, String word) {
    for (int i = 0; i < board.length; i++) {
        for (int j = 0; j < board[0].length; j++) {
            if (dfs(board, word, i, j, 0)) return true;
        }
    }
    return false;
}
private boolean dfs(char[][] board, String word, int i, int j, int k) {
    if (k == word.length()) return true;
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != word.charAt(k)) return false;
    char temp = board[i][j];
    board[i][j] = '#';
    boolean res = dfs(board, word, i+1, j, k+1) || dfs(board, word, i-1, j, k+1) || 
                  dfs(board, word, i, j+1, k+1) || dfs(board, word, i, j-1, k+1);
    board[i][j] = temp;
    return res;
}`
  },
  {
    id: 'hot-58',
    title: '58. 分割回文串 (Palindrome Partitioning)',
    difficulty: 'Medium',
    description: '给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。',
    approach: '回溯。如果当前子串是回文，则递归处理剩余部分。',
    url: 'https://leetcode.cn/problems/palindrome-partitioning/',
    code: `public List<List<String>> partition(String s) {
    List<List<String>> res = new ArrayList<>();
    backtrack(res, new ArrayList<>(), s, 0);
    return res;
}
private void backtrack(List<List<String>> res, List<String> temp, String s, int start) {
    if (start == s.length()) { res.add(new ArrayList<>(temp)); return; }
    for (int i = start; i < s.length(); i++) {
        if (isPalindrome(s, start, i)) {
            temp.add(s.substring(start, i + 1));
            backtrack(res, temp, s, i + 1);
            temp.remove(temp.size() - 1);
        }
    }
}
private boolean isPalindrome(String s, int low, int high) {
    while (low < high) if (s.charAt(low++) != s.charAt(high--)) return false;
    return true;
}`
  },
  {
    id: 'hot-59',
    title: '59. N 皇后 (N-Queens)',
    difficulty: 'Hard',
    description: '按照国际象棋的规则，皇后可以攻击与之处在同一行或同一列或同一斜线上的棋子。',
    approach: '回溯。使用集合记录已放置皇后的列、正斜线、反斜线。',
    url: 'https://leetcode.cn/problems/n-queens/',
    code: `public List<List<String>> solveNQueens(int n) {
    List<List<String>> res = new ArrayList<>();
    int[] queens = new int[n];
    Arrays.fill(queens, -1);
    Set<Integer> columns = new HashSet<>(), diagonals1 = new HashSet<>(), diagonals2 = new HashSet<>();
    backtrack(res, queens, n, 0, columns, diagonals1, diagonals2);
    return res;
}
private void backtrack(List<List<String>> res, int[] queens, int n, int row, Set<Integer> columns, Set<Integer> diagonals1, Set<Integer> diagonals2) {
    if (row == n) { res.add(generateBoard(queens, n)); return; }
    for (int i = 0; i < n; i++) {
        if (columns.contains(i) || diagonals1.contains(row - i) || diagonals2.contains(row + i)) continue;
        queens[row] = i; columns.add(i); diagonals1.add(row - i); diagonals2.add(row + i);
        backtrack(res, queens, n, row + 1, columns, diagonals1, diagonals2);
        queens[row] = -1; columns.remove(i); diagonals1.remove(row - i); diagonals2.remove(row + i);
    }
}`
  },
  {
    id: 'hot-60',
    title: '60. 搜索插入位置 (Search Insert Position)',
    difficulty: 'Easy',
    description: '给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。',
    approach: '二分查找。寻找第一个大于等于 target 的索引。',
    url: 'https://leetcode.cn/problems/search-insert-position/',
    code: `public int searchInsert(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return left;
}`
  },
  {
    id: 'hot-61',
    title: '61. 搜索二维矩阵 (Search a 2D Matrix)',
    difficulty: 'Medium',
    description: '给你一个满足下述两条属性的 m x n 整数矩阵：每行中的整数从左到右按非严格递增顺序排列。每行的第一个整数大于前一行的最后一个整数。',
    approach: '二分查找。将二维矩阵映射为一维数组进行二分。',
    url: 'https://leetcode.cn/problems/search-a-2d-matrix/',
    code: `public boolean searchMatrix(int[][] matrix, int target) {
    int m = matrix.length, n = matrix[0].length;
    int low = 0, high = m * n - 1;
    while (low <= high) {
        int mid = (high - low) / 2 + low;
        int x = matrix[mid / n][mid % n];
        if (x < target) low = mid + 1;
        else if (x > target) high = mid - 1;
        else return true;
    }
    return false;
}`
  },
  {
    id: 'hot-62',
    title: '62. 在排序数组中查找元素的第一个和最后一个位置 (Find First and Last Position of Element in Sorted Array)',
    difficulty: 'Medium',
    description: '给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。',
    approach: '二分查找。分别查找第一个大于等于 target 的位置 and 第一个大于 target 的位置。',
    url: 'https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/',
    code: `public int[] searchRange(int[] nums, int target) {
    int leftIdx = binarySearch(nums, target, true);
    int rightIdx = binarySearch(nums, target, false) - 1;
    if (leftIdx <= rightIdx && rightIdx < nums.length && nums[leftIdx] == target && nums[rightIdx] == target) {
        return new int[]{leftIdx, rightIdx};
    } 
    return new int[]{-1, -1};
}
public int binarySearch(int[] nums, int target, boolean lower) {
    int left = 0, right = nums.length - 1, ans = nums.length;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (nums[mid] > target || (lower && nums[mid] >= target)) {
            right = mid - 1; ans = mid;
        } else left = mid + 1;
    }
    return ans;
}`
  },
  {
    id: 'hot-63',
    title: '63. 搜索旋转排序数组 (Search in Rotated Sorted Array)',
    difficulty: 'Medium',
    description: '整数数组 nums 按升序排列，数组中的值 互不相同 。在传递给函数之前，nums 在预先未知的某个下标 k 上进行了 旋转。',
    approach: '二分查找。判断哪一半是有序的，再根据 target 范围决定搜索方向。',
    url: 'https://leetcode.cn/problems/search-in-rotated-sorted-array/',
    code: `public int search(int[] nums, int target) {
    int n = nums.length;
    if (n == 0) return -1;
    if (n == 1) return nums[0] == target ? 0 : -1;
    int l = 0, r = n - 1;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (nums[mid] == target) return mid;
        if (nums[0] <= nums[mid]) {
            if (nums[0] <= target && target < nums[mid]) r = mid - 1;
            else l = mid + 1;
        } else {
            if (nums[mid] < target && target <= nums[n - 1]) l = mid + 1;
            else r = mid - 1;
        }
    }
    return -1;
}`
  },
  {
    id: 'hot-64',
    title: '64. 寻找旋转排序数组中的最小值 (Find Minimum in Rotated Sorted Array)',
    difficulty: 'Medium',
    description: '已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。',
    approach: '二分查找。比较 mid 和 right 的值来确定最小值所在区间。',
    url: 'https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/',
    code: `public int findMin(int[] nums) {
    int low = 0, high = nums.length - 1;
    while (low < high) {
        int pivot = low + (high - low) / 2;
        if (nums[pivot] < nums[high]) high = pivot;
        else low = pivot + 1;
    }
    return nums[low];
}`
  },
  {
    id: 'hot-65',
    title: '65. 寻找两个正序数组的中位数 (Median of Two Sorted Arrays)',
    difficulty: 'Hard',
    description: '给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数 。',
    approach: '二分查找。在两个数组中寻找第 k 小的数。',
    url: 'https://leetcode.cn/problems/median-of-two-sorted-arrays/',
    code: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    int n = nums1.length, m = nums2.length;
    int left = (n + m + 1) / 2, right = (n + m + 2) / 2;
    return (getKth(nums1, 0, n - 1, nums2, 0, m - 1, left) + getKth(nums1, 0, n - 1, nums2, 0, m - 1, right)) * 0.5;
}
private int getKth(int[] nums1, int start1, int end1, int[] nums2, int start2, int end2, int k) {
    int len1 = end1 - start1 + 1, len2 = end2 - start2 + 1;
    if (len1 > len2) return getKth(nums2, start2, end2, nums1, start1, end1, k);
    if (len1 == 0) return nums2[start2 + k - 1];
    if (k == 1) return Math.min(nums1[start1], nums2[start2]);
    int i = start1 + Math.min(len1, k / 2) - 1, j = start2 + Math.min(len2, k / 2) - 1;
    if (nums1[i] > nums2[j]) return getKth(nums1, start1, end1, nums2, j + 1, end2, k - (j - start2 + 1));
    else return getKth(nums1, i + 1, end1, nums2, start2, end2, k - (i - start1 + 1));
}`
  },
  {
    id: 'hot-66',
    title: '66. 有效的括号 (Valid Parentheses)',
    difficulty: 'Easy',
    description: '给定一个只包括 \'(\'，\')\'，\'{\'，\'}\'，\'[\'，\']\' 的字符串 s ，判断字符串是否有效。',
    approach: '栈。遇到左括号入栈，遇到右括号判断是否匹配。',
    url: 'https://leetcode.cn/problems/valid-parentheses/',
    code: `public boolean isValid(String s) {
    Deque<Character> stack = new LinkedList<>();
    for (char c : s.toCharArray()) {
        if (c == '(') stack.push(')');
        else if (c == '[') stack.push(']');
        else if (c == '{') stack.push('}');
        else if (stack.isEmpty() || stack.pop() != c) return false;
    }
    return stack.isEmpty();
}`
  },
  {
    id: 'hot-67',
    title: '67. 最小栈 (Min Stack)',
    difficulty: 'Medium',
    description: '设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。',
    approach: '辅助栈。同步维护一个存储当前最小值的栈。',
    url: 'https://leetcode.cn/problems/min-stack/',
    code: `class MinStack {
    private Deque<Integer> xStack;
    private Deque<Integer> minStack;
    public MinStack() { xStack = new LinkedList<>(); minStack = new LinkedList<>(); minStack.push(Integer.MAX_VALUE); }
    public void push(int x) {
        xStack.push(x);
        minStack.push(Math.min(minStack.peek(), x));
    }
    public void pop() { xStack.pop(); minStack.pop(); }
    public int top() { return xStack.peek(); }
    public int getMin() { return minStack.peek(); }
}`
  },
  {
    id: 'hot-68',
    title: '68. 柱状图中最大的矩形 (Largest Rectangle in Histogram)',
    difficulty: 'Hard',
    description: '给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。求在该柱状图中，能够勾勒出来的矩形的最大面积。',
    approach: '单调栈。找到每个柱子左右两边第一个比它矮的柱子。',
    url: 'https://leetcode.cn/problems/largest-rectangle-in-histogram/',
    code: `public int largestRectangleArea(int[] heights) {
    int n = heights.length;
    int[] left = new int[n], right = new int[n];
    Deque<Integer> mono_stack = new ArrayDeque<>();
    for (int i = 0; i < n; ++i) {
        while (!mono_stack.isEmpty() && heights[mono_stack.peek()] >= heights[i]) mono_stack.pop();
        left[i] = (mono_stack.isEmpty() ? -1 : mono_stack.peek());
        mono_stack.push(i);
    }
    mono_stack.clear();
    for (int i = n - 1; i >= 0; --i) {
        while (!mono_stack.isEmpty() && heights[mono_stack.peek()] >= heights[i]) mono_stack.pop();
        right[i] = (mono_stack.isEmpty() ? n : mono_stack.peek());
        mono_stack.push(i);
    }
    int ans = 0;
    for (int i = 0; i < n; ++i) ans = Math.max(ans, (right[i] - left[i] - 1) * heights[i]);
    return ans;
}`
  },
  {
    id: 'hot-69',
    title: '69. 字符串解码 (Decode String)',
    difficulty: 'Medium',
    description: '给定一个经过编码的字符串，返回它解码后的字符串。',
    approach: '辅助栈。使用两个栈分别存储倍数和当前字符串。',
    url: 'https://leetcode.cn/problems/decode-string/',
    code: `public String decodeString(String s) {
    StringBuilder res = new StringBuilder();
    int multi = 0;
    Deque<Integer> stack_multi = new LinkedList<>();
    Deque<String> stack_res = new LinkedList<>();
    for(Character c : s.toCharArray()) {
        if(c == '[') {
            stack_multi.push(multi); stack_res.push(res.toString());
            multi = 0; res = new StringBuilder();
        } else if(c == ']') {
            StringBuilder tmp = new StringBuilder();
            int cur_multi = stack_multi.pop();
            for(int i = 0; i < cur_multi; i++) tmp.append(res);
            res = new StringBuilder(stack_res.pop() + tmp);
        } else if(c >= '0' && c <= '9') multi = multi * 10 + Integer.parseInt(c + "");
        else res.append(c);
    }
    return res.toString();
}`
  },
  {
    id: 'hot-70',
    title: '70. 每日温度 (Daily Temperatures)',
    difficulty: 'Medium',
    description: '给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。',
    approach: '单调栈。存储索引，当遇到更高温度时弹出并计算差值。',
    url: 'https://leetcode.cn/problems/daily-temperatures/',
    code: `public int[] dailyTemperatures(int[] temperatures) {
    int length = temperatures.length;
    int[] ans = new int[length];
    Deque<Integer> stack = new LinkedList<>();
    for (int i = 0; i < length; i++) {
        int temperature = temperatures[i];
        while (!stack.isEmpty() && temperature > temperatures[stack.peek()]) {
            int prevIndex = stack.pop();
            ans[prevIndex] = i - prevIndex;
        }
        stack.push(i);
    }
    return ans;
}`
  },
  {
    id: 'hot-71',
    title: '71. 接雨水 (Trapping Rain Water)',
    difficulty: 'Hard',
    description: '给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。',
    approach: '双指针。维护左右两边的最大高度，向中间靠拢。',
    url: 'https://leetcode.cn/problems/trapping-rain-water/',
    code: `public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0, ans = 0;
    while (left < right) {
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);
        if (height[left] < height[right]) {
            ans += leftMax - height[left]; ++left;
        } else {
            ans += rightMax - height[right]; --right;
        }
    }
    return ans;
}`
  },
  {
    id: 'hot-72',
    title: '72. 买卖股票的最佳时机 (Best Time to Buy and Sell Stock)',
    difficulty: 'Easy',
    description: '给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。',
    approach: '贪心。记录历史最低价格，计算当前卖出的最大利润。',
    url: 'https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/',
    code: `public int maxProfit(int[] prices) {
    int minprice = Integer.MAX_VALUE, maxprofit = 0;
    for (int i = 0; i < prices.length; i++) {
        if (prices[i] < minprice) minprice = prices[i];
        else if (prices[i] - minprice > maxprofit) maxprofit = prices[i] - minprice;
    }
    return maxprofit;
}`
  },
  {
    id: 'hot-73',
    title: '73. 跳跃游戏 (Jump Game)',
    difficulty: 'Medium',
    description: '给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。',
    approach: '贪心。维护当前能到达的最远位置。',
    url: 'https://leetcode.cn/problems/jump-game/',
    code: `public boolean canJump(int[] nums) {
    int n = nums.length, rightmost = 0;
    for (int i = 0; i < n; ++i) {
        if (i <= rightmost) {
            rightmost = Math.max(rightmost, i + nums[i]);
            if (rightmost >= n - 1) return true;
        }
    }
    return false;
}`
  },
  {
    id: 'hot-74',
    title: '74. 跳跃游戏 II (Jump Game II)',
    difficulty: 'Medium',
    description: '给定一个长度为 n 的 0 索引整数数组 nums。',
    approach: '贪心。每次在当前跳跃范围内选择能跳得最远的位置。',
    url: 'https://leetcode.cn/problems/jump-game-ii/',
    code: `public int jump(int[] nums) {
    int length = nums.length, end = 0, maxPosition = 0, steps = 0;
    for (int i = 0; i < length - 1; i++) {
        maxPosition = Math.max(maxPosition, i + nums[i]);
        if (i == end) {
            end = maxPosition; steps++;
        }
    }
    return steps;
}`
  },
  {
    id: 'hot-75',
    title: '75. 划分字母区间 (Partition Labels)',
    difficulty: 'Medium',
    description: '给你一个字符串 s 。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。',
    approach: '贪心。记录每个字母最后出现的位置，遍历时更新当前片段的结束位置。',
    url: 'https://leetcode.cn/problems/partition-labels/',
    code: `public List<Integer> partitionLabels(String s) {
    int[] last = new int[26];
    int length = s.length();
    for (int i = 0; i < length; i++) last[s.charAt(i) - 'a'] = i;
    List<Integer> partition = new ArrayList<>();
    int start = 0, end = 0;
    for (int i = 0; i < length; i++) {
        end = Math.max(end, last[s.charAt(i) - 'a']);
        if (i == end) {
            partition.add(end - start + 1); start = end + 1;
        }
    }
    return partition;
}`
  },
  {
    id: 'hot-76',
    title: '76. 爬楼梯 (Climbing Stairs)',
    difficulty: 'Easy',
    description: '假设你正在爬楼梯。需要 n 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？',
    approach: '动态规划。斐波那契数列。f(n) = f(n-1) + f(n-2)。',
    url: 'https://leetcode.cn/problems/climbing-stairs/',
    code: `public int climbStairs(int n) {
    int p = 0, q = 0, r = 1;
    for (int i = 1; i <= n; ++i) {
        p = q; q = r; r = p + q;
    }
    return r;
}`
  },
  {
    id: 'hot-77',
    title: '77. 杨辉三角 (Pascal\'s Triangle)',
    difficulty: 'Easy',
    description: '给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。',
    approach: '动态规划。每个数等于它上方两数之和。',
    url: 'https://leetcode.cn/problems/pascals-triangle/',
    code: `public List<List<Integer>> generate(int numRows) {
    List<List<Integer>> ret = new ArrayList<>();
    for (int i = 0; i < numRows; ++i) {
        List<Integer> row = new ArrayList<>();
        for (int j = 0; j <= i; ++j) {
            if (j == 0 || j == i) row.add(1);
            else row.add(ret.get(i - 1).get(j - 1) + ret.get(i - 1).get(j));
        }
        ret.add(row);
    }
    return ret;
}`
  },
  {
    id: 'hot-78',
    title: '78. 打家劫舍 (House Robber)',
    difficulty: 'Medium',
    description: '你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统。',
    approach: '动态规划。dp[i] = max(dp[i-2] + nums[i], dp[i-1])。',
    url: 'https://leetcode.cn/problems/house-robber/',
    code: `public int rob(int[] nums) {
    if (nums == null || nums.length == 0) return 0;
    int length = nums.length;
    if (length == 1) return nums[0];
    int first = nums[0], second = Math.max(nums[0], nums[1]);
    for (int i = 2; i < length; i++) {
        int temp = second;
        second = Math.max(first + nums[i], second);
        first = temp;
    }
    return second;
}`
  },
  {
    id: 'hot-79',
    title: '79. 完全平方数 (Perfect Squares)',
    difficulty: 'Medium',
    description: '给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。',
    approach: '动态规划。dp[i] = min(dp[i - j*j]) + 1。',
    url: 'https://leetcode.cn/problems/perfect-squares/',
    code: `public int numSquares(int n) {
    int[] f = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        int minn = Integer.MAX_VALUE;
        for (int j = 1; j * j <= i; j++) minn = Math.min(minn, f[i - j * j]);
        f[i] = minn + 1;
    }
    return f[n];
}`
  },
  {
    id: 'hot-80',
    title: '80. 零钱兑换 (Coin Change)',
    difficulty: 'Medium',
    description: '给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。',
    approach: '动态规划。dp[i] = min(dp[i - coin]) + 1。',
    url: 'https://leetcode.cn/problems/coin-change/',
    code: `public int coinChange(int[] coins, int amount) {
    int max = amount + 1;
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, max);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < coins.length; j++) {
            if (coins[j] <= i) dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
  },
  {
    id: 'hot-81',
    title: '81. 单词拆分 (Word Break)',
    difficulty: 'Medium',
    description: '给你一个字符串 s 和一个字符串列表 wordDict ，判定 s 是否可以由 wordDict 。',
    approach: '动态规划。dp[i] 表示 s 的前 i 个字符是否可以拆分。',
    url: 'https://leetcode.cn/problems/word-break/',
    code: `public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> wordSet = new HashSet<>(wordDict);
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true;
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && wordSet.contains(s.substring(j, i))) {
                dp[i] = true; break;
            }
        }
    }
    return dp[s.length()];
}`
  },
  {
    id: 'hot-82',
    title: '82. 最长递增子序列 (Longest Increasing Subsequence)',
    difficulty: 'Medium',
    description: '给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。',
    approach: '动态规划。dp[i] 表示以 nums[i] 结尾的最长递增子序列长度。',
    url: 'https://leetcode.cn/problems/longest-increasing-subsequence/',
    code: `public int lengthOfLIS(int[] nums) {
    if (nums.length == 0) return 0;
    int[] dp = new int[nums.length];
    dp[0] = 1;
    int maxans = 1;
    for (int i = 1; i < nums.length; i++) {
        dp[i] = 1;
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
        }
        maxans = Math.max(maxans, dp[i]);
    }
    return maxans;
}`
  },
  {
    id: 'hot-83',
    title: '83. 乘积最大子数组 (Maximum Product Subarray)',
    difficulty: 'Medium',
    description: '给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组。',
    approach: '动态规划。维护当前最大值和最小值（因为负负得正）。',
    url: 'https://leetcode.cn/problems/maximum-product-subarray/',
    code: `public int maxProduct(int[] nums) {
    int maxF = nums[0], minF = nums[0], ans = nums[0];
    for (int i = 1; i < nums.length; ++i) {
        int mx = maxF, mn = minF;
        maxF = Math.max(mx * nums[i], Math.max(nums[i], mn * nums[i]));
        minF = Math.min(mn * nums[i], Math.min(nums[i], mx * nums[i]));
        ans = Math.max(maxF, ans);
    }
    return ans;
}`
  },
  {
    id: 'hot-84',
    title: '84. 分割等和子集 (Partition Equal Subset Sum)',
    difficulty: 'Medium',
    description: '给你一个只包含正整数的非空数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。',
    approach: '动态规划。0-1 背包问题。判断是否能凑出 sum/2。',
    url: 'https://leetcode.cn/problems/partition-equal-subset-sum/',
    code: `public boolean canPartition(int[] nums) {
    int n = nums.length;
    if (n < 2) return false;
    int sum = 0, maxNum = 0;
    for (int num : nums) { sum += num; maxNum = Math.max(maxNum, num); }
    if (sum % 2 != 0) return false;
    int target = sum / 2;
    if (maxNum > target) return false;
    boolean[] dp = new boolean[target + 1];
    dp[0] = true;
    for (int i = 0; i < n; i++) {
        int num = nums[i];
        for (int j = target; j >= num; j--) dp[j] |= dp[j - num];
    }
    return dp[target];
}`
  },
  {
    id: 'hot-85',
    title: '85. 最长有效括号 (Longest Valid Parentheses)',
    difficulty: 'Hard',
    description: '给你一个只包含 \'(\' 和 \')\' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。',
    approach: '动态规划。dp[i] 表示以 i 结尾的最长有效括号长度。',
    url: 'https://leetcode.cn/problems/longest-valid-parentheses/',
    code: `public int longestValidParentheses(String s) {
    int maxans = 0;
    int[] dp = new int[s.length()];
    for (int i = 1; i < s.length(); i++) {
        if (s.charAt(i) == ')') {
            if (s.charAt(i - 1) == '(') dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
            else if (i - dp[i - 1] > 0 && s.charAt(i - dp[i - 1] - 1) == '(') {
                dp[i] = dp[i - 1] + ((i - dp[i - 1]) >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2;
            }
            maxans = Math.max(maxans, dp[i]);
        }
    }
    return maxans;
}`
  },
  {
    id: 'hot-86',
    title: '86. 不同路径 (Unique Paths)',
    difficulty: 'Medium',
    description: '一个机器人位于一个 m x n 网格的左上角 。机器人每次只能向下或者向右移动一步。',
    approach: '动态规划。dp[i][j] = dp[i-1][j] + dp[i][j-1]。',
    url: 'https://leetcode.cn/problems/unique-paths/',
    code: `public int uniquePaths(int m, int n) {
    int[][] f = new int[m][n];
    for (int i = 0; i < m; ++i) f[i][0] = 1;
    for (int j = 0; j < n; ++j) f[0][j] = 1;
    for (int i = 1; i < m; ++i) {
        for (int j = 1; j < n; ++j) f[i][j] = f[i - 1][j] + f[i][j - 1];
    }
    return f[m - 1][n - 1];
}`
  },
  {
    id: 'hot-87',
    title: '87. 最小路径和 (Minimum Path Sum)',
    difficulty: 'Medium',
    description: '给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。',
    approach: '动态规划。dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]。',
    url: 'https://leetcode.cn/problems/minimum-path-sum/',
    code: `public int minPathSum(int[][] grid) {
    if (grid == null || grid.length == 0 || grid[0].length == 0) return 0;
    int rows = grid.length, columns = grid[0].length;
    int[][] dp = new int[rows][columns];
    dp[0][0] = grid[0][0];
    for (int i = 1; i < rows; i++) dp[i][0] = dp[i - 1][0] + grid[i][0];
    for (int j = 1; j < columns; j++) dp[0][j] = dp[0][j - 1] + grid[0][j];
    for (int i = 1; i < rows; i++) {
        for (int j = 1; j < columns; j++) dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
    return dp[rows - 1][columns - 1];
}`
  },
  {
    id: 'hot-88',
    title: '88. 最长公共子序列 (Longest Common Subsequence)',
    difficulty: 'Medium',
    description: '给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。',
    approach: '动态规划。dp[i][j] 表示 text1 前 i 个和 text2 前 j 个的最长公共子序列。',
    url: 'https://leetcode.cn/problems/longest-common-subsequence/',
    code: `public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1.charAt(i - 1) == text2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}`
  },
  {
    id: 'hot-89',
    title: '89. 编辑距离 (Edit Distance)',
    difficulty: 'Hard',
    description: '给你两个单词 word1 和 word2， 请返回将 word1 转换成 word2 所使用的最少操作数 。',
    approach: '动态规划。dp[i][j] 表示 word1 前 i 个转换成 word2 前 j 个的最少操作数。',
    url: 'https://leetcode.cn/problems/edit-distance/',
    code: `public int minDistance(String word1, String word2) {
    int n = word1.length(), m = word2.length();
    if (n * m == 0) return n + m;
    int[][] D = new int[n + 1][m + 1];
    for (int i = 0; i < n + 1; i++) D[i][0] = i;
    for (int j = 0; j < m + 1; j++) D[0][j] = j;
    for (int i = 1; i < n + 1; i++) {
        for (int j = 1; j < m + 1; j++) {
            int left = D[i - 1][j] + 1, down = D[i][j - 1] + 1, left_down = D[i - 1][j - 1];
            if (word1.charAt(i - 1) != word2.charAt(j - 1)) left_down += 1;
            D[i][j] = Math.min(left, Math.min(down, left_down));
        }
    }
    return D[n][m];
}`
  },
  {
    id: 'hot-90',
    title: '90. 只出现一次的数字 (Single Number)',
    difficulty: 'Easy',
    description: '给你一个 非空 整数数组 nums ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。',
    approach: '异或运算。a ^ a = 0, a ^ 0 = a。',
    url: 'https://leetcode.cn/problems/single-number/',
    code: `public int singleNumber(int[] nums) {
    int single = 0;
    for (int num : nums) single ^= num;
    return single;
}`
  },
  {
    id: 'hot-91',
    title: '91. 多数元素 (Majority Element)',
    difficulty: 'Easy',
    description: '给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。',
    approach: '摩尔投票法。维护一个候选人及其票数。',
    url: 'https://leetcode.cn/problems/majority-element/',
    code: `public int majorityElement(int[] nums) {
    int count = 0, candidate = null;
    for (int num : nums) {
        if (count == 0) candidate = num;
        count += (num == candidate) ? 1 : -1;
    }
    return candidate;
}`
  },
  {
    id: 'hot-92',
    title: '92. 颜色分类 (Sort Colors)',
    difficulty: 'Medium',
    description: '给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序。',
    approach: '双指针。p0 指向 0 的右边界，p2 指向 2 的左边界。',
    url: 'https://leetcode.cn/problems/sort-colors/',
    code: `public void sortColors(int[] nums) {
    int n = nums.length, p0 = 0, p2 = n - 1;
    for (int i = 0; i <= p2; ++i) {
        while (i <= p2 && nums[i] == 2) {
            int temp = nums[i]; nums[i] = nums[p2]; nums[p2] = temp; --p2;
        }
        if (nums[i] == 0) {
            int temp = nums[i]; nums[i] = nums[p0]; nums[p0] = temp; ++p0;
        }
    }
}`
  },
  {
    id: 'hot-93',
    title: '93. 下一个排列 (Next Permutation)',
    difficulty: 'Medium',
    description: '整数数组的一个 排列  就是将其所有元素按一定顺序排列的一个序列。',
    approach: '两遍扫描。1. 找第一个相邻升序对；2. 找第一个大于该数的值并交换；3. 反转。',
    url: 'https://leetcode.cn/problems/next-permutation/',
    code: `public void nextPermutation(int[] nums) {
    int i = nums.length - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        int j = nums.length - 1;
        while (j >= 0 && nums[i] >= nums[j]) j--;
        swap(nums, i, j);
    }
    reverse(nums, i + 1);
}
private void swap(int[] nums, int i, int j) {
    int temp = nums[i]; nums[i] = nums[j]; nums[j] = temp;
}
private void reverse(int[] nums, int start) {
    int left = start, right = nums.length - 1;
    while (left < right) swap(nums, left++, right--);
}`
  },
  {
    id: 'hot-94',
    title: '94. 寻找重复数 (Find the Duplicate Number)',
    difficulty: 'Medium',
    description: '给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n）。',
    approach: '快慢指针。弗洛伊德判圈算法。',
    url: 'https://leetcode.cn/problems/find-the-duplicate-number/',
    code: `public int findDuplicate(int[] nums) {
    int slow = 0, fast = 0;
    do {
        slow = nums[slow]; fast = nums[nums[fast]];
    } while (slow != fast);
    slow = 0;
    while (slow != fast) {
        slow = nums[slow]; fast = nums[fast];
    }
    return slow;
}`
  },
  {
    id: 'hot-95',
    title: '95. 寻找两个正序数组的中位数 (Median of Two Sorted Arrays)',
    difficulty: 'Hard',
    description: '给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。',
    approach: '二分查找。寻找第 k 小的数。',
    url: 'https://leetcode.cn/problems/median-of-two-sorted-arrays/',
    code: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    int totalLength = nums1.length + nums2.length;
    if (totalLength % 2 == 1) return getKthElement(nums1, nums2, totalLength / 2 + 1);
    else return (getKthElement(nums1, nums2, totalLength / 2) + getKthElement(nums1, nums2, totalLength / 2 + 1)) / 2.0;
}
public int getKthElement(int[] nums1, int[] nums2, int k) {
    int length1 = nums1.length, length2 = nums2.length;
    int index1 = 0, index2 = 0;
    while (true) {
        if (index1 == length1) return nums2[index2 + k - 1];
        if (index2 == length2) return nums1[index1 + k - 1];
        if (k == 1) return Math.min(nums1[index1], nums2[index2]);
        int half = k / 2;
        int newIndex1 = Math.min(index1 + half, length1) - 1;
        int newIndex2 = Math.min(index2 + half, length2) - 1;
        if (nums1[newIndex1] <= nums2[newIndex2]) {
            k -= (newIndex1 - index1 + 1); index1 = newIndex1 + 1;
        } else {
            k -= (newIndex2 - index2 + 1); index2 = newIndex2 + 1;
        }
    }
}`
  },
  {
    id: 'hot-96',
    title: '96. 最小覆盖子串 (Minimum Window Substring)',
    difficulty: 'Hard',
    description: '给你一个字符串 s 、一个字符串 t 。返回 s 中包含 t 所有字符的最小子串。',
    approach: '滑动窗口。维护窗口内字符频率。',
    url: 'https://leetcode.cn/problems/minimum-window-substring/',
    code: `public String minWindow(String s, String t) {
    Map<Character, Integer> need = new HashMap<>();
    for (char c : t.toCharArray()) need.put(c, need.getOrDefault(c, 0) + 1);
    int left = 0, right = 0, valid = 0, start = 0, len = Integer.MAX_VALUE;
    Map<Character, Integer> window = new HashMap<>();
    while (right < s.length()) {
        char c = s.charAt(right); right++;
        if (need.containsKey(c)) {
            window.put(c, window.getOrDefault(c, 0) + 1);
            if (window.get(c).equals(need.get(c))) valid++;
        }
        while (valid == need.size()) {
            if (right - left < len) { start = left; len = right - left; }
            char d = s.charAt(left); left++;
            if (need.containsKey(d)) {
                if (window.get(d).equals(need.get(d))) valid--;
                window.put(d, window.get(d) - 1);
            }
        }
    }
    return len == Integer.MAX_VALUE ? "" : s.substring(start, start + len);
}`
  },
  {
    id: 'hot-97',
    title: '97. 柱状图中最大的矩形 (Largest Rectangle in Histogram)',
    difficulty: 'Hard',
    description: '给定 n 个非负整数，用来表示柱状图中各个柱子的高度。',
    approach: '单调栈。',
    url: 'https://leetcode.cn/problems/largest-rectangle-in-histogram/',
    code: `public int largestRectangleArea(int[] heights) {
    int n = heights.length;
    int[] left = new int[n], right = new int[n];
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && heights[stack.peek()] >= heights[i]) stack.pop();
        left[i] = stack.isEmpty() ? -1 : stack.peek();
        stack.push(i);
    }
    stack.clear();
    for (int i = n - 1; i >= 0; i--) {
        while (!stack.isEmpty() && heights[stack.peek()] >= heights[i]) stack.pop();
        right[i] = stack.isEmpty() ? n : stack.peek();
        stack.push(i);
    }
    int maxArea = 0;
    for (int i = 0; i < n; i++) maxArea = Math.max(maxArea, heights[i] * (right[i] - left[i] - 1));
    return maxArea;
}`
  },
  {
    id: 'hot-98',
    title: '98. 滑动窗口最大值 (Sliding Window Maximum)',
    difficulty: 'Hard',
    description: '给你一个整数数组 nums，有一个大小为 k 的滑动窗口。',
    approach: '单调队列。',
    url: 'https://leetcode.cn/problems/sliding-window-maximum/',
    code: `public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    Deque<Integer> deque = new LinkedList<>();
    for (int i = 0; i < k; i++) {
        while (!deque.isEmpty() && nums[i] >= nums[deque.peekLast()]) deque.pollLast();
        deque.offerLast(i);
    }
    int[] ans = new int[n - k + 1];
    ans[0] = nums[deque.peekFirst()];
    for (int i = k; i < n; i++) {
        while (!deque.isEmpty() && nums[i] >= nums[deque.peekLast()]) deque.pollLast();
        deque.offerLast(i);
        while (deque.peekFirst() <= i - k) deque.pollFirst();
        ans[i - k + 1] = nums[deque.peekFirst()];
    }
    return ans;
}`
  },
  {
    id: 'hot-99',
    title: '99. 接雨水 (Trapping Rain Water)',
    difficulty: 'Hard',
    description: '给定 n 个非负整数表示每个宽度为 1 的柱子的高度图。',
    approach: '双指针。',
    url: 'https://leetcode.cn/problems/trapping-rain-water/',
    code: `public int trap(int[] height) {
    int ans = 0, left = 0, right = height.length - 1, leftMax = 0, rightMax = 0;
    while (left < right) {
        leftMax = Math.max(leftMax, height[left]);
        rightMax = Math.max(rightMax, height[right]);
        if (height[left] < height[right]) {
            ans += leftMax - height[left]; ++left;
        } else {
            ans += rightMax - height[right]; --right;
        }
    }
    return ans;
}`
  },
  {
    id: 'hot-100',
    title: '100. 二叉树中的最大路径和 (Binary Tree Maximum Path Sum)',
    difficulty: 'Hard',
    description: '路径 被定义为一条从树中任意节点出发。',
    approach: '递归。',
    url: 'https://leetcode.cn/problems/binary-tree-maximum-path-sum/',
    code: `int maxSum = Integer.MIN_VALUE;
public int maxPathSum(TreeNode root) {
    maxGain(root);
    return maxSum;
}
public int maxGain(TreeNode node) {
    if (node == null) return 0;
    int leftGain = Math.max(maxGain(node.left), 0);
    int rightGain = Math.max(maxGain(node.right), 0);
    int priceNewpath = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, priceNewpath);
    return node.val + Math.max(leftGain, rightGain);
}`
  }
];

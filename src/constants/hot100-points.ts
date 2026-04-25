import type { AlgorithmPoint } from './command-types';
import { ALGORITHM_POINTS, HOT_100_POINTS as LEGACY_HOT_100_POINTS } from './constants';

type OfficialHot100Group = {
  name: string;
  slugs: string[];
};

const OFFICIAL_HOT100_GROUPS: OfficialHot100Group[] = [
  { name: '哈希', slugs: ['two-sum', 'group-anagrams', 'longest-consecutive-sequence'] },
  { name: '双指针', slugs: ['move-zeroes', 'container-with-most-water', '3sum', 'trapping-rain-water'] },
  { name: '滑动窗口', slugs: ['longest-substring-without-repeating-characters', 'find-all-anagrams-in-a-string'] },
  { name: '子串', slugs: ['subarray-sum-equals-k', 'sliding-window-maximum', 'minimum-window-substring'] },
  { name: '普通数组', slugs: ['maximum-subarray', 'merge-intervals', 'rotate-array', 'product-of-array-except-self', 'first-missing-positive'] },
  { name: '矩阵', slugs: ['set-matrix-zeroes', 'spiral-matrix', 'rotate-image', 'search-a-2d-matrix-ii'] },
  { name: '链表', slugs: ['intersection-of-two-linked-lists', 'reverse-linked-list', 'palindrome-linked-list', 'linked-list-cycle', 'linked-list-cycle-ii', 'merge-two-sorted-lists', 'add-two-numbers', 'remove-nth-node-from-end-of-list', 'swap-nodes-in-pairs', 'reverse-nodes-in-k-group', 'copy-list-with-random-pointer', 'sort-list', 'merge-k-sorted-lists', 'lru-cache'] },
  { name: '二叉树', slugs: ['binary-tree-inorder-traversal', 'maximum-depth-of-binary-tree', 'invert-binary-tree', 'symmetric-tree', 'diameter-of-binary-tree', 'binary-tree-level-order-traversal', 'convert-sorted-array-to-binary-search-tree', 'validate-binary-search-tree', 'kth-smallest-element-in-a-bst', 'binary-tree-right-side-view', 'flatten-binary-tree-to-linked-list', 'construct-binary-tree-from-preorder-and-inorder-traversal', 'path-sum-iii', 'lowest-common-ancestor-of-a-binary-tree', 'binary-tree-maximum-path-sum'] },
  { name: '图论', slugs: ['number-of-islands', 'rotting-oranges', 'course-schedule', 'implement-trie-prefix-tree'] },
  { name: '回溯', slugs: ['permutations', 'subsets', 'letter-combinations-of-a-phone-number', 'combination-sum', 'generate-parentheses', 'word-search', 'palindrome-partitioning', 'n-queens'] },
  { name: '二分查找', slugs: ['search-insert-position', 'search-a-2d-matrix', 'find-first-and-last-position-of-element-in-sorted-array', 'search-in-rotated-sorted-array', 'find-minimum-in-rotated-sorted-array', 'median-of-two-sorted-arrays'] },
  { name: '栈', slugs: ['valid-parentheses', 'min-stack', 'decode-string', 'daily-temperatures', 'largest-rectangle-in-histogram'] },
  { name: '堆', slugs: ['kth-largest-element-in-an-array', 'top-k-frequent-elements', 'find-median-from-data-stream'] },
  { name: '贪心算法', slugs: ['best-time-to-buy-and-sell-stock', 'jump-game', 'jump-game-ii', 'partition-labels'] },
  { name: '动态规划', slugs: ['climbing-stairs', 'pascals-triangle', 'house-robber', 'perfect-squares', 'coin-change', 'word-break', 'longest-increasing-subsequence', 'maximum-product-subarray', 'partition-equal-subset-sum', 'longest-valid-parentheses'] },
  { name: '多维动态规划', slugs: ['unique-paths', 'minimum-path-sum', 'longest-palindromic-substring', 'longest-common-subsequence', 'edit-distance'] },
  { name: '技巧', slugs: ['single-number', 'majority-element', 'sort-colors', 'next-permutation', 'find-the-duplicate-number'] },
];

const supplementalHot100Points: Record<string, Omit<AlgorithmPoint, 'id'>> = {
  'diameter-of-binary-tree': {
    title: '二叉树的直径 (Diameter of Binary Tree)',
    difficulty: 'Easy',
    description: '给定一棵二叉树，你需要计算它的直径长度。二叉树的直径是任意两个结点路径长度中的最大值，这条路径可能不经过根结点。',
    approach: '后序遍历。对每个结点分别计算左右子树高度，并用 leftDepth + rightDepth 更新答案，最后返回当前结点高度。',
    url: 'https://leetcode.cn/problems/diameter-of-binary-tree/',
    code: `private int ans = 0;

public int diameterOfBinaryTree(TreeNode root) {
    depth(root);
    return ans;
}

private int depth(TreeNode node) {
    if (node == null) {
        return 0;
    }
    int left = depth(node.left);
    int right = depth(node.right);
    ans = Math.max(ans, left + right);
    return Math.max(left, right) + 1;
}`,
  },
  'path-sum-iii': {
    title: '路径总和 III (Path Sum III)',
    difficulty: 'Medium',
    description: '给定一个二叉树的根节点 root 和一个整数 targetSum，统计二叉树里节点值之和等于 targetSum 的路径数量。路径不需要从根节点开始，也不需要在叶子节点结束，但方向必须向下。',
    approach: '前缀和 + DFS。用哈希表记录从根到当前节点路径和出现的次数，当前前缀和减去 targetSum 的出现次数就是以当前节点结尾的合法路径数。',
    url: 'https://leetcode.cn/problems/path-sum-iii/',
    code: `private Map<Long, Integer> prefix = new HashMap<>();
private int ans = 0;
private int target;

public int pathSum(TreeNode root, int targetSum) {
    target = targetSum;
    prefix.put(0L, 1);
    dfs(root, 0L);
    return ans;
}

private void dfs(TreeNode node, long current) {
    if (node == null) {
        return;
    }
    current += node.val;
    ans += prefix.getOrDefault(current - target, 0);
    prefix.put(current, prefix.getOrDefault(current, 0) + 1);
    dfs(node.left, current);
    dfs(node.right, current);
    prefix.put(current, prefix.get(current) - 1);
}`,
  },
  'top-k-frequent-elements': {
    title: '前 K 个高频元素 (Top K Frequent Elements)',
    difficulty: 'Medium',
    description: '给你一个整数数组 nums 和一个整数 k，请你返回其中出现频率前 k 高的元素。你可以按任意顺序返回答案。',
    approach: '先用哈希表统计频次，再维护一个大小为 k 的最小堆。遍历频次表时，堆顶始终保存当前第 k 高频次，最后把堆中元素取出即可。',
    url: 'https://leetcode.cn/problems/top-k-frequent-elements/',
    code: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int num : nums) {
        count.put(num, count.getOrDefault(num, 0) + 1);
    }

    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    for (Map.Entry<Integer, Integer> entry : count.entrySet()) {
        heap.offer(new int[] {entry.getKey(), entry.getValue()});
        if (heap.size() > k) {
            heap.poll();
        }
    }

    int[] ans = new int[k];
    for (int i = k - 1; i >= 0; i--) {
        ans[i] = heap.poll()[0];
    }
    return ans;
}`,
  },
  'find-median-from-data-stream': {
    title: '数据流的中位数 (Find Median from Data Stream)',
    difficulty: 'Hard',
    description: '中位数是有序整数列表中的中间值。请你设计一个支持以下两种操作的数据结构：`addNum(int num)` 添加一个整数到数据流中，`findMedian()` 返回当前数据流的中位数。',
    approach: '使用两个堆维护左右两半数据。大顶堆保存较小的一半，小顶堆保存较大的一半，并保持两个堆的大小差不超过 1，这样就能在 O(log n) 插入、O(1) 查询中位数。',
    url: 'https://leetcode.cn/problems/find-median-from-data-stream/',
    code: `class MedianFinder {
    private PriorityQueue<Integer> small;
    private PriorityQueue<Integer> large;

    public MedianFinder() {
        small = new PriorityQueue<>((a, b) -> b - a);
        large = new PriorityQueue<>();
    }

    public void addNum(int num) {
        if (small.isEmpty() || num <= small.peek()) {
            small.offer(num);
        } else {
            large.offer(num);
        }

        if (small.size() > large.size() + 1) {
            large.offer(small.poll());
        } else if (large.size() > small.size()) {
            small.offer(large.poll());
        }
    }

    public double findMedian() {
        if (small.size() > large.size()) {
            return small.peek();
        }
        return (small.peek() + large.peek()) / 2.0;
    }
}`,
  },
};

function slugFromUrl(url?: string) {
  return url?.split('/problems/')[1]?.split('/')[0] ?? '';
}

function stripIndexPrefix(title: string) {
  return title.replace(/^\d+\.\s*/, '');
}

function toDifficultyLabel(value: AlgorithmPoint['difficulty'] | undefined) {
  return value ?? 'Medium';
}

function buildBasePointMap() {
  const map = new Map<string, Omit<AlgorithmPoint, 'id'>>();

  for (const point of LEGACY_HOT_100_POINTS) {
    const slug = slugFromUrl(point.url);
    if (!slug || map.has(slug)) {
      continue;
    }
    map.set(slug, {
      title: stripIndexPrefix(point.title),
      difficulty: point.difficulty,
      description: point.description,
      approach: point.approach,
      code: point.code,
      url: point.url,
      slug,
    });
  }

  for (const point of ALGORITHM_POINTS) {
    const slug = slugFromUrl(point.url);
    if (!slug || map.has(slug)) {
      continue;
    }
    map.set(slug, {
      title: stripIndexPrefix(point.title),
      difficulty: point.difficulty,
      description: point.description,
      approach: point.approach,
      code: point.code,
      url: point.url,
      slug,
    });
  }

  for (const [slug, point] of Object.entries(supplementalHot100Points)) {
    if (!map.has(slug)) {
      map.set(slug, { ...point, slug });
    }
  }

  return map;
}

const basePointMap = buildBasePointMap();

export const HOT_100_POINTS: AlgorithmPoint[] = OFFICIAL_HOT100_GROUPS.flatMap((group) =>
  group.slugs.map((slug) => {
    const base = basePointMap.get(slug);

    if (!base) {
      throw new Error(`Missing Hot100 base point for slug: ${slug}`);
    }

    return {
      id: `hot100-${slug}`,
      title: stripIndexPrefix(base.title),
      difficulty: toDifficultyLabel(base.difficulty),
      description: base.description,
      approach: base.approach,
      code: base.code,
      url: base.url ?? `https://leetcode.cn/problems/${slug}/`,
      group: group.name,
      slug,
    };
  }),
);

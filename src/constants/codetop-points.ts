import type { AlgorithmPoint } from './command-types';
import { ALGORITHM_POINTS as LEGACY_CODETOP_50 } from './constants';
import { HOT_100_POINTS } from './hot100-points';

const CODETOP_EXTRA_SLUGS = [
  'longest-consecutive-sequence',
  'move-zeroes',
  'container-with-most-water',
  'find-all-anagrams-in-a-string',
  'subarray-sum-equals-k',
  'minimum-window-substring',
  'rotate-array',
  'product-of-array-except-self',
  'first-missing-positive',
  'set-matrix-zeroes',
  'search-a-2d-matrix-ii',
  'linked-list-cycle',
  'linked-list-cycle-ii',
  'swap-nodes-in-pairs',
  'sort-colors',
  'maximum-depth-of-binary-tree',
  'invert-binary-tree',
  'diameter-of-binary-tree',
  'convert-sorted-array-to-binary-search-tree',
  'validate-binary-search-tree',
  'kth-smallest-element-in-a-bst',
  'flatten-binary-tree-to-linked-list',
  'construct-binary-tree-from-preorder-and-inorder-traversal',
  'path-sum-iii',
  'binary-tree-maximum-path-sum',
  'rotting-oranges',
  'course-schedule',
  'implement-trie-prefix-tree',
  'letter-combinations-of-a-phone-number',
  'generate-parentheses',
  'palindrome-partitioning',
  'n-queens',
  'search-insert-position',
  'search-a-2d-matrix',
  'find-first-and-last-position-of-element-in-sorted-array',
  'find-minimum-in-rotated-sorted-array',
  'decode-string',
  'daily-temperatures',
  'largest-rectangle-in-histogram',
  'top-k-frequent-elements',
  'find-median-from-data-stream',
  'jump-game',
  'jump-game-ii',
  'partition-labels',
  'pascals-triangle',
  'house-robber',
  'perfect-squares',
  'word-break',
  'longest-increasing-subsequence',
  'maximum-product-subarray',
] as const;

function slugFromUrl(url?: string) {
  return url?.split('/problems/')[1]?.split('/')[0] ?? '';
}

function stripIndexPrefix(title: string) {
  return title.replace(/^\d+\.\s*/, '');
}

const hotPointMap = new Map<string, AlgorithmPoint>();
for (const point of HOT_100_POINTS) {
  const slug = point.slug ?? slugFromUrl(point.url);
  if (!slug || hotPointMap.has(slug)) {
    continue;
  }
  hotPointMap.set(slug, point);
}

const extraPoints: AlgorithmPoint[] = CODETOP_EXTRA_SLUGS.map((slug, index) => {
  const base = hotPointMap.get(slug);

  if (!base) {
    throw new Error(`Missing CodeTop extra point for slug: ${slug}`);
  }

  return {
    id: `algo-${LEGACY_CODETOP_50.length + index + 1}`,
    title: `${LEGACY_CODETOP_50.length + index + 1}. ${stripIndexPrefix(base.title)}`,
    difficulty: base.difficulty,
    description: base.description,
    approach: base.approach,
    code: base.code,
    url: base.url,
    slug,
  };
});

export const ALGORITHM_POINTS: AlgorithmPoint[] = [...LEGACY_CODETOP_50, ...extraPoints];

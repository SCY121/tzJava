import type { AlgorithmPoint } from '../constants';

const PYTHON_IMPORTS = `from bisect import bisect_left
from collections import Counter, defaultdict, deque
from heapq import heappop, heappush
from typing import List, Optional`;

const PYTHON_SOLUTIONS: Record<string, string> = {
  'lru-cache': `class Node:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node: Node) -> None:
        node.prev.next = node.next
        node.next.prev = node.prev

    def _insert_first(self, node: Node) -> None:
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._insert_first(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._insert_first(node)
        if len(self.cache) > self.capacity:
            last = self.tail.prev
            self._remove(last)
            del self.cache[last.key]`,

  'reverse-linked-list': `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev, current = None, head
        while current:
            next_node = current.next
            current.next = prev
            prev, current = current, next_node
        return prev`,

  '3sum': `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()
        answer = []
        for i in range(len(nums) - 2):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            left, right = i + 1, len(nums) - 1
            while left < right:
                total = nums[i] + nums[left] + nums[right]
                if total < 0:
                    left += 1
                elif total > 0:
                    right -= 1
                else:
                    answer.append([nums[i], nums[left], nums[right]])
                    left += 1
                    right -= 1
                    while left < right and nums[left] == nums[left - 1]:
                        left += 1
                    while left < right and nums[right] == nums[right + 1]:
                        right -= 1
        return answer`,

  'kth-largest-element-in-an-array': `class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        target = len(nums) - k

        def quick_select(left: int, right: int) -> int:
            pivot = nums[right]
            store = left
            for i in range(left, right):
                if nums[i] <= pivot:
                    nums[store], nums[i] = nums[i], nums[store]
                    store += 1
            nums[store], nums[right] = nums[right], nums[store]
            if store == target:
                return nums[store]
            if store < target:
                return quick_select(store + 1, right)
            return quick_select(left, store - 1)

        return quick_select(0, len(nums) - 1)`,

  'binary-tree-zigzag-level-order-traversal': `class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        queue = deque([root])
        answer = []
        left_to_right = True
        while queue:
            level = deque()
            for _ in range(len(queue)):
                node = queue.popleft()
                if left_to_right:
                    level.append(node.val)
                else:
                    level.appendleft(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            answer.append(list(level))
            left_to_right = not left_to_right
        return answer`,

  'merge-intervals': `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        intervals.sort(key=lambda item: item[0])
        answer = []
        for start, end in intervals:
            if not answer or start > answer[-1][1]:
                answer.append([start, end])
            else:
                answer[-1][1] = max(answer[-1][1], end)
        return answer`,

  'longest-substring-without-repeating-characters': `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last_seen = {}
        left = answer = 0
        for right, char in enumerate(s):
            if char in last_seen and last_seen[char] >= left:
                left = last_seen[char] + 1
            last_seen[char] = right
            answer = max(answer, right - left + 1)
        return answer`,

  'two-sum': `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for index, num in enumerate(nums):
            if target - num in seen:
                return [seen[target - num], index]
            seen[num] = index
        return []`,

  'binary-tree-level-order-traversal': `class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        queue = deque([root])
        answer = []
        while queue:
            level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            answer.append(level)
        return answer`,

  'valid-parentheses': `class Solution:
    def isValid(self, s: str) -> bool:
        pairs = {')': '(', ']': '[', '}': '{'}
        stack = []
        for char in s:
            if char in pairs:
                if not stack or stack.pop() != pairs[char]:
                    return False
            else:
                stack.append(char)
        return not stack`,

  'maximum-subarray': `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        current = answer = nums[0]
        for num in nums[1:]:
            current = max(num, current + num)
            answer = max(answer, current)
        return answer`,

  'best-time-to-buy-and-sell-stock': `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        answer = 0
        for price in prices:
            min_price = min(min_price, price)
            answer = max(answer, price - min_price)
        return answer`,

  'lowest-common-ancestor-of-a-binary-tree': `class Solution:
    def lowestCommonAncestor(
        self, root: TreeNode, p: TreeNode, q: TreeNode
    ) -> TreeNode:
        if not root or root is p or root is q:
            return root
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        if left and right:
            return root
        return left or right`,

  'spiral-matrix': `class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        answer = []
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1
        while top <= bottom and left <= right:
            answer.extend(matrix[top][left:right + 1])
            top += 1
            for row in range(top, bottom + 1):
                answer.append(matrix[row][right])
            right -= 1
            if top <= bottom:
                answer.extend(reversed(matrix[bottom][left:right + 1]))
                bottom -= 1
            if left <= right:
                for row in range(bottom, top - 1, -1):
                    answer.append(matrix[row][left])
                left += 1
        return answer`,

  'merge-two-sorted-lists': `class Solution:
    def mergeTwoLists(
        self, list1: Optional[ListNode], list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        dummy = tail = ListNode()
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next, list1 = list1, list1.next
            else:
                tail.next, list2 = list2, list2.next
            tail = tail.next
        tail.next = list1 or list2
        return dummy.next`,

  'search-in-rotated-sorted-array': `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[left] <= nums[mid]:
                if nums[left] <= target < nums[mid]:
                    right = mid - 1
                else:
                    left = mid + 1
            else:
                if nums[mid] < target <= nums[right]:
                    left = mid + 1
                else:
                    right = mid - 1
        return -1`,

  'longest-palindromic-substring': `class Solution:
    def longestPalindrome(self, s: str) -> str:
        start = end = 0

        def expand(left: int, right: int) -> tuple[int, int]:
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            return left + 1, right - 1

        for i in range(len(s)):
            left1, right1 = expand(i, i)
            left2, right2 = expand(i, i + 1)
            if right1 - left1 > end - start:
                start, end = left1, right1
            if right2 - left2 > end - start:
                start, end = left2, right2
        return s[start:end + 1]`,

  'intersection-of-two-linked-lists': `class Solution:
    def getIntersectionNode(
        self, headA: ListNode, headB: ListNode
    ) -> Optional[ListNode]:
        first, second = headA, headB
        while first is not second:
            first = first.next if first else headB
            second = second.next if second else headA
        return first`,

  'reorder-list': `class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        if not head or not head.next:
            return
        slow = fast = head
        while fast.next and fast.next.next:
            slow = slow.next
            fast = fast.next.next

        current, slow.next = slow.next, None
        previous = None
        while current:
            next_node = current.next
            current.next = previous
            previous, current = current, next_node

        first, second = head, previous
        while second:
            next_first, next_second = first.next, second.next
            first.next = second
            second.next = next_first
            first, second = next_first, next_second`,

  'binary-tree-inorder-traversal': `class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        answer, stack = [], []
        current = root
        while current or stack:
            while current:
                stack.append(current)
                current = current.left
            current = stack.pop()
            answer.append(current.val)
            current = current.right
        return answer`,

  'reverse-nodes-in-k-group': `class Solution:
    def reverseKGroup(
        self, head: Optional[ListNode], k: int
    ) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        group_prev = dummy
        while True:
            kth = group_prev
            for _ in range(k):
                kth = kth.next
                if not kth:
                    return dummy.next
            group_next = kth.next
            previous, current = group_next, group_prev.next
            while current is not group_next:
                next_node = current.next
                current.next = previous
                previous, current = current, next_node
            old_start = group_prev.next
            group_prev.next = kth
            group_prev = old_start`,

  'permutations': `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        answer = []

        def backtrack(first: int) -> None:
            if first == len(nums):
                answer.append(nums[:])
                return
            for i in range(first, len(nums)):
                nums[first], nums[i] = nums[i], nums[first]
                backtrack(first + 1)
                nums[first], nums[i] = nums[i], nums[first]

        backtrack(0)
        return answer`,

  'path-sum-ii': `class Solution:
    def pathSum(
        self, root: Optional[TreeNode], targetSum: int
    ) -> List[List[int]]:
        answer, path = [], []

        def dfs(node: Optional[TreeNode], remaining: int) -> None:
            if not node:
                return
            path.append(node.val)
            remaining -= node.val
            if not node.left and not node.right and remaining == 0:
                answer.append(path[:])
            else:
                dfs(node.left, remaining)
                dfs(node.right, remaining)
            path.pop()

        dfs(root, targetSum)
        return answer`,

  'binary-tree-right-side-view': `class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        answer = []

        def dfs(node: Optional[TreeNode], depth: int) -> None:
            if not node:
                return
            if depth == len(answer):
                answer.append(node.val)
            dfs(node.right, depth + 1)
            dfs(node.left, depth + 1)

        dfs(root, 0)
        return answer`,

  'climbing-stairs': `class Solution:
    def climbStairs(self, n: int) -> int:
        previous, current = 0, 1
        for _ in range(n):
            previous, current = current, previous + current
        return current`,

  'add-two-numbers': `class Solution:
    def addTwoNumbers(
        self, l1: Optional[ListNode], l2: Optional[ListNode]
    ) -> Optional[ListNode]:
        dummy = tail = ListNode()
        carry = 0
        while l1 or l2 or carry:
            total = carry
            if l1:
                total += l1.val
                l1 = l1.next
            if l2:
                total += l2.val
                l2 = l2.next
            carry, digit = divmod(total, 10)
            tail.next = ListNode(digit)
            tail = tail.next
        return dummy.next`,

  'sort-list': `class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head
        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        middle, slow.next = slow.next, None
        left = self.sortList(head)
        right = self.sortList(middle)
        dummy = tail = ListNode()
        while left and right:
            if left.val <= right.val:
                tail.next, left = left, left.next
            else:
                tail.next, right = right, right.next
            tail = tail.next
        tail.next = left or right
        return dummy.next`,

  'binary-search': `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums) - 1
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
        return -1`,

  'balanced-binary-tree': `class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def height(node: Optional[TreeNode]) -> int:
            if not node:
                return 0
            left = height(node.left)
            if left == -1:
                return -1
            right = height(node.right)
            if right == -1 or abs(left - right) > 1:
                return -1
            return max(left, right) + 1

        return height(root) != -1`,

  'binary-tree-postorder-traversal': `class Solution:
    def postorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        answer = []

        def dfs(node: Optional[TreeNode]) -> None:
            if not node:
                return
            dfs(node.left)
            dfs(node.right)
            answer.append(node.val)

        dfs(root)
        return answer`,

  'symmetric-tree': `class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        def mirror(left: Optional[TreeNode], right: Optional[TreeNode]) -> bool:
            if not left or not right:
                return left is right
            return (
                left.val == right.val
                and mirror(left.left, right.right)
                and mirror(left.right, right.left)
            )

        return not root or mirror(root.left, root.right)`,

  'subsets': `class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        answer = [[]]
        for num in nums:
            answer += [subset + [num] for subset in answer]
        return answer`,

  'combination-sum': `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        candidates.sort()
        answer, path = [], []

        def backtrack(start: int, remaining: int) -> None:
            if remaining == 0:
                answer.append(path[:])
                return
            for i in range(start, len(candidates)):
                value = candidates[i]
                if value > remaining:
                    break
                path.append(value)
                backtrack(i, remaining - value)
                path.pop()

        backtrack(0, target)
        return answer`,

  'word-search': `class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        rows, cols = len(board), len(board[0])

        def dfs(row: int, col: int, index: int) -> bool:
            if index == len(word):
                return True
            if not (0 <= row < rows and 0 <= col < cols):
                return False
            if board[row][col] != word[index]:
                return False
            char = board[row][col]
            board[row][col] = '#'
            found = (
                dfs(row + 1, col, index + 1)
                or dfs(row - 1, col, index + 1)
                or dfs(row, col + 1, index + 1)
                or dfs(row, col - 1, index + 1)
            )
            board[row][col] = char
            return found

        return any(dfs(r, c, 0) for r in range(rows) for c in range(cols))`,

  'number-of-islands': `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        rows, cols = len(grid), len(grid[0])

        def sink(row: int, col: int) -> None:
            if not (0 <= row < rows and 0 <= col < cols):
                return
            if grid[row][col] != '1':
                return
            grid[row][col] = '0'
            sink(row + 1, col)
            sink(row - 1, col)
            sink(row, col + 1)
            sink(row, col - 1)

        answer = 0
        for row in range(rows):
            for col in range(cols):
                if grid[row][col] == '1':
                    answer += 1
                    sink(row, col)
        return answer`,

  'longest-common-subsequence': `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = [0] * (len(text2) + 1)
        for char1 in text1:
            previous = 0
            for j, char2 in enumerate(text2, 1):
                saved = dp[j]
                if char1 == char2:
                    dp[j] = previous + 1
                else:
                    dp[j] = max(dp[j], dp[j - 1])
                previous = saved
        return dp[-1]`,

  'edit-distance': `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        dp = list(range(len(word2) + 1))
        for i, char1 in enumerate(word1, 1):
            previous = dp[0]
            dp[0] = i
            for j, char2 in enumerate(word2, 1):
                saved = dp[j]
                if char1 == char2:
                    dp[j] = previous
                else:
                    dp[j] = 1 + min(previous, dp[j], dp[j - 1])
                previous = saved
        return dp[-1]`,

  'coin-change': `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0
        for value in range(1, amount + 1):
            for coin in coins:
                if coin <= value:
                    dp[value] = min(dp[value], dp[value - coin] + 1)
        return -1 if dp[amount] > amount else dp[amount]`,

  'trapping-rain-water': `class Solution:
    def trap(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        left_max = right_max = answer = 0
        while left < right:
            if height[left] < height[right]:
                left_max = max(left_max, height[left])
                answer += left_max - height[left]
                left += 1
            else:
                right_max = max(right_max, height[right])
                answer += right_max - height[right]
                right -= 1
        return answer`,

  'merge-k-sorted-lists': `class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        heap = []
        for index, node in enumerate(lists):
            if node:
                heappush(heap, (node.val, index, node))
        dummy = tail = ListNode()
        while heap:
            _, index, node = heappop(heap)
            tail.next = node
            tail = tail.next
            if node.next:
                heappush(heap, (node.next.val, index, node.next))
        return dummy.next`,

  'median-of-two-sorted-arrays': `class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
        m, n = len(nums1), len(nums2)
        left, right = 0, m
        half = (m + n + 1) // 2
        while left <= right:
            i = (left + right) // 2
            j = half - i
            left1 = float('-inf') if i == 0 else nums1[i - 1]
            right1 = float('inf') if i == m else nums1[i]
            left2 = float('-inf') if j == 0 else nums2[j - 1]
            right2 = float('inf') if j == n else nums2[j]
            if left1 <= right2 and left2 <= right1:
                if (m + n) % 2:
                    return float(max(left1, left2))
                return (max(left1, left2) + min(right1, right2)) / 2
            if left1 > right2:
                right = i - 1
            else:
                left = i + 1
        return 0.0`,

  'sliding-window-maximum': `class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        queue = deque()
        answer = []
        for right, num in enumerate(nums):
            while queue and nums[queue[-1]] <= num:
                queue.pop()
            queue.append(right)
            if queue[0] <= right - k:
                queue.popleft()
            if right >= k - 1:
                answer.append(nums[queue[0]])
        return answer`,

  'next-permutation': `class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        pivot = len(nums) - 2
        while pivot >= 0 and nums[pivot] >= nums[pivot + 1]:
            pivot -= 1
        if pivot >= 0:
            successor = len(nums) - 1
            while nums[successor] <= nums[pivot]:
                successor -= 1
            nums[pivot], nums[successor] = nums[successor], nums[pivot]
        nums[pivot + 1:] = reversed(nums[pivot + 1:])`,

  'rotate-image': `class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        size = len(matrix)
        for row in range(size):
            for col in range(row + 1, size):
                matrix[row][col], matrix[col][row] = matrix[col][row], matrix[row][col]
        for row in matrix:
            row.reverse()`,

  'group-anagrams': `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = defaultdict(list)
        for word in strs:
            groups[tuple(sorted(word))].append(word)
        return list(groups.values())`,

  'valid-palindrome': `class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True`,

  'min-stack': `class MinStack:
    def __init__(self):
        self.stack = []

    def push(self, val: int) -> None:
        current_min = val if not self.stack else min(val, self.stack[-1][1])
        self.stack.append((val, current_min))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]`,

  'implement-queue-using-stacks': `class MyQueue:
    def __init__(self):
        self.input_stack = []
        self.output_stack = []

    def _move(self) -> None:
        if not self.output_stack:
            while self.input_stack:
                self.output_stack.append(self.input_stack.pop())

    def push(self, x: int) -> None:
        self.input_stack.append(x)

    def pop(self) -> int:
        self._move()
        return self.output_stack.pop()

    def peek(self) -> int:
        self._move()
        return self.output_stack[-1]

    def empty(self) -> bool:
        return not self.input_stack and not self.output_stack`,

  'remove-nth-node-from-end-of-list': `class Solution:
    def removeNthFromEnd(
        self, head: Optional[ListNode], n: int
    ) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        fast = slow = dummy
        for _ in range(n):
            fast = fast.next
        while fast.next:
            fast = fast.next
            slow = slow.next
        slow.next = slow.next.next
        return dummy.next`,

  'palindrome-linked-list': `class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        previous = None
        while slow:
            next_node = slow.next
            slow.next = previous
            previous, slow = slow, next_node
        left, right = head, previous
        while right:
            if left.val != right.val:
                return False
            left, right = left.next, right.next
        return True`,

  'longest-consecutive-sequence': `class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        values = set(nums)
        answer = 0
        for value in values:
            if value - 1 not in values:
                current = value
                while current in values:
                    current += 1
                answer = max(answer, current - value)
        return answer`,

  'move-zeroes': `class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        insert = 0
        for index, value in enumerate(nums):
            if value != 0:
                nums[insert], nums[index] = nums[index], nums[insert]
                insert += 1`,

  'container-with-most-water': `class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        answer = 0
        while left < right:
            answer = max(answer, min(height[left], height[right]) * (right - left))
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return answer`,

  'find-all-anagrams-in-a-string': `class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        if len(p) > len(s):
            return []
        need = Counter(p)
        window = Counter(s[:len(p)])
        answer = [0] if window == need else []
        for right in range(len(p), len(s)):
            window[s[right]] += 1
            left_char = s[right - len(p)]
            window[left_char] -= 1
            if window[left_char] == 0:
                del window[left_char]
            if window == need:
                answer.append(right - len(p) + 1)
        return answer`,

  'subarray-sum-equals-k': `class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        frequencies = {0: 1}
        prefix = answer = 0
        for num in nums:
            prefix += num
            answer += frequencies.get(prefix - k, 0)
            frequencies[prefix] = frequencies.get(prefix, 0) + 1
        return answer`,

  'minimum-window-substring': `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not t:
            return ''
        need = Counter(t)
        missing = len(t)
        left = start = end = 0
        for right, char in enumerate(s, 1):
            if need[char] > 0:
                missing -= 1
            need[char] -= 1
            if missing == 0:
                while left < right and need[s[left]] < 0:
                    need[s[left]] += 1
                    left += 1
                if end == 0 or right - left < end - start:
                    start, end = left, right
                need[s[left]] += 1
                missing += 1
                left += 1
        return s[start:end]`,

  'rotate-array': `class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        k %= len(nums)

        def reverse(left: int, right: int) -> None:
            while left < right:
                nums[left], nums[right] = nums[right], nums[left]
                left += 1
                right -= 1

        reverse(0, len(nums) - 1)
        reverse(0, k - 1)
        reverse(k, len(nums) - 1)`,

  'product-of-array-except-self': `class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        answer = [1] * len(nums)
        prefix = 1
        for i, num in enumerate(nums):
            answer[i] = prefix
            prefix *= num
        suffix = 1
        for i in range(len(nums) - 1, -1, -1):
            answer[i] *= suffix
            suffix *= nums[i]
        return answer`,

  'first-missing-positive': `class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        size = len(nums)
        for i in range(size):
            while 1 <= nums[i] <= size and nums[nums[i] - 1] != nums[i]:
                target = nums[i] - 1
                nums[i], nums[target] = nums[target], nums[i]
        for i, value in enumerate(nums, 1):
            if value != i:
                return i
        return size + 1`,

  'set-matrix-zeroes': `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        rows, cols = len(matrix), len(matrix[0])
        first_row = any(matrix[0][col] == 0 for col in range(cols))
        first_col = any(matrix[row][0] == 0 for row in range(rows))
        for row in range(1, rows):
            for col in range(1, cols):
                if matrix[row][col] == 0:
                    matrix[row][0] = matrix[0][col] = 0
        for row in range(1, rows):
            for col in range(1, cols):
                if matrix[row][0] == 0 or matrix[0][col] == 0:
                    matrix[row][col] = 0
        if first_row:
            for col in range(cols):
                matrix[0][col] = 0
        if first_col:
            for row in range(rows):
                matrix[row][0] = 0`,

  'search-a-2d-matrix-ii': `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        row, col = 0, len(matrix[0]) - 1
        while row < len(matrix) and col >= 0:
            if matrix[row][col] == target:
                return True
            if matrix[row][col] > target:
                col -= 1
            else:
                row += 1
        return False`,

  'linked-list-cycle': `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                return True
        return False`,

  'linked-list-cycle-ii': `class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                pointer = head
                while pointer is not slow:
                    pointer = pointer.next
                    slow = slow.next
                return pointer
        return None`,

  'swap-nodes-in-pairs': `class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        previous = dummy
        while previous.next and previous.next.next:
            first = previous.next
            second = first.next
            first.next = second.next
            second.next = first
            previous.next = second
            previous = first
        return dummy.next`,

  'sort-colors': `class Solution:
    def sortColors(self, nums: List[int]) -> None:
        low = current = 0
        high = len(nums) - 1
        while current <= high:
            if nums[current] == 0:
                nums[low], nums[current] = nums[current], nums[low]
                low += 1
                current += 1
            elif nums[current] == 2:
                nums[current], nums[high] = nums[high], nums[current]
                high -= 1
            else:
                current += 1`,

  'maximum-depth-of-binary-tree': `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return max(self.maxDepth(root.left), self.maxDepth(root.right)) + 1`,

  'invert-binary-tree': `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`,

  'diameter-of-binary-tree': `class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        answer = 0

        def depth(node: Optional[TreeNode]) -> int:
            nonlocal answer
            if not node:
                return 0
            left = depth(node.left)
            right = depth(node.right)
            answer = max(answer, left + right)
            return max(left, right) + 1

        depth(root)
        return answer`,

  'convert-sorted-array-to-binary-search-tree': `class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        def build(left: int, right: int) -> Optional[TreeNode]:
            if left > right:
                return None
            mid = (left + right) // 2
            root = TreeNode(nums[mid])
            root.left = build(left, mid - 1)
            root.right = build(mid + 1, right)
            return root

        return build(0, len(nums) - 1)`,

  'validate-binary-search-tree': `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def validate(node: Optional[TreeNode], low: float, high: float) -> bool:
            if not node:
                return True
            if not low < node.val < high:
                return False
            return validate(node.left, low, node.val) and validate(node.right, node.val, high)

        return validate(root, float('-inf'), float('inf'))`,

  'kth-smallest-element-in-a-bst': `class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        current = root
        while True:
            while current:
                stack.append(current)
                current = current.left
            current = stack.pop()
            k -= 1
            if k == 0:
                return current.val
            current = current.right`,

  'flatten-binary-tree-to-linked-list': `class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        current = root
        while current:
            if current.left:
                predecessor = current.left
                while predecessor.right:
                    predecessor = predecessor.right
                predecessor.right = current.right
                current.right = current.left
                current.left = None
            current = current.right`,

  'construct-binary-tree-from-preorder-and-inorder-traversal': `class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        positions = {value: index for index, value in enumerate(inorder)}
        preorder_index = 0

        def build(left: int, right: int) -> Optional[TreeNode]:
            nonlocal preorder_index
            if left > right:
                return None
            value = preorder[preorder_index]
            preorder_index += 1
            root = TreeNode(value)
            middle = positions[value]
            root.left = build(left, middle - 1)
            root.right = build(middle + 1, right)
            return root

        return build(0, len(inorder) - 1)`,

  'path-sum-iii': `class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        prefix = {0: 1}

        def dfs(node: Optional[TreeNode], current: int) -> int:
            if not node:
                return 0
            current += node.val
            answer = prefix.get(current - targetSum, 0)
            prefix[current] = prefix.get(current, 0) + 1
            answer += dfs(node.left, current)
            answer += dfs(node.right, current)
            prefix[current] -= 1
            return answer

        return dfs(root, 0)`,

  'binary-tree-maximum-path-sum': `class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        answer = float('-inf')

        def gain(node: Optional[TreeNode]) -> int:
            nonlocal answer
            if not node:
                return 0
            left = max(gain(node.left), 0)
            right = max(gain(node.right), 0)
            answer = max(answer, node.val + left + right)
            return node.val + max(left, right)

        gain(root)
        return answer`,

  'rotting-oranges': `class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        queue = deque()
        fresh = 0
        for row in range(len(grid)):
            for col in range(len(grid[0])):
                if grid[row][col] == 2:
                    queue.append((row, col))
                elif grid[row][col] == 1:
                    fresh += 1
        minutes = 0
        while queue and fresh:
            for _ in range(len(queue)):
                row, col = queue.popleft()
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = row + dr, col + dc
                    if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        queue.append((nr, nc))
            minutes += 1
        return minutes if fresh == 0 else -1`,

  'course-schedule': `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for course, prerequisite in prerequisites:
            graph[prerequisite].append(course)
            indegree[course] += 1
        queue = deque(index for index, degree in enumerate(indegree) if degree == 0)
        completed = 0
        while queue:
            course = queue.popleft()
            completed += 1
            for next_course in graph[course]:
                indegree[next_course] -= 1
                if indegree[next_course] == 0:
                    queue.append(next_course)
        return completed == numCourses`,

  'implement-trie-prefix-tree': `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            node = node.children.setdefault(char, TrieNode())
        node.is_word = True

    def _find(self, prefix: str) -> Optional[TrieNode]:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

    def search(self, word: str) -> bool:
        node = self._find(word)
        return bool(node and node.is_word)

    def startsWith(self, prefix: str) -> bool:
        return self._find(prefix) is not None`,

  'letter-combinations-of-a-phone-number': `class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        if not digits:
            return []
        letters = {
            '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
            '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
        }
        answer = []

        def backtrack(index: int, path: List[str]) -> None:
            if index == len(digits):
                answer.append(''.join(path))
                return
            for char in letters[digits[index]]:
                path.append(char)
                backtrack(index + 1, path)
                path.pop()

        backtrack(0, [])
        return answer`,

  'generate-parentheses': `class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        answer = []

        def backtrack(path: List[str], opened: int, closed: int) -> None:
            if len(path) == 2 * n:
                answer.append(''.join(path))
                return
            if opened < n:
                path.append('(')
                backtrack(path, opened + 1, closed)
                path.pop()
            if closed < opened:
                path.append(')')
                backtrack(path, opened, closed + 1)
                path.pop()

        backtrack([], 0, 0)
        return answer`,

  'palindrome-partitioning': `class Solution:
    def partition(self, s: str) -> List[List[str]]:
        answer, path = [], []

        def backtrack(start: int) -> None:
            if start == len(s):
                answer.append(path[:])
                return
            for end in range(start + 1, len(s) + 1):
                part = s[start:end]
                if part == part[::-1]:
                    path.append(part)
                    backtrack(end)
                    path.pop()

        backtrack(0)
        return answer`,

  'n-queens': `class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        answer = []
        columns, diagonals, anti_diagonals = set(), set(), set()
        queens = [-1] * n

        def backtrack(row: int) -> None:
            if row == n:
                answer.append([
                    '.' * col + 'Q' + '.' * (n - col - 1)
                    for col in queens
                ])
                return
            for col in range(n):
                if col in columns or row - col in diagonals or row + col in anti_diagonals:
                    continue
                queens[row] = col
                columns.add(col)
                diagonals.add(row - col)
                anti_diagonals.add(row + col)
                backtrack(row + 1)
                columns.remove(col)
                diagonals.remove(row - col)
                anti_diagonals.remove(row + col)

        backtrack(0)
        return answer`,

  'search-insert-position': `class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid
        return left`,

  'search-a-2d-matrix': `class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        rows, cols = len(matrix), len(matrix[0])
        left, right = 0, rows * cols - 1
        while left <= right:
            mid = (left + right) // 2
            value = matrix[mid // cols][mid % cols]
            if value == target:
                return True
            if value < target:
                left = mid + 1
            else:
                right = mid - 1
        return False`,

  'find-first-and-last-position-of-element-in-sorted-array': `class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def lower_bound(value: int) -> int:
            left, right = 0, len(nums)
            while left < right:
                mid = (left + right) // 2
                if nums[mid] < value:
                    left = mid + 1
                else:
                    right = mid
            return left

        start = lower_bound(target)
        if start == len(nums) or nums[start] != target:
            return [-1, -1]
        return [start, lower_bound(target + 1) - 1]`,

  'find-minimum-in-rotated-sorted-array': `class Solution:
    def findMin(self, nums: List[int]) -> int:
        left, right = 0, len(nums) - 1
        while left < right:
            mid = (left + right) // 2
            if nums[mid] > nums[right]:
                left = mid + 1
            else:
                right = mid
        return nums[left]`,

  'decode-string': `class Solution:
    def decodeString(self, s: str) -> str:
        stack = []
        current = []
        number = 0
        for char in s:
            if char.isdigit():
                number = number * 10 + int(char)
            elif char == '[':
                stack.append((current, number))
                current, number = [], 0
            elif char == ']':
                previous, repeat = stack.pop()
                current = previous + current * repeat
            else:
                current.append(char)
        return ''.join(current)`,

  'daily-temperatures': `class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        answer = [0] * len(temperatures)
        stack = []
        for index, temperature in enumerate(temperatures):
            while stack and temperatures[stack[-1]] < temperature:
                previous = stack.pop()
                answer[previous] = index - previous
            stack.append(index)
        return answer`,

  'largest-rectangle-in-histogram': `class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        stack = []
        answer = 0
        for index, height in enumerate(heights + [0]):
            start = index
            while stack and stack[-1][1] > height:
                position, previous_height = stack.pop()
                answer = max(answer, previous_height * (index - position))
                start = position
            stack.append((start, height))
        return answer`,

  'top-k-frequent-elements': `class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        frequencies = Counter(nums)
        return [value for value, _ in frequencies.most_common(k)]`,

  'find-median-from-data-stream': `class MedianFinder:
    def __init__(self):
        self.small = []
        self.large = []

    def addNum(self, num: int) -> None:
        heappush(self.small, -num)
        heappush(self.large, -heappop(self.small))
        if len(self.large) > len(self.small):
            heappush(self.small, -heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2`,

  'jump-game': `class Solution:
    def canJump(self, nums: List[int]) -> bool:
        farthest = 0
        for index, jump in enumerate(nums):
            if index > farthest:
                return False
            farthest = max(farthest, index + jump)
        return True`,

  'jump-game-ii': `class Solution:
    def jump(self, nums: List[int]) -> int:
        jumps = current_end = farthest = 0
        for index in range(len(nums) - 1):
            farthest = max(farthest, index + nums[index])
            if index == current_end:
                jumps += 1
                current_end = farthest
        return jumps`,

  'partition-labels': `class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        last = {char: index for index, char in enumerate(s)}
        answer = []
        start = end = 0
        for index, char in enumerate(s):
            end = max(end, last[char])
            if index == end:
                answer.append(end - start + 1)
                start = index + 1
        return answer`,

  'pascals-triangle': `class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        answer = []
        for row_index in range(numRows):
            row = [1] * (row_index + 1)
            for col in range(1, row_index):
                row[col] = answer[-1][col - 1] + answer[-1][col]
            answer.append(row)
        return answer`,

  'house-robber': `class Solution:
    def rob(self, nums: List[int]) -> int:
        previous = current = 0
        for value in nums:
            previous, current = current, max(current, previous + value)
        return current`,

  'perfect-squares': `class Solution:
    def numSquares(self, n: int) -> int:
        dp = [0] + [float('inf')] * n
        for value in range(1, n + 1):
            square = 1
            while square * square <= value:
                dp[value] = min(dp[value], dp[value - square * square] + 1)
                square += 1
        return dp[n]`,

  'word-break': `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        words = set(wordDict)
        dp = [False] * (len(s) + 1)
        dp[0] = True
        for end in range(1, len(s) + 1):
            dp[end] = any(dp[start] and s[start:end] in words for start in range(end))
        return dp[-1]`,

  'longest-increasing-subsequence': `class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        tails = []
        for value in nums:
            index = bisect_left(tails, value)
            if index == len(tails):
                tails.append(value)
            else:
                tails[index] = value
        return len(tails)`,

  'maximum-product-subarray': `class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        current_min = current_max = answer = nums[0]
        for value in nums[1:]:
            if value < 0:
                current_min, current_max = current_max, current_min
            current_max = max(value, current_max * value)
            current_min = min(value, current_min * value)
            answer = max(answer, current_max)
        return answer`,

  'copy-list-with-random-pointer': `class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head:
            return None
        current = head
        while current:
            copy = Node(current.val, current.next)
            current.next = copy
            current = copy.next
        current = head
        while current:
            if current.random:
                current.next.random = current.random.next
            current = current.next.next
        dummy = tail = Node(0)
        current = head
        while current:
            copy = current.next
            current.next = copy.next
            tail.next = copy
            tail = copy
            current = current.next
        return dummy.next`,

  'partition-equal-subset-sum': `class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)
        if total % 2:
            return False
        target = total // 2
        reachable = {0}
        for value in nums:
            reachable |= {current + value for current in reachable if current + value <= target}
            if target in reachable:
                return True
        return False`,

  'longest-valid-parentheses': `class Solution:
    def longestValidParentheses(self, s: str) -> int:
        stack = [-1]
        answer = 0
        for index, char in enumerate(s):
            if char == '(':
                stack.append(index)
            else:
                stack.pop()
                if stack:
                    answer = max(answer, index - stack[-1])
                else:
                    stack.append(index)
        return answer`,

  'unique-paths': `class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for _ in range(1, m):
            for col in range(1, n):
                dp[col] += dp[col - 1]
        return dp[-1]`,

  'minimum-path-sum': `class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        dp = [float('inf')] * len(grid[0])
        dp[0] = 0
        for row in grid:
            dp[0] += row[0]
            for col in range(1, len(row)):
                dp[col] = min(dp[col], dp[col - 1]) + row[col]
        return dp[-1]`,

  'single-number': `class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        answer = 0
        for value in nums:
            answer ^= value
        return answer`,

  'majority-element': `class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        candidate = None
        count = 0
        for value in nums:
            if count == 0:
                candidate = value
            count += 1 if value == candidate else -1
        return candidate`,

  'find-the-duplicate-number': `class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        slow = fast = nums[0]
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break
        finder = nums[0]
        while finder != slow:
            finder = nums[finder]
            slow = nums[slow]
        return finder`,
};

function slugFromPoint(point: AlgorithmPoint) {
  return point.slug ?? point.url?.split('/problems/')[1]?.split('/')[0] ?? '';
}

export function getAlgorithmPythonCode(point: AlgorithmPoint) {
  const slug = slugFromPoint(point);
  const solution = PYTHON_SOLUTIONS[slug];
  return solution
    ? `${PYTHON_IMPORTS}\n\n${solution}`
    : '# Python solution is not available for this problem.';
}

export function hasAlgorithmPythonCode(point: AlgorithmPoint) {
  return slugFromPoint(point) in PYTHON_SOLUTIONS;
}

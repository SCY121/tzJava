import type { AlgorithmPoint } from '../constants/command-types';

type ParsedParam = {
  type: string;
  name: string;
};

type ParsedMethod = {
  returnType: string;
  methodName: string;
  params: ParsedParam[];
};

const DESIGN_BUILDERS: Record<string, (point: AlgorithmPoint) => string> = {
  'lru-cache': buildLruCacheTemplate,
  'min-stack': buildMinStackTemplate,
  'implement-trie-prefix-tree': buildTrieTemplate,
  'find-median-from-data-stream': buildMedianFinderTemplate,
  'copy-list-with-random-pointer': buildCopyRandomListTemplate,
};

const VOID_OUTPUT_BY_SLUG: Record<string, string> = {
  'move-zeroes': 'System.out.println(Arrays.toString(nums));',
  'rotate-array': 'System.out.println(Arrays.toString(nums));',
  'set-matrix-zeroes': 'printMatrix(matrix);',
  'rotate-image': 'printMatrix(matrix);',
  'flatten-binary-tree-to-linked-list': 'System.out.println(flatten(root));',
  'sort-colors': 'System.out.println(Arrays.toString(nums));',
  'next-permutation': 'System.out.println(Arrays.toString(nums));',
};

export function getAlgorithmAcmCode(point: AlgorithmPoint) {
  const slug = point.slug ?? slugFromUrl(point.url);

  if (slug && DESIGN_BUILDERS[slug]) {
    return DESIGN_BUILDERS[slug](point);
  }

  const signature = parseMethodSignature(point.code);
  if (!signature) {
    return buildFallbackTemplate(point);
  }

  return buildSimpleTemplate(point, signature, slug);
}

function slugFromUrl(url?: string) {
  return url?.split('/problems/')[1]?.split('/')[0] ?? '';
}

function parseMethodSignature(code: string): ParsedMethod | null {
  const match = code.match(/public\s+([A-Za-z0-9_<>,\[\]\s]+?)\s+(\w+)\s*\(([^)]*)\)/);
  if (!match) {
    return null;
  }

  const [, rawReturnType, methodName, rawParams] = match;
  const params = splitParams(rawParams).map((param) => {
    const normalized = param.trim().replace(/\s+/g, ' ');
    const lastSpace = normalized.lastIndexOf(' ');
    return {
      type: normalized.slice(0, lastSpace).trim(),
      name: normalized.slice(lastSpace + 1).trim(),
    };
  });

  return {
    returnType: rawReturnType.trim().replace(/\s+/g, ' '),
    methodName,
    params,
  };
}

function splitParams(params: string) {
  if (!params.trim()) {
    return [];
  }

  const parts: string[] = [];
  let start = 0;
  let depth = 0;

  for (let i = 0; i < params.length; i++) {
    const ch = params[i];
    if (ch === '<') depth++;
    if (ch === '>') depth--;
    if (ch === ',' && depth === 0) {
      parts.push(params.slice(start, i));
      start = i + 1;
    }
  }

  parts.push(params.slice(start));
  return parts.map((item) => item.trim()).filter(Boolean);
}

function buildSimpleTemplate(point: AlgorithmPoint, signature: ParsedMethod, slug: string) {
  const needs = collectNeeds(signature, slug);
  const lines: string[] = [
    'import java.util.*;',
    '',
    'public class Main {',
    '    public static void main(String[] args) {',
    '        Scanner sc = new Scanner(System.in);',
    ...indentLines(buildReaders(signature.params, slug), 8),
    '        Solution solution = new Solution();',
    ...indentLines(buildInvoke(signature, slug), 8),
    '    }',
  ];

  const helperMethods = buildHelpers(needs);
  if (helperMethods) {
    lines.push('', ...indentLines(helperMethods.split('\n'), 4));
  }
  lines.push('}');

  const classDefs = buildClassDefinitions(needs);
  if (classDefs) {
    lines.push('', classDefs);
  }

  lines.push('', 'class Solution {', ...indentLines(point.code.trim().split('\n'), 4), '}');
  return lines.join('\n');
}

function collectNeeds(signature: ParsedMethod, slug: string) {
  const allTypes = new Set<string>([signature.returnType, ...signature.params.map((param) => param.type)]);

  return {
    listNodeClass: allTypes.has('ListNode') || allTypes.has('ListNode[]') || signature.returnType === 'ListNode',
    treeNodeClass: allTypes.has('TreeNode') || signature.returnType === 'TreeNode' || slug === 'lowest-common-ancestor-of-a-binary-tree',
    buildList: allTypes.has('ListNode') || allTypes.has('ListNode[]'),
    listToString: signature.returnType === 'ListNode',
    buildTree: allTypes.has('TreeNode'),
    treeToLevelOrder: signature.returnType === 'TreeNode',
    findNode: slug === 'lowest-common-ancestor-of-a-binary-tree',
    flatten: VOID_OUTPUT_BY_SLUG[slug] === 'System.out.println(flatten(root));',
    printMatrix: allTypes.has('int[][]') || signature.returnType === 'int[][]' || VOID_OUTPUT_BY_SLUG[slug] === 'printMatrix(matrix);',
  };
}

function buildReaders(params: ParsedParam[], slug: string) {
  const lines: string[] = [];

  for (const param of params) {
    if (slug === 'lowest-common-ancestor-of-a-binary-tree' && param.type === 'TreeNode' && param.name !== 'root') {
      lines.push(`int ${param.name}Val = sc.nextInt();`);
      lines.push(`TreeNode ${param.name} = findNode(root, ${param.name}Val);`);
      continue;
    }

    switch (param.type) {
      case 'int':
        lines.push(`int ${param.name} = sc.nextInt();`);
        break;
      case 'String':
        lines.push(`String ${param.name} = sc.next();`);
        break;
      case 'int[]':
        lines.push(`int ${param.name}Size = sc.nextInt();`);
        lines.push(`int[] ${param.name} = new int[${param.name}Size];`);
        lines.push(`for (int i = 0; i < ${param.name}Size; i++) {`);
        lines.push(`    ${param.name}[i] = sc.nextInt();`);
        lines.push('}');
        break;
      case 'String[]':
        lines.push(`int ${param.name}Size = sc.nextInt();`);
        lines.push(`String[] ${param.name} = new String[${param.name}Size];`);
        lines.push(`for (int i = 0; i < ${param.name}Size; i++) {`);
        lines.push(`    ${param.name}[i] = sc.next();`);
        lines.push('}');
        break;
      case 'int[][]':
        lines.push(`int ${param.name}Rows = sc.nextInt();`);
        lines.push(`int ${param.name}Cols = sc.nextInt();`);
        lines.push(`int[][] ${param.name} = new int[${param.name}Rows][${param.name}Cols];`);
        lines.push(`for (int i = 0; i < ${param.name}Rows; i++) {`);
        lines.push(`    for (int j = 0; j < ${param.name}Cols; j++) {`);
        lines.push(`        ${param.name}[i][j] = sc.nextInt();`);
        lines.push('    }');
        lines.push('}');
        break;
      case 'char[][]':
        lines.push(`int ${param.name}Rows = sc.nextInt();`);
        lines.push(`int ${param.name}Cols = sc.nextInt();`);
        lines.push(`char[][] ${param.name} = new char[${param.name}Rows][${param.name}Cols];`);
        lines.push(`for (int i = 0; i < ${param.name}Rows; i++) {`);
        lines.push(`    String row = sc.next();`);
        lines.push(`    for (int j = 0; j < ${param.name}Cols; j++) {`);
        lines.push(`        ${param.name}[i][j] = row.charAt(j);`);
        lines.push('    }');
        lines.push('}');
        break;
      case 'List<String>':
        lines.push(`int ${param.name}Size = sc.nextInt();`);
        lines.push(`List<String> ${param.name} = new ArrayList<>();`);
        lines.push(`for (int i = 0; i < ${param.name}Size; i++) {`);
        lines.push(`    ${param.name}.add(sc.next());`);
        lines.push('}');
        break;
      case 'ListNode':
        lines.push(`int ${param.name}Size = sc.nextInt();`);
        lines.push(`int[] ${param.name}Arr = new int[${param.name}Size];`);
        lines.push(`for (int i = 0; i < ${param.name}Size; i++) {`);
        lines.push(`    ${param.name}Arr[i] = sc.nextInt();`);
        lines.push('}');
        lines.push(`ListNode ${param.name} = buildList(${param.name}Arr);`);
        break;
      case 'ListNode[]':
        lines.push(`int ${param.name}Count = sc.nextInt();`);
        lines.push(`ListNode[] ${param.name} = new ListNode[${param.name}Count];`);
        lines.push(`for (int i = 0; i < ${param.name}Count; i++) {`);
        lines.push(`    int size = sc.nextInt();`);
        lines.push('    int[] arr = new int[size];');
        lines.push('    for (int j = 0; j < size; j++) {');
        lines.push('        arr[j] = sc.nextInt();');
        lines.push('    }');
        lines.push(`    ${param.name}[i] = buildList(arr);`);
        lines.push('}');
        break;
      case 'TreeNode':
        lines.push(`int ${param.name}Size = sc.nextInt();`);
        lines.push(`String[] ${param.name}Nodes = new String[${param.name}Size];`);
        lines.push(`for (int i = 0; i < ${param.name}Size; i++) {`);
        lines.push(`    ${param.name}Nodes[i] = sc.next();`);
        lines.push('}');
        lines.push(`TreeNode ${param.name} = buildTree(${param.name}Nodes);`);
        break;
      default:
        lines.push(`// TODO: 根据题目补充 ${param.name} 的输入`);
        lines.push(`${param.type} ${param.name} = null;`);
        break;
    }
  }

  return lines;
}

function buildInvoke(signature: ParsedMethod, slug: string) {
  const args = signature.params.map((param) => param.name).join(', ');

  if (signature.returnType === 'void') {
    return [`solution.${signature.methodName}(${args});`, VOID_OUTPUT_BY_SLUG[slug] ?? 'System.out.println("done");'];
  }

  return [
    `${signature.returnType} ans = solution.${signature.methodName}(${args});`,
    buildPrint(signature.returnType),
  ];
}

function buildPrint(returnType: string) {
  switch (returnType) {
    case 'int':
    case 'long':
    case 'double':
    case 'boolean':
    case 'String':
      return 'System.out.println(ans);';
    case 'int[]':
      return 'System.out.println(Arrays.toString(ans));';
    case 'int[][]':
      return 'printMatrix(ans);';
    case 'ListNode':
      return 'System.out.println(listToString(ans));';
    case 'TreeNode':
      return 'System.out.println(treeToLevelOrder(ans));';
    default:
      return 'System.out.println(ans);';
  }
}

function buildHelpers(needs: ReturnType<typeof collectNeeds>) {
  const helpers: string[] = [];

  if (needs.buildList) {
    helpers.push(`private static ListNode buildList(int[] arr) {
    ListNode dummy = new ListNode(0);
    ListNode cur = dummy;
    for (int num : arr) {
        cur.next = new ListNode(num);
        cur = cur.next;
    }
    return dummy.next;
}`);
  }

  if (needs.listToString) {
    helpers.push(`private static String listToString(ListNode head) {
    List<Integer> list = new ArrayList<>();
    while (head != null) {
        list.add(head.val);
        head = head.next;
    }
    return list.toString();
}`);
  }

  if (needs.buildTree) {
    helpers.push(`private static TreeNode buildTree(String[] nodes) {
    if (nodes.length == 0 || "null".equals(nodes[0])) {
        return null;
    }
    TreeNode root = new TreeNode(Integer.parseInt(nodes[0]));
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    int i = 1;
    while (!queue.isEmpty() && i < nodes.length) {
        TreeNode cur = queue.poll();
        if (!"null".equals(nodes[i])) {
            cur.left = new TreeNode(Integer.parseInt(nodes[i]));
            queue.offer(cur.left);
        }
        i++;
        if (i < nodes.length && !"null".equals(nodes[i])) {
            cur.right = new TreeNode(Integer.parseInt(nodes[i]));
            queue.offer(cur.right);
        }
        i++;
    }
    return root;
}`);
  }

  if (needs.findNode) {
    helpers.push(`private static TreeNode findNode(TreeNode root, int target) {
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        TreeNode cur = queue.poll();
        if (cur == null) {
            continue;
        }
        if (cur.val == target) {
            return cur;
        }
        queue.offer(cur.left);
        queue.offer(cur.right);
    }
    return null;
}`);
  }

  if (needs.treeToLevelOrder) {
    helpers.push(`private static String treeToLevelOrder(TreeNode root) {
    if (root == null) {
        return "[]";
    }
    List<String> list = new ArrayList<>();
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        TreeNode cur = queue.poll();
        if (cur == null) {
            list.add("null");
            continue;
        }
        list.add(String.valueOf(cur.val));
        queue.offer(cur.left);
        queue.offer(cur.right);
    }
    int end = list.size() - 1;
    while (end >= 0 && "null".equals(list.get(end))) {
        end--;
    }
    return list.subList(0, end + 1).toString();
}`);
  }

  if (needs.flatten) {
    helpers.push(`private static String flatten(TreeNode root) {
    List<Integer> list = new ArrayList<>();
    while (root != null) {
        list.add(root.val);
        root = root.right;
    }
    return list.toString();
}`);
  }

  if (needs.printMatrix) {
    helpers.push(`private static void printMatrix(int[][] matrix) {
    for (int[] row : matrix) {
        System.out.println(Arrays.toString(row));
    }
}`);
  }

  return helpers.join('\n\n');
}

function buildClassDefinitions(needs: ReturnType<typeof collectNeeds>) {
  const defs: string[] = [];

  if (needs.listNodeClass) {
    defs.push(`class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
    }
}`);
  }

  if (needs.treeNodeClass) {
    defs.push(`class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int val) {
        this.val = val;
    }
}`);
  }

  return defs.join('\n\n');
}

function buildFallbackTemplate(point: AlgorithmPoint) {
  return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // 按题目补充最基础的输入输出
    }
}

class Solution {
${indent(point.code.trim(), 4)}
}`;
}

function buildLruCacheTemplate(point: AlgorithmPoint) {
  return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int capacity = sc.nextInt();
        int q = sc.nextInt();
        LRUCache cache = new LRUCache(capacity);
        while (q-- > 0) {
            String op = sc.next();
            if ("put".equals(op)) {
                int key = sc.nextInt();
                int value = sc.nextInt();
                cache.put(key, value);
            } else {
                int key = sc.nextInt();
                System.out.println(cache.get(key));
            }
        }
    }
}

${point.code}`;
}

function buildMinStackTemplate(point: AlgorithmPoint) {
  return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int q = sc.nextInt();
        MinStack stack = new MinStack();
        while (q-- > 0) {
            String op = sc.next();
            if ("push".equals(op)) {
                stack.push(sc.nextInt());
            } else if ("pop".equals(op)) {
                stack.pop();
            } else if ("top".equals(op)) {
                System.out.println(stack.top());
            } else {
                System.out.println(stack.getMin());
            }
        }
    }
}

${point.code}`;
}

function buildTrieTemplate(point: AlgorithmPoint) {
  return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int q = sc.nextInt();
        Trie trie = new Trie();
        while (q-- > 0) {
            String op = sc.next();
            String word = sc.next();
            if ("insert".equals(op)) {
                trie.insert(word);
            } else if ("search".equals(op)) {
                System.out.println(trie.search(word));
            } else {
                System.out.println(trie.startsWith(word));
            }
        }
    }
}

${point.code}`;
}

function buildMedianFinderTemplate(point: AlgorithmPoint) {
  return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int q = sc.nextInt();
        MedianFinder finder = new MedianFinder();
        while (q-- > 0) {
            String op = sc.next();
            if ("addNum".equals(op)) {
                finder.addNum(sc.nextInt());
            } else {
                System.out.println(finder.findMedian());
            }
        }
    }
}

${point.code}`;
}

function buildCopyRandomListTemplate(point: AlgorithmPoint) {
  return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Node[] nodes = new Node[n];
        int[] random = new int[n];
        for (int i = 0; i < n; i++) {
            nodes[i] = new Node(sc.nextInt());
            random[i] = sc.nextInt();
            if (i > 0) {
                nodes[i - 1].next = nodes[i];
            }
        }
        for (int i = 0; i < n; i++) {
            if (random[i] != -1) {
                nodes[i].random = nodes[random[i]];
            }
        }
        Solution solution = new Solution();
        Node ans = solution.copyRandomList(n == 0 ? null : nodes[0]);
        List<Node> list = new ArrayList<>();
        for (Node cur = ans; cur != null; cur = cur.next) {
            list.add(cur);
        }
        Map<Node, Integer> index = new HashMap<>();
        for (int i = 0; i < list.size(); i++) {
            index.put(list.get(i), i);
        }
        for (Node node : list) {
            System.out.println(node.val + " " + (node.random == null ? -1 : index.get(node.random)));
        }
    }
}

class Node {
    int val;
    Node next;
    Node random;

    Node(int val) {
        this.val = val;
    }
}

class Solution {
${indent(point.code.trim(), 4)}
}`;
}

function indent(lines: string, spaces = 4) {
  const pad = ' '.repeat(spaces);
  return lines
    .split('\n')
    .map((line) => (line ? `${pad}${line}` : ''))
    .join('\n');
}

function indentLines(lines: string[] | string, spaces = 4) {
  const list = Array.isArray(lines) ? lines : lines.split('\n');
  const pad = ' '.repeat(spaces);
  return list.map((line) => (line ? `${pad}${line}` : ''));
}

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

const DESIGN_LITE_BUILDERS: Record<string, (point: AlgorithmPoint) => string> = {
  'lru-cache': buildLruLite,
  'min-stack': buildMinStackLite,
  'implement-trie-prefix-tree': buildTrieLite,
  'find-median-from-data-stream': buildMedianFinderLite,
};

export function getAlgorithmAcmLiteCode(point: AlgorithmPoint) {
  const slug = point.slug ?? point.url?.split('/problems/')[1]?.split('/')[0] ?? '';
  if (slug && DESIGN_LITE_BUILDERS[slug]) {
    return DESIGN_LITE_BUILDERS[slug](point);
  }

  const signature = parseMethodSignature(point.code);
  if (!signature) {
    return buildFallback(point);
  }

  return buildLiteTemplate(point, signature, slug);
}

function parseMethodSignature(code: string): ParsedMethod | null {
  const match = code.match(/public\s+([A-Za-z0-9_<>,\[\]\s]+?)\s+(\w+)\s*\(([^)]*)\)/);
  if (!match) return null;

  const [, returnType, methodName, rawParams] = match;
  const params = splitParams(rawParams).map((param) => {
    const normalized = param.trim().replace(/\s+/g, ' ');
    const lastSpace = normalized.lastIndexOf(' ');
    return {
      type: normalized.slice(0, lastSpace).trim(),
      name: normalized.slice(lastSpace + 1).trim(),
    };
  });

  return {
    returnType: returnType.trim().replace(/\s+/g, ' '),
    methodName,
    params,
  };
}

function splitParams(params: string) {
  if (!params.trim()) return [];
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

function buildLiteTemplate(point: AlgorithmPoint, signature: ParsedMethod, slug: string) {
  const helperKind = detectHelperKind(signature, slug);
  const lines: string[] = ['import java.util.*;', ''];

  if (helperKind === 'list') {
    lines.push(
      'class ListNode {',
      '    int val;',
      '    ListNode next;',
      '    ListNode(int x) { val = x; }',
      '}',
      ''
    );
  }

  if (helperKind === 'tree') {
    lines.push(
      'class TreeNode {',
      '    int val;',
      '    TreeNode left, right;',
      '    TreeNode(int x) { val = x; }',
      '}',
      ''
    );
  }

  lines.push('public class Main {', '    public static void main(String[] args) {');

  if (helperKind !== 'tree') {
    lines.push('        Scanner sc = new Scanner(System.in);');
  }

  lines.push(...indentLines(buildLiteMain(signature, slug, helperKind), 8));
  lines.push('    }', '}', '', 'class Solution {', ...indentLines(point.code.trim().split('\n'), 4), '}');
  return lines.join('\n');
}

function detectHelperKind(signature: ParsedMethod, slug: string) {
  const allTypes = new Set<string>([signature.returnType, ...signature.params.map((item) => item.type)]);
  if (allTypes.has('TreeNode') || slug === 'lowest-common-ancestor-of-a-binary-tree') return 'tree';
  if (allTypes.has('ListNode') || allTypes.has('ListNode[]') || signature.returnType === 'ListNode') return 'list';
  return 'normal';
}

function buildLiteMain(signature: ParsedMethod, slug: string, helperKind: 'tree' | 'list' | 'normal') {
  if (slug === 'lowest-common-ancestor-of-a-binary-tree') {
    return [
      '// 面试里这类树题通常直接手动造一棵示例树',
      'TreeNode root = new TreeNode(3);',
      'root.left = new TreeNode(5);',
      'root.right = new TreeNode(1);',
      'TreeNode p = root.left;',
      'TreeNode q = root.right;',
      `TreeNode ans = new Solution().${signature.methodName}(root, p, q);`,
      'System.out.println(ans.val);',
    ];
  }

  if (helperKind === 'tree') {
    const callArgs = signature.params.map((param) => param.name).join(', ');
    const build = ['// 面试手撕时通常直接手动建树，下面给一个极简示例', 'TreeNode root = new TreeNode(1);'];
    const otherParams = signature.params.filter((param) => param.name !== 'root');
    for (const param of otherParams) {
      build.push(...buildSimpleRead(param));
    }
    build.push(...buildInvokeLines(signature, callArgs));
    return build;
  }

  if (helperKind === 'list') {
    const listParam = signature.params.find((param) => param.type === 'ListNode');
    const otherParams = signature.params.filter((param) => param !== listParam);
    const lines = [
      '// 极简建链表：直接把输入整数读成链表',
      'ListNode dummy = new ListNode(0), cur = dummy;',
      'while (sc.hasNextInt()) {',
      '    cur.next = new ListNode(sc.nextInt());',
      '    cur = cur.next;',
      '}',
    ];
    if (listParam) {
      lines.push(`ListNode ${listParam.name} = dummy.next;`);
    }
    for (const param of otherParams) {
      lines.push(...buildSimpleRead(param));
    }
    const callArgs = signature.params.map((param) => param.name).join(', ');
    lines.push(...buildInvokeLines(signature, callArgs));
    return lines;
  }

  const lines = signature.params.flatMap((param) => buildSimpleRead(param));
  const callArgs = signature.params.map((param) => param.name).join(', ');
  lines.push(...buildInvokeLines(signature, callArgs));
  return lines;
}

function buildSimpleRead(param: ParsedParam) {
  switch (param.type) {
    case 'int':
      return [`int ${param.name} = sc.nextInt();`];
    case 'String':
      return [`String ${param.name} = sc.next();`];
    case 'int[]':
      return [
        `int n = sc.nextInt();`,
        `int[] ${param.name} = new int[n];`,
        `for (int i = 0; i < n; i++) ${param.name}[i] = sc.nextInt();`,
      ];
    case 'String[]':
      return [
        `int n = sc.nextInt();`,
        `String[] ${param.name} = new String[n];`,
        `for (int i = 0; i < n; i++) ${param.name}[i] = sc.next();`,
      ];
    case 'int[][]':
      return [
        'int m = sc.nextInt(), n = sc.nextInt();',
        `int[][] ${param.name} = new int[m][n];`,
        'for (int i = 0; i < m; i++) {',
        '    for (int j = 0; j < n; j++) {',
        `        ${param.name}[i][j] = sc.nextInt();`,
        '    }',
        '}',
      ];
    case 'char[][]':
      return [
        'int m = sc.nextInt(), n = sc.nextInt();',
        `char[][] ${param.name} = new char[m][n];`,
        'for (int i = 0; i < m; i++) {',
        '    String row = sc.next();',
        '    for (int j = 0; j < n; j++) {',
        `        ${param.name}[i][j] = row.charAt(j);`,
        '    }',
        '}',
      ];
    default:
      return [`// ${param.name}: 面试里按题目需要补最少输入即可`];
  }
}

function buildInvokeLines(signature: ParsedMethod, callArgs: string) {
  if (signature.returnType === 'void') {
    return [
      `new Solution().${signature.methodName}(${callArgs});`,
      'System.out.println("done");',
    ];
  }

  return [
    `${signature.returnType} ans = new Solution().${signature.methodName}(${callArgs});`,
    ...toLines(buildPrint(signature.returnType)),
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
    case 'ListNode':
      return [
        'while (ans != null) {',
        '    System.out.print(ans.val + (ans.next == null ? "" : "->"));',
        '    ans = ans.next;',
        '}',
      ].join('\n');
    case 'TreeNode':
      return 'System.out.println(ans == null ? "null" : ans.val);';
    default:
      return 'System.out.println(ans);';
  }
}

function toLines(content: string | string[]) {
  return Array.isArray(content) ? content : content.split('\n');
}

function buildFallback(point: AlgorithmPoint) {
  return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // 面试手撕时按题意补最少输入，然后直接调用核心函数
    }
}

class Solution {
${indent(point.code.trim(), 4)}
}`;
}

function buildLruLite(point: AlgorithmPoint) {
  return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        LRUCache cache = new LRUCache(2);
        cache.put(1, 1);
        cache.put(2, 2);
        System.out.println(cache.get(1));
        cache.put(3, 3);
        System.out.println(cache.get(2));
    }
}

${point.code}`;
}

function buildMinStackLite(point: AlgorithmPoint) {
  return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        MinStack stack = new MinStack();
        stack.push(-2);
        stack.push(0);
        stack.push(-3);
        System.out.println(stack.getMin());
        stack.pop();
        System.out.println(stack.top());
    }
}

${point.code}`;
}

function buildTrieLite(point: AlgorithmPoint) {
  return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert("apple");
        System.out.println(trie.search("apple"));
        System.out.println(trie.startsWith("app"));
    }
}

${point.code}`;
}

function buildMedianFinderLite(point: AlgorithmPoint) {
  return `import java.util.*;

public class Main {
    public static void main(String[] args) {
        MedianFinder finder = new MedianFinder();
        finder.addNum(1);
        finder.addNum(2);
        System.out.println(finder.findMedian());
        finder.addNum(3);
        System.out.println(finder.findMedian());
    }
}

${point.code}`;
}

function indent(text: string, spaces = 4) {
  const pad = ' '.repeat(spaces);
  return text.split('\n').map((line) => (line ? pad + line : '')).join('\n');
}

function indentLines(lines: string[] | string, spaces = 4) {
  const list = Array.isArray(lines) ? lines : lines.split('\n');
  const pad = ' '.repeat(spaces);
  return list.map((line) => (line ? pad + line : ''));
}

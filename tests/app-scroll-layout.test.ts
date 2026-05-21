import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { formatInterviewAnswer } from '../src/utils/interview-format';
import { ALGORITHM_POINTS } from '../src/constants';

const appSource = fs.readFileSync(
  path.join(process.cwd(), 'src', 'App.tsx'),
  'utf8'
);
const networkSource = fs.readFileSync(
  path.join(process.cwd(), 'src', 'constants', 'network-points.ts'),
  'utf8'
);
const gitSource = fs.readFileSync(
  path.join(process.cwd(), 'src', 'constants', 'git-commands.ts'),
  'utf8'
);
const refinedBatch1Source = fs.readFileSync(
  path.join(process.cwd(), 'src', 'constants', 'refined-points-batch1.ts'),
  'utf8'
);
const refinedBatch2Source = fs.readFileSync(
  path.join(process.cwd(), 'src', 'constants', 'refined-points-batch2.ts'),
  'utf8'
);
const refinedBatch3Source = fs.readFileSync(
  path.join(process.cwd(), 'src', 'constants', 'refined-points-batch3.ts'),
  'utf8'
);

test('源码里不应残留异常问号占位文本', () => {
  assert.doesNotMatch(appSource, /\?{3,}/);
});

test('面试区保持左侧列表加右侧单题详情模式，并移除模块大标题说明块', () => {
  assert.match(
    appSource,
    /const \[selectedInterview, setSelectedInterview\] = useState<InterviewPoint \| null>\(null\);/
  );
  assert.match(appSource, /selectedInterview \? \(/);
  assert.doesNotMatch(appSource, /const interviewTitle =/);
  assert.doesNotMatch(appSource, /const interviewSubtitle =/);
  assert.doesNotMatch(appSource, /point\.importance === 'high'/);
  assert.doesNotMatch(appSource, /selectedInterview\.importance === 'high'/);
});

test('算法区保持单题切换模式，并移除顶部大标题文案', () => {
  assert.match(
    appSource,
    /const \[selectedAlgorithm, setSelectedAlgorithm\] = useState<AlgorithmPoint \| null>\(null\);/
  );
  assert.match(
    appSource,
    /const \[selectedAlgorithmTemplate, setSelectedAlgorithmTemplate\] = useState<AlgorithmTemplate \| null>\(null\);/
  );
  assert.match(appSource, /selectedAlgorithmTemplate \? \(/);
  assert.match(appSource, /selectedAlgorithm \? \(/);
  assert.doesNotMatch(appSource, /<h2 className="text-3xl font-bold">LeetCode 高频算法<\/h2>/);
});

test('CodeTop 题库应扩充到 100 题，前端文案同步为 CodeTop 100', () => {
  assert.equal(ALGORITHM_POINTS.length, 100);
  assert.match(appSource, /CodeTop 100/);
});

test('核心文档区改为左侧点选加右侧单篇详情，而不是整页文档流', () => {
  assert.match(appSource, /const \[selectedDocIndex, setSelectedDocIndex\] = useState\(0\);/);
  assert.match(appSource, /const selectedDoc = filteredDocs\[selectedDocIndex\] \?\? null;/);
  assert.match(appSource, /key=\{selectedDoc\.title\}/);
  assert.match(appSource, /filteredDocs/);
  assert.match(appSource, /placeholder="搜索文档\.\.\."/);
  assert.match(appSource, /selectedDoc\.content/);
  assert.doesNotMatch(appSource, /href=\{`#doc-\$\{i\}`\}/);
});

test('Linux 和 Docker 命令区应按类别分组，并使用结构化详情卡片', () => {
  assert.match(appSource, /const groupedCommands = useMemo/);
  assert.match(appSource, /data-command-category=/);
  assert.match(appSource, /常用参数/);
  assert.match(appSource, /使用场景/);
  assert.match(appSource, /placeholder="搜索命令\.\.\."/);
  assert.match(appSource, /collapsedCommandGroups/);
  assert.match(appSource, /<span className="mr-3 select-none text-zinc-500">\$<\/span>/);
  assert.match(appSource, /<Copy size=\{14\} \/>/);
  assert.match(appSource, /selectedCommand\.explanation/);
});

test('命令、面试、算法、文档都应使用固定工作区，避免整页滚动', () => {
  const workspaceMatches = appSource.match(/data-layout="focus-workspace"/g) ?? [];
  assert.ok(workspaceMatches.length >= 4);
  assert.match(appSource, /activeTab === 'docs'/);
  assert.match(appSource, /overscroll-contain/);
});

test('桌面端保留左侧分类侧栏，内容区仍使用统一内容壳，底部页脚已移除', () => {
  assert.match(appSource, /data-layout="category-sidebar"/);
  assert.match(appSource, /data-layout="content-shell"/);
  assert.match(appSource, /max-w-\[1400px\]/);
  assert.doesNotMatch(appSource, /全栈技术面试与实战指南 · 助力每一位开发者的成长/);
});

test('顶部页签栏只在存在多个子页签时显示', () => {
  assert.match(appSource, /const visibleTabs = \[/);
  assert.match(appSource, /const shouldShowTabSwitcher = visibleTabs\.length > 1;/);
  assert.match(appSource, /\{shouldShowTabSwitcher && \(/);
});

test('默认页签逻辑保留，且不再渲染入门介绍与实战练习入口', () => {
  assert.match(appSource, /function getDefaultTab\(category: MainCategory\): TabType/);
  assert.doesNotMatch(appSource, /label: '入门介绍'/);
  assert.doesNotMatch(appSource, /label: '实战练习'/);
  assert.doesNotMatch(appSource, /activeTab === 'intro'/);
  assert.doesNotMatch(appSource, /activeTab === 'practice'/);
});

test('Java面试手册补充题库应接入站点并在模块内去重合并', () => {
  assert.match(appSource, /function dedupeInterviewPoints\(points: InterviewPoint\[\]\)/);
  assert.match(appSource, /REDIS_HANDBOOK_POINTS/);
  assert.match(appSource, /MYSQL_HANDBOOK_POINTS/);
  assert.match(appSource, /SPRING_HANDBOOK_POINTS/);
  assert.match(appSource, /JAVA_HANDBOOK_POINTS/);
  assert.match(appSource, /JUC_HANDBOOK_POINTS/);
  assert.match(appSource, /JVM_HANDBOOK_POINTS/);
  assert.match(appSource, /DISTRIBUTED_HANDBOOK_POINTS/);
  assert.match(appSource, /MQ_HANDBOOK_POINTS/);
});

test('系统化补强题库和 Linux\/Docker 补充文档应接入站点', () => {
  assert.match(appSource, /function dedupeCommands\(commands: Command\[\]\)/);
  assert.match(appSource, /typeof \(command as any\)\?\.command !== 'string'/);
  assert.match(appSource, /function dedupeDocs<T extends \{ title: string \}>\(docs: T\[\]\)/);
  assert.match(appSource, /JAVA_SYSTEMATIC_POINTS/);
  assert.match(appSource, /JUC_SYSTEMATIC_POINTS/);
  assert.match(appSource, /JVM_SYSTEMATIC_POINTS/);
  assert.match(appSource, /SPRING_SYSTEMATIC_POINTS/);
  assert.match(appSource, /REDIS_SYSTEMATIC_POINTS/);
  assert.match(appSource, /MYSQL_SYSTEMATIC_POINTS/);
  assert.match(appSource, /NETWORK_SYSTEMATIC_POINTS/);
  assert.match(appSource, /OS_SYSTEMATIC_POINTS/);
  assert.match(appSource, /MQ_SYSTEMATIC_POINTS/);
  assert.match(appSource, /DISTRIBUTED_SYSTEMATIC_POINTS/);
  assert.match(appSource, /LINUX_COMMAND_SUPPLEMENTS/);
  assert.match(appSource, /DOCKER_COMMAND_SUPPLEMENTS/);
  assert.match(appSource, /LINUX_DOC_SUPPLEMENTS/);
  assert.match(appSource, /DOCKER_DOC_SUPPLEMENTS/);
});

test('Git 模块只提供命令和核心文档，并标记常用命令', () => {
  assert.match(appSource, /GIT_COMMANDS/);
  assert.match(appSource, /GIT_DOCS/);
  assert.match(gitSource, /id: 'git-init'/);
  assert.match(gitSource, /isCommon: true/);
  assert.match(gitSource, /Git 面试高频总览与答题思路/);
  assert.match(gitSource, /模拟企业开发时的 Git 使用流程/);
});

test('计网模块应在靠前位置包含 HTTPS 加密过程完整说明', () => {
  assert.match(networkSource, /id: 'net-2'/);
  assert.match(networkSource, /HTTPS 的加密过程是什么/);
  assert.match(networkSource, /Client Random/);
  assert.match(networkSource, /Session Key/);
  assert.match(networkSource, /RSA/);
  assert.match(networkSource, /AES/);
});

test('第一批模块应接入精修题库并优先覆盖旧答案', () => {
  assert.match(appSource, /JAVA_REFINED_POINTS/);
  assert.match(appSource, /JUC_REFINED_POINTS/);
  assert.match(appSource, /JVM_REFINED_POINTS/);
  assert.match(appSource, /SPRING_REFINED_POINTS/);
  assert.match(refinedBatch1Source, /面向对象的三大特性是什么/);
  assert.match(refinedBatch1Source, /线程池的工作原理（执行流程）是怎样的/);
  assert.match(refinedBatch1Source, /谈谈 JVM 的内存区域划分/);
  assert.match(refinedBatch1Source, /什么是 Spring 的 IOC 和 DI/);
});

test('第二批模块应接入精修题库并优先覆盖旧答案', () => {
  assert.match(appSource, /MYSQL_REFINED_POINTS/);
  assert.match(appSource, /REDIS_REFINED_POINTS/);
  assert.match(appSource, /MQ_REFINED_POINTS/);
  assert.match(appSource, /DISTRIBUTED_REFINED_POINTS/);
  assert.match(refinedBatch2Source, /MySQL 的索引结构是什么/);
  assert.match(refinedBatch2Source, /Redis 为什么这么快/);
  assert.match(refinedBatch2Source, /为什么要使用消息队列/);
  assert.match(refinedBatch2Source, /什么是 CAP 理论/);
});

test('第三批模块应接入精修题库与精修文档并优先覆盖旧内容', () => {
  assert.match(appSource, /NETWORK_REFINED_POINTS/);
  assert.match(appSource, /OS_REFINED_POINTS/);
  assert.match(appSource, /AI_BASIC_REFINED_POINTS/);
  assert.match(appSource, /AI_CORE_REFINED_POINTS/);
  assert.match(appSource, /AI_ENGINEERING_REFINED_POINTS/);
  assert.match(appSource, /LINUX_REFINED_DOCS/);
  assert.match(appSource, /DOCKER_REFINED_DOCS/);
  assert.match(refinedBatch3Source, /TCP 三次握手和四次挥手的过程/);
  assert.match(refinedBatch3Source, /进程和线程的区别/);
  assert.match(refinedBatch3Source, /什么是 Token/);
  assert.match(refinedBatch3Source, /Linux 面试高频场景总览与答题框架/);
  assert.match(refinedBatch3Source, /Docker 面试主线与答题框架/);
  assert.match(refinedBatch3Source, /HTTPS 的加密过程是什么/);
  assert.match(refinedBatch3Source, /什么是页表？TLB 是做什么的/);
  assert.match(refinedBatch3Source, /为什么很多 AI 应用会用 SSE 做流式输出/);
  assert.match(refinedBatch3Source, /Linux 常见排障命令和参数怎么理解/);
  assert.match(refinedBatch3Source, /Docker 容器网络、端口映射和服务互通怎么理解/);
});

test('答案格式化应把有序项下的说明归并为同一个列表，避免重复从 1 开始', () => {
  const input = `常见写法有：

1. 饿汉式
- 类加载时就创建实例
- 简单直接，线程安全

2. 懒汉式
- 第一次使用时再创建
- 需要处理线程安全问题

3. 双重检查锁（DCL）
- 先判空，再加锁，再判空`;

  const formatted = formatInterviewAnswer(input);

  assert.match(formatted, /1\. 饿汉式\n   - 类加载时就创建实例\n   - 简单直接，线程安全/);
  assert.match(formatted, /2\. 懒汉式\n   - 第一次使用时再创建\n   - 需要处理线程安全问题/);
  assert.match(formatted, /3\. 双重检查锁（DCL）\n   - 先判空，再加锁，再判空/);
});

test('答案格式化应移除八股里的重点标注，统一成中性表达', () => {
  const input = `### 面试回答重点
1. 先讲结论
2. 再讲原理

### 面试重点说哪几个
1. REQUIRED
2. REQUIRES_NEW

答题重点：
- 先说默认行为`;

  const formatted = formatInterviewAnswer(input);

  assert.doesNotMatch(formatted, /面试回答重点/);
  assert.doesNotMatch(formatted, /面试重点说哪几个/);
  assert.doesNotMatch(formatted, /答题重点/);
  assert.match(formatted, /### 回答建议/);
  assert.match(formatted, /回答建议：/);
});

test('移动端应使用横向模块导航、有限高列表和详情自动定位', () => {
  assert.match(appSource, /data-layout="mobile-category-nav"/);
  assert.match(appSource, /overflow-x-auto px-4/);
  assert.match(appSource, /function App/);
  assert.match(appSource, /const scrollDetailIntoView =/);
  assert.match(appSource, /window\.matchMedia\('\(min-width: 1024px\)'\)/);
  assert.match(appSource, /scrollIntoView\(\{ behavior: 'smooth', block: 'start' \}\)/);
  assert.match(appSource, /max-h-\[42vh\]/);
  assert.match(appSource, /max-h-\[46vh\]/);
});

test('算法移动端控件与代码块应避免撑破屏幕', () => {
  assert.match(appSource, /grid grid-cols-3 rounded-xl border border-zinc-200 bg-zinc-50 p-1 sm:inline-flex/);
  assert.match(appSource, /overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm/);
  assert.match(appSource, /minWidth: 'max-content'/);
  assert.match(appSource, /fontSize: '0\.8rem'/);
  assert.match(appSource, /scrollDetailIntoView\(algorithmDetailRef\)/);
});

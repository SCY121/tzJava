import { Command } from './command-types';

export const GIT_COMMANDS: Command[] = [
  {
    id: 'git-init',
    command: 'git init',
    description: '初始化本地仓库',
    category: 'repo',
    example: 'git init',
    explanation: '在当前目录创建一个新的 Git 仓库。常见于新项目初始化，或者把现有目录纳入版本管理。',
  },
  {
    id: 'git-clone',
    command: 'git clone',
    description: '克隆远程仓库',
    category: 'repo',
    example: 'git clone git@github.com:org/repo.git',
    explanation: '把远程仓库完整拉到本地。面试里常会继续追问 SSH 和 HTTPS 克隆的区别，以及是否会自动带上远端地址。',
    isCommon: true,
  },
  {
    id: 'git-remote',
    command: 'git remote',
    description: '查看和管理远端仓库',
    category: 'repo',
    example: 'git remote -v',
    explanation: '`-v` 会显示远端仓库地址。常用于确认当前仓库关联的是哪个 origin，以及 push/pull 的目标是否正确。',
  },
  {
    id: 'git-status',
    command: 'git status',
    description: '查看工作区状态',
    category: 'status',
    example: 'git status',
    explanation: '最常用的排查命令之一。它能告诉你哪些文件被修改、哪些已经暂存、哪些还没跟踪，是提交前的必看命令。',
    isCommon: true,
  },
  {
    id: 'git-add',
    command: 'git add',
    description: '把改动加入暂存区',
    category: 'status',
    example: 'git add src/App.tsx',
    explanation: '把文件从工作区放进暂存区。面试里要讲清楚工作区、暂存区、版本库三者的关系。',
    isCommon: true,
  },
  {
    id: 'git-commit',
    command: 'git commit',
    description: '提交本地版本',
    category: 'status',
    example: 'git commit -m "fix: update layout"',
    explanation: '把暂存区内容生成一次提交。企业里通常要求提交信息规范，方便回溯历史和代码评审。',
    isCommon: true,
  },
  {
    id: 'git-fetch',
    command: 'git fetch',
    description: '拉取远端最新引用',
    category: 'sync',
    example: 'git fetch origin',
    explanation: '只更新远端引用，不会自动合并到当前分支。适合先看远端变化，再决定是 merge 还是 rebase。',
  },
  {
    id: 'git-pull',
    command: 'git pull',
    description: '拉取并合并远端改动',
    category: 'sync',
    example: 'git pull --rebase origin main',
    explanation: '本质上是 fetch 加 merge，或者配合 `--rebase` 做变基。面试里常问为什么推荐先 fetch 再处理。',
    isCommon: true,
  },
  {
    id: 'git-push',
    command: 'git push',
    description: '推送本地提交到远端',
    category: 'sync',
    example: 'git push -u origin feature/login',
    explanation: '`-u` 会把本地分支和远端分支建立跟踪关系。企业开发里，推送新分支后一般再发起 PR 或 MR。',
    isCommon: true,
  },
  {
    id: 'git-branch',
    command: 'git branch',
    description: '查看和管理分支',
    category: 'branch',
    example: 'git branch -a',
    explanation: '`-a` 查看本地和远端分支。面试中常用于确认当前在哪个分支，以及远端是否已经存在目标分支。',
  },
  {
    id: 'git-checkout',
    command: 'git checkout',
    description: '切换分支或恢复文件',
    category: 'branch',
    example: 'git checkout -b feature/login',
    explanation: '老命令，既能切分支，也能恢复文件。现在更推荐 `git switch` 和 `git restore`，但面试里仍常会碰到。',
  },
  {
    id: 'git-switch',
    command: 'git switch',
    description: '切换或新建分支',
    category: 'branch',
    example: 'git switch -c feature/login',
    explanation: '新版本 Git 推荐的分支切换命令，职责更单一，语义更清晰。`-c` 表示创建并切换到新分支。',
  },
  {
    id: 'git-merge',
    command: 'git merge',
    description: '合并分支',
    category: 'merge',
    example: 'git merge feature/login',
    explanation: '把一个分支的提交合并到当前分支。面试里要讲清楚快进合并、非快进合并和冲突处理。',
  },
  {
    id: 'git-rebase',
    command: 'git rebase',
    description: '变基，整理提交历史',
    category: 'merge',
    example: 'git rebase origin/main',
    explanation: '把当前分支的提交“挪”到新的基底上。更适合在合并前整理本地提交，但公共分支上乱用会带来风险。',
  },
  {
    id: 'git-cherry-pick',
    command: 'git cherry-pick',
    description: '挑选单个提交合入',
    category: 'merge',
    example: 'git cherry-pick 8f3c2ab',
    explanation: '把某个提交单独摘出来放到当前分支。适合紧急修复、只需要某个提交而不是整条分支的场景。',
  },
  {
    id: 'git-log',
    command: 'git log',
    description: '查看提交历史',
    category: 'history',
    example: 'git log --oneline --graph --decorate',
    explanation: '用于看提交链路、分支关系和作者信息。面试里常和 `--oneline`、`--graph` 一起出现，方便快速读历史。',
  },
  {
    id: 'git-diff',
    command: 'git diff',
    description: '查看差异',
    category: 'history',
    example: 'git diff --staged',
    explanation: '`git diff` 看未暂存改动，`--staged` 看暂存区和最新提交的差异。提交前通常都会检查一遍。',
  },
  {
    id: 'git-show',
    command: 'git show',
    description: '查看某次提交详情',
    category: 'history',
    example: 'git show HEAD~1',
    explanation: '查看某个提交的完整变更内容。面试里可以用它补充说明“提交信息、diff、作者、时间”这些信息怎么看。',
  },
  {
    id: 'git-reset',
    command: 'git reset',
    description: '回退提交或取消暂存',
    category: 'rollback',
    example: 'git reset --soft HEAD~1',
    explanation: '常见三种模式：`--soft` 只回退提交，保留改动；`--mixed` 取消暂存；`--hard` 直接回到指定版本，最危险。',
  },
  {
    id: 'git-revert',
    command: 'git revert',
    description: '生成反向提交',
    category: 'rollback',
    example: 'git revert HEAD',
    explanation: '和 `reset` 不同，它不会改写历史，而是生成一个新的反向提交。线上已经推送的提交通常更适合用它回滚。',
  },
  {
    id: 'git-stash',
    command: 'git stash',
    description: '临时保存未提交修改',
    category: 'stash',
    example: 'git stash push -m "wip"',
    explanation: '把当前工作区改动先收起来，等切完分支或处理完紧急任务再恢复。面试里常问它和切分支的配合场景。',
  },
  {
    id: 'git-tag',
    command: 'git tag',
    description: '打版本标签',
    category: 'release',
    example: 'git tag v1.0.0 && git push origin v1.0.0',
    explanation: '适合版本发布和回溯。企业里常把 tag 作为一次正式上线的版本标记。',
  },
];

export const GIT_DOCS = [
  {
    title: 'Git 面试高频总览与答题思路',
    content: `
Git 面试通常不会只问命令，而是围绕“团队协作、分支管理、冲突处理、回滚恢复”展开。

### 常被追问的主线
- 工作区、暂存区、版本库的关系
- \`git fetch\`、\`git pull\`、\`git rebase\`、\`git merge\` 的区别
- \`reset\` 和 \`revert\` 的区别
- 分支冲突怎么处理
- 代码提交和 PR 流程怎么走

### 答题顺序
1. 先说自己在团队里怎么用 Git
2. 再说常见命令分别解决什么问题
3. 最后补冲突、回滚、发布标签这些企业场景

### 一句话总结
Git 本质上是版本管理和协作工具，面试更看重你能不能把“提交、分支、合并、回滚、发布”这一整条链路讲清楚。
    `,
  },
  {
    title: '模拟企业开发时的 Git 使用流程',
    content: `
### 标准流程
1. 先同步主分支
2. 基于主分支创建功能分支
3. 本地开发、查看状态、暂存、提交
4. 提交前先和远端同步一次
5. 推送功能分支并发起 PR
6. 评审通过后合并到主分支

### 常见命令
\`\`\`bash
git clone git@github.com:org/repo.git
git switch -c feature/login
git status
git add src/App.tsx
git commit -m "feat: add login page"
git fetch origin
git pull --rebase origin main
git push -u origin feature/login
\`\`\`

### 企业里为什么这么做
- 功能分支隔离开发，避免直接污染主分支
- 先拉最新主分支，减少合并冲突
- 通过 PR 做代码评审，保证质量
- 推送时带上 \`-u\`，后续同步更方便

### 面试里怎么讲
我一般会先从主分支拉一条功能分支出来开发，提交前用 \`git status\` 和 \`git diff --staged\` 检查改动，确认没问题后再 \`push\` 提交 PR。若远端主分支有更新，我会先 \`fetch\` 再 \`pull --rebase\`，尽量把自己的提交整理在最新主线后面。
    `,
  },
  {
    title: '分支合并、冲突和 rebase 怎么处理',
    content: `
### 合并有两种常见方式
- \`git merge\`：把分支合到当前分支，历史更直观
- \`git rebase\`：把提交挪到新基底上，历史更整洁

### 冲突处理流程
\`\`\`bash
git fetch origin
git rebase origin/main
git status
\`\`\`

如果出现冲突：
1. 打开冲突文件，手工保留正确代码
2. \`git add\` 标记已解决
3. \`git rebase --continue\` 或 \`git merge --continue\`

### 面试里要说清楚
- \`merge\` 更安全，适合保留完整历史
- \`rebase\` 更整洁，但不要对已经共享出去的公共分支乱改历史
- 冲突本质上是两个分支改到了同一块代码，需要人工确认最终版本

### 一句话总结
我一般会先 \`fetch\` 看远端变化，再决定是 \`merge\` 还是 \`rebase\`。如果有冲突，就按“定位冲突 -> 解决 -> add -> continue”这条链路处理。
    `,
  },
  {
    title: '回滚、恢复和误操作怎么处理',
    content: `
### 常见回滚方式
\`\`\`bash
git reset --soft HEAD~1
git reset --mixed HEAD~1
git reset --hard HEAD~1
git revert HEAD
\`\`\`

### 这几个命令怎么区分
- \`reset --soft\`：只回退提交，保留暂存和改动
- \`reset --mixed\`：回退提交并取消暂存
- \`reset --hard\`：直接回到指定状态，工作区也清掉，最危险
- \`revert\`：生成一个反向提交，不改写历史，适合线上已发布内容

### 误操作恢复
- 临时改动想先藏起来：\`git stash\`
- 只想撤回某个文件的修改：\`git checkout -- file\` 或 \`git restore file\`
- 只想拿某个提交：\`git cherry-pick <commit>\`

### 企业场景
线上已经推送的提交通常优先用 \`revert\`，不要随便 \`reset --hard\` 后强推；本地个人分支如果还没共享出去，\`reset\` 更适合快速整理历史。
    `,
  },
];

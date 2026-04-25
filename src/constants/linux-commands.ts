import { Command } from './command-types';

export const LINUX_COMMANDS: Command[] = [
  {
    id: 'linux-ls',
    command: 'ls',
    description: '列出目录内容',
    category: 'file',
    example: 'ls -alh /var/log',
    explanation: '查看目录最常用的命令。`-a` 表示 all，显示隐藏文件；`-l` 表示 long format，显示权限、属主、大小、时间等详细信息；`-h` 表示 human readable，以 KB/MB/GB 这种易读方式显示大小。面试里常用它先确认目录里到底有什么、权限是否异常。',
  },
  {
    id: 'linux-cd',
    command: 'cd',
    description: '切换目录',
    category: 'file',
    example: 'cd /etc/nginx',
    explanation: '切换当前工作目录。`cd ..` 返回上一级，`cd ~` 回到当前用户家目录，`cd -` 回到上一次所在目录。面试常追问相对路径和绝对路径的区别，以及为什么脚本里要尽量用绝对路径。',
  },
  {
    id: 'linux-pwd',
    command: 'pwd',
    description: '显示当前工作目录',
    category: 'file',
    example: 'pwd',
    explanation: 'Print Working Directory，用来确认当前所在路径。排查“脚本为什么找不到文件”“配置文件到底从哪里读”这类问题时非常实用。',
  },
  {
    id: 'linux-mkdir',
    command: 'mkdir',
    description: '创建目录',
    category: 'file',
    example: 'mkdir -p /data/app/logs',
    explanation: '`-p` 表示 parents，会递归创建多级目录；如果目录已存在也不会报错。部署脚本里常用它保证目标目录存在。',
  },
  {
    id: 'linux-rm',
    command: 'rm',
    description: '删除文件或目录',
    category: 'file',
    example: 'rm -rf /tmp/test-dir',
    explanation: '`-r` 表示 recursive，递归删除目录；`-f` 表示 force，忽略不存在文件且不再确认。面试里常问为什么 `rm -rf` 危险，因为一旦路径写错会造成不可恢复的数据删除。',
  },
  {
    id: 'linux-cp',
    command: 'cp',
    description: '复制文件或目录',
    category: 'file',
    example: 'cp -r conf/ conf.bak/',
    explanation: '`-r` 表示递归复制目录。线上改配置前常先 `cp` 出一个备份版本，回答时可以强调“先备份，再变更，再验证”。',
  },
  {
    id: 'linux-mv',
    command: 'mv',
    description: '移动或重命名文件',
    category: 'file',
    example: 'mv app.log app.log.bak',
    explanation: '既可以移动文件，也可以重命名文件。常用于日志轮转、文件整理、临时备份切换。',
  },
  {
    id: 'linux-find',
    command: 'find',
    description: '递归查找文件',
    category: 'file',
    example: 'find /var/log -name "*.log" -mtime -1',
    explanation: '`-name` 按文件名查找；`-mtime -1` 表示查最近 1 天内修改过的文件。还常配合 `-size`、`-type`、`-exec` 使用，是“定位日志、查大文件、找配置文件”最常见的命令之一。',
  },
  {
    id: 'linux-du',
    command: 'du',
    description: '查看目录磁盘占用',
    category: 'system',
    example: 'du -sh /var/log/* | sort -h',
    explanation: '`-s` 表示 summarize，只输出汇总结果；`-h` 表示易读单位。排查磁盘满时通常先 `df -h` 看哪个分区满，再用 `du -sh` 逐级往下定位大目录。',
  },
  {
    id: 'linux-df',
    command: 'df',
    description: '查看文件系统剩余空间',
    category: 'system',
    example: 'df -h',
    explanation: '`-h` 表示以易读方式显示磁盘容量。它看的是文件系统整体使用率，适合先判断“是不是磁盘满了”，再结合 `du` 看“是谁占满了”。',
  },
  {
    id: 'linux-cat',
    command: 'cat',
    description: '查看文件内容',
    category: 'text',
    example: 'cat /etc/hosts',
    explanation: '适合快速查看短文件内容，也可用于拼接文件。大文件不建议直接 `cat`，更适合用 `less`、`head`、`tail` 按需看。',
  },
  {
    id: 'linux-head',
    command: 'head',
    description: '查看文件开头内容',
    category: 'text',
    example: 'head -n 20 access.log',
    explanation: '`-n 20` 表示显示前 20 行。常用于看文件头部格式、确认日志字段结构、检查配置文件开头内容。',
  },
  {
    id: 'linux-tail',
    command: 'tail',
    description: '查看文件末尾内容或持续追踪',
    category: 'text',
    example: 'tail -f app.log',
    explanation: '`-f` 表示 follow，持续追踪文件追加内容；`-n 100` 表示只看最后 100 行。线上排查日志时一般会先 `tail -n 100` 看最近错误，再决定是否 `-f` 持续跟踪。',
  },
  {
    id: 'linux-grep',
    command: 'grep',
    description: '按关键字或正则过滤文本',
    category: 'text',
    example: 'grep -n "ERROR" app.log',
    explanation: '`-n` 显示行号，方便定位；`-i` 忽略大小写；`-r` 递归搜索目录；`-E` 支持扩展正则。日志排查、代码搜索、配置核对都很常用。',
  },
  {
    id: 'linux-awk',
    command: 'awk',
    description: '按列处理文本',
    category: 'text',
    example: 'awk \'{print $1, $4}\' access.log',
    explanation: '适合处理结构化文本。`$1` 表示第一列，`$4` 表示第四列。面试里常拿它做日志字段提取、统计、聚合，比如统计某个状态码出现次数。',
  },
  {
    id: 'linux-sed',
    command: 'sed',
    description: '流式编辑文本',
    category: 'text',
    example: 'sed -n \'1,20p\' nginx.conf',
    explanation: '`-n` 表示安静模式，不自动输出；`1,20p` 表示打印第 1 到 20 行；`-i` 表示直接修改原文件。它适合做批量替换、按行抽取、自动改配置，但生产环境使用 `-i` 要先备份。',
  },
  {
    id: 'linux-sort',
    command: 'sort',
    description: '排序文本内容',
    category: 'text',
    example: 'sort -nr cpu.txt',
    explanation: '`-n` 按数值排序，不按字符；`-r` 倒序排列。常和 `uniq -c`、`head` 连用，做 TopN 统计。',
  },
  {
    id: 'linux-uniq',
    command: 'uniq',
    description: '去重或统计相邻重复行',
    category: 'text',
    example: 'sort ip.txt | uniq -c | sort -nr',
    explanation: '`-c` 统计重复次数。注意 `uniq` 只能处理相邻重复行，所以通常前面要先 `sort`。这是面试里非常经典的组合。',
  },
  {
    id: 'linux-wc',
    command: 'wc',
    description: '统计行数、单词数、字节数',
    category: 'text',
    example: 'wc -l app.log',
    explanation: '`-l` 统计行数，`-w` 统计单词数，`-c` 统计字节数。最常用的是 `wc -l`，快速确认文件规模或统计过滤结果数量。',
  },
  {
    id: 'linux-xargs',
    command: 'xargs',
    description: '把标准输入转成命令参数',
    category: 'text',
    example: 'find . -name "*.log" | xargs grep "timeout"',
    explanation: '把前一个命令输出的内容拼成后一个命令的参数。常见于 `find | xargs rm`、`find | xargs grep`。回答时可以说它解决的是“管道传的是文本，命令需要的是参数列表”这个问题。',
  },
  {
    id: 'linux-ps',
    command: 'ps',
    description: '查看进程信息',
    category: 'process',
    example: 'ps -ef | grep java',
    explanation: '`-e` 表示查看所有进程，`-f` 表示完整格式输出。通常先用它确认进程在不在、PID 是多少、是谁启动的。',
  },
  {
    id: 'linux-top',
    command: 'top',
    description: '动态查看系统负载和进程',
    category: 'process',
    example: 'top',
    explanation: '实时查看 CPU、内存、负载和热点进程。面试里常问 load average 的含义，以及 CPU 飙高时为什么先看 top。',
  },
  {
    id: 'linux-free',
    command: 'free',
    description: '查看内存使用情况',
    category: 'process',
    example: 'free -m',
    explanation: '`-m` 按 MB 显示，`-g` 按 GB 显示，`-h` 按易读单位显示。它能快速看总内存、可用内存、缓存和 swap 是否被打满。',
  },
  {
    id: 'linux-kill',
    command: 'kill',
    description: '向进程发送信号',
    category: 'process',
    example: 'kill -9 12345',
    explanation: '`kill -15` 对应 SIGTERM，给进程优雅退出机会；`kill -9` 对应 SIGKILL，直接强制终止。面试里通常建议优先 `-15`，只有进程卡死再考虑 `-9`。',
  },
  {
    id: 'linux-nohup',
    command: 'nohup',
    description: '后台运行命令并忽略挂断信号',
    category: 'process',
    example: 'nohup java -jar app.jar > app.log 2>&1 &',
    explanation: '`nohup` 让命令在终端断开后继续运行；`>` 把标准输出写入日志；`2>&1` 把标准错误重定向到标准输出；`&` 表示放到后台。面试非常喜欢问这条命令每一段分别做什么。',
  },
  {
    id: 'linux-systemctl',
    command: 'systemctl',
    description: '管理 systemd 服务',
    category: 'service',
    example: 'systemctl status nginx',
    explanation: '`status` 看状态，`start` 启动，`stop` 停止，`restart` 重启，`reload` 重载配置，`enable` 设置开机自启。现代 Linux 服务管理基本都离不开它。',
  },
  {
    id: 'linux-journalctl',
    command: 'journalctl',
    description: '查看 systemd 服务日志',
    category: 'service',
    example: 'journalctl -u nginx -f',
    explanation: '`-u` 指定服务单元，`-f` 持续追踪，`-n 100` 看最后 100 行。很多通过 systemd 启动的服务日志不会直接写文件，这时就要看 `journalctl`。',
  },
  {
    id: 'linux-ss',
    command: 'ss',
    description: '查看端口和连接',
    category: 'network',
    example: 'ss -lntp',
    explanation: '`-l` 只看监听端口，`-n` 数字方式显示地址和端口，`-t` 查看 TCP，`-p` 显示对应进程。排查端口是否监听、是否绑定成功时很高频。',
  },
  {
    id: 'linux-lsof',
    command: 'lsof',
    description: '查看文件或端口被谁占用',
    category: 'network',
    example: 'lsof -i :8080',
    explanation: '`-i :8080` 表示查看占用 8080 端口的进程。除了看端口冲突，它还可以查“某个文件为什么删不掉，是谁还在占用”。',
  },
  {
    id: 'linux-curl',
    command: 'curl',
    description: '发送 HTTP 请求',
    category: 'network',
    example: 'curl -I http://127.0.0.1:8080/health',
    explanation: '`-I` 只看响应头，适合快速判断服务是否通；`-v` 显示详细请求过程；`-X` 指定请求方法；`-H` 传请求头。排查“服务是否起来”“网关是否转发成功”时非常常用。',
  },
  {
    id: 'linux-wget',
    command: 'wget',
    description: '下载文件',
    category: 'network',
    example: 'wget https://example.com/app.tar.gz',
    explanation: '服务器上下载安装包、脚本、压缩包很常见。和 `curl` 相比，它更偏下载场景，适合直接把远程文件拉到本地。',
  },
  {
    id: 'linux-tar',
    command: 'tar',
    description: '打包与解压文件',
    category: 'deploy',
    example: 'tar -zxvf app.tar.gz',
    explanation: '`-z` 表示通过 gzip 处理，`-x` 表示解压，`-v` 表示显示详细过程，`-f` 表示指定文件名。部署、备份、日志归档时都很高频。',
  },
  {
    id: 'linux-chmod',
    command: 'chmod',
    description: '修改文件权限',
    category: 'permission',
    example: 'chmod 755 deploy.sh',
    explanation: '`755` 表示所有者可读写执行，组和其他用户可读执行。面试里常问 `rwx` 分别是什么、为什么脚本没有执行权限会报错。',
  },
  {
    id: 'linux-chown',
    command: 'chown',
    description: '修改文件属主和属组',
    category: 'permission',
    example: 'chown -R www-data:www-data /var/www/app',
    explanation: '`-R` 表示递归处理目录；`www-data:www-data` 前者是属主，后者是属组。服务能不能读写文件，很多时候不是权限位不对，而是属主属组不对。',
  },
  {
    id: 'linux-crontab',
    command: 'crontab',
    description: '管理定时任务',
    category: 'service',
    example: 'crontab -e',
    explanation: '`-e` 编辑当前用户定时任务，`-l` 查看当前任务列表。面试里常问 cron 表达式、任务输出去哪了、为什么定时任务和手工执行结果不一致。',
  },
];

export const LINUX_DOCS = [
  {
    title: 'Linux 面试总览与答题思路',
    content: `
Linux 在后端面试里，重点通常不是“会不会敲命令”，而是你能不能把线上问题讲成一条清晰的排查链路。

### 面试官真正想听的重点
- 你知道先看什么，再看什么，而不是命令乱堆
- 你能区分“进程问题、端口问题、网络问题、权限问题、配置问题”
- 你能解释命令参数，不只是背出命令
- 你能把排查结果和业务现象对应起来

### 高频考察方向
- 文件系统与目录结构
- 权限模型与属主属组
- 进程、信号、后台运行
- 日志排查与文本处理
- 端口监听、服务状态、网络连通
- CPU、内存、磁盘性能诊断
- Shell 管道、重定向、定时任务

### 建议的答题模板
1. 先确认现象，是完全不可用，还是部分请求失败
2. 再确认进程、端口、日志、资源是否正常
3. 然后缩小范围到配置、权限、依赖服务、网络或代码问题
4. 最后给出修复动作和预防方案

如果你能把这套逻辑讲顺，Linux 这部分基本就够应对大多数后端岗位面试。
    `,
  },
  {
    title: '文件系统、目录结构与常见命令参数',
    content: `
Linux 使用树状目录结构，核心思想是一切皆文件。

### 重要目录及作用
- \`/\`：根目录，所有路径的起点
- \`/etc\`：系统和服务配置目录，比如 \`nginx.conf\`
- \`/var\`：经常变化的数据，比如日志、缓存、队列文件
- \`/var/log\`：大多数服务日志目录
- \`/home\`：普通用户家目录
- \`/root\`：root 用户家目录
- \`/tmp\`：临时目录，可能被系统定期清理
- \`/usr\`：系统应用和共享资源
- \`/opt\`：第三方软件常见安装目录

### 面试里要会说的点
- 日志通常放 \`/var/log\`，因为它属于会持续变化的数据
- 配置通常放 \`/etc\`，便于统一管理和备份
- 线上不要把关键文件放 \`/tmp\`，因为它可能被清理

### 这些命令分别是干什么的
\`\`\`bash
pwd
ls -alh
cd /etc/nginx
mkdir -p /data/app/logs
find /var/log -name "*.log"
\`\`\`

### 参数解释
- \`ls -alh\`
  - \`-a\`：显示隐藏文件
  - \`-l\`：显示详细信息
  - \`-h\`：文件大小按 KB/MB/GB 显示
- \`mkdir -p\`
  - \`-p\`：递归创建多级目录
- \`find -name\`
  - \`-name\`：按文件名查找

### 面试回答示例
如果让我定位配置文件或日志文件，我会先用 \`pwd\` 和 \`ls -alh\` 确认当前目录，再根据 Linux 目录约定去 \`/etc\` 或 \`/var/log\` 下查找，必要时用 \`find\` 做递归搜索。
    `,
  },
  {
    title: '权限模型、chmod、chown 怎么答',
    content: `
Linux 是多用户系统，所以权限模型是高频面试点。

### 三类身份
- Owner：文件所有者
- Group：文件所属组
- Others：其他用户

### 三类权限
- \`r\`：read，读权限，数值 4
- \`w\`：write，写权限，数值 2
- \`x\`：execute，执行权限，数值 1

### 常见权限值
- \`755\`：所有者读写执行，其他人读执行
- \`644\`：所有者读写，其他人只读
- \`700\`：只有所有者可以访问

### 高频命令
\`\`\`bash
ls -l
chmod 755 deploy.sh
chown -R nginx:nginx /usr/share/nginx/html
\`\`\`

### 参数解释
- \`ls -l\`
  - 重点看权限位、属主、属组
- \`chmod 755\`
  - 修改权限位
- \`chown -R\`
  - \`-R\`：递归修改目录下所有文件

### 面试中的典型场景
- 脚本不能执行：通常是没有 \`x\` 权限
- 服务读不到配置：可能是属主属组不对
- 服务能启动但写不了日志：目录权限或属主不匹配

### 标准回答
如果遇到权限问题，我会先 \`ls -l\` 看权限位和属主属组，再结合服务启动用户判断是否有读写执行权限。脚本执行失败通常先看是否缺少 \`x\` 权限，服务访问文件失败则优先排查目录权限和文件归属。
    `,
  },
  {
    title: 'Java 服务启动后访问不到，怎么排查',
    content: `
这是后端面试最常见的 Linux 场景题之一，回答一定要有顺序。

### 标准排查链路
1. 先看进程在不在
\`\`\`bash
ps -ef | grep java
\`\`\`

2. 再看端口有没有监听
\`\`\`bash
ss -lntp | grep 8080
\`\`\`

3. 如果端口监听了，先在本机访问
\`\`\`bash
curl -I http://127.0.0.1:8080/health
\`\`\`

4. 如果本机通、外部不通，排查防火墙、安全组、反向代理配置

5. 如果进程没起来或接口不通，直接看日志
\`\`\`bash
tail -n 100 app.log
journalctl -u app -n 100
\`\`\`

### 这道题面试官想听什么
- 你不会一上来就重启服务
- 你知道先区分是进程问题还是网络问题
- 你知道本机访问和外部访问能帮助定位问题层次

### 可以这样回答
我会先用 \`ps -ef | grep java\` 确认进程是否存在，再用 \`ss -lntp\` 看目标端口有没有监听。如果端口已经监听，我会先用 \`curl 127.0.0.1\` 验证服务在本机是否可用。本机能通但外部不通，说明更偏向防火墙、安全组、Nginx 或网关转发问题；如果本机都不通，就回到服务日志和配置本身继续排查。
    `,
  },
  {
    title: '端口被占用、日志没输出、配置没生效怎么办',
    content: `
这也是一组特别常见的面试场景，通常能串在一起问。

### 端口被占用
\`\`\`bash
lsof -i :8080
ss -lntp | grep 8080
\`\`\`

说明：
- \`lsof -i :8080\`：看哪个进程占用了 8080 端口
- \`ss -lntp\`：看监听端口以及对应进程

### 日志没有输出
\`\`\`bash
tail -n 100 app.log
journalctl -u app -f
\`\`\`

排查思路：
- 日志路径配错了
- 进程没真正启动成功
- 服务不是直接写文件，而是写到 systemd journal
- 目录权限不对，导致没法写日志

### 配置没生效
\`\`\`bash
cat /etc/nginx/nginx.conf
ps -ef | grep nginx
systemctl reload nginx
systemctl status nginx
\`\`\`

排查思路：
- 改错文件了，实际加载的不是这份配置
- 配置改了但没 reload / restart
- 有 include 子配置，真正生效的在别的文件
- 多环境配置切错了

### 面试回答要点
端口被占用我会先定位占用进程，而不是直接强杀。日志没输出我会判断是路径问题、权限问题还是 systemd 接管。配置没生效我会先确认程序实际加载的是哪份配置，再确认是否完成 reload。
    `,
  },
  {
    title: '磁盘满了，如何快速定位大文件',
    content: `
磁盘满是很典型的线上问题，回答时要体现“先全局，再局部”的思路。

### 推荐排查步骤
1. 先看哪个分区满了
\`\`\`bash
df -h
\`\`\`

2. 再看大目录
\`\`\`bash
du -sh /*
du -sh /var/*
\`\`\`

3. 继续下钻到具体目录
\`\`\`bash
du -sh /var/log/*
\`\`\`

4. 查大文件
\`\`\`bash
find /var/log -type f -size +500M
\`\`\`

### 参数解释
- \`df -h\`
  - \`-h\`：易读单位
- \`du -sh\`
  - \`-s\`：只看汇总
  - \`-h\`：易读单位
- \`find -type f -size +500M\`
  - \`-type f\`：只找普通文件
  - \`-size +500M\`：找大于 500MB 的文件

### 标准回答
我会先用 \`df -h\` 确认是哪个挂载点满了，然后用 \`du -sh\` 一层层往下找大目录，最后用 \`find\` 定位大文件。一般最常见的是日志暴涨、临时文件未清理、Docker 镜像层膨胀或备份文件堆积。
    `,
  },
  {
    title: 'CPU 飙高、内存打满时先看什么',
    content: `
这类题面试里很爱问，因为它能测出你有没有真实排障经验。

### CPU 飙高先看什么
\`\`\`bash
top
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%cpu | head
\`\`\`

思路：
- 先找到最占 CPU 的进程
- 再结合业务日志、线程栈、接口流量判断原因
- 常见原因：死循环、频繁 GC、热点请求、锁竞争

### 内存打满先看什么
\`\`\`bash
free -m
top
ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head
\`\`\`

思路：
- 先看是系统整体没内存，还是某个进程异常增长
- 再看 swap 是否被大量使用
- 常见原因：Java 堆膨胀、缓存过大、内存泄漏、对象积压

### 参数解释
- \`free -m\`
  - \`-m\`：按 MB 显示
- \`ps --sort=-%cpu\`
  - 按 CPU 使用率倒序排序
- \`head\`
  - 只看前几条，快速定位热点

### 标准回答
CPU 飙高时我会先用 \`top\` 和 \`ps\` 找出热点进程，如果是 Java 进程再继续看线程和 GC。内存打满时我会先用 \`free -m\` 看整体内存和 swap，再用 \`ps\` 看是不是某个进程异常占用，最后结合日志和应用层信息判断是缓存、堆内存还是泄漏问题。
    `,
  },
  {
    title: '日志排查与 grep、awk、sed 应该怎么讲',
    content: `
日志排查是最能体现 Linux 实战能力的部分。

### 常用组合
\`\`\`bash
tail -n 100 app.log
tail -f app.log
grep -n "ERROR" app.log
grep -i "timeout" app.log | tail -n 20
awk '{print $1, $4}' access.log
sort ip.txt | uniq -c | sort -nr | head
\`\`\`

### 参数解释
- \`tail -n 100\`
  - \`-n\`：显示最后多少行
- \`tail -f\`
  - 实时追踪新增日志
- \`grep -n\`
  - \`-n\`：显示匹配行号
- \`grep -i\`
  - \`-i\`：忽略大小写

### grep、awk、sed 的区别
- \`grep\`：查找和过滤，适合按关键字筛日志
- \`awk\`：按列处理，适合结构化分析和统计
- \`sed\`：按规则编辑文本，适合替换和抽取区间

### 一个经典回答
线上排查日志时，我一般先 \`tail -n 100\` 看最近错误，再用 \`grep\` 按报错关键字、traceId 或模块过滤。如果需要从结构化日志里提取字段做统计，我会用 \`awk\`；如果需要批量替换配置或抽取某段内容，我会用 \`sed\`。
    `,
  },
  {
    title: 'systemctl、journalctl、nohup、重定向都是什么意思',
    content: `
这几个点在面试里非常容易连着问。

### systemctl 常见操作
\`\`\`bash
systemctl status nginx
systemctl start nginx
systemctl restart nginx
systemctl reload nginx
systemctl enable nginx
\`\`\`

解释：
- \`status\`：查看服务状态
- \`start\`：启动服务
- \`restart\`：重启服务
- \`reload\`：重载配置，尽量不中断服务
- \`enable\`：设置开机自启

### journalctl 常见操作
\`\`\`bash
journalctl -u nginx -n 100
journalctl -u nginx -f
\`\`\`

解释：
- \`-u\`：指定服务单元
- \`-n 100\`：显示最后 100 行
- \`-f\`：持续追踪

### nohup 命令拆解
\`\`\`bash
nohup java -jar app.jar > app.log 2>&1 &
\`\`\`

逐段解释：
- \`nohup\`：忽略挂断信号，终端断开后进程继续跑
- \`>\`：把标准输出写到文件
- \`2>&1\`：把标准错误合并到标准输出
- \`&\`：放到后台执行

### 面试里可以这样说
如果是临时手工启动 Java 服务，我会用 \`nohup java -jar app.jar > app.log 2>&1 &\`。如果是长期稳定运行的线上服务，更推荐用 \`systemctl\` 托管，因为它更适合统一管理、开机自启和日志采集。
    `,
  },
  {
    title: 'Shell 管道、重定向、xargs 的本质',
    content: `
这一块不需要讲很深，但要讲清楚。

### 关键符号
- \`|\`：管道，把前一个命令的标准输出交给后一个命令处理
- \`>\`：覆盖重定向到文件
- \`>>\`：追加重定向到文件
- \`2>\`：把标准错误重定向到文件
- \`2>&1\`：把标准错误重定向到标准输出
- \`&\`：后台运行

### 典型例子
\`\`\`bash
grep "ERROR" app.log | wc -l
nohup java -jar app.jar > app.log 2>&1 &
find . -name "*.log" | xargs grep "timeout"
\`\`\`

### 怎么解释
- 第一条：先筛出 ERROR，再统计有多少行
- 第二条：后台启动程序并把正常输出和错误输出都写进日志
- 第三条：先找出所有日志文件，再把文件列表作为参数传给 grep

### xargs 为什么存在
因为管道传的是文本流，不是命令参数。很多命令需要的是“参数列表”，这时就需要 \`xargs\` 把输入转成参数。

### 面试回答建议
我理解管道是命令之间的数据流转，重定向是把输出改写到文件或别的输出目标，\`xargs\` 则是把文本流转换成命令参数，这三个概念经常一起出现在日志排查和批量处理场景里。
    `,
  },
];

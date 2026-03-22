// Linux 命令
import { Command } from './command-types';

export const LINUX_COMMANDS: Command[] = [
  {
    id: 'ls',
   command: 'ls',
    description: '列出目录内容',
    category: 'file',
    example: 'ls-alh',
    explanation: '列出当前目录下的文件。-a 显示隐藏文件，-l 显示详细信息，-h 以易读格式显示大小。'
  },
  {
    id: 'cd',
   command: 'cd',
    description: '切换目录',
    category: 'file',
    example: 'cd /var/www/html',
    explanation: 'Change Directory。cd .. 返回上一级，cd ~ 进入用户主目录。'
  },
  {
    id: 'pwd',
   command: 'pwd',
    description: '显示当前工作目录',
    category: 'file',
    example: 'pwd',
    explanation: 'Print Working Directory。显示你当前所在的完整路径。'
  },
  {
    id: 'mkdir',
   command: 'mkdir',
    description: '创建新目录',
    category: 'file',
    example: 'mkdir -p project/src',
    explanation: 'Make Directory。-p 参数可以递归创建多级目录。'
  },
  {
    id: 'rm-linux',
   command: 'rm',
    description: '删除文件或目录',
    category: 'file',
    example: 'rm -rf folder_name',
    explanation: 'Remove。-r 表示递归删除目录，-f 表示强制删除。请谨慎使用 rm -rf /。'
  },
  {
    id: 'cp',
   command: 'cp',
    description: '复制文件或目录',
    category: 'file',
    example: 'cp source.txt destination.txt',
    explanation: 'Copy。-r 参数用于复制整个目录。'
  },
  {
    id: 'mv',
   command: 'mv',
    description: '移动或重命名文件',
    category: 'file',
    example: 'mv old_name.txt new_name.txt',
    explanation: 'Move。既可以移动文件位置，也可以给文件重命名。'
  },
  {
    id: 'cat',
   command: 'cat',
    description: '查看文件内容',
    category: 'file',
    example: 'cat /etc/passwd',
    explanation: 'Concatenate。将文件内容输出到终端。'
  },
  {
    id: 'grep',
   command: 'grep',
    description: '在文件中查找字符串',
    category: 'text',
    example: 'grep "error" access.log',
    explanation: '强大的文本搜索工具，支持正则表达式。'
  },
  {
    id: 'chmod',
   command: 'chmod',
    description: '修改文件权限',
    category: 'system',
    example: 'chmod 755 script.sh',
    explanation: 'Change Mode。755 表示所有者可读写执行，组和其他用户可读执行。'
  },
  {
    id: 'top',
   command: 'top',
    description: '显示系统进程',
    category: 'system',
    example: 'top',
    explanation: '实时显示系统中各个进程的资源占用状况。'
  }
];

export const LINUX_DOCS = [
  {
    title: 'Linux 文件系统结构',
   content: `
Linux 采用树状目录结构，一切皆文件。

### 重要目录
- \`/\`: 根目录，所有目录的起点。
- \`/bin\`: 存放常用二进制命令。
- \`/etc\`: 存放系统配置文件。
- \`/home\`: 用户主目录。
- \`/var\`: 存放经常变化的文件，如日志。
- \`/root\`: 超级用户的主目录。
    `
  },
  {
    title: '权限管理',
   content: `
Linux 是多用户系统，权限控制非常严格。

### 权限类型
- **r (Read)**: 读权限 (4)
- **w (Write)**: 写权限 (2)
- **x (Execute)**: 执行权限 (1)

### 用户分类
- **Owner**: 文件所有者
- **Group**: 文件所属组
- **Others**: 其他用户
    `
  },
  {
    title: '管道与重定向',
   content: `
Linux 的精髓在于将简单的工具组合起来完成复杂的任务。

- \`|\`: 管道，将前一个命令的输出作为后一个命令的输入。
- \`>\`: 输出重定向，覆盖写入文件。
- \`>>\`: 追加重定向，在文件末尾追加。
    `
  }
];

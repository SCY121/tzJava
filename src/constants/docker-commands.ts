// Docker 命令
import { Command } from './command-types';

export const DOCKER_COMMANDS: Command[] = [
  {
    id: 'run',
   command: 'docker run',
    description: '运行一个容器',
    category: 'basic',
    example: 'docker run -d -p 80:80 nginx',
    explanation: '这是最常用的命令。-d 表示后台运行，-p 表示端口映射（主机端口:容器端口）。'
  },
  {
    id: 'pull',
   command: 'docker pull',
    description: '从仓库拉取镜像',
    category: 'image',
    example: 'docker pull ubuntu:20.04',
    explanation: '从 Docker Hub 下载指定的镜像到本地。'
  },
  {
    id: 'ps',
   command: 'docker ps',
    description: '列出运行中的容器',
    category: 'container',
    example: 'docker ps -a',
    explanation: '-a 参数可以列出所有容器，包括已经停止的。'
  },
  {
    id: 'images',
   command: 'docker images',
    description: '列出本地镜像',
    category: 'image',
    example: 'docker images',
    explanation: '查看你本地已经下载或构建的所有 Docker 镜像。'
  },
  {
    id: 'stop',
   command: 'docker stop',
    description: '停止运行中的容器',
    category: 'container',
    example: 'docker stop <container_id>',
    explanation: '优雅地停止一个正在运行的容器。'
  },
  {
    id: 'rm',
   command: 'docker rm',
    description: '删除容器',
    category: 'container',
    example: 'docker rm -f <container_id>',
    explanation: '删除一个或多个容器。-f 表示强制删除运行中的容器。'
  },
  {
    id: 'rmi',
   command: 'docker rmi',
    description: '删除镜像',
    category: 'image',
    example: 'docker rmi <image_id>',
    explanation: '删除本地的一个或多个镜像。'
  },
  {
    id: 'build',
   command: 'docker build',
    description: '构建镜像',
    category: 'image',
    example: 'docker build -t my-app .',
    explanation: '根据当前目录下的 Dockerfile 构建一个新的镜像。-t 用于指定标签。'
  },
  {
    id: 'exec',
   command: 'docker exec',
    description: '在运行中的容器内执行命令',
    category: 'container',
    example: 'docker exec -it <container_id> /bin/bash',
    explanation: '-it 允许你进入交互式终端。常用于调试容器内部。'
  }
];

export const DOCKER_DOCS = [
  {
    title: '什么是 Docker?',
   content: `
Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的镜像中。

### 核心概念
1. **镜像 (Image)**: 相当于一个"模板"，包含运行软件所需的所有代码、库、环境变量和配置文件。
2. **容器 (Container)**: 镜像的运行实例。你可以把它看作是一个简易版的 Linux 环境。
3. **仓库 (Repository)**: 集中存放镜像文件的地方，最著名的是 Docker Hub。
    `
  },
  {
    title: 'Dockerfile 基础',
   content: `
Dockerfile 是一个文本文件，其中包含了用户可以调用的一系列命令来组装镜像。

### 常用指令
- \`FROM\`: 指定基础镜像
- \`WORKDIR\`: 设置工作目录
- \`COPY\`: 复制文件到镜像
- \`RUN\`: 执行命令（在构建时）
- \`CMD\`: 设置容器启动时默认执行的命令
    `
  }
];

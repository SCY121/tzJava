import { Command } from './command-types';

export const DOCKER_COMMANDS: Command[] = [
  {
    id: 'docker-run',
    command: 'docker run',
    description: '创建并启动容器',
    category: 'container',
    example: 'docker run -d --name web -p 8080:80 nginx',
    explanation: '最核心命令之一。常见参数有 `-d` 后台运行、`--name` 指定容器名、`-p` 端口映射、`-e` 环境变量、`-v` 挂载卷。',
  },
  {
    id: 'docker-pull',
    command: 'docker pull',
    description: '拉取镜像',
    category: 'image',
    example: 'docker pull redis:7.2',
    explanation: '从镜像仓库拉取指定镜像和 tag。面试里常问不写 tag 默认是什么、latest 是否可靠。',
  },
  {
    id: 'docker-build',
    command: 'docker build',
    description: '根据 Dockerfile 构建镜像',
    category: 'image',
    example: 'docker build -t my-app:1.0 .',
    explanation: '构建业务镜像的核心命令。常见追问包括构建缓存、多阶段构建、`.dockerignore` 的作用。',
  },
  {
    id: 'docker-images',
    command: 'docker images',
    description: '查看本地镜像列表',
    category: 'image',
    example: 'docker images',
    explanation: '查看镜像仓库名、tag、镜像 ID、创建时间和大小。',
  },
  {
    id: 'docker-rmi',
    command: 'docker rmi',
    description: '删除镜像',
    category: 'image',
    example: 'docker rmi my-app:1.0',
    explanation: '删除本地镜像。若镜像仍被容器引用，通常需要先删除容器。',
  },
  {
    id: 'docker-tag',
    command: 'docker tag',
    description: '给镜像打标签',
    category: 'image',
    example: 'docker tag my-app:1.0 registry.example.com/my-app:1.0',
    explanation: '推送私有仓库前经常要重新打 tag。',
  },
  {
    id: 'docker-push',
    command: 'docker push',
    description: '推送镜像到仓库',
    category: 'image',
    example: 'docker push registry.example.com/my-app:1.0',
    explanation: 'CI/CD、镜像发布、私有仓库场景高频操作。',
  },
  {
    id: 'docker-ps',
    command: 'docker ps',
    description: '查看容器列表',
    category: 'container',
    example: 'docker ps -a',
    explanation: '`docker ps` 看运行中的容器，`-a` 看所有容器，包括已退出容器。',
  },
  {
    id: 'docker-stop',
    command: 'docker stop',
    description: '停止容器',
    category: 'container',
    example: 'docker stop web',
    explanation: '优雅停止容器。底层会先发送终止信号，再等待超时后强制结束。',
  },
  {
    id: 'docker-start',
    command: 'docker start',
    description: '启动已停止的容器',
    category: 'container',
    example: 'docker start web',
    explanation: '对已存在但停止状态的容器重新启动。',
  },
  {
    id: 'docker-restart',
    command: 'docker restart',
    description: '重启容器',
    category: 'container',
    example: 'docker restart web',
    explanation: '常用于重新加载配置或临时恢复服务。',
  },
  {
    id: 'docker-rm',
    command: 'docker rm',
    description: '删除容器',
    category: 'container',
    example: 'docker rm -f web',
    explanation: '`-f` 可强制删除运行中的容器。和 `stop` 的区别是一个停止，一个删除。',
  },
  {
    id: 'docker-exec',
    command: 'docker exec',
    description: '进入运行中的容器执行命令',
    category: 'container',
    example: 'docker exec -it web /bin/sh',
    explanation: '线上排障和调试高频命令。常问 `exec` 和 `attach` 的区别。',
  },
  {
    id: 'docker-logs',
    command: 'docker logs',
    description: '查看容器日志',
    category: 'container',
    example: 'docker logs -f --tail=200 web',
    explanation: '看容器标准输出日志的核心命令。`-f` 持续追踪，`--tail` 限制尾部条数。',
  },
  {
    id: 'docker-inspect',
    command: 'docker inspect',
    description: '查看容器或镜像详细信息',
    category: 'container',
    example: 'docker inspect web',
    explanation: '能看到挂载、环境变量、IP、端口映射、启动参数等详细信息，排障很有用。',
  },
  {
    id: 'docker-stats',
    command: 'docker stats',
    description: '查看容器资源使用情况',
    category: 'monitor',
    example: 'docker stats',
    explanation: '查看 CPU、内存、网络 IO、磁盘 IO。面试里经常会问容器是否会无限吃宿主机资源。',
  },
  {
    id: 'docker-cp',
    command: 'docker cp',
    description: '在宿主机和容器间拷贝文件',
    category: 'container',
    example: 'docker cp app.log web:/tmp/app.log',
    explanation: '临时导出日志、导入配置、拷贝调试文件时很方便。',
  },
  {
    id: 'docker-network',
    command: 'docker network',
    description: '管理 Docker 网络',
    category: 'network',
    example: 'docker network ls',
    explanation: '面试中经常问 bridge、host、none 网络模式，以及容器互通怎么做。',
  },
  {
    id: 'docker-volume',
    command: 'docker volume',
    description: '管理 Docker 数据卷',
    category: 'storage',
    example: 'docker volume ls',
    explanation: '解决容器删除后数据丢失问题。面试里常问 volume 和 bind mount 的区别。',
  },
  {
    id: 'docker-save',
    command: 'docker save',
    description: '导出镜像为 tar 包',
    category: 'image',
    example: 'docker save -o my-app.tar my-app:1.0',
    explanation: '适用于离线交付、不能直连仓库的场景。',
  },
  {
    id: 'docker-load',
    command: 'docker load',
    description: '从 tar 包导入镜像',
    category: 'image',
    example: 'docker load -i my-app.tar',
    explanation: '和 `docker save` 配套使用，用于离线镜像分发。',
  },
  {
    id: 'docker-compose-up',
    command: 'docker compose up',
    description: '启动 Compose 编排服务',
    category: 'compose',
    example: 'docker compose up -d',
    explanation: '多容器项目高频命令。常见于本地开发、联调环境和简单部署。',
  },
  {
    id: 'docker-compose-down',
    command: 'docker compose down',
    description: '停止并移除 Compose 服务',
    category: 'compose',
    example: 'docker compose down',
    explanation: '停止由 compose 启动的一组服务。加 `-v` 还会删除相关卷。',
  },
  {
    id: 'docker-compose-logs',
    command: 'docker compose logs',
    description: '查看 Compose 服务日志',
    category: 'compose',
    example: 'docker compose logs -f app',
    explanation: '排查多服务项目时很方便，可以按服务名筛选日志。',
  },
  {
    id: 'docker-system-prune',
    command: 'docker system prune',
    description: '清理无用镜像、容器、网络',
    category: 'cleanup',
    example: 'docker system prune -a',
    explanation: '磁盘清理高频命令，但要非常小心。面试里也可能问 Docker 磁盘膨胀如何处理。',
  },
  {
    title: 'Docker、Compose 与 Kubernetes 的关系',
    content: `
### 先把定位讲清楚
- **Docker**：负责把应用和依赖打成镜像，并以容器方式运行
- **Docker Compose**：适合单机或小规模环境下编排多容器服务
- **Kubernetes**：面向集群层面的容器编排平台，负责调度、扩缩容、自愈、服务发现等

### 面试里怎么答三者关系
1. Docker 解决的是“怎么打包、怎么跑”
2. Compose 解决的是“单机上一组服务怎么一起跑”
3. Kubernetes 解决的是“多机器、多实例、生产级集群怎么稳定跑”

### 常见对比点
- 部署规模：Compose 偏单机，Kubernetes 偏集群
- 自动恢复：Compose 弱，Kubernetes 强
- 扩缩容：Compose 偏手动，Kubernetes 原生支持
- 服务治理：Kubernetes 更完整

### 适合什么场景
- 本地开发联调：Compose 很合适
- 中小型单机部署：Compose 可以胜任
- 大规模生产集群：通常交给 Kubernetes

### 一句话总结
Docker 是容器基础，Compose 是轻量编排，Kubernetes 是生产级集群编排。
    `,
  },
 ] as any;

export const DOCKER_DOCS = [
  {
    title: 'Docker 面试高频总览',
    content: `
大厂面试里，Docker 往往不会只问命令，而是围绕“为什么用、怎么构建、怎么排障、怎么优化”展开。

### 高频方向
- 镜像、容器、仓库的区别
- Docker 和虚拟机的区别
- Dockerfile 指令与镜像分层
- 容器网络、端口映射、服务互通
- 数据卷、bind mount、数据持久化
- 多阶段构建、镜像瘦身、启动优化
- 容器日志、进入容器、资源限制、排障
- Docker Compose 的使用场景

### 常见场景题
- 为什么容器启动后马上退出？
- 为什么宿主机能访问、容器里访问不到？
- 为什么镜像体积特别大？
- 为什么删掉容器后数据没了？
    `,
  },
  {
    title: '镜像、容器、仓库三者关系',
    content: `
### 核心概念
- **镜像 Image**：静态模板，包含运行应用需要的文件、依赖、环境和元数据
- **容器 Container**：镜像运行后的实例
- **仓库 Repository**：集中存放镜像的地方，如 Docker Hub、Harbor

### 类比理解
- 镜像像“安装包”或“类”
- 容器像“安装后运行的程序”或“对象”
- 仓库像“应用商店”或“制品库”

### 常见命令
\`\`\`bash
docker pull nginx:latest
docker images
docker run -d --name web nginx
docker ps -a
\`\`\`

### 面试常问
1. 同一个镜像可以启动多个容器吗？
   可以，容器是镜像的运行实例。
2. 删除容器会不会删除镜像？
   不会，除非你显式删除镜像。
    `,
  },
  {
    title: 'Docker 和虚拟机的区别',
    content: `
### 虚拟机
- 基于 Hypervisor
- 每台 VM 都要带完整 Guest OS
- 隔离更重，资源占用也更高

### Docker 容器
- 本质是宿主机内核上的进程隔离
- 共享宿主机内核
- 启动更快，资源更轻

### 面试回答重点
- Docker 不是“更轻的虚拟机”，而是“基于操作系统层面的隔离”
- Docker 核心依赖 Linux Namespace + Cgroups + UnionFS
- 优势是交付一致、启动快、资源利用率高
- 不足是隔离性通常不如 VM，尤其在安全和内核层面
    `,
  },
  {
    title: 'Dockerfile 高频指令与最佳实践',
    content: `
### 高频指令
- FROM：基础镜像
- WORKDIR：工作目录
- COPY / ADD：复制文件
- RUN：构建阶段执行命令
- ENV：环境变量
- EXPOSE：声明端口
- CMD：容器默认启动命令
- ENTRYPOINT：固定入口

### 示例
\`\`\`dockerfile
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY target/app.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

### 最佳实践
- 优先选小体积基础镜像
- 善用 .dockerignore
- 把不常变的层放前面，提高构建缓存命中率
- 应用构建与运行分离，尽量使用多阶段构建
- 不要把敏感信息写进镜像层

### 面试常问
- CMD 和 ENTRYPOINT 区别？
- 为什么镜像分层能加速构建？
- 为什么要做多阶段构建？
    `,
  },
  {
    title: '镜像分层、多阶段构建与瘦身',
    content: `
Docker 镜像由多层组成，每条 Dockerfile 指令通常会形成新层。

### 多阶段构建示例
\`\`\`dockerfile
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /src
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /src/target/app.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

### 优点
- 构建环境和运行环境分离
- 最终镜像不带 Maven、源码、缓存
- 更安全、更小、更快

### 面试常问
- 为什么你的镜像有 1G？
- 如何把 Java 项目镜像从 1G 减到 300M 以下？
- 为什么构建缓存有时失效？
    `,
  },
  {
    title: '容器生命周期与常见排障',
    content: `
### 高频命令
\`\`\`bash
docker ps -a
docker logs -f app
docker inspect app
docker exec -it app /bin/sh
docker restart app
\`\`\`

### 常见问题
1. 容器启动后马上退出
   - 主进程执行完了
   - 启动命令写错
   - 配置缺失导致应用启动失败

2. 容器一直重启
   - 应用启动异常
   - 健康检查失败
   - 依赖服务未就绪

3. 容器里没有 bash
   - 很多精简镜像只有 sh

### 面试追问
- 为什么 Docker 容器必须有前台主进程？
- docker exec 和 docker attach 区别？
    `,
  },
  {
    title: '网络、端口映射与容器互通',
    content: `
### 常见网络模式
- bridge：默认模式，最常见
- host：直接使用宿主机网络
- none：无网络

### 高频命令
\`\`\`bash
docker network ls
docker inspect app
docker run -p 8080:80 nginx
\`\`\`

### 面试常问
1. -p 8080:80 表示什么？
   宿主机 8080 映射到容器 80。
2. 两个容器如何通信？
   放到同一个 Docker 网络中，用容器名互相访问。
3. 为什么本地能访问、外部不能访问？
   可能是端口没映射、防火墙限制、监听地址不对。
    `,
  },
  {
    title: '数据卷、挂载与数据持久化',
    content: `
容器是易失的，数据不能默认跟着容器永久保存。

### 两类常见挂载
- **Volume**：Docker 管理的数据卷
- **Bind Mount**：宿主机目录直接挂到容器里

### 示例
\`\`\`bash
docker volume create mysql-data
docker run -d -v mysql-data:/var/lib/mysql mysql:8
docker run -d -v /data/conf:/etc/nginx/conf.d nginx
\`\`\`

### 面试常问
- volume 和 bind mount 区别？
- 为什么容器删了数据就没了？
- 数据库容器为什么一定要做持久化？
    `,
  },
  {
    title: 'Docker Compose 与多容器编排',
    content: `
当项目依赖多个服务时，如 app + mysql + redis + nginx，单独手敲 docker run 会很混乱，这时 Compose 很适合。

### 高频命令
\`\`\`bash
docker compose up -d
docker compose ps
docker compose logs -f app
docker compose down
\`\`\`

### 优势
- 多服务统一描述
- 网络自动互通
- 环境变量、卷、端口更集中
- 本地开发和测试更方便

### 面试常问
- Compose 和 Kubernetes 的区别？
- Compose 适合什么场景，不适合什么场景？
    `,
  },
  {
    title: 'Docker 面试场景题与回答思路',
    content: `
### 场景 1：镜像太大
回答思路：
- 看基础镜像是否过大
- 是否把源码、构建缓存都打进去了
- 是否可以多阶段构建
- 是否可以减少无用层、清理缓存

### 场景 2：容器启动就退出
回答思路：
- 看 docker ps -a
- 看 docker logs
- 看启动命令是否正确
- 看依赖配置、环境变量是否缺失

### 场景 3：容器访问不到宿主机服务
回答思路：
- 先确认网络模式
- 再确认宿主机服务监听地址
- 再确认端口和防火墙

### 场景 4：容器日志太少
回答思路：
- 业务日志是否写到了文件而不是 stdout
- 是否需要 docker exec 进入容器查文件日志
- 如果是 Compose 场景，还可以补看 docker compose logs

### 一句总结
大厂更关注你是否能把 Docker 用在真实部署和排障里，而不是只会背几条命令。
    `,
  },
];

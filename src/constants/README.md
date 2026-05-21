# Constants 模块化结构说明

## 📁 文件结构

```
src/constants/
├── command-types.ts        # 类型定义 (Command, InterviewPoint, AlgorithmPoint)
├── docker-commands.ts      # Docker 命令和文档
├── linux-commands.ts       # Linux 命令和文档
├── jvm-points.ts          # JVM 面试题
├── juc-points.ts          # JUC 并发编程面试题
├── mysql-points.ts        # MySQL 数据库面试题
├── redis-points.ts        # Redis 缓存面试题
├── spring-points.ts       # Spring 框架面试题
├── network-points.ts      # 计算机网络面试题
├── os-points.ts           # 操作系统面试题
├── mq-points.ts           # 消息队列面试题
├── distributed-points.ts  # 分布式系统面试题
├── design-points.ts       # 系统设计面试题
├── index.ts               # 统一导出文件
└── README.md              # 本说明文档
```

## 📦 已拆分的模块

### 1. **类型定义** (`command-types.ts`)
- `Command` - 命令接口
- `InterviewPoint` - 面试题接口
- `AlgorithmPoint` - 算法题接口

### 2. **Docker 模块** (`docker-commands.ts`)
- `DOCKER_COMMANDS` - Docker 常用命令
- `DOCKER_DOCS` - Docker 文档

### 3. **Linux 模块** (`linux-commands.ts`)
- `LINUX_COMMANDS` - Linux 常用命令
- `LINUX_DOCS` - Linux 文档

### 4. **Java 后端模块**
- `JVM_POINTS` - JVM 面试题
- `JUC_POINTS` - JUC 并发编程面试题
- `MYSQL_POINTS` - MySQL 数据库面试题
- `REDIS_POINTS` - Redis 缓存面试题
- `SPRING_POINTS` - Spring 框架面试题

### 5. **计算机基础模块**
- `NETWORK_POINTS` - 计算机网络面试题
- `OS_INTERVIEW_POINTS` - 操作系统面试题

### 6. **架构设计模块**
- `MQ_POINTS` - 消息队列面试题
- `DISTRIBUTED_POINTS` - 分布式系统面试题
- `DESIGN_POINTS` - 系统设计面试题

## 🔧 使用方式

### 方式一：从总入口导入（推荐）
```typescript
import { 
  DOCKER_COMMANDS,
  JVM_POINTS,
  MYSQL_POINTS,
  REDIS_POINTS
} from '@/constants';
```

### 方式二：从具体模块导入
```typescript
import { DOCKER_COMMANDS } from '@/constants/docker-commands';
import { JVM_POINTS } from '@/constants/jvm-points';
import { MYSQL_POINTS } from '@/constants/mysql-points';
```

## 📝 待拆分模块

以下模块由于数据量较大，暂时保留在原始 `constants.ts` 文件中：

- `ALGORITHM_POINTS` - 算法题库（CodeTop 100）
- `HOT_100_POINTS` - LeetCode Hot 100（100 道题）

如需使用，直接从原文件导入：
```typescript
import { ALGORITHM_POINTS, HOT_100_POINTS } from './constants';
```

## ✅ 模块化优势

1. **代码可维护性** - 每个模块独立，便于定位和修改
2. **按需加载** - 可以只导入需要的模块，减少打包体积
3. **团队协作** - 不同人可以维护不同的模块
4. **向后兼容** - 保留原有的 `constants.ts` 作为统一入口
5. **类型安全** - 统一的类型定义，确保数据结构一致

## 🎯 后续优化建议

1. 可以考虑将算法题按类型进一步拆分（如链表、树、动态规划等）
2. 可以为每个模块添加单元测试
3. 可以添加模块间的依赖关系图
4. 考虑使用代码生成工具自动生成部分常量

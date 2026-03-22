# 面试题收藏夹 📚

这是一个灵活的面试题收藏和管理系统，可以存放各种杂七杂八的面试题目，支持分类、标签、搜索和统计功能。

## 功能特性 ✨

- 📝 **灵活收藏**: 可以收藏各种类型的面试题目
- 🏷️ **标签系统**: 支持多标签分类，便于检索
- 🔍 **智能搜索**: 支持按标题、内容、标签搜索
- 📊 **统计分析**: 提供题目数量、分类统计等信息
- 🎯 **多维度筛选**: 按分类、难度、标签等条件筛选
- 📤 **导入导出**: 支持JSON格式的导入导出
- ⏰ **时间管理**: 记录创建和更新时间

## 快速开始 🚀

### 基本使用

```typescript
import {
  favoriteQuestions,
  addQuestion,
  getQuestionsByCategory,
  searchQuestions
} from './interview-favorites';

// 查看所有收藏的题目
console.log(favoriteQuestions);

// 按分类获取题目
const javaQuestions = getQuestionsByCategory('Java基础');

// 搜索题目
const searchResults = searchQuestions('跨域');

// 添加新题目
const newQuestion = addQuestion({
  title: '新的面试题',
  content: '题目内容...',
  answer: '答案内容...',
  category: '前端',
  tags: ['JavaScript', 'ES6'],
  difficulty: '中等',
  source: '个人整理'
});
```

### 数据结构和类型

每个面试题包含以下字段：

- `id`: 唯一标识符
- `title`: 题目标题
- `content`: 题目内容
- `answer`: 参考答案（可选）
- `category`: 题目分类
- `tags`: 标签数组
- `difficulty`: 难度等级（简单/中等/困难）
- `source`: 来源（可选）
- `createTime`: 创建时间
- `updateTime`: 更新时间

## API 文档 📖

### 核心数据

- `favoriteQuestions`: 所有收藏的面试题数组

### 增删改查操作

- `addQuestion(question)`: 添加新题目
- `updateQuestion(id, updates)`: 更新题目
- `deleteQuestion(id)`: 删除题目

### 查询和筛选

- `getQuestionsByCategory(category)`: 按分类获取
- `getQuestionsByDifficulty(difficulty)`: 按难度获取
- `getQuestionsByTag(tag)`: 按标签获取
- `searchQuestions(keyword)`: 关键词搜索

### 统计信息

- `getAllCategories()`: 获取所有分类
- `getAllTags()`: 获取所有标签
- `getAllDifficulties()`: 获取所有难度
- `getStatistics()`: 获取完整统计信息

### 工具函数

- `filterQuestions(questions, filter)`: 多条件过滤
- `sortByCreateTime(questions, ascending)`: 按创建时间排序
- `sortByUpdateTime(questions, ascending)`: 按更新时间排序
- `sortByTitle(questions, ascending)`: 按标题排序
- `exportToJSON(questions)`: 导出为JSON
- `importFromJSON(jsonString)`: 从JSON导入
- `validateQuestion(question)`: 验证题目数据

## 示例题目 📝

目前收藏夹中已包含以下题目：

1. **面向对象编程的原则**
   - 分类：Java基础
   - 难度：中等
   - 标签：OOP、设计原则、SOLID

2. **跨域详解**
   - 分类：前端基础
   - 难度：中等
   - 标签：CORS、跨域、HTTP、浏览器安全

3. **过滤器和拦截器的区别**
   - 分类：Java Web
   - 难度：中等
   - 标签：Filter、Interceptor、Servlet、Spring MVC

## 扩展建议 💡

1. **添加更多分类**：根据你的技术栈添加相应的分类
2. **完善标签系统**：使用更细致的标签便于检索
3. **定期更新**：及时更新题目的答案和解释
4. **备份数据**：定期导出JSON备份重要题目
5. **分享交流**：可以将题目导出分享给同事或朋友

## 文件结构 📁

```
interview-favorites/
├── index.ts          # 主入口文件，包含核心数据和API
├── types.ts          # TypeScript类型定义
├── utils.ts          # 工具函数
└── README.md         # 使用说明文档
```

这个收藏夹系统非常适合个人技术积累和面试准备使用！
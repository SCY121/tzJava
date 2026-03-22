/**
 * 面试题收藏夹 - 统一管理各种面试题目
 * 支持添加、分类、搜索和管理收藏的面试题
 */

export interface InterviewQuestion {
  id: string;
  title: string;
  content: string;
  answer?: string;
  category: string;
  tags: string[];
  difficulty: '简单' | '中等' | '困难';
  source?: string; // 题目来源
  createTime: string;
  updateTime: string;
}

// 收藏夹中的所有面试题
export const favoriteQuestions: InterviewQuestion[] = [
  {
    id: '1',
    title: '面向对象编程的原则',
    content: '请简述面向对象编程的六大原则是什么？并举例说明开闭原则在实际开发中的应用？',
    answer: `面向对象编程的六大原则（SOLID + 其他）：

1. 单一职责原则（Single Responsibility Principle）
   - 一个类只负责一个功能领域中的相应职责
   - 降低类的复杂度，提高可读性和可维护性

2. 开闭原则（Open/Closed Principle）
   - 对扩展开放，对修改关闭
   - 通过接口和抽象类实现系统的可扩展性

3. 里氏替换原则（Liskov Substitution Principle）
   - 子类可以替换父类并出现在父类能够出现的任何地方
   - 继承复用的基石

4. 依赖倒置原则（Dependency Inversion Principle）
   - 依赖于抽象而不依赖于具体
   - 面向接口编程

5. 接口隔离原则（Interface Segregation Principle）
   - 使用多个专门的接口比使用单一的总接口要好
   - 避免接口的污染

6. 迪米特法则（Law of Demeter）
   - 一个对象应该对其他对象有最少的了解
   - 降低类之间的耦合度

开闭原则应用示例：
// 好的设计 - 符合开闭原则
interface Payment {
    void pay(double amount);
}

class Alipay implements Payment {
    public void pay(double amount) {
        // 支付宝支付逻辑
    }
}

class PaymentProcessor {
    private Payment payment;
    public PaymentProcessor(Payment payment) {
        this.payment = payment;
    }
    public void processPayment(double amount) {
        payment.pay(amount);
    }
}

// 新增支付方式只需新增类，无需修改现有代码`,
    category: 'Java基础',
    tags: ['OOP', '设计原则', 'SOLID'],
    difficulty: '中等',
    source: '个人收藏',
    createTime: '2024-03-11',
    updateTime: '2024-03-11'
  },
  {
    id: '2',
    title: '跨域详解',
    content: '什么是跨域？常见的跨域解决方案有哪些？请详细说明CORS的原理。',
    answer: `跨域是指浏览器出于安全考虑，阻止网页向不同源的服务器发送请求或接收响应。

同源策略（Same-origin policy）是浏览器的一种安全机制：
- 协议相同（http/https）
- 域名相同
- 端口相同

当以上任意一个条件不满足时，就会产生跨域问题。

常见跨域解决方案：
1. CORS（跨域资源共享）- 推荐方案
2. JSONP
3. 代理服务器
4. WebSocket
5. postMessage

CORS原理详解：

简单请求的CORS流程：
1. 浏览器自动在请求头添加Origin字段
2. 服务器检查Origin，如果允许则返回Access-Control-Allow-Origin
3. 浏览器检查响应头，如果匹配则允许访问

预检请求（Preflight）：
对于复杂请求，浏览器会先发送OPTIONS预检请求。

服务器端CORS配置示例（Spring Boot）：
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}`,
    category: '前端基础',
    tags: ['CORS', '跨域', 'HTTP', '浏览器安全'],
    difficulty: '中等',
    source: '面试题收藏',
    createTime: '2024-03-11',
    updateTime: '2024-03-11'
  },
  {
    id: '3',
    title: '过滤器和拦截器的区别',
    content: '请解释Filter和Interceptor的区别？Filter的执行流程是怎样的？Spring拦截器的执行流程和执行顺序是怎样的？',
    answer: `Filter（过滤器）和Interceptor（拦截器）的主要区别：

1. 所属层级不同：
   - Filter是Servlet规范的一部分，属于Web容器级别
   - Interceptor是Spring框架的一部分，属于Spring MVC级别

2. 依赖不同：
   - Filter依赖于Servlet容器（Tomcat等）
   - Interceptor依赖于Spring框架

3. 触发时机不同：
   - Filter在请求到达Servlet之前和响应返回客户端之前执行
   - Interceptor在请求到达Controller之前、Controller处理之后、视图渲染之前执行

4. 功能范围不同：
   - Filter可以拦截所有请求（包括静态资源）
   - Interceptor只能拦截Controller请求

Filter执行流程：
1. 请求到达时，按照配置的顺序依次执行每个Filter的doFilter方法
2. 每个Filter处理完请求后，调用chain.doFilter()将请求传递给下一个Filter
3. 如果没有下一个Filter，请求到达目标资源（Servlet）
4. 响应返回时，按照相反的顺序执行每个Filter的后续逻辑

Spring拦截器的执行流程：
拦截器接口HandlerInterceptor包含三个方法：
1. preHandle() - 控制器执行之前
2. postHandle() - 控制器执行之后，视图渲染之前
3. afterCompletion() - 整个请求完成之后

执行顺序（多个拦截器时）：
请求到达时：preHandle1 -> preHandle2 -> preHandle3 -> Controller
响应返回时：postHandle3 -> postHandle2 -> postHandle1 -> 视图渲染
afterCompletion3 -> afterCompletion2 -> afterCompletion1`,
    category: 'Java Web',
    tags: ['Filter', 'Interceptor', 'Servlet', 'Spring MVC'],
    difficulty: '中等',
    source: '框架学习',
    createTime: '2024-03-11',
    updateTime: '2024-03-11'
  }
];

// 添加新的面试题
export const addQuestion = (question: Omit<InterviewQuestion, 'id' | 'createTime' | 'updateTime'>): InterviewQuestion => {
  const newQuestion: InterviewQuestion = {
    ...question,
    id: (favoriteQuestions.length + 1).toString(),
    createTime: new Date().toISOString().split('T')[0],
    updateTime: new Date().toISOString().split('T')[0]
  };
  favoriteQuestions.push(newQuestion);
  return newQuestion;
};

// 更新面试题
export const updateQuestion = (id: string, updates: Partial<Omit<InterviewQuestion, 'id' | 'createTime'>>): InterviewQuestion | null => {
  const questionIndex = favoriteQuestions.findIndex(q => q.id === id);
  if (questionIndex === -1) return null;

  favoriteQuestions[questionIndex] = {
    ...favoriteQuestions[questionIndex],
    ...updates,
    updateTime: new Date().toISOString().split('T')[0]
  };
  return favoriteQuestions[questionIndex];
};

// 删除面试题
export const deleteQuestion = (id: string): boolean => {
  const questionIndex = favoriteQuestions.findIndex(q => q.id === id);
  if (questionIndex === -1) return false;

  favoriteQuestions.splice(questionIndex, 1);
  return true;
};

// 按分类获取面试题
export const getQuestionsByCategory = (category: string): InterviewQuestion[] => {
  return favoriteQuestions.filter(q => q.category === category);
};

// 按难度获取面试题
export const getQuestionsByDifficulty = (difficulty: string): InterviewQuestion[] => {
  return favoriteQuestions.filter(q => q.difficulty === difficulty);
};

// 按标签搜索面试题
export const getQuestionsByTag = (tag: string): InterviewQuestion[] => {
  return favoriteQuestions.filter(q => q.tags.includes(tag));
};

// 搜索面试题（标题或内容）
export const searchQuestions = (keyword: string): InterviewQuestion[] => {
  const lowerKeyword = keyword.toLowerCase();
  return favoriteQuestions.filter(q =>
    q.title.toLowerCase().includes(lowerKeyword) ||
    q.content.toLowerCase().includes(lowerKeyword) ||
    q.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
};

// 获取所有分类
export const getAllCategories = (): string[] => {
  return [...new Set(favoriteQuestions.map(q => q.category))];
};

// 获取所有标签
export const getAllTags = (): string[] => {
  const allTags = favoriteQuestions.flatMap(q => q.tags);
  return [...new Set(allTags)];
};

// 获取所有难度等级
export const getAllDifficulties = (): string[] => {
  return [...new Set(favoriteQuestions.map(q => q.difficulty))];
};

// 获取题目统计信息
export const getStatistics = () => {
  return {
    total: favoriteQuestions.length,
    byCategory: getAllCategories().map(cat => ({
      category: cat,
      count: getQuestionsByCategory(cat).length
    })),
    byDifficulty: getAllDifficulties().map(diff => ({
      difficulty: diff,
      count: getQuestionsByDifficulty(diff).length
    })),
    byTag: getAllTags().map(tag => ({
      tag,
      count: getQuestionsByTag(tag).length
    }))
  };
};
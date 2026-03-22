# Java后端实习面试精华题目

## 一、Java基础

### 1.1 Java语言特性

#### 1.1.1 面向对象编程
**问题：** 请解释Java中的封装、继承、多态的概念和实现方式。

**参考答案：**
- **封装**：将数据和方法包装在类中，通过访问修饰符控制访问权限
- **继承**：子类继承父类的属性和方法，实现代码复用
- **多态**：同一方法在不同对象中有不同实现，包括编译时多态（重载）和运行时多态（重写）

**问题：** 抽象类和接口的区别是什么？什么时候使用抽象类，什么时候使用接口？

**参考答案：**
- 抽象类可以有具体方法实现，接口只能有抽象方法（Java 8后可以有默认方法）
- 类只能继承一个抽象类，但可以实现多个接口
- 抽象类用于is-a关系，接口用于has-a关系

#### 1.1.2 数据类型和变量
**问题：** String、StringBuilder、StringBuffer的区别和使用场景？

**参考答案：**
- **String**：不可变，线程安全，适合常量字符串
- **StringBuilder**：可变，非线程安全，性能最好，适合单线程字符串拼接
- **StringBuffer**：可变，线程安全，性能较差，适合多线程环境

**问题：** 基本数据类型和包装类的区别？自动装箱和拆箱的原理？

**参考答案：**
- 基本类型在栈中，包装类在堆中
- 自动装箱：编译器自动将基本类型转换为包装类
- 自动拆箱：编译器自动将包装类转换为基本类型
- 注意null指针异常和性能问题

### 1.2 异常处理

**问题：** Java异常体系结构是怎样的？checked exception和unchecked exception的区别？

**参考答案：**
```
Throwable
├── Error (unchecked)
└── Exception
    ├── RuntimeException (unchecked)
    └── checked exception
```
- checked exception：编译时必须处理的异常
- unchecked exception：运行时异常，不强制处理

**问题：** try-catch-finally的执行顺序？return语句在finally之前还是之后执行？

**参考答案：**
1. try中无异常：try → finally
2. try中有异常：try → catch → finally
3. finally中的return会覆盖try/catch中的return值

### 1.3 集合框架

**问题：** ArrayList和LinkedList的区别？

**参考答案：**
- **ArrayList**：基于动态数组，随机访问快，增删慢
- **LinkedList**：基于双向链表，随机访问慢，增删快
- 内存占用：ArrayList更紧凑，LinkedList每个元素需要额外存储前后指针

**问题：** HashMap的工作原理？JDK 1.7和1.8的区别？

**参考答案：**
- 基于数组+链表/红黑树实现
- 通过hashCode()计算数组下标，equals()判断key是否相等
- JDK 1.7：数组+链表，头插法
- JDK 1.8：数组+链表+红黑树，尾插法，链表长度>8转为红黑树

**问题：** ConcurrentHashMap的实现原理？

**参考答案：**
- JDK 1.7：分段锁（Segment）
- JDK 1.8：synchronized+CAS+红黑树
- 读操作不加锁，写操作只锁当前桶

### 1.4 多线程

**问题：** 创建线程的几种方式？

**参考答案：**
1. 继承Thread类
2. 实现Runnable接口
3. 实现Callable接口
4. 使用线程池

**问题：** synchronized和Lock的区别？

**参考答案：**
- **synchronized**：JVM层面，自动释放锁，不可中断
- **Lock**：API层面，手动释放锁，可中断，支持公平锁
- Lock提供更灵活的锁操作

**问题：** volatile关键字的作用？

**参考答案：**
- 保证变量的可见性
- 禁止指令重排序
- 不保证原子性

### 1.5 JVM

**问题：** JVM内存模型是怎样的？

**参考答案：**
```
运行时数据区
├── 方法区（Method Area）
├── 堆（Heap）
├── 虚拟机栈（VM Stack）
├── 本地方法栈（Native Method Stack）
└── 程序计数器（Program Counter Register）
```

**问题：** 垃圾回收机制的原理？常见的垃圾回收器有哪些？

**参考答案：**
- 标记-清除、复制、标记-整理、分代收集
- 常见GC：Serial、Parallel、CMS、G1、ZGC
- G1适用于大内存，ZGC适用于超大内存和低延迟场景

**问题：** 类加载机制是怎样的？双亲委派模型？

**参考答案：**
1. 加载（Loading）
2. 验证（Verification）
3. 准备（Preparation）
4. 解析（Resolution）
5. 初始化（Initialization）

双亲委派：类加载器优先委托父类加载器加载类，保证核心类库的安全性

### 1.6 设计模式

**问题：** 单例模式的实现方式？如何保证线程安全？

**参考答案：**
```java
// 双重检查锁定
public class Singleton {
    private volatile static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
```

**问题：** 工厂模式和抽象工厂模式的区别？

**参考答案：**
- 工厂模式：创建单一产品
- 抽象工厂模式：创建产品族
- 工厂模式通过继承实现，抽象工厂通过组合实现

### 1.7 Java新特性

**问题：** Java 8的新特性有哪些？

**参考答案：**
- Lambda表达式
- Stream API
- Optional类
- 默认方法和静态方法
- 新的日期时间API
- 方法引用

**问题：** Stream API的使用场景和优势？

**参考答案：**
- 函数式编程风格
- 链式调用，代码简洁
- 支持并行处理
- 延迟执行，性能优化

### 1.8 性能优化

**问题：** 如何分析和解决Java应用的性能问题？

**参考答案：**
1. 使用JVM监控工具（jstat、jmap、jstack等）
2. 分析GC日志
3. 使用性能分析工具（JProfiler、YourKit等）
4. 代码层面优化：减少对象创建、合理使用缓存、避免内存泄漏

**问题：** 内存泄漏的常见原因和解决方案？

**参考答案：**
- 静态集合类持有对象引用
- 未关闭的资源（数据库连接、文件流等）
- 内部类持有外部类引用
- 监听器未正确注销

解决方案：使用弱引用、及时清理资源、使用内存分析工具

## 二、Spring框架

### 2.1 Spring核心概念

#### 2.1.1 IoC容器
**问题：** 什么是IoC（控制反转）？Spring如何实现IoC？

**参考答案：**
- IoC是将对象的创建和依赖注入的控制权交给容器
- Spring通过ApplicationContext容器管理Bean的生命周期
- 实现方式：XML配置、注解配置、Java配置

**问题：** Bean的作用域有哪些？

**参考答案：**
- singleton：单例，默认作用域
- prototype：原型，每次获取新实例
- request：每个HTTP请求一个实例
- session：每个HTTP会话一个实例
- application：ServletContext生命周期

#### 2.1.2 AOP编程
**问题：** 什么是AOP？Spring AOP的实现原理？

**参考答案：**
- AOP（面向切面编程）将横切关注点与业务逻辑分离
- Spring AOP基于动态代理实现
- JDK动态代理：基于接口
- CGLIB代理：基于类继承

**问题：** 通知（Advice）的类型有哪些？

**参考答案：**
- @Before：前置通知
- @After：后置通知
- @AfterReturning：返回通知
- @AfterThrowing：异常通知
- @Around：环绕通知

### 2.2 Spring MVC

**问题：** Spring MVC的工作流程？

**参考答案：**
1. 用户发送请求到DispatcherServlet
2. DispatcherServlet调用HandlerMapping找到对应的Controller
3. Controller处理请求并返回ModelAndView
4. DispatcherServlet通过ViewResolver解析视图
5. 视图渲染并返回给用户

**问题：** @Controller和@RestController的区别？

**参考答案：**
- @Controller：返回视图名称，需要配合视图解析器
- @RestController：返回JSON数据，相当于@Controller + @ResponseBody

**问题：** 如何解决Spring MVC的跨域问题？

**参考答案：**
```java
// 方式1：@CrossOrigin注解
@CrossOrigin(origins = "*")
@RestController
public class MyController {}

// 方式2：WebMvcConfigurer配置
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
```

### 2.3 Spring Boot

**问题：** Spring Boot的核心特性？

**参考答案：**
- 自动配置（Auto-configuration）
- 起步依赖（Starter Dependencies）
- 内嵌服务器（Tomcat、Jetty等）
- Actuator监控
- 外部化配置

**问题：** Spring Boot的自动配置原理？

**参考答案：**
- 基于@Conditional条件注解
- 扫描classpath下的spring.factories文件
- 根据条件判断是否自动配置某个Bean
- 可以通过@EnableAutoConfiguration或spring.autoconfigure.exclude排除

### 2.4 Spring事务管理

**问题：** Spring事务的传播机制有哪些？

**参考答案：**
- **REQUIRED**：支持当前事务，不存在则新建（默认）
- **REQUIRES_NEW**：新建事务，暂停当前事务
- **SUPPORTS**：支持当前事务，不存在则以非事务方式执行
- **NOT_SUPPORTED**：以非事务方式执行，暂停当前事务
- **MANDATORY**：支持当前事务，不存在则抛出异常
- **NEVER**：以非事务方式执行，存在事务则抛出异常
- **NESTED**：如果当前存在事务，则在嵌套事务内执行

**问题：** Spring事务的隔离级别？

**参考答案：**
- **DEFAULT**：使用数据库默认隔离级别
- **READ_UNCOMMITTED**：读未提交
- **READ_COMMITTED**：读已提交
- **REPEATABLE_READ**：可重复读
- **SERIALIZABLE**：串行化

**问题：** @Transactional失效的场景？

**参考答案：**
1. 方法不是public的
2. 异常被catch但没有重新抛出
3. 异常类型不是RuntimeException且没有配置rollbackFor
4. 同一个类中方法调用（this.method()）
5. 数据库引擎不支持事务（如MyISAM）

### 2.5 Spring Security

**问题：** Spring Security的核心组件？

**参考答案：**
- **SecurityContext**：安全上下文，存储认证信息
- **AuthenticationManager**：认证管理器
- **UserDetailsService**：用户详情服务
- **PasswordEncoder**：密码编码器
- **AccessDecisionManager**：访问决策管理器

### 2.6 Spring Data JPA

**问题：** JPA和Hibernate的关系？

**参考答案：**
- JPA是Java持久化API规范
- Hibernate是JPA的一个实现
- Spring Data JPA是基于JPA的抽象层

**问题：** JPA的一级缓存和二级缓存？

**参考答案：**
- **一级缓存**：EntityManager级别的缓存，事务内有效
- **二级缓存**：EntityManagerFactory级别的缓存，跨事务有效
- 可以通过@Cacheable注解启用二级缓存

**问题：** N+1查询问题的解决方案？

**参考答案：**
1. 使用JOIN FETCH：`SELECT u FROM User u JOIN FETCH u.orders`
2. 使用@EntityGraph注解
3. 配置批量加载：`@BatchSize(size = 10)`
4. 使用二级缓存

### 2.7 Spring Cloud

**问题：** Spring Cloud的核心组件及其作用？

**参考答案：**
- **Eureka**：服务注册与发现
- **Ribbon**：客户端负载均衡
- **Feign**：声明式REST客户端
- **Hystrix**：断路器，服务容错
- **Zuul/Gateway**：API网关
- **Config**：分布式配置中心
- **Sleuth**：分布式链路追踪

### 2.8 Spring性能优化

**问题：** Spring应用的性能优化策略？

**参考答案：**
1. **数据库层面**：合理设计索引，使用连接池，批量操作
2. **缓存层面**：使用Redis，合理设置缓存过期时间，缓存预热
3. **代码层面**：避免循环调用数据库，使用异步处理，合理配置线程池
4. **JVM层面**：调整堆内存大小，选择合适的GC算法，监控GC日志

## 三、数据库

### 3.1 SQL基础

**问题：** 查询每个部门工资最高的员工信息

**参考答案：**
```sql
-- 方法1：使用窗口函数（推荐）
SELECT *
FROM (
    SELECT e.*,
           ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as rn
    FROM employee e
) t
WHERE rn = 1;
```

**问题：** IN和EXISTS的区别？

**参考答案：**
- **IN**：适用于子查询结果集较小的情况
- **EXISTS**：适用于子查询结果集较大的情况，性能更好
- NOT EXISTS比NOT IN更安全（处理NULL值）

### 3.2 数据库设计

**问题：** 数据库三大范式？

**参考答案：**
- **1NF**：每个列都是不可分割的原子值
- **2NF**：满足1NF，且非主键列完全依赖于主键
- **3NF**：满足2NF，且非主键列之间不存在传递依赖

**问题：** 复合索引的最左匹配原则？

**参考答案：**
- 查询必须使用索引的最左前缀才能使用索引
- 如索引(a,b,c)，查询条件必须有a才能使用索引

### 3.3 事务和锁

**问题：** 事务隔离级别？

**参考答案：**
- **读未提交**：可能脏读
- **读已提交**：解决脏读，可能不可重复读
- **可重复读**：解决不可重复读，可能幻读
- **串行化**：解决所有问题，性能最差

**问题：** MySQL锁类型？

**参考答案：**
- **表级锁**：开销小，并发度低
- **行级锁**：开销大，并发度高
- **共享锁(S锁)**：读锁
- **排他锁(X锁)**：写锁

### 3.4 MySQL存储引擎

**问题：** InnoDB和MyISAM的区别？

**参考答案：**
| 特性 | InnoDB | MyISAM |
|------|--------|--------|
| 事务 | ✅ | ❌ |
| 行级锁 | ✅ | ❌ |
| 外键 | ✅ | ❌ |
| 适用场景 | 事务处理 | 读密集型 |

### 3.5 性能优化

**问题：** SQL优化策略？

**参考答案：**
1. 合理使用索引
2. 避免SELECT *
3. 优化JOIN操作
4. 使用EXPLAIN分析执行计划

**问题：** 分页优化？

**参考答案：**
```sql
-- 低效
SELECT * FROM user LIMIT 10000, 10;

-- 高效
SELECT * FROM user WHERE id > 10000 LIMIT 10;
```

### 3.6 高可用和分库分表

**问题：** 什么时候需要分库分表？

**参考答案：**
- 单表数据量过大（千万级别）
- 单库连接数达到瓶颈
- 查询性能下降
- 磁盘空间不足

**问题：** 分库分表策略？

**参考答案：**
- **垂直拆分**：按业务或字段拆分
- **水平拆分**：按ID范围、哈希、时间等拆分

### 3.7 NoSQL

**问题：** Redis数据类型和应用场景？

**参考答案：**
- **String**：缓存、计数器
- **Hash**：存储对象
- **List**：消息队列
- **Set**：去重、标签
- **ZSet**：排行榜

**问题：** MongoDB和MySQL的适用场景？

**参考答案：**
- **MongoDB**：半结构化数据、高扩展性、灵活模式
- **MySQL**：事务处理、复杂查询、数据一致性要求高

// Spring 面试题
import { InterviewPoint } from './command-types';

export const SPRING_POINTS: InterviewPoint[] = [
  {
   id: 'spring-1',
   question: '什么是 Spring 的 IOC 和 DI？',
    answer: '【IOC（Inversion of Control 控制反转）】\n\n核心思想：将对象的创建和依赖关系的管理交给 Spring 容器，而不是由开发者手动 new 对象。\n\n【传统方式 vs IOC】\n- 传统：主动创建依赖（new UserService()），耦合度高\n- IOC：被动接收依赖（@Autowired），解耦\n\n【IOC 容器实现】\n1. BeanFactory：基础容器，懒加载\n   - XmlBeanFactory（已废弃）\n   - getBean() 时才初始化\n2. ApplicationContext：企业级应用常用\n   - ClassPathXmlApplicationContext\n   - AnnotationConfigApplicationContext\n   - 启动时预加载所有 singleton Bean\n   - 提供国际化、事件传播等高级功能\n\n【DI（Dependency Injection 依赖注入）】\n\nIOC 的具体实现方式，有三种注入方式：\n\n1. 构造器注入（Constructor Injection）\n   - 通过构造函数传入依赖\n   - 优点：依赖不可变、便于测试、避免循环依赖\n   - 示例：public UserService(UserRepository repo) { ... }\n\n2. Setter 注入（Setter Injection）\n   - 通过 Setter 方法注入\n   - 优点：灵活、可重新配置\n   - 缺点：依赖可变、可能为 null\n   - 示例：@Autowired public void setUserRepo(...) { ... }\n\n3. 字段注入（Field Injection）\n   - 通过 @Autowired 注解字段\n   - 优点：代码简洁\n   - 缺点：违反单一职责、难以测试、隐藏依赖\n   - 不推荐：官方推荐构造器注入\n\n【Bean 的定义】\n- BeanDefinition：描述 Bean 的元数据\n  - Bean 类、作用域、依赖关系\n  - 初始化/销毁方法\n  - LazyInit、AutowireMode 等\n\n【IOC 容器启动流程】\n1. 加载配置文件/扫描注解\n2. 解析 BeanDefinition\n3. 注册 BeanDefinition\n4. 实例化 Bean（非懒加载）\n5. 依赖注入\n6. 初始化（Aware 回调、PostProcessor、init-method）',
    analogy: 'IOC 就像点外卖。你不需要知道菜是怎么做的（new 对象），只需要告诉外卖平台（Spring）你想吃什么，平台就会送到你手上（注入）。',
    importance: 'high'
  },
  {
   id: 'spring-2',
   question: 'Spring AOP 的原理是什么？',
    answer: '【AOP 核心概念】\n\nAOP（Aspect-Oriented Programming）面向切面编程，将横切关注点（日志、事务、权限）从业务逻辑中分离出来。\n\n【核心术语】\n1. Aspect（切面）：横切关注点的抽象（如日志切面）\n2. Joinpoint（连接点）：程序执行过程中的某个点（方法调用）\n3. Pointcut（切入点）：匹配连接点的表达式（决定在哪执行）\n4. Advice（通知）：切面的具体实现（何时做什么）\n5. Weaving（织入）：将切面应用到目标对象的过程\n\n【通知类型】\n1. Before（前置）：@Before，方法执行前\n2. AfterReturning（后置）：@AfterReturning，方法返回后\n3. AfterThrowing（异常）：@AfterThrowing，方法抛出异常\n4. After（最终）：@After，方法执行后（无论成功失败）\n5. Around（环绕）：@Around，包围方法执行，可控制是否执行\n\n【实现原理：动态代理】\n\n1. JDK 动态代理（默认）\n   - 条件：目标对象实现了接口\n   - 原理：Proxy.newProxyInstance() 生成代理类\n   - 代理类实现相同接口，拦截方法调用\n   - 示例：InvocationHandler.invoke()\n\n2. CGLIB 字节码增强\n   - 条件：目标对象未实现接口\n   - 原理：ASM 字节码框架生成子类\n   - 重写父类方法，插入增强逻辑\n   - 限制：final 类/方法无法代理\n\n【强制使用 CGLIB】\n- 配置：<aop:aspectj-autoproxy proxy-target-class="true"/>\n- Spring Boot 默认：如果目标对象没有接口，自动使用 CGLIB\n\n【执行流程】\n1. 解析@Aspect 注解\n2. 创建 Advisor（包含 Pointcut 和 Advice）\n3. 为目标 Bean 创建代理对象\n4. 调用代理方法时：\n   - 匹配 Pointcut\n   - 按顺序执行 Advice\n   - 执行目标方法\n   - 返回结果\n\n【性能影响】\n- JDK 代理：反射调用，轻微性能损耗（约 5-10%）\n- CGLIB：方法调用，性能接近原生\n- 建议：生产环境开启 CGLIB',
    analogy: 'AOP 就像给手机戴壳。手机的核心功能（打电话、上网）不变，但壳子（切面）增加了防摔、美观（日志、事务）等额外功能。',
    importance: 'high'
  },
  {
   id: 'spring-3',
   question: 'Spring Bean 的生命周期？',
    answer: '【完整生命周期（12 个步骤）】\n\n1. 实例化（Instantiation）\n   - 通过反射调用构造函数创建 Bean 实例\n   - 此时 Bean 是"半成品"，属性未赋值\n\n2. 属性赋值（Populate Bean）\n   - 注入依赖（@Autowired、@Value）\n   - 调用 Setter 方法\n\n3. Aware 接口回调（按顺序执行）\n   - BeanNameAware：设置 Bean 名称\n   - BeanClassLoaderAware：设置 ClassLoader\n   - BeanFactoryAware：设置 BeanFactory\n   - ApplicationContextAware：设置 ApplicationContext\n\n4. BeanPostProcessor 前置处理（Before Initialization）\n   - postProcessBeforeInitialization()\n   - 可修改 Bean 属性、替换代理\n   - 示例：@AutowiredAnnotationBeanPostProcessor 处理注入\n\n5. 初始化（Initialization）\n   - @PostConstruct 注解方法（JSR-250）\n   - InitializingBean.afterPropertiesSet() 方法\n   - init-method 自定义初始化方法\n\n6. BeanPostProcessor 后置处理（After Initialization）\n   - postProcessAfterInitialization()\n   - 创建 AOP 代理的关键时机\n   - 示例：AnnotationAwareAspectJAutoProxyCreator 创建代理\n\n7. Bean 就绪，可以使用\n   - 存放在 SingletonObjects（一级缓存）\n\n8. 使用阶段\n   - 业务逻辑调用\n\n9. 销毁（Destruction）\n   - @PreDestroy 注解方法\n   - DisposableBean.destroy() 方法\n   - destroy-method 自定义销毁方法\n\n【扩展点】\n1. BeanFactoryPostProcessor：修改 BeanDefinition（在实例化前）\n   - 示例：PropertySourcesPlaceholderConfigurer 解析${}\n2. InstantiationAwareBeanPostProcessor：控制实例化\n3. SmartInstantiationAwareBeanPostProcessor：提前暴露 Bean\n\n【循环依赖解决】\n- 三级缓存：singletonFactories 提前暴露工厂\n- 仅支持单例、Setter 注入\n- 构造器注入无法解决（需用@Lazy）',
    analogy: 'Bean 的一生就像入职：面试通过（实例化）-> 分配工位电脑（属性赋值）-> 参加新人培训（初始化）-> 开始干活（使用）-> 离职交接（销毁）。',
    importance: 'high'
  },
  {
   id: 'spring-4',
   question: 'Spring Boot 自动配置原理？',
    answer: '核心是 `@EnableAutoConfiguration` 注解。它利用 `SpringFactoriesLoader` 扫描所有 jar 包下的 `META-INF/spring.factories` 文件，根据 `@Conditional` 条件注解判断是否需要加载对应的配置类。',
    analogy: '自动配置就像酒店的智能感应灯。你不需要手动开关（配置），只要感应到有人（依赖存在且条件满足），灯就会自动亮起。',
    importance: 'high'
  },
  {
   id: 'spring-5',
   question: 'Spring 事务失效的场景有哪些？',
    answer: '1. 方法不是 public。2. 内部调用（绕过了代理对象）。3. 异常被 try-catch 捕获且未抛出。4. 数据库引擎不支持事务（如 MyISAM）。5. 传播行为设置不当。',
    analogy: '事务失效就像你跟人签合同。如果合同没盖章（非 public）、你自己跟自己签（内部调用）、或者出了事你瞒着不报（捕获异常），合同就不起作用。',
    importance: 'high'
  },
  {
   id: 'spring-6',
   question: 'Spring Bean 的作用域有哪些？',
    answer: '1. singleton（单例）：默认，整个容器只有一个实例。2. prototype（原型）：每次获取都创建新实例。3. request：每个 HTTP 请求一个实例。4. session：每个会话一个实例。5. application：整个应用生命周期一个实例。',
    analogy: 'singleton 像【公司的打印机】，大家共用；prototype 像【一次性纸杯】，每次用新的；request 像【外卖订单】，每个订单独立；session 像【购物车】，一次购物用一个；application 像【公司大楼】，整个公司共用。',
    importance: 'high'
  },
  {
   id: 'spring-7',
   question: 'Spring 如何解决循环依赖？',
    answer: '【循环依赖场景】\n\nA 依赖 B，B 依赖 A，形成环路。\n\n【三级缓存机制】\n\nSpring 通过三级缓存解决 Setter 注入的循环依赖：\n\n1. singletonObjects（一级缓存）\n   - 存放成品 Bean（实例化 + 属性赋值 + 初始化完成）\n   - getBean() 时优先从这里取\n\n2. earlySingletonObjects（二级缓存）\n   - 存放半成品 Bean（仅实例化，未属性赋值和初始化）\n   - 用于提前暴露引用，解决循环依赖\n\n3. singletonFactories（三级缓存）\n   - 存放 Bean 工厂 ObjectFactory\n   - 通过 getObject() 创建早期引用（可能是代理对象）\n   - 关键：支持 AOP 提前创建代理\n\n【解决流程】（A->B->A）\n\n1. 创建 A：实例化 A -> 放入三级缓存\n2. 注入 B：发现依赖 B，getBean(B)\n3. 创建 B：实例化 B -> 放入三级缓存\n4. 注入 A：getBean(A)\n   - 一级缓存无 A\n   - 从三级缓存拿 A 的工厂，创建早期引用（如需代理）\n   - 放入二级缓存，从三级缓存移除\n   - 返回 A 的早期引用给 B\n5. B 完成初始化：放入一级缓存\n6. A 继续：拿到 B，完成属性赋值和初始化\n7. A 放入一级缓存，二三级缓存移除\n\n【关键点】\n- 为什么需要三级缓存？\n  - 为了支持 AOP：代理对象可能在实例化时就需创建\n  - 二级缓存不足以处理代理场景\n\n【无法解决的情况】\n1. 构造器注入：实例化时需传入依赖，形成死锁\n   - 解决：@Lazy 延迟加载\n2. 原型（Prototype）作用域：不缓存，每次创建新实例\n   - 抛出 BeanCurrentlyInCreationException\n\n【最佳实践】\n- 推荐使用构造器注入（暴露循环依赖问题）\n- 避免循环依赖：重构代码、引入中间层',
    analogy: '就像【两人互相介绍对象】：A 和 B 都喜欢对方，但都不好意思主动。媒婆（Spring）先把 A 的联系方式给 B（提前暴露），等 B 同意了，再把 B 给 A。如果是"必须先见面再给联系方式"（构造器），就死循环了。',
    importance: 'high'
  },
  {
   id: 'spring-8',
   question: 'Spring 常用的注解有哪些？',
    answer: '@Component（通用组件）、@Service（业务层）、@Repository（DAO 层）、@Controller（控制层）、@RestController（返回 JSON）、@Autowired（按类型注入）、@Resource（按名称注入）、@Configuration（配置类）、@Bean（方法返回 Bean）。',
    analogy: '@Component 像【通用电工】，哪都能用；@Service 像【专业厨师】，负责炒菜（业务）；@Controller 像【餐厅前台】，接待客人；@Autowired 像【公司分配工位】，看你是哪个部门就安排；@Resource 像【指定座位】，必须坐那。',
    importance: 'high'
  },
  {
   id: 'spring-9',
   question: 'Spring Boot 相比 Spring 的优势？',
    answer: '1. 自动配置，减少 XML 配置。2. 内嵌服务器（Tomcat/Jetty）。3. Starter 依赖简化。4. Actuator 监控。5. CLI 命令行工具。核心理念是约定优于配置。',
    analogy: 'Spring 像【毛坯房】，什么都要自己装修；Spring Boot 像【精装房】，家具家电都配好了，拎包入住。',
    importance: 'high'
  },
  {
   id: 'spring-10',
   question: 'Spring Boot Starter 的工作原理？',
    answer: 'Starter 是一组依赖的集合。例如 spring-boot-starter-web 包含了 Spring MVC、Tomcat、Jackson 等。通过条件注解（@ConditionalOnClass）判断 classpath 下是否有相关类，决定是否加载配置。',
    analogy: 'Starter 像【套餐】：web 套餐 = 汉堡 + 薯条 + 可乐（Spring MVC + Tomcat + Jackson）。你点套餐就行，不用单点。',
    importance: 'medium'
  },
  {
   id: 'spring-11',
   question: '什么是 Spring 的拦截器和过滤器？有什么区别？',
    answer: 'Filter 是 Servlet 规范，基于函数回调，在请求到达 Servlet 前执行。Interceptor 是 Spring 提供，基于反射，在请求到达 Controller 前后执行。Filter 优先级更高。',
    analogy: 'Filter 像【小区大门保安】，所有进出的人都得检查；Interceptor 像【楼道门禁】，只有要到你家（Controller）的人才检查。',
    importance: 'medium'
  },
  {
   id: 'spring-12',
   question: 'Spring 的事件机制（ApplicationEvent）如何使用？',
    answer: '1. 定义事件类继承 ApplicationEvent。2. 定义监听器使用@EventListener。3. 发布事件使用 ApplicationEventPublisher。用于解耦业务逻辑，如用户注册后发送邮件。',
    analogy: '事件机制像【公司通知系统】：有人提交请假申请（发布事件），HR 收到后扣年假（监听器 1），行政收到后记录考勤（监听器 2），财务收到后算工资（监听器 3）。',
    importance: 'medium'
  },
  {
   id: 'spring-13',
   question: '@Transactional 注解的原理是什么？',
    answer: '基于 AOP 实现。Spring 扫描到@Transactional 后，会为该 Bean 创建代理对象。调用方法时，代理先开启事务，再执行目标方法，成功则提交，异常则回滚。',
    analogy: '@Transactional 像【快递保价】：快递员（代理）收件时问你保价吗（开事务），送到了就签收（提交），丢了就赔钱（回滚）。',
    importance: 'high'
  },
  {
   id: 'spring-14',
   question: 'Spring Boot 如何实现热部署？',
    answer: '使用 spring-boot-devtools 模块。原理是使用双类加载器：基础类加载器（加载第三方 jar）和重启类加载器（加载项目代码）。修改代码后只重启后者，速度快。',
    analogy: '就像【手机换主题】：系统核心（Android）不动，只换桌面启动器（项目代码），瞬间完成。',
    importance: 'low'
  }
  ,
  {
   id: 'spring-15',
   question: 'Spring MVC 处理一次请求的流程是什么？',
    answer: '请求先进入 DispatcherServlet，它相当于前端控制器。DispatcherServlet 根据 HandlerMapping 找到对应的处理器，再交给 HandlerAdapter 去真正执行 Controller 方法。Controller 返回 ModelAndView 或响应数据后，如果是页面请求会经过 ViewResolver 解析视图；如果是接口请求，通常由消息转换器直接把对象转成 JSON 返回。',
    analogy: 'DispatcherServlet 像总前台，先登记来访，再分配到对应窗口办理业务，最后把结果回传给用户。',
    importance: 'high'
  },
  {
   id: 'spring-16',
   question: '什么是 RESTful API 设计风格？',
    answer: 'RESTful 强调“资源”导向而不是“动作”导向。URL 用来描述资源，比如 /users/1，HTTP 方法表达动作，比如 GET 查、POST 新增、PUT 更新、DELETE 删除。设计时要注意接口语义统一、状态码合理、无状态、幂等性和版本管理。',
    analogy: 'RESTful 像仓库管理系统，地址代表货架上的资源，操作方式由取货、上架、更新、下架这些标准动作决定。',
    importance: 'medium'
  }
,
  {
   id: 'spring-17',
   question: 'Spring 容器启动过程大致是怎样的？',
   answer: '可以按“读配置、注册 BeanDefinition、实例化、依赖注入、初始化”这条主线回答。\n\n大致流程：\n1. 创建容器，比如 \`ApplicationContext\`\n2. 读取配置，把 XML、Java Config、注解扫描等信息转成 BeanDefinition\n3. 注册 BeanDefinition，把 Bean 的类型、作用域、依赖关系等元信息放进容器\n4. 执行 BeanFactoryPostProcessor，对 BeanDefinition 做扩展处理\n5. 实例化单例 Bean\n6. 完成依赖注入\n7. 执行初始化流程，包括 Aware、BeanPostProcessor、init-method 等\n8. 容器就绪，对外提供服务\n\n这题常见追问：\n- BeanDefinition 是什么\n- BeanPostProcessor 干了什么\n- AOP 代理大概在哪一步织入。',
   analogy: 'Spring 启动像开一家新门店：先登记员工信息，再安排岗位，再让人入职培训，最后整店正式开业。',
   importance: 'high'
  },
  {
   id: 'spring-18',
   question: 'Spring 事务传播机制有哪些？面试里重点说哪几个？',
   answer: '事务传播机制描述的是：一个带事务的方法调用另一个带事务的方法时，事务边界怎么处理。\n\n常见传播行为：\n- \`REQUIRED\`：默认值，有事务就加入，没有就新建\n- \`REQUIRES_NEW\`：不管外面有没有，自己新开一个事务\n- \`SUPPORTS\`：有事务就加入，没有也能执行\n- \`MANDATORY\`：必须在事务里运行，否则报错\n- \`NOT_SUPPORTED\`：挂起当前事务，以非事务方式执行\n- \`NEVER\`：如果当前有事务就直接报错\n- \`NESTED\`：嵌套事务，常基于保存点实现\n\n面试重点通常讲三个：\n1. REQUIRED\n2. REQUIRES_NEW\n3. NESTED\n\n答题重点：\n- REQUIRED 最常用\n- REQUIRES_NEW 适合日志、审计这类需要独立提交的场景\n- NESTED 更像大事务里的局部回滚。',
   analogy: '事务传播像多人一起办手续：有的窗口跟着主流程走，有的窗口要求自己单独立案，有的窗口只是顺带处理一下。',
   importance: 'high'
  }
];

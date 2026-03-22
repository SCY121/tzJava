import React, { useState, useMemo } from 'react';
import { 
  Box, 
  Terminal, 
  BookOpen, 
  Search, 
  ChevronRight, 
  Layers, 
  Container, 
  HardDrive, 
  Play, 
  CheckCircle2,
  ExternalLink,
  Menu,
  X,
  Info,
  Cpu,
  Layout,
  Code2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  DOCKER_COMMANDS, 
  DOCKER_DOCS, 
  JAVA_POINTS,
  LINUX_COMMANDS, 
  LINUX_DOCS, 
  JVM_POINTS,
  JUC_POINTS,
  ALGORITHM_POINTS,
  HOT_100_POINTS,
  MYSQL_POINTS,
  REDIS_POINTS,
  SPRING_POINTS,
  NETWORK_POINTS,
  OS_INTERVIEW_POINTS,
  MQ_POINTS,
  DISTRIBUTED_POINTS,
  DESIGN_POINTS,
  Command,
  InterviewPoint,
  AlgorithmPoint
} from './constants';
import { TerminalSimulator } from './components/TerminalSimulator';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatInterviewAnswer(content: string) {
  return content
    .replace(/\r\n/g, '\n')
    .replace(/【([^】]+)】/g, '\n### $1\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function getCategoryLabel(category: MainCategory) {
  switch (category) {
    case 'linux':
      return 'Linux 操作系统';
    case 'docker':
      return 'Docker 容器化';
    case 'java':
      return 'Java 基础';
    case 'jvm':
      return 'JVM 虚拟机';
    case 'juc':
      return 'JUC 并发编程';
    case 'mysql':
      return 'MySQL 数据库';
    case 'redis':
      return 'Redis 缓存';
    case 'spring':
      return 'Spring 框架';
    case 'network':
      return '计算机网络';
    case 'os':
      return '操作系统';
    case 'mq':
      return '消息队列';
    case 'distributed':
      return '分布式系统';
    case 'design':
      return '系统设计';
    case 'algo':
      return 'LeetCode 算法';
  }
}

function getInterviewTitle(category: MainCategory) {
  switch (category) {
    case 'java':
      return 'Java 基础面试题';
    case 'jvm':
      return 'JVM 面试八股文';
    case 'juc':
      return 'JUC 并发编程精讲';
    case 'mysql':
      return 'MySQL 数据库面试题';
    case 'redis':
      return 'Redis 缓存面试题';
    case 'spring':
      return 'Spring 核心面试题';
    case 'network':
      return '计算机网络面试题';
    case 'os':
      return '操作系统面试题';
    case 'mq':
      return '消息队列面试题';
    case 'distributed':
      return '分布式系统面试题';
    case 'design':
      return '系统设计面试题';
    default:
      return '面试题';
  }
}

type MainCategory = 'linux' | 'docker' | 'java' | 'jvm' | 'juc' | 'mysql' | 'redis' | 'spring' | 'network' | 'os' | 'mq' | 'distributed' | 'design' | 'algo';
type TabType = 'intro' | 'commands' | 'docs' | 'practice' | 'interview' | 'algorithms';

export default function App() {
  const [mainCategory, setMainCategory] = useState<MainCategory>('linux');
  const [activeTab, setActiveTab] = useState<TabType>('intro');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<InterviewPoint | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmPoint | null>(null);
  const [algoType, setAlgoType] = useState<'codetop' | 'hot100'>('codetop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentCommands = mainCategory === 'linux' ? LINUX_COMMANDS : DOCKER_COMMANDS;
  const currentDocs = mainCategory === 'linux' ? LINUX_DOCS : DOCKER_DOCS;
  const currentInterview = 
    mainCategory === 'java' ? JAVA_POINTS :
    mainCategory === 'jvm' ? JVM_POINTS : 
    mainCategory === 'juc' ? JUC_POINTS :
    mainCategory === 'mysql' ? MYSQL_POINTS :
    mainCategory === 'redis' ? REDIS_POINTS :
    mainCategory === 'spring' ? SPRING_POINTS :
    mainCategory === 'network' ? NETWORK_POINTS :
    mainCategory === 'os' ? OS_INTERVIEW_POINTS :
    mainCategory === 'mq' ? MQ_POINTS :
    mainCategory === 'distributed' ? DISTRIBUTED_POINTS : DESIGN_POINTS;
  const currentAlgorithms = algoType === 'codetop' ? ALGORITHM_POINTS : HOT_100_POINTS;

  const filteredCommands = useMemo(() => {
    return currentCommands.filter(cmd => 
      cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cmd.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentCommands]);

  const filteredInterview = useMemo(() => {
    return currentInterview.filter(p => 
      p.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentInterview]);

  const filteredAlgorithms = useMemo(() => {
    return currentAlgorithms.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.approach.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentAlgorithms]);

  const renderIntro = () => {
    if (mainCategory === 'java') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <section className="relative overflow-hidden rounded-3xl bg-amber-950 p-8 text-white md:p-12">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                <Code2 size={14} />
                <span>{getCategoryLabel(mainCategory)}</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                夯实 <span className="text-amber-400">Java 基础</span>
                <br />
                高频面试核心知识
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-amber-100/80">
                从面向对象、集合、异常、反射到 I/O，这一层决定了你后续回答 JVM、并发和 Spring 时能不能讲得稳、讲得清楚。
              </p>
              <button
                onClick={() => setActiveTab('interview')}
                className="flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 font-semibold shadow-lg transition-all hover:bg-amber-600"
              >
                开始学习面试题 <ChevronRight size={18} />
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-l from-amber-500/20 to-transparent" />
              <div className="grid grid-cols-4 gap-4 p-8">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="flex aspect-square items-center justify-center rounded-lg border border-white/10">
                    <Code2 size={20} className="text-amber-400/40" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Code2 className="mb-4 text-amber-500" size={32} />
              <h3 className="mb-2 text-xl font-bold">核心基础</h3>
              <p className="text-zinc-600">覆盖面向对象、数据类型、String、集合、异常和关键字，适合快速补齐八股基础盘。</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Info className="mb-4 text-amber-500" size={32} />
              <h3 className="mb-2 text-xl font-bold">回答分层</h3>
              <p className="text-zinc-600">每道题按概念、机制、对比、场景来拆，回答更容易讲出层次，不会变成一坨大段文字。</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <CheckCircle2 className="mb-4 text-amber-500" size={32} />
              <h3 className="mb-2 text-xl font-bold">面试衔接</h3>
              <p className="text-zinc-600">这些知识点会自然延伸到 HashMap、并发容器、Spring 反射/AOP 和 JVM 内存模型等高频追问。</p>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <section className={cn(
        "relative overflow-hidden rounded-3xl p-8 md:p-12 text-white transition-colors duration-500",
        mainCategory === 'linux' ? "bg-zinc-900" : 
        mainCategory === 'docker' ? "bg-blue-950" :
        mainCategory === 'jvm' ? "bg-orange-950" : 
        mainCategory === 'juc' ? "bg-purple-950" :
        mainCategory === 'mysql' ? "bg-emerald-950" :
        mainCategory === 'redis' ? "bg-red-950" :
        mainCategory === 'spring' ? "bg-green-950" :
        mainCategory === 'network' ? "bg-sky-950" :
        mainCategory === 'os' ? "bg-slate-950" :
        mainCategory === 'mq' ? "bg-orange-950" :
        mainCategory === 'distributed' ? "bg-cyan-950" :
        mainCategory === 'design' ? "bg-rose-950" : "bg-indigo-950"
      )}>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
            {mainCategory === 'linux' ? <Cpu size={14} /> : 
             mainCategory === 'docker' ? <Box size={14} /> :
             mainCategory === 'jvm' ? <Cpu size={14} /> : 
             mainCategory === 'juc' ? <Layers size={14} /> :
             mainCategory === 'mysql' ? <HardDrive size={14} /> :
             mainCategory === 'redis' ? <Cpu size={14} /> :
             mainCategory === 'spring' ? <Layers size={14} /> :
             mainCategory === 'network' ? <ExternalLink size={14} /> :
             mainCategory === 'os' ? <Cpu size={14} /> :
             mainCategory === 'mq' ? <Terminal size={14} /> :
             mainCategory === 'distributed' ? <Layers size={14} /> :
             mainCategory === 'design' ? <Layout size={14} /> : <Code2 size={14} />}
            <span>
              {mainCategory === 'linux' ? 'Linux 操作系统' : 
               mainCategory === 'docker' ? 'Docker 容器化' :
               mainCategory === 'jvm' ? 'JVM 虚拟机' : 
               mainCategory === 'juc' ? 'JUC 并发编程' :
               mainCategory === 'mysql' ? 'MySQL 数据库' :
               mainCategory === 'redis' ? 'Redis 缓存' :
               mainCategory === 'spring' ? 'Spring 框架' :
               mainCategory === 'network' ? '计算机网络' :
               mainCategory === 'os' ? '操作系统' :
               mainCategory === 'mq' ? '消息队列' :
               mainCategory === 'distributed' ? '分布式系统' :
               mainCategory === 'design' ? '系统设计' : 'LeetCode 算法'}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {mainCategory === 'linux' ? (
              <>掌握 <span className="text-emerald-400">Linux</span> <br /> 命令行艺术</>
            ) : mainCategory === 'docker' ? (
              <>零基础 <span className="text-blue-400">Docker</span> <br /> 快速入门指南</>
            ) : mainCategory === 'jvm' ? (
              <>深入 <span className="text-orange-400">JVM</span> <br /> 核心原理精讲</>
            ) : mainCategory === 'juc' ? (
              <>攻克 <span className="text-purple-400">JUC</span> <br /> 高并发实战</>
            ) : mainCategory === 'mysql' ? (
              <>精通 <span className="text-emerald-400">MySQL</span> <br /> 数据库调优</>
            ) : mainCategory === 'redis' ? (
              <>玩转 <span className="text-red-400">Redis</span> <br /> 高性能缓存</>
            ) : mainCategory === 'spring' ? (
              <>深入 <span className="text-green-400">Spring</span> <br /> 全家桶实战</>
            ) : mainCategory === 'network' ? (
              <>掌握 <span className="text-sky-400">网络</span> <br /> 协议核心原理</>
            ) : mainCategory === 'os' ? (
              <>攻克 <span className="text-slate-400">OS</span> <br /> 操作系统底层</>
            ) : mainCategory === 'mq' ? (
              <>玩转 <span className="text-orange-400">MQ</span> <br /> 异步解耦利器</>
            ) : mainCategory === 'distributed' ? (
              <>进阶 <span className="text-cyan-400">分布式</span> <br /> 架构设计之道</>
            ) : mainCategory === 'design' ? (
              <>决战 <span className="text-rose-400">系统设计</span> <br /> 大厂面试必备</>
            ) : (
              <>决战 <span className="text-indigo-400">LeetCode</span> <br /> 高频算法复盘</>
            )}
          </h1>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            {mainCategory === 'linux' ? "Linux 是互联网的基石。从服务器运维到嵌入式开发，掌握 Linux 命令行是迈向高级工程师的第一步。" :
             mainCategory === 'docker' ? "Docker 彻底改变了软件交付方式。通过容器化技术，您可以确保应用在任何环境下都能完美运行。" :
             mainCategory === 'jvm' ? "JVM 是 Java 程序运行环境。理解内存模型、垃圾回收和类加载机制，是写出高性能代码的关键。" :
             mainCategory === 'juc' ? "JUC 是 Java 并发编程的核心。掌握线程池、锁机制和原子类，让您在处理高并发场景时游予余。" :
             mainCategory === 'mysql' ? "MySQL 是最流行的关系型数据库。掌握索引优化、事务隔离和 MVCC，是后端开发的必修课。" :
             mainCategory === 'redis' ? "Redis 是高性能的内存数据库。理解数据结构、持久化和分布式锁，是构建高并发系统的利器。" :
             mainCategory === 'spring' ? "Spring 是 Java 开发的事实标准。掌握 IOC、AOP 和自动配置，是构建企业级应用的基础。" :
             mainCategory === 'network' ? "计算机网络是通信的基础。理解 TCP/IP、HTTP/HTTPS 和 DNS，是排查网络问题的关键。" :
             mainCategory === 'os' ? "操作系统是硬件与软件的桥梁。理解进程线程、死锁和虚拟内存，是写出高效代码的保障。" :
             mainCategory === 'mq' ? "消息队列是分布式系统的润滑剂。掌握解耦、异步和削峰，是构建高可用系统的核心。" :
             mainCategory === 'distributed' ? "分布式系统是现代架构的基石。理解 CAP、BASE 和分布式事务，是迈向架构师的必经之路。" :
             mainCategory === 'design' ? "系统设计考察的是综合能力。掌握秒杀系统、短链接等经典设计，是应对大厂面试的利器。" :
             "算法是面试的敲门砖。我们为您整理了 CodeTop 频率最高的 50 道力扣题目，助您快速回顾核心思路与代码实现。"}
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => {
                if (mainCategory === 'linux' || mainCategory === 'docker') setActiveTab('commands');
                else if (mainCategory === 'algo') setActiveTab('algorithms');
                else setActiveTab('interview');
              }}
              className={cn(
                "px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 shadow-lg",
                mainCategory === 'linux' ? "bg-emerald-500 hover:bg-emerald-600" : 
                mainCategory === 'docker' ? "bg-blue-500 hover:bg-blue-600" :
                mainCategory === 'jvm' ? "bg-orange-500 hover:bg-orange-600" : 
                mainCategory === 'juc' ? "bg-purple-500 hover:bg-purple-600" :
                mainCategory === 'mysql' ? "bg-emerald-500 hover:bg-emerald-600" :
                mainCategory === 'redis' ? "bg-red-500 hover:bg-red-600" :
                mainCategory === 'spring' ? "bg-green-500 hover:bg-green-600" :
                mainCategory === 'network' ? "bg-sky-500 hover:bg-sky-600" :
                mainCategory === 'os' ? "bg-slate-500 hover:bg-slate-600" :
                mainCategory === 'mq' ? "bg-orange-500 hover:bg-orange-600" :
                mainCategory === 'distributed' ? "bg-cyan-500 hover:bg-cyan-600" :
                mainCategory === 'design' ? "bg-rose-500 hover:bg-rose-600" : "bg-indigo-500 hover:bg-indigo-600"
              )}
            >
              开始学习 {mainCategory === 'linux' || mainCategory === 'docker' ? '命令' : 
                        mainCategory === 'algo' ? '算法' : '面试题'} <ChevronRight size={18} />
            </button>
            {mainCategory === 'linux' || mainCategory === 'docker' ? (
              <button 
                onClick={() => setActiveTab('practice')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-colors flex items-center gap-2 backdrop-blur-sm border border-white/10"
              >
                进入实战终端
              </button>
            ) : null}
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className={cn(
            "absolute inset-0 bg-gradient-to-l to-transparent",
            mainCategory === 'linux' ? "from-emerald-500/20" : 
            mainCategory === 'docker' ? "from-blue-500/20" :
            mainCategory === 'jvm' ? "from-orange-500/20" : 
            mainCategory === 'juc' ? "from-purple-500/20" : "from-indigo-500/20"
          )} />
          <div className="grid grid-cols-4 gap-4 p-8">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="aspect-square border border-white/10 rounded-lg flex items-center justify-center">
                {mainCategory === 'linux' ? <Terminal size={20} className="text-emerald-400/40" /> : 
                 mainCategory === 'docker' ? <Box size={20} className="text-blue-400/40" /> :
                 mainCategory === 'jvm' ? <Cpu size={20} className="text-orange-400/40" /> : 
                 mainCategory === 'juc' ? <Layers size={20} className="text-purple-400/40" /> :
                 mainCategory === 'mysql' ? <HardDrive size={20} className="text-emerald-400/40" /> :
                 mainCategory === 'redis' ? <Cpu size={20} className="text-red-400/40" /> :
                 mainCategory === 'spring' ? <Layers size={20} className="text-green-400/40" /> :
                 mainCategory === 'network' ? <ExternalLink size={20} className="text-sky-400/40" /> :
                 mainCategory === 'os' ? <Cpu size={20} className="text-slate-400/40" /> :
                 mainCategory === 'mq' ? <Terminal size={20} className="text-orange-400/40" /> :
                 mainCategory === 'distributed' ? <Layers size={20} className="text-cyan-400/40" /> :
                 mainCategory === 'design' ? <Layout size={20} className="text-rose-400/40" /> : <Code2 size={20} className="text-indigo-400/40" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        {mainCategory === 'linux' ? (
          <>
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <Terminal className="text-emerald-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">命令行哲学</h3>
              <p className="text-zinc-600">一切皆文件。通过简单的命令组合完成复杂的自动化任务。</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <HardDrive className="text-emerald-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">系统底层</h3>
              <p className="text-zinc-600">深入了解进程管理、内存分配和文件系统权限控制。</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <Layout className="text-emerald-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">开源生态</h3>
              <p className="text-zinc-600">加入全球最大的开源社区，掌握服务器领域绝对的主流系统。</p>
            </div>
          </>
        ) : mainCategory === 'docker' ? (
          <>
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <Layers className="text-blue-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">轻量级</h3>
              <p className="text-zinc-600">容器共享主机内核，启动速度极快，资源占用极低。</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <Container className="text-blue-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">一致性</h3>
              <p className="text-zinc-600">开发、测试、生产环境完全一致，彻底解决环境冲突问题。</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <HardDrive className="text-blue-500 mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">可移植</h3>
              <p className="text-zinc-600">一次构建，到处运行。支持所有主流云平台和操作系统。</p>
            </div>
          </>
        ) : (
          <>
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <Code2 className={mainCategory === 'jvm' ? "text-orange-500" : mainCategory === 'juc' ? "text-purple-500" : "text-indigo-500"} size={32} />
              <h3 className="text-xl font-bold mb-2">{mainCategory === 'algo' ? '高频题库' : '面试高频'}</h3>
              <p className="text-zinc-600">{mainCategory === 'algo' ? '精选 CodeTop 50 道高频算法题，覆盖 90% 以上的面试算法考点。' : '整理自各大厂真实面经，直击技术痛点，助您从容应对面试。'}</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <Info className={mainCategory === 'jvm' ? "text-orange-500" : mainCategory === 'juc' ? "text-purple-500" : "text-indigo-500"} size={32} />
              <h3 className="text-xl font-bold mb-2">{mainCategory === 'algo' ? '思路精讲' : '生动类比'}</h3>
              <p className="text-zinc-600">{mainCategory === 'algo' ? '每道题都配有核心解题思路，助您快速理清逻辑，举一反三。' : '将晦涩难懂的底层原理转化为生活中的常识，加深记忆。'}</p>
            </div>
            <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
              <CheckCircle2 className={mainCategory === 'jvm' ? "text-orange-500" : mainCategory === 'juc' ? "text-purple-500" : "text-indigo-500"} size={32} />
              <h3 className="text-xl font-bold mb-2">{mainCategory === 'algo' ? 'Java 实现' : '知识体系'}</h3>
              <p className="text-zinc-600">{mainCategory === 'algo' ? '提供标准 Java 代码实现，注重代码规范与执行效率。' : '从点到面，构建完整的 Java 核心技术栈知识图谱。'}</p>
            </div>
          </>
        )}
      </div>
    </motion.div>
    );
  };

  const renderCommands = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">{mainCategory === 'linux' ? 'Linux 指令手册' : 'Docker 命令参考'}</h2>
          <p className="text-zinc-500">点击指令查看详细解释和示例</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索指令..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredCommands.map((cmd) => (
            <button
              key={cmd.id}
              onClick={() => setSelectedCommand(cmd)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group",
                selectedCommand?.id === cmd.id 
                  ? (mainCategory === 'linux' ? "bg-emerald-50 border-emerald-200 shadow-sm" : "bg-blue-50 border-blue-200 shadow-sm")
                  : "bg-white border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50"
              )}
            >
              <div>
                <div className={cn("font-mono font-bold", mainCategory === 'linux' ? "text-emerald-600" : "text-blue-600")}>
                  {cmd.command}
                </div>
                <div className="text-sm text-zinc-500">{cmd.description}</div>
              </div>
              <ChevronRight size={16} className={cn(
                "transition-transform",
                selectedCommand?.id === cmd.id 
                  ? (mainCategory === 'linux' ? "translate-x-1 text-emerald-500" : "translate-x-1 text-blue-500") 
                  : "text-zinc-300 group-hover:text-zinc-400"
              )} />
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedCommand ? (
              <motion.div
                key={selectedCommand.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn("p-3 rounded-xl", mainCategory === 'linux' ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600")}>
                    <Terminal size={24} />
                  </div>
                  <h3 className="text-2xl font-bold font-mono">{selectedCommand.command}</h3>
                </div>

                <div className="space-y-6">
                  <section>
                    <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">功能描述</h4>
                    <p className="text-lg text-zinc-700">{selectedCommand.description}</p>
                  </section>

                  <section>
                    <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">使用示例</h4>
                    <div className="bg-zinc-900 rounded-xl p-4 font-mono text-blue-400 flex items-center justify-between group">
                      <code>{selectedCommand.example}</code>
                      <button 
                        onClick={() => navigator.clipboard.writeText(selectedCommand.example)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-white/10 rounded-lg text-white"
                        title="复制命令"
                      >
                        <HardDrive size={16} />
                      </button>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">详细解释</h4>
                    <p className="text-zinc-600 leading-relaxed">{selectedCommand.explanation}</p>
                  </section>

                  <div className="pt-6 border-t border-zinc-100 flex items-center gap-2 text-sm text-zinc-400">
                    <CheckCircle2 size={16} className="text-green-500" />
                    掌握此指令是基础学习的关键
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-zinc-50 rounded-2xl border border-dashed border-zinc-300 p-12 flex flex-col items-center justify-center text-center h-full">
                <Terminal size={48} className="text-zinc-300 mb-4" />
                <h3 className="text-xl font-semibold text-zinc-400">请从左侧选择一个指令</h3>
                <p className="text-zinc-400 mt-2">点击指令查看其详细用法和参数说明</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  const renderInterview = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={cn("text-3xl font-bold", mainCategory === 'java' && "hidden")}>
            {mainCategory === 'jvm' ? 'JVM 面试八股文' : 
             mainCategory === 'juc' ? 'JUC 并发编程精讲' :
             mainCategory === 'mysql' ? 'MySQL 数据库面试题' : 
             mainCategory === 'redis' ? 'Redis 缓存面试题' :
             mainCategory === 'spring' ? 'Spring 核心面试题' :
             mainCategory === 'network' ? '计算机网络面试题' :
             mainCategory === 'os' ? '操作系统面试题' :
             mainCategory === 'mq' ? '消息队列面试题' :
             mainCategory === 'distributed' ? '分布式系统面试题' : '系统设计面试题'}
          </h2>
          {mainCategory === 'java' && <h2 className="text-3xl font-bold">{getInterviewTitle(mainCategory)}</h2>}
          <p className="text-zinc-500">点击问题查看详细解答与生动类比</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索面试题..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredInterview.map((point) => (
            <button
              key={point.id}
              onClick={() => setSelectedInterview(point)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group",
                selectedInterview?.id === point.id 
                  ? (mainCategory === 'java' ? "bg-amber-50 border-amber-200 shadow-sm" :
                     mainCategory === 'jvm' ? "bg-orange-50 border-orange-200 shadow-sm" : 
                     mainCategory === 'juc' ? "bg-purple-50 border-purple-200 shadow-sm" :
                     mainCategory === 'mysql' ? "bg-emerald-50 border-emerald-200 shadow-sm" :
                     mainCategory === 'redis' ? "bg-red-50 border-red-200 shadow-sm" :
                     mainCategory === 'spring' ? "bg-green-50 border-green-200 shadow-sm" :
                     mainCategory === 'network' ? "bg-sky-50 border-sky-200 shadow-sm" :
                     mainCategory === 'os' ? "bg-slate-50 border-slate-200 shadow-sm" :
                     mainCategory === 'mq' ? "bg-orange-50 border-orange-200 shadow-sm" :
                     mainCategory === 'distributed' ? "bg-cyan-50 border-cyan-200 shadow-sm" : "bg-rose-50 border-rose-200 shadow-sm")
                  : "bg-white border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50"
              )}
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  {point.importance === 'high' && <span className="px-1.5 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded uppercase">必考</span>}
                  <div className={cn("font-bold text-sm", 
                    mainCategory === 'java' ? "text-amber-600" :
                    mainCategory === 'jvm' ? "text-orange-600" : 
                    mainCategory === 'juc' ? "text-purple-600" :
                    mainCategory === 'mysql' ? "text-emerald-600" :
                    mainCategory === 'redis' ? "text-red-600" :
                    mainCategory === 'spring' ? "text-green-600" :
                    mainCategory === 'network' ? "text-sky-600" :
                    mainCategory === 'os' ? "text-slate-600" :
                    mainCategory === 'mq' ? "text-orange-600" :
                    mainCategory === 'distributed' ? "text-cyan-600" : "text-rose-600")}>
                    Q: {point.question}
                  </div>
                </div>
              </div>
              <ChevronRight size={16} className={cn(
                "transition-transform shrink-0",
                selectedInterview?.id === point.id 
                  ? (mainCategory === 'java' ? "translate-x-1 text-amber-500" :
                     mainCategory === 'jvm' ? "translate-x-1 text-orange-500" : 
                     mainCategory === 'juc' ? "translate-x-1 text-purple-500" :
                     mainCategory === 'mysql' ? "translate-x-1 text-emerald-500" :
                     mainCategory === 'redis' ? "translate-x-1 text-red-500" :
                     mainCategory === 'spring' ? "translate-x-1 text-green-500" :
                     mainCategory === 'network' ? "translate-x-1 text-sky-500" :
                     mainCategory === 'os' ? "translate-x-1 text-slate-500" :
                     mainCategory === 'mq' ? "translate-x-1 text-orange-500" :
                     mainCategory === 'distributed' ? "translate-x-1 text-cyan-500" : "translate-x-1 text-rose-500") 
                  : "text-zinc-300 group-hover:text-zinc-400"
              )} />
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedInterview ? (
              <motion.div
                key={selectedInterview.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn("p-3 rounded-xl", 
                    mainCategory === 'java' ? "bg-amber-100 text-amber-600" :
                    mainCategory === 'jvm' ? "bg-orange-100 text-orange-600" : 
                    mainCategory === 'juc' ? "bg-purple-100 text-purple-600" :
                    mainCategory === 'mysql' ? "bg-emerald-100 text-emerald-600" :
                    mainCategory === 'redis' ? "bg-red-100 text-red-600" :
                    mainCategory === 'spring' ? "bg-green-100 text-green-600" :
                    mainCategory === 'network' ? "bg-sky-100 text-sky-600" :
                    mainCategory === 'os' ? "bg-slate-100 text-slate-600" :
                    mainCategory === 'mq' ? "bg-orange-100 text-orange-600" :
                    mainCategory === 'distributed' ? "bg-cyan-100 text-cyan-600" : "bg-rose-100 text-rose-600")}>
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">{selectedInterview.question}</h3>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-green-500" /> 标准回答
                    </h4>
                    <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6">
                      <div className="interview-answer prose prose-zinc max-w-none text-zinc-700">
                        <Markdown
                          components={{
                            h3: ({ children }) => <h3 className="mt-6 mb-3 text-base font-bold text-zinc-900 first:mt-0">{children}</h3>,
                            p: ({ children }) => <p className="mb-3 leading-7 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="mb-4 list-disc space-y-2 pl-5">{children}</ul>,
                            ol: ({ children }) => <ol className="mb-4 list-decimal space-y-2 pl-5">{children}</ol>,
                            li: ({ children }) => <li className="leading-7">{children}</li>,
                            code: ({ children }) => <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 text-[0.95em] text-zinc-800">{children}</code>,
                          }}
                        >
                          {formatInterviewAnswer(selectedInterview.answer)}
                        </Markdown>
                      </div>
                    </div>
                  </section>

                  {selectedInterview.analogy && (
                    <section>
                      <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Info size={14} className="text-blue-500" /> 生动类比 (助记)
                      </h4>
                      <div className="hidden p-6 bg-blue-50 rounded-2xl border border-blue-100 text-blue-900 italic">
                        “{selectedInterview.analogy}”
                      </div>
                      <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6 italic text-blue-900">
                        {selectedInterview.analogy}
                      </div>
                    </section>
                  )}

                  <div className="pt-6 border-t border-zinc-100 flex items-center gap-2 text-sm text-zinc-400">
                    <CheckCircle2 size={16} className="text-green-500" />
                    建议结合实际项目经验进行回答，效果更佳
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-zinc-50 rounded-2xl border border-dashed border-zinc-300 p-12 flex flex-col items-center justify-center text-center h-full">
                <BookOpen size={48} className="text-zinc-300 mb-4" />
                <h3 className="text-xl font-semibold text-zinc-400">请从左侧选择一个面试题</h3>
                <p className="text-zinc-400 mt-2">点击问题查看详细解答和助记类比</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  const renderAlgorithms = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">LeetCode 高频算法</h2>
          <div className="flex items-center gap-4 mt-2">
            <button 
              onClick={() => { setAlgoType('codetop'); setSelectedAlgorithm(null); }}
              className={cn(
                "text-sm font-medium px-3 py-1 rounded-lg transition-all",
                algoType === 'codetop' ? "bg-indigo-100 text-indigo-600" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              CodeTop 50
            </button>
            <button 
              onClick={() => { setAlgoType('hot100'); setSelectedAlgorithm(null); }}
              className={cn(
                "text-sm font-medium px-3 py-1 rounded-lg transition-all",
                algoType === 'hot100' ? "bg-indigo-100 text-indigo-600" : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              Hot 100
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索题目..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredAlgorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => setSelectedAlgorithm(algo)}
              className={cn(
                "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group",
                selectedAlgorithm?.id === algo.id 
                  ? "bg-indigo-50 border-indigo-200 shadow-sm"
                  : "bg-white border-zinc-100 hover:border-zinc-300 hover:bg-zinc-50"
              )}
            >
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn(
                    "px-1.5 py-0.5 text-[10px] font-bold rounded uppercase",
                    algo.difficulty === 'Easy' ? "bg-green-100 text-green-600" :
                    algo.difficulty === 'Medium' ? "bg-orange-100 text-orange-600" : "bg-red-100 text-red-600"
                  )}>
                    {algo.difficulty}
                  </span>
                  <div className="font-bold text-sm text-indigo-600">
                    {algo.title}
                  </div>
                </div>
              </div>
              <ChevronRight size={16} className={cn(
                "transition-transform shrink-0",
                selectedAlgorithm?.id === algo.id ? "translate-x-1 text-indigo-500" : "text-zinc-300 group-hover:text-zinc-400"
              )} />
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedAlgorithm ? (
              <motion.div
                key={selectedAlgorithm.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-2xl border border-zinc-200 p-8 shadow-sm h-full"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                    <Code2 size={24} />
                  </div>
                  <h3 className="text-2xl font-bold">{selectedAlgorithm.title}</h3>
                  {selectedAlgorithm.url && (
                    <a 
                      href={selectedAlgorithm.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-100"
                    >
                      <ExternalLink size={14} />
                      力扣官网
                    </a>
                  )}
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <BookOpen size={14} className="text-indigo-500" /> 题目描述
                    </h4>
                    <div className="text-zinc-700 leading-relaxed bg-zinc-50 p-6 rounded-2xl border border-zinc-100 whitespace-pre-wrap">
                      {selectedAlgorithm.description}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Info size={14} className="text-indigo-500" /> 解题思路
                    </h4>
                    <div className="text-lg text-zinc-700 leading-relaxed bg-indigo-50/30 p-6 rounded-2xl border border-indigo-100">
                      {selectedAlgorithm.approach}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Terminal size={14} className="text-indigo-500" /> Java 代码实现
                    </h4>
                    <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm">
                      <SyntaxHighlighter 
                        language="java" 
                        style={atomDark}
                        customStyle={{
                          margin: 0,
                          padding: '1.5rem',
                          fontSize: '0.875rem',
                          lineHeight: '1.5',
                          borderRadius: '1rem'
                        }}
                      >
                        {selectedAlgorithm.code}
                      </SyntaxHighlighter>
                    </div>
                  </section>
                </div>
              </motion.div>
            ) : (
              <div className="bg-zinc-50 rounded-2xl border border-dashed border-zinc-300 p-12 flex flex-col items-center justify-center text-center h-full">
                <Code2 size={48} className="text-zinc-300 mb-4" />
                <h3 className="text-xl font-semibold text-zinc-400">请从左侧选择一个题目</h3>
                <p className="text-zinc-400 mt-2">点击题目查看解题思路和 Java 代码</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  const renderDocs = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid md:grid-cols-4 gap-8"
    >
      <div className="md:col-span-1 space-y-2">
        <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4 px-2">文档目录</h3>
        {currentDocs.map((doc, i) => (
          <a 
            key={i}
            href={`#doc-${i}`}
            className="block px-4 py-2 rounded-lg hover:bg-zinc-100 text-zinc-600 hover:text-blue-600 transition-colors"
          >
            {doc.title}
          </a>
        ))}
      </div>

      <div className="md:col-span-3 space-y-12">
        {currentDocs.map((doc, i) => (
          <section key={i} id={`doc-${i}`} className="scroll-mt-24">
            <h2 className="text-3xl font-bold mb-6 pb-2 border-b border-zinc-200">{doc.title}</h2>
            <div className="markdown-body prose prose-zinc max-w-none">
              <Markdown>{doc.content}</Markdown>
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  );

  const renderPractice = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-3xl font-bold">交互式实战终端</h2>
        <p className="text-zinc-500">
          在这里手敲指令进行练习。我们模拟了一个基础的 Linux 环境，您可以尝试使用左侧学到的指令。
        </p>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <TerminalSimulator />
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="p-6 bg-white rounded-2xl border border-zinc-200">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Code2 size={18} className="text-emerald-500" /> 练习建议 (Linux)
          </h3>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li>• 输入 \`ls\` 查看当前目录下的文件</li>
            <li>• 输入 \`mkdir my_folder\` 创建一个新文件夹</li>
            <li>• 输入 \`pwd\` 查看当前路径</li>
            <li>• 输入 \`whoami\` 查看当前用户</li>
          </ul>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-zinc-200">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Box size={18} className="text-blue-500" /> 练习建议 (Docker)
          </h3>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li>• 输入 \`docker ps\` 查看运行中的容器</li>
            <li>• 输入 \`docker images\` 查看本地镜像列表</li>
            <li>• 尝试输入一些不存在的命令看看报错</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Top Category Switcher */}
      <div className="bg-zinc-900 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'linux', label: 'Linux', icon: Cpu, color: 'emerald' },
            { id: 'docker', label: 'Docker', icon: Box, color: 'blue' },
            { id: 'java', label: 'Java', icon: Code2, color: 'amber' },
            { id: 'jvm', label: 'JVM', icon: Cpu, color: 'orange' },
            { id: 'juc', label: 'JUC', icon: Layers, color: 'purple' },
            { id: 'mysql', label: 'MySQL', icon: HardDrive, color: 'emerald' },
            { id: 'redis', label: 'Redis', icon: Cpu, color: 'red' },
            { id: 'spring', label: 'Spring', icon: Layers, color: 'green' },
            { id: 'network', label: 'Network', icon: ExternalLink, color: 'sky' },
            { id: 'os', label: 'OS', icon: Cpu, color: 'slate' },
            { id: 'mq', label: 'MQ', icon: Terminal, color: 'orange' },
            { id: 'distributed', label: 'Dist', icon: Layers, color: 'cyan' },
            { id: 'design', label: 'Design', icon: Layout, color: 'rose' },
            { id: 'algo', label: 'Algorithm', icon: Code2, color: 'indigo' },
          ].map((cat) => (
            <button 
              key={cat.id}
              onClick={() => { setMainCategory(cat.id as any); setActiveTab('intro'); }}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-all py-1 px-4 rounded-full whitespace-nowrap",
                mainCategory === cat.id 
                  ? (cat.color === 'emerald' ? "bg-emerald-500 text-white" :
                     cat.color === 'blue' ? "bg-blue-500 text-white" :
                     cat.color === 'amber' ? "bg-amber-500 text-white" :
                     cat.color === 'orange' ? "bg-orange-500 text-white" :
                     cat.color === 'purple' ? "bg-purple-500 text-white" :
                     cat.color === 'red' ? "bg-red-500 text-white" :
                     cat.color === 'green' ? "bg-green-500 text-white" :
                     cat.color === 'sky' ? "bg-sky-500 text-white" :
                     cat.color === 'slate' ? "bg-slate-500 text-white" :
                     cat.color === 'cyan' ? "bg-cyan-500 text-white" :
                     cat.color === 'rose' ? "bg-rose-500 text-white" : "bg-indigo-500 text-white")
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <cat.icon size={14} /> {cat.label} 学习
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl cursor-pointer" onClick={() => setActiveTab('intro')}>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center text-white transition-colors",
              mainCategory === 'linux' ? "bg-emerald-500" : 
              mainCategory === 'docker' ? "bg-blue-500" :
              mainCategory === 'java' ? "bg-amber-500" :
              mainCategory === 'jvm' ? "bg-orange-500" : 
              mainCategory === 'juc' ? "bg-purple-500" :
              mainCategory === 'mysql' ? "bg-emerald-500" :
              mainCategory === 'redis' ? "bg-red-500" :
              mainCategory === 'spring' ? "bg-green-500" :
              mainCategory === 'network' ? "bg-sky-500" :
              mainCategory === 'os' ? "bg-slate-500" :
              mainCategory === 'mq' ? "bg-orange-500" :
              mainCategory === 'distributed' ? "bg-cyan-500" :
              mainCategory === 'design' ? "bg-rose-500" : "bg-indigo-500"
            )}>
              {mainCategory === 'linux' ? <Cpu size={20} /> : 
               mainCategory === 'docker' ? <Box size={20} /> :
               mainCategory === 'java' ? <Code2 size={20} /> :
               mainCategory === 'jvm' ? <Cpu size={20} /> : 
               mainCategory === 'juc' ? <Layers size={20} /> :
               mainCategory === 'mysql' ? <HardDrive size={20} /> :
               mainCategory === 'redis' ? <Cpu size={20} /> :
               mainCategory === 'spring' ? <Layers size={20} /> :
               mainCategory === 'network' ? <ExternalLink size={20} /> :
               mainCategory === 'os' ? <Cpu size={20} /> :
               mainCategory === 'mq' ? <Terminal size={20} /> :
               mainCategory === 'distributed' ? <Layers size={20} /> :
               mainCategory === 'design' ? <Layout size={20} /> : <Code2 size={20} />}
            </div>
            <span>DevOps <span className={cn(
              mainCategory === 'linux' ? "text-emerald-500" : 
              mainCategory === 'docker' ? "text-blue-500" :
              mainCategory === 'java' ? "text-amber-500" :
              mainCategory === 'jvm' ? "text-orange-500" : 
              mainCategory === 'juc' ? "text-purple-500" :
              mainCategory === 'mysql' ? "text-emerald-500" :
              mainCategory === 'redis' ? "text-red-500" :
              mainCategory === 'spring' ? "text-green-500" :
              mainCategory === 'network' ? "text-sky-500" :
              mainCategory === 'os' ? "text-slate-500" :
              mainCategory === 'mq' ? "text-orange-500" :
              mainCategory === 'distributed' ? "text-cyan-500" :
              mainCategory === 'design' ? "text-rose-500" : "text-indigo-500"
            )}>Guide</span></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { id: 'intro', label: '入门介绍', icon: Info, show: true },
              { id: 'commands', label: '指令手册', icon: Terminal, show: mainCategory === 'linux' || mainCategory === 'docker' },
              { id: 'interview', label: '面试精讲', icon: BookOpen, show: mainCategory !== 'linux' && mainCategory !== 'docker' && mainCategory !== 'algo' },
              { id: 'algorithms', label: '算法复盘', icon: Code2, show: mainCategory === 'algo' },
              { id: 'docs', label: '核心文档', icon: BookOpen, show: mainCategory === 'linux' || mainCategory === 'docker' },
              { id: 'practice', label: '实战练习', icon: Play, show: mainCategory === 'linux' || mainCategory === 'docker' },
            ].filter(i => i.show).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "px-4 py-2 rounded-full flex items-center gap-2 transition-all",
                  activeTab === item.id 
                    ? (mainCategory === 'linux' ? "bg-emerald-500 text-white shadow-md" : 
                       mainCategory === 'docker' ? "bg-blue-500 text-white shadow-md" :
                       mainCategory === 'java' ? "bg-amber-500 text-white shadow-md" :
                       mainCategory === 'jvm' ? "bg-orange-500 text-white shadow-md" :
                       mainCategory === 'juc' ? "bg-purple-500 text-white shadow-md" :
                       mainCategory === 'mysql' ? "bg-emerald-500 text-white shadow-md" :
                       mainCategory === 'redis' ? "bg-red-500 text-white shadow-md" :
                       mainCategory === 'spring' ? "bg-green-500 text-white shadow-md" :
                       mainCategory === 'network' ? "bg-sky-500 text-white shadow-md" :
                       mainCategory === 'os' ? "bg-slate-500 text-white shadow-md" :
                       mainCategory === 'mq' ? "bg-orange-500 text-white shadow-md" :
                       mainCategory === 'distributed' ? "bg-cyan-500 text-white shadow-md" :
                       mainCategory === 'design' ? "bg-rose-500 text-white shadow-md" : "bg-indigo-500 text-white shadow-md")
                    : "text-zinc-600 hover:bg-zinc-100"
                )}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-zinc-100 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {[
                  { id: 'intro', label: '入门介绍', icon: Info, show: true },
                  { id: 'commands', label: '指令手册', icon: Terminal, show: mainCategory === 'linux' || mainCategory === 'docker' },
                  { id: 'interview', label: '面试精讲', icon: BookOpen, show: mainCategory === 'jvm' || mainCategory === 'juc' },
                  { id: 'algorithms', label: '算法复盘', icon: Code2, show: mainCategory === 'algo' },
                  { id: 'docs', label: '核心文档', icon: BookOpen, show: mainCategory === 'linux' || mainCategory === 'docker' },
                  { id: 'practice', label: '实战练习', icon: Play, show: mainCategory === 'linux' || mainCategory === 'docker' },
                ].filter(i => i.show).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all",
                      activeTab === item.id 
                        ? (mainCategory === 'linux' ? "bg-emerald-50 text-emerald-600 font-bold" : 
                           mainCategory === 'docker' ? "bg-blue-50 text-blue-600 font-bold" :
                           mainCategory === 'java' ? "bg-amber-50 text-amber-600 font-bold" :
                           mainCategory === 'jvm' ? "bg-orange-50 text-orange-600 font-bold" :
                           mainCategory === 'juc' ? "bg-purple-50 text-purple-600 font-bold" : "bg-indigo-50 text-indigo-600 font-bold")
                        : "text-zinc-600 hover:bg-zinc-50"
                    )}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <AnimatePresence mode="wait">
          {activeTab === 'intro' && renderIntro()}
          {activeTab === 'commands' && renderCommands()}
          {activeTab === 'interview' && renderInterview()}
          {activeTab === 'algorithms' && renderAlgorithms()}
          {activeTab === 'docs' && renderDocs()}
          {activeTab === 'practice' && renderPractice()}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Box size={24} className={cn(
              mainCategory === 'linux' ? "text-emerald-500" : 
              mainCategory === 'docker' ? "text-blue-500" :
              mainCategory === 'jvm' ? "text-orange-500" : 
              mainCategory === 'juc' ? "text-purple-500" : "text-indigo-500"
            )} />
            <span>DevOps Guide</span>
          </div>
          <div className="text-zinc-400 text-sm text-center">
            © 2024 全栈技术面试与实战指南 · 助力每一位开发者的成长
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-zinc-400 hover:text-blue-500 transition-colors">GitHub</a>
            <a href="#" className="text-zinc-400 hover:text-blue-500 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .markdown-body h1, .markdown-body h2, .markdown-body h3 {
          font-weight: 700;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        .markdown-body p {
          margin-bottom: 1em;
          line-height: 1.7;
          color: #4b5563;
        }
        .markdown-body ul {
          list-style-type: disc;
          padding-left: 1.5em;
          margin-bottom: 1em;
        }
        .markdown-body li {
          margin-bottom: 0.5em;
          color: #4b5563;
        }
        .markdown-body code {
          background: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 0.3em;
          font-family: monospace;
          font-size: 0.9em;
          color: #2563eb;
        }
      `}</style>
    </div>
  );
}

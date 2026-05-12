import React, { useState, useMemo, useRef } from 'react';
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
  Code2,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { formatInterviewAnswer } from './utils/interview-format';
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
  JAVA_REFINED_POINTS,
  JUC_REFINED_POINTS,
  JVM_REFINED_POINTS,
  MYSQL_REFINED_POINTS,
  REDIS_REFINED_POINTS,
  SPRING_REFINED_POINTS,
  MQ_REFINED_POINTS,
  DISTRIBUTED_REFINED_POINTS,
  NETWORK_REFINED_POINTS,
  OS_REFINED_POINTS,
  AI_BASIC_REFINED_POINTS,
  AI_CORE_REFINED_POINTS,
  AI_ENGINEERING_REFINED_POINTS,
  LINUX_REFINED_DOCS,
  DOCKER_REFINED_DOCS,
  NETWORK_POINTS,
  OS_INTERVIEW_POINTS,
  MQ_POINTS,
  DISTRIBUTED_POINTS,
  DESIGN_POINTS,
  AI_BASIC_POINTS,
  AI_CORE_POINTS,
  AI_ENGINEERING_POINTS,
  SQL_LEETCODE_50,
  SQL_GUIDE_POINTS,
  SQL_OPERATION_POINTS,
  ALGORITHM_TEMPLATES,
  REDIS_HANDBOOK_POINTS,
  MYSQL_HANDBOOK_POINTS,
  SPRING_HANDBOOK_POINTS,
  JAVA_HANDBOOK_POINTS,
  JUC_HANDBOOK_POINTS,
  JVM_HANDBOOK_POINTS,
  DISTRIBUTED_HANDBOOK_POINTS,
  MQ_HANDBOOK_POINTS,
  JAVA_SYSTEMATIC_POINTS,
  JUC_SYSTEMATIC_POINTS,
  JVM_SYSTEMATIC_POINTS,
  SPRING_SYSTEMATIC_POINTS,
  REDIS_SYSTEMATIC_POINTS,
  MYSQL_SYSTEMATIC_POINTS,
  NETWORK_SYSTEMATIC_POINTS,
  OS_SYSTEMATIC_POINTS,
  MQ_SYSTEMATIC_POINTS,
  DISTRIBUTED_SYSTEMATIC_POINTS,
  LINUX_COMMAND_SUPPLEMENTS,
  DOCKER_COMMAND_SUPPLEMENTS,
  LINUX_DOC_SUPPLEMENTS,
  DOCKER_DOC_SUPPLEMENTS,
  Command,
  InterviewPoint,
  AlgorithmPoint,
  AlgorithmTemplate
} from './constants';
import { getAlgorithmAcmCode } from './utils/algorithm-acm';
import { getAlgorithmAcmLiteCode } from './utils/algorithm-acm-lite';
import { TerminalSimulator } from './components/TerminalSimulator';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getCategoryLabel(category: MainCategory) {
  switch (category) {
    case 'linux':
      return 'Linux';
    case 'docker':
      return 'Docker';
    case 'java':
      return 'Java';
    case 'jvm':
      return 'JVM';
    case 'juc':
      return 'JUC';
    case 'mysql':
      return 'MySQL';
    case 'redis':
      return 'Redis';
    case 'spring':
      return 'Spring';
    case 'network':
      return 'Network';
    case 'os':
      return 'OS';
    case 'mq':
      return 'MQ';
    case 'distributed':
      return 'Distributed';
    case 'design':
      return 'System Design';
    case 'algo':
      return 'LeetCode';
    case 'ai':
      return 'AI';
    case 'sql':
      return 'SQL';
  }
}

function getInterviewTitle(category: MainCategory) {
  switch (category) {
    case 'java':
      return 'Java Interview';
    case 'jvm':
      return 'JVM Interview';
    case 'juc':
      return 'JUC Interview';
    case 'mysql':
      return 'MySQL Interview';
    case 'redis':
      return 'Redis Interview';
    case 'spring':
      return 'Spring Interview';
    case 'network':
      return 'Network Interview';
    case 'os':
      return 'OS Interview';
    case 'mq':
      return 'MQ Interview';
    case 'distributed':
      return 'Distributed Interview';
    case 'design':
      return 'System Design Interview';
    case 'ai':
      return 'AI Interview';
    case 'sql':
      return 'SQL 50';
    default:
      return 'Interview';
  }
}

type MainCategory = 'linux' | 'docker' | 'java' | 'jvm' | 'juc' | 'mysql' | 'redis' | 'spring' | 'network' | 'os' | 'mq' | 'distributed' | 'design' | 'algo' | 'ai' | 'sql';
type TabType = 'commands' | 'docs' | 'interview' | 'algorithms';

function getDefaultTab(category: MainCategory): TabType {
  if (category === 'linux' || category === 'docker') {
    return 'commands';
  }
  if (category === 'algo') {
    return 'algorithms';
  }
  return 'interview';
}

function getAccentStyles(category: MainCategory) {
  switch (category) {
    case 'java':
      return { pill: 'bg-amber-100 text-amber-700 border-amber-200', subtle: 'bg-amber-50 border-amber-200 text-amber-700', icon: 'bg-amber-100 text-amber-600', text: 'text-amber-600', ring: 'ring-amber-200' };
    case 'jvm':
      return { pill: 'bg-orange-100 text-orange-700 border-orange-200', subtle: 'bg-orange-50 border-orange-200 text-orange-700', icon: 'bg-orange-100 text-orange-600', text: 'text-orange-600', ring: 'ring-orange-200' };
    case 'juc':
      return { pill: 'bg-purple-100 text-purple-700 border-purple-200', subtle: 'bg-purple-50 border-purple-200 text-purple-700', icon: 'bg-purple-100 text-purple-600', text: 'text-purple-600', ring: 'ring-purple-200' };
    case 'mysql':
      return { pill: 'bg-emerald-100 text-emerald-700 border-emerald-200', subtle: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: 'bg-emerald-100 text-emerald-600', text: 'text-emerald-600', ring: 'ring-emerald-200' };
    case 'redis':
      return { pill: 'bg-red-100 text-red-700 border-red-200', subtle: 'bg-red-50 border-red-200 text-red-700', icon: 'bg-red-100 text-red-600', text: 'text-red-600', ring: 'ring-red-200' };
    case 'spring':
      return { pill: 'bg-green-100 text-green-700 border-green-200', subtle: 'bg-green-50 border-green-200 text-green-700', icon: 'bg-green-100 text-green-600', text: 'text-green-600', ring: 'ring-green-200' };
    case 'network':
      return { pill: 'bg-sky-100 text-sky-700 border-sky-200', subtle: 'bg-sky-50 border-sky-200 text-sky-700', icon: 'bg-sky-100 text-sky-600', text: 'text-sky-600', ring: 'ring-sky-200' };
    case 'os':
      return { pill: 'bg-slate-100 text-slate-700 border-slate-200', subtle: 'bg-slate-50 border-slate-200 text-slate-700', icon: 'bg-slate-100 text-slate-600', text: 'text-slate-600', ring: 'ring-slate-200' };
    case 'mq':
      return { pill: 'bg-orange-100 text-orange-700 border-orange-200', subtle: 'bg-orange-50 border-orange-200 text-orange-700', icon: 'bg-orange-100 text-orange-600', text: 'text-orange-600', ring: 'ring-orange-200' };
    case 'distributed':
      return { pill: 'bg-cyan-100 text-cyan-700 border-cyan-200', subtle: 'bg-cyan-50 border-cyan-200 text-cyan-700', icon: 'bg-cyan-100 text-cyan-600', text: 'text-cyan-600', ring: 'ring-cyan-200' };
    case 'design':
      return { pill: 'bg-rose-100 text-rose-700 border-rose-200', subtle: 'bg-rose-50 border-rose-200 text-rose-700', icon: 'bg-rose-100 text-rose-600', text: 'text-rose-600', ring: 'ring-rose-200' };
    case 'sql':
      return { pill: 'bg-teal-100 text-teal-700 border-teal-200', subtle: 'bg-teal-50 border-teal-200 text-teal-700', icon: 'bg-teal-100 text-teal-600', text: 'text-teal-600', ring: 'ring-teal-200' };
    case 'ai':
      return { pill: 'bg-violet-100 text-violet-700 border-violet-200', subtle: 'bg-violet-50 border-violet-200 text-violet-700', icon: 'bg-violet-100 text-violet-600', text: 'text-violet-600', ring: 'ring-violet-200' };
    default:
      return { pill: 'bg-indigo-100 text-indigo-700 border-indigo-200', subtle: 'bg-indigo-50 border-indigo-200 text-indigo-700', icon: 'bg-indigo-100 text-indigo-600', text: 'text-indigo-600', ring: 'ring-indigo-200' };
  }
}

function normalizeInterviewQuestion(question: string) {
  return question
    .replace(/[【】（）()《》“”"'`·、，。,.\-—_:：！？?]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();
}

function dedupeInterviewPoints(points: InterviewPoint[]) {
  const seen = new Set<string>();
  return points.filter((point) => {
    const key = normalizeInterviewQuestion(point.question);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function normalizeSimpleKey(text: string) {
  return text.replace(/\s+/g, '').toLowerCase();
}

function dedupeCommands(commands: Command[]) {
  const seen = new Set<string>();
  return commands.filter((command) => {
    if (typeof (command as any)?.command !== 'string') {
      return false;
    }
    const key = normalizeSimpleKey(command.command);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function dedupeDocs<T extends { title: string }>(docs: T[]) {
  const seen = new Set<string>();
  return docs.filter((doc) => {
    const key = normalizeSimpleKey(doc.title);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export default function App() {
  const [mainCategory, setMainCategory] = useState<MainCategory>('linux');
  const [activeTab, setActiveTab] = useState<TabType>(getDefaultTab('linux'));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const [selectedInterview, setSelectedInterview] = useState<InterviewPoint | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmPoint | null>(null);
  const [selectedAlgorithmTemplate, setSelectedAlgorithmTemplate] = useState<AlgorithmTemplate | null>(null);
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [algoType, setAlgoType] = useState<'codetop' | 'hot100'>('codetop');
  const [algorithmSection, setAlgorithmSection] = useState<'problems' | 'templates'>('problems');
  const [algorithmCodeMode, setAlgorithmCodeMode] = useState<'core' | 'acm' | 'acm-lite'>('core');
  const [aiView, setAiView] = useState<'basic' | 'core' | 'engineering'>('basic');
  const [sqlView, setSqlView] = useState<'leetcode50' | 'operations' | 'guide'>('leetcode50');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const commandDetailRef = useRef<HTMLDivElement | null>(null);
  const interviewDetailRef = useRef<HTMLDivElement | null>(null);
  const algorithmDetailRef = useRef<HTMLDivElement | null>(null);
  const docDetailRef = useRef<HTMLDivElement | null>(null);
  const isFocusWorkspaceTab =
    activeTab === 'commands' ||
    activeTab === 'interview' ||
    activeTab === 'algorithms' ||
    activeTab === 'docs';

  const currentCommandsRaw =
    mainCategory === 'linux'
      ? dedupeCommands([...LINUX_COMMANDS, ...LINUX_COMMAND_SUPPLEMENTS])
      : mainCategory === 'docker'
        ? dedupeCommands([...DOCKER_COMMANDS, ...DOCKER_COMMAND_SUPPLEMENTS])
        : [];
  const currentCommands = currentCommandsRaw.filter(
    (cmd): cmd is Command =>
      typeof (cmd as any)?.command === 'string' &&
      typeof (cmd as any)?.description === 'string'
  );
  const currentDocs =
    mainCategory === 'linux'
      ? dedupeDocs([...LINUX_REFINED_DOCS, ...LINUX_DOCS, ...LINUX_DOC_SUPPLEMENTS])
      : mainCategory === 'docker'
        ? dedupeDocs([...DOCKER_REFINED_DOCS, ...DOCKER_DOCS, ...DOCKER_DOC_SUPPLEMENTS])
        : [];
  const selectedDoc = currentDocs[selectedDocIndex] ?? null;
  const currentInterview = 
    mainCategory === 'java' ? dedupeInterviewPoints([...JAVA_REFINED_POINTS, ...JAVA_POINTS, ...JAVA_HANDBOOK_POINTS, ...JAVA_SYSTEMATIC_POINTS]) :
    mainCategory === 'jvm' ? dedupeInterviewPoints([...JVM_REFINED_POINTS, ...JVM_POINTS, ...JVM_HANDBOOK_POINTS, ...JVM_SYSTEMATIC_POINTS]) : 
    mainCategory === 'juc' ? dedupeInterviewPoints([...JUC_REFINED_POINTS, ...JUC_POINTS, ...JUC_HANDBOOK_POINTS, ...JUC_SYSTEMATIC_POINTS]) :
    mainCategory === 'mysql' ? dedupeInterviewPoints([...MYSQL_REFINED_POINTS, ...MYSQL_POINTS, ...MYSQL_HANDBOOK_POINTS, ...MYSQL_SYSTEMATIC_POINTS]) :
    mainCategory === 'redis' ? dedupeInterviewPoints([...REDIS_REFINED_POINTS, ...REDIS_POINTS, ...REDIS_HANDBOOK_POINTS, ...REDIS_SYSTEMATIC_POINTS]) :
    mainCategory === 'spring' ? dedupeInterviewPoints([...SPRING_REFINED_POINTS, ...SPRING_POINTS, ...SPRING_HANDBOOK_POINTS, ...SPRING_SYSTEMATIC_POINTS]) :
    mainCategory === 'network' ? dedupeInterviewPoints([...NETWORK_REFINED_POINTS, ...NETWORK_POINTS, ...NETWORK_SYSTEMATIC_POINTS]) :
    mainCategory === 'os' ? dedupeInterviewPoints([...OS_REFINED_POINTS, ...OS_INTERVIEW_POINTS, ...OS_SYSTEMATIC_POINTS]) :
    mainCategory === 'mq' ? dedupeInterviewPoints([...MQ_REFINED_POINTS, ...MQ_POINTS, ...MQ_HANDBOOK_POINTS, ...MQ_SYSTEMATIC_POINTS]) :
    mainCategory === 'distributed' ? dedupeInterviewPoints([...DISTRIBUTED_REFINED_POINTS, ...DISTRIBUTED_POINTS, ...DISTRIBUTED_HANDBOOK_POINTS, ...DISTRIBUTED_SYSTEMATIC_POINTS]) :
    mainCategory === 'design' ? DESIGN_POINTS :
    mainCategory === 'ai'
      ? dedupeInterviewPoints(
          aiView === 'basic'
            ? [...AI_BASIC_REFINED_POINTS, ...AI_BASIC_POINTS]
            : aiView === 'core'
              ? [...AI_CORE_REFINED_POINTS, ...AI_CORE_POINTS]
              : [...AI_ENGINEERING_REFINED_POINTS, ...AI_ENGINEERING_POINTS]
        )
      :
    mainCategory === 'sql'
      ? (sqlView === 'leetcode50'
          ? SQL_LEETCODE_50
          : sqlView === 'operations'
            ? SQL_OPERATION_POINTS
            : SQL_GUIDE_POINTS)
      : DESIGN_POINTS;
  const currentAlgorithms = algoType === 'codetop' ? ALGORITHM_POINTS : HOT_100_POINTS;

  const filteredCommands = useMemo(() => {
    const keyword = searchQuery.toLowerCase();
    return currentCommands.filter((cmd: any) => {
      const command = typeof cmd?.command === 'string' ? cmd.command.toLowerCase() : '';
      const description = typeof cmd?.description === 'string' ? cmd.description.toLowerCase() : '';
      return command.includes(keyword) || description.includes(keyword);
    });
  }, [searchQuery, currentCommands]);

  const filteredInterview = useMemo(() => {
    const keyword = searchQuery.toLowerCase();
    return currentInterview.filter((p) => {
      const question = typeof p?.question === 'string' ? p.question.toLowerCase() : '';
      const answer = typeof p?.answer === 'string' ? p.answer.toLowerCase() : '';
      return question.includes(keyword) || answer.includes(keyword);
    });
  }, [searchQuery, currentInterview]);

  const filteredAlgorithms = useMemo(() => {
    const keyword = searchQuery.toLowerCase();
    return currentAlgorithms.filter((p) => {
      const title = typeof p?.title === 'string' ? p.title.toLowerCase() : '';
      const approach = typeof p?.approach === 'string' ? p.approach.toLowerCase() : '';
      return title.includes(keyword) || approach.includes(keyword);
    });
  }, [searchQuery, currentAlgorithms]);

  const groupedAlgorithms = useMemo(() => {
    if (algoType !== 'hot100') {
      return [];
    }

    const groups = new Map<string, AlgorithmPoint[]>();
    filteredAlgorithms.forEach((algorithm) => {
      const groupName = algorithm.group ?? 'Ungrouped';
      const items = groups.get(groupName) ?? [];
      items.push(algorithm);
      groups.set(groupName, items);
    });

    return Array.from(groups.entries()).map(([name, items]) => ({ name, items }));
  }, [algoType, filteredAlgorithms]);

  const filteredAlgorithmTemplates = useMemo(() => {
    return ALGORITHM_TEMPLATES.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.usage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const visibleTabs = [
    { id: 'commands', label: '命令手册', icon: Terminal, show: mainCategory === 'linux' || mainCategory === 'docker' },
    { id: 'interview', label: '面试精讲', icon: BookOpen, show: mainCategory !== 'linux' && mainCategory !== 'docker' && mainCategory !== 'algo' },
    { id: 'algorithms', label: '算法复盘', icon: Code2, show: mainCategory === 'algo' },
    { id: 'docs', label: '核心文档', icon: BookOpen, show: mainCategory === 'linux' || mainCategory === 'docker' },
  ].filter((item) => item.show);
  const shouldShowTabSwitcher = visibleTabs.length > 1;
  const shouldShowTopNav = mainCategory === 'linux' || mainCategory === 'docker';

  const scrollContainerToTop = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollDetailIntoView = (ref: React.RefObject<HTMLDivElement | null>) => {
    scrollContainerToTop(ref);
    if (typeof window === 'undefined' || window.matchMedia('(min-width: 1024px)').matches) {
      return;
    }
    window.requestAnimationFrame(() => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };
  React.useEffect(() => {
    setSelectedCommand((current) => {
      if (!filteredCommands.length) {
        return null;
      }
      if (current && filteredCommands.some((item) => item.id === current.id)) {
        return current;
      }
      return filteredCommands[0];
    });
  }, [filteredCommands]);

  React.useEffect(() => {
    setSelectedInterview((current) => {
      if (!filteredInterview.length) {
        return null;
      }
      if (current && filteredInterview.some((item) => item.id === current.id)) {
        return current;
      }
      return filteredInterview[0];
    });
  }, [filteredInterview]);

  React.useEffect(() => {
    if (algorithmSection !== 'problems') {
      return;
    }
    setSelectedAlgorithm((current) => {
      if (!filteredAlgorithms.length) {
        return null;
      }
      if (current && filteredAlgorithms.some((item) => item.id === current.id)) {
        return current;
      }
      return filteredAlgorithms[0];
    });
  }, [filteredAlgorithms, algorithmSection]);

  React.useEffect(() => {
    if (algorithmSection !== 'templates') {
      return;
    }
    setSelectedAlgorithmTemplate((current) => {
      if (!filteredAlgorithmTemplates.length) {
        return null;
      }
      if (current && filteredAlgorithmTemplates.some((item) => item.id === current.id)) {
        return current;
      }
      return filteredAlgorithmTemplates[0];
    });
  }, [filteredAlgorithmTemplates, algorithmSection]);

  React.useEffect(() => {
    if (algorithmSection === 'templates') {
      setSelectedAlgorithm(null);
      return;
    }
    setSelectedAlgorithmTemplate(null);
  }, [algorithmSection]);

  React.useEffect(() => {
    setSelectedDocIndex(0);
  }, [mainCategory]);

  const renderIntro = () => {
    const introThemes = {
      linux: {
        section: 'bg-zinc-900',
        button: 'bg-emerald-500 hover:bg-emerald-600',
        gradient: 'from-emerald-500/20',
        cardIcon: 'text-emerald-500',
        gridIcon: 'text-emerald-400/40',
        highlight: 'text-emerald-400',
        badgeIcon: Cpu,
        heroIcon: Terminal,
      },
      docker: {
        section: 'bg-blue-950',
        button: 'bg-blue-500 hover:bg-blue-600',
        gradient: 'from-blue-500/20',
        cardIcon: 'text-blue-500',
        gridIcon: 'text-blue-400/40',
        highlight: 'text-blue-400',
        badgeIcon: Box,
        heroIcon: Box,
      },
      jvm: {
        section: 'bg-orange-950',
        button: 'bg-orange-500 hover:bg-orange-600',
        gradient: 'from-orange-500/20',
        cardIcon: 'text-orange-500',
        gridIcon: 'text-orange-400/40',
        highlight: 'text-orange-400',
        badgeIcon: Cpu,
        heroIcon: Cpu,
      },
      juc: {
        section: 'bg-purple-950',
        button: 'bg-purple-500 hover:bg-purple-600',
        gradient: 'from-purple-500/20',
        cardIcon: 'text-purple-500',
        gridIcon: 'text-purple-400/40',
        highlight: 'text-purple-400',
        badgeIcon: Layers,
        heroIcon: Layers,
      },
      mysql: {
        section: 'bg-emerald-950',
        button: 'bg-emerald-500 hover:bg-emerald-600',
        gradient: 'from-emerald-500/20',
        cardIcon: 'text-emerald-500',
        gridIcon: 'text-emerald-400/40',
        highlight: 'text-emerald-400',
        badgeIcon: HardDrive,
        heroIcon: Database,
      },
      redis: {
        section: 'bg-red-950',
        button: 'bg-red-500 hover:bg-red-600',
        gradient: 'from-red-500/20',
        cardIcon: 'text-red-500',
        gridIcon: 'text-red-400/40',
        highlight: 'text-red-400',
        badgeIcon: Cpu,
        heroIcon: Cpu,
      },
      spring: {
        section: 'bg-green-950',
        button: 'bg-green-500 hover:bg-green-600',
        gradient: 'from-green-500/20',
        cardIcon: 'text-green-500',
        gridIcon: 'text-green-400/40',
        highlight: 'text-green-400',
        badgeIcon: Layers,
        heroIcon: Layers,
      },
      network: {
        section: 'bg-sky-950',
        button: 'bg-sky-500 hover:bg-sky-600',
        gradient: 'from-sky-500/20',
        cardIcon: 'text-sky-500',
        gridIcon: 'text-sky-400/40',
        highlight: 'text-sky-400',
        badgeIcon: ExternalLink,
        heroIcon: ExternalLink,
      },
      os: {
        section: 'bg-slate-950',
        button: 'bg-slate-500 hover:bg-slate-600',
        gradient: 'from-slate-500/20',
        cardIcon: 'text-slate-500',
        gridIcon: 'text-slate-400/40',
        highlight: 'text-slate-300',
        badgeIcon: Cpu,
        heroIcon: Cpu,
      },
      mq: {
        section: 'bg-orange-950',
        button: 'bg-orange-500 hover:bg-orange-600',
        gradient: 'from-orange-500/20',
        cardIcon: 'text-orange-500',
        gridIcon: 'text-orange-400/40',
        highlight: 'text-orange-300',
        badgeIcon: Terminal,
        heroIcon: Terminal,
      },
      distributed: {
        section: 'bg-cyan-950',
        button: 'bg-cyan-500 hover:bg-cyan-600',
        gradient: 'from-cyan-500/20',
        cardIcon: 'text-cyan-500',
        gridIcon: 'text-cyan-300/40',
        highlight: 'text-cyan-300',
        badgeIcon: Layers,
        heroIcon: Layers,
      },
      design: {
        section: 'bg-rose-950',
        button: 'bg-rose-500 hover:bg-rose-600',
        gradient: 'from-rose-500/20',
        cardIcon: 'text-rose-500',
        gridIcon: 'text-rose-300/40',
        highlight: 'text-rose-300',
        badgeIcon: Layout,
        heroIcon: Layout,
      },
      algo: {
        section: 'bg-indigo-950',
        button: 'bg-indigo-500 hover:bg-indigo-600',
        gradient: 'from-indigo-500/20',
        cardIcon: 'text-indigo-500',
        gridIcon: 'text-indigo-300/40',
        highlight: 'text-indigo-300',
        badgeIcon: Code2,
        heroIcon: Code2,
      },
    } as const;

    const introContent = {
      linux: {
        badge: 'Linux',
        titlePrefix: '掌握',
        titleHighlight: 'Linux',
        titleSuffix: '命令与线上排障',
        description: '覆盖常用命令、系统原理、真实排障场景和命令参数解释，适合后端面试和实际工作同时复习。',
        primaryLabel: '开始学习命令',
        cards: [
          { icon: Terminal, title: '命令实战', desc: '按场景整理 ls、grep、find、ps、top、netstat 等常见命令。' },
          { icon: HardDrive, title: '系统排障', desc: '补足 CPU 飙高、磁盘打满、端口占用、服务不可用等高频问题。' },
          { icon: Layout, title: '参数解释', desc: '核心文档里补充常见参数含义，避免只会背命令不会解释。' },
        ],
      },
      docker: {
        badge: 'Docker',
        titlePrefix: '梳理',
        titleHighlight: 'Docker',
        titleSuffix: '容器化部署基础',
        description: '从镜像、容器、网络、数据卷到 Compose 与 Kubernetes 关系，覆盖后端岗位常见追问。',
        primaryLabel: '开始学习命令',
        cards: [
          { icon: Layers, title: '容器基础', desc: '理解镜像分层、容器生命周期、网络模式和数据卷。' },
          { icon: Container, title: '部署流程', desc: '覆盖 Dockerfile、Compose、多服务编排和上线排错思路。' },
          { icon: HardDrive, title: '面试追问', desc: '补充容器隔离、资源限制、日志、健康检查等常问问题。' },
        ],
      },
      jvm: {
        badge: 'JVM',
        titlePrefix: '深入',
        titleHighlight: 'JVM',
        titleSuffix: '内存、GC 与调优',
        description: '围绕运行时数据区、垃圾回收、类加载、OOM 和 Full GC 排查构建完整知识链。',
        primaryLabel: '开始学习面试题',
        cards: [
          { icon: Cpu, title: '内存结构', desc: '覆盖堆、栈、方法区、程序计数器和对象分配流程。' },
          { icon: Info, title: 'GC 原理', desc: '整理回收算法、收集器定位、触发时机和调优思路。' },
          { icon: CheckCircle2, title: '线上排查', desc: '补充 Full GC、OOM、类加载异常的常见排查路径。' },
        ],
      },
      juc: {
        badge: 'JUC',
        titlePrefix: '攻克',
        titleHighlight: 'JUC',
        titleSuffix: '并发核心问题',
        description: '覆盖线程、锁、线程池、可见性、并发容器和线程协作，重点回答面试里的追问。',
        primaryLabel: '开始学习面试题',
        cards: [
          { icon: Layers, title: '锁与可见性', desc: '从 synchronized、volatile 到 Lock 与 happens-before。' },
          { icon: Info, title: '线程协作', desc: '补充 CountDownLatch、CyclicBarrier、Semaphore 和线程通信。' },
          { icon: CheckCircle2, title: '线程池实战', desc: '扩展线程池参数、监控、拒绝策略与 CompletableFuture。' },
        ],
      },
      mysql: {
        badge: 'MySQL',
        titlePrefix: '掌握',
        titleHighlight: 'MySQL',
        titleSuffix: '索引、事务与优化',
        description: '围绕索引、隔离级别、MVCC、慢 SQL、深分页、日志体系和分库分表建立完整面试视角。',
        primaryLabel: '开始学习面试题',
        cards: [
          { icon: Database, title: '索引与执行计划', desc: '讲清 B+ 树、回表、最左前缀、覆盖索引和 EXPLAIN。' },
          { icon: Info, title: '事务与日志', desc: '整合 ACID、MVCC、锁、redo log、undo log 与 binlog。' },
          { icon: CheckCircle2, title: '性能优化', desc: '补充深分页、慢查询、分库分表和线上定位方法。' },
        ],
      },
      redis: {
        badge: 'Redis',
        titlePrefix: '理解',
        titleHighlight: 'Redis',
        titleSuffix: '缓存与高可用',
        description: '覆盖数据结构、持久化、淘汰策略、一致性、高可用、Redisson 和缓存异常场景。',
        primaryLabel: '开始学习面试题',
        cards: [
          { icon: Cpu, title: '数据结构', desc: '补充 String、Hash、List、Set、ZSet 的典型业务场景。' },
          { icon: Info, title: '一致性与高可用', desc: '扩展缓存双写、哨兵、主从、集群和数据库一致性问题。' },
          { icon: CheckCircle2, title: '分布式能力', desc: '加入 Redisson 锁、看门狗、限流器和实战追问。' },
        ],
      },
      spring: {
        badge: 'Spring',
        titlePrefix: '深入',
        titleHighlight: 'Spring',
        titleSuffix: '容器与事务机制',
        description: '从 IoC、AOP、Bean 生命周期到容器启动、自动装配、事务传播和失效场景，统一整理。',
        primaryLabel: '开始学习面试题',
        cards: [
          { icon: Layers, title: '容器核心', desc: '梳理 IoC、DI、Bean 生命周期、自动装配和启动流程。' },
          { icon: Info, title: 'AOP 与事务', desc: '补充代理机制、事务传播、事务失效和常见踩坑。' },
          { icon: CheckCircle2, title: 'SpringBoot', desc: '保留自动配置、起步依赖、MVC 链路与常用注解。' },
        ],
      },
      network: {
        badge: 'Network',
        titlePrefix: '掌握',
        titleHighlight: '网络',
        titleSuffix: '协议与传输机制',
        description: '覆盖 TCP/UDP、HTTP/HTTPS、DNS、滑动窗口、拥塞控制、IO 多路复用与网络排障基础。',
        primaryLabel: '开始学习面试题',
        cards: [
          { icon: ExternalLink, title: '传输层基础', desc: '讲清三次握手、四次挥手、滑动窗口和拥塞控制。' },
          { icon: Info, title: '应用层协议', desc: '整理 HTTP、HTTPS、状态码、Cookie、Session 与 DNS。' },
          { icon: CheckCircle2, title: '高频追问', desc: '补充 select、poll、epoll、分层模型和断点续传场景。' },
        ],
      },
      os: {
        badge: 'OS',
        titlePrefix: '理解',
        titleHighlight: '操作系统',
        titleSuffix: '核心机制',
        description: '整理进程线程、死锁、内存管理、页表、用户态与内核态、进程通信和协程等高频问题。',
        primaryLabel: '开始学习面试题',
        cards: [
          { icon: Cpu, title: '进程与线程', desc: '从调度、通信、同步到死锁条件与常见追问。' },
          { icon: Info, title: '内存与文件系统', desc: '补充页表、虚拟内存、缓存一致性与文件系统基础。' },
          { icon: CheckCircle2, title: '系统视角', desc: '回答用户态/内核态、32 位 vs 64 位、协程与线程差异。' },
        ],
      },
      mq: {
        badge: 'MQ',
        titlePrefix: '梳理',
        titleHighlight: '消息队列',
        titleSuffix: '可靠性与一致性',
        description: '围绕解耦、削峰、可靠性、顺序性、积压、事务一致性和主流 MQ 实战追问展开。',
        primaryLabel: '开始学习面试题',
        cards: [
          { icon: Terminal, title: '基础作用', desc: '覆盖解耦、异步、削峰填谷和核心模型。' },
          { icon: Info, title: '可靠性设计', desc: '补充发送失败、重复消费、幂等、顺序性与消息丢失。' },
          { icon: CheckCircle2, title: '实战对比', desc: '加入 Kafka、RocketMQ、RabbitMQ 的差异和使用场景。' },
        ],
      },
      distributed: {
        badge: 'Distributed',
        titlePrefix: '进阶',
        titleHighlight: '分布式',
        titleSuffix: '一致性与架构设计',
        description: '整合注册配置中心、分布式事务、限流、ID 生成、库存扣减、缓存一致性和中间件选型。',
        primaryLabel: '开始学习面试题',
        cards: [
          { icon: Layers, title: '中间件选型', desc: '补充 Nacos、Sentinel、Seata、Dubbo、etcd 等定位与取舍。' },
          { icon: Info, title: '一致性问题', desc: '围绕库存扣减、缓存一致性、分布式事务和幂等设计。' },
          { icon: CheckCircle2, title: '高并发场景', desc: '加入分布式 ID、令牌桶限流、秒杀和下单链路追问。' },
        ],
      },
      design: {
        badge: 'System Design',
        titlePrefix: '准备',
        titleHighlight: '系统设计',
        titleSuffix: '常见大厂场景题',
        description: '围绕高并发系统、缓存一致性、限流、链路拆分和容量设计补充面试常问场景。',
        primaryLabel: '开始学习面试题',
        cards: [
          { icon: Layout, title: '场景题拆解', desc: '按目标、瓶颈、方案、权衡的结构回答设计题。' },
          { icon: Info, title: '核心机制', desc: '补充缓存、限流、削峰、消息异步和存储分层。' },
          { icon: CheckCircle2, title: '高并发细节', desc: '加入秒杀、库存、幂等、热点数据与容灾思路。' },
        ],
      },
      algo: {
        badge: 'LeetCode',
        titlePrefix: '复盘',
        titleHighlight: 'Hot 100',
        titleSuffix: '高频算法题',
        description: '按官方 Hot 100 分组和顺序整理，保留核心代码模式，同时补充 ACM 模式与 ACM 简写模式。',
        primaryLabel: '开始学习算法',
        cards: [
          { icon: Code2, title: '官方顺序', desc: '按官方分组和题目顺序复盘，减少知识点跳跃。' },
          { icon: Info, title: '多种写法', desc: '每题提供核心代码、ACM 模式和更短的 ACM 简写模式。' },
          { icon: CheckCircle2, title: '模板补充', desc: '常用模板中增加不同数据结构的 ACM 通用写法。' },
        ],
      },
    } as const;

    if (mainCategory === 'ai') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <section className="relative overflow-hidden rounded-3xl bg-violet-950 p-8 text-white md:p-12">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                <Cpu size={14} />
                <span>AI</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                梳理 <span className="text-violet-300">AI 面试</span>
                <br />
                从基础概念到工程落地
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-violet-100/80">
                只保留可公开复用的技术问答，覆盖 LLM 基础、RAG、Agent、MCP、评测以及工程化场景。
              </p>
              <button
                onClick={() => setActiveTab('interview')}
                className="flex items-center gap-2 rounded-full bg-violet-500 px-6 py-3 font-semibold shadow-lg transition-all hover:bg-violet-600"
              >
                开始学习 AI <ChevronRight size={18} />
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-l from-violet-500/20 to-transparent" />
              <div className="grid grid-cols-4 gap-4 p-8">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="flex aspect-square items-center justify-center rounded-lg border border-white/10">
                    <Cpu size={20} className="text-violet-300/40" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Cpu className="mb-4 text-violet-500" size={32} />
              <h3 className="mb-2 text-xl font-bold">基础概念</h3>
              <p className="text-zinc-600">先覆盖 Token、上下文窗口、Prompt、Tool Calling 和流式返回。</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Layers className="mb-4 text-violet-500" size={32} />
              <h3 className="mb-2 text-xl font-bold">高频核心</h3>
              <p className="text-zinc-600">重点讲清 RAG 链路、Embedding、Rerank、Agent、MCP、幻觉与评测。</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <CheckCircle2 className="mb-4 text-violet-500" size={32} />
              <h3 className="mb-2 text-xl font-bold">工程化与场景</h3>
              <p className="text-zinc-600">补充稳定性、成本、延迟、安全、缓存、限流和输出格式控制。</p>
            </div>
          </div>
        </motion.div>
      );
    }

    if (mainCategory === 'sql') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <section className="relative overflow-hidden rounded-3xl bg-teal-950 p-8 text-white md:p-12">
            <div className="relative z-10 max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                <Database size={14} />
                <span>SQL 50</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                拿下 <span className="text-teal-300">LeetCode SQL 50</span>
                <br />
                表结构、样例与 SQL 一起看
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-teal-100/80">
                按官方 SQL50 顺序整理完整五十题，统一展示题目描述、表结构、样例输入输出和参考 SQL。
              </p>
              <button
                onClick={() => setActiveTab('interview')}
                className="flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 font-semibold shadow-lg transition-all hover:bg-teal-600"
              >
                开始学习 SQL 50 <ChevronRight size={18} />
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-l from-teal-500/20 to-transparent" />
              <div className="grid grid-cols-4 gap-4 p-8">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="flex aspect-square items-center justify-center rounded-lg border border-white/10">
                    <Database size={20} className="text-teal-300/40" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Database className="mb-4 text-teal-500" size={32} />
              <h3 className="mb-2 text-xl font-bold">完整 50 题</h3>
              <p className="text-zinc-600">按官方 SQL50 学习顺序完整整理，方便整套连刷和复盘。</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Code2 className="mb-4 text-teal-500" size={32} />
              <h3 className="mb-2 text-xl font-bold">SQL 代码框</h3>
              <p className="text-zinc-600">所有参考 SQL 都放进代码框里，阅读、抄写和对照练习更清楚。</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Info className="mb-4 text-teal-500" size={32} />
              <h3 className="mb-2 text-xl font-bold">表结构分开展示</h3>
              <p className="text-zinc-600">每题单独展示表结构和样例，避免描述、DDL 和 SQL 混在一起难读。</p>
            </div>
          </div>
        </motion.div>
      );
    }

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
                <span>Java</span>
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
                夯实 <span className="text-amber-400">Java 基础</span>
                <br />
                打稳后端面试底盘
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-amber-100/80">
                把面向对象、集合、异常、反射、装箱拆箱、序列化、Java 8、设计模式和性能排查补到同一条主线上。
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
              <p className="text-zinc-600">覆盖面向对象、数据类型、String、集合、异常、反射、I/O 和关键字。</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <Info className="mb-4 text-amber-500" size={32} />
              <h3 className="mb-2 text-xl font-bold">答案更成体系</h3>
              <p className="text-zinc-600">把概念、实现机制、对比点和追问合并到一起，回答更有层次。</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <CheckCircle2 className="mb-4 text-amber-500" size={32} />
              <h3 className="mb-2 text-xl font-bold">可衔接进阶模块</h3>
              <p className="text-zinc-600">这些基础题会自然延伸到 JVM、JUC、Spring、MySQL 和系统设计追问。</p>
            </div>
          </div>
        </motion.div>
      );
    }

    const theme = introThemes[mainCategory as keyof typeof introThemes] 

 introThemes.algo;
    const content = introContent[mainCategory as keyof typeof introContent] 

 introContent.algo;
    const BadgeIcon = theme.badgeIcon;
    const HeroIcon = theme.heroIcon;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <section className={cn('relative overflow-hidden rounded-3xl p-8 text-white md:p-12', theme.section)}>
          <div className="relative z-10 max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
              <BadgeIcon size={14} />
              <span>{content.badge}</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              {content.titlePrefix} <span className={theme.highlight}>{content.titleHighlight}</span>
              <br />
              {content.titleSuffix}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-white/80">{content.description}</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  if (mainCategory === 'linux' || mainCategory === 'docker') setActiveTab('commands');
                  else if (mainCategory === 'algo') setActiveTab('algorithms');
                  else setActiveTab('interview');
                }}
                className={cn('flex items-center gap-2 rounded-full px-6 py-3 font-semibold shadow-lg transition-all', theme.button)}
              >
                {content.primaryLabel} <ChevronRight size={18} />
              </button>
              {(mainCategory === 'linux' || mainCategory === 'docker') && (
                <button
                  onClick={() => setActiveTab('commands')}
                  className="rounded-full border border-white/10 bg-white/10 px-6 py-3 font-semibold backdrop-blur-sm transition-colors hover:bg-white/20"
                >
                  进入实战终端
                </button>
              )}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-20">
            <div className={cn('absolute inset-0 bg-gradient-to-l to-transparent', theme.gradient)} />
            <div className="grid grid-cols-4 gap-4 p-8">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="flex aspect-square items-center justify-center rounded-lg border border-white/10">
                  <HeroIcon size={20} className={theme.gridIcon} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-3">
          {content.cards.map((card) => {
            const CardIcon = card.icon;
            return (
              <div key={card.title} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                <CardIcon className={cn('mb-4', theme.cardIcon)} size={32} />
                <h3 className="mb-2 text-xl font-bold">{card.title}</h3>
                <p className="text-zinc-600">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  };
  const renderCommands = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 lg:flex lg:h-full lg:min-h-0 lg:flex-col"
    >
      <div className="flex justify-end">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <input 
            type="text" 
            placeholder="搜索命令..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
        </div>
      </div>

      <div data-layout="focus-workspace" className="grid gap-8 items-start lg:h-full lg:min-h-0 lg:flex-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="lg:col-span-1 lg:h-full lg:min-h-0">
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:flex lg:h-full lg:min-h-0 lg:flex-col">
            <h3 className="mb-4 px-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">命令目录</h3>
            <div className="space-y-3 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain lg:pr-2 custom-scrollbar">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={() => {
                    setSelectedCommand(cmd);
                    scrollDetailIntoView(commandDetailRef);
                  }}
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
          </div>
        </div>

        <div ref={commandDetailRef} className="scroll-mt-4 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain lg:pr-2 custom-scrollbar">
          <AnimatePresence mode="wait">
            {selectedCommand ? (
              <motion.div
                key={selectedCommand.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full min-h-full rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn("p-3 rounded-xl", mainCategory === 'linux' ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600")}>
                    <Terminal size={24} />
                  </div>
                  <h3 className="break-all font-mono text-xl font-bold sm:text-2xl">{selectedCommand.command}</h3>
                </div>

                <div className="space-y-6">
                  <section>
                    <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">功能描述</h4>
                    <p className="text-lg text-zinc-700">{selectedCommand.description}</p>
                  </section>

                  <section>
                    <h4 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-2">使用示例</h4>
                    <div className="group flex items-center justify-between gap-3 overflow-x-auto rounded-xl bg-zinc-900 p-4 font-mono text-blue-400">
                      <code className="whitespace-nowrap">{selectedCommand.example}</code>
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
                    掌握这个命令是 Linux / Docker 学习中的基础一步。
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-zinc-50 rounded-2xl border border-dashed border-zinc-300 p-12 flex flex-col items-center justify-center text-center h-full min-h-full">
                <h3 className="text-xl font-semibold text-zinc-400">请先从左侧选择一个命令</h3>
                <p className="text-zinc-400 mt-2">点击命令查看其详细用法、示例和参数说明。</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );

  const renderInterview = () => {
    const accent = getAccentStyles(mainCategory);
    const hasInterviewFilters = mainCategory === 'ai' || mainCategory === 'sql';

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 lg:flex lg:h-full lg:min-h-0 lg:flex-col">
        <div
          className={cn(
            'flex flex-col gap-4',
            hasInterviewFilters ? 'md:flex-row md:items-center md:justify-between' : 'md:flex-row md:justify-end'
          )}
        >
          {hasInterviewFilters && (
            <div className="flex flex-wrap items-center gap-3">
              {mainCategory === 'ai' && (
                <>
                  <button
                    onClick={() => setAiView('basic')}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition-all',
                      aiView === 'basic' ? 'bg-violet-500 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    )}
                  >
                    基础概念
                  </button>
                  <button
                    onClick={() => setAiView('core')}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition-all',
                      aiView === 'core' ? 'bg-violet-500 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    )}
                  >
                    高频核心
                  </button>
                  <button
                    onClick={() => setAiView('engineering')}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition-all',
                      aiView === 'engineering' ? 'bg-violet-500 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    )}
                  >
                    工程化与场景
                  </button>
                </>
              )}
              {mainCategory === 'sql' && (
                <>
                  <button
                    onClick={() => setSqlView('leetcode50')}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition-all',
                      sqlView === 'leetcode50' ? 'bg-teal-500 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    )}
                  >
                    SQL50 题库
                  </button>
                  <button
                    onClick={() => setSqlView('operations')}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition-all',
                      sqlView === 'operations' ? 'bg-teal-500 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    )}
                  >
                    SQL 面试操作
                  </button>
                  <button
                    onClick={() => setSqlView('guide')}
                    className={cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition-all',
                      sqlView === 'guide' ? 'bg-teal-500 text-white shadow-sm' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                    )}
                  >
                    SQL 语句讲解
                  </button>
                </>
              )}
            </div>
          )}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="搜索题目..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-72"
            />
          </div>
        </div>

        <div data-layout="focus-workspace" className="grid gap-8 lg:h-full lg:min-h-0 lg:flex-1 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="lg:col-span-1 lg:h-full lg:min-h-0">
            <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:flex lg:h-full lg:min-h-0 lg:flex-col">
              <h3 className="px-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                {mainCategory === 'sql' ? '题目列表' : '问题列表'}
              </h3>
              <div className="max-h-[42vh] space-y-3 overflow-y-auto overscroll-contain pr-1 custom-scrollbar lg:max-h-none lg:min-h-0 lg:flex-1 lg:pr-2">
                {filteredInterview.map((point) => (
                  <button
                    key={point.id}
                    onClick={() => {
                      setSelectedInterview(point);
                      scrollDetailIntoView(interviewDetailRef);
                    }}
                    className={cn(
                      'w-full rounded-xl border p-4 text-left transition-all group',
                      selectedInterview?.id === point.id
                        ? cn('shadow-sm', accent.subtle)
                        : 'border-zinc-100 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                    )}
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {point.importance === 'high' && (
                        <span className="rounded uppercase bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                          重点
                        </span>
                      )}
                      <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold', accent.pill)}>
                        {getCategoryLabel(mainCategory)}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <div className={cn('text-sm font-semibold leading-6', selectedInterview?.id === point.id ? accent.text : 'text-zinc-700')}>
                        {point.question}
                      </div>
                      <ChevronRight
                        size={16}
                        className={cn(
                          'mt-1 shrink-0 transition-transform',
                          selectedInterview?.id === point.id ? `${accent.text} translate-x-1` : 'text-zinc-300 group-hover:text-zinc-400'
                        )}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:h-full lg:min-h-0">
            <AnimatePresence mode="wait">
              {selectedInterview ? (
                <motion.div
                  key={selectedInterview.id}
                  ref={interviewDetailRef}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="scroll-mt-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain"
                >
                  <div className="mb-6 flex items-start gap-3">
                    <div className={cn('rounded-xl p-3', accent.icon)}>
                      <BookOpen size={24} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        {selectedInterview.importance === 'high' && (
                          <span className="rounded uppercase bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-600">
                            重点
                          </span>
                        )}
                        <span className={cn('rounded-full border px-2 py-1 text-xs font-semibold', accent.pill)}>
                          {getCategoryLabel(mainCategory)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold leading-snug sm:text-2xl">{selectedInterview.question}</h3>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                        <CheckCircle2 size={14} className="text-green-500" /> 标准回答
                      </h4>
                      <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4 sm:p-6">
                        <div className="interview-answer prose prose-zinc max-w-none text-zinc-700">
                          <Markdown
                            components={{
                              h3: ({ children }) => (
                                <h3 className={cn('mt-6 mb-3 text-base font-bold text-zinc-900 first:mt-0', mainCategory === 'sql' && 'text-lg')}>
                                  {children}
                                </h3>
                              ),
                              p: ({ children }) => <p className="mb-3 leading-7 last:mb-0">{children}</p>,
                              ul: ({ children }) => (
                                <ul className={cn('mb-4', mainCategory === 'sql' ? 'grid gap-3 pl-0 sm:grid-cols-2' : 'list-disc space-y-2 pl-5')}>
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => <ol className="mb-4 list-decimal space-y-2 pl-5">{children}</ol>,
                              li: ({ children }) => (
                                <li className={cn('leading-7', mainCategory === 'sql' && 'list-none rounded-2xl border border-teal-100 bg-teal-50 px-4 py-3 text-teal-900 shadow-sm')}>
                                  {children}
                                </li>
                              ),
                              code: ({ className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || '');
                                if (match) {
                                  return (
                                    <div className="my-4 overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
                                      <SyntaxHighlighter
                                        language={match[1]}
                                        style={atomDark}
                                        customStyle={{ margin: 0, padding: '1.25rem', fontSize: '0.875rem', lineHeight: '1.6', borderRadius: '1rem' }}
                                      >
                                        {String(children).replace(/\n$/, '')}
                                      </SyntaxHighlighter>
                                    </div>
                                  );
                                }

                                return (
                                  <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 text-[0.95em] text-zinc-800" {...props}>
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {formatInterviewAnswer(selectedInterview.answer)}
                          </Markdown>
                        </div>
                      </div>
                    </section>

                    {selectedInterview.analogy && (
                      <section>
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                          <Info size={14} className="text-blue-500" /> 补充说明
                        </h4>
                        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 italic text-blue-900 sm:p-6">
                          {selectedInterview.analogy}
                        </div>
                      </section>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center lg:h-full">
                  <BookOpen size={48} className="mb-4 text-zinc-300" />
                  <h3 className="text-xl font-semibold text-zinc-400">请先从左侧选择一个题目</h3>
                  <p className="mt-2 text-zinc-400">点击问题查看标准回答和补充说明。</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderAlgorithms = () => {
    const algoAccent = getAccentStyles('algo');
    const codeModeTitle =
      algorithmCodeMode === 'core'
        ? 'Java 核心代码'
        : algorithmCodeMode === 'acm'
          ? 'Java ACM 模式'
          : 'Java ACM 简写模式';
    const codeModeHint =
      algorithmCodeMode === 'acm'
        ? '适合完整笔试输入输出，保留 main、读入和结果打印。'
        : algorithmCodeMode === 'acm-lite'
          ? '更贴近面试手撕，只保留最小必要的 main、输入输出和核心逻辑。'
          : '';

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 lg:flex lg:h-full lg:min-h-0 lg:flex-col">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <button
                onClick={() => setAlgorithmSection('problems')}
                className={cn('rounded-lg px-3 py-1 text-sm font-medium transition-all', algorithmSection === 'problems' ? 'bg-indigo-100 text-indigo-600' : 'text-zinc-400 hover:text-zinc-600')}
              >
                核心题目
              </button>
              <button
                onClick={() => setAlgorithmSection('templates')}
                className={cn('rounded-lg px-3 py-1 text-sm font-medium transition-all', algorithmSection === 'templates' ? 'bg-indigo-100 text-indigo-600' : 'text-zinc-400 hover:text-zinc-600')}
              >
                常用模板
              </button>
            </div>
            {algorithmSection === 'problems' && (
              <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setAlgoType('codetop')}
                  className={cn('rounded-lg px-3 py-1 text-sm font-medium transition-all', algoType === 'codetop' ? 'bg-indigo-100 text-indigo-600' : 'text-zinc-400 hover:text-zinc-600')}
                >
                  CodeTop 50
                </button>
                <button
                  onClick={() => setAlgoType('hot100')}
                  className={cn('rounded-lg px-3 py-1 text-sm font-medium transition-all', algoType === 'hot100' ? 'bg-indigo-100 text-indigo-600' : 'text-zinc-400 hover:text-zinc-600')}
                >
                  Hot 100 官方顺序
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              placeholder="搜索题目..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 md:w-72"
            />
          </div>
        </div>

        <div data-layout="focus-workspace" className="grid gap-8 lg:h-full lg:min-h-0 lg:flex-1 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div className="lg:col-span-1 lg:h-full lg:min-h-0">
            <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:flex lg:h-full lg:min-h-0 lg:flex-col">
              <h3 className="px-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                {algorithmSection === 'templates' ? '模板目录' : '题目目录'}
              </h3>
              <div className="max-h-[46vh] space-y-3 overflow-y-auto overscroll-contain pr-1 custom-scrollbar lg:max-h-none lg:min-h-0 lg:flex-1 lg:pr-2">
                {algorithmSection === 'templates' ? (
                  filteredAlgorithmTemplates.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedAlgorithmTemplate(item);
                        scrollDetailIntoView(algorithmDetailRef);
                      }}
                      className={cn(
                        'w-full rounded-xl border p-4 text-left transition-all group',
                        selectedAlgorithmTemplate?.id === item.id
                          ? 'border-indigo-200 bg-indigo-50 shadow-sm'
                          : 'border-zinc-100 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                      )}
                    >
                      <div className="mb-2">
                        <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold', algoAccent.pill)}>
                          模板
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <div className={cn('text-sm font-semibold leading-6', selectedAlgorithmTemplate?.id === item.id ? 'text-indigo-600' : 'text-zinc-700')}>
                          {item.title}
                        </div>
                        <ChevronRight
                          size={16}
                          className={cn(
                            'mt-1 shrink-0 transition-transform',
                            selectedAlgorithmTemplate?.id === item.id ? 'translate-x-1 text-indigo-500' : 'text-zinc-300 group-hover:text-zinc-400'
                          )}
                        />
                      </div>
                    </button>
                  ))
                ) : algoType === 'hot100' ? (
                  groupedAlgorithms.map((group) => (
                    <div key={group.name} className="space-y-2">
                      <div className="px-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                        {group.name} · {group.items.length} 题
                      </div>
                      {group.items.map((algo) => (
                        <button
                          key={algo.id}
                          onClick={() => {
                            setSelectedAlgorithm(algo);
                            scrollDetailIntoView(algorithmDetailRef);
                          }}
                          className={cn(
                            'w-full rounded-xl border p-4 text-left transition-all group',
                            selectedAlgorithm?.id === algo.id
                              ? 'border-indigo-200 bg-indigo-50 shadow-sm'
                              : 'border-zinc-100 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                          )}
                        >
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                              {group.name}
                            </span>
                            <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold', algo.difficulty === 'Easy' ? 'border-green-200 bg-green-50 text-green-600' : algo.difficulty === 'Medium' ? 'border-orange-200 bg-orange-50 text-orange-600' : 'border-red-200 bg-red-50 text-red-600')}>
                              {algo.difficulty}
                            </span>
                          </div>
                          <div className="flex items-start justify-between gap-3">
                            <div className={cn('text-sm font-semibold leading-6', selectedAlgorithm?.id === algo.id ? 'text-indigo-600' : 'text-zinc-700')}>
                              {algo.title}
                            </div>
                            <ChevronRight
                              size={16}
                              className={cn(
                                'mt-1 shrink-0 transition-transform',
                                selectedAlgorithm?.id === algo.id ? 'translate-x-1 text-indigo-500' : 'text-zinc-300 group-hover:text-zinc-400'
                              )}
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  ))
                ) : (
                  filteredAlgorithms.map((algo) => (
                    <button
                      key={algo.id}
                      onClick={() => {
                        setSelectedAlgorithm(algo);
                        scrollDetailIntoView(algorithmDetailRef);
                      }}
                      className={cn(
                        'w-full rounded-xl border p-4 text-left transition-all group',
                        selectedAlgorithm?.id === algo.id
                          ? 'border-indigo-200 bg-indigo-50 shadow-sm'
                          : 'border-zinc-100 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                      )}
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className={cn('rounded-full border px-2 py-0.5 text-[10px] font-semibold', algo.difficulty === 'Easy' ? 'border-green-200 bg-green-50 text-green-600' : algo.difficulty === 'Medium' ? 'border-orange-200 bg-orange-50 text-orange-600' : 'border-red-200 bg-red-50 text-red-600')}>
                          {algo.difficulty}
                        </span>
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <div className={cn('text-sm font-semibold leading-6', selectedAlgorithm?.id === algo.id ? 'text-indigo-600' : 'text-zinc-700')}>
                          {algo.title}
                        </div>
                        <ChevronRight
                          size={16}
                          className={cn(
                            'mt-1 shrink-0 transition-transform',
                            selectedAlgorithm?.id === algo.id ? 'translate-x-1 text-indigo-500' : 'text-zinc-300 group-hover:text-zinc-400'
                          )}
                        />
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="lg:h-full lg:min-h-0">
            <AnimatePresence mode="wait">
              {algorithmSection === 'templates' ? (
                selectedAlgorithmTemplate ? (
                  <motion.div
                    key={selectedAlgorithmTemplate.id}
                    ref={algorithmDetailRef}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="scroll-mt-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain"
                  >
                    <div className="mb-6 flex flex-wrap items-center gap-3">
                      <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                        <Code2 size={24} />
                      </div>
                      <div className="min-w-0">
                        <div className="mb-2">
                          <span className={cn('rounded-full border px-2 py-1 text-xs font-semibold', algoAccent.pill)}>
                            模板
                          </span>
                        </div>
                        <h3 className="text-xl font-bold sm:text-2xl">{selectedAlgorithmTemplate.title}</h3>
                        <p className="mt-2 text-sm text-zinc-500">{selectedAlgorithmTemplate.summary}</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <section>
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                          <Info size={14} className="text-indigo-500" /> 适用场景
                        </h4>
                        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-4 leading-relaxed text-zinc-700 sm:p-6">
                          {selectedAlgorithmTemplate.usage}
                        </div>
                      </section>

                      <section>
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                          <Terminal size={14} className="text-indigo-500" /> Java 模板
                        </h4>
                        <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm">
                          <SyntaxHighlighter
                            language="java"
                            style={atomDark}
                            customStyle={{ margin: 0, minWidth: 'max-content', padding: '1rem', fontSize: '0.8rem', lineHeight: '1.5', borderRadius: '1rem' }}
                          >
                            {selectedAlgorithmTemplate.code}
                          </SyntaxHighlighter>
                        </div>
                      </section>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center lg:h-full">
                    <Code2 size={48} className="mb-4 text-zinc-300" />
                    <h3 className="text-xl font-semibold text-zinc-400">请先从左侧选择一个模板</h3>
                    <p className="mt-2 text-zinc-400">点击模板查看适用场景和 Java 模板代码。</p>
                  </div>
                )
              ) : selectedAlgorithm ? (
                <motion.div
                  key={selectedAlgorithm.id}
                  ref={algorithmDetailRef}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="scroll-mt-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain"
                >
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                      <Code2 size={24} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        {algoType === 'hot100' && selectedAlgorithm.group && (
                          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
                            {selectedAlgorithm.group}
                          </span>
                        )}
                        <span className={cn('rounded-full border px-2 py-1 text-xs font-semibold', selectedAlgorithm.difficulty === 'Easy' ? 'border-green-200 bg-green-50 text-green-600' : selectedAlgorithm.difficulty === 'Medium' ? 'border-orange-200 bg-orange-50 text-orange-600' : 'border-red-200 bg-red-50 text-red-600')}>
                          {selectedAlgorithm.difficulty}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold sm:text-2xl">{selectedAlgorithm.title}</h3>
                    </div>
                    {selectedAlgorithm.url && (
                      <a
                        href={selectedAlgorithm.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-100 sm:ml-auto"
                      >
                        <ExternalLink size={14} />
                        力扣原题
                      </a>
                    )}
                  </div>

                  <div className="space-y-8">
                    <section>
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                        <BookOpen size={14} className="text-indigo-500" /> 题目描述
                      </h4>
                      <div className="whitespace-pre-wrap rounded-2xl border border-zinc-100 bg-zinc-50 p-4 leading-relaxed text-zinc-700 sm:p-6">
                        {selectedAlgorithm.description}
                      </div>
                    </section>

                    <section>
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                        <Info size={14} className="text-indigo-500" /> 解题思路
                      </h4>
                      <div className="rounded-2xl border border-indigo-100 bg-indigo-50/30 p-4 leading-relaxed text-zinc-700 sm:p-6 sm:text-lg">
                        {selectedAlgorithm.approach}
                      </div>
                    </section>

                    <section>
                      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                          <Terminal size={14} className="text-indigo-500" /> {codeModeTitle}
                        </h4>
                        <div className="grid grid-cols-3 rounded-xl border border-zinc-200 bg-zinc-50 p-1 sm:inline-flex">
                          <button
                            onClick={() => setAlgorithmCodeMode('core')}
                            className={cn('rounded-lg px-2 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm', algorithmCodeMode === 'core' ? 'bg-white text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700')}
                          >
                            核心代码
                          </button>
                          <button
                            onClick={() => setAlgorithmCodeMode('acm')}
                            className={cn('rounded-lg px-2 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm', algorithmCodeMode === 'acm' ? 'bg-white text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700')}
                          >
                            ACM模式
                          </button>
                          <button
                            onClick={() => setAlgorithmCodeMode('acm-lite')}
                            className={cn('rounded-lg px-2 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm', algorithmCodeMode === 'acm-lite' ? 'bg-white text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700')}
                          >
                            ACM简写
                          </button>
                        </div>
                      </div>
                      {codeModeHint && <p className="mb-4 text-sm text-zinc-500">{codeModeHint}</p>}
                      <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm">
                        <SyntaxHighlighter
                          language="java"
                          style={atomDark}
                          customStyle={{ margin: 0, minWidth: 'max-content', padding: '1rem', fontSize: '0.8rem', lineHeight: '1.5', borderRadius: '1rem' }}
                        >
                          {algorithmCodeMode === 'core'
                            ? selectedAlgorithm.code
                            : algorithmCodeMode === 'acm'
                              ? getAlgorithmAcmCode(selectedAlgorithm)
                              : getAlgorithmAcmLiteCode(selectedAlgorithm)}
                        </SyntaxHighlighter>
                      </div>
                    </section>
                  </div>
                </motion.div>
              ) : (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center lg:h-full">
                  <Code2 size={48} className="mb-4 text-zinc-300" />
                  <h3 className="text-xl font-semibold text-zinc-400">请先从左侧选择一个题目</h3>
                  <p className="mt-2 text-zinc-400">点击题目查看题目描述、解题思路和不同代码模式。</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderDocs = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="lg:flex lg:h-full lg:min-h-0 lg:flex-col">
      <div data-layout="focus-workspace" className="grid gap-8 lg:h-full lg:min-h-0 lg:flex-1 lg:grid-cols-[320px_minmax(0,1fr)]">
        <div className="lg:h-full lg:min-h-0">
          <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm lg:flex lg:h-full lg:min-h-0 lg:flex-col">
            <h3 className="px-2 text-sm font-semibold uppercase tracking-wider text-zinc-400">文档目录</h3>
            <div className="max-h-[42vh] space-y-3 overflow-y-auto overscroll-contain pr-1 custom-scrollbar lg:max-h-none lg:min-h-0 lg:flex-1 lg:pr-2">
              {currentDocs.map((doc, index) => (
                <button
                  key={doc.title}
                  onClick={() => {
                    setSelectedDocIndex(index);
                    scrollDetailIntoView(docDetailRef);
                  }}
                  className={cn(
                    'w-full rounded-xl border p-4 text-left transition-all group',
                    selectedDocIndex === index
                      ? mainCategory === 'linux'
                        ? 'border-emerald-200 bg-emerald-50 shadow-sm'
                        : 'border-blue-200 bg-blue-50 shadow-sm'
                      : 'border-zinc-100 bg-white hover:border-zinc-300 hover:bg-zinc-50'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={cn(
                        'text-sm font-semibold leading-6',
                        selectedDocIndex === index
                          ? mainCategory === 'linux'
                            ? 'text-emerald-600'
                            : 'text-blue-600'
                          : 'text-zinc-700'
                      )}
                    >
                      {doc.title}
                    </div>
                    <ChevronRight
                      size={16}
                      className={cn(
                        'mt-1 shrink-0 transition-transform',
                        selectedDocIndex === index
                          ? mainCategory === 'linux'
                            ? 'translate-x-1 text-emerald-500'
                            : 'translate-x-1 text-blue-500'
                          : 'text-zinc-300 group-hover:text-zinc-400'
                      )}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:h-full lg:min-h-0">
          <AnimatePresence mode="wait">
            {selectedDoc ? (
              <motion.div
                key={selectedDoc.title}
                ref={docDetailRef}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="scroll-mt-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8 lg:h-full lg:min-h-0 lg:overflow-y-auto lg:overscroll-contain"
              >
                <div className="mb-6 flex items-start gap-3">
                  <div
                    className={cn(
                      'rounded-xl p-3',
                      mainCategory === 'linux' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                    )}
                  >
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-xl font-bold leading-snug sm:text-2xl">{selectedDoc.title}</h3>
                </div>

                <div className="markdown-body prose prose-zinc max-w-none">
                  <Markdown
                    components={{
                      code: ({ className, children, ...props }: any) => {
                        const match = /language-(\w+)/.exec(className || '');
                        if (match) {
                          return (
                            <div className="my-4 overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm">
                              <SyntaxHighlighter
                                language={match[1]}
                                style={atomDark}
                                customStyle={{ margin: 0, padding: '1.25rem', fontSize: '0.875rem', lineHeight: '1.6', borderRadius: '1rem' }}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            </div>
                          );
                        }

                        return (
                          <code className="rounded bg-zinc-200/70 px-1.5 py-0.5 text-[0.95em] text-zinc-800" {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {selectedDoc.content}
                  </Markdown>
                </div>
              </motion.div>
            ) : (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-12 text-center lg:h-full">
                <BookOpen size={48} className="mb-4 text-zinc-300" />
                <h3 className="text-xl font-semibold text-zinc-400">请先从左侧选择一个文档</h3>
                <p className="mt-2 text-zinc-400">点击文档查看对应的完整内容。</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
  const renderPractice = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-bold">交互式实战终端</h2>
        <p className="text-zinc-500">
          在这里直接练习命令。页面模拟了一个基础 Linux / Docker 环境，方便你对照左侧知识点做即时练习。
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <TerminalSimulator />
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2 font-bold">
            <Code2 size={18} className="text-emerald-500" /> Linux 练习建议
          </h3>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li>输入 `ls` 查看当前目录下的文件。</li>
            <li>输入 `mkdir my_folder` 创建一个新目录。</li>
            <li>输入 `pwd` 查看当前路径。</li>
            <li>输入 `whoami` 查看当前用户。</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <h3 className="mb-4 flex items-center gap-2 font-bold">
            <Box size={18} className="text-blue-500" /> Docker 练习建议
          </h3>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li>输入 `docker ps` 查看运行中的容器。</li>
            <li>输入 `docker images` 查看本地镜像列表。</li>
            <li>输入 `docker exec -it container_name sh` 进入容器内部。</li>
            <li>故意输入一个不存在的命令，观察报错信息。</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
  const mainCategories = [
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
    { id: 'ai', label: 'AI', icon: Cpu, color: 'violet' },
    { id: 'sql', label: 'SQL', icon: Database, color: 'teal' },
  ] as const;
  return (
    <div className={cn("min-h-screen bg-zinc-50 font-sans text-zinc-900 flex flex-col lg:flex-row", isFocusWorkspaceTab && "lg:h-screen lg:overflow-hidden")}>
      <aside data-layout="category-sidebar" className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:border-r lg:border-zinc-200 lg:bg-zinc-950 lg:text-white">
        <div className="border-b border-white/10 px-6 py-6">
          <button className="flex items-center gap-3 text-left" onClick={() => setActiveTab(getDefaultTab(mainCategory))}>
            <div className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl text-white",
              mainCategory === 'linux' ? "bg-emerald-500" :
              mainCategory === 'docker' ? "bg-blue-500" :
              mainCategory === 'java' ? "bg-amber-500" :
              mainCategory === 'jvm' ? "bg-orange-500" :
              mainCategory === 'juc' ? "bg-purple-500" :
              mainCategory === 'ai' ? "bg-violet-500" :
              mainCategory === 'mysql' ? "bg-emerald-500" :
              mainCategory === 'redis' ? "bg-red-500" :
              mainCategory === 'spring' ? "bg-green-500" :
              mainCategory === 'network' ? "bg-sky-500" :
              mainCategory === 'os' ? "bg-slate-500" :
              mainCategory === 'mq' ? "bg-orange-500" :
              mainCategory === 'distributed' ? "bg-cyan-500" :
              mainCategory === 'design' ? "bg-rose-500" :
              mainCategory === 'sql' ? "bg-teal-500" : "bg-indigo-500"
            )}>
              {mainCategory === 'linux' ? <Cpu size={22} /> :
               mainCategory === 'docker' ? <Box size={22} /> :
               mainCategory === 'java' ? <Code2 size={22} /> :
               mainCategory === 'jvm' ? <Cpu size={22} /> :
               mainCategory === 'juc' ? <Layers size={22} /> :
               mainCategory === 'ai' ? <Cpu size={22} /> :
               mainCategory === 'mysql' ? <HardDrive size={22} /> :
               mainCategory === 'redis' ? <Cpu size={22} /> :
               mainCategory === 'spring' ? <Layers size={22} /> :
               mainCategory === 'network' ? <ExternalLink size={22} /> :
               mainCategory === 'os' ? <Cpu size={22} /> :
               mainCategory === 'mq' ? <Terminal size={22} /> :
               mainCategory === 'distributed' ? <Layers size={22} /> :
               mainCategory === 'design' ? <Layout size={22} /> :
               mainCategory === 'sql' ? <Database size={22} /> : <Code2 size={22} />}
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-zinc-500">Interview Hub</div>
              <div className="text-xl font-bold">添砖Java</div>
            </div>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 custom-scrollbar">
          <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">学习模块</div>
          <div className="space-y-2">
            {mainCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setMainCategory(cat.id as MainCategory); setActiveTab(getDefaultTab(cat.id as MainCategory)); }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all",
                  mainCategory === cat.id
                    ? (cat.color === 'emerald' ? "bg-emerald-500 text-white shadow-md" :
                       cat.color === 'blue' ? "bg-blue-500 text-white shadow-md" :
                       cat.color === 'amber' ? "bg-amber-500 text-white shadow-md" :
                       cat.color === 'orange' ? "bg-orange-500 text-white shadow-md" :
                       cat.color === 'purple' ? "bg-purple-500 text-white shadow-md" :
                       cat.color === 'violet' ? "bg-violet-500 text-white shadow-md" :
                       cat.color === 'red' ? "bg-red-500 text-white shadow-md" :
                       cat.color === 'green' ? "bg-green-500 text-white shadow-md" :
                       cat.color === 'sky' ? "bg-sky-500 text-white shadow-md" :
                       cat.color === 'slate' ? "bg-slate-500 text-white shadow-md" :
                       cat.color === 'cyan' ? "bg-cyan-500 text-white shadow-md" :
                       cat.color === 'rose' ? "bg-rose-500 text-white shadow-md" : "bg-indigo-500 text-white shadow-md")
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  mainCategory === cat.id ? "bg-white/15" : "bg-white/5"
                )}>
                  <cat.icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold">{cat.label}</div>
                  <div className={cn("truncate text-xs", mainCategory === cat.id ? "text-white/80" : "text-zinc-500")}>
                    {cat.label} 学习
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="shrink-0 bg-zinc-900 py-3 text-white lg:hidden">
          <div data-layout="mobile-category-nav" className="no-scrollbar flex items-center gap-2 overflow-x-auto px-4">
            {mainCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setMainCategory(cat.id as MainCategory); setActiveTab(getDefaultTab(cat.id as MainCategory)); }}
                className={cn(
                  "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                  mainCategory === cat.id
                    ? (cat.color === 'emerald' ? "bg-emerald-500 text-white" :
                       cat.color === 'blue' ? "bg-blue-500 text-white" :
                       cat.color === 'amber' ? "bg-amber-500 text-white" :
                       cat.color === 'orange' ? "bg-orange-500 text-white" :
                       cat.color === 'purple' ? "bg-purple-500 text-white" :
                       cat.color === 'violet' ? "bg-violet-500 text-white" :
                       cat.color === 'red' ? "bg-red-500 text-white" :
                       cat.color === 'green' ? "bg-green-500 text-white" :
                       cat.color === 'sky' ? "bg-sky-500 text-white" :
                       cat.color === 'slate' ? "bg-slate-500 text-white" :
                       cat.color === 'cyan' ? "bg-cyan-500 text-white" :
                       cat.color === 'rose' ? "bg-rose-500 text-white" : "bg-indigo-500 text-white")
                    : "text-zinc-400 hover:text-white"
                )}
              >
                <cat.icon size={14} /> {cat.label}
              </button>
            ))}
          </div>
        </div>

        {shouldShowTopNav && (
          <nav className="sticky top-0 z-50 shrink-0 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
            <div data-layout="content-shell" className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 md:px-6 lg:mx-0 lg:ml-6 lg:mr-auto xl:ml-8">
              <div className="flex cursor-pointer items-center gap-2 text-xl font-bold" onClick={() => setActiveTab(getDefaultTab(mainCategory))}>
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg text-white transition-colors",
                  mainCategory === 'linux' ? "bg-emerald-500" : "bg-blue-500"
                )}>
                  {mainCategory === 'linux' ? <Cpu size={20} /> : <Box size={20} />}
                </div>
                <span>添砖<span className={cn(mainCategory === 'linux' ? "text-emerald-500" : "text-blue-500")}>Java</span></span>
              </div>

              {shouldShowTabSwitcher && (
                <div className="hidden md:flex items-center gap-1">
                  {visibleTabs.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as TabType)}
                      className={cn(
                        "flex items-center gap-2 rounded-full px-4 py-2 transition-all",
                        activeTab === item.id
                          ? (mainCategory === 'linux' ? "bg-emerald-500 text-white shadow-md" : "bg-blue-500 text-white shadow-md")
                          : "text-zinc-600 hover:bg-zinc-100"
                      )}
                    >
                      <item.icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {shouldShowTabSwitcher && (
                <button
                  className="p-2 text-zinc-600 md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
              )}
            </div>

            <AnimatePresence>
              {shouldShowTabSwitcher && isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden border-t border-zinc-100 bg-white md:hidden"
                >
                  <div className="space-y-2 p-4">
                    {visibleTabs.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id as TabType);
                          setIsMobileMenuOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-4 py-3 transition-all",
                          activeTab === item.id
                            ? (mainCategory === 'linux' ? "bg-emerald-50 text-emerald-600 font-bold" : "bg-blue-50 text-blue-600 font-bold")
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
        )}

            <main className={cn("w-full flex-1 px-4 py-6 md:px-6 md:py-8", isFocusWorkspaceTab && "lg:min-h-0 lg:overflow-hidden")}>
              <div data-layout="content-shell" className={cn("mx-auto w-full max-w-[1400px] lg:mx-0 lg:ml-6 lg:mr-auto xl:ml-8", isFocusWorkspaceTab && "lg:flex lg:h-full lg:min-h-0 lg:flex-col")}>
                <AnimatePresence mode="wait">
                  {activeTab === 'commands' && renderCommands()}
                  {activeTab === 'interview' && renderInterview()}
                  {activeTab === 'algorithms' && renderAlgorithms()}
                  {activeTab === 'docs' && renderDocs()}
                </AnimatePresence>
              </div>
            </main>
      </div>

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

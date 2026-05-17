// 类型定义
export interface Command {
  id: string;
  command: string;
  description: string;
  category: string;
  example: string;
  explanation: string;
  isCommon?: boolean;
}

export interface InterviewPoint {
  id: string;
  question: string;
  answer: string;
  analogy?: string;
  importance: 'high' | 'medium' | 'low';
}

export interface AlgorithmPoint {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  approach: string;
  code: string;
  url?: string;
  group?: string;
  slug?: string;
}

export interface AlgorithmTemplate {
  id: string;
  title: string;
  summary: string;
  usage: string;
  code: string;
}

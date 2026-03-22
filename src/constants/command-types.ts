// 类型定义
export interface Command {
  id: string;
  command: string;
  description: string;
  category: string;
  example: string;
  explanation: string;
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
}

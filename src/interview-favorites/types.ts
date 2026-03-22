/**
 * 面试题收藏夹 - 类型定义
 */

export interface InterviewQuestion {
  id: string;
  title: string;
  content: string;
  answer?: string;
  category: string;
  tags: string[];
  difficulty: '简单' | '中等' | '困难';
  source?: string;
  createTime: string;
  updateTime: string;
}

export interface QuestionFilter {
  category?: string;
  difficulty?: string;
  tags?: string[];
  keyword?: string;
}

export interface QuestionStatistics {
  total: number;
  byCategory: Array<{ category: string; count: number }>;
  byDifficulty: Array<{ difficulty: string; count: number }>;
  byTag: Array<{ tag: string; count: number }>;
}
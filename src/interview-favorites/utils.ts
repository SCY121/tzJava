/**
 * 面试题收藏夹 - 工具函数
 */

import { InterviewQuestion, QuestionFilter } from './types';
import { favoriteQuestions } from './index';

// 生成唯一ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// 格式化日期
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN');
};

// 过滤面试题
export const filterQuestions = (questions: InterviewQuestion[], filter: QuestionFilter): InterviewQuestion[] => {
  return questions.filter(question => {
    // 分类过滤
    if (filter.category && question.category !== filter.category) {
      return false;
    }

    // 难度过滤
    if (filter.difficulty && question.difficulty !== filter.difficulty) {
      return false;
    }

    // 标签过滤
    if (filter.tags && filter.tags.length > 0) {
      const hasTag = filter.tags.some(tag => question.tags.includes(tag));
      if (!hasTag) return false;
    }

    // 关键词搜索
    if (filter.keyword) {
      const keyword = filter.keyword.toLowerCase();
      const match =
        question.title.toLowerCase().includes(keyword) ||
        question.content.toLowerCase().includes(keyword) ||
        question.tags.some(tag => tag.toLowerCase().includes(keyword));
      if (!match) return false;
    }

    return true;
  });
};

// 按创建时间排序
export const sortByCreateTime = (questions: InterviewQuestion[], ascending = false): InterviewQuestion[] => {
  return [...questions].sort((a, b) => {
    const timeA = new Date(a.createTime).getTime();
    const timeB = new Date(b.createTime).getTime();
    return ascending ? timeA - timeB : timeB - timeA;
  });
};

// 按更新时间排序
export const sortByUpdateTime = (questions: InterviewQuestion[], ascending = false): InterviewQuestion[] => {
  return [...questions].sort((a, b) => {
    const timeA = new Date(a.updateTime).getTime();
    const timeB = new Date(b.updateTime).getTime();
    return ascending ? timeA - timeB : timeB - timeA;
  });
};

// 按标题排序
export const sortByTitle = (questions: InterviewQuestion[], ascending = true): InterviewQuestion[] => {
  return [...questions].sort((a, b) => {
    return ascending
      ? a.title.localeCompare(b.title, 'zh-CN')
      : b.title.localeCompare(a.title, 'zh-CN');
  });
};

// 导出为JSON
export const exportToJSON = (questions: InterviewQuestion[]): string => {
  return JSON.stringify(questions, null, 2);
};

// 从JSON导入
export const importFromJSON = (jsonString: string): InterviewQuestion[] => {
  try {
    const questions = JSON.parse(jsonString) as InterviewQuestion[];
    // 验证数据结构
    if (!Array.isArray(questions)) {
      throw new Error('导入的数据必须是数组格式');
    }
    return questions;
  } catch (error) {
    throw new Error(`导入失败: ${error instanceof Error ? error.message : '未知错误'}`);
  }
};

// 验证面试题数据
export const validateQuestion = (question: Partial<InterviewQuestion>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!question.title || question.title.trim().length === 0) {
    errors.push('标题不能为空');
  }

  if (!question.content || question.content.trim().length === 0) {
    errors.push('题目内容不能为空');
  }

  if (!question.category || question.category.trim().length === 0) {
    errors.push('分类不能为空');
  }

  if (!question.tags || !Array.isArray(question.tags) || question.tags.length === 0) {
    errors.push('至少需要一个标签');
  }

  if (!['简单', '中等', '困难'].includes(question.difficulty || '')) {
    errors.push('难度必须是：简单、中等、困难');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
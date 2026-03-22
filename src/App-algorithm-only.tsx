import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, Code2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ALGORITHM_POINTS, HOT_100_POINTS, AlgorithmPoint } from './constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AlgoType = 'codetop' | 'hot100';

export default function App() {
  const [algoType, setAlgoType] = useState<AlgoType>('codetop');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmPoint | null>(null);

  const currentAlgorithms = algoType === 'codetop' ? ALGORITHM_POINTS : HOT_100_POINTS;

  const filteredAlgorithms = useMemo(() => {
    return currentAlgorithms.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.approach.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentAlgorithms]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <Code2 size={24} className="text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">算法题库</h1>
                <p className="text-sm text-slate-600">精选算法题目与解题思路</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="搜索题目..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Algorithm Type Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => { setAlgoType('codetop'); setSelectedAlgorithm(null); }}
              className={cn(
                "px-6 py-3 rounded-t-xl font-medium transition-all",
                algoType === 'codetop'
                  ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              CodeTop 高频算法
            </button>
            <button
              onClick={() => { setAlgoType('hot100'); setSelectedAlgorithm(null); }}
              className={cn(
                "px-6 py-3 rounded-t-xl font-medium transition-all",
                algoType === 'hot100'
                  ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              LeetCode Hot 100
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Algorithm List */}
          <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {filteredAlgorithms.map((algorithm) => (
              <button
                key={algorithm.id}
                onClick={() => setSelectedAlgorithm(algorithm)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group hover:shadow-sm",
                  selectedAlgorithm?.id === algorithm.id
                    ? "bg-indigo-50 border-indigo-200 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                )}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {algorithm.title}
                    </h3>
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full font-medium",
                      algorithm.difficulty === 'Easy' ? "bg-green-100 text-green-700" :
                      algorithm.difficulty === 'Medium' ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {algorithm.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {algorithm.description.slice(0, 100)}...
                  </p>
                </div>
                <ChevronRight size={16} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </button>
            ))}
          </div>

          {/* Algorithm Detail */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedAlgorithm ? (
                <motion.div
                  key={selectedAlgorithm.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                >
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-slate-900">
                          {selectedAlgorithm.title}
                        </h2>
                        <span className={cn(
                          "px-3 py-1 text-sm rounded-full font-medium",
                          selectedAlgorithm.difficulty === 'Easy' ? "bg-green-100 text-green-700" :
                          selectedAlgorithm.difficulty === 'Medium' ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        )}>
                          {selectedAlgorithm.difficulty}
                        </span>
                      </div>
                      {selectedAlgorithm.url && (
                        <a
                          href={selectedAlgorithm.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors"
                        >
                          <ExternalLink size={16} />
                          查看原题
                        </a>
                      )}
                    </div>
                    <div className="prose prose-slate max-w-none">
                      <Markdown>{selectedAlgorithm.description}</Markdown>
                    </div>
                  </div>

                  <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">解题思路</h3>
                    <p className="text-slate-700 leading-relaxed">{selectedAlgorithm.approach}</p>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">参考代码</h3>
                    <div className="rounded-xl overflow-hidden">
                      <SyntaxHighlighter
                        language="java"
                        style={atomDark}
                        showLineNumbers
                        customStyle={{
                          margin: 0,
                          borderRadius: '12px',
                          fontSize: '14px'
                        }}
                      >
                        {selectedAlgorithm.code}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center"
                >
                  <div className="p-4 bg-indigo-100 rounded-2xl w-fit mx-auto mb-6">
                    <Code2 size={48} className="text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-700 mb-2">选择一个算法题目</h3>
                  <p className="text-slate-500">从左侧列表中选择题目查看详细解题思路和代码实现</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
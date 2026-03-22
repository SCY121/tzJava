import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RefreshCw, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export const TerminalSimulator: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', content: '欢迎来到 Linux 交互式终端模拟器！' },
    { type: 'output', content: '输入 "help" 查看可用命令。' },
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~');
  const [files, setFiles] = useState<string[]>(['hello.txt', 'projects', 'docker-compose.yml']);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    setHistory(prev => [...prev, { type: 'input', content: trimmedCmd }]);

    const args = trimmedCmd.split(' ');
    const baseCmd = args[0].toLowerCase();

    let response: string | null = null;
    let isError = false;

    switch (baseCmd) {
      case 'help':
        response = '可用命令: ls, cd, pwd, mkdir, touch, clear, echo, whoami, date, docker ps, docker images';
        break;
      case 'ls':
        response = files.join('  ');
        break;
      case 'pwd':
        response = cwd === '~' ? '/home/user' : `/home/user/${cwd}`;
        break;
      case 'whoami':
        response = 'user';
        break;
      case 'date':
        response = new Date().toString();
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'mkdir':
        if (args[1]) {
          setFiles(prev => [...prev, args[1]]);
          response = `目录 ${args[1]} 已创建`;
        } else {
          response = 'mkdir: 缺少操作数';
          isError = true;
        }
        break;
      case 'touch':
        if (args[1]) {
          setFiles(prev => [...prev, args[1]]);
          response = `文件 ${args[1]} 已创建`;
        } else {
          response = 'touch: 缺少文件操作数';
          isError = true;
        }
        break;
      case 'cd':
        if (!args[1] || args[1] === '~') {
          setCwd('~');
        } else if (args[1] === '..') {
          setCwd('~');
        } else {
          response = `cd: 没有那个目录: ${args[1]}`;
          isError = true;
        }
        break;
      case 'echo':
        response = args.slice(1).join(' ');
        break;
      case 'docker':
        if (args[1] === 'ps') {
          response = 'CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES\n7f8e9d0c1b2a   nginx     "nginx"   2m ago    Up 2m     80/tcp    web-server';
        } else if (args[1] === 'images') {
          response = 'REPOSITORY   TAG       IMAGE ID       CREATED       SIZE\nnginx        latest    605c77e624dd   2 weeks ago   141MB\nubuntu       20.04     ba6acccedd29   4 weeks ago   72.8MB';
        } else {
          response = `docker: 未知的子命令 "${args[1]}"`;
          isError = true;
        }
        break;
      default:
        response = `bash: ${baseCmd}: 未找到命令`;
        isError = true;
    }

    if (response) {
      setHistory(prev => [...prev, { type: isError ? 'error' : 'output', content: response! }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <div className="bg-zinc-950 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col h-[500px]">
      <div className="bg-zinc-900 px-4 py-2 flex items-center justify-between border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-zinc-500 text-xs font-mono ml-2">user@linux-simulator: {cwd}</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setHistory([])} className="text-zinc-500 hover:text-white transition-colors" title="清空终端">
            <Trash2 size={14} />
          </button>
          <button onClick={() => window.location.reload()} className="text-zinc-500 hover:text-white transition-colors" title="重启终端">
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto custom-scrollbar space-y-1"
      >
        {history.map((line, i) => (
          <div key={i} className={line.type === 'error' ? 'text-red-400' : line.type === 'input' ? 'text-white' : 'text-zinc-400'}>
            {line.type === 'input' && <span className="text-green-500 mr-2">user@linux:~$</span>}
            <span className="whitespace-pre-wrap">{line.content}</span>
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-500 mr-2">user@linux:~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0"
          />
        </form>
      </div>
      
      <div className="bg-zinc-900/50 px-4 py-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-500 uppercase tracking-widest">
        <span>Interactive Shell v1.0</span>
        <span>Status: Connected</span>
      </div>
    </div>
  );
};

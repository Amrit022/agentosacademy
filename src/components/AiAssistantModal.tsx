'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  ArrowRight, 
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck,
  Key,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Cpu
} from 'lucide-react';
import Link from 'next/link';

interface RelevantTool {
  name: string;
  href: string;
  description: string;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  tool?: RelevantTool;
  followUps?: string[];
}

export default function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showKeySettings, setShowKeySettings] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `👋 **Welcome to OmniStack AI!** I am your universal AI assistant — built just like ChatGPT and Claude.\n\nYou can ask me **ANYTHING in the world**:\n- 💻 **Coding & Debugging**: Python scrapers, React hooks, SQL queries, TypeScript\n- 🧮 **Math & Calculations**: Equations, formulas, and percentages\n- 🌐 **Science, History & Knowledge**: Explanations, concepts (e.g. "what is time"), facts\n- 🎬 **AI Video Workflows**: Runway Gen-3, Kling AI, Midjourney, ElevenLabs\n- 🚀 **Freelancing & SaaS**: How to earn in USD, pricing, cold emails, and ATS resumes`,
      followUps: [
        'Write a Python script to scrape website headlines',
        'How to make AI videos with Runway and ElevenLabs?',
        'Solve math: 45 * 24 + 150',
        'How can I scale to $5,000/month freelancing for global remote clients?'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('omnistack_gemini_key') || localStorage.getItem('agentos_gemini_key') || '';
    if (savedKey) setApiKey(savedKey);
  }, []);

  const handleSaveKey = (key: string) => {
    setApiKey(key);
    if (key.trim()) {
      localStorage.setItem('omnistack_gemini_key', key.trim());
    } else {
      localStorage.removeItem('omnistack_gemini_key');
      localStorage.removeItem('agentos_gemini_key');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    const handleCustomOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-agentos-ai', handleCustomOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-agentos-ai', handleCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const question = textToSend || input;
    if (!question.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: question
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'ask_assistant',
          question,
          apiKey: apiKey.trim() || undefined
        })
      });

      const data = await res.json();
      if (data.success) {
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          content: data.answer,
          tool: data.relevantTool,
          followUps: data.suggestedFollowUps
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'assistant',
          content: `⚠️ Error fetching response. Please try again!`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 group flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-brand-600 via-accent-600 to-pink-600 text-white shadow-2xl shadow-brand-500/40 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 cursor-pointer"
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#030712] animate-pulse" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-black tracking-tight leading-none">Ask OmniStack AI</div>
          <div className="text-[10px] text-white/75 font-medium leading-tight">Answers Any Question Like ChatGPT</div>
        </div>
        <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded text-white/80 font-mono hidden md:inline">
          ⌘K
        </span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[9999] flex flex-col justify-start sm:justify-center items-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto overscroll-contain animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsOpen(false);
          }}
        >
          <div 
            className="w-full max-w-2xl h-[680px] max-h-[96vh] sm:max-h-[92vh] glass rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden bg-[#0a0f1d]/95 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02] gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="sm:hidden px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1 transition shrink-0 border border-white/10 active:scale-95"
                  title="Back"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-brand-400" />
                  <span>Back</span>
                </button>
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-gradient-to-tr from-brand-500 via-accent-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 shrink-0">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-tight truncate">OmniStack AI — Universal Assistant</h3>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] sm:text-[10px] font-bold flex items-center gap-1 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ready
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 line-clamp-1">Ask anything: Coding, Math, Science, Business, or AI Video</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowKeySettings(!showKeySettings)}
                  className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-[11px] font-medium flex items-center gap-1 transition"
                  title="Configure optional API key"
                >
                  <Key className="w-3 h-3 text-amber-400" />
                  <span className="hidden sm:inline">AI Key</span>
                  {showKeySettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Optional AI Key Drawer */}
            {showKeySettings && (
              <div className="px-6 py-3 bg-black/60 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-200 flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-brand-400" /> Connect Free Gemini API Key (Optional)
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Works 100% out-of-the-box! Add your free key for direct Google Gemini 2.5 Flash / Pro inference.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => handleSaveKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 w-44 font-mono text-[11px]"
                  />
                  {apiKey && (
                    <button
                      type="button"
                      onClick={() => handleSaveKey('')}
                      className="text-[10px] text-rose-400 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs font-sans">
              {messages.map((m) => (
                <div 
                  key={m.id} 
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-2`}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-semibold px-1">
                    {m.sender === 'user' ? (
                      <span>You</span>
                    ) : (
                      <span className="flex items-center gap-1 text-brand-300">
                        <Sparkles className="w-3 h-3" /> OmniStack AI
                      </span>
                    )}
                  </div>

                  <div 
                    className={`max-w-[88%] sm:max-w-[82%] rounded-2xl p-4 leading-relaxed ${
                      m.sender === 'user' 
                        ? 'bg-gradient-to-r from-brand-600 to-accent-600 text-white rounded-br-none shadow-md shadow-brand-500/20' 
                        : 'bg-white/[0.04] border border-white/10 text-slate-200 rounded-bl-none shadow-lg'
                    }`}
                  >
                    <div className="whitespace-pre-wrap space-y-2 font-sans">
                      {m.content}
                    </div>

                    {/* Relevant Tool Card */}
                    {m.tool && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <Link 
                          href={m.tool.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 text-brand-300 transition group"
                        >
                          <div>
                            <div className="font-bold flex items-center gap-1 text-white group-hover:text-brand-300">
                              {m.tool.name} <ExternalLink className="w-3 h-3 opacity-60" />
                            </div>
                            <div className="text-[11px] text-slate-400 font-normal">{m.tool.description}</div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-brand-400 group-hover:translate-x-0.5 transition" />
                        </Link>
                      </div>
                    )}

                    {/* Follow Up Suggestions */}
                    {m.followUps && m.followUps.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/5 space-y-1.5">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Suggested Questions:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {m.followUps.map((fu, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSend(fu)}
                              className="text-[11px] text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/5 transition text-left"
                            >
                              💬 {fu}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-400" />
                  <span>OmniStack AI is thinking and generating answer...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-white/10 bg-black/40">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything... (e.g. write python code, what is photosynthesis, how to make ai videos, math 25*14)"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 transition placeholder:text-slate-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="px-4 py-3 rounded-2xl bg-gradient-to-r from-brand-500 via-accent-500 to-pink-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-brand-500/20 hover:opacity-95 disabled:opacity-40 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
              <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-500">
                <span>Press Enter to send • ESC to close</span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Universal AI Engine Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  ArrowRight, 
  MessageSquare, 
  CornerDownLeft, 
  RefreshCw,
  Search,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { queryAgentOsAssistant, AssistantResponse } from '@/lib/ai-engine';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  tool?: AssistantResponse['relevantTool'];
  followUps?: string[];
}

export default function AiAssistantModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: `👋 **Welcome to AgentOS Academy!** I am your built-in AI Copilot.\n\nYou can ask me *anything* about:\n- **AI Video Generation** workflows & tools\n- **Global Freelance & USD Earnings** from India\n- **ATS Resume Formatting & Scores**\n- **Bio Links, Shorteners & Micro-SaaS tools**`,
      followUps: [
        'How to make AI videos step-by-step?',
        'How to earn $5,000/mo freelancing from India in USD?',
        'How do I make my resume pass ATS filters?',
        'Why are tools on AgentOS Academy free?'
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleSend = (textToSend?: string) => {
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

    setTimeout(() => {
      const response = queryAgentOsAssistant(question);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        content: response.answer,
        tool: response.relevantTool,
        followUps: response.suggestedFollowUps
      };
      setMessages((prev) => [...prev, botMsg]);
      setLoading(false);
    }, 400);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-brand-600 via-accent-600 to-pink-600 text-white shadow-2xl shadow-brand-500/40 hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20"
        aria-label="Open AI Assistant"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#030712] animate-pulse" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-black tracking-tight leading-none">Ask AgentOS AI</div>
          <div className="text-[10px] text-white/75 font-medium leading-tight">Instant Answers & Tools</div>
        </div>
        <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded text-white/80 font-mono hidden md:inline">
          ⌘K
        </span>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
          <div 
            className="w-full max-w-2xl h-[650px] max-h-[90vh] glass rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden bg-[#0a0f1d]/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-500 via-accent-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-white tracking-tight">AgentOS AI Copilot</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Online
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">Ask any question about AI workflows, SaaS tools, or USD monetization</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

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
                        <Sparkles className="w-3 h-3" /> AgentOS AI
                      </span>
                    )}
                  </div>

                  <div 
                    className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 leading-relaxed ${
                      m.sender === 'user' 
                        ? 'bg-gradient-to-r from-brand-600 to-accent-600 text-white rounded-br-none shadow-md shadow-brand-500/20' 
                        : 'bg-white/[0.04] border border-white/10 text-slate-200 rounded-bl-none shadow-lg'
                    }`}
                  >
                    <div className="whitespace-pre-wrap space-y-2">
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
                  <span>AgentOS AI is thinking...</span>
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
                    placeholder="Ask anything... (e.g. how to make AI videos, how to earn in USD, ats resume tips)"
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
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Grounded in AgentOS SaaS Knowledge
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

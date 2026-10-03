'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  FileText, 
  Link2, 
  PenTool, 
  Mail, 
  MessageSquareQuote, 
  Scissors, 
  Menu, 
  X,
  ChevronDown,
  ArrowRight,
  Zap,
  Bot,
  Search
} from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const tools = [
    { 
      name: 'AI Resume & ATS Builder', 
      href: '/tools/resume-builder', 
      icon: FileText, 
      color: 'text-indigo-400', 
      bg: 'bg-indigo-500/10',
      desc: 'ATS score gauge, Harvard template & cover letter' 
    },
    { 
      name: 'Bio Link Pages (Linktree Pro)', 
      href: '/tools/bio-link', 
      icon: Link2, 
      color: 'text-purple-400', 
      bg: 'bg-purple-500/10',
      desc: 'Custom Bento links, phone preview & analytics' 
    },
    { 
      name: 'AI Content & Copywriting', 
      href: '/tools/content-writer', 
      icon: PenTool, 
      color: 'text-pink-400', 
      bg: 'bg-pink-500/10',
      desc: 'Viral LinkedIn, cold emails & SEO blogs' 
    },
    { 
      name: 'HTML Email Signatures', 
      href: '/tools/email-signature', 
      icon: Mail, 
      color: 'text-amber-400', 
      bg: 'bg-amber-500/10',
      desc: 'Clickable badges, calendar buttons & Gmail copy' 
    },
    { 
      name: 'Testimonial Collector Widget', 
      href: '/tools/testimonials', 
      icon: MessageSquareQuote, 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10',
      desc: 'Wall-of-Love scripts & review collection forms' 
    },
    { 
      name: 'URL Shortener & Geo Analytics', 
      href: '/tools/url-shortener', 
      icon: Scissors, 
      color: 'text-cyan-400', 
      bg: 'bg-cyan-500/10',
      desc: 'Custom slugs, QR code generator & click maps' 
    },
  ];

  // Smooth hover with grace period (prevents menu disappearing across gaps)
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setToolsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setToolsOpen(false);
    }, 250); // 250ms grace period so moving cursor to menu is seamless
  };

  // Click toggle (keeps it open when clicked)
  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setToolsOpen((prev) => !prev);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Close when pathname changes
  useEffect(() => {
    setToolsOpen(false);
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#070b14]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 via-indigo-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-105 transition-all">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-tight text-white">AgentOS</span>
              <span className="text-xl font-extrabold tracking-tight text-gradient">Academy</span>
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-wide">6-in-1 Global SaaS Suite</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          <Link 
            href="/" 
            className={`text-xs font-semibold tracking-wide transition px-3 py-2 rounded-lg ${
              pathname === '/' ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </Link>
          
          {/* Tools Mega Dropdown Container with Hover Bridge */}
          <div 
            ref={dropdownRef}
            className="relative py-2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              type="button"
              onClick={handleToggleClick}
              className={`flex items-center gap-1.5 text-xs font-semibold tracking-wide transition px-3 py-2 rounded-lg ${
                toolsOpen 
                  ? 'text-white bg-white/10 ring-1 ring-white/20' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Tools Suite (6)</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180 text-brand-400' : ''}`} />
            </button>

            {/* Dropdown Menu (with invisible padding bridge to prevent cursor gap drop) */}
            {toolsOpen && (
              <div 
                className="absolute top-full -left-20 w-[420px] pt-2 z-[200]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="bg-[#0c101d] rounded-2xl p-3 shadow-2xl border border-white/15 shadow-black/90">
                  <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Productivity Engines</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">Free Access</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    {tools.map((t) => (
                      <Link
                        key={t.href}
                        href={t.href}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition group cursor-pointer"
                      >
                        <div className={`p-2 rounded-xl ${t.bg} ${t.color} border border-white/5 mt-0.5 group-hover:scale-110 transition-transform`}>
                          <t.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-bold text-slate-200 group-hover:text-white flex items-center justify-between">
                            <span>{t.name}</span>
                            <ArrowRight className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{t.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link 
            href="/pricing" 
            className={`text-xs font-semibold tracking-wide transition px-3 py-2 rounded-lg ${
              pathname === '/pricing' ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            Pricing & Monetization
          </Link>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-agentos-ai'))}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition group"
          >
            <Bot className="w-3.5 h-3.5 text-brand-400 group-hover:scale-110 transition-transform" />
            <span>Ask AI</span>
            <kbd className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-slate-400 font-mono border border-white/5">⌘K</kbd>
          </button>
          <Link 
            href="/pricing" 
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            Pricing ($9/mo)
          </Link>
          <Link 
            href="/tools/resume-builder" 
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-500 via-indigo-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:scale-[1.02] transition flex items-center gap-2"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Launch Free Tools</span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setOpen(!open)} 
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden bg-[#0a0e1c] border-t border-white/10 px-4 py-6 space-y-4 shadow-2xl">
          <Link 
            href="/" 
            onClick={() => setOpen(false)} 
            className="block text-sm font-bold text-white py-1"
          >
            Home
          </Link>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2 border-t border-white/5">
            All 6 Micro-SaaS Tools
          </div>
          <div className="space-y-1.5">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white"
              >
                <t.icon className={`w-4 h-4 ${t.color}`} />
                <span>{t.name}</span>
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-white/5 flex flex-col gap-2.5">
            <button 
              type="button"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new CustomEvent('open-agentos-ai'));
              }}
              className="w-full text-center py-2.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-xs font-bold text-brand-300 border border-brand-500/20 flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-brand-400" />
              <span>Ask AgentOS AI Copilot</span>
            </button>
            <Link 
              href="/pricing" 
              onClick={() => setOpen(false)} 
              className="text-center py-2.5 rounded-xl bg-white/10 text-xs font-bold text-white border border-white/10"
            >
              Plans & Pricing ($9/mo)
            </Link>
            <Link 
              href="/tools/resume-builder" 
              onClick={() => setOpen(false)} 
              className="text-center py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-xs font-bold text-white shadow-lg"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

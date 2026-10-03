'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  ArrowRight
} from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  const tools = [
    { name: 'AI Resume Builder', href: '/tools/resume-builder', icon: FileText, color: 'text-indigo-400', desc: 'ATS-optimized resumes & letters' },
    { name: 'Bio Link Pages', href: '/tools/bio-link', icon: Link2, color: 'text-purple-400', desc: 'Modern Linktree alternative' },
    { name: 'AI Content Writer', href: '/tools/content-writer', icon: PenTool, color: 'text-pink-400', desc: 'Viral posts, scripts & blogs' },
    { name: 'Email Signature', href: '/tools/email-signature', icon: Mail, color: 'text-amber-400', desc: 'Clickable HTML email badges' },
    { name: 'Testimonials Widget', href: '/tools/testimonials', icon: MessageSquareQuote, color: 'text-emerald-400', desc: 'Collect & embed reviews' },
    { name: 'URL Shortener', href: '/tools/url-shortener', icon: Scissors, color: 'text-cyan-400', desc: 'Track links with geo-analytics' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-white">AgentOS</span>
            <span className="text-xl font-extrabold tracking-tight text-gradient"> Academy</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-slate-300 hover:text-white transition">
            Home
          </Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setToolsOpen(true)}
            onMouseLeave={() => setToolsOpen(false)}
          >
            <button className="flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition py-2">
              Tools Suite <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsOpen && (
              <div className="absolute top-full -left-16 w-80 glass rounded-2xl p-2.5 shadow-2xl border border-white/10 bg-[#0c1220]/95 backdrop-blur-xl">
                {tools.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    onClick={() => setToolsOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition group"
                  >
                    <div className="p-2 rounded-lg bg-white/5 border border-white/5 mt-0.5">
                      <t.icon className={`w-4 h-4 ${t.color}`} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-white">{t.name}</div>
                      <div className="text-[11px] text-slate-400">{t.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition">
            Pricing
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link 
            href="/pricing" 
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white glass hover:bg-white/10 transition"
          >
            Pricing
          </Link>
          <Link 
            href="/tools/resume-builder" 
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25 hover:opacity-90 transition flex items-center gap-1.5"
          >
            Launch Tools <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => setOpen(!open)} 
          className="md:hidden p-2 rounded-lg glass text-slate-300 hover:text-white"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden glass border-t border-white/10 px-4 py-6 space-y-4 bg-[#0a0e1a]/95">
          <Link href="/" onClick={() => setOpen(false)} className="block text-sm font-semibold text-slate-200">
            Home
          </Link>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider pt-2">All 6 Tools</div>
          <div className="space-y-1">
            {tools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-white/10 text-sm text-slate-300"
              >
                <t.icon className={`w-4 h-4 ${t.color}`} />
                {t.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link 
              href="/pricing" 
              onClick={() => setOpen(false)} 
              className="text-center py-2.5 rounded-xl glass text-xs font-semibold text-white"
            >
              Plans & Pricing
            </Link>
            <Link 
              href="/tools/resume-builder" 
              onClick={() => setOpen(false)} 
              className="text-center py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-xs font-semibold text-white"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

import Link from 'next/link';
import { Sparkles, Globe, Shield, Terminal, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass border-t border-white/5 mt-28 py-14 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-500 to-accent-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-white text-base tracking-tight">agentosacademy.com</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The multi-purpose AI productivity platform for freelancers, founders, and creators looking to build in India and monetize globally in USD.
          </p>
          <div className="pt-2 text-xs text-brand-400 font-medium">
            support@agentosacademy.com
          </div>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">6 Micro-SaaS Tools</h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link href="/tools/resume-builder" className="hover:text-white transition flex items-center justify-between">
                <span>AI Resume Builder</span>
                <span className="text-[10px] text-slate-500">Free</span>
              </Link>
            </li>
            <li>
              <Link href="/tools/bio-link" className="hover:text-white transition flex items-center justify-between">
                <span>Bio Link Pages</span>
                <span className="text-[10px] text-slate-500">Free</span>
              </Link>
            </li>
            <li>
              <Link href="/tools/content-writer" className="hover:text-white transition flex items-center justify-between">
                <span>AI Content Writer</span>
                <span className="text-[10px] text-slate-500">Free</span>
              </Link>
            </li>
            <li>
              <Link href="/tools/email-signature" className="hover:text-white transition flex items-center justify-between">
                <span>Email Signature Builder</span>
                <span className="text-[10px] text-slate-500">Free</span>
              </Link>
            </li>
            <li>
              <Link href="/tools/testimonials" className="hover:text-white transition flex items-center justify-between">
                <span>Testimonial Collector</span>
                <span className="text-[10px] text-slate-500">Pro</span>
              </Link>
            </li>
            <li>
              <Link href="/tools/url-shortener" className="hover:text-white transition flex items-center justify-between">
                <span>URL Shortener + Analytics</span>
                <span className="text-[10px] text-slate-500">Free</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Deployment & Stack</h4>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Vercel Edge Global Network</span>
            </li>
            <li className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Render Docker Container</span>
            </li>
            <li className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>PayPal & Global Payments (USD)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Domain Mapped</h4>
          <div className="glass p-4 rounded-2xl border border-white/5 space-y-2">
            <div className="text-xs font-semibold text-slate-200">Custom Domain Ready:</div>
            <div className="text-xs text-brand-300 font-mono">https://agentosacademy.com</div>
            <p className="text-[11px] text-slate-400 leading-normal pt-1">
              Optimized for global search engines with automated SSL encryption and fast edge CDN.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>© {new Date().getFullYear()} AgentOS Academy. Built to launch from India and earn globally.</div>
        <div className="flex gap-6">
          <Link href="/pricing" className="hover:text-slate-300">Pricing</Link>
          <Link href="/tools/resume-builder" className="hover:text-slate-300">Tools</Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 flex items-center gap-1">
            GitHub <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

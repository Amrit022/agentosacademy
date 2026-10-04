'use client';

import Link from 'next/link';
import { Crown, CheckCircle2, ShieldCheck, X, Zap } from 'lucide-react';

interface ProUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName?: string;
  featureName?: string;
}

export default function ProUpgradeModal({
  isOpen,
  onClose,
  toolName = 'OmniStack AI',
  featureName = 'this feature'
}: ProUpgradeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="glass p-7 sm:p-9 rounded-3xl border border-amber-500/40 max-w-2xl w-full bg-[#0c1020] shadow-2xl relative space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
            <Crown className="w-6 h-6 font-black" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              OmniStack AI Pro
            </span>
            <h3 className="text-xl font-black text-white mt-1">Unlock Pro ($19/mo or $149 Lifetime)</h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-amber-400 font-semibold">{featureName}</strong> is part of <strong className="text-white font-semibold">OmniStack AI Pro</strong>. Upgrading unlocks all premium capabilities across the complete 6-in-1 suite:
        </p>

        {/* Benefit Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>8 Vector Resume Layouts</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Tech Lead, Wall Street, Nordic Luxury, Executive & Creative layouts with 1:1 pixel-perfect vector PDF & ATS exports.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>AI Scripts, SEO & Cold Pitching</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Full-length YouTube storyboards, 1,500+ word SEO blog posts, and multi-touch outbound email campaigns.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Bio Link Themes & Analytics</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Sunset & Emerald themes, real-time click tracking, custom CNAME domains, and zero watermarks.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
            <div className="font-bold text-white flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Wall of Love Embed Widget</span>
            </div>
            <p className="text-[11px] text-slate-400">
              1-click embed script for WordPress, Webflow, Shopify, Framer, and custom React sites with zero branding.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1 sm:col-span-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Global Payment Gateway · PayPal & Cards</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Accepts PayPal, Visa, MasterCard, and Amex worldwide with 0 paperwork. Includes 14-day 100% money-back guarantee.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link 
            href="/pricing"
            onClick={onClose}
            className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-brand-500 to-accent-500 text-white font-extrabold text-xs shadow-lg shadow-brand-500/25 hover:opacity-95 text-center transition flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4 text-amber-200" />
            <span>Upgrade to Pro ($19/mo)</span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white font-bold text-xs text-center transition"
          >
            Keep Using Free
          </button>
        </div>
      </div>
    </div>
  );
}

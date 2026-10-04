'use client';

import Link from 'next/link';
import { Crown, CheckCircle2, ShieldCheck, X, Zap, ArrowLeft } from 'lucide-react';

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
    <div 
      className="fixed inset-0 !m-0 z-[9999] bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-2.5 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="w-full max-w-2xl bg-[#0c1020] border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-2xl relative flex flex-col max-h-[92dvh] sm:max-h-[88dvh] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Mobile/Desktop Header with Clean Back Button */}
        <div className="shrink-0 bg-[#0c1020] px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between gap-2 shadow-sm z-20">
          <button 
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 border border-white/10 active:scale-95 cursor-pointer"
            title="Back to tool"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Back</span>
          </button>

          <div className="text-center min-w-0 flex-1 px-1">
            <div className="flex items-center justify-center gap-1.5">
              <span className="text-xs sm:text-sm font-extrabold text-white truncate">OmniStack AI Pro</span>
              <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-full border border-amber-500/20 shrink-0">
                Unlock
              </span>
            </div>
            <div className="text-[10px] text-amber-300/90 font-bold truncate">
              $9/mo or $84/year · 6-in-1 Suite
            </div>
          </div>

          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition shrink-0 border border-white/10 active:scale-95 cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body (Smoothly scrollable without clipping) */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8 space-y-6 -webkit-overflow-scrolling-touch">
          {/* Header Banner */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30 shrink-0">
              <Crown className="w-6 h-6 font-black" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                OmniStack AI Pro
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">Unlock Pro ($9/mo or $84/year)</h3>
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
            <a 
              href="https://checkout.dodopayments.com/buy/pdt_0Noz3iseuD6nqAUvsHz2R?quantity=1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 text-center transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>🦤 Instant Card / Apple Pay Checkout ($9/mo) ↗</span>
            </a>
            <Link 
              href="/pricing"
              onClick={onClose}
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-bold text-xs text-center transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>All Payment Options</span>
            </Link>
          </div>

          {/* Bottom Back Button */}
          <div className="pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
              <span>Cancel and return to {toolName}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

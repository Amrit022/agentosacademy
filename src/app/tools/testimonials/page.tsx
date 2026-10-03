'use client';

import { useState } from 'react';
import { 
  Star, 
  MessageSquareQuote, 
  Copy, 
  Check, 
  Plus, 
  Code, 
  Eye, 
  Sparkles, 
  Filter, 
  BadgeCheck,
  LayoutGrid,
  SlidersHorizontal
} from 'lucide-react';

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState([
    {
      id: '1',
      name: 'Sarah Jenkins',
      role: 'Growth Lead, SaaSForge (San Francisco, USA)',
      text: 'AgentOS Academy replaced 3 separate tools for our team. The ATS resume builder alone helped our candidates score interview invitations at Stripe, Linear, and Vercel.',
      stars: 5,
      date: '2 days ago',
      verified: true,
      avatarBg: 'from-blue-500 to-indigo-500'
    },
    {
      id: '2',
      name: 'Rohan Sharma',
      role: 'Freelance Cloud Engineer (Bengaluru, India)',
      text: 'Using the Bio Link and Email Signature tools gave my consulting practice an instant executive finish. Closed two overseas contracts worth $3,800 this month.',
      stars: 5,
      date: '1 week ago',
      verified: true,
      avatarBg: 'from-purple-500 to-pink-500'
    },
    {
      id: '3',
      name: 'Marcus Vance',
      role: 'Founder, NextScale Media (London, UK)',
      text: 'The embed code took literally 30 seconds to paste into Webflow. Cleanest Wall-of-Love review widget on the market with zero intrusive watermarks.',
      stars: 5,
      date: '2 weeks ago',
      verified: true,
      avatarBg: 'from-emerald-500 to-teal-500'
    },
    {
      id: '4',
      name: 'Elena Rostova',
      role: 'Product Designer (Berlin, Germany)',
      text: 'I used the AI Content Generator to draft our entire launch campaign on Product Hunt. The tone was sharp, persuasive, and completely nailed our value proposition.',
      stars: 5,
      date: '3 weeks ago',
      verified: true,
      avatarBg: 'from-amber-500 to-rose-500'
    },
  ]);

  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedStars, setSelectedStars] = useState(5);
  const [widgetTheme, setWidgetTheme] = useState<'dark' | 'light' | 'glass'>('dark');

  const embedScript = `<script src="https://agentosacademy.com/api/widget.js" data-project="agentos" data-theme="${widgetTheme}" defer></script>\n<div id="agentos-testimonials"></div>`;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !reviewText) return;
    setReviews([
      {
        id: Date.now().toString(),
        name: authorName,
        role: authorRole || 'Verified Client',
        text: reviewText,
        stars: selectedStars,
        date: 'Just now',
        verified: true,
        avatarBg: 'from-brand-500 to-accent-500'
      },
      ...reviews
    ]);
    setAuthorName('');
    setAuthorRole('');
    setReviewText('');
  };

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Tool #5</span>
            <span className="text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
              Social Proof & Wall-of-Love
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">Testimonial Collector & Embed Widget</h1>
          <p className="text-xs text-slate-400 mt-1">
            Harvest authentic customer reviews asynchronously and embed responsive social proof on any website.
          </p>
        </div>

        <button 
          onClick={copyEmbed}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/25 flex items-center gap-2 hover:opacity-90 transition"
        >
          {copied ? <Check className="w-4 h-4" /> : <Code className="w-4 h-4" />}
          {copied ? 'Embed Script Copied!' : 'Copy Embed Script'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Add Review (4 cols) */}
        <div className="lg:col-span-4 glass p-6 sm:p-7 rounded-3xl border border-white/10 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Plus className="w-4 h-4 text-emerald-400" /> Collect New Review
          </h2>

          <form onSubmit={handleAddReview} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Client Full Name</label>
              <input 
                type="text" 
                required
                value={authorName} 
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. David Miller"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Company / Role / Country</label>
              <input 
                type="text" 
                value={authorRole} 
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="e.g. CEO, Apex Ventures (USA)"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Rating</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSelectedStars(num)}
                    className="p-1.5 rounded-lg glass hover:bg-white/10"
                  >
                    <Star 
                      className={`w-5 h-5 ${
                        num <= selectedStars 
                          ? 'fill-amber-400 text-amber-400' 
                          : 'text-slate-600'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Review Feedback</label>
              <textarea 
                rows={3}
                required
                value={reviewText} 
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What tangible outcome or revenue did you help them achieve?"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-emerald-500 leading-relaxed font-sans"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Publish Review
            </button>
          </form>

          {/* Embed Code Snippet Preview */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-300">Embed Snippet</span>
              <span className="text-[10px] text-emerald-400 font-mono">1-Line Script</span>
            </div>
            <pre className="p-3 rounded-xl bg-black/60 border border-white/5 text-[10px] text-emerald-300 font-mono break-all whitespace-pre-wrap">
              {embedScript}
            </pre>
          </div>
        </div>

        {/* Right Wall of Love Grid (8 cols) */}
        <div className="lg:col-span-8 glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Live Wall-of-Love Preview</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {reviews.length} Verified Testimonials
            </span>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div key={r.id} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(r.stars)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{r.date}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    "{r.text}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${r.avatarBg} flex items-center justify-center text-xs font-black text-slate-950`}>
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <span>{r.name}</span>
                        {r.verified && <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <div className="text-[10px] text-slate-400">{r.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

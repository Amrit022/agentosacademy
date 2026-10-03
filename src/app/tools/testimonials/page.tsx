'use client';

import { useState } from 'react';
import { Star, MessageSquareQuote, Copy, Check, Plus, Code, Eye, Sparkles } from 'lucide-react';

export default function TestimonialsPage() {
  const [reviews, setReviews] = useState([
    {
      name: 'Sarah Jenkins',
      role: 'Growth Lead, SaaSForge (San Francisco)',
      text: 'AgentOS Academy replaced 3 expensive subscriptions for our team. The ATS resume builder alone landed our portfolio candidates interviews at Stripe and Linear.',
      stars: 5,
      date: '2 days ago'
    },
    {
      name: 'Rohan Sharma',
      role: 'Freelance Cloud Architect (Bengaluru)',
      text: 'Using the Bio Link and Email Signature tools gave my consulting practice an immediate global polish. Closed two overseas contracts worth \$3,800 this month.',
      stars: 5,
      date: '1 week ago'
    },
    {
      name: 'Marcus Vance',
      role: 'Founder, NextScale Media (London)',
      text: 'The embed code took 40 seconds to paste into Webflow. Cleanest review widget on the market with zero watermarks.',
      stars: 5,
      date: '2 weeks ago'
    },
  ]);

  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [copied, setCopied] = useState(false);

  const embedScript = `<script src="https://agentosacademy.com/api/widget.js" data-project="agentos" defer></script>`;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !reviewText) return;
    setReviews([
      {
        name: authorName,
        role: authorRole || 'Verified Client',
        text: reviewText,
        stars: 5,
        date: 'Just now'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Tool #5</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Testimonial Collector & Embed Widget</h1>
          <p className="text-xs text-slate-400 mt-1">
            Collect authentic social proof from overseas clients and embed responsive Wall-of-Love widgets.
          </p>
        </div>
        <button 
          onClick={copyEmbed}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 hover:opacity-90 transition"
        >
          {copied ? <Check className="w-4 h-4" /> : <Code className="w-4 h-4" />}
          {copied ? 'Embed Script Copied!' : 'Copy Embed Script'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Form: Add New Review */}
        <div className="glass p-6 rounded-3xl border border-white/10 space-y-5 lg:col-span-1">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Plus className="w-4 h-4 text-emerald-400" /> Collect New Review
          </h2>

          <form onSubmit={handleAddReview} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Client Full Name</label>
              <input 
                type="text" 
                required
                value={authorName} 
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. David Miller"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Title / Company / City</label>
              <input 
                type="text" 
                value={authorRole} 
                onChange={(e) => setAuthorRole(e.target.value)}
                placeholder="e.g. CEO, Apex Ventures (USA)"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Feedback / Testimonial</label>
              <textarea 
                rows={3}
                required
                value={reviewText} 
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="What results did you help them achieve?"
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-emerald-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Publish to Live Wall
            </button>
          </form>

          {/* Embed Code Snippet */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <span className="text-[11px] font-semibold text-slate-400">Embed Tag:</span>
            <div className="p-2.5 rounded-xl bg-black/50 border border-white/5 text-[10px] text-emerald-300 font-mono break-all">
              {embedScript}
            </div>
          </div>
        </div>

        {/* Live Wall of Love */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Live Customer Wall of Love</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              {reviews.length} Verified Reviews
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r, i) => (
              <div key={i} className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(r.stars)].map((_, s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500">{r.date}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{r.text}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-xs font-bold text-slate-950">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{r.name}</div>
                    <div className="text-[10px] text-slate-400">{r.role}</div>
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

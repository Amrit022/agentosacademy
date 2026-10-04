'use client';

import { useState } from 'react';
import ProUpgradeModal from '@/components/ProUpgradeModal';
import { 
  PenTool,
  Lock,
  Crown, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Flame, 
  Video,
  FileText, 
  Mail, 
  Share2, 
  Clock, 
  AlignLeft,
  Dices,
  Lightbulb,
  Globe2,
  Cpu,
  Layers,
  Wand2,
  Target,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Zap,
  SlidersHorizontal,
  ShieldCheck
} from 'lucide-react';
import { generateCopy } from '@/lib/ai-engine';

const PRO_AI_CAPABILITIES = [
  {
    category: '1. Long-Form SEO & Editorial Engines',
    features: [
      { name: '3,000-Word Comprehensive Pillar Articles', desc: 'Full-length SEO articles with headers, citations, and summaries.', badge: 'Pro' },
      { name: 'Semantic Keyword Density Optimizer', desc: 'Auto-embeds secondary LSI keywords to climb Google page 1.', badge: 'Pro' },
      { name: 'Automated FAQ & How-To Schema Generator', desc: 'Generates JSON-LD code for rich Google search snippet cards.', badge: 'Pro' },
      { name: 'SEO Meta Title & Meta Description Generator', desc: 'High-CTR click magnets customized for search result rankings.', badge: 'Pro' },
      { name: 'Automated Table of Contents & Anchor Jumps', desc: 'Creates reader-friendly navigational jumps for long posts.', badge: 'Pro' },
      { name: 'Standard Short Blog Post (500 Words)', desc: 'Clean foundational blog post generation.', badge: 'Free' }
    ]
  },
  {
    category: '2. Direct-Response Sales Copywriting',
    features: [
      { name: 'AIDA Framework (Attention-Interest-Desire-Action)', desc: 'Legendary advertising framework used by billion-dollar brands.', badge: 'Pro' },
      { name: 'PAS Framework (Problem-Agitate-Solve)', desc: 'High-converting landing page copy that highlights customer pain points.', badge: 'Pro' },
      { name: 'BAB Framework (Before-After-Bridge)', desc: 'Transformational sales copy for coaching and SaaS products.', badge: 'Pro' },
      { name: 'High-Ticket Cold Email Sequence (4 Steps)', desc: 'Multi-touch outbound email series that lands enterprise discovery calls.', badge: 'Pro' },
      { name: 'Video Sales Letter (VSL) 10-Minute Script', desc: 'Hypnotic script structure designed to close $1,000+ digital offerings.', badge: 'Pro' },
      { name: 'Standard Pitch Email', desc: 'Single-paragraph professional inquiry message.', badge: 'Free' }
    ]
  },
  {
    category: '3. Viral Social Media Algorithms',
    features: [
      { name: 'Viral Twitter / X Thought Leadership Thread', desc: 'Hook-first educational threads engineered for retweets and bookmarks.', badge: 'Free' },
      { name: 'LinkedIn Executive Storytelling Post', desc: 'High-engagement personal branding narratives with line-break pacing.', badge: 'Free' },
      { name: 'YouTube Shorts & TikTok Viral 60s Script', desc: 'Hook, retention loop, and CTA storyboard with visual cue markers.', badge: 'Pro' },
      { name: 'Instagram Carousel Slide-by-Slide Copy', desc: '10-slide educational carousel text ready to paste into Canva.', badge: 'Pro' },
      { name: 'Substack & Beehiiv Weekly Newsletter Issue', desc: 'Deep-dive newsletter issue with sponsor slot and curated links.', badge: 'Pro' }
    ]
  },
  {
    category: '4. Brand Voice & Anti-AI Detection',
    features: [
      { name: 'AI Humanizer & Anti-Detection Shield', desc: 'Rewrites text with human burstiness and perplexity to bypass Turnitin/GPTZero.', badge: 'Pro' },
      { name: 'Custom Brand Voice & Persona Cloner', desc: 'Feed your existing writings to match your exact personal cadence.', badge: 'Pro' },
      { name: 'Tone Adjuster (Executive, Witty, Academic)', desc: 'Switch effortlessly between formal Wall Street and punchy startup tone.', badge: 'Free' },
      { name: 'Plagiarism & Originality Verification Check', desc: 'Cross-checks generated outputs against live search indexes.', badge: 'Pro' },
      { name: 'Reading Grade Level Optimizer (Grade 6 to 12)', desc: 'Adjusts Hemingway readability score for mass consumer comprehension.', badge: 'Pro' }
    ]
  },
  {
    category: '5. Multi-Language & Global Reach',
    features: [
      { name: 'Translate & Localize into 35+ Languages', desc: 'Native-sounding European, Asian, and Latin American translations.', badge: 'Pro' },
      { name: 'Cultural Idiom & Slang Adapter', desc: 'Adapts American business phrases into localized UK/German equivalents.', badge: 'Pro' },
      { name: 'Multi-Currency & Regional Formatting', desc: 'Automatically adjusts date and pricing styles per territory.', badge: 'Pro' },
      { name: 'English (US & UK) Synthesis Engine', desc: 'Flawless native English syntax and grammar.', badge: 'Free' }
    ]
  },
  {
    category: '6. Bulk Automation & CMS Publishing',
    features: [
      { name: 'Bulk Batch Generation via CSV Upload', desc: 'Generate 100 social posts or product descriptions in a single click.', badge: 'Pro' },
      { name: '1-Click Direct Publishing to WordPress API', desc: 'Push drafts straight into your WordPress draft queue with formatting.', badge: 'Pro' },
      { name: 'Ghost CMS & Webflow Direct Integration', desc: 'Export rich markdown directly to headless CMS collections.', badge: 'Pro' },
      { name: 'Export to Clean Markdown, PDF & DOCX', desc: 'Download clean formatted documents with zero proprietary watermarks.', badge: 'Pro' }
    ]
  },
  {
    category: '7. Agency Unlimited Programmatic Studio & API',
    features: [
      { name: 'Programmatic 50-Variant Ad Matrix', desc: 'Generate 50 headlines, primary text variations, and angles simultaneously.', badge: 'Agency' },
      { name: 'Agency Multi-Platform Campaign Pack', desc: '1-click outputs blog post, 5 tweets, LinkedIn post, and email announcement.', badge: 'Agency' },
      { name: '10,000 Row Bulk CSV Generator Engine', desc: 'High-throughput batch export for programmatic SEO and affiliate directories.', badge: 'Agency' },
      { name: 'Multi-Client Workspaces & Brand Voice Lock', desc: 'Isolate distinct tone profiles for 25+ agency clients.', badge: 'Agency' },
      { name: 'Headless CMS Webhook Auto-Publish', desc: 'Stream approved copy directly into Supabase, Strapi, or Shopify.', badge: 'Agency' },
      { name: '100% White-Label Client Deliverables (PDF/Docx)', desc: 'Agency-branded cover sheets ready for client presentation.', badge: 'Agency' },
      { name: 'Full Commercial Copywriting REST API', desc: 'Integrate OmniStack AI text generation into your own agency workflows.', badge: 'Agency' }
    ]
  }
];

export default function ContentWriterPage() {
  const [topic, setTopic] = useState('how to make ai videos');
  const [format, setFormat] = useState('Twitter / X Thought Leadership Thread');
  const [tone, setTone] = useState('Inspirational & Tactical');
  const [targetAudience, setTargetAudience] = useState('Engineers, Freelancers & Solopreneurs');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [variantCount, setVariantCount] = useState(0);
  const [showProModal, setShowProModal] = useState(false);
  const [proModalTier, setProModalTier] = useState<'pro' | 'agency'>('pro');
  const [proFeature, setProFeature] = useState('');
  const [showMatrix, setShowMatrix] = useState(false);

  const presets = [
    { title: '🎥 AI Video Masterclass', format: 'Twitter / X Thought Leadership Thread', topic: 'How to make AI videos with Runway Gen-3, ElevenLabs, and Midjourney' },
    { title: '🚀 Micro-SaaS Playbook', format: 'Viral LinkedIn Carousel / Post', topic: 'How to build and launch a $5k/month Micro-SaaS tool with zero upfront budget' },
    { title: '📩 High-Ticket Cold Email', format: 'High-Ticket Cold Email Sequence (4 Steps)', topic: 'Pitching automated AI workflows and web development retainers to US tech agencies' },
    { title: '🎬 YouTube Reel Script', format: 'YouTube / Short-Form Video Script & Storyboard', topic: 'The step-by-step secret to creating faceless viral AI videos in 2026' },
    { title: '📝 Comprehensive SEO Guide', format: 'Comprehensive 3,000-Word Pillar Article', topic: 'Top 7 AI automation tools every remote business needs to scale in 2026' },
    { title: '⚡ Agency 50-Variant Ad Matrix', format: 'Programmatic 50-Variant Ad Matrix (Meta & Google)', topic: 'Direct-to-consumer launch angles for automated bookkeeping software' }
  ];

  const randomTopics = [
    'How to make viral AI videos for YouTube Shorts and TikTok',
    'How modern freelancers scale to $5,000/month serving international remote clients',
    'Why the next generation of profitable SaaS apps will be built by 1-person teams',
    'Step-by-step guide to building an ATS-friendly tech resume that gets interviews',
    'How to generate passive income selling automated Notion templates and micro-tools',
  ];

  const handleRandomTopic = () => {
    const next = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    setTopic(next);
  };

  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;
  const readingTime = Math.ceil(wordCount / 200) || 1;

  const handleFeatureClick = (badge?: string, name?: string) => {
    if (badge === 'Free') return;
    setProModalTier(badge === 'Agency' ? 'agency' : 'pro');
    if (name) setProFeature(name);
    setShowProModal(true);
  };

  const handleFormatSelect = (fmt: string, tier: 'Free' | 'Pro' | 'Agency') => {
    setFormat(fmt);
    if (tier !== 'Free') {
      setProModalTier(tier === 'Agency' ? 'agency' : 'pro');
    }
  };

  const handleGenerate = () => {
    const isAgencyFormat = format.includes('Agency') || format.includes('Programmatic');
    const isProFormat = format.includes('YouTube') || format.includes('Carousel') || format.includes('AIDA') || format.includes('PAS') || format.includes('Cold') || format.includes('3,000') || format.includes('Newsletter') || format.includes('Sales Letter');

    if (isAgencyFormat) {
      setProModalTier('agency');
      setProFeature(`${format} (⚡ Agency Unlimited Feature)`);
      setShowProModal(true);
      return;
    }

    if (isProFormat) {
      setProModalTier('pro');
      setProFeature(`${format} (🔒 Pro Copy Engine)`);
      setShowProModal(true);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const generated = generateCopy({
        topic,
        format,
        tone,
        targetAudience,
        variant: variantCount
      });
      setOutput(generated);
      setVariantCount(v => v + 1);
      setLoading(false);
    }, 450);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Tool #3</span>
            <span className="text-[10px] text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded-full font-bold">
              Dynamic AI Generation Engine
            </span>
            <span className="text-[10px] text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Crown className="w-3 h-3 text-amber-400" /> 14 Formats · 50+ Capabilities
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">AI Content Generator Studio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Produce publish-ready viral social posts, long-form SEO guides, and high-converting cold email pitches.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-2 transition cursor-pointer self-start md:self-auto"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>{showMatrix ? 'Hide Capabilities' : '👑 Browse 50+ Pro & Agency Capabilities'}</span>
          </button>
        </div>
      </div>

      {/* EXPANDABLE 50+ PRO & AGENCY AI CAPABILITIES MATRIX */}
      {showMatrix && (
        <div className="glass p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-black text-base">
                <Crown className="w-5 h-5 text-amber-400" />
                <span>OmniStack Pro & Agency Copywriting Infrastructure (50+ Advanced Capabilities)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                From long-form 3,000-word guides to multi-channel cold outreach sequences, humanizer shields, and programmatic ad matrices.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setProModalTier('pro');
                  setShowProModal(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition shrink-0 cursor-pointer"
              >
                👑 Pro ($9/mo)
              </button>
              <button
                type="button"
                onClick={() => {
                  setProModalTier('agency');
                  setShowProModal(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:opacity-95 transition shrink-0 cursor-pointer"
              >
                ⚡ Agency ($29/mo)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRO_AI_CAPABILITIES.map((category) => (
              <div key={category.category} className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="text-xs font-black text-white border-b border-white/5 pb-2">
                  {category.category}
                </div>

                <div className="space-y-2">
                  {category.features.map((f) => (
                    <div 
                      key={f.name}
                      onClick={() => handleFeatureClick(f.badge, f.name)}
                      className={`p-2.5 rounded-xl border text-left transition flex items-start justify-between gap-2 cursor-pointer ${
                        f.badge === 'Agency'
                          ? 'bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-500/15'
                          : f.badge === 'Pro' 
                            ? 'bg-white/5 border-white/5 hover:border-amber-500/40 hover:bg-amber-500/10' 
                            : 'bg-emerald-500/10 border-emerald-500/20'
                      }`}
                    >
                      <div>
                        <div className="text-[11px] font-bold text-slate-200 leading-tight">
                          {f.name}
                        </div>
                        <div className="text-[10px] text-slate-400 leading-snug mt-0.5">
                          {f.desc}
                        </div>
                      </div>

                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0 flex items-center gap-0.5 ${
                        f.badge === 'Agency'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : f.badge === 'Pro' 
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {f.badge === 'Agency' ? <><Zap className="w-2.5 h-2.5" /> AGENCY</> : f.badge === 'Pro' ? <><Crown className="w-2.5 h-2.5" /> PRO</> : 'FREE'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preset Inspirations */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-1">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Instant Presets:
        </span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setTopic(p.topic);
              setFormat(p.format);
            }}
            className="text-xs px-3 py-1.5 rounded-xl glass hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>{p.title}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (5 cols) */}
        <div className="lg:col-span-5 glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300">Topic, Angle or Key Idea</label>
              <button 
                type="button"
                onClick={handleRandomTopic}
                className="text-[11px] text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1 transition cursor-pointer"
              >
                <Dices className="w-3.5 h-3.5" /> Random Idea
              </button>
            </div>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. 5 steps to launch a profitable micro-SaaS with zero budget..."
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-pink-500 leading-relaxed font-sans"
            />
          </div>

          {/* Formats Selector (14 Total Formats: 4 Free · 8 Pro · 2 Agency) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-pink-400" />
                <span>Deliverable Format (14 Formats):</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  setProModalTier('pro');
                  setShowProModal(true);
                }}
                className="text-[10px] text-amber-400 font-bold hover:underline cursor-pointer"
              >
                👑 Unlock All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {[
                { name: 'Twitter / X Thought Leadership Thread', tier: 'Free' as const },
                { name: 'Viral LinkedIn Carousel / Post', tier: 'Free' as const },
                { name: 'Standard High-Converting Pitch Email', tier: 'Free' as const },
                { name: 'Foundational SEO Blog Post (500 Words)', tier: 'Free' as const },
                { name: 'YouTube / Short-Form Video Script & Storyboard', tier: 'Pro' as const },
                { name: 'Instagram Carousel Slide-by-Slide Copy', tier: 'Pro' as const },
                { name: 'AIDA Framework Sales Copywriting', tier: 'Pro' as const },
                { name: 'PAS Problem-Agitate-Solve Landing Page Copy', tier: 'Pro' as const },
                { name: 'High-Ticket Cold Email Sequence (4 Steps)', tier: 'Pro' as const },
                { name: 'Comprehensive 3,000-Word Pillar Article', tier: 'Pro' as const },
                { name: 'Substack & Beehiiv Weekly Newsletter Issue', tier: 'Pro' as const },
                { name: 'Hypnotic Video Sales Letter (VSL 10-Min Script)', tier: 'Pro' as const },
                { name: 'Agency Multi-Platform Campaign Pack', tier: 'Agency' as const },
                { name: 'Programmatic 50-Variant Ad Matrix (Meta & Google)', tier: 'Agency' as const },
              ].map((fmt) => (
                <button
                  key={fmt.name}
                  type="button"
                  onClick={() => handleFormatSelect(fmt.name, fmt.tier)}
                  className={`p-2.5 rounded-xl text-left border text-xs font-bold transition flex items-center justify-between gap-1.5 cursor-pointer ${
                    format === fmt.name
                      ? fmt.tier === 'Agency'
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-sm'
                        : fmt.tier === 'Pro'
                          ? 'bg-amber-500/20 border-amber-400 text-white shadow-sm'
                          : 'bg-pink-600/30 border-pink-500 text-white shadow-sm'
                      : 'glass text-slate-300 border-white/5 hover:text-white'
                  }`}
                >
                  <span className="truncate text-[11px]">{fmt.name}</span>
                  <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0 ${
                    fmt.tier === 'Agency' ? 'bg-cyan-500/20 text-cyan-300' : fmt.tier === 'Pro' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {fmt.tier === 'Agency' ? '⚡' : fmt.tier === 'Pro' ? '🔒' : 'FREE'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tone & Brand Voice (8 Tones) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-pink-400" />
              <span>Tone of Voice (8 Cadences):</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                'Inspirational & Tactical',
                'Wall Street Executive',
                'Witty & Punchy',
                'Empathetic Storytelling',
                'Direct-Response Sales',
                'Academic Deep Dive',
                'Hypnotic Storyteller',
                'AI Persona Cloned'
              ].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  className={`p-2 rounded-xl text-[10px] font-bold border transition text-center cursor-pointer ${
                    tone === t ? 'bg-pink-600 text-white border-pink-400' : 'glass text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Audience</label>
            <input 
              type="text" 
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-pink-500 font-semibold"
            />
          </div>

          {/* Pro & Agency Add-ons Badges (Image 1 style) */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="text-slate-400 font-semibold mr-1">👑 Pro Add-ons:</span>
              {[
                'AI Humanizer Shield',
                'Hemingway Tuner',
                '35+ Languages',
                'Originality Checker',
                'WordPress Sync',
                '4-Step Cold Sequence'
              ].map((addon) => (
                <button
                  key={addon}
                  type="button"
                  onClick={() => handleFeatureClick('Pro', addon)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-slate-300 hover:text-amber-300 transition flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  <Crown className="w-2.5 h-2.5 text-amber-400" />
                  <span>{addon}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1 border-t border-white/5">
              <span className="text-cyan-400 font-semibold mr-1">⚡ Agency Only:</span>
              {[
                '10k Batch CSV Generator',
                'Multi-Client Workspaces',
                'Headless CMS Webhooks',
                'White-Label Client Reports',
                'Full REST API'
              ].map((agencyAddon) => (
                <button
                  key={agencyAddon}
                  type="button"
                  onClick={() => handleFeatureClick('Agency', agencyAddon)}
                  className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400 text-cyan-300 transition flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  <Zap className="w-2.5 h-2.5 text-cyan-400" />
                  <span>{agencyAddon}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-black text-xs shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 hover:opacity-95 transition disabled:opacity-50 cursor-pointer active:scale-98"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>{loading ? 'Synthesizing Professional Copy...' : `Generate ${format}`}</span>
          </button>
        </div>

        {/* Right Output Display (7 cols) */}
        <div className="lg:col-span-7 glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-pink-400" />
                <span>Generated Output Canvas</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {wordCount} words · ~{readingTime} min read
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition disabled:opacity-40 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Copy'}</span>
              </button>
            </div>
          </div>

          {output ? (
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-white text-xs leading-relaxed font-sans whitespace-pre-wrap min-h-[380px] max-h-[600px] overflow-y-auto">
              {output}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-white/5 border border-dashed border-white/10 min-h-[380px] flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
                <PenTool className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-white">Your AI-generated text will appear here</div>
              <p className="text-[11px] text-slate-400 max-w-sm">
                Enter your topic, select your format, and hit <strong>Generate</strong> to produce engaging content tailored to your target audience.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reusable Pro/Agency Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        toolName="AI Content Generator Studio"
        featureName={proFeature}
        tier={proModalTier}
      />
    </div>
  );
}

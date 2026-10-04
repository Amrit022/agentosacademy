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
  ChevronUp
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
  const [proFeature, setProFeature] = useState('');
  const [showMatrix, setShowMatrix] = useState(false);

  const presets = [
    { title: '🎥 AI Video Masterclass', format: 'Twitter / X Thought Leadership Thread', topic: 'How to make AI videos with Runway Gen-3, ElevenLabs, and Midjourney' },
    { title: '🚀 Micro-SaaS Playbook', format: 'Viral LinkedIn Carousel/Post', topic: 'How to build and launch a $5k/month Micro-SaaS tool with zero upfront budget' },
    { title: '📩 High-Ticket Cold Email', format: 'High-Converting Cold Outreach Email', topic: 'Pitching automated AI workflows and web development retainers to US tech agencies' },
    { title: '🎬 YouTube Reel Script', format: 'YouTube / Short-Form Video Script & Storyboard', topic: 'The step-by-step secret to creating faceless viral AI videos in 2026' },
    { title: '📝 Comprehensive SEO Guide', format: 'Comprehensive SEO Blog Post', topic: 'Top 7 AI automation tools every remote business needs to scale in 2026' },
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

  const handleGenerate = () => {
    const isProFormat = format.includes('YouTube') || format.includes('Cold') || format.includes('SEO');
    if (isProFormat) {
      setProFeature(`${format} (Pro Deliverable Engine)`);
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

  const handleProFeatureClick = (name: string) => {
    setProFeature(name);
    setShowProModal(true);
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
              <Crown className="w-3 h-3 text-amber-400" /> 60+ Pro Features
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">AI Content Generator Studio</h1>
          <p className="text-xs text-slate-400 mt-1">
            Produce publish-ready viral social posts, long-form SEO guides, and high-converting cold email pitches.
          </p>
        </div>

        <button 
          type="button"
          onClick={() => setShowMatrix(!showMatrix)}
          className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-2 transition cursor-pointer self-start md:self-auto"
        >
          <Crown className="w-3.5 h-3.5 text-amber-400" />
          <span>{showMatrix ? 'Hide Pro Feature Catalog' : '👑 Browse 60+ Pro Capabilities'}</span>
        </button>
      </div>

      {/* EXPANDABLE 60+ PRO AI CAPABILITIES MATRIX */}
      {showMatrix && (
        <div className="glass p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-amber-950/10 space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2 text-amber-300 font-black text-base">
                <Crown className="w-5 h-5 text-amber-400" />
                <span>OmniStack Pro Copywriting Infrastructure (60+ AI Capabilities)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                From long-form 3,000-word guides to multi-channel cold outreach sequences and humanizer shields.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setProFeature('All 60+ Pro AI Copywriting Engines');
                setShowProModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition shrink-0 cursor-pointer"
            >
              Unlock All 60+ Features for $9/mo
            </button>
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
                      onClick={() => f.badge === 'Pro' && handleProFeatureClick(f.name)}
                      className={`p-2.5 rounded-xl border text-left transition flex items-start justify-between gap-2 cursor-pointer ${
                        f.badge === 'Pro' 
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

                      <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0 ${
                        f.badge === 'Pro' 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5' 
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {f.badge === 'Pro' ? <><Crown className="w-2.5 h-2.5" /> PRO</> : 'FREE'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Editor & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Inputs (5 cols) */}
        <div className="lg:col-span-5 glass p-6 sm:p-7 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" /> Topic & Format Controls
            </span>
            <button
              type="button"
              onClick={handleRandomTopic}
              className="text-[11px] text-pink-300 hover:text-pink-200 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Dices className="w-3.5 h-3.5" /> Random Topic
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">What do you want to write about?</label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How to scale a modern freelance agency to $10,000/month..."
              className="w-full px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-pink-500 leading-relaxed font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Deliverable Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0d1424] border border-white/10 text-white text-xs outline-none focus:border-pink-500 font-medium"
            >
              <option value="Twitter / X Thought Leadership Thread">Twitter / X Thought Leadership Thread (Free)</option>
              <option value="Viral LinkedIn Carousel/Post">Viral LinkedIn Carousel / Narrative (Free)</option>
              <option value="High-Converting Cold Outreach Email">High-Converting Cold Email (🔒 Pro)</option>
              <option value="YouTube / Short-Form Video Script & Storyboard">YouTube / TikTok Script & Hooks (🔒 Pro)</option>
              <option value="Comprehensive SEO Blog Post">Comprehensive SEO Blog Post (🔒 Pro)</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Voice Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#0d1424] border border-white/10 text-white text-xs outline-none focus:border-pink-500"
              >
                <option value="Inspirational & Tactical">Inspirational & Tactical</option>
                <option value="Executive & Direct">Executive & Direct</option>
                <option value="Humorous & Punchy">Humorous & Punchy</option>
                <option value="Scientific & Analytical">Scientific & Analytical</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Audience</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. B2B Founders"
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-pink-500 font-medium"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1.5">Quick Viral Presets:</label>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p) => (
                <button
                  key={p.title}
                  type="button"
                  onClick={() => {
                    setFormat(p.format);
                    setTopic(p.topic);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-[11px] text-slate-300 hover:text-white transition cursor-pointer"
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 transition flex items-center justify-center gap-2 hover:opacity-95 cursor-pointer disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <PenTool className="w-4 h-4" />}
            <span>{loading ? 'Synthesizing with AI...' : 'Generate High-Converting Copy'}</span>
          </button>
        </div>

        {/* Right Output: Results (7 cols) */}
        <div className="lg:col-span-7 glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <FileText className="w-4 h-4 text-pink-400" />
              <span>Generated Content Output</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-mono">
                {wordCount} words &bull; ~{readingTime} min read
              </span>
              {output && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              )}
            </div>
          </div>

          {output ? (
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap select-all max-h-[500px] overflow-y-auto">
              {output}
            </div>
          ) : (
            <div className="py-24 text-center space-y-2 text-slate-500">
              <Sparkles className="w-8 h-8 mx-auto text-slate-600" />
              <div className="text-xs font-bold text-slate-400">Ready to synthesize content</div>
              <div className="text-[11px]">Click "Generate High-Converting Copy" on the left to start.</div>
            </div>
          )}
        </div>
      </div>

      {/* Reusable Pro Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        toolName="AI Content Generator Studio"
        featureName={proFeature}
      />
    </div>
  );
}

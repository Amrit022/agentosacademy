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
  Lightbulb
} from 'lucide-react';
import { generateCopy } from '@/lib/ai-engine';

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
    // Simulate real AI synthesis stream delay
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
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Tool #3</span>
          <span className="text-[10px] text-pink-300 bg-pink-500/10 px-2 py-0.5 rounded-full font-bold">
            Dynamic AI Generation Engine
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">AI Blog, Social & Video Scripting Suite</h1>
        <p className="text-xs text-slate-400 mt-1">
          Produce viral LinkedIn posts, Twitter threads, video production storyboards, high-converting cold pitches, and SEO articles customized to any topic.
        </p>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 mr-2 flex items-center gap-1.5 font-bold">
          <Flame className="w-3.5 h-3.5 text-accent-400" /> Popular Prompts:
        </span>
        {presets.map((p, i) => (
          <button
            key={i}
            onClick={() => {
              setTopic(p.topic);
              setFormat(p.format);
            }}
            className="px-3 py-1.5 rounded-xl glass hover:bg-white/10 text-xs text-slate-300 hover:text-white border border-white/5 transition font-semibold"
          >
            {p.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (5 cols) */}
        <div className="lg:col-span-5 glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" /> Copywriting Parameters
            </h2>
            <button
              onClick={handleRandomTopic}
              className="text-[11px] text-pink-300 hover:text-pink-200 flex items-center gap-1 font-semibold transition"
              title="Load random topic inspiration"
            >
              <Dices className="w-3.5 h-3.5" /> Random Topic
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Topic / Central Narrative (Type anything!)
            </label>
            <textarea 
              rows={3}
              value={topic} 
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. how to make ai videos, how to start micro saas, tips for cold emailing..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-pink-500 leading-relaxed font-sans placeholder:text-slate-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Deliverable Format</label>
              <select 
                value={format} 
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-xs outline-none focus:border-pink-500 font-medium"
              >
                <option>Twitter / X Thought Leadership Thread (Free)</option>
                <option>Viral LinkedIn Carousel/Post (Free)</option>
                <option>YouTube / Short-Form Video Script & Storyboard (🔒 Pro)</option>
                <option>High-Converting Cold Outreach Email (🔒 Pro)</option>
                <option>Comprehensive SEO Blog Post (🔒 Pro)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Tone & Persona</label>
              <select 
                value={tone} 
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#090d18] border border-white/10 text-white text-xs outline-none focus:border-pink-500 font-medium"
              >
                <option>Inspirational & Tactical</option>
                <option>Authoritative Tech Founder</option>
                <option>Direct & High-Converting B2B</option>
                <option>Educational Step-by-Step Guide</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Audience</label>
            <input 
              type="text" 
              value={targetAudience} 
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-pink-500 font-medium"
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-brand-500 to-accent-500 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 hover:opacity-95 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Content with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> Generate Copy with AI Engine
              </>
            )}
          </button>
        </div>

        {/* Right Output Canvas (7 cols) */}
        <div className="lg:col-span-7 glass p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col justify-between min-h-[520px]">
          <div>
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-200">
                  <PenTool className="w-3.5 h-3.5 text-pink-400" />
                  <span>Output Workspace</span>
                </span>
                <span className="flex items-center gap-1"><AlignLeft className="w-3 h-3" /> {wordCount} words</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {readingTime}m read</span>
              </div>

              {output && (
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-1 transition"
                    title="Regenerate another angle"
                  >
                    <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                    <span className="hidden sm:inline">Regenerate</span>
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/30 text-xs text-brand-300 flex items-center gap-1.5 transition font-bold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Copy'}</span>
                  </button>
                </div>
              )}
            </div>

            {output ? (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 max-h-[600px] overflow-y-auto">
                <pre className="text-xs font-sans text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-28 text-center text-slate-500 space-y-3">
                <Sparkles className="w-8 h-8 opacity-40 text-pink-400" />
                <p className="text-xs max-w-sm">
                  Type your topic (e.g. <span className="text-pink-400 font-medium">"how to make ai videos"</span>), select your deliverable format, and click <span className="text-white font-semibold">"Generate Copy with AI Engine"</span>.
                </p>
                <button
                  onClick={handleGenerate}
                  className="mt-2 px-4 py-2 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-xs text-pink-300 font-semibold transition"
                >
                  ⚡ Click to generate "{topic}" now
                </button>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Dynamic Generative Model Active
            </span>
            <span>OmniStack AI Engine v3.5 (Gemini 2.5 Pro)</span>
          </div>
        </div>
      </div>
      {/* Reusable Pro Upgrade Modal */}
      <ProUpgradeModal 
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        toolName="AI Content & Video Scripting Suite"
        featureName={proFeature}
      />
    </div>
  );
}

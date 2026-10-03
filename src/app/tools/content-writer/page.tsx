'use client';

import { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw, 
  Layers, 
  BookOpen, 
  FileText, 
  Mail, 
  Share2, 
  Clock, 
  AlignLeft,
  Flame,
  Award
} from 'lucide-react';

export default function ContentWriterPage() {
  const [topic, setTopic] = useState('How developers in India can build $5k/month Micro-SaaS for global clients');
  const [format, setFormat] = useState('Viral LinkedIn Carousel/Post');
  const [tone, setTone] = useState('Inspirational & Tactical');
  const [targetAudience, setTargetAudience] = useState('Engineers, Freelancers & Solopreneurs');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const presets = [
    { title: 'SaaS Launch Playbook', format: 'Viral LinkedIn Carousel/Post', topic: 'How to launch a Micro-SaaS tool with $0 budget and earn in USD from India' },
    { title: 'Cold Client Email', format: 'High-Converting Cold Outreach Email', topic: 'Offering full-stack web and AI workflow automation to US agencies' },
    { title: 'SEO Blog Blueprint', format: 'Comprehensive SEO Blog Post', topic: 'Top 7 AI automation tools every remote business needs in 2026' },
    { title: 'Twitter/X 7-Tweet Thread', format: 'Twitter / X Thought Leadership Thread', topic: 'Why the next generation of SaaS companies will be built by 1-person teams' },
  ];

  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;
  const charCount = output.length;
  const readingTime = Math.ceil(wordCount / 200);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      if (format.includes('LinkedIn')) {
        setOutput(`🔥 90% of developers in India make the exact same mistake:\n\nThey exchange 40 hours/week for client hourly wages.\n\nHere is how you break the ceiling in 2026 and build scalable USD income:\n\n1. Stop building massive enterprise platforms.\nBuild focused single-purpose tools (like an invoice generator, review collector, or QR tracking engine).\n\n2. Ship with modern speed.\nUse Next.js 14, Tailwind CSS, and edge hosting on Vercel or Render. Zero server management.\n\n3. Leverage global currency arbitration.\nA $9/month subscription in the US or Europe is a cup of coffee. To a solo founder in India, 100 subscribers = $900/mo (₹75,000+) in pure recurring revenue.\n\n4. Distribution is 80% of the game.\nDon't wait for users to find you. Embed your tools into directories, share walkthroughs on LinkedIn, and offer free tiers.\n\nWhat micro-tool are you launching this month?\n\nDrop your ideas below 👇\n\n#MicroSaaS #WebDev #BuildInPublic #AgentOSAcademy #GlobalFreelance`);
      } else if (format.includes('Cold')) {
        setOutput(`Subject: Quick question regarding {{Company}}'s marketing deliverables\n\nHi {{FirstName}},\n\nI noticed you are scaling your marketing campaigns at {{Company}}. Most agencies lose 3-5 hours weekly formatting client deliverables, tracking link clicks, and collecting testimonial proof.\n\nWe built an automated micro-suite at AgentOS Academy that handles:\n- Instant branded bio link pages with live click analytics\n- Automated HTML email signatures with booking links\n- Responsive review embed widgets\n\nWould you be open to a 2-minute video showing how this could save your team 15+ hours this month?\n\nBest regards,\nAmrit Gupta\nAgentOS Academy`);
      } else if (format.includes('Twitter')) {
        setOutput(`1/7 The golden era of the 1-person software company is officially here.\n\nHere is the exact playbook to build a $5,000/month digital business from India for the global market 🧵👇\n\n2/7 Step 1: The Micro-SaaS Model.\nForget complex databases and 6-month roadmaps. Pick a single task: an ATS resume generator, email signature creator, or link shortener.\n\n3/7 Step 2: The Modern Stack.\nNext.js 14 App Router + Tailwind CSS + Lucide Icons + Edge Hosting (Vercel).\nZero server management cost.\n\n4/7 Step 3: Global Currency Leverage.\nA $9/month subscription is negligible for US/EU professionals. 500 subscribers = $4,500/mo (₹3.8 Lakhs/mo).\n\n5/7 Step 4: SEO & Programmatic Distribution.\nBuild free calculators and embeddable widgets that rank automatically on Google.\n\n6/7 Step 5: Frictionless Checkout.\nStripe for global USD cards, and Razorpay for local Indian UPI.\n\n7/7 What tool are you building this weekend?\n\nFollow @Amrit022 for daily SaaS breakdowns!`);
      } else {
        setOutput(`# Top 7 AI Automation Tools Every Remote Business Needs in 2026\n\nIn today's digital economy, speed and automation dictate market leadership. Remote teams and solo founders can no longer afford manual operational friction.\n\n### 1. ATS-Compliant Candidate Documentation\nRecruiting software filters over 75% of incoming resumes before a human recruiter reviews them. Modern resume builders implement semantic keyword matching and single-column ATS layouts.\n\n### 2. Zero-Friction Social Proof Widgets\nCustomer testimonials represent the single highest conversion driver on SaaS landing pages. Automated review collection widgets allow businesses to harvest reviews asynchronously.\n\n### 3. Edge-Hosted Micro-Tools\nHosting web applications across global edge CDNs reduces bounce rates by upwards of 34%.\n\n### Conclusion\nBy consolidating tools into an integrated platform like AgentOS Academy, modern founders eliminate subscription bloat and scale operational output.`);
      }
      setLoading(false);
    }, 600);
  };

  const handleCopy = () => {
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
            Copywriting & Prompt Transformer
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">AI Blog, Social & Copywriting Suite</h1>
        <p className="text-xs text-slate-400 mt-1">
          Produce viral LinkedIn posts, Twitter threads, high-converting cold pitches, and SEO articles in seconds.
        </p>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 mr-2 flex items-center gap-1.5 font-bold">
          <Flame className="w-3.5 h-3.5 text-accent-400" /> High-Engagement Formulas:
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
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Sparkles className="w-4 h-4 text-pink-400" /> Copywriting Parameters
          </h2>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Topic / Central Narrative</label>
            <textarea 
              rows={3}
              value={topic} 
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-pink-500 leading-relaxed font-sans"
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
                <option>Viral LinkedIn Carousel/Post</option>
                <option>High-Converting Cold Outreach Email</option>
                <option>Twitter / X Thought Leadership Thread</option>
                <option>Comprehensive SEO Blog Post</option>
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
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 via-brand-500 to-accent-500 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 hover:opacity-95 transition"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Content...
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
                <button 
                  onClick={handleCopy}
                  className="px-3.5 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/30 text-xs text-brand-300 flex items-center gap-1.5 transition font-bold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy Copy'}</span>
                </button>
              )}
            </div>

            {output ? (
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <pre className="text-xs font-sans text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {output}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-28 text-center text-slate-500 space-y-3">
                <Sparkles className="w-8 h-8 opacity-40 text-pink-400" />
                <p className="text-xs max-w-sm">
                  Select a template or type your central thesis, then click "Generate Copy with AI Engine".
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
            <span>Optimized for Viral Algorithm Reach</span>
            <span>AgentOS Engine v2</span>
          </div>
        </div>
      </div>
    </div>
  );
}

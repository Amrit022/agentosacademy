'use client';

import { useState } from 'react';
import { 
  Scissors, 
  Copy, 
  Check, 
  BarChart2, 
  Globe2, 
  QrCode, 
  ArrowRight, 
  ExternalLink,
  Smartphone,
  Laptop,
  Tablet,
  Download,
  Share2
} from 'lucide-react';

export default function UrlShortenerPage() {
  const [destinationUrl, setDestinationUrl] = useState('https://agentosacademy.com/tools/resume-builder');
  const [customSlug, setCustomSlug] = useState('free-resume');
  const [shortUrl, setShortUrl] = useState('https://agentosacademy.com/s/free-resume');
  const [copied, setCopied] = useState(false);
  const [clicks, setClicks] = useState(1480);

  const [history, setHistory] = useState([
    { slug: 'free-resume', dest: 'https://agentosacademy.com/tools/resume-builder', clicks: 1480, created: 'Today', status: 'Active' },
    { slug: 'amrit-bio', dest: 'https://agentosacademy.com/u/amritgupta', clicks: 824, created: 'Yesterday', status: 'Active' },
    { slug: 'upwork-portfolio', dest: 'https://upwork.com/freelancers/profile', clicks: 312, created: '3 days ago', status: 'Active' },
    { slug: 'youtube-demo', dest: 'https://youtube.com/watch?v=agentos', clicks: 184, created: '5 days ago', status: 'Active' },
  ]);

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationUrl) return;
    const slug = customSlug.trim() || Math.random().toString(36).substring(6);
    const newShort = `https://agentosacademy.com/s/${slug}`;
    setShortUrl(newShort);
    setHistory([
      { slug, dest: destinationUrl, clicks: 1, created: 'Just now', status: 'Active' },
      ...history
    ]);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Tool #6</span>
          <span className="text-[10px] text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full font-bold">
            Custom Domains & Geo Tracking
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">URL Shortener & Geographic Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">
          Generate branded short links with instant vector QR codes and geographic visitor metrics.
        </p>
      </div>

      {/* Main Shortener Bar */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <form onSubmit={handleShorten} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-7">
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Destination Long URL</label>
            <input 
              type="url" 
              required
              value={destinationUrl} 
              onChange={(e) => setDestinationUrl(e.target.value)}
              placeholder="https://yourwebsite.com/long-page-link"
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-bold text-slate-300 mb-1.5">Custom Alias Slug</label>
            <div className="flex items-center rounded-2xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs text-slate-400">
              <span className="font-mono">/s/</span>
              <input 
                type="text" 
                value={customSlug} 
                onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                placeholder="my-campaign"
                className="bg-transparent text-white outline-none font-bold ml-1 w-full font-mono"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <button 
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 hover:opacity-95 transition"
            >
              <Scissors className="w-4 h-4" /> Shorten Link
            </button>
          </div>
        </form>
      </div>

      {/* Results & Live Analytics (3 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Short Link Card */}
        <div className="glass p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400">Generated Short URL</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">Active</span>
            </div>
            <div className="text-lg font-black text-cyan-300 font-mono break-all">{shortUrl}</div>
            <div className="text-[11px] text-slate-400 mt-2 truncate font-mono">
              Redirects to: {destinationUrl}
            </div>
          </div>

          <button 
            onClick={copyLink}
            className="mt-6 w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-2 border border-white/10 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Short Link'}
          </button>
        </div>

        {/* QR Code Card */}
        <div className="glass p-6 sm:p-7 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center">
          <div className="p-3.5 bg-white rounded-2xl shadow-2xl mb-3">
            <QrCode className="w-20 h-20 text-slate-950" />
          </div>
          <div className="text-xs font-bold text-white">Scannable Vector QR Code</div>
          <div className="text-[11px] text-slate-400 mt-1">High-contrast for packaging, flyers, and business cards</div>
        </div>

        {/* Geographic Visitor Breakdown */}
        <div className="glass p-6 sm:p-7 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> Traffic Locations
            </span>
            <span className="text-xs font-bold text-emerald-400">+{clicks} total clicks</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>🇮🇳 India</span>
              <span className="font-bold text-white">52% (770 clicks)</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full w-[52%]" />
            </div>

            <div className="flex justify-between text-slate-300 pt-1">
              <span>🇺🇸 United States</span>
              <span className="font-bold text-white">29% (429 clicks)</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-400 h-full w-[29%]" />
            </div>

            <div className="flex justify-between text-slate-300 pt-1">
              <span>🇬🇧 United Kingdom</span>
              <span className="font-bold text-white">14% (207 clicks)</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full w-[14%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Campaign Links Table */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Campaign Links Directory</h3>
          <span className="text-[11px] text-slate-400">{history.length} active links</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-400">
                <th className="pb-3 font-bold">Short Link</th>
                <th className="pb-3 font-bold">Original Destination</th>
                <th className="pb-3 font-bold text-right">Total Clicks</th>
                <th className="pb-3 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((h, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 font-bold text-cyan-300 font-mono">
                    agentosacademy.com/s/{h.slug}
                  </td>
                  <td className="py-3.5 text-slate-400 max-w-xs truncate font-mono">
                    {h.dest}
                  </td>
                  <td className="py-3.5 text-right font-black text-white">
                    {h.clicks}
                  </td>
                  <td className="py-3.5 text-right text-emerald-400 font-bold">
                    {h.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Scissors, Copy, Check, BarChart2, Globe2, QrCode, ArrowRight, ExternalLink } from 'lucide-react';

export default function UrlShortenerPage() {
  const [destinationUrl, setDestinationUrl] = useState('https://agentosacademy.com/tools/resume-builder');
  const [customSlug, setCustomSlug] = useState('free-resume');
  const [shortUrl, setShortUrl] = useState('https://agentosacademy.com/s/free-resume');
  const [copied, setCopied] = useState(false);
  const [clicks, setClicks] = useState(1480);

  const [history, setHistory] = useState([
    { slug: 'free-resume', dest: 'https://agentosacademy.com/tools/resume-builder', clicks: 1480, created: 'Today' },
    { slug: 'amrit-bio', dest: 'https://agentosacademy.com/u/amritgupta', clicks: 824, created: 'Yesterday' },
    { slug: 'upwork-portfolio', dest: 'https://upwork.com/freelancers/profile', clicks: 312, created: '3 days ago' },
  ]);

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationUrl) return;
    const slug = customSlug.trim() || Math.random().toString(36).substring(6);
    const newShort = `https://agentosacademy.com/s/${slug}`;
    setShortUrl(newShort);
    setHistory([
      { slug, dest: destinationUrl, clicks: 0, created: 'Just now' },
      ...history
    ]);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Tool #6</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">URL Shortener & Click Analytics</h1>
        <p className="text-xs text-slate-400 mt-1">
          Generate branded short links with instant vector QR codes and geographic visitor metrics.
        </p>
      </div>

      {/* Main Shortener Bar */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 mb-8 space-y-4">
        <form onSubmit={handleShorten} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
          <div className="md:col-span-7">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Destination Long URL</label>
            <input 
              type="url" 
              required
              value={destinationUrl} 
              onChange={(e) => setDestinationUrl(e.target.value)}
              placeholder="https://yourwebsite.com/long-page-link"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-cyan-500"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Custom Alias (optional)</label>
            <div className="flex items-center rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-xs text-slate-400">
              <span>/s/</span>
              <input 
                type="text" 
                value={customSlug} 
                onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                placeholder="my-link"
                className="bg-transparent text-white outline-none font-semibold ml-1 w-full"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <button 
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-1.5 hover:opacity-95 transition"
            >
              <Scissors className="w-3.5 h-3.5" /> Shorten URL
            </button>
          </div>
        </form>
      </div>

      {/* Results & Live Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Active Short Link Card */}
        <div className="glass p-6 rounded-3xl border border-white/10 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-2">Active Short Link</div>
            <div className="text-base font-extrabold text-cyan-300 break-all">{shortUrl}</div>
            <div className="text-[11px] text-slate-400 mt-2 truncate">
              → {destinationUrl}
            </div>
          </div>

          <button 
            onClick={copyLink}
            className="mt-6 w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-2 border border-white/10 transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Short Link'}
          </button>
        </div>

        {/* QR Code Card */}
        <div className="glass p-6 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center">
          <div className="p-3 bg-white rounded-2xl shadow-xl mb-3">
            <QrCode className="w-20 h-20 text-slate-950" />
          </div>
          <div className="text-xs font-bold text-white">Scannable QR Code</div>
          <div className="text-[11px] text-slate-400 mt-1">Ready for print, menus, business cards & posters</div>
        </div>

        {/* Geographic Breakdown Card */}
        <div className="glass p-6 rounded-3xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> Geographic Visitors
            </span>
            <span className="text-xs font-bold text-emerald-400">+{clicks} clicks</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>🇮🇳 India</span>
              <span className="font-semibold text-white">52% (770 clicks)</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-cyan-400 h-full w-[52%]" />
            </div>

            <div className="flex justify-between text-slate-300 pt-1">
              <span>🇺🇸 United States</span>
              <span className="font-semibold text-white">29% (429 clicks)</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-400 h-full w-[29%]" />
            </div>

            <div className="flex justify-between text-slate-300 pt-1">
              <span>🇬🇧 United Kingdom</span>
              <span className="font-semibold text-white">14% (207 clicks)</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full w-[14%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Links History Table */}
      <div className="glass p-6 rounded-3xl border border-white/10 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider">Recent Campaign Links</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-slate-400">
                <th className="pb-3 font-semibold">Short Link</th>
                <th className="pb-3 font-semibold">Original Destination</th>
                <th className="pb-3 font-semibold text-right">Clicks</th>
                <th className="pb-3 font-semibold text-right">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {history.map((h, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02]">
                  <td className="py-3 font-bold text-cyan-300">
                    agentosacademy.com/s/{h.slug}
                  </td>
                  <td className="py-3 text-slate-400 max-w-xs truncate">
                    {h.dest}
                  </td>
                  <td className="py-3 text-right font-semibold text-white">
                    {h.clicks}
                  </td>
                  <td className="py-3 text-right text-slate-500">
                    {h.created}
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

'use client';

import { useState } from 'react';
import { Sparkles, Download, Check, Eye, Plus, Trash2, Printer } from 'lucide-react';

export default function ResumeBuilderPage() {
  const [name, setName] = useState('Amrit Gupta');
  const [title, setTitle] = useState('Full Stack AI Architect & SaaS Founder');
  const [email, setEmail] = useState('amrit@agentosacademy.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Bengaluru, India (Open to Global Remote)');
  const [summary, setSummary] = useState(
    'Innovative Software Engineer specializing in Next.js, Node.js, AI workflows, and cloud-native systems. Proven track record architecting products that scale to thousands of users with 99.9% uptime.'
  );
  const [skills, setSkills] = useState('React, Next.js, TypeScript, Node.js, Tailwind CSS, PostgreSQL, Docker, AWS, AI Workflows');
  const [experiences, setExperiences] = useState([
    {
      role: 'Founding Engineer',
      company: 'AgentOS Academy',
      period: '2025 - Present',
      points: 'Architected and launched a 6-in-1 AI micro-SaaS platform serving global creators and remote engineers. Optimized edge rendering latency by 45%.'
    },
    {
      role: 'Senior Software Engineer',
      company: 'Cloud Scale Tech',
      period: '2023 - 2025',
      points: 'Developed high-throughput API endpoints and automated CI/CD deployment pipelines on Vercel and Render.'
    }
  ]);

  const handlePrint = () => {
    window.print();
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        role: 'Software Developer',
        company: 'Global Tech Inc',
        period: '2022 - 2023',
        points: 'Built modular frontend components and integrated secure payment gateways.'
      }
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-400">Tool #1</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">AI Resume & Cover Letter Builder</h1>
          <p className="text-xs text-slate-400 mt-1">Formatted with strict single-column ATS guidelines. Export ready for global remote opportunities.</p>
        </div>
        <button 
          onClick={handlePrint}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-bold text-xs shadow-lg shadow-brand-500/20 flex items-center gap-2 hover:opacity-90 transition"
        >
          <Printer className="w-4 h-4" /> Export / Print to PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Editor Form */}
        <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/5 pb-3">
            <Sparkles className="w-4 h-4 text-brand-400" /> Candidate Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Job Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Location</label>
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Executive Summary</label>
            <textarea 
              rows={3} 
              value={summary} 
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Technical Skills (comma-separated)</label>
            <input 
              type="text" 
              value={skills} 
              onChange={(e) => setSkills(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-slate-300">Professional Experience</label>
              <button 
                onClick={addExperience} 
                className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Experience
              </button>
            </div>

            <div className="space-y-3">
              {experiences.map((exp, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <input 
                      type="text" 
                      value={exp.role} 
                      onChange={(e) => {
                        const next = [...experiences];
                        next[idx].role = e.target.value;
                        setExperiences(next);
                      }}
                      className="bg-transparent text-xs font-bold text-white outline-none w-1/2"
                      placeholder="Role Title"
                    />
                    <button onClick={() => removeExperience(idx)} className="text-slate-500 hover:text-rose-400 p-1">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={exp.company} 
                      onChange={(e) => {
                        const next = [...experiences];
                        next[idx].company = e.target.value;
                        setExperiences(next);
                      }}
                      className="bg-transparent text-[11px] text-brand-300 outline-none w-1/2"
                      placeholder="Company"
                    />
                    <input 
                      type="text" 
                      value={exp.period} 
                      onChange={(e) => {
                        const next = [...experiences];
                        next[idx].period = e.target.value;
                        setExperiences(next);
                      }}
                      className="bg-transparent text-[11px] text-slate-400 outline-none w-1/2 text-right"
                      placeholder="Dates"
                    />
                  </div>
                  <textarea 
                    rows={2} 
                    value={exp.points} 
                    onChange={(e) => {
                      const next = [...experiences];
                      next[idx].points = e.target.value;
                      setExperiences(next);
                    }}
                    className="w-full bg-transparent text-[11px] text-slate-300 outline-none border-t border-white/5 pt-1.5"
                    placeholder="Impact bullet points"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Resume Sheet Preview (Print-optimized) */}
        <div className="glass p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-950/90 shadow-2xl text-slate-900">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-slate-800 space-y-6">
            {/* Resume Header */}
            <div className="border-b-2 border-slate-900 pb-4">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">{name || 'Your Full Name'}</h3>
              <div className="text-xs font-bold text-indigo-700 tracking-wide mt-0.5 uppercase">{title || 'Your Target Role'}</div>
              <div className="text-[11px] text-slate-600 mt-2 flex flex-wrap gap-x-3 gap-y-1">
                <span>✉ {email}</span>
                <span>☎ {phone}</span>
                <span>📍 {location}</span>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Executive Profile
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
            </div>

            {/* Core Competencies */}
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Key Skills & Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {skills.split(',').map((s, idx) => (
                  <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                    {s.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
                Professional Experience
              </h4>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{exp.period}</span>
                    </div>
                    <div className="text-[11px] font-semibold text-indigo-700">{exp.company}</div>
                    <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-[9px] text-slate-400 pt-4 border-t border-slate-200">
              Verified ATS Compliant · Built on agentosacademy.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

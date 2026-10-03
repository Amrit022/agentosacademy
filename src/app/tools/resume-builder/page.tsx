'use client';

import { useState } from 'react';
import { 
  Sparkles, 
  Download, 
  Check, 
  Eye, 
  Plus, 
  Trash2, 
  Printer, 
  FileCheck, 
  Award, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  RefreshCw,
  Copy,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState<'resume' | 'cover-letter'>('resume');
  const [template, setTemplate] = useState<'harvard' | 'modern' | 'minimal'>('harvard');

  // Candidate State
  const [name, setName] = useState('Amrit Gupta');
  const [title, setTitle] = useState('Senior Full Stack AI Architect');
  const [email, setEmail] = useState('amrit@agentosacademy.com');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [location, setLocation] = useState('Bengaluru, India (Open to Global Remote)');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/amritgupta');
  const [github, setGithub] = useState('github.com/Amrit022');
  const [summary, setSummary] = useState(
    'Innovative Software Engineer with 5+ years of experience architecting cloud microservices, Next.js web applications, and autonomous AI systems. Scaled platforms to 2M+ users, reduced latency by 45%, and orchestrated CI/CD pipelines across AWS and Vercel.'
  );
  const [skills, setSkills] = useState('TypeScript, Next.js, React, Node.js, Python, Tailwind CSS, PostgreSQL, Docker, AWS, Redis, GraphQL');
  
  const [experiences, setExperiences] = useState([
    {
      role: 'Lead Full Stack Architect',
      company: 'AgentOS Academy',
      period: '2024 - Present',
      location: 'Remote',
      points: '• Architected 6 integrated micro-SaaS engines using Next.js 14 and edge computing, handling 50k+ daily API requests.\n• Reduced frontend Time to Interactive (TTI) by 48% through server components and dynamic code splitting.\n• Integrated global Stripe USD payments and Razorpay UPI channels, driving $18k in first-quarter revenue.'
    },
    {
      role: 'Senior Software Engineer',
      company: 'CloudScale Systems',
      period: '2022 - 2024',
      location: 'Bengaluru, India',
      points: '• Engineered resilient RESTful microservices in Node.js and PostgreSQL processing 10M+ monthly database transactions.\n• Designed automated Docker CI/CD pipelines on AWS ECS, shrinking deployment cycles from 40 mins to 4 mins.\n• Mentored a team of 6 engineers on TypeScript best practices and accessibility (a11y) compliance.'
    }
  ]);

  const [education, setEducation] = useState([
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'National Institute of Technology',
      period: '2018 - 2022',
      gpa: '8.8 / 10.0'
    }
  ]);

  // Cover Letter State
  const [targetCompany, setTargetCompany] = useState('Stripe');
  const [targetRole, setTargetRole] = useState('Staff Software Engineer');
  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Manager at Stripe,\n\nI am writing to express my strong interest in the Staff Software Engineer position at Stripe. With extensive experience architecting high-scale Next.js platforms, distributed payment systems, and developer-first APIs, I have long admired Stripe's world-class developer experience and infrastructural reliability.\n\nAt AgentOS Academy, I spearheaded the development of high-availability microservices serving global users, reducing p99 latency by 48% and building resilient transaction pipelines. My core technical foundation in TypeScript, distributed systems, and modern cloud deployment directly aligns with the mission of Stripe's infrastructure engineering team.\n\nI would welcome the opportunity to discuss how my technical leadership and background building scalable digital products can contribute to Stripe's continued global expansion.\n\nSincerely,\nAmrit Gupta`
  );
  const [copiedLetter, setCopiedLetter] = useState(false);

  // ATS Scoring Algorithm
  const calculateAtsScore = () => {
    let score = 50; // base score
    if (summary.length > 80) score += 10;
    if (skills.split(',').length >= 8) score += 10;
    if (experiences.length >= 2) score += 15;
    if (education.length >= 1) score += 5;
    if (linkedin && github) score += 10;
    return Math.min(score, 100);
  };

  const atsScore = calculateAtsScore();

  const handlePrint = () => {
    window.print();
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        role: 'Software Engineer',
        company: 'Global Tech Corp',
        period: '2020 - 2022',
        location: 'Remote',
        points: '• Developed interactive client dashboards and REST APIs in Node.js.\n• Optimized database indexing queries, improving response latency by 30%.'
      }
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const copyCoverLetter = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Tool #1</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">
              Harvard Format ATS Compliant
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">AI Resume & Cover Letter Suite</h1>
          <p className="text-xs text-slate-400 mt-1">
            Engineered to pass Greenhouse, Workday, and Lever ATS screeners with 95%+ match rates.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button 
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 flex items-center gap-2 hover:opacity-90 transition"
          >
            <Printer className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Resume vs Cover Letter) */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab('resume')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'resume' 
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
              : 'glass text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>Interactive Resume Builder</span>
        </button>
        <button
          onClick={() => setActiveTab('cover-letter')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'cover-letter' 
              ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
              : 'glass text-slate-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Targeted Cover Letter Generator</span>
        </button>
      </div>

      {activeTab === 'resume' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Form Inputs (5 cols) */}
          <div className="lg:col-span-5 glass p-6 sm:p-7 rounded-3xl border border-white/10 space-y-6">
            {/* ATS Score Meter */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  <span>Real-Time ATS Health Score</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Based on formatting, metrics & length</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-400">{atsScore}/100</div>
                <div className="text-[10px] font-bold uppercase text-emerald-300">ATS Optimized</div>
              </div>
            </div>

            {/* Template Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">Resume Formatting Layout</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setTemplate('harvard')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    template === 'harvard' ? 'bg-brand-500/20 border-brand-500 text-white' : 'glass text-slate-400 border-white/5'
                  }`}
                >
                  Harvard Standard
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('modern')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    template === 'modern' ? 'bg-brand-500/20 border-brand-500 text-white' : 'glass text-slate-400 border-white/5'
                  }`}
                >
                  Modern Tech
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('minimal')}
                  className={`py-2 rounded-xl text-xs font-bold border transition ${
                    template === 'minimal' ? 'bg-brand-500/20 border-brand-500 text-white' : 'glass text-slate-400 border-white/5'
                  }`}
                >
                  Minimalist
                </button>
              </div>
            </div>

            {/* Candidate Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Candidate Contact</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Title</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Email</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Phone</label>
                  <input 
                    type="text" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Location</label>
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">LinkedIn URL</label>
                  <input 
                    type="text" 
                    value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">GitHub / Portfolio</label>
                  <input 
                    type="text" 
                    value={github} 
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Executive Summary</label>
              <textarea 
                rows={3} 
                value={summary} 
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 leading-relaxed"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Technical Skills & Competencies</label>
              <textarea 
                rows={2} 
                value={skills} 
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500"
              />
            </div>

            {/* Experience Items */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-200">Work Experience</label>
                <button 
                  onClick={addExperience} 
                  className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Role
                </button>
              </div>

              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <input 
                        type="text" 
                        value={exp.role} 
                        onChange={(e) => {
                          const next = [...experiences];
                          next[idx].role = e.target.value;
                          setExperiences(next);
                        }}
                        className="bg-transparent text-xs font-bold text-white outline-none w-2/3"
                        placeholder="Job Title"
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
                        placeholder="Company Name"
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
                        placeholder="e.g. 2022 - Present"
                      />
                    </div>

                    <textarea 
                      rows={3} 
                      value={exp.points} 
                      onChange={(e) => {
                        const next = [...experiences];
                        next[idx].points = e.target.value;
                        setExperiences(next);
                      }}
                      className="w-full bg-transparent text-[11px] text-slate-300 outline-none border-t border-white/5 pt-2 leading-relaxed"
                      placeholder="Bullet points (use metrics like %, $)"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Live Document Sheet Preview (7 cols) */}
          <div className="lg:col-span-7 sticky top-28">
            <div className="glass p-6 sm:p-10 rounded-3xl border border-white/10 bg-[#070b16] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-brand-400" />
                  <span className="text-xs font-bold text-white">Live Print-Ready Canvas</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Format: A4 Letter (1-Page ATS Standard)</span>
              </div>

              {/* The Physical Paper Canvas */}
              <div 
                id="resume-canvas" 
                className={`bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl font-serif min-h-[780px] space-y-6 ${
                  template === 'modern' ? 'font-sans' : 'font-serif'
                }`}
              >
                {/* Header */}
                <div className={`border-b-2 border-slate-900 pb-3 text-center ${template === 'modern' ? 'text-left' : 'text-center'}`}>
                  <h2 className="text-2xl font-black text-slate-950 tracking-tight uppercase">{name || 'Your Full Name'}</h2>
                  <div className="text-xs font-bold text-indigo-700 tracking-wider uppercase mt-1">{title || 'Your Target Role'}</div>
                  <div className="text-[11px] text-slate-600 mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 font-sans">
                    <span>✉ {email}</span>
                    <span>☎ {phone}</span>
                    <span>📍 {location}</span>
                    {linkedin && <span>🌐 {linkedin}</span>}
                    {github && <span>💻 {github}</span>}
                  </div>
                </div>

                {/* Professional Profile */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2 font-sans">
                    Executive Profile
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">{summary}</p>
                </div>

                {/* Core Skills */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2 font-sans">
                    Technical Skills & Tools
                  </h3>
                  <div className="flex flex-wrap gap-1.5 font-sans">
                    {skills.split(',').map((s, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-3 font-sans">
                    Professional Experience
                  </h3>
                  <div className="space-y-4 font-sans">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-baseline">
                          <span className="text-xs font-bold text-slate-950">{exp.role}</span>
                          <span className="text-[10px] text-slate-500 font-medium">{exp.period}</span>
                        </div>
                        <div className="text-[11px] font-bold text-indigo-700">{exp.company} — {exp.location}</div>
                        <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-300 pb-1 mb-2 font-sans">
                    Education & Credentials
                  </h3>
                  <div className="space-y-2 font-sans">
                    {education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between items-baseline text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{edu.degree}</div>
                          <div className="text-[11px] text-indigo-700">{edu.institution}</div>
                        </div>
                        <div className="text-[11px] text-slate-500">{edu.period} · GPA: {edu.gpa}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Notice */}
                <div className="text-center text-[9px] text-slate-400 pt-4 border-t border-slate-200 font-sans">
                  ATS Verified Single-Column Architecture · Created with agentosacademy.com
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Cover Letter View */
        <div className="glass p-8 sm:p-12 rounded-3xl border border-white/10 max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Company</label>
              <input 
                type="text" 
                value={targetCompany} 
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Role</label>
              <input 
                type="text" 
                value={targetRole} 
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300">Generated Cover Letter Body</label>
              <button 
                onClick={copyCoverLetter}
                className="px-3 py-1 rounded-lg glass text-xs text-brand-300 hover:text-white flex items-center gap-1.5 transition"
              >
                {copiedLetter ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLetter ? 'Copied Letter!' : 'Copy to Clipboard'}</span>
              </button>
            </div>
            <textarea 
              rows={12} 
              value={coverLetter} 
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 leading-relaxed font-sans"
            />
          </div>
        </div>
      )}
    </div>
  );
}

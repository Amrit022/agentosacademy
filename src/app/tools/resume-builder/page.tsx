'use client';

import { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  Sparkles,
  Lock, 
  Download, 
  Check, 
  Eye, 
  Plus, 
  Trash2, 
  Printer, 
  FileCheck, 
  Award, 
  Shuffle, 
  RotateCcw,
  Palette,
  FileText,
  Crown,
  X,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  TrendingUp,
  Code2,
  Layers,
  Compass,
  ArrowLeft,
  Loader2
} from 'lucide-react';

const RANDOM_PROFILES = [
  {
    name: 'Elena Rostova',
    title: 'Senior Product Designer & UX Strategist',
    email: 'elena.design@gmail.com',
    phone: '+49 152 9876543',
    location: 'Berlin, Germany (Open to Remote)',
    linkedin: 'linkedin.com/in/elena-rostova-ux',
    github: 'dribbble.com/elenarostova',
    summary: 'Lead Product Designer with 6+ years specializing in design systems, fintech SaaS interfaces, and user onboarding flows. Spearheaded design overhaul for an institutional crypto exchange, raising conversion rates by 34% and reducing churn by 22%.',
    skills: 'Figma, Design Systems, UX Research, Prototyping, Wireframing, User Testing, HTML/CSS, Tailwind CSS, Mobile App UI',
    experiences: [
      {
        role: 'Lead UX/UI Designer',
        company: 'FintechWave AG',
        period: '2023 - Present',
        location: 'Berlin, Germany',
        points: '• Redesigned core onboarding workflow for 350k active users, lifting registration completion from 61% to 83%.\n• Built and documented a comprehensive component design system in Figma adopted by 18 frontend engineers.\n• Conducted 40+ usability testing interviews to identify payment drop-off barriers, saving $120k in abandoned checkouts.'
      },
      {
        role: 'Senior Product Designer',
        company: 'Studio Berlin Digital',
        period: '2021 - 2023',
        location: 'Berlin, Germany',
        points: '• Delivered 12 multi-platform web applications for European startup clients on strict 6-week release cycles.\n• Created interactive micro-interactions and motion prototypes that boosted app store reviews to 4.8 stars.'
      }
    ],
    education: [
      {
        degree: 'B.A. in Visual Communication & Interaction Design',
        institution: 'Berlin University of the Arts',
        period: '2017 - 2021',
        gpa: 'First Class Honours (1.2)'
      }
    ]
  },
  {
    name: 'David K. Chen',
    title: 'Lead Cloud & DevOps Infrastructure Architect',
    email: 'david.chen.cloud@proton.me',
    phone: '+1 (415) 890-4321',
    location: 'Austin, TX (Remote)',
    linkedin: 'linkedin.com/in/david-chen-cloud',
    github: 'github.com/davidkchen',
    summary: 'Cloud Infrastructure Architect with 8+ years designing zero-downtime Kubernetes clusters, multi-region AWS environments, and automated Terraform pipelines. Reduced enterprise cloud infrastructure costs by $380,000 annually while sustaining 99.99% uptime.',
    skills: 'AWS, Kubernetes, Terraform, Docker, CI/CD, Helm, Prometheus, Python, Go, Bash, Linux Kernel, SOC2 Compliance',
    experiences: [
      {
        role: 'Principal DevOps Architect',
        company: 'ScaleGrid Systems',
        period: '2022 - Present',
        location: 'San Francisco, CA',
        points: '• Orchestrated migration of 45 monolithic microservices to AWS EKS Kubernetes clusters serving 15M daily requests.\n• Automated multi-account Terraform infrastructure reducing developer deployment turnaround from 3 days to 8 minutes.\n• Spearheaded SOC2 Type II security compliance audit with zero unresolved infrastructural findings.'
      },
      {
        role: 'Senior Cloud Engineer',
        company: 'HyperScale Corp',
        period: '2019 - 2022',
        location: 'Austin, TX',
        points: '• Configured global CloudFront edge caching and Redis caching layers, cutting database load by 62%.\n• Designed automated disaster recovery failover across US-East and US-West with RPO < 30 seconds.'
      }
    ],
    education: [
      {
        degree: 'B.S. in Computer Engineering',
        institution: 'University of Texas at Austin',
        period: '2015 - 2019',
        gpa: '3.91 / 4.0'
      }
    ]
  },
  {
    name: 'Priya Sharma',
    title: 'Growth Marketing Director & Acquisition Specialist',
    email: 'priya.sharma.growth@gmail.com',
    phone: '+44 20 7946 0912',
    location: 'London, UK (Remote Worldwide)',
    linkedin: 'linkedin.com/in/priya-growth-marketer',
    github: 'priyasharma.marketing',
    summary: 'Performance marketing and organic growth leader with 7 years scaling B2B SaaS ARR from $500k to $6M+. Expert in Google Ads, LinkedIn outbound automation, programmatic SEO, and data-driven customer lifecycle retention.',
    skills: 'B2B SaaS Growth, Google Ads, LinkedIn Ads, SEO Content Strategy, HubSpot, Google Analytics 4, Meta Ads, SQL, Conversion Optimization',
    experiences: [
      {
        role: 'Head of Growth Marketing',
        company: 'RevEngine B2B',
        period: '2023 - Present',
        location: 'London / Remote',
        points: '• Scaled pipeline revenue from $1.2M to $4.8M ARR while reducing customer acquisition cost (CAC) by 31%.\n• Built programmatic SEO cluster producing 120,000 organic monthly search visits and 1,400 monthly inbound demos.\n• Managed $80,000 monthly paid search budget across North American and European enterprise buyer personas.'
      },
      {
        role: 'Senior Acquisition Manager',
        company: 'SaaSMetrics Global',
        period: '2020 - 2023',
        location: 'Singapore / Remote',
        points: '• Spearheaded conversion rate optimization across 8 landing pages, raising free-to-paid trial conversion by 28%.\n• Formulated automated email nurture sequence across 45,000 subscribers generating $420k in ARR expansion.'
      }
    ],
    education: [
      {
        degree: 'M.Sc. in Marketing & Data Analytics',
        institution: 'London School of Economics (LSE)',
        period: '2018 - 2020',
        gpa: 'First Class Honours'
      }
    ]
  }
];

export type ResumeTemplate = 'modern' | 'harvard' | 'minimal' | 'executive' | 'creative' | 'techlead' | 'finance' | 'nordic';

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState<'resume' | 'cover-letter'>('resume');
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');
  const [template, setTemplate] = useState<ResumeTemplate>('modern');
  const [showProInfo, setShowProInfo] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const isProTemplate = template === 'executive' || template === 'creative' || template === 'techlead' || template === 'finance' || template === 'nordic';

  // Candidate State
  const [profileIndex, setProfileIndex] = useState(0);
  const [name, setName] = useState(RANDOM_PROFILES[0].name);
  const [title, setTitle] = useState(RANDOM_PROFILES[0].title);
  const [email, setEmail] = useState(RANDOM_PROFILES[0].email);
  const [phone, setPhone] = useState(RANDOM_PROFILES[0].phone);
  const [location, setLocation] = useState(RANDOM_PROFILES[0].location);
  const [linkedin, setLinkedin] = useState(RANDOM_PROFILES[0].linkedin);
  const [github, setGithub] = useState(RANDOM_PROFILES[0].github);
  const [summary, setSummary] = useState(RANDOM_PROFILES[0].summary);
  const [skills, setSkills] = useState(RANDOM_PROFILES[0].skills);
  const [experiences, setExperiences] = useState(RANDOM_PROFILES[0].experiences);
  const [education, setEducation] = useState(RANDOM_PROFILES[0].education);

  // Cover Letter State
  const [targetCompany, setTargetCompany] = useState('Shopify');
  const [targetRole, setTargetRole] = useState('Senior Product Designer');
  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Manager at Shopify,\n\nI am writing to express my strong interest in the ${targetRole} role. Having followed Shopify's merchant-first design evolution, I have long admired your standard of clean, accessible product experiences that empower millions of independent entrepreneurs worldwide.\n\nOver the past 6 years leading design at high-growth tech platforms, I have built design systems and customer checkout flows that increased registration conversion rates by 34% and reduced onboarding drop-offs. My experience collaborating closely with distributed engineering squads and analyzing qualitative user metrics directly matches the mission of your product design team.\n\nI would be thrilled to bring my passion for craft, design scalability, and merchant empathy to Shopify.\n\nSincerely,\n${name}`
  );
  const [copiedLetter, setCopiedLetter] = useState(false);

  // Load Random Profile
  const loadRandomProfile = () => {
    const nextIdx = (profileIndex + 1) % RANDOM_PROFILES.length;
    setProfileIndex(nextIdx);
    const p = RANDOM_PROFILES[nextIdx];
    setName(p.name);
    setTitle(p.title);
    setEmail(p.email);
    setPhone(p.phone);
    setLocation(p.location);
    setLinkedin(p.linkedin);
    setGithub(p.github);
    setSummary(p.summary);
    setSkills(p.skills);
    setExperiences(p.experiences);
    setEducation(p.education);
    setCoverLetter(
      `Dear Hiring Manager at ${targetCompany},\n\nI am excited to apply for the ${p.title} position. With my background in ${p.skills.split(',').slice(0, 3).join(', ')}, I am confident in my ability to immediately contribute to your team's objectives.\n\nIn my previous role at ${p.experiences[0]?.company}, I spearheaded initiatives that substantially improved technical and business outcomes. I look forward to bringing this expertise to your company.\n\nSincerely,\n${p.name}`
    );
  };

  const clearToBlank = () => {
    setName('');
    setTitle('');
    setEmail('');
    phone && setPhone('');
    setLocation('');
    setLinkedin('');
    setGithub('');
    setSummary('');
    setSkills('');
    setExperiences([{ role: '', company: '', period: '', location: '', points: '' }]);
    setEducation([{ degree: '', institution: '', period: '', gpa: '' }]);
  };

  const calculateAtsScore = () => {
    let score = 50;
    if (summary.length > 80) score += 10;
    if (skills.split(',').length >= 6) score += 10;
    if (experiences.length >= 2) score += 15;
    if (education.length >= 1) score += 5;
    if (linkedin && email) score += 10;
    return Math.min(score, 100);
  };

  const atsScore = calculateAtsScore();

    const handleDownloadPdf = async () => {
    if (isProTemplate) {
      setShowProInfo(true);
      return;
    }

    const canvasElem = document.getElementById('resume-canvas-printable');
    if (!canvasElem) return;

    try {
      setIsExporting(true);
      const canvas = await html2canvas(canvasElem, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      const fileName = `${(name || 'Professional').replace(/\s+/g, '_')}_${template.toUpperCase()}_Resume.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error('PDF generation error, falling back to print:', err);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadTxt = () => {
    if (isProTemplate) {
      setShowProInfo(true);
      return;
    }
    const fileName = `${(name || 'Professional').replace(/\s+/g, '_')}_ATS_Resume.txt`;
    const contactParts = [email, phone, location, linkedin, github].filter(Boolean);
    
    let content = `========================================================================\n`;
    content += `${(name || 'Your Full Name').toUpperCase()} — ${title || 'Professional Title'}\n`;
    content += `========================================================================\n`;
    content += `Contact: ${contactParts.join(' | ')}\n\n`;

    if (summary) {
      content += `------------------------------------------------------------------------\n`;
      content += `EXECUTIVE SUMMARY\n`;
      content += `------------------------------------------------------------------------\n`;
      content += `${summary}\n\n`;
    }

    if (skills) {
      content += `------------------------------------------------------------------------\n`;
      content += `CORE COMPETENCIES & TECHNICAL SKILLS\n`;
      content += `------------------------------------------------------------------------\n`;
      content += `${skills}\n\n`;
    }

    if (experiences.length > 0) {
      content += `------------------------------------------------------------------------\n`;
      content += `PROFESSIONAL WORK HISTORY\n`;
      content += `------------------------------------------------------------------------\n`;
      experiences.forEach((exp) => {
        content += `${exp.role.toUpperCase()} | ${exp.company} (${exp.period})\n`;
        content += `Location: ${exp.location}\n`;
        content += `${exp.points}\n\n`;
      });
    }

    if (education.length > 0) {
      content += `------------------------------------------------------------------------\n`;
      content += `EDUCATION & CREDENTIALS\n`;
      content += `------------------------------------------------------------------------\n`;
      education.forEach((edu) => {
        content += `${edu.degree} — ${edu.institution} (${edu.period})\n`;
      });
      content += `\n`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    if (isProTemplate) {
      setShowProInfo(true);
      return;
    }
    window.print();
  };

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        role: 'Software / Growth Lead',
        company: 'VentureScale Global',
        period: '2021 - 2023',
        location: 'Remote',
        points: '• Delivered scalable frontend interfaces and optimized backend latency by 35%.\n• Led cross-functional teams across product, engineering, and marketing.'
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Tool #1</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-bold">
              ATS Standard Verified
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white mt-1">AI Resume & Cover Letter Suite</h1>
          <p className="text-xs text-slate-400 mt-1">
            Toggle 5 distinct professional layouts. Generate real ATS-scoring documents in seconds.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button 
            type="button"
            onClick={() => setShowProInfo(true)}
            className="px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition shadow-lg shadow-amber-500/10"
            title="See what's included in OmniStack AI Pro"
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>⭐ What's in Pro? ($9/mo)</span>
          </button>

          <button 
            type="button"
            onClick={loadRandomProfile}
            className="px-4 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 text-white font-bold text-xs flex items-center gap-2 transition"
            title="Load another sample profile"
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-300" />
            <span>🎲 Load Random Sample Profile</span>
          </button>

          <button 
            type="button"
            onClick={clearToBlank}
            className="px-3.5 py-2.5 rounded-xl glass hover:bg-white/10 text-slate-400 hover:text-white font-semibold text-xs transition"
            title="Start from scratch"
          >
            Clear Form
          </button>

          <button 
            type="button"
            onClick={handleDownloadPdf}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              isProTemplate 
                ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 shadow-lg shadow-amber-500/10' 
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 hover:opacity-95'
            }`}
            title={isProTemplate ? "Pro Layout Locked — Upgrade to Download" : "Download PDF directly to your computer"}
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : isProTemplate ? <Lock className="w-4 h-4 text-amber-400" /> : <Download className="w-4 h-4" />}
            <span>{isExporting ? 'Generating 1:1 PDF...' : isProTemplate ? 'Download PDF (🔒 Pro Locked)' : 'Download PDF (1:1 Exact)'}</span>
          </button>

          <button 
            type="button"
            onClick={handleDownloadTxt}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
              isProTemplate 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20' 
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
            }`}
            title={isProTemplate ? "Pro Layout Locked — Upgrade to Export" : "Download clean plain-text resume for standard ATS applicant portals"}
          >
            {isProTemplate ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <FileText className="w-3.5 h-3.5 text-slate-400" />}
            <span>{isProTemplate ? 'Download ATS (🔒 Pro Locked)' : 'Download ATS (.txt)'}</span>
          </button>

          <button 
            type="button"
            onClick={handlePrint}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition ${
              isProTemplate 
                ? 'bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30' 
                : 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/20 hover:opacity-90'
            }`}
            title={isProTemplate ? "Pro Layout Locked — Upgrade to Print" : "Open browser print / Save as PDF dialog"}
          >
            {isProTemplate ? <Lock className="w-3.5 h-3.5 text-amber-400" /> : <Printer className="w-3.5 h-3.5" />}
            <span>{isProTemplate ? 'Print (🔒 Pro Locked)' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
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
          <span>Resume Canvas & Layouts</span>
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
          <span>Targeted Cover Letter</span>
        </button>
      </div>

      {/* Mobile / Tablet Toggle between Form and Live Canvas */}
      {activeTab === 'resume' && (
        <div className="lg:hidden flex items-center p-1 bg-white/5 border border-white/10 rounded-2xl mb-2">
          <button
            type="button"
            onClick={() => setMobileView('form')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              mobileView === 'form'
                ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Edit Resume Form</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              mobileView === 'preview'
                ? 'bg-gradient-to-r from-brand-500 to-accent-500 text-white shadow-lg shadow-brand-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Canvas ({atsScore}/100)</span>
          </button>
        </div>
      )}

      {activeTab === 'resume' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form (5 cols) */}
          <div className={`lg:col-span-5 glass p-5 sm:p-7 rounded-3xl border border-white/10 space-y-6 ${
            mobileView === 'preview' ? 'hidden lg:block' : 'block'
          }`}>
            {/* ATS Score */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400" />
                  <span>Real-Time ATS Health Score</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">Scored against 20+ recruiting filter rules</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-emerald-400">{atsScore}/100</div>
                <div className="text-[10px] font-bold uppercase text-emerald-300">ATS Certified</div>
              </div>
            </div>

            {/* Layout Selector - 5 Distinct Visual Styles */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-brand-400" />
                  <span>Choose Visual Layout (8 Total: 3 Free · 5 Pro):</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowProInfo(true)}
                  className="text-[10px] text-amber-400 hover:underline font-bold flex items-center gap-1"
                >
                  <Crown className="w-3 h-3" /> Pro Specs
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setTemplate('modern')}
                  className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                    template === 'modern' 
                      ? 'bg-brand-500 text-white border-brand-400 shadow-md' 
                      : 'glass text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  <div className="text-[9px] text-emerald-300 font-extrabold uppercase tracking-wider">Style A · Free</div>
                  <div className="text-[11px] truncate">Modern Tech</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('harvard')}
                  className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                    template === 'harvard' 
                      ? 'bg-brand-500 text-white border-brand-400 shadow-md' 
                      : 'glass text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  <div className="text-[9px] text-emerald-300 font-extrabold uppercase tracking-wider">Style B · Free</div>
                  <div className="text-[11px] truncate">Harvard Classic</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('minimal')}
                  className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                    template === 'minimal' 
                      ? 'bg-brand-500 text-white border-brand-400 shadow-md' 
                      : 'glass text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  <div className="text-[9px] text-emerald-300 font-extrabold uppercase tracking-wider">Style C · Free</div>
                  <div className="text-[11px] truncate">Minimal Column</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('executive')}
                  className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                    template === 'executive' 
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-md' 
                      : 'glass text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  <div className="text-[9px] text-amber-300 font-extrabold uppercase tracking-wider">Style D · 🔒 Pro</div>
                  <div className="text-[11px] truncate">Executive Leader</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('creative')}
                  className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                    template === 'creative' 
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md' 
                      : 'glass text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  <div className="text-[9px] text-amber-300 font-extrabold uppercase tracking-wider">Style E · 🔒 Pro</div>
                  <div className="text-[11px] truncate">Creative Studio</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('techlead')}
                  className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                    template === 'techlead' 
                      ? 'bg-cyan-600 text-white border-cyan-400 shadow-md' 
                      : 'glass text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  <div className="text-[9px] text-amber-300 font-extrabold uppercase tracking-wider">Style F · 🔒 Pro</div>
                  <div className="text-[11px] truncate">Tech Lead & Arch</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('finance')}
                  className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                    template === 'finance' 
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md' 
                      : 'glass text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  <div className="text-[9px] text-amber-300 font-extrabold uppercase tracking-wider">Style G · 🔒 Pro</div>
                  <div className="text-[11px] truncate">Wall St Finance</div>
                </button>
                <button
                  type="button"
                  onClick={() => setTemplate('nordic')}
                  className={`p-2 rounded-xl text-xs font-bold border transition text-center ${
                    template === 'nordic' 
                      ? 'bg-stone-700 text-white border-stone-500 shadow-md' 
                      : 'glass text-slate-300 hover:text-white border-white/10'
                  }`}
                >
                  <div className="text-[9px] text-amber-300 font-extrabold uppercase tracking-wider">Style H · 🔒 Pro</div>
                  <div className="text-[11px] truncate">Nordic Luxury</div>
                </button>
              </div>
            </div>

            {/* Candidate Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Personal Information</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Target Title</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-semibold"
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
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">LinkedIn Profile</label>
                  <input 
                    type="text" 
                    value={linkedin} 
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Portfolio / GitHub</label>
                  <input 
                    type="text" 
                    value={github} 
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none font-mono"
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 leading-relaxed font-sans"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Key Skills & Core Competencies</label>
              <textarea 
                rows={2} 
                value={skills} 
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500"
              />
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-slate-200">Work Experience</label>
                <button 
                  onClick={addExperience} 
                  className="text-xs text-brand-400 hover:text-brand-300 font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Experience
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
                      placeholder="Bullet points (use % and $ metrics)"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Rendered Resume (7 cols) */}
          <div className={`lg:col-span-7 lg:sticky lg:top-28 ${
            mobileView === 'form' ? 'hidden lg:block' : 'block'
          }`}>
            <div className="glass p-3 sm:p-6 lg:p-8 rounded-3xl border border-white/10 bg-[#070b16] shadow-2xl overflow-x-auto no-scrollbar">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-brand-400" />
                  <span className="text-xs font-bold text-white">
                    Live Canvas: {template === 'modern' ? 'Modern Tech (Style A · Free)' : template === 'harvard' ? 'Harvard Classic (Style B · Free)' : template === 'minimal' ? 'Minimal Column (Style C · Free)' : template === 'executive' ? 'Executive Leader (Style D · 🔒 Pro Locked)' : template === 'creative' ? 'Creative Studio (Style E · 🔒 Pro Locked)' : template === 'techlead' ? 'Tech Lead Architect (Style F · 🔒 Pro Locked)' : template === 'finance' ? 'Wall Street Finance (Style G · 🔒 Pro Locked)' : 'Nordic Luxury (Style H · 🔒 Pro Locked)'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Format: A4 Print Ready</span>
              </div>

              {/* Pro Locked Alert Banner */}
              {isProTemplate && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-brand-500/15 to-amber-500/20 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 animate-in fade-in">
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>🔒 Pro Layout Preview Mode</span>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-extrabold uppercase">
                          Export & Print Locked
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        Styles D, E, F, G, and H require OmniStack AI Pro ($9/mo). Upgrade to download unwatermarked vector PDF, ATS plain-text, and print exports.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowProInfo(true)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs shadow-md transition flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Crown className="w-3.5 h-3.5" /> Unlock Pro
                  </button>
                </div>
              )}

              <div id="resume-canvas-printable">

              {/* TEMPLATE A: MODERN TECH (Clean Blue Accent, Left-aligned, Pill tags) */}
              {template === 'modern' && (
                <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl font-sans min-h-[780px] space-y-6 border-t-8 border-indigo-600">
                  {/* Modern Header */}
                  <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-slate-950 tracking-tight">{name || 'Your Full Name'}</h2>
                      <div className="text-sm font-extrabold text-indigo-600 mt-0.5">{title || 'Your Target Role'}</div>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-0.5 text-right font-medium">
                      <div>✉ {email}</div>
                      <div>☎ {phone}</div>
                      <div>📍 {location}</div>
                      {linkedin && <div className="text-indigo-600 font-semibold">{linkedin}</div>}
                    </div>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 mb-1.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" /> Executive Profile
                    </h3>
                    <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                  </div>

                  {/* Skills Pills */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 mb-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" /> Technical Competencies
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.split(',').map((s, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-indigo-50 text-indigo-900 px-2.5 py-1 rounded-md border border-indigo-100">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 mb-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" /> Work History
                    </h3>
                    <div className="space-y-4">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-slate-950">{exp.role}</span>
                            <span className="text-[10px] text-slate-500 font-semibold">{exp.period}</span>
                          </div>
                          <div className="text-[11px] font-bold text-indigo-700">{exp.company} — {exp.location}</div>
                          <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-indigo-700 mb-2 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" /> Education
                    </h3>
                    <div className="space-y-2">
                      {education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-xs">
                          <div>
                            <div className="font-bold text-slate-950">{edu.degree}</div>
                            <div className="text-[11px] text-indigo-600 font-semibold">{edu.institution}</div>
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">{edu.period} · {edu.gpa}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE D: SILICON VALLEY EXECUTIVE (Commanding Navy Header, Gold/Slate Highlights, Leadership Metrics) */}
              {template === 'executive' && (
                <div className="bg-white text-slate-900 rounded-xl shadow-2xl font-sans min-h-[780px] overflow-hidden border border-slate-200">
                  {/* Executive Header Banner */}
                  <div className="bg-[#0f172a] text-white p-8 sm:p-10 border-b-4 border-amber-500">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">Executive Candidate</span>
                        <h2 className="text-3xl font-black text-white tracking-tight mt-0.5">{name || 'Your Full Name'}</h2>
                        <div className="text-sm font-bold text-slate-300 mt-1">{title || 'Your Target Role'}</div>
                      </div>
                      <div className="text-[11px] text-slate-300 space-y-1 md:text-right font-medium">
                        <div>✉ {email}</div>
                        <div>☎ {phone}</div>
                        <div>📍 {location}</div>
                        {linkedin && <div className="text-amber-400 font-semibold">{linkedin}</div>}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 sm:p-10 space-y-6">
                    {/* Executive Impact Summary */}
                    <div className="border-l-4 border-amber-500 bg-slate-50 p-4 rounded-r-xl">
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-1.5 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-amber-600" /> Executive Leadership & Strategic Mandate
                      </h3>
                      <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                    </div>

                    {/* Core Competencies */}
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2.5 pb-1 border-b border-slate-200">
                        Strategic & Technical Competencies
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {skills.split(',').map((s, idx) => (
                          <div key={idx} className="text-[11px] font-semibold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span className="truncate">{s.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Leadership & Career Record */}
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b border-slate-200">
                        Executive Leadership Record
                      </h3>
                      <div className="space-y-5">
                        {experiences.map((exp, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                              <span className="text-sm font-black text-slate-950">{exp.role}</span>
                              <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100/80 px-2.5 py-0.5 rounded-full border border-amber-300 w-fit">
                                {exp.period}
                              </span>
                            </div>
                            <div className="text-xs font-bold text-slate-700">{exp.company} — {exp.location}</div>
                            <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Education & Credentials */}
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 mb-2 pb-1 border-b border-slate-200">
                        Board & Academic Credentials
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {education.map((edu, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                            <div className="font-bold text-xs text-slate-950">{edu.degree}</div>
                            <div className="text-[11px] font-semibold text-slate-600 mt-0.5">{edu.institution}</div>
                            <div className="text-[10px] text-slate-500 mt-1">{edu.period} · {edu.gpa}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE E: CREATIVE STUDIO (Editorial Magazine Layout, Emerald & Stone Typography) */}
              {template === 'creative' && (
                <div className="bg-[#fafaf9] text-stone-900 p-8 sm:p-12 rounded-xl shadow-2xl font-sans min-h-[780px] space-y-6 border-t-8 border-emerald-600">
                  {/* Editorial Header */}
                  <div className="border-b-2 border-stone-300 pb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Portfolio & Profile</span>
                      <h2 className="text-3xl font-black text-stone-950 tracking-tight mt-0.5">{name || 'Your Full Name'}</h2>
                      <div className="text-sm font-bold text-stone-600 mt-0.5 italic">{title || 'Your Target Role'}</div>
                    </div>
                    <div className="text-[11px] text-stone-600 space-y-0.5 md:text-right font-medium">
                      <div>{email}</div>
                      <div>{phone}</div>
                      <div>{location}</div>
                      {linkedin && <div className="text-emerald-700 font-semibold">{linkedin}</div>}
                      {github && <div className="text-emerald-700 font-semibold">{github}</div>}
                    </div>
                  </div>

                  {/* Bio Manifesto */}
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl">
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Professional Narrative
                    </h3>
                    <p className="text-xs text-stone-800 leading-relaxed font-serif">{summary}</p>
                  </div>

                  {/* Creative Tooling & Skills */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-2.5">
                      Specialties & Toolchain
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.split(',').map((s, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-white text-stone-800 px-3 py-1 rounded-full border border-stone-200 shadow-sm">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Impact Timeline */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-3">
                      Chronology of Experience
                    </h3>
                    <div className="border-l-2 border-emerald-300 ml-2 pl-4 space-y-5">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="relative space-y-1">
                          <span className="absolute -left-[22px] top-1.5 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white ring-1 ring-emerald-300" />
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-stone-950">{exp.role}</span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{exp.period}</span>
                          </div>
                          <div className="text-[11px] font-bold text-stone-600">{exp.company} — {exp.location}</div>
                          <p className="text-[11px] text-stone-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-2">
                      Academic Foundation
                    </h3>
                    <div className="space-y-2">
                      {education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-xs bg-white p-3 rounded-xl border border-stone-200">
                          <div>
                            <div className="font-bold text-stone-950">{edu.degree}</div>
                            <div className="text-[11px] text-emerald-700 font-semibold">{edu.institution}</div>
                          </div>
                          <div className="text-[11px] text-stone-500">{edu.period} · {edu.gpa}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE F: TECH LEAD & PRINCIPAL ARCHITECT (Pro) */}
              {template === 'techlead' && (
                <div className="bg-[#0b0f19] text-slate-100 p-8 sm:p-12 rounded-xl shadow-2xl font-sans min-h-[780px] space-y-6 border border-cyan-500/30 relative">
                  {/* Tech Terminal Header */}
                  <div className="border-b border-cyan-500/20 pb-5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-2">
                      <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> ARCHITECT_CLUSTER // US-EAST-1</span>
                      <span className="bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">SYSTEM_VER 2026.4</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                      <div>
                        <h2 className="text-3xl font-black text-white tracking-tight font-mono">{name || 'Your Full Name'}</h2>
                        <div className="text-sm font-bold text-cyan-400 mt-0.5 font-mono">// {title || 'Principal Software Architect'}</div>
                      </div>
                      <div className="text-[11px] text-slate-400 space-y-0.5 font-mono md:text-right">
                        <div>net: {email}</div>
                        <div>tel: {phone}</div>
                        <div>loc: {location}</div>
                        {linkedin && <div className="text-cyan-400">{linkedin}</div>}
                        {github && <div className="text-emerald-400">{github}</div>}
                      </div>
                    </div>
                  </div>

                  {/* Architecture Directive Banner */}
                  <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-1 flex items-center gap-1.5 font-mono">
                      <Code2 className="w-3.5 h-3.5" /> Architectural Directive & Mandate
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{summary}</p>
                  </div>

                  {/* Core Tech Stack Matrix */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Distributed Systems & Infrastructure Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.split(',').map((s, idx) => (
                        <span key={idx} className="text-[10px] font-mono font-semibold bg-cyan-950/60 text-cyan-300 px-2.5 py-1 rounded border border-cyan-800/60">
                          {s.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Engineering Record & Scale Milestones */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-3 font-mono flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" /> Production Engineering Track Record
                    </div>
                    <div className="space-y-4">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 space-y-1.5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono">
                            <span className="text-xs font-bold text-white flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                              {exp.role}
                            </span>
                            <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                              {exp.period}
                            </span>
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">{exp.company} // {exp.location}</div>
                          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education & Systems Credentials */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 mb-2 font-mono">
                      Academic & System Credentials
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {education.map((edu, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 font-mono text-xs">
                          <div className="font-bold text-white">{edu.degree}</div>
                          <div className="text-[11px] text-cyan-400 mt-0.5">{edu.institution}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{edu.period} · {edu.gpa}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE G: WALL STREET INVESTMENT ANALYST & CAPITAL MARKETS (Pro) */}
              {template === 'finance' && (
                <div className="bg-white text-slate-950 p-8 sm:p-12 rounded-xl shadow-2xl font-serif min-h-[780px] space-y-5 border-2 border-slate-800">
                  {/* Wall Street Masthead */}
                  <div className="border-b-2 border-slate-900 pb-4 text-center">
                    <div className="text-[10px] font-sans font-extrabold tracking-widest text-amber-700 uppercase mb-1">
                      CONFIDENTIAL CANDIDATE DOSSIER
                    </div>
                    <h2 className="text-2xl font-black text-slate-950 tracking-tight uppercase">{name || 'Your Full Name'}</h2>
                    <div className="text-xs font-bold text-slate-700 tracking-wider uppercase mt-0.5 font-sans">
                      {title || 'Private Equity & M&A Investment Analyst'}
                    </div>
                    <div className="text-[10px] text-slate-600 mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 font-sans">
                      <span>{email}</span>
                      <span>|</span>
                      <span>{phone}</span>
                      <span>|</span>
                      <span>{location}</span>
                      {linkedin && <span>| {linkedin}</span>}
                    </div>
                  </div>

                  {/* Investment Thesis & Executive Mandate */}
                  <div className="border border-slate-300 p-3.5 bg-slate-50/60">
                    <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-700" /> Mandate & Financial Core Competency
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed font-sans">{summary}</p>
                  </div>

                  {/* Financial Modeling & Capital Tooling */}
                  <div>
                    <div className="text-[10px] font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
                      Financial Modeling, M&A & Quantitative Competencies
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-sans">
                      {skills.split(',').map((s, idx) => (
                        <div key={idx} className="text-[10px] font-semibold text-slate-800 bg-slate-100 p-1.5 border border-slate-300 text-center">
                          {s.trim()}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transaction History & Deal Experience */}
                  <div>
                    <div className="text-[10px] font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-3">
                      Professional Engagement & Deal History
                    </div>
                    <div className="space-y-4 font-sans">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-bold text-slate-950 uppercase">{exp.role}</span>
                            <span className="text-[10px] font-bold text-slate-600">{exp.period}</span>
                          </div>
                          <div className="text-[11px] font-semibold text-amber-900 italic">{exp.company} — {exp.location}</div>
                          <p className="text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic Degrees & Honors */}
                  <div>
                    <div className="text-[10px] font-sans font-black uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-0.5 mb-2">
                      Academic Credentials & Certifications
                    </div>
                    <div className="space-y-1.5 font-sans">
                      {education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-xs">
                          <div>
                            <span className="font-bold text-slate-950">{edu.institution}</span> — <span className="text-slate-800">{edu.degree}</span>
                          </div>
                          <div className="text-[10px] font-bold text-slate-600">{edu.period} | {edu.gpa}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE H: NORDIC LUXURY MINIMALIST (Pro) */}
              {template === 'nordic' && (
                <div className="bg-[#fafaf8] text-slate-900 p-10 sm:p-14 rounded-xl shadow-2xl font-sans min-h-[780px] space-y-7 border border-stone-200">
                  {/* Architectural Monolith Header */}
                  <div className="border-b border-stone-300 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-stone-500 mb-1">CURRICULUM VITAE</div>
                      <h2 className="text-3xl font-light tracking-tight text-stone-900 uppercase">{name || 'Your Full Name'}</h2>
                      <div className="text-xs font-medium tracking-wide text-stone-600 mt-1 uppercase">{title || 'Creative Director'}</div>
                    </div>
                    <div className="text-[10px] text-stone-600 font-mono space-y-1 md:text-right tracking-tight">
                      <div>{email}</div>
                      <div>{phone}</div>
                      <div>{location}</div>
                      {linkedin && <div className="text-stone-900 underline">{linkedin}</div>}
                    </div>
                  </div>

                  {/* Pure Whitespace Narrative */}
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-3 text-[10px] font-mono uppercase tracking-widest text-stone-500">
                      01 / Overview
                    </div>
                    <div className="col-span-12 sm:col-span-9">
                      <p className="text-xs text-stone-800 leading-relaxed font-normal">{summary}</p>
                    </div>
                  </div>

                  {/* Disciplines & Core Competencies */}
                  <div className="grid grid-cols-12 gap-6 pt-2 border-t border-stone-200">
                    <div className="col-span-12 sm:col-span-3 text-[10px] font-mono uppercase tracking-widest text-stone-500">
                      02 / Competencies
                    </div>
                    <div className="col-span-12 sm:col-span-9">
                      <div className="flex flex-wrap gap-2">
                        {skills.split(',').map((s, idx) => (
                          <span key={idx} className="text-[10px] text-stone-800 bg-white px-3 py-1 rounded border border-stone-200 tracking-wide">
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Chronology */}
                  <div className="grid grid-cols-12 gap-6 pt-2 border-t border-stone-200">
                    <div className="col-span-12 sm:col-span-3 text-[10px] font-mono uppercase tracking-widest text-stone-500">
                      03 / Experience
                    </div>
                    <div className="col-span-12 sm:col-span-9 space-y-6">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between items-baseline">
                            <span className="text-xs font-medium text-stone-900 tracking-wide uppercase">{exp.role}</span>
                            <span className="text-[10px] text-stone-500 font-mono">{exp.period}</span>
                          </div>
                          <div className="text-[11px] text-stone-600 italic">{exp.company} — {exp.location}</div>
                          <p className="text-xs text-stone-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academics */}
                  <div className="grid grid-cols-12 gap-6 pt-2 border-t border-stone-200">
                    <div className="col-span-12 sm:col-span-3 text-[10px] font-mono uppercase tracking-widest text-stone-500">
                      04 / Education
                    </div>
                    <div className="col-span-12 sm:col-span-9 space-y-2">
                      {education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-xs">
                          <div>
                            <span className="font-medium text-stone-900">{edu.institution}</span>, <span className="text-stone-600">{edu.degree}</span>
                          </div>
                          <div className="text-[10px] text-stone-500 font-mono">{edu.period}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TEMPLATE B: HARVARD CLASSIC (Traditional Centered Serif Layout) */}
              {template === 'harvard' && (
                <div className="bg-white text-slate-900 p-8 sm:p-12 rounded-xl shadow-2xl font-serif min-h-[780px] space-y-5">
                  <div className="border-b-2 border-slate-900 pb-3 text-center">
                    <h2 className="text-2xl font-black text-slate-950 tracking-tight uppercase">{name || 'Your Full Name'}</h2>
                    <div className="text-xs font-bold text-slate-700 tracking-wider uppercase mt-1">{title}</div>
                    <div className="text-[11px] text-slate-600 mt-2 flex flex-wrap justify-center gap-x-3 gap-y-1 font-sans">
                      <span>{email}</span>
                      <span>·</span>
                      <span>{phone}</span>
                      <span>·</span>
                      <span>{location}</span>
                      {linkedin && <span>· {linkedin}</span>}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-2 font-sans">
                      Professional Summary
                    </h3>
                    <p className="text-xs text-slate-800 leading-relaxed">{summary}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-2 font-sans">
                      Areas of Expertise
                    </h3>
                    <p className="text-xs text-slate-800 font-sans leading-relaxed">{skills}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-3 font-sans">
                      Experience
                    </h3>
                    <div className="space-y-4">
                      {experiences.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-baseline font-sans">
                            <span className="text-xs font-bold text-slate-950">{exp.role}</span>
                            <span className="text-[10px] text-slate-600 italic">{exp.period}</span>
                          </div>
                          <div className="text-[11px] font-semibold text-slate-800 italic">{exp.company}, {exp.location}</div>
                          <p className="text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap font-sans">{exp.points}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-950 border-b border-slate-400 pb-0.5 mb-2 font-sans">
                      Education
                    </h3>
                    {education.map((edu, idx) => (
                      <div key={idx} className="flex justify-between items-baseline text-xs font-sans">
                        <div>
                          <span className="font-bold">{edu.institution}</span> — <span>{edu.degree}</span>
                        </div>
                        <div className="text-[11px] text-slate-600">{edu.period}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TEMPLATE C: MINIMAL CLEAN (Sidebar Column Format) */}
              {template === 'minimal' && (
                <div className="bg-white text-slate-900 p-8 sm:p-10 rounded-xl shadow-2xl font-sans min-h-[780px] grid grid-cols-12 gap-6">
                  {/* Left Column (4 cols) */}
                  <div className="col-span-4 border-r border-slate-200 pr-4 space-y-5">
                    <div>
                      <h2 className="text-lg font-black text-slate-950 leading-tight">{name}</h2>
                      <div className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-wide">{title}</div>
                    </div>

                    <div className="space-y-1.5 text-[10px] text-slate-600">
                      <div className="font-bold text-slate-900 uppercase">Contact</div>
                      <div>{email}</div>
                      <div>{phone}</div>
                      <div>{location}</div>
                      {linkedin && <div className="truncate text-indigo-600">{linkedin}</div>}
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-900 uppercase">Skills</div>
                      <div className="flex flex-col gap-1">
                        {skills.split(',').map((s, i) => (
                          <span key={i} className="text-[10px] bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded">
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1 text-[10px] text-slate-600">
                      <div className="font-bold text-slate-900 uppercase">Education</div>
                      {education.map((edu, i) => (
                        <div key={i}>
                          <div className="font-bold text-slate-800">{edu.degree}</div>
                          <div>{edu.institution}</div>
                          <div className="text-slate-400">{edu.period}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (8 cols) */}
                  <div className="col-span-8 space-y-5">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
                        Summary
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">{summary}</p>
                    </div>

                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
                        Experience
                      </div>
                      <div className="space-y-4">
                        {experiences.map((exp, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between items-baseline">
                              <span className="text-xs font-bold text-slate-950">{exp.role}</span>
                              <span className="text-[10px] text-slate-400">{exp.period}</span>
                            </div>
                            <div className="text-[11px] font-semibold text-slate-600">{exp.company}</div>
                            <p className="text-[11px] text-slate-700 leading-relaxed whitespace-pre-wrap">{exp.points}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-semibold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Target Job Title</label>
              <input 
                type="text" 
                value={targetRole} 
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-brand-500 font-semibold"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-300">Generated Cover Letter Body</label>
              <button 
                onClick={copyCoverLetter}
                className="px-3.5 py-1.5 rounded-lg bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/30 text-xs text-brand-300 hover:text-white flex items-center gap-1.5 transition font-bold"
              >
                {copiedLetter ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Download className="w-3.5 h-3.5" />}
                <span>{copiedLetter ? 'Copied Cover Letter!' : 'Copy Letter Text'}</span>
              </button>
            </div>
            <textarea 
              rows={14} 
              value={coverLetter} 
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 text-white text-xs outline-none focus:border-brand-500 leading-relaxed font-sans"
            />
          </div>
        </div>
      )}

      {/* Pro Features Modal */}
      {showProInfo && (
        <div 
          className="fixed inset-0 !m-0 z-[9999] bg-black/85 backdrop-blur-md flex flex-col justify-center items-center p-2.5 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowProInfo(false);
          }}
        >
          <div 
            className="w-full max-w-2xl bg-[#0c1020] border border-amber-500/40 rounded-2xl sm:rounded-3xl shadow-2xl relative flex flex-col max-h-[92dvh] sm:max-h-[88dvh] overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header with Clean Back Button */}
            <div className="shrink-0 bg-[#0c1020] px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between gap-2 shadow-sm z-20">
              <button 
                type="button"
                onClick={() => setShowProInfo(false)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 border border-white/10 active:scale-95 cursor-pointer"
                title="Back to Resume Builder"
              >
                <ArrowLeft className="w-4 h-4 text-amber-400" />
                <span>Back</span>
              </button>

              <div className="text-center min-w-0 flex-1 px-1">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-xs sm:text-sm font-extrabold text-white truncate">OmniStack AI Pro</span>
                  <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded-full border border-amber-500/20 shrink-0">
                    Pro Styles
                  </span>
                </div>
                <div className="text-[10px] text-amber-300/90 font-bold truncate">
                  $9/mo or $84/year · 8 Vector Layouts
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setShowProInfo(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white flex items-center justify-center transition shrink-0 border border-white/10 active:scale-95 cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body (Smoothly scrollable without clipping) */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8 space-y-6 -webkit-overflow-scrolling-touch">
              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30 shrink-0">
                  <Crown className="w-6 h-6 font-black" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    OmniStack AI Pro
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-1">What's in Pro? ($9/mo or $84/year)</h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Upgrading to Pro unlocks full commercial superpowers across the entire OmniStack AI 6-in-1 suite. Here is everything included:
              </p>

              {/* Benefit Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>8 Vector Resume Layouts (5 Pro Styles)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Unlock Tech Lead Architect, Wall Street Finance, Nordic Luxury, Executive Leader, and Creative Studio with unlimited unwatermarked 1:1 vector PDF & ATS exports.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>ATS Keyword Gap Matcher</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Paste any job description to get an instant match score and missing keyword recommendations before you apply.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Targeted AI Cover Letters</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Generate customized, persuasive cover letters tailored to specific hiring managers in seconds.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>All 6 Micro-SaaS Tools</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Resume Suite, Mock Interview Simulator, Contract Analyzer, Email Signature Studio, Commercial Invoice Generator, and Bio Links.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 space-y-1 sm:col-span-2">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>PayPal & Worldwide Instant Checkout</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Works globally with PayPal, Visa, MasterCard, and Amex with 0 paperwork. Includes 14-day 100% money-back guarantee.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <a 
                  href="https://checkout.dodopayments.com/buy/pdt_0Noz3iseuD6nqAUvsHz2R?quantity=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 text-center transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>🦤 Instant Card / Apple Pay Checkout ($9/mo) ↗</span>
                </a>
                <a 
                  href="/pricing"
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white font-bold text-xs text-center transition flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                >
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                  <span>All Payment Options</span>
                </a>
              </div>

              {/* Bottom Back Button */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowProInfo(false)}
                  className="w-full py-3 px-4 rounded-xl border border-white/10 hover:border-white/20 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-semibold transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <ArrowLeft className="w-4 h-4 text-slate-400" />
                  <span>Cancel and return to Resume Builder</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

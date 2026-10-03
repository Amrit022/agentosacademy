// Comprehensive AI Generation & Synthesis Engine for AgentOS Academy

export interface GenerationParams {
  topic: string;
  format: string;
  tone: string;
  targetAudience: string;
  variant?: number;
}

export interface AssistantResponse {
  answer: string;
  suggestedFollowUps: string[];
  relevantTool?: {
    name: string;
    href: string;
    description: string;
  };
}

// Normalize and correct common typos
function cleanTopic(raw: string): string {
  let cleaned = raw.trim();
  cleaned = cleaned.replace(/\bvidoes\b/gi, 'videos');
  cleaned = cleaned.replace(/\bvedios\b/gi, 'videos');
  cleaned = cleaned.replace(/\bfreelancer\b/gi, 'freelance');
  cleaned = cleaned.replace(/\byoutub\b/gi, 'YouTube');
  cleaned = cleaned.replace(/\blinkden\b/gi, 'LinkedIn');
  cleaned = cleaned.replace(/\bresum\b/gi, 'resume');
  cleaned = cleaned.replace(/\bsoftwere\b/gi, 'software');
  return cleaned;
}

export function generateCopy(params: GenerationParams): string {
  const topic = cleanTopic(params.topic || 'How to build digital SaaS businesses');
  const format = params.format || 'Viral LinkedIn Carousel/Post';
  const tone = params.tone || 'Inspirational & Tactical';
  const audience = params.targetAudience || 'Engineers, Freelancers & Solopreneurs';
  const variant = params.variant || 0;

  const lowerTopic = topic.toLowerCase();

  // 1. AI Video Creation Domain
  if (lowerTopic.includes('video') || lowerTopic.includes('reel') || lowerTopic.includes('youtube') || lowerTopic.includes('animation')) {
    if (format.includes('Twitter')) {
      return `1/7 AI video generation has officially crossed the uncanny valley.

What used to take an entire animation studio now takes 25 minutes and a laptop.

Here is the exact production workflow to generate cinema-grade AI videos in 2026 for $0 or cheap 🧵👇

2/7 Stage 1: Narrative & Shot List
Never start with video generation prompts. Start with a structured script.
• Prompt Claude 3.5 or ChatGPT: "Act as an award-winning creative director. Write a 45-second shot-by-shot script for [${topic}]. Output visual descriptions, camera motions, and audio voiceover."

3/7 Stage 2: Visual Frame Generation
For visual consistency and hyper-realism:
• Midjourney v6.1 (--ar 16:9 --style raw) or Flux.1 Schnell.
• Pro-tip: Keep character prompts consistent by locking seeds and specifying identical clothing and lighting setups (e.g. "cinematic teal-orange lighting, 35mm film grain").

4/7 Stage 3: Motion Synthesis (Text-to-Video)
Transform keyframes into cinematic movement:
• Runway Gen-3 Alpha: Exceptional physics and camera sweeps (pan, zoom, tilt).
• Luma Dream Machine / Kling AI: Incredible prompt adherence and human motion.
• Pika 2.0: Best for micro-expressions and dynamic particle effects.

5/7 Stage 4: Voiceover & Audio Design
Audio is 60% of perceived video quality:
• ElevenLabs: Choose emotional narrative voices with custom pacing.
• Suno / Udio: Generate copyright-free background ambient scores in seconds.
• Freesound / Envato: Layer subtle Foley sounds (footsteps, wind, swooshes).

6/7 Stage 5: Assembly & Polish
Import all clips into CapCut Desktop or DaVinci Resolve:
• Cut on action every 2.5-3.5 seconds to maximize viewer retention.
• Add dynamic auto-captions with highlight keywords.
• Upscale through Topaz Video AI if exporting for 4K YouTube/commercial deliverables.

7/7 The Business Model:
Don't just make clips for fun. Sell high-retention UGC ads to US/EU brands for $500–$1,500/video, or build a faceless high-CPM niche channel.

Target Audience: ${audience}.
Tone: ${tone}.

Save this thread for your next production run! 🚀`;
    }

    if (format.includes('LinkedIn')) {
      return `🎥 Hollywood studios are spending $250,000 per commercial minute.

Solo creators using AI are doing the same quality for under $30.

Here is the exact step-by-step framework to create high-retention AI videos for ${topic}:

1️⃣ The Creative Blueprint
Great video isn't about prompts; it's about story architecture.
Use AI to script with a 3-part retention framework:
• 0:00 - 0:03: Pattern interrupt hook
• 0:03 - 0:25: High-density value delivery
• 0:25 - 0:30: Frictionless call-to-action

2️⃣ Visual Consistency & Engines
The biggest beginner hurdle is flicker and mismatched characters.
• Frame Generation: Flux.1 or Midjourney v6.1 with consistent lighting seeds.
• Motion Engines: Runway Gen-3 Alpha & Kling AI for fluid cinematic camera motions (dolly in, 24fps film cadence).

3️⃣ Audio That Retains Attention
68% of mobile viewers abandon video if the audio feels cheap.
• Voice: ElevenLabs Generative Voice with natural breath cadence.
• Soundscapes: Ambient stereo layering with subtle riser transitions.

4️⃣ Rapid Assembly
Assemble in CapCut Desktop or DaVinci Resolve:
• Trim silence aggressively.
• Emphasize key punchlines with kinetic typography.

💡 The Global Opportunity:
US and European companies are scrambling to produce short-form video for TikTok, LinkedIn, and Instagram. An Indian creator or developer mastering this stack can easily charge $500 - $2,500 per marketing campaign.

Are you incorporating AI video into your marketing stack yet?

Drop your favorite video tools below 👇

#AIVideo #GenerativeAI #VideoProduction #ContentCreation #${audience.replace(/\s+/g, '')}`;
    }

    if (format.includes('Cold')) {
      return `Subject: Quick visual idea for {{Company}}'s short-form video campaigns

Hi {{FirstName}},

I noticed {{Company}} has been expanding marketing efforts across social channels, but producing regular high-quality video content is notoriously expensive and slow for most teams.

I put together a quick 30-second AI-generated video concept around "${topic}" tailored to your target demographic (${audience}).

By combining modern generative video engines (Runway Gen-3 and ElevenLabs audio) with custom post-production, we help brands produce 15-20 cinematic video assets a month at 75% lower cost than traditional production agencies.

Would you be open to seeing the 30-second draft concept? No pitch, just wanted to share the idea and see if it sparks inspiration for your Q2 pipeline.

Best regards,

AgentOS Creative Studio
support@agentosacademy.com
https://agentosacademy.com`;
    }

    if (format.includes('Script') || format.includes('Reel') || format.includes('YouTube')) {
      return `🎬 COMPLETE SCRIPT & STORYBOARD: ${topic.toUpperCase()}
Target Audience: ${audience} | Tone: ${tone}

[0:00 - 0:05] HOOK (Visual: Fast-paced montage of cinematic AI-generated renders)
VOICEOVER: "If you think making professional video still requires expensive cameras and a film crew, you're already 2 years behind."

[0:05 - 0:20] THE PROBLEM (Visual: Split screen comparing bloated film set vs solo laptop)
VOICEOVER: "The biggest brands in the world are quietly replacing $50,000 production shoots with generative AI workflows. Here is the 4-step blueprint you can run right now."

[0:20 - 0:50] STEP 1: VISUAL STORYBOARDING
VOICEOVER: "First, generate your keyframes in Midjourney or Flux. Specify exact lens types: '85mm f/1.4, cinematic anamorphic lighting, photorealistic texture'. Keep your character seeds locked."

[0:50 - 1:20] STEP 2: MOTION SYNTHESIS
VOICEOVER: "Next, bring those stills to life using Runway Gen-3 or Kling AI. Use camera motion prompts like 'slow cinematic push-in' or 'gentle wind in hair' to avoid unnatural morphing."

[1:20 - 1:50] STEP 3: STUDIO AUDIO & VOICE
VOICEOVER: "Third, generate voice with ElevenLabs. Don't forget background sound effects—subtle room tone, risers, and impact hits make viewers believe the scene is real."

[1:50 - 2:05] STEP 4: EDITING & PACING
VOICEOVER: "Cut in CapCut or Premiere. Never let a single shot stay static for longer than 3.5 seconds. Add bold auto-captions."

[2:05 - 2:15] CALL TO ACTION
VOICEOVER: "Save this video for your next project, and check the link in bio for the complete prompt cheatsheet!"`;
    }

    // Default: Comprehensive SEO Blog Post
    return `# The Ultimate Guide to Producing Professional AI Videos in 2026

*Master the tools, prompts, and workflows required for ${topic}*

---

### Introduction: The Generative Video Revolution

Video has always been the highest-converting content medium on the web, yet it historically carried the highest barrier to entry. Producing a single high-production corporate video or social campaign historically demanded cameras, studio lighting, voice actors, and days in edit suites.

In 2026, generative AI models have matured from flickering novelty clips into photorealistic, camera-controlled cinema engines. Creators, developers, and solopreneurs targeting **${audience}** can now script, render, and distribute broadcast-grade video assets from a browser.

---

### 1. The 2026 AI Video Production Stack

To achieve consistent, professional results for **${topic}**, you need an integrated pipeline across five core disciplines:

| Stage | Best-in-Class Tools | Primary Purpose |
|---|---|---|
| **Ideation & Scripting** | Claude 3.5 Sonnet, ChatGPT | Scene-by-scene script & camera prompts |
| **Still Frame Generation** | Flux.1 Schnell, Midjourney v6.1 | High-fidelity character & environment assets |
| **Motion Generation** | Runway Gen-3 Alpha, Kling AI, Luma | Text-to-Video & Image-to-Video motion |
| **Voice & Sound Design** | ElevenLabs, Suno v3, Freesound | Emotional speech & synchronized SFX |
| **Final Assembly & Color** | CapCut Desktop, DaVinci Resolve | Kinetic pacing, captions, color grading |

---

### 2. Step-by-Step Production Protocol

#### Step 1: Crafting the Shot-by-Shot Prompt
Never ask an AI engine to "make a video about ${topic}." Instead, break your narrative into 4-second distinct beats. Define:
1. **Subject**: Detailed physical attributes and clothing.
2. **Camera Angle**: Wide drone shot, 35mm close-up, or tracking dolly.
3. **Lighting**: Golden hour, neon cyberpunk, or clean corporate softbox.

#### Step 2: Conquering Character Consistency
Use Image-to-Video (I2V) rather than pure Text-to-Video (T2V). By generating high-resolution reference images first in Midjourney, you preserve facial features and brand aesthetics across cuts.

#### Step 3: Audio Engineering
Audio accounts for more than half of viewer perceived quality. Utilize ElevenLabs' speech synthesizer with slight pauses and authentic breathing dynamics.

---

### 3. Monetization Strategy: Earning in USD
Solo founders and digital creators are capitalizing on this revolution by:
- **B2B Short-Form Retainers**: Supplying US/European SaaS brands with 12–20 product walkthroughs per month ($2,500/mo retainer).
- **Faceless Media Networks**: Building targeted YouTube and TikTok channels monetized via affiliate marketing and AdSense.
- **Micro-SaaS Video Integration**: Integrating automated video render workflows into web tools.

---

### Key Takeaway
The winners in the next phase of digital media are not those with the biggest budgets, but those who command generative workflows with speed and taste. Start with small 30-second experiments, refine your prompt libraries, and scale your output.`;
  }

  // 2. Generic Dynamic Topic Generator for ANY input
  const words = topic.split(/\s+/).filter(w => w.length > 2);
  const coreSubject = words.slice(0, 5).join(' ') || topic;

  if (format.includes('Twitter')) {
    return `1/7 Most people completely misunderstand ${coreSubject}.

They spend months over-complicating the process when the top 1% follow a simple, repeatable blueprint.

Here is the tactical breakdown on ${topic} (${tone} perspective) 🧵👇

2/7 The Core Problem:
Most people jump straight into execution without defining their distribution or unfair advantage.
If you're targeting ${audience}, your message must cut through algorithmic noise within 2 seconds.

3/7 The 3 Pillars of Success:
1. Simplicity: Remove every step that doesn't directly contribute to the outcome.
2. Speed: Ship an MVP in 48 hours rather than perfecting a prototype for 6 months.
3. Leverage: Use modern automated tools and global currency arbitrage to multiply your output.

4/7 Step-by-Step Roadmap:
• Phase 1: Rapid Validation — Test demand with zero code or lightweight landing pages.
• Phase 2: Direct Feedback — Talk to 10 early users before writing complex features.
• Phase 3: Automated Systems — Set up automated onboarding, email follow-ups, and analytics tracking.

5/7 Common Pitfalls to Avoid:
❌ Trying to please everyone instead of dominating a narrow niche.
❌ Spending weeks on branding before making your first sale.
❌ Under-pricing your offer.

6/7 The 2026 Playbook:
The future belongs to agile 1-person operators who leverage AI micro-tools to operate like 10-person agencies.

7/7 What is your biggest challenge with ${coreSubject}?

Drop your thoughts below, and retweet if you found this actionable! 🔁`;
  }

  if (format.includes('LinkedIn')) {
    return `💡 The conventional wisdom about ${coreSubject} is officially outdated.

Too many professionals targeting ${audience} are still relying on strategies that stopped working two years ago.

Here is the modern, high-leverage approach to ${topic}:

📌 1. Focus on Radical Clarity
Complexity is the enemy of execution. When communicating with ${audience}, distill your value proposition into one undeniable sentence.

📌 2. Build in Public & Show Proof
Don't just claim expertise; document your experiments, numbers, and key learnings in real time. Authentic documentation builds unshakeable credibility.

📌 3. Leverage Modern Tooling
Consolidate your stack. Whether it's rapid web publishing, automated outreach, or social proof collection, modern operators use single-dashboard micro-tools to move 10x faster.

📌 4. The Compounding Effect
Consistency over intensity. Showing up with high-density value every single week creates inbound momentum that paid ads cannot match.

---

What has been your experience with ${coreSubject}?

Share your perspective in the comments 👇

#${coreSubject.replace(/[^a-zA-Z0-9]/g, '')} #ProfessionalGrowth #BuildInPublic #${audience.replace(/[^a-zA-Z0-9]/g, '')}`;
  }

  if (format.includes('Cold')) {
    return `Subject: Quick thought regarding {{Company}}'s approach to ${coreSubject}

Hi {{FirstName}},

I've been following {{Company}}'s recent work and noticed an opportunity to accelerate your results with ${topic}.

Most organizations targeting ${audience} run into friction around execution speed, resource allocation, and maintaining consistent quality.

We recently developed a streamlined framework that enables teams to:
- Optimize workflows around ${coreSubject} with zero operational bloat
- Save 12+ hours weekly through automated micro-systems
- Drive measurable conversion increases within 14 days

Would you be open to a 3-minute screen recording showcasing how this applies specifically to {{Company}}'s current goals?

Best regards,

AgentOS Academy
support@agentosacademy.com
https://agentosacademy.com`;
  }

  // Default: Comprehensive SEO Blog Post
  return `# A Complete Practical Guide: ${topic}

**Audience**: ${audience} | **Tone**: ${tone} | **Published**: 2026 Edition

---

### Executive Overview

Navigating **${topic}** is one of the highest-leverage skills in today's digital landscape. Whether you are an experienced operator or an ambitious newcomer among ${audience}, mastering the nuances of this subject separates market leaders from those who struggle with inconsistent outcomes.

In this deep dive, we break down the fundamental principles, modern tools, and execution strategies required to succeed.

---

### 1. Key Challenges & Opportunities

When addressing ${coreSubject}, organizations and creators typically encounter three major friction points:
1. **Information Overload**: Distinguishing high-impact strategies from outdated tactics.
2. **Resource Constraints**: Achieving enterprise-grade results with lean, agile budgets.
3. **Sustainable Scaling**: Building systems that continue to deliver without constant manual intervention.

By adopting a structured methodology, you transform these challenges into a competitive moat.

---

### 2. The 4-Step Execution Framework

#### Phase 1: Foundational Setup
Establish measurable milestones. Define the exact metrics that signify progress—whether that is conversion rate, audience reach, or monthly recurring revenue.

#### Phase 2: Systematic Implementation
Deploy targeted solutions for ${coreSubject}. Eliminate unnecessary steps and focus exclusively on core deliverables that resonate with ${audience}.

#### Phase 3: Measurement & Rapid Iteration
Monitor real-time feedback loops. Track performance data and optimize underperforming elements every 7 days.

#### Phase 4: Long-Term Compounding
Automate repetitive tasks using modern AI micro-tools, allowing you to focus your mental bandwidth on high-leverage strategic decisions.

---

### Conclusion & Next Steps

Success in **${topic}** is not a matter of luck; it is the natural byproduct of clear systems, modern tools, and consistent execution. 

Explore the AgentOS Academy suite for interactive utilities to streamline your workflow and expand your global reach.`;
}

// Global AI Knowledge Base & Assistant Handler
export function queryAgentOsAssistant(question: string): AssistantResponse {
  const q = cleanTopic(question.toLowerCase());

  // Topic: Video creation
  if (q.includes('video') || q.includes('reel') || q.includes('youtube') || q.includes('shorts') || q.includes('animation')) {
    return {
      answer: `### 🎬 How to Make AI Videos Step-by-Step (2026 Production Blueprint)

Here is the exact end-to-end stack used by solo creators to produce cinematic, high-retention AI videos:

1. **Scripting & Shot List (Claude 3.5 / ChatGPT)**
   - Prompt: *"Write a 45-second viral video script on [Topic]. Include visual prompts for each 4-second scene, camera movements, and voiceover text."*

2. **Visual Generation (Flux.1 / Midjourney v6.1)**
   - Generate static keyframes. Keep lighting and seeds consistent (e.g. *cinematic 35mm, volumetric lighting, photorealistic*).

3. **Motion Synthesis (Text-to-Video & Image-to-Video)**
   - **Runway Gen-3 Alpha**: Best for cinematic camera motion (pans, zooms, drone sweeps).
   - **Kling AI / Luma Dream Machine**: Best for realistic human motion and physics.
   - **Pika 2.0**: Great for special effects and micro-actions.

4. **Studio Voice & Soundscapes (ElevenLabs + Suno)**
   - Generate realistic narration on **ElevenLabs** with natural pauses.
   - Layer subtle background music from **Suno/Udio** and Foley sound effects (whooshes, ambient room tone).

5. **Editing & Polish (CapCut Desktop / DaVinci Resolve)**
   - Cut every 2.5–3.5 seconds to retain viewer attention.
   - Add bold animated auto-captions and export in 1080p/4K.

💡 **Monetization Tip**: Sell short-form UGC videos to international e-commerce and SaaS brands for **$500–$1,500/video**!`,
      suggestedFollowUps: [
        'How do I monetize AI videos on YouTube Shorts?',
        'Can I generate AI video scripts using the Content Writer tool?',
        'What are the best free tools to generate voiceovers?'
      ],
      relevantTool: {
        name: 'AI Blog & Social Content Writer',
        href: '/tools/content-writer',
        description: 'Generate video scripts, Twitter threads, and viral hooks in seconds.'
      }
    };
  }

  // Topic: Freelance & USD Earnings from India
  if (q.includes('earn') || q.includes('money') || q.includes('freelance') || q.includes('client') || q.includes('dollar') || q.includes('usd') || q.includes('india')) {
    return {
      answer: `### 🚀 How to Earn $3,000–$5,000/Month from India in Global USD

The key to high earnings is **Currency Arbitrage**: charging in USD ($) while spending in INR (₹).

#### The 4-Step Roadmap:
1. **Position as a Specialist, Not a Generic Freelancer**
   - Don't say "I am a web developer." Say: *"I build high-converting Next.js landing pages with integrated analytics and email collection for US B2B startups."*
   
2. **Build an ATS-Optimized Portfolio & Resume**
   - US recruiters and remote agencies use ATS (Applicant Tracking Systems) that reject 75% of non-standard resumes.
   - Use our Harvard Classic or Modern Tech layout with high-impact action verbs.

3. **Share Social Proof with a Branded Bio Link Page**
   - Replace messy PDF portfolios with a clean, branded Bio Link page showcasing your best projects, live links, and booking calendar.

4. **Frictionless International Payments**
   - Use **PayPal / PayPal.me** or **Lemon Squeezy** to collect USD without needing complex US incorporation or tedious banking paperwork.`,
      suggestedFollowUps: [
        'How do I write a high-converting cold email for US clients?',
        'How do I test my ATS resume score?',
        'How does PayPal work for receiving USD in India?'
      ],
      relevantTool: {
        name: 'AI Resume & Cover Letter Builder',
        href: '/tools/resume-builder',
        description: 'Create ATS-compliant resumes with Harvard, Modern Tech, and Minimal formats.'
      }
    };
  }

  // Topic: Resume Builder
  if (q.includes('resume') || q.includes('cv') || q.includes('ats') || q.includes('job') || q.includes('interview')) {
    return {
      answer: `### 📄 Resume Optimization & ATS Standards

AgentOS Academy includes a dedicated **AI Resume & Cover Letter Builder**:

- **3 Industry Layouts**:
  1. *Harvard Classic*: Strict single-column serif format preferred by traditional corporate, finance, and legal recruiters.
  2. *Modern Tech*: Accent pills, skill badges, and clear hierarchy built for engineering and startup hiring.
  3. *Minimal Clean*: Asymmetrical sidebar layout with quick contact metadata and focused project experience.
- **ATS Score Meter (0–100%)**: Evaluates quantifiable metrics, impact bullet points, and recruiter readability.
- **Random Sample Profiles**: Instantly populate realistic profiles (Design, DevOps, Growth) to see how top performers format their CVs.
- **Cover Letter Generator**: Auto-generates matching, high-converting cover letters with 1 click.`,
      suggestedFollowUps: [
        'How does the ATS score calculator work?',
        'Which resume layout is best for software engineers?',
        'How do I download my resume as a PDF?'
      ],
      relevantTool: {
        name: 'AI Resume Builder',
        href: '/tools/resume-builder',
        description: 'Test layouts and generate ATS-compliant resumes.'
      }
    };
  }

  // Topic: Bio Links / Link in Bio
  if (q.includes('bio') || q.includes('linktree') || q.includes('social') || q.includes('instagram') || q.includes('profile')) {
    return {
      answer: `### 🔗 Bio Link Pages (High-Converting Linktree Alternative)

Our Bio Link tool lets creators and consultants build a unified digital storefront:

- **Mobile Simulator**: Live preview of your smartphone card with custom avatars and badges.
- **Dynamic Themes**: Minimal Dark, Indigo Glow, and Sunset Cyber styling.
- **Integrated Scheduling**: Add Cal.com / Calendly direct booking buttons.
- **Real-Time Click Tracking**: Monitor visitors and link interactions across campaigns.`,
      suggestedFollowUps: [
        'How do I add custom links to my bio page?',
        'Can I track visitors with the URL shortener?',
        'How do I connect a custom domain?'
      ],
      relevantTool: {
        name: 'Bio Link Creator',
        href: '/tools/bio-link',
        description: 'Build your personal landing page in 60 seconds.'
      }
    };
  }

  // Topic: Pricing & Why Free
  if (q.includes('price') || q.includes('cost') || q.includes('free') || q.includes('paypal') || q.includes('payment')) {
    return {
      answer: `### 💳 Pricing & Why Tools Are Free

- **Why Are Core Tools Free?**
  We believe high-quality productivity tools should be accessible to all creators worldwide. Built on modern edge cloud architecture, our operational cost per user is near-zero.
- **Freemium Business Model**:
  Core tools are 100% free with no credit card required. Power users who need unlimited high-volume shortlinks, custom branding removal, and API webhooks can upgrade to Pro ($19/mo) or Agency ($49/mo).
- **Global Frictionless Payments**:
  We support **PayPal / PayPal.me** and **Lemon Squeezy** so you can pay or receive funds anywhere in the world without complicated documentation.`,
      suggestedFollowUps: [
        'What features are in the Pro plan?',
        'How does the PayPal checkout work?',
        'Can I use the tools without creating an account?'
      ],
      relevantTool: {
        name: 'View Pricing & Plans',
        href: '/pricing',
        description: 'Explore free tier benefits and upgrade with PayPal.'
      }
    };
  }

  // Fallback: Comprehensive AI Assistant Answer
  return {
    answer: `### 🤖 AgentOS Academy AI Copilot

I can help you with anything regarding our 6 SaaS micro-tools, digital business creation, AI workflows, or global freelancing:

Here is a quick overview of what you can do on the platform:
1. **AI Resume Builder**: Create ATS-optimized resumes in Harvard Classic, Modern Tech, and Minimal formats.
2. **Bio Link Pages**: Build personal landing pages for your social media bios and client portfolios.
3. **AI Content Writer**: Generate viral Twitter threads, LinkedIn carousels, cold emails, and video scripts for *any* topic.
4. **HTML Email Signatures**: Design branded signatures compatible with Gmail, Apple Mail, and Outlook.
5. **Testimonial Collector**: Collect and embed social proof on your website with 1 line of code.
6. **URL Shortener & QR**: Shorten links, generate QR codes, and monitor click analytics.

Feel free to ask a specific question like:
- *"How to make AI videos step-by-step?"*
- *"How to earn in USD from India?"*
- *"How do I format an ATS-friendly resume?"*`,
    suggestedFollowUps: [
      'How to make AI videos step-by-step?',
      'How can I earn in USD freelancing from India?',
      'Which tools are 100% free on AgentOS Academy?'
    ]
  };
}

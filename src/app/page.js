"use client";

import { useState } from "react";
import Link from "next/link";

const HomePage = () => {
  // Modal state management
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({ name: "", email: "", contact: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDemoForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Demo Request Submitted:", demoForm);
    // Clear form inputs and smoothly close out modal
    setDemoForm({ name: "", email: "", contact: "" });
    setIsDemoModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans relative overflow-x-hidden">
      
      {/* 1. Header/Navbar Layout */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <span className="text-xl font-black tracking-tight text-blue-600">DeepRank</span>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
              <a href="#analytics" className="hover:text-blue-600 transition-colors">Analytics</a>
              <a href="#projects" className="hover:text-blue-600 transition-colors">Projects</a>
              <a href="#pricing" className="hover:text-blue-600 transition-colors">Strategy</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
              Sign in
            </Link>
            <Link href="/signup">
              <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors">
                Get Started Workspace
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/60 px-3 py-1 text-xs font-semibold text-blue-700 animate-pulse">
          <span>✨</span> Introducing Workspace 2.0
        </div>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl leading-[1.15]">
          Master Your Workspace
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          Centralize your customized executive workflows. Trace tasks, manage functional team structures, and achieve clear milestones on high-priority delivery tracks.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/signup">
            <button className="rounded-2xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/10 hover:bg-blue-700 hover:shadow-xl transition-all hover:-translate-y-0.5 duration-200">
              Get Started
            </button>
          </Link>
          <button 
            onClick={() => setIsDemoModalOpen(true)}
            className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-all hover:-translate-y-0.5 duration-200"
          >
            Request Demo
          </button>
        </div>

        {/* 3. Hero Product Mockup UI Container */}
        <div className="mt-16 rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/80 max-w-5xl mx-auto group">
          <div className="rounded-[1.8rem] bg-slate-950 p-6 min-h-[480px] text-left shadow-inner flex flex-col justify-between relative overflow-hidden transition-all duration-300 border border-slate-800">
            
            {/* Ambient Background Glow Layer */}
            <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-80 h-80 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/15 transition-all duration-500" />
            <div className="absolute bottom-12 right-12 w-60 h-60 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />

            {/* Mock Dashboard Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 relative z-10">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-500/90" />
                <div className="h-3 w-3 rounded-full bg-amber-500/90" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/90" />
                <span className="ml-4 text-xs font-bold text-slate-500 tracking-wider uppercase">Executive Overview Layout</span>
              </div>
              <div className="h-8 rounded-xl bg-slate-900 border border-slate-800 px-3 flex items-center text-[11px] font-medium text-slate-400 gap-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                Live Network Active
              </div>
            </div>

            {/* Mock Dashboard Core Grid Layout (Replacing Red Box Content Perfectly) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 flex-1 relative z-10">
              
              {/* Left Column: Creative Interactive Abstract Matrix Graph */}
              <div className="lg:col-span-7 rounded-2xl bg-slate-900/40 border border-slate-800/80 p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Deployment Pipeline Node Analytics</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Real-time optimization structures</p>
                  </div>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-md font-mono border border-blue-500/20">v2.0.4</span>
                </div>

                {/* Creative Vector Interactive Visualization map */}
                <div className="my-auto py-8 flex items-center justify-center relative">
                  <svg className="w-full max-w-[340px] h-40 overflow-visible" viewBox="0 0 200 100">
                    <defs>
                      <linearGradient id="grad-line" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#6366f1" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    {/* Animated Data Paths */}
                    <path d="M20,50 Q60,10 100,50 T180,50" fill="none" stroke="url(#grad-line)" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                    <path d="M20,50 Q60,90 100,50 T180,50" fill="none" stroke="url(#grad-line)" strokeWidth="1.5" opacity="0.6" />
                    
                    {/* Interconnected Functional Nodes */}
                    <circle cx="20" cy="50" r="5" className="fill-blue-500 animate-pulse" />
                    <circle cx="60" cy="23" r="4" className="fill-indigo-400" />
                    <circle cx="100" cy="50" r="7" className="fill-blue-600 shadow-xl" />
                    <circle cx="140" cy="77" r="4" className="fill-indigo-400" />
                    <circle cx="180" cy="50" r="5" className="fill-blue-500 animate-pulse" />

                    {/* Ping Rings */}
                    <circle cx="100" cy="50" r="12" fill="none" stroke="#3b82f6" strokeWidth="1" className="animate-ping" opacity="0.3" />
                  </svg>
                  
                  {/* Floating Micro-data Overlay Badges */}
                  <div className="absolute top-4 right-4 bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-[10px] font-mono text-indigo-400 shadow-xl animate-bounce backdrop-blur-md">
                    ⚡ Latency: 14ms
                  </div>
                  <div className="absolute bottom-2 left-4 bg-slate-900/90 border border-slate-800 p-2 rounded-xl text-[10px] text-slate-300 flex items-center gap-1.5 shadow-xl backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Optimal Sync Rate
                  </div>
                </div>

                <div className="flex gap-2 text-[11px] text-slate-400">
                  <div className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">Operational Margin: <span className="text-white font-mono font-bold">99.8%</span></div>
                  <div className="bg-slate-900 border border-slate-800 px-2 py-1 rounded-lg">Active Tracks: <span className="text-blue-400 font-mono font-bold">12/12</span></div>
                </div>
              </div>

              {/* Right Column: Live Feed Status Tracking Streams */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                
                {/* Simulated Metrics Card */}
                <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-4 flex items-center justify-between backdrop-blur-sm">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Overall System Yield</span>
                    <div className="text-2xl font-black text-white mt-1 tracking-tight">$42,891.50</div>
                  </div>
                  <div className="h-10 w-20 flex items-end gap-1 font-mono">
                    <div className="w-full bg-slate-800 h-1/2 rounded-sm" />
                    <div className="w-full bg-slate-800 h-2/3 rounded-sm" />
                    <div className="w-full bg-blue-500 h-5/6 rounded-sm animate-pulse" />
                    <div className="w-full bg-blue-600 h-full rounded-sm" />
                  </div>
                </div>

                {/* Micro Activity Feed Blocks */}
                <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-4 flex-1 flex flex-col justify-between backdrop-blur-sm">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-3">Live Task Activity Stream</span>
                  
                  <div className="space-y-2.5 flex-1">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/60 flex items-center justify-between text-xs transition-all hover:bg-slate-900/80">
                      <div className="flex items-center gap-2.5">
                        <div className="h-6 w-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-[10px]">DR</div>
                        <div>
                          <p className="text-slate-200 font-medium">Deploy G3 Report Matrix</p>
                          <p className="text-[10px] text-slate-500">Updated by Alex • 3s ago</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full font-medium">Done</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/60 flex items-center justify-between text-xs transition-all hover:bg-slate-900/80 opacity-80">
                      <div className="flex items-center gap-2.5">
                        <div className="h-6 w-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold text-[10px]">UX</div>
                        <div>
                          <p className="text-slate-200 font-medium">Refactor Onboarding Funnel</p>
                          <p className="text-[10px] text-slate-500">Assigned to Aradhya • 12m ago</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full font-medium">Active</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800/60 flex items-center justify-between text-xs opacity-50">
                      <div className="flex items-center gap-2.5">
                        <div className="h-6 w-6 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-[10px]">DB</div>
                        <div>
                          <p className="text-slate-300 font-medium">Migrate Client Schema Tables</p>
                          <p className="text-[10px] text-slate-500">Completed yesterday</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-medium">Closed</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsDemoModalOpen(true)}
                    className="mt-4 w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-center text-xs font-semibold text-slate-300 transition-colors"
                  >
                    View Comprehensive Tracking Analytics →
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 border-t border-slate-200">
  <div className="text-center max-w-3xl mx-auto mb-16">
    <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
      Engineered for Executive Excellence
    </h2>
    <p className="mt-4 text-slate-600">
      Precision configurations tailored explicitly for agile managers and fast-paced operational frameworks.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
    {/* Card 1: Advanced Analytics */}
    <div 
      id="analytics" 
      className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 hover:shadow-md transition-all duration-300"
    >
      <div>
        {/* Mock Chart Graphic with interactive hover response */}
        <div className="mb-6 flex gap-1 items-end h-16 w-32 bg-slate-50 group-hover:bg-white/80 rounded-xl p-3 border border-slate-100 group-hover:border-blue-100 transition-colors duration-300">
          <div className="w-full bg-blue-500/80 group-hover:bg-blue-500 h-1/3 rounded-sm transition-colors" />
          <div className="w-full bg-blue-600/80 group-hover:bg-blue-600 h-2/3 rounded-sm transition-colors" />
          <div className="w-full bg-indigo-600/80 group-hover:bg-indigo-600 h-full rounded-sm transition-colors" />
          <div className="w-full bg-blue-400/80 group-hover:bg-blue-400 h-1/2 rounded-sm transition-colors" />
        </div>
        <h3 className="text-xl font-bold text-slate-950">Advanced Analytics</h3>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          Gain instant line-of-sight tracking across organizational dependencies. Map key variables, track target margins, and generate real-time metrics dashboards.
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-100 group-hover:border-blue-100/50 text-xs font-semibold text-blue-600 cursor-pointer group-hover:text-blue-700 transition-colors flex items-center gap-1">
        Trace Data Paths <span className="transform group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>

    {/* Card 2: Global Team Sync */}
    <div 
      className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/30 hover:shadow-md transition-all duration-300"
    >
      <div>
        {/* Mock Wireframe Layout with interactive hover response */}
        <div className="mb-6 flex flex-col gap-2 justify-center h-16 w-full max-w-[150px] bg-slate-50 group-hover:bg-white/80 rounded-xl p-3 border border-slate-100 group-hover:border-blue-100 transition-colors duration-300">
          <div className="h-3 w-full bg-slate-200 group-hover:bg-slate-300/70 rounded-full transition-colors" />
          <div className="h-3 w-5/6 bg-slate-300/70 group-hover:bg-blue-400/40 rounded-full transition-colors" />
        </div>
        <h3 className="text-xl font-bold text-slate-950">Global Team Sync</h3>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          Seamlessly delegate tasks to multi-tiered user configurations. Track active personnel timelines, handle shift dependencies, and build custom internal profiles.
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-slate-100 group-hover:border-blue-100/50 text-xs font-semibold text-blue-600 cursor-pointer group-hover:text-blue-700 transition-colors flex items-center gap-1">
        Explore Directories <span className="transform group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  </div>

  {/* Secondary Row Features */}
  <div id="projects" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-sm hover:border-slate-300 transition-all duration-200">
      <h4 className="font-bold text-slate-950">Data Security</h4>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed">Enterprise-grade cryptographic vaults protect client matrices and authorization fields.</p>
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-sm hover:border-slate-300 transition-all duration-200">
      <h4 className="font-bold text-slate-950">Strategic Deployment</h4>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed">One-click distribution to active team nodes with instant state synchronization updates.</p>
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-sm hover:border-slate-300 transition-all duration-200">
      <h4 className="font-bold text-slate-950">Automated Reminders</h4>
      <p className="mt-2 text-xs text-slate-600 leading-relaxed">System-generated triggers alert stakeholders before active deadline intervals close down.</p>
    </div>
  </div>
</section>

      {/* 5. Pricing Matrix Section */}
      <section id="pricing" className="bg-slate-100 py-24 border-t border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Select Your Tier</h2>
            <p className="mt-4 text-slate-600">Flexible pricing plans optimized perfectly for growing companies and enterprise workflows.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* Starter Plan */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Starter</span>
                <div className="mt-4 flex items-baseline gap-1 text-slate-950">
                  <span className="text-4xl font-extrabold tracking-tight">$49</span>
                  <span className="text-sm font-semibold text-slate-500">/mo</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-slate-600">
                  <li className="flex items-center gap-2">✓ Up to 10 Workspace Projects</li>
                  <li className="flex items-center gap-2">✓ Standard Analytics Panels</li>
                  <li className="flex items-center gap-2">✓ Basic Member Directories</li>
                </ul>
              </div>
              <Link href="/signup" className="mt-8">
                <button className="w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                  Select Plan
                </button>
              </Link>
            </div>

            {/* Pro Plan (Highlighted Card) */}
            <div className="rounded-3xl border-2 border-blue-600 bg-white p-8 shadow-xl flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute top-0 right-6 -translate-y-1/2 rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Best Value
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Pro Upgrade</span>
                <div className="mt-4 flex items-baseline gap-1 text-slate-950">
                  <span className="text-4xl font-extrabold tracking-tight">$129</span>
                  <span className="text-sm font-semibold text-slate-500">/mo</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-slate-600">
                  <li className="flex items-center gap-2 font-medium text-slate-900">✓ Unlimited Workspace Projects</li>
                  <li className="flex items-center gap-2">✓ Advanced Forecasting Tools</li>
                  <li className="flex items-center gap-2">✓ Custom Executive Hierarchies</li>
                  <li className="flex items-center gap-2">✓ 24/7 Dedicated Server Support</li>
                </ul>
              </div>
              <Link href="/signup" className="mt-8">
                <button className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-700 transition-colors">
                  Get Started With Pro
                </button>
              </Link>
            </div>

            {/* Custom Plan */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Custom</span>
                <div className="mt-4 flex items-baseline gap-1 text-slate-950">
                  <span className="text-4xl font-extrabold tracking-tight">Custom</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm text-slate-600">
                  <li className="flex items-center gap-2">✓ Full Global White-labeling</li>
                  <li className="flex items-center gap-2">✓ Hardened Cryptographic Keys</li>
                  <li className="flex items-center gap-2">✓ Unlimited Node Distributions</li>
                </ul>
              </div>
              <button 
                onClick={() => setIsDemoModalOpen(true)}
                className="mt-8 w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Conversion CTA Banner */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-center text-white shadow-xl flex flex-col items-center justify-center">
          <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Elevate Your Productivity?</h3>
          <p className="mx-auto mt-4 max-w-xl text-sm text-blue-100/90 leading-relaxed">
            Join hundreds of teams utilizing DeepRank to synchronize milestones, layout directories, and eliminate project bottlenecks.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/signup">
              <button className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700 shadow-md hover:bg-blue-50 transition-colors">
                Create Account
              </button>
            </Link>
            <button 
              onClick={() => setIsDemoModalOpen(true)}
              className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Request Demo Account
            </button>
          </div>
        </div>
      </section>

      {/* 7. Footer Section */}
      <footer className="bg-white border-t border-slate-200 text-xs text-slate-500 py-12">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <span className="text-base font-black text-slate-900 tracking-tight">DeepRank</span>
            <p className="mt-4 max-w-xs leading-relaxed">
              The premier dashboard layout tool for automated task tracking and secure administrative coordination.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-3">Product</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600">Features</a></li>
              <li><a href="#" className="hover:text-blue-600">Analytics</a></li>
              <li><a href="#" className="hover:text-blue-600">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-3">Company</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">Careers</a></li>
              <li><a href="#" className="hover:text-blue-600">Blog</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-3">Legal</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600">System Status</a></li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 mt-12 pt-6 border-t border-slate-100 text-center">
          &copy; {new Date().getFullYear()} DeepRank Inc. All rights reserved. Custom platform design built with Next.js and Tailwind CSS.
        </div>
      </footer>

      {/* 8. Interactive Premium Glassmorphism Modal Component */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]">
          
          {/* Dark Blurred Backdrop Mask */}
          <div 
            onClick={() => setIsDemoModalOpen(false)}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
          />

          {/* Glassmorphism Form Container Card */}
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/30 bg-white/70 p-8 shadow-2xl backdrop-blur-xl animate-[scaleUp_0.3s_cubic-bezier(0.16,1,0.3,1)] text-slate-900">
            
            {/* Subtle Gradient Spot Accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Header Structure */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-950">Request an Executive Demo</h3>
                <p className="text-xs text-slate-600 mt-0.5">Experience optimized workflow automation.</p>
              </div>
              <button 
                onClick={() => setIsDemoModalOpen(false)}
                className="rounded-full p-1.5 text-slate-500 hover:bg-slate-900/10 hover:text-slate-900 transition-colors"
                aria-label="Close modal"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Input Submission Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Your Full Name</label>
                <input 
                  type="text"
                  name="name"
                  required
                  value={demoForm.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-300/80 bg-white/60 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Company Email</label>
                <input 
                  type="email"
                  name="email"
                  required
                  value={demoForm.email}
                  onChange={handleInputChange}
                  placeholder="john@company.com"
                  className="w-full rounded-xl border border-slate-300/80 bg-white/60 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">Contact Number</label>
                <input 
                  type="tel"
                  name="contact"
                  required
                  value={demoForm.contact}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl border border-slate-300/80 bg-white/60 px-4 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <button 
                type="submit"
                className="mt-2 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-600/10 hover:bg-blue-700 transition-colors"
              >
                Send Request
              </button>
            </form>

          </div>
        </div>
      )}

      {/* Global CSS Injectable Animations for Vector Grid */}
      <style jsx global>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUp {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

    </main>
  );
};

export default HomePage;
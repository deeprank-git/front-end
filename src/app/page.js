import Link from "next/link";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans">
      
      {/* 1. Header/Navbar Layout */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
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
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/60 px-3 py-1 text-xs font-semibold text-blue-700">
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
            <button className="rounded-2xl bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/10 hover:bg-blue-700 hover:shadow-xl transition-all">
              Get Started
            </button>
          </Link>
          <button className="rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
            Request Demo
          </button>
        </div>

        {/* 3. Hero Product Mockup UI Container */}
        <div className="mt-16 rounded-[2.5rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/80 max-w-5xl mx-auto">
          <div className="rounded-[1.8rem] border border-slate-100 bg-slate-50 p-6 min-h-[420px] text-left shadow-inner flex flex-col justify-between">
            {/* Mock Dashboard Top Bar */}
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-4 text-xs font-bold text-slate-400 tracking-wider uppercase">Executive Overview Layout</span>
              </div>
              <div className="h-7 w-32 rounded-lg bg-white border border-slate-200" />
            </div>
            {/* Mock Dashboard Core Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 flex-1">
              <div className="md:col-span-2 rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm">
                <div className="h-4 w-1/3 rounded bg-slate-200 mb-6" />
                <div className="space-y-3">
                  <div className="h-8 w-full rounded-xl bg-slate-50 border border-slate-100" />
                  <div className="h-8 w-full rounded-xl bg-slate-50 border border-slate-100" />
                  <div className="h-8 w-full rounded-xl bg-slate-50 border border-slate-100" />
                </div>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="h-4 w-1/2 rounded bg-slate-200 mb-4" />
                  <div className="h-24 w-full rounded-full border-8 border-blue-500 border-t-slate-100 flex items-center justify-center my-2" />
                </div>
                <div className="h-3 w-3/4 rounded bg-slate-100 self-center" />
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
          <div id="analytics" className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="mb-6 flex gap-1 items-end h-16 w-32 bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="w-full bg-blue-500 h-1/3 rounded-sm" />
                <div className="w-full bg-blue-600 h-2/3 rounded-sm" />
                <div className="w-full bg-indigo-600 h-full rounded-sm" />
                <div className="w-full bg-blue-400 h-1/2 rounded-sm" />
              </div>
              <h3 className="text-xl font-bold text-slate-950">Advanced Analytics</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Gain instant line-of-sight tracking across organizational dependencies. Map key variables, track target margins, and generate real-time metrics dashboards.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-blue-600">
              Trace Data Paths →
            </div>
          </div>

          {/* Card 2: Global Team Sync */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="mb-6 flex flex-col gap-2 justify-center h-16 w-full max-w-[150px] bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="h-3 w-full bg-slate-200 rounded-full" />
                <div className="h-3 w-5/6 bg-slate-300 rounded-full" />
              </div>
              <h3 className="text-xl font-bold text-slate-950">Global Team Sync</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Seamlessly delegate tasks to multi-tiered user configurations. Track active personnel timelines, handle shift dependencies, and build custom internal profiles.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs font-semibold text-blue-600">
              Explore Directories →
            </div>
          </div>
        </div>

        {/* Secondary Row Features */}
        <div id="projects" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="font-bold text-slate-950">Data Security</h4>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">Enterprise-grade cryptographic vaults protect client matrices and authorization fields.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h4 className="font-bold text-slate-950">Strategic Deployment</h4>
            <p className="mt-2 text-xs text-slate-600 leading-relaxed">One-click distribution to active team nodes with instant state synchronization updates.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
              <button className="mt-8 w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
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
            <button className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
              Plan All Features
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

    </main>
  );
};

export default HomePage;
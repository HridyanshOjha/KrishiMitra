import { Link } from 'react-router-dom'
import {
  ArrowRight, Leaf, ShieldCheck, BarChart3, Users,
  MapPin, Gift,
  CheckCircle2, Zap, Globe2
} from 'lucide-react'
import { useDarkMode } from '@/hooks/useDarkMode'
import { Sun, Moon } from 'lucide-react'

const FEATURES = [
  {
    icon: Users,
    title: 'Farmer Registry',
    description: 'Digitize complete farmer profiles with Aadhaar-linked records, land holdings, crops, and bank details — all in one place.',
    color: 'bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400',
  },
  {
    icon: MapPin,
    title: 'Land Record Management',
    description: 'Track khasra numbers, land area, soil type, irrigation sources, and ownership with accurate geospatial mapping.',
    color: 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400',
  },
  {
    icon: Gift,
    title: 'Beneficiary Schemes',
    description: 'Browse and apply to PM-KISAN, PMFBY, KCC, and 20+ government schemes with eligibility checks and status tracking.',
    color: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Reports',
    description: 'Visual dashboards with crop distribution, scheme enrollment trends, and district-wise summaries for policymakers.',
    color: 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400',
  },
  {
    icon: ShieldCheck,
    title: 'Data Security',
    description: 'Role-based access control, encrypted Aadhaar storage, and audit trails for all record modifications.',
    color: 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400',
  },
  {
    icon: Zap,
    title: 'Instant Access',
    description: 'Mobile-first design ensures field officers can update records from any device, even in low-bandwidth rural areas.',
    color: 'bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400',
  },
]

const STATS = [
  { value: '12,000+', label: 'Farmers Registered' },
  { value: '48,500', label: 'Acres Mapped' },
  { value: '20+',    label: 'Active Schemes' },
  { value: '₹3.2Cr', label: 'Benefits Disbursed' },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Register Farmer', desc: 'Field officer records farmer details with Aadhaar, bank info, and landholding data.' },
  { step: '02', title: 'Add Land Records', desc: 'Map land parcels with khasra numbers, soil type, irrigation, and ownership documents.' },
  { step: '03', title: 'Check Eligibility', desc: 'System auto-matches farmer profile against active government schemes.' },
  { step: '04', title: 'Enroll & Track', desc: 'Submit scheme applications and track benefit disbursement in real-time.' },
]

export default function LandingPage() {
  const { dark, toggleDark } = useDarkMode()

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 overflow-x-hidden">

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="font-bold text-stone-900 dark:text-stone-100">KrishiMitra</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              {dark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              Sign In <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-60 dark:opacity-30" />
        {/* Soft radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-400/10 dark:bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 rounded-full text-xs font-semibold text-brand-700 dark:text-brand-400 mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            Government Agricultural Management System — Punjab
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight text-stone-900 dark:text-stone-50 mb-6 animate-fade-up stagger-1">
            Digitizing India's{' '}
            <em className="italic text-brand-600 dark:text-brand-400">Farmers</em>
            {' '}& Their{' '}
            <span className="relative inline-block">
              <em className="italic text-brand-600 dark:text-brand-400">Land</em>
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-stone-500 dark:text-stone-400 leading-relaxed mb-10 animate-fade-up stagger-2">
            KrishiMitra replaces paper-based agricultural records with a unified digital platform —
            tracking farmers, land parcels, and government scheme enrollments for accurate,
            accessible data management.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up stagger-3">
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl text-base transition-all duration-200 shadow-soft hover:shadow-medium hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Get Started Free
              <ArrowRight size={18} />
            </Link>
            <a
              href="#features"
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold rounded-2xl text-base transition-all duration-200 hover:bg-stone-50 dark:hover:bg-stone-800 hover:-translate-y-0.5"
            >
              Learn More
            </a>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-fade-up stagger-4">
            {['Secure & Compliant', 'Mobile Friendly', 'Offline Ready'].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
                <CheckCircle2 size={14} className="text-brand-500" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-brand-600 dark:bg-brand-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{value}</div>
                <div className="text-sm text-brand-200">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded-full text-xs font-semibold text-stone-500 dark:text-stone-400 mb-4">
            Core Features
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-normal text-stone-900 dark:text-stone-100 mb-4">
            Everything agriculture data needs
          </h2>
          <p className="text-stone-500 dark:text-stone-400 max-w-xl mx-auto">
            Built specifically for district agricultural offices, field officers, and
            government scheme administrators.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-200"
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                <Icon size={22} />
              </div>
              <h3 className="font-bold text-stone-800 dark:text-stone-100 mb-2">{title}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-stone-100 dark:bg-stone-900 border-y border-stone-200 dark:border-stone-800 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-stone-800 rounded-full text-xs font-semibold text-stone-500 dark:text-stone-400 mb-4 border border-stone-200 dark:border-stone-700">
              How It Works
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-stone-900 dark:text-stone-100">
              From field to benefits in 4 steps
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div key={step} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(100%-8px)] w-full h-px border-t-2 border-dashed border-stone-300 dark:border-stone-700 z-0" />
                )}
                <div className="relative z-10 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-soft">
                  <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                    {step}
                  </div>
                  <h4 className="font-bold text-stone-800 dark:text-stone-100 mb-2">{title}</h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="relative overflow-hidden bg-brand-600 dark:bg-brand-700 rounded-3xl px-8 py-14 text-center">
          <div className="absolute inset-0 grid-pattern opacity-10" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative">
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-white mb-4">
              Ready to digitize your district?
            </h2>
            <p className="text-brand-200 mb-8 max-w-md mx-auto">
              Join hundreds of field officers across Punjab already using KrishiMitra
              to manage farmer records and scheme enrollments.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-700 font-bold rounded-2xl hover:bg-brand-50 transition-colors shadow-soft"
            >
              Open Dashboard
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-brand-600 flex items-center justify-center">
                <Leaf size={14} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-stone-800 dark:text-stone-100">KrishiMitra</div>
                <div className="text-[11px] text-stone-400">Agricultural Management System</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-stone-500 dark:text-stone-400">
              <a href="#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Features</a>
              <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Help</a>
            </div>

            <div className="flex items-center gap-3 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <Globe2 size={13} />
                Department of Agriculture, Punjab
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 text-center text-xs text-stone-400">
            © {new Date().getFullYear()} KrishiMitra. Built for the Government of Punjab.
            All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

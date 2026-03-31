'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

/* ── Chat messages for the phone mockup ── */
const chatMessages = [
  {
    role: 'ai',
    text: "Hi! I've read your W2 from Acme Corp and your 2024 return. Income went up — nice! 🎉 Anything else change this year?",
    time: 'Just now',
  },
  {
    role: 'user',
    text: 'I got married and started a side hustle on Etsy',
    time: 'Just now',
  },
  {
    role: 'ai',
    text: "Congrats! 💍 Filing jointly will likely save you money. For the Etsy income I'll add Schedule C — did you track any business expenses?",
    time: 'Just now',
  },
  {
    role: 'user',
    text: 'Can I deduct my home office?',
    time: 'Just now',
  },
  {
    role: 'ai',
    text: 'Yes! Since you have a dedicated space, the simplified method gives you $5/sq ft up to 300 sq ft = **$1,500 deduction**. Want me to add it?',
    time: 'Just now',
  },
]

/* ── Animated phone mockup matching justfyle.ai quality ── */
function PhoneMockup() {
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [hovered, setHovered] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (visibleMessages >= chatMessages.length) {
      const replayTimer = setTimeout(() => setVisibleMessages(0), 5000)
      return () => clearTimeout(replayTimer)
    }
    const nextMsg = chatMessages[visibleMessages]
    const isAI = nextMsg.role === 'ai'
    if (isAI) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setIsTyping(false)
        setVisibleMessages((v) => v + 1)
      }, 1400)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setVisibleMessages((v) => v + 1), 900)
      return () => clearTimeout(timer)
    }
  }, [visibleMessages])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [visibleMessages, isTyping])

  const renderText = (text: string) => {
    return text.replace(
      /\*\*(.*?)\*\*/g,
      '<strong style="color:#0D9373;font-weight:700">$1</strong>'
    )
  }

  return (
    <div className="relative">
      {/* Phone frame */}
      <div
        className="w-[350px] bg-white rounded-[32px] overflow-hidden transition-all duration-500"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          border: '1.5px solid #E5E7EB',
          boxShadow: hovered
            ? '0 8px 30px rgba(13,147,115,.15), 0 30px 60px rgba(0,0,0,.12)'
            : '0 4px 6px rgba(0,0,0,.03), 0 20px 50px rgba(0,0,0,.08)',
          transform: hovered
            ? 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1.02)'
            : 'perspective(1200px) rotateY(-2deg) rotateX(1deg)',
        }}
      >
        {/* Notch */}
        <div className="flex items-center justify-center pt-2.5 bg-gray-50">
          <div className="w-24 h-1.5 rounded-full bg-gray-200" />
        </div>

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-3 bg-gray-50">
          <div
            className="w-10 h-10 rounded-[14px] flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #0D9373, #10B981)',
              boxShadow: '0 2px 8px rgba(13,147,115,.2)',
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[15px] text-gray-900">
                JustFyle.ai
              </span>
              <span
                className="inline-flex items-center gap-1 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
                style={{
                  background: '#DCFCE7',
                  color: '#166534',
                  letterSpacing: '.3px',
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                CPA Verified
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-brand-500"
                style={{ animation: 'pulse 2s infinite' }}
              />
              <span className="text-xs text-brand-500">Online now</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100 mx-5" />

        {/* Messages */}
        <div
          ref={scrollRef}
          className="p-5 flex flex-col gap-4 bg-white overflow-y-auto"
          style={{ minHeight: '220px', maxHeight: '300px', scrollbarWidth: 'none' }}
        >
          {chatMessages.slice(0, visibleMessages).map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              style={{
                animation: `bubbleIn 0.45s cubic-bezier(.22,1,.36,1) forwards`,
                opacity: 0,
                animationDelay: '0s',
                animationFillMode: 'forwards',
              }}
            >
              <div
                className={`w-[26px] h-[26px] rounded-[9px] flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'ai' ? '' : 'bg-gray-100 text-gray-400 text-xs'
                }`}
                style={
                  msg.role === 'ai'
                    ? {
                        background:
                          'linear-gradient(135deg, #0D9373, #10B981)',
                      }
                    : {}
                }
              >
                {msg.role === 'ai' ? (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                ) : (
                  '👤'
                )}
              </div>
              <div>
                <div
                  className={`max-w-[260px] px-4 py-3 text-[13px] leading-relaxed ${
                    msg.role === 'ai'
                      ? 'bg-gray-50 border border-gray-100 rounded-[18px] rounded-bl-[6px] text-gray-600'
                      : 'bg-brand-500 rounded-[18px] rounded-br-[6px] text-white font-medium'
                  }`}
                  style={
                    msg.role === 'user'
                      ? {
                          boxShadow: '0 2px 8px rgba(13,147,115,.15)',
                        }
                      : {}
                  }
                  dangerouslySetInnerHTML={{ __html: renderText(msg.text) }}
                />
                <div
                  className={`text-[10px] text-gray-400 mt-1 px-1 ${msg.role === 'user' ? 'text-right' : ''}`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div
              className="flex gap-2"
              style={{
                animation: 'bubbleIn 0.3s cubic-bezier(.22,1,.36,1) forwards',
              }}
            >
              <div
                className="w-[26px] h-[26px] rounded-[9px] flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #0D9373, #10B981)',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-[18px] rounded-bl-[6px] px-4 py-3 flex items-center gap-1.5">
                <span
                  className="w-2 h-2 bg-gray-300 rounded-full"
                  style={{ animation: 'bounce 1.4s infinite' }}
                />
                <span
                  className="w-2 h-2 bg-gray-300 rounded-full"
                  style={{ animation: 'bounce 1.4s infinite 0.2s' }}
                />
                <span
                  className="w-2 h-2 bg-gray-300 rounded-full"
                  style={{ animation: 'bounce 1.4s infinite 0.4s' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Suggestion chips */}
        <div className="flex gap-1.5 flex-wrap px-5 pb-3">
          {['What deductions can I claim?', 'How much will I owe?', 'Explain my refund'].map(
            (q, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-500 cursor-pointer transition-all duration-200 hover:bg-brand-500 hover:text-white hover:border-brand-500 hover:shadow-sm"
                style={{ animation: `bubbleIn 0.4s ease-out ${2 + i * 0.15}s both` }}
              >
                {q}
              </span>
            )
          )}
        </div>

        {/* Input bar */}
        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-1">
            <span className="flex-1 text-[13px] text-gray-400 py-2">
              Ask anything about your taxes...
            </span>
            <span className="text-sm">📎</span>
            <span className="text-sm">🎤</span>
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: '#0D9373' }}
            >
              <span className="text-white text-sm">➤</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 text-center mt-2">
            CPA reviews every return before filing
          </p>
        </div>
      </div>

      {/* Floating badges */}
      <div
        className="absolute -left-10 top-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-3.5 hidden lg:block hover:scale-105 transition-transform duration-300 cursor-default"
        style={{ animation: 'fadeInLeft 0.6s ease-out 2.5s both, floatBadge 3s ease-in-out 3.1s infinite' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0D9373"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">100% CPA Reviewed</p>
            <p className="text-[10px] text-gray-500">Every single return</p>
          </div>
        </div>
      </div>

      <div
        className="absolute -right-8 bottom-32 bg-white rounded-2xl shadow-lg border border-gray-100 p-3.5 hidden lg:block hover:scale-105 transition-transform duration-300 cursor-default"
        style={{ animation: 'fadeInRight 0.6s ease-out 4s both, floatBadge 3s ease-in-out 4.6s infinite' }}
      >
        <p className="text-xs font-bold text-gray-900">Tax Savings Found</p>
        <p className="text-2xl font-extrabold text-brand-500">+$1,645</p>
        <p className="text-[10px] text-gray-500">For next year</p>
      </div>

      {/* Third floating badge */}
      <div
        className="absolute -left-4 bottom-20 bg-white rounded-2xl shadow-lg border border-gray-100 p-3.5 hidden lg:block hover:scale-105 transition-transform duration-300 cursor-default"
        style={{ animation: 'fadeInLeft 0.6s ease-out 5.5s both, floatBadge 3.5s ease-in-out 6.1s infinite' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 text-lg">
            🎉
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">Refund Estimate</p>
            <p className="text-lg font-extrabold text-brand-500">$3,847</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }
        @keyframes bubbleIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

/* ── Auth form with tabs ── */
function AuthForm() {
  const [mode, setMode] = useState<'login' | 'signup'>('signup')

  return (
    <div className="w-full max-w-md md:max-w-lg">
      {/* Tab switcher */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
        <button
          onClick={() => setMode('signup')}
          className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
            mode === 'signup'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Create Account
        </button>
        <button
          onClick={() => setMode('login')}
          className={`flex-1 py-3 text-sm font-semibold rounded-lg transition-all ${
            mode === 'login'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Log In
        </button>
      </div>

      <form
        action={mode === 'login' ? '/login' : '/signup'}
        method="GET"
        onSubmit={(e) => {
          e.preventDefault()
          window.location.href = mode === 'login' ? '/login' : '/signup'
        }}
      >
        {mode === 'signup' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Smith"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-gray-50 transition-all"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-gray-50 transition-all"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent bg-gray-50 transition-all"
          />
        </div>

        <Link
          href={mode === 'login' ? '/login' : '/signup'}
          className="block w-full py-3.5 text-white font-semibold text-sm rounded-xl text-center transition-all hover:shadow-md"
          style={{
            background: '#0D9373',
            boxShadow:
              '0 1px 3px rgba(0,0,0,.08), 0 4px 14px rgba(13,147,115,.2)',
          }}
        >
          {mode === 'signup' ? 'Get Started — It\'s Free' : 'Log In'}
        </Link>
      </form>

      {mode === 'login' && (
        <p className="text-center mt-4">
          <a href="#" className="text-sm text-brand-500 hover:underline">
            Forgot your password?
          </a>
        </p>
      )}

      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0D9373"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <p className="text-xs text-gray-500">
            <strong className="text-gray-700">Savings guarantee:</strong> If we
            can&apos;t find at least one way to reduce your taxes next year, your
            filing is free.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0D9373"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <p className="text-xs text-gray-500">
            <strong className="text-gray-700">Bank-level security.</strong>{' '}
            256-bit encryption. Your data is never sold.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ── Main Page ── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-gray-100"
        style={{
          background: 'rgba(255,255,255,.88)',
          backdropFilter: 'blur(24px) saturate(1.4)',
        }}
      >
        <div className="text-xl font-extrabold text-gray-900" style={{ letterSpacing: '-.5px' }}>
          Just<span className="text-brand-500">Fyle</span>.ai
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 bg-brand-500 text-white text-sm font-bold rounded-full hover:bg-brand-600 transition-colors"
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,.08), 0 4px 14px rgba(13,147,115,.2)',
            }}
          >
            Create Account
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center py-8 sm:py-12 px-6 sm:px-8 md:px-12">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Auth form */}
          <div>
            <div className="mb-8">
              <div
                className="inline-flex items-center gap-2 text-xs font-bold uppercase px-3 py-1.5 rounded-full mb-6"
                style={{
                  background: '#DCFCE7',
                  color: '#166534',
                  letterSpacing: '.3px',
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Every Return CPA Reviewed
              </div>
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4"
                style={{ letterSpacing: '-.5px' }}
              >
                Tax filing that actually{' '}
                <span className="text-brand-500">saves you money.</span>
                <br />
                <span className="text-brand-500">Guaranteed.</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed max-w-md md:max-w-lg">
                No 50 screens of questions. No confusing forms. Just a
                conversation with AI — and a CPA who reviews everything before
                you file. Plus a free tax planning report so you pay less next
                year.
              </p>
            </div>

            <AuthForm />
          </div>

          {/* Right: Phone mockup */}
          <div className="hidden lg:flex justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="border-t border-gray-100 py-6 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0D9373"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>100% CPA Reviewed</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0D9373"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            <span>Guaranteed Tax Savings</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0D9373"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Bank-Level Security</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0D9373"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Done in 10 Minutes</span>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { Shield, MessageSquare, FileCheck, TrendingUp, CheckCircle, Star } from 'lucide-react'

export default function SignupPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: 'client',
        },
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/chat')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="text-3xl font-bold text-gray-900">
              Just<span className="text-brand-500">Fyle</span>.ai
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mt-8">Create your free account</h2>
            <p className="text-gray-500 mt-2">Start filing your taxes in minutes, not hours</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Smith"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-gray-900 placeholder:text-gray-400"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
            >
              {loading ? 'Creating account...' : 'Get Started Free'}
            </button>

            <p className="text-xs text-gray-400 text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-500 font-semibold hover:text-brand-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Feature Showcase */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 items-center justify-center p-12 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border-2 border-white rounded-full" />
          <div className="absolute bottom-32 right-16 w-64 h-64 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-white rounded-full" />
        </div>

        <div className="relative z-10 max-w-lg">
          {/* Phone mockup - chat preview */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-6 mb-8">
            <div className="bg-white rounded-2xl p-5 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JF</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">JustFyle AI</p>
                  <p className="text-xs text-brand-500">CPA Verified</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl rounded-bl-sm p-3">
                  <p className="text-xs text-gray-700">Welcome! Upload your W-2 and I&apos;ll handle the rest. No confusing forms to fill out.</p>
                </div>
                <div className="bg-brand-500 rounded-xl rounded-br-sm p-3 ml-8">
                  <p className="text-xs text-white">Here&apos;s my W-2 from my employer</p>
                </div>
                <div className="bg-gray-50 rounded-xl rounded-bl-sm p-3">
                  <p className="text-xs text-gray-700">Got it! I see you earned $78,500 with $12,400 in federal withholding. Based on this, you&apos;re looking at a refund of approximately $3,200.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features + Guarantee */}
          <div className="space-y-4 text-white">
            <h3 className="text-2xl font-bold">Why 50,000+ filers trust JustFyle</h3>

            <div className="space-y-3 mt-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={16} className="text-white" />
                </div>
                <p className="text-sm text-brand-50">File by chatting, not filling out 50 screens</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileCheck size={16} className="text-white" />
                </div>
                <p className="text-sm text-brand-50">State-board certified CPA reviews every return</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={16} className="text-white" />
                </div>
                <p className="text-sm text-brand-50">Tax planning that saves you thousands next year</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield size={16} className="text-white" />
                </div>
                <p className="text-sm text-brand-50">256-bit encryption protects your data</p>
              </div>
            </div>

            {/* Guarantee badge */}
            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={20} className="text-green-300" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">Money-Back Savings Guarantee</p>
                  <p className="text-xs text-brand-100 mt-1 leading-relaxed">We guarantee we&apos;ll find real savings for you next year with tax planning that actually works, or your money back. No gimmicks, no fine print.</p>
                </div>
              </div>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-white/30 border-2 border-white/50 flex items-center justify-center">
                    <Star size={10} className="text-yellow-300 fill-yellow-300" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-brand-100 ml-1">4.9/5 from 12,000+ reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

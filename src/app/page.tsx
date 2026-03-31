'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const chatMessages = [
  { role: 'assistant', text: "Hi! I'm your AI tax assistant. Upload your docs and I'll handle everything. Ready?" },
  { role: 'user', text: "Here's my W-2" },
  { role: 'assistant', text: 'Got it! Based on your W-2, your estimated refund is $3,247. I also found 2 deductions you may have missed.' },
  { role: 'user', text: 'Apply them!' },
  { role: 'assistant', text: 'Done! New refund: $4,892. Ready for CPA review.' },
]

function AnimatedPhoneMockup() {
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (visibleMessages >= chatMessages.length) return
    const nextMsg = chatMessages[visibleMessages]
    const isAssistant = nextMsg.role === 'assistant'
    if (isAssistant) {
      setIsTyping(true)
      const typingTimer = setTimeout(() => { setIsTyping(false); setVisibleMessages((v) => v + 1) }, 1200)
      return () => clearTimeout(typingTimer)
    } else {
      const timer = setTimeout(() => { setVisibleMessages((v) => v + 1) }, 800)
      return () => clearTimeout(timer)
    }
  }, [visibleMessages])

  return (
    <div className="relative">
      <div className="w-[280px] sm:w-80 bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        <div className="bg-white rounded-[2.5rem] overflow-hidden">
          <div className="bg-brand-500 px-6 pt-8 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-brand-500 font-bold text-sm">JF</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">JustFyle AI</p>
                <p className="text-xs text-brand-100">Online &bull; CPA Verified</p>
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3 bg-gray-50 overflow-hidden" style={{ minHeight: '320px' }}>
            {chatMessages.slice(0, visibleMessages).map((msg, i) => (
              <div key={i} className={`transition-all duration-500 ease-out ${msg.role === 'user' ? 'flex justify-end' : ''}`} style={{ animation: 'slideUp 0.4s ease-out' }}>
                <div className={msg.role === 'assistant' ? 'bg-white rounded-xl rounded-bl-sm p-3 shadow-sm max-w-[85%]' : 'bg-brand-500 rounded-xl rounded-br-sm p-3 max-w-[75%]'}>
                  <p className={`text-xs ${msg.role === 'assistant' ? 'text-gray-700' : 'text-white'}`} dangerouslySetInnerHTML={{ __html: msg.text.replace(/\$3,247/g, '<span class="font-bold" style="color: #0D9373">$3,247</span>').replace(/\$4,892/g, '<span class="font-bold" style="color: #0D9373">$4,892</span>') }} />
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-1 bg-white rounded-xl rounded-bl-sm p-3 shadow-sm max-w-[60px]" style={{ animation: 'slideUp 0.3s ease-out' }}>
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            )}
          </div>
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2.5">
              <p className="text-xs text-gray-400 flex-1">Ask about your taxes...</p>
              <div className="w-7 h-7 bg-brand-500 rounded-full flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -left-4 sm:-left-16 top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4 max-w-[160px] sm:max-w-[180px]" style={{ animation: 'fadeInLeft 0.6s ease-out 2s both' }}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-900">CPA Approved</p>
            <p className="text-[10px] text-gray-500">Every return verified</p>
          </div>
        </div>
      </div>
      <div className="absolute -right-4 sm:-right-12 bottom-32 bg-white rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4" style={{ animation: 'fadeInRight 0.6s ease-out 3.5s both' }}>
        <p className="text-xs font-semibold text-gray-900">Tax Savings Found</p>
        <p className="text-xl font-bold text-brand-500">+$1,645</p>
        <p className="text-[10px] text-gray-500">For next year</p>
      </div>
      <style jsx>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <nav className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-gray-100">
        <div className="text-2xl font-bold text-gray-900">Just<span className="text-brand-500">Fyle</span>.ai</div>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Log In</Link>
          <Link href="/signup" className="px-4 sm:px-5 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-xl hover:bg-brand-600 transition-colors shadow-sm">Create Account</Link>
        </div>
      </nav>
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 text-sm font-medium px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-brand-500 rounded-full" />
              CPA-reviewed. AI-powered. Guaranteed savings.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              File your taxes as easily as{' '}<span className="text-brand-500">sending a text</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
              Your AI tax assistant walks you through everything in a simple conversation. No confusing screens, no jargon. Just answers. Your completed return is reviewed by a state-board certified CPA before you sign and e-file.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/signup" className="px-8 py-4 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all shadow-sm hover:shadow-md text-center">Get Started for Free</Link>
              <Link href="/login" className="px-8 py-4 bg-white text-brand-600 font-semibold rounded-xl border-2 border-brand-200 hover:bg-brand-50 transition-all text-center">Log In</Link>
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 sm:pt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2"><svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Done in 10 minutes</div>
              <div className="flex items-center gap-2"><svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>CPA-reviewed</div>
              <div className="flex items-center gap-2"><svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>Savings guaranteed</div>
            </div>
          </div>
          <div className="flex justify-center"><AnimatedPhoneMockup /></div>
        </div>
      </div>
    </div>
  )
}

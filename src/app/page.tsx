import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <div className="text-2xl font-bold text-gray-900">
          Just<span className="text-brand-500">Fyle</span>.ai
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-xl hover:bg-brand-600 transition-colors shadow-sm"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 py-16 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 text-sm font-medium px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-brand-500 rounded-full" />
              CPA-reviewed. AI-powered. Guaranteed savings.
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              File your taxes as easily as{' '}
              <span className="text-brand-500">sending a text</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Your AI tax assistant walks you through everything in a simple conversation. No confusing screens, no jargon. Just answers. Your completed return is reviewed by a state-board certified CPA before you sign and e-file.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all shadow-sm hover:shadow-md text-center"
              >
                Start Filing for Free
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-white text-brand-600 font-semibold rounded-xl border-2 border-brand-200 hover:bg-brand-50 transition-all text-center"
              >
                Sign In
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Done in 10 minutes
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                CPA-reviewed
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                Savings guaranteed
              </div>
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-80 bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-brand-500 px-6 pt-8 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-brand-500 font-bold text-sm">JF</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">JustFyle AI</p>
                        <p className="text-xs text-brand-100">Online - CPA Verified</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat content */}
                  <div className="p-4 space-y-3 bg-gray-50" style={{ minHeight: '320px' }}>
                    <div className="bg-white rounded-xl rounded-bl-sm p-3 shadow-sm max-w-[85%]">
                      <p className="text-xs text-gray-700">Hi! I&apos;m your tax assistant. Upload your docs and I&apos;ll handle everything. Ready?</p>
                    </div>
                    <div className="bg-brand-500 rounded-xl rounded-br-sm p-3 ml-auto max-w-[75%]">
                      <p className="text-xs text-white">Here&apos;s my W-2</p>
                    </div>
                    <div className="bg-white rounded-xl rounded-bl-sm p-3 shadow-sm max-w-[85%]">
                      <p className="text-xs text-gray-700">Got it! Based on your W-2, your estimated refund is <span className="font-bold text-brand-600">$3,247</span>. I also found 2 deductions you may have missed.</p>
                    </div>
                    <div className="bg-brand-500 rounded-xl rounded-br-sm p-3 ml-auto max-w-[65%]">
                      <p className="text-xs text-white">Apply them!</p>
                    </div>
                    <div className="bg-white rounded-xl rounded-bl-sm p-3 shadow-sm max-w-[85%]">
                      <p className="text-xs text-gray-700">Done! New refund: <span className="font-bold text-brand-600">$4,892</span>. Ready for CPA review.</p>
                    </div>
                  </div>

                  {/* Input bar */}
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

              {/* Floating badges */}
              <div className="absolute -left-16 top-24 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 max-w-[180px]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">CPA Approved</p>
                    <p className="text-[10px] text-gray-500">Every return verified</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-12 bottom-32 bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
                <p className="text-xs font-semibold text-gray-900">Tax Savings Found</p>
                <p className="text-xl font-bold text-brand-500">+$1,645</p>
                <p className="text-[10px] text-gray-500">For next year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

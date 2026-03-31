'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { MessageSquare, FileText, PiggyBank, Settings, LogOut, TrendingUp, HelpCircle } from 'lucide-react'
import OnboardingTutorial from '@/components/OnboardingTutorial'

const navItems = [
  { href: '/chat', label: 'Tax Chat', icon: MessageSquare, description: 'Chat with your AI tax assistant', targetId: 'nav-tax-chat' },
  { href: '/documents', label: 'Documents', icon: FileText, description: 'Upload & manage tax documents', targetId: 'nav-documents' },
  { href: '/tax-planning', label: 'Tax Planning', icon: PiggyBank, description: 'Strategies to save next year', targetId: 'nav-tax-planning' },
  { href: '/settings', label: 'Settings', icon: Settings, description: 'Account & preferences', targetId: 'nav-settings' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [showTutorial, setShowTutorial] = useState(false)

  useEffect(() => {
    try {
      const completed = localStorage.getItem('justfyle_onboarding_complete')
      if (!completed) {
        const timer = setTimeout(() => setShowTutorial(true), 800)
        return () => clearTimeout(timer)
      }
    } catch (e) {}
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex bg-surface-100">
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link href="/chat" className="text-xl font-bold text-gray-900">
            Just<span className="text-brand-500">Fyle</span>.ai
          </Link>
          <p className="text-xs text-gray-400 mt-1">AI-Powered Tax Filing</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                id={item.targetId}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-brand-50 text-brand-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <div>
                  <p>{item.label}</p>
                  {isActive && (
                    <p className="text-[10px] text-brand-400 font-normal mt-0.5">{item.description}</p>
                  )}
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="mx-4 mb-4" id="tax-savings-widget">
          <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 rounded-2xl p-5 border border-brand-200/50">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-brand-600" />
              <p className="text-xs font-semibold text-brand-700 uppercase tracking-wide">Potential Tax Savings</p>
            </div>
            <p className="text-xs text-gray-500 mb-2">Estimated savings for next year</p>
            <p className="text-3xl font-bold text-brand-600">$0</p>
            <p className="text-xs text-gray-500 mt-1">Range: $0 - $0</p>
            <div className="mt-3 h-2 bg-brand-200/50 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full transition-all duration-1000" style={{ width: '0%' }} />
            </div>
            <p className="text-[10px] text-gray-400 mt-2">Updates as we learn more about your taxes</p>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors w-full">
            <HelpCircle size={20} />
            Support
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-6">
            <div className="text-right" id="federal-refund-display">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Federal Refund</p>
              <p className="text-lg font-bold text-gray-900">$0.00</p>
            </div>
            <div className="w-px h-8 bg-gray-200" />
            <div className="text-right" id="state-refund-display">
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">State Refund</p>
              <p className="text-lg font-bold text-gray-900">$0.00</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>

      {showTutorial && (
        <OnboardingTutorial onComplete={() => setShowTutorial(false)} />
      )}
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { MessageSquare, FileText, PiggyBank, Settings, LogOut, TrendingUp, HelpCircle, Menu, X } from 'lucide-react'
import OnboardingTutorial from '@/components/OnboardingTutorial'
import SessionGuard from '@/components/SessionGuard'

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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    try {
      const completed = localStorage.getItem('justfyle_onboarding_complete')
      if (!completed) {
        const timer = setTimeout(() => setShowTutorial(true), 800)
        return () => clearTimeout(timer)
      }
    } catch (e) {}
  }, [])

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Close sidebar on escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const currentPage = navItems.find((item) => item.href === pathname)

  return (
    <div className="min-h-screen flex bg-surface-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <Link href="/chat" className="text-xl font-bold text-gray-900">
            Just<span className="text-brand-500">Fyle</span>.ai
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          >
            <X size={20} />
          </button>
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Header */}
        <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Hamburger - mobile only */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors lg:hidden"
              >
                <Menu size={20} />
              </button>
              {/* Mobile: logo + page title */}
              <div className="lg:hidden">
                <p className="text-xs font-bold text-gray-900">Just<span className="text-brand-500">Fyle</span></p>
                <p className="text-[10px] text-gray-400">{currentPage?.label || 'Dashboard'}</p>
              </div>
            </div>
            {/* Refund displays - compact on mobile */}
            <div className="flex items-center gap-2 sm:gap-6">
              {/* Mobile: compact savings pill */}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-brand-50 rounded-lg lg:hidden" id="mobile-savings">
                <TrendingUp size={12} className="text-brand-500" />
                <span className="text-[10px] font-semibold text-brand-600">Savings: $0</span>
              </div>
              <div className="text-right" id="federal-refund-display">
                <p className="text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider">Federal</p>
                <p className="text-sm sm:text-lg font-bold text-gray-900">$0.00</p>
              </div>
              <div className="w-px h-6 sm:h-8 bg-gray-200" />
              <div className="text-right" id="state-refund-display">
                <p className="text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider">State</p>
                <p className="text-sm sm:text-lg font-bold text-gray-900">$0.00</p>
              </div>
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

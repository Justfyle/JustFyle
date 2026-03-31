'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ArrowRight, MessageSquare, FileText, PiggyBank, TrendingUp, DollarSign } from 'lucide-react'

interface TutorialStep {
  targetId: string
  title: string
  description: string
  icon: React.ReactNode
  position: 'right' | 'left' | 'bottom' | 'top'
}

const tutorialSteps: TutorialStep[] = [
  {
    targetId: 'nav-tax-chat',
    title: 'Tax Chat',
    description: 'This is your main workspace. Chat with your AI tax assistant, ask questions, and upload documents — all through a simple conversation.',
    icon: <MessageSquare size={18} className="text-brand-500" />,
    position: 'right',
  },
  {
    targetId: 'nav-documents',
    title: 'Documents',
    description: 'View, manage, and organize all your uploaded tax documents. We support W-2s, 1099s, prior returns, and more.',
    icon: <FileText size={18} className="text-blue-500" />,
    position: 'right',
  },
  {
    targetId: 'nav-tax-planning',
    title: 'Tax Planning',
    description: "After filing, we'll create a personalized plan to save you money next year. Real strategies, not generic advice.",
    icon: <PiggyBank size={18} className="text-green-500" />,
    position: 'right',
  },
  {
    targetId: 'tax-savings-widget',
    title: 'Potential Tax Savings',
    description: 'This widget updates in real-time as we learn more about your tax situation. Watch your potential savings grow!',
    icon: <TrendingUp size={18} className="text-brand-500" />,
    position: 'right',
  },
  {
    targetId: 'federal-refund-display',
    title: 'Federal Refund',
    description: 'Your estimated federal refund shows here and updates live as you upload documents and answer questions.',
    icon: <DollarSign size={18} className="text-brand-500" />,
    position: 'bottom',
  },
  {
    targetId: 'state-refund-display',
    title: 'State Refund',
    description: 'Your estimated state refund is tracked separately so you always know the full picture.',
    icon: <DollarSign size={18} className="text-brand-500" />,
    position: 'bottom',
  },
]

export default function OnboardingTutorial({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({})
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({})
  const [arrowDirection, setArrowDirection] = useState<'left' | 'right' | 'top' | 'bottom'>('left')
  const [isVisible, setIsVisible] = useState(false)
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({})

  const positionTooltip = useCallback(() => {
    const step = tutorialSteps[currentStep]
    const target = document.getElementById(step.targetId)
    if (!target) return

    const rect = target.getBoundingClientRect()
    const padding = 8
    const tooltipWidth = 320
    const tooltipHeight = 180

    setHighlightStyle({
      position: 'fixed',
      top: rect.top - padding,
      left: rect.left - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2,
      borderRadius: '16px',
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
      zIndex: 9998,
      pointerEvents: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    })

    let newTooltipStyle: React.CSSProperties = {}
    let newArrowDirection: 'left' | 'right' | 'top' | 'bottom' = 'left'

    switch (step.position) {
      case 'right':
        newTooltipStyle = { position: 'fixed', top: rect.top + rect.height / 2 - tooltipHeight / 2, left: rect.right + 20, zIndex: 9999 }
        newArrowDirection = 'left'
        setArrowStyle({ position: 'absolute', top: '50%', left: '-8px', transform: 'translateY(-50%)' })
        break
      case 'left':
        newTooltipStyle = { position: 'fixed', top: rect.top + rect.height / 2 - tooltipHeight / 2, left: rect.left - tooltipWidth - 20, zIndex: 9999 }
        newArrowDirection = 'right'
        setArrowStyle({ position: 'absolute', top: '50%', right: '-8px', transform: 'translateY(-50%)' })
        break
      case 'bottom':
        newTooltipStyle = { position: 'fixed', top: rect.bottom + 16, left: rect.left + rect.width / 2 - tooltipWidth / 2, zIndex: 9999 }
        newArrowDirection = 'top'
        setArrowStyle({ position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)' })
        break
      case 'top':
        newTooltipStyle = { position: 'fixed', top: rect.top - tooltipHeight - 16, left: rect.left + rect.width / 2 - tooltipWidth / 2, zIndex: 9999 }
        newArrowDirection = 'bottom'
        setArrowStyle({ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)' })
        break
    }

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    if (typeof newTooltipStyle.left === 'number' && newTooltipStyle.left + tooltipWidth > viewportWidth - 20) newTooltipStyle.left = viewportWidth - tooltipWidth - 20
    if (typeof newTooltipStyle.left === 'number' && newTooltipStyle.left < 20) newTooltipStyle.left = 20
    if (typeof newTooltipStyle.top === 'number' && newTooltipStyle.top + tooltipHeight > viewportHeight - 20) newTooltipStyle.top = viewportHeight - tooltipHeight - 20
    if (typeof newTooltipStyle.top === 'number' && newTooltipStyle.top < 20) newTooltipStyle.top = 20

    setTooltipStyle(newTooltipStyle)
    setArrowDirection(newArrowDirection)
  }, [currentStep])

  useEffect(() => {
    const timer = setTimeout(() => { positionTooltip(); setIsVisible(true) }, 300)
    return () => clearTimeout(timer)
  }, [currentStep, positionTooltip])

  useEffect(() => {
    const handleResize = () => positionTooltip()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [positionTooltip])

  const handleNext = () => {
    setIsVisible(false)
    setTimeout(() => {
      if (currentStep < tutorialSteps.length - 1) setCurrentStep(currentStep + 1)
      else handleComplete()
    }, 200)
  }

  const handleComplete = () => {
    try { localStorage.setItem('justfyle_onboarding_complete', 'true') } catch (e) { /* noop */ }
    onComplete()
  }

  const step = tutorialSteps[currentStep]

  const ArrowSVG = () => {
    const color = 'white'
    switch (arrowDirection) {
      case 'left': return (<svg width="8" height="16" viewBox="0 0 8 16" style={arrowStyle}><path d="M8 0L0 8L8 16Z" fill={color} /></svg>)
      case 'right': return (<svg width="8" height="16" viewBox="0 0 8 16" style={arrowStyle}><path d="M0 0L8 8L0 16Z" fill={color} /></svg>)
      case 'top': return (<svg width="16" height="8" viewBox="0 0 16 8" style={arrowStyle}><path d="M0 8L8 0L16 8Z" fill={color} /></svg>)
      case 'bottom': return (<svg width="16" height="8" viewBox="0 0 16 8" style={arrowStyle}><path d="M0 0L8 8L16 0Z" fill={color} /></svg>)
      default: return null
    }
  }

  return (
    <>
      <div style={highlightStyle} />
      <div style={{ ...tooltipStyle, opacity: isVisible ? 1 : 0, transform: isVisible ? 'scale(1)' : 'scale(0.95)', transition: 'opacity 0.25s ease, transform 0.25s ease', width: '320px' }}>
        <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          <ArrowSVG />
          <div className="h-1 bg-gray-100"><div className="h-full bg-brand-500 transition-all duration-500" style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }} /></div>
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center">{step.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{step.title}</p>
                <p className="text-[10px] text-gray-400">Step {currentStep + 1} of {tutorialSteps.length}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">{step.description}</p>
            <div className="flex items-center justify-between">
              <button onClick={handleComplete} className="text-xs text-gray-400 hover:text-gray-600 font-medium transition-colors">Skip tour</button>
              <button onClick={handleNext} className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-xl hover:bg-brand-600 transition-all shadow-sm hover:shadow-md">
                {currentStep < tutorialSteps.length - 1 ? (<>Next<ArrowRight size={14} /></>) : "Get Started!"}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 pb-4">
            {tutorialSteps.map((_, i) => (<div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-brand-500' : i < currentStep ? 'w-1.5 bg-brand-300' : 'w-1.5 bg-gray-200'}`} />))}
          </div>
        </div>
      </div>
    </>
  )
}

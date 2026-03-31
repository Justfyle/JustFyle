'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

const INACTIVITY_TIMEOUT = 15 * 60 * 1000 // 15 minutes
const SESSION_KEY = 'justfyle_active_session'

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const supabase = createClient()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasCheckedSession = useRef(false)

  const signOutAndRedirect = useCallback(async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }, [supabase, router])

  // Browser close detection: sessionStorage is cleared when browser closes
  // If no session flag exists, force re-login
  useEffect(() => {
    if (hasCheckedSession.current) return
    hasCheckedSession.current = true

    const checkBrowserSession = async () => {
      const activeSession = sessionStorage.getItem(SESSION_KEY)

      if (!activeSession) {
        // Fresh browser session — check if there's a stale auth session
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
          // Stale session from before browser was closed — force re-login
          await signOutAndRedirect()
          return
        }
      }

      // Mark this browser session as active
      sessionStorage.setItem(SESSION_KEY, Date.now().toString())
    }

    checkBrowserSession()
  }, [supabase, signOutAndRedirect])

  // Inactivity timeout: auto-logout after 15 minutes of no activity
  useEffect(() => {
    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(async () => {
        await signOutAndRedirect()
      }, INACTIVITY_TIMEOUT)
    }

    // Events that indicate user activity
    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click']

    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer, { passive: true })
    })

    // Start the initial timer
    resetTimer()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }, [signOutAndRedirect])

  // Listen for auth state changes (e.g., token refresh failures)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        if (event === 'SIGNED_OUT') {
          sessionStorage.removeItem(SESSION_KEY)
          router.push('/login')
          router.refresh()
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  return <>{children}</>
}

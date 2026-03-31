'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Upload, Clock, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isWelcome?: boolean
}

const quickReplies = [
  "Let's get started!",
  "I have a question first",
  "What documents do I need?",
  "How long does this take?",
]

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function WelcomeMessage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-brand-500/20">
          <span className="text-white font-bold text-sm">JF</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900">JustFyle AI</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-[10px] text-green-600 font-medium">Online &middot; CPA Verified</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-800 leading-relaxed">
        Welcome! I&apos;m your AI tax assistant. Think of me as a tax professional you can text anytime. By the end of our conversation, your tax return will be completed, reviewed, and ready to file.
      </p>

      <p className="text-sm text-gray-800 leading-relaxed">
        Here&apos;s what makes us different: <strong>no 50 screens of confusing questions.</strong> We just have a conversation. I&apos;ll ask the right questions, find every deduction you qualify for, and a <strong>state board-certified CPA</strong> will personally review your return before filing.
      </p>

      <p className="text-sm text-gray-800 leading-relaxed">
        We&apos;ll also help you <strong>save money for next year</strong> with real strategies tailored to your situation &mdash; not a generic report.
      </p>

      <div className="bg-gradient-to-br from-brand-50 to-emerald-50 rounded-xl p-4 border border-brand-200/50">
        <div className="flex items-center gap-2 mb-2">
          <Upload size={16} className="text-brand-600" />
          <p className="text-sm font-semibold text-brand-700">Start by uploading your documents</p>
        </div>
        <p className="text-xs text-gray-600 mb-3 leading-relaxed">
          Upload your <strong>last year&apos;s tax return</strong> and any <strong>2025 tax documents</strong>:
        </p>
        <div className="grid grid-cols-2 gap-1.5 mb-4">
          {[
            'W-2 (employer wages)',
            '1099-NEC (freelance)',
            '1099-INT (bank interest)',
            '1099-DIV (dividends)',
            '1099-B (stock sales)',
            '1098 (mortgage)',
            '1099-R (retirement)',
            '1095-A (health ins.)',
          ].map((doc) => (
            <div key={doc} className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-brand-400 rounded-full flex-shrink-0" />
              <p className="text-[11px] text-gray-600">{doc}</p>
            </div>
          ))}
        </div>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-500 text-white font-semibold rounded-xl hover:bg-brand-600 transition-all shadow-sm hover:shadow-md text-sm active:scale-[0.98]">
          <Upload size={16} />
          Upload Tax Documents
        </button>
      </div>
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 max-w-[75%]">
      <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm shadow-brand-500/20">
        <span className="text-white font-bold text-[10px]">JF</span>
      </div>
      <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce" />
          <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:0.15s]" />
          <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:0.3s]" />
        </div>
      </div>
    </div>
  )
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: '', timestamp: new Date(), isWelcome: true },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)
    setShowQuickReplies(false)

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          "Thanks for your message! I'm being connected to the tax engine right now. Soon I'll be able to read your documents, answer tax questions, and help you file in under 10 minutes. In the meantime, feel free to upload your tax documents using the button above!",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  function handleQuickReply(text: string) {
    setInput(text)
    setShowQuickReplies(false)
    const fakeEvent = { preventDefault: () => {} } as React.FormEvent
    setTimeout(() => {
      const form = document.querySelector('form')
      if (form) form.requestSubmit()
    }, 50)
  }

  return (
    <div className="flex flex-col h-full bg-surface-100">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-5">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === 'user' ? (
              /* User Message */
              <div className="flex items-start gap-3 justify-end">
                <div className="flex flex-col items-end">
                  <div className="bg-brand-500 text-white rounded-2xl rounded-br-sm px-4 py-3 max-w-[75%] shadow-sm shadow-brand-500/10">
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 px-1">
                    <Clock size={10} className="text-gray-400" />
                    <span className="text-[10px] text-gray-400">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Assistant Message */
              <div className="flex items-start gap-3">
                {!message.isWelcome && (
                  <div className="w-8 h-8 bg-brand-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-brand-500/20">
                    <span className="text-white font-bold text-[10px]">JF</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <div className={`bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-sm shadow-sm ${message.isWelcome ? 'px-5 py-5 max-w-[520px]' : 'px-4 py-3 max-w-[75%]'}`}>
                    {message.isWelcome ? (
                      <WelcomeMessage />
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 px-1">
                    <Clock size={10} className="text-gray-400" />
                    <span className="text-[10px] text-gray-400">{formatTime(message.timestamp)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {isLoading && <TypingIndicator />}

        {/* Quick Reply Chips */}
        {showQuickReplies && !isLoading && (
          <div className="flex flex-wrap gap-2 pl-11">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="px-3.5 py-2 text-xs font-medium text-brand-600 bg-white border border-brand-200 rounded-full hover:bg-brand-50 hover:border-brand-300 transition-all active:scale-95 shadow-sm"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-3 sm:p-4">
        <form onSubmit={handleSend} className="flex items-end gap-2 sm:gap-3">
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 text-gray-400 hover:text-brand-500 hover:bg-brand-50 rounded-xl transition-all"
              title="Upload tax documents"
            >
              <Upload size={20} />
            </button>
            <button
              type="button"
              className="p-2.5 text-gray-400 hover:text-brand-500 hover:bg-brand-50 rounded-xl transition-all hidden sm:block"
              title="Attach file"
            >
              <Paperclip size={20} />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.webp"
            className="hidden"
          />
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your taxes..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all text-sm text-gray-900 placeholder:text-gray-400 pr-12"
            />
            {input.trim() && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <Sparkles size={14} className="text-brand-400 animate-pulse" />
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-brand-500 text-white rounded-xl hover:bg-brand-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-95"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          AI-assisted &middot; CPA reviewed before filing &middot; Your data is encrypted
        </p>
      </div>
    </div>
  )
}


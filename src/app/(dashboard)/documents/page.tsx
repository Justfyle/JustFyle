'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, X, FolderOpen, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  status: 'uploading' | 'processing' | 'verified' | 'needs_review' | 'error'
  category: '2025' | '2024-return' | '2023-return' | 'prior'
  uploadedAt: Date
}

const documentCategories = [
  {
    id: '2025',
    label: '2025 Tax Documents',
    description: 'W-2s, 1099s, and other documents received for tax year 2025',
    examples: 'W-2, 1099-NEC, 1099-INT, 1099-DIV, 1099-B, 1098, 1099-R, 1095-A',
  },
  {
    id: '2024-return',
    label: '2024 Tax Return',
    description: 'Your filed tax return from last year (helps us find missed deductions)',
    examples: 'Form 1040, State return, Schedule C, Schedule E',
  },
  {
    id: '2023-return',
    label: '2023 Tax Return',
    description: 'Your tax return from two years ago (for comparison and carryforward items)',
    examples: 'Form 1040, State return, any amended returns',
  },
]

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('2025')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    '2025': true,
    '2024-return': true,
    '2023-return': true,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  function handleFiles(files: FileList, category: string = activeCategory) {
    const newDocs: Document[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      type: file.type,
      status: 'uploading' as const,
      category: category as Document['category'],
      uploadedAt: new Date(),
    }))

    setDocuments((prev) => [...prev, ...newDocs])

    newDocs.forEach((doc) => {
      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((d) => (d.id === doc.id ? { ...d, status: 'processing' } : d))
        )
      }, 1000)

      setTimeout(() => {
        setDocuments((prev) =>
          prev.map((d) => (d.id === doc.id ? { ...d, status: 'verified' } : d))
        )
      }, 3000)
    })
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  function removeDoc(id: string) {
    setDocuments((prev) => prev.filter((d) => d.id !== id))
  }

  function toggleSection(id: string) {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const statusConfig = {
    uploading: { label: 'Uploading...', color: 'text-gray-500', bg: 'bg-gray-50', icon: null },
    processing: { label: 'AI Reading...', color: 'text-amber-600', bg: 'bg-amber-50', icon: null },
    verified: { label: 'Verified', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
    needs_review: { label: 'Needs Review', color: 'text-amber-600', bg: 'bg-amber-50', icon: AlertCircle },
    error: { label: 'Error', color: 'text-red-600', bg: 'bg-red-50', icon: AlertCircle },
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 mt-1">
            Upload your tax documents. Our AI reads and extracts information instantly.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
          <HelpCircle size={16} />
          Need Help?
        </button>
      </div>

      {/* Main Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all mb-8 ${
          isDragging
            ? 'border-brand-500 bg-brand-50 scale-[1.01]'
            : 'border-gray-300 hover:border-brand-300 hover:bg-gray-50'
        }`}
      >
        <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Upload size={24} className="text-brand-500" />
        </div>
        <p className="text-base font-semibold text-gray-800">
          Drop files here or click to upload
        </p>
        <p className="text-sm text-gray-500 mt-1">
          PDF, JPG, PNG up to 25MB each
        </p>
        <p className="text-xs text-gray-400 mt-3">
          W-2s, 1099s, receipts, prior year returns, and any other tax documents
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Category selector */}
      <div className="flex gap-2 mb-6">
        {documentCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Document Sections */}
      <div className="space-y-4">
        {documentCategories.map((cat) => {
          const catDocs = documents.filter((d) => d.category === cat.id)
          const isExpanded = expandedSections[cat.id]

          return (
            <div key={cat.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(cat.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FolderOpen size={20} className="text-brand-500" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{cat.label}</p>
                    <p className="text-xs text-gray-500">{cat.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                    {catDocs.length} {catDocs.length === 1 ? 'file' : 'files'}
                  </span>
                  {isExpanded ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
                </div>
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="px-5 pb-4 border-t border-gray-100">
                  {catDocs.length === 0 ? (
                    <div className="py-6 text-center">
                      <p className="text-sm text-gray-400">No documents uploaded yet</p>
                      <p className="text-xs text-gray-400 mt-1">Examples: {cat.examples}</p>
                      <button
                        onClick={() => { setActiveCategory(cat.id); fileInputRef.current?.click() }}
                        className="mt-3 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
                      >
                        + Upload documents
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 mt-3">
                      {catDocs.map((doc) => {
                        const status = statusConfig[doc.status]
                        const StatusIcon = status.icon
                        return (
                          <div
                            key={doc.id}
                            className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            <FileText size={18} className="text-brand-400 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className={`text-xs ${status.color} flex items-center gap-1`}>
                                  {StatusIcon && <StatusIcon size={11} />}
                                  {status.label}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeDoc(doc.id)}
                              className="p-1.5 text-gray-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        )
                      })}
                      <button
                        onClick={() => { setActiveCategory(cat.id); fileInputRef.current?.click() }}
                        className="w-full py-2 text-sm font-medium text-brand-500 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors"
                      >
                        + Add more documents
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

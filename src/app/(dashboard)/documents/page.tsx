'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, X, FolderOpen, HelpCircle, ChevronDown, ChevronRight, File, Image, Loader2 } from 'lucide-react'

interface Document {
  id: string
  name: string
  type: string
  size: number
  status: 'uploading' | 'processing' | 'verified' | 'needs_review' | 'error'
  progress: number
  category: '2025' | '2024-return' | '2023-return' | 'prior'
  uploadedAt: Date
  errorMessage?: string
}

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB

const documentCategories = [
  {
    id: '2025',
    label: '2025 Tax Documents',
    description: 'W-2s, 1099s, and other documents for tax year 2025',
    examples: 'W-2, 1099-NEC, 1099-INT, 1099-DIV, 1099-B, 1098, 1099-R, 1095-A',
    icon: '📄',
  },
  {
    id: '2024-return',
    label: '2024 Tax Return',
    description: 'Your filed return from last year (helps find missed deductions)',
    examples: 'Form 1040, State return, Schedule C, Schedule E',
    icon: '📋',
  },
  {
    id: '2023-return',
    label: '2023 Tax Return',
    description: 'Return from two years ago (for comparison & carryforward)',
    examples: 'Form 1040, State return, any amended returns',
    icon: '📁',
  },
]

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function ProgressBar({ progress, status }: { progress: number; status: string }) {
  const color =
    status === 'error' ? 'bg-red-500' :
    status === 'verified' ? 'bg-green-500' :
    status === 'processing' ? 'bg-amber-500' :
    'bg-brand-500'

  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-2">
      <div
        className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string>('2025')
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    '2025': true,
    '2024-return': true,
    '2023-return': true,
  })
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function validateFile(file: File): string | null {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `"${file.name}" is not a supported format. Please upload PDF, JPG, or PNG files.`
    }
    if (file.size > MAX_FILE_SIZE) {
      return `"${file.name}" is too large (${formatFileSize(file.size)}). Maximum size is 25MB.`
    }
    return null
  }

  function handleFiles(files: FileList, category: string = activeCategory) {
    setUploadError(null)
    const validDocs: Document[] = []
    const errors: string[] = []

    Array.from(files).forEach((file) => {
      const error = validateFile(file)
      if (error) {
        errors.push(error)
        return
      }
      validDocs.push({
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        name: file.name,
        type: file.type,
        size: file.size,
        status: 'uploading',
        progress: 0,
        category: category as Document['category'],
        uploadedAt: new Date(),
      })
    })

    if (errors.length > 0) {
      setUploadError(errors.join(' '))
    }

    if (validDocs.length === 0) return

    setDocuments((prev) => [...prev, ...validDocs])

    // Simulate upload progress + processing
    validDocs.forEach((doc) => {
      // Upload progress simulation
      let progress = 0
      const uploadInterval = setInterval(() => {
        progress += Math.random() * 25 + 10
        if (progress >= 100) {
          progress = 100
          clearInterval(uploadInterval)
          setDocuments((prev) =>
            prev.map((d) =>
              d.id === doc.id ? { ...d, progress: 100, status: 'processing' } : d
            )
          )
          // Processing phase
          setTimeout(() => {
            setDocuments((prev) =>
              prev.map((d) =>
                d.id === doc.id ? { ...d, status: 'verified' } : d
              )
            )
          }, 2000 + Math.random() * 1500)
        } else {
          setDocuments((prev) =>
            prev.map((d) =>
              d.id === doc.id ? { ...d, progress: Math.min(progress, 95) } : d
            )
          )
        }
      }, 300)
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
    uploading: { label: 'Uploading...', color: 'text-brand-600', bg: 'bg-brand-50', icon: Loader2, spin: true },
    processing: { label: 'AI Reading...', color: 'text-amber-600', bg: 'bg-amber-50', icon: Loader2, spin: true },
    verified: { label: 'Verified', color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle, spin: false },
    needs_review: { label: 'Needs Review', color: 'text-amber-600', bg: 'bg-amber-50', icon: AlertCircle, spin: false },
    error: { label: 'Error', color: 'text-red-600', bg: 'bg-red-50', icon: AlertCircle, spin: false },
  }

  const totalDocs = documents.length
  const verifiedDocs = documents.filter((d) => d.status === 'verified').length

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Upload your tax documents. Our AI reads and extracts information instantly.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {totalDocs > 0 && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <CheckCircle size={14} className="text-green-600" />
              <span className="text-xs font-medium text-green-700">
                {verifiedDocs}/{totalDocs} verified
              </span>
            </div>
          )}
          <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <HelpCircle size={16} />
            <span className="hidden sm:inline">Need Help?</span>
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {uploadError && (
        <div className="mb-4 flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-700 flex-1">{uploadError}</p>
          <button onClick={() => setUploadError(null)} className="text-red-400 hover:text-red-600">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all mb-6 group ${
          isDragging
            ? 'border-brand-500 bg-brand-50 scale-[1.01] shadow-lg shadow-brand-500/10'
            : 'border-gray-300 hover:border-brand-300 hover:bg-gray-50'
        }`}
      >
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all ${
          isDragging ? 'bg-brand-100 scale-110' : 'bg-brand-50 group-hover:bg-brand-100'
        }`}>
          <Upload size={24} className={`transition-colors ${isDragging ? 'text-brand-600' : 'text-brand-500'}`} />
        </div>
        <p className="text-base font-semibold text-gray-800">
          {isDragging ? 'Drop your files here!' : 'Drop files here or click to upload'}
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
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files)
            e.target.value = ''
          }}
          className="hidden"
        />
      </div>

      {/* Category Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {documentCategories.map((cat) => {
          const count = documents.filter((d) => d.category === cat.id).length
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.label}
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Document Sections */}
      <div className="space-y-4">
        {documentCategories.map((cat) => {
          const catDocs = documents.filter((d) => d.category === cat.id)
          const isExpanded = expandedSections[cat.id]
          const verifiedCount = catDocs.filter((d) => d.status === 'verified').length

          return (
            <div key={cat.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(cat.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-50 rounded-xl flex items-center justify-center">
                    <FolderOpen size={18} className="text-brand-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{cat.label}</p>
                    <p className="text-xs text-gray-500">{cat.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {catDocs.length > 0 && verifiedCount === catDocs.length && (
                    <CheckCircle size={14} className="text-green-500" />
                  )}
                  <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full font-medium">
                    {catDocs.length} {catDocs.length === 1 ? 'file' : 'files'}
                  </span>
                  {isExpanded
                    ? <ChevronDown size={16} className="text-gray-400" />
                    : <ChevronRight size={16} className="text-gray-400" />
                  }
                </div>
              </button>

              {/* Section Content */}
              {isExpanded && (
                <div className="px-5 pb-4 border-t border-gray-100">
                  {catDocs.length === 0 ? (
                    <div className="py-8 text-center">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <FileText size={20} className="text-gray-300" />
                      </div>
                      <p className="text-sm text-gray-400 font-medium">No documents yet</p>
                      <p className="text-xs text-gray-400 mt-1">Examples: {cat.examples}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveCategory(cat.id); fileInputRef.current?.click() }}
                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:text-brand-600 transition-colors"
                      >
                        <Upload size={14} />
                        Upload documents
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 mt-3">
                      {catDocs.map((doc) => {
                        const status = statusConfig[doc.status]
                        const StatusIcon = status.icon
                        const isImage = doc.type.startsWith('image/')
                        return (
                          <div
                            key={doc.id}
                            className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group/item"
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${status.bg}`}>
                              {isImage
                                ? <Image size={16} className={status.color} />
                                : <File size={16} className={status.color} />
                              }
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className={`text-xs ${status.color} flex items-center gap-1`}>
                                  <StatusIcon size={11} className={status.spin ? 'animate-spin' : ''} />
                                  {status.label}
                                </span>
                                <span className="text-[10px] text-gray-400">{formatFileSize(doc.size)}</span>
                              </div>
                              {(doc.status === 'uploading') && (
                                <ProgressBar progress={doc.progress} status={doc.status} />
                              )}
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); removeDoc(doc.id) }}
                              className="p-1.5 text-gray-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 opacity-0 group-hover/item:opacity-100"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        )
                      })}
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveCategory(cat.id); fileInputRef.current?.click() }}
                        className="w-full py-2.5 text-sm font-medium text-brand-500 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Upload size={14} />
                        Add more documents
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

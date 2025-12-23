'use client'

import { Download, Copy, Youtube, Image, RefreshCw, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

interface ResultDisplayProps {
  result: any
  onNewVideo: () => void
}

export default function ResultDisplay({ result, onNewVideo }: ResultDisplayProps) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  if (result.error) {
    return (
      <div className="bg-red-500/10 backdrop-blur-lg rounded-2xl p-8 border border-red-500/20">
        <h2 className="text-2xl font-bold text-red-400 mb-4">Generation Failed</h2>
        <p className="text-gray-300 mb-6">{result.message}</p>
        <button
          onClick={onNewVideo}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Success Header */}
      <div className="bg-green-500/10 backdrop-blur-lg rounded-2xl p-6 border border-green-500/20">
        <div className="flex items-center gap-3 mb-2">
          <CheckCircle2 className="w-8 h-8 text-green-400" />
          <h2 className="text-3xl font-bold text-green-400">Video Generated Successfully!</h2>
        </div>
        <p className="text-gray-300">
          Your viral YouTube video is ready for upload. All metadata has been optimized for maximum reach.
        </p>
      </div>

      {/* Video Preview */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Youtube className="w-6 h-6 text-red-500" />
          Video Preview
        </h3>
        <div className="bg-black rounded-lg aspect-video flex items-center justify-center mb-4">
          <div className="text-center">
            <Youtube className="w-16 h-16 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Video rendering complete</p>
            <p className="text-sm text-gray-500 mt-1">Ready for download & upload</p>
          </div>
        </div>
        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Download Video (1080p MP4)
        </button>
      </div>

      {/* YouTube Metadata */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold mb-6">YouTube Metadata (Algorithm Optimized)</h3>

        {/* Title */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-lg">Title</label>
            <button
              onClick={() => copyToClipboard(result.metadata?.title || '', 'title')}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              {copied === 'title' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-gray-200">{result.metadata?.title}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-lg">Description</label>
            <button
              onClick={() => copyToClipboard(result.metadata?.description || '', 'description')}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              {copied === 'description' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-gray-200 whitespace-pre-wrap">{result.metadata?.description}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-lg">Tags</label>
            <button
              onClick={() => copyToClipboard(result.metadata?.tags?.join(', ') || '', 'tags')}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              {copied === 'tags' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.metadata?.tags?.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="bg-blue-500/20 border border-blue-500/30 px-3 py-1.5 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-lg flex items-center gap-2">
              <Image className="w-5 h-5" />
              Thumbnail Prompt
            </label>
            <button
              onClick={() => copyToClipboard(result.metadata?.thumbnailPrompt || '', 'thumbnail')}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <Copy className="w-4 h-4" />
              {copied === 'thumbnail' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-gray-200 text-sm italic">{result.metadata?.thumbnailPrompt}</p>
            <p className="text-xs text-gray-400 mt-2">
              Use this prompt with DALL-E, Midjourney, or any AI image generator
            </p>
          </div>
        </div>
      </div>

      {/* Stats & Projections */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold mb-6">Monetization Metrics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400">✓</p>
            <p className="text-sm text-gray-300 mt-1">Watch Time Optimized</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400">✓</p>
            <p className="text-sm text-gray-300 mt-1">High CTR Structure</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400">✓</p>
            <p className="text-sm text-gray-300 mt-1">Kids Compliant</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400">✓</p>
            <p className="text-sm text-gray-300 mt-1">Mid-roll Ads Ready</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onNewVideo}
          className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Generate Another Video
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Play, Sparkles, Video, TrendingUp, Loader2 } from 'lucide-react'
import VideoGenerator from '@/components/VideoGenerator'
import ProgressTracker from '@/components/ProgressTracker'
import ResultDisplay from '@/components/ResultDisplay'

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [result, setResult] = useState<any>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video className="w-12 h-12 text-red-500" />
            <h1 className="text-5xl font-bold gradient-text">
              1-Click AI YouTube Video Workflow
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Text → Viral 15-min Animated Video → Monetized Upload
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm">AI Animation</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm">Algorithm Optimized</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Video className="w-4 h-4 text-blue-400" />
              <span className="text-sm">15-Min Videos</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {!isGenerating && !result && (
            <VideoGenerator
              onGenerate={(data) => {
                setIsGenerating(true)
                setCurrentStep(0)
                setResult(null)
              }}
            />
          )}

          {isGenerating && (
            <ProgressTracker
              currentStep={currentStep}
              onComplete={(resultData) => {
                setIsGenerating(false)
                setResult(resultData)
              }}
              onStepChange={setCurrentStep}
            />
          )}

          {result && !isGenerating && (
            <ResultDisplay
              result={result}
              onNewVideo={() => {
                setResult(null)
                setCurrentStep(0)
              }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400 text-sm">
          <p>Powered by OpenAI, ElevenLabs, Runway & Advanced AI Orchestration</p>
          <p className="mt-2">100% Copyright Safe • Monetization Ready • Algorithm Optimized</p>
        </div>
      </div>
    </main>
  )
}

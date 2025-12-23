'use client'

import { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'

interface ProgressTrackerProps {
  currentStep: number
  onComplete: (result: any) => void
  onStepChange: (step: number) => void
}

const steps = [
  {
    id: 1,
    name: 'Algorithm Analysis',
    description: 'Analyzing YouTube algorithm & viral patterns',
    duration: 3000,
  },
  {
    id: 2,
    name: 'Script Writing',
    description: 'Creating 15-min viral screenplay with hooks',
    duration: 5000,
  },
  {
    id: 3,
    name: 'Scene Direction',
    description: 'Breaking down into cinematic scenes',
    duration: 3000,
  },
  {
    id: 4,
    name: 'Animation Generation',
    description: 'Generating realistic animated scenes with AI',
    duration: 8000,
  },
  {
    id: 5,
    name: 'Voice Acting',
    description: 'Creating character voices with emotion',
    duration: 4000,
  },
  {
    id: 6,
    name: 'Sound Design',
    description: 'Adding SFX & royalty-free music',
    duration: 3000,
  },
  {
    id: 7,
    name: 'Video Assembly',
    description: 'Rendering full 1080p video',
    duration: 6000,
  },
  {
    id: 8,
    name: 'YouTube Optimization',
    description: 'Generating title, description, tags & thumbnail',
    duration: 3000,
  },
]

export default function ProgressTracker({
  currentStep,
  onComplete,
  onStepChange,
}: ProgressTrackerProps) {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    if (activeStep >= steps.length) {
      // All steps complete - trigger API call
      fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          setTimeout(() => onComplete(data), 1000)
        })
        .catch((err) => {
          console.error('Error generating video:', err)
          onComplete({
            error: 'Generation failed',
            message: 'Please check your API keys and try again',
          })
        })
      return
    }

    const timer = setTimeout(() => {
      setActiveStep((prev) => prev + 1)
      onStepChange(activeStep + 1)
    }, steps[activeStep].duration)

    return () => clearTimeout(timer)
  }, [activeStep, onStepChange])

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Generating Your Viral Video...
      </h2>

      <div className="space-y-4">
        {steps.map((step, idx) => {
          const isActive = idx === activeStep
          const isComplete = idx < activeStep
          const isPending = idx > activeStep

          return (
            <div
              key={step.id}
              className={`flex items-start gap-4 p-4 rounded-lg transition-all ${
                isActive
                  ? 'bg-red-500/20 border-2 border-red-500'
                  : isComplete
                  ? 'bg-green-500/10 border border-green-500/30'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              {/* Icon */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'bg-red-500 animate-pulse'
                    : isComplete
                    ? 'bg-green-500'
                    : 'bg-gray-600'
                }`}
              >
                {isComplete ? (
                  <Check className="w-6 h-6 text-white" />
                ) : isActive ? (
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                ) : (
                  <span className="text-white font-semibold">{step.id}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className={`font-semibold text-lg ${
                    isActive ? 'text-red-300' : isComplete ? 'text-green-300' : 'text-gray-400'
                  }`}
                >
                  {step.name}
                </h3>
                <p className="text-sm text-gray-300 mt-1">{step.description}</p>

                {/* Progress Bar */}
                {isActive && (
                  <div className="mt-3 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 animate-pulse"
                      style={{
                        width: '100%',
                        animation: `progress ${step.duration}ms linear`,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Overall Progress */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm font-medium">
            {Math.round((activeStep / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 transition-all duration-500"
            style={{ width: `${(activeStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

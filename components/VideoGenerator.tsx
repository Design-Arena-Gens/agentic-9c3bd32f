'use client'

import { useState } from 'react'
import { Play, Sparkles } from 'lucide-react'

interface VideoGeneratorProps {
  onGenerate: (data: any) => void
}

export default function VideoGenerator({ onGenerate }: VideoGeneratorProps) {
  const [storyIdea, setStoryIdea] = useState('')
  const [niche, setNiche] = useState('kids-animation')
  const [duration, setDuration] = useState('15')

  const handleGenerate = async () => {
    if (!storyIdea.trim()) {
      alert('Please enter a story idea')
      return
    }

    onGenerate({
      storyIdea,
      niche,
      duration: parseInt(duration),
    })
  }

  const exampleIdeas = [
    'A brave superhero saves children from a burning building',
    'Magical animals teach kids about friendship and kindness',
    'Time-traveling students learn about ancient civilizations',
    'Robot detective solves mysteries in a futuristic city',
  ]

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-8 h-8 text-yellow-400" />
        <h2 className="text-3xl font-bold">Create Your Viral Video</h2>
      </div>

      <div className="space-y-6">
        {/* Story Idea Input */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Story Idea / Topic
          </label>
          <textarea
            value={storyIdea}
            onChange={(e) => setStoryIdea(e.target.value)}
            placeholder="Enter your story idea or topic..."
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400 min-h-[120px]"
          />
          <div className="mt-3">
            <p className="text-xs text-gray-400 mb-2">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleIdeas.map((idea, idx) => (
                <button
                  key={idx}
                  onClick={() => setStoryIdea(idea)}
                  className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-colors"
                >
                  {idea}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Niche Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Content Niche
          </label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
          >
            <option value="kids-animation">Kids Animation</option>
            <option value="educational">Educational Content</option>
            <option value="adventure">Adventure Stories</option>
            <option value="sci-fi">Sci-Fi Fantasy</option>
            <option value="comedy">Comedy & Fun</option>
            <option value="mystery">Mystery & Suspense</option>
          </select>
        </div>

        {/* Duration Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Video Duration (minutes)
          </label>
          <div className="flex gap-3">
            {['5', '10', '15', '20'].map((dur) => (
              <button
                key={dur}
                onClick={() => setDuration(dur)}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  duration === dur
                    ? 'bg-red-500 text-white'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10'
                }`}
              >
                {dur} min
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-lg"
        >
          <Play className="w-6 h-6" />
          <span className="text-lg">Generate Viral Video</span>
        </button>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-blue-300">What happens next?</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>✓ Algorithm analysis for viral optimization</li>
            <li>✓ AI script writing with 3-act structure</li>
            <li>✓ Scene generation with realistic animation</li>
            <li>✓ Character voices with emotion</li>
            <li>✓ Sound effects & royalty-free music</li>
            <li>✓ Full video assembly & rendering</li>
            <li>✓ YouTube metadata optimization</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

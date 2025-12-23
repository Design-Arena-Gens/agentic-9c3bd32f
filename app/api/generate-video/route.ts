import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export const runtime = 'edge'
export const maxDuration = 300

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// Agent 1: YouTube Algorithm Analyzer
async function analyzeAlgorithm(niche: string, duration: number) {
  const prompt = `As a YouTube algorithm expert, analyze the best strategy for a ${duration}-minute ${niche} video.

  Provide:
  1. Hook structure (first 5 seconds)
  2. Retention points (where to place cliffhangers)
  3. Emotion pacing
  4. Optimal ad placement

  Format as JSON with keys: hookStrategy, retentionPoints, emotionPacing, adPlacements`

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}

// Agent 2: Viral Script Writer
async function writeScript(storyIdea: string, strategy: any, duration: number) {
  const prompt = `Write a ${duration}-minute viral YouTube script for: "${storyIdea}"

  Requirements:
  - Hook in first 5 seconds: ${strategy.hookStrategy}
  - 3-act structure with cliffhangers
  - Kid-friendly dialogue
  - Emotional peaks at: ${strategy.emotionPacing}
  - Retention loops every 2 minutes

  Format as JSON with keys: hook, act1, act2, act3, totalScenes`

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}

// Agent 3: Scene Director
async function createScenes(script: any) {
  const prompt = `Break this script into detailed scenes:

  Hook: ${script.hook}
  Act 1: ${script.act1}
  Act 2: ${script.act2}
  Act 3: ${script.act3}

  For each scene provide:
  - Visual description
  - Camera angle
  - Lighting mood
  - Character emotions
  - Duration

  Format as JSON array of scenes with keys: sceneNumber, visualDescription, cameraAngle, lighting, emotions, duration`

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  })

  return JSON.parse(response.choices[0].message.content || '[]')
}

// Agent 4: Animation Prompts Generator
async function generateAnimationPrompts(scenes: any[]) {
  return scenes.map((scene, idx) => ({
    sceneId: idx + 1,
    prompt: `Ultra-realistic 3D animation: ${scene.visualDescription}. ${scene.cameraAngle} camera angle, ${scene.lighting} lighting, cinematic quality, vibrant colors, smooth motion, high detail`,
    duration: scene.duration,
  }))
}

// Agent 5: Voice Script Generator
async function generateVoiceScripts(script: any, scenes: any[]) {
  return scenes.map((scene, idx) => ({
    sceneId: idx + 1,
    dialogue: scene.dialogue || `Scene ${idx + 1} narration`,
    emotion: scene.emotions,
    characterVoice: 'friendly-narrator',
  }))
}

// Agent 6: Sound Design Spec
async function generateSoundDesign(scenes: any[]) {
  return {
    backgroundMusic: 'upbeat-adventure-theme',
    soundEffects: scenes.map((scene, idx) => ({
      sceneId: idx + 1,
      effects: ['ambient-background', 'action-sounds'],
      volume: 0.7,
    })),
    musicTransitions: 'smooth-crossfade',
  }
}

// Agent 7: Video Assembly Spec
async function createAssemblySpec(scenes: any[], voiceScripts: any[], soundDesign: any) {
  return {
    resolution: '1920x1080',
    fps: 30,
    codec: 'h264',
    format: 'mp4',
    scenes: scenes.length,
    totalDuration: scenes.reduce((acc, scene) => acc + (scene.duration || 30), 0),
    layers: {
      video: scenes.length,
      audio: voiceScripts.length,
      music: 1,
      effects: soundDesign.soundEffects.length,
    },
  }
}

// Agent 8: YouTube Metadata Generator
async function generateMetadata(storyIdea: string, script: any, niche: string) {
  const prompt = `Create viral YouTube metadata for this video:

  Story: ${storyIdea}
  Niche: ${niche}
  Hook: ${script.hook}

  Generate:
  1. Viral title (under 60 chars, clickable but not clickbait)
  2. SEO-optimized description (300+ words)
  3. 15 relevant tags
  4. Thumbnail prompt for AI image generation

  Format as JSON with keys: title, description, tags (array), thumbnailPrompt`

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.8,
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}

// Main Orchestrator
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { storyIdea, niche, duration } = body

    // Execute all agents in sequence
    console.log('Agent 1: Analyzing algorithm...')
    const algorithmStrategy = await analyzeAlgorithm(niche, duration)

    console.log('Agent 2: Writing script...')
    const script = await writeScript(storyIdea, algorithmStrategy, duration)

    console.log('Agent 3: Creating scenes...')
    const scenes = await createScenes(script)

    console.log('Agent 4: Generating animation prompts...')
    const animationPrompts = await generateAnimationPrompts(scenes)

    console.log('Agent 5: Creating voice scripts...')
    const voiceScripts = await generateVoiceScripts(script, scenes)

    console.log('Agent 6: Designing sound...')
    const soundDesign = await generateSoundDesign(scenes)

    console.log('Agent 7: Assembly specification...')
    const assemblySpec = await createAssemblySpec(scenes, voiceScripts, soundDesign)

    console.log('Agent 8: Generating metadata...')
    const metadata = await generateMetadata(storyIdea, script, niche)

    // Return complete result
    return NextResponse.json({
      success: true,
      metadata,
      videoSpec: {
        script,
        scenes: scenes.length,
        duration: assemblySpec.totalDuration,
        resolution: assemblySpec.resolution,
      },
      animationPrompts: animationPrompts.slice(0, 3), // Sample of prompts
      assemblySpec,
      generatedAt: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Error generating video:', error)
    return NextResponse.json(
      {
        error: 'Generation failed',
        message: error.message || 'Please check your API configuration',
      },
      { status: 500 }
    )
  }
}

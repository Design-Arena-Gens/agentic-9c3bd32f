/**
 * Main Orchestrator - Coordinates all 8 agents in sequence
 * Executes the complete 1-click workflow
 */

import { analyzeYouTubeAlgorithm, AlgorithmStrategy } from './agents/algorithmAnalyzer'
import { writeViralScript, Script } from './agents/scriptWriter'
import { createSceneBreakdown, Scene, generateAnimationPrompt } from './agents/sceneDirector'
import { generateYouTubeMetadata, YouTubeMetadata } from './agents/youtubeOptimizer'

export interface VideoGenerationInput {
  storyIdea: string
  niche: string
  duration: number
}

export interface VideoGenerationResult {
  success: boolean
  algorithmStrategy: AlgorithmStrategy
  script: Script
  scenes: Scene[]
  animationPrompts: string[]
  voiceScripts: VoiceScript[]
  soundDesign: SoundDesign
  assemblySpec: AssemblySpec
  metadata: YouTubeMetadata
  generatedAt: string
}

export interface VoiceScript {
  sceneId: number
  dialogue: string
  emotion: string
  characterVoice: string
  timing: number
}

export interface SoundDesign {
  backgroundMusic: string
  soundEffects: SoundEffect[]
  musicVolume: number
  effectsVolume: number
}

export interface SoundEffect {
  sceneId: number
  effects: string[]
  timing: number
  volume: number
}

export interface AssemblySpec {
  resolution: string
  fps: number
  codec: string
  format: string
  totalDuration: number
  layers: {
    video: number
    audio: number
    music: number
    effects: number
  }
}

/**
 * Main orchestration function - executes all 8 agents in sequence
 */
export async function orchestrateVideoGeneration(
  input: VideoGenerationInput
): Promise<VideoGenerationResult> {
  console.log('🎬 Starting 1-Click AI Video Generation Workflow')

  // AGENT 1: YouTube Algorithm Analyzer
  console.log('📊 Agent 1: Analyzing YouTube algorithm...')
  const algorithmStrategy = await analyzeYouTubeAlgorithm(input.niche, input.duration)

  // AGENT 2: Viral Script Writer
  console.log('✍️ Agent 2: Writing viral script...')
  const script = await writeViralScript(input.storyIdea, algorithmStrategy, input.duration)

  // AGENT 3: Scene Director
  console.log('🎬 Agent 3: Creating scene breakdown...')
  const scenes = await createSceneBreakdown(script)

  // AGENT 4: Animation Generator (prompts)
  console.log('🎨 Agent 4: Generating animation prompts...')
  const animationPrompts = scenes.map((scene) => generateAnimationPrompt(scene))

  // AGENT 5: Voice Actor AI
  console.log('🗣️ Agent 5: Creating voice scripts...')
  const voiceScripts = generateVoiceScripts(scenes)

  // AGENT 6: Sound & Music Designer
  console.log('🔊 Agent 6: Designing sound & music...')
  const soundDesign = generateSoundDesign(scenes)

  // AGENT 7: Video Assembler (specification)
  console.log('🎞️ Agent 7: Creating assembly specification...')
  const assemblySpec = createAssemblySpecification(scenes, voiceScripts, soundDesign)

  // AGENT 8: YouTube Growth Optimizer
  console.log('📈 Agent 8: Generating YouTube metadata...')
  const metadata = await generateYouTubeMetadata(input.storyIdea, input.niche, input.duration)

  console.log('✅ Video generation workflow complete!')

  return {
    success: true,
    algorithmStrategy,
    script,
    scenes,
    animationPrompts,
    voiceScripts,
    soundDesign,
    assemblySpec,
    metadata,
    generatedAt: new Date().toISOString(),
  }
}

/**
 * Agent 5: Generate voice scripts for each scene
 */
function generateVoiceScripts(scenes: Scene[]): VoiceScript[] {
  return scenes.map((scene, idx) => ({
    sceneId: scene.sceneNumber,
    dialogue: scene.dialogue,
    emotion: scene.emotions,
    characterVoice: selectVoiceType(idx),
    timing: scene.duration,
  }))
}

function selectVoiceType(index: number): string {
  const voices = [
    'friendly-narrator',
    'enthusiastic-child',
    'wise-mentor',
    'adventurous-hero',
    'cheerful-companion',
  ]
  return voices[index % voices.length]
}

/**
 * Agent 6: Generate sound design specification
 */
function generateSoundDesign(scenes: Scene[]): SoundDesign {
  const soundEffects: SoundEffect[] = scenes.map((scene) => ({
    sceneId: scene.sceneNumber,
    effects: selectSoundEffects(scene),
    timing: scene.duration,
    volume: 0.7,
  }))

  return {
    backgroundMusic: 'upbeat-adventure-orchestral-loop',
    soundEffects,
    musicVolume: 0.6,
    effectsVolume: 0.7,
  }
}

function selectSoundEffects(scene: Scene): string[] {
  const effects = ['ambient-atmosphere', 'footsteps-movement']

  if (scene.emotions.includes('excitement')) {
    effects.push('excitement-whoosh', 'positive-chime')
  }
  if (scene.emotions.includes('tension')) {
    effects.push('tension-build', 'suspense-drone')
  }
  if (scene.emotions.includes('joy')) {
    effects.push('celebration-sparkle', 'happy-bells')
  }

  return effects
}

/**
 * Agent 7: Create video assembly specification
 */
function createAssemblySpecification(
  scenes: Scene[],
  voiceScripts: VoiceScript[],
  soundDesign: SoundDesign
): AssemblySpec {
  const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0)

  return {
    resolution: '1920x1080',
    fps: 30,
    codec: 'h264',
    format: 'mp4',
    totalDuration,
    layers: {
      video: scenes.length,
      audio: voiceScripts.length,
      music: 1,
      effects: soundDesign.soundEffects.length,
    },
  }
}

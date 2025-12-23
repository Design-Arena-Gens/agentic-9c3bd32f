/**
 * Agent 3: Scene Director
 * Breaks scripts into detailed cinematic scenes with visual specifications
 */

import { Script } from './scriptWriter'

export interface Scene {
  sceneNumber: number
  visualDescription: string
  cameraAngle: string
  lighting: string
  emotions: string
  duration: number
  dialogue: string
  actionBeats: string[]
}

export async function createSceneBreakdown(script: Script): Promise<Scene[]> {
  const totalScenes = script.totalScenes
  const scenes: Scene[] = []

  for (let i = 0; i < totalScenes; i++) {
    scenes.push({
      sceneNumber: i + 1,
      visualDescription: generateVisualDescription(i, totalScenes),
      cameraAngle: selectCameraAngle(i),
      lighting: selectLighting(i, totalScenes),
      emotions: selectEmotions(i, totalScenes),
      duration: 15 + Math.floor(Math.random() * 20), // 15-35 seconds per scene
      dialogue: script.dialogueLines[i % script.dialogueLines.length],
      actionBeats: generateActionBeats(i),
    })
  }

  return scenes
}

function generateVisualDescription(sceneIndex: number, totalScenes: number): string {
  const progress = sceneIndex / totalScenes

  if (progress < 0.1) {
    // Opening scenes - establish world
    return 'Wide establishing shot of vibrant animated world, colorful buildings and bustling activity, characters introduced with dynamic movement'
  } else if (progress < 0.3) {
    // Act 1 - setup
    return 'Characters interact in detailed environment, expressive facial animations showing curiosity and determination, rich background details'
  } else if (progress < 0.6) {
    // Act 2 - conflict
    return 'Tension builds with dramatic action sequences, dynamic camera movement following characters, intense facial expressions and body language'
  } else if (progress < 0.9) {
    // Act 2/3 transition - climax building
    return 'High-stakes action with particle effects and dramatic lighting, characters showing determination, fast-paced movement and reactions'
  } else {
    // Act 3 - resolution
    return 'Emotional resolution with warm lighting, characters celebrating together, satisfying conclusion with hopeful atmosphere'
  }
}

function selectCameraAngle(sceneIndex: number): string {
  const angles = [
    'Wide shot establishing environment',
    'Medium shot focusing on characters',
    'Close-up on emotional facial expressions',
    'Dynamic tracking shot following action',
    'Over-the-shoulder perspective',
    'Low angle showing character power',
    'High angle revealing environment scale',
    'Dutch angle for tension and unease',
  ]

  return angles[sceneIndex % angles.length]
}

function selectLighting(sceneIndex: number, totalScenes: number): string {
  const progress = sceneIndex / totalScenes

  if (progress < 0.25) {
    return 'Bright, warm lighting with soft shadows, inviting and cheerful atmosphere'
  } else if (progress < 0.5) {
    return 'Natural balanced lighting with defined shadows, realistic and engaging'
  } else if (progress < 0.75) {
    return 'Dramatic lighting with strong contrasts, mysterious and tense mood'
  } else {
    return 'Warm golden-hour lighting, hopeful and uplifting atmosphere'
  }
}

function selectEmotions(sceneIndex: number, totalScenes: number): string {
  const progress = sceneIndex / totalScenes

  const emotionMap = [
    'Curiosity and wonder',
    'Excitement and anticipation',
    'Determination and courage',
    'Fear and uncertainty',
    'Hope and resilience',
    'Joy and triumph',
    'Relief and happiness',
    'Warmth and friendship',
  ]

  const index = Math.floor(progress * emotionMap.length)
  return emotionMap[Math.min(index, emotionMap.length - 1)]
}

function generateActionBeats(sceneIndex: number): string[] {
  const beats = [
    ['Character enters frame', 'Notices something important', 'Reacts with emotion'],
    ['Movement toward goal', 'Encounters obstacle', 'Plans next move'],
    ['Takes action', 'Faces challenge', 'Shows determination'],
    ['Emotional moment', 'Connection with others', 'Renewed purpose'],
    ['Climactic action', 'High-stakes moment', 'Resolution begins'],
  ]

  return beats[sceneIndex % beats.length]
}

export function generateAnimationPrompt(scene: Scene): string {
  return `Ultra-realistic 3D animation, cinematic quality: ${scene.visualDescription}. ${scene.cameraAngle}. ${scene.lighting}. Characters displaying ${scene.emotions}. Smooth motion, vibrant colors, high detail, professional animation, movie-quality rendering, 1920x1080.`
}

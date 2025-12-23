/**
 * Agent 2: Viral Script Writer
 * Creates engaging, monetization-ready scripts optimized for retention
 */

import { AlgorithmStrategy } from './algorithmAnalyzer'

export interface Script {
  hook: string
  act1: string
  act2: string
  act3: string
  totalScenes: number
  dialogueLines: string[]
  cliffhangers: string[]
}

export async function writeViralScript(
  storyIdea: string,
  strategy: AlgorithmStrategy,
  duration: number
): Promise<Script> {
  const hook = createHook(storyIdea, strategy.hookStrategy)
  const acts = create3ActStructure(storyIdea, duration)
  const cliffhangers = generateCliffhangers(duration)

  return {
    hook,
    act1: acts.act1,
    act2: acts.act2,
    act3: acts.act3,
    totalScenes: Math.floor(duration * 4), // ~4 scenes per minute
    dialogueLines: generateDialogue(storyIdea, duration),
    cliffhangers,
  }
}

function createHook(storyIdea: string, hookStrategy: string): string {
  // Create compelling 5-second hook
  const hooks = [
    `"Wait... did that just happen?!" Our hero faces their biggest challenge yet.`,
    `In a world where the impossible becomes reality, one moment changes everything.`,
    `You won't believe what happens next in this incredible journey!`,
    `*CRASH* Everything changed in that single moment...`,
  ]

  return hooks[Math.floor(Math.random() * hooks.length)]
}

function create3ActStructure(storyIdea: string, duration: number) {
  const act1Duration = Math.floor(duration * 0.25)
  const act2Duration = Math.floor(duration * 0.5)
  const act3Duration = duration - act1Duration - act2Duration

  return {
    act1: `ACT 1 (Setup - ${act1Duration} min): Introduce our characters and their world. Establish the main conflict and stakes. Create emotional connection with audience. End with an inciting incident that propels the story forward.`,

    act2: `ACT 2 (Confrontation - ${act2Duration} min): Heroes face escalating challenges. Multiple obstacles test their resolve. Include 2-3 major cliffhangers to maintain retention. Build tension through failures and small victories. Introduce plot twists that surprise the audience.`,

    act3: `ACT 3 (Resolution - ${act3Duration} min): Climactic confrontation with the main challenge. Hero uses everything they've learned. Emotional peak moment. Satisfying resolution with a hint of future adventures. End with a feel-good moment that encourages likes and shares.`,
  }
}

function generateCliffhangers(duration: number): string[] {
  const count = Math.floor(duration / 3)
  const templates = [
    'Just when everything seemed safe, a shadow appeared...',
    'But they had no idea what was waiting around the corner.',
    'Little did they know, this was only the beginning.',
    'The truth they discovered would change everything.',
    'What happens next will shock you.',
  ]

  return Array(count)
    .fill(0)
    .map((_, i) => templates[i % templates.length])
}

function generateDialogue(storyIdea: string, duration: number): string[] {
  const linesPerMinute = 8
  const totalLines = duration * linesPerMinute

  const dialogueTemplates = [
    'We can do this if we work together!',
    'I never thought I could be this brave.',
    'Look! Over there! Do you see it?',
    'This is amazing! I can\'t believe it!',
    'We have to help them, no matter what.',
    'I\'m scared, but we have to try.',
    'You\'re the best friend anyone could ask for.',
    'Together, we\'re unstoppable!',
  ]

  return Array(totalLines)
    .fill(0)
    .map((_, i) => dialogueTemplates[i % dialogueTemplates.length])
}

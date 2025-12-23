/**
 * Agent 8: YouTube Growth Optimizer
 * Generates viral-optimized metadata for maximum reach and monetization
 */

export interface YouTubeMetadata {
  title: string
  description: string
  tags: string[]
  thumbnailPrompt: string
  category: string
  targetKeywords: string[]
}

export async function generateYouTubeMetadata(
  storyIdea: string,
  niche: string,
  duration: number
): Promise<YouTubeMetadata> {
  const title = generateViralTitle(storyIdea, niche)
  const description = generateSEODescription(storyIdea, niche, duration)
  const tags = generateTags(storyIdea, niche)
  const thumbnailPrompt = generateThumbnailPrompt(storyIdea, niche)

  return {
    title,
    description,
    tags,
    thumbnailPrompt,
    category: mapNicheToCategory(niche),
    targetKeywords: extractKeywords(storyIdea, niche),
  }
}

function generateViralTitle(storyIdea: string, niche: string): string {
  const templates = [
    `${capitalizeFirst(storyIdea)} | Animated Story`,
    `The Amazing ${capitalizeFirst(storyIdea)} Adventure!`,
    `${capitalizeFirst(storyIdea)} - Epic Animated Movie`,
    `Watch This: ${capitalizeFirst(storyIdea)} Full Story`,
    `${capitalizeFirst(storyIdea)} | Kids Animation HD`,
  ]

  // Keep under 60 characters for optimal display
  let title = templates[Math.floor(Math.random() * templates.length)]
  if (title.length > 60) {
    title = title.substring(0, 57) + '...'
  }

  return title
}

function generateSEODescription(storyIdea: string, niche: string, duration: number): string {
  return `🎬 Watch this amazing ${duration}-minute animated story: ${storyIdea}!

Join us on an incredible adventure filled with excitement, friendship, and valuable lessons! This high-quality animated video is perfect for kids and families.

✨ What You'll Love:
• Stunning 3D animation with vibrant colors
• Engaging characters and heartwarming story
• Educational and entertaining content
• Family-friendly and kid-safe
• Professional voice acting and sound design

🎯 Perfect For:
• Kids aged 5-12 and their families
• Fans of animated stories and adventures
• Educational entertainment
• Quality family time together

📺 Subscribe for more amazing animated stories every week! Hit the bell icon to never miss a new adventure!

👍 If you enjoyed this video, please LIKE, SHARE, and COMMENT below!

---

#animation #kidsvideo #animatedstory #familyfriendly #kidslearning #educationalvideo #storytime #cartoon #3danimation #kidsadventure

© All content is 100% original and created using AI animation technology. Safe for monetization and copyright-compliant.

🎵 Music: Royalty-free tracks licensed for commercial use
🎨 Animation: AI-generated original content
🎤 Voices: AI-synthesized for copyright safety

For business inquiries: [contact info]

---

Our Channel Features:
✓ New videos every week
✓ High-quality 1080p HD content
✓ Educational and entertaining stories
✓ Safe, positive content for all ages
✓ Engaging characters and plots

Thank you for watching! Don't forget to subscribe and join our community of animation lovers! 🌟`
}

function generateTags(storyIdea: string, niche: string): string[] {
  const baseTagsMap: Record<string, string[]> = {
    'kids-animation': [
      'kids animation',
      'animated story',
      'children cartoon',
      'family friendly',
      'kids video',
      '3d animation',
    ],
    educational: [
      'educational video',
      'learning animation',
      'kids learning',
      'educational content',
      'teaching video',
      'edutainment',
    ],
    adventure: [
      'adventure animation',
      'action story',
      'adventure cartoon',
      'exciting story',
      'hero adventure',
      'quest animation',
    ],
    'sci-fi': [
      'sci-fi animation',
      'futuristic story',
      'space adventure',
      'technology cartoon',
      'sci-fi kids',
      'future world',
    ],
    comedy: [
      'funny animation',
      'comedy cartoon',
      'kids comedy',
      'funny story',
      'hilarious video',
      'comedy animation',
    ],
    mystery: [
      'mystery animation',
      'detective story',
      'mystery cartoon',
      'puzzle solving',
      'mystery kids',
      'adventure mystery',
    ],
  }

  const baseTags = baseTagsMap[niche] || baseTagsMap['kids-animation']

  const universalTags = [
    'animation',
    'animated video',
    'kids entertainment',
    'cartoon',
    'story time',
    'animated movie',
    'kids channel',
    'family video',
    'hd animation',
  ]

  return [...baseTags, ...universalTags].slice(0, 15)
}

function generateThumbnailPrompt(storyIdea: string, niche: string): string {
  return `Ultra-realistic 3D animated thumbnail, cinematic quality, 16:9 aspect ratio: Main character from "${storyIdea}" in dramatic heroic pose, vibrant bold colors with high contrast, emotional facial expression showing determination and excitement, dynamic action pose with motion blur effect, dramatic lighting with rim lighting, epic background with depth, large bold text overlay readable at small size, professional movie poster style, eye-catching composition that demands clicks, YouTube thumbnail optimized, ultra-sharp 4K quality, no watermarks`
}

function mapNicheToCategory(niche: string): string {
  const categoryMap: Record<string, string> = {
    'kids-animation': 'Entertainment',
    educational: 'Education',
    adventure: 'Entertainment',
    'sci-fi': 'Science & Technology',
    comedy: 'Comedy',
    mystery: 'Entertainment',
  }

  return categoryMap[niche] || 'Entertainment'
}

function extractKeywords(storyIdea: string, niche: string): string[] {
  const words = storyIdea.toLowerCase().split(' ')
  const keywords = [...new Set(words.filter((w) => w.length > 4))]

  const nicheKeywords = [niche, 'animation', 'kids', 'video', 'animated', 'story']

  return [...keywords, ...nicheKeywords].slice(0, 10)
}

function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(0, 50)
}

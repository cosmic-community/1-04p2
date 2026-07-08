import { createBucketClient } from '@cosmicjs/sdk'
import { Story, Scene } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getStories(): Promise<Story[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'stories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Story[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch stories')
  }
}

export async function getStory(slug: string): Promise<Story | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'stories', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object as Story
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch story')
  }
}

export async function getScenesForStory(storyId: string): Promise<Scene[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'scenes', 'metadata.story': storyId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const scenes = response.objects as Scene[]
    return scenes.sort((a, b) => {
      const numA = a.metadata?.scene_number ?? 0
      const numB = b.metadata?.scene_number ?? 0
      return numA - numB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch scenes')
  }
}

export async function getAllScenes(): Promise<Scene[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'scenes' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const scenes = response.objects as Scene[]
    return scenes.sort((a, b) => {
      const numA = a.metadata?.scene_number ?? 0
      const numB = b.metadata?.scene_number ?? 0
      return numA - numB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch scenes')
  }
}

export async function getScene(slug: string): Promise<Scene | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'scenes', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.object as Scene
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch scene')
  }
}
// app/scenes/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getScene,
  getScenesForStory,
  getMetafieldValue,
} from '@/lib/cosmic'
import { Scene } from '@/types'

export default async function SceneDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const scene = await getScene(slug)

  if (!scene) {
    notFound()
  }

  const sceneImage = scene.metadata?.scene_image
  const sceneTitle = getMetafieldValue(scene.metadata?.scene_title) || scene.title
  const sceneNumber = scene.metadata?.scene_number
  const content = getMetafieldValue(scene.metadata?.content)
  const story = scene.metadata?.story

  let prevScene: Scene | null = null
  let nextScene: Scene | null = null

  if (story && story.id) {
    const siblings = await getScenesForStory(story.id)
    const currentIndex = siblings.findIndex((s) => s.id === scene.id)
    if (currentIndex !== -1) {
      prevScene = currentIndex > 0 ? siblings[currentIndex - 1] ?? null : null
      nextScene =
        currentIndex < siblings.length - 1
          ? siblings[currentIndex + 1] ?? null
          : null
    }
  }

  const storyTitle = story
    ? getMetafieldValue(story.metadata?.title) || story.title
    : ''

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <Link href="/scenes" className="hover:text-foreground transition-colors">
          Scenes
        </Link>
        {story && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/stories/${story.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {storyTitle}
            </Link>
          </>
        )}
      </div>

      {sceneNumber !== undefined && (
        <span className="inline-block bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
          Scene {sceneNumber}
        </span>
      )}

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gradient">
        {sceneTitle}
      </h1>

      {sceneImage && (
        <div className="mt-8 rounded-2xl overflow-hidden border border-border">
          <img
            src={`${sceneImage.imgix_url}?w=1400&h=788&fit=crop&auto=format,compress`}
            alt={sceneTitle}
            width={700}
            height={394}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {content && (
        <div className="mt-8 text-lg leading-relaxed text-foreground whitespace-pre-line">
          {content}
        </div>
      )}

      {/* Navigation */}
      <nav className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-8">
        {prevScene ? (
          <Link
            href={`/scenes/${prevScene.slug}`}
            className="group flex-1 rounded-xl border border-border bg-card p-4 hover:border-primary transition-colors"
          >
            <span className="text-xs text-muted-foreground">← Previous</span>
            <p className="mt-1 font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
              {getMetafieldValue(prevScene.metadata?.scene_title) ||
                prevScene.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextScene ? (
          <Link
            href={`/scenes/${nextScene.slug}`}
            className="group flex-1 rounded-xl border border-border bg-card p-4 text-right hover:border-primary transition-colors"
          >
            <span className="text-xs text-muted-foreground">Next →</span>
            <p className="mt-1 font-semibold text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
              {getMetafieldValue(nextScene.metadata?.scene_title) ||
                nextScene.title}
            </p>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>
    </article>
  )
}
// app/stories/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getStory, getScenesForStory, getMetafieldValue } from '@/lib/cosmic'
import SceneCard from '@/components/SceneCard'

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const story = await getStory(slug)

  if (!story) {
    notFound()
  }

  const scenes = await getScenesForStory(story.id)
  const heroImage = story.metadata?.hero_image
  const synopsis = getMetafieldValue(story.metadata?.synopsis)
  const character = getMetafieldValue(story.metadata?.main_character)
  const title = getMetafieldValue(story.metadata?.title) || story.title

  return (
    <div>
      {/* Hero */}
      <section className="relative">
        <div className="relative aspect-[21/9] max-h-[420px] w-full overflow-hidden bg-muted">
          {heroImage ? (
            <img
              src={`${heroImage.imgix_url}?w=1600&h=686&fit=crop&auto=format,compress`}
              alt={title}
              width={1600}
              height={686}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              📖
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-24 relative z-10">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            {character && (
              <p className="text-sm font-semibold text-accent">
                👤 {character}
              </p>
            )}
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gradient">
              {title}
            </h1>
            {synopsis && (
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {synopsis}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Scenes */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Scenes</h2>
          <Link
            href="/stories"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to stories
          </Link>
        </div>

        {scenes.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
            No scenes have been added to this story yet.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {scenes.map((scene) => (
              <SceneCard key={scene.id} scene={scene} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
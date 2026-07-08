import Link from 'next/link'
import { getStories } from '@/lib/cosmic'
import StoryCard from '@/components/StoryCard'

export default async function HomePage() {
  const stories = await getStories()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-energy-glow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Illustrated Story Reader
          </p>
          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold leading-tight text-gradient">
            गोकू की कहानी
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            एक शक्तिशाली दानव, एक बहादुर योद्धा, और एक महाकाव्य लड़ाई। Read epic
            tales scene by scene with stunning visuals.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/stories"
              className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Browse Stories
            </Link>
            <Link
              href="/scenes"
              className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors"
            >
              View Scenes
            </Link>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Featured Stories</h2>
          <Link
            href="/stories"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all →
          </Link>
        </div>

        {stories.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
            No stories found yet. Add some in your Cosmic bucket!
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
import { getStories } from '@/lib/cosmic'
import StoryCard from '@/components/StoryCard'

export const metadata = {
  title: 'Stories - गोकू की कहानी',
}

export default async function StoriesPage() {
  const stories = await getStories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gradient">
          All Stories
        </h1>
        <p className="mt-3 text-muted-foreground">
          Choose a story to begin reading scene by scene.
        </p>
      </header>

      {stories.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
          No stories found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  )
}
import { getAllScenes } from '@/lib/cosmic'
import SceneCard from '@/components/SceneCard'

export const metadata = {
  title: 'Scenes - गोकू की कहानी',
}

export default async function ScenesPage() {
  const scenes = await getAllScenes()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gradient">
          All Scenes
        </h1>
        <p className="mt-3 text-muted-foreground">
          Browse every illustrated scene across all stories.
        </p>
      </header>

      {scenes.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-12 text-center text-muted-foreground">
          No scenes found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {scenes.map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>
      )}
    </div>
  )
}
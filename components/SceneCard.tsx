import Link from 'next/link'
import { Scene } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface SceneCardProps {
  scene: Scene
}

export default function SceneCard({ scene }: SceneCardProps) {
  const sceneImage = scene.metadata?.scene_image
  const sceneTitle = getMetafieldValue(scene.metadata?.scene_title) || scene.title
  const sceneNumber = scene.metadata?.scene_number
  const content = getMetafieldValue(scene.metadata?.content)

  return (
    <Link
      href={`/scenes/${scene.slug}`}
      className="group block rounded-2xl overflow-hidden border border-border bg-card hover:border-primary transition-all duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {sceneImage ? (
          <img
            src={`${sceneImage.imgix_url}?w=700&h=394&fit=crop&auto=format,compress`}
            alt={sceneTitle}
            width={350}
            height={197}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🎬
          </div>
        )}
        {sceneNumber !== undefined && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
            Scene {sceneNumber}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-base font-bold text-card-foreground group-hover:text-primary transition-colors">
          {sceneTitle}
        </h3>
        {content && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {content}
          </p>
        )}
      </div>
    </Link>
  )
}
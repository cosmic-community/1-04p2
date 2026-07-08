import Link from 'next/link'
import { Story } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface StoryCardProps {
  story: Story
}

export default function StoryCard({ story }: StoryCardProps) {
  const heroImage = story.metadata?.hero_image
  const synopsis = getMetafieldValue(story.metadata?.synopsis)
  const character = getMetafieldValue(story.metadata?.main_character)
  const title = getMetafieldValue(story.metadata?.title) || story.title

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group block rounded-2xl overflow-hidden border border-border bg-card hover:border-primary transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        {heroImage ? (
          <img
            src={`${heroImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            📖
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        {character && (
          <p className="mt-1 text-xs font-medium text-accent">👤 {character}</p>
        )}
        {synopsis && (
          <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
            {synopsis}
          </p>
        )}
      </div>
    </Link>
  )
}
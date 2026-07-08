import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          <span className="text-lg font-extrabold text-gradient">
            गोकू की कहानी
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            href="/stories"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Stories
          </Link>
          <Link
            href="/scenes"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Scenes
          </Link>
        </nav>
      </div>
    </header>
  )
}
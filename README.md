# गोकू की कहानी - Story Reader

![App Preview](https://imgix.cosmicjs.com/302c8010-7a6e-11f1-8037-5b31328df026-autopilot-photo-1451187580459-43490279c0fa-1783474909833.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, immersive story-reading application built with Next.js and [Cosmic](https://www.cosmicjs.com). Experience epic tales like गोकू की कहानी scene by scene, with stunning visuals, character showcases, and a cinematic reading flow — perfect for narrative-driven content in Hindi or any language.

## Features

- 📖 **Story Library** — Browse all stories with hero images and synopses
- 🎬 **Scene-by-Scene Reader** — Read scenes in order with full imagery and content
- 👤 **Character Showcase** — Highlight the main character of each story
- 🔢 **Ordered Scenes** — Scenes automatically sorted by scene number
- ⬅️➡️ **Scene Navigation** — Move between scenes seamlessly
- 📱 **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- ⚡ **Fast & Server-Rendered** — Built on Next.js App Router with server components

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a4daaaa67f2f6a3f8052cba&clone_repository=6a4dab7a67f2f6a3f8052cee)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: सीन 1:सुबह का समय था। गोकू पहाड़ों पर ट्रेनिंग कर रहा था। तभी अचानक आसमान काला हो गया और एक शक्तिशाली दानव गाँव पर हमला कर देता है। गाँव वाले डरकर गोकू को पुकारते हैं। सीन 2:गोकू तुरंत उड़कर गाँव पहुँचता है। दानव आग के गोले फेंककर सब कुछ नष्ट करने की कोशिश करता है। गोकू लोगों को सुरक्षित जगह पहुँचाता है और दानव को चुनौती देता है। सीन 3:दानव अपनी पूरी ताकत से हमला करता है, लेकिन गोकू सुपर सैयान बन जाता है। दोनों के बीच ज़बरदस्त लड़ाई होती है। पूरे आसमान में ऊर्जा की चमक फैल जाती है। सीन 4:आखिर में गोकू ज़ोरदार कामेहामेहा छोड़ता है। दानव हार जाता है और गायब हो जाता है। गाँव वाले खुशी से गोकू का धन्यवाद करते हैं। गोकू मुस्कुराकर कहता है, \"जब तक मैं हूँ, किसी भी बुराई को जीतने नहीं दूँगा!\""

### Code Generation Prompt

> Build a Next.js application for a website called "सीन 1:सुबह समय". The content is managed in Cosmic CMS with the object types stories and scenes. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) or Node.js 18+
- A Cosmic account with a bucket containing `stories` and `scenes` object types

### Installation

```bash
bun install
```

Create your environment variables (these are provided automatically in the Cosmic dashboard):

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

Run the development server:

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Cosmic SDK Examples

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch all stories
const { objects: stories } = await cosmic.objects
  .find({ type: 'stories' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch scenes for a story, sorted manually
const { objects: scenes } = await cosmic.objects
  .find({ type: 'scenes', 'metadata.story': storyId })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const sortedScenes = scenes.sort((a, b) =>
  (a.metadata?.scene_number || 0) - (b.metadata?.scene_number || 0)
)
```

## Cosmic CMS Integration

This app uses two object types from your Cosmic bucket:

- **stories** — `title`, `synopsis`, `hero_image`, `main_character`
- **scenes** — `scene_title`, `scene_number`, `content`, `scene_image`, `story` (object relationship)

Scenes are connected to stories via the `story` object metafield. The app uses the `depth` parameter to resolve connected objects and sorts scenes by `scene_number`.

Learn more in the [Cosmic docs](https://www.cosmicjs.com/docs).

## Deployment Options

- **Vercel** — Import the repo, add environment variables, deploy.
- **Netlify** — Connect the repo, set environment variables, deploy.

Set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` in your hosting platform's dashboard.

<!-- README_END -->
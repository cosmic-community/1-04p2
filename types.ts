export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Story extends CosmicObject {
  type: 'stories';
  metadata: {
    title?: string;
    synopsis?: string;
    hero_image?: CosmicImage;
    main_character?: string;
  };
}

export interface Scene extends CosmicObject {
  type: 'scenes';
  metadata: {
    scene_title?: string;
    scene_number?: number;
    content?: string;
    scene_image?: CosmicImage;
    story?: Story;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export function isStory(obj: CosmicObject): obj is Story {
  return obj.type === 'stories';
}

export function isScene(obj: CosmicObject): obj is Scene {
  return obj.type === 'scenes';
}
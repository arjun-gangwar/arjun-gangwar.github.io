import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts are visible in dev, hidden in builds. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true
  );
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Estimated reading time in minutes (~200 wpm). */
export function readingTime(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Posts sharing the most tags with `post`, newest first as tiebreak. */
export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const others = (await getPublishedPosts()).filter((p) => p.id !== post.id);
  return others
    .map((p) => ({
      p,
      score: p.data.tags.filter((t) => post.data.tags.includes(t)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || b.p.data.date.valueOf() - a.p.data.date.valueOf()
    )
    .slice(0, limit)
    .map(({ p }) => p);
}

/** All posts in the same series as `post`, oldest first (part 1 first). */
export async function getSeriesPosts(post: Post): Promise<Post[]> {
  if (!post.data.series) return [];
  const posts = await getPublishedPosts();
  return posts
    .filter((p) => p.data.series === post.data.series)
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf());
}

export async function getAllTags(): Promise<Map<string, number>> {
  const posts = await getPublishedPosts();
  const tags = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tags.set(tag, (tags.get(tag) ?? 0) + 1);
    }
  }
  return new Map([...tags.entries()].sort((a, b) => b[1] - a[1]));
}

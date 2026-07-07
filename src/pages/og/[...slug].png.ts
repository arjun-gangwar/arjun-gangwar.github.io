import type { APIContext } from 'astro';
import { getPublishedPosts, type Post } from '../../lib/posts';
import { renderOgImage } from '../../lib/og';
import { SITE_TITLE } from '../../consts';

export async function getStaticPaths() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}

export async function GET({ props }: APIContext) {
  const post = (props as { post: Post }).post;
  const fmt = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const png = await renderOgImage({
    title: post.data.title,
    subtitle: post.data.description,
    footer: `${SITE_TITLE} · ${fmt.format(post.data.date)}`,
  });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
}

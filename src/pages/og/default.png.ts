import { renderOgImage } from '../../lib/og';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../../consts';

export async function GET() {
  const png = await renderOgImage({
    title: SITE_TITLE,
    subtitle: SITE_DESCRIPTION,
    footer: SITE_URL.replace('https://', ''),
  });
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
}

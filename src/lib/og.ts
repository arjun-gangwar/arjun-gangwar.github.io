import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import fs from 'node:fs/promises';
import path from 'node:path';

const fontsDir = path.join(process.cwd(), 'src/assets/fonts');

interface OgOptions {
  title: string;
  subtitle?: string;
  footer: string;
}

/** Render a 1200×630 Open Graph card as a PNG buffer (build time only). */
export async function renderOgImage({ title, subtitle, footer }: OgOptions) {
  const [regular, bold] = await Promise.all([
    fs.readFile(path.join(fontsDir, 'inter-400.woff')),
    fs.readFile(path.join(fontsDir, 'inter-700.woff')),
  ]);

  const clamp = (s: string, n: number) =>
    s.length > n ? s.slice(0, n - 1).trimEnd() + '…' : s;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '64px',
          background: '#16181d',
          color: '#e8e6e3',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: { display: 'flex', flexDirection: 'column', gap: '28px' },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '72px',
                      height: '6px',
                      background: '#7aa2f7',
                      borderRadius: '3px',
                    },
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '56px',
                      fontWeight: 700,
                      lineHeight: 1.15,
                    },
                    children: clamp(title, 90),
                  },
                },
                ...(subtitle
                  ? [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '28px',
                            color: '#9a9a94',
                            lineHeight: 1.45,
                          },
                          children: clamp(subtitle, 160),
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: { fontSize: '26px', color: '#7aa2f7' },
              children: footer,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' },
      ],
    }
  );

  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } })
    .render()
    .asPng();
}

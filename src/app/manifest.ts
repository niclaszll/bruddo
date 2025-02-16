import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bruddo',
    short_name: 'Bruddo',
    description: 'Bruddo - Brutto-Netto Rechner',
    start_url: '/',
    display: 'standalone',
    background_color: '#e6e6e6',
    theme_color: '#2a9d90',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/_icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/_icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

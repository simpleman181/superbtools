import type { MetadataRoute } from 'next';
import { allTools } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE = 'https://www.mytoolmate.top';

  const staticPages = [
    '/about', '/contact', '/privacy-policy', '/terms', '/disclaimer', '/cookie-policy',
  ];

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...staticPages.map(href => ({
      url: `${BASE}${href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...allTools.map(tool => ({
      url: `${BASE}${tool.href}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}

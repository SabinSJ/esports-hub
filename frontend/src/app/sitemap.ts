import type { MetadataRoute } from 'next';

import { getMatches } from '@/lib/api/matches';
import { getTeams } from '@/lib/api/teams';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const [matches, teams] = await Promise.all([getMatches(), getTeams()]);

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/matches`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/teams`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tournaments`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/standings`,
      lastModified: new Date(),
    },
  ];

  const teamUrls: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${baseUrl}/team/${team.id}`,
    lastModified: new Date(),
  }));

  const matchUrls: MetadataRoute.Sitemap = matches.map((match) => ({
    url: `${baseUrl}/match/${match.id}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...teamUrls, ...matchUrls];
}

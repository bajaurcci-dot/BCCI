import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.bajaurchamber.org.pk';
    const buildDate = new Date('2026-02-22');

    const routes: MetadataRoute.Sitemap = [
        // ── Tier 1: Homepage ─────────────────────────────────────────────
        {
            url: `${baseUrl}/`,
            lastModified: buildDate,
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        // ── Tier 2: Core public pages ────────────────────────────────────
        {
            url: `${baseUrl}/about`,
            lastModified: buildDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: buildDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/membership`,
            lastModified: buildDate,
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: buildDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        // ── Tier 3: Supporting public pages ──────────────────────────────
        {
            url: `${baseUrl}/membership/online-registration`,
            lastModified: buildDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/membership/member-verification`,
            lastModified: buildDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/compliances`,
            lastModified: buildDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/downloads`,
            lastModified: buildDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/vacancies`,
            lastModified: buildDate,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        // ── Tier 4: Legal / Policy pages ─────────────────────────────────
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: buildDate,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/terms-conditions`,
            lastModified: buildDate,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${baseUrl}/disclaimer`,
            lastModified: buildDate,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    return routes;
}

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.bajaurchamber.org.pk';

    // Core pages
    const routes = [
        '',
        '/about',
        '/compliances',
        '/contact',
        '/disclaimer',
        '/downloads',
        '/membership',
        '/privacy-policy',
        '/services',
        '/terms-conditions',
        '/vacancies',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}

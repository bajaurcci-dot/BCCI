import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/login/', '/dashboard/'],
        },
        sitemap: 'https://www.bajaurchamber.org.pk/sitemap.xml',
    };
}

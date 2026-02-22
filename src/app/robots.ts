import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                // Allow all search engines to crawl public content
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/admin/login',
                    '/admin/dashboard',
                    '/api/',
                ],
            },
            {
                // Explicit Googlebot rule - belt-and-suspenders
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/admin/login',
                    '/admin/dashboard',
                    '/api/',
                ],
            },
        ],
        // Full canonical URL - required for Search Console validation
        sitemap: 'https://www.bajaurchamber.org.pk/sitemap.xml',
    };
}

import { NextResponse, type NextRequest } from 'next/server';

// Old WordPress URL mappings -> new Next.js canonical URLs
// Source: legacy bajaurchamber.org.pk WordPress site URL patterns
const REDIRECT_MAP: Record<string, string> = {
    // WordPress-style trailing-slash pages -> new equivalents (301)
    '/contact-us/': '/contact',
    '/contact-us': '/contact',
    '/about-us/': '/about',
    '/about-us': '/about',
    '/terms-uses/': '/terms-conditions',
    '/terms-uses': '/terms-conditions',
    '/membership-registration/': '/membership/online-registration',
    '/membership-registration': '/membership/online-registration',
    '/member-registration/': '/membership/online-registration',
    '/member-registration': '/membership/online-registration',
    '/member-verification/': '/membership/member-verification',
    '/member-verification': '/membership/member-verification',
    '/our-services/': '/services',
    '/our-services': '/services',
    '/downloads-forms/': '/downloads',
    '/downloads-forms': '/downloads',
    '/forms/': '/downloads',
    '/forms': '/downloads',
    '/vacancies-jobs/': '/vacancies',
    '/vacancies-jobs': '/vacancies',
    '/jobs/': '/vacancies',
    '/jobs': '/vacancies',
    '/compliance/': '/compliances',
    '/compliance': '/compliances',
    '/privacy/': '/privacy-policy',
    '/privacy': '/privacy-policy',
    '/disclaimer/': '/disclaimer',
    // WordPress default pages -> 410 (no replacement)
    '/sample-page/': '__GONE__',
    '/sample-page': '__GONE__',
    '/wp-login.php': '__GONE__',
    '/wp-admin/': '__GONE__',
    '/wp-admin': '__GONE__',
    '/feed/': '__GONE__',
    '/feed': '__GONE__',
    '/xmlrpc.php': '__GONE__',
    '/wp-content/': '__GONE__',
};

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host') || '';
    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const pathname = url.pathname;

    // Skip domain enforcement on local/preview environments
    const isInternal = host.includes('localhost') ||
        host.includes('127.0.0.1') ||
        host.includes('.web.app') ||
        host.includes('.firebaseapp.com') ||
        host.includes('.vercel.app') ||
        host.includes('.netlify.app');

    // ── 1. Enforce HTTPS (single 301) ──────────────────────────────────────
    // Only enforce HTTPS on production (non-internal) hosts.
    // Firebase App Hosting / CDN typically handles TLS termination upstream,
    // but we keep this as belt-and-suspenders.
    if (!isInternal && protocol === 'http') {
        return NextResponse.redirect(
            `https://www.bajaurchamber.org.pk${pathname}${url.search}`,
            { status: 301 }
        );
    }

    // ── 2. Enforce www canonical domain (single 301) ───────────────────────
    if (!isInternal && host && !host.startsWith('www.')) {
        return NextResponse.redirect(
            `https://www.bajaurchamber.org.pk${pathname}${url.search}`,
            { status: 301 }
        );
    }

    // ── 3. Legacy URL redirects & 410 Gone ────────────────────────────────
    const destination = REDIRECT_MAP[pathname];

    if (destination === '__GONE__') {
        // Return 410 Gone for permanently removed WordPress pages
        return new NextResponse(null, { status: 410 });
    }

    if (destination) {
        // 301 permanent redirect, single hop direct to canonical URL
        return NextResponse.redirect(
            `https://www.bajaurchamber.org.pk${destination}`,
            { status: 301 }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico
         * - public files (images, fonts, etc.)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)$).*)',
    ],
};

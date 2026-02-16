import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || 'http';

    // 1. Enforce HTTPS
    // Note: Most production environments (Vercel, Cloudflare) handle this, 
    // but we implement it here for total compliance with the directive.
    if (protocol === 'http' && process.env.NODE_ENV === 'production') {
        return NextResponse.redirect(`https://${host}${url.pathname}${url.search}`, 301);
    }

    // 2. Enforce WWW
    if (host && !host.startsWith('www.') && !host.includes('localhost') && !host.includes('.vercel.app')) {
        return NextResponse.redirect(`https://www.bajaurchamber.org.pk${url.pathname}${url.search}`, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

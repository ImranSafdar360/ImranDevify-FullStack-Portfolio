import { withAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { rateLimiters } from './lib/rate-limit';
import { securityHeaders, securityMonitoring } from './lib/security';

async function applySecurityMiddleware(req: NextRequest) {
  const response = NextResponse.next();
  
  // Apply security headers
  securityHeaders.forEach(({ key, value }) => {
    response.headers.set(key, value);
  });

  // Rate limiting for API routes
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const limiter = req.nextUrl.pathname.startsWith('/api/auth') 
      ? rateLimiters.auth 
      : req.nextUrl.pathname.startsWith('/api/contact')
      ? rateLimiters.contact
      : rateLimiters.api;

    const rateLimitResult = await limiter.isAllowed(req);
    
    if (!rateLimitResult.allowed) {
      // Log security event
      securityMonitoring.logSecurityEvent({
        type: 'rate_limit',
        ip: req.headers.get('x-forwarded-for') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
        url: req.nextUrl.pathname,
        timestamp: new Date(),
        details: { limit: rateLimitResult.limit, remaining: rateLimitResult.remaining },
      });

      const rateLimitResponse = new NextResponse('Too Many Requests', { status: 429 });
      rateLimitResponse.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
      rateLimitResponse.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
      rateLimitResponse.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString());
      rateLimitResponse.headers.set('Retry-After', Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString());
      
      return rateLimitResponse;
    }

    // Add rate limit headers to successful responses
    response.headers.set('X-RateLimit-Limit', rateLimitResult.limit.toString());
    response.headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    response.headers.set('X-RateLimit-Reset', new Date(rateLimitResult.resetTime).toISOString());
  }

  // Block suspicious requests
  const userAgent = req.headers.get('user-agent') || '';
  const suspiciousPatterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
  ];
  
  // Allow legitimate bots but block others
  const legitimateBots = [
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /baiduspider/i,
  ];

  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(userAgent)) &&
                     !legitimateBots.some(pattern => pattern.test(userAgent));

  if (isSuspicious && !req.nextUrl.pathname.startsWith('/api/')) {
    securityMonitoring.logSecurityEvent({
      type: 'spam_detected',
      ip: req.headers.get('x-forwarded-for') || 'unknown',
      userAgent,
      url: req.nextUrl.pathname,
      timestamp: new Date(),
      details: { reason: 'suspicious_user_agent' },
    });

    return new NextResponse('Forbidden', { status: 403 });
  }

  return response;
}

export default withAuth(
  async function middleware(req) {
    // Apply security middleware first
    const securityResponse = await applySecurityMiddleware(req);
    if (securityResponse.status !== 200) {
      return securityResponse;
    }

    // Check if user is trying to access admin routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
      // If not authenticated or not admin, do not redirect to /login.
      // Let the client-side admin layout handle opening the login dialog.
      if (!req.nextauth.token || req.nextauth.token?.role !== 'admin') {
        return NextResponse.next();
      }
    }

    return securityResponse;
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // We are not using server redirect to login anymore.
        // Allow access; client will gate admin and show dialog if needed.
        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    '/admin/:path*', 
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ]
};


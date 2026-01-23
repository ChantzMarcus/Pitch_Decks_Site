// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const password = request.cookies.get('admin_password');
    const authHeader = request.headers.get('authorization');
    
    // Check for basic auth
    if (authHeader) {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = atob(base64Credentials);
      const [username, password] = credentials.split(':');
      
      // In production, use a secure password from environment variables
      if (username === 'admin' && password === process.env.ADMIN_PASSWORD) {
        return NextResponse.next();
      }
    }
    
    // Check for cookie-based auth (for logged-in users)
    if (password && password.value === process.env.ADMIN_PASSWORD) {
      return NextResponse.next();
    }
    
    // Redirect to login or return 401
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin Dashboard"',
      },
    });
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
    '/admin/:path*',
  ],
};
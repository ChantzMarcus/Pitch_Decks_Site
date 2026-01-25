// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');
  const adminCookie = request.cookies.get('admin_password');

  // Check for basic auth
  if (authHeader?.startsWith('Basic ')) {
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = atob(base64Credentials);
    const [username, password] = credentials.split(':');

    if (username === 'admin' && password === process.env.ADMIN_PASSWORD) {
      return NextResponse.next();
    }
  }

  // Check for cookie-based auth
  if (adminCookie?.value === process.env.ADMIN_PASSWORD) {
    return NextResponse.next();
  }

  // Return 401 for admin routes without auth
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Dashboard"',
    },
  });
}

// Only match admin routes explicitly
export const config = {
  matcher: '/admin/:path*',
};

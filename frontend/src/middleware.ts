import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isPublicPath = request.nextUrl.pathname === '/login';
  const token = request.cookies.get('token')?.value || '';

  // If trying to access login page and already logged in
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If trying to access protected route and not logged in
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Add public paths that don't require authentication
export const config = {
  matcher: [
    '/login',
    '/dashboard/:path*'
  ]
};

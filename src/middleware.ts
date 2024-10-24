import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken');

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  if (!authToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authToken && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};

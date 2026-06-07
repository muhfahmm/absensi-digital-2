// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('admin_token'); // Contoh pengecekan token

  // Jika mencoba akses dashboard tapi belum login, arahkan ke login
  if (request.nextUrl.pathname.startsWith('/admin/dashboard') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/admin/auth/login', request.url));
  }

  return NextResponse.next();
}
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "super-secret-key-for-absensi-digital");

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith('/admin/auth');
  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
    if (!token) {
      if (!isAuthPage) {
        return NextResponse.redirect(new URL('/admin/auth/login', request.url));
      }
      return NextResponse.next();
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      
      if (isAuthPage) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    } catch (error) {
      // Invalid token
      if (!isAuthPage) {
        const response = NextResponse.redirect(new URL('/admin/auth/login', request.url));
        response.cookies.delete('auth_token');
        return response;
      }
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

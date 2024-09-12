import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

async function verifyToken(token: string): Promise<boolean> {
  try {
    jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
    return true;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('next-auth.session-token')?.value;
  const isAuthenticated = token ? await verifyToken(token) : false;

  const privateRoutes = ["/home", "/dashboard", "/analytics"];
  const publicRoutes = ["/signin", "/signup", "/forgotPassword", "/resetPassword"];

  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route));

  if (request.nextUrl.pathname === '/logout') {
    const response = NextResponse.redirect(new URL('/signin', request.url));
    response.cookies.delete('next-auth.session-token');
    return response;
  }

  if (isPublicRoute && !isAuthenticated) {
    return NextResponse.next();
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
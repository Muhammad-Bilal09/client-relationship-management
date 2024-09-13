import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || '';

  const publicRoutes = ["/signin", "/signup", "/forgotPassword", "/resetPassword","/"];


  if (publicRoutes.includes(path) && token) {
    return NextResponse.redirect(new URL('/', request.url)); 
  
  }


  if (!publicRoutes.includes(path) && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  console.log(token)

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',       
    '/signin',       
    '/signup',       
    '/forgotPassword',  
    '/resetPassword',   
    '/dashboard',      
    '/home',            
  ],
}
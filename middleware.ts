import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";



export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = request.nextUrl;
  
  const cookie = request.cookies.get('donilabauth.token');
  const isLoggedIn = !!cookie;
  
  function matchesAuthRoute(pathname:any) {
    const authRoutesPatterns = authRoutes.map(route => {
      // Replace dynamic segments in routes with a regex pattern
      const pattern = route.replace(/\[([^\]]+)\]/g, '([^\/]+)');
      return new RegExp(`^${pattern}$`);
    });
  
    return authRoutesPatterns.some(pattern => pattern.test(pathname));
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = matchesAuthRoute(nextUrl.pathname);

 
  if (isApiAuthRoute) {
    return null;
  }

  // Check if the user is trying to access the home page
  if (pathname === '/') {
    // Construct the URL for the login page
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';

    // Return a response that redirects to the login page
    return NextResponse.redirect(url);
}

  if (isAuthRoute) {
    if (isLoggedIn) {
      const callbackUrl = nextUrl.searchParams.get('callbackUrl');
      if (callbackUrl) {
        const decodedUrl = decodeURIComponent(callbackUrl);
        return NextResponse.rewrite(new URL(decodedUrl, request.url));
      }
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.url));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, request.url));
  }

  return null;
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
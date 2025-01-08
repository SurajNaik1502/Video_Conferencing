// In middleware.ts

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  // If user is not authenticated and route is protected, redirect to sign-in
  if (protectedRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url); // Adding the redirectUrl here
    return new Response(null, {
      status: 307,
      headers: {
        Location: signInUrl.toString(),
      },
    });
  }

  return undefined; // Allow authenticated users to proceed
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

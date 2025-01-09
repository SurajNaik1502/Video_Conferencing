import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
]);

export default clerkMiddleware(async (auth, req) => {
  const authObject = await auth();  // Wait for the auth object to resolve
  const { userId } = authObject;    // Now you can safely access userId

  // If the user is not authenticated and the route is protected, redirect to sign-in
  if (protectedRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
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

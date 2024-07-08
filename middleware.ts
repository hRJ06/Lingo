import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
    /* TODO: clerkMiddleware */
    publicRoutes: ['/']
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
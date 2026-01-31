// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/secure-analytics(.*)', // Protect the secure analytics dashboard and any subroutes
  '/admin(.*)',            // Protect all admin routes
]);

export default clerkMiddleware(async (auth, req) => {
  // Check if we're in maintenance mode
  const isMaintenanceMode = process.env.MAINTENANCE_MODE === 'true';
  const isPublicRoute = req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/api/health';
  
  // If in maintenance mode and not a public route, redirect to maintenance page
  if (isMaintenanceMode && !isPublicRoute && !req.nextUrl.pathname.startsWith('/api')) {
    const maintenanceUrl = req.nextUrl.clone();
    maintenanceUrl.pathname = '/maintenance';
    return Response.redirect(maintenanceUrl);
  }
  
  if (isProtectedRoute(req)) {
    await auth.protect(); // Require authentication for protected routes
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
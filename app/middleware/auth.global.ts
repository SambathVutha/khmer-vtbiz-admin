export default defineNuxtRouteMiddleware(async (to) => {
  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/forgot-password', '/reset-password']
  const isPublicRoute = publicRoutes.includes(to.path)

  // On client, ensure session is loaded before making route decisions
  if (import.meta.client) {
    const auth = useAuth()
    await auth.initAuth()

    // If not authenticated and attempting to access a protected route
    if (!auth.isAuthenticated.value && !isPublicRoute) {
      return navigateTo('/login')
    }

    // If authenticated and attempting to access login or forgot password
    if (auth.isAuthenticated.value && isPublicRoute) {
      return navigateTo('/dashboard')
    }
  }
})

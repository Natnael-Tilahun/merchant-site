import { jwtDecode } from "jwt-decode";
import { useAuth } from "~/composables/useAuth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const { getRefreshToken } = useAuth();

  // Skip authentication check for routes that do not require authentication
  if (to.meta.requiresAuth === false) {
    return;
  }

  if (!authStore.isAuthenticated && to.path !== "/login") {
    return navigateTo("/login");
  }

  // If the access token is expired and there's a refresh token available
  if (
    authStore.isAuthenticated &&
    authStore.accessToken &&
    isTokenExpired(authStore.accessToken) &&
    authStore.refreshToken &&
    to.path !== "/login"
  ) {
    try {
      const data = await getRefreshToken();

      if (data) {
        // Update the access token in the store with the new token from the response
        authStore.$patch({
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
          refreshTokenExpiresIn: data.refreshTokenExpiresIn,
        });
      } else {
        // Handle token refresh failure, e.g., redirect to login page
        throw new Error("Error refreshing token: data is null");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle token refresh failure, e.g., redirect to login page
      return navigateTo("/login");
    }
  }

  // Function to check if the token is expired
  function isTokenExpired(token: any) {
    // Decode the JWT token
    const decodedToken = jwtDecode(token);
    // Check if the expiration time (exp) is in the past
    if (decodedToken.exp)
      return decodedToken.exp * 1000 < Date.now();

    return false;
  }
});

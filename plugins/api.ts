import {useAuthStore} from "~/store/useAuthStore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  async function refreshAuthToken() {
    try {
      const accessToken = useCookie("accessToken")
      const refreshToken = useCookie("refreshToken")
      await $fetch("/api/v1/auth/refresh", {
        method: "POST",
        baseURL: config.public.apiBase,
        body: {
          access_token: accessToken.value,
          refresh_token: refreshToken.value,
        }
      });
      return true;
    } catch (err) {
      console.log("refresh err", err)
      return false;
    }
  }

  function logoutUser() {
    const accessToken = useCookie("accessToken")
    const refreshToken = useCookie("refreshToken")
    accessToken.value = null;
    refreshToken.value = null;

    const { authenticated } = storeToRefs(useAuthStore());
    authenticated.value = false;

    navigateTo('/login')
  }

  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ request, options, error }) {
      const accessTokenCookie = useCookie('accessToken');
      if (accessTokenCookie.value) {
        const headers = options.headers ||= {}
        if (Array.isArray(headers)) {
          headers.push(['Authorization', `Bearer ${accessTokenCookie.value}`])
          headers.push(["Access-Control-Allow-Origin", "*"])
          headers.push(['Access-Control-Allow-Headers', '*',])
          // headers.push(['Access-Control-Allow-Methods', '*',])
        } else if (headers instanceof Headers) {
          headers.set('Authorization', `Bearer ${accessTokenCookie.value}`)
          headers.set('Access-Control-Allow-Origin', "*")
          headers.set('Access-Control-Allow-Headers', "*")
          // headers.set('Access-Control-Allow-Methods', "*")
        } else {
          headers.Authorization = `Bearer ${accessTokenCookie.value}`
          headers["Access-Control-Allow-Origin"] = "*"
          headers["Access-Control-Allow-Headers"] = "*"
          // headers["Access-Control-Allow-Methods"] = "*"
        }
      }
    },
    async onResponseError({ request, response, options, error }) {
      if (response.status === 401 || (response.status === 500 && response._data?.message?.includes('token is malformed'))) {
        // Check if we already retried
        const retryCount = request._retryCount || 0;

        // Try to refresh token only once
        if (retryCount < 1) {
          const tokenRefreshed = await refreshAuthToken();
          if (tokenRefreshed) {
            // Retry the original request with the new token
            request._retryCount = retryCount + 1;
            return $fetch(request.url, options); // Retry the original request
          } else {
            logoutUser(); // Refresh failed, logout the user
          }
        } else {
          logoutUser(); // Already retried, logout user
        }
      }

      throw error;
    }
  })
  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})
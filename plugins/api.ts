export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const accessTokenCookie = useCookie('accessToken');
  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ request, options, error }) {
      if (accessTokenCookie.value) {
        options.headers.Authorization = `Bearer ${accessTokenCookie.value}`
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        // await nuxtApp.runWithContext(() => navigateTo('/login'))
      }
    }
  })

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api
    }
  }
})
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const accessTokenCookie = useCookie('accessToken');
  console.log('config.public.apiBase', config.public.apiBase)
  const api = $fetch.create({
    baseURL: config.public.apiBase,
    onRequest({ request, options, error }) {
      console.log("REQUEST API", request, options.baseURL)
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
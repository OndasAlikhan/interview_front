// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@vueuse/nuxt', "@pinia/nuxt",],
  runtimeConfig: {
    public: {
      apiBase: '', // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    }
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: 's',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  components: [
    {
      path: '~/components/common',
      pathPrefix: false
    },
    {
      path: '~/components/ui',
      pathPrefix: true
    }
  ],
})
export default {
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'intheloop',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/supabase', '~/plugins/element-ui', '~/plugins/vue-multiselect', '~/plugins/alert'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],

  modules: ['@nuxt/http'],

  build: {},

  tailwindcss: {
    jit: true,
  },

  env: {
    supabaseKey: process.env.INTHELOOP_SUPABASE_KEY,
    udemyClientId: process.env.INTHELOOP_UDEMY_CLIENT_ID,
    udemyClientSecret: process.env.INTHELOOP_UDEMY_CLIENT_SECRET,
    
  },
}

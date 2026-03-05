// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  ui: {
    components: {
      global: true
    },
    icons: {
      provider: 'local',
      collections: {
        lucide: true
      }
    },
    fonts: {
      sans: 'Inter',
      serif: 'Georgia',
      mono: 'Monaco',
      // 禁用Google字体获取
      google: false
    }
  },

  // 禁用Google字体加载，避免网络连接问题
  fontMetrics: {
    enabled: false
  },

  // 禁用unfonts，避免Google字体请求
  unfonts: {
    enabled: false
  }
})

// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL || 'https://ujyyycxbdldoxysawnyq.supabase.co',
      supabaseKey: process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqeXl5Y3hiZGxkb3h5c2F3bnlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE2OTMxMDcsImV4cCI6MjEwNzI2OTEwN30.QHc8KF7aGWgbu0KexyU5KZQQDI7-vyGe2Vu1Sn3uGXQ'
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  nitro: {
    externals: {
      inline: [/[\\/]node_modules[\\/]nuxt[\\/]/]
    }
  }
})

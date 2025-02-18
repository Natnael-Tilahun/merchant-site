// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // nitro: {
  //   preset: "vercel",
  // },
  ssr: false,
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },

  app: {
    head: {
      title: "Merchant User Management",
      link: [],
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    // "@nuxtjs/color-mode",
    "@davestewart/nuxt-scrollbar",
    "nuxt-icon",
    "@pinia/nuxt",
    // "@nuxt/image",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/i18n",
  ],

  i18n: {
    defaultLocale: "en",
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        name: "English",
        file: "en.json",
      },
      {
        code: "amh",
        name: "Amharic",
        file: "amh.json",
      },
      {
        code: "orm",
        name: "Afaan Oromo",
        file: "orm.json",
      },
      {
        code: "tir",
        name: "Tigrinya",
        file: "tir.json",
      },
      {
        code: "som",
        name: "Somali",
        file: "som.json",
      },
      {
        code: "aar",
        name: "Afar",
        file: "aar.json",
      },
    ],
    lazy: true,
    fallbackLocale: "en",
    missingWarn: false,
    fallbackWarn: false,
    missing: "default",
    // langDir: "i18n/locales",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },

  // colorMode: {
  //   classSuffix: "",
  // },
  hooks: {
    "components:dirs": (dirs) => {
      dirs.unshift({
        path: "~/components/ui",
        // this is required else Nuxt will autoImport `.ts` file
        extensions: [".vue"],
        // prefix for your components, eg: UiButton
        prefix: "Ui",
        // prevent adding another prefix component by it's path.
        pathPrefix: false,
      });
    },
  },

  imports: {
    dirs: [
      // Scan top-level modules
      "composables",
      // ... or scan modules nested one level deep with a specific name and file extension
      "composables/*/index.{ts,js,mjs,mts}",
      // ... or scan all modules within given directory
      "composables/**",
    ],
  },

  compatibilityDate: "2024-07-09",
});
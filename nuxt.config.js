// process.env.DEBUG = 'nuxt:*'
import axios from 'axios';
// const baseUrl = "http://apus.agency:20081";
const baseUrl = "http://dev.ach.gov.ru";

let dynamicRoutes = () => {
  return axios.get(baseUrl+'/api/v1/generate/all').then(res => {
    return res.data.result;
  })
}

export default {
  mode: "universal",
  // debug: true,
  /*
   ** Headers of the page
   */
  head: {
    title: "Счетная палата Российской Федерации",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        name: "keywords",
        content: "государство счетная палата Россия Российская Федерация сайт"
      },
      {
        hid: "description",
        name: "description",
        content: "Официальный сайт Счетной палаты Российской Федерации"
      },
      {
        property: "og:image",
        content: "http://audit.gov.ru/img/ogimage.png"
      },
      {
        property: "vk:image",
        content: "http://audit.gov.ru/img/ogimage.png"
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5b5e5e" }
    ]
  },
  cache: false,
  server: {
    port: 3300, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#22EBDF" },
  loadingIndicator: '~/app/views/loading.html',
  /*
   ** Global CSS
   */
  css: ["@/assets/scss/app.scss"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/polyfill.js", ssr: false },
    { src: "~/plugins/state.js", ssr: false },
    { src: "~/plugins/map.js", ssr: false },
    { src: "~/plugins/axios.js", ssr: true },
    { src: "~/plugins/swiper.js", ssr: false },
    { src: "~/plugins/datepicker.js", ssr: false },
    { src: "~/plugins/i18n.js", ssr: true },
    // { src: "~/plugins/metrika.js", ssr: false },
    // { src: "~/plugins/detector.js", ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/proxy',

    "@nuxtjs/style-resources",
    "cookie-universal-nuxt",
    [
      "nuxt-i18n",
      {
        parsePages: false,
        locales: ["ru", "en"],
        lazy: true,
        defaultLocale: "ru",
        detectBrowserLanguage: {
          useCookie: true,
          alwaysRedirect: false,
          cookieKey: "i18n_redirected"
        },
        vueI18n: {
          fallbackLocale: "ru",
          messages: {
            en: {
              greeting: "Hello world!"
            },
            ru: {
              greeting: "Привет, мир!"
            }
          }
        }
      }
    ],
    [
      '@nuxtjs/yandex-metrika',
      {
        id: '25037612',
        webvisor: true,
        // clickmap:true,
        // useCDN:false,
        // trackLinks:true,
        // accurateTrackBounce:true,
      }
    ],
  ],
  serverMiddleware: [
    (req, res, next) => {
      // const isNotCrawler = !req.isCrawler;
      // res.spa = isNotCrawler;
      // res.setHeader('mode', res.spa ? 'spa' : 'universal');

      if (/\/{2,}/.test(req.url)) {
        const url = req.url.replace(/\/{2,}/g, '/')
        res.writeHead(301, { 'Location': url })
        return res.end()
      }
      
      next()
    }
  ],
  styleResources: {
    scss: "./assets/scss/mixins/*.scss"
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // proxy: true,
    // debug: true
    // baseURL: this.$root.$store.getters.getLang == 'ru' ? 'https://audit.apus.agency/api/v1' : 'https://audit.apus.agency/api/en',
    // baseURL: 'https://audit.apus.agency/api/v1',
    // requestInterceptor: (config, { store }) => {
    //   config.headers.common['Vue-Language'] = 'en'
    //   return config
    // },
    // responseInterceptor: (res, ctx) => { }
  },
  // env: {
  //   baseUrl: 'http://apus.agency:20081'
  // },
  proxy: {
    "/api": { 
      target: 'http://dev.ach.gov.ru', 
      changeOrigin: true
    }
  },
  generate: {
    fallback: '404.html',
    concurrency: 5,
    interval: 5,
    routes: dynamicRoutes
  },
  transition: {
    leave(el, done) {
      this.$header.hasPrev = true;
      this.$header.collapseAll();
      // console.log(this.$nuxt);
      done();
    },
    enter(el, done) {
      // console.log(  window.detector);
      // if(!window.detector.isSupported()) {
      //   this.$router.push('/get-browser/');
      // }
    }
  },

  // render: {
  //   resourceHints: true
  // },
  /*
   ** Build configuration
   */
  vue: {
    // config: {
    //   productionTip: true,
    //   devtools: false
    // }
  },
  build: {
    vendor: ["lodash"],
    babel: {
      presets({ isServer }) {
        return [
          ['@babel/preset-env', { useBuiltIns:false, targets: isServer ? { node: 'current' } : { browsers: ['last 4 versions'] } }]
        ]
      },
      plugins: [
        '@babel/plugin-transform-runtime'
      ]
    },
    // vendor: ['axios'],
    extend(config, { isClient }) {
      if (isClient) {
        config.devtool = 'cheap-source-map'
      }
    },
    terser: {
      // terserOptions: {
      //   compress: {
      //     drop_console: true
      //   }
      // }
    }
  }
};

import Vue from 'vue'
import Vuex from 'vuex'


import * as Cookies from "js-cookie";
Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    isDisability: false,
    // menu: {},
    fontSize: 14,
    theme: 'd-white',
    image: 'true',
    lang: 'ru',
    locale: 'ru'
  },
  mutations: {
    setDisablitiy(state, mode) {
      // Vue.prototype.setCookie('isDisablity', mode);
      Cookies.set('isDisablity', mode);
      state.isDisability = mode;
    },
    setFontSize (state, size) {
      // Vue.prototype.setCookie('fontSize', size);
      Cookies.set('fontSize', size);
      state.fontSize = size
    },
    setTheme (state, theme) {
      // Vue.prototype.setCookie('disTheme', theme);
      Cookies.set('disTheme', theme);
      state.theme = theme
    },
    setImage (state, enabled) {
      // Vue.prototype.setCookie('enableImages', enabled);
      Cookies.set('enableImages', enabled);
      state.image = enabled
    },
    setLang (state, lang) {
      // Vue.prototype.setCookie('lang', lang);
      Cookies.set('lang', lang);
      state.lang = lang;
    },
    SET_LOCALE: (state, locale) => state.locale = locale,
  },
  getters: {
    getDisability: state => {
      return state.isDisability;
    },
    getFontSize: state => {
      return state.fontSize;
    },
    getTheme: state => {
      return state.theme;
    },
    getImage: state => {
      return state.image;
    },
    getLang: state => {
      // Теперь возвращает значение, которое пихает i18n
      return state.locale;
    }
  },
  actions : {
    // nuxtServerInit({ commit }) {

    // }
    // async browserInit({commit}) {
    //   const { data } = await axios.get(`malScraper.json?year=2016&season=fall`)
    //   commit('setSeasons', data )
    // }
  }
});

Vue.prototype.getCookie = function(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

Vue.prototype.setCookie = function(name, value, options = {}) {
  options = {
    path: '/',
    ...options
  };
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export default store

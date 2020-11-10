export default function ({ app, store, redirect }) {
  const lang = app.$cookies.get('lang'),
        fsize = app.$cookies.get('fontSize'),
        distheme = app.$cookies.get('disTheme'),
        isdisabl = app.$cookies.get('isDisablity'),
        enabimg = app.$cookies.get('enableImages')

  if(lang) {
    store.commit('setLang', lang);
  }
  if(fsize) {
    store.commit('setFontSize', fsize);
  }
  if(distheme) {
    store.commit('setTheme', distheme);
  }
  if(isdisabl) {
    store.commit('setDisablitiy', isdisabl);
  }
  if(enabimg) {
    store.commit('setImage', enabimg);
  }
}

<template>
  <div>
    <heading ref="header"></heading>
    <main role="main" :class="($store.getters.getDisability && $store.getters.getImage != 'true') ? 'dis-image' : ''">
      <nuxt ref="page" />
    </main>
    <footering></footering>
  </div>
</template>

<script>
  import gsap from 'gsap';
  const heading = require('~/components/static/header').default;
  const footering = require('~/components/static/footer').default;

  export default {
    middleware: 'state',
    components: {
      heading,
      footering
    },
    created() {
    },
    mounted() {
      if(this.getCookie('isDisablity') && this.getCookie('isDisablity') != 'false') {
        this.$store.commit('setDisablitiy', true); // Сохраняем информацию о режиме
        if(this.getCookie('fontSize')) {
          this.$store.commit('setFontSize', this.getCookie('fontSize')); // Сохраняем информацию о размере шрифта
          document.body.style.fontSize = this.getCookie('fontSize')+'px';
        }
        if(this.getCookie('disTheme')) {
          console.log("SET THEME DEFAULT")
          this.$store.commit('setTheme', this.getCookie('disTheme')); // Сохраняем информацию о теме
          document.body.className = this.getCookie('disTheme');
        }
        if(this.getCookie('enableImages')) {
          console.log('dis images: '+this.getCookie('enableImages'))
          this.$store.commit('setImage', this.getCookie('enableImages')); // Сохраняем информацию о статусе изображений
        }
      } else {
        this.$store.commit('setDisablitiy', false); // Сохраняем информацию о режиме
      }

      // Получение языка
      if(this.getCookie('lang')) {
        this.$store.commit('setLang', this.getCookie('lang')); // Сохраняем информацию о языке
      } else {
        this.$store.commit('setLang', (window.navigator.language || navigator.userLanguage).substr(0, 2).toLowerCase()); // Устанавливаем язык браузера по умолчанию
      }
      console.log(this.$axios.defaults);
      // this.$axios.defaults.headers = {
      //   'Vue-Language': 'en'
      // }
      // this.$axios.setHeader('Vue-Language', 'en');
      // this.$axios.defaults.headers.common['Vue-Language'] = 'en';
    }
  }
</script>

<style>
</style>

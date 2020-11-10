<template>
  <div data-layout="dark">
    <heading ref="header"></heading>
    <main role="main" :class="$store.getters.getImage == 'true' ? '' : 'dis-image'">
      <nuxt ref="page" />
    </main>
  </div>
</template>

<script>
  import gsap from 'gsap';
  const heading = require('~/components/static/header').default;

  export default {
    components: {
      heading,
    },
    mounted() {
      // this.$store.getters.getuser.name
      if(this.getCookie('isDisablity') && this.getCookie('isDisablity') != 'false') {
        // this.$store.commit('setDisablitiy', true); // Сохраняем информацию о режиме
        if(this.getCookie('fontSize')) {
          this.$store.commit('setFontSize', this.getCookie('fontSize')); // Сохраняем информацию о размере шрифта
          document.body.style.fontSize = this.getCookie('fontSize')+'px';
        }
        if(this.getCookie('disTheme')) {
          this.$store.commit('setTheme', this.getCookie('disTheme')); // Сохраняем информацию о теме
          document.body.className = this.getCookie('disTheme');
        }
        if(this.getCookie('enableImages')) {
          console.log('dis images: '+this.getCookie('enableImages'))
          this.$store.commit('setImage', this.getCookie('enableImages')); // Сохраняем информацию о статусе изображений
        }
      }

      // Получение языка
      if(this.getCookie('lang')) {
        this.$store.commit('setLang', this.getCookie('lang')); // Сохраняем информацию о языке
      } else {
        this.$store.commit('setLang', (window.navigator.language || navigator.userLanguage).substr(0, 2).toLowerCase()); // Устанавливаем язык браузера по умолчанию
      }
    },
  }
</script>

<style lang="scss" scoped>
  [data-layout="dark"] {
    background: #04092A;
  }
</style>

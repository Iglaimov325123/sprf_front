<template lang="html">
  <footer>
    <div class="center">
      <div class="grid flex footer-top">
        <div class="col-4">
          <div class="col-inner flex flex-center-v">
            <img src="~assets/img/logo_dark.svg" alt="Главная страница" v-if="$store.getters.getTheme == 'd-white'">
            <img src="~assets/img/logo_dark.svg" alt="Главная страница" v-else-if="$store.getters.getTheme == 'd-blue'">
            <img src="~assets/img/logo.svg" alt="Главная страница" v-else>

            <img :src="reverse ? require('@/assets/img/logo_white.svg') : require('@/assets/img/logo_dark.svg')" alt="Логотип" v-else>
            <div class="name">
              {{$store.getters.getLang == 'en' ? 'Accounts Chamber' : 'Счетная палата'}}
              <i>{{$store.getters.getLang == 'en' ? 'of the Russian Federation' : 'Российской Федерации'}}</i>
            </div>
          </div>
        </div>
        <div class="col-4 col-info">
          <div class="col-inner" v-html="contactInfo.LICENSE"></div>
        </div>
        <div class="col-4 col-info">
          <div class="col-inner">
            <p>{{$store.getters.getLang == 'en' ? 'Contact phone' : 'Справочная'}}:<br><a :href="'tel:'+contactInfo.PHONE">{{contactInfo.PHONE}}</a></p>
            <p>{{$store.getters.getLang == 'en' ? 'Address' : 'Адрес'}}:<br><address>{{contactInfo.ADDRESS}}</address></p>
          </div>
        </div>
      </div>

      <div class="grid flex footer-nav">
        <div class="col-4">
          <div class="col-inner">
            <nav>
              <template v-for="item in footerInfo.FOOTER">
                <router-link :to="item[1]" v-if="!item[2]" @click.native="checkVision(item)">{{item[0]}}</router-link>
                <a :href="item[1]" target="_blank" rel="nofollow" v-else>{{item[0]}}</a>
              </template>
            </nav>
          </div>
        </div>
        <div class="col-4">
          <div class="col-inner">
            <nav>
              <template v-for="item in footerInfo.GOV">
                <router-link :to="item[1]" v-if="!item[2]">{{item[0]}}</router-link>
                <a :href="item[1]" target="_blank" rel="nofollow" v-else>{{item[0]}}</a>
              </template>
            </nav>
          </div>
        </div>
        <div class="col-4">
          <div class="col-inner socials">
            <a target="_blank" :href="social[1]" v-for="social in footerInfo.SOCIAL">{{social[0]}}</a>
          </div>
        </div>
      </div>

      <div class="grid flex footer-nav flex-wrap">
        <div class="col-8">
          <div class="footer-disclamer">
            <p>{{contactInfo.REGISTRATED}}</p>
          </div>

          <!-- <div class="footer-to-form">
            <nuxt-link :to="$store.getters.getLang === 'en' ? '/en/review-about-website' : '/review-about-website'">
              <p>{{$store.getters.getLang == 'en' ? 'Provide a review or comments about the website' : 'Отзывы и замечания о работе сайта'}}</p>
            </nuxt-link>
          </div> -->
        </div>

        <div class="col4">
          <div class="footer-togo">
            <p>{{$store.getters.getLang == 'en' ? 'The website of the Accounts Chamber of the Russian Federation is in test mode' : 'Сайт Счетной палаты Российской Федерации работает в тестовом режиме'}}</p>
            <a href="/old/" class="btn dark">{{$store.getters.getLang == 'en' ? 'Go to the old version of the site' : 'Перейти к старой версии сайта'}}</a>
          </div>
        </div>

        <div class="col-8 subscribe-form">
          <p>Подписка на еженедельную рассылку обновлений сайта Счетной палаты по электронной почте</p>
          <form action="" class="flex">
            <input type="email" placeholder="Электронная почта">
             <button type="submit" class="btn">Отправить</button>
          </form>
        </div>
      </div>



    </div>
  </footer>
</template>

<script>
let that;
export default {
  data() {
    return {
      navLinks: [
        {
          items: [
            {name: 'Контактная информация', route: '/contacts/', external: false},
            {name: 'Противодействие коррупции', route: '/', external: false},
            {name: 'Версия для слабовидящих', route: '/', external: false},
            {name: 'Карта сайта', route: '/map/', external: false}
          ]
        },
        {
          items: [
            {name: 'Президент РФ', route: '/', external: true},
            {name: 'Правительство РФ', route: '/', external: true},
            {name: 'Государственная Дума РФ', route: '/', external: true},
            {name: 'Совет Федерации РФ', route: '/', external: true}
          ]
        }
      ],
      socials: [
        {name: 'Вконтакте', link: 'https://vk.com'},
        {name: 'Одноклассники', link: 'https://ok.ru'},
        {name: 'Instagram', link: 'https://instagram.com'},
        {name: 'Facebook', link: 'https://facebook.com'},
        {name: 'Твиттер', link: 'https://twitter.com'}
      ],

      footerInfo: {},
      contactInfo: {}
    }
  },
  created() {
    that = this;
  },
  mounted() {
    that.$axios.get('/menu/bottom')
    .then(function (response) {
      that.footerInfo = response.data.result;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
    });

    that.$axios.get(`/contacts/main`)
    .then(function (response) {
      console.log(response.data.result);
      that.contactInfo = response.data.result;
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
  },
  methods: {
    checkVision(item) {
      console.log(item);
      if(item[1] == '?blind_mode=on') {
        this.$header.updateVision(true);
      }
    }
  },
  props: {
    reverse: Boolean
  }
}
</script>

<style lang="scss" scoped>
  footer {
    padding-top: 50px;
    padding-bottom: 80px;

    .grid {
      margin: 0 -12px;
      .col-4 {
        .col-inner {
          margin: 0 12px;
        }
      }
    }

    .footer-top {
      font-family: $titlesans;

      .col-4 {
        &:nth-child(2) {
          padding-right: 60px;
        }
      }

      .col-info {
        line-height: 1.44;
        font-size: em(16);
      }

      p + p {
        margin-top: 30px;
      }

      img {
        margin-top: -6px;
      }

      .name {
        font-size: em(18);
        font-weight: 300;
        line-height: 1.44;
        margin-left: 16px;

        i {
          display: block;
        }
      }
    }

    .footer-nav {
      margin-top: 80px;

      nav {
        a {
          display: block;
          font-size: em(18);
          line-height: 1;
          margin-bottom: 20px;
        }
      }

      .socials {
        display: flex;
        flex-wrap: wrap;

        a {
          display: block;
          font-size: em(18);
          line-height: 1;
          margin-bottom: 20px;
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
    }

    .footer-disclamer {
      margin-top: 65px;

      p {
        max-width: 100%;
        padding-right: em(66);
        font-size: em(16);
        line-height: 1.6;
        color: $lightblue;
        font-family: $titlesans;
      }
    }

    .footer-togo {
      margin-top: 75px;
      max-width: 384px;
      font-size: em(18);
      line-height: 1.44;

      .btn {
        width: 100%;
        margin-top: 28px;
      }
    }
  }

  .footer-to-form {
    margin-top: 30px
  }

  .subscribe-form {
    margin-top: 80px;

    p {
      max-width: 480px;
      margin-bottom: 32px;
      display: block;
      line-height: 1.44;
      font-size: em(18);
    }

    form {
      display: flex;
      max-width: 556px;

      input[type="email"] {
        flex: 0 0 calc(100% - 156px);
        max-width: calc(100% - 156px);
        margin-right: 16px;
        font-size: em(18);
        background: rgba($lightblue, 0.1);

        &:focus {
          background: #fff;
        }
      }
 
      button {
        flex: 0 0 140px;
        max-width: 140px;
        height: 40px;
        background: transparent;
        border: 1px solid $lightblue;
        font-size: em(18);
        color: #000;

        &:hover {
          background: $lightblue;
          color: #fff;
        }
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {

  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    footer {
      .footer-top {
        flex-wrap: wrap;

        .col-4.col-info {
          flex: 0 0 50%;
          max-width: 50%;
        }
        .col-4:first-child {
          flex: 0 0 100%;
          max-width: 100%;
          margin-bottom: 40px;
        }
      }

      .footer-nav {
        flex-wrap: wrap;

        .col-4 {
          flex: 0 0 50%;
          max-width: 50%;

          &:last-child {
            margin-top: 60px;
          }
        }
      }

      .footer-disclamer {
        p {
          max-width: 100%;
        }
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    footer {
      padding-top: 40px;
      padding-bottom: 22px;

      .footer-top {
        flex-wrap: wrap;

        p + p {
          margin-top: 20px;
        }

        .col-info {
          font-size: em(18);
          line-height: 1.44;
        }

        .col-4 {
          flex: 0 0 100%;
          max-width: 100%;

          &:first-child {
            margin-bottom: 32px;
          }

          &:nth-child(2) {
            padding-right: 0;
            margin-bottom: 24px;
          }
        }
      }

      .footer-nav {
        margin-top: 48px;
        flex-wrap: wrap;

        nav a {
          font-size: em(18);
          line-height: normal;
        }

        .col-4 {
          flex: 0 0 100%;
          max-width: 100%;

          .col-inner {
            margin-bottom: 32px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(#000, 0.2);
          }

          &:last-child {
            .col-inner {
              margin-bottom: 0;
              padding-bottom: 0;
              border-bottom: 0;
            }
          }
        }
      }

      .footer-disclamer {
        margin-top: 28px;

        p {
          max-width: 100%;
          font-size: em(12);
          line-height: 1.44;
        }
      }

      .footer-togo {
        margin-top: 28px;
        font-size: em(12);
        line-height: 1.44;
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    footer {
      .footer-disclamer {
        p {
          color: #000;
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    footer {
      .footer-top {
        .name {
          color: #fff;
        }
      }
      .footer-disclamer {
        p {
          color: #fff;
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    footer {
      .footer-top {
        .name {
          color: $ddk;
        }
      }
      .footer-disclamer {
        p {
          color: $ddk;
        }
      }
    }
  }
</style>

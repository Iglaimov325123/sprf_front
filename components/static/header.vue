<template lang="html">
  <header :class="menuOpened || searchOpened || submenuOpened ? 'open-fix' : ''">
    <div class="disability-panel" v-if="$store.getters.getDisability">
      <div class="center flex flex-center-v flex-just-b">
        <div class="dis-left flex flex-center-v">
          <div class="dis-col flex flex-center-v">
            <div class="dis-name">
              {{$store.getters.getLang == 'en' ? 'Font' : 'Шрифт'}}
            </div>
            <div class="dis-val flex">
              <div class="dis-btn dis-minus" @click="changeFont(false)"></div>
              <div class="dis-btn dis-plus" @click="changeFont(true)"></div>
            </div>
          </div>
          <div class="dis-col flex flex-center-v">
            <div class="dis-name">
              {{$store.getters.getLang == 'en' ? 'Color' : 'Цвет'}}
            </div>
            <div class="dis-val flex">
              <div class="dis-btn dis-white" @click="setTheme('d-white')">Ф</div>
              <div class="dis-btn dis-black" @click="setTheme('d-black')">Ф</div>
              <div class="dis-btn dis-blue" @click="setTheme('d-blue')">Ф</div>
            </div>
          </div>
          <div class="dis-col flex flex-center-v">
            <div class="dis-name">
              {{$store.getters.getLang == 'en' ? 'Images' : 'Изображения'}}
            </div>
            <div class="dis-val flex">
              <div class="dis-btn dis-toggle" @click="toggleImages()">{{$store.getters.getImage == 'true' ? $store.getters.getLang == 'en' ? 'Off' : 'Выкл' : $store.getters.getLang == 'en' ? 'On' : 'Вкл'}}</div>
            </div>
          </div>
        </div>

        <div class="dis-right flex flex-center-v">
          <div class="dis-col flex flex-center-v" v-if="$store.getters.getLang != 'en'">
            <div class="dis-name">
              {{$store.getters.getLang == 'en' ? 'Sound' : 'Звук'}}
            </div>
            <div class="dis-val flex">
              <div class="dis-btn dis-play" @click="playSelection">-</div>
              <div class="dis-btn dis-stop" @click="stopSpeech">+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center flex flex-just-b flex-center-v">
      <div class="header-left flex flex-center-v">
        <router-link :to="localizedURL('/')" @click.native="goTo(localizedURL('/'))" class="header-logo" v-if="$store.getters.getDisability">
          <img src="~assets/img/logo_dark.svg" alt="Главная страница" v-if="$store.getters.getTheme == 'd-white'">
          <img src="~assets/img/logo_dark.svg" alt="Главная страница" v-else-if="$store.getters.getTheme == 'd-blue'">
          <img src="~assets/img/logo.svg" alt="Главная страница" v-else>
          <span>{{$store.getters.getLang == 'en' ? 'AC' : 'СП'}}<i>{{$store.getters.getLang == 'en' ? 'RF' : 'РФ'}}</i></span>
        </router-link>
        <router-link :to="localizedURL('/')" @click.native="goTo(localizedURL('/'))" class="header-logo" v-else>
          <img src="~assets/img/logo.svg" alt="Главная страница">
          <span>{{$store.getters.getLang == 'en' ? 'AC' : 'СП'}}<i>{{$store.getters.getLang == 'en' ? 'RF' : 'РФ'}}</i></span>
        </router-link>

        <nav>
          <template v-for="link in detailNav" v-if="!link.IS_LINK">
            <div @click="toggleSubMenu">{{link.NAME}}</div>
          </template>
          <template v-else>
            <router-link :to="localizedURL(link.URL)" @click.native="goTo(localizedURL(link.URL))">{{link.NAME}}</router-link>
          </template>
        </nav>
        <button name="openMenu" class="detail-menu" @click="openDetailMenu" v-if="navBlocks != null">
          <span></span>
        </button>
      </div>
      <div class="mobile-trigger" @click="toggleMobileMenu"><span></span></div>
      <div class="header-right flex flex-just-e flex-center-v" v-show="$route.name != 'history___ru' && $route.name != 'history'">
        <button name="changeVision" class="icon-vision" :class="$store.getters.getDisability ? 'active' : ''" @click="changeVision">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.41 18">
            <path d="M14,18C6.92,18,1.4,9.9,1.17,9.56L.8,9l.37-.56C1.4,8.1,6.92,0,14,0S26.6,8.1,26.83,8.44l.38.56-.38.56C26.6,9.9,21.08,18,14,18ZM3.24,9C4.56,10.75,9,16,14,16s9.44-5.25,10.76-7C23.44,7.25,19,2,14,2S4.56,7.25,3.24,9ZM14,14a5,5,0,1,1,5-5A5,5,0,0,1,14,14Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,14,6Z"/>
          </svg>
        </button>
        <button name="openSearch" class="icon-search" @click="openSearch">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.71 20.71">
            <path d="M20.71,19.29l-6.4-6.39A7.92,7.92,0,0,0,16,8a8,8,0,1,0-8,8,7.92,7.92,0,0,0,4.9-1.69l6.39,6.4ZM8,14a6,6,0,1,1,6-6A6,6,0,0,1,8,14Z"/>
          </svg>
        </button>

        <div class="change-lang">
          <a v-if="$store.getters.getLang == 'en'" :href="finalURL">Рус</a>
          <a v-else :href="finalURL">Eng</a>
        </div>
      </div>
    </div>

    <div class="header-subnav">
      <ul class="flex">

        <li v-for="link in detailNav" class="main-link col-12">
          <template>
            <div class="center flex">
              <ul class="detail-item-menu-inner col-3">
                <template v-for="sublink in link.INNER">
                  <li v-if="!sublink.IS_LINK" class="sub-link parent-item">
                    <span @click="showParent">{{sublink.NAME}}</span>
                    <ul class="parent-menu">
                      <li v-for="parentlink in sublink.INNER">
                        <nuxt-link :to="localizedURL(parentlink.URL)" @click.native="goTo(localizedURL(parentlink.URL))">{{parentlink.NAME}}</nuxt-link>
                      </li>
                    </ul>
                  </li>
                  <li v-else class="sub-link">
                    <span><nuxt-link :to="localizedURL(sublink.URL)" @click.native="goTo(localizedURL(sublink.URL))">{{sublink.NAME}}</nuxt-link></span>
                  </li>
                </template>
              </ul>
            </div>
          </template>
        </li>

      </ul>
    </div>

    <div class="header-search">
      <div class="center">
        <search :hided="true" :holder="true" ref="search" :external-suggest-block="true" @fillSearchSuggests="fillSearchSuggests($event)"></search>
      </div>
    </div>

    <div class="header-nav">
      <div class="center">
        <search :hided="true" :holder="true"></search>
        <div class="nav-blocks flex flex-just-b">
          <div class="nav-block" v-for="block in navBlocks">
            <nav>
              <router-link v-for="link in block.ITEMS" :to="localizedURL(link.URL)" @click.native="goTo(localizedURL(link.URL))">{{link.NAME}}</router-link>
            </nav>
            <div class="header-socials" v-if="block.SOCIALS">
              <div class="title">
                {{$store.getters.getLang == 'en' ? 'Social links' : 'В социальных сетях'}}
              </div>
              <a v-for="social in socials" target="_blank" rel="nofollow" :href="social[1]">{{social[0]}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="header-mobile-menu">
      <search :hided="false" :ready-tags="searchTags" :holder="true"></search>
      <ul>
        <li v-for="link in detailNav" class="main-link col-12" @click="expandThis">
          <template v-if="!link.IS_LINK">
              <div class="top-item">
                {{link.NAME}}
              </div>
              <ul class="detail-item-menu-inner col-12">
                <template v-for="sublink in link.INNER">
                  <li v-if="!sublink.IS_LINK" class="sub-link parent-item">
                    <span class="expand-sub">{{sublink.NAME}}</span>
                    <ul class="parent-menu">
                      <li v-for="parentlink in sublink.INNER">
                        <router-link :to="localizedURL(parentlink.URL)" @click.native="goTo(localizedURL(parentlink.URL))">{{parentlink.NAME}}</router-link>
                      </li>
                    </ul>
                  </li>
                  <li v-else class="sub-link">
                    <router-link :to="localizedURL(sublink.URL)" @click.native="goTo(localizedURL(sublink.URL))">{{sublink.NAME}}</router-link>
                  </li>
                </template>
              </ul>
          </template>
          <template v-else>
            <router-link class="top-item link" :to="localizedURL(link.URL)" style="border-bottom: 1px solid rgba(255, 255, 255, 0.2);">{{link.NAME}}</router-link>
          </template>

        </li>

        <li class="main-link col-12" @click="expandThis">
          <div class="top-item">
            {{$store.getters.getLang == 'en' ? 'Social links' : 'Социальные сети'}}
          </div>
          <ul class="detail-item-menu-inner col-12">
            <li class="sub-link" v-for="social in socials">
              <a :href="social[1]" target="_blank" rel="nofollow">{{social[0]}}</a>
            </li>
          </ul>
        </li>
        <li class="main-link col-12" @click="expandThis">
          <a class="top-item link" v-if="$store.getters.getLang == 'en'" :href="finalURL">Рус</a>
          <a class="top-item link" v-else :href="finalURL">Eng</a>
        </li>

      </ul>
      <div class="header-info">
        <div class="mobile-logo flex flex-center-v" v-if="$store.getters.getDisability">
          <img src="~assets/img/logo_dark.svg" alt="Главная страница" v-if="$store.getters.getTheme == 'd-white'">
          <img src="~assets/img/logo_dark.svg" alt="Главная страница" v-else-if="$store.getters.getTheme == 'd-blue'">
          <img src="~assets/img/logo.svg" alt="Главная страница" v-else>
          <div class="name">
            {{$store.getters.getLang == 'en' ? 'Accounts Chamber' : 'Счетная палата'}} <i>{{$store.getters.getLang == 'en' ? 'of the Russian Federation' : 'Российской Федерации'}}</i>
          </div>
        </div>
        <div class="mobile-logo flex flex-center-v" v-else>
          <img src="~assets/img/logo.svg" alt="Главная страница">
          <div class="name">
            {{$store.getters.getLang == 'en' ? 'Accounts Chamber' : 'Счетная палата'}} <i>{{$store.getters.getLang == 'en' ? 'of the Russian Federation' : 'Российской Федерации'}}</i>
          </div>
        </div>

        <p>{{$store.getters.getLang == 'en' ? 'All materials on the website are licensed' : 'Все материалы сайта доступны по лицензии:'}}</p>
        <p>Creative Commons Attribution 4.0 International</p>
        <p>{{$store.getters.getLang == 'en' ? 'Contact phone' : 'Справочная'}}<br><a target="_blank" rel="nofollow" :href="'tel:'+mainContacts.PHONE">{{mainContacts.PHONE}}</a></p>
        <p>{{$store.getters.getLang == 'en' ? 'Address' : 'Адрес'}}<br>{{mainContacts.ADDRESS}}</p>
        <small>{{$store.getters.getLang == 'en' ? 'Registered in the Ministry of the Russian Federation for Press, Television and Radio Broadcasting and Mass Media as an electronic media (certificate of April 23, 2001, E No. 77-4479). Registered in the Ministry of Information Technologies and Communications of the Russian Federation (certificate dated September 27, 2007 No. 11238).' : 'Зарегистрирован в Министерстве Российской Федерации по делам печати, телерадиовещания и средств массовых коммуникаций в качестве электронного средства массовой информации (свидетельство от 23 апреля 2001 года Эл № 77-4479). Зарегистрирован в Министерстве информационных технологий и связи Российской Федерации (свидетельство от 27 сентября 2007 года № 11238).'}}</small>
      </div>
    </div>

    <div class="menu-overlay" @click="collapseAll"></div>

    <div class="center">
      <search-suggest-block :external="true" :suggests="searchSuggests" @fillTag="fillSearchTag($event)" :width="searchWidth"></search-suggest-block>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue';
const search = require('~/components/ui/search').default;
const searchSuggestBlock = require('~/components/ui/search-suggest-block').default;

// var keys = {37: 1, 38: 1, 39: 1, 40: 1};
//
// function preventDefault(e) {
//   e = e || window.event;
//   if (e.preventDefault)
//       e.preventDefault();
//   e.returnValue = false;
// }
//
// function preventDefaultForScrollKeys(e) {
//     if (keys[e.keyCode]) {
//         preventDefault(e);
//         return false;
//     }
// }
//
// function disableScroll() {
//   if (window.addEventListener) // older FF
//       document.body.addEventListener('DOMMouseScroll', preventDefault, false);
//   document.body.addEventListener('wheel', preventDefault, {passive: false}); // Disable scrolling in Chrome
//   document.body.onwheel = preventDefault; // modern standard
//   document.body.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
//   document.body.ontouchmove  = preventDefault; // mobile
//   document.body.onkeydown  = preventDefaultForScrollKeys;
// }
//
// function enableScroll() {
//     if (window.removeEventListener)
//         document.body.removeEventListener('DOMMouseScroll', preventDefault, false);
//     document.body.removeEventListener('wheel', preventDefault, {passive: false}); // Enable scrolling in Chrome
//     document.body.onmousewheel = document.onmousewheel = null;
//     document.body.onwheel = null;
//     document.body.ontouchmove = null;
//     document.body.onkeydown = null;
// }

let that;
export default {
  // async asyncData (context) {
  //   let menuTop = await context.app.$axios.get('/menu/top');
  //
  //   console.log(menuTop.data.result)
  //
  //   return { detailNav: menuTop.data.result }
  //
  //
  //   // that.$axios.get('/menu/top')
  //   //   .then(function (response) {
  //   //     that.detailNav = response.data.result;
  //   //
  //   //     that.$nextTick(function() {
  //   //       that.list = document.querySelector('.header-subnav');
  //   //       that.lists = document.querySelectorAll('.header-subnav .main-link');
  //   //
  //   //       that.topNodes = document.querySelectorAll('header .header-left nav > *');
  //   //       that.checkMenuSize();
  //   //     })
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.log(error);
  //   //   })
  //   //   .finally(function () {
  //   //   });
  // },
  data() {
    return {
      navLinks: [
        {name: 'О Счетной палате', route: '/about/', link: false},
        {name: 'Деятельность', route: '/activity/', link: false},
        {name: 'Противодействие коррупции', route: 'counteraction', link: false},
        {name: 'Контакты', route: '/contacts/', link: true}
      ],

      detailNav: [],

      navCols: [
      ],

      navBlocks: [
      ],

      socials: [
        {name: 'Вконтакте', link: 'https://vk.com'},
        {name: 'Инстаграм', link: 'https://instagram.com'},
        {name: 'Твиттер', link: 'https://twitter.com'},
        {name: 'Одноклассники', link: 'https://ok.ru'},
        {name: 'Фейсбук', link: 'https://facebook.com'}
      ],

      menuOpened: false,
      searchOpened: false,
      submenuOpened: false,
      detailTl: null,
      searchTl: null,
      list: null,
      lists: [],
      lastIndex: 0,
      isFixed: false,
      topNodes: null,

      searchTags: [],
      searchSuggests: [],
      searchWidth: 0,

      didScroll: false,
      lastScrollTop: 0,
      delta: 5,
      navHeight: 0,
      playSelect: null,
      lastSelection: '',
      mainContacts: {},
      hasPrev: false
    }
  },
  computed: {
    ...mapState('i18n', [
      'locale'
    ]),
    showOverlay: function() {
      this.menuOpened;
      this.searchOpened;
      this.submenuOpened;
      return this.menuOpened || this.searchOpened || this.submenuOpened;
    },
    finalURL() {
      // По идее пользователь должен оставаться в том же разделе, где был при переключении языка. Но на время решили делать редирект на главную при переключении языка.
      // let localeToSwitch = this.$i18n.locale === 'en' ? 'ru' : 'en'
      // let pathname = this.$route.fullPath;
      // let pathnameNoPage = this.switchLocalePath(localeToSwitch)
      // if (pathname.indexOf('page') != -1) {
      //   return this.locale === 'en' ? '/' : '/en'
      // } else {
      //   return pathnameNoPage
      // }

      return this.$i18n.locale === 'en' ? '/' : '/en'
    }
  },
  created() {
    Vue.prototype.$header = this;
    that = this;


    // Все меню
    if (process.client) {
    that.$axios.get('/menu/top')
      .then(function (response) {
        that.detailNav = response.data.result;
        console.log('MENU ', that.detailNav)

        that.$nextTick(function() {
          that.list = document.querySelector('.header-subnav');
          that.lists = document.querySelectorAll('.header-subnav .main-link');

          that.topNodes = document.querySelectorAll('header .header-left nav > *');

          if(that.navBlocks != null) {
            that.checkMenuSize();
          }
        })
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });

    // Теги в поиск
    that.$axios.get('/search/tags')
      .then(function (response) {
        that.searchTags = response.data.result;
        console.log(that.searchTags);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });

    // Меню
    that.$axios.get('/menu/full')
      .then(function (response) {
        console.log('MENU', response.data.result);
        that.navBlocks = response.data.result.MAIN;
        that.socials = response.data.result.SOCIAL;

        that.$nextTick(function() {
          // Меню
          that.detailTl = new TimelineMax({paused: true, onStart() {
            document.querySelector('.header-nav').style.display = 'block';
            that.resizeAllGridItems();
            that.menuOpened = true;
            TweenMax.to('.menu-overlay', 1, {opacity: 1, ease: Expo.easeInOut, onStart() {
              document.querySelector('.menu-overlay').style.display='block';
            }});
            document.querySelector('header').classList.remove('fixed');
            document.body.style.overflow = 'hidden';
          }, onReverseComplete() {
            document.querySelector('.header-nav').style.display = 'none';
            that.resizeAllGridItems();
            that.menuOpened = false;
            if(!that.submenuOpened) {
              document.body.style.overflow = 'visible';
            }
          }});
          that.detailTl.to('.header-nav', 1, {y: 0, force3D: true, ease: Expo.easeInOut}, 0)
                       .staggerTo('.header-nav .search-input, .header-nav .search-ready-tags, .header-nav nav a, .header-socials .title, .header-socials a', 1, {y: 0, opacity: 1, force3D: true, ease: Expo.easeOut}, 0.02, 0.8)

          that.detailTl.timeScale(1.5);
        })
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });

    }

  },
  mounted() {
    this.searchResize();
    window.addEventListener('resize', function () {
      that.searchResize();
    });

    console.log('ROUTER INFO', that.$route)

    that.$axios.get(`/contacts/main`)
    .then(function (response) {
      that.mainContacts = response.data.result;
      console.log('MAIN CONTACTS', that.mainContacts);
    })
    .catch(function (error) {
    })
    .finally(function () {
    });

    // changeVision
    console.log(this.$route.query.blind_mode);

    // Поиск
    this.searchTl = new TimelineMax({paused: true, onStart() {
      that.searchOpened = true;
      TweenMax.to('.menu-overlay', 1, {opacity: 1, ease: Expo.easeInOut, onStart() {
        document.querySelector('.menu-overlay').style.display='block';
      }});
    }, onReverseComplete() {
      that.searchOpened = false;
    }});
    this.searchTl.to('.header-search', 1, {y: 0, force3D: true, ease: Expo.easeInOut}, 0)
                 .to('.header-search .search-input', 1, {y: 0, opacity: 1, force3D: true, ease: Expo.easeOut});
    this.searchTl.timeScale(1.5);

    window.addEventListener('scroll', this.scrollEvent, false);


    // that.resizeAllGridItems();
    window.onload = that.resizeAllGridItems();
    window.addEventListener('resize', that.resizeAllGridItems);

    // TweenMax.ticker.addEventListener("tick", that.checkMenuSize);

    let allItems = document.querySelectorAll('.nav-blocks .nav-block');
    for(let i = 0; i < allItems.length; i++) {
      that.resizeGridItem(allItems[i]);
    }

    that.navHeight = document.querySelector('header').offsetHeight;

    setInterval(function() {
      if(that.didScroll) {
        console.log('hasScrolled');
        that.hasScrolled();
        that.didScroll = false;
      }
    })

    this.updateVision(this.getCookie('isDisablity') == 'true')

    document.onmouseup = function(e) {
      // console.log('E-PATH', e.path);
      if(e.path) {
        if(!e.path.includes(document.querySelector('.dis-btn.dis-play'))) {
          that.lastSelection = window.getSelection().toString();
        }
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollEvent, false);
  },
  methods: {
    goTo(url) {
      // console.log(this.$route.path);
      // console.log('GO TO', url);
      if(this.$route.path == url) {
        this.collapseAll();
      }
    },
    localizedURL(url) {
      return this.$i18n.locale === 'en' ? '/en' + url : url
    },
    hasScrolled() {
      let st = window.pageYOffset || document.documentElement.scrollTop;

      if(Math.abs(that.lastScrollTop - st) <= that.delta)
        return;

      if(st > that.lastScrollTop && st > that.navHeight) {
        // remove nav-down and ad nav-up
        document.querySelector('header').classList.add('nav-up');
        if(document.querySelector('.expand-menu')) {
          document.querySelector('.expand-menu').classList.remove('nav-up');
        }
      } else {
        if(st + window.innerHeight < document.body.scrollHeight) {
          // remove nav-up and ad nav-down
          document.querySelector('header').classList.remove('nav-up');
          if(document.querySelector('.expand-menu')) {
            document.querySelector('.expand-menu').classList.add('nav-up');
          }
        }
      }

      that.lastScrollTop = st;
    },
    scrollEvent(e) {
      that.didScroll = true;
      let top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
      if(top > 0) {
        document.querySelector('header').classList.add('fixed');
      } else {
        document.querySelector('header').classList.remove('fixed');
      }
    },

    openDetailMenu(e) {
      e.preventDefault();
      this.collapseSubmenu();
      this.searchTl.reverse();

      if(this.menuOpened) {
        if(that.isFixed) {
          document.querySelector('header').classList.add('fixed');
        }
        this.detailTl.reverse();
        TweenMax.to('.menu-overlay', 1, {opacity: 0, ease: Expo.easeInOut, onComplete() {
          document.querySelector('.menu-overlay').style.display='none';
        }});
      } else {
        if(document.querySelector('header').classList.contains('fixed')) {
          that.isFixed = true;
        } else {
          that.isFixed = false;
        }

        this.detailTl.play();
      }
    },
    openSearch(e) {
      e.preventDefault();
      this.collapseSubmenu();
      if(that.isFixed) {
        document.querySelector('header').classList.add('fixed');
      }
      that.detailTl.reverse();
      TweenMax.to('.menu-overlay', 1, {opacity: 0, ease: Expo.easeInOut, onComplete() {
        document.querySelector('.menu-overlay').style.display='none';
      }});

      if(this.searchOpened) {
        this.searchTl.reverse();
        TweenMax.to('.menu-overlay', 1, {opacity: 0, ease: Expo.easeInOut, onComplete() {
          document.querySelector('.menu-overlay').style.display='none';
        }});
      } else {
        this.searchTl.play();
      }
    },
    closeMenu() {
      console.log('close menu');
      // that.detailTl.timeScale(3);
      if (that.detailTl) {
        // that.detailTl.timeScale(3);
        that.detailTl.reverse();
      }

      that.searchTl.reverse();
      TweenMax.to('.menu-overlay', 1, {opacity: 0, ease: Expo.easeInOut, onComplete() {
        document.querySelector('.menu-overlay').style.display='none';
      }});
    },

    expandThis(e) {
      let elem = e.target || e.srcElement;

      console.log(elem);

      let subMenu;
      if(elem.classList.contains('expand-sub') || elem.classList.contains('parent-item')) {
        if(elem.classList.contains('expand-sub')) {
          elem = elem.closest('.parent-item');
        }

        subMenu = elem.querySelector('.parent-menu');
      } else if(elem.classList.contains('top-item')) {
        if(!elem.classList.contains('main-link')) {
          elem = elem.closest('.main-link')
        }

        subMenu = elem.querySelector('.detail-item-menu-inner');
      }

      if(subMenu != null) {
        if(elem.classList.contains('active')) {
          elem.classList.remove('active')
          TweenMax.to(subMenu, 1, {height: 0, ease: Expo.easeOut});
        } else {
          elem.classList.add('active')
          TweenMax.set(subMenu, {height: 'auto'});
          TweenMax.from(subMenu, 1, {height: 0, ease: Expo.easeOut})
        }
      }
    },

    expandSub(e) {

    },

    toggleSubMenu(e) {
      let elem = e.target || e.srcElement,
          index = this.index(elem);

      this.closeMenu();

      console.log("TOGGLE SUB MENU")

      if(elem.classList.contains('current')) {
        elem.classList.remove('current');
        TweenMax.to('.menu-overlay', 1, {opacity: 0, ease: Expo.easeInOut, onComplete() {
          document.querySelector('.menu-overlay').style.display='none';
        }});
        TweenMax.to(this.list, 1, {y: '-100%', ease: Expo.easeInOut, onComplete() {
          that.submenuOpened = false;
          console.log('set overflow visible');
          document.body.style.overflow = 'visible';
        }});

        let listCol = this.lists[index];
        listCol.classList.remove('current');
        TweenMax.to(listCol.querySelectorAll('.sub-link span'), 1, {opacity: 0, clearProps: 'all', force3D: true, ease: Expo.easeOut});
      } else {
        that.submenuOpened = true;
        console.log('set overflow hidden');
        document.body.style.overflow = 'hidden';

        for(let i = 0; i < document.querySelectorAll('header nav *').length; i++) {
          if(document.querySelectorAll('header nav *')[i] != elem) {
            document.querySelectorAll('header nav *')[i].classList.remove('current');
          }
        }
        elem.classList.add('current');

        let listCol = this.lists[index];
        listCol.classList.add('current');
        TweenMax.to('.menu-overlay', 1, {opacity: 1, ease: Expo.easeInOut, onStart() {
          document.querySelector('.menu-overlay').style.display='block';
        }});
        TweenMax.to(this.list, 1, {y: '0%', height: listCol.querySelector('.center').offsetHeight+'px', ease: Expo.easeInOut});

        if(this.lastIndex < index) {
          // from right
          TweenMax.staggerFromTo(listCol.querySelectorAll('.sub-link span'), 1, {x: 20, opacity: 0}, {x: 0, opacity: 1, delay: 0.5, force3D: true, clearProps: 'all', ease: Expo.easeOut}, 0.03);
        } else {
          // from left
          TweenMax.staggerFromTo(listCol.querySelectorAll('.sub-link span'), 1, {x: -20, opacity: 0}, {x: 0, opacity: 1, delay: 0.5, force3D: true, clearProps: 'all', ease: Expo.easeOut}, 0.03);
        }
        this.lastIndex = index;

        let lists = this.list.querySelectorAll('.parent-menu');
        console.log(lists);
        for(let i = 0; i < lists.length; i++) {
          TweenMax.to(lists[i].querySelectorAll('li'), 0.5, {opacity: 0, clearProps: 'all', force3D: true, ease: Expo.easeOut});
        }
        TweenMax.set(this.lists, {x: -index*100+'%', force3D: true, ease: Expo.easeInOut});
      }
    },

    collapseSubmenu() {
      TweenMax.to('.menu-overlay', 1, {opacity: 0, ease: Expo.easeInOut, onComplete() {
        document.querySelector('.menu-overlay').style.display='none';
      }});
      TweenMax.to(that.list, 1, {y: '-100%', ease: Expo.easeInOut, onComplete() {
        that.submenuOpened = false;
      }});

      for(let i = 0; i < document.querySelectorAll('header nav *').length; i++) {
        document.querySelectorAll('header nav *')[i].classList.remove('current');
      }

      for(let i = 0; i < that.lists.length; i++) {
        that.lists[i].classList.remove('current');
        TweenMax.to(that.lists[i].querySelectorAll('li'), 1, {opacity: 0, clearProps: 'all', ease: Expo.easeInOut});
      }
    },

    showParent(e) {
      let elem = e.target || e.srcElement;
      if(!elem.classList.contains('parent-item')) {
        elem = elem.closest('.parent-item');
      }

      elem.classList.add('current');
      this.submenuOpened = true;
      TweenMax.to('.menu-overlay', 1, {opacity: 1, ease: Expo.easeInOut, onStart() {
        document.querySelector('.menu-overlay').style.display='block';
      }});

      let list = elem.querySelector('.parent-menu');
      let lists = elem.closest('.main-link').querySelectorAll('.parent-menu');

      console.log(lists);

      for(let i = 0; i < lists.length; i++) {
        if(lists[i] != list) {
          lists[i].closest('.parent-item').classList.remove('current');
          TweenMax.staggerTo(lists[i].querySelectorAll('li'), 0.5, {opacity: 0, clearProps: 'all', ease: Expo.easeInOut}, 0.05);
        } else {
          list.closest('.parent-item').classList.add('current');
          TweenMax.staggerTo(list.querySelectorAll('li'), 0.5, {opacity: 1, ease: Expo.easeInOut}, 0.05);
          console.log('cur list')
        }
      }
    },

    index(el) {
      var children = el.parentNode.childNodes,
          i = 0;
      for (; i < children.length; i++) {
          if (children[i] == el) {
              return i;
          }
      }
      return -1;
    },

    resizeGridItem(item) {
      let grid = document.querySelector('.nav-blocks'),
      rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows')),
      rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
      rowSpan = Math.ceil((item.querySelector('nav').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

      item.style.gridRowEnd = "span "+rowSpan;
    },

    resizeAllGridItems() {
      let allItems = document.querySelectorAll('.nav-blocks .nav-block');
      for(let i = 0; i < allItems.length; i++) {
        that.resizeGridItem(allItems[i]);
      }

      that.checkMenuSize();
    },
    toggleMobileMenu(e) {
      if(document.querySelector('.mobile-trigger').classList.contains('active')) {
        document.body.style.overflow = '';
        // document.querySelector('header').classList.remove('fixed');
        document.querySelector('.mobile-trigger').classList.remove('active');
        TweenMax.to('.header-mobile-menu', 1, {y: '-100%', force3D: true, ease: Expo.easeOut});
      } else {
        document.body.style.overflow = 'hidden';
        document.querySelector('header').classList.add('fixed');
        document.querySelector('.mobile-trigger').classList.add('active');
        TweenMax.to('.header-mobile-menu', 1, {y: '0%', force3D: true, ease: Expo.easeOut});
      }
    },
    collapseMobileMenu() {
      document.body.style.overflow = '';
      document.querySelector('.mobile-trigger').classList.remove('active');
      TweenMax.to('.header-mobile-menu', 1, {y: '-100%', force3D: true, ease: Expo.easeOut});
    },
    collapseAll(e) {
      console.log('Collapse all')
      that.collapseSubmenu();
      that.closeMenu();
      that.collapseMobileMenu();
      this.collapseSearchSuggests();
    },
    checkMenuSize(e) {
      // that.topNodes;
      let maxSize = 0,
          linkSize = 0;

      if(that.topNodes != null) {
        maxSize += document.querySelector('header .header-left').offsetWidth;
        maxSize -= document.querySelector('header .header-logo').offsetWidth;
        let logoStyle = window.getComputedStyle ? getComputedStyle(document.querySelector('header .header-logo'), null) : document.querySelector('header .header-logo').currentStyle;
        maxSize -= parseFloat(logoStyle.marginRight);

        if(document.querySelector('header .detail-menu')) {
          maxSize -= document.querySelector('header .detail-menu').offsetWidth;
        }

        for(let i = 0; i < that.topNodes.length; i++) {
          that.topNodes[i].style.display = 'inline-block';
          let style = window.getComputedStyle ? getComputedStyle(that.topNodes[i], null) : that.topNodes[i].currentStyle;
          linkSize += that.topNodes[i].offsetWidth + parseFloat(style.marginRight);

          if(linkSize >= maxSize) {
            that.topNodes[i].style.display = 'none';
          } else {
            that.topNodes[i].style.display = 'inline-block';
          }
        }
        console.log('SIZE', maxSize, linkSize);
      }
    },
    changeVision() {
      if(this.$store.getters.getDisability) {
        this.updateVision(false)
      } else {
        this.updateVision(true)
      }
    },
    updateVision(toState) {
      if(toState) {
        this.$store.commit('setDisablitiy', true);

        // Применяем все настройки
        document.body.style.fontSize = this.getCookie('fontSize')+'px';

        if(this.getCookie('disTheme')) {
          document.body.className = this.getCookie('disTheme');
        } else {
          document.body.className = 'd-white';
        }
      } else {
        this.$store.commit('setDisablitiy', false);

        // Отменяем все настройки
        document.body.style.fontSize = '';
        document.body.className = '';
      }
    },
    changeFont(direction) {
      if(direction) {
        // Плюс
        if(parseInt(this.$store.getters.getFontSize) > 18) {
          return;
        }
        this.$store.commit('setFontSize', parseInt(this.$store.getters.getFontSize) + 1); // Сохраняем информацию о размере шрифта
      } else {
        // Минус
        if(parseInt(this.$store.getters.getFontSize) < 14) {
          return;
        }
        this.$store.commit('setFontSize', parseInt(this.$store.getters.getFontSize) - 1); // Сохраняем информацию о размере шрифта
      }

      // Применяем
      document.body.style.fontSize = this.$store.getters.getFontSize+'px';
    },
    setTheme(name) {
      this.$store.commit('setTheme', name); // Сохраняем информацию о теме

      // Применяем
      document.body.className = name;
    },
    toggleImages() {
      if(this.$store.getters.getImage == 'true') {
        // Отключаем изображения
        this.$store.commit('setImage', 'false');
      } else {
        // Включаем изображения
        this.$store.commit('setImage', 'true');
      }
    },

    playSelection() {
      console.log('speech: ', this.lastSelection);
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(this.lastSelection));
      // console.log(this.playSelect, this.lastSelection);
    },
    stopSpeech() {
      window.speechSynthesis.cancel();
    },

    changeLang() {
      if(this.$store.getters.getLang == 'en') {
        // Отключаем изображения
        this.$store.commit('setLang', 'ru');
        location.reload()
      } else {
        // Включаем изображения
        this.$store.commit('setLang', 'en');
        window.location.href = '/'
      }
    },

    fillSearchTag(tag) {
      this.$refs.search.fillTag(tag);
    },

    fillSearchSuggests(suggests) {
      this.searchSuggests = suggests;
    },

    searchResize() {
      this.searchWidth = this.$refs.search.$el.offsetWidth;
    },

    collapseSearchSuggests() {
      this.searchSuggests = [];
    },
  },
  components: {
    search,
    searchSuggestBlock,
  }
}
</script>

<style lang="scss" scoped>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 16px 0;
    color: #fff;
    z-index: 500;
    transform: perspective(1px) translateY(0) translateZ(0);
    will-change: transform;
    transition: transform 0.2s $cubic, padding 0.2s $cubic;
    backface-visibility: hidden;

    &.open-fix {
      &:before {
        transform: translateY(0) translateZ(0);
      }
    }

    nav {
      > * {
        white-space: nowrap;
        transform: perspective(1px) translateZ(0);
      	backface-visibility: hidden;
      }
    }

    .menu-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(3, 7, 33, 0.9);
      opacity: 0;
      will-change: opacity;
      display: none;
    }

    &.nav-up {
      transform: translateY(-100%) translateZ(0);
    }
    // &.nav-down {
    //   transform: translateY(0) translateZ(0);
    // }

    .header-logo {
      span {
        display: none;
      }
    }

    .mobile-trigger {
      width: 24px;
      height: 24px;
      position: relative;
      z-index: 50;
      display: none;

      span {
        position: absolute;
        width: 24px;
        height: 2px;
        background: #fff;
        display: block;
        top: 50%;
        margin-top: -1px;
      }

      &:before, &:after {
        content: '';
        width: 24px;
        height: 2px;
        background: #fff;
        position: absolute;
      }

      &:before {
        top: 0;
      }
      &:after {
        bottom: 0;
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $darkblue;
      transform: translateY(-100%) translateZ(0);
      transition: transform 0.1s $cubic;
      z-index: 50;
    }

    &.fixed {
      padding: 12px 0;

      &:before {
        transform: translateY(0) translateZ(0);
      }

      .header-logo {
          width: 32px;
          height: 32px;
      }
    }

    .header-nav, .header-search {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: #04092A;
      padding-top: 128px;
      overflow: hidden;
      transform: translateY(-100%) translateZ(0);
      will-change: transform;
      max-height: 100vh;
      overflow: -moz-scrollbars-none;
      -ms-overflow-style: none;
      z-index: 5;
      &::-webkit-scrollbar { width: 0; }

      // display: none;

      .nav-blocks {
        margin: 80px -15px 72px;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(auto-fill, minmax(250px,1fr));
        grid-auto-rows: 20px;
      }

      .nav-block {
        font-size: em(18);
        padding: 0 15px;
        display: inline-block;
        // padding-right: 30px;

        nav {
          a {
            display: block;
            margin-bottom: 30px;
            font-size: em(18);
            line-height: 1.5;
            transform: translateY(200px) translateZ(0);
            opacity: 0;
            will-change: transform, opacity;
            white-space: pre-wrap;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }

      .header-socials {
        margin-top: 50px;

        .title {
          margin-bottom: 30px;
          transform: translateY(200px) translateZ(0);
          opacity: 0;
          will-change: transform, opacity;
        }

        a {
          display: block;
          margin-bottom: 30px;
          transform: translateY(200px) translateZ(0);
          opacity: 0;
          will-change: transform, opacity;
        }
      }
    }

    .detail-menu {
      width: 28px;
      height: 28px;
      position: relative;

      &:before, &:after, span {
        content: '';
        width: 4px;
        height: 4px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        margin-top: -2px;
      }

      span {
        top: 50%;
        left: 50%;
        margin-left: -2px;
      }
      &:before {
        left: 0;
        top: 50%;
      }
      &:after {
        right: 0;
        top: 50%;
      }
    }

    .center {
      // position: relative;
      z-index: 50;
    }

    .header-logo {
      margin-right: 48px;
      position: relative;
      z-index: 100;
      width: 48px;
      height: 48px;
      transition: width 0.2s $cubic, height 0.2s $cubic;

      img {
        width: 100%;
      }
    }

    nav {
      div, a {
        margin-right: 32px;
        position: relative;
        z-index: 50;
        color: $midblue;
        cursor: pointer;
        transform: perspective(1px) translateZ(0);
        backface-visibility: hidden;

        &.current {
          color: $lightblue;
          cursor: default;
        }
      }
    }

    button {
      -webkit-appearance: none;
      border-radius: 0;
      background: transparent;
      border: 0;
      outline: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    a {
      color: $midblue;
      font-size: em(16);
      line-height: 1.25;

      &.nuxt-link-active {
        color: $lightblue;
      }

      &:hover {
        color: #fff;
      }
    }

    svg {
      width: 100%;

      path {
        fill: #fff;
      }
    }

    .header-right {
      padding-left: 30px;
      position: relative;
      z-index: 50;

      .icon-vision {
        width: 24px;
        height: 24px;
        margin-right: 48px;
        cursor: pointer;
        flex: 0 0 24px;

        &.active {
          opacity: 0.5;
        }
      }

      .icon-search {
        width: 20px;
        height: 20px;
        flex: 0 0 20px;
      }

      .change-lang {
        margin-left: 40px;
        padding-left: 40px;
        border-left: 1px solid rgba(#fff, 0.2);
        height: 32px;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          color: rgba(#fff, 0.7);
        }
      }
    }
  }

  .header-left > * {
    z-index: 50;
  }

  .header-left {
    width: 100%;
    nav > * {
      display: inline-block;
    }
  }

  .header-subnav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: $darkblue;
    transform: translateY(-100%);
    z-index: -1;
    overflow: hidden;
    z-index: 5;

    li {
      margin-bottom: 30px;
      padding-left: 0;
      position: static;

      &:before {
        display: none;
      }

      &.parent-item {
        &.current {
          span, a {
            color: $lightblue;
            cursor: default;
          }
        }
      }

      span, a {
        color: $midblue;
        cursor: pointer;

        &:hover {
          color: $lightblue;
        }

        // &.nuxt-link-exact-active, &.nuxt-link-active, &.active {
        //   color: $lightblue;
        //   cursor: default;
        // }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .detail-item-menu-inner {
      position: relative;
    }

    .sub-link {
      // transform: translateX(200px) translateZ(0);
      // opacity: 0;
      // will-change: transform;
      &.current {
        .parent-menu {
          display: block;

          // li {
          //   opacity: 1;
          // }

          a {
            color: $midblue;

            &:hover {
              color: $lightblue;
            }

            &.nuxt-link-active {
              color: $lightblue;
            }
          }
        }
      }
    }

    .parent-menu {
      position: absolute;
      top: 0;
      left: 100%;
      width: 100%;
      display: none;

      li {
        // transform: translateX(-30%) translateZ(0);
        opacity: 0;

        a {
          display: block;
          cursor: pointer;
        }
      }
    }

    .center {
      padding: 128px 120px 80px;
    }
  }

  .header-mobile-menu {
    display: none;
  }

  .disability-panel {
    height: 64px;
    display: flex;
    background: #F1F2F5;
    margin-top: -16px;
    margin-bottom: 16px;
    position: relative;
    z-index: 50;
    color: #000;

    .center {
      width: 100%;
    }

    .dis-col {

      &+.dis-col {
        margin-left: 40px;
        padding-left: 40px;
        border-left: 1px solid rgba(#000, 0.5);
      }

      .dis-name {
        transform: perspective(1px) translateZ(0);
        backface-visibility: hidden;
        font-size: 20px;
      }
      .dis-val {
        margin-left: 12px;

        .dis-btn {
          width: 32px;
          height: 32px;
          border-radius: 2px;
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;

          &.dis-minus, &.dis-plus {
            position: relative;

            &:before {
              content: '';
              width: 20px;
              height: 1px;
              background: #fff;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-left: -10px;
              margin-top: -1px;
              display: block;
            }
            &:after{
              content: '';
              width: 1px;
              height: 20px;
              background: #fff;
              position: absolute;
              top: 50%;
              left: 50%;
              margin-left: -1px;
              margin-top: -10px;
              display: block;
            }
          }

          &.dis-minus {
            &:after{
              display: none;
            }
          }

          &.dis-white {
            background: #fff;
            color: #000;
            font-size: 22px;
          }
          &.dis-black {
            font-size: 22px;
          }
          &.dis-blue {
            background: #BAD2FC;
            color: #3347F2;
            font-size: 22px;
          }
          &.dis-toggle {
            width: auto;
            padding: 0 13px;
          }

          &.dis-play {
            background-image: url('~assets/img/d-play.svg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 16px 16px;
          }
          &.dis-stop {
            background-image: url('~assets/img/d-stop.svg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 14px 14px;
          }

          &+.dis-btn {
            margin-left: 4px;
          }
        }
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    header {
      border-bottom: 1px solid rgba(#fff, 0.2);

      .header-nav {
        .nav-blocks {
          grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
          margin-top: 56px;
          margin-bottom: 50px;

          nav {
            a {
              font-size: 18px;
              line-height: 1.33;
              margin-bottom: 30px;
              margin-right: 12px;
            }
          }
        }
      }
    }
    .header-left nav > * {
      &:last-child {
        display: none;
      }
    }

    .header-subnav .center {
      padding: 128px 40px 73px;
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    // header .mobile-trigger {
    //   display: block;
    // }

    .disability-panel {
      .dis-col {
        .dis-name {
          font-size: 14px;
        }

        & + .dis-col {
          margin-left: 20px;
          padding-left: 20px;
        }
      }
    }

    header {
      border-bottom: 1px solid rgba(#fff, 0.2);

      .header-nav {
        padding-top: 100px;

        .header-socials {
          a, .title {
            font-size: 18px;
            line-height: 1.33;
          }
        }

        .nav-blocks {
          grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
          margin-top: 56px;
          margin-bottom: 50px;

          .nav-block:last-child {
            padding-top: 40px;
          }

          nav {
            a {
              font-size: 18px;
              line-height: 1.33;
              margin-bottom: 30px;
              margin-right: 12px;
            }
          }
        }
      }
    }
    .header-left nav > * {
      &:last-child, &:nth-last-child(2) {
        display: none;
      }

    }

    .header-subnav .center {
      padding: 128px 40px 73px;
    }
  }

  // Телефон
  @media (max-width: 767px) {
    header .mobile-trigger {
      display: block;
    }
    .header-left nav, header .detail-menu, header .header-right {
      display: none;
    }

    header {
      .header-logo {
        height: 40px;
        display: flex;
        align-items: center;
        font-family: $titlesans;
        font-size: em(32);

        span {
          display: block;
          color: #fff;
          margin-top: 6px;
          margin-left: 12px;
        }

        img {
          width: 40px;
        }
      }
    }

    .header-mobile-menu {
      position: fixed;
      top: 0;
      left: 0;
      // width: 100%;
      background: $darkblue;
      display: block;
      padding-top: 80px;
      max-height: 100vh;
      width: 100%;
      transform: translateY(-100%) translateZ(0);
      will-change: transform;
      overflow-x: hidden;
      overflow-y: scroll;
      overflow: -moz-scrollbars-none;
      -ms-overflow-style: none;

      &::-webkit-scrollbar { width: 0; }

      .header-info {
        padding: 32px 20px;

        p {
          font-size: 18px;
          line-height: 1.44;
          font-family: $titlesans;

          &+p {
            margin-top: 24px;
          }
        }

        small {
          font-size: 12px;
          line-height: 1.44;
          font-family: $titlesans;
          color: $lightblue;
          margin-top: 40px;
          display: block;
        }
      }

      .mobile-logo {
        font-family: $titlesans;
        margin-bottom: 32px;

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

      ul {
        margin: 0;
      }

      ul li {
        padding-left: 0;
        margin-bottom: 0;

        &:before {
          display: none;
        }
      }

      .search-form {
        padding: 0 20px;
      }

      a {
        font-size: 20px;
      }

      .top-item, .parent-item {
        font-size: 20px;
        padding: 16px 70px 16px 20px;
        border-bottom: 1px solid rgba(#fff, 0.2);
        position: relative;
        display: block;

        &.link {
          &:after {
            display: none;
          }
        }

        &:after {
          content: '';
          position: absolute;
          top: 26px;
          right: 20px;
          width: 25px;
          height: 8px;
          background-image: url('~assets/img/arrexp.svg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100%;
          margin-top: -4px;
          transform: rotate(0) translateZ(0);
          will-change: transform;
          transition: transform 0.3s $cubic;
        }

        &.active{
          &:after {
            transform: rotate(180deg) translateZ(0);
          }
        }

        &:last-child {
          border-bottom: 0;
        }
      }

      .main-link.active {
        .top-item {
          &:after {
            transform: rotate(180deg) translateZ(0);
          }
        }
      }

      .detail-item-menu-inner {
        font-size: em(20);
        position: relative;
        overflow: hidden;
        height: 0;
        margin: 0;

        li {
          padding: 16px 70px 16px 20px;
          border-bottom: 1px solid rgba(#fff, 0.2);
        }

        .parent-menu {
          height: 0;
          overflow: hidden;
          position: relative;
          margin: 0 -20px;

          li:first-child {
            margin-top: 15px;
            border-top: 1px solid rgba(#fff, 0.2);
          }

          li:last-child {
            border-bottom: 0;
            margin-bottom: -10px;
          }
        }
      }
    }
    // header .header-left {
    //   flex: 0 0 100%;
    //   max-width: 100%;
    // }
  }

  // Белая тема для слабовидящих:
  .d-white {
    header {
      &:before {
        background: #fff;
        border-bottom: 1px solid #000;
      }
      .header-nav, .header-search {
        background: #fff;
        border-bottom: 1px solid #000;

        .search-form {
          padding-top: 50px;
        }
      }
      .menu-overlay {
        background: #000;
      }
      a {
        color: #000;
      }
      svg {
        path {
          fill: #000;
        }
      }
      nav {
        div, a {
          color: #000;
          text-decoration: underline;

          &:hover {
            color: #666;
          }
        }
      }
      .detail-menu {
        &:before, &:after, span {
          background: #000;
        }
      }
    }

    .header-right {
      .change-lang {
        border-color: 1px solid #fff;
      }
    }

    .header-subnav {
      background: #fff;
      border-bottom: 1px solid #000;
      padding-top: 64px;

      li {
        span, a {
          color: #000;
        }
      }

      li.parent-item.current {
        span, a {
          color: #000;
        }
      }
    }

    .header-nav {
      color: #000;
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    header {
      .header-right {
        .change-lang {
          border-color: #666;
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    header {
      &:before {
        background: #000;
        border-bottom: 1px solid #fff;
      }
      .header-nav, .header-search {
        background: #000;
        border-bottom: 1px solid #fff;

        .search-form {
          padding-top: 50px;
        }
      }
      .menu-overlay {
        background: #000;
      }
      a {
        color: #fff;
      }
      svg {
        path {
          fill: #fff;
        }
      }
      nav {
        div, a {
          color: #fff;
          text-decoration: underline;

          &:hover {
            color: #888;
          }
        }
      }
      .detail-menu {
        &:before, &:after, span {
          background: #fff;
        }
      }

      .header-right {
        .change-lang {
          border-color: #fff;
        }
      }
    }

    .header-subnav {
      background: #000;
      border-bottom: 1px solid #fff;
      padding-top: 64px;

      li {
        span, a {
          color: #fff;
        }
      }

      li.parent-item.current {
        span, a {
          color: #fff;
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    header {
      color: $ddk;

      &:before {
        background: $ddl;
        border-bottom: 1px solid $ddk;
      }
      .header-nav, .header-search {
        background: $ddl;
        border-bottom: 1px solid $ddk;

        .search-form {
          padding-top: 50px;
        }
      }
      .menu-overlay {
        background: $ddl;
      }
      a {
        color: $ddk;
      }
      svg {
        path {
          fill: $ddk;
        }
      }
      nav {
        div, a {
          color: $ddk;
          text-decoration: underline;

          &:hover {
            color: $ddk;
          }
        }
      }
      .detail-menu {
        &:before, &:after, span {
          background: $ddk;
        }
      }
      .header-right {
        .change-lang {
          border-color: $ddk;
        }
      }
    }


    .header-subnav {
      background: $ddl;
      border-bottom: 1px solid $ddk;
      padding-top: 64px;

      li {
        span, a {
          color: $ddk;
        }
      }

      li.parent-item.current {
        span, a {
          color: $ddk;
        }
      }
    }
  }
</style>

<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b flex-top-v flex-wrap">
        <h1 class="dept-name">{{state.NAME}}</h1>
        <header-button text="Назад" link="/reports/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
        <div class="news-info">
          <div class="top flex">
            <div class="date">{{state.DATE_CREATE}}</div>
            <div class="views">{{state.SHOW_COUNTER}} {{declOfNum(state.SHOW_COUNTER, ['просмотр', 'просмотра', 'просмотров'])}}</div>
            <div class="shares" v-if="state.SHARE_COUNTER">{{state.SHARE_COUNTER}} {{declOfNum(state.SHARE_COUNTER, ['поделился', 'поделилось', 'поделились'])}}</div>
          </div>
          <div class="bottom flex flex-just-b flex-center-v">
            <person-simple v-if="state.PERSON" class="author col-8" :dark="true" :code="state.PERSON.ID" :photo="state.PERSON.PREVIEW_PICTURE" :name="state.PERSON.NAME" :pos="state.PERSON.POSITION"></person-simple>
            <a href="#" target="_blank" rel="nofollow" class="icon-block icon-download"></a>
          </div>
        </div>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <p class="first" v-if="state.PREVIEW_TEXT" v-html="state.PREVIEW_TEXT"></p>

          <image-desc v-if="state.DETAIL_PICTURE" :src="state.DETAIL_PICTURE" :detailSrc="state.DETAIL_PICTURE"></image-desc>

          <div class="aside-block flex" :class="state.ADDITIONAL_FILES ? '' : 'no-padding'">
            <aside>
              <expand-menu :items="menu" :expItems="expMenu"></expand-menu>
            </aside>
            <div class="block-content">
              <template v-for="block in state.CHAPTERS">
                <template v-if="block.TYPE == 'TEXT'">
                  <h3 v-if="block.TITLE">{{block.TITLE}}</h3>
                  <p v-if="block.TEXT">{{block.TEXT}}</p>
                </template>
                <template v-if="block.TYPE == 'HTML'">
                  <!-- <expand-block :title="block.TITLE" :text="block.TEXT"></expand-block> -->
                  <p v-html="block.TEXT"></p>
                </template>
              </template>
            </div>
          </div>

          <div class="statement-list">
            <statement-simple v-for="file in state.FILES" class="statement-inner" :external="true" :title="file.NAME" :date="file.DATE" :subinfo="file.EXTENSION.toUpperCase()+' ('+file.SIZE+' Мб)'" :link="file.SRC"></statement-simple>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
const headerButton = require('~/components/ui/head-button').default;
const personSmall = require('~/components/ui/person/person-small').default;

const statementSimple = require('~/components/ui/statements/statement-simple').default;

const personSimple = require('~/components/ui/person/person-simple').default;
const imageDesc = require('~/components/ui/image-desc').default;
const quoteSimple = require('~/components/ui/quotes/quote-simple').default;
const expandMenu = require('~/components/ui/expand-menu').default;
const expandBlock = require('~/components/ui/expand-block').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let page = await context.app.$axios.get(`/report/item/${context.route.params.statement}`),
        state = page.data.result,
        expMenu = [],
        menu = [];

    for(let i = 0; i < state.CHAPTERS.length; i++) {
      if(i > 3) {
        if(state.CHAPTERS[i].TITLE != null) {
          expMenu.push(state.CHAPTERS[i].TITLE);
        }
      }  else {
        if(state.CHAPTERS[i].TITLE != null) {
          menu.push(state.CHAPTERS[i].TITLE);
        }
      }
    }

    return { seo: page.data.seo, state: state, menu: menu, expMenu: expMenu }
  },
  head() {
    return {
      title: this.seo.TITLE,
      meta: [
        {name: 'description', content: this.seo.DESCRIPTION},
        {name: 'keywords', content: this.seo.KEYWORDS}
      ]
    }
  },
  data() {
    return {
      currentUrl: '',
      seo: {
        TITLE: '',
        DESCRIPTION: '',
        KEYWORDS: ''
      },
      state: {
        PERSON: {},
        CHAPTERS: {},
        ADDITIONAL_FILES: {}
      },
      menu: [],
      expMenu: []
    }
  },
  props: {
  },
  created() {
    that = this;
  },
  mounted() {
    this.currentUrl = window.location.href;
    // that.$axios.get(`/report/item/${this.$route.params.statement}`)
    // .then(function (response) {
    //   console.log(response.data.result);
    //   that.state = response.data.result;
    //
    //   for(let i = 0; i < that.state.CHAPTERS.length; i++) {
    //     if(i > 3) {
    //       if(that.state.CHAPTERS[i].TITLE != null) {
    //         that.expMenu.push(that.state.CHAPTERS[i].TITLE);
    //       }
    //     }  else {
    //       if(that.state.CHAPTERS[i].TITLE != null) {
    //         that.menu.push(that.state.CHAPTERS[i].TITLE);
    //       }
    //     }
    //   }
    // })
    // .catch(function (error) {
    //   // console.log(error);
    // })
    // .finally(function () {
    // });
  },
  methods: {
    declOfNum(n, titles) {
      return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
    }
  },
  components: {
    headerButton,
    expandBlock,
    personSmall,

    // Materials
    personSimple,
    imageDesc,
    quoteSimple,
    expandMenu,
    expandBlock,
    statementSimple,
    shareBtnFix
  }
}
</script>

<style lang="scss" scoped>
  .dept-name {
    font-size: em(36);
    line-height: 1.4;
    flex: 0 0 90%;
    max-width: 90%;
  }
  p.first + .expand-block, p.first + .aside-block {
    margin-top: 64px;
  }

  .dept-control {
    margin: 40px 0 0;
    padding: 48px;
    background: $cardblue;

    .grid {
      margin-top: 40px;
      font-family: $titlesans;

      .contact-list {
        marign-top: 20px;

        .contact {
          margin-top: 20px;
          font-size: em(20);
          line-height: 1.44;

          .name {
            font-size: 16px;
            margin-bottom: 8px;
          }

          address {
            color: $blue;
          }
        }
      }

      .col-4:first-child {
        p {
          font-size: em(20);
          line-height: 1.44;
        }
      }
      .col-5 {
        padding-left: 48px;
      }
      .col-3 {
        p {
          font-size: 12px;
          line-height: 1.44;
        }
      }
    }
  }

  .materials-list {
    .material {
      padding: 0 0 40px;
      margin: 0 0 40px;
      border-bottom: 1px solid rgba(#000, 0.2);

      &:last-child {
        margin-bottom: 0;
        border: 0;
      }
    }
  }

  .news-info {
    margin-top: 50px;
    color: $lightblue;
    flex: 0 0 100%;
    max-width: 100%;
    position: relative;

    .type {
      color: #fff;
    }

    .top {
      > * {
        margin-right: 24px;

        &:last-child {
          margin-right: 0;
        }

        &.date {
          margin-right: 16px;
          padding-right: 16px;
          border-right: 1px solid rgba(#fff, 0.2);
        }
      }
    }

    .bottom {
      padding-top: 15px;
      margin-top: 32px;
      border-top: 1px solid rgba(#fff, 0.2);

      [data-type="name"] {
        color: #fff;
      }
    }
  }

  .news-share {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 8px;
    background: #fff;
    border-radius: 50px;

    a {
      width: 24px;
      height: 24px;
      display: block;
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }

      svg {
        width: 100%;

        path {
          fill: $lightblue;
          transition: fill 0.5s $cubic;
        }
      }

      &:hover {
        svg {
          path {
            fill: $darkblue;
          }
        }
      }
    }
  }

  .quotes-list {
    margin: 80px 0;

    .quote-simple {
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .statement-inner:last-child {
    padding-bottom: 0;
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .news-info {
      .bottom {
        display: none;
      }
    }

    .dept-name {
      flex: 0 0 80%;
      max-width: 80%;
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .news-info {
      .bottom {
        display: none;
      }
    }

    .dept-name {
      flex: 0 0 80%;
      max-width: 80%;
    }
  }

  // Телефон
  @media (max-width: 767px) {

  }

  // Белая тема для слабовидящих:
  .d-white {
    .news-info {
      color: #000;

      .top > *.date {
        border-right: 1px solid rgba(#000, 0.5);
      }
      .type {
        color: #000;
      }

      .bottom {
        border-top: 1px solid #000;
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .news-info {
      color: #fff;

      .top > *.date {
        border-right: 1px solid rgba(#fff, 0.5);
      }
      .type {
        color: #fff;
      }

      .bottom {
        border-top: 1px solid #fff;
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .news-info {
      color: $ddk;

      .top > *.date {
        border-right: 1px solid rgba($ddk, 0.5);
      }
      .type {
        color: $ddk;
      }

      .bottom {
        border-top: 1px solid $ddk;
      }
    }
  }
</style>

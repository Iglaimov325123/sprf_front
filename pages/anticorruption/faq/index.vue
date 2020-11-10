<template>
  <div class="page-content" data-type="inner">
    <section class="blue with-expand" data-type="inner-head">
      <div class="head-main center flex flex-just-b flex-center-v">
        <h1>Вопросы и ответы</h1>
        <div class="flex head-buttons">
          <header-button text="Назад" link="/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
          <header-control v-if="info.TEXT != null" v-on:click.native="expandInfo" text="Информация" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+ICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTIsMjRBMTIsMTIsMCwxLDEsMjQsMTIsMTIsMTIsMCwwLDEsMTIsMjRaTTEyLDJBMTAsMTAsMCwxLDAsMjIsMTIsMTAsMTAsMCwwLDAsMTIsMlptMSw4SDExdjhoMlptMC00SDExVjhoMloiLz48L3N2Zz4="></header-control>
        </div>
      </div>
      <div class="head-expend-info" >
        <div class="center" v-if="info.TEXT != null" v-html="info.TEXT">
        </div>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix>
        <div class="page-contain">
          <accordion-item v-for="question in questions" :title="question.NAME" :text="'<p>'+question.PREVIEW_TEXT+'</p>'"></accordion-item>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
const headerControl = require('~/components/ui/head-control').default;
const headerButton = require('~/components/ui/head-button').default;
const accordionItem = require('~/components/ui/accordion-item-simple').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let info = await context.app.$axios.get(`/faq/list`)

    return { seo: info.data.seo, info: info.data.info, questions: info.data.result }
  },
  head() {
    return {
      currentUrl: '',
      seo: {
        TITLE: '',
        DESCRIPTION: '',
        KEYWORDS: ''
      },
      title: this.seo.TITLE,
      meta: [
        {name: 'description', content: this.seo.DESCRIPTION},
        {name: 'keywords', content: this.seo.KEYWORDS}
      ]
    }
  },
  data() {
    return {
      info: {TEXT: ''},
      questions: []
    }
  },
  created() {
    that = this;
  },
  mounted() {
    this.currentUrl = window.location.href;
    // that.$axios.get(`/faq/list`)
    // .then(function (response) {
    //   that.questions = response.data.result;
    //   console.log(that.questions);
    // })
    // .catch(function (error) {
    // })
    // .finally(function () {
    // });
  },
  methods: {
    expandInfo(e) {
      let elem = e.target || e.srcElement,
          field = document.querySelector('.head-expend-info');


      if(elem.classList.contains('visible')) {
        TweenMax.to(field, 1, {height: 0, ease: Expo.easeOut});
        elem.classList.remove('visible');
      } else {
        TweenMax.set(field, {height: 'auto'});
        TweenMax.from(field, 1, {height: 0, ease: Expo.easeOut});
        elem.classList.add('visible');
      }
    }
  },
  components: {
    headerControl,
    headerButton,
    accordionItem,
    shareBtnFix
  }
}
</script>

<style lang="scss" scoped>
  .structure-items {
    margin-top: 28px;

    a {
      font-size: em(22);
      line-height: 1.44;
      font-family: $titlesans;
    }

    .structure-item {
      padding: 28px 0 40px;
      border-bottom: 1px solid rgba($lightblue, 0.4);

      &:last-child {
        border-bottom: 0;
        padding-bottom: 10px;
      }

      .author-list {
        margin-top: 24px;
      }
    }
  }
  .structure-list {
    background: $cardblue;
    margin: 64px 0 44px;

    .structure-row {
      background: $carddark;
      position: relative;

      &:before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30%;
        opacity: 0.3;
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
      }

      &:first-child {
        background: transparent;
      }
    }
  }
</style>

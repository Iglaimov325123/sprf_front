<template>
  <div class="page-content" data-type="inner">
    <section class="blue with-expand" data-type="inner-head">
      <div class="head-main center flex flex-just-b flex-center-v">
        <h1>{{$store.getters.getLang == 'en' ? 'Annual reports' : 'Годовой отчет'}}</h1>

        <header-control v-if="info.TEXT != null" v-on:click.native="expandInfo" :text="$store.getters.getLang == 'en' ? 'Info' : 'Информация'" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+ICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTIsMjRBMTIsMTIsMCwxLDEsMjQsMTIsMTIsMTIsMCwwLDEsMTIsMjRaTTEyLDJBMTAsMTAsMCwxLDAsMjIsMTIsMTAsMTAsMCwwLDAsMTIsMlptMSw4SDExdjhoMlptMC00SDExVjhoMloiLz48L3N2Zz4="></header-control>
      </div>

      <div class="head-expend-info">
        <div class="center" v-if="info.TEXT != null" v-html="info.TEXT"></div>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <div class="materials-list">
            <statement-simple v-for="state in items" :title="state.NAME" :desc="state.PREVIEW_TEXT" :image="state.PREVIEW_PICTURE" :date="state.DATE_CREATE" :link="'/reports/'+state.CODE"></statement-simple>
            <!-- <statement-simple title="Бюллетень №5 (Май) 2019" desc="Бюллетень предназначен для публикации отчетов о завершенных контрольных и экспертно-аналитических мероприятиях, экспертных заключений Счетной палаты, материалов методического и аналитического характера, информации о деятельности Счетной палаты, а также для изложения позиции и мнений членов Коллегии и сотрудников аппарата Счетной палаты по проблемам  государственного финансового контроля, бюджетной и налоговой политики,  иным финансово-экономическим проблемам." image="/img/build.png" date="Опубликовано 4 июля" subinfo="PDF (5,5 Мб)" link="#"></statement-simple>
            <statement-simple title="Бюллетень №5 (Май) 2019" desc="Бюллетень предназначен для публикации отчетов о завершенных контрольных и экспертно-аналитических мероприятиях, экспертных заключений Счетной палаты, материалов методического и аналитического характера, информации о деятельности Счетной палаты, а также для изложения позиции и мнений членов Коллегии и сотрудников аппарата Счетной палаты по проблемам  государственного финансового контроля, бюджетной и налоговой политики,  иным финансово-экономическим проблемам." image="/img/build.png" date="Опубликовано 4 июля" subinfo="PDF (5,5 Мб)" link="#"></statement-simple> -->
          </div>
          <a :href="'/reports/page/'+page" class="btn full-width big" @click.prevent="loadItems" v-if="page != totalPage">{{$store.getters.getLang == 'en' ? 'Load more' : 'Загрузить предыдущие материалы'}}</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const headerControl = require('~/components/ui/head-control').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const cardSimple = require('~/components/ui/cards/card-simple').default;

const statementSimple = require('~/components/ui/statements/statement-simple').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let info = await context.app.$axios.get('/report/list', {
      params: {
        count: 5,
        page: 1
      }
    })

    return { seo: info.data.seo, items: info.data.result.items, totalPage: info.data.result.pages, info: info.data.info }
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
      items: [],
      info: {},
      count: 5,
      page: 1,
      totalPage: 1
    }
  },
  created() {
    that = this;
  },
  mounted() {
    this.currentUrl = window.location.href;
    // that.$axios.get('/report/list', {
    //   params: {
    //     count: that.count,
    //     page: that.page
    //   }
    // })
    // .then(function (response) {
    //   that.items = response.data.result.items;
    //   that.totalPage = response.data.result.pages;
    //   that.info = response.data.info;
    //   console.log(that.items);
    // })
    // .catch(function (error) {
    //   console.log(error);
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
    },
    loadItems(e) {
      e.preventDefault();

      that.$axios.get('/report/list', {
        params: {
          count: that.count,
          page: that.page+1
        }
      })
      .then(function (response) {
        console.log('loaded items', response.data.result);
        that.items = that.items.concat(response.data.result.items);
        console.log('items', that.items);
        that.page++;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
    }
  },
  components: {
    headerControl,
    imageDesc,
    cardPhotos,
    cardSimple,
    statementSimple,
    shareBtnFix
  }
}
</script>

<style lang="scss" scoped>
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
</style>

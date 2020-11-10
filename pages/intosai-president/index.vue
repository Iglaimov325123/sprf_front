<template>
  <div class="page-content" data-type="inner">

    <section class="blue with-expand" data-type="inner-head">
      <div class="head-main center flex flex-just-b flex-center-v">
        <h1>Президентство в ИНТОСАИ</h1>
        <header-control v-if="info.TEXT != null" v-on:click.native="expandInfo" text="Информация" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+ICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTIsMjRBMTIsMTIsMCwxLDEsMjQsMTIsMTIsMTIsMCwwLDEsMTIsMjRaTTEyLDJBMTAsMTAsMCwxLDAsMjIsMTIsMTAsMTAsMCwwLDAsMTIsMlptMSw4SDExdjhoMlptMC00SDExVjhoMloiLz48L3N2Zz4="></header-control>
      </div>
      <div class="head-expend-info" >
        <div class="center" v-if="info.TEXT != null" v-html="info.TEXT">
        </div>
      </div>
    </section>

    <filters filer="items" post="/intosai/list"></filters>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <div class="materials-list">
            <material-simple v-for="news in items"
            :title="news.NAME"
            :desc="news.PREVIEW_TEXT"
            :image="news.PREVIEW_PICTURE"
            :code="news.PERSON != null ? news.PERSON.ID : ''"
            :author="news.PERSON != null ? news.PERSON.NAME : ''"
            :photo="news.PERSON != null ? news.PERSON.PREVIEW_PICTURE : ''"
            :date="news.DATE_CREATE"
            :type="news.CATEGORY"
            :link="'/intosai-president/'+news.CODE"></material-simple>
          </div>
          <a :href="'/intosai-president/page/'+page" class="btn full-width big" @click.prevent="loadItems" v-if="page != totalPage">Загрузить предыдущие материалы</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from 'axios'

const headerControl = require('~/components/ui/head-control').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const cardSimple = require('~/components/ui/cards/card-simple').default;
const filters = require('~/components/ui/filters-media').default;

const materialSimple = require('~/components/ui/materials/material-simple').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let info = await context.app.$axios.get('/intosai/list', {
      params: {
        count: 5,
        page: 1
      }
    })

    return { seo: info.data.seo, info: info.data.info, items: info.data.result.items, totalPage: info.data.result.pages }
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
      info: {TEXT: ''},
      items: [],
      count: 5,
      page: 1,
      isLastPage: false,
      totalPage: 1,
      hasFilter: false
    }
  },
  created() {
    that = this;
  },
  mounted() {
    this.currentUrl = window.location.href;
    // that.$axios.get('/intosai/list', {
    //   params: {
    //     count: that.count,
    //     page: that.page
    //   }
    // })
    //   .then(function (response) {
    //     console.log(response.data.result);
    //     that.items = response.data.result.items;
    //     that.totalPage = response.data.result.pages;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //   });
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
    toggleFilter(e) {
      let elem = e.target || e.srcElement,
          filter = document.querySelector('.filter-inner');

      if(!elem.classList.contains('head-button')) {
        elem = elem.closest('.head-button');
      }

      if(filter.classList.contains('active')) {
        filter.classList.remove('active');
        elem.classList.remove('active');
        TweenMax.to(filter, 0.5, {height: 0, ease: Expo.easeInOut});
      } else {
        filter.classList.add('active');
        elem.classList.add('active');
        TweenMax.set(filter, {height: 'auto'});
        TweenMax.from(filter, 0.5, {height: 0, clearProps: 'all', ease: Expo.easeInOut});
      }
    },
    loadItems(e) {
      e.preventDefault();

      that.$axios.get('/intosai/list', {
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
    materialSimple,
    filters,
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
  @media (max-width: 767px) {
    section[data-type="inner-head"] {
      .center {
        align-items: flex-start;
      }
    }
    .head-button {
      margin-top: 10px;
    }
    .materials-list .material {
        margin: 0 0 28px;
    }
  }
</style>

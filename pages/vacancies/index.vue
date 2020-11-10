<template>
  <div class="page-content" data-type="inner">
    <section class="blue with-expand" data-type="inner-head">
      <div class="head-main center flex flex-just-b flex-center-v">
        <h1>Вакансии</h1>

        <header-control v-if="info.TEXT != null" v-on:click.native="expandInfo" text="Информация" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+ICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTIsMjRBMTIsMTIsMCwxLDEsMjQsMTIsMTIsMTIsMCwwLDEsMTIsMjRaTTEyLDJBMTAsMTAsMCwxLDAsMjIsMTIsMTAsMTAsMCwwLDAsMTIsMlptMSw4SDExdjhoMlptMC00SDExVjhoMloiLz48L3N2Zz4="></header-control>
      </div>

      <div class="head-expend-info">
        <div class="center" v-if="info.TEXT != null" v-html="info.TEXT"></div>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <div class="tag-items">
            <item-tags :link="'/vacancies/'+job.ID" v-for="job in items" :name="job.NAME" :date="job.DATE_CREATE"></item-tags>
          </div>
          <a :href="'/vacancies/page/'+page" class="btn full-width big" @click.prevent="loadItems" v-if="page != totalPage && items.length != 0">Загрузить предыдущие материалы</a>

          <div class="no-results" v-if="items.length == 0">
            {{$store.getters.getLang == 'en' ? 'No vacancies found.' : 'Пока вакансий нет'}}<br>
            {{$store.getters.getLang == 'en' ? 'Try to contact with us.' : 'Попробуйте связаться с нами позже'}}<br>
            <!-- <div class="reset-filter" @click="resetFilter" v-if="$store.getters.getLang != 'en'">
              {{$store.getters.getLang == 'en' ? 'Clear filters' : 'Сбросить параметры'}}
            </div> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const headerControl = require('~/components/ui/head-control').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const itemTags = require('~/components/ui/items/item-tags').default;

const materialSimple = require('~/components/ui/materials/material-simple').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let info = await context.app.$axios.get('/jobs/list', {
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
    // that.$axios.get('/jobs/list', {
    //   params: {
    //       count: that.count,
    //       page: that.page
    //     }
    //   })
    //   .then(function (response) {
    //     that.items = response.data.result.items;
    //     that.totalPage = response.data.result.pages;
    //     that.info = response.data.info;
    //     console.log(that.jobs);
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
        field.classList.remove('visible');
        TweenMax.to(field, 1, {height: 0, ease: Expo.easeOut});
        elem.classList.remove('visible');
      } else {
        field.classList.add('visible');
        TweenMax.set(field, {height: 'auto'});
        TweenMax.from(field, 1, {height: 0, ease: Expo.easeOut});
        elem.classList.add('visible');
      }
    },
    loadItems(e) {
      e.preventDefault();

      that.$axios.get('/jobs/list', {
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
    itemTags,
    materialSimple,
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

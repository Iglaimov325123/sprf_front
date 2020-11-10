<template>
  <div class="page-content" data-type="inner">
    <section class="blue with-expand" data-type="inner-head">
      <div class="head-main center flex flex-just-b flex-center-v">
        <h1>{{$store.getters.getLang == 'en' ? 'Follow-up control' : 'Последующий контроль'}}</h1>

        <div class="flex head-buttons">
          <header-control v-if="info.TEXT != null" v-on:click.native="expandInfo" :text="$store.getters.getLang == 'en' ? 'Info' : 'Информация'" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+ICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTIsMjRBMTIsMTIsMCwxLDEsMjQsMTIsMTIsMTIsMCwwLDEsMTIsMjRaTTEyLDJBMTAsMTAsMCwxLDAsMjIsMTIsMTAsMTAsMCwwLDAsMTIsMlptMSw4SDExdjhoMlptMC00SDExVjhoMloiLz48L3N2Zz4="></header-control>
          <header-control @click.native="toggleFilter" :text="$store.getters.getLang == 'en' ? 'Filter' : 'Фильтрация'" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyNCAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAxOEgyNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iOCIgY3k9IjE4IiByPSIzIiBmaWxsPSIjMDQwOTJBIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMCA0SDI0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjQiIHI9IjMiIGZpbGw9IiMwNDA5MkEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==">
            <div class="has-filter" v-if="hasFilter"></div>
          </header-control>
        </div>
      </div>

      <div class="head-expend-info">
        <div class="center" v-if="info.TEXT != null" v-html="info.TEXT"></div>
      </div>
    </section>

    <filters ref="filter" filer="items" post="/audits/list" category="7"></filters>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <!-- <external-link link="#" icon="/img/target.svg" text="Информационная панель по мониторингу достижения национальных целей"></external-link> -->

        <div class="page-contain">
          <div class="tag-items">
            <template v-for="audit in items">
              <item-tags-expand v-if="audit.IS_ACCORDION" :name="audit.NAME" :desc="audit.PREVIEW_TEXT" :date="audit.DATE_CREATE" :tags="audit.TAGS" :files="audit.FILES"></item-tags-expand>
              <item-tags v-else :link="audit.URL ? audit.URL : '/audit/'+audit.CODE" :external="audit.URL ? true : false" :name="audit.NAME" :desc="audit.PREVIEW_TEXT" :date="audit.DATE_CREATE" :tags="audit.TAGS"></item-tags>
            </template>
          </div>
          <a :href="'/audit/page/'+page" class="btn full-width big" @click.prevent="loadItems" v-if="page != totalPage && items.length > 0">{{$store.getters.getLang == 'en' ? 'Load more' : 'Загрузить предыдущие материалы'}}</a>
          <div class="no-results" v-if="items.length == 0">
            {{$store.getters.getLang == 'en' ? 'No results found.' : 'По вашему запросу ничего не найдено'}}<br>
            {{$store.getters.getLang == 'en' ? 'Try to do another search.' : 'Попробуйте сократить запрос или задать его по-другому'}}<br>
            <div class="reset-filter" @click="resetFilter">
              {{$store.getters.getLang == 'en' ? 'Clear filters' : 'Сбросить параметры'}}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const externalLink = require('~/components/ui/external-link').default;
const headerButton = require('~/components/ui/head-button').default;
const headerControl = require('~/components/ui/head-control').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const itemTags = require('~/components/ui/items/item-tags').default;
const itemTagsExpand = require('~/components/ui/items/item-tags-expand').default;
const filters = require('~/components/ui/filters-audit').default;

const materialSimple = require('~/components/ui/materials/material-simple').default;

const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let info = await context.app.$axios.get(`/audits/list`, {
      params: {
        count: 5,
        page: 1,
        category: 7
      }
    })

    return { seo: info.data.seo, items: info.data.result.items, info: info.data.info, totalPage: info.data.result.pages }
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
      totalPage: 1,
    }
  },
  created() {
    that = this;
  },
  mounted() {
    this.currentUrl = window.location.href;
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
    declOfNum(n, titles) {
      return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
    },
    loadItems(e) {
      e.preventDefault();

      that.$axios.get('/audits/list', {
        params: {
          count: that.count,
          page: that.page+1,
          category: 7
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
    },
    resetFilter() {
      this.$refs.filter.resetFilter();
    }
  },
  components: {
    externalLink,
    headerButton,
    headerControl,
    imageDesc,
    cardPhotos,
    itemTags,
    itemTagsExpand,
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
</style>

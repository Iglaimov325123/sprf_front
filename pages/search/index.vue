<template>
  <div class="page-content" data-type="inner">
    <section class="blue has-filter" data-type="inner-head">
      <div class="center flex flex-just-b flex-wrap  flex-center-v">
        <search class="col-12" ref="searchInput" :holder="false"></search>

        <h1 v-html="curTitle"></h1>

        <div class="flex head-buttons">
          <header-control @click.native="toggleSort" :text="$store.getters.getLang == 'en' ? 'Sorting' : 'Сортировка'" :isSort="true" :sort="sort">
          </header-control>
          <header-control v-if="$store.getters.getLang!='en'" @click.native="toggleFilter" :text="'Фильтрация'" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyNCAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAxOEgyNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iOCIgY3k9IjE4IiByPSIzIiBmaWxsPSIjMDQwOTJBIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMCA0SDI0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjQiIHI9IjMiIGZpbGw9IiMwNDA5MkEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==">
            <div class="has-filter" v-if="hasFilter"></div>
          </header-control>
        </div>
      </div>
    </section>

    <filters ref="filtering" filer="items" post="/search/main"></filters>

    <section data-type="page-content">
      <div class="center">
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
            :link="news.URL != null ? news.URL : '/'"></material-simple>
          </div>
          <a :href="'/news/page/'+page" class="btn full-width big" @click.prevent="loadItems" v-if="page != totalPage && items.length > 0">{{$store.getters.getLang == 'en' ? 'Load more' : 'Загрузить предыдущие материалы'}}</a>
          <div class="no-results" v-if="items.length == 0 && !isFirstSearch">
            {{$store.getters.getLang == 'en' ? 'No results found.' : 'По вашему запросу ничего не найдено'}}<br>
            {{$store.getters.getLang == 'en' ? 'Try to do another search.' : 'Попробуйте сократить запрос или задать его по-другому'}}<br>
            <div class="reset-filter" @click="resetFilter" v-if="$store.getters.getLang != 'en'">
              {{$store.getters.getLang == 'en' ? 'Clear filters' : 'Сбросить параметры'}}
            </div>
          </div>
          <div class="no-results" v-if="isFirstSearch">
            <spinner></spinner>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import axios from 'axios'
const search = require('~/components/ui/search').default;

const headerControl = require('~/components/ui/head-control').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const cardSimple = require('~/components/ui/cards/card-simple').default;
const filters = require('~/components/ui/filters').default;
const spinner = require('~/components/ui/spinner').default;

const materialSimple = require('~/components/ui/materials/material-simple').default;

let that;
export default {
  data() {
    return {
      curTitle: 'Поиск',
      items: [],
      count: 10,
      page: 1,
      sort: 'desc',
      isLastPage: false,
      totalPage: 1,
      hasFilter: false,
      queryString: '',
      isFirstSearch: true
    }
  },
  created() {
    that = this;
  },
  watch: {
    '$route' (to, from) {
      console.log(to);
      this.queryString = to.query.q;
      this.refreshSearch();
    }
  },
  mounted() {
    if(this.$route.query.q) {
      this.queryString = this.$route.query.q;
    } else {
      this.queryString = '';
    }

    this.refreshSearch();

    console.log(this.$refs.searchInput);
  },
  methods: {
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
    toggleSort(e) {
      if(that.sort == 'asc') {
        that.sort = 'desc';
      } else {
        that.sort = 'asc';
      }
      this.refreshSearch();
    },
    loadItems(e) {
      e.preventDefault();

      let filterObject = this.$refs.filtering.getFilterObject();
      console.log('refs', filterObject);

      filterObject.page = that.page;
      filterObject.sort = that.sort;
      filterObject.count = this.count;
      filterObject.page = this.page+1;

      that.$axios.get('/search/main', {
        params: filterObject
      })
      .then(function (response) {
        console.log('loaded items', response.data.result);
        that.items = that.items.concat(response.data.result.items);
        that.isFirstSearch = false;
        console.log('items', that.items);
        that.page++;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
    },
    refreshSearch() {
      let filterObject = this.$refs.filtering.getFilterObject();
      console.log('refs', filterObject);

      this.page = 1;

      filterObject.page = that.page;
      filterObject.sort = that.sort;
      filterObject.count = this.count;
      filterObject.page = 1;

      that.$axios.get('/search/main', {
        params: filterObject
      })
      .then(function (response) {
        that.isFirstSearch = false;

        if(response.data.result.error) {
          // ошибка
          that.curTitle = that.$store.getters.getLang == 'en' ? 'No results' : 'Ничего не нашлось';
          that.items = [];
        } else {
          that.items = response.data.result.items;

          that.totalPage = response.data.result.pages;
          that.totalResults = response.data.result.total;

          if(that.items.length > 0) {
            that.curTitle = that.$store.getters.getLang == 'en' ? 'Results: <span>'+response.data.result.total+'</span>' : 'Нашлось материалов <span>'+response.data.result.total+'</span>';
          } else {
            that.curTitle = that.$store.getters.getLang == 'en' ? 'No results' : 'Ничего не нашлось';
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
    },
    resetFilter() {
      this.$refs.filtering.resetFilter();
    }
  },
  components: {
    headerControl,
    imageDesc,
    cardPhotos,
    cardSimple,
    materialSimple,
    filters,
    search,
    spinner
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

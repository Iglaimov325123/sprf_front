<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b">
        <div class="page-switcher">
          <router-link to="/news/" class="title"><h1>{{$store.getters.getLang == 'en' ? 'News' : 'Новости'}}</h1></router-link>
          <router-link to="/media/" class="title active">{{$store.getters.getLang == 'en' ? 'Media' : 'Фото и видео'}}</router-link>
        </div>
        <header-control @click.native="toggleFilter" :text="$store.getters.getLang == 'en' ? 'Filter' : 'Фильтрация'" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyNCAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAxOEgyNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iOCIgY3k9IjE4IiByPSIzIiBmaWxsPSIjMDQwOTJBIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMCA0SDI0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjQiIHI9IjMiIGZpbGw9IiMwNDA5MkEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==">
          <div class="has-filter" v-if="hasFilter"></div>
        </header-control>
      </div>
    </section>

    <filters filer="items" post="/media/list/"></filters>

    <section data-type="media-grid">
      <div class="center">
        <div class="gird-extender">
          <div class="grid-content flex flex-wrap">
            <template v-for="(item, index) in items">
              <media-big class="col-12" v-if="index == 0" :image="item.PREVIEW_PICTURE" :name="item.NAME" :url="'/media/'+item.CODE" :author="item.PERSON != null ? item.PERSON.NAME : ''" :photo="item.PERSON != null ? item.PERSON.PREVIEW_PICTURE : ''" :pos="item.PERSON.POSITION" :date="item.DATE_CREATE"></media-big>
              <media-simple class="col-4" v-else :image="item.PREVIEW_PICTURE" :name="item.NAME" :url="'/media/'+item.CODE" :author="item.PERSON != null ? item.PERSON.NAME : ''" :photo="item.PERSON != null ? item.PERSON.PREVIEW_PICTURE: ''" :date="item.DATE_CREATE"></media-simple>
            </template>
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
const cardSimple = require('~/components/ui/cards/card-simple').default;

const filters = require('~/components/ui/filters-media').default;

const materialSimple = require('~/components/ui/materials/material-simple').default;
const mediaBig = require('~/components/ui/media/media-big').default;
const mediaSimple = require('~/components/ui/media/media-simple').default;

let that;
export default {
  layout: 'dark',
  async asyncData (context) {
    let info = await context.app.$axios.get(`/media/list/`)

    return { seo: info.data.seo, items: info.data.result }
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
      seo: {
        TITLE: '',
        DESCRIPTION: '',
        KEYWORDS: ''
      },
      items: [],
      hasFilter: false
    }
  },
  created() {
    that = this;
  },
  mounted() {
    // that.$axios.get(`/media/list/`)
    // .then(function (response) {
    //   console.log(response.data.result);
    //   that.items = response.data.result;
    // })
    // .catch(function (error) {
    //   // console.log(error);
    // })
    // .finally(function () {
    // });
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
    }
  },
  components: {
    headerControl,
    imageDesc,
    cardPhotos,
    cardSimple,
    materialSimple,
    mediaBig,
    mediaSimple,
    filters
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

  [data-type="media-grid"] .grid-content {
    border-bottom: 1px solid rgba(#fff, 0.5);
    padding-bottom: 26px;
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    [data-type="media-grid"] .grid-content {
      border-bottom: 0;
      padding-bottom: 0;
    }
  }

  // Телефон
  @media (max-width: 767px) {
    section[data-type="inner-head"] {
      .center {
        align-items: flex-start;
      }
    }
    .head-button {
      margin-top: 10px;
    }
  }
</style>

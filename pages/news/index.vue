 <template>
  <div class="page-content" data-type="inner">
    <section class="blue has-filter" data-type="inner-head">
      <div class="center flex flex-just-b flex-center-v">
        <h1 v-if="$store.getters.getLang == 'en'">News</h1>
        <div v-else class="page-switcher">
          <router-link to="/news/" class="title active"><h1>{{$store.getters.getLang == 'en' ? 'News' : 'Новости'}}</h1></router-link>
          <router-link to="/media/" class="title">{{$store.getters.getLang == 'en' ? '' : 'Фото и видео'}}</router-link>
        </div>

        <div class="flex head-buttons">
          <header-control data-type="archive" @click.native="toggleArchive" :text="$store.getters.getLang == 'en' ? 'Archive' : 'Архив'" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTIgMEMwLjg5NTQzIDAgMCAwLjg5NTQzMSAwIDJWMjBDMCAyMS4xMDQ2IDAuODk1NDMxIDIyIDIgMjJIMjBDMjEuMTA0NiAyMiAyMiAyMS4xMDQ2IDIyIDIwVjJDMjIgMC44OTU0MyAyMS4xMDQ2IDAgMjAgMEgyWk0yIDJMMjAgMlYyMEgyVjJaTTcgOEgxNVY2SDdWOFoiIGZpbGw9IndoaXRlIi8+PC9zdmc+"></header-control>
          <header-control v-if="$store.getters.getLang != 'en'" data-type="normal" @click.native="toggleFilter" :text="$store.getters.getLang == 'en' ? 'Filter' : 'Фильтрация'" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyNCAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAxOEgyNCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iOCIgY3k9IjE4IiByPSIzIiBmaWxsPSIjMDQwOTJBIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMCA0SDI0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjQiIHI9IjMiIGZpbGw9IiMwNDA5MkEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==">
            <div class="has-filter" v-if="hasFilter"></div>
          </header-control>
        </div>
      </div>
    </section>

    <filters ref="filter" filer="items" post="/news/list" :archive="isArchive"></filters>

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
            :link="linkForPublication('/news/'+news.CODE)"></material-simple>
          </div>
          <a :href="'/news/page/'+page" class="btn full-width big" @click.prevent="loadItems" v-if="page != totalPage && items.length > 0">{{$store.getters.getLang == 'en' ? 'Load more' : 'Загрузить предыдущие материалы'}}</a>
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
// import axios from 'axios'

const headerControl = require('~/components/ui/head-control').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const cardSimple = require('~/components/ui/cards/card-simple').default;
const filters = require('~/components/ui/filters-media').default;

const shareBtnFix = require('~/components/ui/share-button-fix').default;

const materialSimple = require('~/components/ui/materials/material-simple').default;

let that;
export default {
  async asyncData (context) {
    let info = await context.app.$axios.get('/news/list', {
      params: {
        count: 5,
        page: 1
      }
    })

    return { seo: info.data.seo, items: info.data.result.items, totalPage: info.data.result.pages }
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
      isArchive: false,
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
    // that.$axios.get('/news/list', {
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
    linkForPublication(link) {
      return this.$store.getters.getLang === 'en' ? '/en' + link : link
    },
    toggleArchive(e) {
      let elem = e.target || e.srcElement,
          btns = elem.closest('.head-buttons'),
          arch = btns.querySelector('[data-type="archive"]'),
          norm = btns.querySelector('[data-type="normal"]'),
          filter = document.querySelector('.filter-inner');

      filter.classList.remove('active');

      if(norm != null) {
        norm.classList.remove('active');
      }
      TweenMax.to(filter, 0.5, {height: 0, ease: Expo.easeInOut});

      if(this.isArchive) {
        this.isArchive = false;
        arch.classList.remove('active');
      } else {
        this.isArchive = true;
        arch.classList.add('active');
      }

      that.$nextTick(function() {
        this.resetFilter();
      })
    },
    toggleFilter(e) {
      let elem = e.target || e.srcElement,
          filter = document.querySelector('.filter-inner');

      if(!elem.classList.contains('head-button')) {
        elem = elem.closest('.head-button');
      }

      document.querySelector('[data-type="archive"]').classList.remove('active');
      this.isArchive = false;

      // Скрытие/закрытие фильтрации
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

      let filterObject = this.$refs.filter.getFilterObject();

      filterObject.page = that.page;
      filterObject.sort = that.sort;
      filterObject.count = this.count;
      filterObject.page = this.page+1;

      that.$axios.get('/news/list', {
        params: filterObject
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

  .d-black {
    .materials-list {
      .material {
        border-bottom: 1px solid rgba(#fff, 0.7);

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }
</style>

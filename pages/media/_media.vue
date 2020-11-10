<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b flex-top-v flex-wrap">
        <h1 class="dept-name">{{media.NAME}}</h1>
        <header-button text="" link="/media/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
        <div class="news-info">
          <div class="top flex">
            <!-- <div class="type">Пресс-релиз</div> -->
            <div class="date">{{media.DATE_CREATE}}</div>
            <div class="views" v-if="media.SHOW_COUNTER">{{media.SHOW_COUNTER}} {{declOfNum(media.SHOW_COUNTER, $store.getters.getLang == 'en' ? ['view', 'views', 'views'] : ['просмотр', 'просмотра', 'просмотров'])}}</div>
            <div class="shares" v-if="media.SHARE_COUNTER">{{media.SHARE_COUNTER}} {{declOfNum(media.SHARE_COUNTER, $store.getters.getLang == 'en' ? ['share', 'shares', 'shares'] : ['поделился', 'поделилось', 'поделились'])}}</div>
          </div>
          <div class="bottom flex flex-just-b flex-center-v">
            <person-simple v-if="media.PERSON" class="author col-8" :dark="true" :code="media.PERSON.ID" :photo="media.PERSON.PREVIEW_PICTURE" :name="media.PERSON.NAME" :pos="media.PERSON.POSITION"></person-simple>
            <div v-else><!-- Pusher --></div>
            <share-btn :link="currentUrl" :text="'text'" :id="media.ID" :name="media.NAME"></share-btn>
          </div>
        </div>
      </div>
    </section>

    <full-slider :slides="media.SLIDER" v-if="media.SLIDER"></full-slider>
    <div class="embed-inner" v-if="media.EMBED">
      <div class="center">
        <div class="frame-content" v-html="media.EMBED">
        </div>
      </div>
    </div>

    <section data-type="page-content" v-if="media.SIMILAR_MATERIALS.length > 0">
      <div class="center">
        <div class="page-contain">
          <div class="materials-list">
            <material-simple v-for="similar in media.SIMILAR_MATERIALS"
            :title="similar.NAME"
            :desc="similar.PREVIEW_TEXT"
            :image="similar.PREVIEW_PICTURE"
            :author="similar.PERSON != null ? similar.PERSON.NAME : ''"
            :photo="similar.PERSON != null ? similar.PERSON.PREVIEW_PICTURE : ''"
            :date="similar.DATE_CREATE"
            :type="similar.PERSON != null ? similar.CATEGORY: ''"
            :link="'/news/'+similar.CODE"></material-simple>
          </div>
          <a href="#" class="btn full-width big" v-if="media.SIMILAR_MATERIALS.length > 10">{{$store.getters.getLang == 'en' ? 'Load more' : 'Загрузить предыдущие материалы'}}</a>
          <!-- <a href="#" class="btn full-width big" v-if="news.length > 10">{{$store.getters.getLang == 'en' ? 'Load more' : 'Загрузить предыдущие материалы'}}</a> -->
        </div>
      </div>
    </section>

  </div>
</template>

<script>
const headerButton = require('~/components/ui/head-button').default;
const personSimple = require('~/components/ui/person/person-simple').default;
const fullSlider = require('~/components/ui/full-slider').default;
const materialSimple = require('~/components/ui/materials/material-simple').default;

const shareBtn = require('~/components/ui/share-button').default;

let that;
export default {
  layout: 'dark',
  async asyncData (context) {
    let page = await context.app.$axios.get(`/media/item/${context.route.params.media}`),
        media = page.data.result

    let news;

    if(media.PERSON) {
      news = await context.app.$axios.get('/news/list', {
        params: {
          person: media.PERSON.ID
        }
      });
    }


    return { seo: page.data.seo, media: media, news: news != null ? news.data.result : [] }
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
      currentUrl: '',
      media: {
        PERSON: {},
        SLIDER: []
      },
      news: []
    }
  },
  created() {
    that = this;
  },
  mounted() {
    this.currentUrl = window.location.href;
    that.$axios.get(`/media/item/${this.$route.params.media}`)
    .then(function (response) {
      console.log(response.data.result);
      that.media = response.data.result;

      // that.$axios.get('/news/list', {
      //   params: {
      //     person: that.media.PERSON.ID
      //   }
      // })
      //   .then(function (response) {
      //     console.log(response.data.result);
      //     that.news = response.data.result;
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   })
      //   .finally(function () {
      //   });
    })
    .catch(function (error) {
      // console.log(error);
    })
    .finally(function () {
    });

    if(document.querySelector('iframe')) {
      document.querySelector('iframe').style.width = '100%';
      document.querySelector('iframe').style.height = '100%';
      document.querySelector('iframe').style.position = 'absolute';
      document.querySelector('iframe').style.top = '0';
      document.querySelector('iframe').style.left = '0';
    }
  },
  methods: {
    declOfNum(n, titles) {
      return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
    }
  },
  components: {
    headerButton,
    personSimple,
    fullSlider,
    materialSimple,

    shareBtn
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
  p.first + .expand-block {
    margin-top: 64px;
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

    .full-slider {
      mix-blend-mode: luminosity;
    }
  }

  .embed-inner {

    .frame-content {
      padding-top: 60%;
      position: relative;
    }

    .full-cover {
      width: 100%!important;
      height: 100%!important;
      position: absolute;
      top: 0;
      left: 0;
    }

  }
</style>

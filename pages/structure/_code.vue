<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b flex-top-v">
        <div class="person-head flex flex-center-v">
          <div class="photo">
            <img :src="person.PREVIEW_PICTURE" :alt="person.SHORT_NAME"/>
          </div>
          <div class="info">
            <h1>{{person.NAME}}</h1>
            <div class="pos">
              {{person.POSITION}}
            </div>
            <div class="date">
              {{person.DATE_START_LABEL}} <div>{{person.DATE_START}}</div>
            </div>
          </div>
        </div>
        <header-button :text="$store.getters.getLang == 'en' ? 'Back' : 'Назад'" :effect="true" link="/structure/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <p class="first" v-if="person.PREVIEW_TEXT" v-html="person.PREVIEW_TEXT"></p>

          <div class="tabs">
            <div class="tab-list flex">
              <div class="tab active" @click="changeTab(0, $event)" v-if="person.BIO">
                {{$store.getters.getLang == 'en' ? 'Biography' : 'Биография'}}
              </div>
              <div class="tab" :class="[!person.BIO ? 'active' : '']" @click="changeTab(1, $event)" v-if="person.BIO">
                {{$store.getters.getLang == 'en' ? 'Education, Awards' : 'Образование / Награды'}}
              </div>
              <div class="tab" :class="[!person.BIO ? 'active' : '']" v-else>
                {{$store.getters.getLang == 'en' ? 'Education, Awards' : 'Образование / Награды'}}
              </div>
            </div>
            <div class="tab-content">
              <div class="tab-inner active" v-if="person.BIO">
                <expand-block :text="person.BIO"></expand-block>
              </div>
              <div class="tab-inner" :class="[!person.BIO ? 'active' : '']">
                <expand-item-slider ref="awards" :items="awards"></expand-item-slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section data-type="page-content" v-if="news.length != 0">
      <div class="center">
        <div class="page-contain">
          <div class="materials-list">
            <material-simple v-for="item in news" :photo="item.PERSON.PREVIEW_PICTURE" :code="item.PERSON.ID" :author="item.PERSON.NAME" :link="'/news/'+item.CODE" :title="item.NAME" :desc="item.PREVIEW_TEXT" :image="item.PREVIEW_PICTURE" :date="item.DATE_CREATE" :type="item.CATEGORY.NAME"></material-simple>
          </div>
          <a :href="'/structure/'+page" class="btn full-width big" @click.prevent="loadItems" v-if="page != totalPage">{{$store.getters.getLang == 'en' ? 'Load more' : 'Загрузить предыдущие материалы'}}</a>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
const headerButton = require('~/components/ui/head-button').default;
const person = require('~/components/ui/person/person').default;
const personSimple = require('~/components/ui/person/person-simple').default;
const expandBlock = require('~/components/ui/expand-block').default;
const expandItemSlider = require('~/components/ui/expand-items-slider').default;

const materialSimple = require('~/components/ui/materials/material-simple').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let personInfo = await context.app.$axios.get(`/persons/item/${context.route.params.code}`),
    news = await context.app.$axios.get('/news/list', {
    // response = await context.app.$axios.get('/news/list', {
      params: {
        person: personInfo.data.result.ID,
        count: 5,
        page: 1
      }
    })
    return { seo: personInfo.data.seo, person: personInfo.data.result, awards: personInfo.data.result.AWARDS, news: news.data.result.items, totalPage: news.data.result.pages}
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
      person: {
      },
      awards: [],
      news: {
      },
      count: 5,
      page: 1,
      isLastPage: false,
      totalPage: 1,
    }
  },
  props: {
  },
  created() {
    that = this;

    if(that.person.ID == 0) {
      this.$router.push('/404/')
    }
  },
  mounted() {
    this.currentUrl = window.location.href;
  },
  methods: {
    changeTab(index, event) {
      console.log(this);
      let elem = event.target || event.srcElement,
          tabCnt = elem.closest('.tabs'),
          tabTrg = tabCnt.querySelectorAll('.tab-list .tab'),
          tabIn = tabCnt.querySelectorAll('.tab-content .tab-inner');

      for(let i = 0; i < tabTrg.length; i++) {
        if(i == index) {
          tabTrg[i].classList.add('active');
          tabIn[i].classList.add('active');
        } else {
          tabTrg[i].classList.remove('active');
          tabIn[i].classList.remove('active');
        }
      }

      this.$refs.awards.update();
    },
    loadItems(e) {
      e.preventDefault();

      that.page++;
      that.$axios.get('/news/list', {
        params: {
          person: that.person.ID,
          count: that.count,
          page: that.page
        }
      })
      .then(function (response) {
        console.log('loaded items', response.data.result);
        // that.materials = that.materials.concat(response.data.result.items);
        that.news = that.news.concat(response.data.result.items);
        console.log('items', that.news);
        // that.page++;
      })
      .catch(function (error) {
        console.log(error);
        that.page--;
      })
      .finally(function () {
      });
    }
  },
  components: {
    headerButton,
    person,
    personSimple,
    expandBlock,
    expandItemSlider,

    // Materials
    materialSimple,
    shareBtnFix
  }
}
</script>

<style lang="scss" scoped>
  .person-head {
    flex: 0 0 80%;
    max-width: 80%;
    font-family: $titlesans;

    .photo {
      flex: 0 0 144px;
      max-width: 144px;
      height: 144px;
      position: relative;
      overflow: hidden;
      border-radius: 50%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .info {
      padding-left: 32px;

      h1 {
        font-size: em(36);
        line-height: 1.6;
      }

      .pos {
        font-size: em(24);
        line-height: 1.6;
        color: $lightblue;
      }

      .date {
        font-size: em(16);
        line-height: 1.4;
        color: $lightblue;
        margin-top: 24px;
      }
    }
  }

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

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .person-head {
      align-items: flex-start;

      .info {
        h1 {
          font-size: em(36);
          line-height: 1.6;
        }
        .pos {
          font-size: em(24);
          line-height: 1.6;
        }
        .date {
          max-width: 50%;
        }
      }

      .photo {
        flex: 0 0 96px;
        max-width: 96px;
        height: 96px;
        margin-top: 10px;
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .person-head {
      align-items: flex-start;
      flex: 0 0 90%;
      max-width: 90%;

      .info {
        h1 {
          font-size: em(32);
          line-height: 1.6;
        }
        .pos {
          font-size: em(20);
          line-height: 1.6;
        }
        .date {
          max-width: 50%;
          font-size: em(14);
          line-height: 1.6;
        }
      }

      .photo {
        flex: 0 0 80px;
        max-width: 80px;
        height: 80px;
        margin-top: 10px;
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .person-head {
      flex: 0 0 80%;
      max-width: 80%;
      flex-wrap: wrap;

      .photo {
        flex: 0 0 96px;
        max-width: 96px;
        height: 96px;
      }

      .info {
        padding-left: 0;
        margin-top: 24px;

        h1 {
          font-size: 32px;
          line-height: 1.2;
        }

        .pos {
          font-size: 20px;
          line-height: 1.6;
          margin-top: 16px;
        }

        .date {
          margin-top: 16px;
          font-size: 16px;
          line-height: 1.6;
        }
      }
    }
  }

  // Отключение изображений:
  .dis-image {
    .person-head {
      .photo {
        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 1px solid #888;
          border-radius: 50%;
        }

        img {
          opacity: 0;
        }
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .person-head {
      .info {
        .pos {
          color: #666;
        }
        .date {
          color: #666;
        }
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-black {
    .person-head {
      .info {
        .pos {
          color: #888;
        }
        .date {
          color: #888;
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .person-head {
      .info {
        .pos {
          color: rgba($ddk, 0.8);
        }
        .date {
          color: rgba($ddk, 0.8);
        }
      }
    }
  }
</style>

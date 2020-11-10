<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b flex-top-v flex-wrap">
        <h1 class="dept-name">{{item.NAME}}</h1>
        <header-button text="" link="/intosai-president/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
        <div class="news-info">
          <div class="top flex">
            <div class="type">
              {{item.CATEGORY_CONCAT}}
            </div>
            <div class="date">{{item.DATE_CREATE}}</div>
            <div class="views">{{item.SHOW_COUNTER}} просмотров</div>
            <div class="shares">{{item.SHARE_COUNTER}} поделились</div>
          </div>
          <div class="bottom flex flex-just-b flex-center-v">
            <person-simple class="author" :dark="true" :code="item.PERSON != null ? item.PERSON.ID : ''" :photo="item.PERSON != null ? item.PERSON.PREVIEW_PICTURE : ''" :name="item.PERSON != null ? item.PERSON.NAME : ''" :pos="item.PERSON != null ? item.PERSON.POSITION : ''"></person-simple>

            <share-btn :link="currentUrl" :text="'text'" :id="item.ID" :name="item.NAME"></share-btn>
          </div>
        </div>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <p class="first">{{item.PREVIEW_TEXT}}</p>

          <image-desc v-if="item.DETAIL_PICTURE" :src="item.DETAIL_PICTURE.IMG" :detailSrc="item.DETAIL_PICTURE.IMG" :desc="item.DETAIL_PICTURE.TEXT"></image-desc>

          <div class="aside-block flex" v-for="type in item.DETAIL_TEXT">
            <aside v-if="type.TYPE=='TEXT'">
            </aside>
            <div :class="type.TYPE=='TEXT' ? 'block-content' : 'col-12'">
              <p v-if="type.TYPE=='TEXT'" v-html="type.VALUE"></p>
              <p class="first" v-if="type.TYPE=='WRAPPER_TEXT'" v-html="type.VALUE"></p>

              <div class="quotes-list" v-if="type.TYPE=='DIALOGUE'">
                <quote-simple v-for="quote in type.VALUE" :name="quote.PERSON.NAME" :photo="quote.PERSON.IMG" :text="quote.TEXT"></quote-simple>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section data-type="page-content" v-if="item.SIMILAR_MATERIALS != null && item.SIMILAR_MATERIALS.length > 0">
      <div class="center">
        <div class="page-contain">
          <div class="materials-list">
            <material-simple v-for="similar in item.SIMILAR_MATERIALS" :author="similar.PERSON.NAME" :photo="similar.PERSON.PREVIEW_PICTURE" :link="'/news/'+similar.CODE" :title="similar.NAME" :desc="similar.PREVIEW_TEXT" :image="item.PREVIEW_IMAGE" :date="similar.DATE_CREATE" :type="similar.CATEGORY.NAME"></material-simple>

          </div>
          <!-- <a href="#" class="btn full-width big">Загрузить предыдущие материалы</a> -->
        </div>
      </div>
    </section>

  </div>
</template>

<script>
const headerButton = require('~/components/ui/head-button').default;
const expandBlock = require('~/components/ui/expand-block').default;
const personSmall = require('~/components/ui/person/person-small').default;

const materialSimple = require('~/components/ui/materials/material-simple').default;
const personSimple = require('~/components/ui/person/person-simple').default;
const imageDesc = require('~/components/ui/image-desc').default;
const quoteSimple = require('~/components/ui/quotes/quote-simple').default;

const shareBtn = require('~/components/ui/share-button').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let page = await context.app.$axios.get(`/intosai/item/${context.route.params.item}`),
        item = page.data.result

    item.CATEGORY_CONCAT = '';
    if(item.CATEGORY) {
      for(let i = 0; i < item.CATEGORY.length; i++) {
        if(i+1 != item.CATEGORY.length) {
          item.CATEGORY_CONCAT += item.CATEGORY[i].NAME+', ';
        } else {
          item.CATEGORY_CONCAT += item.CATEGORY[i].NAME;
        }
      }
    }

    return { seo: page.data.seo, item: item }
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
      item: {
        DETAIL_PICTURE: {},
        CATEGORY: [],
        PERSON: {},
        SIMILAR_MATERIALS: [],
        CATEGORY_CONCAT: ''
      }
    }
  },
  props: {
  },
  created() {
    that = this;
    // console.log(that.$axios);
  },
  mounted() {
    this.currentUrl = window.location.href;
    // that.$axios.get(`/intosai/item/${this.$route.params.item}`)
    // .then(function (response) {
    //   console.log(response.data.result);
    //   that.item = response.data.result;
    //   that.item.CATEGORY_CONCAT = '';
    //   if(that.item.CATEGORY) {
    //     for(let i = 0; i < that.item.CATEGORY.length; i++) {
    //       if(i+1 != that.item.CATEGORY.length) {
    //         that.item.CATEGORY_CONCAT += that.item.CATEGORY[i].NAME+', ';
    //       } else {
    //         that.item.CATEGORY_CONCAT += that.item.CATEGORY[i].NAME;
    //       }
    //     }
    //   }
    // })
    // .catch(function (error) {
    //   // console.log(error);
    // })
    // .finally(function () {
    // });
  },
  components: {
    headerButton,
    expandBlock,
    personSmall,

    // Materials
    materialSimple,
    personSimple,
    imageDesc,
    quoteSimple,

    shareBtn,
    shareBtnFix
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
  p.first + .expand-block, p.first + .aside-block {
    margin-top: 64px;
  }

  .dept-control {
    margin: 40px 0 0;
    padding: 48px;
    background: $cardblue;

    .grid {
      margin-top: 40px;
      font-family: $titlesans;

      .contact-list {
        marign-top: 20px;

        .contact {
          margin-top: 20px;
          font-size: em(20);
          line-height: 1.44;

          .name {
            font-size: 16px;
            margin-bottom: 8px;
          }

          address {
            color: $blue;
          }
        }
      }

      .col-4:first-child {
        p {
          font-size: em(20);
          line-height: 1.44;
        }
      }
      .col-5 {
        padding-left: 48px;
      }
      .col-3 {
        p {
          font-size: 12px;
          line-height: 1.44;
        }
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

  .news-share {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 8px;
    background: #fff;
    border-radius: 50px;

    a {
      width: 24px;
      height: 24px;
      display: block;
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }

      svg {
        width: 100%;

        path {
          fill: $lightblue;
          transition: fill 0.5s $cubic;
        }
      }

      &:hover {
        svg {
          path {
            fill: $darkblue;
          }
        }
      }
    }
  }

  .quotes-list {
    margin: 80px 0;

    .quote-simple {
      margin-bottom: 40px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .news-info {
      display: flex;
      justify-content: space-between;

      .top {
        .views, .shares {
          display: none;
        }
        .date {
          border-right: 0;
          padding-right: 0;
          margin-right: 0;
        }
      }

      .bottom {
        margin-top: 0;
        padding-top: 0;
        border: 0;
      }
    }
    .news-share {
      display: none;
    }
  }

  // Планшет
  @media (min-width: 577px) and (max-width: 1023px) {

  }

  // Телефон
  @media (max-width: 576px) {
    .dept-name {
      font-size: 24px;
      line-height: 1.44;
      flex: 0 0 80%;
      max-width: 80%;
      display: block;
    }

    .news-info {
      margin-top: 30px;

      .news-share {
        display: none;
      }

      .top {
        flex-wrap: wrap;

        & > * {
          margin-bottom: 8px;

          &.date {
            border: 0;
            padding-right: 0;
          }
        }
      }

      .bottom {
        margin-top: 8px;
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
  }
</style>

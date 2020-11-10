<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b flex-top-v flex-wrap">
        <div class="header-tags">
          <h1>{{check.NAME}}</h1>
        </div>
        <header-button text="" link="/expertise/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>

        <div class="news-info">
          <div class="top flex">
            <div class="type" v-if="check.SCOPE">{{check.SCOPE.VALUE}}</div>
            <div class="date">{{check.DATE_CREATE}}</div>
            <div class="views" v-if="check.SHOW_COUNTER">{{check.SHOW_COUNTER}} {{declOfNum(check.SHOW_COUNTER, $store.getters.getLang == 'en' ? ['view', 'views', 'views'] : ['просмотр', 'просмотра', 'просмотров'])}}</div>
          </div>
          <div class="bottom flex flex-just-b flex-center-v">
            <div class="header-tags">
              <div class="header-tag-list only-tags flex flex-center-v">
                <div class="tags flex">
                  <div class="tag" :class="tag.IS_ACTIVE ? 'active' : ''" v-for="tag in check.TAGS">{{tag.VALUE}}</div>
                </div>
              </div>
            </div>
            <share-btn :link="currentUrl" :text="'text'" :id="check.ID" :name="check.NAME"></share-btn>
          </div>
        </div>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <p class="first" v-if="check.PREVIEW_TEXT" v-html="check.PREVIEW_TEXT"></p>

          <image-desc v-if="check.PREVIEW_PICTURE" :src="check.PREVIEW_PICTURE" :detailSrc="check.PREVIEW_PICTURE" desc=""></image-desc>

          <div v-if="check.DETAIL_TEXT" class="aside-block flex">
            <aside>
            </aside>
            <div class="block-content">
              <p v-html="check.DETAIL_TEXT"></p>
            </div>
          </div>

          <div class="statement-list" v-if="check.FILES">
            <statement-simple v-if="check.FILES.REPORT" class="statement-inner" :external="true" :title="check.FILES.REPORT.NAME" :date="check.FILES.REPORT.DATE" :subinfo="check.FILES.REPORT.EXTENSION.toUpperCase()+' ('+check.FILES.REPORT.SIZE+' Мб)'" :link="check.FILES.REPORT.SRC"></statement-simple>
            <statement-simple v-if="check.FILES.RECOMMENDATIONS" class="statement-inner" :external="true" :title="check.FILES.RECOMMENDATIONS.NAME" :date="check.FILES.RECOMMENDATIONS.DATE" :subinfo="check.FILES.RECOMMENDATIONS.EXTENSION.toUpperCase()+' ('+check.FILES.RECOMMENDATIONS.SIZE+' Мб)'" :link="check.FILES.RECOMMENDATIONS.SRC"></statement-simple>
            <statement-simple v-if="check.FILES.REMOVAL" class="statement-inner" :external="true" :title="check.FILES.REMOVAL.NAME" :date="check.FILES.REMOVAL.DATE" :subinfo="check.FILES.REMOVAL.EXTENSION.toUpperCase()+' ('+check.FILES.REMOVAL.SIZE+' Мб)'" :link="check.FILES.REMOVAL.SRC"></statement-simple>
          </div>
        </div>
      </div>
    </section>
    <!-- <section data-type="page-content">
      <div class="center">
        <div class="page-contain">
          <div class="materials-list">
            <material-simple title="Уровень зарплат медицинского персонала в Российской Федерации — пояснения Счетной палаты" desc="Счетная палата в рамках проверки исполнения бюджета 2018 года пришла к выводу, что часть показателей одного из «майских указов» не достигнута в полной мере." image="/img/build.png" date="1 ч назад" type="Пресс-релиз" link="/"></material-simple>
            <material-simple title="Статья аудитора Счетной палаты Андрея Перчяна в газете «Коммерсантъ» о перспективах достижения целей нацпроекта по развитию малого и среднего бизнеса" desc="В Счетной палате начал работу Экспертно-консультативный совет при Председателе. Его основная цель – усилить работу ведомства, в том числе, по такому важнейшему направлению, как стратегический аудит." author="Чистова Вера Ергешевна" photo="/img/person.png" date="2 д назад" type="Интервью" link="/"></material-simple>
            <material-simple title="Уровень зарплат медицинского персонала в Российской Федерации — пояснения Счетной палаты" desc="Счетная палата в рамках проверки исполнения бюджета 2018 года пришла к выводу, что часть показателей одного из «майских указов» не достигнута в полной мере." image="/img/build.png" author="Ануприенко Валерий Юрьевич" photo="/img/person.png" date="1 ч назад" type="Пресс-релиз" link="/"></material-simple>
          </div>
          <a href="#" class="btn full-width big">Загрузить предыдущие материалы</a>
        </div>
      </div>
    </section> -->

  </div>
</template>

<script>
const headerButton = require('~/components/ui/head-button').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const itemTags = require('~/components/ui/items/item-tags').default;
const personSimple = require('~/components/ui/person/person-simple').default;
const expandBlock = require('~/components/ui/expand-block').default;
const materialSimple = require('~/components/ui/materials/material-simple').default;
const listSimple = require('~/components/ui/list-simple').default;
const statementSimple = require('~/components/ui/statements/statement-simple').default;

const shareBtn = require('~/components/ui/share-button').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let page = await context.app.$axios.get(`/examination/item/${context.route.params.expert}`),
        check = page.data.result

    console.log(check);

    return { seo: page.data.seo, check: check }
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
      check: {
        SCOPE: {},
        REGION: {},
        TAGS: []
      }
    }
  },
  created() {
    that = this;
  },
  mounted() {
    // this.currentUrl = window.location.href;
    // that.$axios.get(`/examination/item/${this.$route.params.expert}`)
    // .then(function (response) {
    //   that.check = response.data.result;
    //   console.log(that.check);
    // })
    // .catch(function (error) {
    // })
    // .finally(function () {
    // });
  },
  methods: {
    declOfNum(n, titles) {
      return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2]
    }
  },
  components: {
    headerButton,
    imageDesc,
    cardPhotos,
    itemTags,
    materialSimple,
    personSimple,
    expandBlock,
    listSimple,
    statementSimple,

    shareBtn,
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

  p.first + .aside-block {
    margin-top: 64px;
  }


    .news-info {
      margin-top: 50px;
      color: $lightblue;
      flex: 0 0 100%;
      max-width: 100%;
      position: relative;

      .header-tag-list {
        margin-top: 0;

        &.only-tags {
          .tags {
            border-left: 0;
            margin-left: 0;
            padding-left: 0;

            .tag {

            }
          }
        }
      }

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
        padding-top: 28px;
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
    }
</style>

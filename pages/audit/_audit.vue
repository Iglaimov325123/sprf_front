<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b flex-top-v flex-wrap">
        <div class="header-tags">
          <h1>{{check.NAME}}</h1>
        </div>
        <header-button text="" link="/audit/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>

        <div class="news-info">
          <div class="top flex">
            <div class="type" v-if="check.SCOPE">{{check.SCOPE.VALUE}}</div>
            <div class="date">{{check.DATE_CREATE}}</div>
            <div class="views" v-if="check.SHOW_COUNTER">{{check.SHOW_COUNTER}} {{declOfNum(check.SHOW_COUNTER, $store.getters.getLang == 'en' ? ['view', 'views', 'views'] : ['просмотр', 'просмотра', 'просмотров'])}}</div>
            <div class="shares" v-if="check.SHARE_COUNTER">{{checks.SHARE_COUNTER}} {{declOfNum(check.SHARE_COUNTER, $store.getters.getLang == 'en' ? ['share', 'shares', 'shares'] : ['поделился', 'поделилось', 'поделились'])}}</div>
          </div>
          <div class="bottom flex flex-just-b flex-center-v">
            <div class="header-tags">
              <div class="header-tag-list only-tags flex flex-center-v">
                <div class="tags flex">
                  <div class="tag" v-for="tag in check.TAGS" :class="tag.IS_ACTIVE ? 'active' : ''">{{tag.VALUE}}</div>
                </div>
              </div>
            </div>
            <share-btn :link="currentUrl" :id="check.ID" :text="'text'" :name="check.NAME"></share-btn>
          </div>
        </div>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <p class="first" v-if="check.PREVIEW_TEXT" v-html="check.PREVIEW_TEXT"></p>

          <image-desc v-if="check.DETAIL_PICTURE" :src="check.DETAIL_PICTURE" :detailSrc="check.DETAIL_PICTURE"></image-desc>

          <div class="aside-block flex" :class="check.ADDITIONAL_FILES ? '' : 'no-padding'">
            <aside>
              <expand-menu :items="menu" :expItems="expMenu"></expand-menu>
            </aside>
            <div class="block-content">
              <template v-for="block in check.CHAPTERS">
                <template v-if="check.HIDE_CHAPTERS">
                  <template v-if="block.TYPE == 'TEXT' || block.TYPE == 'text'">
                    <expand-block :title="block.TITLE" :text="'<p>'+block.TEXT+'</p>'"></expand-block>
                  </template>
                  <template v-if="(block.TYPE == 'HTML' || block.TYPE == 'html')">
                    <expand-block :title="block.TITLE" :text="block.TEXT"></expand-block>
                  </template>
                </template>
                <template v-else>
                  <div class="text-block">
                    <h3 v-if="block.TITLE">{{block.TITLE}}</h3>
                    <p v-if="block.TEXT" v-html="block.TEXT"></p>
                  </div>
                </template>

              </template>
            </div>
          </div>
          <div class="statement-list" v-if="check.ADDITIONAL_FILES">
            <statement-simple v-for="file in check.ADDITIONAL_FILES" class="statement-inner" :title="file.NAME" :date="file.DATE" :subinfo="file.EXTENSION.toUpperCase()+' ('+file.SIZE+' Мб)'" :link="file.SRC"></statement-simple>
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
const expandMenu = require('~/components/ui/expand-menu').default;
const expandBlock = require('~/components/ui/expand-block').default;
const materialSimple = require('~/components/ui/materials/material-simple').default;
const listSimple = require('~/components/ui/list-simple').default;
const statementSimple = require('~/components/ui/statements/statement-simple').default;

const shareBtn = require('~/components/ui/share-button').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    console.log(context);
    let page = await context.app.$axios.get(`/audits/item/${context.route.params.audit}`),
        check = page.data.result,
        expMenu = [],
        menu = [];

    for(let i = 0; i < check.CHAPTERS.length; i++) {
      if(i > 3) {
        if(check.CHAPTERS[i].TITLE != null) {
          expMenu.push(check.CHAPTERS[i].TITLE);
        }
      }  else {
        if(check.CHAPTERS[i].TITLE != null) {
          menu.push(check.CHAPTERS[i].TITLE);
        }
      }
    }

    return { seo: page.data.seo, check: check, expMenu: expMenu, menu: menu }
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
        REGION: {}
      },
      menu: [],
      expMenu: []
    }
  },
  created() {
    that = this;
  },
  mounted() {
    this.currentUrl = window.location.href;
    // that.$axios.get(`/audits/item/${this.$route.params.audit}`)
    // .then(function (response) {
    //   that.check = response.data.result;
    //   console.log(that.check);
    //
    //   for(let i = 0; i < that.check.CHAPTERS.length; i++) {
    //     if(i > 3) {
    //       if(that.check.CHAPTERS[i].TITLE != null) {
    //         that.expMenu.push(that.check.CHAPTERS[i].TITLE);
    //       }
    //     }  else {
    //       if(that.check.CHAPTERS[i].TITLE != null) {
    //         that.menu.push(that.check.CHAPTERS[i].TITLE);
    //       }
    //     }
    //   }
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
    expandMenu,
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

    @media (max-width: 767px) {
      section[data-type="inner-head"] h1 {
        font-size: em(20);
        line-height: 1.44;
        max-width: 80%;
        margin-right: 0;
      }
      .news-info {
        margin-top: 32px;

        .top {
          flex-wrap: wrap;

          > * {
            margin-bottom: 8px;
          }
        }

        .bottom {
          margin-top: 8px;
          padding-top: 16px;

          .header-tags {
            flex: 0 0 100%;
            max-width: 100%;
          }

          .header-tag-list.only-tags {
            .tags {
              flex-wrap: wrap;

              .tag {
                margin-bottom: 8px;
              }
            }
          }

          .icon-block {
            display: none;
          }
        }
      }

      .dept-control {
        padding: 0;
      	margin: 40px -20px 0;
        background: transparent;
        border-top: 8px solid #F1F2F5;
        padding: 32px 20px 0;

        h3 {
          font-size: em(24);
        }

        .person {
          padding: 0;
        }

        .grid {
          margin-top: 24px;
          flex-wrap: wrap;

          .col-4:first-child {
            p {
              font-size: em(16);
              line-height: 1.44;
            }
          }

          .col-5 {
            flex: 0 0 100%;
            max-width: 100%;
            // padding-left: 0;
            // padding-top: 24px;
            // margin-top: 24px;
            padding: 24px 0;
            margin: 24px 0;
            border-top: 1px solid rgba(#000, 0.2);
            border-bottom: 1px solid rgba(#000, 0.2);
          }
        }

        .col-4 {
          flex: 0 0 100%;
          max-width: 100%;
        }
      }
    }
</style>

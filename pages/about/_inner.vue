<template>
  <div class="page-content" data-type="inner">
    <template v-if="type != 'department'">
      <section class="blue" data-type="inner-head">
        <div class="center flex flex-just-b">
          <h1>{{page.NAME}}</h1>
          <header-button text="" link="/about/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
        </div>
      </section>

      <section data-type="page-content">
        <div class="center">
          <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
          <div class="page-contain">
            <p class="first" v-html="page.ANNONCE"></p>

            <image-desc v-if="page.PICTURE" :src="page.PICTURE.SRC" :detail-src="page.PICTURE.SRC" :desc="page.PICTURE.DESCRIPTION"></image-desc>

            <div class="grid devision flex flex-just-b">
              <div class="left-content col-8" v-html="page.DESCRIPTION">
              </div>
              <aside class="col-4">
                <template v-for="link in page.LINKS">
                  <card-photos v-if="link.TYPE=='persons'" :link="link.CODE != null ? link.CODE : link.LINK" :desc="link.NAME" :photos="link.PERSONS"></card-photos>
                  <card-simple v-else-if="link.TYPE=='button'" :link="link.CODE != null ? link.CODE : link.LINK" :desc="link.NAME"></card-simple>
                </template>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </template>
    <template v-else>
      <section class="blue" data-type="inner-head">
        <div class="center flex flex-just-b flex-center-v">
          <h1 class="dept-name">{{page.NAME}}</h1>
          <header-button text="" link="/about/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
        </div>
      </section>

      <section data-type="page-content">
        <div class="center">
          <div class="page-contain">
            <p class="first" v-html="page.ACTIVITIES" v-if="page.ACTIVITIES"></p>
            <expand-block :title="$store.getters.getLang == 'en' ? 'Areas of activity' : 'Направления деятельности'" :text="page.DETAIL_TEXT" v-if="page.DETAIL_TEXT"></expand-block>

            <div class="dept-control">
              <h3>{{$store.getters.getLang == 'en' ? 'Head' : 'Руководство'}}</h3>
              <div class="grid flex">
                <div class="col-4">
                  <div class="contact-list">
                    <div class="contact">
                      <div class="name">
                        {{$store.getters.getLang == 'en' ? 'Contact phone' : 'Телефон'}}
                      </div>
                      <a :href="'tel:'+page.PHONE">{{page.PHONE}}</a>
                    </div>
                    <div class="contact">
                      <div class="name">
                        {{$store.getters.getLang == 'en' ? 'Email' : 'Эл. почта'}}
                      </div>
                      <a :href="'mailto:'+page.EMAIL">{{page.EMAIL}}</a>
                    </div>
                    <div class="contact">
                      <div class="name">
                        {{$store.getters.getLang == 'en' ? 'Address' : 'Адрес'}}
                      </div>
                      <address>{{page.ADDRESS}}</address>
                    </div>
                  </div>
                </div>
                <div class="col-5">
                  <div class="person-list">
                    <person-small :name="page.DIRECTOR.NAME" v-if="page.DIRECTOR" :pos="page.DIRECTOR.TITLE" :photo="page.DIRECTOR.IMG"></person-small>
                    <person-small v-for="person in page.PERSON" :name="person.NAME" v-if="page.PERSON" :pos="person.POSITION" :photo="person.PREVIEW_PICTURE"></person-small>
                  </div>
                </div>
                <div class="col-3">
                  <p v-html="page.INFO_TEXT" v-if="page.INFO_TEXT"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- <section data-type="page-content">
        <div class="center">
          <div class="page-contain">
            <div class="materials-list">
              <material-simple title="Уровень зарплат медицинского персонала в Российской Федерации — пояснения Счетной палаты" desc="Счетная палата в рамках проверки исполнения бюджета 2018 года пришла к выводу, что часть показателей одного из «майских указов» не достигнута в полной мере." image="/img/build.png" date="1 ч назад" type="Пресс-релиз"></material-simple>
              <material-simple title="Статья аудитора Счетной палаты Андрея Перчяна в газете «Коммерсантъ» о перспективах достижения целей нацпроекта по развитию малого и среднего бизнеса" desc="В Счетной палате начал работу Экспертно-консультативный совет при Председателе. Его основная цель – усилить работу ведомства, в том числе, по такому важнейшему направлению, как стратегический аудит." author="Чистова Вера Ергешевна" photo="/img/person.png" date="2 д назад" type="Интервью"></material-simple>
              <material-simple title="Уровень зарплат медицинского персонала в Российской Федерации — пояснения Счетной палаты" desc="Счетная палата в рамках проверки исполнения бюджета 2018 года пришла к выводу, что часть показателей одного из «майских указов» не достигнута в полной мере." image="/img/build.png" author="Ануприенко Валерий Юрьевич" photo="/img/person.png" date="1 ч назад" type="Пресс-релиз"></material-simple>
            </div>
            <a href="#" class="btn full-width big">Загрузить предыдущие материалы</a>
          </div>
        </div>
      </section> -->
    </template>


  </div>
</template>

<script>
const headerButton = require('~/components/ui/head-button').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const cardSimple = require('~/components/ui/cards/card-simple').default;
const expandBlock = require('~/components/ui/expand-block').default;
const personSmall = require('~/components/ui/person/person-small').default;
const materialSimple = require('~/components/ui/materials/material-simple').default;

const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    console.log(context);
    let page = await context.app.$axios.get(`/misc/simplePage/${context.route.params.inner}`)


    return { seo: page.data.seo, page: page.data.result, type: page.data.type }
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
      type: 'text',
      page: {
        PICTURE: {

        }
      }
    }
  },
  created() {
    that = this;
  },
  mounted() {
    this.currentUrl = window.location.href;
    // that.$axios.get(`/misc/simplePage/${this.$route.params.inner}`)
    //   .then(function (response) {
    //     console.log(response.data.result);
    //     that.page = response.data.result;
    //     that.type = response.data.type;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //   });
  },
  components: {
    headerButton,
    imageDesc,
    cardPhotos,
    cardSimple,
    expandBlock,
    personSmall,
    materialSimple,
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
  p.first + .expand-block, p.first + .devision {
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
</style>

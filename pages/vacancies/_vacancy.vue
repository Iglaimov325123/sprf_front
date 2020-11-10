<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b flex-top-v">
        <div class="header-tags">
          <h1>{{item.NAME}}</h1>
          <div class="header-tag-list flex flex-center-v">
            <div class="date">{{item.DATE_CREATE}}</div>
            <div class="tags flex">
              <div class="tag active" v-for="tag in item.TAGS">{{tag.VALUE}}</div>
            </div>
          </div>
        </div>
        <header-button text="" link="/vacancies/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <p class="first" v-if="item.PREVIEW_TEXT" v-html="item.PREVIEW_TEXT"></p>
          <div class="double-side flex flex-wrap">
            <div class="col-6">
              <expand-block title="Обязанности" :text="item.DUTIES" v-if="item.DUTIES"></expand-block>
              <expand-block title="Требования" :text="item.REQUIREMENTS" v-if="item.REQUIREMENTS"></expand-block>

              <h3>Условия</h3>
              <list-simple :items="item.CONDITIONS"></list-simple>
            </div>
            <div class="col-6">
              <div class="blue-block">
                <h3>Контакты</h3>
                <p v-html="contacts.HEADER_TEXT"></p>
                <div class="block-border-grid flex flex-wrap">
                  <div class="grid-item" v-for="time in contacts.TIMETABLE.ACTIVE">
                    <div class="grid-item-inner">
                      <small>{{time.LABEL}}</small>
                      <div class="value">{{time.VALUE}}</div>
                    </div>
                  </div>
                  <div class="grid-item" v-for="time in contacts.TIMETABLE.DISABLED">
                    <div class="grid-item-inner disable">
                      <small>{{time.LABEL}}</small>
                      <div class="value">{{time.VALUE}}</div>
                    </div>
                  </div>
                </div>

                <ul class="just-list flex flex-wrap">
                  <li class="col-6">
                    <small>Телефон</small>
                    <div class="value"><a :href="'tel:'+contacts.PHONE">{{contacts.PHONE}}</a></div>
                  </li>
                  <li class="col-6">
                    <small>Эл. почта</small>
                    <div class="value"><a :href="'mailto:'+contacts.EMAIL">{{contacts.EMAIL}}</a></div>
                  </li>
                  <li>
                    <small>Адрес</small>
                    <div class="value">{{contacts.ADDRESS}}</div>
                  </li>
                </ul>

                <person-simple class="col-4" v-if="contacts.PERSON" :code="contacts.PERSON.ID" :photo="contacts.PERSON.PREVIEW_PICTURE" :name="contacts.PERSON.NAME" :pos="contacts.PERSON.POSITION"></person-simple>

                <small v-html="contacts.FOOTER_TEXT"></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let page = await context.app.$axios.get(`/jobs/item/${context.route.params.vacancy}`)

    return { seo: page.data.seo, item: page.data.result, contacts: page.data.contacts }
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
      contacts: {
        TIMETABLE: {
          ACTIVE:[],
          DISABLED:[]
        },
        PERSON: {}
      },
      item: []
    }
  },
  created() {
    that = this;
  },
  mounted() {
    this.currentUrl = window.location.href;
      // this.$axios.get(`/jobs/item/${this.$route.params.vacancy}`)
      //   .then(function (response) {
      //     that.item = response.data.result;
      //     that.contacts = response.data.contacts;
      //     console.log(that.item);
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
    itemTags,
    materialSimple,
    personSimple,
    expandBlock,
    listSimple,
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
    .header-tag-list {
      flex-wrap: wrap;

      .date {
        flex: 0 0 100%;
        max-width: 100%;
      }

      .tags {
        flex: 0 0 100%;
        max-width: 100%;
        border-left: 0;
        margin-left: 0;
        padding-left: 0;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
        margin-top: 16px;
        padding-top: 16px;
        flex-wrap: wrap;

        .tag {
          flex: 0 0 100%;
          max-width: 100%;
          margin-right: 0;
          margin-bottom: 16px;

          &:before {
            flex: 0 0 6px;
          }

          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>

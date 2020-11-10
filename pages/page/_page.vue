<template>
  <div class="page-content" data-type="inner">
    <template>
      <section class="blue" data-type="inner-head">
        <div class="center flex flex-just-b">
          <h1>{{page.NAME}}</h1>
          <header-button text="" v-on:click.native="goBack" link="/about/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
        </div>
      </section>

      <section data-type="page-content">
        <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
          <div class="page-contain">
            <p class="first" v-if="page.ANNONCE" v-html="page.ANNONCE"></p>

            <image-desc v-if="page.PICTURE" :src="page.PICTURE.SRC" :detail-src="page.PICTURE.SRC" :desc="page.PICTURE.DESCRIPTION"></image-desc>

            <div class="grid devision flex flex-just-b">
              <div class="left-content col-8">
                <div class="block-content">
                  <p v-html="page.DESCRIPTION"></p>
                </div>
                <div class="statement-list" id="files-list">
                  <statement-simple v-for="file in page.FILES" class="statement-inner" :external="true" :title="file.NAME" :date="file.DATE" :subinfo="file.EXTENSION.toUpperCase()+' ('+file.SIZE+' Мб)'" :link="file.SRC"></statement-simple>
                </div>
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


  </div>
</template>

<script>
const headerButton = require('~/components/ui/head-button').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const cardSimple = require('~/components/ui/cards/card-simple').default;
const expandBlock = require('~/components/ui/expand-block').default;
const personSmall = require('~/components/ui/person/person-small').default;
const statementSimple = require('~/components/ui/statements/statement-simple').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    console.log(context);
    let page = await context.app.$axios.get(`/misc/page/${context.route.params.page}`)

    return { seo: page.data.seo, page: page.data.result }
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
      page: {
        PICTURE: {

        }
      }
    }
  },
  created() {
    that = this;
  },
  methods: {
    goBack() {
      if(document.referrer != '' || this.$header.hasPrev) {
        that.$router.go(-1);
      } else {
        that.$router.push(that.$store.getters.getLang == 'en' ? '/en/' : '/');
      }
    }
  },
  mounted() {
    this.currentUrl = window.location.href;
  },
  components: {
    headerButton,
    imageDesc,
    cardPhotos,
    cardSimple,
    expandBlock,
    personSmall,
    statementSimple,
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
</style>

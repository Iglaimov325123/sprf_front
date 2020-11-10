<template>
  <div class="page-content" data-type="inner">
    <section class="blue with-expand" data-type="inner-head">
      <div class="head-main center flex flex-just-b flex-center-v">
        <h1>{{items.NAME}}</h1>

        <div class="flex head-buttons">
            <header-button text="" link="/anticorruption" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
            <header-control v-if="info.TEXT != null" v-on:click.native="expandInfo" text="Информация" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+ICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTIsMjRBMTIsMTIsMCwxLDEsMjQsMTIsMTIsMTIsMCwwLDEsMTIsMjRaTTEyLDJBMTAsMTAsMCwxLDAsMjIsMTIsMTAsMTAsMCwwLDAsMTIsMlptMSw4SDExdjhoMlptMC00SDExVjhoMloiLz48L3N2Zz4="></header-control>
        </div>
      </div>

      <div class="head-expend-info" >
        <div class="center" v-if="info.TEXT != null" v-html="info.TEXT">
        </div>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">

        <external-link :link="headlink.LINK" :icon="headlink.ICON" :text="headlink.LINK_TEXT"></external-link>
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <div class="doc-list">

            <div class="doc-item"  v-for="item in items.BLOCKS">
              <div class="doc-title" @click="openItem">
                <h3>{{item.NAME}}</h3>
                <div class="doc-preview" v-html="item.PREVIEW_TEXT">
                </div>
              </div>
              <div class="doc-detail">
                <div class="doc-detail-content" v-html="item.DETAIL_TEXT">
                </div>

                <a :href="file.SRC" target="_blank" class="doc-download" v-for="file in item.FILES" v-if="item.FILES">
                  <h4>{{file.NAME}}</h4>
                  <div class="flex">
                    <small>{{file.DATE}}</small>
                    {{file.EXTENSION.toUpperCase()}} ({{file.SIZE}} Мб)
                  </div>
                </a>
                <a :href="file.LINK" target="_blank" class="doc-download" v-for="file in item.LINKS" v-if="item.LINKS">
                  <h4>{{file.NAME}}</h4>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
const externalLink = require('~/components/ui/external-link').default;
const headerButton = require('~/components/ui/head-button').default;
const headerControl = require('~/components/ui/head-control').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const cardSimple = require('~/components/ui/cards/card-simple').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let info = await context.app.$axios.get('/misc/docPage/independent-anti-corruption-expertise-of-draft-normative-legal-acts')

    return { seo: info.data.seo, items: info.data.result, info: info.data.info, headlink: info.data.header_link }
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
      items: [],
      info: {TEXT:''},
      headlink: {},
    }
  },
  created() {
    that = this;
  },
  mounted() {
    this.currentUrl = window.location.href;
    // that.$axios.get('/misc/docPage/independent-anti-corruption-expertise-of-draft-normative-legal-acts')
    //   .then(function (response) {
    //     console.log(response.data.result);
    //     that.items = response.data.result;
    //     that.info = response.data.info;
    //     that.headlink = response.data.header_link;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //   });
  },
  methods: {
    expandInfo(e) {
      let elem = e.target || e.srcElement,
          field = document.querySelector('.head-expend-info');


      if(elem.classList.contains('visible')) {
        TweenMax.to(field, 1, {height: 0, ease: Expo.easeOut});
        elem.classList.remove('visible');
      } else {
        TweenMax.set(field, {height: 'auto'});
        TweenMax.from(field, 1, {height: 0, ease: Expo.easeOut});
        elem.classList.add('visible');
      }
    },
    openItem(event) {
      let elem = event.target || event.srcElement;
      if(!elem.classList.contains('doc-item')) {
        elem = elem.closest('.doc-item');
      }

      let docDetail = elem.querySelector('.doc-detail');

      if(elem.dataset.active == 'true') {
        elem.dataset.active = 'false';
        TweenMax.to(docDetail, 0.5, {height: 0, ease: Expo.easeOut});
      } else {
        elem.dataset.active = 'true';
        TweenMax.set(docDetail, {height: 'auto'});
        TweenMax.from(docDetail, 0.5, {height: 0, ease: Expo.easeOut});
      }

    }
  },
  components: {
    headerButton,
    imageDesc,
    cardPhotos,
    cardSimple,
    externalLink,
    headerControl,
    shareBtnFix
  }
}
</script>

<style lang="scss" scoped>
  .doc-list {
    .doc-item {
      padding: 0 0 20px;
      margin-bottom: 40px;
      border-bottom: 1px solid rgba(#000, 0.2);

      &:last-child {
        margin-bottom: 0;
        border-bottom: 0;
        padding-bottom: 0;
      }

      &[data-active="true"] {
        .doc-title {
          h3 {
            color: $lightblue;
          }
        }
      }

      .doc-title {
        padding: 0 0 20px;
        cursor: pointer;

        h3 {
          color: $blue;
          margin-bottom: 18px;
          transition: color 0.5s $cubic;
        }
      }

      .doc-detail {
        height: 0;
        overflow: hidden;
        position: relative;

        .doc-download {
          padding-top: 40px;
          display: block;

          .flex {
            margin-top: 20px;
            color: #000;

            small {
              display: block;
              margin-right: 24px;
              color: $lightblue;
            }
          }
        }
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .doc-list {
      .doc-item {
        .doc-title {
          h3 {
            color: #000;
          }
        }
        .doc-detail {
          .doc-download {
            .flex {
              small {
                color: #666;
              }
            }
          }
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .doc-list {
      .doc-item {
        border-color: 1px solid rgba(#fff, 0.7);
        .doc-title {
          h3 {
            color: #fff;
          }
        }
        .doc-detail {
          .doc-download {
            .flex {
              small {
                color: #888;
              }
            }
          }
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .doc-list {
      .doc-item {
        border-color: 1px solid rgba($ddk, 0.7);

        .doc-title {
          h3 {
            color: $ddk;
          }
        }
        .doc-detail {
          .doc-download {
            .flex {
              small {
                color: rgba($ddk, 0.8);
              }
            }
          }
        }
      }
    }
  }
</style>

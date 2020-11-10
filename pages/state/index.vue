<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b">
        <h1>{{page.NAME}}</h1>
        <!-- <header-button text="История Счетной палаты" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMSIgeT0iMyIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE4IiByeD0iMSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xMiA0VjIwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTkgOUg0IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTkgMTVINCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo="></header-button> -->
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <p class="first" v-html="page.ANNONCE">Счетная палата стимулирует развитие внутреннего аудита госорганов, общественный контроль над распоряжением государственными ресурсами, через открытость развивает «чувство налогоплательщика», качественно обеспечивает конституционное право граждан на участие в управлении делами государства и способствует повышению ориентации деятельности органов власти на общественные интересы.</p>

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

  </div>
</template>

<script>
const headerButton = require('~/components/ui/head-button').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const cardSimple = require('~/components/ui/cards/card-simple').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let info = await context.app.$axios.get('/misc/simplePage/state-service')

    return { seo: info.data.seo, page: info.data.result }
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
  mounted() {
    this.currentUrl = window.location.href;
    // that.$axios.get('/misc/simplePage/state-service')
    //   .then(function (response) {
    //     console.log(response.data.result);
    //     that.page = response.data.result;
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
    shareBtnFix
  }
}
</script>

<style lang="scss" scoped>
  p.first + .devision {
    margin-top: 64px;
  }
</style>

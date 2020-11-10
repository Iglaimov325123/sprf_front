<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b">
        <h1>{{$store.getters.getLang=='en'?'Sitemap':'Карта сайта'}}</h1>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <div class="page-contain">
          <div class="links-container">
            <div class="link-group" v-for="(link,index) in getLinksList" :key="index">
              <nuxt-link class="link link-title" v-html="link[0].NAME" :to="$store.getters.getLang == 'en' ? '/en'+link[0].URL : link[0].URL"></nuxt-link>
              <nuxt-link class="link link-text" v-for="nextLink in link.slice(1)" v-html="nextLink['NAME']" :to="$store.getters.getLang == 'en' ? '/en'+nextLink['URL'] : nextLink['URL']" :key="nextLink['NAME']"></nuxt-link>
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
const cardSimple = require('~/components/ui/cards/card-simple').default;

let that;
export default {
  async asyncData (context) {
    let page = await context.app.$axios.get('/menu/full')
    let indexBlocks = await context.app.$axios.get('/misc/indexBlock')

    console.log('page', page.data.result);

    return { seo: indexBlocks.data.seo, links: page.data.result.MAIN }
  },
  head() {
    return {
      title: 'Карта сайта',
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
      links: {}
    }
  },
  computed: {
    getLinksList() {
      if (this.links) {
        return this.links.map(item => item['ITEMS'].map(link => link))
      }
    }
  },
  created() {
    that = this;
  },
  mounted() {
    console.log('LOCALE ', this.$i18n.locale)
    // that.$axios.get('/misc/simplePage/about')
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
  }
}
</script>

<style lang="scss" scoped>

  .link-group {
    margin-top: 10px
  }

  .link {
    display: block;
    cursor: pointer;
  }

  .link-text {
    margin-left: 25px;
    margin-top: 10px
  }

  
</style>

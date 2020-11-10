<template>
  <div>
    <main role="main" :class="($store.getters.getDisability && $store.getters.getImage != 'true') ? 'dis-image' : ''">
      <div class="page-content" data-type="inner">
        <section class="blue has-filter" data-type="inner-head">
          <div class="center flex flex-just-b flex-wrap  flex-center-v">
            <search class="col-12" ref="searchInput" :holder="false"></search>

            <h1>{{$store.getters.getLang == 'en' ? 'Page not found' : 'Страница не найдена'}}</h1>

          </div>
        </section>

        <filters ref="filtering" filer="items" post="/search/main"></filters>

        <section data-type="page-content">
          <div class="center">
            <div class="page-contain">
              <div class="no-results" v-if="items.length == 0">
                {{$store.getters.getLang == 'en' ? 'You can use search field' : 'Воспользуйтесь поиском'}}<br>
                <span v-if="$store.getters.getLang == 'en'">or go to the<nuxt-link to="/en"> home page.</nuxt-link></span>
                <span v-if="$store.getters.getLang == 'ru'">или перейдите <nuxt-link to="/">на главную страницу</nuxt-link></span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    <!-- <footering></footering> -->
  </div>
</template>

<script>
  import gsap from 'gsap';
  const heading = require('~/components/static/header').default;
  const footering = require('~/components/static/footer').default;

  const search = require('~/components/ui/search').default;
  const headerControl = require('~/components/ui/head-control').default;
  const imageDesc = require('~/components/ui/image-desc').default;
  const cardPhotos = require('~/components/ui/cards/card-photos').default;
  const cardSimple = require('~/components/ui/cards/card-simple').default;
  const filters = require('~/components/ui/filters').default;
  const materialSimple = require('~/components/ui/materials/material-simple').default;

  let that;
  export default {
    middleware: 'state',
    data() {
      return {
        curTitle: 'Поиск',
        items: [],
        count: 10,
        page: 1,
        sort: 'asc',
        isLastPage: false,
        totalPage: 1,
        hasFilter: false,
        queryString: ''
      }
    },
    watch: {
      '$route' (to, from) {
        console.log(to);
        this.queryString = to.query.q;
        this.$router.go();
      }
    },
    mounted() {
      if(this.$route.query.q) {
        this.queryString = this.$route.query.q;
      } else {
        this.queryString = '';
      }

      console.log(this.$refs.searchInput);
    },
    components: {
      heading,
      footering,
      headerControl,
      imageDesc,
      cardPhotos,
      cardSimple,
      materialSimple,
      filters,
      search
    },
    created() {
      that = this;
    },
    methods: {
    },
  }
</script>

<style>
</style>

<template>
  <div class="page-content" data-type="index">
    <section class="blue" data-type="main-search" :class="$store.getters.getLang != 'ru' ? 'simple-search' : ''">
      <div class="center flex flex-col">
        <div class="flex flex-top">
          <h1 v-if="$store.getters.getLang == 'ru'">Счетная палата <i>Российской Федерации</i></h1>
          <h1 v-else>Accounts Chamber<br /><i>of the Russian Federation</i></h1>
        </div>

        <div class="flex flex-bottom">
          <search class="col-12" :hided="false" :ready-tags="searchTags" :holder="true"></search>
        </div>
      </div>
    </section>

    <section data-type="items-grid" v-if="$store.getters.getLang == 'ru'">
      <div class="center">
        <div class="grid flex flex-wrap">
          <item-slider class="col-6" :info="blocks.CONTROLS"></item-slider>
          <item-authors class="col-6" :info="blocks.NEWS"></item-authors>
          <item-graph class="col-6" :info="blocks.AUDIT"></item-graph>
          <item-basic class="col-6" :info="blocks.AUDIT_NACIONAL"></item-basic>
        </div>
      </div>
    </section>
    <section data-type="items-grid" v-else>
      <div class="center">
        <div class="materials-contain">
          <div class="materials-list">
            <material-simple v-for="news in items"
            :title="news.NAME"
            :image="news.PREVIEW_PICTURE"
            :author="news.PERSON != null ? news.PERSON.NAME : ''"
            :photo="news.PERSON != null ? news.PERSON.PREVIEW_PICTURE : ''"
            :date="news.DATE_CREATE"
            :type="news.CATEGORY"
            :link="linkForPublication('/news/'+news.CODE)"></material-simple>
          </div>
          <a :href="'/news/page/'+page" class="btn full-width big" @click.prevent="loadItems" v-if="page != totalPage">Load more</a>
        </div>
      </div>
    </section>

    <section data-type="cards-grid" v-if="$store.getters.getLang == 'ru'">
      <template v-if="!isMobile">
        <div class="center" v-if="!isBlockSlider">
          <div class="grid flex flex-wrap">
            <card class="col-4" v-for="block in blocks.LINK_BLOCKS" :external="block.EXTERNAL" :icon="block.ICON" :text="block.NAME" :link="block.LINK"></card>
          </div>
        </div>

        <div class="center wrap-slider" v-else>
          <div class="item-slide-control">
            <button name="leftSlide" class="left" @click="goPrev"></button>
            <button name="rightSlide" class="right" @click="goNext"></button>
          </div>
          <div class="blocks-slider" ref="mySwiper" v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">

              <card class="swiper-slide col-4" v-for="block in blocks.LINK_BLOCKS" :external="block.EXTERNAL" :icon="block.ICON" :text="block.NAME" :link="block.LINK"></card>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="center wrap-slider">
          <div class="item-slide-control">
            <button name="leftSlide" class="left" @click="goPrev"></button>
            <button name="rightSlide" class="right" @click="goNext"></button>
          </div>
          <div class="blocks-slider" ref="mySwiper" v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">

              <card class="swiper-slide col-4" v-for="block in blocks.LINK_BLOCKS" :external="block.EXTERNAL" :icon="block.ICON" :text="block.NAME" :link="block.LINK"></card>
            </div>
          </div>
        </div>
      </template>
    </section>


  </div>
</template>

<script>
const search = require('~/components/ui/search').default;

// Items
const itemSlider = require('~/components/ui/items/item-slider').default;
const itemAuthors = require('~/components/ui/items/item-photos').default;
const itemGraph = require('~/components/ui/items/item-graph').default;
const itemBasic = require('~/components/ui/items/item-basic').default;

// Materials
const materialSimple = require('~/components/ui/materials/material-simple').default;

// Cards
const card = require('~/components/ui/cards/card').default;

let that;
export default {
  async asyncData (context, params, store) {
    let indexBlocks = await context.app.$axios.get('/misc/indexBlock')
    for(let i = 0; i < indexBlocks.data.result.LINK_BLOCKS.length; i++) {
      if(indexBlocks.data.result.LINK_BLOCKS[i].LINK.indexOf('http') > -1) {
        indexBlocks.data.result.LINK_BLOCKS[i].EXTERNAL = true;
      } else {
        indexBlocks.data.result.LINK_BLOCKS[i].EXTERNAL = false;
      }
    }

    let searchTags = await context.app.$axios.get('/search/tags'),
        isSlider = false;

    if(indexBlocks.data.result.LINK_BLOCKS.length > 6) {
      isSlider = true;
    }

    let info = await context.app.$axios.get('/news/list', {
      params: {
        count: 5,
        page: 1
      }
    })

    console.log('TAGS', indexBlocks.data.seo)

    return { seo: indexBlocks.data.seo, blocks: indexBlocks.data.result, searchTags: searchTags.data.result, isBlockSlider: isSlider, items: info.data.result.items, totalPage: info.data.result.pages }
  },
  head() {
    return {
      title: this.seo ? this.seo.TITLE : 'Счетная палата Российской Федерацииzz',
      meta: [
        {name: 'description', content: this.seo ? this.seo.DESCRIPTION : ''},
        {name: 'keywords', content: this.seo ? this.seo.KEYWORDS : ''}
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
      blocks: {
        AUDIT: {},
        AUDIT_NACIONAL: {},
        CONTROLS: [],
        NEWS: [],
        LINK_BLOCKS: []
      },
      items: [],
      isBlockSlider: false,
      searchTags: [],
      totalPage: 0,
      page: 1,
      count: 5,
      isLastPage: false,
      isMobile: false,
      swiperOption: {
        // init: false,
        loop: false,
        slidesPerView: 'auto',
        speed: 600,
        grabCursor: true,
        // autoplay: {
        //   delay: 3000
        // },
        // on: {
        //   slideChange() {
        //     console.log('change');
        //   },
        //   setTranslate: function(translate) {
        //     that.$el.querySelector('.swiper-wrapper').style.transform = 'translate(' + translate + 'px, 0)'
        //   }
        // }

        // breakpoints: {
        //   // when window width is >= 320px
        //   767: {
        //     slidesPerView: 1
        //   },
        //   // when window width is >= 480px
        //   1023: {
        //     slidesPerView: 3,
        //     spaceBetween: 30
        //   },
        //   // when window width is >= 640px
        //   2000: {
        //     slidesPerView: 'auto',
        //     spaceBetween: 40
        //   }
        // }

      },
    }
  },
  created() {
    that = this;
    // that.$nextTick(function() {
    //
    //   })
  },
  mounted() {
    this.isMobile = window.isMobile();
    // that.$axios.get('/misc/indexBlock')
    //   .then(function (response) {
    //     console.log('ADD EXT', response.data.result);
    //     for(let i = 0; i < response.data.result.LINK_BLOCKS.length; i++) {
    //       if(response.data.result.LINK_BLOCKS[i].LINK.indexOf('http') > -1) {
    //         response.data.result.LINK_BLOCKS[i].EXTERNAL = true;
    //       } else {
    //         response.data.result.LINK_BLOCKS[i].EXTERNAL = false;
    //       }
    //     }
    //     that.blocks = response.data.result;
    //     console.log('BLOCKS', that.blocks);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //   });

    // that.$axios.get('/search/tags')
    //   .then(function (response) {
    //     that.searchTags = response.data.result;
    //     console.log(that.searchTags);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //   });
  },
  methods: {
    goPrev(e) {
      that.mySwiper.slidePrev(500);
    },
    goNext(e) {
      that.mySwiper.slideNext(500);
    },
    chunk(arr, chunkSize) {
      var R = [];
      for (var i=0,len=arr.length; i<len; i+=chunkSize)
        R.push(arr.slice(i,i+chunkSize));
      return R;
    },
    loadItems(e) {
      e.preventDefault();

      that.$axios.get('/news/list', {
        params: {
          count: that.count,
          page: that.page+1
        }
      })
      .then(function (response) {
        console.log('loaded items', response.data.result);
        that.items = that.items.concat(response.data.result.items);
        console.log('items', that.items);
        that.page++;
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
    },
    linkForPublication(link) {
      return this.$store.getters.getLang === 'en' ? '/en' + link : link
    },
  },
  components: {
    search,
    itemSlider,
    itemAuthors,
    itemGraph,
    itemBasic,
    card,
    materialSimple
  }
}
</script>

<style lang="scss" scoped>
  section[data-type="main-search"] {
    background-color: $darkblue;
    padding: 135px 0 280px;
    color: #fff;
    height: auto;
    background-image: url('~assets/img/back_eagle.svg');
    background-position: right bottom;
    background-repeat: no-repeat;

    &.simple-search {
      .flex-top {
        padding-bottom: 81px;
      }
    }

    h1 {
      max-width: 50%;
    }

    .flex-top {
      padding-bottom: 110px;
    }

    .center {
      // min-height: 50vh;
    }
  }

  section[data-type="items-grid"] {
    .grid {
      margin: -150px -16px 0;
    }
    .materials-contain {
      margin: -150px 0 0;
      padding: 40px;
      background: #fff;
      border-radius: 4px;
    }

    .material {
      padding: 0 0 40px;
    	margin: 0 0 40px;
    	border-bottom: 1px solid rgba(0,0,0,.2);

      &:last-child {
        margin-bottom: 0;
      	border: 0;
      }
    }
  }

  section[data-type="cards-grid"] {
    padding: 48px 0 0;
    position: relative;
    overflow: hidden;


    .item-slide-control {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 5px;

      .left, .right {
        cursor: pointer;
        transition: opacity 0.3s $cubic;
        width: 35px;
        height: 40px;
        position: relative;
        opacity: 1;

        &:hover {
          opacity: 0.5;
        }

        &:before {
          content: '';
          width: 0;
          height: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          position: absolute;
          top: 50%;
          left: 50%;
          margin: -5px 0 0 -4px;
        }
      }

      .left:before {
        border-right: 7px solid $lightblue;

        &:before:hover {
          border-right: 7px solid $darkblue;
        }
      }

      .right:before {
        border-left: 7px solid $lightblue;

        &:before:hover {
          border-left: 7px solid $darkblue;
        }
      }
    }
    // &:before, &:after {
    //   content: '';
    //   display: block;
    //   position: absolute;
    //   top: 0;
    //   height: 100%;
    //   width: 25%;
    //   z-index: 50;
    //   pointer-events: none;
    // }
    //
    // &:before {
    //   right: 0%;
    //   background: linear-gradient(to right, rgba(241,242,245,0) 0%,rgba(241,242,245,1) 50%,rgba(241,242,245,1) 100%);
    // }
    //
    // &:after {
    //   left: 0%;
    //   background: linear-gradient(to right, rgba(241,242,245,1) 0%,rgba(241,242,245,1) 50%,rgba(241,242,245,0) 100%);
    // }

    .swiper-container {
      overflow: visible;
    }

    .grid {
      margin: 0 -12px 0;
    }
  }

  // Доп адаптив
  @media (min-width: 1801px) and (max-width: 2100px) {
    section[data-type="cards-grid"][data-v-2a183b29]:before, section[data-type="cards-grid"][data-v-2a183b29]:after {
      width: 20%;
    }
  }
  @media (min-width: 1501px) and (max-width: 1800px) {
    section[data-type="cards-grid"][data-v-2a183b29]:before, section[data-type="cards-grid"][data-v-2a183b29]:after {
      width: 10%;
    }
  }
  @media (min-width: 1201px) and (max-width: 1500px) {
    section[data-type="cards-grid"][data-v-2a183b29]:before, section[data-type="cards-grid"][data-v-2a183b29]:after {
      display: none;
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    section[data-type="cards-grid"][data-v-2a183b29]:before, section[data-type="cards-grid"][data-v-2a183b29]:after {
      display: none;
    }
    section[data-type="main-search"] {
      h1 {
        max-width: 60%;
      }
    }
    section[data-type="items-grid"] {
      .grid {
        margin: -150px -8px 0;
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    section[data-type="cards-grid"] {
      .center {
        padding: 0 20px;
      }

      .swiper-slide {
        flex: 0 0 50%;
        max-width: 50%;
      }
    }

    section[data-type="cards-grid"][data-v-2a183b29]:before, section[data-type="cards-grid"][data-v-2a183b29]:after {
      display: none;
    }
    section[data-type="main-search"] {
      padding-top: 300px;
      position: relative;
      overflow: hidden;

      h1 {
        max-width: 80%;
      }
    }
    section[data-type="items-grid"] {
      position: relative;
      z-index: 5;
    }
  }

  // Телефон
  @media (max-width: 767px) {
    section[data-type="cards-grid"] {
      .center {
        padding: 0 10px;
      }

      .swiper-slide {
        flex: 0 0 100%;
        max-width: 100%;
        height: auto;
      }
    }

    section[data-type="cards-grid"][data-v-2a183b29]:before, section[data-type="cards-grid"][data-v-2a183b29]:after {
      display: none;
    }
    section[data-type="main-search"] {
      padding: 264px 0 188px;
      background-size: 160%;
    	background-position: -32% 39%;
      background-image: url('~assets/img/back_eagle_mob.svg');

      .flex-top {
        padding-bottom: 60px;
      }

      h1 {
        max-width: 90%;
      }
    }

    section[data-type="items-grid"] {
      .item {
        margin-bottom: 16px;
      }
      .item.col-6 {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }

    [data-type="cards-grid"] {
      width: 100%;
    	position: relative;
    	overflow: hidden;

      // .center {
      //   overflow: scroll;
      // }

      .grid {
        flex-wrap: nowrap;
        width: 750px;

        &:after {
          content: '';
          display: block;
          width: 0;
          flex: 0 0 10px;
          margin-left: -20px;
        }
      }
    }
  }

  .dis-image {
    section[data-type="main-search"] {
      background-image: none;
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    section[data-type="main-search"] {
      background-color: #fff;
      background-image: none;
      color: #000;

      .center {
        padding-top: 64px;
      }
    }
  }
  // Темная тема для слабовидящих:
  .d-black {
    section[data-type="main-search"] {
      background-color: #000;
      background-image: none;
      color: #fff;

      .center {
        padding-top: 64px;
      }
    }
  }
  // Синяя тема для слабовидящих:
  .d-blue {
    section[data-type="main-search"] {
      background-color: $ddl;
      background-image: none;
      color: $ddk;

      .center {
        padding-top: 64px;
      }
    }
  }
</style>

<template lang="html">
  <div class="full-slider" v-swiper:mySwiper="swiperOption" @click="checkNav">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="slide in slides">
        <img :src="slide.SRC" alt="" v-if="slide.TYPE == 'image'">
        <iframe width="560" height="315" :src="slide.SRC" class="youTube" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen v-else-if="slide.TYPE == 'youtube'"></iframe>
        <video-player :src="slide.SRC" v-else></video-player>
        <p>{{slide.NAME}}</p>
      </div>
    </div>
  </div>
</template>

<script>
const videoPlayer = require('~/components/ui/video-player').default;

export default {
  data() {
    return {
      swiperOption: {
        init: false,
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        // spaceBetween: 16,
        // setWrapperSize: true,
        // width: 1024,
        autoHeight: true,
        speed: 600,
        grabCursor: true,
        on: {
          slideChange() {
            console.log('change');
          }
        }
      },
      sliderCnt: null
    }
  },
  props: {
    slides: Array
  },
  watch: {
    slides: function (newData) {
        this.$nextTick(function() {
          // setTimeout(()=>{
            // this.mySwiper.slideTo(0, 0, false)
            // setTimeout(()=>{
            //   this.mySwiper.updateAutoHeight(1000, false)
            // }, 100);
          // }, 1500);
        })
    }
  },
  mounted() {
            this.mySwiper.init();
  },
  methods: {
    checkNav(event) {
      let elem = event.target || event.srcElement;

      if(elem.classList.contains('swiper-slide-next') || elem.closest('.swiper-slide-next') != null) {
        this.mySwiper.slideNext(500);
      }
      if(elem.classList.contains('swiper-slide-prev') || elem.closest('.swiper-slide-prev') != null) {
        this.mySwiper.slidePrev(500);
      }
    }
  },
  components: {
    videoPlayer
  }
}
</script>

<style lang="scss" scoped>
  .full-slider {
    margin-bottom: 48px;


    .swiper-slide {
      max-width: 1200px;
      margin: 0 8px;
      width: 100%;
      position: relative;
      opacity: 1;
      transition: opacity 0.5s $cubic;

      .youTube {
        width: 100%;
        height: 600px;
      }

      &.swiper-slide-prev {
        opacity: 0.5;

        &.swiper-slide-active {
          opacity: 1;
        }
      }

      &.swiper-slide-next {
        opacity: 0.5;

        &.swiper-slide-active {
          opacity: 1;
        }
      }

      img {
        width: 100%;
      }

      p {
        max-width: 70%;
        color: #fff;
        font-size: em(16);
        line-height: 1.43;
        margin-top: 32px;
      }
    }
  }

  .d-black, .d-white, .d-blue {
    .full-slider {
      margin-top: 40px;
    }
  }
</style>

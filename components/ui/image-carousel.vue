<template lang="html">
  <div class="news-slider" v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="slide in slides">
        <img :src="slide.IMG" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        init: false,
        loop: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        slidesOffsetBefore: 100,
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
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
  .news-slider {
    margin: 40px -40px;

    .swiper-slide {
      max-width: 60%;
      width: 60%;
      position: relative;
      opacity: 1;
      transition: opacity 0.5s $cubic;
      margin-right: 16px;

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

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
      .news-slider {
          margin: 40px -16px;
      }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
      .news-slider {
          margin: 40px -16px;
      }
  }

  // Телефон
  @media (max-width: 767px) {
      .news-slider {
          margin: 40px -20px;
      }
  }
</style>

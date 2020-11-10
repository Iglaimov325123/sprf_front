<template lang="html">
  <div class="item">
    <div class="item-inner flex flex-col">
      <div class="item-content flex flex-top" ref="mySwiper" style="width: 100%" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="slide in info">
            <div class="item-top flex flex-just-b">
              <h3>{{slide.SCOPE.VALUE}}</h3>
              <div class="date">
                {{slide.DATE_CREATE}}
              </div>
            </div>
            <router-link :to="linkForPublication('/checks/'+slide.CODE)"><p>{{slide.NAME}}</p></router-link>
          </div>
        </div>
      </div>
      <div class="item-bottom flex flex-bottom flex-just-b flex-bottom-v">
        <router-link :to="linkForPublication('/checks/')">Все проверки</router-link>
        <div class="item-slide-control">
          <button name="leftSlide" class="left" @click="goPrev"></button>
          <button name="rightSlide" class="right" @click="goNext"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let that;
export default {
  data() {
    return {
      swiperOption: {
        init: true,
        loop: true,
        // slidesPerView: 'auto',
        // centeredSlides: true,
        speed: 600,
        // grabCursor: true,
        autoplay: {
          delay: 3000
        },
        simulateTouch: false,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        on: {
          // slideChange() {
          //   console.log('change');
          // },
          // setTranslate: function(translate) {
          //   // that.$el.querySelector('.swiper-wrapper').style.transform = 'translate(' + translate + 'px, 0)'
          // }
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.mySwiper
    }
  },
  mounted() {
  },
  props: {
    info: Array
  },
  watch: {
    info: function (newData) {
      // console.log('data', newData);
      // alert('updated!')
        that.$nextTick(function() {
          setTimeout(()=>{
            this.mySwiper.init();
            // this.mySwiper.slideTo(0);
            this.mySwiper.autoplay.stop();
            this.mySwiper.autoplay.start();
          }, 1500);
        })
    }
  },
  created() {
    that = this;
  },
  methods: {
    goPrev(e) {
      if(!that.mySwiper.initialized) {
        this.mySwiper.init();
        this.mySwiper.autoplay.start();
      }
      that.mySwiper.slidePrev(500);
    },
    goNext(e) {
      if(!that.mySwiper.initialized) {
        this.mySwiper.init();
        this.mySwiper.autoplay.start();
      }
      that.mySwiper.slideNext(500);
      // console.log(this);
    },
    linkForPublication(link) {
      return this.$store.getters.getLang === 'en' ? '/en' + link : link
    },
  }
}
</script>

<style lang="scss" scoped>
  .item {
    margin-bottom: 32px;

    &:hover {
      .item-inner {
        box-shadow: 0px 4px 8px 0px rgba($lightblue,0.4);
      }
      .item-slide-control {
        .left, .right {
          opacity: 1;
        }
      }
    }

    .item-inner {
      margin: 0 16px;
      background: #fff;
      border-radius: 4px;
      height: 100%;
      box-shadow: 0px 0px 4px 0px rgba($lightblue,0);
      transition: box-shadow 0.35s $cubic;
      position: relative;
      overflow: hidden;
      // padding: 24px 32px 24px 24px;
    }

    .date {
      font-size: em(16);
      line-height: 1.25;
      color: $lightblue;
    }

    .item-top {
      padding: 0 0 20px;
    }

    .item-content {
      padding: 24px 0 37px;

      p {
        font-family: $titlesans;
        font-size: em(20);
        line-height: 1.6;
      }

      .swiper-slide {
        padding: 0 32px 0 24px;

        a {
          color: #000;
          opacity: 1;
          display: block;
          // transition: opacity 0.25s $cubic;

          &:hover {
            opacity: 0.6;
          }
        }
      }
    }

    .item-bottom {
      padding: 0 32px 24px 24px;
      font-size: em(18);
      line-height: 1.77;
    }

    .item-slide-control {
      display: flex;
      justify-content: flex-end;
      margin-bottom: -5px;
    	margin-right: -14px;

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
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .item {
      margin-bottom: 16px;

      .item-inner {
        margin: 0 8px;
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .item {
      margin-bottom: 16px;

      .date {
        white-space: nowrap;
      }

      .item-slide-control {
        display: flex;
        align-items: center;
      }

      .item-content {
        padding: 16px 0 16px;

        .swiper-slide {
          padding: 0 16px;
        }
      }

      .item-bottom {
        padding: 0 16px 16px;
      }

      .item-inner {
        margin: 0 8px;
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .item {
      .date {
        white-space: nowrap;
      }

      .item-content {
        padding: 18px 0 30px;

        .swiper-slide {
          padding: 0 16px;
        }

        h3 {
          font-size: em(28);
        }

        p {
          font-size: 18px;
          line-height: 26px;
        }
      }

      .item-bottom {
        padding: 0 16px 18px;
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .item {
      .date {
        color: #000;
      }
      .item-inner {
        box-shadow: none;
        border: 1px solid #000;

        &:hover {
          box-shadow: none;
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .item {
      .date {
        color: #fff;
      }
      .item-inner {
        box-shadow: none;
        border: 1px solid #fff;
        background: #000;

        &:hover {
          box-shadow: none;
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .item {
      .date {
        color: $ddk;
      }
      .item-inner {
        box-shadow: none;
        border: 1px solid $ddk;
        background: $ddl;

        &:hover {
          box-shadow: none;
        }
      }
    }
  }
</style>

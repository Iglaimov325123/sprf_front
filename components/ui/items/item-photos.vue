<template lang="html">
  <div class="item">
    <div class="item-inner flex flex-col">
      <div class="item-top flex flex-just-b">
        <div class="flex flex-center-v author-list">
          <div :class="['author', index == 0 ? 'active' : '']" v-for="(slide, index) in info" @click="changeSlide(index)">
            <img :src="slide.PERSON.IMG" :alt="slide.PERSON.NAME">
          </div>
        </div>
      </div>
      <div class="item-content" v-swiper:mySwiper="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="slide in info">
            <div class="news-date">
              {{slide.DATE_CREATE}}
            </div>
            <router-link :to="linkForPublication('/news/'+slide.CODE)"><p>{{slide.PREVIEW_TEXT}}</p></router-link>
          </div>
        </div>
      </div>
      <div class="item-bottom flex flex-just-b flex-bottom-v">
        <router-link :to="linkForPublication('/news/')">Все новости</router-link>
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
      authorNodes: null,
      swiperOption: {
        // init: false,
        loop: true,
        // slidesPerView: 'auto',
        // centeredSlides: true,
        speed: 600,
        grabCursor: false,
        autoplay: {
          delay: 3000,
        },
        simulateTouch: false,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        on: {
          slideChangeTransitionStart(data) {
            if(that != null && that.mySwiper != undefined) {
              that.authorNodes = document.querySelectorAll('.author-list .author');
              for(let i = 0; i < that.authorNodes.length; i++) {
                if(i == that.mySwiper.realIndex) {
                  that.authorNodes[i].classList.add('active');
                } else {
                  that.authorNodes[i].classList.remove('active');
                }
              }
            }
          },
          // setTranslate: function(translate) {
          //   that.$el.querySelector('.swiper-wrapper').style.transform = 'translate(' + translate + 'px, 0)'
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
  props: {
    info: Array
  },
  created() {
    that = this;
  },
  mounted() {
    console.log('AUTHOR INFO', this.info);
    // setTimeout(()=>{
    // }, 500);
  },
  watch: {
    info: function (newData) {
      // console.log('data', newData);
      // alert('updated!')
        that.$nextTick(function() {
          this.mySwiper.init();
          this.mySwiper.slideTo(0);
          this.mySwiper.autoplay.stop();
          this.mySwiper.autoplay.start();
        })
    }
  },
  methods: {
    linkForPublication(link) {
      return this.$store.getters.getLang === 'en' ? '/en' + link : link
    },
    changeSlide(index) {
      that.authorNodes = document.querySelectorAll('.author-list .author');
      that.mySwiper.slideTo(index, 500);
      for(let i = 0; i < that.authorNodes.length; i++) {
        if(i == index) {
          that.authorNodes[i].classList.add('active');
        } else {
          that.authorNodes[i].classList.remove('active');
        }
      }
    },
    goPrev(e) {
      if(!that.mySwiper.initialized) {
        this.mySwiper.init();
        this.mySwiper.slideTo(0);
        this.mySwiper.autoplay.stop();
        this.mySwiper.autoplay.start();
      }
      that.mySwiper.slidePrev(500);
    },
    goNext(e) {
      if(!that.mySwiper.initialized) {
        this.mySwiper.init();
        this.mySwiper.slideTo(0);
        this.mySwiper.autoplay.stop();
        this.mySwiper.autoplay.start();
      }
      that.mySwiper.slideNext(500);
      // console.log(this);
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    margin-bottom: 32px;

    .item-inner {
      position: relative;
      overflow: hidden;
    }

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

    .author-list {
      .author {
        flex: 0 0 44px;
        max-width: 44px;
        height: 44px;
        margin-right: 5px;
        opacity: 0.5;
        cursor: pointer;
        transition: opacity 0.5s $cubic;
        position: relative;
        overflow: hidden;
        border-radius: 50%;

        img {
          width: 100%;
          object-fit: cover;
        }

        &:hover {
          opacity: 1;
        }

        &.active {
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
      // padding: 24px 32px 24px 24px;
    }

    .date {
      font-size: em(16);
      line-height: 1.25;
      color: $lightblue;
    }

    .item-top {
      padding: 24px 32px 0 24px;
      position: absolute;
      top: 0;
      left: 0;
    }

    .item-content {
      padding: 20px 0 37px;
      font-size: em(20);
      line-height: 1.6;
      font-family: $titlesans;
      margin-bottom: auto;
      margin-top: 0;
      max-width: 100%;

      .swiper-slide {
        padding: 63px 32px 0 24px;
        max-width: 100%;

        .news-date {
          font-size: 16px;
          line-height: 1.25;
          color: #8B91A9;
          position: absolute;
          top: 2px;
          right: 32px;
          font-family: $textsans;
        }

        a {
          color: #000;
          opacity: 1;
          // transition: opacity 0.25s $cubic;
          display: block;

          &:hover {
            opacity: 0.6;
            // color: #666;
          }
        }
      }
    }

    .item-bottom {
      padding: 0 32px 24px 24px;
      font-size: em(18);
      line-height: 1.77;
      margin-top: auto;
      margin-bottom: 0;
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

      .item-top {
        padding: 16px 16px 0;
      }

      .author-list {
        .author {
          flex: 0 0 40px;
          max-width: 40px;
          height: 40px;
        }
      }

      .item-content {
        .swiper-slide {
          padding: 50px 15px 0 15px;
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

      .item-top {
        padding: 18px 16px 0;
      }

      .item-content {
        padding: 20px 0 30px;

        .swiper-slide {
          padding: 60px 16px 0;

          .news-date {
            right: auto;
          	position: relative;
          	margin-bottom: 15px;
          }
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

  // Отключение изображений:
  .dis-image {
    .item .author-list .author {
      position: relative;
      overflow: hidden;

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid #888;
        border-radius: 50%;
      }

      img {
        opacity: 0;
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

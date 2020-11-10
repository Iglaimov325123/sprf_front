<template lang="html">
  <div class="items-slider-block">
    <div class="item-slide-control">
      <button name="leftSlide" class="left" @click="goPrev"></button>
      <button name="rightSlide" class="right" @click="goNext"></button>
    </div>
    <div class="items-slider" v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="slide in items">
          <div class="slide-inner">
            <div class="item-name">
              {{slide.NAME}}
            </div>
            <div class="item-list">
              <div class="item-value" v-for="(item, index) in slide.ITEMS" v-if="index < 3">
                {{item}}
              </div>
            </div>
            <div class="item-list expand">
              <div class="item-value" v-for="(item, index) in slide.ITEMS" v-if="index >= 3">
                {{item}}
              </div>
            </div>

            <div class="expand-icon" v-if="slide.ITEMS.length > 3" @click="expandItem">
              <i></i>
            </div>
          </div>
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
      // slides: [
      // ],
      swiperOption: {
        // init: false,
        loop: false,
        slidesPerView: 'auto',
        centeredSlides: false,
        speed: 600,
        grabCursor: true,
        // autoHeight: true,
        on: {
          slideChange() {
            console.log('change');
          }
        }
      }
    }
  },
  props: {
    items: Array
  },
  computed: {
    slides: function() {
      return this.items;
    },
    swiper() {
      return this.mySwiper
    }
  },
  created() {
    that = this;
  },
  mounted() {
    // setTimeout(()=>{
    //   if(!that.mySwiper.initialized) {
    //     this.mySwiper.init();
    //   }
    // }, 1500);
  },
  methods: {
    goPrev(e) {
      // if(!that.mySwiper.initialized) {
      //   this.mySwiper.init();
      // }
      that.mySwiper.slidePrev(500);
    },
    goNext(e) {
      // if(!that.mySwiper.initialized) {
      //   this.mySwiper.init();
      // }
      that.mySwiper.slideNext(500);
      // console.log(this);
    },
    expandItem(e) {
      let elem = e.target || e.srcElement,
          item = elem.closest('.slide-inner'),
          expand = item.querySelector('.item-list.expand');

      // if(elem.classList.contains('e'))
      TweenMax.to(elem, 1, {opacity: 0});

      TweenMax.set(expand, {height: 'auto'});
      TweenMax.from(expand, 1, {height: 0, ease: Expo.easeOut});
    },
    update() {
      this.mySwiper.update();
    }
  }
}
</script>

<style lang="scss" scoped>
  .items-slider-block {
    position: relative;

    .item-slide-control {
      position: absolute;
      right: 0;
      top: -70px;

      .left, .right {
        cursor: pointer;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
      .left {
        border-right: 7px solid $lightblue;

        &:hover {
          border-right: 7px solid $darkblue;
        }
      }
      .right {
        border-left: 7px solid $lightblue;
        margin-left: 24px;

        &:hover {
          border-left: 7px solid $darkblue;
        }
      }
    }
  }

  .items-slider {
    margin: 0 -40px;
    position: relative;
    // display: flex;

    .swiper-wrapper {
      display: flex;
    }

    .swiper-slide {
      width: 368px;
      height: 100%;
      // height: 383px;
      overflow: hidden;
      position: relative;
      // padding: 0 20px;

      &:last-child .slide-inner {
        margin: 0 24px;
      }

      .slide-inner {
        background: $carddark;
        height: 100%;
        margin: 0 0 0 24px;
        font-family: $titlesans;
        border-radius: 4px;
        position: relative;

        .expand-icon {
          width: 28px;
          height: 28px;
          position: absolute;
          cursor: pointer;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);

          &:before, &:after {
            content: '';
            display: block;
            position: absolute;
            width: 4px;
            height: 4px;
            background: $blue;
            top: 50%;
            margin-top: -2px;
            border-radius: 50%;
          }

          i {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: $blue;
            margin: -2px 0 0 -2px;
            border-radius: 50%;
          }

          &:before {
            left: 0;
          }
          &:after {
            right: 0;
          }
        }


        .item-name {
          padding: 18px 32px 18px 24px;
          font-size: em(22);
          font-weight: 300;
          background: $cardblue;
          border-radius: 4px 4px 0 0;
        }

        .item-list {
          font-size: em(18);
          line-height: 1.6;
          font-weight: 300;

          &.expand {
            height: 0;
            overflow: hidden;
            position: relative;

            .item-value:last-child {
              background: transparent;
            }
          }

          .item-value {
            padding: 16px 24px;
            background: linear-gradient(to bottom, rgba(125,185,232,0) 0%,rgba(255,255,255,0) 50%,rgba(255,255,255,0.4) 100%);
            min-height: 128px;

            &:last-child {
              border-radius: 0 0 4px 4px;
            }
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    .items-slider-block .item-slide-control {
      top: -62px;
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .items-slider {
      .swiper-slide {
        .slide-inner {
          background: #fff;
          border: 1px solid #000;

          .item-name {
            background: #000;
            color: #fff;
          }

          .item-list {
            .item-value {
              background: #fff;
              border-bottom: 1px solid #000;

              &:last-child {
                border-bottom: 0;
              }
            }
          }

          .expand-icon {
            &:before, &:after, i {
              background: #000;
            }
          }
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .items-slider {
      .swiper-slide {
        .slide-inner {
          background: #000;
          border: 1px solid #fff;

          .item-name {
            background: #fff;
            color: #000;
          }

          .item-list {
            .item-value {
              background: #000;
              border-bottom: 1px solid #fff;

              &:last-child {
                border-bottom: 0;
              }
            }

            &.expand {
              border-top: 1px solid #fff;
            }
          }

          .expand-icon {
            &:before, &:after, i {
              background: #fff;
            }
          }
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .items-slider {
      .swiper-slide {
        .slide-inner {
          background: $ddl;
          border: 1px solid $ddk;

          .item-name {
            background: $ddk;
            color: $ddl;
          }

          .item-list {
            .item-value {
              background: $ddl;
              border-bottom: 1px solid $ddk;

              &:last-child {
                border-bottom: 0;
              }
            }

            &.expand {
              border-top: 1px solid $ddk;
            }
          }

          .expand-icon {
            &:before, &:after, i {
              background: $ddk;
            }
          }
        }
      }
    }
  }
</style>

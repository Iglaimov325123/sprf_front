<template>
  <div class="page-content" data-type="history">
      <div class="history-load">
        <div class="history-year">
          Счетная палата<br><i>Российской Федерации</i>
          <div class="history-year">
            25<div class="load-fill">25</div> <span>лет</span>
          </div>
        </div>
      </div>

      <div class="year-slides">
        <div class="year-slider">
          <div class="slider-controls">
            <div class="center">
              <div class="prev" @click="goToPrev"></div><div class="next" @click="goToNext"></div>
            </div>
          </div>
          <div class="item-content flex flex-top" ref="otSwiper" style="width: 100%" v-swiper:otSwiper="swiperOptionMain">
            <div class="swiper-wrapper">

              <template v-for="(year, index) in history">
                <div class="swiper-slide" v-for="date in year.DATES">
                  <div class="slide-content flex flex-center-v" :data-year="year.YEAR" :data-month="date.MONTH" :data-day="date.DAY" :data-id="date.ID">
                    <div class="center flex col-12">

                      <div class="col-4 flex flex-center-v flex-wrap">
                        <div class="slide-text">
                          <div class="scroll-text">
                            <div class="text-desc" v-html="date.TEXT"></div>
                          </div>
                          <person-small :name="date.PERSON.NAME" :photo="date.PERSON.PREVIEW_PICTURE" :pos="date.PERSON.POSITION" :dark="true"></person-small>
                        </div>
                      </div>
                      <div class="col-3 slide-preview">
                        <div class="slide-container">
                          <img :src="date.PICTURE" :alt="date.DAY+' '+date.MONTH" v-if="date.PICTURE">
                          <!-- <img :src="date.VIDEO" alt=""> -->
                          <!-- {{date}} -->
                          <img :src="date.VIDEO_POSTER" :alt="date.DAY+' '+date.MONTH" v-if="date.VIDEO_POSTER">
                          <!-- <video id="slide_video" playsinline v-if="date.VIDEO">
                            <source :src="date.VIDEO" type="video/mp4">
                          </video> -->
                          <button class="play-button" title="Play" v-if="date.VIDEO" @click="openPlayer(date.VIDEO)">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 27.71">
                              <path d="M20,13.86,2,27.71V0Z"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div class="col-5 flex flex-col">
                        <div class="flex flex-top flex-just-e">
                          <div class="slide-date">
                            {{date.DAY}} {{date.MONTH}} <div class="year">{{year.YEAR}}</div>
                          </div>
                        </div>
                        <div class="flex flex-bottom flex-just-e">
                          <div class="history-info">
                            Счетная палата<br><i>Российской Федерации</i>
                            <div class="history-year">
                              25 <span>лет</span>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </template>

            </div>
          </div>
        </div>
      </div>

      <div class="history-nav">
        <div class="center">
          <div class="item-content flex flex-top" ref="mySwiper" style="width: 100%" v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">

              <div class="swiper-slide" v-for="year in history" @click="activeItem($event, year)" :data-slides="year.DATES.length">
                <div class="year">{{year.YEAR}}</div>
                <div class="date-list">
                  <div class="date" v-for="(date, index) in year.DATES" @click="activeDate($event, date)" :data-year="year.YEAR" :data-month="date.MONTH" :data-day="date.DAY" :data-id="date.ID">{{date.DAY}} {{date.MONTH}}</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="video-overlay"></div>
      <div id="custom-player">
        <div class="center">
          <video-player ref="videoModal" :src="openVideo">
            <div class="close-video" @click="closeVideo"></div>
          </video-player>
        </div>
      </div>
  </div>
</template>

<script>
import Scrollbar from 'smooth-scrollbar';

const videoPlayer = require('~/components/ui/video-player').default;
const personSmall = require('~/components/ui/person/person-info').default;

let that;
export default {
  layout: 'dnofooter',

  async asyncData (context, params, store) {
    let history = await context.app.$axios.get('/history/list')
    console.log(history)
    return { seo: history.data.seo, history: history.data.result }
  },
  components: {
    personSmall,
    videoPlayer
  },
  data() {
    return {
      history: [],
      seo: {},
      openVideo: '',
      slides: [
        {
          year: 1994,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 15, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
        {
          year: 1995,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 14, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
        {
          year: 1998,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 16, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
        {
          year: 1999,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 12, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
        {
          year: 2000,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 12, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
        {
          year: 2001,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 12, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
        {
          year: 2002,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 12, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
        {
          year: 2003,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 12, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
        {
          year: 2004,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 12, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
        {
          year: 2005,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 12, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
        {
          year: 2006,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 12, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
        {
          year: 2007,
          dates: [
            {day: 11, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
            {day: 12, month: 'май', picture: '/img/o.png', text: 'test', person: {}},
          ]
        },
      ],

      navs: [],
      alldates: [],

      swiperOptionMain: {
        init: true,
        loop: false,
        pagination: false,
        speed: 1000,
        grabCursor: true,
        spaceBetween: 300,
        watchOverflow: true,
        keyboard: {
          enabled: true
        },
        on: {
          slideChangeTransitionStart() {
            console.log('slideChangeTransitionStart');
            let slide = that.alldates[that.oswiper.realIndex],
                scrollBar = that.allslides[that.oswiper.realIndex].scrollBar

            console.log(scrollBar);
            that.allslides[that.oswiper.realIndex].classList.remove('completed')
            scrollBar.setPosition(0, 0)
            scrollBar.scrollTo(0, scrollBar.limit.y+50, scrollBar.limit.y * 50, {
              callback: () => that.allslides[that.oswiper.realIndex].classList.add('completed'),
            });

            // console.log('scrollbar', mainSlide.scrollBar)
      //             for(let i = 0; i < this.allslides.length; i++) {
      //   this.allslides[i].scrollBar = Scrollbar.init(this.allslides[i].querySelector('.scroll-text'));
      // }

            let id = slide.dataset.id,
                year = 0;

            // Перебираем даты
            let dates = document.querySelectorAll('.history-nav .swiper-slide [data-id]');
            for(let i = 0; i < dates.length; i++) {
              if(dates[i].dataset.id == slide.dataset.id) {
                dates[i].classList.add('active');
                year = dates[i].dataset.year;
              } else {
                dates[i].classList.remove('active');
              }
            }

            // Получаем текущий год:
            let nav = Array.from(dates).filter(slide => slide.dataset.year == year),
                yearIndex = Array.from(that.navs).indexOf(nav[0].closest('.swiper-slide'))

            let elem = that.navs[yearIndex]
            for(let i = 0; i < that.navs.length; i++) {
              if(that.navs[i] == elem) {
                that.navs[i].classList.add('selected');
                TweenMax.to(that.navs[i], 1, {width: window.innerWidth < 768 ? Number(elem.dataset.slides) * 80 + 80 : Number(elem.dataset.slides) * 140 + 140, ease: Expo.easeInOut});
                TweenMax.to(that.navs[i].querySelector('.date-list'), 1, {width: window.innerWidth < 768 ? Number(elem.dataset.slides) * 80 : Number(elem.dataset.slides) * 140, ease: Expo.easeInOut});
                that.swiper.slideTo(i);
              } else {
                that.navs[i].classList.remove('selected');
                TweenMax.to(that.navs[i], 1, {width: window.innerWidth < 768 ? 80 : 140, clearProps: 'all', ease: Expo.easeInOut});
                TweenMax.to(that.navs[i].querySelector('.date-list'), 1, {width: 0, ease: Expo.easeInOut});
              }
            }
          },
        }
      },

      swiperOption: {
        init: true,
        loop: false,
        pagination: false,
        slidesPerView: 'auto',
        centeredSlides: false,
        centeredSlidesBounds: true,
        normalizeSlideIndex: false,
        speed: 1000,
        on: {
          slideChangeTransitionStart() {
            console.log('slideChangeTransitionStart');
            console.log(that.oswiper.realIndex)
          },
          progress(progress) {
            console.log('slideChangeTransitionStart');
            console.log(that.oswiper.realIndex, progress)
          }
        }
      }
    }
  },
  created() {
    that = this;
  },
  mounted() {
    this.navs = document.querySelectorAll('.history-nav .swiper-slide')
    this.alldates = document.querySelectorAll('.year-slider .slide-content')
    this.allslides = document.querySelectorAll('.year-slider .swiper-slide')

    this.$nextTick(function() {

      for(let i = 0; i < this.allslides.length; i++) {
        this.allslides[i].scrollBar = Scrollbar.init(this.allslides[i].querySelector('.scroll-text'));
      }

      let item = that.history[0];
      let slide = Array.from(this.alldates).filter(slide => Number(slide.dataset.id) == item.DATES[0].ID),
          slideIndex = Array.from(this.alldates).indexOf(slide)
      console.log(slide, slideIndex);

      let elem = this.navs[0];
      if(!elem.classList.contains('swiper-slide')) {
        elem = elem.closest('.swiper-slide');
      }

      for(let i = 0; i < this.navs.length; i++) {
        if(this.navs[i] == elem) {
          this.navs[i].classList.add('selected');
          TweenMax.to(this.navs[i], 1, {width: window.innerWidth < 768 ? item.DATES.length * 80 + 80 : item.DATES.length * 140 + 140, ease: Expo.easeInOut});
          TweenMax.to(this.navs[i].querySelector('.date-list'), 1, {width: window.innerWidth < 768 ? item.DATES.length * 80 : item.DATES.length * 140, ease: Expo.easeInOut});
          this.mySwiper.slideTo(i, 1000);
        } else {
          this.navs[i].classList.remove('selected');
          TweenMax.to(this.navs[i], 1, {width: window.innerWidth < 768 ? 80 : 140, clearProps: 'all', ease: Expo.easeInOut});
          TweenMax.to(this.navs[i].querySelector('.date-list'), 1, {width: 0, ease: Expo.easeInOut});
        }
      }
    })

    TweenMax.to('.history-load .load-fill', 4, {height: 0, ease: SlowMo.ease.config(0.1, 0.4, false), onComplete() {
    }})

      TweenMax.to('.history-load', 2, {opacity: 0, force3D: true, delay: 4, ease: Power4.easeInOut, onComplete() {
        document.querySelector('.history-load').style.display = 'none';
      }})

  },
  methods: {
    goToPrev() {
      this.oswiper.slidePrev();
    },
    goToNext() {
      this.oswiper.slideNext();
    },
    openPlayer(video) {
      console.log(video);
      this.openVideo = video;

      this.$refs.videoModal.updateVideo();

      TweenMax.to('#custom-player', 2, {opacity: 1, ease: Expo.easeInOut, onStart() {
        document.querySelector('#custom-player').style.display = 'block';
      }})
      TweenMax.to('.video-overlay', 2, {opacity: 0.9, ease: Expo.easeInOut, onStart() {
        document.querySelector('.video-overlay').style.display = 'block';
      }})
    },

    closeVideo(e) {
      e.preventDefault();

      this.$refs.videoModal.stopVideo();

      TweenMax.to('#custom-player', 2, {opacity: 0, ease: Expo.easeInOut, onComplete() {
        document.querySelector('#custom-player').style.display = 'none';
      }})
      TweenMax.to('.video-overlay', 2, {opacity: 0, ease: Expo.easeInOut, onComplete() {
        document.querySelector('.video-overlay').style.display = 'none';
      }})
    },

    activeDate(e, date) {
      e.stopPropagation();
      let slideIndex = 0;
      for(let i = 0; i < this.alldates.length; i++) {
        if(Number(this.alldates[i].dataset.id) == date.ID) {
          slideIndex = i;
        }
      }

      this.oswiper.slideTo(slideIndex, 1000);
    },

    activeItem(e, item) {
      e.stopPropagation();
      let slideIndex = 0;
      for(let i = 0; i < this.alldates.length; i++) {
        if(Number(this.alldates[i].dataset.id) == item.DATES[0].ID) {
          slideIndex = i;
        }
      }

      this.oswiper.slideTo(slideIndex, 1000);
    }
  },
  computed: {
    swiper() {
      return this.mySwiper
    },
    oswiper() {
      return this.otSwiper
    }
  },
}
</script>

<style lang="scss" scoped>
    [data-type="history"] {
        height: 100vh;
    }

    .history-load {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $darkblue;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 100px;

      .history-year {
        font-size: em(32);
        font-family: $titlesans;
        line-height: 140%;
        color: #fff;

        .history-year {
          font-size: em(240, 32);
          line-height: 140%;
          display: flex;
          align-items: flex-start;
          margin-top: -20px;
          position: relative;
          color: #fff;
          -webkit-text-stroke: 1px #fff; 
          text-stroke: 1px #fff;
  
          .load-fill {
            top: 0; 
            left: 0;
            // width: 100%;
            height: 100%;
            color: #04092A;
            overflow: hidden;
            position: absolute;
            content:'25';
            // transition: all 0.9s;
          }

          span {
            font-size: em(64, 240);
            line-height: 140%;
            display: block;
            margin-left: 5px;
            margin-top: em(100, 240);
          }
        }
      }

    }

      // .swiper-slide {
      //   &.completed {
      //     .slide-text .scroll-text .text-desc {
      //           padding-top: 40px;
      //     }
      //   }
      // }

      // <div class="history-load">
      //   <div class="history-year">
      //     25 <span>лет</span>
      //   </div>
      // </div>

    .col-4, .col-5 {
      position: relative;
      z-index: 5;
    }

    .slide-preview {
      position: relative;
      // z-index: -1;

      .slide-container {
        position: absolute;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 60vw;
        transform: translate3d(-50%, -50%, 0);
        height: auto;
        min-height: 60vw;

        .play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          width: 50px;
          height: 50px;

          &:hover {
            svg {
              path {
                fill: $cyan;
              }
            }
          }

          svg {
            path {
              fill: #fff;
              transition: fill 0.3s $cubic;
            }
          }
        }

        &:before {
          content: '';
          display: block;
          position: absolute;
          top: -1%;
          left: -1%;
          width: 102%;
          height: 102%;
          background: radial-gradient(ellipse at center, rgba(125,185,232,0) 0%,rgba(#04092A,1) 70%);
          z-index: 50;
          pointer-events: none;
        }
      }

      img, video {
        width: 100%;
        max-width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .history-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 50;
      color: #fff;
      // padding-left: em(80);

      > div, .swiper-container {
        overflow: visible;
      }

      .center {
        padding: 0 70px;
      }

      .swiper-slide {
        display: flex;
        font-size: em(12);
        font-family: $titlesans;
        line-height: 1.44;
        // flex: 0 0 140px;
        width: 140px;
        // max-width: 140px;
        cursor: pointer;
        overflow: visible;

        &.selected {
          max-width: none;
          flex: 0 0 auto;

          .year {
            transform: scale(1.5);
          }
        }

        .year {
          text-align: center;
          width: 140px;
          position: relative;
          padding-bottom: 16px;
          transform: scale(1);
          will-change: transform;
          transform-origin: center bottom;
          transition: transform 0.5s $cubic;

          &:before {
            content: '';
            width: 1px;
            height: 8px;
            background: #fff;
            opacity: 0.4;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
          }
        }

        .date-list {
          width: 0;
          position: relative;
          overflow: hidden;
          display: flex;

          .date {
            flex: 0 0 140px;
            max-width: 140px;
            text-align: center;
            position: relative;
            color: $midblue;
            transition: color 0.5s $cubic;

            &.active {
              color: #fff;
            }

            &:before {
              content: '';
              width: 1px;
              height: 8px;
              background: #fff;
              opacity: 0.4;
              position: absolute;
              left: 50%;
              bottom: 0;
              transform: translateX(-50%);
            }
          }
        }
      }
    }

    .year-slides {
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;

      .slider-controls {
        position: absolute;
        bottom: 143px;
        width: 100%;
        z-index: 100;
        pointer-events: none;

        .center {
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .prev, .next {
          width: 22px;
          height: 22px;
          position: relative;
          cursor: pointer;
          pointer-events: all;
        }

        .prev {
          &:before {
            content: '';
            position: absolute;
            top: 50%;
            margin-top: -4px;
            left: -4px;
            border: 4px solid transparent; border-right: 8px solid #8B91A9;
          }

          &:hover {
            &:before {
              border-right: 8px solid #fff;
            }
          }
        }
        .next {
          &:before {
            content: '';
            position: absolute;
            top: 50%;
            margin-top: -4px;
            right: -4px;
            border: 4px solid transparent; border-left: 8px solid #8B91A9;
          }

          &:hover {
            &:before {
              border-left: 8px solid #fff;
            }
          }
        }
      }

      .year-slider {
        color: #fff;
        height: 100%;

        .swiper-container {
          height: 100%;
        }

        .slide-content {
          height: 100%;

          .center {
            height: 100%;
            padding-top: 120px;
            padding-bottom: 160px;
          }
        }
      }
    }

    .flex-top, .flex-bottom {
      text-align: right;
    }

        /deep/ .scrollbar-track {
          display: none!important;
        }

    .slide-text {
      text-align: left;
      width: 100%;
      // height: 100%;
      padding-top: 100%;
      position: relative;
      height: 0;

      .scroll-text {
        font-size: em(24);
        line-height: 1.44;
        font-family: $titlesans;
        margin-bottom: 32px;
        overflow: hidden;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        // height: 300px;
        -webkit-mask-image: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%);

        .text-desc {
          position: absolute;
          padding-top: 100%;
          width: 100%;
          padding-bottom: 40px;

          // &:first-child {
          //   padding-top: 50px;
          //   animation: marquee 16s linear infinite;
          // }

          // &:last-child {
          //   animation: marquee 16s linear infinite;
          //   animation-delay: 8s;
          //   opacity: 0;
          //   padding-top: 50px;
          // }
        }
      }
    }

    @keyframes marquee {
      from { transform: translateY(100%); opacity: 1; }
      to { transform: translateY(-100%); opacity: 1; }
    }

    // @keyframes marquee1 {
    //   from { transform: translateY(100%) }
    //   to { transform: translateY(-200%) }
    // }

    .slide-date {
      font-size: em(48);
      font-family: $titlesans;
      line-height: 75%;

      .year {
        display: block;
        font-size: em(200, 48);
        line-height: 144%;
      }
    }

    .history-info {
      font-size: em(20);
      font-family: $titlesans;
      line-height: 140%;    
      margin-bottom: -75px;

      .history-year {
        font-size: em(80);
        line-height: 140%;
        display: flex;
        align-items: flex-start;

        span {
          font-size: em(32, 80);
          line-height: 140%;
          display: block;
          margin-left: 5px;
          margin-top: em(5, 80);
        }
      }
    }

    .video-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #04092A;
      opacity: 0;
      will-change: opacity;
      pointer-events: none;
      z-index: 1990;
      display: none;
    }

    #custom-player {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      // height: 100%;
      height: 100%;
      opacity: 0;
      // height: 0;
      // pointer-events: none;
      overflow: hidden;
      will-change: auto;
      z-index: 2000;
      display: none;

      .center {
        height: 100%;
        position: relative;
      }

      // &:before {
      //   content: '';
      //   width: 100%;
      //   height: 100%;
      //   display: block;
      //   top: 0;
      //   left: 0;
      //   position: absolute;
      // }
      // transition: height 1s $cubic;

      .custom-player {
        position: absolute;
        top: 50%;
        left: 40px;
        // width: 100%;
        right: 40px;
        width: auto;
        height: 65vh;
        max-height: 810px;
        pointer-events: all;
        // margin: -22vh 0 0 0;
        transform: translateY(-50%);

        .close-video {
          position: absolute;
          top: -50px;
          right: 0;
          width: 30px;
          height: 30px;
          cursor: pointer;
          transition: transform 0.3s $cubic;
          transform: scale(1);

          &:hover {
            transform: scale(0.95);

            &:before, &:after {
              background: $cyan;
            }
          }

          &:before, &:after {
            content: '';
            display: block;
            width: 30px;
            height: 2px;
            background: #fff;
            position: absolute;
            top: 0;
            right: 0;
            transition: background 0.3s $cubic;
          }

          &:before {
            transform: rotate(45deg);
          }
          &:after {
            transform: rotate(-45deg);
          }

        }

        /deep/ .custom-video {
          height: 100%;
          background: #000;
        }
      }
    }

    // Мелкий десктоп
    @media (min-width: 1024px) and (max-width: 1200px) {
      .slide-date {
        font-size: em(30);
      }
      .history-info {
        font-size: em(14);
      }

      .slide-text {
        width: 80%;

        .scroll-text {
          height: 150px;
          font-size: em(18);
        }
      }

      .slide-content {
        .col-3 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
        }

        .col-5 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
        }
      }
    }

    // Планшет
    @media (min-width: 768px) and (max-width: 1023px) {
      .slide-date {
        font-size: em(30);
      }
      .history-info {
        font-size: em(14);
      }

      .slide-text {
        width: 80%;

        .scroll-text {
          height: 150px;
          font-size: em(18);
        }
      }

      .slide-content {
        .col-3 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
        }

        .col-5 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
        }
      }

      @media (orientation: portrait) {
        .slide-content {
          .center.flex {
            flex-wrap: wrap;
          }

          .col-4, .col-3, .col-5 {
            flex: 0 0 100%;
            max-width: 100%;

            height: 33.333%;
          }

          .col-3 {
            height: 40%;
          }
        }

        .slide-preview {
          .slide-container {
            width: 80vw;
            height: 80vw;
          }
        }

        .col-5 {
          flex-wrap: wrap;
          align-items: space-between;
          justify-content: center;

          .flex-top {
            text-align: left;
            justify-content: flex-start;
          }

          > div {
            flex: 0 0 50%;
            max-width: 50%;
            margin-top: 0;
            margin-bottom: 0;
          }
        }

        .slide-text {
          width: 50%;
        }
      }
    }

    // Телефон
    @media (max-width: 767px) {
      .history-load {
        .history-year {
          font-size: em(20);

          .history-year {
            font-size: em(80);
            margin-top: 0;
          }
        }
      }

      .slide-content {
        .center.flex {
          flex-wrap: wrap;
        }
        .col-4, .col-3, .col-5 {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .col-5 {
          order: 1;

          .flex-bottom {
            display: none;
          }
        }

        .col-3 {
          height: 60vh;
          order: 2;
          flex: 0 0 60vw;
          
        }

        .col-4 {
          order: 3;
        }
      }

      .slide-date {
        font-size: em(24);

        .year {
          line-height: 1.2;
        }
      }

      .slide-preview {
        width: 100%;

        .slide-container {
          width: 120vw;
          min-height: 100vw;
        }
      }

      .year-slides {
        .year-slider {
          &:before, &:after {
            content: '';
            display: block;
            position: absolute;
            // top: 0;
            left: 0;
            width: 100%;
            z-index: 10;
          }

          &:before {
            top: 0;
            height: 100px;
            background: linear-gradient(to bottom, rgba(4,9,42,1) 0%,rgba(4,9,42,1) 35%,rgba(4,9,42,0) 100%);
          }

          &:after {
            bottom: 0;
            height: 150px;
            background: linear-gradient(to bottom, rgba(4,9,42,0) 0%,rgba(4,9,42,1) 65%,rgba(4,9,42,1) 100%);
          }

          .slide-content {
            position: relative;
            overflow-y: scroll;
            overflow-x: hidden;
            align-items: flex-start;

            .center {
              padding-top: 100px;
              height: auto;
              flex-direction: column;
              padding-bottom: 0;
            }
          }
        }
      }

      .slide-text {
        padding-bottom: 100px;

        .scroll-text {
          height: auto;

          .text-desc {
            position: relative;

            &:first-child {
              animation: none;
            }

            &:nth-child(2) {
              display: none;
            }
          }
        }
      }

      #custom-player .custom-player {
        left: 0;
        right: 0;

        .close-video {
          top: -30px;
          right: 15px;
        }
      }

      .history-nav {
        .swiper-slide {
          width: 80px;
          
          .year {
            width: 80px;
          }

          .date-list {
            .date {
              flex: 0 0 80px;
              max-width: 80px;
            }
          }
        }
      }
    }
</style>
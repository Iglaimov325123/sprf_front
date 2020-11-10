<template lang="html">
  <div class="custom-player">
     <slot></slot>
     <video class="custom-video" controls @click="toggleState">
        <source :src="src" type="video/mp4">
     </video>
     <div class="video-controls">
       <button class="play-button" title="Play" @click="toggleState">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 27.71">
           <path d="M20,13.86,2,27.71V0Z"/>
         </svg>
       </button>

       <div class="video-timer" @mouseover="startTimeChange" @mouseleave="endTimeChange" @mousemove="changingTime" @click="applyTimeChange">
         <div class="video-line-inner">
           <div class="video-line" style="width: 0%">
             <div class="video-line-time">
               {{curTime}}
             </div>
           </div>
          </div>
       </div>

       <div class="video-total-time">
         {{totalTime}}
       </div>

       <div class="video-volume" @mousedown="startChangeVolume" @click="changeVolume" @mouseup="endChangeVolume">
         <div class="current-volume">

         </div>
       </div>

       <button class="video-fullscreen" title="Full Screen" @click="goFullScreen">
       </button>
     </div>
  </div>
</template>

<script>
const MorphSVG = require('gsap/src/uncompressed/plugins/MorphSVGPlugin');

export default {
  data() {
    return {
      mediaPlayer: null,
      totalTime: '00:00',
      curTime: '00:00',
      timeChanging: false,
      timeChangePercent: 0,
      saveTime: 0
    }
  },
  props: {
    src: String
  },
  created() {

  },
  mounted() {
    this.mediaPlayer = this.$el.querySelector('.custom-video');
    this.mediaPlayer.controls = false;

    this.mediaPlayer.addEventListener('durationchange', this.onDurationChange);
    this.mediaPlayer.addEventListener("timeupdate", this.onTimeUpdate);
    this.mediaPlayer.addEventListener("ended", this.refreshVideo);
    this.onDurationChange();
    console.log(this);
  },
  methods: {
    updateVideo() {
      this.mediaPlayer.load();
      this.onDurationChange();
    },
    stopVideo() {
      this.mediaPlayer.pause();
    },
    refreshVideo(e) {
       var btn = this.$el.querySelector('.play-button');
       btn.title = 'Play';
       btn.classList.remove('played');
       btn.classList.add('paused');
       this.mediaPlayer.pause();

       TweenMax.to(btn.querySelector('path'), 1, {morphSVG: 'M20,13.86,2,27.71V0Z', ease: Expo.easeOut})
       TweenMax.to(this.$el.querySelector('.video-line-time'), 1, {opacity: 0, force3D: true, ease: Expo.easeOut})

       this.mediaPlayer.currentTime = 0;
       this.timeChanging = false;
    },
    toggleState(e) {
      var btn = this.$el.querySelector('.play-button');
      if (this.mediaPlayer.paused || this.mediaPlayer.ended) {
         btn.title = 'Pause';
         btn.classList.add('played');
         btn.classList.remove('paused');
         this.mediaPlayer.play();

         TweenMax.to(btn.querySelector('path'), 1, {morphSVG: 'M6,1.86H0v24H6Zm14,0H14v24h6Z', ease: Expo.easeOut})
         TweenMax.to(this.$el.querySelector('.video-line-time'), 1, {opacity: 1, force3D: true, ease: Expo.easeOut})
         // <path d="M20,13.86,2,27.71V0Z"/>
      }
      else {
         btn.title = 'Play';
         btn.classList.remove('played');
         btn.classList.add('paused');
         this.mediaPlayer.pause();

         TweenMax.to(btn.querySelector('path'), 1, {morphSVG: 'M20,13.86,2,27.71V0Z', ease: Expo.easeOut})
         TweenMax.to(this.$el.querySelector('.video-line-time'), 1, {opacity: 0, force3D: true, ease: Expo.easeOut})
         // <path d="M6,1.86H0v24H6Zm14,0H14v24h6Z"/>
      }
    },
    onDurationChange() {
      if(this.mediaPlayer.readyState){
        var minutes = parseInt(this.mediaPlayer.duration / 60, 10);
        var seconds = parseInt(this.mediaPlayer.duration % 60);

        if(minutes < 10) {
          minutes = '0'+minutes
        }
        if(seconds < 10) {
          seconds = '0'+seconds
        }

        this.totalTime = minutes+':'+seconds;

        TweenMax.to(this.$el.querySelector('.current-volume'), 0.1, {width: (this.mediaPlayer.volume * 100)+'%'});
  		}
    },
    onTimeUpdate() {
      if(this.mediaPlayer.readyState){
        if(!this.timeChanging) {
          var minutes = parseInt(this.mediaPlayer.currentTime / 60, 10);
          var seconds = parseInt(this.mediaPlayer.currentTime % 60);

          if(minutes < 10) {
            minutes = '0'+minutes
          }
          if(seconds < 10) {
            seconds = '0'+seconds
          }

          this.curTime = minutes+':'+seconds;

          // Получение процента воспроизведения:
          let percent = this.mediaPlayer.currentTime / this.mediaPlayer.duration * 100;
          TweenMax.to(this.$el.querySelector('.video-line'), 1, {width: (percent)+'%', easing: Power0.easeNone});
        }
  		}
    },
    startChangeVolume(e) {
      // this.volumeChanging = true;
    },
    changeVolume(e) {
      let elem = e.target || e.srcElement,
          elemParams = elem.getBoundingClientRect(),
          elemCoord = elemParams.x,
          mouseX = e.clientX

      // Рассчитываем координаты относительно экрана:
      let mixCord = mouseX - elemCoord,
          percent = mixCord / elemParams.width

      if(percent < 0) {
        percent = 0;
      }
      if(percent > 1) {
        percent = 1;
      }

      this.mediaPlayer.volume = percent;
      TweenMax.to(this.$el.querySelector('.current-volume'), 0.1, {width: (percent * 100)+'%'});
    },
    endChangeVolume(e) {
      // this.volumeChanging = false;
    },
    goFullScreen(e) {
      if (this.mediaPlayer.requestFullscreen) {
        this.mediaPlayer.requestFullscreen();
      } else if (this.mediaPlayer.mozRequestFullScreen) { /* Firefox */
        this.mediaPlayer.mozRequestFullScreen();
      } else if (this.mediaPlayer.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        this.mediaPlayer.webkitRequestFullscreen();
      } else if (this.mediaPlayer.msRequestFullscreen) { /* IE/Edge */
        this.mediaPlayer.msRequestFullscreen();
      }
    },

    // Перемотка
    startTimeChange(e) {
      this.timeChanging = true;
      this.saveTime = this.mediaPlayer.currentTime;
    },
    endTimeChange(e) {
      this.timeChanging = false;
      let percent = this.saveTime / this.mediaPlayer.duration * 100;
      TweenMax.set(this.$el.querySelector('.video-line'), {width: percent+'%', force3D: true, easing: Power0.easeNone});
    },
    changingTime(e) {
      if(this.timeChanging) {
        // timeChangePercent
        let elem = this.$el.querySelector('.video-timer'),
            elemParams = elem.getBoundingClientRect(),
            elemCoord = elemParams.x,
            mouseX = e.clientX

        // Рассчитываем координаты относительно экрана:
        let mixCord = mouseX - elemCoord,
            percent = mixCord / elemParams.width

        if(percent < 0) {
          percent = 0;
        }
        if(percent > 1) {
          percent = 1;
        }

        console.log('time change percent', percent);

        var minutes = parseInt((this.mediaPlayer.duration * percent) / 60, 10);
        var seconds = parseInt((this.mediaPlayer.duration * percent) % 60);

        if(minutes < 10) {
          minutes = '0'+minutes
        }
        if(seconds < 10) {
          seconds = '0'+seconds
        }

        this.curTime = minutes+':'+seconds;
        this.timeChangePercent = this.mediaPlayer.duration * percent;

        // Получение процента воспроизведения:
        let playPerc = (this.mediaPlayer.duration * percent) / this.mediaPlayer.duration * 100;
        TweenMax.set(this.$el.querySelector('.video-line'), {width: (playPerc)+'%', force3D: true, easing: Power0.easeNone});
      }
    },
    applyTimeChange(e) {
      this.mediaPlayer.currentTime = this.timeChangePercent;
      this.timeChanging = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-player {
    width: 100%;
    position: relative;

    video {
      width: 100%;
    }

    .video-controls {
      display: flex;
      position: absolute;
      z-index: 50;
      bottom: 24px;
      left: 24px;
      right: 24px;
      align-items: center;

      &:before {
        content: '';
        display: block;
        position: absolute;
        left: -24px;
        bottom: -24px;
        right: -24px;
        height: 100px;
        background: linear-gradient(to bottom, rgba(#000, 0) 0%, rgba(#000, 0.5) 100%);
        z-index: -1;
      }

      // Кнопка паузы и плея
      .play-button {
        width: 32px;
        height: 28px;
        display: block;
        margin-right: 32px;
        flex: 0 0 32px;

        svg {
          max-width: 20px;
          max-height: 28px;
        }

        path {
          fill: #fff;
        }
      }

      // Таймлайн проигрывателя
      .video-timer {
        height: 24px;
        display: flex;
        align-items: center;
        flex-grow: 5;

        .video-line-inner {
          height: 2px;
          width: 100%;
          background: #fff;

          .video-line {
            background: #22EBDF;
            height: 2px;
            position: relative;
          }

          .video-line-time {
            position: absolute;
            display: flex;
            align-items: center;
            height: 28px;
            padding: 0 8px;
            background: rgba($darkblue, 0.8);
            border-radius: 2px;
            font-size: 18px;
            color: #fff;
            right: 0;
            bottom: 10px;
            transform: translateX(50%);
            opacity: 0;
            will-change: opacity;
          }
        }
      }

      // Полностью все время видео
      .video-total-time {
        display: flex;
        align-items: center;
        height: 28px;
        padding: 0 8px;
        background: #fff;
        border-radius: 2px;
        font-size: 18px;
        color: #000;
        margin-left: 32px;
      }

      .video-volume {
        flex: 0 0 26px;
        max-width: 26px;
        height: 20px;
        position: relative;
        margin-left: 24px;
        background: url('~assets/img/volume_off.svg') no-repeat center;

        .current-volume {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          background-image: url('~assets/img/volume_on.svg');
          background-size: 26px 20px;
          background-repeat: no-repeat;
        }
      }

      .video-fullscreen {
        width: 20px;
        height: 20px;
        // background: #fff;
        margin-left: 24px;
        background-image: url('~assets/img/fullScreen.svg');
      }
    }
  }
</style>

<template lang="html">
  <div class="icon-block icon-download" @click="expandShare">
    <div class="news-share">
      <!-- Page print -->
      <div class="print-page" @click="printPage" title="Печать страницы">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 22">
          <path d="M26,6H20V1H6V6H0V20H4v3H22V20h4ZM8,3H18V6H8ZM20,21H6V17H20Zm4-3H22V15H4v3H2V8H24Z" transform="translate(0 -1)" fill="#8b91a9"/>
        </svg>
      </div>

      <!-- VK -->
      <a :href="'https://vk.com/share.php?url='+link+'&title='+name+'&description='+text" target="_blank" rel="nofollow" @click="openShare" title="Поделиться Вконтакте">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12.89,17.11H11.81a6.22,6.22,0,0,1-4.48-2C5,12.69,3,8,3,8s-.11-.31,0-.46a.89.89,0,0,1,.53-.18H6.14a1.24,1.24,0,0,1,.42.16.86.86,0,0,1,.22.31,17.73,17.73,0,0,0,1,2c1.08,1.87,1.58,2.27,1.95,2.07.53-.29.37-2.63.37-2.63A2.61,2.61,0,0,0,9.8,8a1.2,1.2,0,0,0-.8-.4c-.14,0,.09-.36.4-.51a6,6,0,0,1,2.25-.23A4.7,4.7,0,0,1,12.92,7c.69.16.66.69.62,1.84,0,.34,0,.73,0,1.19,0,.1,0,.21,0,.33,0,.58,0,1.25.35,1.5.2.13.68,0,1.89-2a15.07,15.07,0,0,0,1-2.12A.74.74,0,0,1,17,7.4a.59.59,0,0,1,.35-.06l2.71,0s.82-.1.95.27-.31,1.29-1.42,2.77S18,12.28,18.07,12.74s.37.63,1,1.22A8.09,8.09,0,0,1,20.85,16l0,0c.59,1-.67,1.07-.67,1.07l-2.41,0a1.72,1.72,0,0,1-1.2-.37,6.62,6.62,0,0,1-1-1c-.5-.58-1-1.12-1.37-1-.68.21-.65,1.66-.65,1.66a.8.8,0,0,1-.15.47A.93.93,0,0,1,12.89,17.11ZM12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Z" fill="#8a90a7"/>
        </svg>
      </a>

      <!-- WhatsUp -->
      <a :href="'whatsapp://send?text='+text" target="_blank" data-action="share/whatsapp/share" rel="nofollow" @click="openShare" title="Поделиться WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,19.86a8,8,0,0,1-3.8-1L4,20l1.12-4.11A7.94,7.94,0,0,1,12,4a7.94,7.94,0,0,1,7.92,7.93A7.93,7.93,0,0,1,12,19.86ZM12,5.34A6.6,6.6,0,0,0,6.57,15.68L5.9,18.12l2.5-.66A6.59,6.59,0,1,0,12,5.34Zm3.87,9.42a2,2,0,0,1-1.33.94,2.73,2.73,0,0,1-1.25-.07c-.29-.1-.66-.22-1.13-.42a8.8,8.8,0,0,1-3.35-2.94l0,0h0a3.87,3.87,0,0,1-.8-2,2.18,2.18,0,0,1,.65-1.61l0-.05a.75.75,0,0,1,.53-.24h.42c.12,0,.26,0,.4.34.05.13.13.3.21.49.17.43.37.92.4,1a.36.36,0,0,1,0,.35l0,.06a1,1,0,0,1-.17.27l-.1.12-.2.23c-.09.1-.2.2-.08.4a5.81,5.81,0,0,0,1.1,1.38,5.1,5.1,0,0,0,1.46.92l.13.06c.2.1.32.08.43,0a9.24,9.24,0,0,0,.63-.78c.13-.2.26-.16.45-.1s1.15.55,1.35.65l.11.05c.14.07.23.11.27.18A1.62,1.62,0,0,1,15.87,14.76Z" fill="#8b91a9"/>
        </svg>
      </a>

      <!-- OK -->
      <a :href="'https://connect.ok.ru/offer?url='+link+'&title='+name+'&description='+text" target="_blank" rel="nofollow" @click="openShare" title="Поделиться Одноклассники">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,9.69a1.81,1.81,0,0,0,1.82-1.81h0A1.82,1.82,0,1,0,12,9.69Z" fill="#8a90a7"/>
            <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm0,3.48A4.39,4.39,0,1,1,7.6,7.87,4.4,4.4,0,0,1,12,3.48Zm4.69,11a1.42,1.42,0,0,1-.36.33,8.35,8.35,0,0,1-2.54,1.06l2.47,2.42a1.19,1.19,0,0,1,.28.42,1.3,1.3,0,0,1-.71,1.69,1.31,1.31,0,0,1-1,0,1.26,1.26,0,0,1-.42-.27L12,17.72,9.58,20.13a1.29,1.29,0,1,1-1.84-1.82l2.45-2.46a8.25,8.25,0,0,1-2.52-1A1.3,1.3,0,0,1,7.29,13a1.38,1.38,0,0,1,.31-.33,1.57,1.57,0,0,1,.46-.2,1.1,1.1,0,0,1,.51,0,1.43,1.43,0,0,1,.47.18,5.58,5.58,0,0,0,5.91,0,1.35,1.35,0,0,1,.47-.18,1.1,1.1,0,0,1,.51,0,1.57,1.57,0,0,1,.46.2A1.3,1.3,0,0,1,16.68,14.5Z" fill="#8a90a7"/>
        </svg>
      </a>

      <!-- FB -->
      <a :href="'https://www.facebook.com/sharer/sharer.php?u='+link+'&t='+name" target="_blank" rel="nofollow" @click="openShare" title="Поделиться Facebook">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M16.6711 15.5633L16.6708 15.5651H13.875V24C19.6118 23.0943 24 18.0995 24 12.0733C24 5.40541 18.6274 -6.03994e-07 12 -6.03994e-07C5.37258 -6.03994e-07 0 5.40541 0 12.0733C0 18.0994 4.38808 23.0941 10.1247 24V15.5651H7.07784V12.0751H7.07813V12.0733H10.1247V9.4152C10.1247 9.03737 10.1526 8.68066 10.2069 8.34568C10.5864 5.99685 12.2582 4.71614 14.6576 4.71614C15.9705 4.71614 17.3438 4.95195 17.3438 4.95195V7.92313H17.3435V7.92489H15.8303C14.5606 7.92489 14.0351 8.60004 13.9072 9.3902C13.8851 9.52718 13.875 9.66761 13.875 9.80857V12.0733H17.2031L17.2028 12.0751L16.6711 15.5633Z"/>
        </svg>
      </a>

      <!-- TWITTER -->
      <a :href="'https://twitter.com/share?url='+link+'&via='+name+'&text='+text" target="_blank" rel="nofollow" @click="openShare" title="Поделиться Twitter">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm6.88,9.05c0,.15,0,.29,0,.44,0,4.54-3.28,9.77-9.26,9.77a8.89,8.89,0,0,1-5-1.54,6.57,6.57,0,0,0,.78,0,6.33,6.33,0,0,0,4-1.46,3.28,3.28,0,0,1-3-2.39,3.14,3.14,0,0,0,1.47-.06,3.38,3.38,0,0,1-2.61-3.36v-.05a3,3,0,0,0,1.47.43A3.47,3.47,0,0,1,5.3,8a3.58,3.58,0,0,1,.44-1.73,9.13,9.13,0,0,0,6.71,3.59,4.07,4.07,0,0,1-.08-.79,3.34,3.34,0,0,1,3.25-3.43A3.18,3.18,0,0,1,18,6.75a6.3,6.3,0,0,0,2.06-.84,3.4,3.4,0,0,1-1.43,1.9,6.21,6.21,0,0,0,1.87-.54A7.07,7.07,0,0,1,18.88,9.05Z" fill="#8a90a7"/>
        </svg>
      </a>
    </div>
  </div>
</template>

<script>

let that;
export default {
  data() {
    return {
      expand: false,
      expandTl: null
    }
  },
  props: {
    link: String,
    text: String,
    name: String,
    id: Number
  },
  mounted() {
    that = this;
    window.addEventListener('click', this.squeezeShare);
  },
  methods: {
    openShare(e) {
      e.preventDefault();
      let elem = e.target || e.srcElement;
      if(!elem.href) {
        elem = elem.closest('a');
      }

      that.$axios.get('/news/share', {
        params: {
          NEWS_ID: this.id
        }
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });

      window.open(elem.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
      return false;
    },
    squeezeShare(e) {
      console.log('element', this.$el);
      if (!this.$el.contains(e.target)){
        if(this.expandTl) {
          this.expandTl.reverse();
        }
      }
    },
    printPage() {
      console.log('print page')
      
      let images = document.querySelectorAll('#page-content img');
      for(let i = 0; i < images.length; i++) {
        images[i].style.height = (images[i].offsetHeight-200)+'px';
      }

      printJS({ printable: 'page-content', type: 'html', header: this.name, ignoreElements: ['fix-block', 'files-list', 'aside-block'] })

      for(let i = 0; i < images.length; i++) {
        images[i].style.height = ''
      }

    },
    expandShare: function(event) {
      let elem = event.target || event.srcElement;
      if(elem.classList.contains('icon-download')) {
        elem = elem.closest('.icon-download');
      }

      this.expandTl = new TimelineMax({paused: true, onReverseComplete() {
        that.expand = false;
      }})

      if(!this.expand) {
        this.expand = true;
        let item = elem.querySelector('.news-share'),
            icons = item.querySelectorAll('a');

        this.expandTl.to(item, 0.8, {scale: 1, ease: Expo.easeIn}, 0)
                     // .set(item, {height: 'auto'});
                     .to(item, 0.8, {height: 248, ease: Expo.easeOut, delay: 0.8}, 0)
                     .staggerTo(icons, 0.8, {scale: 1, opacity: 1, delay: 1, ease: Expo.easeOut, delay: 0.8}, 0.1, 0);

        this.expandTl.timeScale(2);
        this.expandTl.play();
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.icon-block {
  position: relative;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}

.news-share {
  position: absolute;
  right: 50%;
  bottom: -11px;
  background: #fff;
  border-radius: 50px;
  transform: translateX(50%) scale(0);
  will-change: transform;
  overflow: hidden;
  height: 40px;

  .print-page {
    width: 26px;
    height: 26px;
    margin: 10px 7px 10px;
    border-bottom: 1px solid rgba(#000, 0.2);
    padding-bottom: 33px;
    cursor: pointer;

    svg {
      width: 100%;

      path {
        fill: $lightblue;
        transition: fill 0.5s $cubic;
      }
    }

    &:hover {
      svg {
        path {
          fill: $darkblue;
        }
      }
    }
  }

  a {
    width: 24px;
    height: 24px;
    display: block;
    margin: 8px 8px 16px;
    opacity: 0;
    transform: scale(0.5) translateZ(0);
    will-change: transform;

    &:last-child {
      margin-bottom: 8px;
    }

    svg {
      width: 100%;

      path {
        fill: $lightblue;
        transition: fill 0.5s $cubic;
      }
    }

    &:hover {
      svg {
        path {
          fill: $darkblue;
        }
      }
    }
  }
}
</style>

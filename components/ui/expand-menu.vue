<template lang="html">
  <div class="expand-menu nav-up" :class="opened ? 'opened' : ''">
    <div class="expand-toggle-mobile" @click="expandNav" :class="opened ? 'active' : ''">
       Оглавление
       <div class="toggle-icon">
       </div>
    </div>
    <nav>
      <a href="#" v-for="(item, index) in items" @click="GoToPosition($event, index)">{{item}}</a>
      <div class="expand-field">
        <a href="#" v-for="(item, index) in expItems" @click="GoToPosition($event, items.length+index)">{{item}}</a>
      </div>
    </nav>

    <div class="expand-button flex" @click="expandThis" v-if="expItems.length != 0">
      <div class="expand-icon">
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      opened: false,
      chapters: []
    }
  },
  props: {
    items: Array,
    expItems: Array
  },
  mounted() {
    console.log('expand', this.expItems.length);
    this.chapters = document.querySelectorAll('.aside-block .block-content .text-block, .aside-block .block-content .expand-block');
  },
  methods: {
    GoToPosition(e, index) {
      e.preventDefault();
      TweenLite.to(window, 2, {scrollTo:this.chapters[index], ease: Expo.easeOut});
      this.opened = false;
      TweenMax.to('.expand-menu nav', 1, {height: 0, ease: Expo.easeOut});
      document.body.style.overflow = '';
    },
    expandThis(e) {
      e.preventDefault();
      let elem = e.target || e.srcElement,
          block = elem.closest('.expand-menu'),
          field = block.querySelector('.expand-field');

      TweenMax.set(field, {height: 'auto'});
      TweenMax.from(field, 1, {height: 0, ease: Expo.easeOut});
      block.classList.add('visible');
    },
    expandNav(e) {
      e.preventDefault();

      if(this.opened) {
        this.opened = false;
        TweenMax.to('.expand-menu nav', 1, {height: 0, ease: Expo.easeOut});
        document.body.style.overflow = '';
      } else {
        this.opened = true;
        console.log('OPENED')
        TweenMax.set('.expand-menu nav', {height: 'auto'});
        TweenMax.from('.expand-menu nav', 1, {height: 0, ease: Expo.easeOut});
        document.body.style.overflow = 'hidden';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .expand-menu {
    padding-right: 65px;
    // position: sticky;
    top: 40px;

    a {
      font-size: 16px;
      display: block;
      margin: 0 0 20px;
    }

    .expand-toggle-mobile {
      display: none;
    }

    &.visible {
      .expand-field {
        &:before {
          opacity: 0;
        }
      }
      .expand-button {
        opacity: 0;
      }
    }

    p {
      font-size: 16px;
      line-height: 1.44;
      font-family: $titlesans;
    }

    .expand-field {
      height: 0;
      // min-height: 208px;
      position: relative;
      overflow: hidden;

      &:before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 120px;
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
        opacity: 1;
        transition: opacity 1s $cubic;
        will-change: opacity;
        pointer-events: none;
      }
    }

    .expand-button {
      margin-top: 0;
      opacity: 1;
      transition: opacity 1s $cubic;
      will-change: opacity;

      .expand-icon {
        width: 28px;
        height: 28px;
        position: relative;
        cursor: pointer;

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
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .expand-menu {
      a {
        font-size: 14px;
        line-height: 16px;
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .expand-menu {
      padding-right: 24px;

      a {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .expand-menu {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      padding-right: 0;
      max-height: 100vh;
      overflow: scroll;
      z-index: 50;

      &.nav-up {
        transform: translateY(-100%);

        &.opened {
          transform: translateY(0);
        }
      }


      .expand-toggle-mobile {
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        background: $darkblue;
        color: #fff;
        font-size: 20px;
        position: relative;

        &.active {
          .toggle-icon {
            &:before {
              top: 50%;
              margin-top: -1px;
            }
            &:after {
              bottom: 50%;
              margin-bottom: -1px;
            }
          }
        }

        .toggle-icon {
          width: 24px;
          height: 12px;
          position: absolute;
          right: 20px;
          top: 50%;
          margin-top: -6px;

          &:before, &:after {
            content: '';
            display: block;
            position: absolute;
            background: #fff;
            height: 2px;
            right: 0;
            transition: all 0.25s $cubic;
          }

          &:before {
            top: 0;
            width: 100%;
          }
          &:after {
            bottom: 0;
            width: 50%;
          }
        }
      }

      .expand-field {
        height: auto;

        a:last-child {
          border-bottom: 0;
        }

        &:before {
          display: none;
        }
      }

      .expand-button {
        display: none;
      }

      a {
        color: #fff;
        margin: 0;
        padding: 16px 20px 20px;
        border-bottom: 1px solid rgba(#fff, 0.2);
      }

      nav {
        background: $darkblue;
        color: #fff;
        border-top: 1px solid rgba(#fff, 0.2);
        height: 0;
        overflow: hidden;
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .expand-menu {
      .expand-button {
        .expand-icon {
          &:before, &:after, i {
            background: #000;
          }
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .expand-menu {
      .expand-button {
        .expand-icon {
          &:before, &:after, i {
            background: #fff;
          }
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .expand-menu {
      .expand-button {
        .expand-icon {
          &:before, &:after, i {
            background: $ddk;
          }
        }
      }
    }
  }
</style>

<template lang="html">
  <div class="expand-block">
    <h3 v-if="title">{{title}}</h3>
    <div class="expand-field" v-html="text">
    </div>
    <div class="expand-button flex flex-just-c" @click="expandThis" v-if="text.length > 500">
      <div class="expand-icon">
        <i></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    text: String
  },
  methods: {
    expandThis(e) {
      let elem = e.target || e.srcElement,
          block = elem.closest('.expand-block'),
          field = block.querySelector('.expand-field');

      TweenMax.set(field, {height: 'auto'});
      TweenMax.from(field, 1, {height: 0, ease: Expo.easeOut, onComplete() {
        block.querySelector('.expand-button').style.display = 'none'
      }});
      block.classList.add('visible');
    }
  }
}
</script>

<style lang="scss" scoped>
  .expand-block {
    h3 {
      margin-bottom: 30px;
    }

    &.visible {
      .expand-field {
        &:before {
          opacity: 0;
        }
      }
      .expand-button {
        opacity: 0;
        pointer-events: none;
      }
    }

    p {
      font-size: 16px;
      line-height: 1.44;
      font-family: $titlesans;
    }

    .expand-field {
      height: 208px;
      min-height: 208px;
      position: relative;
      overflow: hidden;

      font-family: $titlesans;
      font-size: 1em;
    	line-height: 1.6;

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
        z-index: 1;
        pointer-events: none;
      }
    }

    .expand-button {
      margin-top: -26px;
      opacity: 1;
      transition: opacity 1s $cubic;
      will-change: opacity;
      position: relative;
      z-index: 2;

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
  @media (min-width: 1024px) and (max-width: 1200px) {
    .expand-block {
      .expand-field {
        font-size: em(18);
        line-height: 1.44;
      }
    }
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    .expand-block {
      .expand-field {
        font-size: em(18);
        line-height: 1.44;
      }
    }
  }
  @media (max-width: 767px) {
    .expand-block {
      .expand-field {
        font-size: 16px;
        line-height: 1.44;
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .expand-block {
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
    .expand-block {
      .expand-field:before {
        background: linear-gradient(to bottom, rgba(#000, 0) 0%, #000 100%);
      }
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
    .expand-block {
      .expand-field:before {
        background: linear-gradient(to bottom, rgba($ddl, 0) 0%, $ddl 100%);
      }
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

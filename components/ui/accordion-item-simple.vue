<template lang="html">
  <div class="accordion-item" @click="expandThis">
    <div class="accordion-head">
      <h2>{{title}}</h2>
    </div>
    <div class="accordion-content">
      <div v-html="text"></div>
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
      let elem = e.target || e.srcElement;

      if(!elem.classList.contains('.accordion-item')) {
        elem = elem.closest('.accordion-item');
      }

      if(elem.classList.contains('active')) {
        TweenMax.to(elem.querySelector('.accordion-content'), 1, {height: 0, ease: Expo.easeOut});
        elem.classList.remove('active');
      } else {
        TweenMax.set(elem.querySelector('.accordion-content'), {height: 'auto'});
        TweenMax.from(elem.querySelector('.accordion-content'), 1, {height: 0, ease: Expo.easeOut});
        elem.classList.add('active');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .accordion-item {
    border-bottom: 1px solid rgba(#000, 0.2);
    padding-bottom: 28px;

    &:last-child {
      padding-bottom: 0;
    }

    h2 {
      font-size: em(28);
      line-height: 1.4;
      padding: 0;
      color: $blue;
    }
    .accordion-head {
      margin-top: 28px;
      cursor: pointer;

      p {
        margin-top: 15px;
      }
    }
    .accordion-content {
      height: 0;
      position: relative;
      overflow: hidden;

      > *:first-child {
        padding-top: 20px;
      }
    }

    &:first-child {
      .accordion-head {
        margin-top: 0;
      }
    }

    &:last-child {
      border-bottom: 0;
    }

    &.active {
      h2 {
        color: $lightblue;
      }

      .accordion-head {
        cursor: default;
      }
    }

    .add-element {
      margin-top: 48px;

      h3 {
        color: $blue;
        font-size: em(22);
        line-height: 1.44;
      }

      .element-info {
        margin-top: 20px;
        .date {
          color: $lightblue;
          margin-right: 24px;
        }
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .accordion-item {
      h2 {
        font-size: em(22);
        line-height: 1.4;
      }
    }
  }

  // Планшет
  @media (min-width: 577px) and (max-width: 1023px) {

  }

  // Телефон
  @media (max-width: 576px) {

  }

  // Белая тема для слабовидящих:
  .d-white {
    .accordion-item {
      h2 {
        color: #000;
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .accordion-item {
      h2 {
        color: #fff;
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .accordion-item {
      h2 {
        color: $ddk;
      }
    }
  }
</style>

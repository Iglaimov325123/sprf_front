<template lang="html">
  <div class="image-desc">
    <picture class="responsive-image">
        <source :srcset="src" media="(max-width: 768px)">
        <source :srcset="detailSrc">
        <img :srcset="detailSrc" alt="My default image">
    </picture>
    <small>{{desc}}</small>
  </div>
</template>

<script>
export default {
  props: {
    src: String,
    detailSrc: String,
    desc: String
  }
}
</script>

<style lang="scss" scoped>
  .image-desc {
    margin: 65px 0 35px;

    small {
      display: block;
      margin-top: 15px;
      font-size: 12px;
      line-height: 1.25;
      color: $lightblue;
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .image-desc {
      margin: 60px 0 75px;
    }
  }

  // Планшет
  @media (min-width: 577px) and (max-width: 1023px) {
    .image-desc {
      margin: 60px 0 75px;
    }
  }

  // Телефон
  @media (max-width: 576px) {
    .image-desc {
      margin: 50px 0 40px;
    }
  }

  // Отключение изображений:
  .dis-image {
    .image-desc {
      position: relative;
      
      &:before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid #888;
      }

      img {
        opacity: 0;
      }
    }
  }
</style>

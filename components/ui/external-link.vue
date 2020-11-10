<template lang="html">
  <a target="_blank" rel="nofollow" :href="link" class="external-link">
    <img :src="icon" :alt="text">
    {{text}}
  </a>
</template>

<script>
export default {
  props: {
    text: String,
    link: String,
    icon: String
  }
}
</script>

<style lang="scss" scoped>
  .external-link {
    height: 80px;
    border-radius: 4px;
    margin-bottom: 8px;
    background: #fff;
    display: flex;
    align-items: center;
    padding: 0 40px;
    font-size: em(18);
    position: relative;
    @include box-shadow(0, 2px, 0px, rgba($lightblue, 0));
    transition: box-shadow 0.5s $cubic;

    &:hover {
      @include box-shadow(0, 4px, 8px, rgba($lightblue, 0.4));
    }

    img {
      max-width: 40px;
      max-height: 40px;
      margin-right: 40px;
    }

    &:after {
      content: '';
      background: url('~assets/img/arrow.svg') no-repeat center;
      width: 14px;
      height: 14px;
      position: absolute;
      right: 40px;
      top: 50%;
      margin-top: -6px;
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .external-link {
      box-shadow: none;
      border: 1px solid #000;

      &:hover {
        box-shadow: none;
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .external-link {
      box-shadow: none;
      border: 1px solid #fff;
      background: #000;

      img {
        filter: invert(1) brightness(500%);
      }

      &:hover {
        box-shadow: none;
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .external-link {
      box-shadow: none;
      border: 1px solid $ddk;
      background: $ddl;

      img {
        filter: brightness(0%);
      }

      &:hover {
        box-shadow: none;
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .external-link {
      height: auto;
      padding: 20px;
      align-items: flex-start;

      img {
        margin-right: 20px;
      }

      &:after {
        display: none;
      }
    }
  }
</style>

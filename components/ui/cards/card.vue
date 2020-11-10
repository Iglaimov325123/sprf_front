<template lang="html">
  <div class="card" :class="external ? 'external' : ''">
    <a target="_blank" rel="nofollow" :href="link" class="card-inner flex flex-col">
      <div class="flex flex-top">
        <div class="card-icon">
          <img :src="icon" >
        </div>
      </div>
      <div class="flex flex-bottom">
        <span>{{text}}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    text: String,
    link: String,
    icon: String,
    external: Boolean
  },
  mounted() {

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin-bottom: 32px;

    &:hover {
      .card-inner {
        box-shadow: 0px 4px 8px 0px rgba($lightblue,0.4);
      }
    }

    &.external {
      .card-inner {
        &:hover {
          &:before {
            opacity: 1;
          }
        }
      }
    }

    .card-inner {
      margin: 0 12px;
      padding: 116px 24px 24px;
      background: #fff;
      border-radius: 4px;
      position: relative;
      height: 100%;
      box-shadow: 0px 0px 4px 0px rgba($lightblue,0);
      transition: box-shadow 0.35s $cubic;

      &:before {
        content: '';
        width: 14px;
        height: 14px;
        position: absolute;
        top: 32px;
        right: 32px;
        background-image: url('~assets/img/arrow.svg');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        opacity: 0;
        will-change: opacity;
        transition: opacity 0.3s $cubic;
      }

      // &:hover {
      //   &:before {
      //     opacity: 1;
      //   }
      // }
    }

    .card-icon {
      max-width: 60px;
      max-height: 60px;
      position: absolute;
      top: 24px;
      left: 24px;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .flex-bottom {
      a {
        font-size: em(18);
        line-height: 1.27;
      }
    }
  }

  // Отключение изображений:
  .dis-image {
    .card-icon {
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

  // Белая тема для слабовидящих:
  .d-white {
    .card {
      .card-inner {
        background: #fff;
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
    .card {
      .card-inner {
        background: #000;
        box-shadow: none;
        border: 1px solid #fff;

        &:hover {
          box-shadow: none;
        }
      }

      .card-icon {
        img {
          filter: invert(1) brightness(500%);
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-blue {
    .card {
      .card-inner {
        background: $ddl;
        box-shadow: none;
        border: 1px solid $ddk;

        &:hover {
          box-shadow: none;
        }
      }

      .card-icon {
        img {
          filter: brightness(0%);
        }
      }
    }
  }
</style>

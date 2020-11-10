<template lang="html">
  <router-link :to="$store.getters.getLang != 'en' ? '/structure/'+code : '/en/structure/'+code" class="person-simple flex flex-center-v" :class="dark ? 'dark' : ''" v-if="code">
    <div class="photo">
      <img :src="photo" :alt="name">
    </div>
    <div class="person-info">
      <div class="name">{{name}}</div>
      <p>{{pos}}</p>
    </div>
  </router-link>
  <div class="person-simple flex flex-center-v" v-else>
    <div class="photo">
      <img :src="photo" :alt="name">
    </div>
    <div class="person-info">
      <div class="name">{{name}}</div>
      <p>{{pos}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photo: String,
    name: String,
    pos: String,
    dark: Boolean,
    code: String
  }
}
</script>

<style lang="scss" scoped>
  .person-simple {

    &.dark {
      .name {
        color: #fff;
      }
    }
    .photo {
      flex: 0 0 48px;
      max-width: 48px;
      height: 48px;
      position: relative;
      border-radius: 50%;
      line-height: 1;
      overflow: hidden;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .person-info {
      margin-left: 16px;

      .name {
        font-size: 16px;
        line-height: 1;
      }

      p {
        font-size: 16px;
        margin-top: 4px;
        line-height: 1;
        color: $lightblue;
        font-family: $textsans;
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .person-simple {
      // .photo {
      //   flex: 0 0
      // }
    }
  }

  // Телефон
  @media (max-width: 767px) {

  }

  // Отключение изображений:
  .dis-image {
    .person-simple {
      .photo {
        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 1px solid #888;
          border-radius: 50%;
        }

        img {
          opacity: 0;
        }
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .person-simple {
      .person-info {
        color: #000;

        .name {
          color: #000;
        }

        p {
          color: #666;
        }
      }
    }
    .person-simple.dark {
      .name {
        color: #000;
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-black {
    .person-simple {
      .person-info {
        color: #fff;

        .name {
          color: #fff;
        }

        p {
          color: #888;
        }
      }
    }
    .person-simple.dark {
      .name {
        color: #fff;
      }
    }
  }
  // Синяя тема для слабовидящих:
  .d-blue {
    .person-simple {
      .person-info {
        color: $ddk;

        .name {
          color: $ddk;
        }

        p {
          color: rgba($ddk, 0.7);
        }
      }
    }
    .person-simple.dark {
      .name {
        color: $ddk;
      }
    }
  }
</style>

<template lang="html">
  <router-link :to="'/structure/'+code" class="person flex" v-if="code && $store.getters.getLang != 'en'">
    <div class="person-photo">
      <img :src="photo" :alt="name">
    </div>
    <div class="person-info flex flex-center-v">
      <p>{{name}}</p>
    </div>
  </router-link>
  <div class="person flex" v-else>
    <div class="person-photo">
      <img :src="photo" :alt="name">
    </div>
    <div class="person-info flex flex-center-v">
      <p>{{name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photo: String,
    name: String,
    code: String,
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
  .person {
    &:last-child {
      margin-bottom: 0;
    }

    .person-photo {
      flex: 0 0 48px;
      max-width: 48px;
      border-radius: 50%;
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
      padding-left: 16px;

      &.short-name {
        div {
          width: 100%;
        }
      }

      p {
        color: #000;
        font-family: $textsans;
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .person {
      max-width: 90%;

      .person-info {
        p {
          font-size: em(16);
        }
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .person {
      max-width: 90%;

      .person-photo {
        flex: 0 0 32px;
        max-width: 32px;
        height: 32px;
      }

      .person-info {
        p {
          font-size: 12px;
        }
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .person {
      .person-info {
        display: none;
      }
      .person-photo {
        flex: 0 0 32px;
        max-width: 32px;
        height: 32px;
      }
    }
  }

  // Отключение изображений:
  .dis-image {
    .person {
      .person-photo {
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

  .d-white {
    .person {
      .person-info {
        color: #000;
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .person {
      .person-info {
        color: #fff;

        span, p {
          color: #fff;
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .person {
      .person-info {
        color: $ddk;

        span, p {
          color: $ddk;
        }
      }
    }
  }
</style>

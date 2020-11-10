<template lang="html">
  <div class="person-simple flex flex-center-v" :class="dark ? 'dark' : ''">
    <div class="person-info">
      <div class="name">{{name}}</div>
      <p>{{pos}}</p>
    </div>
    <div class="photo">
      <img :src="photo" :alt="name">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photo: String,
    name: String,
    pos: String,
    code: String,
    dark: Boolean
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
      margin-right: 16px;
      text-align: right;

      .name {
        font-size: 16px;
        line-height: 1;
        white-space: nowrap;
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
      .photo {
        flex: 0 0 32px;
        max-width: 32px;
        height: 32px;
      }

      .person-info {
        .name {
          font-size: 12px;
        }
        p {
          font-size: 12px;
        }
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .person-simple {
      .person-info {
        display: none;
        // .name, p {
        //   font-size: 0;
        // }
      }
      .photo {
        flex: 0 0 32px;
        max-width: 32px;
        height: 32px;
      }
    }
  }

  // Отключение изображений:
  .dis-image {
    .person-simple {
      .person {
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
    .person-simple.dark {
      .name {
        color: #000;
      }
    }
    .person-simple {
      .person-info {
        p {
          color: #666;
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .person-simple.dark {
      .name {
        color: #fff;
      }
    }
    .person-simple {
      .person-info {
        p {
          color: #888;
        }
      }
    }
  }
  // Синяя тема для слабовидящих:
  .d-blue {
    .person-simple.dkar {
      .name {
        color: $ddk;
      }
    }
    .person-simple {
      .person-info {
        .name {
          color: $ddk;
        }
        p {
          color: rgba($ddk, 0.7);
        }
      }
    }
  }
</style>

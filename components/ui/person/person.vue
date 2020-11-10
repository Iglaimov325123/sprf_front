<template lang="html">
  <router-link :to="link" class="person flex flex-center-v">
    <div class="person-photo">
      <img :src="photo" :alt="name">
    </div>
    <div class="person-info">
      <h5>{{name}}</h5>
      <p>{{pos}}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    link: String,
    photo: String,
    name: String,
    pos: String
  }
}
</script>

<style lang="scss" scoped>
  .person {
    padding: 24px;

    .person-photo {
      flex: 0 0 100px;
      max-width: 100px;
      border-radius: 50%;
      height: 100px;
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
      padding-left: 32px;

      h5 {
        color: #000;
      }

      p {
        margin: 10px 0 0;
        color: $lightblue;
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .person {
      padding: 10px 12px;

      .person-info {
        padding-left: 16px;

        p {
          font-size: 14px;
          line-height: 1.44;
        }
      }
      .person-photo {
        flex: 0 0 72px;
        max-width: 72px;
        height: 72px;
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .person {
      padding: 10px 12px;

      .person-info {
        padding-left: 16px;

        p {
          font-size: 14px;
          line-height: 1.44;
        }
      }
      .person-photo {
        flex: 0 0 72px;
        max-width: 72px;
        height: 72px;
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .person {
      padding: 10px 12px;

      .person-info {
        padding-left: 16px;

        h5 {
          font-size: 20px;
          line-height: 1.4;
        }

        p {
          font-size: 16px;
          line-height: 1.4;
          margin-top: 5px;
        }
      }
      .person-photo {
        flex: 0 0 80px;
        max-width: 80px;
        height: 80px;
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

  // Белая тема для слабовидящих:
  .d-white {
    .person {
      .person-info {
        p {
          color: #666;
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .person {
      .person-info {
        color: #fff;

        h5 {
          color: #fff;
        }

        p {
          color: #888;
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-blue {
    .person {
      .person-info {
        color: $ddk;

        h5 {
          color: $ddk;
        }

        p {
          color: rgba($ddk, 0.7);
        }
      }
    }
  }
</style>

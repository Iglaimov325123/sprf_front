<template lang="html">
  <div class="media-item">
    <router-link :to="url" class="media-inner">
      <div class="media-photo">
        <picture class="responsive-image">
            <source :srcset="image" media="(max-width: 768px)">
            <source :srcset="image">
            <img :srcset="image" :alt="name">
        </picture>
      </div>

      <div class="media-info">
        <h2>{{name}}</h2>
        <div class="media-subinfo flex flex-just-b">
          <div class="date">
            {{date}}
          </div>
          <div class="author">
            <person-small :name="author" :photo="photo" :pos="pos" :dark="true"></person-small>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
const personSmall = require('~/components/ui/person/person-reverse').default;
export default {
  props: {
    image: String,
    name: String,
    url: String,
    author: String,
    photo: String,
    pos: String,
    date: String
  },
  methods: {
  },
  components: {
    personSmall
  }
}
</script>

<style lang="scss" scoped>
  .media-item {
    position: relative;
    height: 80vh;
    max-height: 720px;

    .author {
      flex: 0 0 50%;
      max-width: 50%;
      display: flex;
      justify-content: flex-end;

      .person-simple {
        flex: 0 0 100%;
        max-width: 100%;
        display: flex;
        justify-content: flex-end;
      }
    }

    h2 {
      max-width: 70%;
    }

    .media-inner {
      position: relative;
      height: 100%;
      display: block;
    }

    &:before {
      content: '';
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50%;
      position: absolute;
      background-image: linear-gradient(to top, rgba(4, 9, 42, 0.8) 63%, rgba(4, 9, 42, 0));
      z-index: 30;
    }

    img {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }

    .media-info {
      position: absolute;
      bottom: 40px;
      left: 40px;
      right: 40px;
      z-index: 50;
      color: #fff;

      .media-subinfo {
        margin-top: 40px;
        color: $lightblue;
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .media-item {
      max-height: 560px;

      h2 {
        font-size: em(32);
      }

      .media-info {
        .media-subinfo {
          margin-top: 32px;
        }
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .media-item {
      max-height: 412px;

      .date {
        font-size: em(14);
        display: flex;
        align-items: flex-end;
      }

      h2 {
        font-size: em(28);
        line-height: 1.44;
      }

      .media-info {
        .media-subinfo {
          margin-top: 13px;
        }
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .media-item {
      max-height: 100%;
      height: auto;

      .media-photo {
        height: 240px;
        display: block;
        position: relative;
      }

      .media-info {
        position: relative;
        bottom: auto;
        left: auto;
        right: auto;
        padding-top: 24px;

        h2 {
          font-size: 20px;
          line-height: 1.44;
          max-width: 100%;
        }

        .media-subinfo {
          margin-top: 15px;
          align-items: center;
        }
      }

      // img {
      //   position: relative;
      // }
    }
  }

  // Отключение изображений:
  .dis-image {
    .media-item {
      .media-inner {
        &:before {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 1px solid #fff;
        }

        img {
          opacity: 0;
        }
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .media-item:before {
      background-image: linear-gradient(to top, rgba(#fff, 0.9) 63%, rgba(#fff, 0))
    }
    .media-info {
      color: #000;

      .media-subinfo {
        color: #666;
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .media-item:before {
      background-image: linear-gradient(to top, rgba(#000, 0.7) 63%, rgba(#000, 0))
    }
    .media-info {
      color: #fff;

      .media-subinfo {
        color: #888;
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .media-item:before {
      background-image: linear-gradient(to top, rgba($ddl, 0.7) 63%, rgba($ddl, 0))
    }
    .media-info {
      color: $ddk;

      .media-subinfo {
        color: rgba($ddk, 0.7);
      }
    }
  }
</style>

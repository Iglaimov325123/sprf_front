<template lang="html">
  <div class="media-item">
    <router-link :to="url" class="media-inner flex flex-col">
      <div class="flex flex-top flex-col">
      <div class="media-photo">
        <picture class="responsive-image">
            <source :srcset="image" media="(max-width: 768px)">
            <source :srcset="image">
            <img :srcset="image" :alt="name">
        </picture>
      </div>
        <h3>{{name}}</h3>
      </div>

      <div class="flex flex-bottom">
        <div class="date">
          {{date}}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    image: String,
    name: String,
    url: String,
    author: String,
    photo: String,
    date: String
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .media-item {
    margin-top: 40px;

    .media-inner {
      color: #fff;
      height: 100%;
    }

    h3 {
      font-size: em(22);
      line-height: 1.44;
    }

    .media-photo {
      position: relative;
      padding-top: 70%;
      margin-bottom: 40px;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .date {
      color: $lightblue;
      margin-top: 40px;
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .media-item {
      max-height: 560px;

      h3 {
        font-size: em(20);
        line-height: 1.44;
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .media-item {
      flex: 0 0 50%;
      max-width: 50%;
      border-bottom: 1px solid rgba(#fff, 0.2);

      .date {
        margin-top: 30px;
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .media-item {
      flex: 0 0 100%;
      max-width: 100%;
      border-bottom: 1px solid rgba(#fff, 0.2);

      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }

      .media-photo {
        margin-bottom: 24px;
      }

      .date {
        margin-top: 14px;
      }

      .media-inner {

      }
    }
  }

  // Отключение изображений:
  .dis-image {
    .media-item {
      .media-photo {
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
    .media-item {
      .media-inner {
        color: #000;
      }
      .date {
        color: #666;
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .media-item {
      .media-inner {
        color: #fff;
      }
      .date {
        color: #888;
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .media-item {
      .media-inner {
        color: $ddk;
      }
      .date {
        color: rgba($ddk, 0.7);
      }
    }
  }
</style>

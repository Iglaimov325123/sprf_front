<template lang="html">
  <router-link :to="link" class="card-photos">
    <div class="photos-list flex">
      <div :class="['photo', index == 0 ? 'active' : '']" v-for="(photo, index) in photos">
        <img :src="photo.IMG" :alt="photo.NAME">
      </div>
    </div>
    {{desc}}
  </router-link>
</template>

<script>
export default {
  props: {
    photos: Array,
    link: String,
    desc: String
  }
}
</script>

<style lang="scss" scoped>
  .card-photos {
    padding: 24px;
    background: $cardblue;
    transition: color 0.3s $cubic;
    display: block;
    border-radius: 4px;
    color: $blue;
    font-size: em(18);
    width: 100%;

    &:hover {
      color: $lightblue;
      background: $cardblue;
    }

    .photos-list {
      margin-bottom: 28px;

      .photo {
        width: 64px;
        height: 64px;
        position: relative;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 5px;

        &:last-child {
          margin-right: 0;
        }

        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .card-photos {
      font-size: 16px;

      .photos-list {
        margin-bottom: 52px;

        .photo {
          width: 40px;
          height: 40px;
        }
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .card-photos {
      font-size: 14px;

      .photos-list {
        margin-bottom: 32px;

        .photo {
          width: 32px;
          height: 32px;
        }
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {

  }

  // Отключение изображений:
  .dis-image {
    .card-photos {
      .photos-list {
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
  }

  // Белая тема для слабовидящих:
  .d-white {
    .card-photos {
      background: #000;
      color: #fff;
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .card-photos {
      background: #fff;
      color: #000;
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .card-photos {
      background: $ddk;
      color: $ddl;
    }
  }
</style>

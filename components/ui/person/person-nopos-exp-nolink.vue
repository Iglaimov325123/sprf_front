<template lang="html">
  <div class="person flex">
    <div class="person-photo">
      <img :src="photo" :alt="name">
    </div>
    <div class="person-info flex flex-center-v">
      <p><span>{{surname}}</span> {{name}} {{lastname}}</p>
      <p class="short">{{shortname}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photo: String,
    name: String,
    surname: String,
    lastname: String,
    shortname: String
  }
}
</script>

<style lang="scss" scoped>
  .person {
    color: #000;

    &.active {
      .person-info {
        color: $blue;
        span {
          color: $blue;
        }
      }
    }

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
      color: $lightblue;

      span {
        display: block;
        color: #000;
      }

      p {
        font-family: $textsans;

        &.short {
          display: none;
        }
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .person {
      .person-photo {
        flex: 0 0 32px;
        max-width: 32px;
        height: 32px;
      }
      .person-info {
        p {
          font-size: 16px;
          display: none;

          &.short {
            display: block;
          }
        }
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {

  }

  // Телефон
  @media (max-width: 767px) {
    .person {
      .person-photo {
        flex: 0 0 32px;
        max-width: 32px;
        height: 32px;
      }
      .person-info {
        font-size: 20px;
        color: #000;

        p {
          font-size: 20px;
          display: none;

          &.short {
            display: block;
          }
        }
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
      &.active {
        .person-info, .person-info span{
          color: #000;
        }
      }
      .person-info, .person-info span{
        color: rgba(#000, 0.5);
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .person {
      &.active {
        .person-info, .person-info span{
          color: #fff;
        }
      }
      .person-info, .person-info span{
        color: rgba(#fff, 0.5);
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .person {
      &.active {
        .person-info, .person-info span{
          color: $ddk;
        }
      }
      .person-info, .person-info span{
        color: rgba($ddk, 0.5);
      }
    }
  }
</style>

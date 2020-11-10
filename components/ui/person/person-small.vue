<template lang="html">
  <router-link :to="'/structure/'+code" class="person flex" v-if="code">
    <div class="person-photo">
      <img :src="photo" :alt="name">
    </div>
    <div class="person-info">
      <h5>{{name}}</h5>
      <p>{{pos}}</p>
    </div>
  </router-link>
  <div class="person flex" v-else>
    <div class="person-photo">
      <img :src="photo" :alt="name">
    </div>
    <div class="person-info">
      <h5>{{name}}</h5>
      <p>{{pos}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photo: String,
    name: String,
    code: String,
    pos: String
  }
}
</script>

<style lang="scss" scoped>
  .person {
    margin-bottom: 32px;
    padding: 0 45px;

    &:last-child {
      margin-bottom: 0;
    }

    .person-photo {
      flex: 0 0 64px;
      max-width: 64px;
      border-radius: 50%;
      height: 64px;
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

      h5 {
        color: #000;
      }

      p {
        margin: 10px 0 0;
        font-size: 14px;
        line-height: 1.44;
        color: $lightblue;
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

  // Синяя тема для слабовидящих:
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

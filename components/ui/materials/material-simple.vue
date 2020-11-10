<template lang="html">
  <div class="material flex">
    <div class="aside-info flex flex-col">
      <div class="flex flex-top flex-col">
        <div class="type" v-if="type != null">
          <span v-for="(item, index) in type">{{item.NAME+((index+1 != type.length) ? ', ' : '')}}</span>
        </div>
        <div class="date">
          {{date}}
        </div>
      </div>
      <div class="flex flex-bottom" v-if="author">
        <person-small :code="code" :photo="photo" :name="author"></person-small>
      </div>
    </div>
    <div class="material-info flex">
      <div class="material-title">
        <router-link :to="link"><h2 v-html="title"></h2></router-link>
        <p v-html="desc"></p>
      </div>
      <div class="image" v-if="image">
        <img :src="image" alt="">
      </div>
    </div>
  </div>
</template>

<script>
const personSmall = require('~/components/ui/person/person-nopos').default;

export default {
  date() {
    return {

    }
  },
  props: {
    image: String,
    author: String,
    photo: String,
    type: Array,
    date: String,
    title: String,
    desc: String,
    link: String,
    code: String
  },
  components: {
    personSmall
  }
}
</script>

<style lang="scss" scoped>
  .material {
    .aside-info {
      flex: 0 0 25%;
      max-width: 25%;

      .type {
        font-size: em(16);
      }

      .date {
        font-size: em(16);
        color: $lightblue;
        margin-top: 5px;
      }
    }
    .material-info {
      flex: 0 0 75%;
      max-width: 75%;
      justify-content: space-between;

      h3 {
        margin-bottom: 20px;
      }

      .material-title {
        padding-right: 90px;
      }

      .image {
        flex: 0 0 160px;
        max-width: 160px;
      }

      img {
        width: 100%;
        max-width: 160px;
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .material {
      .material-info {
        h3 {
          font-size: em(24);
          line-height: 1.44;
        }
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .material {
      .aside-info {
        padding-right: 18px;
      }

      .material-info {
        h3 {
          font-size: em(24);
          line-height: 1.44;
        }

        .material-title {
          padding-right: 14px;
        }

        .image {
          flex: 0 0 96px;
          max-width: 96px;
        }
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .material {
      flex-direction: column-reverse;

      .material-info {
        flex: 0 0 100%;
        max-width: 100%;
        flex-wrap: wrap;
        flex-direction: column-reverse;

        .image {
          flex: 0 0 100%;
          max-width: 100%;
          height: 240px;
          width: 100%;
          position: relative;
          margin-bottom: 24px;

          img {
            max-width: 100%;
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .material-title {
          padding-right: 0;

          h3 {
            margin-bottom: 0;
          }
          p {
            display: none;
          }
        }
      }

      .aside-info {
        flex-direction: row;
        justify-content: space-between;
        flex: 0 0 100%;
      	max-width: 100%;
        align-items: center;
        margin-top: 16px;

        .type {
          margin-right: 16px;
        }

        .flex-top {
          flex-direction: row;
          margin-bottom: 0;
        }

        .date {
          margin-top: 0;
        }

        .flex-bottom {
          flex: 0 0 32px;
          max-width: 32px;
        }
      }
    }
  }

  // Отключение изображений:
  .dis-image {
    .material {
      .material-info {
        .image {
          position: relative;

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
    }
  }

  .d-blue {
    .material {
      .aside-info {
        .date {
          color: $ddk;
        }
      }
    }
  }
</style>

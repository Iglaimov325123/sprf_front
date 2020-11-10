<template lang="html">
  <div class="statement flex">
    <div class="statement-info flex flex-just-b col-12">
      <div class="statement-title">
        <div class="statement__selected-icon" v-if="selected"></div>
        <router-link :to="link" v-if="!external"><h2>{{ title != '' ? title : link.replace(/^.*[\\\/]/, '') }}</h2></router-link>
        <a :href="link" target="_blank" rel="nofollow" v-else><h3>{{ title != '' ? title : link.replace(/^.*[\\\/]/, '') }}</h3></a>
        <p v-if="desc!=null">{{desc}}</p>

        <div class="statement-info flex">
          <div class="date">{{date}}</div>
          <div class="sub-info">{{subinfo}}</div>
        </div>
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
    subinfo: String,
    date: String,
    title: String,
    desc: String,
    link: String,
    external: Boolean,
    selected: Boolean,
  },
  components: {
    personSmall
  }
}
</script>

<style lang="scss" scoped>
  .statement {
    border-bottom: 1px solid rgba(#000, 0.2);
    padding-bottom: 40px;
    margin-bottom: 28px;

    &:first-child {
      .statement-info {
        padding-top: 0;
      }
    }

    &:last-child {
      // padding-bottom: 0;
      margin-bottom: 0;
      border: 0;
    }

    .statement-title {
      position: relative;
      padding-right: 64px;


      h3 {
        margin-bottom: 25px;
      }

      p {
        font-size: em(16);
      }
    }
    .statement-info {
      font-size: em(16);
      padding-top: 24px;

      .date {
        color: $lightblue;
        margin-right: 24px;
      }

      .image {
        flex: 0 0 192px;
        max-width: 192px;

        img {
          width: 100%;
        }
      }
    }
  }

  .statement__selected-icon {
    position: absolute;
    top: 15px;
    left: -10px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #ff0000;
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .statement {
      padding-bottom: 30px;
      margin-bottom: 10px;

      .statement-title {
        h3 {
          font-size: em(20);
          line-height: 1.44;
        }
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .statement {
      padding-bottom: 30px;
      margin-bottom: 30px;

      .statement-title {
        padding-right: 0;

        h3 {
          font-size: em(20);
          line-height: 1.44;
          // margin-bottom: 0;
          margin-bottom: 20px;
        }
      }

      .statement-info {
        padding-top: 0;
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .statement .statement-info {
      display: flex;
      flex-direction: column-reverse;
      padding-top: 0;

      h3 {
        margin-bottom: 10px;
      }

      .image {
        // flex: 0 0 100%;
        max-width: 100%;
        position: relative;

        // img {
        //   object-fit: cover;
        //   position: absolute;
        //   top: 0;
        //   left: 0;
        //   width: 100%;
        //   height: 100%;
        // }
      }

      .statement-title {
        padding-right: 0;
      }
    }
  }

  // Отключение изображений:
  .dis-image {
    .statement .statement-info {
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

  .d-blue {
    .statement {
      .statement-info {
        .date {
          color: $ddk;
        }
      }
    }
  }
</style>

<template lang="html">
  <div class="item">
    <div class="item-inner flex flex-col graph">
      <a target="_blank" rel="nofollow" :href="info.LINK" class="item-top flex flex-just-b flex-top" v-if="info.EXT">
        <h3>{{info.NAME}}</h3>
        <div class="item-graph">
          <img v-if="info.PREVIEW_PICTURE" :src="info.PREVIEW_PICTURE" alt="">
        </div>
      </a>
      <router-link :to="info.LINK" class="item-top flex flex-just-b flex-top" v-else>
        <h3>{{info.NAME}}</h3>
        <div class="item-graph">
          <img v-if="info.PREVIEW_PICTURE" :src="info.PREVIEW_PICTURE" alt="">
        </div>
      </router-link>
      <div class="item-bottom flex flex-just-b flex-bottom">
        <router-link :to="linkForPublication('/audit/')">Аудит федерального бюджета</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    info: Object
  },
  mounted() {
    // console.log(this.info);
  },
  methods: {
    linkForPublication(link) {
      return this.$store.getters.getLang === 'en' ? '/en' + link : link
    },
  }
}
</script>

<style lang="scss" scoped>

  .tem.graph h3 {
    max-width: 60%;
  }

  .item {
    margin-bottom: 32px;

    &:hover {
      .item-inner {
        box-shadow: 0px 4px 8px 0px rgba($lightblue,0.4);
      }
    }

    .item-inner {
      margin: 0 16px;
      background: #fff;
      border-radius: 4px;
      height: 100%;
      box-shadow: 0px 0px 4px 0px rgba($lightblue,0);
      transition: box-shadow 0.35s $cubic;
      // padding: 24px 32px 24px 24px;
    }

    .item-graph {
      flex: 0 0 30%;
      max-width: 170px;
      margin-left: 10%;

      img {
        width: 100%;
      }
    }

    .date {
      font-size: em(16);
      line-height: 1.25;
      color: $lightblue;
    }

    .item-top {
      padding: 24px 32px 0 24px;
      color: #000;

      &:hover {
        color: #666;
      }
    }

    .item-content {
      padding: 20px 0 37px;
      font-size: em(20);
      line-height: 1.6;
      font-family: $titlesans;

      .swiper-slide {
        padding: 0 32px 0 24px;
      }
    }

    .item-bottom {
      padding: 0 32px 24px 24px;
      font-size: em(18);
      line-height: 1.77;
    }

    .item-slide-control {
      .left, .right {
        cursor: pointer;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
      .left {
        border-right: 7px solid $lightblue;

        &:hover {
          border-right: 7px solid $darkblue;
        }
      }
      .right {
        border-left: 7px solid $lightblue;
        margin-left: 24px;

        &:hover {
          border-left: 7px solid $darkblue;
        }
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .item {
      margin-bottom: 16px;

      .item-inner {
        margin: 0 8px;
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .item {
      margin-bottom: 16px;

      .item-top {
        padding: 16px 16px 0;
      }

      .item-bottom {
        padding: 0 16px 16px;
      }

      .item-inner {
        margin: 0 8px;
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .item {
      .date {
        white-space: nowrap;
      }

      .item-graph {
        flex: 0 0 100px;
	      max-width: 100px;
        margin-left: 0;
      }

      .item-top {
        padding: 18px 16px 30px;
      }

      .item-content {
        padding: 18px 0 30px;

        h3 {
          font-size: em(28);
        }

        p {
          font-size: 18px;
          line-height: 26px;
        }
      }

      .item-bottom {
        padding: 0 16px 18px;
      }
    }
  }

  // Отключение изображений:
  .dis-image {
    .item {
      .item-graph {
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
    .item {
      .date {
        color: #000;
      }
      .item-inner {
        box-shadow: none;
        border: 1px solid #000;

        &:hover {
          box-shadow: none;
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .item {
      .date {
        color: #fff;
      }
      .item-inner {
        box-shadow: none;
        border: 1px solid #fff;
        background: #000;

        &:hover {
          box-shadow: none;
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .item {
      .date {
        color: $ddk;
      }
      .item-inner {
        box-shadow: none;
        border: 1px solid $ddk;
        background: $ddl;

        &:hover {
          box-shadow: none;
        }
      }
    }
  }
</style>

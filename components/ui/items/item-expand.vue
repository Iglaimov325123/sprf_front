<template lang="html">
  <div class="item">
    <div class="item-inner">
      <div class="item-top flex flex-just-b">
        <h3 class="big">5,3%</h3>
        <div class="date">
          9 апреля
        </div>
      </div>
      <div class="item-content">
        <p>В апреле годовая инфляция начала замедляться – в годовом выражении этот показатель составил 5,2% (в марте он был на уровне 5,3%)</p>
      </div>
      <div class="item-bottom flex flex-just-b">
        <a href="#">Аудит национальных целей</a>
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
  mounted() {

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
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

    .date {
      font-size: em(16);
      line-height: 1.25;
      color: $lightblue;
    }

    .item-top {
      padding: 24px 32px 0 24px;
    }

    .item-content {
      padding: 20px 32px 37px 24px;
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

      .item-inner {
        margin: 0 8px;
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {

  }
</style>

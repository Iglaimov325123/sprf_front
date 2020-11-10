<template lang="html">
  <router-link :to="linkForPublication(link)" class="head-button flex flex-center-v" :class="effect ? 'hover-text' : ''">
    <span>{{text}}</span>
    <div class="button-icon">
      <!-- <img src="~/assets/img/icons/back.svg" alt="История"> -->
      <img :src="icon" :alt="text">
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    text: String,
    link: String,
    icon: String,
    effect: Boolean
  },
  methods: {
    linkForPublication(link) {
      return this.$store.getters.getLang === 'en' ? '/en' + link : link
    },
  }
}
</script>

<style lang="scss" scoped>
  .head-button {
    color: #fff;

    &.hover-text {
      span {
        display: block;
        opacity: 0;
        transition: opacity 0.2s $cubic;
      }

      &:hover {
        span {
          opacity: 1;
        }
      }
    }

    .button-icon {
      margin-left: 16px;
      max-width: 24px;
      max-height: 24px;
      flex: 0 0 24px;

      img {
        width: 100%;
      }
    }
  }

  .d-blue, .d-white {
    .head-button {
      filter: invert(1);
    }
  }
</style>

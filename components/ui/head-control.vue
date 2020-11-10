<template lang="html">
  <div class="head-button flex flex-center-v">
    {{text}}
    <div class="button-icon" v-if="!isSort">
      <!-- <img src="~/assets/img/icons/back.svg" alt="История"> -->
      <img :src="icon" :alt="text">
      <slot></slot>
    </div>
    <div class="button-icon" v-else>
      <img src="~/assets/img/sort.svg" alt="От начала к концу" v-if="sort=='desc'">
      <img src="~/assets/img/sort_r.svg" alt="От конца к началу" v-if="sort=='asc'">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    link: String,
    icon: String,
    isSort: Boolean,
    sort: String
  }
}
</script>

<style lang="scss" scoped>
  .head-button {
    color: #fff;
    cursor: pointer;
    transition: color 0.5s $cubic;

    &.active, &.visible {
      color: $lightblue;
      .button-icon img {
        opacity: 0.55;
      }
    }

    .button-icon {
      margin-left: 16px;
      max-width: 24px;
      max-height: 24px;
      flex: 0 0 24px;
      position: relative;

      img {
        width: 100%;
        opacity: 1;
        transition: opacity 0.5s $cubic;
      }
    }
  }

  .has-filter {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $red;
    position: absolute;
    top: -6px;
    right: -10px;
  }

  .d-white {
    .head-button {
      color: #000;

      &.active, &.visible {
        color: #000;
      }

      .button-icon {
        filter: invert(1);
      }
    }
  }

  .d-black {
    .head-button {
      color: #fff;
      
      &.active, &.visible {
        color: #fff;
      }
    }
  }

  .d-blue {
    .head-button {
      color: $ddk;

      &.active, &.visible {
        color: $ddk;
      }

      .button-icon {
        filter: invert(1);
      }
    }
  }
</style>

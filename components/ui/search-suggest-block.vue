<template lang="html">
  <div class="search-suggest_block" :class="external ? 'fixed' : ''" :style="{width: width > 0 ? width + 'px' : '100%'}">
    <div class="search-suggest" v-for="(suggest, index) in suggests" :key="index" @click="fillTag(suggest)">
      {{suggest.NAME}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    external: Boolean,
    suggests: Array,
    width: Number,
  },
  methods: {
    fillTag(tag) {
      this.$emit('fillTag', tag);
    },
  },
}
</script>

<style lang="scss" scoped>

  .search-suggest_block {
    position: absolute;
    top: 0;
    background: #fff;
    width: 100%;
    z-index: 99;

    .search-suggest {
      color: #333;
      padding: 10px 15px;
      cursor: pointer;
    }
    .search-suggest:hover{
      color: #bad2fc;
    }
  }

  .search-suggest_block.fixed {
    position: fixed;
    top: 198px;
  }

</style>

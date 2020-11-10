<template lang="html">
  <ul class="simple-list">
    <li v-for="item in items">
      {{item}}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: Array
  }
}
</script>

<style lang="scss" scoped>
  ul.simple-list {
    margin-top: 25px;
    
    li {
      margin-bottom: 15px;
    }
  }
</style>

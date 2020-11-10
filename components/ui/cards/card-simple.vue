<template lang="html">
  <router-link :to="link" class="card-simple">
    {{desc}}
  </router-link>
</template>

<script>
export default {
  props: {
    link: String,
    desc: String
  }
}
</script>

<style lang="scss" scoped>
  .card-simple {
    padding: 24px;
    background: $carddark;
    color: $blue;
    display: block;
    width: 100%;
    transition: background 0.3s $cubic, color 0.3s $cubic;
    margin: 16px 0;
    border-radius: 4px;

    &:hover {
      background: $cardblue;
      color: $lightblue;
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .card-simple {
      background: #000;
      color: #fff;
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .card-simple {
      background: #fff;
      color: #000;
    }
  }

  // Темная тема для слабовидящих:
  .d-blue {
    .card-simple {
      background: $ddk;
      color: $ddl;
    }
  }
</style>

<template lang="html">
  <div class="quote-simple aside-block flex">
    <aside>
      <person-small v-if="shortname" :dark="false" :photo="photo" :name="shortname.NAME ? shortname.NAME : ''" :surname="shortname.SURNAME" :secname="shortname.SECOND_NAME"></person-small>
    </aside>
    <div class="block-content" :class="bold ? 'bolded' : ''" v-html="text">
    </div>
  </div>
</template>

<script>
const personSmall = require('~/components/ui/person/person-news').default;

export default {
  props: {
    photo: String,
    name: String,
    text: String,
    bold: Boolean,
    shortname: Object
  },
  components: {
    personSmall
  },
  mounted() {
    console.log('SHORTNAME', this.shortname);
  }
}
</script>

<style lang="scss" scoped>
  .block-content {
    line-height: 1.6;
    font-size: 1em;
    font-family: $titlesans;

    &.bolded {
      font-weight: 500;
      color: #000;
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .quotes-list {
      .block-content {
        font-size: em(18);
        line-height: 1.44;
      }
    }
  }

  // Планшет
  @media (min-width: 577px) and (max-width: 1023px) {

  }

  // Телефон
  @media (max-width: 576px) {

  }
</style>

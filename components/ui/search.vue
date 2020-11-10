<template lang="html">
  <form class="search-form" action="/search/" method="post" :class="hided ? 'hide-elems' : ''" v-on:submit.prevent="goToSearch">
    <div class="search-input">
      <input autocomplete="off" type="text" :class="holder ? '' : 'no-padding'" name="q" value="" @focus="onFocus" v-on:keyup="onKeyup" @blur="onBlur" @change="onChange" v-model="fillSearch">
      <div class="search-placeholder">
        <b v-if="holder">{{$store.getters.getLang == 'ru' ? 'Искать:' : 'Search'}}</b> <span v-if="holder">{{$store.getters.getLang == 'ru' ? 'исполнение федерального бюджета' : ''}}</span>
      </div>
      <button type="submit" name="send-query" class="search-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.71 32.71">
          <path d="M32.71,31.29,22,20.59A12.54,12.54,0,1,0,20.59,22l10.7,10.7ZM12.5,23A10.5,10.5,0,1,1,23,12.5,10.51,10.51,0,0,1,12.5,23Z"/>
        </svg>
      </button>
    </div>
    <div class="search-suggest-wrapper">
      <search-suggest-block v-if="!externalSuggestBlock" :suggests="suggests" @fillTag="fillTag($event)"></search-suggest-block>
    </div>
    <div class="search-ready-tags flex flex-wrap" v-if="$store.getters.getLang == 'ru'">
      <div class="search-tag" v-for="tag in readyTags" @click="fillTag(tag)">
        {{tag.NAME}}
      </div>
    </div>
  </form>
</template>

<script>
import _ from 'lodash'

const searchSuggestBlock = require('~/components/ui/search-suggest-block').default;

export default {
  data() {
    return {
      input: null,
      placeholder: null,
      fillSearch: '',
      fillTags: [],
      suggests: [],
    }
  },
  props: {
    hided: Boolean,
    holder: Boolean,
    externalSuggestBlock: Boolean,
    readyTags: Array
  },
  created() {
  },
  mounted() {
    if(this.$route.query.q) {
      this.fillSearch = this.$route.query.q;
    }

    this.input = this.$el.querySelector('.search-input input[type="text"]');
    this.placeholder = this.$el.querySelector('.search-placeholder span');

    if(this.input.value != '') {
      TweenMax.to(this.placeholder, 0.5, {y: '200%', ease: Expo.easeOut});
    }

    const that = this;
    that.$axios.get('/search/tags').then(function (response) {
      that.fillTags = response.data.result;
    }).catch(function (error) {
      console.log(error);
    }).finally(function () {
    });
  },
  methods: {
    onFocus(e) {
      let elem = e.target || e.srcElement;
      this.input = elem.closest('.search-input');
      this.placeholder = this.input.querySelector('.search-placeholder span');

      if(this.holder) {
        TweenMax.to(this.placeholder, 0.5, {y: '200%', ease: Expo.easeOut});
      }
    },
    onBlur(e) {
      let elem = e.target || e.srcElement;
      this.input = elem.closest('.search-input');
      this.placeholder = this.input.querySelector('.search-placeholder span');

      if(elem.value == '' && this.holder) {
        TweenMax.to(this.placeholder, 0.5, {y: '0%', ease: Expo.easeOut});
      }
    },
    onChange(e) {
      let elem = e.target || e.srcElement;
      this.input = elem.closest('.search-input');
      this.placeholder = this.input.querySelector('.search-placeholder span');

      if(elem.value == '' && this.holder) {
        TweenMax.to(this.placeholder, 0.5, {y: '0%', ease: Expo.easeOut});
      }
    },
    onKeyup: _.debounce(function(e) {
      return false; // close suggestions
      
      let elem = e.target || e.srcElement;
      let value = e.target.value || e.srcElement.value;
      const requestBodyLocalized = this.$store.getters.getLang === 'ru' ? '/search/suggest' : '/en/search/suggest'
      const that = this;
      that.$axios.get(requestBodyLocalized, {
        params: {
          q: value
        }
      }).then(function (response) {
        that.fillSuggests(response.data.result.ITEMS);
      }).catch(function (error) {
        console.log(error);
      }).finally(function () {
      });
    }, 500),

    fillTag(tag) {
      this.input = this.$el.querySelector('.search-input');
      this.placeholder = this.input.querySelector('.search-placeholder span');
      if(this.placeholder != null) {
        TweenMax.to(this.placeholder, 0.5, {y: '200%', ease: Expo.easeOut});
      }
      this.fillSearch = tag.NAME;
      this.fillSuggests([]);
      this.$router.push({ path: '/search', query: { q: tag.NAME } })
    },

    goToSearch(e) {
      const pathLocalized = this.$store.getters.getLang === 'ru' ? '/search' : '/en/search'
      this.$root.layout.components.heading.methods.collapseAll()
      this.$router.push({ path: pathLocalized, query: { q: this.$el.querySelector('input[type="text"]').value } })
    },

    fillSuggests(suggests) {
      if (this.externalSuggestBlock) {
        this.$emit('fillSearchSuggests', suggests);
      } else {
        this.suggests = suggests;
      }
    },
  },
  components: {
    searchSuggestBlock,
  },
}
</script>

<style lang="scss" scoped>

  .hide-elems {
    .search-input {
      transform: translateY(200px) translateZ(0);
      opacity: 0;
      will-change: transform, opacity;
    }
    .search-ready-tags {
      transform: translateY(200px) translateZ(0);
      opacity: 0;
      will-change: transform, opacity;
    }
  }

  .search-form {
    position: relative;

    .search-input {
      position: relative;
      overflow: hidden;

      input[type="text"].no-padding {
        padding-left: 0;
      }

      input[type="text"] {
        transition: background-color 5000s ease-in-out 0s;
        -webkit-text-fill-color: #fff;
        background: transparent;
      }
    }

    .search-ready-tags {
      margin: 24px 0 16px;

      .search-tag {
        margin-right: 8px;
        height: 32px;
        display: flex;
        align-items: center;
        padding: 0 12px;
        background: #8B91A9;
        border-radius: 2px;
        color: #000;
        padding-bottom: 2px;
        cursor: pointer;
        white-space: nowrap;
        margin-bottom: 8px;

        &:hover {
          background: #fff;
          color: #000;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }

    input[type="text"] {
      width: 100%;
      background: transparent;
      border: 0;
      outline: none;
      font-size: em(24);
      line-height: 1.29;
      color: #fff;
      border-bottom: 2px solid #fff;
      height: 70px;
      display: flex;
      align-items: center;
      padding: 0 60px 3px 101px;
    }

    .search-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 70px;
      display: flex;
      align-items: center;
      font-size: em(24);
      line-height: 1.29;
      color: #8B91A9;
      pointer-events: none;

      b {
        color: #fff;
      }

      span {
        padding-left: 10px;
      }
    }

    .search-icon {
      width: 32px;
      height: 32px;
      position: absolute;
      right: 0;
      top: 30px;
      margin-top: -16px;

      svg {
        width: 100%;

        path {
          fill: #fff;
        }
      }
    }
  }

  .search-suggest-wrapper {
    position: relative;
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .search-form {
      .search-ready-tags {
        flex-wrap: nowrap;
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .search-form {
      .search-ready-tags {
        margin: 16px -20px;
        padding: 0 20px;
        overflow: scroll;

        &:after {
          content: '';
          width: 20px;
          flex: 0 0 20px;
        }

        .search-tag:last-child {
        }
      }
      input[type="text"], .search-placeholder {
        height: 42px;
      }

      input[type="text"] {
        font-size: em(16);
        padding: 0 60px 2px 55px;
      }
      .search-placeholder {
        font-size: em(16);
        line-height: 1;

        span {
          display: none;
        }
      }
      .search-ready-tags {
        flex-wrap: nowrap;
      }
      .search-icon {
        width: 24px;
        height: 24px;
        top: 20px;
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .search-form {
      .search-placeholder {
        padding: 0 25px;

        b {
          color: #000;
        }
        span {
          color: #666;
        }
      }
      input[type="text"] {
        border: 1px solid #000;
        color: #000;
        padding-left: 116px;
        -webkit-text-fill-color: #000;
      }
      .search-icon {
        top: 34px;
        right: 20px;
        svg {
          path {
            fill: #000;
          }
        }
      }

      .search-ready-tags {
        .search-tag {
          background: #000;
          border: 1px solid #000;
          color: #fff;

          &:hover {
            background: #fff;
            color: #000;
          }
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .search-form {
      .search-placeholder {
        padding: 0 25px;

        b {
          color: #fff;
        }
        span {
          color: #888;
        }
      }
      input[type="text"] {
        border: 1px solid #fff;
        color: #fff;
        padding-left: 116px;
      }
      .search-icon {
        top: 34px;
        right: 20px;
        svg {
          path {
            fill: #fff;
          }
        }
      }

      .search-ready-tags {
        .search-tag {
          background: #fff;
          border: 1px solid #fff;
          color: #000;

          &:hover {
            background: #000;
            color: #fff;
          }
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .search-form {
      .search-placeholder {
        padding: 0 25px;

        b {
          color: $ddk;
        }
        span {
          color: rgba($ddk, 0.7);
        }
      }
      input[type="text"] {
        border: 1px solid $ddk;
        color: $ddk;
        padding-left: 131px;
        -webkit-text-fill-color: $ddk;
      }
      .search-icon {
        top: 34px;
        right: 20px;
        svg {
          path {
            fill: $ddk;
          }
        }
      }

      .search-ready-tags {
        .search-tag {
          background: $ddk;
          border: 1px solid $ddk;
          color: $ddl;

          &:hover {
            background: $ddl;
            color: $ddk;
          }
        }
      }
    }
  }
</style>

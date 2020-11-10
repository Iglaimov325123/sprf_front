<template lang="html">
  <div class="item-tags-expand">
    <h2 @click="expandThis">{{name}}</h2>
    <p v-html="desc"></p>
    <div class="item-expand-field item-tags-links">
      <h2 v-for="file in files"><a :href="file.SRC" target="_blank">{{file.NAME}}</a></h2>
    </div>
    <div class="item-info flex">
      <div class="date">{{date}}</div>
      <div class="tags flex">
        <div class="tag" v-for="tag in tags" :class="tag.IS_ACTIVE ? 'active' : ''">{{tag.VALUE}}</div> <!-- active in class -->
      </div>
      <div class="sub-info" v-for="info in subinfo">{{info}}</div>
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
    files: Array,
    name: String,
    desc: String,
    date: String,
    tags: Array,
    subinfo: Array
  },
  mounted() {

  },
  methods: {
    expandThis(e) {
      e.preventDefault();
      let elem = e.target || e.srcElement;
      if(!elem.classList.contains('item-tags-expand')) {
        elem = elem.closest('.item-tags-expand');
      }
      let field = elem.querySelector('.item-expand-field');

      console.log(elem, field);

      if(elem.classList.contains('active')) {
        TweenMax.to(field, 1, {height: 0, ease: Expo.easeOut});
        elem.classList.remove('active');
      } else {
        TweenMax.set(field, {height: 'auto'});
        TweenMax.from(field, 1, {height: 0, ease: Expo.easeOut});
        elem.classList.add('active');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .item-tags-expand {
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgba(#000, 0.2);

    h2 {
      color: $blue;
      cursor: pointer;
      margin-bottom: 0;
    }

    &.active {
      h2 {
        color: $lightblue;
      }
    }

    &:last-child {
      margin-bottom: 0;
      border: 0;
    }

    .item-expand-field {
      height: 0;
      position: relative;
      overflow: hidden;
    }

    .item-info {
      margin-top: 24px;

      .date {
        // margin-right: 24px;
        color: $lightblue;
      }

      > * {
        margin-right: 24px;

        &:last-child {
          margin-right: 0;
        }
      }

      .tags {
        // margin-right: 24px;

        .tag {
          margin-right: 16px;
          position: relative;
          color: $lightblue;
          display: flex;
          align-items: center;

          &.active {
            color: #000;

            &:before {
              content: '';
              display: block;
              width: 6px;
              height: 6px;
              background: #FF004C;
              border-radius: 50%;
              margin-right: 6px;
            }
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .item-tags-links {
      h2 {
        margin-bottom: 15px;

        &:first-child {
          margin-top: 30px;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .item-tags-expand {
      h2 {
        color: #000;
        text-decoration: underline;
      }
      .item-info {
        .date {
          color: #666;
        }
        .tags {
          .tag {
            color: #666;
          }
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .item-tags-expand {
      h2 {
        color: #fff;
        text-decoration: underline;
      }
      .item-info {
        .date {
          color: #888;
        }
        .tags {
          .tag {
            color: #888;
          }
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .item-tags-expand {
      h2 {
        color: $ddk;
        text-decoration: underline;
      }
      .item-info {
        .date {
          color: $ddk;
        }
        .tags {
          .tag {
            color: $ddk;
          }
        }
      }
    }
  }
</style>

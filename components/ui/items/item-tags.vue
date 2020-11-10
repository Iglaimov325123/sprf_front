<template lang="html">
  <div class="item-tags">
    <h2><router-link :to="link" v-if="!external">{{name}}</router-link><a v-else :href="link" rel="nofollow" target="_blank">{{name}}</a></h2>
    <p v-html="desc"></p>
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
    link: String,
    name: String,
    desc: String,
    date: String,
    tags: Array,
    subinfo: Array,
    external: Boolean
  },
  mounted() {

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .item-tags {
    padding-bottom: 40px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgba(#000, 0.2);

    h2 {
      margin-bottom: 0;
    }

    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border: 0;
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
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .item-tags {
      padding-bottom: 32px;
      margin-bottom: 48px;

      h3 {
        font-size: em(20);
        line-height: 1.44;
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .item-tags {
      padding-bottom: 32px;
      margin-bottom: 48px;

      h2 {
        font-size: em(20);
        line-height: 1.44;
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .item-tags {
      padding-bottom: 24px;
      margin-bottom: 40px;

      h2 {
        font-size: 16px;
        line-height: 1.44;
      }

      .item-info {
        margin-top: 24px;
        flex-wrap: wrap;

        .date {
          width: 100%;
          margin-bottom: 12px;
          margin-right: 0
        }

        .tags {
          flex-wrap: wrap;

          .tag {
            margin-right: 0;
            width: 100%;
            margin-bottom: 12px;

            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .item-tags {
      .item-info {
        .date {
          color: #666;
        }
        .tags {
          .tag {
            color: #666;
          }
          .tag.active {
            &:before {
              background: #000;
            }
          }
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .item-tags {
      border-bottom: 1px solid rgba(#fff, 0.7);

      &:last-child {
        border-bottom: 0;
      }

      .item-info {
        .date {
          color: #888;
        }
        .tags {
          .tag {
            color: #888;
          }
          .tag.active {
            &:before {
              background: #fff;
            }
          }
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .item-tags {
      border-bottom: 1px solid rgba($ddk, 0.7);

      &:last-child {
        border-bottom: 0;
      }

      .item-info {
        .date {
          color: $ddk;
        }
        .tags {
          .tag {
            color: $ddk;
          }
          .tag.active {
            &:before {
              background: $ddk;
            }
          }
        }
      }
    }
  }
</style>

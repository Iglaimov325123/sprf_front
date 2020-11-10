<template lang="html">
  <div class="form-row" :class="label != null ? 'with-label' : ''" :data-name="name">
    <label for="" v-if="label!=''">{{label}}</label>
    <div class="text-field">
      <textarea :placeholder="placeholder" v-model="prop" :disabled="missed" @input="refreshForm" name="name" rows="8" cols="80"></textarea>
      <div class="counter">
        {{count}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      missed: false,
      prop: '',
      missCheck: null,
      count: 0
    }
  },
  props: {
    label: String,
    name: String,
    placeholder: String,
    miss: Boolean
  },
  mounted() {
    console.log('INPUT', this.$refs.missInput);
  // this.$nextTick(function() {
  //   if(this.miss) {
  //     console.log('input', this);
  //   }
  //   //     this.missCheck = document.querySelector(`#${name}`);
  //   //   }
  //   })
  },
  methods: {
    getValue() {
      return this.prop
    },
    resetValue() {
      this.prop = ''
    },
    checkField() {
      return (this.prop == undefined || this.prop == null || this.prop == '') ? (this.disabled || this.missed) ? false : true : false;
    },
    changeMiss(e) {
      if(this.$refs.missInput.checked) {
        this.missed = true;
      } else {
        this.missed = false;
      }
    },
    refreshForm() {
      this.$parent.checkForm();
      this.count = this.prop.length;
      // console.log(this.$parent);
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-row {
    position: relative;

    .text-field {
      position: relative;

      .counter {
        position: absolute;
        bottom: 16px;
        right: 16px;
        font-size: em(14);
        color: $lightblue;
        text-align: right;
        pointer-events: none;
      }
    }

    &.error {
      input[type="text"], input[type="password"], input[type="email"], textarea {
        background: #ffe9e9;
      }
    }

    .miss-input {
      position: absolute;
      right: 6px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;

      input[type="checkbox"] {
        opacity: 0;
        position: absolute;
        top: -9999px;
        left: -9999px;
        visibility: hidden;

        &:checked+label {
          &:before {
            transform: scale(1);
          }
        }
      }

      label {
        font-size: 14px;
        color: $lightblue;
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 0;
        padding-right: 30px;
        cursor: pointer;

        &:before {
          content: '';
          width: 10px;
          height: 10px;
          background: #fff;
          border-radius: 50%;
          position: absolute;
          z-index: 5;
          right: 5px;
          top: 50%;
          margin-top: -5px;
          transform: scale(0) translateZ(0);
          will-change: transform;
          transition: transform 0.15s $cubic;
        }

        &:after {
          content: '';
          width: 20px;
          height: 20px;
          background: $lightblue;
          border-radius: 50%;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -10px;
        }
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .form-row {
      .miss-input {
        label {
          color: #000;
          &:after {
            background: #000;
          }
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .form-row {
      .miss-input {
        label {
          color: #fff;
          &:before {
            background: #000;
          }
          &:after {
            background: #fff;
          }
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .form-row {
      .miss-input {
        label {
          color: $ddk;
          &:before {
            background: $ddl;
          }
          &:after {
            background: $ddk;
          }
        }
      }
    }
  }
</style>

<template lang="html">
  <div class="form-row" :class="label!=null ? 'with-label' : ''" :data-name="name">
    <label for="" v-if="label!=''">{{label}}</label>
    <input type="text" :placeholder="placeholder" v-model="prop" :disabled="disabled ? disabled : missed" @input="refreshForm">
    <div class="miss-input" v-if="miss" @click="changeMiss"><input ref="missInput" :name="name" :id="name" type="checkbox" value="a2"><label :for="name" class="miss-input">{{$store.getters.getLang == 'en' ? 'I don’t have' : 'Отсутствует'}}</label></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      missed: false,
      prop: '',
      missCheck: null
    }
  },
  props: {
    label: String,
    name: String,
    placeholder: String,
    miss: Boolean,
    value: String,
    disabled: Boolean,
    mask: String
  },
  mounted() {
    if(this.value != '') {
      this.prop = this.value;
    }
    // this.$nextTick(function() {
    //   console.log('INPUT', this.prop);
    // });
  },
  methods: {
    getValue() {
      return this.prop
    },
    resetValue() {
      this.prop = ''
    },
    checkField() {
      if (this.prop == undefined || this.prop == null || this.prop == '') {
        if(this.disabled || this.missed) {
          return false;
        } else {
          return true;
        }
      } else {
        if(this.mask == 'email') {
          return !this.validateEmail(this.prop);
        } else if(this.mask == 'phone') {
          return !this.validatePhone(this.prop);
        } else if(this.mask == 'length') {
          return this.validateLengh(this.prop);
        } else {
          return false;
        }
      }
    },
    trimvalue(value) {
      console.log('trim value', value);
      if(value) {
        return value.replace(/^\s+|\s+$/gm,'');
      } else {
        return '';
      }
    },
    changeMiss(e) {
      if(this.$refs.missInput.checked) {
        this.missed = true;
      } else {
        this.missed = false;
      }
      this.refreshForm();
    },
    validateLengh(value) {
      let trim = this.trimvalue(value);
      console.log('trim: ', trim.length);
      if(trim.length > 0) {
        return false;
      } else {
        if(this.disabled || this.missed) {
          return false;
        } else {
          return true;
        }
      }
    },
    validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    validatePhone(phone) {
      var re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
      return re.test(String(phone).toLowerCase());
    },
    refreshForm() {
      this.$parent.checkForm();
      // console.log(this.$parent);
    }
  }
}
</script>

<style lang="scss" scoped>
  .form-row {
    position: relative;

    &.error {
      input[type="text"], input[type="password"], input[type="email"] {
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

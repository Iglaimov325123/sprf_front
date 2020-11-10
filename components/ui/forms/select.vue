<template lang="html">
  <div class="form-row" :class="label!=null ? 'with-label' : ''" :data-name="name">
    <label for="" v-if="label!=''">{{label}}</label>
    <div class="custom-select">
      <div :class="{'website' : websiteFeedbackPage, 'current-select' : true}" @click="toggleSelect">{{curSelected}}</div>
      <div class="option-list">
        <div class="option" v-for="value in values" @click="selectThis">{{value.VALUE}}</div>
      </div>
      <div class="real-select">
        <select size="3" name="hero[]">
          <option :value="value.ID" v-for="value in values">{{value.VALUE}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curSelected: '',
    }
  },
  created() {
    this.curSelected = this.placeholder; // Basic Placeholder
  },
  props: {
    label: String,
    placeholder: String,
    values: Array,
    name: String
  },
  computed: {
    websiteFeedbackPage() {
      return this.$route.fullPath.includes('review-about-website')
    }
  },
  mounted() {
    console.log('А что там в роутере', this.$route)
    this.resetValue();
  },
  methods: {
    toggleSelect(e) {
      if (this.websiteFeedbackPage) return
      let elem = e.target || e.srcElement;
      if(!elem.classList.contains('custom-select')) {
        elem = elem.closest('.custom-select');
      }

      let options = elem.querySelector('.option-list');

      if(elem.classList.contains('active')) {
        // hide
        // TweenMax.set(options, {height: 'auto'});
        elem.classList.remove('active');
        TweenMax.to(options, 1, {height: 0, ease: Expo.easeOut});
        TweenMax.staggerTo(options.querySelectorAll('.option'), 0.5, {y: 40, clearProps: 'all', opacity: 0, ease: Expo.easeOut}, -0.1);
      } else {
        // show
        elem.classList.add('active');
        TweenMax.set(options, {height: 'auto'});
        TweenMax.staggerTo(options.querySelectorAll('.option'), 0.5, {y: 0, opacity: 1, ease: Expo.easeOut}, 0.1);
        TweenMax.from(options, 1, {height: 0, ease: Expo.easeOut});
      }
    },
    selectThis(e) {
      let elem = e.target || e.srcElement,
          optionlist = elem.closest('.option-list'),
          options = optionlist.querySelectorAll('.option'),
          realoptions = elem.closest('.custom-select').querySelectorAll('.real-select option');

      if(!elem.classList.contains('option')) {
        elem = elem.closest('.option')
      }

      console.log(elem, options);

      for(let i = 0; i < options.length; i++) {
        if(options[i] == elem) {
            options[i].classList.add('active');
            realoptions[i].selected = true;
            this.curSelected = options[i].innerText;
        } else {
            options[i].classList.remove('active');
            realoptions[i].selected = false;
        }
      }

      elem.closest('.custom-select').classList.remove('active');
      TweenMax.to(optionlist, 1, {height: 0, ease: Expo.easeOut});
      TweenMax.staggerTo(options, 0.5, {y: 40, clearProps: 'all', opacity: 0, ease: Expo.easeOut}, -0.1);

      this.$parent.checkForm();
    },
    getValue(){
      console.log(this.$el.querySelectorAll('option'));
      if(this.$el.querySelectorAll('option:checked')[0] != null) {
        return this.$el.querySelectorAll('option:checked')[0].value;
      } else {
        return false;
      }
    },
    resetValue() {
      let optionlist = this.$el.querySelector('.option-list'),
          options = optionlist.querySelectorAll('.option'),
          realoptions = this.$el.querySelectorAll('.real-select option');

      for(let i = 0; i < options.length; i++) {
        options[i].classList.remove('active');
        realoptions[i].selected = false;
        this.curSelected = this.placeholder;
      }
    },
    checkField() {
      if(this.$el.querySelectorAll('option:checked')[0] == null) {
        return true;
      } else {
        return false;
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .form-row {
    &.error {
      .custom-select {
        .current-select {
          background: #ffe9e9;
        }
      }
    }
  }
  .custom-select {
    position: relative;
    @include box-shadow(0, 0px, 4px, rgba($lightblue, 0));
    transition: box-shadow 0.5s ease-out;

    &.active {
      @include box-shadow(0, 4px, 8px, rgba($lightblue, 0.4));
    }

    .current-select {
      background: #eee;
      height: 40px;
      border-radius: 2px;
      border: 0;
      outline: none;
      transition: background 0.5s $cubic, color 0.5s $cubic;
      color: #000;
      display: flex;
      align-items: center;
      font-size: em(18);
      padding: 0 16px;
      width: 100%;
      position: relative;
      cursor:  pointer;

      &:after {
        content: '';
        position: absolute; /* Абсолютное позиционирование */
        right: 18px;
        top: 50%;
        margin-top: -4px;
        border: 5px solid transparent;
        border-top: 8px solid $blue;
        transition: transform 0.5s $cubic;
        transform: rotate(0deg) translateZ(0);
        will-change: transform;
      }

      &.website:after {
        border-color: transparent;
      }

    }

    .real-select {
      position: absolute;
    }

    .option-list {
      // position: absolute;
      // top: 100%;
      left: 0;
      width: 100%;
      background: #fff;
      z-index: 50;
      font-size: em(18);
      height: 0;
      overflow: hidden;
      position: relative;

      .option {
        height: 40px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(#04092A, 0.2);
        color: #000;
        transition: color 0.3s $cubic;
        cursor: pointer;
        position: relative;
        transform: translateY(40px) translateZ(0);
        opacity: 0;

        &:after {
          content: '';
          width: 8px;
          height: 8px;
          background: #FF004C;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          margin-top: -4px;
          right: 20px;
          transform: scale(0) translateZ(0);
          will-change: transform;
          transition: transform 0.5s $cubic;
        }

        &.active, &:hover {
          color: $blue;
          &:after {
            transform: scale(1) translateZ(0);
          }
        }

        &:hover {
          color: $blue;
        }
      }
    }

    .real-select {
      position: absolute;
      top: 0;
      left: 0;
      visibility: hidden;
      opacity: 0;
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .custom-select {
      .current-select {
        &:after {
          border-top-color: #000;
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .custom-select {
      .current-select {
        background: #000;
        color: #fff;
        border: 1px solid #fff;
        &:after {
          border-top-color: #fff;
        }
      }

      .option-list {
        background: #000;
        border-left: 1px solid #fff;
        border-right: 1px solid #fff;
        .option {
          border-bottom: 1px solid #fff;
          color: #fff;

          &.active {
            &:after {
              background: #fff;
            }
          }
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .custom-select {
      .current-select {
        background: $ddl;
        color: $ddk;
        border: 1px solid $ddk;
        &:after {
          border-top-color: $ddk;
        }
      }

      .option-list {
        background: $ddl;
        border-left: 1px solid $ddk;
        border-right: 1px solid $ddk;
        .option {
          border-bottom: 1px solid $ddk;
          color: $ddk;

          &.active {
            &:after {
              background: $ddk;
            }
          }
        }
      }
    }
  }
</style>

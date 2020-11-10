<template lang="html">
  <div class="form-row" ref="files" :class="label!=null ? 'with-label' : ''">
    <div class="custom-file">
      <input type="file" id="file" name="file" @change="changeHandler" multiple :data-multiple-caption="$store.getters.getLang == 'en' ? 'Attached files: {count}' : 'Выбрано файлов: {count}'" accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/rtf, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf, image/jpeg, image/bmp, image/png, image/tiff">
      <label for="file"><span>{{placeholder}}</span></label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validSize: 50242880 // 50 Mb
    }
  },
  props: {
    label: String,
    placeholder: String
  },
  methods: {
    changeHandler(e) {
      let elem = e.target || e.srcElement,
          label = elem.nextElementSibling,
          fileName = '';

      // if(elem.files[0].size > 5242880) {
      //   label.querySelector('span').innerHTML = 'Файл более 5 мб.';
      //   elem.value = '';
      //   return;
      // }
      label.querySelector('span').classList.remove('red');

      let totalSize = 0;
      for(let i = 0; i < elem.files.length; i++) {
        totalSize += elem.files[i].size;
        if(totalSize > this.validSize) {
          label.querySelector('span').innerHTML = this.$store.getters.getLang == 'en' ? 'File more than 50 mb.' : 'Файл более 50 мб.';
          this.$refs.files.classList.add('error')
          this.$parent.checkForm()
          elem.value = '';
          return;
        }
      }

      this.$refs.files.classList.remove('error')
      this.$parent.checkForm()

      if(elem.files && elem.files.length > 1)
        fileName = (elem.getAttribute('data-multiple-caption') || '').replace( '{count}', elem.files.length );
      else
        fileName = elem.value.replace(/^.*[\\\/]/, '')

      if(fileName)
        label.querySelector('span').innerHTML = fileName;
      else
        label.innerHTML = labelVal;
    },
    getFiles() {
      return this.$el.querySelector('input[type="file"]').files;
    },
    resetValue() {
      console.log('reset file input')
      let label = this.$el.querySelector('label span').innerHTML = this.placeholder;
      this.$el.querySelector('input[type="file"]').value = null;
    },
    setError(error) {
      let label = this.$el.querySelector('label span')
      label.innerHTML = error;
      label.classList.add('red');
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-file {
  input[type="file"] {
    width: 0.1px;
  	height: 0.1px;
  	opacity: 0;
  	overflow: hidden;
  	position: absolute;
  	z-index: -1;

    &+label {
      cursor: pointer;
      display: flex;
      align-items: center;
      width: 100%;
      height: 40px;
      padding: 0 14px 0 16px;
      font-size: em(18);
      border: 1px solid #ccc;
      position: relative;
      justify-content: space-between;

      &:after {
        content: '';
        display: block;
        width: 16px;
        height: 16px;
        background: url('~assets/img/plus.svg');
      }
      .red {
        color: #ff0000;
      }
    }
  }
}

// Белая тема для слабовидящих:
.d-white {
  .custom-file {
    input[type="file"] + label:after {
      // TODO: Вставить изображение крестика нужного цвета
    }
  }
}
// Темная тема для слабовидящих:
.d-black {
  .custom-file {
    input[type="file"] + label:after {
      // TODO: Вставить изображение крестика нужного цвета
    }
  }
}
// Синяя тема для слабовидящих:
.d-blue {
  .custom-file {
    input[type="file"] + label:after {
      // TODO: Вставить изображение крестика нужного цвета
    }

    input[type="file"] + label {
      border: 1px solid $ddk;
    }
  }
}
</style>

<template>
  <div class="page-content" data-type="inner">
    <section class="blue with-expand" data-type="inner-head">
      <div class="head-main center flex flex-just-b flex-center-v">
        <h1>{{$store.getters.getLang == 'en' ? 'Support' : 'Общественная приемная'}}</h1>

        <div class="flex head-buttons">
          <header-control v-on:click.native="expandInfo" :text="$store.getters.getLang == 'en' ? 'Info' : 'Информация'" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+ICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTIsMjRBMTIsMTIsMCwxLDEsMjQsMTIsMTIsMTIsMCwwLDEsMTIsMjRaTTEyLDJBMTAsMTAsMCwxLDAsMjIsMTIsMTAsMTAsMCwwLDAsMTIsMlptMSw4SDExdjhoMlptMC00SDExVjhoMloiLz48L3N2Zz4="></header-control>
        </div>
      </div>

      <div class="head-expend-info">
        <div class="center" v-html="pageinfo.info.TEXT">
        </div>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <div class="page-contain">
          <div class="double-side no-padding flex flex-wrap">
            <div class="col-6" v-if="!formSended">
              <h3>{{$store.getters.getLang == 'en' ? 'Send appeal: statement, proposal or complaint through the feedback form' : contactInfo.SUPPORT_TITLE}}</h3>
              <form action="#" class="with-padding" v-on:submit.prevent="sendForm">
                <select-basic ref="type" name="type" :label="fields.type.LABEL" :values="types" :placeholder="fields.type.PLACE"></select-basic>
                <input-basic v-show="!smallForm" ref="addresser" name="addresser" :label="fields.addresser.LABEL" :value="fields.addresser.PLACE" :disabled="true"></input-basic>
                <input-basic v-show="!smallForm" ref="fname" name="fname" :label="fields.fname.LABEL" :placeholder="fields.fname.PLACE" mask="length"></input-basic>
                <input-basic v-show="!smallForm" ref="name" name="name" :placeholder="fields.name.PLACE" mask="length"></input-basic>
                <input-basic v-show="!smallForm" ref="oname" name="oname" :placeholder="fields.oname.PLACE" :name="'tname'" :miss="true" mask="length"></input-basic>
                <!-- <input-basic v-show="!smallForm" ref="company" name="company" :placeholder="fields.company.PLACE"></input-basic> -->
                <!-- <select-basic v-show="!smallForm" ref="gender" name="gender" :placeholder="fields.gender.PLACE" :values="genders"></select-basic> -->
                <!-- <select-basic v-show="!smallForm" ref="age" name="age" :placeholder="fields.age.PLACE" :values="ages"></select-basic> -->
                <!-- <select-basic v-show="!smallForm" ref="status" name="status" :placeholder="fields.status.PLACE" :values="status"></select-basic> -->
                <!-- <select-basic v-show="!smallForm" ref="martial" name="martial" :placeholder="fields.martial.PLACE" :values="material"></select-basic> --> 
                <input-basic v-show="!smallForm" ref="address" name="address" :placeholder="fields.address.PLACE"></input-basic>
                <input-basic v-show="!smallForm" ref="phone" name="phone" :placeholder="fields.phone.PLACE" mask="phone"></input-basic>
                <input-basic v-show="!smallForm" ref="email" name="email" :placeholder="fields.email.PLACE" mask="email"></input-basic>
                <input-basic v-show="!smallForm" ref="theme" name="theme" :label="fields.theme.LABEL"></input-basic>
                <text-area ref="text" name="text" :label="fields.text.LABEL"></text-area>
                <file-basic v-show="!smallForm" name="files" ref="files" :placeholder="fields.files.PLACE"></file-basic>
                <!-- <div class="form-not-filled" v-if="formNotFilled">Заполните все обязательные поля</div> -->
                <div class="form-not-filled" v-if="formNotFilled">{{$store.getters.getLang == 'en' ? 'Please fill in all required fields' : 'Заполните все обязательные поля'}}</div>
                <div class="actions">
                  <button type="submit" class="btn full-width" :class="[!formNotFilled ? 'btn-fill' : '', isSending ? 'btn-sending' : '']" disabled>{{buttonText}}</button>
                </div>
                <small v-if="$store.getters.getLang == 'en'">The appeal may contain attached documents and materials in electronic form as a single file without archiving. The attachment file size cannot exceed 50 MB. The following file formats are acceptable for attachments: txt, doc, docx, pptx, xlsx, rtf, xls, pps, ppt, pdf, jpg, bmp, png, tif.</small>
                <small v-else>Обращение может содержать вложенные документы и материалы в электронной форме в виде одного файла без архивирования. Размер файла вложения не может превышать 50 Мб. Для вложений допустимы следующие форматы файлов: txt, doc, docx, pptx, xlsx, rtf, xls, pps, ppt, pdf, jpg, bmp, png, tif.</small>
              </form>
            </div>
            <!-- <div class="col-6 flex flex-center-v flex-center-h" v-else>
              <div class="end-info">
                <h3>Заголовок</h3>
                <p>Сообщение об успешной отправке</p>
              </div>
            </div> -->
            <div class="col-6">
              <div class="blue-block">
                <h3>{{$store.getters.getLang == 'en' ? 'Contacts' : 'Контакты'}}</h3>
                <p v-html="contactInfo.HEADER_TEXT"></p>
                <div class="block-border-grid flex flex-wrap">
                  <div class="grid-item" v-for="time in contactInfo.TIMETABLE.ACTIVE">
                    <div class="grid-item-inner">
                      <small>{{time.LABEL}}</small>
                      <div class="value">{{time.VALUE}}</div>
                    </div>
                  </div>
                  <div class="grid-item" v-for="time in contactInfo.TIMETABLE.DISABLED">
                    <div class="grid-item-inner disable">
                      <small>{{time.LABEL}}</small>
                      <div class="value">{{time.VALUE}}</div>
                    </div>
                  </div>
                </div>

                <ul class="just-list flex flex-wrap">
                  <li class="col-6">
                    <small>{{$store.getters.getLang == 'en' ? 'Phone' : 'Телефон'}}</small>
                    <div class="value"><a :href="'tel:'+contactInfo.PHONE">{{contactInfo.PHONE}}</a></div>
                  </li>
                  <!-- <li class="col-6">
                    <small>{{$store.getters.getLang == 'en' ? 'E-mail' : 'Эл. почта'}}</small>
                    <div class="value"><a :href="'mailto:'+contactInfo.EMAIL">{{contactInfo.EMAIL}}</a></div>
                  </li> -->
                  <li class="col-12">
                    <small>{{$store.getters.getLang == 'en' ? 'Address' : 'Адрес'}}</small>
                    <div class="value">{{contactInfo.ADDRESS}}</div>
                  </li>
                </ul>

                <person-simple class="col-4" v-if="contactInfo.PERSON" :code="contactInfo.PERSON.ID" :photo="contactInfo.PERSON.PREVIEW_PICTURE" :name="contactInfo.PERSON.NAME" :pos="contactInfo.PERSON.POSITION"></person-simple>

                <small v-html="contactInfo.FOOTER_TEXT"></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const headerControl = require('~/components/ui/head-control').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const cardSimple = require('~/components/ui/cards/card-simple').default;

const statementSimple = require('~/components/ui/statements/statement-simple').default;
const personSimple = require('~/components/ui/person/person-simple').default;

// Forms
const inputBasic = require('~/components/ui/forms/input').default;
const textArea = require('~/components/ui/forms/textarea').default;
const selectBasic = require('~/components/ui/forms/select').default;
const fileBasic = require('~/components/ui/forms/file').default;

import { required, minLength, email } from 'vuelidate/lib/validators'

let that;
export default {
  async asyncData (context) {
    let contacts = await context.app.$axios.get('/contacts/support');
    let types = await context.app.$axios.get('/support/type');
    let gender = await context.app.$axios.get('/support/gender');
    let ages = await context.app.$axios.get('/support/age');
    let status = await context.app.$axios.get('/support/socialStatus');
    let material = await context.app.$axios.get('/support/maritalStatus');
    let fields = await context.app.$axios.get('/support/fields');
    let support = await context.app.$axios.get('/support/info');

    console.log('SUPPORT INFO', support.data.result);

    return { pageinfo: support.data.result, seo: contacts.data.seo, contactInfo: contacts.data.result, fields: fields.data.result, types: types.data.result, genders: gender.data.result, ages: ages.data.result, status: status.data.result, material: material.data.result }
  },
  head() {
    // НЕТУ СЕО! ОЛО
    if (!this.seo) {
      console.error('НЕТ СЕО В БЛОКЕ, ОЛО!');
      return {};
    }
    return {
      title: this.seo ? this.seo.TITLE : '',
      meta: [
        {name: 'description', content: this.seo.DESCRIPTION},
        {name: 'keywords', content: this.seo.KEYWORDS}
      ]
    }
  },
  data() {
    return {
      pageinfo: {
        info: {
          TEXT: ''
        }
      },
      seo: {
        TITLE: '',
        DESCRIPTION: '',
        KEYWORDS: ''
      },
      fields: [],
      types: [],
      genders: [],
      ages: [],
      status: [],
      material: [],
      contactInfo: {
        TIMETABLE: {
          ACTIVE: [],
          DISABLED: []
        },
        PERSON: {}
      },

      // Input
      address: '',
      fname: '',
      name: '',
      oname: '',
      // company: '',
      formNotFilled: false,

      buttonText: 'Отправить',

      formSended: false,
      smallView: false,

      isSending: false,
    }
  },
  computed: {
    smallForm() {
      return this.smallView
    }
  },
  created() {
    that = this;
  },
  mounted() {
    this.buttonText = that.$store.getters.getLang == 'en' ? 'Submit' : 'Отправить';
    console.log('AGES', this.ages);
  },
  methods: {
    checkForm() {
      this.smallView = this.$refs.type.getValue() == 4 ? true : false

      let params = {
        type: this.$refs.type.checkField(),
        name: this.$refs.name.checkField(),
        surname: this.$refs.fname.checkField(),
        secondname: this.$refs.oname.checkField(),
        // company: this.$refs.company.checkField(),
        // gender: this.$refs.gender.checkField(),
        // age: this.$refs.age.checkField(),
        // socialstatus: this.$refs.status.checkField(),
        // martialstatus: this.$refs.martial.checkField(),
        address: this.$refs.address.checkField(),
        phone: this.$refs.phone.checkField(),
        email: this.$refs.email.checkField(),
        theme: this.$refs.theme.checkField(),
        text: this.$refs.text.checkField(),
        message: ''
      };

      let paramsSmall = {
        type: this.$refs.type.checkField(),
        theme: this.$refs.theme.checkField(),
      }

      if (!this.smallView) {

        if(params.type) {
          document.querySelector('[data-name="type"]').classList.add('error');
        } else {
          document.querySelector('[data-name="type"]').classList.remove('error');
        }
        if(params.name) {
          document.querySelector('[data-name="name"]').classList.add('error');
        } else {
          document.querySelector('[data-name="name"]').classList.remove('error');
        }
        if(params.surname) {
          document.querySelector('[data-name="fname"]').classList.add('error');
        } else {
          document.querySelector('[data-name="fname"]').classList.remove('error');
        }
        if(params.secondname) {
          document.querySelector('[data-name="tname"]').classList.add('error');
        } else {
          document.querySelector('[data-name="tname"]').classList.remove('error');
        }
        // if(params.gender) {
        //   document.querySelector('[data-name="gender"]').classList.add('error');
        // } else {
        //   document.querySelector('[data-name="gender"]').classList.remove('error');
        // }
        // if(params.age) {
        //   document.querySelector('[data-name="age"]').classList.add('error');
        // } else {
        //   document.querySelector('[data-name="age"]').classList.remove('error');
        // }
        // if(params.socialstatus) {
        //   document.querySelector('[data-name="status"]').classList.add('error');
        // } else {
        //   document.querySelector('[data-name="status"]').classList.remove('error');
        // }
        // if(params.martialstatus) {
        //   document.querySelector('[data-name="martial"]').classList.add('error');
        // } else {
        //   document.querySelector('[data-name="martial"]').classList.remove('error');
        // }
        if(params.phone) {
          document.querySelector('[data-name="phone"]').classList.add('error');
        } else {
          document.querySelector('[data-name="phone"]').classList.remove('error');
        }
        if(params.email) {
          document.querySelector('[data-name="email"]').classList.add('error');
        } else {
          document.querySelector('[data-name="email"]').classList.remove('error');
        }
        if(params.theme) {
          document.querySelector('[data-name="theme"]').classList.add('error');
        } else {
          document.querySelector('[data-name="theme"]').classList.remove('error');
        }
        if(params.text) {
          document.querySelector('[data-name="text"]').classList.add('error');
        } else {
          document.querySelector('[data-name="text"]').classList.remove('error');
        }
        if(params.address) {
          document.querySelector('[data-name="address"]').classList.add('error');
        } else {
          document.querySelector('[data-name="address"]').classList.remove('error');
        }

      } else {
        if(paramsSmall.theme) {
          document.querySelector('[data-name="theme"]').classList.add('error');
        } else {
          document.querySelector('[data-name="theme"]').classList.remove('error');
        }
      }

      let rows = document.querySelectorAll('.form-row.error'),
          valid = rows.length != 0 ? false : true;

      if(valid) {
        this.formNotFilled = false
        document.querySelector('form .actions button[type="submit"]').disabled = false;
      } else {
        this.formNotFilled = true;
        document.querySelector('form .actions button[type="submit"]').disabled = true;
      }
    },
    sendForm(e) {
      e.preventDefault();
      console.log(this.$refs);

      if(that.isSending) {
        return;
      }

      that.isSending = true;
      that.buttonText = that.$store.getters.getLang == 'en' ? 'Loading...' : 'Загружается...';

      let formData = new FormData();
      formData.append('type', this.$refs.type.getValue());
      formData.append('name', this.$refs.name.getValue());
      formData.append('surname', this.$refs.fname.getValue());
      formData.append('secondname', this.$refs.oname.getValue());
      // formData.append('company', this.$refs.company.getValue());
      // formData.append('gender', this.$refs.gender.getValue());
      // formData.append('age', this.$refs.age.getValue());
      // formData.append('socialstatus', this.$refs.status.getValue());
      // formData.append('martialstatus', this.$refs.martial.getValue());
      formData.append('address', this.$refs.address.getValue());
      formData.append('phone', this.$refs.phone.getValue());
      formData.append('email', this.$refs.email.getValue());
      formData.append('theme', this.$refs.theme.getValue());
      formData.append('text', this.$refs.text.getValue());
      formData.append('message', this.$refs.theme.getValue());
      const files = this.$refs.files.getFiles();

      for(var v of files){
        formData.append('file[]', v);
      }

      that.$axios.post(`/support/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(function (response) {
        if(response.data.result.SUCCESS) {
          that.buttonText = response.data.result.MESSAGE;
          document.querySelector('form .actions button[type="submit"]').disabled = true;
          console.log('reset inputs');
          that.$refs.type.resetValue()
          that.$refs.name.resetValue()
          that.$refs.fname.resetValue()
          that.$refs.oname.resetValue()
          // that.$refs.company.resetValue()
          // that.$refs.gender.resetValue()
          // that.$refs.age.resetValue()
          // that.$refs.status.resetValue()
          // that.$refs.martial.resetValue()
          that.$refs.address.resetValue()
          that.$refs.phone.resetValue()
          that.$refs.email.resetValue()
          that.$refs.theme.resetValue()
          that.$refs.text.resetValue()
          that.$refs.files.resetValue();

          TweenLite.delayedCall(3, function() {
            that.buttonText = that.$store.getters.getLang == 'en' ? 'Submit' : 'Отправить';
            document.querySelector('form .actions button[type="submit"]').disabled = true;
            that.isSending = false;
            that.formNotFilled = true;
          });
        } else {
          that.buttonText = that.$store.getters.getLang == 'en' ? 'Submit' : 'Отправить';
          that.isSending = false;
          that.formNotFilled = true;
          that.$refs.files.setError(response.data.result.ERROR);
          that.checkForm();
        }
      })
      .catch(function (error) {
      })
      .finally(function () {
      });
    },
    expandInfo(e) {
      e.preventDefault();

      let elem = e.target || e.srcElement,
          field = document.querySelector('.head-expend-info');


      if(elem.classList.contains('visible')) {
        TweenMax.to(field, 1, {height: 0, ease: Expo.easeOut});
        elem.classList.remove('visible');
      } else {
        TweenMax.set(field, {height: 'auto'});
        TweenMax.from(field, 1, {height: 0, ease: Expo.easeOut});
        elem.classList.add('visible');
      }
    }
  },
  components: {
    headerControl,
    imageDesc,
    cardPhotos,
    cardSimple,
    statementSimple,
    personSimple,

    inputBasic,
    selectBasic,
    fileBasic,
    textArea
  }
}
</script>

<style lang="scss" scoped>

  .form-not-filled {
    color: #ff0000
  }

  .materials-list {
    .material {
      padding: 0 0 40px;
      margin: 0 0 40px;
      border-bottom: 1px solid rgba(#000, 0.2);

      &:last-child {
        margin-bottom: 0;
        border: 0;
      }
    }
  }

  .end-info {
    text-align: center;
    padding: 40px 0;
  }

  form.with-padding {
    small {
      font-size: em(12);
      color: $lightblue;
      line-height: 1.25;
      display: block;
      margin-top: 30px;
    }
  }

  // .blue-block {
  //   .person-simple {
  //     // background: red;
  //
  //
  //     > *:first-child {
  //       flex: 0 0 64px;
  //       max-width: 64px;
  //       height: 64px;
  //     }
  //   }
  // }
</style>

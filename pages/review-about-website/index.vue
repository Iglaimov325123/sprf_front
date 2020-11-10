<template>
  <div class="page-content" data-type="inner">
    <section class="blue with-expand" data-type="inner-head">
      <div class="head-main center flex flex-just-b flex-center-v">
        <h1>{{$store.getters.getLang == 'en' ? 'Submit a bug report' : 'Замечания о работе сайта'}}</h1>

        <!-- <div class="flex head-buttons">
          <header-control v-on:click.native="expandInfo" :text="$store.getters.getLang == 'en' ? 'Info' : 'Информация'" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+ICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTIsMjRBMTIsMTIsMCwxLDEsMjQsMTIsMTIsMTIsMCwwLDEsMTIsMjRaTTEyLDJBMTAsMTAsMCwxLDAsMjIsMTIsMTAsMTAsMCwwLDAsMTIsMlptMSw4SDExdjhoMlptMC00SDExVjhoMloiLz48L3N2Zz4="></header-control>
        </div> -->
      </div>

      <!-- <div class="head-expend-info">
        <div class="center">
          <p>Деятельность Счетной палаты осуществляется путем проведения контрольных и экспертно-аналитических мероприятий в форме предварительного аудита, оперативного анализа и контроля и последующего аудита (контроля) в соответствии с утверждаемыми Счетной палатой стандартами внешнего государственного аудита (контроля). </p>
          <p>О результатах проведенных контрольных и экспертно-аналитических мероприятий Счетная палата информирует Совет Федерации и Государственную Думу, доводит их до сведения руководителей соответствующих федеральных органов исполнительной власти, иных государственных органов, органов местного самоуправления, организаций и учреждений. При наличии данных, указывающих на признаки составов преступлений, соответствующие материалы передаются в правоохранительные органы.</p>
        </div>
      </div> -->
    </section>

    <section data-type="page-content">
      <div class="center">
        <div class="page-contain">
          <div class="double-side no-padding flex flex-wrap">
            <div class="col-6" v-if="!formSended">
              <!-- <h3>{{$store.getters.getLang == 'en' ? 'Submit a bug report' : 'Отправить обращение: заявление, предложение или жалобу через форму обратной связи'}}</h3> -->
              <form action="#" v-on:submit.prevent="sendForm">
                <!-- <select-basic ref="type" name="type" :label="fields.type.LABEL" :values="types.slice(3)" :placeholder="types[0].VALUE"></select-basic> -->
                <text-area ref="theme" name="theme" :label="$store.getters.getLang == 'en' ? 'Message' : 'Тема сообщения'" :placeholder="$store.getters.getLang == 'en' ? 'Message' : 'Cообщение'"></text-area>
                <file-basic v-show="!smallForm" name="files" ref="files" :placeholder="fields.files.PLACE"></file-basic>
                <div class="form-not-filled" v-if="formNotFilled">{{$store.getters.getLang == 'en' ? 'Please fill in all required fields' : 'Заполните все обязательные поля'}}</div>
                <div class="actions">
                  <button type="submit" class="btn full-width" disabled>{{buttonText}}</button>
                </div>
              </form>
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
    let contacts = await context.app.$axios.get('/contacts/main');
    let types = await context.app.$axios.get('/support/type');
    let fields = await context.app.$axios.get('/support/fields');

    return { seo: contacts.data.seo, fields: fields.data.result, types: types.data.result }
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
      company: '',
      formNotFilled: false,

      buttonText: 'Отправить',

      formSended: false,
      smallView: false,
      isSending: false
    }
  },
  computed: {
    smallForm() {
      return this.smallView
    },
    titleLocalized() {
      return this.$store.getters.getLang === 'ru' ? 'Замечания по сайту' : 'About the website'
    }
  },
  created() {
    that = this;
  },
  mounted() {
    console.log('FIELDS BLYA ', this.types)
    this.buttonText = that.$store.getters.getLang == 'en' ? 'Submit' : 'Отправить';

  },
  methods: {
    checkForm() {
      // this.smallView = this.$refs.type.getValue() == 4 ? true : false

      let paramsSmall = {
        // type: this.$refs.type.checkField(),
        theme: this.$refs.theme.checkField(),
      }


        if(paramsSmall.theme) {
          document.querySelector('[data-name="theme"]').classList.add('error');
        } else {
          document.querySelector('[data-name="theme"]').classList.remove('error');
        }

      let rows = document.querySelectorAll('.form-row.error'),
          valid = rows.length != 0 ? false : true;

      console.log('VALUD FORM', valid);
      if(valid) {
        this.formNotFilled = false
        document.querySelector('form .actions button[type="submit"]').disabled = false;
      } else {
        this.formNotFilled = true
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

      let formData = new FormData();
      formData.append('type', 4);
      formData.append('theme', this.$refs.theme.getValue());
      // formData.append('message', this.$refs.theme.getValue());
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
        console.log(response.data.result);
        that.buttonText = response.data.result.MESSAGE;
        if(response.data.result.SUCCESS) {
          document.querySelector('form .actions button[type="submit"]').disabled = true;
          console.log('reset inputs');
          // that.$refs.type.resetValue()
          that.$refs.theme.resetValue()
          that.$refs.files.resetValue();

          TweenLite.delayedCall(3, function() {
            that.buttonText = that.$store.getters.getLang == 'en' ? 'Submit' : 'Отправить';
            document.querySelector('form .actions button[type="submit"]').disabled = false;
            that.isSending = false;
          });
        } else {
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

<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b flex-top-v">
        <h1 class="dept-name">{{item.NAME}}</h1>
        <header-button text="" link="/structure/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <p class="first" v-html="item.ACTIVITIES.TEXT" v-if="item.ACTIVITIES">Предметом и основными целями деятельности Учреждения являются: аналитическое сопровождение деятельности Счетной палаты; экспертная поддержка деятельности Счетной палаты; информационное обеспечение деятельности Счетной палаты; обеспечение эксплуатации информационных систем, оператором которых является Счетная палата; внедрение и развитие применения информационных технологий в деятельности Счетной палаты.</p>
          
          <expand-block v-if="$store.getters.getLang == 'en' && item.DETAIL_TEXT" title="" :text="item.DETAIL_TEXT"></expand-block>
          <expand-block v-else-if="item.DETAIL_TEXT" title="Направления деятельности" :text="item.DETAIL_TEXT"></expand-block>

          <div class="dept-control">
            <h3 v-if="$store.getters.getLang == 'en'">Head of the department</h3>
            <h3 v-else>{{item.DIRECTOR ? item.DIRECTOR.STATE_TYPE : 'Руководство департамента'}}</h3>
            <div class="grid flex">
              <div class="col-4">
                <!-- <p>{{$store.getters.getLang == 'en' ? 'Reception of documents is carried out by appointment by phone from Tuesday to Friday during working hours' : 'Приём документов осуществляется по предварительной записи по телефону со вторника по пятницу в рабочие часы'}}</p> -->
                <div class="contact-list">
                  <div class="contact">
                    <div class="name">
                      {{$store.getters.getLang == 'en' ? 'Phone' : 'Телефон'}}
                    </div>
                    <a :href="'tel:'+item.PHONE">{{item.PHONE}}</a>
                  </div>
                  <div class="contact">
                    <div class="name">
                      {{$store.getters.getLang == 'en' ? 'E-mail' : 'Эл. почта'}}
                    </div>
                    <a :href="'mailto:'+item.EMAIL">{{item.EMAIL}}</a>
                  </div>
                  <div class="contact">
                    <div class="name">
                      {{$store.getters.getLang == 'en' ? 'Address' : 'Адрес'}}
                    </div>
                    <address>{{item.ADDRESS}}</address>
                  </div>
                </div>
              </div>
              <div class="col-5">
                <div class="person-list">
                  <person-small v-for="person in item.PERSON" :name="person.NAME" v-if="item.PERSON" :code="person.ID" :pos="person.POSITION" :photo="person.PREVIEW_PICTURE"></person-small>
                  <person-small :name="item.DIRECTOR.NAME" v-if="item.DIRECTOR" :pos="item.DIRECTOR.TITLE" :photo="item.DIRECTOR.IMG"></person-small>
                </div>
              </div>
              <div class="col-3">
                <p v-html="item.INFO_TEXT.TEXT" v-if="item.INFO_TEXT">Прием граждан осуществляется при предъявлении паспорта или иного удостоверяющего личность документа. Личный приём граждан в заявительном порядке в день обращения в общественую приемную Счетной палаты по приёму граждан проводят уполномоченные лица – <router-link to="/">работники Департамента управления делами Счетной палаты</router-link> по работе с обращениями граждан и организаций.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
const headerButton = require('~/components/ui/head-button').default;
const expandBlock = require('~/components/ui/expand-block').default;
const personSmall = require('~/components/ui/person/person-small').default;

const materialSimple = require('~/components/ui/materials/material-simple').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;

let that;
export default {
  async asyncData (context) {
    let dept = await context.app.$axios.get(`/departments/item/${context.route.params.dept}`),
        item = dept.data.result,
        persons = [];

    for(let i = 0; i < item.PERSON.length; i++) {
      persons.push(item.PERSON[i].ID);
    }

    return { seo: dept.data.seo, item: item, persons: persons }
  },
  head() {
    return {
      title: this.seo.TITLE,
      meta: [
        {name: 'description', content: this.seo.DESCRIPTION},
        {name: 'keywords', content: this.seo.KEYWORDS}
      ]
    }
  },
  data() {
    return {
      currentUrl: '',
      seo: {
        TITLE: '',
        DESCRIPTION: '',
        KEYWORDS: ''
      },
      code: '',
      item: {
        INFO_TEXT: {},
        DIRECTOR: {},
        PERSON: []
      },
      persons: [],
    }
  },
  props: {
  },
  created() {
    that = this;
    if(this.$route.params.dept == 'deptartment') {
      console.log('department');
    }
  },
  mounted() {
    this.currentUrl = window.location.href;
    if(this.$route.params.dept == null || this.$route.params.dept == undefined) {
      console.log('Ливаем отсюда');
      this.$router.push('/structure/');
    }

  },
  methods: {
  },
  components: {
    headerButton,
    expandBlock,
    personSmall,

    // Materials
    materialSimple,
    shareBtnFix
  }
}
</script>

<style lang="scss" scoped>
  .dept-name {
    font-size: em(36);
    line-height: 1.4;
    flex: 0 0 90%;
    max-width: 90%;
  }
  p.first + .expand-block {
    margin-top: 64px;
  }

  .dept-control {
    margin: 40px 0 0;
    padding: 48px;
    background: $cardblue;

    .grid {
      margin-top: 40px;
      font-family: $titlesans;

      .contact-list {
        marign-top: 20px;

        .contact {
          margin-top: 20px;
          font-size: em(20);
          line-height: 1.44;

          .name {
            font-size: 16px;
            margin-bottom: 8px;
          }

          address {
            color: $blue;
          }
        }
      }

      .col-4:first-child {
        p {
          font-size: em(20);
          line-height: 1.44;
        }
      }
      .col-5 {
        padding-left: 48px;
      }
      .col-3 {
        p {
          font-size: 12px;
          line-height: 1.44;
        }
      }
    }
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

  // Белая тема для слабовидящих:
  .d-white {
    .dept-control {
      background: #fff;
      border: 1px solid #000;

      .grid {
        .contact-list {
          .contact {
            address {
              color: #000;
            }
          }
        }
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .dept-control {
      background: #000;
      border: 1px solid #fff;

      .grid {
        .contact-list {
          .contact {
            address {
              color: #fff;
            }
          }
        }
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .dept-control {
      background: $ddl;
      border: 1px solid $ddk;

      .grid {
        .contact-list {
          .contact {
            address {
              color: $ddk;
            }
          }
        }
      }
    }
  }

  @media (max-width: 767px) {
    .dept-name {
      font-size: em(20);
      line-height: 1.44;
      max-width: 80%;
    }
    .dept-control {
      padding: 0;
    	margin: 40px -20px 0;
      background: transparent;
      border-top: 8px solid #F1F2F5;
      padding: 32px 20px 0;

      h3 {
        font-size: em(24);
      }

      .person {
        padding: 0;
      }

      .grid {
        margin-top: 24px;
        flex-wrap: wrap;

        .col-4:first-child {
          p {
            font-size: em(16);
            line-height: 1.44;
          }
        }

        .col-5 {
          flex: 0 0 100%;
          max-width: 100%;
          // padding-left: 0;
          // padding-top: 24px;
          // margin-top: 24px;
          padding: 24px 0;
          margin: 24px 0;
          border-top: 1px solid rgba(#000, 0.2);
          border-bottom: 1px solid rgba(#000, 0.2);
        }
      }

      .col-4 {
        flex: 0 0 100%;
        max-width: 100%;
      }
    }
  }
</style>

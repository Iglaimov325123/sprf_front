<template>
  <div class="page-content" data-type="inner">
    <section class="blue" data-type="inner-head">
      <div class="center flex flex-just-b">
        <h1>{{$store.getters.getLang == 'en' ? 'Structure' : 'Структура'}}</h1>
        <header-button :text="$store.getters.getLang == 'en' ? 'Back' : 'Назад'" link="/" icon="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNkgxMkgxNS41QzE5LjA4OTkgNiAyMiA4LjkxMDE1IDIyIDEyLjVWMTIuNUMyMiAxNi4wODk5IDE5LjA4OTkgMTkgMTUuNSAxOUgxMkgyIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTYuOTQ5NzUgMTAuODk5TDIgNS45NDkyMkw2Ljk0OTc1IDAuOTk5NDcxIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg=="></header-button>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <client-only placeholder="Share"><share-btn-fix :link="currentUrl" :text="seo.DESCRIPTION" :id="0" :name="seo.TITLE"></share-btn-fix></client-only>
        <div class="page-contain">
          <p class="first" v-html="info.ADDITIONAL"></p>
          <div class="structure-list">
            <div class="structure-row flex" :class="index === apparatFirstRowIndex ? 'structure-row--apparat-first' : ''" v-for="(row, index) in persons">
              <person class="col-4" v-for="person in row" :photo="person.PREVIEW_PICTURE" :name="person.NAME" :pos="person.POSITION" :link="$store.getters.getLang != 'en' ? '/structure/'+person.CODE : '/en/structure/'+person.CODE"></person>
            </div>
          </div>
          <p class="block-quote" v-html="info.TEXT">
          </p>
        </div>
      </div>
    </section>
    <section data-type="page-content" v-for="deptList in departments">
      <div class="center">
        <div class="page-contain">
          <p class="first">{{deptList.NAME}}</p>

          <div class="structure-items">
            <div class="structure-item" v-for="dept in deptList.ITEMS">
              <router-link :to="$store.getters.getLang != 'en' ? '/structure/department/'+dept.ID : '/en/structure/department/'+dept.ID">{{dept.NAME}}</router-link>
              <div class="author-list flex">
                <person-simple class="col-4" v-for="person in dept.PERSON" v-if="dept.PERSON" :code="person.ID" :photo="person.PREVIEW_PICTURE" :name="person.NAME" :pos="person.POSITION"></person-simple>
                <person-simple class="col-4" :photo="dept.DIRECTOR.IMG" v-if="dept.DIRECTOR" :code="dept.DIRECTOR.ID" :name="dept.DIRECTOR.NAME" :pos="dept.DIRECTOR.TITLE"></person-simple>
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
const person = require('~/components/ui/person/person').default;
const personSimple = require('~/components/ui/person/person-simple').default;
const shareBtnFix = require('~/components/ui/share-button-fix').default;


let that;
export default {
  async asyncData (context) {
    let persons = await context.app.$axios.get('/persons/list'),
        departments = await context.app.$axios.get('/departments/list');
        
    console.log('PERSONS', persons);

    return { seo: persons.data.seo, info: persons.data.info, persons: persons.data.result, departments: departments.data.result }
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
      persons: [],
      departments: [],
      info: {TEXT:''}
    }
  },
  computed: {
    apparatFirstRowIndex() {
      return this.persons.findIndex((row) => {
        return row[0].LEVEL.CODE === 'apparat';
      });
    },
  },
  created() {
    that = this;
  },
  mounted() {
    this.currentUrl = window.location.href;
    console.log('PERSONS', this.persons)
    console.log('DEPTS', this.departments)
    // that.$axios.get('/persons/list')
    //   .then(function (response) {
    //     that.persons = response.data.result;
    //     console.log(that.persons);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //   });
    //
    // that.$axios.get('/departments/list')
    //   .then(function (response) {
    //     that.departments = response.data.result;
    //     console.log('departments', that.departments);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .finally(function () {
    //   });

  },
  components: {
    headerButton,
    person,
    personSimple,
    shareBtnFix
  }
}
</script>

<style lang="scss" scoped>
  .structure-items {
    margin-top: 28px;

    a {
      font-size: em(22);
      line-height: 1.44;
      font-family: $titlesans;
    }

    .structure-item {
      padding: 28px 0 40px;
      border-bottom: 1px solid rgba($lightblue, 0.4);

      &:last-child {
        border-bottom: 0;
        padding-bottom: 10px;
      }

      .author-list {
        margin-top: 24px;
      }
    }
  }
  .structure-list {
    margin: 64px 0 44px;

    .structure-row {
      background: $carddark;
      position: relative;
      padding: 14px 0;

      .person {
        padding: 10px 24px;
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30%;
        opacity: 0.3;
        background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
      }

      &:first-child {
        background: $cardblue;
      }

      &--apparat-first {
        margin-top: 30px;
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .structure-list {
      .structure-row {
        padding: 4px 0;

        .person {
          padding: 10px 12px;
        }
      }
    }

    .structure-items {
      .structure-item {
        .author-list {
          .person-simple {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .structure-list {
      .structure-row {
        padding: 4px 0;
        flex-wrap: wrap;

        .person {
          padding: 10px 50px 10px 12px;
          flex: 0 0 50%;
          max-width: 50%;
        }
      }
    }

    .structure-items {
      .structure-item {
        .author-list {
          .person-simple {
            flex: 0 0 50%;
            max-width: 50%;
          }
        }
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .structure-list {
      margin: 32px 0 44px;

      .structure-row {
        flex-wrap: wrap;
        padding: 0;

        &:before {
          display: none;
        }

        .person {
          flex: 0 0 100%;
          max-width: 100%;
          position: relative;
          padding: 20px;

          &:before {
            content: '';
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 30%;
            opacity: 0.3;
            background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
          }
        }
      }
    }

    .structure-items {
      margin-top: 20px;

      a {
        font-size: 16px;
      }

      .author-list {
        flex-wrap: wrap;

        .person-simple {
          flex: 0 0 100%;
          max-width: 100%;

          &+.person-simple {
            margin-top: 16px;
          }
        }
      }
    }
  }

  // Белая тема для слабовидящих:
  .d-white {
    .structure-list {
      border: 1px solid #000;
    }
    .structure-list .structure-row {
      background: #fff;
      border-bottom: 1px solid #000;

      &:last-child {
        border-bottom: 0;
      }
    }
  }

  // Темная тема для слабовидящих:
  .d-black {
    .structure-list {
      border: 1px solid #fff;
    }
    .structure-list .structure-row {
      background: #000;
      border-bottom: 1px solid #fff;

      &:before {
        display: none;
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }

  // Синяя тема для слабовидящих:
  .d-blue {
    .structure-list {
      border: 1px solid $ddk;
    }
    .structure-list .structure-row {
      background: $ddl;
      border-bottom: 1px solid $ddk;

      &:before {
        display: none;
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }
</style>

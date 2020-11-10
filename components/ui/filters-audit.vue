<template lang="html">
  <section data-type="page-content">
    <div class="filter-field center">
      <div class="filter-inner flex flex-wrap" style="height: 0">

        <div class="filter-inner-content">
          <div class="filter-top flex col-12">
            <div class="col-4 filter-col" v-if="!national">
              <div class="filter-name" @click="openFilterCol">
                {{$store.getters.getLang == 'en' ? 'Audit category' : 'Категория аудита'}}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.89 8.01">
                  <path d="M13,8.12.55,1.89,1.45.11,13,5.88,24.55.11l.9,1.78Z" transform="translate(-0.55 -0.11)" fill="#04092a"/>
                </svg>
              </div>
              <div class="filter-col-inner">
                <div class="filter-title">
                  {{$store.getters.getLang == 'en' ? 'Audit category' : 'Категория аудита'}}
                </div>
                <vue-simplebar class="filter-value">
                  <ul class="select">
                    <li :class="category.selected ? 'selected' : ''" v-for="category in categories" @click="toggleType(category)" v-bind:style="{ pointerEvents: category.IS_ACTIVE ? 'all' : 'none' }">{{category.NAME}}</li>
                  </ul>
                  <div class="real-select">
                    <select name="type[]">
                      <option :value="category.ID" v-for="category in categories" :selected="category.selected">{{category.NAME}}</option>
                    </select>
                  </div>
                </vue-simplebar>
              </div>
            </div>
            <div class="col-4 filter-col" v-if="national">
              <div class="filter-name" @click="openFilterCol">
                {{$store.getters.getLang == 'en' ? 'National goals' : 'Наццели'}}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.89 8.01">
                  <path d="M13,8.12.55,1.89,1.45.11,13,5.88,24.55.11l.9,1.78Z" transform="translate(-0.55 -0.11)" fill="#04092a"/>
                </svg>
              </div>
              <div class="filter-col-inner">
                <div class="filter-title">
                  {{$store.getters.getLang == 'en' ? 'National goals' : 'Наццели'}}
                </div>
                <vue-simplebar class="filter-value">
                  <ul class="select">
                    <li :class="type.selected ? 'selected' : ''" v-for="type in targets" @click="toggleType(type)" v-html="type.VALUE"></li>
                  </ul>
                  <div class="real-select">
                    <select name="targets[]">
                      <option :value="type.ID" v-for="type in targets" :selected="type.selected">{{type.VALUE}}</option>
                    </select>
                  </div>
                </vue-simplebar>
              </div>
            </div>
            <div class="col-4 filter-col" v-if="national">
              <div class="filter-name" @click="openFilterCol">
                {{$store.getters.getLang == 'en' ? 'National projects' : 'Нацпроекты'}}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.89 8.01">
                  <path d="M13,8.12.55,1.89,1.45.11,13,5.88,24.55.11l.9,1.78Z" transform="translate(-0.55 -0.11)" fill="#04092a"/>
                </svg>
              </div>
              <div class="filter-col-inner">
                <div class="filter-title">
                  {{$store.getters.getLang == 'en' ? 'National projects' : 'Нацпроекты'}}
                </div>
                <vue-simplebar class="filter-value">
                  <ul class="select">
                    <li :class="type.selected ? 'selected' : ''" v-for="type in projects" @click="toggleType(type)" v-html="type.VALUE"></li>
                  </ul>
                  <div class="real-select">
                    <select name="projects[]">
                      <option :value="type.ID" v-for="type in projects" :selected="type.selected">{{type.VALUE}}</option>
                    </select>
                  </div>
                </vue-simplebar>
              </div>
            </div>
            <div class="col-4 filter-col">
              <div class="filter-name" @click="openFilterCol">
                {{$store.getters.getLang == 'en' ? 'Date' : 'Дата'}}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.89 8.01">
                  <path d="M13,8.12.55,1.89,1.45.11,13,5.88,24.55.11l.9,1.78Z" transform="translate(-0.55 -0.11)" fill="#04092a"/>
                </svg>
              </div>
              <div class="filter-col-inner">
                <div class="filter-value calendar">
                  <!-- <flat-pickr v-model="date" :config="config"></flat-pickr> -->
                  <FunctionalCalendar
                        v-model="date"
                        :configs="config"
                        ref="Calendar"
                        v-on:selectedDaysCount="getDays"
                  ></FunctionalCalendar>
                </div>
              </div>
            </div>
          </div>
          <div class="reset-filter" v-if="$parent.hasFilter">
            <button type="button" class="btn full-width" name="button" @click="resetFilter">{{$store.getters.getLang == 'en' ? 'Reset filtering options' : 'Сброс параметров фильтрации'}}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const personSmall = require('~/components/ui/person/person-nopos-nolink').default;
const MorphSVG = require('gsap/src/uncompressed/plugins/MorphSVGPlugin');

let that;
export default {
  data() {
    return {
      date: null,
      config: {
        isDateRange: true,
        inline: true,
        monthNames: this.$store.getters.getLang == 'en' ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] : ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        dayNames: this.$store.getters.getLang == 'en' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] : ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        applyStylesheet: false,
        dateFormat: 'dd.mm.yyyy',
        changeYearFunction: true,
        changeYearStep: 1,
        // shorthandCurrentMonth: true
      },
      persons: [],
      filteredPersons: [],
      personQuery: '',
      categories: [],
      scopes: [],
      regions: [],
      targets: [],
      projects: [],

      filteredItems: [],

      dateFilter: '',
      personFilter: [],
      categoryFilter: [],
      scopeFilter: [],
      regionFilter: [],
      targetsFilter: [],
      projectsFilter: [],
      date: null,
    }
  },
  props: {
    filter: String,
    post: String,
    category: String,
    national: Boolean,
    archive: Boolean
  },
  created() {
    that = this;
  },
  mounted() {
      that.$axios.get('/persons/list')
        .then(function (response) {
          that.persons = response.data.result;

          console.log('filter persons', that.persons);

          for(let i = 0; i < that.persons.length; i++) {
            that.persons[i].active = false;
          }

          that.filteredPersons = that.persons;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });

      that.$axios.get('/audits/category', {
        params: {
          category: that.category
        }
      })
        .then(function (response) {
          console.log('audit categories', response);
          let cats = response.data.result;
          for(let i = 0; i < cats.length; i++) {
            if(cats[i].ID == Number(that.category)) {
              cats[i].selected = true;
            } else {
              cats[i].selected = false;
            }
          }
          that.categories = cats;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });

      that.$axios.get('/controls/scopes')
        .then(function (response) {
          let scopes = response.data.result;
          for(let i = 0; i < scopes.length; i++) {
            scopes[i].selected = false;
          }
          that.scopes = scopes;
          console.log(scopes);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });

      that.$axios.get('/controls/regions')
        .then(function (response) {
          let regions = response.data.result;
          for(let i = 0; i < regions.length; i++) {
            regions[i].selected = false;
          }
          that.regions = regions;
          console.log(regions);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });

      that.$axios.get('/nacional_audits/targets')
        .then(function (response) {
          let targets = response.data.result;
          for(let i = 0; i < targets.length; i++) {
            targets[i].selected = false;
          }
          that.targets = targets;
          console.log(targets);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });

      that.$axios.get('/nacional_audits/projects')
        .then(function (response) {
          let projects = response.data.result;
          for(let i = 0; i < projects.length; i++) {
            projects[i].selected = false;
          }
          that.projects = projects;
          console.log(projects);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
        });


        // targets: [],
        // projects: [],
  },
  methods: {
    changeType(type, types) {
      for(let i = 0; i < types.length; i++) {
        if(types[i] != type) {
          types[i].selected = false;
        } else {
          types[i].selected = true;
        }
      }

      this.basicFilter(this.personQuery);
    },
    toggleType(type) {
      if(type.selected) {
        type.selected = false;
      } else {
        type.selected = true;
      }

      this.basicFilter(this.personQuery);
    },

    togglePerson(person){
      let mainElement;
      for(let i = 0; i < that.persons.length; i++) {
        if(that.persons[i].ID == person.ID) {
          mainElement = that.persons[i];
        }
      }

      if(mainElement.active) {
        mainElement.active = false;
      } else {
        mainElement.active = true;
      }

      this.basicFilter(this.personQuery);
    },

    basicFilter(query) {
      that.filterItems();
    },

    filterPersons(e) {
      let elem = e.target || e.srcElement,
          val = elem.value;

      this.basicFilter(val);
    },

    getFilterObject() {
      this.personFilter = [];
      for(let i = 0; i < that.persons.length; i++) {
        if(that.persons[i].active) {
          this.personFilter.push(that.persons[i].ID);
        }
      }
      this.categoryFilter = [];
      for(let i = 0; i < that.categories.length; i++) {
        if(that.categories[i].selected) {
          this.categoryFilter.push(that.categories[i].ID);
        }
      }

      this.scopeFilter = [];
      for(let i = 0; i < that.scopes.length; i++) {
        if(that.scopes[i].selected) {
          this.scopeFilter.push(that.scopes[i].ID);
        }
      }

      this.regionFilter = [];
      for(let i = 0; i < that.regions.length; i++) {
        if(that.regions[i].selected) {
          this.regionFilter.push(that.regions[i].ID);
        }
      }

      this.targetsFilter = [];
      for(let i = 0; i < that.targets.length; i++) {
        if(that.targets[i].selected) {
          this.targetsFilter.push(that.targets[i].ID);
        }
      }

      this.projectsFilter = [];
      for(let i = 0; i < that.projects.length; i++) {
        if(that.projects[i].selected) {
          this.projectsFilter.push(that.projects[i].ID);
        }
      }

      let startDate, endDate, compDate;
      if(this.date != null) {
        if(this.date.dateRange.start.date) {
          startDate = this.date.dateRange.start.date.replace('/', '.');
        } else {
          startDate = '01.01.1990';
        }
        if(this.date.dateRange.end.date) {
          endDate = this.date.dateRange.end.date.replace('/', '.');
        } else {
          endDate = '01.01.3000';
        }
        compDate = startDate+','+endDate;
      }

      // if(compDate != null) {
      //   this.$parent.hasFilter = true;
      // } else {
      //   this.$parent.hasFilter = false;
      // }
      // console.log(compDate);

      if(this.personFilter.length != 0 || this.categoryFilter.length != 0 || this.scopeFilter.length != 0 || this.regionFilter.length != 0 || this.targetsFilter.length != 0 || this.projectsFilter.length != 0) {
        this.$parent.hasFilter = true;
      } else {
        this.$parent.hasFilter = false;
      }

      return {
        person: this.personFilter.join(),
        scope: this.scopeFilter.join(),
        region: this.regionFilter.join(),
        category: this.categoryFilter.join(),
        date: compDate != null ? compDate : '',
        targets: this.targetsFilter.join(),
        projects: this.projectsFilter.join(),
        archive: this.archive ? 1 : 0,
        page: 1
      };
    },

    filterItems() {
      this.personFilter = [];
      for(let i = 0; i < that.persons.length; i++) {
        if(that.persons[i].active) {
          this.personFilter.push(that.persons[i].ID);
        }
      }
      this.categoryFilter = [];
      for(let i = 0; i < that.categories.length; i++) {
        if(that.categories[i].selected) {
          this.categoryFilter.push(that.categories[i].ID);
        }
      }

      this.scopeFilter = [];
      for(let i = 0; i < that.scopes.length; i++) {
        if(that.scopes[i].selected) {
          this.scopeFilter.push(that.scopes[i].ID);
        }
      }

      this.regionFilter = [];
      for(let i = 0; i < that.regions.length; i++) {
        if(that.regions[i].selected) {
          this.regionFilter.push(that.regions[i].ID);
        }
      }

      this.targetsFilter = [];
      for(let i = 0; i < that.targets.length; i++) {
        if(that.targets[i].selected) {
          this.targetsFilter.push(that.targets[i].ID);
        }
      }

      this.projectsFilter = [];
      for(let i = 0; i < that.projects.length; i++) {
        if(that.projects[i].selected) {
          this.projectsFilter.push(that.projects[i].ID);
        }
      }

      let startDate, endDate, compDate;
      if(this.date != null) {
        if(this.date.dateRange.start.date) {
          startDate = this.date.dateRange.start.date.replace('/', '.');
        } else {
          startDate = '01.01.1990';
        }
        if(this.date.dateRange.end.date) {
          endDate = this.date.dateRange.end.date.replace('/', '.');
        } else {
          endDate = '01.01.3000';
        }
        compDate = startDate+','+endDate;
      }
      //
      // console.log(startDate == 01.01.1990, endDate == 01.01.3000);
      //
      if((startDate != '01.01.1990' && endDate != '01.01.3000') || this.personFilter.length != 0 || this.categoryFilter.length != 0 || this.scopeFilter.length != 0 || this.regionFilter.length != 0 || this.targetsFilter.length != 0 || this.projectsFilter.length != 0) {
        // console.log('has filter');
        this.$parent.hasFilter = true;
      } else {
        // console.log('no filter');
        this.$parent.hasFilter = false;
      }
      // if(this.targetsFilter.length > 0 || this.projectsFilter.length > 0 || this.regionFilter.length > 0 || this.scopeFilter.length > 0 || ((startDate !== '01.01.1990' || endDate !== '01.01.3000'))) {
      //   this.$parent.hasFilter = true;
      // } else {
      //   this.$parent.hasFilter = false;
      // }

      that.$axios.get(that.post, {
          params: {
            person: this.personFilter.join(),
            scope: this.scopeFilter.join(),
            region: this.regionFilter.join(),
            category: this.categoryFilter.join(),
            date: compDate != null ? compDate : '',
            targets: this.targetsFilter.join(),
            projects: this.projectsFilter.join(),
            archive: this.archive ? 1 : 0,
            page: 1,
            count: 5
          }
        })
        .then(function (response) {
          console.log('response data', response.data.result);
          that.filteredItems = response.data.result.items;
          // that.$parent[that.filter] = that.filteredItems;
          that.$parent.items = that.filteredItems;
          that.$parent.page = 1;
          that.$parent.totalPage = response.data.result.pages;
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
      });

    },

    getDays(days) {
      this.basicFilter(this.personQuery);
    },

    openFilterCol(e) {
      let elem = e.target || e.srcElement,
          col = elem.closest('.filter-col').querySelector('.filter-col-inner');

      if(elem.classList.contains('active')) {
        elem.classList.remove('active');

        TweenMax.to(elem.querySelector('svg path'), 1, {morphSVG: 'M13,8.12.55,1.89,1.45.11,13,5.88,24.55.11l.9,1.78Z', ease: Expo.easeOut})
        TweenMax.to(col, 1, {height: 0, ease: Expo.easeOut});
      } else {
        elem.classList.add('active');

        TweenMax.to(elem.querySelector('svg path'), 1, {morphSVG: 'M13,2.34,2.55,8.12,1.45,6.33,13,.11,24.55,6.33l-1.1,1.79Z', ease: Expo.easeOut})
        TweenMax.set(col, {height: 'auto'});
        TweenMax.from(col, 1, {height: 0, ease: Expo.easeOut});
      }
    },


    resetFilter() {
      that.$parent.hasFilter = false;

      for(let i = 0; i < that.persons.length; i++) {
        that.persons[i].active = false;
      }
      //
      console.log(this.category);
      if(this.category == null || this.category == '') {
        for(let i = 0; i < that.categories.length; i++) {
          that.categories[i].selected = false;
        }
      }
      //
      for(let i = 0; i < that.scopes.length; i++) {
        that.scopes[i].selected = false;
      }
      //
      for(let i = 0; i < that.regions.length; i++) {
        that.regions[i].selected = false;
      }
      //
      for(let i = 0; i < that.targets.length; i++) {
        that.targets[i].selected = false;
      }
      //
      for(let i = 0; i < that.projects.length; i++) {
        that.projects[i].selected = false;
      }

      if (that.date) {
        that.date.dateRange.end.date = null
        that.date.dateRange.start.date = null
      }

      console.log(that.$parent);

      this.filterItems();
    }
  },
  components: {
    personSmall
  }
}
</script>

<style lang="scss" scoped>
  .filter-inner {
    // height: 80px;
    border-radius: 4px;
    margin-bottom: 8px;
    background: #fff;
    display: flex;
    align-items: center;
    font-size: em(18);
    position: relative;
    @include box-shadow(0, 4px, 8px, rgba($lightblue, 0.4));
    transition: box-shadow 0.5s $cubic;
    overflow: hidden;
    margin-top: -8px;

    .filter-name {
      display: none;
    }

    .filter-inner-content {
      padding: 22px 24px;
      width: 100%;
    }

    .filter-col {
      position: relative;

      &:before {
        content: '';
        display: block;
        position: absolute;
        top: -14px;
        left: -5px;
        right: -5px;
        bottom: 0;
        background: transparent;
        border-radius: 8px;
        @include box-shadow(0, 0, 0, rgba($lightblue, 0.4));
        transition: background 0.2s $cubic, box-shadow 0.2s $cubic;
        z-index: 0;
      }

      &:hover:before {
        background: $cardblue;
        @include box-shadow(0, 4px, 8px, rgba($lightblue, 0.4));
      }

      .filter-col-inner {
        padding: 0 16px;
        position: relative;
        z-index: 1;
      }
    }

    .filter-top {
      width: 100%;
      padding-bottom: 20px;
    }

    .filter-title {
      border-bottom: 1px solid rgba(#04092A, 0.2);
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 18px;

      &.search {
        position: relative;

        &:after {
          content: '';
          width: 14px;
          height: 14px;
          top: 50%;
          right: 0;
          margin-top: -2px;
          background: url('~assets/img/search-small.svg') no-repeat center;
        }

        input[type="text"] {
          background: transparent;
          color: #000;
          padding: 0;
        }
      }
    }

    .filter-value {
      // margin-top: 24px;
      max-height: 335px;

      &.calendar {
        max-height: 100%;
        padding-bottom: 10px;
      }

      .select {
        li:first-child {
          margin-top: 24px;
        }
      }

      &.calendar {
        margin-top: 0;
      }

      .real-select {
        opacity: 0;
        position: absolute;
        visibility: hidden;
        top: -9999px;
        left: -9999px;
      }

      .persons-list {
        .person {
          cursor: pointer;
          margin-bottom: 15px;

          &:first-child {
            margin-top: 24px;
          }

          &:last-child {
            margin-bottom: 0;
          }

          &.active {
            color: $blue;
            .person-info {
              color: $blue;
            }
            .person-info p{
              color: $blue;
            }
          }
        }
      }
    }

    ul.select {
      padding: 0;
      margin: 0;

      li {
        font-size: 16px;
        color: $lightblue;
        margin-bottom: 10px;
        cursor: pointer;
        position: relative;
        padding-left: 0;

        &:before {
          display: none;
        }

        &:after {
          content: '';
          width: 8px;
          height: 8px;
          background: #FF004C;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          right: 0;
          margin-top: -4px;
          transform: scale(0) translateZ(0);
          will-change: transform;
          transition: transform 0.5s $cubic;
        }

        &:hover {
          color: $blue;
        }

        &.selected {
          color: $blue;

          &:after {
            transform: scale(1) translateZ(0);
          }
        }
      }
    }
  }

  .filter-extend {
    height: 0;
    overflow: hidden;

    .col-3 {
      padding-top: 20px;
    }
  }

  .expand-button {
    margin-top: 0;
    opacity: 1;
    transition: opacity 1s $cubic;
    will-change: opacity;
    flex: 0 0 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 12px;
    width: 100%;

    .expand-icon {
      width: 28px;
      height: 28px;
      position: relative;
      cursor: pointer;

      &:before, &:after {
        content: '';
        display: block;
        position: absolute;
        width: 4px;
        height: 4px;
        background: $blue;
        top: 50%;
        margin-top: -2px;
        border-radius: 50%;
      }

      i {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 4px;
        height: 4px;
        background: $blue;
        margin: -2px 0 0 -2px;
        border-radius: 50%;
      }

      &:before {
        left: 0;
      }
      &:after {
        right: 0;
      }
    }
  }

  // Мелкий десктоп
  @media (min-width: 1024px) and (max-width: 1200px) {
    .filter-inner {
      .filter-inner-content {
        padding-left: 4px;
        padding-right: 20px;
      }

      .filter-col {
        .filter-col-inner {
          padding: 0 12px;
        }
      }
    }
  }

  // Планшет
  @media (min-width: 768px) and (max-width: 1023px) {
    .filter-inner {
      .filter-inner-content {
        padding-left: 4px;
        padding-right: 4px;
      }

      .filter-col {
        flex: 0 0 50%;
        max-width: 50%;

        &:nth-last-child(1), &:nth-last-child(2) {
          margin-top: 40px;
        }

        &:last-child {
          .filter-col-inner {
            padding-right: 12px;
          }
        }

        .filter-col-inner {
          padding: 0 12px;
        }
      }

      .filter-top {
        flex-wrap: wrap;
      }

      .filter-value {
        .persons-list {
          .person {
            max-width: 80%;
          }
        }
      }
    }
  }

  // Телефон
  @media (max-width: 767px) {
    .filter-inner {
      .filter-name {
        display: block;
        height: 56px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        font-size: 20px;
        border-top: 1px solid rgba(#04092A, 0.2);
        position: relative;

        &.active {
          svg {
            path {
              fill: #8B91A9;
            }
          }
        }

        svg {
          pointer-events: none;
          width: 26px;
          height: 9px;
          position: absolute;
          right: 20px;
          top: 50%;
          margin-top: -4.5px;

          path {
            fill: #04092A;
            transition: fill 0.5s $cubic;
          }
        }
      }
      .filter-title {
        display: none;
        &.search {
          display: block;
          height: 56px;
          border-bottom: 0;
          border-top: 1px solid rgba(4, 9, 42, 0.2);

          input[type="text"] {
            padding: 0 20px;
            height: 56px;
            background-image: url('~assets/img/search-medium.svg');
            background-repeat: no-repeat;
            background-size: 25px 25px;
            background-position: right 15px center;
          }
        }
      }
      .filter-col-inner {
        height: 0;
        position: relative;
        overflow: hidden;
      }
      .filter-inner-content {
        padding: 0;
      }
      div.filter-value {
        margin-top: 0;
      }
      div.filter-value.calendar {
        border-top: 1px solid rgba(#04092A, 0.2);
        padding: 20px;
        max-height: 100%;
      }
      section.filter-value {
        border-top: 1px solid rgba(#04092A, 0.2);
        margin-top: 0;

        .select {
          li:first-child {
            margin-top: 0;
          }
        }

        .persons-list {
          .person {
            &:first-child {
              margin-top: 0;
            }
          }
        }

        .persons-list {
          .person {
            margin-bottom: 0;
            height: 56px;
            align-items: center;
            border-bottom: 1px solid rgba(#04092A, 0.2);
            padding: 0 20px;
            position: relative;

            &:after {
              content: '';
              display: block;
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background: $red;
              position: absolute;
              top: 24px;
            	right: 24px;
              transform: scale(0) translateZ(0);
              will-change: transform;
              transition: transform 0.3s $cubic;
            }

            &.active {
              &:after {
                transform: scale(1) translateZ(0);
              }
            }

            .person-photo {
              flex: 0 0 32px;
              max-width: 32px;
            }

            &:last-child {
              border-bottom: 0;
            }
          }
        }
      }
      .filter-top {
        flex-wrap: wrap;
        padding-bottom: 0;

        .filter-col {
          flex: 0 0 100%;
          max-width: 100%;

          .filter-col-inner {
            padding: 0;
          }

          &:first-child {
            .filter-name {
              border-top: 0;
            }
          }
          &:last-child {
            .filter-name {
            }
          }
        }
      }

      ul.select li {
        font-size: 20px;
        display: flex;
        align-items: center;
        padding: 15px 20px;
        border-bottom: 1px solid rgba(#04092A, 0.2);
        margin-bottom: 0;

        &:after {
          right: 28px;
        }

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }

  .d-white, .d-blue, .d-black {
    .filter-inner .filter-col:before {
      display: none;
    }
    .filter-inner .filter-title.search input[type="text"] {
      border: 0;
    }
  }

  .d-white {
    .filter-inner {
      box-shadow: none;

      .filter-inner-content {
        border: 1px solid #000;
      }

      .filter-title {
        border-bottom: 1px solid #000;
      }

      ul.select {
        li {
          color: rgba(#000, 0.5);

          &:after {
            background: #000;
          }

          &.selected {
            color: #000;
          }
        }
      }
    }
  }

  .d-black {
    .filter-inner {
      box-shadow: none;

      .filter-inner-content {
        border: 1px solid #fff;
        background: #000;
      }

      .filter-title {
        border-bottom: 1px solid #fff;
      }

      ul.select {
        li {
          color: rgba(#fff, 0.5);

          &:after {
            background: #fff;
          }

          &.selected {
            color: #fff;
          }
        }
      }
    }
  }

  .d-blue {
    .filter-inner {
      box-shadow: none;

      .filter-inner-content {
        border: 1px solid $ddk;
        background: $ddl;
      }

      .filter-title {
        border-bottom: 1px solid $ddk;
      }

      ul.select {
        li {
          color: rgba($ddk, 0.5);

          &:after {
            background: $ddk;
          }

          &.selected {
            color: $ddk;
          }
        }
      }
    }
  }
</style>

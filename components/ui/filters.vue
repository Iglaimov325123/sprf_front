<template lang="html">
  <section data-type="page-content">
    <div class="filter-field center">
      <div class="filter-inner flex flex-wrap" style="height: 0">
        <div class="filter-inner-content">
          <div class="filter-top flex col-12">
            <div class="col-3 filter-col">
              <div class="filter-name" @click="openFilterCol">
                {{$store.getters.getLang == 'en' ? 'Material type' : 'Тип материала'}}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.89 8.01">
                  <path d="M13,8.12.55,1.89,1.45.11,13,5.88,24.55.11l.9,1.78Z" transform="translate(-0.55 -0.11)" fill="#04092a"/>
                </svg>
              </div>
              <div class="filter-col-inner">
                <div class="filter-title">
                  {{$store.getters.getLang == 'en' ? 'Material type' : 'Раздел'}}
                </div>
                <div class="filter-value">
                  <vue-simplebar class="filter-value">
                    <ul class="select">
                      <li :class="type.selected ? 'selected' : ''" v-for="type in types" @click="changeType(type, types, true)">{{type.name}}</li>
                    </ul>
                    <div class="real-select">
                      <select name="type">
                        <option :value="type.value" v-for="type in types" :selected="type.selected">{{type.name}}</option>
                      </select>
                    </div>
                  </vue-simplebar>
                </div>
              </div>
            </div>
            <div class="col-3 filter-col">
              <div class="filter-name" @click="openFilterCol">
                {{$store.getters.getLang == 'en' ? 'Auditor' : 'Аудитор'}}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.89 8.01">
                  <path d="M13,8.12.55,1.89,1.45.11,13,5.88,24.55.11l.9,1.78Z" transform="translate(-0.55 -0.11)" fill="#04092a"/>
                </svg>
              </div>
              <div class="filter-col-inner">
                <div class="filter-title search">
                  <input type="text" name="" value="" v-model="personQuery" :placeholder="$store.getters.getLang == 'en' ? 'Search' : 'Поиск по людям'" @input="filterPersons">
                </div>
                <vue-simplebar class="filter-value">
                  <div class="persons-list">
                    <person-small v-for="person in filteredPersons" :class="[person.active ? 'active' : '']" :photo="person.PREVIEW_PICTURE" :shortname="person.SHORT_NAME.COMPACT" :surname="person.SHORT_NAME.SURNAME" :name="person.SHORT_NAME.NAME" :lastname="person.SHORT_NAME.SECOND_NAME" v-on:click.native="togglePerson(person)"></person-small>
                  </div>
                </vue-simplebar>
              </div>
            </div>
            <div class="col-3 filter-col">
              <div class="filter-name" @click="openFilterCol">
                {{$store.getters.getLang == 'en' ? 'Information type' : 'Тип информации'}}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.89 8.01">
                  <path d="M13,8.12.55,1.89,1.45.11,13,5.88,24.55.11l.9,1.78Z" transform="translate(-0.55 -0.11)" fill="#04092a"/>
                </svg>
              </div>
              <div class="filter-col-inner">
                <div class="filter-title">
                  {{$store.getters.getLang == 'en' ? 'Information type' : 'Формат информации'}}
                </div>
                <div class="filter-value">
                  <vue-simplebar class="filter-value">
                    <ul class="select">
                      <li :class="format.selected ? 'selected' : ''" v-for="format in categories" @click="toggleType(format, true)">{{format.name}}</li>
                    </ul>
                    <div class="real-select">
                      <select name="formats[]" multiple>
                        <option :value="format.value" v-for="format in categories" :selected="format.selected">{{format.name}}</option>
                      </select>
                    </div>
                  </vue-simplebar>
                </div>
              </div>
            </div>
            <div class="col-3 filter-col">
              <div class="filter-name" @click="openFilterCol">
                {{$store.getters.getLang == 'en' ? 'Date' : 'Дата'}}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.89 8.01">
                  <path d="M13,8.12.55,1.89,1.45.11,13,5.88,24.55.11l.9,1.78Z" transform="translate(-0.55 -0.11)" fill="#04092a"/>
                </svg>
              </div>
              <div class="filter-col-inner">
                <div class="filter-value calendar">
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

          <!-- <div class="expand-button flex" @click="expandThis">
            <div class="expand-icon">
              <i></i>
            </div>
          </div>

          <div class="filter-extend flex col-12">
            <div class="col-3 filter-col">
              <div class="filter-col-inner">
                <div class="filter-title">
                  Отрасль
                </div>
                <div class="filter-value">
                  <ul class="select">
                    <li :class="type.selected ? 'selected' : ''" v-for="type in industry" @click="toggleType(type)">{{type.name}}</li>
                  </ul>
                  <div class="real-select">
                    <select name="type[]">
                      <option :value="type.value" v-for="type in industry" :selected="type.selected">{{type.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-3 filter-col">
              <div class="filter-col-inner">
                <div class="filter-title">
                  Регион
                </div>
                <div class="filter-value">
                  <ul class="select">
                    <li :class="format.selected ? 'selected' : ''" v-for="format in regions" @click="toggleType(format)">{{format.name}}</li>
                  </ul>
                  <div class="real-select">
                    <select name="regions[]" multiple>
                      <option :value="format.value" v-for="format in regions" :selected="format.selected">{{format.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const personSmall = require('~/components/ui/person/person-nopos-exp-nolink').default;

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
        // isMultiple: true,
        dateFormat: 'dd.mm.yyyy',
        changeYearFunction: true,
        changeYearStep: 1,
        // calendarsCount: 2
        // shorthandCurrentMonth: true
      },
      types: [
        {name: 'Все материалы', value: 0, selected: true},
        {name: 'Новость', value: 1, selected: false},
        {name: 'Бюллетени', value: 5, selected: false},
        {name: 'Аудит федерального бюджета', value: 2, selected: false},
        {name: 'Аудит наццелей', value: 17, selected: false},
        {name: 'Экспертиза законопроектов', value: 23, selected: false},
        {name: 'Проверки', value: 3, selected: false}
      ],
      persons: [],
      filteredPersons: [],
      personQuery: '',
      categories: [
        {name: 'Пресc-релиз', value: 1, selected: false},
        {name: 'Интервью', value: 2, selected: false},
        {name: 'Спецпроект', value: 3, selected: false},
        {name: 'Медиа', value: 4, selected: false},
        {name: 'Архив', value: 49, selected: false}
      ],

      filteredItems: [],

      dateFilter: '',
      personFilter: [],
      categoryFilter: [],
      typesFilter: [],
      date: null
    }
  },
  props: {
    filter: String,
    post: String
  },
  created() {
    that = this;
  },
  mounted() {
      that.$axios.get('/persons/list?filter=1')
        .then(function (response) {
          that.persons = response.data.result;

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

      // that.$axios.get('/news/category')
      //   .then(function (response) {
      //     let cats = response.data.result;
      //     for(let i = 0; i < cats.length; i++) {
      //       cats[i].selected = false;
      //     }
      //     that.categories = cats;
      //   })
      //   .catch(function (error) {
      //     console.log(error);
      //   })
      //   .finally(function () {
      //   });
  },
  methods: {
    expandThis(e) {
      e.preventDefault();
      let elem = e.target || e.srcElement,
          block = elem.closest('.filter-inner'),
          field = block.querySelector('.filter-extend');

      if(!elem.classList.contains('.expand-button')) {
        elem = elem.closest('.expand-button');
      }
      TweenMax.to(elem, 0.2, {opacity: 0, force3D: true});

      TweenMax.set(field, {height: 'auto'});
      TweenMax.from(field, 1, {height: 0, ease: Expo.easeOut, force3D: true});
      block.classList.add('visible');
    },

    changeType(type, types, resetFormat) {
      for(let i = 0; i < types.length; i++) {
        if(types[i] != type) {
          types[i].selected = false;
        } else {
          types[i].selected = true;
        }
      }
      if(resetFormat) {
        if(type.value != 1) {
          for(let i = 0; i < this.categories.length; i++) {
            this.categories[i].selected = false;
          }
        }
      }

      this.basicFilter(this.personQuery);
    },
    toggleType(type, resetType) {
      if(type.selected) {
        type.selected = false;
      } else {
        type.selected = true;
      }
      if(resetType) {
        for(let i = 0; i < this.types.length; i++) {
          if(this.types[i].value == 1) {
            this.types[i].selected = true;
          } else {
            this.types[i].selected = false;
          }
        }
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
      let arrayToFilter = that.persons;
      let basicArray = arrayToFilter.filter(function(person) {
        console.log(person.NAME.toLowerCase().indexOf(query.toLowerCase()) > -1);
        return person.NAME.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
      console.log('filtered', basicArray);

      if(basicArray.length > 4) {
        this.filteredPersons = basicArray;
      } else {
        this.filteredPersons = basicArray;
      }

      that.filterItems();
    },

    filterPersons(e) {
      let elem = e.target || e.srcElement,
          val = elem.value;

      this.basicFilter(val);
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
          this.categoryFilter.push(that.categories[i].value);
        }
      }

      this.typesFilter = [];
      for(let i = 0; i < that.types.length; i++) {
        if(that.types[i].selected) {
          this.typesFilter.push(that.types[i].value);
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

      if((startDate != '01.01.1990' && endDate != '01.01.3000') || this.personFilter.length != 0 || this.categoryFilter.length != 0) {
        this.$parent.hasFilter = true;
      } else {
        this.$parent.hasFilter = false;
      }

      that.$axios.get(that.post, {
          params: {
            q: this.$parent.queryString,
            person: this.personFilter.join(),
            category: this.categoryFilter.join(),
            type: this.typesFilter.join(),
            date: compDate != null ? compDate : '',
            page: 1
          }
        })
        .then(function (response) {
          if(response.data.result.error) {
            that.filteredItems = [];
          } else {
            that.filteredItems = response.data.result.items;
          }
          that.$parent.items = that.filteredItems;
          that.$parent.page = 1;
          that.$parent.totalPage = response.data.result.pages;
          console.log('FILTER INFO', response.data);

          if(that.filteredItems.length > 0) {
            that.$parent.curTitle = that.$store.getters.getLang == 'en' ? 'Results: <span>'+response.data.result.total+'</span>' : 'Нашлось материалов <span>'+response.data.result.total+'</span>';
          } else {
            that.$parent.curTitle = that.$store.getters.getLang == 'en' ? 'No results' : 'Ничего не нашлось';
          }

          // that.$parent.curTitle = that.$store.getters.getLang == 'en' ? 'Results: <span>'+response.data.result.total+'</span>' : 'Нашлось материалов <span>'+response.data.result.total+'</span>';

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
          this.categoryFilter.push(that.categories[i].value);
        }
      }

      this.typesFilter = [];
      for(let i = 0; i < that.types.length; i++) {
        if(that.types[i].selected) {
          this.typesFilter.push(that.types[i].value);
        }
      }

      if(this.personFilter.length != 0 || this.categoryFilter.length != 0) {
        this.$parent.hasFilter = true;
      } else {
        this.$parent.hasFilter = false;
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

      return {
        q: this.$parent.queryString,
        person: this.personFilter.join(),
        category: this.categoryFilter.join(),
        type: this.typesFilter.join(),
        date: compDate != null ? compDate : '',
        page: 1
      };
    },

    resetFilter() {

      for(let i = 0; i < that.persons.length; i++) {
        that.persons[i].active = false;
      }
      for(let i = 0; i < that.categories.length; i++) {
        that.categories[i].selected = false;
      }
      for(let i = 0; i < that.types.length; i++) {
        that.types[i].selected = false;
      }

      if (this.date) {
        this.date.dateRange.end.date = null
        this.date.dateRange.start.date = null
      }
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

    .filter-name {
      display: none;
    }

    .filter-inner-content {
      padding: 22px 24px;
      width: 100%;
    }

    .reset-filter {
      font-size: 1em
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

      input[type="text"], input[type="password"], input[type="email"] {
        height: 50px;
        line-height: 50px;
        font-size: 18px;
      }

      /deep/ h2 {
        font-size: 18px;
        height: 50px;
      }

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

      ul {
        li {
          padding-left: 0;
        }
        li:before {
          display: none;
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
        padding-top: 24px;

        .person {
          cursor: pointer;
          margin-bottom: 15px;

          /deep/ p {
            font-size: 16px;
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
      padding: 24px 0 0;
      margin: 0;

      li {
        font-size: 16px;
        color: $lightblue;
        margin-bottom: 10px;
        cursor: pointer;
        position: relative;

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

<template>
  <section class="wrap" @click.self="$emit('cancel')" :class="{hide: !display}">
    <div class="content">
      <main ref="layout">
        <section class="aki-month" v-for="(item, i) in months" :key="i"
          :data-uct="new Date(item.year, Number(item.month)-1)"
          :data-year="item.year"
          :data-month="item.month">
          <header>{{item.year}} год {{item.month}} месяц</header>
          <div class="week-text">
            <span v-for="(text, i) in weekTexts"
              :key="i">{{text}}</span>
          </div>
          <div class="day-wrap">
            <div class="day"
              v-for="(day, j) in item.days" :key="j"
              :style="{'background-color': day.custom.bgcolor,
                       'border-color': day.custom.bdcolor}"
              :class="{'disabled': day.disabled, 'active': day.active, 'select': day.begin || day.end, 'select-start': day.begin, 'select-end': day.end}"
              @click="selectOne(day)">
              <span class="number" :class="{restday: day.restday, rest: day.rest, workday: day.workday}">{{day.text}}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  </section>
</template>

<script>
class DateHelper {
  constructor(str = Date.now()) {
    this.Date = new Date(str)
  }
  get year() {
    return this.Date.getFullYear()
  }
  get month() {
    const m = this.Date.getMonth() + 1
    return m < 10 ? `0${m}` : m
  }
  get day() {
    const d = this.Date.getDate()
    return d < 10 ? `0${d}` : d
  }
  get time() {
    return this.Date.getTime()
  }
  get date() {
    return `${this.year}-${this.month}-${this.day}`
  }
}

export default {
  props: {
    // Выбор только 1 даты
    single: {
      type: Boolean,
      default() { return false }
    },
    // Автокомплит
    autoComplete: {
      type: Boolean,
      default() { return false }
    },
    // Скрыть/показать
    display: {
      type: Boolean,
      default() { return false }
    },
    // Понедельник - первый
    mondayFirst: {
      type: Boolean,
      default() { return false }
    },
    // Можно ли реверсивно выделять
    reverseSelect: {
      type: Boolean,
      default() { return true }
    },
    // Выходные дни (не используется)
    restday: {
      type: Array,
      default() { return [] }
    },
    // Рабочие дни (не используется)
    workday: {
      type: Array,
      default() { return [] }
    },
    // Load the range of the calendar in months
    displayRange: {
      type: Number,
      default() { return 13 }
    },
    // Customizable display start date
    // The default is the day of the month
    displayRangeStart: {
      type: String,
      default() { return new DateHelper().date }
    },
    // Selectable start dates
    selectRangeStart: {
      type: String,
      default() { return new DateHelper().date }
    },
    // Selectable end date
    selectRangeEnd: {
      type: String,
      default() { return '1990-12-31' }
    },
    // Кастомизация
    custom: {
      type: Array,
      default() { return [] }
    },
    initPosition: {
      type: String,
      default() { return new DateHelper().date }
    }
  },
  data() {
    return {
      months: [],
      firstTime: true,
      firstSelectDay: {},
      lastSelectDay: {},
      rangeList: [],
      customIndex: 0,
      range: [],
      doms: [],
      observer: null,
    }
  },
  computed: {
    weekTexts() {
      const arrTexts = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
      // Russian and Chince habits Monday for the first day
      if (this.mondayFirst) arrTexts.push(arrTexts.shift())
      return arrTexts
    },
    $date() {
      return new DateHelper()
    },
    mIndexBegin() {
      return this.months.findIndex(v => v.year === this.firstSelectDay.year && v.month === this.firstSelectDay.month)
    },
    mIndexEnd() {
      return this.months.findIndex(v => v.year === this.lastSelectDay.year && v.month === this.lastSelectDay.month)
    },
    seEnd() {
      let date
      switch (this.selectRangeEnd) {
      case 'today':
        date = new DateHelper().date
        break
      case '':
        date = '1990-12-31'
        break
      default:
        date = this.selectRangeEnd
        break
      }
      return date
    }
  },
  watch: {
    restday() {
      const vm = this
      if (this.restday.length) {
        this.deconstruction((date) => {
          this.restday.forEach(restday => {
            const restdate = new Date(restday)
            const [y, m, d] = [restdate.getFullYear(), restdate.getMonth() + 1, restdate.getDate()]
            if (y === date.year && m === date.month && d === date.day) {
              vm.$set(date, 'rest', true)
              vm.$set(date, 'restday', true)
            }
          })
        })
      }
    },
    workday() {
      const vm = this
      if (this.workday.length) {
        this.deconstruction((date) => {
          this.workday.forEach(workday => {
            const workdate = new Date(workday)
            const [y, m, d] = [workdate.getFullYear(), workdate.getMonth() + 1, workdate.getDate()]
            if (y === date.year && m === date.month && d === date.day) {
              vm.$set(date, 'rest', false)
              vm.$set(date, 'workday', true)
            }
          })
        })
      }
    },
    custom() {
      this.setcustom()
    },
    months() {
      this.doms = Array.from(document.querySelectorAll('.aki-month'))
    },
    display(show) {
      if (show) this.doms.forEach(dom => this.observer.observe(dom))
    },
    displayRangeStart() {
      this.constructionBody()
    },
    selectRangeStart() {
      this.constructionBody()
    },
  },
  created() {
    this.constructionBody()
  },
  mounted() {
    // Set the scrollTop so that it initially comes in to the desired position, rather than the head of the display list
    const [dY, dS] = this.displayRangeStart.split('-').map(Number)
    const [pY, pS] = this.initPosition.split('-').map(Number)
    let index = 0
    index += pS > dS ? (pY - dY) * 12 : (pY - dY - 1) * 12
    index += pS - dS
    let top = 0
    if (index > this.$refs.layout.children.length) index = this.$refs.layout.children.length
    for (let i = 0; i < index; i++) {
      top += this.$refs.layout.children[i].offsetHeight
    }
    this.$refs.layout.scrollTop = top
  },
  methods: {
    selectOne(tar) {
      // Click on the blank area before the number 1
      if (!tar.text) { return false }
      // Click Disable
      const { disabled, custom } = tar
      if (disabled) { return false }
      // Click on the custom disabled, able to capture the event
      if (custom && custom.disabled && this.firstTime) {
        this.$emit('selectDisabled', tar)
        return false
      }
      if (this.single) {
        this.$emit('click', tar)
        this.$set(this.lastSelectDay, 'begin', false)
        // Select current
        this.firstSelectDay = tar
        this.$set(tar, 'begin', true)
        // Record first value
        this.lastSelectDay = this.firstSelectDay
        if (this.autoComplete) this.confirm()
      } else {
        // First click
        if (this.firstTime) {
          this.$emit('click', tar, true)
          this.$emit('clickStart', tar)
          this.firstTime = false // Set next click for second time
          // Select before emptying
          if (this.mIndexBegin > -1 && this.mIndexEnd > -1) {
            for (let i = this.mIndexBegin; i <= this.mIndexEnd; i++) {
              this.months[i].days.forEach(day => {
                if (this.getTimestamp(day) === this.getTimestamp(this.firstSelectDay)) this.$set(day, 'begin', false)
                if (this.getTimestamp(day) > this.getTimestamp(this.firstSelectDay) && this.getTimestamp(day) < this.getTimestamp(this.lastSelectDay)) this.$set(day, 'active', false)
                if (this.getTimestamp(day) === this.getTimestamp(this.lastSelectDay)) this.$set(day, 'end', false)
              })
            }
          }
          // Select current
          this.firstSelectDay = tar
          this.$set(tar, 'begin', true)
        } else { // Second click
          // Click Cancel of the day
          if (this.getTimestamp(tar) === this.getTimestamp(this.firstSelectDay)) {
            this.firstTime = true
            this.$emit('click', { target: tar, start: false })
            this.$set(tar, 'begin', false)
            this.firstSelectDay = {}
            return false
          }
          // Before the first click
          if (this.getTimestamp(tar) < this.getTimestamp(this.firstSelectDay)) {
            this.firstTime = true
            // You can vote against it.
            if (this.reverseSelect) {
              this.$emit('click', { target: tar, start: false })
              this.$emit('clickEnd', tar)
              // Record first value
              const F = this.firstSelectDay
              // Exchange value
              this.lastSelectDay = F
              this.firstSelectDay = tar
              // Set the middle date to the selected state
              this.chooseRange()
                .then(({ range, activeDays }) => {
                  this.firstTime = true
                  // Uncheck last time
                  this.$set(F, 'begin', false)
                  // Set the beginning and end of the value after the exchange
                  this.$set(this.firstSelectDay, 'begin', true)
                  this.$set(this.lastSelectDay, 'end', true)
                  activeDays.forEach(date => this.$set(date, 'active', true))
                  this.range = range
                  if (this.autoComplete) this.confirm()
                })
                .catch(date => {
                  this.firstTime = false
                  // Initial click logic value, so that the next Click to re-determine whether the anti-election
                  this.firstSelectDay = F
                  this.lastSelectDay = {}
                  this.$emit('selectDisabled', date)
                })
            } else {
              // Set the next tap to second
              this.firstTime = false
              if (custom && custom.disabled) {
                this.$emit('selectDisabled', tar)
                return
              }
              this.$emit('click', { target: tar, start: true })
              this.$emit('clickStart', tar)
              // Uncheck last time
              this.$set(this.firstSelectDay, 'begin', false)
              // Select this click
              this.$set(tar, 'begin', true)
              this.firstSelectDay = tar
            }
          } else {
            this.$emit('click', { target: tar, start: false })
            this.$emit('clickEnd', tar)
            // Check the current date as the end
            this.lastSelectDay = tar
            // Set the middle date to the selected state
            this.chooseRange()
              .then(({ range, activeDays }) => {
                this.firstTime = true
                this.$set(tar, 'end', true)
                activeDays.forEach(date => this.$set(date, 'active', true))
                this.range = range
                if (this.autoComplete) this.confirm()
              })
              .catch(date => {
                this.firstTime = false
                this.$emit('selectDisabled', date)
              })
          }
        }
      }
    },
    getTimestamp(tar) {
      return new Date(tar.year, tar.month - 1, tar.day).getTime()
    },
    chooseRange() {
      return new Promise((resolve, reject) => {
        if (this.mIndexBegin > -1 && this.mIndexEnd > -1) {
          let range = []
          const activeDays = []
          for (let i = this.mIndexBegin; i <= this.mIndexEnd; i++) {
            range = range.concat(this.months[i].days.filter(date => {
              if (this.getTimestamp(date) > this.getTimestamp(this.firstSelectDay)
                && this.getTimestamp(date) < this.getTimestamp(this.lastSelectDay)) {
                if (date.custom && date.custom.disabled) {
                  reject(date)
                } else {
                  activeDays.push(date) // Not directly set to the active state, first save it, referred to the external processing. If not disabled is set
                  return date
                }
              }
            }))
          }
          resolve({ range, activeDays })
        } else {
          resolve(new Array())
        }
      })
    },
    confirm() {
      this.$emit('select', { start: this.firstSelectDay, end: this.lastSelectDay, range: this.range })
    },
    deconstruction(callback) {
      this.months.forEach(month => {
        month.days.forEach(date => {
          callback(date)
        })
      })
    },
    setcustom() {
      // Custom data
      let days = []
      if (this.custom.length) {
        // Concatenate the days in months into a plain one-dimensional array
        this.months.forEach(v => days = days.concat(v.days))
        // Traversing the date from the index position of the record, traversing the custom array from 0
        for (let i = this.customIndex, j = 0; j < this.custom.length; i++) {
          const v = days[i]
          const data = this.custom[j] || ''
          // Skip number one.
          if (v.text) {
            j++
            const type = typeof data
            if (type === 'string') this.$set(v, 'custom', { text: data })
            else if (type === 'object') this.$set(v, 'custom', data)
            else throw `Еhe type of each item of the custom array should be String or Object, but get is ${type}`
          }
        }
      } else {
        this.months.forEach(v => days = days.concat(v.days))
        for (let i = this.customIndex, j = 0; j < this.lastTime; i++) {
          const v = days[i]
          const data = this.custom[j] || ''
          // 跳过1号之前的
          if (v.text) {
            j++
            const type = typeof data
            if (type === 'string') this.$set(v, 'custom', { text: data })
            else if (type === 'object') this.$set(v, 'custom', data)
            else throw `custom数组每项的类型应该是String或Object，但是得到的是${type}`
          }
        }
      }
      this.lastTime = this.custom.length
    },
    setData(data, date) {
      const [Y, M, D] = new DateHelper(date).date.split('-').map(Number)
      let target
      this.months.some(item => {
        target = item.days.filter(({ year, month, day }) => year === Y && month === M && day === D)
        return target.length > 0
      })
      if (target.length) {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key]
            this.$set(target[0].custom, key, value)
          }
        }
      } else {
        throw `Date format error.Got "${date}".It's should be like "YYYY-MM-DD".`
      }
    },
    constructionBody() {
      const months = []
      let customIndex = 0
      let [Y, M] = this.displayRangeStart.split('-').map(Number)
      let [year, month] = [Y, M]
      // Recurring monthly
      for (let i = 0; i < this.displayRange; i++) {
        // Every 13 months
        if (M - i < 1) {
          M += 12 // Month starts from 1
          year = Y-1 //In 1 year
        }
        month = M - i
        console.log(month);
        const days = [] // Every day the data objects are placed in the array
        // By occupying the number 1 to the actual position of the week
        // In the case of the beginning of the default Sunday, Today is the day of the week, you need a few placeholders
        // Sunday is 0, do not deal with
        let placeholder = new Date(year, month + 1, 1).getDay()
        // If it is the beginning of Monday, the placeholder forward one day
        // Sunday is 0, 7-1.
        if (this.mondayFirst) placeholder = placeholder === 0 ? 6 : placeholder - 1
        for (let j = 0; j < placeholder; j++) {
          customIndex++
          days.push({ custom: {} })
        }
        // Get the total number of days of the month
        const daySum = new Date(year, month, 0).getDate()
        // Cycle out every day
        for (let day = 1; day <= daySum; day++) {
          const obj = {} // The stored data will be used in the template
          obj.custom = {}
          obj.year = year
          obj.month = month
          obj.day = day
          obj.date = `${year}-${month}-${day}`
          obj.odate = `${year}-${ month > 9 ? month : '0' + month}-${ day > 9 ? day : '0' + day}` // Date format for fill 0
          // Show "today" or what number
          obj.text = year === this.$date.year && month === this.$date.month && day === this.$date.day ? '今天' : day
          // Get the day of the week and judge the weekend
          const weekday = new Date(year, month - 1, day).getDay()
          const weekend = weekday === 6 || weekday === 0
          // Determine whether the status is disabled
          // While in the non-disabled state, before processing the weekend
          const sTime = new DateHelper(this.selectRangeStart).time
          const currentTime = new DateHelper(obj.date).time
          const eTime = new DateHelper(this.seEnd).time
          if (sTime - currentTime < 0 || currentTime - eTime < 0) obj.disabled = true
          else obj.rest = weekend
          if (currentTime === sTime) this.customIndex = customIndex
          // Custom rest days
          if (this.restday.length) {
            this.restday.forEach(date => {
              if (date === obj.date) obj.restday = obj.rest = true
            })
          }
          // Custom weekdays
          if (this.workday.length) {
            this.workday.forEach(date => {
              if (date === obj.date) {
                obj.workday = true
                obj.rest = false
              }
            })
          }
          customIndex++
          days.push(obj)
          // End the cycle every day
        }
        months.push({ year, month, days })
        // End cycle monthly
      }
      this.months = months
      this.setcustom()
      // Its Polyfill:
      // try {
      //   this.observer = new IntersectionObserver(entries => {
      //     entries.forEach(entry => {
      //       if (entry.intersectionRatio <= 0) return false
      //       const { year, month, uct } = entry.target.dataset
      //       this.$emit('viewport', { year, month, uct, date: new DateHelper(`${year}-${month}-1`).date })
      //     })
      //   })
      // } catch (error) {
      //   throw error
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: block;
  top: 0;
  right: -1px;
  position: relative;
  width: 100%;
  height: 350px;
  background-color: rgba(9, 9, 9, .7);
  transition: transform .5s ease-out;
  z-index: 8;

}
.content{
  position: relative;
  // bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
  text-align: center;
  font-size: 16px;

  >header{
    padding: 10px;
    text-align: center;
    >a{
      position: absolute;
      top: 10px;
      font-size: 14px;
      cursor: pointer;
      &.left{
        left: 10px;
      }
      &.right{
        right: 10px;
      }
    }
  }
  .week-text{
    display: flex;
    justify-content: space-between;
    margin: 5px 0;

    >span{
      width: 14.28%;
      padding-top: 24px;
      font-size: 16px;
    }
  }
  main{
    flex: 1;
    overflow-y: scroll;
    padding-right: 35px;

    &:hover {
        &::-webkit-scrollbar-track
        {
        	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
          opacity: 1;
        }

        &::-webkit-scrollbar
        {
          opacity: 1;
        }

        &::-webkit-scrollbar-thumb
        {
      	   -webkit-box-shadow: inset 0 0 6px rgba($red, 1);
        }
    }

    &::-webkit-scrollbar-track
    {
    	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
    	border-radius: 10px;
    	background-color: #fff;
      transition: all 0.3s $cubic;
    }

    &::-webkit-scrollbar
    {
    	width: 2px;
    	background-color: #fff;
      transition: all 0.3s $cubic;
    }

    &::-webkit-scrollbar-thumb
    {
    	border-radius: 2px;
    	-webkit-box-shadow: inset 0 0 6px rgba($red, 0);
      transition: all 0.3s $cubic;
    }

    .aki-month{
      >header{
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        border-bottom: 1px solid rgba(4, 9, 42, 0.2);
      	height: 40px;
      	display: flex;
      	align-items: center;
      	font-size: 16px;
        z-index: 1;
        background: #fff;
      }
      .day-wrap{
        display: flex;
        flex-wrap: wrap;
        .day{
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          width: 14.28%;
          flex: 0 0 14.28%;
          box-shadow: inset 0 0 2px 2px white;
          box-sizing: border-box;
          border: solid 1px #fff;
          transition: all .3s $cubic;
          height: 32px;
          margin: 5px 0;
          font-size: 16px;

          &.disabled{
            color: $lightblue;
            >span{
              color: $lightblue!important;
            }
          }
          &.select{
            color: white;
            background-color: $red;
            box-shadow: none;
            &.select-start {
              border-radius: 60px 0 0 60px;
            }
            &.select-end {
              border-radius: 0 60px 60px 0;
            }
            >span {
              color: white!important;
            }
          }
          &.active{
            background-color: $red;
            color: #fff;
            box-shadow: none;
          }
          span{
            font-size: 12px;
            &.number{
              font-size: 14px;
            }
            &.restday:before{
              content: '休';
              position: absolute;
              top: 2px;
              left: 2px;
              font-size: 12px;
            }
            &.workday:before{
              content: '班';
              position: absolute;
              top: 2px;
              left: 2px;
              font-size: 12px;
              color: inherit;
            }
          }
        }
      }
    }
  }
}
</style>

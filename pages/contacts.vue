<template>
  <div class="page-content" data-type="inner">
    <section class="blue with-expand" data-type="inner-head">
      <div class="head-main center flex flex-just-b flex-center-v">
        <h1>{{$store.getters.getLang == 'en' ? 'Contacts' : 'Контакты'}}</h1>
        <header-control v-if="info.TEXT != null" v-on:click.native="expandInfo" :text="$store.getters.getLang == 'en' ? 'Info' : 'Информация'" link="/history/" icon="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+ICA8cGF0aCBmaWxsPSIjZmZmZmZmIiBkPSJNMTIsMjRBMTIsMTIsMCwxLDEsMjQsMTIsMTIsMTIsMCwwLDEsMTIsMjRaTTEyLDJBMTAsMTAsMCwxLDAsMjIsMTIsMTAsMTAsMCwwLDAsMTIsMlptMSw4SDExdjhoMlptMC00SDExVjhoMloiLz48L3N2Zz4="></header-control>
      </div>

      <div class="head-expend-info" >
        <div class="center" v-if="info.TEXT != null" v-html="info.TEXT">
        </div>
      </div>
    </section>

    <section data-type="page-content">
      <div class="center">
        <div class="page-contain">
          <div class="double-side no-padding flex flex-wrap">
            <div class="col-6 contacts-page">
              <p class="first" v-html="contactInfo.HEADER_TEXT"></p>
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
                <li class="col-6">
                  <small>{{$store.getters.getLang == 'en' ? 'Email' : 'Эл. почта'}}</small>
                  <div class="value"><a :href="'mailto:'+contactInfo.EMAIL">{{contactInfo.EMAIL}}</a></div>
                </li>
                <li class="col-12">
                  <small>{{$store.getters.getLang == 'en' ? 'Address' : 'Адрес'}}</small>
                  <div class="value">{{contactInfo.ADDRESS}}</div>
                </li>
              </ul>

              <ul class="just-list department-list">
                <li v-for="email in contactInfo.ADDITIONAL_EMAILS">
                  <small>{{email.LABEL}}</small>
                  <div class="value"><a :href="'mailto:'+email.VALUE">{{email.VALUE}}</a></div>
                </li>
              </ul>
            </div>
            <div class="col-6">
              <yandex-map :scroll-zoom="false" zoom="16" :coords="[contactInfo.MAP.LAT, contactInfo.MAP.LON]" :controls="['zoomControl']">
                <ymap-marker marker-id="1" marker-type="Placemark" :icon="markerIcon" :coords="[contactInfo.MAP.LAT, contactInfo.MAP.LON]"></ymap-marker>
              </yandex-map>
              <small>{{contactInfo.MAP.INFO}}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import { yandexMap, ymapMarker } from 'vue-yandex-maps'
const headerButton = require('~/components/ui/head-button').default;
const headerControl = require('~/components/ui/head-control').default;
const imageDesc = require('~/components/ui/image-desc').default;
const cardPhotos = require('~/components/ui/cards/card-photos').default;
const cardSimple = require('~/components/ui/cards/card-simple').default;

const statementSimple = require('~/components/ui/statements/statement-simple').default;

let that;
export default {
  async asyncData (context) {
    let contacts = await context.app.$axios.get('/contacts/main');

    return { seo: contacts.data.seo, contactInfo: contacts.data.result }
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
      seo: {
        TITLE: '',
        DESCRIPTION: '',
        KEYWORDS: ''
      },
      map: null,
      info: {TEXT: ''},
      markerIcon: {
        layout: 'default#image', // 'default#imageWithContent' для использования с контентом
        imageHref: '/img/pin.svg', // адрес изображения или data:image/svg+xml;base64
        imageSize: [80, 80], // размер иконки в px
        imageOffset: [-40, -40],
      },
      settings: {
        apiKey: '',
        lang: 'ru_RU',
        coordorder: 'latlong',
        version: '2.1'
      },
      contactInfo: {
        TIMETABLE: {
          ACTIVE: [],
          DISABLED: []
        },
        PERSON: {},
        MAP: {
          LAT: 50,
          LON: 50
        }
      },
    }
  },
  methods: {
    expandInfo(e) {
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
  created() {
    that = this;
  },
  mounted() {
    that.$axios.get(`/contacts/main`)
    .then(function (response) {
      that.contactInfo = response.data.result;
      that.info = response.data.info;
      console.log('contacts', that.contactInfo);
    })
    .catch(function (error) {
    })
    .finally(function () {
    });

    // mapboxgl.accessToken = 'pk.eyJ1Ijoibm93YXkzOSIsImEiOiJjank0ZWU0b2ExNGxuM2lvaDRzbDc0cHUwIn0.ywe6JRdgLfRtx8GcxiakSw';
    // that.map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/light-v9?optimize=true'
    // });
    // let cities = [
  	// 	{name: 'Main Office', lat: 55.747115, lng: 37.58087},
    // 	{name: 'Manufactory', lat: 56.858966, lng: 35.887078},
  	// ];
  	// let markers = [];
  	// let bounds = [];
  	// cities.forEach(function(city) {
  	// 	let el = document.createElement('div');
  	// 	el.className = 'marker';
    //
    //   let name = document.createElement('div');
    //   name.className = 'name';
    //   name.innerHTML = city.name;
    //
    //   el.appendChild(name);
    //
  	// 	let marker = new mapboxgl.Marker(el).setLngLat([city.lng, city.lat]).addTo(that.map);
  	// 	bounds.push([city.lng, city.lat]);
  	// 	markers.push(marker);
  	// });
  	// // that.map.flyTo({center: bounds[0], zoom: 16});
    // that.map.fitBounds(bounds, {
    //   padding: 100
    // });
  },
  components: {
    headerButton,
    imageDesc,
    cardPhotos,
    cardSimple,
    statementSimple,
    headerControl
    // yandexMap, ymapMarker
  }
}
</script>

<style lang="scss" scoped>
  section[data-type="page-content"] .page-contain .contacts-page p.first {
    font-size: em(20);
    line-height: 1.44;
  }

  .contacts-page {
    ul {
      li {
        padding-left: 0;

        &:before {
          display: none;
        }
      }
    }

    .block-border-grid {
      margin-top: 40px;
      margin-bottom: 32px;
    }

    .department-list {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 1px solid rgba(#000, 0.2);
    }
  }

  .ymap-container {
    height: 80%;
    filter: grayscale(100%);

    &+small {
      font-size: em(16);
      line-height: 1;
      margin-top: 16px;
      display: block;
    }
  }

  @media (max-width: 767px) {
    .ymap-container {
      height: 50vh;
    }
  }
</style>

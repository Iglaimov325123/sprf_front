import Vue from "vue";
import axios from "axios";
import * as Cookies from "js-cookie";

export default function({
  store,
  route,
  redirect,
  req,
  res,
  isClient,
  isServer,
  app: { $axios }
}) {
  $axios.onRequest(config => {
    if (store.getters.getLang == "en") {
      config.baseURL = "http://dev.ach.gov.ru/api/en";
    } else {
      config.baseURL = "http://dev.ach.gov.ru/api/v1";
    }
  });
}

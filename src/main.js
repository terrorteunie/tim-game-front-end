import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import axios from './api';

document.addEventListener("deviceready", () => {}, false);

let application = createApp(App)
  .use(store)
  .use(router)
  .provide("$cordova", window.cordova);

application.config.globalProperties.$axios = axios;


application.mount("#app");



import Vue from 'vue';
import Vuex from 'vuex';
import 'material-design-icons/iconfont/material-icons.css';
import { Vuetify, transitions } from 'vuetify';
import 'vuetify/src/stylus/app.styl';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAnalytics from 'vue-analytics';
import App from '@/App';
import { i18n } from '@/i18n';
import router from '@/router';
import store from '@/store';
import '@/style.scss';

Vue.config.productionTip = false;

// TODO: Firefox doesnt allow to load external script
if (browserName === 'chrome') {
  Vue.use(VueAnalytics, {
    id: 'UA-78514802-2',
    // In Chrome extension, must close checking protocol.
    set: [{ field: 'checkProtocolTask', value: null }],
    checkDuplicate: true,
    router,
    debug: {
      sendHitTask: localStorage.getItem('analytics') !== 'false',
    },
  });
}

Vue.use(Vuex);
Vue.use(Vuetify, {
  components: {
    Vuetify,
  },
  theme: {
    primary: '#607D8B',
    secondary: '#546E7A',
    accent: '#2196F3',
    foreground: '#ffffff',
  },
  transitions,
});
Vue.use(VueAxios, axios);
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  mounted() {
    if (window.__PRERENDER_INJECTED) {
      document.dispatchEvent(new Event('render-event'));
    }
  },
  render: h => h(App),
});

Vue.filter('bytes', (nb) => {
  if (!nb || Number.isNaN(parseFloat(nb)) || !Number.isFinite(nb)) return '-';
  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];
  const idx = Math.floor(Math.log(nb) / Math.log(1024));
  return `${(nb / (1024 ** Math.floor(idx))).toFixed(1)} ${units[idx]}`;
});

Vue.filter('truncate', (string, nb) => {
  if (!string) return '';
  const trimmed = string.trim();
  if (trimmed.length < nb) {
    return trimmed;
  }
  return `${trimmed.substring(0, nb)}...`;
});

Vue.filter('filename', string => (string ? string.substring(string.lastIndexOf(string.indexOf('/') > -1 ? '/' : '\\') + 1) : ''));

import Vue from 'vue';
import jQuery from 'jquery';
import ClipboardJS from 'clipboard';
import PerfectScrollbar from 'perfect-scrollbar';
import App from './App.vue';
import router from './router';
import store from '@/core/services/store';
import ApiService from '@/core/services/api.service';
// import MockService from "@/core/mock/mock.service";
import { VERIFY_AUTH } from '@/core/services/store/auth.module';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Global 3rd party plugins
import 'popper.js';
import 'tooltip.js';

// Vue 3rd party plugins
import i18n from '@/core/plugins/vue-i18n';
import vuetify from '@/core/plugins/vuetify';
import '@/core/plugins/portal-vue';
import '@/core/plugins/bootstrap-vue';
import '@/core/plugins/perfect-scrollbar';
import '@/core/plugins/highlight-js';
import '@/core/plugins/inline-svg';
import '@/core/plugins/apexcharts';
import '@/core/plugins/treeselect';
import '@/core/plugins/metronic';
import '@mdi/font/css/materialdesignicons.css';
import 'bootstrap';
import 'bootstrap-select';
import '@/assets/js/components/datatable/core.datatable.js';

Vue.config.productionTip = false;
window.jQuery = jQuery;
window.PerfectScrollbar = PerfectScrollbar;
window.ClipboardJS = ClipboardJS;

// API service init
ApiService.init();

// Remove this to disable mock API
// MockService.init();

router.beforeEach((to, from, next) => {
  // Ensure we checked auth before each page load.
  Promise.all([store.dispatch(VERIFY_AUTH)]).then(next);

  // Scroll page to top on every route change
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount('#app');

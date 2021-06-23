import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

setLocale('zh_TW');

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .component('Form', Form)
  .component('Field', Field)
  .component('ErrorMessage', ErrorMessage)
  .mount('#app');

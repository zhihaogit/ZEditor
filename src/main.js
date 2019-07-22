import Vue from 'vue';
import App from './App.vue';
import SvgIcon from '@/components/svg_icon';
import Dropdown from '@/components/dropdown';
import '@/assets/less/base.less';
import utils from '@/utils';

Vue.prototype.$utils = utils;
Vue.config.productionTip = false;
Vue.component('SvgIcon', SvgIcon);
Vue.component('Dropdown', Dropdown);

new Vue({
  render: h => h(App),
}).$mount('#app');

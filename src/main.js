import Vue from 'vue';
import App from './App.vue';
import SvgIcon from '@/components/svg_icon';
import Dropdown from '@/components/dropdown';
import DropdownItem from '@/components/dropdown/dropdown_item';
import MyDialog from '@/components/dialog';
import Alert from '@/components/alert';
import '@/assets/less/base.less';
import utils from '@/utils';
import '@/assets/js/iconfont';

Vue.prototype.$utils = utils;
Vue.config.productionTip = false;
Vue.component('SvgIcon', SvgIcon);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownItem', DropdownItem);
Vue.component('MyDialog', MyDialog);
Vue.component('Alert', Alert);

new Vue({
    render: h => h(App),
}).$mount('#app');

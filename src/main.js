import Vue from 'vue';
import App from './App.vue';
import ZEditor from '@/components/editor';
import SvgIcon from '@/components/svg_icon';
import Dropdown from '@/components/dropdown';
import DropdownItem from '@/components/dropdown_item';
import MyDialog from '@/components/dialog';
import Alert from '@/components/alert';
import Upload from '@/components/upload';
import '@/assets/less/base.less';
import utils from '@/utils';
import '@/assets/js/iconfont';

Vue.prototype.$utils = utils;
Vue.config.productionTip = false;
Vue.use(ZEditor);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(MyDialog);
Vue.use(Alert);
Vue.use(Upload);
Vue.component('SvgIcon', SvgIcon);

new Vue({
    render: h => h(App),
}).$mount('#app');

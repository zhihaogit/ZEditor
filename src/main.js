import Vue from 'vue';
import App from './App.vue';
import SvgIcon from '@/components/svg_icon';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/less/base.less';

Vue.config.productionTip = false;
Vue.use(ElementUI, {
	size: 'small'
});
Vue.component('SvgIcon', SvgIcon);

new Vue({
  render: h => h(App),
}).$mount('#app');

import MyDialog from './src';

MyDialog.install = function(Vue) {
    Vue.component(MyDialog.name, MyDialog);
};

export default MyDialog;

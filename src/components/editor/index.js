import ZEditor from './src';

ZEditor.install = function(Vue) {
    Vue.component(ZEditor.name, ZEditor);
};

export default ZEditor;

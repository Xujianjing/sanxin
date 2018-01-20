import router from './router/index';
import App from './App.vue';
import Vue from 'vue';
import ElementUI from 'element-ui';
import './reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import datas from './Mock/index.js';
import store from './store/store.js';
import './fonts/iconfont.css';
Vue.use(ElementUI);
new Vue({
    el: '#app',
    router,
    store,
    render: function (creatElement) {
        return creatElement(App);
    }
});

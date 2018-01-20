import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../Mock/index';
Vue.use(Vuex);
let store = new Vuex.Store({
    state: {
        userName: '张鑫',
        menuList: [],
        imgList: [],
        active_tit: '社区生日会',
        resident_list: [],
        authority: 'visitor',
        res_len: 0,
        invite_len: 0
    },
    mutations: {
        change_list (state, ads) {
            state.menuList = ads.data;
        },
        change_tit (state, tit) {
            state.active_tit = tit;
        },
        residentList (state, data) {
            state.resident_list = data.list;
            state.res_len = data.len;
        },
        img_list (state, data) {
            state.imgList.push(data);
        },
        change_aut (state, data) {
            state.authority = data;
        }
    },
    actions: {
        changeList ({commit}, data) {
            axios.post('/admin/resident', data).then((res) => {
                commit('residentList', res.data);
            });
        },
        change_ps ({commit}, data) {
            axios.post('/admin/residentPs', data).then((res) => {
                commit('residentList', res.data);
            });
        }
    }
});
export default store;

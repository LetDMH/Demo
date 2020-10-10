import Vue from "vue";
import Vuex from "vuex";
import { getToken, setToken, removeToken } from "@/utils/authority";
import { login, logout, getInfo } from "@/api/getData";
import { resetRouter } from '@/router/index'
Vue.use(Vuex);
const getCurrentState = () => {
    return {
        token: getToken(),
        name: "",
        avatar: "",
    };
};
const state = getCurrentState();
const mutations = {
    reset_state(state) {
        Object.assign(state, getCurrentState);
    },
    set_token(state, token) {
        state.token = token;
    },
    set_name(state, name) {
        state.name = name;
    },
    set_avatar(state, avatar) {
        state.avatar = avatar;
    },
};
const actions = {
    login({ commit }, info) {
        const { username, password } = info;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password }).then(
                (res) => {
                    const { data } = res;
                    commit("set_token", data.token);
                    setToken(data.token);
                    resolve;
                },
                (err) => reject(err)
            );
        });
    },
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(
                () => {
                    removeToken(); // must remove  token  first
                    resetRouter();
                    commit("rest_state");
                    resolve();
                },
                (err) => reject(err)
            );
        });
    },
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(
                (response) => {
                    const { data } = response;
                    if (!data) {
                        return reject("验证错误，请重新登录");
                    }
                    const { name, avatar } = data;
                    commit("set_name", name);
                    commit("set_avatar", avatar);
                    resolve(data);
                },
                (err) => reject(err)
            );
        });
    },
    resetToken({ commit }) {
        return new Promise((resolve) => {
            removeToken();
            commit("reset_state");
            resolve();
        });
    },
};
export default new Vuex.Store({state, mutations, actions});

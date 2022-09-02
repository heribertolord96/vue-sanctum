import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost/";

// Create a new store instance.
const store = createStore({
    state() {
        return {
            user: null,
            auth: false
        }
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
            state.auth = Boolean(user)
        }
    },
    actions: {
        async logout({ dispatch }) {
            await axios.post("/logout");
            return dispatch("getUser");
        },
        async login({ dispatch }, credentials) {
            await axios.get("/sanctum/csrf-cookie");
            await axios.post("/login", credentials);
            return dispatch("getUser");
        },

        getUser({ commit }) {
            axios.get("api/user")
                .then((res) => {
                    console.log(res)
                    commit('SET_USER', res.data)
                    this.user = { 'email': 1, 'password': 2, };
                    this.user = res.data;
                }).catch(() => {
                    commit('SET_USER', null)
                });
        }
    },
});

const app = createApp({ /* your root component */ })

// Install the store instance as a plugin

export default store;
// app.use(store)

/*             Vue.use(Vuex);

            import axios from "axios";
            axios.defaults.withCredentials = true;
            axios.defaults.baseURL = "http://localhost";
            export default new Vuex.Store({
                state: { user: null, },
                mutetions: {
                    SET_USER(state, value) {
                        state.user = value
                    }
                },
                actions: {
                    async login({ dispatch }, credentials) {
                        await axios.get("/sanctum/csrf-cookie");
                        await axios.post("/login", credentials);
                        return dispatch("getUser");
                    },

                    getUser({ commit }) {
                        axios.get("api/user")
                            .then((res) => {
                                commit('SET_USER', res.data)
                                    // this.user = { 'email': 1, 'password': 2 };
                                    // this.user = res.data;
                            }).catch(() => {
                                commit('SET_USER', null)
                            });
                    }
                },
                modules: {}
            });
            app.use(store); */
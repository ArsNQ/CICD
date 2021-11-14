import Vue from "vue";

const state = {
    user: {
        isConnected: null
    },
    workingtimes: [],
    pendingTasks: [],
    finishedTasks: [],
};

const mutations = {
    updateUser: (state, user) => ( state.user = {...state.user, ...user}),
    clearUser: (state) => ( state.user = { isConnected: false}),
    updateWorkingTimes: (state, workingtimes) => (state.workingtimes = workingtimes),
    updatePendingTasks: (state, tasks) => (state.pendingTasks = tasks),
    updateFinishedTasks: (state, tasks) => (state.finishedTasks = tasks),
};

const actions = {
    auth: ({commit, dispatch}) => {
        const token = Vue.$cookies.get('token');
        if (!token) return commit('updateUser', {isConnected: false});
        Vue.axios.defaults.headers.common = {'Authorization': `bearer ${token}`};
        return Vue.axios.get(`api/users/me`)
            .then((res) => commit('updateUser', {...res.data.data, isConnected: true}))
            .catch(() => dispatch('logout'))
    },
    signIn: async ({commit,dispatch},{email, password}) => {
        return Vue.axios.post(`oauth/token`,{email, password})
            .then((res) => {
                Vue.$cookies.set('token',res.data.data.token);
                dispatch('auth');
            }).catch((error)=> console.log(error))
    },
    editUser: async ({commit, state}, user) => {
        return Vue.axios.put(`api/users/${state.user.id}`, {user})
            .then((res)=> commit('updateUser', res.data.data))
            .catch((error) => console.log(error))
    },
    logout: async ({commit}) => {
        Vue.$cookies.remove('token');
        Vue.axios.defaults.headers.common = {};
        commit('clearUser');
    },
    getWorkingTimes: async ({ commit, state }, user) => {
        return Vue.axios.get(`api/workingtimes/${state.user.id}`)
            .then((res) =>  commit('updateWorkingTimes', res.data.data));
    },
    getTasks: async ({ commit, state }, user) => {
        return Vue.axios.get(`api/tasks/${state.user.id}`)
            .then((res) => {
                commit('updatePendingTasks', res.data.data.filter(task => !task.clock || task.clock.status));
                commit('updateFinishedTasks', res.data.data.filter(task => task.clock && !task.clock.status));
            });
    },
    updateUser: function({commit},newUser) {
        commit('updateUser', newUser)
    }
};

const getters = {
    me: state =>  state.user,
    workingtimes: state => state.workingtimes,
    pendingTasks: state => state.pendingTasks,
    finishedTasks: state => state.finishedTasks,
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

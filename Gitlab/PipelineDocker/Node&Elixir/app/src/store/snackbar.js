import Vue from "vue";

const state = {
    ref: null,
    config: {
        holdTime: 3000,
        position: 'top-right'
    }
};

const mutations = {
    updateRef: (state, ref) => state.ref = ref,
    updateConfig: (state, config) => state.config = {...state.config, ...config},
};

const actions = {
    updateRef: function( {commit},ref) {
        commit('updateRef', ref);
    },
    showSnackbar: function({state, commit }, {message, type}) {
        if (!type) return state.ref.open(message);
        return state.ref[type](message);
    }
};

const getters = {
    config: state => state.config
};



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

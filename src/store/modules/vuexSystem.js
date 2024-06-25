
let state = {
    axiosCancelArr: [],
}
let mutations = {
    PUSH_CANCEL(state, cancel) {
        state.axiosCancelArr.push(cancel.cancelToken);
    },

    CLEAR_CANCEL(state) {
        state.axiosCancelArr.forEach(e => {
            e && e()
        });
        state.axiosCancelArr = []
    }
}
let actions = {
    pushCancel({ commit }, cancel) {
        commit('PUSH_CANCEL', cancel)
    },
    clearCancel({ commit }) {
        commit('CLEAR_CANCEL');
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
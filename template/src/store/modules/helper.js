import { createActionHelpers } from 'vuex-loading'
// import createPersistedState from 'vuex-persistedstate'
const { startLoading } = createActionHelpers({
  moduleName: 'loading'
});

// initial state
const state = {
  focus: null,
  helps: {},
  form: {
    erros: {
      'email': [
        'algo'
      ]
    }
  },
  toasts:[],
  modals:[]
}

// getters
const getters = {

}

// actions
const actions = {
  LOAD_HELPS: function ({ commit, dispatch }) {
    startLoading(dispatch, 'AJUDA', () => {
      // eslint-disable-next-line
      return  axios.get('help.json')
        .then(response => {

          commit('SET_HELPS', response.data)

        })

      })
  },

}

// mutations
const mutations = {
  REMOVAL_TOAST: (state, toast) => {
    state.toasts.splice(state.toasts.indexOf(toast), 1)
  },

  TOAST: (state, data) =>{
    state.toasts.push({
      title: data.title,
      type: data.type || 'normal',
      direction: 'right',
      message: data.message,
      duration: data.duration || 0,
    })
  },

  OPEN_MODAL: (state, data) => {
    state.modals.push({id: data})
  },

  CLOSE_MODAL: (state) => {
    state.modals.splice(state.modals.length - 1, 1)
  },

  RESOLVE_ERRO:(state, data) => {
    delete state.form.erros[data];
  },

  SET_FOCUS:(state, id) => {
    state.focus = id
  },

  SET_HELPS: (state, data) => {
    state.helps = data
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}

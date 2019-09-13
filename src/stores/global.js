import axios from 'axios'

const state = () => ({
  board: [],
  initialList: [],
  isLoading: false
})

const actions = {
  fetch({ commit }) {
    commit('loading')
    axios.get('https://us-central1-skooldio-courses.cloudfunctions.net/react_01/random').then(({ data: board }) => {
      commit('success', board.board)
    })
  },
  setBoard({ commit }, data) {
    commit('setBoard', data)
  }
}

const mutations = {
  loading(state) {
    state.isLoading = true
    state.board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  },
  success(state, data) {
    state.board = data
    state.initialList = data.map(v => v.map(vv => vv !== 0))
    state.isLoading = false
  },
  setBoard(state, data) {
    state.board = data
  }
}

const getters = {
  getBoard: state => state.board,
  getInitialList: state => state.initialList,
  getIsLoading: state => state.isLoading
}

export default { namespaced: true, state, getters, actions, mutations }

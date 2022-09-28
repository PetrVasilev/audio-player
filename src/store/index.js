import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      songs: [],
    };
  },
  mutations: {
    setSongs(state, songs) {
      state.songs = [...state.songs, ...songs];
    },
  },
});

export default store;

import { getLatestDeals, getLatestPosts, getHotPosts } from "@/api/home.js";

const homeStore = {
  namespaced: true,
  state: {
    latestDeals: [],
    latestPosts: [],
    hotPosts: [],
  },
  getters: {},
  mutations: {
    SET_LATEST_DEALS: (state, infoList) => {
      state.latestDeals = infoList;
    },
    SET_LATEST_POSTS: (state, postList) => {
      state.latestPosts = postList;
    },
    SET_HOT_POSTS: (state, postList) => {
      state.hotPosts = postList;
    },
  },
  actions: {
    actGetLatestDeals: ({ commit }) => {
      getLatestDeals()
        .then((res) => {
          if (res.data.message === "success") {
            commit("SET_LATEST_DEALS", res.data.infoList);
          } else {
            console.log(res);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    actGetLatestPosts: ({ commit }) => {
      getLatestPosts()
        .then((res) => {
          if (res.data.message === "success") {
            commit("SET_LATEST_POSTS", res.data.postList);
          } else {
            console.log(res);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    actGetHotPosts: ({ commit }) => {
      getHotPosts()
        .then((res) => {
          if (res.data.message === "success") {
            commit("SET_HOT_POSTS", res.data.postList);
          } else {
            console.log(res);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};

export default homeStore;

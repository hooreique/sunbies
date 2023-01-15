import jwt_decode from "jwt-decode";
import { login, update, deleteMember } from "@/api/member.js";
import { findById } from "../../api/member";

const memberStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    userLevel(state) {
      if (state.userInfo == null) return -1;
      return state.userInfo.isadmin;
    },
    userId(state) {
      if (state.userInfo == null) return "";
      return state.userInfo.id;
    },
    userName(state) {
      if (state.userInfo == null) return "";
      return state.userInfo.name;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      console.log(state.isLogin);
      console.log(isLogin);
      state.isLogin = isLogin;
      console.log("바뀐 islogin " + state.isLogin);
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
  },
  actions: {
    // 유저 로그인
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data.message === "success") {
            let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {}
      );
    },

    // 유저 정보 업데이트
    async userInfoUpdate({ commit }, user) {
      // console.log("스토어 userInfoUpdate안에 들어온 user");
      // console.log(user);
      return await update(user, (response) => {
        if (response.data.message === "success") {
          // console.log("스토어 userInfoUpdate응답 후 response.data");
          // console.log(response.data);
          commit("SET_USER_INFO", user);
        }
        // else {
        //   commit("SET_IS_LOGIN", false);
        //   commit("SET_IS_LOGIN_ERROR", true);
        // }

        // console.log("스토어 userInfoUpdate리턴 직전 response.data");
        // console.log(response.data);
        return response;
      });
      // console.log("스토어 userInfoUpdate완전 리턴 직전 변수 responsedata");
      // console.log(responseData);
    },

    getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      findById(
        decode_token.userid,
        (response) => {
          if (response.data.message === "success") {
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },

    deleteUser(context, id) {
      return deleteMember(id);
    },
  },
};

export default memberStore;

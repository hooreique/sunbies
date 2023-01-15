import { sidoList, gugunList, dongList, houseList } from "@/api/house.js";
import { checkFavorite, countFavorite } from "@/api/favorite.js";

const houseStore = {
  namespaced: true,
  state: {
    // 검색과 검색결과 관련
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],
    houses: [],
    house: null,
    // 카카오맵 관련
    positions: [],

    bounds: null,
    categoryList: {
      // 대형마트
      MT1: [],
      // 어린이집, 유치원
      PS3: [],
      // 학원
      AC5: [],
      // 은행
      BK9: [],
      // 관광명소
      AT4: [],
      // 음식점
      FD6: [],
      // 병원
      HP8: [],
      // 약국
      PM9: [],
      // 편의점
      CS2: [],
      // 학교
      SC4: [],
      // 자히철역
      SW8: [],
      // 문화시설
      CT1: [],
      // 공공기관
      PO3: [],
      // 카페
      CE7: [],
    },
    categoryStatus: false,
    categoryCode: null,
    pageNav: {},

    favoriteHouse: null,
    fromFavorite: false,
    userHousePosition: false,
    houseFavoriteCount: 0,
  },

  getters: {
    currentPageNo(state) {
      return state.pageNav.currentPageNo;
    },
    startPageNo(state) {
      return state.pageNav.startPageNo;
    },
    endPageNo(state) {
      return state.pageNav.endPageNo;
    },
    headRange(state) {
      return state.pageNav.headRange;
    },
    tailRange(state) {
      return state.pageNav.tailRange;
    },
    totalPageCount(state) {
      return state.pageNav.totalPageCount;
    },
  },

  mutations: {
    SET_SIDO_LIST: (state, sidos) => {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },

    SET_GUGUN_LIST: (state, guguns) => {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },

    SET_DONG_LIST: (state, dongs) => {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },
    CLEAR_DONG_LIST: (state) => {
      state.dongs = [{ value: null, text: "선택하세요" }];
    },

    SET_HOUSE_LIST: (state, houses) => {
      //   console.log(houses);
      state.houses = houses;
    },
    CLEAR_HOUSE_LIST: (state) => {
      //   console.log(houses);
      state.houses = null;
    },

    SET_DETAIL_HOUSE: (state, house) => {
      state.house = house;
    },
    CLEAR_DETAIL_HOUSE: (state) => {
      state.house = null;
    },

    SET_POSITIONS: (state, newpositions) => {
      state.positions = newpositions;
    },
    RESET_POSITIONS: (state) => {
      // if (state.positions.length > 0) {
      //   state.positions.forEach((marker) => marker.setMap(null));
      // }
      state.positions = [];
    },

    SET_BOUNDS: (state, newBounds) => {
      state.bounds = newBounds;
    },
    CLEAR_BOUNDS: (state) => {
      state.bounds = null;
    },

    SET_CATEGORYLIST_SPECITIC(state, newCategoryList) {
      if (newCategoryList.length > 0) {
        state.categoryList[newCategoryList[0].category_group_code] =
          newCategoryList;
      }
    },
    CLEAR_CATEGORYLIST_SPECITIC(state) {
      state.categoryList = {
        // 대형마트
        MT1: [],
        // 어린이집, 유치원
        PS3: [],
        // 학원
        AC5: [],
        // 은행
        BK9: [],
        // 관광명소
        AT4: [],
        // 음식점
        FD6: [],
        // 병원
        HP8: [],
        // 약국
        PM9: [],
        // 편의점
        CS2: [],
        // 학교
        SC4: [],
        // 자히철역
        SW8: [],
        // 문화시설
        CT1: [],
        // 공공기관
        PO3: [],
        // 카페
        CE7: [],
      };
    },

    SET_CATEGORYSTATUS(state, status) {
      state.categoryStatus = status;
    },
    CLEAR_CATEGORYSTATUS(state) {
      state.categoryStatus = false;
    },

    SET_CATEGORYCODE(state, newCode) {
      state.categoryCode = newCode;
    },

    CLEAR_CATEGORYCODE(state) {
      state.categoryCode = null;
    },

    SET_PAGE_NAV: (state, pageNav) => {
      state.pageNav = pageNav;
    },
    CLEAR_PAGE_NAV: (state) => {
      state.pageNav = {};
    },

    SET_FAVORITE_HOUSE: (state, house) => {
      state.favoriteHouse = house;
    },
    SET_FROM_FAVORITE: (state, flag) => {
      state.fromFavorite = flag;
    },
    SET_USER_HOUSE_POSITION: (state, position) => {
      state.userHousePosition = position;
    },
    SET_HOUSE_FAVORITE_COUNT: (state, count) => {
      state.houseFavoriteCount = count;
    },
  },
  actions: {
    getSido: ({ commit }) => {
      sidoList(
        ({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      gugunList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, gugunCode) => {
      const params = {
        gugun: gugunCode,
      };
      dongList(
        params,
        ({ data }) => {
          // console.log(commit, response);
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseList: ({ commit }, sParams) => {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      houseList(
        sParams,
        (response) => {
          console.log(response.data.infoList);
          commit("SET_HOUSE_LIST", response.data.infoList);
          commit("SET_PAGE_NAV", response.data.pageNav);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
    },

    getHouseFavorite: ({ commit }, { house, id }) => {
      countFavorite(house.aptCode)
        .then((res) => {
          if (res.data.message === "success") {
            console.log(res.data);
            commit("SET_HOUSE_FAVORITE_COUNT", res.data.favoriteCount);
          } else {
            console.log(res);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      if (id === "") return;
      checkFavorite({
        id: id,
        aptCode: house.aptCode,
      })
        .then((res) => {
          if (res.data.message === "success") {
            console.log(res.data);
            commit("SET_USER_HOUSE_POSITION", res.data.isFavorite);
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

export default houseStore;

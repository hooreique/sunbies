import {
  list,
  select,
  insert,
  update,
  del,
  insertReply,
  deleteReply,
  selectLike,
  insertLike,
  updateLike,
  deleteLike,
} from "@/api/board";

const boardStore = {
  namespaced: true,
  state: {
    BOARD_NAME_MAP: ["notice", "qna", "realestate"],
    BOARD_TYPE_MAP: {
      notice: 0,
      qna: 1,
      realestate: 2,
    },
    BOARD_TITLE_MAP: {
      notice: "공지사항",
      qna: "Q&A 게시판",
      realestate: "부동산 게시판",
    },
    BOARD_DESC_MAP: {
      notice: "관리자로부터의 공지사항이 올라옵니다. 관리자만 작성 가능합니다.",
      qna: "모든 주제에 대한 질문을 남기고 답변을 하는 공간입니다.",
      realestate: "부동산에 대한 이야기를 나누는 자유로운 공간입니다.",
    },
    BOARD_LEVEL_MAP: {
      notice: 1,
      qna: 0,
      realestate: 0,
    },
    postList: [],
    postDetail: {},

    pageNav: {},
    searchParams: {},
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
    SET_POST_LIST(state, postList) {
      state.postList = postList;
    },
    SET_POST_DETAIL(state, postDetail) {
      state.postDetail = postDetail;
    },
    SET_PAGE_NAV(state, pageNav) {
      state.pageNav = pageNav;
    },
    SET_SEARCH_PARAMS(state, searchparams) {
      state.searchParams = searchparams;
    },
  },
  actions: {
    setPostList({ commit }, { boardtype, searchparams }) {
      list(
        { boardtype, searchparams },
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_POST_LIST", data.postList);
            commit("SET_PAGE_NAV", data.pageNav);
            commit("SET_SEARCH_PARAMS", searchparams);
          } else {
            console.log("게시글 목록 얻기 실패");
          }
        },
        (e) => {
          console.log(e);
        }
      );
    },
    setPostDetail({ commit }, postno) {
      select(
        postno,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_POST_DETAIL", data.post);
          } else {
            console.log("게시글 디테일 얻기 실패");
          }
        },
        (e) => {
          console.log(e);
        }
      );
    },

    actWritePost(context, postDto) {
      return insert(postDto);
    },
    actUpdatePost(context, postDto) {
      return update(postDto);
    },
    actDeletePost(context, postno) {
      return del(postno);
    },

    actWriteReply(context, replyDto) {
      return insertReply(replyDto);
    },
    actDeleteReply(context, replyno) {
      return deleteReply(replyno);
    },

    actGetPosition(context, { postno, id }) {
      return selectLike(postno, id);
    },
    actInsertPosition(context, { postno, id, position }) {
      return insertLike(postno, id, position);
    },
    actUpdatePosition(context, { postno, id, position }) {
      return updateLike(postno, id, position);
    },
    actDeletePosition(context, { postno, id }) {
      return deleteLike(postno, id);
    },
  },
};

export default boardStore;

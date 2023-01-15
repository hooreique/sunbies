<template>
  <div>
    <div class="placeholder-sm"></div>
    <h1 class="mt-5 pt-5 pb-2">{{ boardTitle }}</h1>
    <h6 class="pb-3">{{ boardDesc }}</h6>
    <b-row v-if="userLevel >= boardLevel" class="justify-content-end m-3">
      <div>
        <b-button
          :to="{
            name: 'postwrite',
            params: {
              boardname: boardName,
            },
          }"
          >글 쓰기</b-button
        >
      </div>
    </b-row>
    <div class="app-bg-5">
      <b-row class="p-3">
        <b-col cols="2">
          <b-form-select v-model="orderBySelected" :options="orderByOptions">
            <template #first>
              <b-form-select-option :value="null"
                >정렬 기준</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-col>
        <b-col cols="2">
          <b-form-select v-model="orderSelected" :options="orderOptions" />
        </b-col>
        <b-col cols="2">
          <b-form-select
            v-model="searchKeySelected"
            :options="searchKeyOptions"
          >
            <template #first>
              <b-form-select-option :value="null"
                >검색 기준</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-col>
        <b-col cols="4">
          <b-form-input v-model.trim="searchWord"></b-form-input>
        </b-col>
        <b-col cols="2">
          <b-button block @click.prevent="searchPosts">적용</b-button>
        </b-col>
      </b-row>

      <div class="board-post-list">
        <board-post-list :postlist="postList" :key="$route.path" />
      </div>

      <b-row class="board-page-nav justify-content-center">
        <board-page-nav
          :pagenav="pageNav"
          :boardname="boardName"
          :searchparams="searchParams"
        />
      </b-row>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import BoardPostList from "@/components/board/BoardPostList.vue";
import BoardPageNav from "@/components/board/BoardPageNav.vue";

export default {
  name: "GeneralBoard",
  components: {
    BoardPostList,
    BoardPageNav,
  },
  data: () => ({
    orderBySelected: null,
    orderByOptions: [
      { value: "postno", text: "게시글 번호" },
      { value: "title", text: "제목" },
      { value: "cdate", text: "작성일" },
      { value: "likeCount", text: "좋아요" },
      { value: "replyCount", text: "댓글" },
    ],
    orderSelected: "desc",
    orderOptions: [
      { value: "asc", text: "오름차순" },
      { value: "desc", text: "내림차순" },
    ],
    searchKeySelected: null,
    searchKeyOptions: [
      { value: "title", text: "제목" },
      { value: "writer", text: "글쓴이 ID" },
    ],
    searchWord: "",
  }),
  computed: {
    ...mapState("boardStore", [
      "BOARD_TYPE_MAP",
      "BOARD_TITLE_MAP",
      "BOARD_DESC_MAP",
      "BOARD_LEVEL_MAP",
      "postList",
      "pageNav",
      "searchParams",
    ]),
    ...mapState("memberStore", ["userInfo"]),
    ...mapGetters("memberStore", ["userLevel"]),
    boardName() {
      return this.$route.params.boardname;
    },
    boardType() {
      return this.BOARD_TYPE_MAP[this.boardName];
    },
    boardTitle() {
      return this.BOARD_TITLE_MAP[this.boardName];
    },
    boardDesc() {
      return this.BOARD_DESC_MAP[this.boardName];
    },
    boardLevel() {
      return this.BOARD_LEVEL_MAP[this.boardName];
    },
  },
  methods: {
    ...mapActions("memberStore", ["getUserInfo"]),
    ...mapActions("boardStore", ["setPostList"]),
    searchPosts() {
      if (this.searchWord && this.searchKeySelected == null) {
        alert("검색어를 적용하려면 검색 기준을 지정하세요.");
        return;
      }
      // if (!this.searchWord && this.orderBySelected == null) {
      //   alert("적용할 조건이 없습니다.");
      //   return;
      // }
      const sParams = {};
      if (this.searchWord) {
        sParams.key = this.searchKeySelected;
        sParams.word = this.searchWord;
      }
      if (this.orderBySelected) {
        sParams.orderby = this.orderBySelected;
        sParams.order = this.orderSelected;
      }
      this.$router.push({
        name: "generalboard",
        params: {
          boardname: this.boardName,
        },
        query: {
          ...sParams,
          pg: 1,
          cpp: this.$route.query.cpp,
        },
      });
    },
  },
  created() {
    this.setPostList({
      boardtype: this.boardType,
      searchparams: {
        ...this.$route.query,
      },
    });
    this.orderBySelected = this.$route.query.orderby ?? null;
    this.orderSelected = this.$route.query.order ?? "desc";
    this.searchKeySelected = this.$route.query.key ?? null;
    this.searchWord = this.$route.query.word ?? "";
  },
};
</script>

<style scoped>
.board-post-list {
  padding: 50px;
}

.board-page-nav {
  padding: 50px 0 100px 0;
}
</style>

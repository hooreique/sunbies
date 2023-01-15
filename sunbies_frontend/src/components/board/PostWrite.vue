<template>
  <div>
    <h1 class="mt-5 pt-5">글쓰기</h1>
    <h6 class="pb-5">{{ boardTitle }}</h6>
    <b-container class="bg-light p-5">
      <b-row class="py-3">
        <b-col sm="2">
          <label for="post-title">제목</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            v-model.trim="postTitle"
            id="post-title"
            placeholder="제목을 입력하세요."
          ></b-form-input>
        </b-col>
      </b-row>

      <b-row class="py-3">
        <b-col sm="2">
          <label for="post-content">내용</label>
        </b-col>
        <b-col sm="10">
          <b-form-textarea
            v-model.trim="postContent"
            id="post-content"
            placeholder="내용을 입력하세요."
            rows="10"
          ></b-form-textarea>
        </b-col>
      </b-row>

      <div class="pt-5 pb-3 text-center">
        <b-button @click.prevent="writePost" class="px-5 py-2">등록</b-button>
        <b-button
          @click.prevent="$router.go"
          variant="danger"
          class="px-5 py-2 ml-5"
          >취소</b-button
        >
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "PostWrite",
  data: () => ({
    postTitle: "",
    postContent: "",
  }),
  computed: {
    ...mapState("boardStore", [
      "BOARD_TYPE_MAP",
      "BOARD_TITLE_MAP",
      "BOARD_LEVEL_MAP",
    ]),
    ...mapGetters("memberStore", ["userId"]),
    boardName() {
      return this.$route.params.boardname;
    },
    boardType() {
      return this.BOARD_TYPE_MAP[this.boardName];
    },
    boardTitle() {
      return this.BOARD_TITLE_MAP[this.boardName];
    },
  },
  methods: {
    ...mapActions("boardStore", ["actWritePost"]),
    writePost() {
      if (!this.postTitle || !this.postContent) {
        alert("제목과 내용을 모두 입력하세요.");
        return;
      }
      const post = {
        boardtype: this.boardType,
        writer: this.userId,
        title: this.postTitle,
        content: this.postContent,
      };
      this.actWritePost(post)
        .then((res) => {
          if (res.data.message === "success") {
            this.$router.push({
              name: "generalboard",
              params: {
                boardname: this.boardName,
              },
            });
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
</script>

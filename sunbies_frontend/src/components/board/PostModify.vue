<template>
  <div>
    <h1 class="mt-5 pt-5">글 수정</h1>
    <h6 class="pb-5">{{ boardTitle }}</h6>
    <b-container class="bg-light p-5">
      <b-row class="py-3">
        <b-col sm="2">
          <label for="post-title">제목</label>
        </b-col>
        <b-col sm="10">
          <b-form-input
            v-model.trim="postDetail.title"
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
            v-model.trim="postDetail.content"
            id="post-content"
            placeholder="내용을 입력하세요."
            rows="10"
          ></b-form-textarea>
        </b-col>
      </b-row>

      <div class="pt-5 pb-3 text-center">
        <b-button @click.prevent="modifyPost" class="px-5 py-2">수정</b-button>
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
  name: "PostModify",
  computed: {
    ...mapState("boardStore", [
      "BOARD_NAME_MAP",
      "BOARD_TITLE_MAP",
      "postDetail",
    ]),
    ...mapGetters("memberStore", ["userId"]),
    boardTitle() {
      return this.BOARD_TITLE_MAP[
        this.BOARD_NAME_MAP[this.postDetail.boardtype]
      ];
    },
  },
  methods: {
    ...mapActions("boardStore", ["getPostDetail", "actUpdatePost"]),
    modifyPost() {
      if (!this.postDetail.title || !this.postDetail.content) {
        alert("제목과 내용을 모두 입력하세요.");
        return;
      }
      this.actUpdatePost({
        postno: this.postDetail.postno,
        title: this.postDetail.title,
        content: this.postDetail.content,
      })
        .then((res) => {
          if (res.data.message === "success") {
            this.$router.push({
              name: "postdetail",
              params: {
                postno: this.postDetail.postno,
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
  created() {
    this.getPostDetail(this.$route.params.postno);
  },
};
</script>

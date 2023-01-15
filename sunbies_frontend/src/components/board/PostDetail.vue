<template>
  <div>
    <div class="placeholder"></div>
    <h1 class="display-4 py-5">{{ postDetail.title }}</h1>

    <b-row class="justify-content-between">
      <div>
        <span class="mx-3">{{ postDetail.cdate }}</span>
        <span class="mx-3">{{ postDetail.writer }}</span>
      </div>
      <div class="mx-3">{{ boardTitle }}</div>
    </b-row>

    <b-row v-if="userId === postDetail.writer" class="py-3 justify-content-end">
      <b-button @click.prevent="modifyPost" class="btn-sm">수정</b-button>
      <b-button @click.prevent="deletePost" class="mx-3 btn-sm">삭제</b-button>
    </b-row>

    <section>
      <p class="my-5 py-5">{{ postDetail.content }}</p>
    </section>

    <div class="py-5">
      <div
        @click.prevent="setPositionToLike"
        class="d-inline-block p-2 text-center rounded-circle app-bg-5"
        style="width: 40px; height: 40px; cursor: pointer"
      >
        <b-icon v-if="userLike" icon="hand-thumbs-up-fill" />
        <b-icon v-else icon="hand-thumbs-up" />
      </div>
      <div class="d-inline-block p-2 mr-4">
        <span style="font-size: 0.9rem">{{ postDetail.likeCount }}</span>
      </div>
      <div
        @click.prevent="setPositionToDislike"
        class="d-inline-block p-2 text-center rounded-circle app-bg-5"
        style="width: 40px; height: 40px; cursor: pointer"
      >
        <b-icon v-if="userDislike" icon="hand-thumbs-down-fill" />
        <b-icon v-else icon="hand-thumbs-down" />
      </div>
      <div class="d-inline-block p-2 mr-4">
        <span style="font-size: 0.9rem">{{ postDetail.dislikeCount }}</span>
      </div>
      <div
        @click.prevent="copyToClipboard"
        class="d-inline-block p-2 text-center rounded-circle app-bg-5"
        style="width: 40px; height: 40px; cursor: pointer"
      >
        <b-icon icon="share-fill" />
      </div>
    </div>

    <div class="pb-5 app-bg-5">
      <post-detail-reply
        :replylist="postDetail.replyList"
        :postno="postDetail.postno"
        @refreshpost="refreshPostDetail"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import PostDetailReply from "@/components/board/PostDetailReply.vue";

export default {
  name: "PostDetail",
  components: {
    PostDetailReply,
  },
  data: () => ({
    userPosition: 0,
  }),
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
    boardName() {
      return this.BOARD_NAME_MAP[this.postDetail.boardtype];
    },
    userLike() {
      return this.userPosition === 1;
    },
    userDislike() {
      return this.userPosition === -1;
    },
  },
  created() {
    this.refreshPostDetail();
  },
  methods: {
    ...mapActions("boardStore", [
      "setPostDetail",
      "actDeletePost",
      "actGetPosition",
      "actInsertPosition",
      "actUpdatePosition",
      "actDeletePosition",
    ]),

    refreshPostDetail() {
      this.setPostDetail(this.$route.params.postno);
      if (!this.userId) return;
      this.actGetPosition({
        postno: this.$route.params.postno,
        id: this.userId,
      })
        .then((res) => {
          if (res.data.message === "success") {
            this.userPosition = res.data.position;
          } else {
            console.log(res);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    modifyPost() {
      this.$router.push({
        name: "postmodify",
        params: {
          postno: this.postDetail.postno,
        },
      });
    },

    deletePost() {
      this.actDeletePost(this.postDetail.postno)
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

    setPositionToLike() {
      if (!this.userId) {
        alert("먼저 로그인하세요.");
        return;
      }
      if (this.userPosition === -1) {
        this.actUpdatePosition({
          postno: this.postDetail.postno,
          id: this.userId,
          position: "like",
        })
          .then((res) => {
            if (res.data.message === "success") {
              this.refreshPostDetail();
            } else {
              console.log(res);
            }
          })
          .catch((e) => {
            console.log(e);
          });
        return;
      }
      if (this.userPosition === 0) {
        this.actInsertPosition({
          postno: this.postDetail.postno,
          id: this.userId,
          position: "like",
        })
          .then((res) => {
            if (res.data.message === "success") {
              this.refreshPostDetail();
            } else {
              console.log(res);
            }
          })
          .catch((e) => {
            console.log(e);
          });
        return;
      }
      if (this.userPosition === 1) {
        this.actDeletePosition({
          postno: this.postDetail.postno,
          id: this.userId,
        })
          .then((res) => {
            if (res.data.message === "success") {
              this.refreshPostDetail();
            } else {
              console.log(res);
            }
          })
          .catch((e) => {
            console.log(e);
          });
        return;
      }
    },

    setPositionToDislike() {
      if (!this.userId) {
        alert("먼저 로그인하세요.");
        return;
      }
      if (this.userPosition === 1) {
        this.actUpdatePosition({
          postno: this.postDetail.postno,
          id: this.userId,
          position: "dislike",
        })
          .then((res) => {
            if (res.data.message === "success") {
              this.refreshPostDetail();
            } else {
              console.log(res);
            }
          })
          .catch((e) => {
            console.log(e);
          });
        return;
      }
      if (this.userPosition === 0) {
        this.actInsertPosition({
          postno: this.postDetail.postno,
          id: this.userId,
          position: "dislike",
        })
          .then((res) => {
            if (res.data.message === "success") {
              this.refreshPostDetail();
            } else {
              console.log(res);
            }
          })
          .catch((e) => {
            console.log(e);
          });
        return;
      }
      if (this.userPosition === -1) {
        this.actDeletePosition({
          postno: this.postDetail.postno,
          id: this.userId,
        })
          .then((res) => {
            if (res.data.message === "success") {
              this.refreshPostDetail();
            } else {
              console.log(res);
            }
          })
          .catch((e) => {
            console.log(e);
          });
        return;
      }
    },

    copyToClipboard() {
      navigator.clipboard
        .writeText(`localhost:8080${this.$route.fullPath}`)
        .then(() => {
          alert("클립보드에 복사되었습니다.");
        })
        .catch(() => {
          alert("복사 실패");
        });
    },
  },
};
</script>

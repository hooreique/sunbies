<template>
  <b-container class="p-5">
    <div class="pt-3">
      <post-detail-reply-list-item
        v-for="(replyitem, index) in replylist"
        :key="index"
        :replyitem="replyitem"
        @refreshpost="refreshPostDetail"
      />
    </div>
    <b-row class="align-items-center">
      <b-col sm="2" class="text-center">
        <label for="textarea-default">댓글 작성</label>
      </b-col>
      <b-col sm="8">
        <b-form-textarea
          v-model.trim="replycontent"
          placeholder="댓글을 달아주세요."
        ></b-form-textarea>
      </b-col>
      <b-col sm="2" class="text-center">
        <b-button block @click.prevent="submitreply">등록</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PostDetailReplyListItem from "@/components/board/PostDetailReplyListItem.vue";

export default {
  name: "PostDetailReply",
  data: () => ({
    replycontent: "",
  }),
  props: {
    replylist: Array,
    postno: Number,
  },
  components: {
    PostDetailReplyListItem,
  },
  computed: {
    ...mapGetters("memberStore", ["userName", "userId"]),
  },
  methods: {
    ...mapActions("boardStore", ["actWriteReply"]),
    submitreply() {
      if (!this.userId) {
        alert("먼저 로그인하세요.");
        return;
      }
      if (!this.replycontent) {
        alert("댓글 내용을 입력하세요.");
        return;
      }
      console.log(this.postno, this.userId, this.replycontent);
      this.actWriteReply({
        postno: this.postno,
        writer: this.userId,
        content: this.replycontent,
      })
        .then((res) => {
          if (res.data.message === "success") {
            this.replycontent = "";
            this.$emit("refreshpost");
          } else {
            console.log(res);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshPostDetail() {
      this.$emit("refreshpost");
    },
  },
};
</script>

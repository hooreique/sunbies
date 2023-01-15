<template>
  <b-row class="align-items-center pb-5">
    <b-col sm="2" class="text-center">
      <div>{{ replyitem.writer }}</div>
    </b-col>
    <b-col sm="9">
      <div style="font-size: 0.7rem">{{ replyitem.cdate }}</div>
      <div class="py-2">{{ replyitem.content }}</div>
    </b-col>
    <b-col v-if="replyitem.writer === userId" sm="1">
      <b-button @click.prevent="deletereply" variant="light" pill size="sm"
        >×</b-button
      >
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "PostDetailReplyListItem",
  props: {
    replyitem: Object,
  },
  computed: {
    ...mapGetters("memberStore", ["userId"]),
  },
  methods: {
    ...mapActions("boardStore", ["actDeleteReply"]),
    deletereply() {
      this.actDeleteReply(this.replyitem.replyno)
        .then((res) => {
          if (res.data.message === "success") {
            this.$emit("refreshpost");
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

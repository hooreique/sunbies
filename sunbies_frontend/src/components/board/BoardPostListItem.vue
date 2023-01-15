<template>
  <div>
    <b-row>
      <b-col class="py-2" cols="1">{{ post.postno }}</b-col>
      <b-col class="py-2" cols="6">
        <router-link
          :to="{
            name: 'postdetail',
            params: {
              postno: post.postno,
            },
          }"
          >{{ post.title }}</router-link
        >&nbsp;
        <span v-if="post.replyCount > 0" style="font-size: 0.8rem"
          >&nbsp;<b-icon icon="chat-left-text" />&nbsp;{{
            post.replyCount
          }}</span
        >
        <span v-if="post.likeCount > 0" style="font-size: 0.8rem"
          >&nbsp;<b-icon icon="hand-thumbs-up" />&nbsp;{{
            post.likeCount
          }}</span
        >
      </b-col>
      <b-col class="py-2" cols="2">{{ post.writer }}</b-col>
      <b-col class="py-2" cols="3">{{ post.cdate }}</b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "BoardPostListItem",
  props: {
    post: Object,
  },
};
</script>

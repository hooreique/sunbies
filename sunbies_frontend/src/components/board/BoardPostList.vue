<template>
  <div class="mt-3 p-3">
    <div v-if="postlist.length > 0">
      <b-row class="pb-3">
        <b-col class="py-2" cols="1">#</b-col>
        <b-col class="py-2" cols="6">제목</b-col>
        <b-col class="py-2" cols="2">글쓴이</b-col>
        <b-col class="py-2" cols="3">날짜</b-col>
      </b-row>
      <board-post-list-item
        v-for="(post, index) in postlist"
        :key="index"
        :post="post"
      />
    </div>
    <div v-else>
      <div class="py-5 text-center">결과가 없습니다.</div>
    </div>
  </div>
</template>

<script>
import BoardPostListItem from "@/components/board/BoardPostListItem.vue";

export default {
  name: "BoardPostList",
  props: {
    postlist: Array,
  },
  components: {
    BoardPostListItem,
  },
};
</script>

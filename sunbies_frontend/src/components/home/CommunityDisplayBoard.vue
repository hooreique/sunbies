<template>
  <div>
    <h4>{{ title }}</h4>
    <table class="table">
      <thead>
        <tr>
          <th class="col-sm-3">게시판</th>
          <th class="col-sm-5">제목</th>
          <th class="col-sm-2">글쓴이</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in postlist" :key="index">
          <td>{{ boardTitle(post.boardtype) }}</td>
          <td>
            <router-link
              :to="{
                name: 'postdetail',
                params: {
                  postno: post.postno,
                },
              }"
              >{{ post.title }}</router-link
            >
          </td>
          <td>{{ post.writerName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CommunityDisplayBoard",
  props: {
    title: String,
    postlist: Array,
  },
  computed: {
    ...mapState("boardStore", ["BOARD_TITLE_MAP", "BOARD_NAME_MAP"]),
  },
  methods: {
    boardTitle(boardtype) {
      return this.BOARD_TITLE_MAP[this.BOARD_NAME_MAP[boardtype]];
    },
  },
};
</script>

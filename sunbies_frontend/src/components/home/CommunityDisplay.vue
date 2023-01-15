<template>
  <div class="outer">
    <b-container class="pb-3">
      <h3>커뮤니티</h3>
    </b-container>
    <b-container>
      <b-row>
        <b-col cols="6">
          <community-display-board title="최신글" :postlist="latestPosts" />
        </b-col>
        <b-col cols="6">
          <community-display-board title="인기글" :postlist="hotPosts" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CommunityDisplayBoard from "@/components/home/CommunityDisplayBoard.vue";

export default {
  name: "CommunityDisplay",
  components: {
    CommunityDisplayBoard,
  },
  computed: {
    ...mapState("homeStore", ["latestPosts", "hotPosts"]),
  },
  methods: {
    ...mapActions("homeStore", ["actGetLatestPosts", "actGetHotPosts"]),
  },
  created() {
    this.actGetLatestPosts();
    this.actGetHotPosts();
  },
};
</script>

<style scoped>
.outer {
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>

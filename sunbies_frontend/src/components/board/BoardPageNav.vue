<template>
  <ul class="pagination">
    <li class="page-item">
      <router-link
        :to="{
          name: 'generalboard',
          params: { boardname },
          query: {
            ...searchparams,
            pg: 1,
          },
        }"
        class="page-link"
        >최신</router-link
      >
    </li>
    <li class="page-item">
      <router-link
        :to="{
          name: 'generalboard',
          params: { boardname },
          query: {
            ...searchparams,
            pg: headRange ? 1 : startPageNo - 1,
          },
        }"
        class="page-link"
        >이전</router-link
      >
    </li>

    <li
      v-for="no in pageNoArr"
      :key="no"
      class="page-item"
      :class="{ active: currentPageNo === no }"
    >
      <router-link
        :to="{
          name: 'generalboard',
          params: { boardname },
          query: {
            ...searchparams,
            pg: no,
          },
        }"
        class="page-link"
        >{{ no }}</router-link
      >
    </li>

    <li class="page-item">
      <router-link
        :to="{
          name: 'generalboard',
          params: { boardname },
          query: {
            ...searchparams,
            pg: tailRange ? endPageNo : endPageNo + 1,
          },
        }"
        class="page-link"
        >다음</router-link
      >
    </li>
    <li class="page-item">
      <router-link
        :to="{
          name: 'generalboard',
          params: { boardname },
          query: {
            ...searchparams,
            pg: totalPageCount,
          },
        }"
        class="page-link"
        >마지막</router-link
      >
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BoardPageNav",
  props: {
    pagenav: Object,
    boardname: String,
    searchparams: Object,
  },
  computed: {
    ...mapGetters("boardStore", [
      "currentPageNo",
      "startPageNo",
      "endPageNo",
      "headRange",
      "tailRange",
      "totalPageCount",
    ]),
    pageNoArr() {
      const arr = [];
      for (let i = this.startPageNo, I = this.endPageNo; i <= I; i++) {
        arr.push(i);
      }
      return arr;
    },
    cpp() {
      return this.$route.query.cpp;
    },
  },
};
</script>

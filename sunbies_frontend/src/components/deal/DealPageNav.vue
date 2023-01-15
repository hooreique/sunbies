<template>
  <ul class="pagination pagination-sm">
    <li class="page-item">
      <router-link
        :to="{
          name: routeName,
          query: {
            ...searchparams,
            pg: 1,
          },
        }"
        class="page-link"
        ><b-icon icon="chevron-double-left"
      /></router-link>
    </li>
    <li class="page-item">
      <router-link
        :to="{
          name: routeName,
          query: {
            ...searchparams,
            pg: headRange ? 1 : startPageNo - 1,
          },
        }"
        class="page-link"
        ><b-icon icon="chevron-left"
      /></router-link>
    </li>

    <li
      v-for="no in pageNoArr"
      :key="no"
      class="page-item"
      :class="{ active: currentPageNo === no }"
    >
      <router-link
        :to="{
          name: routeName,
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
          name: routeName,
          query: {
            ...searchparams,
            pg: tailRange ? endPageNo : endPageNo + 1,
          },
        }"
        class="page-link"
        ><b-icon icon="chevron-right"
      /></router-link>
    </li>
    <li class="page-item">
      <router-link
        :to="{
          name: routeName,
          query: {
            ...searchparams,
            pg: totalPageCount,
          },
        }"
        class="page-link"
        ><b-icon icon="chevron-double-right"
      /></router-link>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "DealPageNav",
  computed: {
    ...mapGetters("houseStore", [
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
    searchparams() {
      return this.$route.query;
    },
    routeName() {
      return this.$route.name;
    },
  },
};
</script>

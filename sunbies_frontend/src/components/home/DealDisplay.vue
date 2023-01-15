<template>
  <div class="outer">
    <b-container class="pb-3">
      <h3>최근 부동산 실거래 정보</h3>
    </b-container>
    <b-container>
      <b-card-group deck>
        <b-card
          v-for="(house, index) in latestDeals"
          :key="index"
          align="left"
          :title="house.apartmentName"
          :img-src="`http://localhost/image/kakao/${makeSearchWord(house)}`"
          :img-alt="`${house.apartmentName} image`"
          img-top
          img-height="200px"
          @click.prevent="mvDealPage(house)"
          style="cursor: pointer"
        >
          <div>{{ house | address }}</div>
          <div>{{ house.dealAmount }}만원</div>
        </b-card>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import makeSearchWord from "@/util/makeSearchWord.js";

export default {
  name: "DealDisplay",
  computed: {
    ...mapState("homeStore", ["latestDeals"]),
  },
  methods: {
    makeSearchWord,
    ...mapMutations("houseStore", ["SET_FAVORITE_HOUSE", "SET_FROM_FAVORITE"]),
    ...mapActions("homeStore", ["actGetLatestDeals"]),
    mvDealPage(house) {
      this.SET_FAVORITE_HOUSE(house);
      this.SET_FROM_FAVORITE(true);
      this.$router.push({
        name: "searchDeal",
      });
    },
  },
  filters: {
    address(house) {
      return `${house.sidoName} ${house.gugunName} ${house.dong} ${house.jibun}`;
    },
  },
  created() {
    this.actGetLatestDeals();
  },
};
</script>

<style scoped>
.card-text {
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
h4 {
  font-size: 10;
}
.outer {
  padding-bottom: 100px;
}
</style>

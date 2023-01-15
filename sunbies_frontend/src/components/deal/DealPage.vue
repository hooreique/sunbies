<template>
  <div>
    <div class="placeholder-sm"></div>
    <div class="pb-5">
      <search-deal-vue></search-deal-vue>
      <kakao-map-vue></kakao-map-vue>
    </div>
    <display-houses-vue></display-houses-vue>
  </div>
</template>

<script>
import SearchDealVue from "./SearchDeal.vue";
import KakaoMapVue from "./KakaoMap.vue";
import DisplayHousesVue from "./DisplayHouses.vue";
export default {
  components: {
    SearchDealVue,
    KakaoMapVue,
    DisplayHousesVue,
  },
};
</script>

<style></style>

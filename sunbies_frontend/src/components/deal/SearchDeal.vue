<template>
  <div class="pb-5">
    <h1 class="pb-4">
      <!-- <b-icon icon="house-door-fill" variant="black"></b-icon> -->
      실거래가 정보찾기
    </h1>
    <!-- 여기에 검색란 만들어야함 -->
    <!-- <b-row class="mt-4 mb-4 text-center"> -->
    <b-row align-h="center" class="p-3">
      <b-col cols="2">
        <b-form-select v-model="orderBySelected" :options="orderByOptions">
          <template #first>
            <b-form-select-option :value="null">정렬 기준</b-form-select-option>
          </template>
        </b-form-select>
      </b-col>
      <b-col cols="2">
        <b-form-select v-model="orderSelected" :options="orderOptions" />
      </b-col>
      <b-col cols="2">
        <b-form-select v-model="cppSelected" :options="cppOptions" />
      </b-col>
      <b-col cols="4">
        <b-form-input
          v-model.trim="searchWord"
          placeholder="아파트명"
          @keyup.enter="searchApt"
        ></b-form-input>
      </b-col>
      <b-col cols="1">
        <b-button block @click.prevent="searchApt">적용</b-button>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <!-- <b-col class="sm-3"> -->
      <b-col cols="3">
        <b-form-select
          v-model="sidoCode"
          :options="sidos"
          @change="gugunList"
        ></b-form-select>
      </b-col>
      <b-col cols="3">
        <!-- <b-col class="sm-3"> -->
        <b-form-select
          v-model="gugunCode"
          :options="guguns"
          @change="dongList"
        ></b-form-select>
      </b-col>
      <b-col cols="3">
        <!-- <b-col class="sm-3"> -->
        <b-form-select
          v-model="dongCode"
          :options="dongs"
          @change="searchApt"
        ></b-form-select>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseSearchBar",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,

      orderBySelected: null,
      orderByOptions: [
        { value: "no", text: "거래 번호" },
        { value: "dealDate", text: "거래 날짜" },
        { value: "dealAmount", text: "거래 금액" },
        { value: "buildYear", text: "건축연도" },
      ],
      orderSelected: "desc",
      orderOptions: [
        { value: "asc", text: "오름차순" },
        { value: "desc", text: "내림차순" },
      ],
      cppSelected: 10,
      cppOptions: [
        { value: 10, text: "10건씩" },
        { value: 20, text: "20건씩" },
        { value: 30, text: "30건씩" },
        { value: 40, text: "40건씩" },
        { value: 50, text: "50건씩" },
      ],
      searchWord: "",
    };
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs", "houses"]),
  },
  created() {
    // 사용자가 직접 URL 쿼리를 입력해서 들어오는 경우, 쿼리를 없앰
    if (Object.keys(this.$route.query).length !== 0) {
      this.$router.push({
        name: this.$route.name,
        query: {},
      });
    }
    this.CLEAR_HOUSE_LIST();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_DONG_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(houseStore, [
      "getSido",
      "getGugun",
      "getDong",
      "getHouseList",
    ]),
    ...mapMutations(houseStore, [
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_HOUSE_LIST",
      "CLEAR_DETAIL_HOUSE",
      "CLEAR_DETAIL_HOUSE",
    ]),
    gugunList() {
      console.log("구군리스트 실행");
      console.log("- 시도코드는 " + this.sidoCode);
      console.log("- 구군코드는 " + this.gugunCode);
      console.log("- 동코드는 " + this.dongCode);
      this.CLEAR_GUGUN_LIST();
      console.log("- 구군리스트 초기화");
      this.CLEAR_DONG_LIST();
      console.log("- 동리스트 초기화");
      this.gugunCode = null;
      console.log("- 구군코드 초기화");
      this.dongCode = null;
      console.log("- 동코드 초기화");
      if (this.sidoCode) {
        console.log("- 구군리스트 생성");
        this.getGugun(this.sidoCode);
      }
      console.log("구군리스트 완료");
    },
    dongList() {
      console.log("동리스트 실행");
      console.log("- 시도코드는 " + this.sidoCode);
      console.log("- 구군코드는 " + this.gugunCode);
      console.log("- 동코드는 " + this.dongCode);
      this.CLEAR_DONG_LIST();
      console.log("- 동리스트 초기화");
      this.dongCode = null;
      console.log("- 동코드 초기화");
      if (this.gugunCode) {
        console.log("- 동리스트 생성");
        this.getDong(this.gugunCode);
      }
      console.log("동리스트 완료");
    },
    searchApt() {
      console.log("아파트검색 실행");
      console.log("- 시도코드는 " + this.sidoCode);
      console.log("- 구군코드는 " + this.gugunCode);
      console.log("- 동코드는 " + this.dongCode);
      // if (this.dongCode) this.getHouseList(this.dongCode);

      if (this.dongCode == null) {
        alert("시도/구군/동을 지정하세요.");
        return;
      }

      const sParams = {};
      sParams.dongCode = this.dongCode;
      sParams.pg = 1;
      sParams.cpp = this.cppSelected;
      if (this.searchWord) {
        sParams.aptname = this.searchWord;
      }
      if (this.orderBySelected) {
        sParams.orderby = this.orderBySelected;
        sParams.order = this.orderSelected;
      }

      // URL 쿼리 세팅을 해줌으로써 주소를 보고있는 watch에서 액션을 불러준다.
      this.$router.push({
        name: this.$route.name,
        query: sParams,
      });
    },
  },
  watch: {
    // 여기에서 액션 호출
    $route(to, from) {
      if (to.fullPath === from.fullPath) return;
      if (Object.keys(to.query).length === 0) return;
      this.getHouseList(to.query);
    },
  },
};
</script>

<style></style>

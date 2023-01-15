<template>
  <b-container class="outer">
    <b-row id="deal-sel">
      <!-- 왼쪽 -->
      <b-col class="dealCont-header">
        <h3>거래정보</h3>
        <div id="dealCont-list" style="height: 550px; overflow: auto">
          <!-- 여기에 아파트 정보 뿌리기 -->
          <!-- 이거를 클릭 가능한 이쁜애들로 만들어보자 -->
          <!-- 버튼으로 만들어볼까? -->
          <div v-if="!houses" class="py-5 text-greyed">
            시/군/구를 선택하세요.
          </div>
          <div
            v-for="(house, idx) in houses"
            :key="idx"
            block
            @click="setHouse(house)"
            variant="transparent"
            class="deal-list-item"
          >
            <div>
              <h4 style="font-weight: bold">{{ house.apartmentName }}</h4>
              <div>
                {{
                  "주소: " +
                  house.sidoName +
                  " " +
                  house.gugunName +
                  " " +
                  house.dong +
                  " " +
                  house.jibun
                }}
              </div>
              <div>
                ({{
                  house.sidoName + " " + house.gugunName + " " + house.roadName
                }})
              </div>
              <div>
                {{
                  "거래일: " +
                  house.dealYear +
                  "년 " +
                  house.dealMonth +
                  "월 " +
                  house.dealDay +
                  "일"
                }}
              </div>
              <div>
                {{ "거래금액: " + house.dealAmount + "만원" }}
              </div>
            </div>
          </div>
        </div>

        <!-- 페이징 컴포넌트 -->
        <div v-if="houses" class="d-flex justify-content-center py-3">
          <deal-page-nav />
        </div>
        <!-- 상권정보 뿌리기 -->
        <div class="info-list" v-if="categoryStatus == true" id="상권정보">
          <div
            class="info-item-container"
            id="cafeDisplay"
            @click.prevent="firstCategoryMarker(category)"
            v-for="(category, idx) in categoryList"
            :key="idx"
          >
            <div class="info-item">
              <div class="info-item-icon-wrapper">
                <img
                  class="info-item-icon"
                  :id="idx"
                  :src="require(`@/assets/${idx}.png`)"
                />
              </div>
              <div class="info-item-count">
                {{ category.length }}
              </div>
            </div>
          </div>
        </div>
      </b-col>
      <!-- 여기에 디테일 뷰 보여야함 -->
      <b-col cols="7">
        <h3>거래 상세 정보</h3>
        <div>
          <!-- 카드로 해야한다. -->
          <div v-if="!house" class="py-5 text-greyed">
            거래 항목을 선택하세요.
          </div>
          <b-card v-if="house" tag="article" style="height: 100%" class="mb-2">
            <b-aspect
              aspect="16:9"
              class="house-img"
              :style="`background-image: url(http://localhost/image/kakao/${makeSearchWord(
                house
              )});`"
            ></b-aspect>
            <b-card-text>
              <h4 class="pt-4">아파트 상세정보</h4>

              <div class="text-right">
                <b-button
                  @click.prevent="handleUserFavorite(house)"
                  size="lg"
                  variant="transparent"
                >
                  <b-icon v-if="userHousePosition" icon="star-fill" />
                  <b-icon v-else icon="star" />
                  {{ houseFavoriteCount }}
                </b-button>
              </div>

              <b-row align-v="stretch">
                <b-col cols="3">
                  <div class="house-detail house-detail-first house-detail-key">
                    아파트 이름
                  </div>
                </b-col>
                <b-col cols="9">
                  <div
                    class="house-detail house-detail-first house-detail-value"
                  >
                    {{ house.apartmentName }}
                  </div>
                </b-col>
              </b-row>

              <b-row align-v="stretch">
                <b-col cols="3">
                  <div class="house-detail house-detail-key">준공 연도</div>
                </b-col>
                <b-col cols="9">
                  <div class="house-detail house-detail-value">
                    {{ house.buildYear }}년
                  </div>
                </b-col>
              </b-row>

              <b-row align-v="stretch">
                <b-col cols="3">
                  <div class="house-detail house-detail-key">주소</div>
                </b-col>
                <b-col cols="9">
                  <div class="house-detail house-detail-value">
                    {{
                      house.sidoName +
                      " " +
                      house.gugunName +
                      " " +
                      house.dong +
                      " " +
                      house.jibun
                    }}<br />
                    ({{
                      house.sidoName +
                      " " +
                      house.gugunName +
                      " " +
                      house.roadName
                    }})
                  </div>
                </b-col>
              </b-row>

              <h4 class="mt-5 py-5">거래정보</h4>

              <b-row align-v="stretch">
                <b-col cols="3">
                  <div class="house-detail house-detail-first house-detail-key">
                    거래 번호
                  </div>
                </b-col>
                <b-col cols="9">
                  <div
                    class="house-detail house-detail-first house-detail-value"
                  >
                    {{ house.no }}
                  </div>
                </b-col>
              </b-row>

              <b-row align-v="stretch">
                <b-col cols="3">
                  <div class="house-detail house-detail-key">층수</div>
                </b-col>
                <b-col cols="9">
                  <div class="house-detail house-detail-value">
                    {{ house.floor }}층
                  </div>
                </b-col>
              </b-row>

              <b-row align-v="stretch">
                <b-col cols="3">
                  <div class="house-detail house-detail-key">면적</div>
                </b-col>
                <b-col cols="9">
                  <div class="house-detail house-detail-value">
                    {{ house.area }}㎡
                  </div>
                </b-col>
              </b-row>

              <b-row align-v="stretch">
                <b-col cols="3">
                  <div class="house-detail house-detail-key">거래 일시</div>
                </b-col>
                <b-col cols="9">
                  <div class="house-detail house-detail-value">
                    {{
                      house.dealYear +
                      "년 " +
                      house.dealMonth +
                      "월 " +
                      house.dealDay +
                      "일"
                    }}
                  </div>
                </b-col>
              </b-row>

              <b-row align-v="stretch">
                <b-col cols="3">
                  <div class="house-detail house-detail-key">거래 금액</div>
                </b-col>
                <b-col cols="9">
                  <div class="house-detail house-detail-value">
                    {{ house.dealAmount }}만원
                  </div>
                </b-col>
              </b-row>
            </b-card-text>
          </b-card>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import DealPageNav from "@/components/deal/DealPageNav.vue";
import { insertFavorite, deleteFavorite } from "@/api/favorite.js";
import makeSearchWord from "@/util/makeSearchWord.js";

const houseStore = "houseStore";

export default {
  data() {
    return {
      currCategoy: "",
      houseInfo: null,
    };
  },
  created() {
    if (this.fromFavorite) {
      this.SET_FROM_FAVORITE(false);

      // this.CLEAR_DETAIL_HOUSE();
      // this.CLEAR_HOUSE_LIST();
      this.CLEAR_CATEGORYLIST_SPECITIC();
      this.CLEAR_CATEGORYSTATUS();
      this.detailHouse(this.favoriteHouse);
      if (!this.userId) return;
      this.getHouseFavorite({
        house: this.favoriteHouse,
        id: this.userId,
      });
      return;
    }

    this.CLEAR_DETAIL_HOUSE();
    this.CLEAR_HOUSE_LIST();
    this.CLEAR_CATEGORYLIST_SPECITIC();
    this.CLEAR_CATEGORYSTATUS();
  },
  components: {
    DealPageNav,
  },
  computed: {
    ...mapState(houseStore, [
      "sidos",
      "guguns",
      "dongs",
      "houses",
      "house",
      "categoryList",
      "categoryStatus",
      "favoriteHouse",
      "fromFavorite",
      "userHousePosition",
      "houseFavoriteCount",
    ]),
    ...mapGetters(houseStore, ["currentPageNo"]),
    ...mapGetters("memberStore", ["userId"]),
  },
  watch: {
    houses() {
      console.log("watch가 houses의 변경을 감지~~");
      console.log(this.houses);
    },
    houseInfo() {
      console.log("houseInfo 변경됨");
      // 하우스 인포가 보이는 변수니까
      // 이때 근처 정보들을 다 저장해야한다.
      this.searchPlaces();
      // this.getNearbyPlaceInfo();
    },
    categoryStatus() {
      // alert("categoryStatus = " + this.categoryStatus);
      if (this.categoryStatus == true) {
        this.curentCategoryList = this.categoryList;
      }
    },
  },
  methods: {
    makeSearchWord,
    ...mapActions("houseStore", ["detailHouse", "getHouseFavorite"]),
    ...mapMutations(houseStore, [
      "CLEAR_HOUSE_LIST",
      "SET_DETAIL_HOUSE",
      "CLEAR_DETAIL_HOUSE",
      "CLEAR_CATEGORYLIST_SPECITIC",
      "CLEAR_CATEGORYSTATUS",
      "CLEAR_PAGE_NAV",
      "SET_CATEGORYCODE",
      "SET_FROM_FAVORITE",
    ]),
    firstCategoryMarker(selectedCategory) {
      if (selectedCategory.length == 0) {
        alert("반경 500m안에 해당 상권은 없습니다.");
        this.SET_CATEGORYCODE(null);
      } else {
        // 상권이 있는걸 확인했으니
        // 마커를 넣어줘야한다.
        this.SET_CATEGORYCODE(selectedCategory[0].category_group_code);
        // alert(selectedCategory);
      }
    },

    setHouse(house) {
      this.SET_DETAIL_HOUSE(house);
      this.getHouseFavorite({
        house: house,
        id: this.userId,
      });
    },
    colorChange(flag) {
      this.isColor = flag;
    },

    handleUserFavorite(house) {
      if (this.userId === "") {
        alert("먼저 로그인하세요.");
        return;
      }
      if (this.userHousePosition) {
        deleteFavorite({
          id: this.userId,
          aptCode: house.aptCode,
        })
          .then((res) => {
            if (res.data.message === "success") {
              this.getHouseFavorite({
                house: house,
                id: this.userId,
              });
            } else {
              console.log(res);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        insertFavorite({
          id: this.userId,
          aptCode: house.aptCode,
        })
          .then((res) => {
            if (res.data.message === "success") {
              this.getHouseFavorite({
                house: house,
                id: this.userId,
              });
            } else {
              console.log(res);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
  },
  destroyed() {
    this.CLEAR_DETAIL_HOUSE();
    this.CLEAR_PAGE_NAV();
  },
};
</script>

<style scoped>
.outer {
  padding-bottom: 200px;
}

.mouse-over-bgcolor {
  background-color: lightblue;
}

.house-img {
  width: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 0.2rem;
}

.deal-list-item {
  background-color: rgba(211, 227, 252, 0.5);
  padding: 2rem;
  margin-bottom: 3px;
  text-align: left;
  cursor: pointer;
  border: 3px solid rgb(255, 255, 255, 0.5);
}

.deal-list-item:hover {
  background-color: rgb(119, 166, 247);
  color: #fff;
}

.text-greyed {
  color: rgba(40, 45, 66, 0.7);
}

.info-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.info-item-container {
  cursor: pointer;
  padding: 1rem 1rem 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 0.4rem;
  background-color: rgba(42, 70, 65, 0.3);
}
.info-item-container:hover {
  background-color: rgba(37, 59, 56, 0.4);
}

.info-item-icon-wrapper {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 100%;
  padding: 1rem;
}
.info-item-icon {
  width: 50px;
}

.info-item-count {
  padding-top: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: #fff;
}

.house-detail {
  display: flex;
  align-items: center;
  height: 100%;
  text-align: left;
  padding: 1rem 0 1rem 0.5rem;
  margin: 0 0.3rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.house-detail-key {
  font-weight: bold;
}
.house-detail-first {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
</style>

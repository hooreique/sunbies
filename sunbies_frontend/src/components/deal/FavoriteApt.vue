<template>
  <div class="py-4 text-left">
    <div class="placeholder-sm"></div>
    <h1 class="my-4 pt-4">즐겨찾기</h1>
    <h6 class="pb-4">
      <b-icon-newspaper />
      아이콘을 클릭하면 관련 뉴스 보기,<br />
      <b-icon-arrow-right-square />
      아이콘을 클릭하면 실거래가 정보 페이지로 이동<br />
      <b-icon-x-square />
      아이콘을 클릭하면 항목을 즐겨찾기에서 제거
    </h6>
    <div class="accordion" role="tablist">
      <div class="ffor" v-for="(house, index) in houses" :key="index">
        <div role="tab">
          <div>
            <div class="favorite-item">
              <div id="aptInfo">
                <h5>{{ house.apartmentName }}</h5>
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
                    house.sidoName +
                    " " +
                    house.gugunName +
                    " " +
                    house.roadName
                  }})
                </div>
              </div>

              <div id="buttonGroup" class="d-flex justify-content">
                <b-button
                  v-b-toggle="'accordion-' + index"
                  variant="transparent"
                  ><b-icon-newspaper scale="1.5"></b-icon-newspaper>
                </b-button>
                <b-button
                  @click.prevent="mvDealPage(house)"
                  pill
                  variant="transparent"
                  ><b-icon-arrow-right-square
                    scale="1.5"
                  ></b-icon-arrow-right-square>
                </b-button>
                <b-button
                  @click.stop.prevent="delFavorite(house)"
                  pill
                  variant="transparent"
                  ><b-icon-x-square scale="1.5"></b-icon-x-square>
                </b-button>
              </div>
            </div>
          </div>
        </div>

        <b-collapse
          :id="'accordion-' + index"
          visible
          accordion="my-accordion"
          role="tabpanel"
        >
          <a
            class="news-item"
            v-for="(item, idx) in news[index]"
            :key="idx"
            :href="`${item.link}`"
          >
            <div>
              <h6>{{ item.title }}</h6>
              <p class="news-content">{{ item.description }}</p>
              <p class="news-date">{{ item.pubDate }}</p>
            </div>
          </a>
        </b-collapse>
      </div>
    </div>
    <!-- <div class="p-5 bg-light"> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { listFavorite, deleteFavorite } from "@/api/favorite.js";
import http from "@/util/http-common";

export default {
  name: "FavoriteApt",
  data() {
    return {
      news: [],
      tempNews: {},
      message: "hello",
    };
  },
  async created() {
    this.CLEAR_HOUSE_LIST();
    await this.refreshListFavorite();
    // console.log("103 - " + this.houses.length);
    for (let n = 0; n < this.houses.length; n++) {
      await this.getNews(this.houses[n].apartmentName);
      // console.log("109 - ");
      // console.log(this.news);
    }
    // console.dir(this.news);
  },
  watch: {},

  computed: {
    ...mapState("houseStore", ["houses"]),
    ...mapGetters("memberStore", ["userId"]),
  },
  methods: {
    ...mapMutations("houseStore", [
      "CLEAR_HOUSE_LIST",
      "SET_HOUSE_LIST",
      "SET_DETAIL_HOUSE",
      "SET_FAVORITE_HOUSE",
      "SET_FROM_FAVORITE",
    ]),
    async getNews(keyword) {
      // console.log("getNews들어옴. " + keyword);
      await http.get(`/news/${keyword}`).then((response) => {
        var result = response.data.items;
        for (let n = 0; n < 10; n++) {
          let tempString = result[n].description;
          tempString = tempString.replaceAll("<b>", "");
          tempString = tempString.replaceAll("</b>", "");
          result[n].description = tempString;
        }
        this.news.push(result);
      });
    },
    mvDealPage(house) {
      this.SET_FAVORITE_HOUSE(house);
      this.SET_FROM_FAVORITE(true);
      this.$router.push({
        name: "searchDeal",
      });
    },
    delFavorite(house) {
      deleteFavorite({
        id: this.userId,
        aptCode: house.aptCode,
      })
        .then((res) => {
          if (res.data.message === "success") {
            this.refreshListFavorite();
          } else {
            console.log(res);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async refreshListFavorite() {
      await listFavorite(this.userId)
        .then((res) => {
          if (res.data.message === "success") {
            return res.data.favoriteList;
          }
          console.log(res);
        })
        .then((fList) => {
          this.SET_HOUSE_LIST(fList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style scoped>
.favorite-item {
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: rgba(104, 128, 126, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}
.ffor:first-child .favorite-item {
  border-top: none;
}

.news-item {
  display: block;
  text-decoration: none;
  padding: 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(92, 114, 111, 0.02);
}

.news-item:link,
.news-item:visited {
  color: rgba(0, 0, 0, 0.8);
}

.news-item:hover {
  background-color: rgba(141, 155, 167, 0.08);
}

.news-content {
  font-size: 0.8rem;
}
.news-date {
  font-size: 0.7rem;
}
</style>

<template>
  <div>
    <!-- <b-button v-b-toggle.sidebar-right>Toggle Sidebar</b-button> -->
    <b-sidebar
      id="sidebar-right"
      title="Sidebar"
      right
      backdrop
      backdrop-variant="transparent"
      no-header
      shadow
    >
      <div>
        <a
          class="float-right px-3 py-2 m-2"
          v-b-toggle
          href="#sidebar-right"
          @click.prevent
        >
          <b-icon-x-square
            scale="1.5"
            style=""
            variant="dark"
          ></b-icon-x-square>
        </a>
        <b-navbar class="pt-3">
          <h5 v-if="userInfo == null">
            <img
              style="margin-right: 10px; height: 30px"
              src="@/assets/user.svg"
              alt="Happy House"
            />손님
          </h5>
          <h5 v-else>
            <!-- <img
              style="margin-right: 10px; height: 30px"
              src="@/assets/user.svg"
              alt="Happy House"
            /> -->
            <b-avatar :text="userInfo.name"> </b-avatar>
            {{ userInfo.id }}
          </h5>
        </b-navbar>
      </div>
      <!-- <div style="background-color: darkblue"> -->
      <div>
        <!-- <a>asdfsdf</a> -->
        <div class="accordion" role="tablist">
          <div>
            <!-- <b-card-header header-tag="header" class="p-1" role="tab"> -->
            <!-- <b-button block v-b-toggle.mypage-collapse>마이페이지</b-button> -->
            <div
              v-b-toggle.mypage-collapse
              class="menu-toggle-button menu-toggle-button-first"
            >
              마이페이지
            </div>
            <!-- </b-card-header> -->
            <b-collapse
              id="mypage-collapse"
              accordion="sidebar-accordion"
              role="tabpanel"
              visible
            >
              <div v-if="!isLogin">
                <div>
                  <router-link
                    tag="div"
                    :to="{ name: 'login' }"
                    class="menu-item"
                    >로그인</router-link
                  >
                </div>
              </div>
              <div v-if="isLogin">
                <div>
                  <div @click.prevent="onClickLogout" class="menu-item">
                    로그아웃
                  </div>
                </div>
              </div>
              <div v-if="!isLogin">
                <div>
                  <router-link
                    class="menu-item"
                    tag="div"
                    :to="{ name: 'signup' }"
                    >회원가입</router-link
                  >
                </div>
              </div>
              <div v-if="!isLogin">
                <div>
                  <router-link
                    class="menu-item"
                    tag="div"
                    :to="{ name: 'findpassword' }"
                    >비밀번호 찾기</router-link
                  >
                </div>
              </div>
              <div v-if="isLogin">
                <div>
                  <router-link
                    tag="div"
                    :to="{ name: 'userPasswordCheck' }"
                    class="menu-item"
                    >회원정보</router-link
                  >
                </div>
              </div>
            </b-collapse>
          </div>

          <div>
            <!-- <b-card-header header-tag="header" class="p-1" role="tab"> -->
            <div v-b-toggle.commynity-collapse class="menu-toggle-button">
              커뮤니티
            </div>
            <!-- </b-card-header> -->
            <b-collapse
              id="commynity-collapse"
              accordion="sidebar-accordion"
              role="tabpanel"
            >
              <div>
                <div>
                  <router-link
                    tag="div"
                    class="menu-item"
                    :to="{
                      name: 'generalboard',
                      params: {
                        boardname: 'notice',
                      },
                      query: {
                        pg: 1,
                        cpp: 10,
                      },
                    }"
                    >공지사항</router-link
                  >
                </div>
              </div>
              <div>
                <div>
                  <router-link
                    tag="div"
                    class="menu-item"
                    :to="{
                      name: 'generalboard',
                      params: {
                        boardname: 'qna',
                      },
                      query: {
                        pg: 1,
                        cpp: 10,
                      },
                    }"
                    >Q&amp;A 게시판</router-link
                  >
                </div>
              </div>
              <div>
                <div>
                  <router-link
                    tag="div"
                    class="menu-item"
                    :to="{
                      name: 'generalboard',
                      params: {
                        boardname: 'realestate',
                      },
                      query: {
                        pg: 1,
                        cpp: 10,
                      },
                    }"
                    >부동산 게시판</router-link
                  >
                </div>
              </div>
            </b-collapse>
          </div>

          <div>
            <!-- <b-card-header header-tag="header" class="p-1" role="tab"> -->
            <div v-b-toggle.deal-collapse class="menu-toggle-button">
              실거래가 조회
            </div>
            <!-- </b-card-header> -->
            <b-collapse
              id="deal-collapse"
              accordion="sidebar-accordion"
              role="tabpanel"
            >
              <div>
                <div>
                  <router-link
                    class="menu-item"
                    tag="div"
                    :to="{ name: 'searchDeal' }"
                    >실거래가 조회</router-link
                  >
                </div>
              </div>
              <div v-if="userInfo">
                <div>
                  <router-link
                    class="menu-item"
                    tag="div"
                    :to="{ name: 'favorite' }"
                    >즐겨찾기</router-link
                  >
                </div>
              </div>
            </b-collapse>
          </div>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
// import ms from "@/store/modules/memberStore";

const memberStore = "memberStore";
export default {
  computed: {
    ...mapState(memberStore, ["userInfo", "isLogin", "userInfo"]),
  },
  methods: {
    ...mapActions(["userLogout"]),
    ...mapMutations(memberStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      // console.log("memberStore : ", ms);
      this.SET_USER_INFO(null);
      // console.log("로그아웃 들어옴");
      // this.$store.commit("memberStore/SET_IS_LOGIN", false);
      // this.$store.commit("memberStore/SET_USER_INFO", null);
      sessionStorage.removeItem("access-token");
      // 저 위에있으니까 이 값이 바뀌지 않았음. 하여 이렇게 체크해줌
      this.SET_IS_LOGIN(false);
      alert("로그아웃되었습니다.");
      if (this.$route.path != "/") {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style>
.b-sidebar.b-sidebar-right {
  left: auto;
  top: 76px;
  right: 0;
}

.menu-toggle-button {
  padding: 0.5rem;
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.menu-toggle-button-first {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.menu-item {
  cursor: pointer;
  text-align: center;
  padding: 0.5rem;
  background-color: rgba(186, 199, 219, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}
</style>

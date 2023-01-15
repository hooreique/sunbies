<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <div>
          <h2>{{ title[changable ? 1 : 0] }}</h2>
        </div>
      </b-col>
    </b-row>
    <b-col></b-col>
    <!-- 단순 유저정보만 보여주기용 -->
    <b-container v-if="!changable">
      <b-col class="d-flex justify-content-center">
        <b-card class="text-center mt-3" style="width: 40rem" align="left">
          <b-form class="text-left">
            <b-form-group label="아이디:" label-for="userId">
              <b-form-input
                id="userId"
                v-model="user.id"
                disabled="true"
                placeholder="아이디 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userPw">
              <b-form-input
                id="password"
                v-model="user.password"
                required
                disabled="true"
                placeholder="비밀번호 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="이름:" label-for="userName">
              <b-form-input
                id="userName"
                v-model="user.name"
                disabled="true"
                required
                placeholder="사용자명 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="전화번호:" label-for="userPhonenumber">
              <b-form-input
                id="userPhoneNumber"
                v-model="user.phone"
                required
                disabled="true"
                placeholder="전화번호 입력...."
              ></b-form-input>
            </b-form-group>
            <b-button
              type="button"
              variant="primary"
              class="m-1"
              @click="changableInfo"
              >회원정보 수정</b-button
            >
            <b-button
              type="button"
              variant="danger"
              class="m-1"
              @click="deleteUserId"
              >계정 삭제</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-container>
    <!--================================ 유저 정보 수정 ================================-->
    <b-container v-else>
      <b-col class="d-flex justify-content-center">
        <b-card class="text-center mt-3" style="width: 40rem" align="left">
          <b-form class="text-left" @submit.stop.prevent="confirm">
            <b-form-group label="아이디:" label-for="아이디">
              <b-form-input
                id="userId"
                v-model="user.id"
                disabled="true"
                placeholder="아이디 입력...."
              ></b-form-input>
            </b-form-group>
            <b-form-group label="새 비밀번호:" label-for="새 비밀번호">
              <b-form-input
                id="firstPassword"
                name="새 비밀번호"
                v-model="firstPassword"
                v-validate="{
                  required: true,
                  min: 3,
                  max: 20,
                  alpha_num: true,
                }"
                :state="validateState('새 비밀번호')"
                aria-describedby="새 비밀번호-invalid-feedback"
                required
                placeholder="비밀번호 입력...."
              ></b-form-input>
              <!-- 이건 임풋이 끝날때마다 해주면된다. -->
              <b-form-invalid-feedback id="새 비밀번호-invalid-feedback">{{
                veeErrors.first("새 비밀번호")
              }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group
              label="새 비밀번호 확인:"
              label-for="새 비밀번호 확인"
            >
              <b-form-input
                id="secondPassword"
                name="새 비밀번호 확인"
                v-model="secondPassword"
                v-validate="{
                  required: true,
                  min: 3,
                  max: 20,
                  alpha_num: true,
                  confirmed: firstPassword,
                }"
                :state="validateState('새 비밀번호 확인')"
                aria-describedby="새 비밀번호 확인-invalid-feedback"
                required
                placeholder="비밀번호 입력...."
              ></b-form-input>
              <!-- 이건 임풋이 끝날때마다 해주면된다. -->
              <b-form-invalid-feedback id="새 비밀번호 확인-invalid-feedback">{{
                veeErrors.first("새 비밀번호 확인")
              }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="이름:" label-for="이름">
              <b-form-input
                id="userName"
                name="이름"
                v-model="user.name"
                v-validate="'nameStyleRule'"
                :state="validateState('이름')"
                aria-describedby="이름-invalid-feedback"
                required
                placeholder="사용자명 입력...."
              ></b-form-input>
              <b-form-invalid-feedback id="이름-invalid-feedback">{{
                veeErrors.first("이름")
              }}</b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="전화번호:" label-for="전화번호">
              <b-form-input
                id="userPhoneNumber"
                name="전화번호"
                v-model="user.phone"
                v-validate="{ required, phoneStyleRule }"
                :state="validateState('전화번호')"
                aria-describedby="전화번호-invalid-feedback"
                required
                placeholder="전화번호 입력...."
              ></b-form-input>
              <b-form-invalid-feedback id="전화번호-invalid-feedback">{{
                veeErrors.first("전화번호")
              }}</b-form-invalid-feedback>
            </b-form-group>

            <b-button
              type="button"
              variant="primary"
              class="m-1"
              @click="confirm"
              >수정하기</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-container>
  </b-container>
</template>

<script>
// import http from "@/util/rest-http-common";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Validator } from "vee-validate";
// https://vuejs-kr.github.io/vue/vee-validate/2017/04/01/using-vee-validate/
const memberStore = "memberStore";
export default {
  name: "UserInfo",

  created() {
    this.user = this.checkUserInfo();
    // Validator.extend("phoneStyleRule", {
    //   message: "올바른 핸드폰번호 양식이 아닙니다.",

    //   validate: (value) => {
    //     // 체크 로직
    //     const regPhone = new RegExp(
    //       /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/
    //     );
    //     console.log("value=" + value + "regPhone결과=" + regPhone.test(value));
    //     return regPhone.test(value);
    //   },
    // });
    // 전화번호 양식과 동일한지 확인하는 유효성검사
    Validator.extend("phoneStyleRule", {
      getMessage: function (field, args) {
        console.log("field=" + field + ", args=" + args);
        return "번호 양식이 올바르지않습니다.";
      },

      validate: function (value, args) {
        // 체크 로직
        const regPhone = /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/;
        console.log("value=" + value + ", args=" + args);
        return regPhone.test(value);
      },
    });

    // 이름을 위해 한글 또는 영어로 입력됐는지 확인하는 유효성검사
    Validator.extend("nameStyleRule", {
      getMessage: function (field, args) {
        console.log("field=" + field + ", args=" + args);
        return "이름은 한글 또는 영문으로 입력되어야 합니다.";
      },
      validate: function (value, args) {
        // 체크 로직
        const regPhone = /^[가-힣|aA-zZ]*$/;
        console.log("value=" + value + ", args=" + args);
        return regPhone.test(value);
      },
    });
  },
  data() {
    return {
      user: null,
      changable: false,
      firstPassword: "",
      secondPassword: "",
      title: ["내정보", "회원정보 수정"],
    };
  },
  //   methods: {
  //     ...mapActions('module1', [ 'method1', 'method2' ]),
  //     ...mapActions('module2', { mod2method1: 'method1', mod2method2: 'method2' })
  // }

  methods: {
    ...mapGetters(memberStore, ["checkUserInfo"]),
    ...mapActions(memberStore, ["userInfoUpdate", "deleteUser"]),
    ...mapMutations(memberStore, ["SET_USER_INFO", "SET_IS_LOGIN"]),
    validateState(ref) {
      console.log(this.veeFields);
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    changableInfo() {
      this.changable = !this.changable;
      console.log(this.changable);
    },
    async confirm() {
      await this.$validator.validateAll().then((result) => {
        if (!result) {
          // alert("수정불가");
          return;
        }
        // alert("수정가능");
        const newUser = {
          id: this.user.id,
          password: this.secondPassword,
          name: this.user.name,
          phone: this.user.phone,
        };
        this.userInfoUpdate(newUser).then(() => {
          alert("회원정보 수정완료");
          this.$router.push({ name: "home" });
        });
      });
    },
    deleteUserId() {
      this.deleteUser(this.user.id)
        .then((response) => {
          if (response.data.message === "success") {
            alert("삭제되었습니다.");

            this.SET_USER_INFO(null);
            sessionStorage.removeItem("access-token");
            this.SET_IS_LOGIN(false);
            this.$router.push({ name: "home" });
          } else {
            console.log("유저 삭제 실패", response);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>

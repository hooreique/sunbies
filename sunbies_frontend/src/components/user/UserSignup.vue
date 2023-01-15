<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <div><h2>회원가입</h2></div>
      </b-col>
    </b-row>
    <b-col></b-col>
    <b-col class="d-flex justify-content-center">
      <b-card
        class="text-center mt-3"
        style="width: 40rem; max-width: 40rem"
        align="left"
      >
        <b-form class="text-left" @submit.stop.prevent="confirm">
          <b-form-group label="아이디:" label-for="아이디">
            <b-form-input
              id="userId"
              name="아이디"
              v-validate="{ required: true }"
              v-model="user.id"
              :state="validateState('아이디')"
              aria-describedby="userId-invalid-feedback"
              required
              placeholder="아이디 입력...."
              @keyup.enter="confirm"
            ></b-form-input>
            <b-form-invalid-feedback id="userId-invalid-feedback">{{
              veeErrors.first("아이디")
            }}</b-form-invalid-feedback>
          </b-form-group>

          <b-form-group label="비밀번호:" label-for="비밀번호">
            <b-form-input
              id="userPw"
              name="비밀번호"
              v-model="user.password"
              v-validate="{
                required: true,
                min: 3,
                max: 20,
                alpha_num: true,
              }"
              :state="validateState('비밀번호')"
              aria-describedby="userPw-invalid-feedback"
              required
              placeholder="비밀번호 입력...."
              @keyup.enter="confirm"
            ></b-form-input>
            <b-form-invalid-feedback id="userPw-invalid-feedback">{{
              veeErrors.first("비밀번호")
            }}</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="이름:" label-for="이름">
            <b-form-input
              id="userName"
              name="이름"
              v-model="user.name"
              v-validate="{ nameStyleRule, required }"
              :state="validateState('이름')"
              aria-describedby="userName-invalid-feedback"
              required
              placeholder="사용자명 입력...."
              @keyup.enter="confirm"
            ></b-form-input>
            <b-form-invalid-feedback id="userName-invalid-feedback">{{
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
          <b-button type="button" variant="primary" class="m-1" @click="confirm"
            >회원가입</b-button
          >
        </b-form>
      </b-card>
    </b-col>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import http from "@/util/http-common";
import { Validator } from "vee-validate";
const memberStore = "memberStore";

export default {
  name: "UserSignup",
  data() {
    return {
      user: {
        id: "",
        password: "",
        name: "",
        phone: "",
      },
    };
  },
  created() {
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
  methods: {
    ...mapActions(memberStore, ["userSignUp", "getUserInfo"]),
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
    // 회원가입 요청
    async confirm() {
      await this.$validator.validateAll().then((result) => {
        if (!result) {
          // alert("유효성 검증 탈락");
          return;
        }
        // alert("수정 가능");
        const data = {
          id: this.user.id,
          password: this.user.password,
          name: this.user.name,
          isadmin: "0",
          phone: this.user.phone,
        };
        http
          .post("/member", data)
          .then((response) => {
            if (response.data.message == "success") {
              alert("회원가입 완료했습니다.");
              this.$router.push({ name: "login" });
            } else {
              alert("회원가입에 실패했습니다.");
              this.resetInput();
            }
          })
          .catch(() => {
            alert("아이디가 중복되었습니다.");
          });
      });
    },
    resetInput() {
      this.user.id = "";
      this.user.password = "";
      this.user.name = "";
      this.user.phone = "";
    },
  },
};
</script>

<style></style>

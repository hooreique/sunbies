<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <div><h2>비밀번호 찾기</h2></div>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
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
            <b-button
              type="button"
              variant="primary"
              class="m-1"
              @click="confirm"
              >비밀번호 찾기</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import http from "@/util/http-common";
import { Validator } from "vee-validate";

export default {
  name: "UserFindPassword",
  data() {
    return {
      user: {
        id: "",
        name: "",
        phonenumber: "",
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
    async confirm() {
      await this.$validator.validateAll().then((result) => {
        if (!result) {
          // alert("유효성 검증 탈락");
          return;
        }
        const data = {
          id: this.user.id,
          name: this.user.name,
          phone: this.user.phone,
        };
        http.post(`/member/findpassword/`, data).then((response) => {
          // console.log(response.data);
          // console.log(response.status);
          // console.log(response.statusText);
          // console.log(response.headers);
          // console.log(response.config);
          console.log(response);
          if (response.data.message == "success") {
            // alert("비밀번호 찾았다~");
            alert(
              "해당 유저의 비밀번호는 '" +
                response.data.user.password +
                "'입니다."
            );
            console.log(response.data);
            // isregestered = true;
            this.$router.push({ name: "login" });
          } else {
            alert("해당하는 유저가 없습니다.");
          }
        });
      });
      // let isregestered = false;
    },
    movePage() {
      this.$router.push({ name: "SignUp" });
    },
  },
};
</script>

<style></style>

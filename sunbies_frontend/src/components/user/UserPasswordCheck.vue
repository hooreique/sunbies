<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <div><h2>내정보</h2></div>
      </b-col>
    </b-row>
    <b-container>
      <b-col class="d-flex justify-content-center">
        <b-card style="width: 40rem">
          <b-form class="text-left" @submit.stop.prevent="passwordCheck">
            <b-form-group label="비밀번호:" label-for="비밀번호">
              <!-- 위 label-for와 아래 name, validateState안 변수명, b-form-invalid-feedback은 같아야하는걸로 보인다. -->
              <b-form-input
                id="example-input-1"
                name="비밀번호"
                v-model="password"
                v-validate="{
                  required: true,
                }"
                :state="validateState('비밀번호')"
                aria-describedby="passwordInput-invalid-feedback"
                required
                placeholder="비밀번호 입력...."
              ></b-form-input>
              <!-- 이건 임풋이 끝날때마다 해주면된다. -->
              <b-form-invalid-feedback id="passwordInput-invalid-feedback">{{
                veeErrors.first("비밀번호")
              }}</b-form-invalid-feedback>
            </b-form-group>
            <b-button
              type="button"
              variant="primary"
              class="float-right"
              @click="passwordCheck"
              >입력</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-container>
  </b-container>
</template>

<script>
// import http from "@/util/rest-http-common";
export default {
  name: "UserInfo",
  created() {},
  data() {
    return {
      password: "",
      // {id, isadmin, name, phone}
    };
  },

  methods: {
    validateState(ref) {
      if (
        this.veeFields[ref] &&
        (this.veeFields[ref].dirty || this.veeFields[ref].validated)
      ) {
        return !this.veeErrors.has(ref);
      }
      return null;
    },
    // api check유저로 확인하기
    async passwordCheck() {
      await this.$validator.validateAll().then((result) => {
        if (!result) {
          // alert("수정불가");
          return;
        }
        const userPassword = this.$store.state.memberStore.userInfo.password;
        if (userPassword == this.password) {
          // alert("비밀번호 일치");
          this.$router.push({ name: "userinfo" });
        } else {
          alert("비밀번호가 틀렸습니다.");
          this.password = "";
        }
      });
    },
  },
};
</script>

<style></style>

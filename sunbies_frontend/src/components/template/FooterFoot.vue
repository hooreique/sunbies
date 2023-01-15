<template>
  <b-container fluid class="footer app-bg-1">
    <b-container class="p-5">
      <footer>
        <b-row align-h="center" class="p-5">
          <div class="p-2">
            <img
              class="logo"
              src="@/assets/logo/sunbies_small_god_white.png"
              alt="Sunbies"
            />
          </div>
        </b-row>
        <div class="footer-list d-flex justify-content-around p-5">
          <div>개인정보처리방침</div>
          <div>오픈소스라이선스</div>
          <div>고객센터</div>
          <div>채용정보</div>
        </div>
        <div class="footer-copy d-flex justify-content-around pb-5">
          <div>&copy; 2022 Sunbies all rights reserved.</div>
        </div>
      </footer>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: "FooterFoot",
};
</script>

<style scoped>
.footer {
  color: rgba(255, 255, 255, 0.7);
}

.logo {
  height: 50px;
}

.footer-list {
  font-size: 0.8rem;
}
.footer-copy {
  font-size: 0.9rem;
}
</style>

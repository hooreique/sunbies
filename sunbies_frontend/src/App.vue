<template>
  <div id="app">
    <!-- <topside-navbar-vue></topside-navbar-vue> -->
    <topside-navbar-vue></topside-navbar-vue>
    <right-sidebar></right-sidebar>
    <router-view />
    <footer-foot />
  </div>
</template>
<script>
import TopsideNavbarVue from "@/components/template/TopsideNavbar.vue";
import RightSidebar from "@/components/template/RightSidebar.vue";
import FooterFoot from "@/components/template/FooterFoot.vue";

export default {
  name: "HomeView",
  components: {
    TopsideNavbarVue,
    RightSidebar,
    // LeftSideBarVue,
    // NavSidebarvue,
    FooterFoot,
  },
};
</script>

<style>
@font-face {
  font-family: "SunbiesSans";
  src: url("@/assets/fonts/noto-sans-kr-v27-latin_korean-500.woff")
    format("woff");
  font-weight: normal;
}
@font-face {
  font-family: "SunbiesSans";
  src: url("@/assets/fonts/noto-sans-kr-v27-latin_korean-700.woff")
    format("woff");
  font-weight: bold;
}
@font-face {
  font-family: "SunbiesSans";
  src: url("@/assets/fonts/roboto-v30-latin-regular.woff") format("woff");
  unicode-range: U+0020-007E;
  font-weight: normal;
}
@font-face {
  font-family: "SunbiesSans";
  src: url("@/assets/fonts/roboto-v30-latin-700.woff") format("woff");
  unicode-range: U+0020-007E;
  font-weight: bold;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  font-size: 16px;
}

body {
  background-image: url(@/assets/bg/paper-w.png);
}

#app {
  font-family: "SunbiesSans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-bg-1 {
  background-color: rgb(0, 136, 122);
}
.app-bg-2 {
  background-color: rgba(247, 86, 36, 0.3);
}
.app-bg-3 {
  background-color: rgba(211, 227, 252, 0.5);
}
.app-bg-4 {
  background-color: rgb(119, 166, 247);
}
.app-bg-5 {
  background-color: rgba(89, 115, 160, 0.1);
}
.app-bg-b {
  background-color: rgba(0, 0, 0, 0.8);
}

.app-1 {
  color: rgb(0, 136, 122);
}
.app-2 {
  color: rgb(255, 204, 188);
}
.app-3 {
  color: rgb(211, 227, 252);
}
.app-4 {
  color: rgb(119, 166, 247);
}
.app-5 {
  color: rgba(89, 115, 160, 0.1);
}
.app-b {
  color: rgba(0, 0, 0, 0.8);
}
.app-w {
  color: rgba(255, 255, 255);
}

.placeholder {
  height: 200px;
}
.placeholder-sm {
  height: 120px;
}
</style>

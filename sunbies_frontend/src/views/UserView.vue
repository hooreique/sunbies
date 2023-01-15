<template>
  <b-container class="bv-example-row mt-3 text-center">
    <div class="member-container">
      <router-view></router-view>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "MemberView",
};
</script>

<style scoped>
.member-container {
  padding-top: 200px;
  padding-bottom: 150px;
}
</style>

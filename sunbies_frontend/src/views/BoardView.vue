<template>
  <b-container>
    <router-view :key="$route.fullPath" />
  </b-container>
</template>

<script>
export default {
  name: "BoardView",
};
</script>

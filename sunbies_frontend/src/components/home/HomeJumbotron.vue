<template>
  <div>
    <div class="placeholder"></div>
    <b-container fluid class="jumbospace">
      <b-container>
        <b-jumbotron bg-variant="transparent">
          <div class="pb-4">
            <img
              style="height: 100px"
              src="@/assets/logo/sunbies_big_b.png"
              alt="Sunbies"
            />
          </div>
          <p style="font-size: 1.1rem">
            전국 아파트 실거래 기록을 조회하고 자유롭게 관련된 이야기를 나눌 수
            있습니다.
          </p>
        </b-jumbotron>
      </b-container>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "HomeJumbotron",
};
</script>

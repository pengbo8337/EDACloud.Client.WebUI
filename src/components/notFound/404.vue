<template>
  <div class="notFound_back">
    <img src="../../common/images/404.jpg" alt="404">
    <p>很抱歉！找不到您所在的网页，如有需要可联系管理员哦~~</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.notFound_back {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
p {
  position: absolute;
  top: 450px;
  font-size: 15px;
}
</style>

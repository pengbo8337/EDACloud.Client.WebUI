<template>
  <div>
    <m-header class="header"></m-header>
    <user-info></user-info>
    <div class="main">
      <router-view class="base-Info"></router-view>
    </div>
    <m-footer class="footer"></m-footer>
  </div>
</template>
<script>
import MFooter from "components/nav/footer";
import MHeader from "components/nav/header";
import UserInfo from "components/nav/userInfo";
export default {
  data() {
    return {};
  },
  components: {
    MFooter,
    MHeader,
    UserInfo
  }
};
</script>
<style scoped>
.main {
  padding: 2.5rem;
  margin: 50px 0;
  min-height: 740px;
  top: 20px;
}
</style>



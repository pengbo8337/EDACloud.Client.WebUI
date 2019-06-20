<template>
  <div class="info-content">
    <!-- class="left-content" class="margin_right"-->
    <p>
      <span class="left-content margin_left" v-if="currentMenuId==1">
        <img class="user" src="../../common/images/mirror.png" alt="NineCube">&nbsp;&nbsp;镜像库管理&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/list.png"
          alt="NineCube"
        >&nbsp;&nbsp;镜像列表
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==2">
        <img class="user" src="../../common/images/services.png" alt="NineCube">&nbsp;&nbsp;服务器管理&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/services.png"
          alt="NineCube"
        >&nbsp;&nbsp;服务器
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==3">
        <img class="user" src="../../common/images/fix.png" alt="NineCube">&nbsp;&nbsp;公司管理
      </span>
      <!-- <span class="left-content margin_left" v-if="currentMenuId==3">
                    <img class="user"  src="../../common/images/fix.png" alt="NineCube"/>&nbsp;&nbsp;Static IP
      </span>-->
      <span class="left-content margin_left" v-if="currentMenuId==4">
        <img class="user" src="../../common/images/cloud.png" alt="NineCube">&nbsp;&nbsp;混合云管理&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/list.png"
          alt="NineCube"
        >&nbsp;&nbsp;混合云服务器列表
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==5">
        <img class="user" src="../../common/images/user.png" alt="NineCube">&nbsp;&nbsp;用户管理&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/list.png"
          alt="NineCube"
        >&nbsp;&nbsp;用户列表
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==6">
        <img class="user" src="../../common/images/consume.png" alt="NineCube">&nbsp;&nbsp;消费管理&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/list.png"
          alt="NineCube"
        >&nbsp;&nbsp;费用中心
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==7">
        <img class="user" src="../../common/images/plus.png" alt="NineCube">&nbsp;&nbsp;生成主机&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/home.png"
          alt="NineCube"
        >&nbsp;&nbsp;首页
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==71">
        <img class="user" src="../../common/images/plus.png" alt="NineCube">&nbsp;&nbsp;生成主机&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/home.png"
          alt="NineCube"
        >&nbsp;&nbsp;套餐配置
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==72">
        <img class="user" src="../../common/images/plus.png" alt="NineCube">&nbsp;&nbsp;生成主机&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/home.png"
          alt="NineCube"
        >&nbsp;&nbsp;存储硬盘
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==73">
        <img class="user" src="../../common/images/plus.png" alt="NineCube">&nbsp;&nbsp;生成主机&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/home.png"
          alt="NineCube"
        >&nbsp;&nbsp;软件配置
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==74">
        <img class="user" src="../../common/images/plus.png" alt="NineCube">&nbsp;&nbsp;生成主机&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/home.png"
          alt="NineCube"
        >&nbsp;&nbsp;其他配置
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==75">
        <img class="user" src="../../common/images/plus.png" alt="NineCube">&nbsp;&nbsp;生成主机&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/home.png"
          alt="NineCube"
        >&nbsp;&nbsp;管理员配置
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==8">
        <img class="user" src="../../common/images/plus.png" alt="NineCube">&nbsp;&nbsp;机器管理&nbsp;/&nbsp;
        <img
          class="user"
          src="../../common/images/home.png"
          alt="NineCube"
        >&nbsp;&nbsp;主机概况
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==9">
        <img class="user" src="../../common/images/video.png" alt="NineCube">&nbsp;&nbsp;监控警告&nbsp;
      </span>
      <span class="left-content margin_left" v-if="currentMenuId==10">
        <img class="user" src="../../common/images/document.png" alt="NineCube">&nbsp;&nbsp;文档管理&nbsp;
      </span>
      <span class="right-content margin_right">
        <img @click="loginOut" class="user loginOut" src="../../common/images/loginOut.png" alt="NineCube">
      </span>
      <span class="right-content margin_right">
      <img class="user" src="../../common/images/userIcon.png" alt="NineCube"> &nbsp&nbsp
      <img class="user" v-if="mobileValid=='true'" src="../../common/images/mobile_blue.png" title="手机已认证">
      <img class="user" v-else src="../../common/images/mobile_gray.png" title="手机未认证">
      &nbsp&nbsp
      <img class="user" v-if="isRealName=='true'" src="../../common/images/realName_blue.png" title="实名已认证">
      <img class="user" v-else src="../../common/images/realName_gray.png" title="实名未认证">
      &nbsp&nbsp
        {{user}}
      </span>
    </p>
    <!-- <div class="right-content">
            <p class="margin_right"><img class="user"  src="../../common/images/userIcon.png" alt="NineCube"/>  {{user}}</p>
    </div>-->
  </div>
</template>
<script>
import { getUserType,getLStorage } from "configs/config";
export default {
  data() {
    return {
      user: getLStorage("user"),
      currentMenuId: this.$store.state.menuId,
      isRealName:getLStorage("realName"),
      mobileValid:"",
    };
  },
  mounted(){
    this.mobileValid=getLStorage("mobileValid");
  },
  computed: {
    menuId() {
      return this.$store.state.menuId;
    }
  },
  watch: {
    menuId(val) {
      this.currentMenuId = val;
    }
  },
  methods: {
    loginOut() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>
<style scoped>
.info-content {
  padding: 5px;
  position: relative;
  color: #f08519;
  top: 68px;
  font-weight: bold;
}

.user {
  height: 16px;
  width: 16px;
  margin-top: 3px;
}
p {
  font-size: 1.1rem;
}
.loginOut{
  cursor: pointer;
}
</style>



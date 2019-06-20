<template>
  <div>
    <el-row class="mainheader">
      <el-col :span="3" class="myHead">
        <img class="left_span logo" src="../../common/images/logo.png" alt="NineCube">
      </el-col>
      <el-col :span="2" class="menuItem">
        <router-link to="/company" @click.native="goTo(3)">
          <img src="../../common/images/company.png" alt="管理员">
          <p>公司信息</p>
        </router-link>
      </el-col>
      <el-col :span="2" class="menuItem item2">
        <router-link to="/user" @click.native="goTo(5)">
          <img src="../../common/images/user.png" alt="用户">
          <p class="leftLittle">用户管理</p>
        </router-link>
      </el-col>
      <!-- <el-col :span="2" class="menuItem">
        <router-link to="/cloud" @click.native="goTo(1)">
          <img src="../../common/images/mirror.png" alt="镜像库">
          <p>镜像管理</p>
        </router-link>
      </el-col> -->
      <el-col :span="2" class="menuItem">
        <router-link to="/services" @click.native="goTo(2)">
          <img src="../../common/images/services.png" alt="服务器">
          <p>实例管理</p>
        </router-link>
      </el-col>
      <!-- <el-col :span="2" class="menuItem">
        <img src="../../common/images/company.png" alt="管理员">
        <p>账户管理</p>
      </el-col>-->
      <!-- <el-col :span="2" class="menuItem">
        <router-link to="/staticIP" @click.native="goTo(3)">
          <img src="../../common/images/fix.png" alt="Static IP">
          <p>Static IP</p>
        </router-link>
      </el-col>-->
      <el-col :span="2" class="menuItem">
        <router-link to="/consume" @click.native="goTo(6)">
          <img src="../../common/images/consume.png" alt="消费记录">
          <p class="leftLittle">消费充值</p>
        </router-link>
      </el-col>
      <el-col :span="2" class="menuItem">
        <router-link to="/generatehost" @click.native="goTo(7)">
          <img src="../../common/images/plus.png" alt="生成主机">
          <p class="leftLittle">生成主机</p>
        </router-link>
      </el-col>
      <el-col :span="2" class="menuItem">
        <router-link to="/manage" @click.native="goTo(8)">
          <img src="../../common/images/machine.png" alt="机器">
          <p class="leftLittle">机器监控</p>
        </router-link>
      </el-col>
      <!-- <el-col :span="2" class="menuItem">
        <router-link to="/document" @click.native="goTo(10)">
          <img src="../../common/images/document.png" alt="文档">
          <p class="leftLittle">文档管理</p>
        </router-link>
      </el-col>
      <el-col :span="2" class="menuItem">
        <router-link to="/MixCloud" @click.native="goTo(4)"  style="color:gray">
          <img src="../../common/images/cloud.png" alt="混合云">
          <p class="leftLot">混合云</p>
        </router-link>
      </el-col>
      <el-col :span="2" class="menuItem">
        <router-link to="/warning" style="color:gray"  @click.native="goTo(9)">
          <img src="../../common/images/video.png" alt="监控">
          <p>监控告警</p>
        </router-link>
      </el-col> -->
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goTo(id) {
      this.$store.state.menuId = id;
    }
  }
};
</script>
<style scoped>
.item2 img {
  margin-left: 1.5rem;
}
.NLogo {
  width: 35px;
  height: 35px;
}
.leftLittle {
  /* margin-left: 6px; */
}
.myHead {
  margin-right: 2%;
}
.leftLot{
  padding-left:1rem;
}
</style>



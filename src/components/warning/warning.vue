<template>
  <div>
    <el-row>
      <el-col class="left_span leftWarning" :span="11">
        <p class="title">
          <span class="left-content">
            <img class="titleIcon" src="../../common/images/caculate.png" alt="NineCube">&nbsp;&nbsp;云计算
          </span>
        </p>
        <div class="wItem">
          <label class="title">弹性云主机ECS(2):&nbsp;</label>
          <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          <img src="../../common/images/shopping.png" alt="NineCube">
        </div>
        <div class="wItem">
          <label class="title">镜像服务(2):&nbsp;</label>
          <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          <img src="../../common/images/shopping.png" alt="NineCube">
        </div>
        <div class="wItem">
          <label class="title">弹性云主机ECS(2):&nbsp;</label>
          <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          <img src="../../common/images/shopping.png" alt="NineCube">
        </div>
        <div class="wItem">
          <label class="title">弹性云主机ECS(2):&nbsp;</label>
          <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          <img src="../../common/images/shopping.png" alt="NineCube">
        </div>
        <div class="wItem">
          <label class="title">弹性云主机ECS(2):&nbsp;</label>
          <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
          <img src="../../common/images/shopping.png" alt="NineCube">
        </div>
      </el-col>
      <el-col class :span="11">
        <p class="title">
          <span class="left-content">
            <img class="titleIcon" src="../../common/images/net.png" alt="NineCube">&nbsp;&nbsp;云网络
          </span>
        </p>
        <div class="wItem">
          <label class="title">虚拟私有云VPC(2):&nbsp;</label>
          <el-progress class="progress" :text-inside="true" :stroke-width="18" :percentage="70"></el-progress>
        </div>
      </el-col>
    </el-row>
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
.wItem {
  height: 40px;
  background-color: #f5f5f5;
  margin: 20px 0px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 10px;
  border: #f5f5f5 solid 1px;
  margin-top: 75px;
}
.wItem .title {
  font-size: 1.5rem;
  width: 30%;
}
.progress {
  width: 50%;
}
.wItem img {
  margin-left: 3.6rem;
  height: 25px;
  width: 25px;
}
.leftWarning {
  margin-right: 8%;
}
</style>

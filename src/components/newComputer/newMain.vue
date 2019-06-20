<template>
    <div>
        <!-- <el-row class="margin_left"> 
            <el-col class="IconPart" :span="4">
              <img src="../../common/images/machine_black.png" class="IconSize" alt="消费记录"/>
              <p class="leftP">机器</p>
            </el-col>
            <el-col class="IconPart" :span="4">
              <img src="../../common/images/hardWare_black.png" class="IconSize" alt="消费记录"/>
              <p>存储/硬盘</p>
            </el-col>
            <el-col class="IconPart" :span="4">
              <img src="../../common/images/net2.png" class="IconSize" alt="消费记录"/>
              <p class="leftP">网络</p>
            </el-col>
            <el-col class="IconPart" :span="4">
              <img src="../../common/images/software.png" class="IconSize" alt="消费记录"/>
              <p class="leftP">软件</p>
            </el-col>
            <el-col class="IconPart" :span="4">
              <img src="../../common/images/others_black.png" class="IconSize" alt="消费记录"/>
              <p>第三方服务</p>
            </el-col>
            <el-col class="IconPart" :span="4">
              <img src="../../common/images/net_black.png" class="IconSize" alt="消费记录"/>
              <p>增值服务</p>
            </el-col>
        </el-row> -->
        <el-row class="productPart">
            <p class="title">稳定可靠云产品</p>
            <el-row class="cards">
                <el-col :span="6" class="nCard">
                    <div class="cheader">
                        <i class="corner"></i>
                        <h2>套餐</h2>
                    </div>
                    <div class="cbody">
                        <p>通用型、内存优化型、高IO型，适合独立开发者和企业用户，价格更合理，定价更优惠</p>
                    </div>
                    <div class="cfooter">
                        <router-link to="/setSetting">立即购买</router-link> 
                        <!-- <a class="right_a">详情</a>
                        <router-link to="/setSetting">立即购买</router-link> -->
                    </div>
                </el-col>
                <!-- <el-col :span="6" class="nCard">
                    <div class="cheader">
                        <i class="corner"></i>
                        <h2>硬盘存储</h2>
                    </div>
                    <div class="cbody">
                        <p>性能型、超高性能型、存储型</p>
                    </div>
                    <div class="cfooter">
                        <router-link  class="right_a" to="/storage">详情</router-link>
                        <a>立即购买</a>
                    </div>
                </el-col> -->
                <el-col :span="6" class="nCard">
                    <div class="cheader">
                        <i class="corner"></i>
                        <h2>定制</h2>
                    </div>
                    <div class="cbody">
                        <p>管理员结合公司业务选择云主机配置，选配九同方公司产品和服务生成主机</p>
                    </div>
                    <div class="cfooter">
                        <!-- <a class="right_a">详情</a> -->
                        <router-link to="/machineConfig">立即购买</router-link>
                    </div>
                </el-col>
                <!-- <el-col :span="6" class="nCard">
                    <div class="cheader">
                        <i class="corner"></i>
                        <h2>其他配置</h2>
                    </div>
                    <div class="cbody">
                        <p>自定义规则、协议、端口</p>
                    </div>
                    <div class="cfooter">
                        <a class="right_a btn">详情</a>
                        <router-link to="/others">立即购买</router-link>
                    </div>
                </el-col> -->
            </el-row>
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
<style  scoped>
.IconSize {
  height: 50px;
  width: 50px;
  margin-left: -0.5rem;
}
.leftP {
  padding-left: 1rem;
}
.productPart {
  padding: 4rem;
  margin: 6rem 0px;
  border-top: solid 0.1px #d4d2d2;
  background-color: #f9f9f9;
}
.title {
  text-align: center;
  font-size: 1.8rem;
}
.nCard {
  display: inline-block;
  width: 287px;
  margin-right: 35px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
}
.nCard:hover {
  background-color: #387dff;
  -webkit-box-shadow: 0 0px 10px 0 #387dff;
  box-shadow: 0 0px 10px 0 #387dff;
}
.nCard:hover .cheader h2{
  color: #fff;
}
.nCard:hover .cheader i{
      border-bottom: 20px solid #ffe876;
}
.nCard:hover .cbody p,.nCard:hover .cfooter a{
  color: #fff;
  font-weight: bolder;
}
.cheader {
  height: 52px;
  border-bottom: 1px solid #d8d8d8;
  position: relative;
}
.corner {
  display: block;
  width: 0px;
  height: 0px;
  border-bottom: 20px solid #d8d8d8;
  border-right: 20px solid transparent;
  border-left: 20px solid transparent;
  position: absolute;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  right: -14px;
  top: -3px;
}
.cheader h2 {
  padding: 18px 0px;
  text-align: center;
  font-size: 16px;
  color: #999999;
  font-weight: normal;
}
.cards {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}
.cbody {
  padding-top: 35px;
  height: 243px;
  -webkit-transition: height 0.3s;
  transition: height 0.3s;
  position: relative;
}
.cbody p {
  position: absolute;
  top: 135px;
  left: 50%;
  width: 180px;
  line-height: 19px;
  font-size: 14px;
  color: #999999;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  text-align: center;
}
.cfooter {
  border-top: 1px solid #d8d8d8;
  height: 45px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
  justify-content: center;
}
.cfooter a {
  /* width: 50%; */
  text-align: center;
  color: #999999;
  font-size: 14px;
  vertical-align: middle;
  line-height: 45px;
  cursor: pointer;
}
.right_a {
  border-right: 1px solid rgb(204, 204, 204);
}
</style>


<style>
</style>

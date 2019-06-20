<template>
  <div>
    <el-row>
      <el-col :span="18" class="selectPart">
        <h2>IO流量费</h2>
        <el-row class="margin_top">
          <el-radio-group v-model="companySoftWare">
            <el-radio-button label="阿里云"></el-radio-button>
            <el-radio-button label="其他"></el-radio-button>
          </el-radio-group>
        </el-row>
        <p class="margin_top">按阿里云流量报价收取</p>
        <hr/>
        <h2 class="myTable">备案费用</h2>
        <el-row class="margin_top">
          <el-radio-group v-model="openSoftWare">
            <el-radio-button label="阿里云"></el-radio-button>
            <el-radio-button label="其他"></el-radio-button>
          </el-radio-group>
        </el-row>
        <p class="margin_top">按备案价格收取</p>
        <hr/>
        <h2 class="myTable">Emergenncy</h2>
        <el-row class="margin_top">
          <el-radio-group v-model="selfSoftWare">
            <el-radio-button label="5X12"></el-radio-button>
            <el-radio-button label="7X24"></el-radio-button>
            <el-radio-button label="1000/人月"></el-radio-button>
          </el-radio-group>
        </el-row>
        <p class="margin_top">请联系客服</p>
        <hr/>
        <h2 class="myTable">PDK/IP</h2>
        <el-row class="margin_top">
          <el-radio-group v-model="otherSoftWare">
            <el-radio-button label="PDK"></el-radio-button>
            <el-radio-button label="IP"></el-radio-button>
          </el-radio-group>
        </el-row>
        <p class="margin_top">按照Listense付费</p>
        <hr/>
        <h2 class="myTable">其他</h2>
        <el-row class="margin_top">
          <el-radio-group v-model="countSoftWare">
            <el-radio-button label="其他"></el-radio-button>
            <el-radio-button label="其他"></el-radio-button>
          </el-radio-group>
        </el-row>
      </el-col>
      <el-col :span="5">
          <p>平台使用费用(月):</p>
          <p>Lisence费用:</p>
          <p>公司软件费用</p>
          <p>(小时/日/天/月):</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companySoftWare: "",
      openSoftWare:"",
      selfSoftWare:"",
      otherSoftWare:"",
      countSoftWare:""
    };
  },
  mounted() {
    this.$store.state.menuId = 74;
  }
};
</script>

<style scoped>
.selectPart p{
    color:#F08519;
}
hr{
    margin:0.5rem 0px;
    border: none;
    border-top: solid 1px #f2f2f2;
}
</style>

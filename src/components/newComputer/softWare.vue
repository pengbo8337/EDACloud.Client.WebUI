<template>
  <div>
    <el-row>
      <el-col :span="18" class="selectPart">
        <h2>公司软件选择</h2>
        <el-row class="margin_top">
          <el-radio-group v-model="companySoftWare">
            <el-radio-button label="espice"></el-radio-button>
            <el-radio-button label="esim"></el-radio-button>
            <el-radio-button label="eRF"></el-radio-button>
            <el-radio-button label="eViewer"></el-radio-button>
          </el-radio-group>
        </el-row>
        <p class="margin_top">公司软件espice/esim/eRF/eViewer/... , 不包含eWave/ePCD</p>
        <hr/>
        <h2 class="myTable">开源软件选择</h2>
        <el-row class="margin_top">
          <el-radio-group v-model="openSoftWare">
            <el-radio-button label="ngspice"></el-radio-button>
            <el-radio-button label="esim"></el-radio-button>
            <el-radio-button label="eRF"></el-radio-button>
            <el-radio-button label="eViewer"></el-radio-button>
          </el-radio-group>
        </el-row>
        <p class="margin_top">开源软件免费使用</p>
        <hr/>
        <h2 class="myTable">自有软件选择</h2>
        <el-row class="margin_top">
          <el-radio-group v-model="selfSoftWare">
            <el-radio-button label="espice"></el-radio-button>
            <el-radio-button label="esim"></el-radio-button>
            <el-radio-button label="eRF"></el-radio-button>
            <el-radio-button label="eViewer"></el-radio-button>
          </el-radio-group>
        </el-row>
        <p class="margin_top">请联系客服</p>
        <hr/>
        <h2 class="myTable">其他软件选择</h2>
        <el-row class="margin_top">
          <el-radio-group v-model="otherSoftWare">
            <el-radio-button label="eWave"></el-radio-button>
            <el-radio-button label="ePCD"></el-radio-button>
          </el-radio-group>
        </el-row>
        <p class="margin_top">按照Listense付费</p>
        <hr/>
        <h2 class="myTable">计费方式选择</h2>
        <el-row class="margin_top">
          <el-radio-group v-model="countSoftWare">
            <el-radio-button label="包年包月"></el-radio-button>
            <el-radio-button label="流量计费"></el-radio-button>
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
    this.$store.state.menuId = 73;
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

<template>
  <div>
    <el-row>
      <el-col :span="18">
        <el-row>
          <el-col
            class="tab"
            :span="5"
            :class="selectId==1?'tab_active':''"
            @click.native="toTab(1)"
          >入门级</el-col>
          <el-col
            class="tab"
            :span="3"
            :class="selectId==2?'tab_active':''"
            @click.native="toTab(2)"
          >企业级</el-col>
        </el-row>
        <el-row class="myTable">
          <el-radio-group v-model="storageType">
            <el-radio-button label="通用型"></el-radio-button>
            <el-radio-button label="计算型"></el-radio-button>
            <el-radio-button label="内存型"></el-radio-button>
            <el-radio-button label="大数据型"></el-radio-button>
            <el-radio-button label="本地SSD型"></el-radio-button>
            <el-radio-button label="高主频计算型"></el-radio-button>
            <el-radio-button label="GPU型"></el-radio-button>
            <el-radio-button label="FPGA型"></el-radio-button>
            <el-radio-button label="弹性裸金属"></el-radio-button>
          </el-radio-group>
        </el-row>
        <el-row class="myTable">
            <table class="storgeTable">
                <tr>
                    <td rowspan="2" style="width:200px;">
                        <h3>通用型 g5</h3>
                        <p class="margin_top">高网络包收发场景，如视频弹幕电信业务转发等</p>
                        <h4 class="myTable">场景：</h4>
                        <p class="margin_top">高网络包收发场景，如视频弹幕电信业务转发等</p>
                        <p>各种类型和规模的企业级应用</p>
                        <p>数据分析及计算</p>
                        <p>计算集群、依赖内存的数据处理</p>
                    </td>
                    <td>
                        <p>CPU内存比</p>
                        <p>1:4</p>
                    </td>
                    <td>
                        <p>CPU类型</p>
                        <p>Intel Skylake Xeon Platinum 8163 2.5GHZ</p>
                    </td>
                    <td rowspan="2">
                        <el-row>
                            <el-col :span="5">
                                <p>地域</p>
                            </el-col>
                            <el-col :span="15">
                            <el-select v-model="area" placeholder="请选择">
                                <el-option
                                v-for="item in areaOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                            </el-col>
                        </el-row>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>CPU内存比</p>
                        <p>1:4</p>
                    </td>
                    <td>
                        <p>CPU类型</p>
                        <p>Intel Skylake Xeon Platinum 8163 2.5GHZ</p>
                    </td>
                </tr>
            </table>
        </el-row>
        <el-row class="myTable">
            <table class="storgeTable">
                <tr>
                    <td rowspan="2" style="width:200px;">
                        <h3>通用网络增强型 sn2ne</h3>
                        <h4 class="myTable">场景：</h4>
                        <p class="margin_top">高网络包收发场景，如视频弹幕电信业务转发等</p>
                        <p>各种类型和规模的企业级应用</p>
                        <p>数据分析及计算</p>
                        <p>计算集群、依赖内存的数据处理</p>
                    </td>
                    <td>
                        <p>CPU内存比</p>
                        <p>1:4</p>
                    </td>
                    <td>
                        <p>CPU类型</p>
                        <p>Intel Skylake Xeon Platinum 8163 2.5GHZ</p>
                    </td>
                    <td rowspan="2"></td>
                </tr>
                <tr>
                    <td>
                        <p>CPU内存比</p>
                        <p>1:4</p>
                    </td>
                    <td>
                        <p>CPU类型</p>
                        <p>Intel Skylake Xeon Platinum 8163 2.5GHZ</p>
                    </td>
                </tr>
            </table>
        </el-row>
      </el-col>
      <el-col :span="5">

      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectId: 1,
      storageType: "通用型",
      area:"华南1",
      areaOptions:[{
          value: '华南1',
          label: '华南1'
        }]
    };
  },
  mounted() {
    this.$store.state.menuId = 72;
  },
  methods: {
    toTab(id) {
      this.selectId = id;
    }
  }
};
</script>

<style scoped>
.tab {
  font-size: 1.3rem;
  padding: 0.3rem;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
}
.tab_active {
  color: #409eff;
  border-bottom: solid;
}
.storgeTable,.storgeTable tr{
    border: solid 1px #f2f2f2;
}
td{
    padding: 3rem;
}
</style>

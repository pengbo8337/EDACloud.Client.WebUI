<template>
  <div>
    <el-row>
      <el-steps :active="currentStep" align-center>
        <el-step title="基础配置(必填)"></el-step>
        <el-step title="网络和安全组(必填)"></el-step>
        <!-- <el-step title="软件配置"></el-step>
        <el-step title="存储配置"></el-step> -->
        <el-step title="确认订单"></el-step>
      </el-steps>
    </el-row>
    <hr>
    <div class="myTable" id="firstStep" v-if="currentStep==1">
      <el-row>
        <el-col :span="5">
          <h2>
            <i class="el-icon-tickets"></i> 计费方式
          </h2>
        </el-col>
        <el-col :span="10">
          <el-badge value="优惠" class="item">
            <el-button size="small" @click="newInstance.PayByTraffic='PayByTime'">包年包月</el-button>
          </el-badge>
          <el-badge value class="item margin_left">
            <el-button size="small" @click="newInstance.PayByTraffic='PayByTraffic'">按量付费</el-button>
          </el-badge>
          <el-badge value class="item margin_left">
            <el-button size="small" @click="newInstance.PayByTraffic='PayByBandwidth'">抢占式实例</el-button>
          </el-badge>
        </el-col>
      </el-row>
      <hr>
      <el-row>
        <el-col :span="5">
          <h2>
            <i class="el-icon-location"></i> 地域
          </h2>
        </el-col>
        <el-col :span="15">
          <el-select v-model="newInstance.RegionId" placeholder="请选择" class="selectWidth">
            <el-option
              v-for="item in locationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-radio-group v-model="locationType" size="medium" class="margin_left">
            <el-radio-button label="随机分配"></el-radio-button>
            <el-radio-button :label="location+' 可用区B'"></el-radio-button>
            <el-radio-button :label="location+' 可用区C'"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <hr>
      <el-row>
        <el-col :span="5">
          <h2>
            <i class="el-icon-star-on"></i> 实例
          </h2>
          <!-- <p>. 实例规格族</p>
          <p>. 场景配置选型</p>-->
        </el-col>
        <el-col :span="18">
          <div class="example">
            <span>IO优化实例</span>
            <!-- <span class="margin_left">
              <i class="el-icon-star-off"></i> vCPU
            </span>
            <el-select v-model="vCPU" placeholder="请选择" class="selectWidth">
              <el-option
                v-for="item in CPUsOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <span class="margin_left_1">
              <i class="el-icon-star-off"></i> 内存
            </span>
            <el-select v-model="location" placeholder="请选择" class="selectWidth">
              <el-option
                v-for="item in locationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
            <span class="margin_left_1">
              <i class="el-icon-star-off"></i> 实例规格
            </span>
            <el-select v-model="newInstance.InstanceType" placeholder="请选择" style="width:15rem">
              <el-option
                v-for="item in instanceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- <el-input :model="newInstance.InstanceType" style="width:100px" placeholder="如：ecs.sn1ne.large"></el-input> -->
          </div>
          <el-row class="myTable">
            <el-col
              class="tab"
              :span="5"
              :class="selectId==1?'tab_active':''"
              @click.native="toTab(1)"
            >仅显示最新一代</el-col>
            <el-col
              class="tab"
              :span="3"
              :class="selectId==2?'tab_active':''"
              @click.native="toTab(2)"
            >所有代</el-col>
          </el-row>
          <el-row class="myTable">
            <el-radio-group v-model="architect" size="medium">
              <el-radio-button label=" X86 计算"></el-radio-button>
              <el-radio-button label=" 异构计算 CPU/FPGA"></el-radio-button>
              <el-radio-button label=" 弹性裸金服务器 (神龙)"></el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row class="margin_top">
            <el-radio-group v-model="classify" size="medium">
              <el-radio-button label=" 通用型"></el-radio-button>
              <el-radio-button label=" 计算型"></el-radio-button>
              <el-radio-button label=" 内存型"></el-radio-button>
              <el-radio-button label=" 大数据型"></el-radio-button>
              <el-radio-button label=" 本地SSD"></el-radio-button>
              <el-radio-button label=" 高主频型"></el-radio-button>
              <el-radio-button label=" 入门型(共型)"></el-radio-button>
            </el-radio-group>
          </el-row>
          <el-row class="margin_top">
            <el-table
              class="myTable"
              :data="computerList"
              ref="multipleTable"
              height="620"
              :header-cell-style="this.$root.setHeaderStyle"
              :row-class-name="this.$root.tableRowClassName"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="规格族" align="center"></el-table-column>
              <el-table-column prop="remainder" label="实例规格" align="center"></el-table-column>
              <el-table-column prop="plate" label="vCPU" align="center" width="250"></el-table-column>
              <el-table-column prop="state" label="内存" align="center"></el-table-column>
              <el-table-column prop="state" label="处理器型号" align="center"></el-table-column>
              <el-table-column prop="state" label="处理器主频" align="center"></el-table-column>
              <el-table-column prop="state" label="内网宽带" align="center"></el-table-column>
            </el-table>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="myTable">
        <el-col :span="5">
          <h2>
            <i class="el-icon-view"></i> 镜像
          </h2>
          <!-- <p>. 实例规格族</p>
          <p>. 场景配置选型</p>-->
        </el-col>
        <el-col :span="15">
          <el-select v-model="newInstance.ImageId" placeholder="请选择镜像">
            <el-option
              v-for="item in ImageOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="myTable" v-if="currentStep==2">
      <el-row>
        <el-col :span="5">
          <h2>
            <i class="el-icon-view"></i> 专有网络
          </h2>
        </el-col>
        <el-col :span="15">
          <el-select v-model="net" placeholder="请选择">
            <el-option value="sg-wz97rz0layh3jfskajll" label="默认专有网络"></el-option>
          </el-select>
          <div class="myTable">
            <p class="netTip">所选专有网络：默认专有网络</p>
          </div>
        </el-col>
      </el-row>
      <hr>
      <el-row class="myTable">
        <el-col :span="5">
          <h2>
            <i class="el-icon-menu"></i> 安全组
          </h2>
        </el-col>
        <el-col :span="15">
          <p>安全组类似防火墙功能，用于设置网络访问控制，您也可以到管理控制台</p>
          <p class="security myTable">所选安全组：默认安全组</p>
          <!-- <el-select v-model="net" placeholder="请选择">
            <el-option value="sg-wz97rz0layh3jfskajll" label="默认专有网络"></el-option>
          </el-select>-->
          <div class="myTable">
            <p class="netTip">所选专有网络：默认专有网络</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="myTable" v-if="currentStep==3">
      <el-row>
        <el-col :span="5">
          <h2>
            <i class="el-icon-menu"></i> 所选配置
          </h2>
        </el-col>
        <el-col :span="15">
          <h2>基础配置</h2>
          <el-row class="myTable">
            <el-col :span="8" class="basicConfig">
              <p>
                <b>计费方式：</b>
              </p>
            </el-col>
            <el-col :span="8" class="basicConfig">
              <p>
                <b>地域:</b>华北
              </p>
            </el-col>
            <el-col :span="8" class="basicConfig">
              <p>
                <b>实例:</b>
                {{newInstance.InstanceType}}
              </p>
            </el-col>
            <h2 class="myTable">网络和安全组</h2>
            <el-col :span="8" class="basicConfig myTable">
              <p>
                <b>网络：</b>专有网络
              </p>
            </el-col>
            <el-col :span="8" class="basicConfig myTable">
              <p>
                <b>安全组:</b>默认安全组（自定义端口）
              </p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <hr>
      <el-row>
        <el-col :span="5">
          <h2>
            <i class="el-icon-time"></i> 购买时长
          </h2>
        </el-col>
        <el-col :span="15">
          <el-radio-group v-model="purchaseTime">
            <el-radio-button label="1周"></el-radio-button>
            <el-radio-button label="1月"></el-radio-button>
            <el-radio-button label="2月"></el-radio-button>
            <el-radio-button label="3月"></el-radio-button>
            <el-radio-button label="半年"></el-radio-button>
            <el-radio-button label="1年"></el-radio-button>
            <el-radio-button label="2年"></el-radio-button>
            <el-radio-button label="3年"></el-radio-button>
            <el-radio-button label="4年"></el-radio-button>
            <el-radio-button label="5年"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="myTable" v-if="currentStep==4">
    </div>
    <div class="myTable" v-if="currentStep==5"></div> -->
    <el-row class="subTotalInfo">
      <span class="actionArea">
        <el-button type="warning" @click="preStep()" v-if="currentStep>1">上一步</el-button>
        <el-button type="warning" @click="nextStep()" v-if="currentStep!=3">下一步</el-button>
        <el-button :disabled="currentStep!=3" @click="nextStep()">确认订单</el-button>
      </span>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vCPU: "",
      net: "",
      purchaseTime: "",
      instanceTypeOptions: [],
      CPUsOptions: [
        {
          value: "2",
          label: "2 vCPU"
        },
        {
          value: "4",
          label: "4 vCPU"
        },
        {
          value: "8",
          label: "8 vCPU"
        }
      ],
      ImageOptions: [],
      currentStep: 1,
      newInstance: {
        AutoRenew: false,
        Action: "CreateInstance",
        PayByTraffic: "",
        RegionId: "",
        ImageId: "coreos_1745_7_0_64_30G_alibase_20180705.vhd",
        InstanceType: "ecs.g5.xlarge",
        SecurityGroupId: "sg-wz97rz0layh3jfskajll",
        deletionProtection: true,
        instanceName: "test",
        internetMaxBandwidthIn: 100,
        useAdditionalService: true,
        ioOptimized: "optimized",
        internetMaxBandwidthOut: 100,
        description: "",
        passwordInherit: true,
        systemDiskDiskName: "TestSystemDisk",
        systemDiskSize: 100,
        systemDiskDescription: "Test System Disk",
        DryRun: false
      },
      computerList: [],
      architect: " X86 计算",
      classify: " 通用型",
      selectId: 1,
      location: "华北1",
      locationType: "随机分配",
      locationOptions: [
        {
          value: "cn-shenzhen",
          label: "华北1"
        },
        {
          value: "cn-shenzhen2",
          label: "华北2"
        }
      ]
    };
  },
  mounted() {
    this.$store.state.menuId = 75;
    this.getImageList();
    this.getInstanceList();
  },
  methods: {
    preStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    getInstanceList() {
      //getInstanceType
      this.$ajaxs.getInstanceType([]).then(
        res => {
          let list = res;
          this.instanceTypeOptions = [];
          list.forEach(e => {
            this.instanceTypeOptions.push({
              label: e.instanceTypeId,
              value: e.instanceTypeId
            });
          });
          // if (res.statusCode == 0) {
          //   let list = res.data;
          //   this.instanceTypeOptions=[];
          //   list.forEach(e => {
          //     this.instanceTypeOptions.push({label:e.instanceTypeId,value:e.instanceTypeId});
          //   });
          // } else {
          //   //添加错误代码提示
          //   this.$message({
          //     message: "请求实例规格失败,错误代码：" + res.statusCode,
          //     type: "error"
          //   });
          // }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    getImageList() {
      let params = { PageIndex: 1, PageSize: 30 };
      this.$ajaxs.getImaggeList(params).then(
        res => {
          if (res.statusCode == 0) {
            let list = res.data;
            this.ImageOptions = [];
            list.forEach(e => {
              this.ImageOptions.push({ label: e.imageName, value: e.imageId });
            });
          } else {
            //添加错误代码提示
            this.$message({
              message: "请求镜像列表失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    nextStep() {
      switch (this.currentStep) {
        case 1:
          if (this.newInstance.RegionId == "") {
            this.$message({
              message: "请先选择地域",
              type: "warning"
            });
            return;
          }
          if (this.newInstance.ImageId == "") {
            this.$message({
              message: "请先选择镜像",
              type: "warning"
            });
            return;
          }
          if (this.newInstance.InstanceType == "") {
            this.$message({
              message: "请先选择实例规格",
              type: "warning"
            });
            return;
          }
          this.currentStep++;
          break;
        case 2:
          this.currentStep++;
          break;
        // case 3:
        //   break;
        // case 4:
        //   break;
        // case 5:
        //   break;
        default:
          this.currentStep = 1;
          this.$ajaxs.createInstance(this.newInstance).then(
            res => {
              if (res.statusCode == 0) {
                this.newInstance = {
                  AutoRenew: false,
                  Action: "CreateInstance",
                  PayByTraffic: "",
                  RegionId: "",
                  ImageId: "coreos_1745_7_0_64_30G_alibase_20180705.vhd",
                  InstanceType: "ecs.g5.xlarge",
                  SecurityGroupId: "sg-wz97rz0layh3jfskajll",
                  deletionProtection: true,
                  instanceName: "test",
                  internetMaxBandwidthIn: 100,
                  useAdditionalService: true,
                  ioOptimized: "optimized",
                  internetMaxBandwidthOut: 100,
                  description: "",
                  passwordInherit: true,
                  systemDiskDiskName: "TestSystemDisk",
                  systemDiskSize: 100,
                  systemDiskDescription: "Test System Disk",
                  DryRun: false
                };
                this.$message({
                  message: "生成实例成功",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "生成实例失败,错误信息：" + res.message,
                  type: "error"
                });
              }
            },
            err => {
              //添加错误连接提示
            }
          );
      }
    },
    toTab(id) {
      this.selectId = id;
    }
  }
};
</script>

<style scoped>
.subTotalInfo {
  width: 100%;
  position: fixed;
  display: block;
  bottom: 0;
  background: #f7f8fa;
  border-top: 1px solid #ebecec;
  padding: 0;
  z-index: 9;
  padding: 30px;
}
.actionArea {
  position: absolute;
  right: 50px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
hr {
  margin-top: 2rem;
  border: none;
  border-top: solid 1rem #f2f2f2;
  margin-bottom: 3rem;
}
.selectWidth {
  width: 10rem;
}
.example span {
  font-size: 1.2rem;
}
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
.netTip,
.basicConfig {
  font-size: 1.2rem;
}
.security {
  border: 0 none;
  background-color: #f7f8fa !important;
  padding: 1rem;
}
</style>

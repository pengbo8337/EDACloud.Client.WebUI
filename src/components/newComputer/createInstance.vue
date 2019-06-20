<template>
  <div>
    <el-row>
      <el-steps :active="currentStep" align-center>
        <el-step title="基础配置(必填)"></el-step>
        <!-- <el-step title="网络和安全组(必填)"></el-step> -->
        <el-step title="软件配置"></el-step>
        <!--  <el-step title="存储配置"></el-step>-->
        <el-step title="确认订单"></el-step>
      </el-steps>
    </el-row>
    <hr>
    <div class="myTable" id="firstStep" v-if="currentStep==1">
      <el-row>
        
        <el-col :span="3">
          <h2>
            <i class="el-icon-tickets"></i> 主机名称
          </h2>
        </el-col>
        <el-col :span="10">
          <el-input v-model="myInstance" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row class="myTable">
        <el-col :span="3">
          <h2>
            <i class="el-icon-tickets"></i> 实例规格
          </h2>
        </el-col>
        <el-col :span="20">
          <el-radio-group v-model="checkNo">
            <el-card v-for="(item,index) in typeList" :key="index" class="box-card myCard">
              <div slot="header" class="clearfix">
                <el-radio :label="index">{{item.instanceTypeId}}</el-radio>
              </div>
              <div class="text item">
                <p>规格级别:{{item.instanceFamilyLevel}}</p>
                <p class="margin_top">规格族:{{item.instanceTypeFamily}}</p>
                <p class="margin_top">内存大小：{{item.memorySize}}G</p>
                <p class="margin_top">vCPU:{{item.cpuCoreCount}} 网卡数量:{{item.eniQuantity}}</p>
              </div>
            </el-card>
          </el-radio-group>
        </el-col>
      </el-row>
      <hr>
      <el-row class="margin-top">
        <el-col :span="3">
          <h2>
            <i class="el-icon-time"></i> 购买时长
          </h2>
        </el-col>
        <el-col :span="15" style="margin-left:10px;">
          <el-radio-group v-model="purchaseTime">
            <el-radio-button label="1月"></el-radio-button>
            <el-radio-button label="3月"></el-radio-button>
            <el-radio-button label="6月"></el-radio-button>
            <el-radio-button label="1年"></el-radio-button>
            <el-radio-button label="3年"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="myTable">
        <el-col :span="3">
          <h2>
            <i class="el-icon-star-on"></i> 系统盘类型
          </h2>
        </el-col>
        <!-- <el-col :span="15" style="margin-left:10px;">
          <el-radio-group v-model="save">
            <el-radio-button label="阿里云"></el-radio-button>
            <el-radio-button label="本地"></el-radio-button>
          </el-radio-group>
        </el-col>-->
        <el-col :span="15">
          <el-radio-group v-model="hardWareType">
            <!-- <el-radio label="cloud">普通云盘</el-radio> -->
            <el-radio label="cloud_efficiency">高效云盘</el-radio>
            <el-radio label="cloud_ssd">SSD云盘</el-radio>
            <el-radio label="ephemeral_ssd">本地SSD云盘</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="myTable">
        <el-col :span="3">
          <h2>
            <i class="el-icon-star-on"></i> 系统盘大小
          </h2>
        </el-col>
        <el-col :span="6">
          <el-input
            placeholder="20~500G"
            v-model.number="distSize"
            type="number"
            minlength="2"
            maxlength="3"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row class="myTable">
        <el-col :span="4">
          <h2>
            <i class="el-icon-star-on"></i> 公网出宽带（最大值）：
          </h2>
        </el-col>
          <el-col :span="12">
            <el-select v-model.number="InternetMaxBandwidthOut" placeholder="请选择" @change="getMoney()">
              <el-option
                    label="1M"
                    value="1"
                  ></el-option>
                  <el-option
                    label="2M"
                    value="2"
                  ></el-option>
                  <el-option
                    label="5M"
                    value="5"
                  ></el-option>
                  <el-option
                    label="10M"
                    value="10"
                  ></el-option>
                  <el-option
                    label="20M"
                    value="20"
                  ></el-option>
                  <el-option
                    label="50M"
                    value="50"
                  ></el-option>
                  <el-option
                    label="100M"
                    value="100"
                  ></el-option>
                </el-select>  M
            </el-col>
        </el-row>
    </div>
    <div class="myTable" id="secondStep" v-if="currentStep==2">
      <el-row>
        <el-col :span="24" class="selectPart">
          <h2>公司软件选择</h2>
          <el-row class="margin_top">
            <!-- <el-radio-group v-model="companySoftWare">
              <el-radio-button v-for="(item,index) in companySoftWareList" :key="index" :label="item.soft_name"></el-radio-button>
            </el-radio-group>-->
            <el-checkbox-group v-model="companySoftWare" @change="handleCompanySoftChange">
              <el-checkbox
                v-for="(item,index) in companySoftWareList"
                :label="item.soft_name"
                :key="index"
                :value="item.price"
              >{{item.soft_name}}</el-checkbox>
            </el-checkbox-group>
          </el-row>
          <p class="margin_top">公司软件espice/esim/eRF/eViewer/... , 不包含eWave/ePCD</p>
          <hr>
          <h2 class="myTable">开源软件选择</h2>
          <el-row class="margin_top">
            <!-- <el-radio-group v-model="openSoftWare">
              <el-radio-button
                v-for="(item,index) in openSoftWareList"
                :key="index"
                :label="item.soft_name"
              ></el-radio-button>
            </el-radio-group>-->
            <el-checkbox-group v-model="openSoftWare" @change="handleCompanySoftChange">
              <el-checkbox
                v-for="(item,index) in openSoftWareList"
                :label="item.soft_name"
                :key="index"
                :value="item.price"
              >{{item.soft_name}}</el-checkbox>
            </el-checkbox-group>
          </el-row>
          <p class="margin_top">开源软件免费使用</p>
          <hr>
          <h2 class="myTable">自有软件选择</h2>
          <el-row class="margin_top">
            <!-- <el-radio-group v-model="selfSoftWare">
              <el-radio-button
                v-for="(item,index) in selfSoftWareList"
                :key="index"
                :label="item.soft_name"
              ></el-radio-button>
            </el-radio-group>-->
            <el-checkbox-group v-model="selfSoftWare" @change="handleCompanySoftChange">
              <el-checkbox
                v-for="(item,index) in selfSoftWareList"
                :label="item.soft_name"
                :key="index"
                :value="item.price"
              >{{item.soft_name}}</el-checkbox>
            </el-checkbox-group>
          </el-row>
          <p class="margin_top">请联系客服</p>
          <hr>
          <h2 class="myTable">其他软件选择</h2>
          <div class="margin_top">
            <el-checkbox-group v-model="otherSoftWare" @change="handleCompanySoftChange">
              <el-row class="margin_top" v-for="(item,index) in otherSoftWareList" :key="index">
                <el-col :span="5">
                  <el-checkbox
                    :label="item.soft_name"
                    :key="index"
                    :value="item.soft_name"
                  >{{item.soft_name}}</el-checkbox>
                </el-col>
                <el-col :span="7">
                  <el-radio-group v-model="item.time" @change="getMoneyCount()">
                    <el-radio-button label="1月"></el-radio-button>
                    <el-radio-button label="3月"></el-radio-button>
                    <el-radio-button label="6月"></el-radio-button>
                    <el-radio-button label="1年"></el-radio-button>
                    <el-radio-button label="3年"></el-radio-button>
                  </el-radio-group>
                </el-col>
                <el-col :span="7">
                  <el-input
                    placeholder="请输入个数"
                    v-model.number="item.count"
                    @change="getMoneyCount()"
                  >
                    <template slot="prepend">个数</template>
                  </el-input>
                </el-col>
                <el-col :span="24">
                  <hr class="licenseSpace">
                </el-col>
              </el-row>
            </el-checkbox-group>
          </div>
          <p class="margin_top">按照Listense付费</p>
          <!--<hr>
           <h2 class="myTable">计费方式选择</h2>
          <el-row class="margin_top">
            <el-radio-group v-model="countSoftWare">
              <el-radio-button label="流量计费"></el-radio-button>
            </el-radio-group>
          </el-row>-->
        </el-col>
        <!-- <el-col :span="5">
          <p>平台使用费用(月):</p>
          <p>Lisence费用:</p>
          <p>公司软件费用</p>
          <p>(小时/日/天/月):</p>
        </el-col>-->
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
                <b>实例规格:</b>
                {{typeList[checkNo].instanceTypeId}}
              </p>
            </el-col>
            <el-col :span="8" class="basicConfig">
              <p>
                <b>规格级别:</b>
                {{typeList[checkNo].instanceFamilyLevel}}
              </p>
            </el-col>
            <el-col :span="8" class="basicConfig">
              <p>
                <b>规格族:</b>
                {{typeList[checkNo].memorySize}}
              </p>
            </el-col>
            <h2>系统盘</h2>
            <el-col :span="8" class="basicConfig">
              <p>
                <b>系统盘类型:</b>
                {{hardWareType}}
              </p>
            </el-col>
            <el-col :span="8" class="basicConfig">
              <p>
                <b>系统盘大小:</b>
                {{distSize}}G
              </p>
            </el-col>
            <h2 class="myTable">软件配置</h2>
            <el-col :span="8" class="basicConfig myTable">
              <p>
                <b>公司软件：</b>
                <span v-for="(item,index) in companySoftWare" :key="index">{{item}}</span>
              </p>
            </el-col>
            <el-col :span="8" class="basicConfig myTable">
              <p>
                <b>开源软件:</b>
                <span v-for="(item,index) in openSoftWare" :key="index">{{item}}</span>
              </p>
            </el-col>
            <el-col :span="8" class="basicConfig myTable">
              <p>
                <b>自有软件:</b>
                <span v-for="(item,index) in selfSoftWare" :key="index">{{item}}</span>
              </p>
            </el-col>
            <el-col :span="8" class="basicConfig myTable">
              <p>
                <b>其他软件:</b>
                <span v-for="(item,index) in otherSoftWare" :key="index">{{item}}</span>
              </p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <hr>
      <el-row>
        <el-col :span="5">
          <h2>
            <i class="el-icon-time"></i> 购买时常
          </h2>
        </el-col>
        <el-col :span="15">
          <el-radio-group v-model="purchaseTime" disabled="false">
            <el-radio-button label="1月"></el-radio-button>
            <el-radio-button label="3月"></el-radio-button>
            <el-radio-button label="6月"></el-radio-button>
            <el-radio-button label="1年"></el-radio-button>
            <el-radio-button label="3年"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <el-row class="subTotalInfo">
      <div>
        <p>
          配置费用：
          <span class="allCount">￥{{allCount}}</span>
        </p>
      </div>
      <span class="actionArea">
        <el-button type="warning" @click="preStep()" v-if="currentStep>1">上一步</el-button>
        <el-button type="warning" @click="nextStep()" v-if="currentStep!=3">下一步</el-button>
        <el-button :disabled="currentStep!=3" @click="nextStep()">确认订单</el-button>
      </span>
    </el-row>
    <el-dialog :visible.sync="payVisible" title="订单支付" center width="600px">
      <span>
        <p>
          <b>总价：</b>
          {{allCount}}
        </p>
        <p>
          <b>您的余额为：</b>
          {{myMoney}}
        </p>
        <p><router-link to="/consume">充值</router-link></p>
      </span>
      <span slot="footer" class="dialog-footer myDialogFooter">
        <el-button type="primary" @click="confirmPay()">确认支付</el-button>
        <el-button @click="payVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myMoney:0,
      payVisible:false,
      myInstance:"",
      distSize:20,
      allCount: 0,
      checkNo: 0,
      hardWareType: "cloud_efficiency",
      currentStep: 1,
      typeList: [],
      purchaseTime: "1月",
      save: "",
      companySoftWare: [],
      openSoftWare: [],
      selfSoftWare: [],
      otherSoftWare: [],
      countSoftWare: "",
      companySoftWareList: [],
      openSoftWareList: [],
      selfSoftWareList: [],
      otherSoftWareList: [],
      moneyDetail:[],
      InternetMaxBandwidthOut:1,
    };
  },
  mounted() {
    this.getInstanceType();
    this.getSoftware();
  },
  watch: {
    hardWareType(val) {
      this.getMoneyCount();
    },
    purchaseTime(){
      this.getMoneyCount();
    },
    checkNo(){
      this.getMoneyCount();
    },
    InternetMaxBandwidthOut(){
      this.getMoneyCount();
    }
  },
  methods: {
    cancelConfirm(){
      this.$router.push({
            path: "/generatehost"
          });
    },
    confirmPay() {
      //orderid: this.orderId,eda:this.currentMoney
      this.$ajaxs
        .confirmPayConfig ([{ orderid: this.orderId, eda: this.allCount }],this.orderId)
        .then(
          res => {
            if (res.statusCode == 0) {
              this.$message({
                message:"扣费成功",
                type: "success"
              });
              this.payVisible=false;
              this.$router.push({
            path: "/generatehost"
          });
            } else {
              this.$message({
                message: res.message,
                type: "warning"
              });
            }
          },
          err => {
            //添加错误连接提示
          }
        );
    },
    getleftMoney(){
      //getLeftMoney
      this.$ajaxs.getLeftMoney().then(
        res => {
          if (res.statusCode == 0) {
            //console.log(res.data.bal_eda);
            this.myMoney=res.data.bal_eda;
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    filterData(data, id) {
      var foo1 = data.filter(function(item) {
        return item.soft_type == id;
      });
      return foo1;
    },
    handleCompanySoftChange(val) {
      this.getMoneyCount();
    },
    getDuration(str) {
      let dTime = 0;
      switch (str) {
        case "1月":
          dTime = 1;
          break;
        case "3月":
          dTime = 3;
          break;
        case "6月":
          dTime = 6;
          break;
        case "1年":
          dTime = 12;
          break;
        case "3年":
          dTime = 36;
          break;
        default:
          dTime = 0;
      }
      return dTime;
    },
    getMoneyCount() {
      this.allCount = 0;
      let allCount = 0;
      if (this.companySoftWare.length > 0) {
        let listSelect = this.companySoftWare;
        let list = this.companySoftWareList;
        for (let a = 0; a < listSelect.length; a++) {
          for (let b = 0; b < list.length; b++) {
            if (listSelect[a] == list[b].soft_name) {
              allCount += list[b].price;
              break;
            }
          }
        }
      }
      if (this.openSoftWare.length > 0) {
        let listSelect = this.openSoftWare;
        let list = this.openSoftWareList;
        for (let a = 0; a < listSelect.length; a++) {
          for (let b = 0; b < list.length; b++) {
            if (listSelect[a] == list[b].soft_name) {
              allCount += list[b].price;
              break;
            }
          }
        }
      }
      if (this.selfSoftWare.length > 0) {
        let listSelect = this.selfSoftWare;
        let list = this.selfSoftWareList;
        for (let a = 0; a < listSelect.length; a++) {
          for (let b = 0; b < list.length; b++) {
            if (listSelect[a] == list[b].soft_name) {
              allCount += list[b].price;
              break;
            }
          }
        }
      }
      if (this.otherSoftWare.length > 0) {
        let listSelelct = this.otherSoftWare;
        let list = this.otherSoftWareList;
        for (let a = 0; a < listSelelct.length; a++) {
          for (let b = 0; b < list.length; b++) {
            if (listSelelct[a] == list[b].soft_name) {
              if (list[b].count >= 0) {
                allCount +=
                  list[b].price * list[b].count * this.getTimeNum(list[b].time);
              } else {
                this.otherSoftWareList[b].time = 0;
              }
              break;
            }
          }
        }
      }
      let serviceMoney=0;
      this.$ajaxs
        .getResourceMony({
          // RegionId: this.area,
          InstanceType: this.typeList[this.checkNo].instanceTypeId,
          Duration: this.getDuration(this.purchaseTime),
          SystemDiskType: this.hardWareType,
          SystemDiskSize: this.distSize,
          InternetMaxBandwidthOut:this.InternetMaxBandwidthOut
        })
        .then(
          res => {
            if (res.statusCode == 0) {
              // this.moneyDetail = res.data.moduleDetails;
              // let origin =
              //   res.data.originalPrice == null
              //     ? 0
              //     : res.data.originalPrice + this.setPrice;
              // this.originalMoney = origin;
              // let discount=res.data.DiscountPrice==null?0:res.data.DiscountPrice;
              serviceMoney =
                res.data.tradePrice == null
                  ? 0
                  : res.data.tradePrice;
                  this.allCount = allCount+serviceMoney;
                  this.moneyDetail=res.data.moduleDetails;
              // this.moneyType =
              //   res.data.currency == null
              //     ? "(RMB)"
              //     : "(" + res.data.currency + ")";
            } else {
              this.$message({
                message: "获取价格失败," + res.message,
                type: "error"
              });
            }
          },
          err => {
            //添加错误连接提示
          }
        );
      
    },
    getTimeNum(str) {
      let dTime = 0;
      switch (str) {
        case "1月":
          dTime = 1;
          break;
        case "3月":
          dTime = 3;
          break;
        case "6月":
          dTime = 6;
          break;
        case "1年":
          dTime = 12;
          break;
        case "3年":
          dTime = 36;
          break;
        default:
          dTime = 0;
      }
      return dTime;
    },
    getSoftware() {
      this.$ajaxs.getSoftWare({ PageIndex: 1, PageSize: 10 }).then(
        res => {
          let softerWares = res.data;
          this.companySoftWareList = this.filterData(softerWares, 1);
          this.openSoftWareList = this.filterData(softerWares, 2);
          this.selfSoftWareList = this.filterData(softerWares, 3);
          let list = this.filterData(softerWares, 4);
          list.forEach((e,i) => {
            list[i].time="1月";
            list[i].count=1;
          });
          this.otherSoftWareList=list;
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    getInstanceType() {
      this.$ajaxs.getInstanceType({ PageIndex: 1, PageSize: 10 }).then(
        res => {
          this.typeList = res.data;
          this.getMoneyCount();
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    preStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    nextStep() {
      switch (this.currentStep) {
        case 1:
          
          if (this.myInstance=="") {
            this.$message({
              message: "请输入主机名称",
              type: "warning"
            });
            return;
          }
          if (this.distSize<20||this.distSize>500) {
            this.$message({
              message: "请输入正确的系统盘大小（20~500G）",
              type: "warning"
            });
            return;
          }
          this.currentStep++;
          this.getMoneyCount();
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
          let dTime = 0;
          let time=this.getDuration(this.purchaseTime);
          switch (this.purchaseTime) {
            case "1月":
              dTime = 1;
              break;
            case "3月":
              dTime = 3;
              break;
            case "6月":
              dTime = 6;
              break;
            case "1年":
              dTime = 12;
              break;
            case "3年":
              dTime = 36;
              break;
          }
          let orderDetails = [];
          this.companySoftWare.forEach(e => {
            this.companySoftWareList.forEach(m => {
              if (e == m.soft_name) {
                orderDetails.push({ itemName: e, itemId: m.id,itemType:5 ,totalPrice:m.price});
                return;
              }
            });
          });
          this.openSoftWare.forEach(e => {
            this.openSoftWareList.forEach(m => {
              if (e == m.soft_name) {
                orderDetails.push({ itemName: e, itemId: m.id,itemType:5 ,totalPrice:m.price});
                return;
              }
            });
          });
          this.selfSoftWare.forEach(e => {
            this.selfSoftWareList.forEach(m => {
              if (e == m.soft_name) {
                orderDetails.push({ itemName: e, itemId: m.id ,itemType:5,totalPrice:m.price});
                return;
              }
            });
          });
          this.otherSoftWare.forEach(e => {
            this.otherSoftWareList.forEach(m => {
              if (e == m.soft_name) {
                orderDetails.push({ itemName: e, itemId: m.id ,itemType:5,totalPrice:m.price,duration:this.getDuration(m.time),amount:m.count});
                return;
              }
            });
          });
          orderDetails.push({itemName: "SystemDisk",item_value:this.hardWareType,item_size:this.distSize,itemType:4,totalPrice: this.moneyDetail[1].costAfterDiscount,
            discount: this.moneyDetail[1].invoiceDiscount});
          orderDetails.push({
            itemName:"InternetMaxBandwidthOut",
            item_size:this.InternetMaxBandwidthOut,
            unitPrice:this.moneyDetail[2].unitPrice,
            totalPrice: this.moneyDetail[2].costAfterDiscount,
            discount: this.moneyDetail[2].invoiceDiscount,
            itemType:4
          });
          let params = {
            order: { price: this.allCount, isPaid: 0,duration:time,instanceName:this.myInstance,order_type:2},
            orderDetails: orderDetails
          };
          this.$ajaxs.createOrder(params).then(
            res => {
              if (res.statusCode == 0) {
                this.$message({
                  message: "生成订单成功",
                  type: "success"
                });
                this.orderId = res.data.id;
              } else {
                this.$message({
                  message: "生成订单失败,错误信息：" + res.message,
                  type: "error"
                });
              }
            },
            err => {
              //添加错误连接提示
              this.$message({
                message: "生成实例失败",
                type: "error"
              });
            }
          );
          this.getleftMoney();
          this.payVisible=true;
          // this.$router.push({
          //   path: "/generatehost"
          // });
      }
    }
  }
};
</script>

<style scoped>
hr {
  margin-top: 2rem;
  border: none;
  border-top: solid 1rem #f2f2f2;
  margin-bottom: 3rem;
}
.myCard {
  min-width: 200px;
  float: left;
  margin-left: 10px;
  margin-bottom: 10px;
}
.text {
  font-size: 14px;
}
.subTotalInfo {
  width: 100%;
  position: fixed;
  display: block;
  bottom: 0;
  background: #f7f8fa;
  border-top: 1px solid #ebecec;
  padding: 0;
  z-index: 9999;
  padding: 15px;
  margin-left: -2.5rem;
}
.actionArea {
  position: absolute;
  right: 50px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.netTip,
.basicConfig {
  font-size: 1.2rem;
}
.allCount {
  color: #f60;
  font-size: 2rem;
}
.licenseSpace {
  border-top: 1px solid #f2f2f2;
}
</style>

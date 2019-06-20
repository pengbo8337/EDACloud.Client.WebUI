<template>
  <div>
    <p class="title">
      <span class="left-content">
        <img class="titleIcon" src="../../common/images/consume.png" alt="NineCube">&nbsp;&nbsp;费用中心
      </span>
      <span class="right-content">
        <el-button type="warning" class="myBtn" @click="dialogVisible=true">账户充值</el-button>
      </span>
    </p>
    <el-alert
      style="margin-top:2rem;"
      v-show="reminder"
      title="您的余额不足罗，快来充值吧~~"
      type="error"
      show-icon
    ></el-alert>
    <div>
      <el-row class="tab_nav">
        <el-col
          class="tab"
          :span="2"
          :class="selectId==1?'tab_active':''"
          @click.native="toTab(1)"
        >账户预览</el-col>
        <el-col
          class="tab"
          :span="2"
          :class="selectId==2?'tab_active':''"
          @click.native="toTab(2)"
        >订单管理</el-col>
        <el-col
          class="tab"
          :span="2"
          :class="selectId==3?'tab_active':''"
          @click.native="toTab(3)"
        >我的卡券</el-col>
        <!-- <el-col
          class="tab"
          :span="2"
          :class="selectId==4?'tab_active':''"
          @click.native="toTab(4)"
        >发票申请</el-col> -->
      </el-row>
      <div v-if="selectId==1">
        <el-row class="cards">
          <el-col :span="7" class="margin_right">
            <el-card class="card" shadow="always">
              <h2 class="tipWord">余额</h2>
              <el-row class="cardInfo">
                <el-col :span="8">
                  <p>可用余额 <a class="refreshIcon" @click="refresh()">
          <i class="el-icon-refresh"></i>
        </a></p>
                  <h2>￥{{myMoney}}</h2>
                </el-col>
                <el-col :span="7">
                  <p>冻结押金
                    <el-tooltip placement="top">
                      <div slot="content">冻结金额表示：</div>
                      <el-button class="Tips">?</el-button>
                    </el-tooltip>
                  </p>
                  <h2>￥0.0</h2>
                </el-col>
                <el-col :span="5" class="rechargeBtn">
                  <el-button type="warning" class="myBtn" @click="recharge()">充值</el-button>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="8" class="margin_right">
            <el-card class="card" shadow="always">
              <h2 class="tipWord">消费</h2>
              <el-row class="cardInfo">
                <el-col :span="8">
                  <p>本月账单金额</p>
                  <h2>￥0.0</h2>
                </el-col>
                <el-col :span="7">
                  <p>累计消费金额</p>
                  <h2>￥0.0</h2>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="7">
            <el-card class="card" shadow="always">
              <h2 class="tipWord">代金券</h2>
              <el-row class="cardInfo">
                <el-col :span="8">
                  <p>现金券额度</p>
                  <h2>￥0.0</h2>
                </el-col>
                <el-col :span="8">
                  <p>优惠券数量</p>
                  <h2>{{ticketCount}}</h2>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <p class="partWord">充值记录</p>
        <div>
          <!-- <p class="title">
            <span class="left-content">
              <el-date-picker
                v-model="rechargeTime"
                type="date"
                placeholder="选择交易时间"
                class="searchItem"
              ></el-date-picker>
              <el-select v-model="rechargeType" placeholder="交易类型" class="searchItem">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </span>
            <span class="right-content">
              <el-input v-model="minMoney" placeholder="最小金额" type="number"></el-input>-
              <el-input class="margin_right_1" type="number" v-model="maxMoney" placeholder="最大金额"></el-input>
              <el-button type="warning" class="myBtn" @click="search()">
                <i class="el-icon-search"></i> 查询
              </el-button>
            </span>
          </p> -->
          <el-table
            class="myTable"
            :data="rechargeList"
            ref="multipleTable"
            height="320"
            :header-cell-style="this.$root.setHeaderStyle"
            :row-class-name="this.$root.tableRowClassName"
          >
            <el-table-column prop="rechargerecord.recharge_no" label="充值号" width="230" align="center"></el-table-column>
            <el-table-column prop="rechargerecord.eda_exchange" label="充值金额" align="center"></el-table-column>
            <el-table-column prop="rechargerecord.pay_type" label="充值类型" align="center"></el-table-column>
            <el-table-column prop="rechargerecord.recharge_time" label="充值时间" width="230" align="center"></el-table-column>
            <el-table-column prop="rechargerecord.is_invoiced" label="开票状态" align="center">
              <template slot-scope="scope">
              <el-tag
            :type="scope.row.rechargerecord.is_invoiced? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.rechargerecord.is_invoiced==1?"已开票":'未开票'}}</el-tag>
          </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-if="selectId==2" class="cards">
        <order-manage></order-manage>
      </div>
      <div v-if="selectId==3" class="cards">
        <ticket></ticket>
      </div>
      <div v-if="selectId==4" class="cards">
        <receipt></receipt>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" title="账户充值" width="800px">
      <span>
        <el-row class="tipWord">
          <el-col :span="3">账户余额：</el-col>
          <el-col :span="5">￥0.0</el-col>
        </el-row>
        <el-row class="tipWord selectType">
          <el-col :span="3">充值金额：</el-col>
          <el-col :span="4" class="myCenter">
            <el-input v-model="money" placeholder="金额" minlength="1" type="number" min="1"></el-input>
            <span class="margin_left_1">元</span>
          </el-col>
          <el-col :span="16">
            <el-button @click="toMoney(200)">200元</el-button>
            <el-button @click="toMoney(500)">500元</el-button>
            <el-button @click="toMoney(1000)">1000元</el-button>
            <el-button @click="toMoney(2000)">2000元</el-button>
            <el-button @click="toMoney(5000)">5000元</el-button>
          </el-col>
        </el-row>
        <el-row class="tab_nav selectType">
          <el-col
            class="tab"
            :span="4"
            :class="selectId2==1?'tab_active':''"
            @click.native="toTab2(1)"
          >在线支付</el-col>
          <!-- <el-col
            class="tab"
            :span="4"
            :class="selectId2==2?'tab_active':''"
            @click.native="toTab2(2)"
          >线下支付</el-col>-->
        </el-row>
        <el-row v-if="selectId2==1" class="selectType">
          <el-radio-group v-model.number="rechargeType2">
            <el-radio :label="1">
              <img class="titleIcon iconPosition" src="../../common/images/PAY-WEIXIN.png"> 微信支付
            </el-radio>
            <el-radio :label="2">
              <img class="titleIcon iconPosition" src="../../common/images/alipay.png"> 支付宝支付
            </el-radio>
          </el-radio-group>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmPay()">确认充值</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="payVisible" title="支付" width="700px">
      <span>
        <p class="payCount">支付金额:{{this.money}}</p>
        <div id="qrcode" ref="qrcode"></div>
        <p class="scannerTip">请扫描二维码付款</p>
      </span>
      <span slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="payVisible=false">取消</el-button>
        <el-button type="primary" @click="completePay()">支付完成</el-button>
      </span>
    </el-dialog>
    <el-dialog  :visible.sync="alipayVisible" title="支付宝支付" width="500px">
      <span>
        <p class="payCount">支付中</p>
      </span>
      <span slot="footer" class="dialog-footer" style="text-align:center">
        <el-button type="primary" @click="payVisible=false">取消</el-button>
        <el-button type="primary" @click="completePay()">支付完成</el-button>
      </span>
    </el-dialog>
    <div id="myAlipay"></div>
    
  </div>
</template>
<script>
import OrderManage from "components/consume/orderManage";
import Ticket from "components/consume/ticket";
import Receipt from "components/consume/receipt";
import { getLStorage } from "configs/config";
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      ticketCount:0,
      alipayVisible:false,
      myMoney:0.0,
      payVisible: false,
      reminder: false,
      rechargeType2: 1,
      rechargeType: "1",
      selectId2: 1,
      money: "",
      dialogVisible: false,
      selectId: 1,
      rechargeTime: "",
      typeOptions: [
        { label: "全部", value: "0" },
        { label: "支付宝", value: "1" },
         { label: "微信", value: "2" }
      ],
      rechargeType: "",
      minMoney: "",
      maxMoney: "",
      rechargeList: [],
      scannerUrl: "http://www.baidu.com",
      checkComplete: ""
    };
  },
  components: { OrderManage, Ticket, Receipt, QRCode },
  mounted() {
    this.moneyCheck();
    this.getRechargeList();
    this.getleftMoney();
    this.getTicket();
  },
  methods: {
    refresh(){
      this.getleftMoney();
    },
    getTicket(){
      this.$ajaxs.getCouponList([]).then(
        res => {
          if (res.statusCode == 0) {
            this.ticketCount=res.total;
          } else {
            this.$message({
              message: "请求优惠券数量失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        })
      },
    getleftMoney(){
      //getLeftMoney
      this.$ajaxs.getLeftMoney().then(
        res => {
          if (res.statusCode == 0) {
            //console.log(res.data.bal_eda);
            if(res.data){
              this.myMoney=res.data.bal_eda;
            }
            
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
    completePay() {
      this.alipayVisible=false;
      //checkIsCompelete
      this.$ajaxs.checkIsCompelete(this.checkComplete).then(
        res => {
          if (res.code == 1) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.payVisible = false;
            this.getleftMoney();
          } else {
            this.$message({
              message: res.msg,
              type: "warning"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    qrcode() {
      var element_div = document.getElementById("qrcode");
      if (element_div.innerHTML != "") {
        element_div.innerHTML = "";
      }
      let qrcode = new QRCode("qrcode", {
        width: 198, // 设置宽度
        height: 198, // 设置高度
        text: this.scannerUrl
      });
    },
    confirmPay() {
      if (this.money > 0) {
        // this.dialogVisible = false;
        let params = {
          productName: "充值",
          payWayCode: this.rechargeType2 == 1 ? "WEIXIN" : "ALIPAY",
          orderNo: "",
          orderPrice: this.money,
          userNo: getLStorage("user")
        };

        this.$ajaxs.confirmPay(params).then(
          res => {
            if (res.statusCode == 0) {
              // this.total = res.total;
              this.checkComplete =
                res.data.orderQueryUrl + "?orderNO=" + res.data.orderNO;
              if(this.rechargeType2 == 1 ){
                
              this.scannerUrl = res.data.codeUrl;
              this.dialogVisible = false;
              this.payVisible = true;

              this.$nextTick(function() {
                this.qrcode();
              });
              }else{
                this.dialogVisible = false;
                document.getElementById("myAlipay").innerHTM="";
                this.alipayVisible=true;
               // this.payVisible = true;
                this.$nextTick(function() {
                document.getElementById("myAlipay").innerHTML=res.data.codeUrl;
                document.getElementById("alipaysubmit").target = "_blank"
                document.forms['alipaysubmit'].submit();
                })
              }
              
            } else {
              this.$message({
                message: "充值失败,错误代码：" + res.statusCode,
                type: "error"
              });
            }
          },
          err => {
            //添加错误连接提示
          }
        );
      } else {
        this.$message({
          message: "请输入正确充值金额",
          type: "error"
        });
      }
    },
    moneyCheck() {
      //&&this.$store.state.isFirst==1
      if (this.$store.state.money == 0) {
        this.reminder = true;
        this.$store.state.isFirst = 0;
      }
    },
    getRechargeList(params = []) {
      //rechargeList
      if (params.length < 1) {
        params = { PageIndex: 1, PageSize: 10 };
        this.pagesize = 10;
        this.pageNo = 1;
      }
      this.$ajaxs.getRechargeList(params).then(
        res => {
          if (res.statusCode == 0) {
            this.rechargeList = res.data;
            // this.total = res.total;
          } else {
            this.$message({
              message: "请求实例列表失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    toMoney(val) {
      this.money = val;
    },
    toTab(id) {
      this.selectId = id;
    },
    toTab2(id) {
      this.selectId2 = id;
    },
    recharge() {
      this.dialogVisible = true;
    },
    search() {}
  }
};
</script>
<style scoped>
.tab_nav,
.cards,
.myTable {
  margin-top: 1rem;
}
.selectType {
  margin-top: 3rem;
}
.tab_nav {
  border-bottom: solid 1px #dddee1;
}
.tipWord {
  margin-bottom: 1rem;
}
.card {
  border-top: none;
}
.cardInfo {
  font-size: 1.3rem;
}
.cardInfo p {
  font-weight: bold;
}
.Tips {
  border: solid 1px #2d8cf0;
  color: #2d8cf0;
  font-size: 10px;
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  float: right;
  padding: 0px;
}
.rechargeBtn {
  float: right;
}
.rechargeBtn button {
  margin-left: 1rem;
  padding: 5px 8px;
  position: absolute;
  bottom: 0px;
}
.searchItem {
  width: 150px;
}
.searchItem:nth-child(2) {
  margin-left: 1rem;
}
.right-content {
  line-height: 3.5rem;
}
.aliyIcon {
  width: 110px;
  height: 43px;
}
.iconPosition {
  position: relative;
  top: 0.5rem;
}
#qrcode {
  display: flex;
  justify-content: center;
}
.payCount {
  text-align: center;
  color: rgb(255, 70, 127);
  font-size: 18px;
  margin-bottom: 20px;
}
.scannerTip {
  text-align: center;
  margin-top: 20px;
}
</style>



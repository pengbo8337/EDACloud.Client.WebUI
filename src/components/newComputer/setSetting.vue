<template>
  <div>
    <el-table
      class="myTable"
      :data="mirrorList"
      ref="singleTable"
      height="620"
      :header-cell-style="this.$root.setHeaderStyle"
      :row-class-name="this.$root.tableRowClassName"
      @selection-change="handleChange"
    >
      <!-- <el-table-column type="selection" width="55"></el-table-column> -->
      <el-table-column prop="package_code" label="套餐代码" width="85"></el-table-column>
      <el-table-column prop="package_name" label="套餐名称"></el-table-column>
      <el-table-column prop="package_describe" label="套餐描述" ></el-table-column>
      <!-- <el-table-column prop="image_id" label="镜像ID" ></el-table-column> -->
      <el-table-column prop="price" label="年费" ></el-table-column>
      <!-- <el-table-column prop="progress" label="生成进度" >
        <template slot-scope="scope">
          <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="parseInt(scope.row.progress.split('%')[0])"
          ></el-progress>
        </template>
      </el-table-column>-->
      <el-table-column fixed="right" label="操作"  width="100">
        <template slot-scope="scope">
          <el-button @click="createInstance(scope.row)" type="text" size="small">生成主机</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      class="myPagination"
      :current-page.sync="pageNo"
      @current-change="handleCurrentChange"
      :page-size="pagesize"
      :total="total*pagesize"
    ></el-pagination>
    <el-dialog :visible.sync="instanceVisible" title="生成主机" width="700px">
      <span>
        <!-- instanceListByPackage -->
        <el-row>
          <el-col :span="12">
            <p>
              <b>套餐名称：</b>
              {{setInfo.package_name}}
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>套现详情：</b>
              {{setInfo.package_describe}}
            </p>
          </el-col>
        </el-row>
        <el-row class="myTable"> 
          <el-col :span="12">
            <p>
              <b>年费:</b>
              {{setInfo.price}}
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>时长:</b>
              1年
            </p>
          </el-col>
        </el-row>
        <el-tabs type="border-card"  class="myTable" v-model="instanceNo">
           <el-tab-pane :label="'主机配置'+(index+1)" v-for="(item,index) in instanceListByPackage" :key="index" :name="'instance'+index">
             <el-row>
          <el-col :span="12">
            <p>
              <b>地域:</b>
              华北3
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>实例规格：</b>
              {{item.instance_desc}}
            </p>
          </el-col>
        </el-row>
        <el-row class="myTable"> 
          <el-col :span="12">
            <p>
              <b>系统盘类型:</b>
              {{item.systemdisk_type}}
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>系统盘大小：</b>
              {{item.systemdisk_size}}
            </p>
          </el-col>
        </el-row>
        <el-row class="myTable"> 
          <el-col :span="12">
            <p>
              <b>数据盘类型:</b>
              {{item.datadisk_type}}
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>数据盘大小：</b>
              {{item.datadisk_size}}
            </p>
          </el-col>
        </el-row>
        <el-row class="myTable"> 
          <el-col :span="12">
            <p>
              <b>CPU主频:</b>
              {{item.cpu_ghz}}
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>CPU核数：</b>
              {{item.vcpu}}
            </p>
          </el-col>
        </el-row>
        <el-row class="myTable"> 
          <el-col :span="12">
            <p>
              <b>主机台数:</b>
              {{item.instance_count}}
            </p>
          </el-col>
          <el-col :span="12">
            <p class="oneRow">
              <b>安全组ID:</b>
              {{item.security_group_id}}
            </p>
          </el-col>
        </el-row>
        <!-- <el-row class="myTable">
          <el-input placeholder="主机名称" v-model="instanceName">
            <template slot="prepend">主机名称</template>
          </el-input>
        </el-row> -->
           </el-tab-pane>
       </el-tabs>
        <!-- <el-row class="myTable">
          <el-col :span="12">
            <p>
              <b>地域:</b>
              华北3
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>实例规格：</b>
              {{setInfo.instance_desc}}
            </p>
          </el-col>
        </el-row>
        <el-row class="myTable"> 
          <el-col :span="12">
            <p>
              <b>系统盘类型:</b>
              {{setInfo.systemdisk_type}}
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>系统盘大小：</b>
              {{setInfo.systemdisk_size}}
            </p>
          </el-col>
        </el-row>
        <el-row class="myTable"> 
          <el-col :span="12">
            <p>
              <b>数据盘类型:</b>
              {{setInfo.datadisk_type}}
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>数据盘大小：</b>
              {{setInfo.datadisk_size}}
            </p>
          </el-col>
        </el-row>
        <el-row class="myTable"> 
          <el-col :span="12">
            <p>
              <b>CPU主频:</b>
              {{setInfo.cpu_ghz}}
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>CPU核数：</b>
              {{setInfo.vcpu}}
            </p>
          </el-col>
        </el-row>
        <el-row class="myTable"> 
          <el-col :span="12">
            <p>
              <b>年费:</b>
              {{setInfo.price}}
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>时长:</b>
              1年
            </p>
          </el-col>
        </el-row>
        <el-row class="myTable">
          <el-input placeholder="主机名称" v-model="instanceName">
            <template slot="prepend">主机名称</template>
          </el-input>
        </el-row> -->
      </span>
      <span slot="footer" class="dialog-footer myDialogFooter">
        <el-button type="primary" @click="addNewInstanceByPack()">确认订单</el-button>
        <el-button @click="instanceVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="instanceVisible2" title="生成主机" width="700px">
      <span>
        <el-row>
          <el-col :span="12">
            <p>
              <b>套餐名称：</b>
              {{selectRow.package_name}}
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>套现详情：</b>
              {{selectRow.package_describe}}
            </p>
          </el-col>
        </el-row>
        <div class="myTable">
          <p>
            <b>软件：</b>
            {{softNames}}
          </p>
        </div>
        <el-row class="myTable">
          <el-col :span="12">
            <p>
              <b>可用地域：</b>
              <el-select v-model="area" placeholder="请选择" style="width:15rem">
                <el-option
                  v-for="item in areasList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </el-col>
          <el-col :span="12">
            <p>
              <b>实例规格：</b>
              <el-select v-model="InstanceType" placeholder="请选择" style="width:15rem">
                <el-option
                  v-for="item in instanceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </p>
          </el-col>
        </el-row>
        <el-row class="myTable">
          <el-input placeholder="主机名称" v-model="instanceName">
            <template slot="prepend">主机名称</template>
          </el-input>
        </el-row>
        <el-row class="myTable">
          <el-col :span="24">
            <b>系统盘类型：</b>
            <el-radio-group v-model="hardWareType">
              <!-- <el-radio label="cloud">普通云盘</el-radio> -->
              <el-radio label="cloud_efficiency">高效云盘</el-radio>
              <el-radio label="cloud_ssd">SSD云盘</el-radio>
              <el-radio label="ephemeral_ssd">本地SSD云盘</el-radio>
            </el-radio-group>
          </el-col>
          <el-col class="myTable" :span="12">
            <el-input
              placeholder="20~500G"
              v-model.number="distSize"
              type="number"
              minlength="2"
              maxlength="3"
            >
              <template slot="prepend">系统盘大小</template>
            </el-input>
          </el-col>
        </el-row>
        <el-row class="myTable">
          <el-col :span="14">
            <b>公网出宽带（最大值）：</b>
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
        <el-row class="myTable">
          <b>购买时长:</b>
          <el-radio-group v-model="duration" type="number" @change="getMoney()">
            <el-radio-button label="1月"></el-radio-button>
            <el-radio-button label="3月"></el-radio-button>
            <el-radio-button label="6月"></el-radio-button>
            <el-radio-button label="1年"></el-radio-button>
            <el-radio-button label="3年"></el-radio-button>
          </el-radio-group>
        </el-row>
        <p class="myTable">
          <b>配置价格:</b>
          <span class="currentMoney">{{currentMoney}} {{moneyType}}</span>
          <span class="originMoney">{{originalMoney}} {{moneyType}}</span>
        </p>
      </span>
      <span slot="footer" class="dialog-footer myDialogFooter">
        <el-button type="primary" @click="addNewInstance()">确认订单</el-button>
        <el-button @click="instanceVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="payVisible" title="订单支付" center width="600px">
      <span>
        <p>
          <b>年费：</b>
          {{setInfo.price}}
        </p>
        <!-- <p>
          <b>总价（套餐+硬件）：</b>
          {{currentMoney}}
        </p> -->
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
      instanceNo:"instance0",
      instanceListByPackage:[],
      setInfo:[],
      instanceVisible2:false,
      InternetMaxBandwidthOut:1,
      orderId: 0,
      setPrice: 0,
      payVisible: false,
      moneyDetail: [],
      distSize: 20,
      hardWareType: "cloud_efficiency",
      InstanceType: "",
      instanceTypeOptions: [],
      selectRow: [],
      mirrorList: [],
      total: 1,
      pagesize: 1,
      pageNo: 1,
      instanceVisible: false,
      instanceName: "",
      softNames: "",
      areasList: [],
      area: "cn-zhangjiakou",
      originalMoney: 0,
      currentMoney: 0,
      moneyType: "(RMB)",
      duration: "1月",
      setId: 0,
      setName:"",
      myMoney:0,
      mytagData:[]
    };
  },
  mounted() {
    this.$store.state.menuId = 71;
    this.getData([]);
    this.getInstanceList();
    this.getImageId();
  },
  watch: {
    distSize(val) {
      let str = /\b\d{2,3}\b/g;
      if (str.test(val) && val >= 20 && val <= 500) {
        if (this.InstanceType) {
          this.getMoney();
        }else{
          this.$message({
          message: "请先选择实例规格",
          type: "warning"
        });
        }
      } else {
        this.$message({
          message: "系统盘大小只支持20~500G",
          type: "warning"
        });
        this.distSize = 20;
      }
    },
    area(val) {
      if (val != "") {
        this.getInstanceList();
        this.InstanceType = "";
      }
    },
    InstanceType(val) {
      if (val != "") {
        this.getMoney();
      }
    },
    duration(val) {
      if (this.InstanceType) {
        this.getMoney();
      }
    },
    hardWareType() {
      if (this.InstanceType) {
        this.getMoney();
      }
    }
  },
  methods: {
    getImageId(){
      //console.log(this.$route.query.imageId);
      let imageId=this.$route.query.imageId;
      if(imageId){
        //getSetDetailByImageId
        this.$ajaxs
        .getSetDetailByImageId({ imageId:imageId},this.orderId)
        .then(
          res => {
            if (res.statusCode == 0) {
              this.instanceVisible=true;
              this.createInstance(res.data.package);
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
      }
    },
    confirmPay() {
      //orderid: this.orderId,eda:this.currentMoney
      this.$ajaxs
        .confirmConsume({ orderid: this.orderId, eda: this.setInfo.price },this.orderId)
        .then(
          res => {
            if (res.statusCode == 0) {
              this.$message({
                message:"扣费成功",
                type: "success"
              });
              this.payVisible=false;
              //this.addTagInfo();
            } else {
              this.$message({
                message: res.message,
                type: "warning",
                duration:0,
                showClose: true
              });
              this.payVisible=false;
            }
          },
          err => {
            //添加错误连接提示
          }
        );
    },
    getMoneyCount() {},
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
    getMoney() {
      //getResourceMony
      this.$ajaxs
        .getResourceMony({
          RegionId: this.area,
          InstanceType: this.InstanceType,
          Duration: this.getDuration(this.duration),
          SystemDiskType: this.hardWareType,
          SystemDiskSize: this.distSize,
          InternetMaxBandwidthOut:this.InternetMaxBandwidthOut
        })
        .then(
          res => {
            if (res.statusCode == 0) {
              this.moneyDetail = res.data.moduleDetails;
              let origin =
                res.data.originalPrice == null
                  ? 0
                  : res.data.originalPrice + this.setPrice;
              this.originalMoney = origin;
              // let discount=res.data.DiscountPrice==null?0:res.data.DiscountPrice;
              this.currentMoney =
                res.data.tradePrice == null
                  ? 0
                  : res.data.tradePrice + this.setPrice;
              this.moneyType =
                res.data.currency == null
                  ? "(RMB)"
                  : "(" + res.data.currency + ")";
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
    getInstanceList() {
      //getInstanceType
      this.$ajaxs.getInstanceByAreaId({ RegionId: this.area,PageSize:100 }).then(
        res => {
          let list = res.data;
          this.instanceTypeOptions = [];
          list.forEach(e => {
            this.instanceTypeOptions.push({
              label:
                e.instanceDetail.instanceTypeId + "(" + e.instanceDesc + ")",
              value: e.instanceDetail.instanceTypeId
            });
          });
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
    addNewInstanceByPack(){
      // if (this.instanceName == "") {
      //   this.$message({
      //     message: "请输入主机名称",
      //     type: "warning"
      //   });
      //   return;
      // }

      //"instance_name": this.instanceName,
      let params={
  "package_id": this.setInfo.id,
  "duration": 1,
  "regionid": "cn-zhangjiakou"
};
//生成主机  createOrder
      this.$ajaxs.createInstanceByPackage(params).then(
        res => {
          if (res.statusCode == 0) {
            this.$message({
              message: "生成订单成功",
              type: "success"
            });
            this.instanceVisible = false;
            this.instanceName = "";
            this.payVisible = true;
            this.orderId = res.data.id;
            this.mytagData=res.data;
            this.getleftMoney();
          } else {
            //添加错误代码提示
            this.$message({
              message: "生成主机失败：" + res.message,
              type: "error"
            });
            this.instanceVisible = false;
            this.instanceName = "";
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    addNewInstance() {
      if (this.instanceName == "") {
        this.$message({
          message: "请输入主机名称",
          type: "warning"
        });
        return;
      }
      if (this.area == "" || this.InstanceType == "") {
        this.$message({
          message: "请选择完整的实例地域及规格",
          type: "warning"
        });
        return;
      }
      let time = this.getDuration(this.duration);
      let params = {
        order: {
          order_type: 3,
          price: this.currentMoney,
          duration: time,
          instanceName: this.instanceName,
          SystemDiskType: this.hardWareType,
          SystemDiskSize: this.distSize
        },
        orderDetails: [
          {
            itemId: this.setId,
            itemName: this.setName,
            duration: time,
            "region-id": this.area,
            region_id: this.area,
            totalPrice: this.setPrice,
            itemType:6
          },
          {
            itemName: "IntanceType",
            item_value: this.InstanceType,
            duration: time,
            region_id: this.area,
            unitPrice: this.moneyDetail[0].unitPrice,
            totalPrice: this.moneyDetail[0].costAfterDiscount,
            discount: this.moneyDetail[0].invoiceDiscount,
            itemType:4
          },
          {
            itemName: "SystemDisk",
            item_value: this.hardWareType,
            duration: time,
            region_id: this.area,
            unitPrice: this.moneyDetail[1].unitPrice,
            totalPrice: this.moneyDetail[1].costAfterDiscount,
            discount: this.moneyDetail[1].invoiceDiscount,
            item_size:this.distSize,
            itemType:4
          },{
            itemName:"InternetMaxBandwidthOut",
            item_size:this.InternetMaxBandwidthOut,
            duration:time,
            region_id:this.area,
            unitPrice:this.moneyDetail[2].unitPrice,
            totalPrice: this.moneyDetail[2].costAfterDiscount,
            discount: this.moneyDetail[2].invoiceDiscount,
            itemType:4
          }
        ]
      };
      //生成主机  createOrder
      this.$ajaxs.createOrder(params).then(
        res => {
          if (res.statusCode == 0) {
            this.$message({
              message: "生成订单成功",
              type: "success"
            });
            this.instanceVisible = false;
            this.instanceName = "";
            this.payVisible = true;
            this.orderId = res.data.id;
            this.mytagData=res.data;
            this.getleftMoney();
          } else {
            //添加错误代码提示
            this.$message({
              message: "生成主机失败：" + res.message,
              type: "error"
            });
            this.instanceVisible = false;
            this.instanceName = "";
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    addTagInfo(){
      let data=this.mytagData;
      //addTagInfo
      let params={
  "regionId": this.area,
  "resourceType": "instance",
 "resourceId": data.instanceId,
 //"resourceId":"i-2ze2iqgz8u2rukgx9cx4",
  "tags": {
    "Owner":data.company_id,
    "OrderId":data.id
  }
}
this.$ajaxs.addTagInfo(params).then(
        res => {
          if (res.statusCode == 0) {
            console.log(res);
          } else {
            //添加错误代码提示
            this.$message({
              message: "添加tag失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    handleCurrentChange() {},
    handleChange(val) {},
    getAreas() {
      this.$ajaxs.getAreas([]).then(
        res => {
          if (res.statusCode == 0) {
            let list = [];
            res.data.forEach(e => {
              list.push({ label: e.localName, value: e.regionId });
            });
            this.areasList = list;
            //  this.total = res.total;
          } else {
            //添加错误代码提示
            this.$message({
              message: "请求可用地域列表失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    createInstance(row) {
      this.instanceVisible = true;
      this.moneyType= "(RMB)";
      this.duration= "1月";
      this.currency=0;
      this.selectRow = row;
      this.setId = row.id;
      this.setPrice = row.price;
      this.getAreas();
      this.setName=row.package_name;
      this.setInfo=row;
      this.instanceNo="instance0";
      console.log(row);
      //获取套餐详情
      this.$ajaxs.getPackageDetail({ packageCode: row.package_code }).then(
        res => {
          if (res.statusCode == 0) {
            // let details = res.data.packageDetail;
            // this.softNames = "";
            // details.forEach(e => {
            //   this.softNames += e.soft_name + "/";
            // });
            this.instanceListByPackage=res.data.packageInstances;
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
    getData(params = []) {
      if (params.length < 1) {
        params = { PageIndex: 1, PageSize: 10 };
        this.pagesize = 10;
        this.pageNo = 1;
      }
      //getPackageList
      //getImaggeList
      this.$ajaxs.getPackageList(params).then(
        res => {
          if (res.statusCode == 0) {
            this.mirrorList = res.data;
            //  this.total = res.total;
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
    }
  }
};
</script>

<style scoped>
.originMoney {
  text-decoration: line-through;
  font-size: 10px;
}
.currentMoney {
  color: red;
}
.oneRow{
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>

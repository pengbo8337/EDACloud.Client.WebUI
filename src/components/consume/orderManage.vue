<template>
  <div>
    <el-row>
      <p class="title">
        <span class="left-content">
          <el-select v-model="rechargeType" placeholder="订单类型" class="searchItem">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-date-picker
            class="margin_left"
            v-model="rechargeTime"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
          ></el-date-picker>
        </span>
        <span class="right-content">
          <!-- <el-button type="warning" class="myBtn" @click="pay()">支付</el-button> -->
          <!-- <el-button type="warning" class="myBtn" @click="search()">删除</el-button> -->
        </span>
      </p>
    </el-row>
    <el-table
      class="myTable"
      :data="orderList"
      ref="multipleTable"
      height="550"
      :header-cell-style="this.$root.setHeaderStyle"
      :row-class-name="this.$root.tableRowClassName"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="isPaid" label="是否支付" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.isPaid==1? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.isPaid==1?"已付费":'未付费'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="company_id" label="公司ID" align="center"></el-table-column>
      <el-table-column prop="order_type" label="订单类型" align="center" :formatter="orderType"></el-table-column>
      <el-table-column prop="price" label="费用" align="center"></el-table-column>
      <el-table-column prop="units" label="费用单位" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.units==1? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.units==1?"人民币":'EDA币'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="start_date" label="有效期起" align="center"></el-table-column>
      <el-table-column prop="end_date" label="有效期止" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
          <el-button @click="pay(scope.row)" type="text" size="small">支付</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="交易明细" :visible.sync="DialogVisible" width="300">
      <span>
        <el-table
          class="myTable"
          :data="orderInfo.orderDetails"
          ref="multipleTable"
          height="300"
          :header-cell-style="this.$root.setHeaderStyle"
          :row-class-name="this.$root.tableRowClassName"
        >
          <el-table-column prop="itemType" label="费用类型" align="center" :formatter="feeType"></el-table-column>
          <el-table-column prop="itemName" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="amount" label="数量" align="center"></el-table-column>
          <el-table-column prop="duration" label="时长(月)" align="center"></el-table-column>
          <el-table-column prop="discount" label="折扣" align="center"></el-table-column>
          <el-table-column prop="unitPrice" label="单价" align="center"></el-table-column>
          <el-table-column prop="totalPrice" label="总价" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        </el-table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="DialogVisible = false">知道了</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderInfo: [],
      pagesize: 0,
      pageNo: 0,
      rechargeType: "",
      DialogVisible: false,
      orderList: [
        {
          detail: "云主机购买：华南一区",
          money: "￥180",
          date: "2018-04-16 14:38:27",
          endDate: "2018-05-16 14:38:27",
          status: "待付款",
          code: "fsdfsdfsdf"
        }
      ],
      typeOptions: [
        { label: "线上", value: "1" },
        { label: "线下", value: "2" }
      ],
      keyName: "",
      rechargeTime: "",
      dealList: [
        {
          mechine: "机器1",
          useTime: "2018-04-16 14:38:27",
          staticIP: "20.123.21.2",
          soft1: 2000,
          soft2: 5000,
          soft3: 300
        }
      ]
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    pay(row) {
      if(row.order_type==3){
        this.$ajaxs
        .confirmConsume({ orderid: row.id, eda: row.price },row.id)
        .then(
          res => {
            if (res.statusCode == 0) {
              this.$message({
                message:"扣费成功",
                type: "success"
              });
              this.payVisible=false;
              this.getData();
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
      }else{
        this.$ajaxs
        .confirmPayConfig([ {orderid: row.id, eda: row.price }],row.id)
        .then(
          res => {
            if (res.statusCode == 0) {
              this.$message({
                message:"扣费成功",
                type: "success"
              });
              this.payVisible=false;
              this.getData();
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
    handleDelete(row){
      this.$ajaxs.deleteOrders({orderId:row.id},row.id).then(
          res => {
            if (res.statusCode == 0) {
              // this.total = res.total;
              this.$message({
                message: "删除订单成功",
                type: "success"
              });
              this.getData();
            } else {
              this.$message({
                message: "删除失败,错误代码：" + res.statusCode,
                type: "error"
              });
            }
          },
          err => {
            //添加错误连接提示
          }
        );
    },
    feeType(row, column) {
      switch (row.itemType) {
        case 1:
          return "企业基础服务费";
          break;
        case 2:
          return "会员费";
        case 3:
          return "企业线下服务费";
        case 4:
          return "硬件费用";
          break;
        case 5:
          return "软件费用";
          break;
        case 6:
          return "套餐费用";
          break;
      }
    },
    orderType(row, column) {
      switch (row.order_type) {
        case 1:
          return "服务费";
          break;
        case 2:
          return "生成自定义主机费用";
          break;
        case 3:
          return "生成套餐主机费用";
          break;
      }
    },
    filterData(data) {
      var foo1 = data.filter(function(item) {
        return item.del_flag == 0;
      });
      return foo1;
    },
    getData(params = []) {
      if (params.length < 1) {
        params = { PageIndex: 1, PageSize: 10 };
        this.pagesize = 10;
        this.pageNo = 1;
      }
      this.$ajaxs.getOrderList(params).then(
        res => {
          this.imageName = "";
          if (res.statusCode == 0) {
            this.orderList = this.filterData(res.data);
          } else {
            //添加错误代码提示
            this.$message({
              message: "获取订单列表失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    handleDetail(row) {
      this.DialogVisible = true;
      this.$ajaxs.getOrderDetail({ orderid: row.id }).then(
        res => {
          if (res.statusCode == 0) {
            this.orderInfo = res.data;
          } else {
            //添加错误代码提示
            this.$message({
              message: "获取订单详情失败,错误代码：" + res.statusCode,
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
<style>
</style>

<template>
    <div>
        <el-row>
          <el-alert
    title="先使用充值EDA币,再使用赠送EDA券；EDA券不可变现金；解释权归湖北九同方科技有限公司"
    type="warning">
  </el-alert>
        <p class="title myTable">
            <span class="left-content">
                <!-- <el-select v-model="Type" placeholder="请选择类型" class="searchItem">
                    <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> -->
                <el-select v-model="status" class="margin_left" placeholder="请选择状态">
                    <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </span>
            <!-- <span class="right-content">
                <el-button type="warning" class="myBtn" @click="search()"> 查询</el-button>
            </span> -->
        </p>
    </el-row>
    <div>
        <el-table class="myTable" :data="ticketList" ref="multipleTable" height="550" :header-cell-style="this.$root.setHeaderStyle" :row-class-name="this.$root.tableRowClassName">
            <el-table-column
            prop="company_id"
            label="公司ID"
            align="center">
            </el-table-column>
            <el-table-column
            prop="user_id"
            label="用户ID"
            align="center">
            </el-table-column>
            <el-table-column
            prop="eda_coupon"
            label="eda券"
            align="center">
            </el-table-column>
            <el-table-column
            prop="record_type"
            label="券状态"
            align="center">
            <template slot-scope="scope">
          <el-tag
            :type="scope.row.record_type==1? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.record_type==1? '未使用' : '已使用'}}</el-tag>
        </template>
            </el-table-column>
            <el-table-column
            prop="create_time"
            label="送券时间"
            align="center">
            </el-table-column>
            <el-table-column
            prop="use_time"
            label="用券时间"
            align="center">
            </el-table-column>
            <el-table-column
            prop="description"
            label="描述"
            align="center">
            </el-table-column>
            <el-table-column
            prop="expired"
            label="过期时间"
            align="center">
            </el-table-column>
            <!-- <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleUse(scope.row)" type="text" size="small">立即使用</el-button>
          </template>
        </el-table-column> -->
    </el-table>
    </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        ticketList:[{type:"优惠券",money:"200元",company:"全区",date:"2018-04-16 14:38:27",describe:"新用户注册端",remark:"满500减100"}],
      Type: "",
      status: "",
      typeOptions: [
        { label: "满减券", value: "1" },
        { label: "折扣券", value: "2" }
      ],
      statusOptions: [
        { label: "未使用", value: "1" },
        { label: "已使用", value: "2" }
      ],
      
    };
  },
  mounted(){
    this.getData([]);
  },
  methods: {
      handleUse(row){},
      getData(params){
        //getCouponList
        if(params.length<1)
        {
          params = {PageIndex:1,PageSize:50};
        }
      this.$ajaxs.getCouponList(params).then(
        res => {
          if (res.statusCode == 0) {
            this.ticketList=res.data;
          } else {
            this.$message({
              message: "请求优惠券失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        })
      },
  }
};
</script>

<style>
</style>

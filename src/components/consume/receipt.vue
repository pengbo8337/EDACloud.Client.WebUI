<template>
    <div>
        <!-- <el-alert
            title="温馨提示:"
            type="warning"
            class="tips">
            <p class="margin_top">1、您选择的发票金额不能小于1000元，增值发票准票金额不能少于10000请累计之后一并申请</p>
            <p class="margin_top">2、发票寄出时间；每月20号统一寄出，15号之前申请的发票将在当月20号寄出，15号之后申请的发票将在次月20号寄出</p>
        </el-alert>
        <p class="partWord margin_top">实际可开金额发票：<span class="red">￥169.0</span></p>
        <el-row class="margin_top">
            <el-col :span="12">
                <el-form :model="receiptForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="开票金额" prop="money" required>
                        <el-input v-model="receiptForm.money"></el-input>
                    </el-form-item>
                    <el-form-item label="发票类型" prop="type">
                        <el-select v-model="receiptForm.type" placeholder="请选择发票类型">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发票抬头" prop="title" required>
                        <el-input v-model="receiptForm.title"></el-input>
                    </el-form-item>
                    <el-form-item label="纳税人识别码" prop="code" required>
                        <el-input v-model="receiptForm.code"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人" prop="man" required>
                        <el-input v-model="receiptForm.man"></el-input>
                    </el-form-item>
                    <el-form-item label="收件人地址" prop="address" required>
                        <el-input v-model="receiptForm.address"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="warning" class="myBtn right_span" @click="receiptTicket()"> 确认开票</el-button>
            </el-col>
        </el-row> -->
        <p class="partWord margin_top">
            发票申请
        </p>
        <el-row>
            <el-table class="myTable" :data="historyList" ref="multipleTable" height="550" :header-cell-style="this.$root.setHeaderStyle" :row-class-name="this.$root.tableRowClassName">
                <el-table-column
                prop="is_invoiced"
                label="发票状态"
                width="230"
                align="center">
                </el-table-column>
                <el-table-column
                prop="money"
                label="发票种类"
                align="center">
                </el-table-column>
                <el-table-column
                prop="company"
                label="发票抬头"
                align="center">
                </el-table-column>
                <el-table-column
                prop="date"
                label="发票申请时间"
                width="230"
                align="center">
                </el-table-column>
                <el-table-column
                prop="describe"
                label="发票金额"
                align="center">
                </el-table-column>
                <el-table-column
                prop="remark"
                label="物流信息"
                align="center">
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
export default {
  data() {
    return {
        historyList:[],
      receiptForm: {},
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted(){
      this.getData();
  },
  methods:{
      receiptTicket(){},
      getData(params=[]){
           if (params.length < 1) {
        params = { PageIndex: 1, PageSize: 10 };
        this.pagesize = 10;
        this.pageNo = 1;
      }
      this.$ajaxs.getRechargeList(params).then(
        res => {
          if (res.statusCode == 0) {
             this.historyList = res.data;
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
  }
};
</script>

<style scoped>
.tips {
  font-size: 1.2rem;
}
</style>

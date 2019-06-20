<template>
  <div class="mirrorList">
    <p class="title">
      <span class="left-content">
        <img class="titleIcon" src="../../common/images/list2.png" alt="NineCube">
        &nbsp;&nbsp;公司列表(共{{companyCount}}家)
      </span>
      <span class="right-content">
        <!-- <el-input class="margin_right_1" v-model="keyName" placeholder="请输入关键字"></el-input> -->
        <!-- <el-button type="warning" class="myBtn" @click="addCompany()">
          <i class="el-icon-edit"></i> 添加公司
        </el-button> -->
      </span>
    </p>
    <el-table
      class="myTable"
      :data="companyList"
      ref="multipleTable"
      height="620"
      :header-cell-style="this.$root.setHeaderStyle"
      :row-class-name="this.$root.tableRowClassName"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- <el-table-column label="序号" type="index" align="center"></el-table-column> -->
      <el-table-column prop="company_name" label="公司名称" align="center"></el-table-column>
      <el-table-column prop="users.name" label="管理员姓名" align="center"></el-table-column>
      <el-table-column prop="users.phone_num" label="电话" align="center"></el-table-column>
      <el-table-column prop="users.email" label="邮件" align="center"></el-table-column>
      <el-table-column prop="users.is_real_name" label="是否完成认证" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.users.is_real_name? '已认证' : '未认证'"
            disable-transitions
          >{{scope.row.users.is_real_name? '已认证' : '未认证'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <!-- <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="operateType+'公司信息'"
      :visible.sync="companyVisible"
      width="600px"
      :before-close="handleClose"
    >
      <span>
        <el-form
          :model="companyForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司名称" prop="company_name">
                <el-input v-model="companyForm.company_name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司简称" prop="company_short_name">
                <el-input v-model="companyForm.company_short_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工程师人数" prop="engineer_count">
                <el-input v-model.number="companyForm.engineer_count" type="number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="实际人数" prop="real_engineer_count">
                <el-input v-model.number="companyForm.real_engineer_count" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司规模" prop="company_size">
                <el-input v-model.number="companyForm.company_size" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="companyVisible = false">取 消</el-button>
        <el-button type="primary" @click="operateCompany()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading:false,
      pagesize: 0,
      pageNo: 0,
      keyName: "",
      companyCount: 100,
      companyList: [],
      companyVisible: false,
      operateType: "添加",
      rules: {
        company_name: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 1, max: 36, message: "长度在 1 到 36 个字符", trigger: "blur" }
        ],
        company_short_name: [
          { required: true, message: "请输入公司简称", trigger: "blur" },
          { min: 1, max: 18, message: "长度在 1 到 18 个字符", trigger: "blur" }
        ],
        engineer_count: [
          { required: true, message: "不能为空" },
          { type: "number", message: "人数必须为数字值" }
        ],
        real_engineer_count: [
          { required: true, message: "不能为空" },
          { type: "number", message: "人数必须为数字值" }
        ],
        company_size: [{ type: "number", message: "规模必须为数字值" }]
      },
      companyForm: {
        company_name: "",
        engineer_count: 0,
        company_short_name: "",
        real_engineer_count: 0,
        company_size: 50,
        status:1
      }
    };
  },
  mounted() {
    this.getData([]);
  },
  methods: {
    addCompany() {
      this.companyVisible = true;
      this.operateType = "新增";
    },
    operateCompany() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.operateType == "新增") {
            this.$ajaxs.addCompany(this.companyForm).then(
              res => {
                if (res.statusCode == 0) {
                  this.$message({
                    message: "添加公司成功",
                    type: "success"
                  });
                  this.companyForm = {
                    company_name: "",
                    engineer_count: 0,
                    company_short_name: "",
                    real_engineer_count: 0,
                    company_size: 50,status:1
                  };
                  this.getData();
                  this.companyVisible = false;
                } else {
                  this.$message({
                    message: "添加公司失败,错误代码：" + res.message,
                    type: "error"
                  });
                }
              },
              err => {
                //添加错误连接提示
              }
            );
          } else {
            this.$ajaxs.updateCompany(this.companyForm).then(
              res => {
                if (res.statusCode == 0) {
                  this.$message({
                    message: "更新公司成功",
                    type: "success"
                  });
                  this.companyForm = {
                    company_name: "",
                    engineer_count: 0,
                    company_short_name: "",
                    real_engineer_count: 0,
                    company_size: 50,status:1
                  };
                  this.getData();
                  this.companyVisible = false;
                } else {
                  this.$message({
                    message: "更新公司失败,错误代码：" + res.message,
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
      });
    },
    handleClose() {},
    handleEdit(row) {
      console.log(row);
      this.operateType = "修改";
      this.companyVisible = true;
      this.companyForm.company_name = row.company_name;
      this.companyForm.engineer_count = row.engineer_count;
      this.companyForm.company_short_name = row.company_short_name;
      this.companyForm.real_engineer_count = row.real_engineer_count;
      this.companyForm.company_size = parseInt(row.company_size);
      this.companyForm.id=row.id;
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$ajaxs.deleteCompany(row.id).then(
          res => {
            if (res.statusCode == 0) {
              this.$message({
                message: "删除公司成功",
                type: "success"
              });
              this.getData();
            } else {
              this.$message({
                message: "删除公司失败,错误代码：" + res.message,
                type: "error"
              });
            }
          },
          err => {
            //添加错误连接提示
          }
        );
      });
    },
    filteValidrData(data, id) {
      var foo1 = data.filter(function(item) {
        return item.status == id;
      });
      return foo1;
    },
    getData(params = []) {
      this.loading=true;
      if (params.length < 1) {
        params = { PageIndex:1, PageSize: 10 };
        this.pagesize = 10;
        this.pageNo = 1;
      }
      this.$ajaxs.getMyCompany([]).then( 
        res => {
          this.loading=false;
          if (res.statusCode == 0) {
            //let list= this.filteValidrData(res.data,1);
            let list=[];
            list.push(res.data.company);
            list[0].users=res.data.admin;
            this.companyList =list;
            this.companyCount =list.length; 
            console.log(list);
            // this.companyList=res.data;
            // this.companyCount =res.data.company.count;
          } else {
            this.$message({
              message: "获取公司失败",
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

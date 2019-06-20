<template>
  <div class="mirrorList">
    <p class="title">
      <span class="left-content">
        <img class="titleIcon" src="../../common/images/list2.png" alt="NineCube">
        &nbsp;&nbsp;用户列表(共{{userCount}}人)
      </span>
      <span class="right-content">
        <el-input class="margin_right_1" v-model="keyName" placeholder="请输入关键字"></el-input>
        <el-button type="warning" class="myBtn" @click="addUser()">
          <i class="el-icon-plus"></i> 添加用户
        </el-button>
        <!-- <el-button type="warning" class="myBtn" @click="DialogVisible=true">
          <i class="el-icon-delete"></i> 删除用户
        </el-button>-->
      </span>
    </p>
    <el-table
      class="myTable"
      :data="userList"
      ref="multipleTable"
      height="620"
      :header-cell-style="this.$root.setHeaderStyle"
      :row-class-name="this.$root.tableRowClassName"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" type="index" align="center"></el-table-column>
      <el-table-column prop="user.user_no" label="用户" align="center"></el-table-column>
      <el-table-column prop="user.phone_num" label="手机号" align="center"></el-table-column>
      <el-table-column prop="user.sex" label="性别" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.user.sex==1? '男' : '女'"
            disable-transitions
          >{{scope.row.user.sex==1? '男' : '女'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="user.user_type" label="类型" align="center" :formatter="userTypeFormatter">
      </el-table-column>
      <el-table-column prop="user.age" label="年龄" align="center"></el-table-column>
      <el-table-column prop="user.certificate_num" label="身份证" align="center"></el-table-column>
      <el-table-column prop="company.company_name" label="公司名" align="center"></el-table-column>
      <el-table-column prop="company.company_short_name" label="公司简称" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button  type="text" @click="handleSend(scope.row)">发送账户密码</el-button>
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
          <!-- <el-button @click="handleRight(scope.row)" type="text" size="small">权限</el-button> -->
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
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
    <el-dialog :title="userType+'用户信息'" :visible.sync="DialogVisible" width="300">
      <div class="dialogBtn">
        <el-button class="myBtn" type="primary" @click="submit('userForm')">
          <i class="el-icon-download"></i> 保存
        </el-button>
      </div>
      <span>
        <el-form :model="form" :rules="userRules" label-width="100px" ref="userForm">
          <el-row>
            <el-form-item label="用户类型" prop="user_type" required>
            <el-radio-group v-model="form.user_type">
              <el-radio-button label="管理员" v-if="userTypes==1"></el-radio-button>
              <el-radio-button label="工程师"></el-radio-button>
              <el-radio-button label="个人用户"></el-radio-button>
              <el-radio-button label="教师"></el-radio-button><el-radio-button label="学生"></el-radio-button>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名称" prop="name" required>
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="登录密码" prop="password" required>
                <el-input v-model="form.password" type="password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="confirmPWD">
                <el-input v-model="confirmPWD" type="password"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone_num" required>
                <el-input v-model="form.phone_num"></el-input>
              </el-form-item>
              <el-form-item label="微信号" prop="weChat">
                <el-input v-model="form.weChat"></el-input>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input v-model="form.remark" type="textarea"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" class="margin_left">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                multiple
                :limit="1"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-change="handleExceed"
              >
                <i class="el-icon-plus"></i>
                <p class="uploadPics">上传照片</p>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
            </el-col>
          </el-row>
        </el-form>
      </span>
    </el-dialog>
    <el-dialog title="权限分配" :visible.sync="RightVisible" width="800px">
      <span>
        <el-tree
          :data="rightData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :check-strictly="treeStrict"
          :props="defaultProps"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>
              <i :class="node.icon"></i>
              {{ node.label }}
            </span>
          </span>
        </el-tree>
      </span>
    </el-dialog>
    <el-dialog width="30%" title="获取密码" :visible.sync="innerVisible" append-to-body>
        <el-row>
          <el-input placeholder="请输入验证码" v-model="code">
            <template slot="append" class="getCode">
              <a id="getCode" @click="getCode()">获取验证码</a>
            </template>
          </el-input>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
import md5 from "js-md5";
import { getUserType,getLStorage,getUserTypeNumber} from 'configs/config'
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (this.confirmPWD === "") {
        callback(new Error("请再次输入密码"));
      } else if (this.confirmPWD !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      userTypes:getLStorage("userType"),
      selectId: 0,
      userRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: 'change'}],
        confirmPWD: [{ validator: validatePass2, trigger: "blur" }],
        user_type:[{ required: true, message: "请选择用户角色", trigger: "blur" }]
      },
      confirmPWD: "",
      treeStrict: false,
      defaultProps: {
        children: "children",
        label: "label",
        icon: "icon"
      },
      rightData: [],
      code: "",
      innerVisible: false,
      dialogImageUrl: "",
      dialogVisible: false,
      userType: "添加",
      RightVisible: false,
      form: {
        name: "",
        password: "",
        phone_num: "",
        weChat: "",
        //  applyDate: "",
        remark: "",
        photo_url: "",
        user_type:""
      },
      DialogVisible: false,
      userCount: 0,
      userList: [],
      keyName: "",
      total: 1,
      pagesize: 1,
      pageNo: 1
    };
  },
  watch: {
    keyName(newName) {
      if (newName != "") {
        var list = this.userList.filter(function(e) {
          // console.log(e.name);
          return e.name.indexOf(newName) >= 0;
        });
        this.userList = list;
      } else {
        this.getData([]);
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    //用户类型
    userTypeFormatter(row, column) {
        return getUserType(row.user.user_type);
      },
    handleSend(row){
      this.innerVisible=true;
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.userType == "添加") {
            let newUser = this.form;
            newUser.password = md5(this.form.password);
            newUser.user_type=getUserTypeNumber(this.form.user_type);
            this.$ajaxs.addUser(newUser).then(
              res => {
                if (res.statusCode == 0) {
                  this.getData([]);
                  this.$message({
                    message: "创建用户成功",
                    type: "success"
                  });
                  this.DialogVisible = false;
                } else {
                  //添加错误代码提示
                  this.$message({
                    message: "创建用户失败"+res.message+",错误代码：" + res.statusCode,
                    type: "error"
                  });
                }
              },
              err => {
                this.$message({
                  message: "生成用户失败,连接错误",
                  type: "error"
                });
              }
            );
          } else {
            let params = this.form;
            params["id"] = this.selectId;
            let newUser = this.form;
            newUser.password = md5(this.form.password);
            newUser.user_type=getUserTypeNumber(this.form.user_type);
            this.$ajaxs.modifyUser(newUser).then(
              res => {
                if (res.statusCode == 0) {
                  this.getData([]);
                  this.$message({
                    message: "修改用户成功",
                    type: "success"
                  });
                  this.DialogVisible = false;
                } else {
                  //添加错误代码提示
                  this.$message({
                    message: "修改用户失败,错误代码：" + res.statusCode,
                    type: "error"
                  });
                }
              },
              err => {
                this.$message({
                  message: "修改用户失败,连接错误",
                  type: "error"
                });
              }
            );
          }
        }
      });
    },
    getData(params = []) {
      if (params.length < 1) {
        params = { PageIndex: 1, PageSize: 10 };
        this.pagesize = 10;
        this.pageNo = 1;
      }
      this.$ajaxs.getUserList(params).then(
        res => {
          if (res.statusCode == 0) {
            this.userList = res.data;
            this.userCount=res.data.length;
          } else {
            this.$message({
              message: "获取用户列表失败",
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    addUser() {
      this.DialogVisible = true;
      this.userType="添加";
      this.form = {
        uName: "",
        password: "",
        phone_num: "",
        weChat: "",
        //   applyDate: "",
        remark: "",
        idScanPath: ""
      };
      if (this.$refs["form"]) {
        this.$refs["form"].resetFields();
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleCheckedChange() {},
    handleCheckAllChange() {},
    handleCurrentChange(currentPage) {},
    handleEdit(row) {
      console.log(row);
      this.DialogVisible = true;
      this.userType = "编辑";
      this.form.name = row.user.name;
      //this.form.password = row.user.password;
      this.form.phone_num = row.user.phone_num;
      this.form.weChat = row.user.weChat;
      this.form.remark = row.user.remark;
      this.selectId = row.user.id;
      this.form.user_type=getUserType(row.user.user_type);
    },
    handleDelete(row) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = { id: row.id };
        this.$ajaxs.deleteUser(params).then(
          res => {
            this.imageName = "";
            if (res.statusCode == 0) {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getData();
            } else {
              //添加错误代码提示
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
      });
    },
    handleRight(row) {
      this.RightVisible = true;
    },
    exportImage() {},
    getCode() {
      this.$message({
        message: "短信网关未付费",
        type: "warning"
      });
    },
    handleExceed(files) {
      let formdata = new FormData();

      formdata.append("file", files.raw);
      // formdata.append("imageName", this.imageName);
      // formdata.append("bucketName", "eda-bucket-image");
      this.$ajaxs.uploadHeadImg(formdata, "Crystal").then(
        res => {
          ////API_URL+"imagename="
          this.imageName = "";
          if (res.statusCode == 0) {
            this.$message({
              message: res.message,
              type: "success"
            });
          } else {
            //添加错误代码提示
            this.$message({
              message: "上传头像失败,错误代码：" + res.statusCode,
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
.myTable {
  overflow-x: hidden;
}
.uploadPics {
  position: absolute;
  top: 0px;
  margin-left: 45px;
  margin-top: 40px;
}
.dialogBtn {
  position: absolute;
  top: 10px;
  right: 60px;
}
.getCode,
#getCode {
  cursor: pointer;
}
</style>



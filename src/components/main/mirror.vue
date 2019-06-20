<template>
  <div class="mirrorList">
    <p class="title">
      <span class="left-content">
        <img class="titleIcon" src="../../common/images/list2.png" alt="NineCube">
        &nbsp;&nbsp;镜像列表(共{{mirrorCount}}个)
        <a class="refreshIcon" @click="refresh()">
          <i class="el-icon-refresh"></i>
        </a>
      </span>
      <span class="right-content">
        <el-input class="margin_right_1" v-model="keyName" placeholder="请输入关键字"></el-input>
        <el-button type="warning" class="myBtn" @click="addImage()" v-if="selectId==2">
          <i class="el-icon-plus"></i> 添加镜像
        </el-button>
        <el-button type="warning" class="myBtn" @click="uploadImage()" v-if="selectId==2">
          <i class="el-icon-upload2"></i> 上传镜像
        </el-button>
        <!-- <el-button type="warning" class="myBtn" @click="deleteImage()" v-if="selectId==2">
          <i class="el-icon-download"></i> 删除镜像
        </el-button>-->
      </span>
    </p>
    <el-row class="tab_nav">
      <el-col
        class="tab"
        :span="2"
        :class="selectId==1?'tab_active':''"
        @click.native="toTab(1)"
      >套餐镜像</el-col>
      <el-col
        class="tab"
        :span="2"
        :class="selectId==2?'tab_active':''"
        @click.native="toTab(2)"
      >私有镜像</el-col>
    </el-row>
    <el-table
      class="myTable"
      :data="mirrorList"
      ref="singleTable"
      height="550"
      :header-cell-style="this.$root.setHeaderStyle"
      :row-class-name="this.$root.tableRowClassName"
      @selection-change="handleChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55" v-if="selectId==2"></el-table-column>
      <el-table-column label="序号" type="index" align="center"></el-table-column>
      <el-table-column prop="imageOwnerAlias" label="镜像类型" align="center">
        <template slot-scope="scope">
          <el-tag
            v-if="selectId==1"
            :type="scope.row.isPaid==1? 'success' : 'danger'"
            disable-transitions
          >{{scope.row.isPaid==1?"已购买":'未购买'}}</el-tag>
          <el-tag v-if="selectId==2">自定义</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="imageName" label="镜像名称" width="350" align="center"></el-table-column>
      <el-table-column prop="description" label="镜像描述" width="160" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.description"
            placement="right-start"
          >
            <a>{{scope.row.description}}</a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="platform" label="镜像平台" align="center" width="100"></el-table-column>
      <el-table-column prop="status" label="镜像状态" align="center"></el-table-column>
      <el-table-column prop="size" label="镜像大小" align="center">
        <template slot-scope="scope">{{scope.row.size}} G</template>
      </el-table-column>
      <el-table-column prop="progress" label="生成进度" align="center">
        <template slot-scope="scope">
          <el-progress
            :text-inside="true"
            :stroke-width="18"
            :percentage="parseInt(scope.row.progress.split('%')[0])"
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column prop="created" label="创建时间" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button @click="handleCreate(scope.row)" type="text" size="small">生成主机</el-button>
          <el-button
            @click="handleDelete(scope.row)"
            type="text"
            size="small"
            v-if="selectId==2"
          >删除镜像</el-button>
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
    <el-dialog title="添加镜像" :visible.sync="DialogVisible" width="300">
      <span>
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-row>
            <el-col :span="11" class="margin_right_1">
              <el-form-item label="主机" prop="instanceId">
                <el-select v-model="form.instanceId" placeholder="请选择">
                  <el-option
                    v-for="item in InstanceOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" class="margin_right_1">
              <router-link to="/generatehost">
                <i class="el-icon-plus redIcon">购买主机</i>
              </router-link>
            </el-col>
          </el-row>
          <el-row class="margin_top">
            <el-col :span="11" class="margin_right_1">
              <el-form-item label="镜像名称" prop="imageName">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入镜像的名称"
                  v-model="form.imageName"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" class="margin_right_1">
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入备注"
                  v-model="form.description"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer myDialogFooter">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addNewImage('form')">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="更新镜像信息" :visible.sync="updateVisible"></el-dialog>
    <el-dialog title="上传镜像" :visible.sync="uploadImageVisible">
      <div>
        <el-input placeholder="注:上传镜像的格式仅限于raw、vhd、qcow2" v-model="imageName">
          <template slot="prepend">镜像名称</template>
        </el-input>
        <el-upload
          class="upload-demo myTable"
          action="https://jsonplaceholder.typicode.com/posts/"
          :before-upload="beforeAvatarUpload"
          :limit="1"
          :on-change="handleExceed"
          v-if="imageName!=''"
        >
          <el-button size="small" type="primary">上传镜像</el-button>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading:false,
      selectId: 1,
      imageName: "",
      uploadImageVisible: false,
      selectImageId: 0,
      updateVisible: false,
      InstanceOptions: [],
      form: {
        imageName: "",
        description: "",
        instanceId: "",
        regionId: "cn-shenzhen"
      },
      DialogVisible: false,
      mirrorCount: 0,
      mirrorList: [],
      keyName: "",
      total: 1,
      pagesize: 1,
      pageNo: 1,
      timer:null,
      rules: {
        instanceId: [
          {
            required: true,
            message: "请选择主机，若没有请购买",
            trigger: "change"
          }
        ],
        imageName: [
          { required: true, message: "请先输入镜像名称", trigger: "blur" },
          { min: 2, max: 16, message: "长度在 2 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    keyName(newName) {
      if (newName != "") {
        var list = this.mirrorList.filter(function(e) {
          console.log(e.imageName);
          return e.imageName.indexOf(newName) >= 0;
        });
        this.mirrorList = list;
      } else {
        this.getData([]);
      }
    },
    selectId(val) {
      this.getData([]);
    }
  },
  mounted() {
    this.getData([]);
    this.setTimer();
  },
  destroyed(){
    clearInterval(this.timer);
  },
  methods: {
    setTimer() {
      let that=this;
      this.timer = setInterval(() => {
        that.getData();
      }, 10000);
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "raw" || file.type === "vhd" || file.type === "qcow2";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message({
          message: "上传镜像的格式仅限于raw、vhd、qcow2!",
          type: "error"
        });
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return isJPG;
    },
    toTab(id) {
      this.selectId = id;
    },
    uploadImage() {
      this.uploadImageVisible = true;
    },
    handleChange(val) {
      if (val.length > 0) {
        if (val.length == 2) {
          let row = val[1];
          this.$refs.singleTable.clearSelection();
          this.$refs.singleTable.toggleRowSelection(row);
        }
        this.selectImageId = val[0].imageId;
      } else {
        this.selectImageId == 0;
      }
    },
    downloadImage() {
      if (this.selectImageId == 0) {
        this.$message({
          message: "请先选择镜像",
          type: "warning"
        });
        return;
      }
      //this.selectImageId downloadImage
      let params = {
        imageId: this.selectImageId,
        ossBucket: "eda-bucket-image"
      };
      this.$ajaxs.downloadImage(params).then(
        res => {
          if (res.status == 0) {
          } else {
            this.$message({
              message: "导出镜像失败,错误代码：" + res.message,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    refresh() {
      this.getData([]);
    },
    getInstanceList() {
      let params = { PageIndex: 1, PageSize: 10 };
      this.$ajaxs.getServicesList(params).then(
        res => {
          if (res.statusCode == 0) { 
            let list = res.data;
            this.InstanceOptions = [];
            list.forEach(e => {
              this.InstanceOptions.push({
                label: e.instance.instanceName,
                value: e.instance.instanceId
              });
            });
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
    addImage() {
      this.form = {
        imageName: "",
        description: "",
        instanceId: "",
        regionId: "cn-shenzhen"
      };
      this.DialogVisible = true;
      this.getInstanceList();
      if (this.$refs["form"]) {
        this.$refs["form"].resetFields();
      }
    },
    addNewImage(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //addNewImage
          this.$ajaxs.addNewImage(this.form).then(
            res => {
              if (res.statusCode == 0) {
                this.getData([]);
                this.$message({
                  message: "生成镜像成功",
                  type: "success"
                });
              } else {
                //添加错误代码提示
                this.$message({
                  message: "生成镜像失败,错误代码：" + res.statusCode,
                  type: "error"
                });
              }
            },
            err => {
              //添加错误连接提示
              this.$message({
                message: "生成镜像失败,连接错误",
                type: "error"
              });
            }
          );
          this.DialogVisible = false;
        } else {
          return false;
        }
      });
    },
    handleDelete(row) {
      //DeleteImage
      //let params=[];
      let params = { ImageId: row.imageId };
      // let params=row.imageId;
      // params.push(row.imageId);
      this.$ajaxs.DeleteImage(params).then(
        res => {
          if (res.statusCode == 0) {
            this.getData([]);
            this.$message({
              message: "删除镜像成功",
              type: "success"
            });
          } else {
            //添加错误代码提示
            this.$message({
              message: "删除镜像失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    handleCheckedChange() {},
    handleCheckAllChange() {},
    handleCurrentChange(currentPage) {
      let params;
      params = { PageIndex: currentPage, PageSize: 10 };
      this.pagesize = 10;
      this.pageNo = currentPage;
      this.getData(params);
    },
    getData(params = []) {
      this.loading=true;
      if (params.length < 1) {
        params = { PageIndex: 1, PageSize: 10 };
        this.pagesize = 10;
        this.pageNo = 1;
      }
      if (this.selectId == 1) {
        params["ImageOwnerAlias"] = "system";
      } else {
        params["ImageOwnerAlias"] = "self";
      }
      this.$ajaxs.getImaggeList(params).then(
        res => {
          this.loading=false;
          if (res.statusCode == 0) {
            this.mirrorList = res.data;
            this.mirrorCount=res.data.length;
            this.total = res.total;
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files) {
      // this.$message.warning(
      //   `当前限制选择 3 个文件，本次选择了 ${
      //     files.length
      //   } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      // );
      let formdata = new FormData();

      formdata.append("file", files.raw);
      // formdata.append("imageName", this.imageName);
      // formdata.append("bucketName", "eda-bucket-image");
      this.$ajaxs
        .uploadImage(formdata, this.imageName, "eda-bucket-image")
        .then(
          res => {
            this.imageName = "";
            if (res.statusCode == 0) {
              this.getData([]);
              this.uploadImageVisible = false;
              this.$message({
                message: res.message,
                type: "success"
              });
            } else {
              //添加错误代码提示
              this.$message({
                message: "导入镜像失败,错误代码：" + res.statusCode,
                type: "error"
              });
            }
          },
          err => {
            //添加错误连接提示
          }
        );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleCreate(row) {
      if (this.selectId == 1) {
        this.$router.push({
          path: "/setSetting"
        });
      } else {
        this.$router.push({
          path: "/machineConfig"
        });
      }
    },
    deleteImage() {}
  }
};
</script>
<style scoped>
.myTable {
  overflow-x: hidden;
}
.refreshIcon {
  margin-left: 1rem;
  cursor: pointer;
}
.tab_nav {
  border-bottom: solid 1px #dddee1;
}
.tab {
  display: flex;
  justify-content: center;
  font-size: 13px;
  margin: 0;
  margin-right: 4px;
  height: 31px;
  padding: 5px 16px 4px;
  border: 1px solid #dddee1;
  border-bottom: 0;
  border-radius: 4px 4px 0 0;
  transition: all 0.3s ease-in-out;
  background: #f8f8f9;
  cursor: pointer;
}
.tab_active {
  height: 32px;
  padding-bottom: 5px;
  background: #fff;
  transform: translateZ(0);
  border-color: #dddee1;
  color: #2d8cf0;
}
.tab_active {
  height: 32px;
  padding-bottom: 5px;
  background: #fff;
  transform: translateZ(0);
  border-color: #dddee1;
  color: #2d8cf0;
}
.tab_nav {
  margin-top: 20px;
}
</style>



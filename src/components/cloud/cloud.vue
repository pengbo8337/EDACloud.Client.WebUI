<template>
  <div>
    <p class="title">
      <span class="left-content">
        <img class="titleIcon" src="../../common/images/machine.png" alt="NineCube">
        &nbsp;&nbsp;混合云服务器列表(共{{servicesCount}}个)
      </span>
      <span class="right-content">
        <el-input class="margin_right_1" v-model="keyName" placeholder="请输入关键字"></el-input>
        <el-button type="warning" class="myBtn" @click="DialogVisible=true">
          <i class="el-icon-plus"></i> 添加服务器
        </el-button>
      </span>
    </p>
    <el-table
      class="myTable"
      :data="servicesList"
      ref="multipleTable"
      height="620"
      :header-cell-style="this.$root.setHeaderStyle"
      :row-class-name="this.$root.tableRowClassName"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="name" label="用户名称" align="center"></el-table-column>
      <el-table-column prop="describ" label="状态" align="center"></el-table-column>
      <el-table-column prop="plate" label="地域节点" align="center"></el-table-column>
      <el-table-column prop="state" label="主机配置" align="center" width="250"></el-table-column>
      <el-table-column prop="size" label="镜像系统" align="center"></el-table-column>
      <el-table-column prop="createTime" label="IP地址" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间/到期时间" align="center"></el-table-column>
      <el-table-column prop="createTime" label="计费类型" align="center"></el-table-column>
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
    <el-dialog title="添加混合云服务器" :visible.sync="DialogVisible" width="300">
      <span>
        <el-form :model="form">
          <el-row>
            <el-col :span="9" class="margin_right_2">
              <el-form-item label="服务器类型" prop="servicesType" required>
                <el-select v-model="form.servicesType" placeholder="请选择服务器类型">
                  <el-option
                    v-for="item in servicesTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9" class="margin_right_2">
              <el-form-item label="镜像类型" prop="mirrorType" required>
                <el-select v-model="form.mirrorType" placeholder="请选择服务器类型">
                  <el-option
                    v-for="item in mirrorTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9" class="margin_right_2">
              <el-form-item label="本地存储" prop="mirrorType" required>
                <el-select v-model="form.localMemory" placeholder="请选择本地存储">
                  <el-option
                    v-for="item in localMemoryOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9" class="margin_right_2">
              <el-form-item label="服务器数量" prop="machineCount" required>
                <el-input-number v-model="form.machineCount" :min="1" :max="100" label="服务器数量"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer myDialogFooter">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="DialogVisible = false">生成混合云服务器</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      servicesCount: 20,
      keyName: "",
      DialogVisible: false,
      form: {
        servicesType: "1",
        mirrorType: "1",
        machineCount: 1,
        localMemory: "1"
      },
      servicesTypeOptions: [{ label: "服务器类型1", value: "1" }],
      mirrorTypeOptions: [{ label: "镜像类型1", value: "1" }],
      localMemoryOptions: [{ label: "本地磁盘E:", value: "1" }],
      servicesList: [
        {
          name: "Windows-2016_Standard-64bit",
          describ: "windows-2016-64",
          plate: "Windows-2016_Datacenter-64bit",
          state: "正常",
          size: "42949M",
          createTime: "2018-04-16 14:38:27"
        }
      ],
      total: 1,
      pagesize: 1,
      pageNo: 1
    };
  },
  methods: {
    handleCurrentChange(currentPage) {},
    
  }
};
</script>
<style scoped>
.margin_right_2 {
  margin-right: 50px;
}
</style>



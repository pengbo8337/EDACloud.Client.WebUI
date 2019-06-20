<template>
  <div>
    <p class="title">
      <span class="left-content">
        <img class="titleIcon" src="../../common/images/document.png" alt="NineCube">&nbsp;&nbsp;文档管理
      </span>
      <span class="right-content">
          <el-input class="margin_right_1" v-model="keyName" placeholder="请输入关键字"></el-input>
        <el-button type="warning" class="myBtn">文档上传</el-button>
      </span>
    </p>
    <el-table
      class="myTable"
      :data="docList"
      ref="multipleTable"
      height="620"
      :header-cell-style="this.$root.setHeaderStyle"
      :row-class-name="this.$root.tableRowClassName"
    >
      <el-table-column prop="name" label="文档名称" width="230" align="center"></el-table-column>
      <el-table-column prop="dTimes" label="下载数" align="center"></el-table-column>
      <el-table-column prop="dDate" label="最近下载" align="center"></el-table-column>
      <el-table-column prop="creator" label="创建人" width="230" align="center"></el-table-column>
      <el-table-column prop="uDate" label="上传时间" align="center"></el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="200">
          <template slot-scope="scope">
            <el-button @click="handleDownload(scope.row)" type="text" size="small">下载</el-button>
            <el-button @click="handleEdit(scope.row)" type="text" size="small">删除</el-button>
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
          :total="total*pagesize">
          </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
        total: 1,
      pagesize: 1,
      pageNo:1,
        keyName:"",
      docList: [
        {
          name: "IC宝典",
          dTimes: 22,
          dDate: "2018-11-10",
          creator: "Crystal",
          uDate: "2018-11-10",
        },
        {
          name: "IC宝典",
          dTimes: 22,
          dDate: "2018-11-10",
          creator: "Crystal",
          uDate: "2018-11-10",
        },
        {
          name: "IC宝典",
          dTimes: 22,
          dDate: "2018-11-10",
          creator: "Crystal",
          uDate: "2018-11-10",
        }
      ]
    };
  },
  methods:{
      handleDownload(row){},
      handleEdit(row){},
      handleCurrentChange(currentPage){
      let params;
      params = { PageIndex: currentPage, PageSize: 10 };
        this.pagesize= 10;
      this.pageNo=currentPage;
      //this.getData(params);
    },

  }
};
</script>

<style>
</style>

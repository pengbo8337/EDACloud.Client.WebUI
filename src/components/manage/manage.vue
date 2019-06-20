<template>
  <div>
    <div class="basicInfo">
      <div class="m_header">
        <!-- <p class="left-content">
          <i class="el-icon-tickets verticle_center"></i>
          &nbsp;&nbsp;&nbsp;{{name}}
        </p> -->
        <el-select v-model="area" placeholder="请选择" style="margin-right:10px;">
                <el-option
                  v-for="item in areasList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select v-model="instance" placeholder="请选择" style="margin-right:10px;">
                <el-option
                  v-for="item in servicesList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
        <!-- <span class="right-content">
          <el-button type="warning" class="myBtn" @click="back()">返回</el-button>
          <el-button type="warning" class="myBtn" @click="back()">连接主机</el-button>
        </span> -->
        <el-row class="myTable">
          <el-col :span="7" class="myCard">
            <el-card class="box-card">
              <div class="lineInfo">
                <i>{{selectInstance.instance.cpu}}CPU ,</i>
                <i>{{selectInstance.instance.memory}}G内存 ,</i>
                <i>出宽带最大值{{selectInstance.instance.internetMaxBandwidthOut}}M,</i>
                <i>入宽带最大值{{selectInstance.instance.internetMaxBandwidthIn}}M</i>
                
                <!-- <i>| {{selectInstance.instance.regionId}}</i> -->
              </div>
              <div class="lineInfo">镜像系统：{{selectInstance.instance.osType+" "+selectInstance.instance.osName}}</div>
              <div class="lineInfo">内网地址：{{selectInstance.instance.vpcAttributes.privateIpAddress[0]}}</div>
              <div class="lineInfo">
                系统盘容量：40G
                <span class="bluetext" style="cursor: pointer;">系统盘扩容</span>
              </div>
              <!-- <div class="lineInfo">
                登录密码：
                <span class="send">发送密码</span>
              </div> -->
            </el-card>
          </el-col>
          <el-col :span="7" class="myCard">
            <el-card class="box-card">
              <div class="lineInfo">
                VPC ID：
                <span class="bluetext" style="cursor: pointer;">{{selectInstance.instance.vpcAttributes.vpcId}}</span>
              </div>
              <div class="lineInfo">
                公网地址：
                <span class="send">{{selectInstance.instance.publicIpAddress[0]}}</span>
              </div>
              <div class="lineInfo">
                所属负载均衡：
                <span class="bluetext" style="cursor: pointer;"></span>
              </div>
              <div class="lineInfo">
                挂载磁盘ID：
                <span class="send">{{selectInstance.disks[0].diskId}}</span>
              </div>
              <div class="lineInfo">
                状态：
                <span class="bluetext" style="cursor: pointer;">{{selectInstance.instance.status}}</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="7" class="myCard">
            <el-card class="box-card">
              <div class="lineInfo">计费类型：{{selectInstance.instance.instanceChargeType}}</div>
              <div class="lineInfo">创建于：{{selectInstance.instance.creationTime}}</div>
              <div class="lineInfo">
                自动续费：
                <span>{{selectInstance.instance.StoppedMode}}</span>
              </div>
              <div class="lineInfo">有效期：{{selectInstance.instance.expiredTime}}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="m_content myTable margin_left">
        <el-row class="tab_nav">
          <el-col
            class="tab"
            :span="2"
            :class="selectId==1?'tab_active':''"
            @click.native="toTab(1)"
          >监控</el-col>
          <!-- <el-col
            class="tab"
            :span="2"
            :class="selectId==2?'tab_active':''"
            @click.native="toTab(2)"
          >快照管理</el-col>
          <el-col
            class="tab"
            :span="2"
            :class="selectId==3?'tab_active':''"
            @click.native="toTab(3)"
          >主机设置</el-col> -->
          <el-col
            class="tab"
            :span="2"
            :class="selectId==4?'tab_active':''"
            @click.native="toTab(4)"
          >操作日志</el-col>
        </el-row>
      </div>
    </div>
    <div class="main_content" v-if="selectId==1">
        <monitor></monitor>
    </div>
    <div class="main_content" v-if="selectId==2">
        <snap-shot></snap-shot>
    </div>
    <div class="main_content" v-if="selectId==3">
        <host-setting></host-setting>
    </div>
  </div>
</template>

<script>
import Monitor from 'components/manage/monitor'
import SnapShot from 'components/manage/snapshot'
import HostSetting from 'components/manage/snapshot'
export default {
  data() {
    return {
      name: "i-19-708-VM",
      selectId: 1,
      areasList:[],
      area:"cn-zhangjiakou",
      instance:"",
      servicesList: [],
      allInstance:[],
      selectInstance:{disks:[{diskId:""}],instance:{publicIpAddress:[],cpu:0,memory:0,regionId:"",instanceChargeType:"",osType:"",osName:"",vpcAttributes:{vpcId:"",privateIpAddress:[]}}},
      dateType:1
    };
  },
  components:{Monitor,SnapShot,HostSetting},
  mounted() {
    this.getAreas();
    this.getServiceList();
  },
  computed:{
    chartDate(){
      return this.$store.state.dateRange;
    }
  },
  watch:{
    chartDate(val){
      this.dateType=val;
      this.getData();
    },
    instance(val){
      //console.log(val);
      if(this.instance){
         this.getData();
      this.allInstance.forEach(e => {
        if(e.instance.instanceId==val){
          this.selectInstance=e;
          return;
        }
      });
      }
     
    },
    area(){
      this.getServiceList();
      if(this.instance){
        this.getData();
      }
    },
  },
  methods: {
    getData(){
      // duration:7,
      let params = {duration:this.dateType,RegionId:this.area,instanceid:this.instance};
      this.$ajaxs.getMonitorData(params).then(
        res => {
          if (res.statusCode == 0) {
            let cpuList=[];
            res.data.forEach(e => {
              cpuList.push({cpu:e.cpu,date:e.timeStamp});
            });
            this.$store.state.CPUData=cpuList;
          } else {
            this.$message({
              message: "请求监控信息失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        })
    },
    getServiceList(){
      let params = {RegionId:this.area };
      this.$ajaxs.getServicesList(params).then(
        res => {
          if (res.statusCode == 0) {
            let list=[];
            res.data.forEach(e => {
              list.push({ label: e.instance.instanceName, value: e.instance.instanceId });
            });
            this.servicesList = list;
            this.allInstance=res.data;
            if(list.length>0){
              this.instance=list[0].value;
            }else{
              this.instance="";
            }
          } else {
            this.$message({
              message: "请求实例列表失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        })
    },
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
    toTab(val) {
      this.selectId = val;
    },
    back() {}
  }
};
</script>

<style scoped>
.left-content {
  font-size: 1.5rem;
}
.myCard, .main_content{
  padding: 0px 3rem;
  font-size: 1.2rem;
}
.lineInfo {
  margin: 0.5rem 0px;
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
</style>

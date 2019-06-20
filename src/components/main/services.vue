<template>
  <div>
    <p class="title">
      <span class="left-content">
        <img class="titleIcon" src="../../common/images/machine.png" alt="NineCube">
        &nbsp;&nbsp;服务器列表(共{{servicesCount}}个)
      </span>
      <span class="right-content">
        <el-select v-model="area" placeholder="请选择" style="margin-right:10px;">
                <el-option
                  v-for="item in areasList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
        <el-input class="margin_right_1" v-model="keyName" placeholder="请输入关键字"></el-input>
        <el-button type="warning" class="myBtn" @click="toCreate()">
          <i class="el-icon-plus"></i> 生成服务器
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
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column prop="instance.instanceName" label="实例名称" align="center" width="100">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.instance.instanceName"
            placement="right-start"
          >
            <a>{{scope.row.instance.instanceName}}</a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="instance.status" label="状态" align="center" width="80"></el-table-column>
      <el-table-column prop="instance.publicIpAddress" label="公网IP" align="center" width="120"></el-table-column>
      <el-table-column prop="instance.vpcAttributes.privateIpAddress" label="私网IP" align="center"width="120"></el-table-column>
      <el-table-column prop="instance.cpu" label="CPU" align="center" width="60"></el-table-column>
      <el-table-column prop="instance.memory" label="内存" align="center" width="60"></el-table-column>
      <el-table-column prop="instance.storage" label="存储" align="center" width="60"></el-table-column>
      <el-table-column prop="instance.internetMaxBandwidthOut" label="上行带宽" align="center" >
        <template slot-scope="scope">{{scope.row.instance.internetMaxBandwidthOut}}</template>
      </el-table-column>
      <el-table-column prop="instance.internetMaxBandwidthIn" label="下行带宽" align="center">
        <template slot-scope="scope">{{scope.row.instance.internetMaxBandwidthIn}}</template>
      </el-table-column>
      <el-table-column prop="instance.instanceId" label="实例ID" align="center"  width="100">
         <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.instance.instanceId"
            placement="right-start"
          >
            <a>{{scope.row.instance.instanceId}}</a>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="instance.instanceType" label="类型" align="center"  width="135"></el-table-column>
      <el-table-column prop="expiredTime" label="计费类型" align="center"></el-table-column>
      <!-- <el-table-column prop="expiredTime" label="过期时间" align="center">
        <template slot-scope="scope">
          <p v-if="scope.row.expiredTime!=''&&scope.row.expiredTime!==null">{{scope.row.expiredTime.split("T")[0]}}</p>
          <p v-else></p>
        </template>
      </el-table-column>-->
      <el-table-column prop="expiredTime" label="工程师" align="center"></el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="345">
        <template slot-scope="scope">
          <el-button @click="changeName(scope.row)" type="text" size="small">更改名称</el-button>
          <el-button @click="setPublicIp(scope.row)" type="text" size="small" :disabled="scope.row.instance.publicIpAddress!=''">分配公网IP</el-button>
          <el-button @click="deliveryEngineer(scope.row)" type="text" size="small">分配工程师</el-button>
          <!-- instance.status -->
          <el-button :disabled="scope.row.instance.status!='Stopped'" @click="start(scope.row)" type="text" size="small">启动</el-button>
          <el-button :disabled="scope.row.instance.status!='Running'" @click="restart(scope.row)" type="text" size="small">重启</el-button>
          <el-button :disabled="scope.row.instance.status=='Stopped'" @click="stop(scope.row)" type="text" size="small">停止</el-button>
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
      :total="total"
    ></el-pagination>
    <el-dialog title="添加服务器" :visible.sync="DialogVisible" width="300">
      <span>
        <el-form :model="form">
          <el-row>
            <el-col :span="7" class="margin_right_1">
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
            <el-col :span="7" class="margin_right_1">
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
            <el-col :span="5" class="margin_right_1">
              <el-form-item label="服务器数量" prop="machineCount" required>
                <el-input-number v-model="form.machineCount" :min="1" :max="100" label="服务器数量"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer myDialogFooter">
        <el-button @click="DialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="DialogVisible = false">生成服务器</el-button>
      </span>
    </el-dialog>
    <!-- 分配工程师 -->
    <el-dialog title="分配工程师" :visible.sync="deliveryEngineers" width="300">
      <span class="myTransfer">
        <el-transfer
          filterable
          filter-placeholder="请输入工程师"
          :titles="['工程师', '有权限的']"
          :button-texts="['移除', '添加']"
          v-model="selectEngineers"
          :data="engineerList"
        ></el-transfer>
      </span>
      <span slot="footer" class="dialog-footer myDialogFooter">
        <el-button @click="deliveryEngineers = false">取 消</el-button>
        <el-button type="primary" @click="savePermission()">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分配工程师"  :visible.sync="deliveryEngineers2" width="300">
      <span>
        <div class="right-content" style="margin-bottom:10px;">
          <el-button type="warning" class="myBtn" @click="newEngineer()">
          <i class="el-icon-plus"></i> 新增
        </el-button>
        </div>
        
        <el-table
      class="myTable"
      :data="allowList"
      height="320"
      :header-cell-style="this.$root.setHeaderStyle"
      :row-class-name="this.$root.tableRowClassName"
    >
      <el-table-column prop="user.user_no" label="用户" align="center"></el-table-column>
      <el-table-column prop="user.name" label="用户名" align="center"></el-table-column>
      <el-table-column prop="permission" label="连接工具" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.permission.allow_vnc">VNC</el-tag>
          <el-tag type="warning" v-if="scope.row.permission.allow_xmanager">XManager</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button @click="send(scope.row)" type="text" size="small">发送主机账号</el-button>
          <el-button @click="updateAllowRow(scope.row)" type="text" size="small">更新</el-button>
          <el-button @click="deleteAllowRow(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
   <el-dialog
      width="40%"
      title="工程师权限分配"
      :visible.sync="innerVisible"
      append-to-body>
      <span>
        <el-row>
          <el-input placeholder="请输入密码" v-model="rootPWD" type="password">
            <template slot="prepend" class="getCode">
              root密码
            </template> 
          </el-input>
        </el-row>
        <el-row class="myTable">
          <b style="display: inline;">工程师：</b>
          <el-select v-model="selectAllowEngine" placeholder="请选择" style="width:15rem">
                <el-option
                  v-for="item in unallowList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
        </el-row>
        <el-row class="myTable">
          <b style="display: inline;">连接工具：</b>
          <el-checkbox-group  style="display: inline;" v-model="linkTool">
    <el-checkbox label="VNC"></el-checkbox>
    <el-checkbox label="XManager"></el-checkbox>
    </el-checkbox-group>
        </el-row>
      </span>
      <span slot="footer" class="dialog-footer myDialogFooter">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAllow()">保存</el-button>
      </span>
    </el-dialog>
      </span>
      <span slot="footer" class="dialog-footer myDialogFooter">
        <!-- <el-button @click="deliveryEngineers2 = false">取 消</el-button> -->
        <el-button type="primary" @click="savePermission2()">确定</el-button>
      </span>
    </el-dialog>
    <el-dialog width="30%" :title="isDelete==1?'删除用户权限':'发送服务器账号信息'" :visible.sync="getServiceInfoVisible" append-to-body>
        <el-row>
          <el-input placeholder="请输入密码" v-model="code" type="password">
            <!-- <template slot="append" class="getCode">
              <a id="getCode" v-if="validateType==1" @click="getCode()">获取验证码</a>
              <a id="getCode" v-if="validateType==2">{{counter}}</a>
               <a id="getCode" v-if="validateType==3" @click="getCode()">重发</a>
            </template> -->
            <template slot="prepend" class="getCode">
              root密码
            </template> 
          </el-input>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancleSend2()">取 消</el-button>
          <el-button type="primary" @click="getServicerInfo()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog width="30%" title="更改实例hostName" :visible.sync="changeNameVisible">
        <span>
          <el-input placeholder="请输入新的主机名称" v-model="changeItem.Name">
            <template slot="prepend" class="getCode">
              hostName
            </template> 
          </el-input>
          <!-- <el-input class="myTable" placeholder="请输入新的主机密码" v-model="changeItem.password" type="password">
            <template slot="prepend" class="getCode">
              主机密码
            </template> 
          </el-input> -->
        </span>
         <em class="hostNameTip">*字符长度为 2~64，支持多个点号（.），点之间为一段，每段允许大小写英文字母、数字和短横线（-）。</em>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeNameVisible=false">取 消</el-button>
          <el-button type="primary" @click="changeHostName()">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      changeNameVisible:false,
      changeItem:{Name:"",instanceId:"",regionid:"",password:""},
      isDelete:1,
      rootPWD:"",
      userId:0,
      phoneNum:"",
      validateType:1,
      code:"",
      getServiceInfoVisible:false,
      counter:60,
      selectAllowEngine:"",
      linkTool:[],
      innerVisible:false,
      deliveryEngineers2:false,
      instanceId:"",
      engineerList: [],
      selectEngineers: [],
      // filterMethod(query, item) {
      //   return item.label.indexOf(query) > -1;
      // },
      deliveryEngineers: false,
      servicesCount: 0,
      keyName: "",
      DialogVisible: false,
      form: { servicesType: "1", mirrorType: "1", machineCount: 1 },
      servicesTypeOptions: [{ label: "服务器类型1", value: "1" }],
      mirrorTypeOptions: [{ label: "镜像类型1", value: "1" }],
      servicesList: [],
      total: 1,
      pagesize: 1,
      pageNo: 1,
      areasList:[],
      area:"cn-zhangjiakou",
      allowList:[],
      unallowList:[],
      selectInstanceId:"",
      selectRow:[],
      deleteRow:[]
    };
  },
  mounted() {
    this.getAreas();
    this.getData([]);
  },
  watch:{
    area(val){
      this.getData([]);
    },
    counter(val) {
				if (val == 0) {
					this.validateType = 3;
				}
			}
  },
  methods: {
    changeName(row){
      //changeHostName
      console.log(row);
      this.changeNameVisible=true;
      this.changeItem.Name="";
      // this.changeItem.password="";
      this.changeItem.instanceId=row.instance.instanceId;
      this.changeItem.regionid=row.instance.regionId;
    },
    changeHostName(){
      //this.changeItem.Name
      if(this.changeItem.Name==""){
        this.$message({
              message: "请将主机信息填写完整",
              type: "warning"
            });
            return;
      }

      let params={instanceid:this.changeItem.instanceId,regionid:this.changeItem.regionid,hostname:this.changeItem.Name};
      //password:this.changeItem.password
      this.$ajaxs.changeHostName(params).then(
        res => {
          if (res.statusCode == 0) {
            this.$message({
              message: "更改主机名称成功,需要重启后使改名有效哦",
              type: "success"
            });
            this.changeItem.Name="";
            this.changeNameVisible=false;
            this.getData([]);
          } else {
            //添加错误代码提示
            this.$message({
              message: "更改主机名称失败,错误代码：" + res.statusCode+res.message,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
      
    },
    countDown() {
				let clock = setInterval(() => {
					this.counter--
					if (this.counter < 0) { //当倒计时小于0时清除定时器
						clearInterval(clock)
						this.counter = 60
					}
				}, 1000)
			},
    getCode(){
      let params={mobileNo:this.phoneNum,smsType:"Identity"};
      this.$ajaxs.sendValidCode(params).then(
        res => {
          if (res.statusCode == 0) {
           // console.log(res);
            this.$message({
              message: "发送短信成功",
              type: "success"
            });
            this.validateType = 2;
				    this.countDown();
          } else {
            //添加错误代码提示
            this.$message({
              message: "发送验证码失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    cancleSend2(){
      this.getServiceInfoVisible=false;
      this.code="";
    },
    cancleSend(){
      this.getServiceInfoVisible = false;
            this.code="";
            this.counter=60;
            this.validateType=1;
    },
    getServicerInfo(){
      //selectInstanceId
      if(this.code==""){
        this.$message({
              message: "请先输入密码",
              type: "warning"
            });
            return;
      }
      if(this.isDelete==1){

        let params={password:this.code,permissions:[{userid:this.deleteRow.user.id,allowaccess:false,allow_vnc:false,allow_xmanager:false}],instanceid:this.deleteRow.permission.instanceid};
      this.$ajaxs.getInstancePermission(params).then(
        res => {
          if (res.statusCode == 0) {
            // this.deliveryEngineers2 = false;
            this.getData();
            this.$message({
              message: "删除权限成功" ,
              type: "success"
            });
            this.getServiceInfoVisible = false;
            this.refreshAllocate(this.deleteRow.permission.instanceid);
          } else {
            this.$message({
              message: "请求分配权限失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
      }
      else{
        // let params={userid:this.userId,validatecode:parseInt(this.code),regionid:this.area,instanceid:this.selectInstanceId};
      let params={userid:this.userId,regionid:this.area,instanceid:this.selectInstanceId,password:this.code.trim()};     
     this.$ajaxs.getServiceInfo(params).then(
        res => {
          if (res.statusCode == 0) {
           // console.log(res);
            this.$message({
              message: "服务器账号信息已发送",
              type: "success"
            });
            this.getServiceInfoVisible = false;
            this.code="";
            this.counter=60;
            this.validateType=1;
          } else {
            //添加错误代码提示
            this.$message({
              message: "服务器账号信息发送失败,错误代码：" + res.message,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
      }
      
    },
    refreshAllocate(id){
      this.$ajaxs.getInstanceAllocation({instanceid:id}).then(
        res => {
          if (res.statusCode == 0) {
            this.allowList=res.data.filter(item => item.permission.allowaccess===true );
            this.unallowList=res.data.filter(item => item.permission.allowaccess!==true&&item.user.is_mobile_validated===true );
            let unallow=[];
      this.unallowList.forEach(e => {
          unallow.push({label:e.user.name,value:e.user.id});
      });
      this.unallowList=unallow;
          } else {
            this.$message({
              message: "获取服务器权限失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    deleteAllowRow(row){
      this.isDelete=1;
      this.getServiceInfoVisible=true;
      this.deleteRow=row;
    },
    updateAllowRow(row){
      this.selectAllowEngine=row.user.id;
      this.rootPWD="";
      this.unallowList=[];
      this.unallowList.push({label:row.user.name,value:this.selectAllowEngine});
      this.linkTool=[];
      if(row.permission.allow_vnc){
        this.linkTool.push("VNC")
      }
       if(row.permission.allow_xmanager){
        this.linkTool.push("XManager")
      }
      this.innerVisible=true;
    },
    saveAllow(){
      if(this.rootPWD==""){
        this.$message({
              message: "请输入密码",
              type: "warning"
            });
            return;
      }
      if(this.selectAllowEngine==""){
        this.$message({
              message: "请先选择工程师",
              type: "warning"
            });
            return;
      }
      if(this.linkTool.length==0){
        this.$message({
              message: "请先勾选连接工具",
              type: "warning"
            });
            return;
      }

      let params={permissions:[{userid:this.selectAllowEngine,allowaccess:true}],instanceid:this.selectInstanceId,password:this.rootPWD,regionid:this.area};
      switch(this.linkTool.length){
        case 0:
        params.permissions[0]["allow_vnc"]=false;
        params.permissions[0]["allow_xmanager"]=false;
        break;
        case 1:
        if(this.linkTool[0]=="VNC"){
          params.permissions[0]["allow_vnc"]=true;
          params.permissions[0]["allow_xmanager"]=false;
        }else{
          params.permissions[0]["allow_xmanager"]=true;
          params.permissions[0]["allow_vnc"]=false;
        }
        break;
        case 2:
        params.permissions[0]["allow_vnc"]=true;
        params.permissions[0]["allow_xmanager"]=true;
        break;
      }
      this.$ajaxs.getInstancePermission(params).then(
        res => {
          if (res.statusCode == 0) {
            this.innerVisible = false;
            this.selectAllowEngine="";
            this.linkTool=[];
            this.refreshAllocate(this.selectInstanceId);
            this.$message({
              message: "分配权限成功" ,
              type: "success"
            });
          } else {
            this.$message({
              message: "请求分配权限失败,错误代码：" + res.statusCode,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    newEngineer(){
      this.innerVisible=true;
      this.rootPWD="";
    },
    start(row){
      this.$ajaxs.startService({instanceid:row.instance.instanceId}).then(
        res => {
          if (res.statusCode == 0) {
            this.$message({
              message: "启动实例成功" ,
              type: "success"
            });
            this.getData();
          } else {
            //添加错误代码提示
            this.$message({
              message: "启动实例失败," + res.message,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    restart(row){
      this.$ajaxs.restart({instanceid:row.instance.instanceId}).then(
        res => {
          if (res.statusCode == 0) {
            this.$message({
              message: "重启实例成功" ,
              type: "success"
            });
            this.getData();
          } else {
            //添加错误代码提示
            this.$message({
              message: "重启实例失败," + res.message,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    stop(row){
      this.$ajaxs.stopService({instanceid:row.instance.instanceId}).then(
        res => {
          if (res.statusCode == 0) {
            this.$message({
              message: "停止实例成功" ,
              type: "success"
            });
            this.getData();
          } else {
            //添加错误代码提示
            this.$message({
              message: "停止实例失败," + res.message,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
    },
    setPublicIp(row){
      let params={instanceid:row.instance.instanceId};

      this.$ajaxs.setPublicIP(params).then(
        res => {
          console.log(res);
          if (res.statusCode == 0) {
            this.$message({
              message: "分配公网IP成功" ,
              type: "success"
            });
          } else {
            //添加错误代码提示
            this.$message({
              message: "分配公网IP失败," + res.message,
              type: "error"
            });
          }
        },
        err => {
          //添加错误连接提示
        }
      );
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
    filterData(data, id) {
      var foo1 = data.filter(function(item) {
        return item.userid != id;
      });
      return foo1;
    },
    savePermission2(){
      this.deliveryEngineers2=false;
      this.getData();
    },
    savePermission(){
      //getInstancePermission
      console.log(this.selectEngineers);
      let permissionList=[];
      this.engineerList.forEach(e => {
        permissionList.push({userid:e.key,instanceid:this.instanceId,allowaccess:false});
      });
      this.selectEngineers.forEach(e => {
        permissionList=this.filterData(permissionList,e);
        permissionList.push({userid:e,instanceid:this.instanceId,allowaccess:true});
      });
      //console.log(JSON.stringify(permissionList));
      this.$ajaxs.getInstancePermission(permissionList).then(
        res => {
          if (res.statusCode == 0) {
            this.deliveryEngineers = false;
            this.$message({
              message: "分配权限成功" ,
              type: "success"
            });
            this.getData();
          } else {
            this.$message({
              message: "请求分配权限失败,错误代码：" + res.statusCode,
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
      //addServicesList
      if (params.length < 1) {
        params = { PageIndex: 1, PageSize: 10,RegionId:this.area };
        this.pagesize = 10;
        this.pageNo = 1;
      }
      this.$ajaxs.getServicesList(params).then(
        res => {
          if (res.statusCode == 0) {
            this.servicesList = res.data;
            this.total =  Math.ceil(res.total/10);
            this.servicesCount = res.data.length;
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
    handleCurrentChange(currentPage) {
      let params;
      params = { PageIndex: currentPage, PageSize: 10 };
      this.pagesize = 10;
      this.pageNo = currentPage;
      this.getData(params);
    },
    toCreate() {
      this.$router.push({
        path: "/generatehost"
      });
    },
    link(row) {
      // this.$router.push({
      //   path: "/linkService"
      // });
    },
    send(row) {
      this.getServiceInfoVisible=true;
      this.userId=row.user.id;
      this.phoneNum=row.user.phone_num;
      this.code="";
      this.isDelete=2;
    },
    deliveryEngineer(row){
      this.selectRow=row;
      this.deliveryEngineers2=true;
      this.selectInstanceId=row.instance.instanceId;
      this.allowList=row.engineers.filter(item => item.permission.allowaccess===true );
      this.unallowList=row.engineers.filter(item => item.permission.allowaccess!==true&&item.user.is_mobile_validated===true );
      let unallow=[];
      this.unallowList.forEach(e => {
        unallow.push({label:e.user.name,value:e.user.id});
      });
      this.unallowList=unallow;
      console.log(this.allowList);
    },
    // deliveryEngineer(row) {
    //   this.deliveryEngineers = true;
    //   this.engineerList=[];
    //   let list=[];
    //   let selectList=[];
    //   this.instanceId=row.instance.instanceId;
    //   if(row.engineers!=null){
    //     for(let i=0;i<row.engineers.length;i++){
    //       list.push({key:row.engineers[i].user.id,label:row.engineers[i].user.name});
    //       if(row.engineers[i].permission.allowaccess){
    //         // selectList.push({key:row.engineers[i].user.id,label:row.engineers[i].user.name});
    //         selectList.push(row.engineers[i].user.id);
    //       }
    //     }
    //     this.engineerList=list;
    //     this.selectEngineers=selectList;
    //   }
    // }
  }
};
</script>
<style scoped>
.myTransfer {
  display: flex;
  justify-content: center;
}
.hostNameTip{
      position: relative;
    top: 20px;
    font-size: 1rem;
    color: #f08519;
}
</style>



<template>
  <div id="home">
    <el-row class="mainheader">
      <!-- <el-col :span="8">
              <img  class="left_span logo" src="../../common/images/logo.png" alt="NineCube"/>
          </el-col>
          <el-col :span="8" class="right_span">
              <p>{{company}}    管理员：{{user}}</p>
      </el-col>-->
      <p class="headerContent">
        <span class="left-content">
          <img class="logo" src="../../common/images/logo.png" alt="NineCube">
        </span>
        <span class="rightPosition">
          <p>{{company}} 管理员：{{user}}</p>
        </span>
      </p>
    </el-row>
    <el-row class="main_part">
      <div class="loginPart">
        <el-form :model="loginForm" :rules="loginRules" ref="loginForm">
          <el-form-item prop="userName">
            <el-input
              v-model="loginForm.userName"
              auto-complete="off"
              placeholder="用户名"
              :maxlength="30"
              @keyup.enter.native="submitForm('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input
              type="password"
              v-model="loginForm.passWord"
              auto-complete="off"
              @keyup.enter.native="submitForm('loginForm')"
              placeholder="密码"
              :maxlength="30"
            ></el-input>
          </el-form-item>
          <el-button id="login_btn" class="login_btn" @click="submitForm('loginForm')">登录</el-button>
        </el-form>
      </div>
      <!-- <p class="pageTopWords">工欲善其事，必先利其器</p> -->
      <img class="mainPic" src="../../common/images/homePage.jpg" alt="NineCube">
    </el-row>
    <m-footer class="footer"></m-footer>
  </div>
</template>
<script>
import MFooter from "components/nav/footer";
import md5 from "js-md5";
import { setLStorage } from "configs/config";
export default {
  data() {
    return {
      loginRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      company: "中国EDA云平台有限公司",
      user: "Admin",
      loginForm: { userName: "", passWord: "" }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            username: this.loginForm.userName,
            password: md5(this.loginForm.passWord)
          };
          this.$ajaxs.getLogin(params).then(
            res => {
              if (res.statusCode == 0) {
                //setLStorage("user",this.loginForm.userName);
                setLStorage("jwtT",res.token);
                setLStorage("user",res.data.user.user_no);
                setLStorage("userType",res.data.user.user_type);
                if(res.data.balance==null){
                  this.$store.state.money=0;
                }else{
                  this.$store.state.money=res.data.balance.bal_eda;
                }
                this.$store.state.userType=res.data.user.user_type;
                this.$router.push({
                  path: "/cloud"
                });
              } else {
                this.$message({
                  message: "用户或密码错误",
                  type: "error"
                });
                this.loginForm= { userName: "", passWord: "" };
              }
            },
            err => {
              //添加错误连接提示
            }
          );
        }
      });
    }
  },
  components: {
    MFooter
  }
};
</script>
<style scoped>
.mainPic {
  max-height: 400px;
  width: 100%;
}
.headerContent {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.rightPosition {
  position: absolute;
  right: 10px;
}
/* .mainheader {
  height: 8%;
} */
.main_part {
  background: #004881;
  height: 90%;
  display: flex;
  align-items: center;
  border-top: 6px solid #f08519;
}
.footer {
  height: 2%;
}
#home {
  height: 100%;
}
.pageTopWords {
  position: absolute;
  font-size: 2.5rem;
  left: 1.5rem;
  top: 20%;
}
.loginPart {
  padding: 0 20px;
  width: 250px;
  height: 110px;
  position: absolute;
  left: 90%;
  top: 60%;
  margin: -150px 0 0 -150px;
  -o-box-sizing: border-box;
  box-sizing: border-box;
  /* background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 50px #f63;
  opacity:0.5; */
}
.login_btn {
  margin-left: 7rem;
}
</style>


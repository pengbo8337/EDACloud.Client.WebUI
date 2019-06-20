<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
html {
  font-size: 12px;
  /* overflow: hidden; */
}
html,
body,
#app {
  height: 100%;
  overflow-x: hidden;
}
.left_span {
  float: left;
}
.right_span,
.right_span p {
  float: right;
}
.mainheader,
.footer,
.info-content {
  padding: 10px;
  background: linear-gradient(to top left, #f2f2f2, #fefefd);
  font-size: 1.2rem;
}
.logo {
  position: relative;
  width: 95%;
  height: 35px;
}
.header {
  border-bottom: 6px solid #f08519;
  position: absolute;
  width: 100%;
  z-index: 999;
}
.footer {
  position: absolute;
  bottom: 0px;
  width: 100%;
  border-top: 5px solid #f08519;
  z-index: 999;
}
.margin_right {
  margin-right: 3rem;
}
.margin_left {
  margin-left: 3rem;
}
.margin_left_1 {
  margin-left: 1rem;
}
.titleIcon {
  height: 2rem;
  width: 2rem;
}
.title {
  color: #004881;
  font-weight: bold;
  font-size: 1.5rem;
}
.right-content,
.left-content {
  display: -webkit-flex;
  display: flex;
  display: inline-flex;
}
.right-content {
  float: right;
}
.margin_right_1 {
  margin-right: 1rem;
}
.myBtn {
  background-color: #004881;
  border-color: #004881;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 12px 15px;
}
.myBtn:focus,
.myBtn:hover {
  background-color: #185d94;
  border-color: #185d94;
}
.myPagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.myTable {
  /* max-height: 300px;
  overflow: scroll; */
  margin-top: 3rem;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-table .normal-row {
  background: #f2f2f2;
}
.myDialogFooter {
  display: flex;
  justify-content: center;
}
.margin_top {
  margin-top: 1rem;
}
.myCenter {
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.red {
  color: red;
}
.partWord {
  font-size: 1.5rem;
  padding: 1.5rem 0px;
}
.menuItem,
.menuItem a {
  cursor: pointer;
  color: #f08519;
  font-weight: bold;
}
.menuItem a {
  text-decoration: unset;
}
.menuItem img {
  height: 20px;
  width: 20px;
  margin-left: 2rem;
}
.verticle_center {
  display: flex;
  align-items: center;
}
.redIcon {
  color: rgb(42, 153, 242);
  font-weight: bold;
}
.el-table .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.el-loading-mask{
  z-index: 99;
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
.getCode,
#getCode {
  cursor: pointer;
}
.refreshIcon{
  cursor: pointer;
}
</style>

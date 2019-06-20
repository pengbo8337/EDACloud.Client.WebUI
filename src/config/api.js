import { API_URL} from './config'
import { fetch, upload, get, post, postParams, patch,getExcelData,patchJson,postJson,getdelete,getdeleteJson } from './fetch'
export default{
    /**登录 */
    getLogin(params){
        return post(API_URL+"User/Login",params);
    },
    /**获取用户列表 */
    getUserList(params){
        return get(API_URL+"User/List",params);
    },
    /**增加用户 */
    addUser(params){
        return post(API_URL+"User/Insert",params);
    },
    /**修改用户 */
    modifyUser(params){
        return post(API_URL+"User/Update",params);
    },
    /**删除用户 */
    deleteUser(params){
        return post(API_URL+"User/Delete",params)
    },
    /*获取镜像列表 */
    getImaggeList(params){
        return get(API_URL+"Image/List",params);
    },
    /**删除镜像 */
    DeleteImage(params){
        return postJson(API_URL+"Image/Delete",params);
    },
    /**生成镜像 */
    addNewImage(params){
        return post(API_URL+"Image/Insert",params);
    },
    /**获取服务器列表 */
    getServicesList(params){
        return get(API_URL+"Instance/Get",params);
    },
    /*获取实例规格资源 */
    getInstanceType(params){
        return get(API_URL+"InstanceType/Get/List",params);
    },
    createInstance(params){
        return post(API_URL+"Instance/Insert",params);
    },
    /**导出镜像 */
    downloadImage(params){
        return get(API_URL+"Image/ExportImage",params);
    },
    /**上传镜像 */
    uploadImage(params,name,bName){
        return post(API_URL+"Image/ImportImage?imageName="+name+"&bucketName="+bName,params);
    },
    /**上传头像 */
    uploadHeadImg(params,username){
        return post(API_URL+"Portrait?username="+username,params);
    },
    /** 获取套餐列表*/
    getPackageList(params){
        return get(API_URL+"Package/List",params);
    },
    /**获取套餐信息 */
    getPackageDetail(params){
        return get(API_URL+"Package/Get",params);
    },
    /**生成主机 */
    createInstanceById(params){
        return post(API_URL+"Instance/InsertByImageId",params);
    },
    /**获取公司列表 */
    getCompanyList(params){
        return get(API_URL+"Company/List",params);
    },
    /**获取单个公司 */
    getMyCompany(params){
        return get(API_URL+"Company/Get",params);
    },
    /**增加公司 */
    addCompany(params){
        return post(API_URL+"Company/Insert",params);
    },
    /**更新公司 */
    updateCompany(params){
        return post(API_URL+"Company/Update",params);
    },
    /**删除公司信息 */
    deleteCompany(params){
        return post(API_URL+"Company/Delete",params);
    },
    /**获取订单列表 */
    getOrderList(params){
        return get(API_URL+"Order/List",params);
    },
    /**获取订单详情 */
    getOrderDetail(params){
        return get(API_URL+"Order/Get",params);
    },
    /**获取软件信息 */
    getSoftWare(params){
        return get(API_URL+"Software/List",params);
    },
    /**获取消费列表 */
    getConsumeList(params){
        return  get(API_URL+"Consumption/List",params);
    },
    /**获取充值记录 */
    getRechargeList(params){
        return get(API_URL+"RechargeRecord/List",params);
    },
    /**确认付款接口 */
    confirmPay(params){
        return post(API_URL+"Pay/ConfirmPay",params);
    },
    /**获取可用地域 */
    getAreas(params){
        return get(API_URL+"AliProduct/GetRegions",params);
    },
    /**获取区域中可用的实例 */
    getInstanceByAreaId(params){
        return get(API_URL+"AvailableResource/Get",params);
    },
    getInstancePermission(params){
        return post(API_URL+"InstancePermission/UpdatePermisssions",params);
    },
    /**获取资源价格 */
    getResourceMony(params){
        return get(API_URL+"AliProduct/GetPrice",params);
    },
    /**生成订单 */
    createOrder(params){
        return post(API_URL+"Order/Insert",params);
    },
    /**确认消费 */
    confirmConsume(params,id){
        return post(API_URL+"Consumption/ConsumeByPackage?orderid="+id,params);
    },
    /**删除订单 */
    deleteOrders(params,id){
        return post(API_URL+"Order/Delete?orderid="+id,params);
    },
    /** 查看是否支付完成*/
    checkIsCompelete(url){
        return get(url);
    },
    /**获取余额信息 */
    getLeftMoney(){
        return post(API_URL+"Consumption/GetBalance");
    },
    /**分配公网IP */
    setPublicIP(params){
        return get(API_URL+"Management/AllocatePublicIpAddress",params);
    },
    /**自定义主机确认支付 */
    confirmPayConfig(params){
        return post(API_URL+"Consumption/Insert",params);
    },
    /**重启实例 */
    restart(params){
        return get(API_URL+"Management/Reboot",params);
    },
    /**启动实例 */
    startService(params){
        return get(API_URL+"Management/Start",params);
    },
    stopService(params){
        return get(API_URL+"Management/Stop",params);
    },
    /**发送验证码 */
    sendValidCode(params){
        return get(API_URL+"SMS/SendSMS",params);
    },
    /**根据镜像ID获取套餐详情 */
    getSetDetailByImageId(params){
        return get(API_URL+"Package/GetByImageId",params);
    },
    /**增加tag */
    addTagInfo(params){
        return post(API_URL+"Tag/AddTag",params);
    },
    /**获取服务器权限 */
    getInstanceAllocation(params){
        return get(API_URL+"InstancePermission/GetPermissionsByInstance",params);
    },
    /**发送用户名密码 */
    getUserLoginInfo(params){
        return post(API_URL+"SMS/SendUserInfo",params);
    },
    /**发送服务器账号信息 */
    getServiceInfo(params){
        return post(API_URL+"SMS/SendInstanceInfo",params);
    },
    /**套餐生成主机 */
    createInstanceByPackage(params){
        return post(API_URL+"Order/InsertByPackage",params);
    },
    /**修改主机名称 */
    changeHostName(params){
        return post(API_URL+"Management/ChangeHostname",params);
    },
    /**验证码登陆 */
    validCodeLogin(params){
        return post(API_URL+"User/LoginByValidateCode",params);
    },
    /**获取监控数据 */
    getMonitorData(params){
        return get(API_URL+"Management/GetMonitorData",params);
    },
    /**获取优惠券列表 */
    getCouponList(params){
        return get(API_URL+"Coupon/List",params);
    },
    /**手机验证 */
    validMobile(params){
        return post(API_URL+"User/ValidateMobile",params);
    },
}
//export const API_URL="http://47.107.224.119/api/";
export const API_URL="http://47.94.105.92/api/";

/*设置浏览器缓存 */
export function getLStorage(name) {
    return localStorage.getItem(name)
}
export function setLStorage(name, value) {
    return localStorage.setItem(name, value)
}
export function delLStorage(name) {
    return localStorage.removeItem(name)
}
export function clearLStorage() {
    return localStorage.clear();
}

export function getUserType(id){
    let userType="";
    switch(id){
        case 1:
        userType="管理员";
        break;
        case 2:
        userType="工程师";
        break;
        case 3:
        userType="个人用户";
        case 4:
        userType="学生";
        break;
        case 5:
        userType="教师";
        break;
        default:
        userType="";
        break;
      }
    return userType;
}
export function getUserTypeNumber(str){
    let userType=0;
    switch(str){
        case "管理员":
        userType=1;
        break;
        case "工程师":
        userType=2;
        break;
        case "个人用户":
        userType=3;
        case "学生":
        userType=4;
        break;
        case "教师":
        userType=5;
        break;
        default:
        userType=0;
        break;
      }
    return userType;
}
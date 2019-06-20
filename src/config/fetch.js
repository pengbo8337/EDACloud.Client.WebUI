/**
 * Created by Crystal on 2018/12/8.
 */
import axios from 'axios'
import { API_URL, getLStorage } from './config'

export function fetch(url, params = {}, config = {}) {
    let method = 'post';
    if (config && config.method) {
        method = config.method;
    }
    let contentType = 'multipart/form-data';
    if (config && config.contentType) {
        contentType = config.contentType;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: url,
            data: params,
            contentType: contentType
        }).then((response) => {
            //返回数据
            resolve(response.data);
        }, err => {
            reject(err);
        })
            .catch((error) => {
                reject(error)
            })
    })
}

export function get(url, params = {}) {
    if (Object.keys(params).length > 0) {
        var queryString = '';
        for (var key in params) {
            queryString += '&' + key + '=' + params[key];
        }
        queryString = queryString.substring(1);
        url += '?' + queryString;
    }
    return new Promise((resolve, reject) => {
        axios.get(url
             , {headers: { "Authorization": "Bearer "+getLStorage("jwtT") } }
        ).then((response) => {
            resolve(response.data);
        }, err => {
            //  checkCode(err.response.data.code);
            reject(err);
        })
            .catch((error) => {
                reject(error)
            })
    })
}
export function getdelete(url, params = {}) {
    if (Object.keys(params).length > 0) {
        var queryString = '';
        for (var key in params) {
            queryString += '&' + key + '=' + params[key];
        }
        queryString = queryString.substring(1);
        url += '?' + queryString;
    }
    return new Promise((resolve, reject) => {
        axios.delete(url
            , {headers: { "Authorization":"Bearer "+ getLStorage("jwtT") } }
        ).then((response) => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
            .catch((error) => {
                reject(error)
            })
    })
}
export function getdeleteJson(url, params = {}) {
    let contentType = 'application/json';
    if (Object.keys(params).length > 0) {
        var queryString = '';
        for (var key in params) {
            queryString += '&' + key + '=' + params[key];
        }
        queryString = queryString.substring(1);
        url += '?' + queryString;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: url,
            data: params,
            dataType: "json",
            headers: {
                "Content-Type": contentType,
                 "Authorization": "Bearer "+getLStorage("jwtT")
            }
        }).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            console.log(err);
        })
    })
}
export function getExcelData(url, params = {}) {
    if (Object.keys(params).length > 0) {
        var queryString = '';
        for (var key in params) {
            queryString += '&' + key + '=' + params[key];
        }
        queryString = queryString.substring(1);
        url += '?' + queryString;
    }
    return new Promise((resolve, reject) => {
        axios.get(url, {
            responseType: 'arraybuffer'
            ,headers: { "Authorization": "Bearer "+getLStorage("jwtT") } 
        }).then((response) => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
            .catch((error) => {
                reject(error)
            })
    })
}
export function postParams(url, params = {}, config = {}) {
    let contentType = 'application/x-www-form-urlencoded';
    if (config && config.contentType) {
        contentType = config.contentType;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            params: params,
            headers: {
                "Content-Type": contentType,
                "Authorization": "Bearer "+getLStorage("jwtT")
            }
        }).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            console.log(err);
        })
    })
}
export function post(url, params = {}, config = {}) {
    let contentType = 'application/json;charset=UTF-8';
    if (config && config.contentType) {
        contentType = config.contentType;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            data: params,
            headers: {
                "Content-Type": contentType,
                 "Authorization":"Bearer "+ getLStorage("jwtT")
            }
        }).then((res) => {
            resolve(res.data);
        }).catch((err) => {
           // alert("连接错误，请联系管理员");
            console.log(err);
        })
    })
}
export function postJson(url, params = {}, config = {}) {
    let contentType = 'application/json;charset=UTF-8';
    if (config && config.contentType) {
        contentType = config.contentType;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: url,
            data: params,
            dataType: "json",
            headers: {
                "Content-Type": contentType,
                "Authorization": "Bearer "+getLStorage("jwtT")
            }
        }).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            console.log(err);
        })
    })
}
export function patch(url, params = {}, config = {}) {
    let contentType = 'application/json;charset=UTF-8';
    if (config && config.contentType) {
        contentType = config.contentType;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'patch',
            url: url,
            data: params,
            headers: {
                "Content-Type": contentType,
                "Authorization": "Bearer "+getLStorage("jwtT")
            }
        }).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            console.log(err);
        })
    })
}
export function patchJson(url, params = {}, config = {}) {
    let contentType = 'application/json';
    if (config && config.contentType) {
        contentType = config.contentType;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: 'patch',
            url: url,
            data: params,
            dataType: "json",
            headers: {
                "Content-Type": contentType,
                 "Authorization": "Bearer "+getLStorage("jwtT")
            }
        }).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            console.log(err);
        })
    })
}
export function upload(url, params = {}) {

    return new Promise((resolve, reject) => {
        axios({
            url: url,
            data: params,
            method: 'POST',
            contentType: 'multipart/form-data',
        }).then(function (res) {
            resolve(res.data);
        }).catch(function (error) {
            reject(error)
        });
    })
}
export default {
    fetch,
    upload,
    get,
    post,
    postParams
}

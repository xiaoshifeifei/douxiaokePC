import axios from "axios";
import { Message } from "element-ui";
import qs from "qs";
import store from "@/store";
import { toUpperCase } from "@/utils/toUpperCase";
import { showFullScreenLoading, hideFullScreenLoading } from "../utils/Loading";

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000 // request timeout
});
service.interceptors.request.use(
    config => {
        console.log(config)
            // 获取token
        let token = store.getters.token;
        // let isTokenOverdue = store.getters.isTokenOverdue
        let tokentype = toUpperCase(
            store.getters.tokenType ? store.getters.tokenType : ""
        );
        console.log(tokentype)
        if (token && !config.headers.authorization) {
            config.headers.authorization = tokentype + " " + token;
        }
        /*
         * loadingInstance = Loading.service();
         * console.log('url=====' + config.url)
         */
        showFullScreenLoading("loadingtext");
        // console.log(config)
        if (
            config.url != "/banner/upload" &&
            config.url != "/service_goods/cover_img_upload" &&
            config.url != "/setting/upload" &&
            config.url != "/news/upload_cover" &&
            config.url != "/repair_orders/img_upload"
        ) {
            if (config.data && !config.data.param) {
                config.data = qs.stringify(config.data);
            }
        }
        return config;
    },
    error =>
    /*
     * do something with request error
     * console.log(error) // for debug
     */
    Promise.reject(error)
);
const errorMsg = message => {
    return Message({
        message,
        type: "error",
        duration: 5000
    });
};
// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];
let newToken = "";
let newTokenType = "";
// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data;
        hideFullScreenLoading();
        return res;
    },
    error => {
        hideFullScreenLoading();
        let { message, response } = error;
        if (response) {
            let { code, msg } = response.data;
            if (code == 1001) {
                let config = error.response.config;
                if (!isRefreshing) {
                    let data = {
                        token: store.getters.token
                    };
                    let tokentype = toUpperCase(
                        store.getters.tokenType ? store.getters.tokenType : ""
                    );
                    let headers = {
                        authorization: tokentype + " " + store.getters.refreshToken
                    };
                    return axios({
                            method: "post",
                            url: process.env.VUE_APP_BASE_API + "/refresh",
                            data: qs.stringify(data),
                            headers
                        })
                        .then(res => {
                            newTokenType = toUpperCase(
                                res.data.data.token_type ? res.data.data.token_type : ""
                            );
                            newToken = res.data.data.token;
                            config.headers.authorization = `${newTokenType} ${newToken}`;
                            store.dispatch("user/refreshToken", res.data.data);
                            return service(config);
                        })
                        .catch(() => {
                            store.dispatch("user/resetToken").then(() => {
                                location.reload();
                            });
                        })
                        .finally(() => {
                            isRefreshing = false;
                            requests.forEach(cb => cb(newTokenType, newToken));
                            // 重试完了别忘了清空这个队列
                            requests = [];
                        });
                } else {
                    // 正在刷新token，返回一个未执行resolve的promise
                    return new Promise(resolve => {
                        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                        requests.push((tokenType, token) => {
                            config.headers.authorization = `${tokenType} ${token}`;
                            resolve(service(config));
                        });
                    });
                }
            } else {
                if (
                    error.response.config.url ===
                    process.env.VUE_APP_BASE_API + "/hotel_room/down_qrcode_by_type"
                ) {
                    errorMsg("没有房间二维码可供导出");
                    return false;
                }
                errorMsg(msg || "系统错误");
            }
        } else {
            if (message.includes("timeout")) {
                message = "请求超时,请刷新一下";
                errorMsg(message || "请求超时,请刷新一下");
            }
        }
        return Promise.reject(error);
    }
);

export default service;
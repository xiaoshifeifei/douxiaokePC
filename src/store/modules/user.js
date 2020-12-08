import { login, logout, getInfo } from "@/api/user";
import { getAccountInfo } from "@/api/jurisdiction.js";
import {
    getCookie,
    setCookie,
    getTokenType,
    getToken,
    setToken,
    removeToken,
    setTokenType,
    removeTokenType,
    getRefreshToken,
    setRefreshToken,
    removeRefreshToken,
    setUid,
    getUid,
    removeUid
} from "@/utils/auth";
import router, { resetRouter } from "@/router";

const state = {
    token: getToken(),
    name: "",
    avatar: "",
    introduction: "",
    roles: [],
    refreshToken: getRefreshToken(), // 刷新token替换的值
    uid: getUid(),
    userInfo: getCookie("userInfo") || {},
    adminName: getCookie("userInfo") ? getCookie("userInfo").AdminName : "",
    tokenType: getTokenType() // token类型
};

// 计算提交state
const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_UID: (state, uid) => {
        state.uid = uid;
    },
    SET_ADMINNAME: (state, adminName) => {
        state.adminName = adminName;
    },
    SET_REFRESHTOKEN: (state, refreshtoken) => {
        state.refreshToken = refreshtoken;
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    SET_TOKENTYPE: (state, type) => {
        state.tokenType = type;
    },
    SET_USER_INFO: (state, payload) => {
        state.userInfo = payload;
    }
};
// 提交mutations
const actions = {
    // user login
    login({ commit, dispatch }, userInfo) {
        const { AdminName, AdminPassword } = userInfo;
        return new Promise((resolve, reject) => {
            // username: AdminName.trim(),
            // password: AdminPassword
            login({
                    username: AdminName.trim(),
                    password: AdminPassword
                })
                .then(response => {
                    console.log(response);
                    const { data } = response;
                    commit("SET_TOKEN", data.token);
                    commit("SET_REFRESHTOKEN", data.refresh_token);
                    commit("SET_TOKENTYPE", data.token_type);
                    commit("SET_ADMINNAME", AdminName);
                    // commit('SET_UID', data.params.uid)
                    setUid(data.id);
                    setToken(data.token);
                    setTokenType(data.token_type);
                    setRefreshToken(data.refresh_token);
                    /*
                     * setCookie('userInfo', { name: AdminName })
                     * console.log(data)
                     */
                    // dispatch('getUserInfo', data.params.uid)
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // 扫码登录
    loginByScanCode({ commit, dispatch }, data) {
        return new Promise((resolve, reject) => {
            try {
                commit("SET_TOKEN", data.token);
                commit("SET_REFRESHTOKEN", data.refresh_token);
                commit("SET_TOKENTYPE", "bearer");
                // commit('SET_ADMINNAME', AdminName)
                commit("SET_UID", data.uid);
                setUid(data.uid);
                setToken(data.token);
                setTokenType("bearer");
                setRefreshToken(data.refresh_token);
                /*
                 * setCookie('userInfo', { name: AdminName })
                 * console.log(data)
                 */
                dispatch("getUserInfo", data.uid);
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    },
    async getUserInfo({ commit }, adminId) {
        let res = await getAccountInfo(adminId);
        if (res.code === 0) {
            setCookie("userInfo", res.data);
            commit("SET_USER_INFO", res.data);
            commit("SET_ADMINNAME", res.data.AdminName);
        }
    },
    // 无痛刷新token
    refreshToken({ commit }, data) {
        commit("SET_TOKEN", data.token);
        commit("SET_TOKENTYPE", data.token_type);
        commit("SET_UID", data.params.uid);
        setUid(data.params.uid);
        setToken(data.token);
        setTokenType(data.token_type);
    },
    // get user info
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            // getInfo(state.token).then(response => {
            const data = {
                roles: ["admin"],
                introduction: "I am a super administrator",
                avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
                name: "Super Admin"
            };
            if (!data) {
                reject("Verification failed, please Login again.");
            }
            const { roles, name, avatar, introduction } = data;
            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
                reject("getInfo: roles must be a non-null array!");
            }
            commit("SET_ROLES", roles);
            commit("SET_NAME", name);
            commit("SET_AVATAR", avatar);
            commit("SET_INTRODUCTION", introduction);
            // commit('SET_ADMINNAME', response.data.AdminName) TODO:等b端用户信息接口出来，再完善
            resolve(data);
            /*
             * })
             *   .catch(error => {
             *     reject(error)
             *   })
             */
        });
    },

    // user logout
    logout({ commit, state, dispatch }, uid) {
        return new Promise((resolve, reject) => {
            logout({ id: uid })
                .then(() => {
                    commit("SET_TOKEN", "");
                    commit("SET_ROLES", []);
                    commit("SET_REFRESHTOKEN", "");
                    commit("SET_TOKENTYPE", "");
                    commit("SET_ADMINNAME", "");
                    commit("SET_UID", "");
                    removeUid();
                    removeToken();
                    // resetRouter();
                    removeTokenType();
                    removeRefreshToken();
                    //   dispatch("tagsView/delAllViews", null, { root: true });
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            commit("SET_REFRESHTOKEN", "");
            commit("SET_TOKENTYPE", "");
            commit("SET_ADMINNAME", "");
            commit("SET_UID", "");
            removeUid();
            removeToken();
            resetRouter();
            removeTokenType();
            removeRefreshToken();
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
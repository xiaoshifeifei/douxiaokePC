import request from "@/utils/request";
/*
 * 客房服务物品维护
 * 列表
 */
export function serviceGoodsCategoryIndex(params) {
    return request({
        url: "service_goods_category/index",
        method: "get",
        params
    });
}
// 新增类别
export function serviceGoodsCategoryCreate(data) {
    return request({
        url: "service_goods_category/create",
        method: "post",
        data
    });
}
// 查看
export function serviceGoodsCategoryShow(params) {
    return request({
        url: "service_goods_category/show",
        method: "get",
        params
    });
}
// 更新
export function serviceGoodsCategoryUpdate(data) {
    return request({
        url: "service_goods_category/update",
        method: "post",
        data
    });
}
// 删除 批量删除
export function serviceGoodsCategoryDelete(data) {
    return request({
        url: "service_goods_category/delete",
        method: "post",
        data
    });
}
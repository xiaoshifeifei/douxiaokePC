const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    isTokenOverdue: state => state.user.IsTokenOverdue,
    tokenType: state => state.user.tokenType,
    adminName: state => state.user.adminName,
    refreshToken: state => state.user.refreshToken,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    // eslint-disable-next-line camelcase
    permission_routes: state => state.permission.routes
        // errorLogs: state => state.errorLog.logs
};
export default getters;
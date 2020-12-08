module.exports = {
    title: '知了科技',

    /**
     * @type {boolean} true | false
     * @description Whether show the settings right-panel
     */
    showSettings: true,

    /**
     * @type {boolean} true | false
     * @description Whether need tagsView
     */
    tagsView: true,

    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: true,

    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    sidebarLogo: true,

    /**
     * @type {string | array} 'production' | ['production', 'development']
     * @description Need show err logs component.
     * The default is only used in the production env
     * If you want to also use it in dev, you can pass ['production', 'development']
     */
    errorLog: 'production',
    authentication: 'all' // intelligence和all两种方式，前者后端权限只控制roles不控制view文件的import（前后端配合，减轻后端工作量），all方式完全交给后端前端只负责加载
}
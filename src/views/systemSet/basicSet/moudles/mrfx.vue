<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-button type="" size="small" @click="createAdds">返回</el-button>
    </el-row>
    <el-row type="flex" justify="flex-end">
      <el-button
        type="primary"
        icon="el-icon-plus"
        size="small"
        class="addcli"
        @click="createAdd"
        >添加</el-button
      ></el-row
    >
    <el-card>
      <el-table
        v-loading="app.tableLoading"
        :data="app.tableData.list"
        style="width:100%"
        max-height="700"
        border
        :height="windowHeight"
      >
        <el-table-column
          type="index"
          label="序号"
          align="center"
          width="50"
        ></el-table-column>

        <el-table-column
          prop="project_name"
          label="APP名称"
          align="center"
          :min-width="100"
        >
        </el-table-column>
        <el-table-column
          prop="operator"
          label="默认佣金值"
          align="center"
          :min-width="100"
        >
          <template slot-scope="scope">
            <!-- {{scope.row.config_list}} -->
            <div v-for="(item, index) in scope.row.config_list" :key="index">
              {{ item.distribute_name }} {{ item.value }}￥
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEditApp(scope.row.project_id)"
              size="mini"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="total,sizes, prev, pager, next, jumper"
        @current-change="getVersionLists"
        @size-change="handleSizeChange"
        :current-page="app.tableData.page"
        :page-size="app.tableData.limit"
        :total="app.tableData.totalItem"
        :page-sizes="[10, 20, 50, 100]"
      ></el-pagination>
    </el-card>

    <el-dialog
      :visible="showDetail"
      :title="isCreate"
      :before-close="resetDetail"
      :close-on-click-modal="false"
    >
      <el-form
        ref="detail"
        :model="app.detail"
        :rules="app.rules"
        label-width="100px"
        label-position="left"
        style="width:90%;margin:auto"
      >
        <el-form-item label="消息标题" prop="title">
          <el-input
            v-model="app.detail.type_text"
            :disabled="isCreate == '查看'"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="resetDetail">取消</el-button>
        <el-button
          v-loading="app.saveLoading"
          type="primary"
          @click="onSaveDetail"
          >保存</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      :title="qudaoTitle"
      :visible.sync="qudaoLook"
      :before-close="isShowClick"
      width="60%"
      :show-close="true"
    >
      <div class="formStyle">
        <el-form
          :model="detailsInfo"
          :rules="roleRules"
          ref="detailsInfo"
          label-position="right"
          :hide-required-asterisk="false"
          label-width="140px"
        >
          <!-- <el-form-item
              label="渠道商"
              prop="team_name"
              hasFeedback
            >
              <el-form-item
                v-if="qudaoTitle == '编辑' || qudaoTitle == '详情'"
                prop="projectName"
              >
                <el-input
                  :disabled="qudaoTitle == '编辑' || qudaoTitle == '详情'"
                  maxlength="20"
                  v-model="project_name"
                  type="text"
                ></el-input>
              </el-form-item>

              <el-select v-else v-model="team_id" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.team_id"
                  :label="item.team_name"
                  :value="item.team_id"
                >
                </el-option>
              </el-select>
            </el-form-item> -->

          <el-form-item label="选择APP" prop="project_name" hasFeedback>
            <el-form-item
              v-if="qudaoTitle == '编辑' || qudaoTitle == '详情'"
              prop="projectName"
            >
              <el-input
                :disabled="qudaoTitle == '编辑' || qudaoTitle == '详情'"
                maxlength="20"
                v-model="team_name"
                type="text"
              ></el-input>
            </el-form-item>

            <el-select
              class="pad"
              v-else
              v-model="project_id"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options1"
                :key="item.project_id"
                :label="item.project_name"
                :value="item.project_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div>
          <el-form
            label-position="right"
            :hide-required-asterisk="false"
            label-width="120px"
          >
            <div class="divbox">
              <div class="box-l">
                渠道佣金
              </div>
              <div class="box-r" v-for="(item, index) in qdArray" :key="index">
                <div class="cha" @click="deleItem(item)">×</div>
                <el-form-item label="订单类型" prop="order_type_id">
                  <el-form-item v-if="qudaoTitle == '编辑'" prop="projectName">
                    <el-input
                      :disabled="qudaoTitle == '编辑'"
                      maxlength="20"
                      v-model="item.order_type_name"
                      type="text"
                    ></el-input>
                  </el-form-item>

                  <el-select
                    v-else
                    v-model="item.order_type_id"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options3"
                      :key="item.order_type_id"
                      :label="item.order_type_name"
                      :value="item.order_type_id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="订单标题" prop="projectName">
                  <el-input
                    :disabled="qudaoTitle == '详情'"
                    show-word-limit
                    maxlength="20"
                    v-model="item.distribute_name"
                    type="text"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="渠道佣金"
                  prop="projectValue"
                  class="spanman"
                >
                  <el-input
                    v-model="item.value"
                    :disabled="qudaoTitle == '详情'"
                  ></el-input
                  ><span class="spanman1">￥</span>
                </el-form-item>
                <el-form-item
                  prop="projectValue"
                  v-if="qudaoTitle == '编辑'"
                  class="spanman"
                >
                  <el-button
                    style="margin-left:80%"
                    type="primary"
                    v-if="qudaoTitle == '编辑'"
                    @click="upd(item.id, index)"
                    >确认编辑</el-button
                  >
                  <div style="clear:both"></div>
                </el-form-item>
              </div>

              <div class="box-r" v-for="(item, index) in qdArray1" :key="index">
                <div class="cha" @click="deleItem(item)">×</div>
                <el-form-item label="订单类型" prop="order_type_id">
                  <el-select v-model="item.order_type_id" placeholder="请选择">
                    <el-option
                      v-for="item in options4"
                      :key="item.order_type_id"
                      :label="item.order_type_name"
                      :value="item.order_type_id"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="订单标题" prop="projectName">
                  <el-input
                    :disabled="qudaoTitle == '详情'"
                    show-word-limit
                    maxlength="20"
                    v-model="item.distribute_name"
                    type="text"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="渠道佣金"
                  prop="projectValue"
                  class="spanman"
                >
                  <el-input
                    v-model="item.value"
                    :disabled="qudaoTitle == '详情'"
                  ></el-input
                  ><span class="spanman1">￥</span>
                </el-form-item>
                <el-form-item
                  prop="projectValue"
                  v-if="qudaoTitle == '编辑'"
                  class="spanman"
                >
                  <el-button
                    style="margin-left:80%"
                    type="primary"
                    v-if="qudaoTitle != '详情'"
                    @click="upd(item.id, index, '5')"
                    >确认添加</el-button
                  >
                  <div style="clear:both"></div>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <el-button type="primary" size="mini" class="btnAdd" @click="addP"
            >添加</el-button
          >
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowClick">取消</el-button>
        <el-button type="primary" v-if="qudaoTitle != '编辑'" @click="upd"
          >确认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import {
  sellVipList, //获取商家会员详情
  rellVipRead, //商家会员详情
  sellVipUpdate, //修改会员详情
  sellVipSave, //会员添加
  rellVipDelete, //会员删除
  stoConfigCategory, //获取协议列表
  stoTreatyRead, //获取协议列表详情
  stoDistribute, //平台默认分佣配置列表
  stoDistributeConfig, //项目数据获取
  stOrderConfig, //订单类型获取
  storeBatch, //订单类型获取
  stOrderRead, //平台默认分佣配置详情
  storeUpdate, //平台默认分销配置更新
  saveUpdateService, //平台默认分佣配置添加
  saveUpDelete //平台默认分销配置删除
} from "@/api/listvip";
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      team_name: "",
      qudaoLook: false,
      qudaoTitle: "",
      value1: "", //日期
      uploadHeaders: {
        Authorization: getToken()
      },
      columns: [
        { prop: "project_name", label: "APP名称", width: 100 },
        { prop: "operator", label: "默认佣金值", width: 100 }
      ],
      detailsInfo: {},
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      team_id: "",
      bianji: "0",
      options1: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      project_id: "",

      options3: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      myIDParams:'',
      options4: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      item: {
        order_type_id: "",
        value: "",
        distribute_name: ""
      },
      qdArray: [
        {
          order_type_id: "",
          value: "",
          type: "1",
          distribute_name: "",
          project_id: this.project_id
        }
      ],
      qdArray1: [],
      roleRules: {
        linkman: [
          { required: true, message: "请输入联系人" },
          { min: 3, max: 500, message: "长度在 3 到 500 个字符" }
        ],
        mobile: [{ required: true, trigger: "blur", validator: validPhone }]
      },
      app: {
        tableData: {
          list: [],
          page: 1,
          totalItem: 0,
          limit: 10
        },
        detail: {
          treaty_id: "",
          type: "",
          type_text: "",
          status: "",
          content: "",
          operator: "",
          create_time: "2",
          id: ""
        },
        loading: false,
        rules: {
          // vip_type: [
          //   { required: true, message: "请选择VIP类型", trigger: "change" }
          // ],
          poster_count: [
            {
              required: true,
              message: "请输入每月海报制作数",
              trigger: "change"
            }
          ],
          spread_count: [
            { required: true, message: "请输入每月可传播次数", trigger: "blur" }
          ],
          name: [{ required: true, message: "会员名称", trigger: "blur" }],
          price: [{ required: true, message: "价格", trigger: "blur" }]
        },
        tableLoading: false,
        saveLoading: false
      },
      showDetail: false,
      isCreate: "", // true 创建 false 编辑
      keywords: "",
      fileList: [] //此数组中存入所有提交的文档信息
    };
  },
  created() {
    this.windowHeight = window.innerHeight - 300 + "px";
  },
  mounted() {
    this.getVersionList(1);
  },
  methods: {
    createAdds() {
      this.$emit("isN", "1");
    },
    async upd(id, index, params) {
      const qdArrayPara = this.qdArray.concat(this.qdArray1);
      console.log("qdArrayPara", qdArrayPara);

      let ary2 = [];
      for (let val of qdArrayPara) {
        if (!ary2.some(item => item.order_type_id == val.order_type_id)) {
          ary2.push(val);
        }
      }
      if (params == "5") {
        let res = await saveUpdateService({
          project_id: this.qdArray1[index].project_id,
          order_type_id: this.qdArray1[index].order_type_id,
          type: 1,
          value: this.qdArray1[index].value,
          distribute_name: this.qdArray1[index].distribute_name
        });
        if (res.code == 0) {
          this.$message.success("编辑成功");
          this.getVersionList(1).then(async () => {
            console.log(this.myParamsId);
            console.log(this.myParamsIdTeam_id);
            let res = await stOrderRead({
              project_id: this.myIDParams
            });
            this.team_name = res.data[0].project_name;
            this.qdArray = res.data;
            this.project_id = res.data[0].project_id;
            this.options1 = res.data;
            this.options3 = res.data;
            this.qudaoLook = true;
          });
          this.qudaoLook = true;
          this.qdArray1 =[]
        } else {
          this.$message(res.msg);
        }
        return;
      }
      // this.qdArray.filter((item,index,self) => {
      //   return self.indexOf(item)===index;
      // })
      console.log("this.qdArray", this.qdArray);
      if (this.qudaoTitle == "添加默认佣金值") {
        if (this.project_id) {
          ary2.map(item => {
            return (item.project_id = this.project_id);
          });
        }
        let res = await storeBatch(ary2);
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.qudaoLook = false;
          this.qudaoq = false;
          this.getVersionList(1);
        } else {
          this.$message.error("新增失败");
        }
      } else if (this.qudaoTitle == "编辑") {
        console.log("id", id);
        console.log("index", ary2[index]);
        let res = await storeUpdate({
          id: id,
          type: 1,
          value: ary2[index].value,
          distribute_name: ary2[index].distribute_name
        });
        if (res.code == 0) {
          this.$message.success("编辑成功");
          // this.getVersionList(1);
          this.qudaoLook = true;
        } else {
          this.$message(res.msg);
        }
      }
    },
    // 新增
    async createAdd() {
      // 项目数据获取
      let res1 = await stoDistributeConfig();
      console.log("res1", res1);
      if (res1.code == 0) {
        this.options1 = res1.data.rows;
      } else {
        this.$message.error("项目数据获取失败");
      }

      // 订单类型获取
      let res2 = await stOrderConfig();
      console.log("res2", res2);
      if (res2.code == 0) {
        this.options3 = res2.data.rows;
      } else {
        this.$message.error("订单类型获取失败");
      }

      this.qudaoLook = true;
      this.qudaoTitle = "添加默认佣金值";
    },
    // 新增确认
    async onSave() {
      console.log("this.item", this.qdArray);
      const data = {
        team_id: this.team_id,
        project_id: this.project_id,
        order_type_id: this.qdArray[0].order_type_id,
        type: "1",
        value: this.qdArray[0].value,
        name: this.qdArray[0].distribute_name
      };
      let res = await updateSaveManage(data);
      if (res.code == 0) {
        this.$message.success(res.msg);
        this.qudaoLook = false;
        this.qudaoq = false;
        this.getVersionList(1);
      } else {
        this.$message.error("新增失败");
      }
    },
    // 新增取消
    isShowClick() {
      console.log("this.page", this.page);
      this.team_id = "";
      this.project_id = "";
      this.order_type_id = "";
      this.projectValue = "";
      this.projectName = "";
      this.qudaoLook = false;
      this.qdArray = [
        {
          order_type_id: "",
          value: "",
          type: "1",
          distribute_name: "",
          project_id: ""
        }
      ];
      this.qdArray1 = [];
      this.getVersionList(1);
    },
    // 动态添加平台释放佣金奖励
    async addP() {
      this.bianji = "1";
      // 订单类型获取
      let res2 = await stOrderConfig();
      console.log("res2", res2);
      if (res2.code == 0) {
        this.options4 = res2.data.rows;
      } else {
        this.$message.error("获取推广APP失败");
      }
      this.qdArray1.push({
        order_type_id: "",
        value: "",
        type: "1",
        distribute_name: "",
        project_id: this.project_id
      });
    },

    getVersionLists(val) {
      // console.log(`每21111页 ${val} 条`)
      this.getVersionList(val);
    },
    handleSizeChange(val) {
      //  console.log(`每页 ${val} 条`)
      this.app.tableData.limit = val;
      this.getVersionList(1);
    },
    selectFile(file) {},
    beyondFile() {
      if (this.fileList.length > 0) {
        this.$message.error("只能上传一个app安装包,请删除后重新上传");
        return false;
      }
    },
    async handleDelete(id) {
      let res = await rellVipDelete(id);
      if (res.code == 0) {
        this.$message.error("删除成功");
        this.getVersionList();
      }
    },
    beforeUpload(file) {
      this.fileList.push(file);
      this.app.loading = true;
    },
    handlesuccess(response, file, fileList) {
      //response即为后台返回的全部内容
      if (response.code == 0) {
        this.app.loading = false;
        this.app.detail.cdnurl = response.data.url;
      } else {
        this.$refs.upload.clearFiles();
      }
    },
    onRmove() {
      this.app.detail.cdnurl = "";
      this.fileList = [];
      this.$refs.upload.clearFiles();
    },
    async getVersionList(page) {
      this.app.tableLoading = true;
      this.app.tableData.page = page;
      try {
        let res = await stoDistribute(this.app.tableData);
        if (res.code === 0) {
          this.app.tableData.list = res.data.rows;
          this.app.tableData.pageNo = res.data.current_page;
          this.app.tableData.totalItem = res.data.total;
        } else {
          this.$message.error("获取列表失败");
        }
      } catch (error) {}
      this.app.tableLoading = false;
    },
    async deleItem(item) {
      this.qdArray = this.qdArray.filter(item1 => {
        return item1.order_type_id != item.order_type_id;
      });
      this.qdArray1 = this.qdArray1.filter(item1 => {
        return item1.order_type_id != item.order_type_id;
      });
      let res = await saveUpDelete({
        id: item.id
      });
      if (res.code == 0) {
        this.$message.success("删除成功");
        // this.getVersionList(1);
        this.qudaoLook = true;
      } else {
        this.$message(res.msg);
      }
    },
    // 查看
    async handleEditApp(id) {
      this.myIDParams = id
      this.qudaoTitle = "编辑";
      this.app.tableLoading = true;
      try {
        let res = await stOrderRead({
          project_id: id
        });
        this.team_name = res.data[0].project_name;
        this.qdArray = res.data;
        this.project_id = res.data[0].project_id;
        this.options1 = res.data;
        this.options3 = res.data;
        this.qudaoLook = true;
      } catch (error) {}
      this.app.tableLoading = false;
    },
    // 编辑
    async handleApp(id) {
      this.isCreate = "编辑";
      this.app.tableLoading = true;
      this.app.detail.id = id;
      try {
        let res = await rellVipRead(id);
        this.app.detail.vip_type = res.data.vip_type;
        this.app.detail.spread_count = res.data.spread_count;
        this.app.detail.poster_count = res.data.poster_count;
        this.app.detail.name = res.data.name;
        this.app.detail.price = res.data.price;
        this.app.detail.upgradedesc = res.data.remark;
        this.app.detail.jilu = res.data.memo;
        this.showDetail = true;
      } catch (error) {}
      this.app.tableLoading = false;
    },
    async uploadApp(file) {
      // console.log(file);
      let formData = new FormData();
      formData.append("file", file.file);
      this.app.loading = true;
      try {
        let res = await reqUploadFile(formData);

        // if (res.cdnUrl) {
        //   this.app.detail.cdnurl = res.cdnUrl;
        //   this.app.detail.saveurl = res.saveUrl;
        // } else {
        //   this.$refs.upload.clearFiles();
        // }
      } catch (error) {
        console.log(error);
        // this.$refs.upload.clearFiles();
      }
      this.app.loading = false;
    },
    resetDetail() {
      this.app.detail = {
        radio: "2",
        spread_count: "",
        poster_count: "",
        price: "",
        name: "",

        versionnotype: null,
        mustupdate: null,
        cdnurl: "",
        isuse: false,
        savepath: "",
        saveurl: "",
        upgradedesc: "",
        versionno: "",
        jilu: "",
        url: ""
      };
      this.value1 = "";
      this.$refs.detail.resetFields();
      this.showDetail = false;
    },
    onSaveDetail() {
      this.$refs.detail.validate(async valid => {
        if (!valid) return;
        let data = {
          vip_type: this.app.detail.radio, //VIP类型
          spread_count: this.app.detail.spread_count, //传播数量
          poster_count: this.app.detail.poster_count, //传播数量
          name: this.app.detail.name, //会员名称
          price: this.app.detail.price //价格
        };
        //  data.exp_time = dataPa
        if (this.isCreate == "编辑") {
          data.sellvip_id = this.app.detail.id;
        }
        this.app.saveLoading = true;
        try {
          if (this.isCreate == "新增") {
            await sellVipSave(data);
            this.$message.success("添加成功");
          } else if (this.isCreate == "编辑") {
            await sellVipUpdate(data);
            this.$message.success("编辑成功");
          }
          this.resetDetail();
          this.getVersionList(1);
        } catch (error) {
          console.log(error);
        }
        this.app.saveLoading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .cell-label {
    width: 100px;
  }
  .el-input {
    max-width: 300px;
    margin-right: 20px;
  }
}
.addcli {
  margin-left: 100%;

  transform: translateX(-100%);
  margin-bottom: 20px;
}
.divbox {
  position: relative;
  width: 100%;
  .box-l {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    width: 150px;
    height: 50px;
    padding-right: 20px;
    line-height: 50px;
    font-weight: 700;
    text-align: right;
    border-right: transparent;
  }
  .box-r {
    // position: absolute;
    // top: 0;
    // left: 50%;
    // transform: translateX(-50%);
    margin-top: 20px;
    margin-left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    width: calc(80% - 150px);
    text-align: left;
    vertical-align: top;
    border: 1px solid#CCCCCC;
    padding: 20px 50px;
    .box1 {
      width: 100%;
      padding-top: 5px;
    }
  }
}
.btnAdd {
  margin-left: 190px;
  margin-top: 20px;
}
.spanman {
  position: relative;
  .spanman1 {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.zsh {
  margin: 20px 20px 40px 20px;
}
.btnq {
  margin-left: 30%;
}
.pad {
  padding-left: 40px;
}
.cha {
  margin-left: 100%;
  font-size: 30px;
  cursor: pointer;
}
</style>

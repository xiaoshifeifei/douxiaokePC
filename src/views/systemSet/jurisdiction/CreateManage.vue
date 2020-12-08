<template>
  <div class="main fw700">
    <div class="base_title">所属角色：高级管理员</div>
    <div class="base_form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" :hide-required-asterisk="false" label-width="120px">
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="psw">
          <el-input v-model="ruleForm.psw" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="check_psw">
          <el-input v-model="ruleForm.check_psw" placeholder="请确认密码"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="r_name">
          <el-input v-model="ruleForm.r_name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传头像" prop="avatar">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl">
          </el-dialog>
       </el-form-item>
        <el-form-item label="是否是推广人" prop="promoter">
          <el-radio-group v-model="ruleForm.promoter">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="QQ" prop="QQ">
          <el-input v-model="ruleForm.QQ" placeholder="请输入QQ号"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idCard">
          <el-input v-model="ruleForm.idCard" placeholder="请输入身份证"></el-input>
        </el-form-item>
        <el-form-item label="出生年月" prop="birth">
          <el-input v-model="ruleForm.birth" placeholder="请输入出生年月"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="ruleForm.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="level">
          <el-select v-model="ruleForm.level" placeholder="----请选择----">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="毕业院校" prop="school">
          <el-input v-model="ruleForm.QQ" placeholder="请输入毕业院校"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm()">取消</el-button>
          <el-button type="primary" @click="onSubmit()">创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { CreateManagement } from '@/api/jurisdiction'
export default {
  data() {
    return {
      dialogImageUrl: [],
      dialogVisible: false,
      ruleForm: {
        account: '',
        psw: '',
        // eslint-disable-next-line camelcase
        check_psw: '',
        // eslint-disable-next-line camelcase
        r_name: '',
        sex: 0,
        promoter: 0,
        QQ: '',
        idCard: '',
        birth: '',
        addr: '',
        level: '',
        school: ''
      },
      rules: {
        account: [
          { required: true,
            message: '请输入酒店名称',
            trigger: 'blur' },
          { min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur' }
        ],
        psw: [
          { required: true,
            message: '请输入密码',
            trigger: 'blur' },
          { min: 3,
            max: 5,
            message: '长度在 6 到 8个字符',
            trigger: 'blur' }
        ],
        // eslint-disable-next-line camelcase
        check_psw: [
          { required: true,
            message: '请确认密码',
            trigger: 'blur' },
          { min: 3,
            max: 5,
            message: '长度在 6 到 8 个字符',
            trigger: 'blur' }
        ]
      },
      levelOptions: [
        {
          value: '0',
          label: '----请选择----'
        },
        {
          value: '1',
          label: '小学'
        },
        {
          value: '2',
          label: '初中'
        },
        {
          value: '3',
          label: '高中'
        },
        {
          value: '4',
          label: '大学'
        },
        {
          value: '5',
          label: '硕士'
        },
        {
          value: '6',
          label: '博士'
        }
      ]
    }
  }
}
</script>
<style>
  .el-upload--picture-card{
    width: 108px;
    height: 108px;
    line-height: 108px;
  }
</style>
<style lang="less" scoped>
  .el-form-item{
    margin-bottom: 12px ;
  }
  .base_title{
    text-align: center;
    line-height: 60px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .base_form{
    width:35%;
    margin: 0 auto;
  }
</style>

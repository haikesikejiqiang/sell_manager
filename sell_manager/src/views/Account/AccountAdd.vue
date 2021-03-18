<template>
  <el-card>
    <template #header>
      <span>账号添加</span>
    </template>
    <el-form
      :model="accountForm"
      status-icon
      :rules="rules"
      ref="accountForm"
      label-width="100px"
    >
      <el-form-item label="账号" prop="account">
        <el-input
          type="text"
          v-model="accountForm.account"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="accountForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户组" prop="role">
        <el-select placeholder="请选择" v-model="accountForm.role">
          <el-option label="普通管理员" value="普通管理员"> </el-option>
          <el-option label="超级管理员" value="超级管理员"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('accountForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('accountForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { valiAccount, valiPass, checkRole } from '../../utils/validate'
import { add } from '../../api/user'

export default {
  data() {
    return {
      accountForm: {
        account: '',
        pass: '',
        role: ''
      },
      rules: {
        account: [{ validator: valiAccount, trigger: 'blur' }],
        pass: [{ validator: valiPass, trigger: 'blur' }],
        role: [{ validator: checkRole, trigger: 'change' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { code, msg } = await add({
            account: this.accountForm.account,
            password: this.accountForm.pass,
            userGroup: this.accountForm.role
          })
          if (code === 0) {
            console.log(msg)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 300px;
}
.el-input {
  width: 193px !important;
}
/deep/ .el-input.el-input--suffix input {
  width: 193px !important;
}
</style>

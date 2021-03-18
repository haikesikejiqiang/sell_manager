<template>
  <el-card>
    <template #header>
      <span>修改密码</span>
    </template>
    <el-form
      :model="ResetPwdForm"
      status-icon
      :rules="rules"
      ref="ResetPwdForm"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="pass" :flag="flag">
        <el-input
          type="text"
          v-model="ResetPwdForm.pass"
          autocomplete="off"
          @blur="ckPsd"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPass">
        <el-input
          type="text"
          v-model="ResetPwdForm.newPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="checkPass">
        <el-input
          type="text"
          v-model="ResetPwdForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm('ResetPwdForm')"
          v-preventReClick
          >提交</el-button
        >
        <el-button @click="resetForm('ResetPwdForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { valinewPass, valiCheck, successMsg } from '../../utils/validate'
import { checkoldpwd, editpwd } from '../../api/user'
import local from '../../utils/local'
export default {
  data() {
    return {
      ResetPwdForm: {
        pass: '',
        newPass: '',
        checkPass: ''
      },
      // { validator: valiPass, trigger: 'blur' }
      flag: false,
      rules: {
        pass: [],
        newPass: [{ validator: valinewPass(this), trigger: 'blur' }],
        checkPass: [{ validator: valiCheck(this), trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        console.log(valid)
        if (valid && this.flag) {
          const { msg } = await editpwd({
            newPwd: this.ResetPwdForm.checkPass
          })
          successMsg(this, msg, 'success')
          local.cls()
          this.$router.push('/login')
        } else {
          successMsg(this, '检测密码可能错误', 'error')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async ckPsd() {
      const { code } = await checkoldpwd({
        oldPwd: this.ResetPwdForm.pass
      })
      if (code === '00') {
        this.flag = true
      } else {
        this.flag = false
      }
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

<template>
  <div class="login-box">
    <div class="login-panel">
      <h3>超级管理系统</h3>
      <el-form
        :model="LoginForm"
        :rules="rules"
        ref="LoginBox"
        label-width="0px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item prop="account">
          <el-input
            type="text"
            v-model="LoginForm.account"
            autocomplete="off"
            prefix-icon="iconfont icon-yonghu"
            class="input-bg"
            placeholder="Username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :type="flag ? 'text' : 'password'"
            v-model="LoginForm.password"
            autocomplete="off"
            prefix-icon="iconfont icon-mima"
            class="input-bg"
            placeholder="Password"
            @keydown.native.13="submitForm('LoginBox')"
            v-preventReClick
          >
            <template #suffix>
              <i
                class="iconfont"
                :class="flag ? 'icon-eyes-' : 'icon-eyes'"
                @click="flag = !flag"
              ></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('LoginBox')"
            :loading="sendFlag"
            v-preventReClick
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../../api/login'
import local from '../../utils/local'
import { setRouter } from '../../router/index'

export default {
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      LoginForm: {
        account: 'admin',
        password: '666'
      },
      rules: {
        account: [{ validator: validateAccount, trigger: 'blur' }],
        password: [{ validator: validatePass, trigger: 'blur' }]
      },
      flag: false,
      sendFlag: false
    }
  },
  methods: {
    throttle(fn, delay = 2000) {
      let flag = true
      return function(...args) {
        if (!flag) return
        flag = false
        setTimeout(() => {
          fn.apply(this, args)
          flag = true
        }, delay)
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { code, token, msg, role } = await login(this.LoginForm)
          if (code === 0) {
            this.$message({
              message: msg,
              type: 'success'
            })
            local.set('token', token)
            local.set('role', role)
            setRouter()
            this.$router.push('/')
          } else {
            this.$message.error(msg)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  font-size: 26px;
  color: #eee;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}

/deep/ input.el-input__inner {
  box-sizing: border-box;
  padding: 0 41px;
  height: 50px;
  background: #283443;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 14px;
  color: #ffffff;
  outline: none;
}

/deep/ input.el-input__inner {
  border-color: rgba(255, 255, 255, 0.1) !important;
  margin: 5px 0;
}

/deep/ input.el-input__inner::placeholder {
  color: #c0c4b2;
  font-size: 14px;
}

/deep/ .el-input__prefix {
  left: 15px;
  top: 15px;
  height: 0;
}
/deep/ .el-input__suffix {
  right: 16px;
  top: 16px;
  height: 0;
  cursor: pointer;
}

button {
  color: #ffffff;
  background-color: #1890ff;
  border-color: #1890ff;
  width: 100%;
  height: 36px;
  margin: 5px 0;
}

.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2d3a4b;
  width: 100%;
  height: 100%;
}

.login-panel {
  width: 508px;
  box-sizing: border-box;
  padding: 0 40px;
}

// .login-box {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   background: url(../../assets/images/bg.jpg);
//   // background: #2d3a4b;
//   .login-panel {
//     width: 340px;
//     h3 {
//       margin-bottom: 10px;
//       text-align: center;
//       font-size: 18px;
//       font-weight: 700;
//       letter-spacing: 2px;
//       padding: 10px 0;
//       color: #fff;
//     }
//     .el-button {
//       width: 100%;
//     }
//     /deep/.input-bg input {
//       background: transparent;
//     }
//   }
// }
</style>

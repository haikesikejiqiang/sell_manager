import Vue from 'vue'

// 账号验证
var uPattern = /^([a-zA-Z0-9_-]|[\u4e00-\u9fa5]){4,8}$/
export var valiAccount = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else if (!uPattern.test(value)) {
    callback(new Error('4-16位字母数字下划线和减号'))
  } else {
    callback()
  }
}

// 密码验证
var PassPattern = /^[a-zA-Z0-9_]{3,12}$/
export var valiPass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!PassPattern.test(value)) {
    callback(new Error('3-12位下划线字母数字'))
  } else {
    callback()
  }
}

// 用户组验证
export var checkRole = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('用户名角色不能为空'))
  } else {
    callback()
  }
}

// 新密码验证
export var valinewPass = function(obj) {
  return (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      if (obj.ResetPwdForm.checkPass !== '') {
        obj.$refs.ResetPwdForm.validateField('checkPass')
      }
      callback()
    }
  }
}

// 确认密码验证
export var valiCheck = function(obj) {
  return (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== obj.ResetPwdForm.newPass) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }
}

// 防止多次点击按钮发送弹窗
export const preventReClick = Vue.directive('preventReClick', {
  inserted: function(el, binding) {
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, binding.value || 3000)
      }
    })
  }
})

// 弹窗消息
const successMsg = function(obj, msg, type) {
  return obj.$message({
    message: msg,
    type: type
  })
}

export { successMsg }

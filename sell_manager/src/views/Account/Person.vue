<template>
  <el-card>
    <template #header>
      <h4>个人中心</h4>
    </template>
    <p>{{ userData.id }}</p>
    <p>{{ userData.account }}</p>
    <p>{{ userData.userGroup }}</p>
    <p>{{ userData.ctime | timeDate }}</p>
    <el-upload
      class="avatar-uploader"
      action="http://localhost:5000/users/avatar_upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button type="primary" @click="uploadSave" v-preventReClick
      >立即保存</el-button
    >
  </el-card>
</template>
<style lang="less" scoped>
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 88px;
  height: 88px;
  line-height: 88px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>

<script>
import local from '../../utils/local'
import { avataredit } from '../../api/user'
import { successMsg } from '../../utils/validate'
export default {
  data() {
    return {
      userData: {},
      imageUrl: '',
      intermediate: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.intermediate = res.imgUrl
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    async uploadSave() {
      const { msg, code } = await avataredit({
        imgUrl: this.intermediate
      })
      if (code === 0) {
        this.$Bus.$emit('amountUrl')
        successMsg(this, msg, 'success')
      } else {
        successMsg(this, '未知错误', 'error')
      }
    }
  },
  created() {
    const data = local.get('userData')
    this.userData = JSON.parse(data)
  },
  watch: {
    imageUrl: {
      handler() {
        console.log(this.intermediate)
      },
      immediate: true
    }
  }
}
</script>

<style scoped></style>

<template>
  <el-card>
    <template #header>
      <h4>订单管理</h4>
    </template>
    <el-form
      :model="shopForm"
      ref="shopForm"
      label-width="100px"
      class="demo-shopForm"
      size="mini"
    >
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="shopForm.name"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告" prop="bulletin">
        <el-input type="textarea" v-model="shopForm.bulletin"></el-input>
      </el-form-item>

      <!-- 单 -->

      <el-form-item label="店铺头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/shop/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="shopForm.avatar"
            :src="baseUrl + shopForm.avatar"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <!-- 多 -->

      <el-form-item label="店铺图片" prop="pics">
        <el-upload
          action="http://127.0.0.1:5000/shop/upload"
          list-type="picture-card"
          :file-list="picList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlePicsSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="配送费" prop="deliveryPrice">
        <el-input v-model="shopForm.deliveryPrice"></el-input>
      </el-form-item>
      <el-form-item label="配送时间" prop="deliveryTime">
        <el-input v-model="shopForm.deliveryTime"></el-input>
      </el-form-item>
      <el-form-item label="配送描述" prop="description">
        <el-input v-model="shopForm.description"></el-input>
      </el-form-item>
      <el-form-item label="店铺评分" prop="score">
        <el-input v-model="shopForm.score"></el-input>
      </el-form-item>
      <el-form-item label="销量" prop="sellCount">
        <el-input v-model="shopForm.sellCount"></el-input>
      </el-form-item>
      <el-form-item label="活动" prop="supports">
        <el-checkbox-group v-model="shopForm.supports">
          <el-checkbox label="在线支付满28减5" name="supports"></el-checkbox>
          <el-checkbox
            label="VC无限橙果汁全场8折"
            name="supports"
          ></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="supports"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购" name="supports"></el-checkbox>
          <el-checkbox label="单价特色套餐" name="supports"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="营业时间" prop="date">
        <template>
          <el-time-picker
            is-range
            value-format="HH:mm:ss"
            v-model="shopForm.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </template>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()" v-preventReClick
          >修改</el-button
        >
        <el-button @click="resetForm('shopForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getShopInfo, editShop } from '../../api/shop'
import _ from 'lodash'

export default {
  data() {
    return {
      shopForm: {
        name: '',
        bulletin: '',
        avatar: '',
        deliveryPrice: '',
        deliveryTime: '',
        description: '',
        score: '',
        sellcount: '',
        supports: [],
        date: '',
        pics: []
      },
      baseUrl: 'http://127.0.0.1:5000/upload/shop/',
      // 显示和提交的头像
      uploadStr: '',
      // 店铺图片使用的字段
      dialogImageUrl: '',
      dialogVisible: false,
      picList: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await getShopInfo()
      const arr = []
      data.pics.forEach(item => {
        arr.push({
          name: item,
          url: this.baseUrl + item
        })
      })
      this.picList = arr
      this.shopForm = data
    },
    async submitForm() {
      const editObj = _.cloneDeep(this.shopForm)
      editObj.pics = JSON.stringify(editObj.pics)
      editObj.supports = JSON.stringify(editObj.supports)
      editObj.date = JSON.stringify(editObj.date)
      const { code, msg } = await editShop(editObj)
      if (code === 0) {
        this.$message({
          message: msg,
          type: 'success'
        })
      }
    },
    resetForm(formName) {
      this.picList = []
      this.shopForm.pics = []
      this.$refs[formName].resetFields()
    },
    handleAvatarSuccess(res, file) {
      this.shopForm.avatar = res.imgUrl
      this.uploadStr = res.imgUrl
    },
    handlePicsSuccess(res, file) {
      this.shopForm.pics.push(res.imgUrl)
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
    handleRemove(file, fileList) {
      const i = this.shopForm.pics.findIndex(item => item === file.name)
      this.shopForm.pics.splice(i, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

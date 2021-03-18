<template>
  <el-card>
    <template #header>
      <h4>商品添加</h4>
    </template>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择商品分类">
          <el-option
            v-for="item in cateArr"
            :key="item.cateName"
            :label="item.cateName"
            :value="item.cateName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <template>
          <el-input-number
            v-model="ruleForm.num"
            @change="handleChange"
            :min="1"
          ></el-input-number>
        </template>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:5000/goods/goods_img_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getCommodity" v-preventReClick
          >添加商品</el-button
        >
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getGories, addGood } from '../../api/good'
import { successMsg } from '../../utils/validate'
export default {
  data() {
    return {
      cateArr: [],
      ruleForm: {
        name: '',
        num: '',
        region: '',
        desc: ''
      },
      imageUrl: '',
      intermediate: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      const { categories } = await getGories()
      this.cateArr = categories
    },
    async getCommodity() {
      const { code, msg } = await addGood({
        name: this.ruleForm.name,
        category: this.ruleForm.region,
        price: this.ruleForm.num,
        imgUrl: this.intermediate,
        goodsDesc: this.ruleForm.desc
      })
      if (code === 0) {
        successMsg(this, msg, 'success')
      } else {
        successMsg(this, '未知错误', 'error')
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange(value) {
      console.log(value)
    },
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
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

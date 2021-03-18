<template>
  <el-card>
    <template #header>
      <h4>商品编辑</h4>
    </template>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称">
        <el-input v-model="ruleForm.name"></el-input>
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
          <el-input-number v-model="ruleForm.price" :min="1"></el-input-number>
        </template>
      </el-form-item>
      <el-form-item label="商品图片" class="box">
        <el-avatar
          shape="square"
          :size="100"
          :src="this.ruleForm.imgUrl"
        ></el-avatar>

        <el-upload
          class="avatar-uploader"
          action="http://localhost:5000/goods/goods_img_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="ruleForm.imageUrl"
            :src="ruleForm.imageUrl"
            class="avatar"
          />
        </el-upload>
      </el-form-item>

      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="ruleForm.goodsDesc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-preventReClick
          >立即修改</el-button
        >
        <el-button @click="$router.push('prolist')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { getGories, check, editShop } from '../../api/good'
import { successMsg } from '../../utils/validate'
export default {
  data() {
    return {
      baseUrl: 'http://localhost:5000/upload/imgs/goods_img/',
      cateArr: [],
      interUrl: '',
      ruleForm: {
        imageUrl: '',
        name: '121',
        goodsDesc: '2112',
        id: 0,
        region: '',
        price: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      console.log({
        name: this.ruleForm.name,
        category: this.ruleForm.region,
        price: this.ruleForm.price,
        imgUrl: this.interUrl,
        goodsDesc: this.ruleForm.goodsDesc,
        id: this.$route.query.id
      })
      const { msg, code } = await editShop({
        name: this.ruleForm.name,
        category: this.ruleForm.region,
        price: this.ruleForm.price,
        imgUrl: this.interUrl,
        goodsDesc: this.ruleForm.goodsDesc,
        id: this.$route.query.id
      })
      if (code === 0) {
        successMsg(this, msg, 'success')
      } else {
        successMsg(this, '未知错误', 'error')
      }
    },
    async getData() {
      const { categories } = await getGories()
      this.cateArr = categories
      const { data } = await check({
        id: this.$route.query.id
      })
      this.interUrl = data[0].imgUrl
      this.ruleForm.name = data[0].name
      this.ruleForm.region = data[0].category
      this.ruleForm.goodsDesc = data[0].goodsDesc
      this.ruleForm.price = data[0].price
      this.ruleForm.imgUrl = this.baseUrl + data[0].imgUrl
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.imageUrl = URL.createObjectURL(file.raw)
      this.interUrl = res.imgUrl
      this.ruleForm.imgUrl = this.baseUrl + res.imgUrl
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
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.el-form-item.box {
  position: relative;
  height: 100px;
}

/deep/ .el-form-item.box .el-form-item__content {
  height: 100px;
}

.avatar-uploader {
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 2;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 100px;
  height: 100px;
  cursor: pointer;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

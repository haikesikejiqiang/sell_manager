<template>
  <el-card>
    <template #header>
      <h4>个人中心</h4>
    </template>
    <el-table :data="imgData" style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="{ row }">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="row.imgUrl" />
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ row.sellCount }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"> </el-table-column>
      <el-table-column label="商品价格" prop="price"> </el-table-column>
      <el-table-column label="商品图片" prop="imgUrl">
        <template v-slot="imgData">
          <img :src="imgData.row.imgUrl" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            @click="$router.push({ path: 'edit', query: { id: row.id } })"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import { goodList, delGood } from '../../api/good'
import { successMsg } from '../../utils/validate'
export default {
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
      total: 0,
      tableData: [],
      imgData: [],
      baseUrl: 'http://localhost:5000/upload/imgs/goods_img/'
    }
  },
  created() {
    this.getGood()
  },
  methods: {
    async del(id) {
      const { code, msg } = await delGood({ id })
      if (code === 0) {
        successMsg(this, msg, 'success')
        this.getGood()
      } else {
        successMsg(this, '未知错误', 'error')
      }
    },
    async getGood() {
      const data = await goodList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      console.log(data)
      this.tableData = data.data
      this.total = data.total
      const url = this.baseUrl
      function abc(val) {
        return {
          id: val.id,
          imgUrl: url + val.imgUrl,
          name: val.name,
          category: val.category,
          goodsDesc: val.goodsDesc,
          price: val.price,
          sellCount: val.sellCount,
          ratings: val.ratings,
          ctime: val.ctime,
          rating: val.rating
        }
      }
      const arr = data.data.map(abc)
      this.imgData = arr
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getGood()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getGood()
    }
  }
}
</script>

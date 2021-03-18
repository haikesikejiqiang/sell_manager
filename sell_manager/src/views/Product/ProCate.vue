<template>
  <el-card>
    <template #header>
      <h4>商品分类</h4>
    </template>
    <el-button type="primary" size="mini" @click="dialogFormVisible = true"
      >添加分类</el-button
    >
    <el-table ref="singleTable" :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column property="cateName" label="分类名称">
        <template v-slot="{ row }">
          <el-input v-if="row.flag" v-model="row.cateName"></el-input>
          <span v-else>{{ row.cateName }}</span>
        </template>
      </el-table-column>
      <el-table-column property="state" label="是否启用">
        <template v-slot="{ row }">
          <el-switch
            v-model="row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            :disabled="!row.flag"
          >
            >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            size="mini"
            :type="row.flag ? 'success' : null"
            @click="editCate(row)"
            >{{ row.flag ? '完成' : '编辑' }}</el-button
          >
          <el-button type="danger" size="mini" @click="delRow(row.id)"
            >删除</el-button
          >
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
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="ruleForm.value"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { catelist, addcate, delcate, editcate } from '../../api/good'
import { successMsg } from '../../utils/validate'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      ruleForm: {
        name: '',
        value: true
      },
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.cateData()
  },
  methods: {
    addForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const { msg } = await addcate({
            cateName: this.ruleForm.name,
            state: this.ruleForm.value
          })
          successMsg(this, msg, 'success')
          this.dialogFormVisible = false
          this.cateData()
        } else {
          successMsg(this, '未知错误', 'error')
          return false
        }
      })
    },
    async delRow(id) {
      const { msg, code } = await delcate({
        id
      })
      if (code === 0) {
        successMsg(this, msg, 'success')
        this.cateData()
      }
    },
    async editCate(row) {
      if (row.flag) {
        if (row.cateName === '') return
        const { msg } = await editcate({
          id: row.id,
          cateName: row.cateName,
          state: Boolean(row.state)
        })
        successMsg(this, msg, 'success')
        this.cateData()
      }
      row.flag = !row.flag
    },
    // setCurrent(row) {
    //   this.$refs.singleTable.setCurrentRow(row)
    //   console.log(row, 11)
    // },
    // handleCurrentChange(val) {
    //   this.currentRow = val
    //   console.log(val)
    // },
    async cateData() {
      const { total, data } = await catelist({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      data.forEach(val => {
        this.$set(val, 'flag', false)
      })
      console.log(data)
      this.total = total
      this.tableData = data
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.cateData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.cateData()
    }
  }
}
</script>

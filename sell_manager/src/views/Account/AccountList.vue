<template>
  <el-card>
    <template #header>
      <span>账号列表</span>
    </template>
    <template>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="userGroup" label="用户组"> </el-table-column>
        <el-table-column prop="ctime" label="创建时间">
          <template v-slot="{ row }">{{ row.ctime | timeDate }}</template>
        </el-table-column>
        <el-table-column label="操作" v-slot="{ row }">
          <el-button @click="editPanel(row)">编辑</el-button>
          <el-button type="danger" @click="delData(row.id)">删除</el-button>
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

      <div style="margin-top: 20px">
        <el-button type="primary" @click="selectMore" v-preventReClick
          >批量选择</el-button
        >
        <el-button type="danger" @click="delMore" v-preventReClick
          >批量删除</el-button
        >
      </div>

      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="editForm">
          <el-form-item label="账号">
            <el-input v-model="editForm.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-select v-model="editForm.accgroup" placeholder="请选择用户组">
              <el-option label="普通管理员" value="普通管理员"></el-option>
              <el-option label="超级管理员" value="超级管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editOk">确 定</el-button>
        </div>
      </el-dialog>
    </template>
  </el-card>
</template>

<script>
import { getList, delList, editList, batchdel } from '../../api/user.js'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 2,
      tableData: [],
      multipleSelection: [],
      total: 0,
      dialogFormVisible: false,
      editForm: { account: '', accgroup: '' }
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    async getDate() {
      const { data, total } = await getList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })

      this.tableData = data
      this.total = total
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getDate()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getDate()
    },
    delData(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { code, msg } = await delList({ id })
          if (code === 0) {
            this.$message({
              type: 'success',
              message: msg
            })
            this.getDate()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    editPanel(row) {
      this.editForm.account = row.account
      this.editForm.accgroup = row.userGroup
      this.editForm.id = row.id
      this.dialogFormVisible = true
    },
    async editOk() {
      const { code } = await editList({
        id: this.editForm.id,
        account: this.editForm.account,
        userGroup: this.editForm.accgroup
      })
      if (code === 0) {
        this.dialogFormVisible = false
        this.getDate()
      }
    },
    async delMore() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '你都没选中，你删个der',
          type: 'error'
        })
        return false
      }
      const arr = []
      this.multipleSelection.forEach(val => {
        arr.push(val.id)
      })
      await batchdel({
        ids: JSON.stringify(arr)
      })
      this.getDate()
    },
    selectMore() {
      this.$message({
        message: '没有这功能，你自己手动选中',
        type: 'error'
      })
    }
  }
}
</script>

<style lang="less" scoped></style>

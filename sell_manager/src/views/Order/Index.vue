<template>
  <el-card>
    <template #header>
      <h4>订单管理</h4>
    </template>
    <el-form
      :inline="true"
      ref="serchObj"
      :model="serchObj"
      class="demo-form-inline"
    >
      <el-form-item label="订单号" prop="orderNo">
        <el-input v-model="serchObj.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人" prop="consignee">
        <el-input v-model="serchObj.consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="serchObj.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态" prop="orderState">
        <el-select v-model="serchObj.orderState" placeholder="订单状态">
          <el-option label="已受理" value="已受理"></el-option>
          <el-option label="派送中" value="派送中"></el-option>
          <el-option label="已完成" value="已完成"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择时间" prop="date">
        <el-date-picker
          v-model="serchObj.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onData('search')">查询</el-button>
        <el-button type="danger" @click="resetForm('serchObj')">重置</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="tableData" border style="width: 100%" size="mini">
        <el-table-column fixed prop="orderNo" label="订单号" width="150">
        </el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="120">
          <template v-slot="{ row }">
            {{ row.orderTime | timeDate }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120">
        </el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="300">
        </el-table-column>
        <el-table-column prop="deliveryTime" label="配送时间" width="120">
          <template v-slot="{ row }">
            {{ row.deliveryTime | timeDate }}
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="120">
        </el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120">
        </el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120">
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="100">
          <template v-slot="{ row }">
            <el-button type="text" size="small" @click="getRow(row)"
              >查看</el-button
            >
            <!-- <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </template>
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
    <el-dialog title="订单状态" :visible.sync="dialogVisible" width="30%">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.timestamp"
          :color="activity.color"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { getOrderList, getOrderSearch } from '../../api/order'
export default {
  data() {
    return {
      tableData: [],
      pageSize: 5,
      currentPage: 1,
      total: 0,
      serchObj: {
        orderNo: '',
        consignee: '',
        phone: '',
        orderState: '',
        date: ''
      },
      dialogVisible: false,
      reverse: false,
      activities: [
        { content: '已受理' },
        { content: '派送中' },
        { content: '已完成' }
      ]
    }
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getRow(r) {
      function check(item) {
        return item.content === r.orderState
      }
      const index = this.activities.findIndex(check)
      this.activities.forEach((item, i) => {
        item.color = ''
        if (i <= index) {
          console.log(this.activities[i])
          this.activities[i].color = '#0bbd87'
        }
      })
      this.dialogVisible = !this.dialogVisible
    },
    async getData() {
      const data = await getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...this.serchObj
      })
      this.total = data.total
      this.tableData = data.data
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      this.getData()
    },
    async onData(s) {
      if (this.serchObj.date === null) {
        this.serchObj.date = ''
      } else if (this.serchObj.date !== '') {
        if (
          Object.prototype.toString.call(this.serchObj.date) !==
          '[object String]'
        ) {
          this.serchObj.date = JSON.stringify(this.serchObj.date)
        } else {
          console.log(this.serchObj.date)
        }
      }

      if (s) {
        this.currentPage = 1
      }
      const data = await getOrderSearch({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...this.serchObj
      })
      this.total = data.total
      this.tableData = data.data
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
/deep/ ::-webkit-scrollbar {
  height: 10px !important;
}
</style>

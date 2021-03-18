<template>
  <div class="sub_main">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in baseData" :key="item.id">
        <div class="grid-content bg-purple">
          <i
            class="iconfont"
            :class="item.icon"
            :style="{ color: arr[item.id - 1] }"
          ></i>
          <div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.count }}</p>
          </div>
        </div></el-col
      >
    </el-row>

    <Son @fn="fun" />
  </div>
</template>

<script>
import { option } from './option'
import { getTotal } from '../../api/index'
import Son from './Son'

export default {
  components: { Son },
  data() {
    return {
      arr: ['#1296db', '#d4237a', '#1296db', '#1afa29'],
      dataList: [
        { id: 1, title: '总订单', icon: 'icon-icon-' },
        { id: 2, title: '总销售额', icon: 'icon-Dollar' },
        { id: 3, title: '今日订单数', icon: 'icon-wenjian' },
        { id: 4, title: '今日订单额', icon: 'icon-renminbi' }
      ],
      baseData: [],
      baseOption: {}
    }
  },
  mounted() {
    this.getTotal()
  },
  methods: {
    async fun(s) {
      const {
        amountData,
        orderData,
        todayOrder,
        totalAmount,
        totalOrder,
        totayAmount,
        xData
      } = await getTotal()
      const arr = []
      arr.push(todayOrder, totalAmount, totalOrder, totayAmount)
      this.dataList.forEach((item, i) => {
        item.count = arr[i]
      })
      this.baseOption = option
      this.baseOption.xAxis.data = xData
      this.baseOption.series[0].data = orderData
      this.baseOption.series[1].data = amountData
      this.baseData = this.dataList

      s.setOption(this.baseOption)
    },
    async getTotal() {
      // const data = await getTotal()
      // console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.sub_main {
  height: 500px;
}
#main {
  height: 500px;
  background: #fff;
  margin-top: 30px;
}
.bg-purple {
  background: #fff;
  padding: 20px 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}

i {
  font-size: 36px;
  color: #6b9ede;
}

h4 {
  color: #ccc;
}

p {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-top: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

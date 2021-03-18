<template>
  <div ref="main" id="main"></div>
</template>

<script>
import Echarts from 'echarts'

export default {
  data() {
    return {}
  },
  mounted() {
    this.getChart()
  },
  methods: {
    getChart() {
      var myChart = Echarts.init(this.$refs.main)
      this.$emit('fn', myChart)
    }
  }
}
</script>

<style scoped></style>

export const option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    top: '20',
    data: ['订单数', '金额数']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    left: '60',
    top: '10',
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '订单数',
      type: 'line',
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '金额数',
      type: 'line',
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310]
    }
  ]
}

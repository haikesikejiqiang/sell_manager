import Vue from 'vue'
import moment from 'moment'

Vue.filter('timeDate', function(value) {
  const s = moment(value).format('YYYY-MM-DD HH:mm:ss')
  if (s === 'Invalid date') {
    return '日期时间格式错误'
  } else {
    return s
  }
})

<template>
  <Son @fn="fun" />
</template>

<script>
import Son from '../Dashboard/Son'
import { option1 } from './optin'
export default {
  components: { Son },
  methods: {
    fun(s) {
      s.setOption(option1)
    }
  }
}
</script>

<style lang="less" scoped>
#main {
  height: 100%;
  background: #fff;
}
</style>

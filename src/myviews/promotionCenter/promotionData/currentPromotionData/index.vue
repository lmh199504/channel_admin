<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="当前账号" :lazy="true">
        <currentData />
      </el-tab-pane>
      <el-tab-pane label="注册明细" :lazy="true">
        <registerData />
      </el-tab-pane>
      <el-tab-pane label="充值明细" :lazy="true">
        <rechargeData />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import currentData from './currentData/index.vue'
import rechargeData from './rechargeData/index.vue'
import registerData from './registerData/index.vue'
export default {
  components: {
    currentData,
    rechargeData,
    registerData
  }
}
</script>

<style>
</style>

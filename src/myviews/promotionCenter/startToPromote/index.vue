<template>
  <div class="app-container">
    <el-tabs v-model="activeName" v-loading="loadTabs" type="border-card">
      <el-tab-pane label="海报推广" name="poster" :lazy="true"><poster :facility-type="facilityType" :template-type="templateType" /></el-tab-pane>
      <el-tab-pane label="H5推广" name="web" :lazy="true"><web :facility-type="facilityType" :template-type="templateType" /></el-tab-pane>
      <el-tab-pane label="群推广" name="group" :lazy="true"><group :facility-type="facilityType" :template-type="templateType" /></el-tab-pane>
      <el-tab-pane label="域名推广" name="domain" :lazy="true"><domain :template-type="templateType" /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import poster from './poster/index.vue'
import web from './h5/index.vue'
import group from './group/index.vue'
import domain from './domain/index.vue'
export default {
  components: {
    poster,
    web,
    group,
    domain
  },
  data() {
    return {
      loadTabs: false,
      activeName: 'web',
      facilityType: [],
      templateType: []
    }
  },
  created() {
    this.loadTabs = true
    setTimeout(() => {
      this.facilityType = [
        { name: '微信', value: 'WECHAT' },
        { name: 'QQ', value: 'QQ' },
        { name: '抖音', value: 'DY' },
        { name: '连信', value: 'LX' },
        { name: '通用', value: 'WEB' },
        { name: '长链接', value: 'LONG' }
      ]
      this.templateType = [
        { name: '女神招募', value: 'QYRECRUIT' },
        { name: '默认推广', value: 'QYDEFAULT' },
        { name: '性感推广一', value: 'QYSEXY1' },
        { name: '性感推广二', value: 'QYSEXY2' },
        { name: '性感推广三', value: 'QYSEXY3' },
        { name: '性感推广四', value: 'QYSEXY4' },
        { name: '性感推广五', value: 'QYSEXY5' },
        { name: '性感推广六', value: 'QYSEXY6' }
      ]
      this.loadTabs = false
    }, 1000)
  }
}
</script>

<style>
</style>

<template>
  <div>
    <div class="extend-title">推广设备类型：</div>
    <div class="extend-radio-container">
      <el-radio-group v-model="formData.facilityType" @change="changeCode">
        <el-radio v-for="item in facilityType" :key="item.name" :label="item.value">{{ item.name }}</el-radio>
      </el-radio-group>
    </div>
    <div class="extend-title">推广模板：</div>
    <div class="extend-radio-container">
      <el-radio-group v-model="formData.templateType" @change="changeCode">
        <el-radio v-for="item in templateType" :key="item.name" :label="item.value">{{ item.name }}</el-radio>
      </el-radio-group>
    </div>
    <div class="margin_bottom_15">
      <el-button type="primary" size="mini">生成</el-button>
    </div>
    <div class="margin_bottom_15">
      <el-input type="textarea" :rows="3" :readonly="true" />
    </div>
    <div>
      <el-button type="primary" size="mini">更换分享文案</el-button>
      <el-button type="primary" size="mini">复制</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    facilityType: {
      type: Array,
      default: function() {
        return []
      }
    },
    templateType: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      formData: {
        facilityType: '',
        templateType: ''
      },
      listLoading: false,
      list: []
    }
  },
  watch: {
    facilityType: {
      handler: function(newVal) {
        if (newVal.length > 0) {
          this.formData.facilityType = newVal[0].value
        }
      },
      immediate: true
    },
    templateType: {
      handler: function(newVal) {
        if (newVal.length > 0) {
          console.log(this.formData)
          this.formData.templateType = newVal[0].value
        }
      },
      immediate: true
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeCode() {
      console.log(this.formData.facilityType)
    },
    getList() {
      this.listLoading = true
      setTimeout(() => {
        this.list = [
          {
            member_id: 10000
          }
        ]
        this.listLoading = false
      }, 1000)
    }
  }
}
</script>

<style>
</style>

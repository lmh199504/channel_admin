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
    <el-button type="primary" size="mini">生成</el-button>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border>
        <el-table-column label="主题" prop="member_id" align="center" />
        <el-table-column label="推广模板" prop="member_id" align="center" />
        <el-table-column label="推广二维码" prop="member_id" align="center" />
        <el-table-column label="推广链接" prop="member_id" align="center" />
        <el-table-column label="操作" prop="member_id" align="center" min-width="150px">
          <template>
            <el-button type="primary" size="mini">复制</el-button>
          </template>
        </el-table-column>
      </el-table>
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

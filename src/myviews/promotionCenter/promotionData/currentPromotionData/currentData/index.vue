<template>
  <div>
    <div class="search-container">
      <el-form ref="form" :model="listQuery" :inline="true" label-width="68px">
        <el-form-item label="开始日期">
          <el-col><el-date-picker
            v-model="listQuery.start_time"
            type="date"
            placeholder="开始日期"
          /></el-col>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-col><el-date-picker
            v-model="listQuery.end_time"
            type="date"
            placeholder="结束日期"
          /></el-col>
        </el-form-item>
        <el-form-item>
          <el-col><el-button class type="primary" @click="onSearch">搜索</el-button></el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border>
        <el-table-column label="日期" prop="member_id" align="center" />
        <el-table-column label="注册量" prop="member_id" align="center" />
        <el-table-column label="VIP金额" prop="member_id" align="center" />
        <el-table-column label="VIP佣金" prop="member_id" align="center" />
        <el-table-column label="聊币金额" prop="member_id" align="center" />
        <el-table-column label="聊币佣金" prop="member_id" align="center" />
        <el-table-column label="钻石金额" prop="member_id" align="center" />
        <el-table-column label="钻石佣金" prop="member_id" align="center" />
        <el-table-column label="总收益" prop="member_id" align="center" />
      </el-table>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {},
      list: [],
      listLoading: false,
      total: 1
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSearch() {},
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

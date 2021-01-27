<template>
  <div class="app-container">
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
        <el-form-item label="状态">
          <el-col>
            <el-select v-model="listQuery.status" placeholder="打款状态">
              <el-option value="1" label="已打款" />
              <el-option value="2" label="待打款" />
              <el-option value="3" label="已拒绝" />
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col><el-button class type="primary" @click="onSearch">搜索</el-button></el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border>
        <el-table-column label="日期" prop="member_id" align="center" />
        <el-table-column label="状态" prop="member_id" align="center">
          <template>
            <el-tag size="mini" type="success">已打款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="总收益" prop="member_id" align="center" />
      </el-table>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-paginationxport default {
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

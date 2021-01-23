<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="form" :model="listQuery" :inline="true" label-width="68px">
        <el-form-item label="会员ID">
          <el-col><el-input v-model="listQuery.member_id" placeholder="请输入会员ID" /></el-col>
        </el-form-item>
        <el-form-item label="会员昵称">
          <el-col><el-input v-model="listQuery.member_nickname" placeholder="请输入会员昵称" /></el-col>
        </el-form-item>
        <el-form-item>
          <el-col><el-button class type="primary" @click="onSearch">搜索</el-button></el-col>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table v-loading="listLoading" :data="list" border>
        <el-table-column label="会员ID" prop="member_id" align="center" />
        <el-table-column label="会员账号" prop="member_id" align="center" />
        <el-table-column label="会员昵称" prop="member_id" align="center" />
        <el-table-column label="结算方式" prop="member_id" align="center" />
        <el-table-column label="创建时间" prop="member_id" align="center" />
        <el-table-column label="上一次登陆" prop="member_id" align="center" />
        <el-table-column label="操作" prop="member_id" align="center" min-width="150px">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="edit(row)">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    <el-dialog
      v-if="editVisible"
      title="渠道管理"
      :visible.sync="editVisible"
      :fullscreen="device==='mobile'"
    >
      <div><editForm type="edit" :edit-data="editRow" /></div>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { mapGetters } from 'vuex'
import editForm from '../edit/index.vue'
export default {
  components: {
    Pagination,
    editForm
  },
  data() {
    return {
      list: [],
      listLoading: false,
      total: 1,
      listQuery: {},
      editVisible: false,
      editRow: {}
    }
  },
  computed: {
    ...mapGetters(['device'])
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
    },
    edit(row) {
      this.editRow = row
      this.editVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
  @media screen and (max-width: 600px) {
    .el-form--inline .el-form-item {
      margin-right: 0;
    }
    .el-form--inline .el-form-item__content {
      width: 72% !important;
      margin: 10px;
    }
  }
  .line {
    text-align: center;
  }
</style>

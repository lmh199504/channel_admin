<template>
  <div class="app-container">
    <div class="table-title">
      分成信息
    </div>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="card-container">
          <h2>85.00%</h2>
          <p>VIP分成</p>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="card-container">
          <h2>85.00%</h2>
          <p>VIP分成</p>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="card-container">
          <h2>85.00%</h2>
          <p>VIP分成</p>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="card-container">
          <h2>85.00%</h2>
          <p>VIP分成</p>
        </div>
      </el-col>
    </el-row>
    <div class="table-title">提现信息</div>
    <el-row :gutter="20">
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="card-container">
          <h2>微信提现</h2>
          <p>提现方式</p>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <div class="card-container">
          <h2>SKT</h2>
          <p>微信号</p>
        </div>
      </el-col>
    </el-row>
    <div class="table-title">近期公告</div>
    <div class="white_bg">
      <ul>
        <li v-for="(notice,index) in noticeList" :key="index" class="noticeItem" @click="showNotice">
          <p>{{ notice.title }}</p>
          <p>{{ notice.time }}</p>
        </li>
      </ul>
    </div>

    <el-dialog
      :visible.sync="noticeDialog"
      title="公告详情"
    >
      {{ noticeText }}
      <div slot="footer">
        <el-button type="primary" @click="noticeDialog=false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [
        { title: '我是一个公告', time: '2021-01-23' },
        { title: '我是一个公告', time: '2021-01-23' }
      ],
      noticeText: '我是公告的详情',
      noticeDialog: false
    }
  },
  methods: {
    showNotice() {
      this.noticeDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/styles/element-variables.scss';
  .card-container{
    padding: 10px;
    box-sizing: border-box;
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 5px;
    p{
      font-weight: bold;
    }
  }
  .white_bg{
    .noticeItem{
      display: flex;
      justify-content: space-between;
      list-style-type:circle;
      position: relative;
    }
    .noticeItem::after{
      position: absolute;
      width: 10px;
      height: 10px;
      background-color: $--color-primary;
      border-radius: 50%;
      content: '';
      left: -20px;
      top: 50%;
      margin-top: -6px;
    }
    li:hover{
      cursor: pointer;
      text-decoration: underline;
    }
  }
</style>

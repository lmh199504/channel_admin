<template>
  <div class="editor-container">
    <el-form v-model="form" label-width="130px">
      <el-row>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="container">
            <h2 v-if="type==='edit'">渠道ID：20</h2>
            <el-form-item label="渠道名称">
              <el-input v-model="form.channel_name" />
            </el-form-item>
            <el-form-item label="渠道账号">
              <el-input v-model="form.channel_name" />
            </el-form-item>
            <el-form-item label="登录密码">
              <el-input v-model="form.channel_name" />
            </el-form-item>
            <el-form-item label="充值分成">
              <el-input v-model="form.channel_name">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="VIP分成">
              <el-input v-model="form.channel_name">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
            <el-form-item label="到账方式">
              <el-radio v-model="form.radio" label="1">微信</el-radio>
              <el-radio v-model="form.radio" label="2">银行卡</el-radio>
              <el-radio v-model="form.radio" label="3">支付宝</el-radio>
            </el-form-item>
            <el-form-item label="微信号">
              <el-input v-model="form.channel_name" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.channel_name" type="textarea" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="container">
            <h2>免扣信息</h2>
            <el-form-item label="VIP免扣数">
              <el-input v-model="form.channel_name" />
            </el-form-item>
            <el-form-item label="vip免扣整除数">
              <el-input v-model="form.channel_name" />
            </el-form-item>
            <el-form-item label="充值免扣数">
              <el-input v-model="form.channel_name" />
            </el-form-item>
            <el-form-item label="充值免扣整除数">
              <el-input v-model="form.channel_name" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    editData: {
      type: Object,
      default: function() {
        return {}
      }
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      form: {
        channel_name: ''
      }
    }
  },
  created() {
    if (this.type === 'edit') {
      this.form = { ...this.editData }
      console.log(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
  .editor-container{
    background-color: #FFFFFF;
    padding: 0 0 10px 0;
    h2{
      color: #000000;
      width: 130px;
      text-align: right;
      padding-right: 12px;
      white-space: nowrap;
    }
  }
  .container{
    padding: 10px;
    box-sizing: border-box;
    max-width: 500px;
  }
</style>

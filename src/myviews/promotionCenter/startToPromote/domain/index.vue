<template>
  <div class="">

    <div class="extend-title">自定义域名：</div>
    <div class="extend-radio-container">
      <el-input v-model="formData.selfDomain" class="selfDomain" @input="formData.domain = ''" />
      <div class="explain" v-text="domainexplain" />
    </div>

    <div class="extend-title">选择域名:</div>
    <div class="extend-radio-container">
      <el-radio-group v-model="formData.domain" @change="changeRadio">
        <el-radio v-for="item in domainList" :key="item" :label="item" />
      </el-radio-group>
    </div>

    <div class="extend-title">推广模板:</div>
    <div class="extend-radio-container">
      <el-radio-group v-model="formData.template">
        <el-radio v-for="item in templateType" :key="item.name" :label="item.value">{{ item.name }}</el-radio>
      </el-radio-group>
    </div>
    <div class="margin_bottom_15"><el-button type="primary" size="mini">绑定</el-button></div>

    <el-dialog class="a_dialog" title="提示" :visible.sync="urlVisible" :center="true">
      <div class="content">当前域名已被使用，请更换域名</div>
      <div class="all_btn"><el-button type="primary" size="small" @click="urlVisible = false">确定</el-button></div>
    </el-dialog>

    <el-dialog title="更换模板" :visible.sync="changeTem">
      <div class="extend-radio-container">
        <el-radio-group v-model="formData.template">
          <el-radio v-for="item in templateType" :key="item.name" :label="item.value">{{ item.name }}</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer">
        <el-button size="small" @click="changeTem=false">取消</el-button>
        <el-button type="primary" size="small" @click="onChangeTem">确定</el-button>
      </div>
    </el-dialog>

    <!-- 表格数据 -->
    <div class="tab-container">
      <el-table v-loading="tableListLoading" :data="tableList" style="width: 100%" border>
        <el-table-column prop="template_name" label="推广模板" min-width="80" align="center" />
        <el-table-column prop="domain" label="推广链接" min-width="200" align="center" />
        <el-table-column prop="is_black" label="操作" min-width="300" align="center">
          <template slot-scope="scope">
            <div class="group_btn">
              <el-button v-clipboard:copy="scope.row.domain" v-clipboard:success="onCopy" v-clipboard:error="onError" type="primary" size="mini" class="frist_open_btn">
                复制链接
              </el-button>
              <el-button type="primary" size="mini" class="frist_open_btn" @click="showTem(scope)">更换模板</el-button>
              <el-button type="primary" size="mini" class="unbound" @click="unbound(scope)">解绑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
export default {
  components: {
    Pagination
  },
  directives: {
    clipboard
  },
  props: {
    templateType: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      domainList: [
        '10.test.hefei222555.com',
        '12.test.hefei222555.com'
      ],
      tableList: [
        { template_name: '性感1', domain: 'baidu.com' }
      ], // 缓存推广url列表
      formData: {
        domain: '', // 推广设备类型
        template: '', // 模板类型
        selfDomain: '' // 自定义域名,
      },
      tableListLoading: false,
      urlVisible: false, // H5生成链接弹窗
      changeTem: false,
      total: 1, // 总条数
      listQuery: {
        page: 1,
        limit: 10
      },
      needChangeTemDomain: '', // 需要更换模板的域名
      domainexplain: 'domainexplain'
    }
  },
  watch: {
    templateType: {
      handler: function(newVal) {
        if (newVal.length > 0) {
          this.formData.templateType = newVal[0].value
        }
      },
      immediate: true
    }
  },
  created() {
  },
  methods: {
    getList() {},
    // 生成
    createLink() {
      var data = {
        domain: '',
        template: ''
      }
      if (this.formData.domain === '' && this.formData.selfDomain !== '') {
        data.domain = this.formData.selfDomain
      } else if (this.formData.domain !== '' && this.formData.selfDomain === '') {
        data.domain = this.formData.domain
      } else if (this.formData.domain === '' && this.formData.selfDomain === '') {
        data.domain = ''
      }
      data.template = this.formData.template
    },
    onCopy() {
      this.$message({
        message: '复制成功',
        type: 'success',
        offset: 300
      })
    },
    onError() {
      this.$message({
        message: '复制失败',
        type: 'error'
      })
    },
    onChangeTem() {
      this.changeTem = false
    },
    showTem(scope) {
      this.needChangeTemDomain = scope.row.domain
      this.changeTem = true
    },
    unbound(scope) {
    },
    handleSizeChange(val) {
      this.param.limit = val
      this.param.page = 1
      this.getBindDomain()
    },
    handleCurrentChange(val) {
      this.param.page = val
      this.getBindDomain()
    },
    changeRadio() {
      this.formData.selfDomain = ''
    }
  }
}
</script>

<style lang="scss" scoped>

.explain {
  margin-top: 10px;
  width: 400px;
  background-color: #1890ff;
  border-radius: 5px;
  color: #FFFFFF;
  padding: 5px 10px;
  line-height: 29px;
}
// 移动端css
.selfDomain{
  width: 400px;
}
@media screen and (max-width: 600px) {
  .selfDomain,
  .explain {
    width: 200px;
  }
}
</style>

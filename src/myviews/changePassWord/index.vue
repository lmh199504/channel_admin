<template>
  <div class="app-container">
    <div class="white_bg">
      <div class="dl_temp_title margin_bottom_15">修改密码</div>
      <el-form ref="ruleForm" class="temp_ul" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="旧密码" prop="old_password"><el-input v-model="form.old_password" type="password" /></el-form-item>
        <el-form-item label="新密码" prop="new_password"><el-input v-model="form.new_password" type="password" /></el-form-item>
        <el-form-item label="确认密码" prop="new_password_re"><el-input v-model="form.new_password_re" type="password" /></el-form-item>
        <el-form-item><el-button type="primary" @click="submitForm('ruleForm')">提交</el-button></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value === this.form.old_password) {
        callback(new Error('新密码与旧密码一样'))
      } else {
        if (this.form.new_password !== '') {
          this.$refs.ruleForm.validateField('new_password_re')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.new_password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        old_password: '', // 旧密码
        new_password: '', // 新密码
        new_password_re: '' // 确认密码
      },
      rules: {
        old_password: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, message: '最少6个字符', trigger: 'blur' }
        ],
        new_password: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        new_password_re: [
          { required: true, message: '确认新密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.dl_temp_title {
  border-left: 5px solid #409eff;
  padding-left: 15px;
}

</style>

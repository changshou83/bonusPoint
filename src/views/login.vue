<template>
  <div class="container">
    <!-- 头部区域 -->
    <el-header class="header">
      <div>
        <span class="header_projectName">加分申请平台</span>
      </div>
    </el-header>
    <div class="login_box">
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="80px" class="login_form">
        <div class="form_header">用户登入</div>
        <!-- 用户名  -->
        <el-form-item prop="username" label="账号">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码  -->
        <el-form-item prop="password" label="密码">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 身份选择 -->
        <el-form-item prop="identity" label="身份">
          <el-radio v-model="loginForm.identity" label="student">学生</el-radio>
          <el-radio v-model="loginForm.identity" label="faculty">学院</el-radio>
        </el-form-item>
        <!-- 按钮区域  -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登入</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 表单数据
      loginForm: {
        username: '',
        password: '',
        identity: null,
      },
      // 验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 0, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 0, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
        ],
        identity: [{ required: true, message: '请选择身份', trigger: 'blur' }],
      },
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('user/login', this.loginForm)
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
          return null
        }
        this.$message.success(res.meta.msg)
        window.sessionStorage.setItem('token', res.user.token)
        delete res.user.token
        window.sessionStorage.setItem('userinfo', JSON.stringify(res.user))
        if (this.loginForm.identity === 'student') {
          this.$router.push('/student')
        } else if (this.loginForm.identity === 'faculty') {
          this.$router.push('/adIndex')
        }
      })
    },
  },
}
</script>
<style scoped>
.container {
  background-color: rgba(242, 242, 242, 1);
  height: 100%;
}

.header {
  background-color: rgba(12, 105, 209, 1);
  height: 50px;
  width: 100%;
  color: white;
  font-weight: 700;
  font-size: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_box {
  width: 518px;
  height: 325px;
  border: 1px solid rgba(12, 105, 209, 1);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.login_form {
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.login_form .form_header {
  font-weight: 700;
  font-size: 18px;
  position: relative;
  margin: 0px 42% 30px;
}

.login_form .btns {
  margin-left: 25%;
}

.el-form-item {
  margin-bottom: 15px;
}
</style>

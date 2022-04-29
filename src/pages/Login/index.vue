<template>
  <div class="login-container">
    <el-card>
      <h3>用户登录</h3>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :rules="loginFormRules"
        :model="loginForm"
        label-width="0px"
      >
        <!-- 用户名 -->
        <el-form-item label="用户名：" prop="username" label-width="80px">
          <el-input
            v-model="loginForm.username"
            placeholder="username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码：" prop="password" label-width="80px">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="myLogin">登录</el-button>
          <el-button @click="resetLoginForm" type="info">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "@/api/login";
export default {
  name: "Login",
  data() {
    return {
      // 登录表单数据对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 9, message: "长度在 3 到 9 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    // 重置按钮
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields();
    },
    // 登录按钮
    async myLogin() {
      // console.log('login');

      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;

        const res = await login({
          username: this.loginForm.username,
          password: this.loginForm.password,
        });
        // console.log("res", res);

        // 判断是否登录成功
        if (res.data.meta.status !== 200) return this.$message.error("登录失败");
        this.$message.success("登录成功");

        // 保存 token
        window.localStorage.setItem("token", res.data.data.token);

        // 跳转到主页面
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style scoped>
.login_container {
  display: flex;
  justify-content: center;
}
.el-card {
  width: 500px;
  height: 500px;
}
</style>

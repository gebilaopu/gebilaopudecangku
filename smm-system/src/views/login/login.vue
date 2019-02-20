<template>
  <div class="login">
    <div class="logins">
      <h2>
        <i class="el-icon-menu"></i>华联超市管理系统
      </h2>
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkpwd">
          <el-input v-model.number="loginForm.checkpwd"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 验证密码的函数
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("请输入3~5位之间的数字"));
      } else {
        if (this.loginForm.checkpwd != "") { // 如果确认密码不为空
         

          this.$refs.loginForm.validateField("checkpwd"); // 那么就调用这个密码验证（一致性验证）
        }
        callback();
      }
    };
    // 确认密码验证函数
    const checkpass = (rule, value, callback) => {
      // rule是传入的验证规则  value是用户输入的值 callback是一个回调函数
      if (value === "") {
        // 如果等于空
        callback(new Error("请再次输入密码")); 
      } else if (value !=this.loginForm.password) {
        // 如果确认密码 和 密码不同
        callback(new Error("两次输入密码不一致"));
      }
      // 如果直接调用 不传入任何错误信息 就是成功 
      callback();
    };

    return {
      //  登录的数据
      loginForm: {
        username: "",
        password: "",
        checkpwd: ""
      },
      // 验证的规则
      rules: {
        //  验证用户名
        username: [
          // 非空验证
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "账号在3~~5位字符之间", trigger: "blur" }
        ],

        // 验证密码
        password: [
          // 非空验证
          { required: true, validator: pass, trigger: "blur" }
        ],

        // 验证确认密码
        checkpwd: [
          // 自定义验证规则
          { required: true, validator: checkpass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 登录按钮的触发函数
    submitForm(formName) {
      // 获取表单组件调用验证方法
      this.$refs[formName].validate(valid => {
        // 如果所有验证通过 valid就是true
        if (valid) {
          alert("恭喜你登录成功");
          // 发送给后端 验证密码和账户的正确性

          //收集账号和密码发送给后端
          let param={
            username:this.loginForm.username,
            password:this.loginForm.password
          }

          // 发送请求 把参数发给后端（把用户名和密码发给后端 验证是否正确）
            

        } else {
          // 否则就是false
          alert("登录失败");
          return false;
        }
      });
    },

    // 重置按钮的触发函数
    resetForm(formName) {
      // this.$refs.loginForm//获取整个表单组件调用一个重置方法
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang=less>
.login,
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  background: url("http://127.0.0.1:8080/meinv.jpg");

  .logins {
    width: 400px;
    height: 400px;

    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding: 30px 60px 0 40px;

    h2 {
      padding: 0;
      margin-top: 40px;
      margin-left: 60px;
      color: #fff;
    }
    .el-form-item__label {
      color: #fff;
    }
  }
}
</style>

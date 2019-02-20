<template>
  <div class="accountadd">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加管理员账号</span>
      </div>

      <el-form
        :model="accountaddForm"
        status-icon
        :rules="rules"
        ref="accountaddForm"
        label-width="100px"
        class="demo-accountaddForm"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input type="text" v-model="accountaddForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码：" prop="password">
          <el-input type="text" v-model="accountaddForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkpwd">
          <el-input v-model.number="accountaddForm.checkpwd"></el-input>
        </el-form-item>

        <el-form-item label="选择用户组：" prop="usergroup">
          <el-select placeholder="选择用户组" v-model="accountaddForm.usergroup">
            <el-option label="普通用户" value="普通用户"></el-option>
            <el-option label="高级管理员" value="高级管理员"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('accountaddForm')">登录</el-button>
          <el-button @click="resetForm('accountaddForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入qs库
import qs from "qs";
export default {
  data() {
    // 自定义密码的验证
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("长度在3-6位"));
      } else {
        if (this.accountaddForm.checkpwd !== "") {
          this.$refs.accountaddForm.validateField("checkpwd");
        }
        callback();
      }
    };
    // 自定义确认密码的验证
    const checkpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.accountaddForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      accountaddForm: {
        username: "",
        password: "",
        checkpwd: "",
        usergroup: ""
      },
      rules: {
        // 非空验证
        // 账号验证
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在3-6位", trigger: "blur" }
        ],
        // 密码验证
        password: [
          {
            required: true,
            validator: pass,
            trigger: "blur"
          }
        ],
        // 确认密码
        checkpwd: [{ required: true, validator: checkpass, trigger: "blur" }],
        //用户组
        usergroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 点击这个登录按钮 触发这个函数
    // 登录按钮的触发函数
    submitForm(formName) {
      // 获取表单组件调用验证方法
      this.$refs[formName].validate(valid => {
        // 如果所有验证通过 valid就是true
        if (valid) {
          alert("添加成功");
          // 发送给后端 验证密码和账户的正确性

          //收集账号和密码发送给后端
          let param = {
            username: this.accountaddForm.username,
            password: this.accountaddForm.password,
            usergroup: this.accountaddForm.usergroup
          };

          // 使用axios发送给后端//
          this.axios
            .post(
              "http://127.0.0.1:3400/accountadd/accountadd",
              qs.stringify(param)
            )
            .then(response => {
              //
              // console.log(response.data);
              // 接受后端返回的错误码
              // let error_code = response.data.error_code;
              // // 接受错误信息
              // let reason = response.data.reason;

              let { error_code, reason }=response.data;
              // 根据后端响应的数据进行判断
              if (error_code === 0) {
                // 弹出成功的提示
                this.$message({
                  type: "success",
                  message:reason
                });
                // 跳转到账号管理列表
                this.$router.push('/accountmanage');
              } else {
                // 弹出失败的提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
          // 发送请求 把参数发给后端（把用户名和密码发给后端 验证是否正确）
        } else {
          // 否则就是false
          alert("登录失败");
          return false;
        }
      });
    },
    // 点击重置按钮 触发这个函数
    resetForm(formName) {
      // this.$refs.loginForm.resetFields() 获取整个表单组件 调用重置方法
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.accountadd {
  .el-input__inner {
    width: 400px;
    border: 1px solid black;
  }
  .el-form-item__label {
    color: black;

    font-size: 14px;
  }
}
</style>

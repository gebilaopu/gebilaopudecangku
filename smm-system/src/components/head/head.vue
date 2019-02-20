<template>
  <div class="header">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <i class="el-icon-menu"></i>欢迎你来到超市管理系统
        </div>
      </el-col>
      <el-col :span="12" >
        <div class="grid-content bg-purple-light welcome" >
          欢迎你

          <el-dropdown>
            <span class="el-dropdown-link">{{username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
           
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

  data(){
      return{
        username:''
      }
  }
};
</script>

<style lang="less">
.welcome{
  text-align: right;
  font-size: 20px;
    
}
</style>

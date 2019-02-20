<template>
  <el-aside width="200px" style="background-color: rgba(0, 0, 0 ,0.5)">
    <el-menu router unique-opened :default-active="this.$route.path" active-text-color="#130c0e">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-goods"></i>系统管理
        </template>
        <el-menu-item index="/">系统信息</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-message"></i>账号管理
        </template>
        <el-menu-item index="/accountmanage">账号管理</el-menu-item>
        <el-menu-item index="/accountadd">添加账号</el-menu-item>
        <el-menu-item index="/passwordmodify">密码修改</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-goods"></i>商品管理
        </template>
        <el-menu-item index="/goodsmanage">商品管理</el-menu-item>
        <el-menu-item index="/goodsadd">添加商品</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-date"></i>统计管理
        </template>
        <el-menu-item index="/salestatistics">销售统计</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  methods: {}
};
</script>

<style lang="less">
.el-container {
  height: 100%;

  .el-aside {
    .el-menu {
      background: none;
      border: none;
      .el-submenu__title {
        color: #ffffff;
      }
      .el-menu-item-group {
        .el-menu-item {
          color: rgba(245, 245, 245, 0.5);
          font-size: 12px;
        }
      }
    }
  }
}
</style>

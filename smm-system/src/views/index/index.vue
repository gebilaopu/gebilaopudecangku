<template>
  <div class="index">
    <!-- 内容容器 -->
    <el-container>
      <Nav></Nav>

      <el-container>
        <!-- 右侧顶部 -->
        <el-header>
          <Head></Head>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>

        <!-- 尾部 -->
        <el-footer>
          <Foot></Foot>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入导航组件
import Nav from "@/components/nav/nav.vue";
// 引入右侧头部组件
import Head from "@/components/head/head.vue";
//引入右侧尾部组件
import Foot from "@/components/foot/footer.vue";

export default {
  // 注册组件
  components: {
    Nav,
    Head,
    Foot
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    }
  },
  data() {
    return {
      tableData2: [
        {
          date: "海飞丝去屑洗发水",
          address: "8"
        },
        {
          date: "茅台酒",
          address: "6"
        },
        {
          date: "龙凤呈祥",
          address: "5  "
        },
        {
          date: "龙凤呈祥2",
          address: "2"
        }
      ],
      tableData: [{
            date: '我的优乐美',
            name: '0',
            address: '入库'
        },]
    };
  }
};
</script>

<style lang="less">
.index {
  height: 100%;
  background: url("../../../public/shuai.jpg");

  .el-main {
    background: rgba(245, 245, 245, 0.5);

    .el-card__header {
      font-size: 20px;
      font-weight: bold;
      background: rgba(228, 225, 225, 0.5);
    }

    .el-alert {
      margin-bottom: 20px;
      color: #333333;
      border: 1px solid bisque;
    }
    .el-col {
      width: 680px;
      border: 1px solid rgb(161, 159, 159);
      border-radius: 4px;
      .el-table_1_column_2 {
        text-align: center;
      }
      .cell {
        color: black;
      }
    }
    .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }
  }

  // 尾部与头部的样式
  .el-header {
    background: rgba(245, 245, 245, 0.8);

    .header {
      font-size: 30px;
      margin-top: 10px;
      color: #333333;
    }
  }
  .el-footer {
    background: rgba(245, 245, 245, 0.8);
    .footer {
      font-size: 16px;
      color: #333333;
      line-height: 60px;
    }
  }
}
</style>

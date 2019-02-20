<template>
  <div class="home">
    <!-- 内容容器 -->
    <el-card class="box-card">
      <!-- 头 -->
      <div slot="header" class="clearfix">
        <span>系统信息</span>
      </div>
      <!--  -->
      <el-alert title="商品总数：5。已经销售的总金额：89000.库存商品总价：1235.82" type="success"></el-alert>

      <el-alert title="导入数据" type="success"></el-alert>

      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>销售排行</span>
              </div>

              <el-table :data="tableData2" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="date" label="商品名称" width="180"></el-table-column>

                <el-table-column prop="address" label="销量"></el-table-column>
              </el-table>
            </el-card>
          </div>
        </el-col>

        <el-col :span="8" :push="4">
          <div class="grid-content bg-purple">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>缺货的商品</span>
              </div>

              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="date" label="商品名称" width="180"></el-table-column>

                <el-table-column prop="name" label="库存" width="180"></el-table-column>

                <el-table-column fixed="right" label="操作" width="120" prop="adress">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableData4)"
                      type="text"
                      size="small"
                    >入库</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </el-card>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  // 注册组件
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
      tableData: [
        {
          date: "我的优乐美",
          name: "0",
          address: "入库"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.home {
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

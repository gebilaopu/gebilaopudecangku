<template>
  <div class="accountmanage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号管理</span>
        <el-table
          ref="multipleTable"
          :data="accounttableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>

          <el-table-column prop="username" label="账号"></el-table-column>

          <el-table-column prop="usergroup" label="用户组"></el-table-column>
          <el-table-column label="日期">
            <template slot-scope="scope">{{ scope.row.ctime|filterCtime}}</template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row.id)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--修改弹出的模态框 -->
        <el-dialog title="账号修改" width="400px" :visible.sync="flag">
          <!-- 回填表单 -->
          <el-form :model="editForm" label-width="60px">
            <!-- 账号 -->
            <el-form-item label="账号" prop="username">
              <el-input
                style="width: 217px;"
                type="text"
                v-model="editForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <!-- 选中用户组 -->
            <el-form-item label="用户组" prop="usergroup">
              <el-select v-model="editForm.usergroup" placeholder="请选择用户组">
                <el-option label="普通用户" value="普通用户"></el-option>
                <el-option label="高级管理员" value="高级管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- 表单的尾部 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="flag = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[1, 2, 3, 4]"
          :page-size="3"
          layout="total, sizes, prev, pager, next, jumper"
          :total="80"
        ></el-pagination>

        <!-- 批量删除 -->
        <div style="margin-top: 20px">
          <el-button @click="setCurrent()">批量删除</el-button>
          <el-button @click="setCurrent()">取消全选</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>


<script>
// 引入moment模块
import moment from "moment";
// 引入qs模块
import qs from "qs";

export default {
  data() {
    return {
      accounttableData: [], //用户账号表单数据
      flag: false, //控制修改模态框的显示和隐藏
      editForm: {
        //修改表单数据
        username: "",
        usergroup: ""
      },
      editId: "", //要修改的数据id

      currentPage4: 4,

      multipleSelection: []
    };
  },
  // 生命周期的钩子函数 created  自动触发 vue组件实例对象创建完成 dom还没有绑定
  // 这个函数里面适合发送ajax请求 获取数据
  created() {
    // console.log("自动触发 在vue组件渲染的过程中");
    // 自动发送请求 获取所有的账号数据
    this.getaccountmanage();
  },

  // 方法
  methods: {
    getaccountmanage() {
      this.axios
        .get("http://127.0.0.1:3400/accountadd/accountmanage")
        .then(response => {
          // 把后端返回的账号数据 赋值给用户账号表格数据
          this.accounttableData = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    // 删除账号的函数
    handleDelete(id) {
      this.$confirm("你确定要删除吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 如果是确定就执行then
        .then(() => {
          this.axios
            .get(`http://127.0.0.1:3400/accountadd/accountdel?id=${id}`)
            .then(response => {
              // console.log("删除结果", response.data);
              //  接受删除的错误码

              // 接受删除的提示信息
              let { error_code, reason } = response.data;

              // 判断
              if (error_code === 0) {
                // 弹出删除成功的提示
                this.$message({
                  type: "success",
                  $message: reason
                });
                // 刷新列表（删除后的再次请求 显示删除后的画面）
                this.getaccountmanage();
              } else {
                // 弹出删除失败的提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //  修改
    handleEdit(id) {
      // 把要修改的id保存起来
      this.editId = id;
      //显示模态框

      //发送请求给后台 id
      this.axios
        .get(`http://127.0.0.1:3400/accountadd/accountedit?id=${id}`)
        .then(response => {
          let result = response.data[0];
          // 回填表单
          
          this.editForm.username = result.username;
          this.editForm.usergroup = result.usergroup;
          this.flag = true;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 保存修改
    saveEdit() {
      // 收集新数据和一个原来的id
      let params = {
        username: this.editForm.username,
        usergroup: this.editForm.usergroup,
        editId: this.editId
      };
      // 发送ajax请求把新数据和原来的id一起发给后端
      this.axios
        .post(
          "http://127.0.0.1:3400/accountadd/accounteditsave",
          qs.stringify(params)
        )
        .then(response => {
          // 接受错误码和提示信息
          let { error_code, reason } = response.data;
          if (error_code === 0) {
            // 弹出成功的提示
            this.$message({
              type: "success",
              message: reason
            });
            // 刷新请求所有账号数据
            this.getaccountmanage();
          } else {
            // 弹出失败提示
            this.$message.error(reason);
          }
          // 关闭模态框
          this.flag = false;
        })
        .catch(err => {
          console.log(err);
        });
      //关闭模态框
      
    }
  },

  // 过滤器
  filters: {
    // 过滤时间的函数
    filterCtime(ctime) {
      return moment(ctime).format("YY-MM-DD HH:mm:ss");
    }
  }
};
</script>


<style lang="less">
.cell {
  font-size: 18px;
  color: black;
}
.el-pagination {
  margin-top: 20px;
}
</style>

<!-- 用户管理 -->
<template>
  <section>
    <el-card header="用户管理">
      <el-row>
        <el-form class="formStyle1">
          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input placeholder="请输入用户名" v-model="userName" clearable></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="用户标识">
              <el-input placeholder="请输入用户标识" v-model="userId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="4" :span="4">
            <el-button mc-type="column-el-button" size="mini" @click="_findUser()" type="primary">查询</el-button>
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="dialogFormVisible = true,newForm.userId = new Date().getTime()"
              type="primary"
            >新增</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card>
      <el-table :data="tableList" :fit="true" :show-header="true">
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="userId" label="用户标识"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200px">
          <template slot-scope="scope">
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="_delUser(scope.row.userId)"
              type="danger"
            >删除</el-button>
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="toStudent(scope.row.userId)"
              type="primary"
            >查看学生</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
      <el-form :model="newForm">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="newForm.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户标识">
          <el-input placeholder="请输入用户标识" v-model="newForm.userId" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="_addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { addUser, findUser, delUser } from "@/api/api";
export default {
  data() {
    return {
      tableList: [],
      userName: "",
      userId: "",
      newForm: {
        userName: "",
        userId: ""
      },
      dialogFormVisible: false
    };
  },
  mounted() {
    this._findUser();
  },
  methods: {
    _findUser() {
      findUser({ userName: this.userName, userId: this.userId }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this.tableList = res.data;
      });
    },
    _addUser() {
      addUser(this.newForm).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this._findUser();
        this.$message.success("创建成功");
        this.dialogFormVisible = false
      });
    },
    _delUser(id) {
      delUser({userId:id}).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this._findUser();
      });
    },
    toStudent(id){
      this.$router.push({name:"addStudent",params:{id: id}})
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
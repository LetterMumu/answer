<!-- 添加学生 -->
<template>
  <section>
    <el-card header="用户学生管理">
      <el-row>
        <el-form class="formStyle1">
          <!-- <el-col :span="8">
            <el-form-item label="请输入学号">
              <el-input placeholder="请输入学号" v-model="userName" clearable></el-input>
            </el-form-item>
          </el-col> -->
          <el-col  :span="8">
            <!-- <el-button mc-type="column-el-button" size="mini" @click="_findStudent()" type="primary">查询</el-button> -->
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="dialogFormVisible = true"
              type="primary"
            >添加学生</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card>
      <el-table :data="tableList" :fit="true" :show-header="true">
        <el-table-column prop="studentname" label="用户名"></el-table-column>
        <el-table-column prop="studentId" label="用户标识"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200px">
          <template slot-scope="scope">
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="_delStudent(scope.row.studentId)"
              type="danger"
            >删除</el-button>
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
        <el-button type="primary" @click="_addStudent()">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import { findStudent,addStudent,delStudent } from "@/api/api";
export default {
  data() {
    return {
      tableList: [],
      newForm: {
        userName: "",
        userId: ""
      },
      dialogFormVisible: false
    };
  },
  mounted() {
    this._findUser(this.$route.params.id);
  },
  methods: {
    _findUser(id) {
      findStudent({userId: id }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this.tableList = res.data;
      });
    },
    _addStudent() {
        let obj = this.newForm
        obj.id =this.$route.params.id
      addStudent(obj).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
         this._findUser(this.$route.params.id)
        this.$message.success("创建成功");
        this.dialogFormVisible = false
      });
    },
    _delStudent(id){
      delStudent({userId:this.$route.params.id,id:id}).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message.success(res.msg);
        this._findUser(this.$route.params.id);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
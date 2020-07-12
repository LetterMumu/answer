<!-- 试题管理 -->
<template>
  <section>
    <el-card header="试题管理">
      <el-row>
        <el-form class="formStyle1">
          <el-col :span="8">
            <el-form-item label="试题名">
              <el-input placeholder="请输入试题名" v-model="name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="12" :span="4">
            <el-button mc-type="column-el-button" size="mini" @click="_findAnswer()" type="primary">查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card>
      <el-table :data="tableList" :fit="true" :show-header="true">
        <el-table-column prop="name" label="试题名"></el-table-column>
        <el-table-column prop="score" label="分数"></el-table-column>
        <el-table-column prop="time" label="考试时长"></el-table-column>
        <el-table-column label="操作" fixed="right" width="400">
          <template slot-scope="scope">
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="_delAnswer(scope.row.answerId)"
              type="danger"
            >删除</el-button>
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="_handOut(scope.row.answerId)"
              type="danger"
            >发卷</el-button>
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="toDeital(scope.row)"
              type="primary"
            >试题详情</el-button>
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="toRead(scope.row.answerId)"
              type="primary"
            >批阅</el-button>
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="toScore(scope.row.answerId)"
              type="primary"
            >成绩汇总</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>
<script>
import { findAnswer, delAnswer,handOut } from "@/api/api";
export default {
  data() {
    return {
      tableList: [],
      name: "",
      userId: sessionStorage.getItem("userId"),
    };
  },
  mounted() {
    this._findAnswer();
  },
  methods: {
    _findAnswer() {
      findAnswer({ name: this.name, userId: this.userId }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this.tableList = res.data;
      });
    },
    _delAnswer(id) {
      delAnswer({ id: id, userId: this.userId }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this._findAnswer();
      });
    },
    _handOut(id){
      handOut({ id: id, userId: this.userId }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message.success(res.msg);
      });
    },
    toDeital(docment){
      this.$router.push({name:"productControl",params:{data:JSON.stringify(docment)}})
    },
    toRead(id){
      this.$router.push({name:"readOver",params:{id: id}})
    },
    toScore(id){
      this.$router.push({name:"scorePage",params:{id: id}})
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
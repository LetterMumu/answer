<template>
  <section>
    <el-card header="试题批阅列表">
      <el-table :data="tableList" :fit="true" :show-header="true">
        <el-table-column prop="name" label="试题名"></el-table-column>
        <el-table-column prop="studentname" label="学生姓名"></el-table-column>
        <el-table-column prop="score" label="试题分数"></el-table-column>
        <el-table-column prop="time" label="考试时长"></el-table-column>
        <el-table-column label="操作" fixed="right" width="250">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state == 1 && scope.row.classScore == 0"
              mc-type="column-el-button"
              size="mini"
              @click="Read(scope.row)"
              type="primary"
            >批阅</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>
<script>
import { getStudentAnswer } from "@/api/api";
export default {
  data() {
    return {
      tableList: [],
      name: "",
      userId: sessionStorage.getItem("userId"),
      answerId: this.$route.params.id || sessionStorage.getItem("answerId")
    };
  },
  mounted() {
    this._getStudentByAnswer();
  },
  methods: {
    _getStudentByAnswer() {
      getStudentAnswer({ userId: this.userId, answerId: this.answerId }).then(
        res => {
          if (res.code != 0) {
            this.$message.error(res.msg);
            return;
          }
          this.tableList = res.data;
        }
      );
    },
    Read(document){
      sessionStorage.setItem("answerId",this.answerId)
        this.$router.push({name:"readControl",params:{data:JSON.stringify(document)}})
    },
  }
};
</script>
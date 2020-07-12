<template>
  <section>
    <el-card header="题目收藏">
      <el-row>
        <el-form class="formStyle1">
          <el-col :span="8">
            <el-form-item label="题目名">
              <el-input placeholder="请输入题目" v-model="name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="12" :span="4">
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="_findCollect()"
              type="primary"
            >查询</el-button>
          </el-col>
        </el-form>
      </el-row>
    </el-card>
    <el-card>
      <el-table :data="tableList" :fit="true" :show-header="true">
        <el-table-column prop="name" label="试题名"></el-table-column>
        <el-table-column prop="score" label="分数"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200px">
          <template slot-scope="scope">
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="toDeital(scope.row)"
              type="primary"
            >查看题目</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="详情" :visible.sync="centerDialogVisible" width="30%" center>
      <aside class="answerClass" ref="answerDiv"></aside>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { findCollect } from "@/api/api";
export default {
  props: {},
  data() {
    return {
      tableList: [],
      name: "",
      userId: sessionStorage.getItem("userId"),
      centerDialogVisible: false
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this._findCollect();
  },
  methods: {
    _findCollect() {
      findCollect({ name: this.name, userId: this.userId }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this.tableList = res.data;
      });
    },
    toDeital(data) {
      this.centerDialogVisible = true;
      let obj = data;
      let str1 = "",
        str2 = "",
        str3 = "";
      for (let i in obj) {
        switch (i) {
          case "name":
            str1 += `<p>题目&nbsp:&nbsp&nbsp${obj[i]}</p>`;
            break;
          case "list":
            for (let j in obj[i]) {
              str2 += `<p>${j}&nbsp&nbsp&nbsp&nbsp&nbsp:&nbsp&nbsp${obj[i][j]}</p>`;
            }
            break;
          case "answer":
            str3 += `<p>答案&nbsp:&nbsp&nbsp${obj[i]}</p>`;
        }
      }
      this.$nextTick(() =>this.$refs.answerDiv.innerHTML = str1 + str2 + str3);
    }
  }
};
</script>
<style scoped lang='scss'>
.answerClass{
  p {
    margin: 20px 0;
  }
}
</style>

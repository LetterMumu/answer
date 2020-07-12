<template>
  <section>
    <el-card header="试题列表">
      <el-row>
        <el-form class="formStyle1">
          <el-col :span="8">
            <el-form-item label="试题名">
              <el-input placeholder="请输入试题名" v-model="name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :offset="12" :span="4">
            <el-button
              mc-type="column-el-button"
              size="mini"
              @click="_findAnswer()"
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
        <el-table-column prop="time" label="考试时长"></el-table-column>
        <el-table-column label="操作" fixed="right" width="200px">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.state == '0'"
              mc-type="column-el-button"
              size="mini"
              @click="toDeital(scope.row)"
              type="primary"
            >答题</el-button>
            <el-button
              v-else
              mc-type="column-el-button"
              size="mini"
              @click="showDeital(scope.row)"
              type="primary"
            >查看试题</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </section>
</template>

<script>
import { sFindAnswer } from "@/api/api";
export default {
  props: {},

  data() {
    return {
      tableList: [],
      name: "",
      userId: sessionStorage.getItem("userId"),
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this._findAnswer()
    window.onresize = function temp() {
      console.log("窗口变动了");
    };
  },
  methods: {
    _findAnswer() {
      sFindAnswer({ name: this.name, userId: this.userId }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this.tableList = res.data;
      });
    },
    //全屏
    fullScreen() {
      var el = document.documentElement;
      var rfs =
          el.requestFullScreen ||
          el.webkitRequestFullScreen ||
          el.mozRequestFullScreen ||
          el.msRequestFullScreen,
        wscript;
      if (typeof rfs == "undefined" && (navigator.mediaDevices || navigator.mediaDevices.enumerateDevices)) {
        this.$message({
          showClose: true,
          message: "该浏览器不满足考试系统要求，请更换浏览器",
          type: "warning"
        });
      }
      if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
        return;
      }

      if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    toDeital(docment) {
      console.log(navigator.mediaDevices.getUserMedia({video: true}).then(() =>{
        this.fullScreen();
      this.$router.push({
        name: "answerSheet",
        params: { data: JSON.stringify(docment) }
      });
      }).catch(() => {
        this.$message.info("摄像头开启失败，请检查摄像头是否可用！");
      }))
      
    },
    showDeital(docment) {
      this.$router.push({
        name: "showSwerSheet",
        params: { data: JSON.stringify(docment) }
      });
    }
  }
};
</script>
<style scoped lang='scss'>
.canvasPos {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>

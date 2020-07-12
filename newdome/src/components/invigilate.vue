<template>
  <section class="loginClass clearfix" style="height:auto">
    <videoTem
      v-for="item in tableList"
      :key="item.studentId"
      :userName="item.studentname"
      :studentId="item.studentId"
    />
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="prev, pager, next"
      :total="this.tableList.length"
    ></el-pagination>
  </section>
</template>
<script>
import { login, findStudent } from "@/api/api";
import videoTem from "./videoTem/videoTem.vue";
export default {
  props: {
    url: "",
    userName: ""
  },
  components: {
    videoTem
  },
  data() {
    return {
      tableList: [],
      smallList: [],
      currentPage1: 1
    };
  },
  mounted() {
    this._findUser(sessionStorage.getItem("userId"));
  },
  methods: {
    _findUser(id) {
      findStudent({ userId: id }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this.tableList = res.data;
        this.smallList = this.tableList.slice(0, 6);
      });
    },
    handleCurrentChange(val) {
      this.smallList = this.tableList.slice(val*6, val*6+6);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

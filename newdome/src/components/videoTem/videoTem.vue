<template>
  <section class="loginClass clearfix">
    <video :id="id" controls width="320" height="200"></video>
    <p>姓名：{{userName}}</p>
  </section>
</template>
<script>
import { login } from "@/api/api";
export default {
  props: {
    studentId: "",
    userName: ""
  },
  data() {
    return {
    };
  },
  mounted() {
    this.aaa();
  },
  methods: {
    aaa() {
      if (flvjs.isSupported()) {
        var flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: `http://localhost:8000/live/${this.studentId}.flv`
        });
        flvPlayer.attachMediaElement(id);
        flvPlayer.load(); //加载
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

<template>
  <section class="loginClass clearfix">
    <video class="video-js" controls data-setup="{}" width="960" height="400">
        <source src="http://localhost:8000/live/STREAM_NAM.flv"></source>
    </video>
    <p>姓名：{{userName}}</p>
  </section>
</template>
<script>
import { login } from "@/api/api";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-flash";
export default {
  props: {
    url: "",
    userName: "",
    id: ""
  },
  data() {
    return {};
  },
  mounted() {
    this.aaa();
  },
  methods: {
    aaa() {

    }
  }
};
</script>
<style lang="scss" scoped>
</style>

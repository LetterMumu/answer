// 主观题
<template>
  <el-card>
    <el-form :model="answerList" label-width="100px">
      <el-row>
        <el-col>
          <p class="lettleTitle">{{indexKey}}.</p>
        </el-col>
        <el-col :span="16">
          <el-form-item label="题目">
            <el-input v-model="answerList.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="分数">
            <el-input v-model="answerList.score"></el-input>
          </el-form-item>
        </el-col>
        <el-col :offset="2" :span="4">
          <el-button type="danger" @click="delet">删除题目</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>
<script>
import { publicFun } from "@/mixin/mixin";
export default {
  mixins: [publicFun],
  props: {
    indexKey: {
      type: Number
    }
  },
  data() {
    return {
      answerList: this.$parent.$parent.subJectiveArray[this.indexKey - 1]
    };
  },
  created() {},
  mounted() {},
  methods: {
    fun() {
      console.log(this.answerList);
    },
    delet(){
      this.$parent.$parent.delTopic({name:'subJectiveArray',indexKey:this.indexKey-1})
    }
  }
};
</script>
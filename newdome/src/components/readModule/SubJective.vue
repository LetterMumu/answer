// 主观题
<template>
  <el-card>
    <el-form :model="answerList" label-width="100px">
      <el-row>
        <el-col>
          <p class="lettleTitle">{{indexKey}}.</p>
        </el-col>
        <el-col :span="16">
          <el-form-item label="题目:">
            <p>{{answerList.name}}</P>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="答案:">
            <p>{{answerList.useranswer}}</p>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="题目分值:">
            <p>{{answerList.score}}</P>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="分数:">
            <el-input v-model="answerList.teacherScore"></el-input>
          </el-form-item>
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
  }
};
</script>
// 判断
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
        <el-col
          :span="16"
          v-for="(item,index) in Object.keys(answerList.list)"
          :key="`single${index}`"
        >
          <el-form-item :label="item">
            <el-input v-model="answerList.list[item]"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="答案">
            <el-radio-group v-model="answerList.answer">
              <el-radio v-for="(item,index) in answer" :label="item" :key="`answer${index}`"></el-radio>
            </el-radio-group>
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
      answer: ["1", "2"],
      answerList: this.$parent.$parent.judgeArray[this.indexKey - 1]
    };
  },
  created() {},
  mounted() {},
  methods: {
    aaaa() {
      console.log(this.answerList.list[1]);
    },
    delet() {
      this.$parent.$parent.delTopic({name:'judgeArray',indexKey:this.indexKey-1})
    }
  }
};
</script>
// 多选
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
        <el-col
          :span="16"
          v-for="(item,index) in Object.keys(answerList.list)"
          :key="`single${index}`"
        >
          <el-form-item :label="`${item}:`">
            <p>{{answerList.list[item]}}</P>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="学生答案:">
           <P>{{answerList.useranswer}}</P>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="答案:">
            <P>{{answerList.answer}}</P>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="题目分值:">
            <p>{{answerList.score}}</P>
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
      answer: ["A", "B", "C", "D", "E"],
      answerList:this.$parent.$parent.multipleChoiceArray[this.indexKey - 1]
    };
  },
  created() {
  },
  mounted() { 
  },
  methods: {
    _collect(obj) {
      let data = {
        collectObj : obj,
        userId : sessionStorage.getItem("userId")
      }
      collect(data).then(res => {

      })
    }
  }
};
</script>
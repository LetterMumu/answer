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
            <el-input type="textarea" v-model="answerList.useranswer"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="分数:">
            <p>{{answerList.score}}</P>
          </el-form-item>
        </el-col>
        <el-col :offset="2" :span="4">
          <el-button type="danger" @click="_collect(answerList)">收藏题目</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-card>
</template>
<script>
import { collect } from '@/api/api'
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
    _collect(obj) {
      let data = {
        collectObj : obj,
        userId : sessionStorage.getItem("userId")
      }
      collect(data).then(res => {
        if(res.code == 0){
          this.$message.success("收藏成功")
        }else{
          this.$message.success("收藏失败")
        }
      })
    }
  }
};
</script>
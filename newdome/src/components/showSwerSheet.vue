<!--查看试题-->
<template>
  <section>
    <el-row class="control">
      <el-col>
        <p class="moduleTitle"><span class="backToText" @click="$router.go(-1)">返回上级 | </span>答题信息</p>
        <el-form :model="testpaperList" class="formStyle">
          <el-col :span="8">
            <el-form-item label="试题名称:">
              <span>{{testpaperList.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考试时长(min):">
              <span>{{testpaperList.time}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试题总分:">
              <span>{{testpaperList.score}}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <section
        v-if="singleChoiceArray.length !== 0 || multipleChoiceArray.length !== 0 || judgeArray.length !== 0 || subJectiveArray.length !== 0"
      >
        <p class="smallTitle">试题信息</p>
        <section class="sectionBlock" v-if="singleChoiceArray.length !== 0">
          <el-row class="smallTitle">单选</el-row>
          <x-single-choice
            v-for="(item,index) in singleChoiceArray"
            :indexKey="index+1"
            :key="item.key"
          />
        </section>
        <section class="sectionBlock" v-if="multipleChoiceArray.length !== 0">
          <el-row class="smallTitle">多选</el-row>
          <x-multiple-choice
            v-for="(item,index) in multipleChoiceArray"
            :indexKey="index+1"
            :key="item.key"
          />
        </section>
        <section class="sectionBlock" v-if="judgeArray.length !== 0">
          <el-row class="smallTitle">判断</el-row>
          <x-judge v-for="(item,index) in judgeArray" :indexKey="index+1" :key="item.key" />
        </section>
        <section class="sectionBlock" v-if="subJectiveArray.length !== 0">
          <el-row class="smallTitle">主观题</el-row>
          <x-sub-jective
            v-for="(item,index) in subJectiveArray"
            :indexKey="index+1"
            :key="item.key"
          />
        </section>
      </section>
      <section v-else>
        <div class="noTopic">
          <p>暂无试题信息...</p>
        </div>
      </section>
    </el-row>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
import html2canvas from "html2canvas";
import { saveScore ,pushScore } from "@/api/api";
import judge from "./showModule/judge";
import multipleChoice from "./showModule/multipleChoice";
import singleChoice from "./showModule/singleChoice";
import subJective from "./showModule/subJective";
export default {
  props: {},
  components: {
    "x-judge": judge,
    "x-multiple-choice": multipleChoice,
    "x-single-choice": singleChoice,
    "x-sub-jective": subJective
  },
  data() {
    return {
      singleChoiceArray: [], //单选题数据数组
      multipleChoiceArray: [], //多选题数据数组
      judgeArray: [], //判断题数据数组
      subJectiveArray: [], //主观题数据数组
      testpaperList: {
        //试题名字
        name: "",
        time: "",
        score: "",
        studentScore: 0,
        classScore:0
      },
      answerArr: [],
      fencheng: {
        student: "",
        class: ""
      }
    };
  },
  mounted() {
    this.echo();
  },
  methods: {
    echo() {
      if (this.$route.params.data) {
        let obj = JSON.parse(this.$route.params.data);
        this.singleChoiceArray = obj.answerList.singleChoiceArray;
        this.multipleChoiceArray = obj.answerList.multipleChoiceArray;
        this.judgeArray = obj.answerList.judgeArray;
        this.subJectiveArray = obj.answerList.subJectiveArray;
        this.answerArr = obj.answerArr;
        this.testpaperList = {
          name: obj.name,
          time: obj.time,
          score: obj.score,
          studentScore: 0,
          classScore: 0
        };
      }
    },
  }
};
</script>
<style scoped lang='scss'>
.sectionBlock {
  margin-top: 10px;
  border: 1px solid #ebeef5;
  border-radius: 5px;
  padding-top: 5px;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.1);
  background-color: white;
  .smallTitle {
    padding: 0px 20px;
  }
}
.control {
  width: 100%;
  .leftControl {
    height: 20px;
    position: fixed;
  }
}
.noTopic {
  width: 100%;
  height: 80vh;
  color: #888888;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

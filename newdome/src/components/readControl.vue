<!--批阅试题-->
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
    <aside class="fixedBtn">
      <section class="rowbtn">
        <el-button type="primary" @click="photoVisible = true">查看图片</el-button>
        <el-button type="primary" @click="sureScore()">批阅完成</el-button>
        <el-button type="primary" @click="zuobi()">判定作弊</el-button>
      </section>
    </aside>
    <el-dialog title="查看图片" :visible.sync="photoVisible" width="30%">
      <div class="demo-image__preview">
        <el-image v-for="(item,index) in answerArr" :key="index" style="width: 100px; height: 100px" :src="item" :preview-src-list="answerArr"></el-image>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="photoVisible = false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="分数计算" :visible.sync="dialogVisible" width="30%">
      <el-form>
        <el-form-item label="试题分数">
          <el-input v-model="testpaperList.studentScore" disabled></el-input>
        </el-form-item>
        <el-form-item label="分数分成">
          <el-input v-model="fencheng.student"></el-input>
        </el-form-item>
        <el-form-item label="平时分数">
          <el-input v-model="testpaperList.classScore"></el-input>
        </el-form-item>
        <el-form-item label="分数分成">
          <el-input v-model="fencheng.class"></el-input>
        </el-form-item>
        <el-form-item label="总分">
          {{testpaperList.studentScore*fencheng.student/10+testpaperList.classScore*fencheng.class/10}}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="_saveAnswer()">提交</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
import html2canvas from "html2canvas";
import { saveScore ,pushScore } from "@/api/api";
import judge from "./readModule/judge";
import multipleChoice from "./readModule/multipleChoice";
import singleChoice from "./readModule/singleChoice";
import subJective from "./readModule/subJective";
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
      full: 1,
      dialogVisible: false,
      photoVisible: false,
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
    sureScore(){
      this.setScore();
      this.fencheng.student = 0
      this.testpaperList.classScore = 0
      this.fencheng.class = 0
      this.dialogVisible = true;
    },
    zuobi(){
      this.testpaperList.studentScore = 0
      this.fencheng.student = 0
      this.testpaperList.classScore = 0
      this.fencheng.class = 0
      this.dialogVisible = true;
    },
    setScore() {
      let i = 0;
      this.singleChoiceArray.forEach(item => {
        if (item.useranswer === item.answer) {
          i += item.score * 1;
        }
      });
      this.multipleChoiceArray.forEach(item => {
        if (
          item.useranswer.sort().toString() === item.answer.sort().toString()
        ) {
          i += item.score * 1;
        }
      });
      this.judgeArray.forEach(item => {
        if (item.useranswer === item.answer) {
          i += item.score * 1;
        }
      });
      this.subJectiveArray.forEach(item => {
        i += item.teacherScore * 1;
      });
      this.testpaperList.studentScore = i;
    },
    _saveAnswer() {
      
      let data = {
        userId: JSON.parse(this.$route.params.data).studentId,
        answerId: JSON.parse(this.$route.params.data).answerId,
        answer: {
          name: this.testpaperList.name,
          score: this.testpaperList.score,
          answerScore: this.testpaperList.studentScore,
          classScore :this.testpaperList.classScore,
          time: this.testpaperList.time,
          answerId: JSON.parse(this.$route.params.data).answerId,
          answerArr: this.answerArr,
          state:'1',
          answerList: {
            singleChoiceArray: this.singleChoiceArray,
            multipleChoiceArray: this.multipleChoiceArray,
            judgeArray: this.judgeArray,
            subJectiveArray: this.subJectiveArray
          }
        }
      };
      saveScore(data).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
        }
        this.$message.success(res.msg);
      });
      let obj = {
        answerId:JSON.parse(this.$route.params.data).answerId,
        userId:sessionStorage.getItem("userId"),
        score:this.testpaperList.studentScore*this.fencheng.student/10+this.testpaperList.classScore*this.fencheng.class/10,
        answerScore:this.testpaperList.studentScore,
        classScore:this.testpaperList.classScore,
        answerp:this.fencheng.student,
        classp:this.fencheng.class,
        name:this.testpaperList.name,
        studentName:JSON.parse(this.$route.params.data).studentname
      }
      pushScore(obj).then(res => {

      })
    }
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

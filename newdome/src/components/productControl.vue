<template>
  <section>
    <el-row class="control">
      <el-col>
        <p class="smallTitle">试题信息</p>
        <el-form :model="testpaperList" class="formStyle1">
          <el-col :span="8">
            <el-form-item label="试题名称">
              <el-input v-model="testpaperList.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="考试时长">
              <el-input v-model="testpaperList.time"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="试题分数">
              <el-input v-model="sum" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <aside class="fixedBtn">
        <section class="rowbtn">
          <el-button
            type="primary"
            @click="addControl('singleChoiceList','singleChoiceArray')"
          >添加单选题</el-button>
          <el-button
            type="primary"
            @click="addControl('multipleChoiceList','multipleChoiceArray')"
          >添加多选题</el-button>
          <el-button type="primary" @click="addControl('judgeList','judgeArray')">添加判断题</el-button>
          <el-button type="primary" @click="addControl('subJectiveList','subJectiveArray')">添加主观题</el-button>
          <el-button type="primary" @click="_saveAnswer()">保存试题</el-button>
        </section>
      </aside>
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
            @deltopic="delTopic"
            @addtopic="addTopic"
          />
        </section>
        <section class="sectionBlock" v-if="multipleChoiceArray.length !== 0">
          <el-row class="smallTitle">多选</el-row>
          <x-multiple-choice
            v-for="(item,index) in multipleChoiceArray"
            :indexKey="index+1"
            :key="item.key"
            @deltopic="delTopic"
            @addtopic="addTopic"
          />
        </section>
        <section class="sectionBlock" v-if="judgeArray.length !== 0">
          <el-row class="smallTitle">判断</el-row>
          <x-judge
            v-for="(item,index) in judgeArray"
            :indexKey="index+1"
            :key="item.key"
            @deltopic="delTopic"
            @addtopic="addTopic"
          />
        </section>
        <section class="sectionBlock" v-if="subJectiveArray.length !== 0">
          <el-row class="smallTitle">主观题</el-row>
          <x-sub-jective
            v-for="(item,index) in subJectiveArray"
            :indexKey="index+1"
            :key="item.key"
            @deltopic="delTopic"
            @addtopic="addTopic"
          />
        </section>
      </section>
      <section v-else>
        <div class="noTopic">
          <p>欢迎使用Mumu考试系统，请编辑试题...</p>
        </div>
      </section>
    </el-row>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
import { saveAnswer } from "@/api/api";
import judge from "./topicTemplate/judge";
import multipleChoice from "./topicTemplate/multipleChoice";
import singleChoice from "./topicTemplate/singleChoice";
import subJective from "./topicTemplate/subJective";
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
      singleChoiceList: {
        name: "",
        list: {
          A: "",
          B: "",
          C: "",
          D: ""
        },
        answer: "",
        score: ""
      }, //单选题模板
      multipleChoiceList: {
        name: "",
        list: {
          A: "",
          B: "",
          C: "",
          D: "",
          E: ""
        },
        answer: [],
        score: "",
        useranswer:[]
      }, //多选题模板
      judgeList: {
        name: "",
        list: {
          [1]: "",
          [2]: ""
        },
        answer: "",
        score: ""
      }, //判断题模板
      subJectiveList: {
        name: "",
        answer: ""
      }, //主观题模板
      singleChoiceArray: [], //单选题数据数组
      multipleChoiceArray: [], //多选题数据数组
      judgeArray: [], //判断题数据数组
      subJectiveArray: [], //主观题数据数组
      testpaperList: {
        //试题名字
        name: "",
        time: "",
        score: ""
      }
    };
  },
  computed: {
    sum() {
      this.testpaperList.score = 0;
      this.singleChoiceArray.forEach(item => {
        this.testpaperList.score += item.score * 1;
      });
      this.multipleChoiceArray.forEach(item => {
        this.testpaperList.score += item.score * 1;
      });
      this.judgeArray.forEach(item => {
        this.testpaperList.score += item.score * 1;
      });
      this.subJectiveArray.forEach(item => {
        this.testpaperList.score += item.score * 1;
      });
      return this.testpaperList.score;
    }
  },
  watch: {},
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
        this.testpaperList = {
          name: obj.name,
          time: obj.time,
          score: obj.score
        };
      }
    },
    ...mapMutations({
      saveProductState: "SAVEPRODUCTSTATE",
      saveProductID: "SAVEPRODUCTID"
    }),
    addControl(item, list) {
      this[list].push(
        Object.assign(this.DeepClone(this[item]), { key: new Date().getTime() })
      );
    },
    DeepClone(obj) {
      if (obj === null || typeof obj !== "object") return obj;
      var cpObj = obj instanceof Array ? [] : {};
      for (var key in obj) cpObj[key] = this.DeepClone(obj[key]);
      return cpObj;
    },
    delTopic(obj) {
      this[obj.name].splice(obj.indexKey, 1);
    },
    addTopic(obj) {
      this[obj.name][obj.indexKey] = Object.assign(
        {},
        this[obj.name][obj.indexKey],
        obj.data
      );
    },
    setUuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },
    //保存
    _saveAnswer() {
      let data = this.testpaperList;
      data.answer = {
        singleChoiceArray: this.singleChoiceArray,
        multipleChoiceArray: this.multipleChoiceArray,
        judgeArray: this.judgeArray,
        subJectiveArray: this.subJectiveArray
      };
      data.userId = sessionStorage.getItem("userId");
      if (this.$route.params.data) {
        data.answerId = JSON.parse(this.$route.params.data).answerId
      } else {
        data.answerId = this.setUuid();
      }
      console.log("data", data);
      saveAnswer(data).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this.$message.success(res.msg);
      });
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

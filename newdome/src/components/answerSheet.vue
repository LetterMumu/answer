<template>
  <section>
    <el-row class="control">
      <el-col>
        <p class="smallTitle">答题信息</p>
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
      <canvas v-show="false" ref="canvas" width="640" height="480"></canvas>
      <section class="rowbtn">
        <span ref="time"></span>
        <el-button type="primary" v-if="!upsess" @click="_saveAnswer()">提交</el-button>
      </section>
    </aside>
    <div class="canvasPos">
      <!--图片展示-->
      <video ref="video" width="120" height="80" autoplay></video>
    </div>
    <el-dialog title="警告" :visible.sync="dialogVisible" width="30%">
      <span>检测到您有作弊嫌疑，累计两次将强制交卷</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">继续答题</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="警告"
      :visible.sync="saveShijuan"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      width="30%"
    >
      <span>考试时间到，请提交试题</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="_saveAnswer(),saveShijuan = false">交卷</el-button>
      </span>
    </el-dialog>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
import html2canvas from "html2canvas";
import { sSaveAnswer } from "@/api/api";
import judge from "./answerModule/judge";
import multipleChoice from "./answerModule/multipleChoice";
import singleChoice from "./answerModule/singleChoice";
import subJective from "./answerModule/subJective";
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
        studentScore: 0
      },
      answerArr: [],
      takePhoto: "",
      full: 1,
      dialogVisible: false,
      saveShijuan: false,
      oldWidth: "",
      falg: true,
      upsess: false,
      timer:null
    };
  },
  mounted() {
    this.echo();
    (this.takePhoto = this.randomArr(this.testpaperList.time * 60)),
      this.callCamera();
    this.checkCodeCountDown(this.testpaperList.time * 60);
    const that = this;
    document.oncontextmenu = function() {
      return false;
    };
    setTimeout(() => {
      this.oldWidth = document.body.clientHeight;
      window.onresize = () => {
        that.winChange();
      };
    }, 500);
    document.addEventListener("mousemove", this.mouseoutFun);
  },
  methods: {
    mouseoutFun(event) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        let e = event || window.event;
        var x = e.clientX;
        var y = e.clientY;
        if (
          x <= 1 ||
          y <= 1 ||
          x >= window.innerWidth - 1 ||
          y >= window.innerHeight - 1
        ) {
          if (this.full >= 2) {
            if (!this.upsess) {
              this._saveAnswer();
            }
          } else {
            this.full++;
            this.$message.warning("检测到您有作弊嫌疑");
            if (this.falg) {
              this.dialogVisible = true;
              this.fullScreen();
            }
          }
        }
      }, 100);
    },
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
          score: obj.score,
          studentScore: 0
        };
      }
    },
    //
    winChange() {
      console.log(this);
      if (document.body.clientHeight != this.oldWidth) {
        if (this.full >= 2) {
          if (!this.upsess) {
            this._saveAnswer();
          }
        } else {
          this.full++;
          this.$message.warning("检测到您有作弊嫌疑");
          if (this.falg) {
            this.dialogVisible = true;
            this.fullScreen();
          }
        }
      }
    },
    // 倒计时方法
    checkCodeCountDown(time) {
      if (time == 0) {
        this.$message.info("考试结束");
        this.saveShijuan = true;
      } else {
        if (time-- >= 0) {
          setTimeout(() => {
            let minutes = Math.floor(time / 60);
            let seconds = Math.floor(time % 60);
            if (this.takePhoto.includes(time)) {
              this.photograph();
            }
            this.$refs.time.innerHTML = `${minutes}分${seconds}秒`;
            if (this.falg) {
              this.checkCodeCountDown(time);
            }
          }, 1000);
        }
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
    //深度克隆
    DeepClone(obj) {
      if (obj === null || typeof obj !== "object") return obj;
      var cpObj = obj instanceof Array ? [] : {};
      for (var key in obj) cpObj[key] = this.DeepClone(obj[key]);
      return cpObj;
    },
    //保存
    _saveAnswer() {
      document.addEventListener("mousemove", () => {});
      let data = {
        userId: sessionStorage.getItem("userId"),
        answerId: JSON.parse(this.$route.params.data).answerId,
        answer: {
          name: this.testpaperList.name,
          score: this.testpaperList.score,
          answerScore: this.testpaperList.studentScore,
          time: this.testpaperList.time,
          answerArr: this.answerArr,
          answerList: {
            singleChoiceArray: this.singleChoiceArray,
            multipleChoiceArray: this.multipleChoiceArray,
            judgeArray: this.judgeArray,
            subJectiveArray: this.subJectiveArray
          }
        }
      };
      this.falg = false;
      sSaveAnswer(data).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
        }
        this.$message.success(res.msg);
        this.upsess = true;
      });
    },
    //生成随机值
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
          break;
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
          break;
        default:
          return 0;
          break;
      }
    },
    //生成区间
    randomArr(n) {
      let arr = [];
      let j = parseInt(n / 4);
      for (let i = 1; i <= 4; i++) {
        arr.push(this.randomNum(j * (i - 1), j * i));
      }
      return arr;
    },
    //全屏
    fullScreen() {
      this.dialogVisible = false;
      var el = document.documentElement;
      var rfs =
          el.requestFullScreen ||
          el.webkitRequestFullScreen ||
          el.mozRequestFullScreen ||
          el.msRequestFullScreen,
        wscript;
      if (typeof rfs == "undefined") {
        this.$message({
          showClose: true,
          message: "该浏览器不满足考试系统要求，请更换浏览器",
          type: "warning"
        });
      }
      if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
        return;
      }

      if (typeof window.ActiveXObject != "undefined") {
        wscript = new ActiveXObject("WScript.Shell");
        if (wscript) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    // 调用摄像头
    callCamera() {
      // H5调用电脑摄像头API
      navigator.mediaDevices
        .getUserMedia({
          video: true
        })
        .then(success => {
          // 摄像头开启成功
          this.$refs["video"].srcObject = success;
          // 实时拍照效果
          this.$refs["video"].play();
        })
        .catch(error => {
          this.$message.info("摄像头开启失败，请检查摄像头是否可用！");
        });
    },
    // 关闭摄像头
    closeCamera() {
      if (!this.$refs["video"].srcObject) return;
      let stream = this.$refs["video"].srcObject;
      stream.getVideoTracks()[0].stop();
      this.$refs["video"].srcObject = null;
    },
    // 拍照
    photograph() {
      let ctx = this.$refs["canvas"].getContext("2d");
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs["video"], 0, 0, 640, 480);
      // 转base64格式、图片格式转换、图片质量压缩
      this.answerArr.push(this.$refs["canvas"].toDataURL("image/jpeg", 0.15));
      html2canvas(document.body).then(canvas => {
        this.answerArr.push(canvas.toDataURL("image/jpeg", 0.15));
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    this.closeCamera();
    if (!this.upsess) {
      this._saveAnswer();
    }
    document.oncontextmenu = function() {
      return true;
    };
    next();
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
.canvasPos {
  position: absolute;
  right: 10px;
  bottom: 10px;
}
</style>

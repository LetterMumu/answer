<template>
  <section>
     <p class="moduleTitle"><span class="backToText" @click="$router.go(-1)">返回上级</span></p>
    <p>{{`总成绩 = 平时成绩 * 0.${classp} + 试卷成绩 * 0.${answerp}`}}</p>
    <div id="container" style=" width: 600px;height: 300px;"></div>
  </section>
</template>
<script>
import echarts from "echarts";
import { findScore } from "@/api/api";
export default {
  data() {
    return {
      arr: [],
      answerp:"",
      classp:""
    };
  },
  mounted() {
    this._findScore();
  },
  methods: {
    _findScore() {
      findScore({ answerId: this.$route.params.id }).then(res => {
        if (res.code != 0) {
          this.$message.error(res.msg);
          return;
        }
        this.arr = res.data;
        this.answerp = this.arr[0].answerp
        this.classp = this.arr[0].classp
        this.init();
      });
    },
    init() {
      var myChart = echarts.init(document.getElementById("container"));
      var namedate = [];
      var numdate = [];
      var classScore = []
      var answerScore = []
      this.arr.forEach(item => {
        namedate.push(item.studentName);
        numdate.push(item.score);
        classScore.push(item.classScore)
        answerScore.push(item.answerScore)
      });
      var colorlist = [];
      numdate.forEach(element => {
        if (element < 60) {
          colorlist.push(["#fc7095", "#fa8466"]);
        } else if (element >= 60 && element < 90) {
          colorlist.push(["#386ffd", "#74b3ff"]);
        } else {
          colorlist.push(["#1aa8ce", "#49d3c6"]);
        }
      });
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: namedate,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#4dd1c4",
                width: 1
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#999"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            max: 100,
            min: 0,
            axisLabel: {
              formatter: "{value} 分",
              show: true,
              textStyle: {
                color: "#999"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#4dd1c4",
                width: 1
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#ddd"
              }
            }
          }
        ],
        series: [
          {
            name: "总成绩",
            type: "bar",
            data: numdate,
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = colorlist;

                  var index = params.dataIndex;
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 1, color: colorList[index][0] },
                    { offset: 0, color: colorList[index][1] }
                  ]);
                }
              }
            }
          },
          {
            name: "平时成绩",
            type: "bar",
            data: classScore,
          },
           {
            name: "考试成绩",
            type: "bar",
            data: answerScore,
          }
        ]
      });
    }
  }
};
</script>
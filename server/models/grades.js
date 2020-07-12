const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const gradeSchema = new Schema({
    "answerId":String || Number,//试题Id
    "userId": String || Number,//试题创建人id
    "score":Number,//分数
    'answerScore':String || Number,//试卷分数
    'classScore':String || Number,//课堂分数
    'answerp':String || Number,//试卷分成
    'classp':String || Number,//课堂分成
    "name":String,//试题名称
    "studentName":String//学生姓名
})
module.exports = mongoose.model("grades", gradeSchema)
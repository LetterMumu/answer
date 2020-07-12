const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teacherSchema = new Schema({
    "userId":String || Number,//学号
    "userName":String,//姓名
    "passWord": String,//密码
    "answerArr":Array,//试题
    "studentArr":Array,//学生
})
module.exports = mongoose.model("teachers", teacherSchema)
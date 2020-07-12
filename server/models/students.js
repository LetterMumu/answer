const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let studentSchema = new Schema({
    "userId":String || Number,//编号
    "userName":String,//姓名
    "passWord": String,//密码
    "answerArr":Array,//试题
    "collectArr":Array//收藏夹
})
module.exports = mongoose.model("students", studentSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const answerSchema = new Schema({
    "answerId":String || Number,//试题Id
    "userId": String || Number,//试题创建人id
    "time":Number,//答题时间
    "score":Number,//试卷分数
    "name":String,//试题名称
    "answerList":Object//试题内容
})
module.exports = mongoose.model("answers", answerSchema)
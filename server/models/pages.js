const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pageSchema = new Schema({
    "pageId":String || Number,//权限级别id
    "pageArr":Object//页面路由
})
module.exports = mongoose.model("pages", pageSchema)
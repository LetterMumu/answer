const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let usersSchema = new Schema({
    "userId": String || Number, //学号
    "userName": String, //姓名
    "passWord": String, //密码
    "permissionsPage":String || Number //页面权限
})
module.exports = mongoose.model("users", usersSchema)
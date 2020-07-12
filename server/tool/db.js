var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/examSystem', {useNewUrlParser: true});
mongoose.connection.on('error',function(error) {
	console.log('数据库链接失败：'+ error);
});
mongoose.connection.on('connected',function() {
	console.log('数据库链接成功!');
});
mongoose.connection.on('disconnected',function() {
	console.log('Mongoose connection disconnected');
});


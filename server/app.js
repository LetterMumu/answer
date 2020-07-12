var createError = require('http-errors');
var express = require('express');
var path = require('path');
const router = express.Router();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var vertoken = require('./tool/token_vertify.js');
var expressJwt = require('express-jwt');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var teacherRouter = require('./routes/teacher');
var studentRouter = require('./routes/student');
// var usersRouter = require('./routes/users');
// var goodsRouter = require('./routes/goods');

//数据库连接
require('./tool/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*允许跨域 */
router.use(function (req, res, next) {
  //console.log(req);
  console.log(req.method);
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  res.header("cache-control", "no-cache");
  res.header("content-type", "application/json; charset=utf-8");
  res.header("ETag", '');
  //header头信息设置结束后，结束程序往下执行，返回
  if (req.method.toLocaleLowerCase() === 'options') {
    res.status(204);
    return res.json({}); //直接返回空数据，结束此次请求
  } else {
    next();
  }
});

// 解析token获取用户信息
app.use(function (req, res, next) {
  var token = req.headers['Authorization'];
  if (token == undefined) {
    return next();
  } else {
    vertoken.verToken(token).then((data) => {
      req.data = data;
      return next();
    }).catch((error) => {
      return next();
    })
  }
});
//验证token是否过期并规定哪些路由不用验证
app.use(expressJwt({
  secret: 'my_token_rules'
}).unless({
  path: ['/login','/favicon.ico'] //除了这个地址，其他的URL都需要验证
}));
//当token失效返回提示信息
app.use(function (err, req, res, next) {
  if (err.status == 401) {
    return res.status(401).send('token失效');
  }
});

app.use('/index', indexRouter);
app.use('/login', loginRouter);
app.use('/teacher', teacherRouter)
app.use('/student', studentRouter)
// app.use('/goods', goodsRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(10000);
module.exports = app;
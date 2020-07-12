import axios from 'axios';
window.addEventListener('setItem', () => {
  let tokenid = sessionStorage.getItem('token')
  axios.defaults.headers['Authorization'] = "Bearer " + tokenid
})
/*
export const 方法名 = params => axios.post(base + '实现某功能的接口', params).then(res => res.data);
*/
//登录接口
export const login = params => axios.post('/login', params).then(res => res.data);

//试题保存
export const saveAnswer = params => axios.post('/teacher/save', params).then(res => res.data)

//查询用户
export const findUser = params => axios.post('/teacher/findUser', params).then(res => res.data)

//插入用户
export const addUser = params => axios.post('/teacher/addUser', params).then(res => res.data)
//插入学生
export const addStudent = params => axios.post('/teacher/addStudent', params).then(res => res.data)
//查找学生
export const findStudent = params => axios.post('/teacher/findStudent', params).then(res => res.data)
//查询用户
export const delUser = params => axios.post('/teacher/delUser', params).then(res => res.data)
//删除学生
export const delStudent = params => axios.post('/teacher/delStudent', params).then(res => res.data)

//搜索试题
export const findAnswer = params => axios.post('/teacher/findAnswer', params).then(res => res.data)

//删除试题
export const delAnswer = params => axios.post('/teacher/delAnswer', params).then(res => res.data)
//查学生试卷试题
export const getStudentAnswer = params => axios.post('/teacher/getStudentAnswer', params).then(res => res.data)

//评分
export const saveScore = params => axios.post('/teacher/saveScore', params).then(res => res.data)
//保存到分数表
export const pushScore = params => axios.post('/teacher/pushScore', params).then(res => res.data)
//查询成绩
export const findScore = params => axios.post('/teacher/findScore', params).then(res => res.data)
//试题收藏
export const addCollect = params => axios.post('/student/addCollect', params).then(res => res.data)
//分发试题
export const handOut = params => axios.post('/teacher/handOut',params).then(res => res.data)

//学生查看试题
export const sFindAnswer = params => axios.post('/student/findAnswer',params).then(res => res.data)
//学生保存试题
export const sSaveAnswer = params => axios.post('/student/save', params).then(res => res.data)
//学生收藏试题
export const collect = params => axios.post('/student/addCollect', params).then(res => res.data)
//查看收藏
export const findCollect = params => axios.post('/student/findCollect', params).then(res => res.data)
const express = require('express');
const router = express.Router();
var StudentModel = require('../models/students')
var AnswertModel = require('../models/answers')
const Grades = require('../models/grades')

//收藏试题
router.post('/addCollect', (req, res) => {
    StudentModel.findOne({
        userId: req.body.userId
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "收藏失败"
            })
        } else {
            doc.collectArr.push(req.body.collectObj)
            doc.save((err1, doc1) => {
                if (err1) {
                    res.json({
                        "code": 1,
                        "msg": "收藏失败"
                    })
                } else {
                    res.json({
                        "code": 0,
                        "msg": "收藏成功"
                    })
                }
            })
        }
    })
})
//查看收藏
router.post('/findCollect', (req, res) => {
    let name = req.body.name
    let params = []
    if (name) {
        params.push({
            name
        })
    }
    StudentModel.findOne({
        userId: req.body.userId
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "查询失败"
            })
        } else {
            if (!doc) {
                res.json({
                    "code": 2,
                    "msg": "未查询到信息"
                })
                return
            }
            let arr = []
            if (req.body.name) {
                arr = doc.collectArr.filter(item => item.name.includes(req.body.name))
            } else {
                arr = doc.collectArr
            }
            if (arr.length) {
                res.json({
                    "code": 0,
                    "msg": "查询成功",
                    "data": arr
                })
            } else {
                res.json({
                    "code": 0,
                    "msg": "暂无数据",
                    "data": arr
                })
            }
        }
    })
})
//提交试题 state:"0" ==>  "1"
router.post('/save', (req, res) => {
    StudentModel.findOne({
        userId: req.body.userId
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "查询失败"
            })
        } else {
            doc.answerArr.forEach((item, index) => {
                if (item.answerId == req.body.answerId) {
                    let obj = req.body.answer;
                    obj.answerId = req.body.answerId;
                    obj.answerId = req.body.answerId;
                    obj.classScore = 0;
                    obj.state = "1";
                    doc.answerArr.splice(index, 1, req.body.answer)
                }
            })
            doc.save((err1, doc1) => {
                if (err) {
                    res.json({
                        "code": 1,
                        "msg": "提交失败"
                    })
                } else {
                    res.json({
                        "code": 0,
                        "msg": "提交成功"
                    })
                }
            })
        }
    })
})

//查找试题
router.post('/findAnswer', (req, res) => {
    let name = req.body.name
    let params = []
    if (name) {
        params.push({
            name
        })
    }
    StudentModel.findOne({
        userId: req.body.userId
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "查询失败"
            })
        } else {
            if (!doc) {
                res.json({
                    "code": 2,
                    "msg": "未查询到信息"
                })
                return
            }
            let arr = doc.answerArr.filter(item => item.name.includes(req.body.name))
            if (arr.length) {
                res.json({
                    "code": 0,
                    "msg": "查询成功",
                    "data": arr
                })
            } else {
                res.json({
                    "code": 0,
                    "msg": "暂无数据",
                    "data": arr
                })
            }
        }
    })
})
module.exports = router;
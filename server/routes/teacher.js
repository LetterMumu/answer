const express = require('express');
var events = require('events');
const router = express.Router();
const StudentModel = require('../models/students')
const TeacherModel = require('../models/teachers')
const AnswertModel = require('../models/answers')
const Users = require('../models/users')
const Grades = require('../models/grades')

//试题保存
router.post('/save', (req, res, next) => {
    AnswertModel.findOne({
        answerId: req.body.answerId
    }, (err, answersdoc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "查询失败"
            })
        } else {
            //有试题id更新题目内容
            if (answersdoc != null) {
                AnswertModel.update({
                    answerId: req.body.answerId
                }, {
                    name: req.body.name,
                    score: req.body.score,
                    answerList: req.body.answer,
                    time: req.body.time
                }, (err, doc) => {
                    if (err) {
                        res.json({
                            "code": 1,
                            "msg": "修改失败"
                        })
                    } else {
                        res.json({
                            "code": 0,
                            "msg": "修改成功"
                        })
                    }
                })
            } else {
                //无id创建试题
                AnswertModel.create({
                    name: req.body.name,
                    score: req.body.score,
                    answerList: req.body.answer,
                    time: req.body.time,
                    answerId: req.body.answerId,
                    userId: req.body.userId
                }, (err, doc) => {
                    if (err) {
                        res.json({
                            "code": 1,
                            "msg": "保存失败"
                        })
                    } else {
                        //把试题id插到老师表
                        TeacherModel.findOne({
                            userId: req.body.userId
                        }, (err1, doc1) => {
                            if (err1) {
                                res.json({
                                    "code": 1,
                                    "msg": "查询失败"
                                })
                            } else {
                                doc1.answerArr.push(req.body.answerId)
                                doc1.save((err2, doc2) => {
                                    if (err2) {
                                        res.json({
                                            "code": 1,
                                            "msg": "保存失败"
                                        })
                                    } else {
                                        res.json({
                                            "code": 0,
                                            "msg": "保存成功"
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        }
    })
})
//分发试题
router.post('/handOut', (req, res) => {
    AnswertModel.findOne({
        answerId: req.body.id
    }, (err, answersdoc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "查询失败"
            })
        } else {
            if (!answersdoc) {
                res.json({
                    "code": 1,
                    "msg": "查询失败"
                })
            }
            TeacherModel.findOne({
                userId: req.body.userId
            }, (err1, doc1) => {
                if (err1) {
                    res.json({
                        "code": 1,
                        "msg": "查询失败"
                    })
                } else {
                    //插入学生表
                    for (let i = 0; i < doc1.studentArr.length; i++) {
                        let item = doc1.studentArr[i]
                        StudentModel.findOne({
                            userId: item
                        }, (err3, doc3) => {
                            if (err3) {
                                res.json({
                                    "code": 1,
                                    "msg": "插入失败"
                                })
                            } else {
                                let data = {
                                    answerId: req.body.id,
                                    answerScore: 0,
                                    classScore: 0,
                                    name: answersdoc.name,
                                    score: answersdoc.score,
                                    answerList: answersdoc.answerList,
                                    time: answersdoc.time,
                                    state: "0" //0表示未作答试题
                                }
                                doc3.answerArr.push(data)
                                doc3.save((err4, doc2) => {
                                    if (err4) {
                                        res.json({
                                            "code": 1,
                                            "msg": doc3.userName + "保存失败"
                                        })
                                        return
                                    }
                                    if (i == doc1.studentArr.length - 1) {
                                        res.json({
                                            "code": 0,
                                            "msg": "试题分发完毕"
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
            })

        }
    })

})
//查找用户
router.post('/findUser', (req, res) => {
    let userId = req.body.userId
    let userName = req.body.userName
    let params = []
    if (userId) {
        params.push({
            userId
        })
    }
    if (userName) {
        params.push({
            userName
        })
    }
    if (params.length) {
        TeacherModel.find({
            $and: params
        }, (err, doc) => {
            if (err) {
                res.json({
                    "code": 1,
                    "msg": "查询失败"
                })
            } else {
                let arr = []
                doc.forEach(item => {
                    arr.push({
                        userId: item.userId,
                        userName: item.userName,
                        _id: item._id
                    })
                })
                res.json({
                    "code": 0,
                    "msg": "修改成功",
                    "data": arr
                })
            }
        })
    } else {
        TeacherModel.find((err, doc) => {
            if (err) {
                res.json({
                    "code": 1,
                    "msg": "查询失败"
                })
            } else {
                let arr = []
                doc.forEach(item => {
                    arr.push({
                        userId: item.userId,
                        userName: item.userName,
                        _id: item._id
                    })
                })
                res.json({
                    "code": 0,
                    "msg": "修改成功",
                    "data": arr
                })
            }
        })
    }
})
//添加用户
router.post('/addUser', (req, res) => {
    Users.create({
        userId: req.body.userId,
        userName: req.body.userName,
        passWord: req.body.userId.substring(req.body.userId.length - 6),
        permissionsPage: 1,
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "创建失败"
            })
        } else {
            TeacherModel.create({
                userId: req.body.userId,
                userName: req.body.userName,
                passWord: req.body.userId.substring(req.body.userId.length - 6),
                answerArr: [],
                studentArr: []
            }, (err, doc) => {
                if (err) {
                    res.json({
                        "code": 1,
                        "msg": "创建失败"
                    })
                } else {
                    res.json({
                        "code": 0,
                        "msg": "创建成功"
                    })
                }
            })
        }
    })
})
//添加学生
router.post('/addStudent', (req, res) => {
    Users.findOne({
        userId: req.body.userId
    }, (ferr, fdoc) => {
        if (ferr) {
            res.json({
                "code": 1,
                "msg": "创建失败"
            })
        } else {
            if (!fdoc) {
                Users.create({
                    userId: req.body.userId,
                    userName: req.body.userName,
                    passWord: req.body.userId.substring(req.body.userId.length - 6),
                    permissionsPage: 2,
                }, (err, doc) => {
                    if (err) {
                        res.json({
                            "code": 1,
                            "msg": "创建失败"
                        })
                    } else {
                        StudentModel.findOne({
                            userId: req.body.userId
                        }, (serr, sdoc) => {
                            if (serr) {
                                res.json({
                                    "code": 1,
                                    "msg": "创建失败"
                                })
                            } else {
                                if (!sdoc) {
                                    StudentModel.create({
                                        userId: req.body.userId,
                                        userName: req.body.userName,
                                        passWord: req.body.userId.substring(req.body.userId.length - 6),
                                        answerArr: [],
                                        studentArr: []
                                    }, (err1, doc2) => {
                                        if (err1) {
                                            res.json({
                                                "code": 1,
                                                "msg": "创建失败"
                                            })
                                        } else {
                                            TeacherModel.findOne({
                                                userId: req.body.id
                                            }, (err2, doc2) => {
                                                if (err2) {
                                                    res.json({
                                                        "code": 1,
                                                        "msg": "创建失败"
                                                    })
                                                } else {
                                                    doc2.studentArr.push(req.body.userId)
                                                    doc2.save((err1, doc1) => {
                                                        if (err1) {
                                                            res.json({
                                                                "code": 1,
                                                                "msg": "创建失败"
                                                            })
                                                        } else {
                                                            res.json({
                                                                "code": 0,
                                                                "msg": "创建成功"
                                                            })
                                                        }
                                                    })
                                                }
                                            })

                                        }
                                    })
                                } else {
                                    TeacherModel.findOne({
                                        userId: req.body.id
                                    }, (err2, doc2) => {
                                        if (err2) {
                                            res.json({
                                                "code": 1,
                                                "msg": "创建失败"
                                            })
                                        } else {
                                            doc2.studentArr.push(req.body.userId)
                                            doc2.save((err1, doc1) => {
                                                if (err1) {
                                                    res.json({
                                                        "code": 1,
                                                        "msg": "创建失败"
                                                    })
                                                } else {
                                                    res.json({
                                                        "code": 0,
                                                        "msg": "创建成功"
                                                    })
                                                }
                                            })
                                        }
                                    })

                                }
                            }
                        })
                    }
                })
            } else {
                if(req.body.userName !== fdoc.userName){
                    res.json({
                        "code": 2,
                        "msg": "该用户已存在,用户名为" + fdoc.userName,
                    })
                    return
                }
                StudentModel.findOne({
                    userId: req.body.userId
                }, (serr, sdoc) => {
                    if (serr) {
                        res.json({
                            "code": 1,
                            "msg": "创建失败"
                        })
                    } else {
                        if (!sdoc) {
                            StudentModel.create({
                                userId: req.body.userId,
                                userName: req.body.userName,
                                passWord: req.body.userId.substring(req.body.userId.length - 6),
                                answerArr: [],
                                studentArr: []
                            }, (err1, doc2) => {
                                if (err1) {
                                    res.json({
                                        "code": 1,
                                        "msg": "创建失败"
                                    })
                                } else {
                                    TeacherModel.findOne({
                                        userId: req.body.id
                                    }, (err2, doc2) => {
                                        if (err2) {
                                            res.json({
                                                "code": 1,
                                                "msg": "创建失败"
                                            })
                                        } else {
                                            doc2.studentArr.push(req.body.userId)
                                            doc2.save((err1, doc1) => {
                                                if (err1) {
                                                    res.json({
                                                        "code": 1,
                                                        "msg": "创建失败"
                                                    })
                                                } else {
                                                    res.json({
                                                        "code": 0,
                                                        "msg": "创建成功"
                                                    })
                                                }
                                            })
                                        }
                                    })

                                }
                            })
                        } else {
                            TeacherModel.findOne({
                                userId: req.body.id
                            }, (err2, doc2) => {
                                if (err2) {
                                    res.json({
                                        "code": 1,
                                        "msg": "创建失败"
                                    })
                                } else {
                                    doc2.studentArr.push(req.body.userId)
                                    doc2.save((err1, doc1) => {
                                        if (err1) {
                                            res.json({
                                                "code": 1,
                                                "msg": "创建失败"
                                            })
                                        } else {
                                            res.json({
                                                "code": 0,
                                                "msg": "创建成功"
                                            })
                                        }
                                    })
                                }
                            })

                        }
                    }
                })
            }
        }
    })

})
//查找学生
router.post('/findStudent', (req, res) => {
    TeacherModel.find({
        userId: req.body.userId
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "查询失败"
            })
        } else {
            let arr = [];
            let j = 0
            let obj = {}
            var myEventEmitter = new events.EventEmitter();
            myEventEmitter.on('next', addResult);

            function addResult() {
                arr.push(obj);
                obj = new Object();
                j++;
                if (j == doc[0].studentArr.length) {
                    res.json({
                        "code": 0,
                        "msg": "查找成功",
                        "data": arr
                    })
                }
            }
            for (let i = 0; i < doc[0].studentArr.length; i++) {
                StudentModel.findOne({
                    userId: doc[0].studentArr[i]
                }, (err1, doc1) => {
                    obj.studentname = doc1.userName
                    obj.studentId = doc1.userId
                    myEventEmitter.emit('next')
                })
            }

        }
    })
})
//删除用户
router.post('/delUser', (req, res) => {
    Users.remove({
        userId: req.body.userId,
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "删除失败"
            })
        } else {
            TeacherModel.remove({
                userId: req.body.userId,
            }, (err, doc) => {
                if (err) {
                    res.json({
                        "code": 1,
                        "msg": "删除失败"
                    })
                } else {
                    res.json({
                        "code": 0,
                        "msg": "创建成功"
                    })
                }
            })
        }
    })
})
//删除学生
router.post('/delStudent', (req, res) => {
    TeacherModel.findOne({
        userId: req.body.userId
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "删除失败"
            })
        } else {
            let i = doc.studentArr.indexOf(req.body.id)
            doc.studentArr.splice(i, 1)
            doc.save((err1, doc1) => {
                if (err1) {
                    res.json({
                        "code": 1,
                        "msg": "删除失败"
                    })
                } else {
                    res.json({
                        "code": 0,
                        "msg": "删除成功"
                    })
                }
            })
        }
    })
})
//删除试题
router.post('/delAnswer', (req, res) => {
    TeacherModel.findOne({
        userId: req.body.userId
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "删除失败"
            })
        } else {
            doc.answerArr.forEach((item, index) => {
                if (item == req.body.id) {
                    doc.answerArr.splice(index, 1)
                }
            })
            doc.save((err1, doc1) => {
                if (err1) {
                    res.json({
                        "code": 1,
                        "msg": "删除失败"
                    })
                } else {
                    AnswertModel.remove({
                        answerId: req.body.id,
                    }, (err2, doc2) => {
                        if (err2) {
                            res.json({
                                "code": 1,
                                "msg": "删除失败"
                            })
                        } else {
                            res.json({
                                "code": 0,
                                "msg": "删除成功"
                            })
                        }
                    })
                }
            })
        }
    })
})
//查找试题
router.post('/findAnswer', (req, res) => {
    let name = req.body.name
    let userId = req.body.userId
    let params = []
    params.push({
        userId
    })
    if (name) {
        params.push({
            name
        })
    }
    AnswertModel.find({
        $and: params
    }, (err1, doc1) => {
        if (err1) {
            res.json({
                "code": 1,
                "msg": "查询失败"
            })
        } else {
            res.json({
                "code": 0,
                "msg": "查找成功",
                "data": doc1
            })
        }
    })
})
//查批阅试卷
router.post('/getStudentAnswer', (req, res) => {
    TeacherModel.findOne({
        userId: req.body.userId
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "查询失败"
            })
        } else {
            let arr = [];
            for (let i = 0; i < doc.studentArr.length; i++) {
                StudentModel.findOne({
                    userId: doc.studentArr[i]
                }, (err1, doc1) => {
                    doc1.answerArr.forEach((item1, index) => {
                        if (item1.answerId == req.body.answerId) {
                            obj = item1
                            obj.studentname = doc1.userName
                            obj.studentId = doc1.userId
                            // myEventEmitter.emit('next')
                            arr.push(obj)

                            if (i == doc.studentArr.length - 1) {
                                res.json({
                                    "code": 0,
                                    "msg": "查找成功",
                                    "data": arr
                                })
                            }
                        }
                    })
                })
            }

        }
    })
})
//提交评分
router.post('/saveScore', (req, res) => {
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
//插入成绩表
router.post('/pushScore', (req, res) => {
    Grades.findOne({
        answerId: req.body.answerId,
        studentName: req.body.studentName
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "查询失败"
            })
        } else {
            if (doc != null) {
                Grades.update({
                    answerId: req.body.answerId,
                    studentName: req.body.studentName
                }, req.body, (err, doc) => {
                    if (err) {
                        res.json({
                            "code": 1,
                            "msg": "修改失败"
                        })
                    } else {
                        res.json({
                            "code": 0,
                            "msg": "修改成功"
                        })
                    }
                })
            } else {

                Grades.create(req.body, (err, doc) => {
                    if (err) {
                        res.json({
                            "code": 1,
                            "msg": "保存失败"
                        })
                    } else {
                        res.json({
                            "code": 0,
                            "msg": "保存成功"
                        })
                    }
                })
            }
        }
    })
})
//查询成绩
router.post('/findScore', (req, res) => {
    Grades.find({
        answerId: req.body.answerId
    }, (err, doc) => {
        if (err) {
            res.json({
                "code": 1,
                "msg": "查询失败"
            })
        } else {
            res.json({
                "code": 0,
                "msg": "查询成功",
                data: doc
            })
        }
    })
})
module.exports = router;
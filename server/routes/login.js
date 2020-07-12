const express = require('express');
const router = express.Router();
const settoken = require('../tool/token_vertify.js');
const Users = require('../models/users')
const Pages = require('../models/pages')
// 生成token
router.post('/', (req, res, next) => {
    let param = {
        userId: req.body.userId,
        passWord: req.body.passWord
    }
    Users.findOne(param, (usererr, userdoc) => {
        if (usererr) {
            res.json({
                "code": 1,
                "msg": "用户名密码不匹配"
            })
        } else {
            if (!userdoc) {
                res.json({
                    "code": 1,
                    "msg": "用户名密码不匹配"
                })
            } else {
                Pages.findOne({
                    pageId: userdoc.permissionsPage
                }, (pageerr, pagedoc) => {
                    if (pageerr) {
                        res.json({
                            "code": 1,
                            "msg": "获取用户权限失败"
                        })
                    } else {
                        settoken.setToken(userdoc.userId, userdoc.passWord).then((data) => {
                            return res.json({
                                "code": 0,
                                "data": {
                                    token: data,
                                    userId: userdoc.userId,
                                    userName: userdoc.userName,
                                    userRouter: pagedoc.pageArr || []
                                }
                            });
                        })
                    }
                })
            }
        }
    })
});

module.exports = router;
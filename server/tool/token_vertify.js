var jwt = require('jsonwebtoken');
var signkey = 'my_token_rules';

exports.setToken = function (username, userid) {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            name: username,
            _id: userid
        }, signkey, {
            expiresIn: '24h'
        });
        resolve(token);
    })
}

exports.verToken = function (token) {
    return new Promise((resolve, reject) => {
        var info = jwt.verify(token.split(' ')[1], signkey);
        resolve(info);
    })
}

/*
*** 加密 模块 crypto  Node 

*/ 


var crypto = require("crypto"); // node 模块 

// 加密函数
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
const keys = 'wuhan1901';
// daydayup   daydayup+wuhan1807
exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥 



/*
***  数据库错误  500 
**   返回结果给前端
*/ 

exports.setError = function(err,res,db){
    if(err){
        res.json({
            statusCode:500,
            msg:"数据库错误",
            err
        })
        db.close();
        throw err;
    }
}

//获取当前时间

exports.getCndate = function(){
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var days = time.getDate();
    var hours = time.getHours();
    hours = hours<10? "0"+hours:hours;
    var min = time.getMinutes();
    min = min<10? "0" + min:min;
    var seconds = time.getSeconds();
    seconds = seconds<10?"0"+seconds:seconds;
    var newTime = year + "年" + month + "月" + days + "日" + " " + hours +":" + min + ":" + seconds;
    return newTime;

}

//判断用户是否登录

exports.isLogin = function(req,res,callback){
    var token = req.session.token;
    var req_token = req.headers.token;
    if(req_token){
        if(token){
            if(token == req_token){
                callback()
            }else{
                res.json({
                    code:401,
                    msg:'token 不匹配请重新登录',
                    type:0
                })
            }
        }else{
            res.json({
                code:401,
                msg:'登录状态过期',
                type:0
            })
        }
    }else{
        res.json({
            code:401,
            msg:'您还没登录',
            type:0
        })
    }
}
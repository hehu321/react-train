
var express = require('express');

var router = express.Router();

var { aesDecrypt, keys, setError, isLogin, aesEncrypt } = require('../utils');
var { conn } = require('../utils/db');
var { waterfall } = require('async');
var multer = require('multer');
var axios = require('axios')

router.get('/',(req,res)=>{
    res.json({
        code:1
    })
})

const url = 'https://open.ucpaas.com/ol/sms/sendsms';
//获取短信验证码接口
router.post('/getcode', (req, res) => {
    var body = req.body;
    var mobile = body.mobile.replace(/\s/g,'');
    var code = 1000 +  Math.floor(Math.random() * 9000) + '';
    var obj = {
        "sid": "f60d4c2b254cba685c939b3c803fdcb5",
        "token": "d3b4ac9b44682088a6d11198fb2fb5ea",
        "appid": "d8c4958075b34dbe8fb540d4ec896aad",
        "templateid": "476786",
        "param": code + ',60',
        mobile
    }
    axios.post(url, obj).then(response => {
        req.session.mobile = mobile;
        req.session.code = code;
        if (response.data.code == '000000') {
            res.json({
                code: 200,
                type: 1,
                msg: '验证码发送成功'
            })
        } else {
            res.json({
                code: 400,
                type: 0,
                msg: response.data.msg
            })
        }
    })
})

//手机验证码登录
router.post('/login', (req, res) => {
    var body = req.body;
    var code = body.code;
    var mobile = body.mobile.replace(/\s/g,'');
    if (code === req.session.code && mobile === req.session.mobile) {
        conn((err, db) => {
            setError(err, res, db)
            var user = db.collection('reactuser');
            waterfall([
                (cb) => {
                    user.findOne({ mobile }, (err, result) => {
                        cb(err, result)
                    })
                },
                (arg, cb) => {
                    var token = aesEncrypt(mobile,keys)
                    req.session.token = token
                    if (!arg) {
                        user.insert({ mobile }, (err, result) => {
                            
                            cb(err, {
                                code: 200,
                                type: 1,
                                msg: '登录成功',
                                token
                            })
                        })
                    } else {
                        cb(null, {
                            code: 200,
                            type: 1,
                            msg: '登录成功',
                            token
                        })
                    }
                }
            ], (err, result) => {
                setError(err, res, db);
                res.json(result)
            })
        })
    } else {
        res.json({
            code: 200,
            type: 0,
            msg: '输入验证码有误'
        })
    }
})

//citylist 获取

router.get('/citylist',(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);
        db.collection('citylist').findOne({},{_id:0},(err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:'success',
                hotCities:result.hotCities,
                cityList:result.cityList
            })
            db.close()
        })
    })
})
//车站搜索接口
router.get('/stationlist',(req,res)=>{
    var query = req.query.search;
    query = query?query:'qqqqq';
    var reg = new RegExp(query,'ig');
    conn((err,db)=>{
        setError(err,res,db);
        db.collection('stationlist').find({search:reg},{_id:0}).toArray((err,result)=>{
            setError(err,res,db);
            if(result.length>=5){
                result.splice(5)
            }
            res.json(
                {
                    code:200,
                    msg:'success',
                    result
                }
            )
            db.close();
        })
    })
})
//上传头像
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/avatar')
    },
    filename:function(req,file,cb){
        var fileformat = (file.originalname).split('.');
        cb(null,Date.now() + file.originalname)
    }
})
var upload = multer({storage:storage})

var avatarUpload = upload.any();

router.post('/upload',avatarUpload,(req,res)=>{
    var newName = req.files[0].path;
    var mobile = aesDecrypt(req.session.token,keys)
    conn((err,db)=>{
        setError(err,res,db)
        db.collection('reactuser').update({
            mobile
        },{
            $set:{
                avatar:newName
            }
        },(err,result)=>{
            setError(err,res,db)
            res.json({
                msg:'头像上传成功',
                code:'200',
                imgUrl:newName
            })
            db.close()
        })
    })
})

//获取用户头像

router.get('/getlogo',(req,res)=>{
    var mobile = req.query.mobile;
    conn((err,db)=>{
        setError(err,res,db);
        db.collection('reactuser').findOne({mobile},(err,result)=>{
            setError(err,res,db);
            if(result.avatar){
                res.json({
                    code:'200',
                    msg:'获取头像成功',
                    imgUrl:result.avatar
                })
            }else{
                res.json({
                    code:'200',
                    msg:'获取头像成功',
                    imgUrl:''
                })    
            }
        })
    })
})


//获取车站ticker
router.get('/getticker',(req,res)=>{
    var query = req.query;
    let url = 'https://api.jisuapi.com/train/station2s'
    axios.get(url,{
        params:query
    }).then(response=>{
        res.json(response.data)
    })
})

//获取站点信息
router.get('/getline',(req,res)=>{
    var query = req.query;
    let url = 'https://api.jisuapi.com/train/line';
    axios.get(url,{
        params:query
    }).then(response=>{
        res.json(response.data)
    })
})
module.exports = router;
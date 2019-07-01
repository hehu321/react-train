var express = require('express');
var router = express.Router();
var {aesDecrypt,keys,setError,isLogin,aesEncrypt} = require('../utils');
var {conn} = require('../utils/db');
var {waterfall} = require('async');
var multer = require('multer')
/* GET users listing. */

router.get('/',(req,res)=>{
    res.send('6666')
})

router.post('/register',(req,res)=>{
    var body = req.body;
    conn((err,db)=>{
        setError(err,res,db);
        var user = db.collection('user');
        waterfall([
            (callback)=>{
                user.findOne({$or:[
                    {user:body.user},
                    {tel:body.tel}
                ]},(err,result)=>{
                    callback(err,result)
                })
            },
            (arg,callback)=>{
                if(!arg){
                    body.time = new Date()
                    user.insert(body,(err,result)=>{
                        callback(err,{
                            code:'200',
                            msg:'注册成功',
                            type:"1",
                            result
                        })
                    })
                }else{
                    callback(null,{
                        code:'200',
                        msg:'用户名或手机号码已存在',
                        type:'0'
                    })
                }
            }
        ],(err,result)=>{
            setError(err,res,db);
            res.json(result)
        })
    })
  })


router.post('/login',(req,res)=>{
    var body = req.body;
    conn((err,db)=>{
        setError(err,res,db);
        var user = db.collection('user');
        user.findOne(body,(err,result)=>{
            setError(err,res,db);
            if(result){
                var token = aesEncrypt(body.user,keys);
                req.session.token = token;
                res.json({
                    code:200,
                    msg:'登录成功',
                    type:1,
                    token
                })
            }else{
                res.json({
                    code:200,
                    msg:'登录失败',
                    type:0
                })
            }
        })
    })
})

router.post('/addList',(req,res)=>{
    isLogin(req,res,()=>{
        var body = req.body;
        var list =  JSON.parse(body.list)
        console.log(list)
        conn((err,db)=>{
            setError(err,res,db);
            var music = db.collection('music');
            waterfall([
                (callback)=>{
                    music.findOne(list,(err,result)=>{
                        callback(err,result)
                    })
                },
                (arg,callback)=>{
                    if(!arg){
                        music.insert(list,(err,result)=>{
                            callback(err,{code:200,type:1,msg:"加入成功"})
                        })
                    }else{
                        callback(null,{
                            code:200,
                            type:0,
                            msg:"已经加入过"
                        })
                    }
                }
            ],(err,result)=>{
                setError(err,res,db)
                res.json(result)
                db.close()
            })
        })
    })
})


router.get('/getmusic',(req,res)=>{
    var username = req.query.username
    conn((err,db)=>{
        setError(err,res,db);
        db.collection('music').find({username}).toArray((err,result)=>{
            setError(err,res,db)
            res.json({
                code:200,
                type:1,
                msg:'获取成功',
                result
            })
            db.close()
        })
    })
})


router.post('/playList',(req,res)=>{
    isLogin(req,res,()=>{
        var body = req.body;
        var username = req.body.username;
        var list = body.list;

       list =  list.filter((item)=>{
            return item.title != '';
        })
        
       console.log(list) 

    conn((err,db)=>{
        setError(err,res,db)
       var playList = db.collection('playList')
       waterfall([
           (callback)=>{
                playList.findOne({username},(err,result)=>{
                    callback(err,result)
                })
           },
           (arg,callback)=>{
                if(!arg){
                    playList.insert(body,(err,result)=>{
                        callback(err,{
                            code:200,
                            msg:'成功',
                            result
                        })
                    })
                }else{
                    playList.update({username},{$set:{list}},(err,result)=>{
                        callback(err,{
                            code:200,
                            msg:'成功',
                            result
                        })
                    })
                }
           }
       ],(err,result)=>{
            setError(err,res,db);
            res.json(result)
            db.close();
       })
    })
    })
    })

    router.get('/getPlayList',(req,res)=>{
        isLogin(req,res,()=>{
            var username = req.query.username
            conn((err,db)=>{
                setError(err,res,db)
                db.collection("playList").findOne({username},(err,result)=>{
                    setError(err,res,db);
                    res.json({
                        code:200,
                        msg:'获取播放列表成功',
                        result
                    })
                })
            })
        })
    })


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
        var username = aesDecrypt(req.session.token,keys);
        conn((err,db)=>{
            setError(err,res,db)
            db.collection('user').update({
                user:username
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


    //获取用户logo

    router.get('/getLogo',(req,res)=>{
        var user = req.query.username;
        console.log(user);
        conn((err,db)=>{
            setError(err,res,db);
            db.collection('user').findOne({user},(err,result)=>{
                setError(err,res,db)
                res.json({
                    code:200,
                    type:1,
                    result
                })
                db.close()
            })
        })
    })

module.exports = router;
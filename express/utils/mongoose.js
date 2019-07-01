
var mongoose = require('mongoose');
var url = 'mongodb://0.0.0.0/1901'

mongoose.connect(url,(err)=>{
    if(err){
        console.log('连接失败')
    }else{
        console.log('连接成功')
    }
})


var schema = new mongoose.Schema({name:String,age:Number})

var temp = mongoose.model('test',schema);
// temp.insertMany([{name:'haha',age:34},{name:'xiaobai',age:56}],(err,doc)=>{
//     console.log(doc)
// })

// temp.find({age:{$gte:39}},(err,docs)=>{
//     console.log(docs)
// })

var arr = [];
temp.find((err,docs)=>{
    docs.forEach((item,index)=>{
        arr.push(item._id)
    })
    temp.findById(arr[0]).exec((err,doc)=>{
        console.log(doc)
    })
})
var {MongoClient} = require('mongodb');
const config=  {
    hostname: "0.0.0.0",
    port:27017,
    dbName:"1901"
}
let {
hostname,
port,
dbName
} = config;

let url = `mongodb://${hostname}:${port}/${dbName}`;

exports.conn = (callback)=>{
   MongoClient.connect(url,(err,db)=>{
       if(err) {
        callback(err,null)
       }else{
        callback(null,db)
       }
       
   })
}

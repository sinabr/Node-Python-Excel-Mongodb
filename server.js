const http = require('http');



start().then(result=>{
    const app = require('./app');
    const server = http.createServer(app);
    server.listen(process.env.PORT)

}).catch(err=>{console.log(err)})




function starter(callback){
    try{
        const dotenv = require('dotenv')
        dotenv.config()
        callback(null,true)
    }catch(err){
        callback(err)
    } 
}


function start(){
    return new Promise((resolve, reject)=>{
        starter((err, result)=>{
            if(err){console.log(err);return reject(err)}
            else{resolve(result)}
        })
    })
}
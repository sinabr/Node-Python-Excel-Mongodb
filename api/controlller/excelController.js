
const ps = require('python-shell')
const mongoose = require('mongoose');
const path = require('path')
const fs = require('fs')
const Car = require('../models/car')


exports.excel_handle = (req , res , next)=>{
    // You Can add Authentication   


    var file = req.files.excel_file.path
    var filename = file.replace(/.xlsx/,'.json')

    console.log("Waiting ...")
    // python file to parse Excel xlsx to json keeping the (Key,Value) untouched
    var shell = new ps.PythonShell('/home/ghasedak/Project/api/controller/parser.py',{args:[file],mode:'text'})
    shell.on('message', function(data) { 
        if(data == "done"){
            var jsonArray = JSON.parse(fs.readFileSync(filename))
            for(var item of jsonArray){
                var car = new Car({
                    _id:mongoose.Types.ObjectId,
                    name:item.name,
                    productionYear:item.productionYear,
                    engineSize:item.engineSize,
                    horsePower:item.horsePower
                })
                // you can add better error handling by using a logger or simply pm2 module to log your errors
                car.save()
                .then(saved=>{}).catch(err=>{console.log(err)})
            }
            res.status(200).end()
        }else{
            res.status(500).send("Parser Failed to parse")
        }
    })

}
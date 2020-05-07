// To test the parser and excel loading
const PythonShell = require('python-shell')
const fs = require('fs')

// replace the file with your file and put your file name below
var file = './cars.xlsx'

// json file path will be the same (you can change it in the parser)
var jsonfile = file.replace('.xlsx','.json')


const ps = require('python-shell')
var shell = new ps.PythonShell('./api/controller/parser.py',{args:[file],mode:'text'})
shell.on('message', function(data) { 
    if(data == "done"){
        var jsonArray = JSON.parse(fs.readFileSync(jsonfile))
        for(var item of jsonArray){
            console.log(item)
        }
    }else{
        console.log("Parser Error")
    }
})
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const debug = require('debug')('http');
const path = require('path')
const fs = require('fs')
const rfs = require('rotating-file-stream')
const cors = require('cors');

mongoose.set('useCreateIndex', true);



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true , useUnifiedTopology: true}).catch(function (reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason);
});


mongoose.Promise = global.Promise;



const excelRouter = require('./api/router/excelRouter');


const xss = require('xss-clean');


const limiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  });

app.use(limiter);
app.use(helmet());
app.use(morgan('dev'));

app.use(bodyparser.urlencoded({limit:'100mb', extended: true}));
app.use(bodyparser.json({limit:'100mb'}));
app.use(mongoSanitize())
app.use(xss());


// in case you want to send an email to excel upload response and use a template
app.set('view engine','pug')

app.use(cors())


console.log("Routes active ...")

// handle requests
app.use('/excelupload' , bookRoutes);


// if reaches here , is error
app.use((req , res , next)=>{
    const error = new Error("url not found");
    error.status = 404;
    next(error);
});

app.use((error , req , res , next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});


module.exports = app;
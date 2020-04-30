const express = require('express')
const formidableMiddleware = require('express-formidable')
const path = require('path')
const router = express.Router()
// Authentication Middleware example
const Authenticate = require('../middleware/authentication')

upath = path.join(__dirname, '..', '..', '/uploads') 

var ExcelController = require('../controlller/excelController')

router.get('/excels' , ExcelController.excel_handle)

// In case you need Authentication: (the middleware uses jsonwebtokens)
// you will need to implement login first !
// router.get('/excels' , Authenticate , ExcelController.excel_handle)

module.exports = router
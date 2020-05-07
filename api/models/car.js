const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId ,
	name:{type:String , minlength:4 , maxlength:100 ,required:true },
	horsePower:{type:Number , min:60 , max:1600},
	engineSize:{type:Number , min:1 , required:true},
    productionYear:{type:Number , max:2020 , required:true}
});

module.exports = mongoose.model('Car' , carSchema);

const User=require("../models/user")
const async=require("async");
const Message=require("../models/message");
const { body, validationResult } = require("express-validator");

exports.index=function(req,res,next){
  Message.find().populate('users').
  exec((err,message)=>{
    res.render('index',{title:"Messages", user:req.user,messages:message});
  })
}

const User=require("../models/user")
const async=require("async");
const Message=require("../models/message");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.member_get=(req,res,next)=>{
  if(!res.locals.currentUser){
    return res.redirect('/log-in');
  }
  return res.render("member_form",{title:"Become a member",user:res.locals.currentUser});
}

exports.member_post=[
  body("passcode").trim().isLength({min:1}).escape().withMessage("Passcode must be given"),
  async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.render("member_form", { title: "Become a Member", user: res.locals.currentUser, errors: errors.array()} );
    } 
    else if(req.body.passcode != 'xxx'){
      return res.render("member_form", { title: "Become a Member", user: res.locals.currentUser, passcodeError: "Wrong Passcode" });
    }
    const user = new User(res.locals.currentUser);
    user.member = true;

    await User.findByIdAndUpdate(res.locals.currentUser._id, user, {}, (err) => {
      if (err) return next(err);
      return res.redirect("/member");
    });
  }
]



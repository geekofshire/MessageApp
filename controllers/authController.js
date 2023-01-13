

const User=require("../models/user")
const async=require("async");
const Message=require("../models/message");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.signup_get = (req,res,next)=>{
  res.render('signup_form',{title:"Sign Up"});
};

exports.signup_post=[
  body('first_name').trim()
  .isLength({ min: 1 })
  .escape()
  .withMessage("First name must be specified.")
  .isAlphanumeric()
  .withMessage("First name has non-alphanumeric characters."),
  body('last_name').trim()
  .isLength({ min: 1 })
  .escape()
  .withMessage("Last name must be specified.")
  .isAlphanumeric()
  .withMessage("Last name has non-alphanumeric characters."),
  body('user_name').trim().isLength({min: 1}).escape().withMessage("user name must be specified"),
  body("password").trim().isLength({ min: 1 }).escape().withMessage("Password must be at least 6 characters."),

  async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("ERROR!");
      return res.render("signup_form", { title: "Sign Up", errors:errors.array() });
    }

    try {
      const isUserInDB = await User.find({ "user_id": req.body.user_name });
      if (isUserInDB.length > 0) return res.render("signup_form", { title: "Sign Up", error: "User already exists" });
      // If username does not exist, continute to register new user to db
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) return next(err);
        const user = new User({
          first_name:req.body.first_name,
          last_name:req.body.last_name,
          user_id: req.body.user_name,
          password: hashedPassword,
          is_member: false,
          is_admin: false,
        }).save(err => err ? next(err) : res.redirect("/log-in"));
      });
    } catch (err) {
      return next(err);
    }
  }
];

exports.login_get=(req,res,next)=>{
  if (res.locals.currentUser) return res.redirect("/"); 
  res.render("login_form", { title: "Login" });
}

exports.login_post=passport.authenticate("local",{
  successRedirect:'/',
  failureRedirect:'/log-in',
});

exports.logout_get=(req,res)=>{
  res.logout();
  res.redirect('/');
}
const async=require('async');
const User=require('./models/user');
const Message=require('./models/message');

const userArgs = process.argv.slice(2);

const mongoose = require("mongoose");
const user = require('./models/user');


const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

const users = [];
const messages = [];

function userCreate(first_name,last_name,user_id,password,is_member,is_admin,cb){
  const user={
    first_name:first_name,
    last_name:last_name,
    user_id:user_id,
    password:password,
    is_member:is_member,
    is_admin:is_admin,
  }

  const new_user=new User(user);

  new_user.save((err)=>{
    if(err) return cb(err,null);
    console.log("User added");
    users.push(new_user);
    return cb(null,new_user);
  })  
}

function messageCreate(user,title,text,cb){
  const someMessage={
    user:user,
    title:title,
    text:text,
    date:Date.now(),
  }

  const newMessage= new Message(someMessage);

  newMessage.save((err)=>{
    if(err) return cb(err,null);
    console.log("Message added");
    messages.push(newMessage);
    return cb(null,newMessage)
  })
}


function createUsers(cb){
  async.series([
    function(callback){
      userCreate("Rohan","Jha","rohan7979","rohan13",true,false,callback);
    },
    function(callback){
      userCreate("x","y","hh","zz",false,false,callback);
    }
  ],
  cb);
}

function createMessage(cb){
  async.series([
    function(callback){
      messageCreate(users[0],"hey","how are you?",callback)
    },
    function(callback){
      messageCreate(users[1],"hiya","welcome to my house!!",callback)
    }
  ],
  cb);  
}

async.series([
  createUsers,
  createMessage,
], (err, results) => {
  if (err) { 
    console.log(`FINAL ERR: ${err}`);
  } else {
    console.log(`Success: ${results}`);
  }
  mongoose.connection.close();
});
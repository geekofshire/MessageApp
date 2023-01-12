const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
  first_name: {type:String,required:true},
  last_name: {type:String,required:true},
  user_id: {type:String,required:true},
  password: {type:String,required:true},
  is_member: {type:Boolean,default:false},
  is_admin: {type:Boolean,default:false},
})

userSchema.virtual("name").get(function(){
  return this.first_name+' '+this.last_name;
})

module.exports=mongoose.model("Users",userSchema);
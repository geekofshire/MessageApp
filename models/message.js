const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const {DateTime}= require('luxon');

const MessageSchema=new Schema({
  user:{type:Schema.Types.ObjectId,ref:"Users",required:true},
  title:{type:String,required:true,minLength:1,maxLength:50},
  text:{type:String,required:true,minLength:1,maxLength:1001},
  date:{type:Date,default:Date.now}
})

MessageSchema.virtual("get_date").get(function(){
  return DateTime.fromJSDate(this.date).toFormat("yyyy-MM-dd, HH:mm");
})

module.exports=mongoose.model("Message",MessageSchema);
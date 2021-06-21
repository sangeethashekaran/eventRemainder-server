const mongoose=require('mongoose');   //import mongoose
mongoose.connect('mongodb://localhost:27017/eventRemainderApp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const User=mongoose.model('User',{
    uid:Number,
    username:String,
    password:String,
    eventDetails:Array
})

module.exports={
    User
}
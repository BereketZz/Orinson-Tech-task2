const mongoose= require('mongoose')

const authSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required!"]
    },
    password:{
        type:String,
        required:[true,"password is required!"]
        
    }
})

const Auth = mongoose.model("Auth", authSchema)

module.exports= Auth
import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        maxLength:15,
        required:true,
        trim:true
    },
    email:{
        type:String,
        minLength:10,
        maxLength:30,
        required:true,
        trim:true,
        match:/^[a-z]+[0-9]+@[a-z]+\.[a-z]+/,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:15
    }
})

export default mongoose.model("Student",studentSchema);
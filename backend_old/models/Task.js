import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    input:{
        type:String,
        required:true,
        trim:true
    },
    operation:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        default:"pending",
        trim:true
    },
    result:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    }
});

export default mongoose.model("Task",taskSchema);
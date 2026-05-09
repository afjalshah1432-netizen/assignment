import Student from "../models/Student.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Task from "../models/Task.js";
dotenv.config();

export const register=async(req,res)=>{
    try{
        const {name,email,password,cpassword,city}=req.body;
        if(password!==cpassword){
            return res.status(400).send({msg:"password not same"})
        }
        const exist=await Student.findOne({email});
        if(exist){
            return res.status(400).send({msg:"student already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const student=new Student({name,email,password:hashedPassword,city});
        await student.save();
        return res.status(200).send({msg:"student register successfully"});
    }
    catch(err){
        console.log(err);
        console.log(err.message);
        return res.status(500).send({msg:"'/register' server internal error"});
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await Student.findOne({email});
        if(!user){
            return res.status(400).send({msg:"student not exists please register"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).send({msg:"password does not match"});
        }
        const user1=await Student.findOne({email}).select("-password");
        const token=jwt.sign({email:user.email},process.env.JWTSECRET,{expiresIn:"7d"});
        return res.status(200).send({msg:"student login successfully",user:user1,token});
    }
    catch(err){
        console.log(err);
        console.log(err.message);
        return res.status(500).send({msg:"'/login' server internal error"});
    }
}

export const dash=async(req,res)=>{
    try{
        if(!req.user){
            return res.status(400).send({msg:"token not decoded"});
        }
        const data=await Student.findOne({email:req.user.email}).select("-password");
        return res.status(200).send(data);
    }   
    catch(err){
        console.log(err);
        console.log(err.message);
        return res.status(500).send({msg:"'/dash' server internal error"});
    }
}

export const dashForm=async(req,res)=>{
    try{
        const {title,input,operation}=req.body;
        if(!title||!input||!operation){
            return res.status(400).send({msg:"please fill the blanks first"})
        }
        if(!req.user){
            return res.status(400).send({msg:"only authenticate user is valid"});
        }
        let status="running";
        let result="";
        if(operation=="uppercase"){
            result=input.toUpperCase();
            status="done"
        }
        else if(operation=="lowercase"){
            result=input.toLowerCase();
            status="done";
        }
        else if(operation=="reverse"){
            result=input.split("").reverse().join("");
            status="done"
        }
        else if(operation=="wordcount"){
            result=input.split(" ").length;
            status="done"
        }
        else{
            result="pending"
            status="pending"
        }
        const task=new Task({title,input,operation,status,result,email:req.user.email});
        await task.save();
        return res.status(200).send({msg:"task complitated",task});
    }
    catch(err){
        console.log(err);
        console.log(err.message);
        return res.status(500).send({msg:"'/dashForm' server internal error"});
    }
}

export const dashData=async(req,res)=>{
    try{
        if(!req.user){
            return res.status(400).send({msg:"token not decoded"})
        }
        const data=await Task.find();
        return res.status(200).send(data);
    }
    catch(err){
        console.log(err);
        console.log(err.message);
        return res.status(500).send({msg:"'/dash-data' server internal error"});
    }
}
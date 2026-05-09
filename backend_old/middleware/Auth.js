import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const auth=(req,res,next)=>{
    const headers=req.headers.authorization;
    if(!headers){
        return res.status(400).send({msg:"token is not available"});
    }
    try{
        const token=headers.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWTSECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        console.log(err);
        console.log(err.message);
        return res.status(401).send({msg:"invalid token"});
    }
}

export default auth;
import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js"
dotenv.config();

const app=express();

const cnnDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGOURL);
        console.log("mongodb is connected");
    }
    catch(err){
        console.log("mongodb is not conneted",err)
    }
}

cnnDb();
app.use(cors());
app.use(helmet({
    crossOriginResourcePolicy:false
}));
app.use(express.json());



app.use("/api/student",studentRoutes);

app.listen(process.env.PORT,()=>{
    console.log("server running");
});
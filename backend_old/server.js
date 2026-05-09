import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js"
import cnnDb from "./con/db.js"
dotenv.config();

const app=express();
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
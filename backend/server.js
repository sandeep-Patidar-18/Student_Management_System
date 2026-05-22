import express from "express";
import cors from "cors";
import mongoose from "./DB.js";
import connectDB from "connectionDB";


const app = express();
connectDB();

app.use(cors());

app.use(express.json());



app.post("/SignUpPage" ,(req,res)=>{

})

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
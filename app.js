const express = require("express");

const app = express();

const mongoose  = require("mongoose");

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/studentDB")
.then(()=>{
    console.log("mongodb is connected ");
})
.catch((error)=>{
    console.log(error);
});

app.get("/",(req,res)=>{
    res.json({
        name:"sandy",
        age:"25"
    })

});

app.post("/students",(req,res)=>{
    const student=req.body;
    res.json({
        message:"student added successfully",
        student:student
    });
});

app.get("/signup",(req,res)=>{
    res.send("this is page for registration");
});

app.listen(3000,()=>{
    console.log("server just wake up ");

});
const express=require("express");

const app=express();

app.use(express.json());

require("./config/db");

const studentRoutes=
require("./routes/studentRoutes");

app.use(studentRoutes);


app.get("/",(req,res)=>{

    res.send(
        "welcome to home page"
    );

});


app.listen(3000,()=>{

console.log(
"server just wake up"
);

});
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/studentDB")
.then(()=>{
    console.log("mongodb is connected");
})
.catch((error)=>{
    console.log(error);
});
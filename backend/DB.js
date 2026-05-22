const mongoose = require("mongoose");

const connectionDB = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/studentDB');
console.log("MongoDB Connected Successfully! 🍃");

} catch (e){
    console.log("message"+e.message);
}
}

module.exports=connectionDB;
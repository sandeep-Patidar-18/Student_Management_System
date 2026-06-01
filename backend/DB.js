import mongoose from "mongoose";

const connectionDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bankManagementDB");
    console.log("MongoDB Connected Successfully!");
    return true;
  } catch (e) {
    console.log("message " + e.message);
    return false;
  }
};

export default connectionDB;

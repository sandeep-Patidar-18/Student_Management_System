import mongoose from "mongoose";

const connectConfigDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bankManagementDB");
    console.log("mongodb is connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectConfigDB;

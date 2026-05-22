import express from "express";
import cors from "cors";
import connectDB from "./DB.js";

const app = express();
connectDB();

app.use(cors());

app.use(express.json());
app.post("/signup", (req, res) => {
  res.status(201).json({
    message: "Signup route is working",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

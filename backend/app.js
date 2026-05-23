import express from "express";
import cors from "cors";
import connectDB from "./DB.js";
import studentRoutes from "./routes/students_routes.js";

const app = express();
const PORT = process.env.PORT || 5000;
await connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Student management API is running",
  });
});

app.use("/api", studentRoutes);

app.post("/signup", (req, res) => {
  res.status(201).json({
    message: "Signup route is working",
    user: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

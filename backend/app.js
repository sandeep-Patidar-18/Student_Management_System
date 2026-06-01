import express from "express";
import cors from "cors";
import connectDB from "./DB.js";
import customerRoutes from "./routes/customers_routes.js";
import accountRoutes from "./routes/accounts_routes.js";

const app = express();
const PORT = process.env.PORT || 5000;
await connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Bank management API is running",
  });
});

app.use("/api/customers", customerRoutes);
app.use("/api/accounts", accountRoutes);

app.post("/api/auth/signup", (req, res) => {
  res.status(201).json({
    message: "Bank customer signup route is working",
    customer: req.body,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
await connectDB();

// Required for JSON
app.use(express.json());

// ⭐ REQUIRED for Multer + FormData text fields ⭐
app.use(express.urlencoded({ extended: true }));

// Allow CORS
app.use(cors(
  {origin: "https://airesume-qsrb.onrender.com"}
));

app.get("/", (req, res) => res.send("Server is Live..."));

// Routes
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/ai", aiRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

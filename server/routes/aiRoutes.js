import express from "express";
import protect from "../middlewares/authMiddleware.js";
import upload from "../configs/multer.js";
import {
  enhanceJobDescription,
  enhanceProfessionalSummary,
  uploadResume,
} from "../controllers/aiController.js";

const aiRouter = express.Router();

// Only file gets processed by Multer
aiRouter.post(
  "/upload-resume",
  protect,
  upload.single("file"), // <--- FIXED
  uploadResume
);

aiRouter.post("/enhance-pro-sum", protect, enhanceProfessionalSummary);
aiRouter.post("/enhance-job-desc", protect, enhanceJobDescription);

export default aiRouter;

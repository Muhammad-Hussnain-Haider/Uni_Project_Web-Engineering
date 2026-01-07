import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import veteranRoutes from "./routes/veteranRoutes.js";
import organizationRoutes from "./routes/organizationRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

const DB_NAME = "VeteranMeet"; 
mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`)
  .then(() => console.log(`MongoDB Connected to ${DB_NAME}`))
  .catch(err => console.log("MongoDB connection error:", err));

app.use("/api/veterans", veteranRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import { config } from "dotenv";
import connectDB from "./config/db.js";
import logger from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.js";

config({ path: "./config/.env" });
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static("public"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(logger("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
  connectDB();
});

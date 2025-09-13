import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import { upload } from "./services/multer.service.js";
import productRouter from "./routes/product.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://www.sumeet.live",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// const upload = upload.single("file");
const testing = (req, res) => {
  const file = req.file.filename;
  res.send(file);
};

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/upload", upload.single("file"), testing);

export default app;

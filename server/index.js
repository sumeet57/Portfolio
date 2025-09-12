import app from "./app.js";
import connectDB from "./config/connectDatabase.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

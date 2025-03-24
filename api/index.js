import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "../api/Routes/user.routes.js"
dotenv.config();

const app = express();
const Port = 5000;

// Connect to MongoDB
mongoose.connect(process.env.Mongo_URL)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log("Error: " + err);
});

app.use(express.json())

// routes
app.use("/api/auth", authRouter)

app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server Error"

  return res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})
// Start the server
app.listen(Port, () => {
  console.log(`Server is running on port http://localhost:${Port}`);
});

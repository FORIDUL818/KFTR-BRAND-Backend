import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();



// middleware
app.use(cors());
app.use(express.json());
// middleware end


// database connection
import connectDB from "./src/db/db.js";
connectDB();
// database connection end


// routes
import userRoutes from "./src/Routes/userRoutes.js";
app.use("/api/user", userRoutes);
// routes end

// error massage 
app.all("*splat",async(req,res)=>{
  try {
     res.status(404).json({message:"data not found"});
  } catch (error) {
    console.log(error);
  }
})
// error massage end


export default app;
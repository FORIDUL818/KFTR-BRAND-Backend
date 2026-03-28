import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();



// middleware
app.use(cors());
app.use(express.json());

// error massage 
app.all("*splat",async(req,res)=>{
  try {
     res.status(404).json({message:"data not found"});
  } catch (error) {
    console.log(error);
  }
})



export default app;
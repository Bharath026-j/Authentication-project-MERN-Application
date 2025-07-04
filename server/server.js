import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";



const app = express();  //created a express app


const PORT = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['https://authentication-project-mern-application.onrender.com']

app.use(express.json()); // all the request will be passed using json
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins , credentials: true  // we can send cookies in the response

}))


app.listen(PORT, ()=>{
    console.log(`server started on port ${PORT}`);
})

app.get("/", (req,res)=>{
    res.send("API Working perfectly and successfully");
})

app.use('/api/auth' , authRouter)
app.use('/api/user' , userRouter)
app.use('/images', express.static('public'));

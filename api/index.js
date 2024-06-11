import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.routes.js"
import hotelsRoute from "./routes/hotels.routes.js"
import roomsRoute from "./routes/rooms.routes.js"
import usersRoute from "./routes/users.routes.js"
import cookie from "cookie-parser"
import cors from "cors"
const app = express()
dotenv.config()

  
const connect=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("connected to Database");
    } catch (error) {
        throw error;
    }
}



mongoose.connection.on("disconnected",()=>{
    console.log("Database is disconnected");
})

//middleware
app.use(cors())
app.use(cookie());
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/users",usersRoute);

//error handling middleware
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMsg = err.message || "Something went wrong"
    res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        msg:errorMsg,
        stack: err.stack,
    });
})

app.listen(8000,()=>{
    connect()
    console.log("Connected to backend");
})

export default app
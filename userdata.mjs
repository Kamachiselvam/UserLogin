import express from "express";
import { user } from "./Data/data.mjs";
import router from "./Router/userRouter.mjs";
import mongoose from "mongoose";
const app=express()
const port=8000
app.use(express.json())
app.use(router)

mongoose.connect("mongodb://localhost/UserLogin")
.then(()=>console.log("Db connected"))
.catch((err)=>console.log(err))






app.listen(port,()=>{
    console.log(`The server running ${port}`)
})
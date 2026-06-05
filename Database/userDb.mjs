import mongoose from "mongoose";
import { user } from "../Data/data.mjs";

const demo=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}
)

const newuser= mongoose.model("UserData",demo)
export default newuser;

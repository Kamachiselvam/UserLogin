import { Router } from "express";
import { user } from "../Data/data.mjs";
import { createValidation } from "../controllers/userControllers.mjs";
import { validationResult,matchedData,checkSchema } from "express-validator";
import newuser from "../Database/userDb.mjs";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
const router =Router();

router.get('/user',async(req,res)=>{
    try{
        const demo=await newuser.find()
        return res.status(200).json(demo)
    }
    catch(err){
        return res.status(404).json({msg:err})
    }
    
})

router.get('/user/:id',async(req,res)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
        return res.status(400).end("This is not found")
    }
   try{
    const newres=await newuser.findById(id)
    return res.status(200).json(newres)
   }
   catch(err){
     return res.status(400).json({msg:err})
   }
})

router.post('/user',createValidation,async(req,res)=>{
    const result =validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({msg:result.array()})
    }
    const body=matchedData(req);
    body.password=await bcrypt.hash(body.password,10)
    const demo=new newuser(body)
    try{
        const newdemo=await demo.save();
        return res.status(200).json(newdemo)
    }
    catch(err){
        return res.status(404).json({msg:err})
    }
})

router.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    try{
        const demo=await newuser.findOne({email})
        if(!demo){
            return res.status(404).json({msg:"user not found"})
        }
        const isMatch=await bcrypt.compare(
            password,
            demo.password
        )
        if(!isMatch){
            return res.status(400).json({msg:"invalid password"})
        }
        return res.status(200).json({msg:"Login Successfully"})
    }
    catch(err){
        return res.status(404).json({msg:err})
    }
})

router.put('/user/:id',async(req,res)=>{
    const id=parseInt(req.params.id)
    if(isNaN(id)){
        return res.status(400).end("This is not found")
    }
    try{
        const demo1=await newuser.findByIdAndUpdate(
            id,
            req.body,
            {new:true}
        )
        return res.status(200).json(demo1)
    }
    catch(err){
        return res.status(400).json({msg:err})
    }
   
})


router.delete('/user/:id',async(req,res)=>{
    const id=parseInt(req.params.id)
    if(isNaN){
        return res.status(400).end("This is invalid id")
    }
    try{
        const demo=await newuser.findByIdAndDelete(id)
        return res.status(200).json(demo)
    }
    catch(err){
        return res.status(404).json({msg:err})
    }
    
})


export default router;

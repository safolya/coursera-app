const express = require("express");
const bcrypt = require("bcrypt");
const adminSchema = require("../models/admin");
const mongo = require("../config/mongoose-connction");
const router = express.Router({ mergeParams: true });
require('dotenv').config();
const jwt=require("jsonwebtoken");
const userMiddle=require("../middlewares/userMiddle");
const purchaseModel=require("../models/purchase");
const courseModel=require("../models/course");
const user = require("../models/user");


router.post("/purchase",userMiddle,async(req,res)=>{
     const courseId=req.body.courseId;
     const userId=req.userId;
     let purchase=await purchaseModel.create({
        course:courseId,
        user:userId
     });

     res.json({
        message:"Successfully purchased the course"
     })
});

router.get("/preview",async(req,res)=>{
     
     let courses=await courseModel.find({});
     res.json({
        courses
     })
});


module.exports=router
const express = require("express");
const bcrypt = require("bcrypt");
const adminSchema = require("../models/admin");
const mongo = require("../config/mongoose-connction");
const router = express.Router({ mergeParams: true });
require('dotenv').config();
const jwt=require("jsonwebtoken");
const adminMiddle=require("../middlewares/adminMiddle");
const courseModel=require("../models/course")

// SIGNUP ROUTES (Registration)
router.get("/signup", (req, res) => {
    res.send("signup page");
});

router.post("/signup", async (req, res) => {
    try {
        let { email, name, password } = req.body;
        
        // Check if user already exists
        const existingAdmin = await adminSchema.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({
                message: "Admin already exists"
            });
        }
        
        let hashedpass = await bcrypt.hash(password, 10);
        const admin = await adminSchema.create({
            email: email,
            name: name,
            password: hashedpass
        });
        
        return res.status(201).json({
            message: "Admin created successfully",
            user: {
                id: admin._id,
                email: admin.email,
                name: admin.name
            }
        });
        
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: "Server error during signup"
        });
    }
});

// SIGNIN ROUTES (Login)
router.get("/signin", (req, res) => {
    res.send("signin page");
});

router.post("/signin", async (req, res) => {
    try {
        let { email, password } = req.body;
        
        const admin = await adminSchema.findOne({ email });
        if (!admin) {
            return res.status(404).json({
                message: "Admin doesn't exist"
            });
        }
        
        let checkedpass = await bcrypt.compare(password, admin.password);
        
        if (checkedpass) {
            // return res.status(200).json({
            //     message: "Login successful",
            //     user: {
            //         id: admin._id,
            //         email: admin.email,
            //         name: admin.name
            //     }
            // });

            const token = jwt.sign({id:admin._id},process.env.JWT_ADMIN_SECRET);
                        res.status(200).json({
                            token:token
                        });


        } else {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({
            message: "Server error during signin"
        });
    }
});

router.post("/course", adminMiddle, async(req,res)=>{
    const adminId=req.adminId;
    let {title,description,price,imageUrl}=req.body;
    const course=await courseModel.create({
       title,
       description,
       price,
       imageUrl,
       createdBy:adminId
    });
    res.json({
        message:"course created successfully"
    })
});

router.put("/course/edit", adminMiddle, async(req,res)=>{
    const adminId=req.adminId;
    let {title,description,price,imageUrl,courseid}=req.body;
    const course=await courseModel.updateOne({ _id: courseid,createdBy: adminId},
    {
       title:title,
       description: description,
       price:price,
       imageUrl:imageUrl,
    });
    
    res.json({
        message:"course updated successfully"
    })
});

router.get("/course/bulk", adminMiddle, async(req,res)=>{
    const adminId=req.adminId;
    let course=await courseModel.find({createdBy:adminId});
    res.json({
        course
    });
});

module.exports = router;
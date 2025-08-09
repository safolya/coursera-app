const express = require("express");
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");
const mongo = require("../config/mongoose-connction");
const router = express.Router({ mergeParams: true });
const {z}= require("zod");
const jwt=require("jsonwebtoken");

// SIGNUP ROUTES (Registration)
router.get("/signup", (req, res) => {
    res.send("signup page");
});

router.post("/signup", async (req, res) => {
    try {
        let { email, name, password } = req.body;


        
        // Check if user already exists
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        
        let hashedpass = await bcrypt.hash(password, 10);
        const user = await userSchema.create({
            email: email,
            name: name,
            password: hashedpass
        });
        
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                email: user.email,
                name: user.name
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
        
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User doesn't exist"
            });
        }
        
        let checkedpass = await bcrypt.compare(password, user.password);
        
        if (checkedpass) {
            // return res.status(200).json({
            //     message: "Login successful",
            //     user: {
            //         id: user._id,
            //         email: user.email,
            //         name: user.name
            //     }
            // });

            const token = jwt.sign({email},"secret");
            res.json({
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

router.get("/purchases",(req,res)=>{
    res.json({
        message:"user purchase endpoint"
    })
})

//all course route
//purchase route

module.exports = router;
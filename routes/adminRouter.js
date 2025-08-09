const express = require("express");
const bcrypt = require("bcrypt");
const adminSchema = require("../models/admin");
const mongo = require("../config/mongoose-connction");
const router = express.Router({ mergeParams: true });

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

            const token = jwt.sign({email},"adminsecret");
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

module.exports = router;
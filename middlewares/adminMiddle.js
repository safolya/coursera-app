const jwt=require("jsonwebtoken");
require('dotenv').config();


const adminMiddle=(req,res,next)=>{
    const token=req.headers.token;
    const verify=jwt.verify(token,process.env.JWT_ADMIN_SECRET);
    if(verify){
        req.adminId=verify.id;
        next();
    }else{
        res.status(400).json({
            message:"Login first"
        })
    }
};

module.exports=adminMiddle;
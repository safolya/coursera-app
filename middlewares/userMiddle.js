const jwt=require("jsonwebtoken");
require('dotenv').config();


const userMiddle=(req,res,next)=>{
    const token=req.headers.token;
    const verify=jwt.verify(token,process.env.JWT_USER_SECRET);
    if(verify){
        req.userId=verify.id;
        next();
    }else{
        res.status(400).json({
            message:"Login first"
        })
    }
};

module.exports=userMiddle;
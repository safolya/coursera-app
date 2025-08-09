const express= require("express");
const mongo=require("./config/mongoose-connction")
const userRouter=require("./routes/userRouter")
const adminRouter=require("./routes/adminRouter")
const app = express();

app.use(express.json());

app.use("/user",userRouter);
app.use("/admin",adminRouter);

// app.get("/",(req,res)=>{
//     res.send("hello")
// })

// app.get("/user/signin",(req,res)=>{
//     res.send("sigup");
// });

// app.post("/user/signin",async(req,res)=>{
//       let {email,name,password}=req.body;
      
//       let hashedpass=await bcrypt.hash(password,10);

//       const user=await userSchema.create({
//         email: email,
//         name: name,
//         password: hashedpass
//       });
//      res.send(user);
// });

// app.get("/user/signup",(req,res)=>{
//     res.send("signup")
// });

// app.post("/user/signup",async(req,res)=>{
//     let {email,password}=req.body;
//     const user=await userSchema.findOne({email});
//     if(!user){
//         res.json({
//             message:"user is dosent exits"
//         })
//         return
//     }
//     let checkedpass=await bcrypt.compare(password,user.password);
    
//     if(checkedpass){
//         res.json({
//             message:"login succesfully"
//         })
//     }else{
//         res.json({
//             message:"invalid creds"
//         })
//     }
// });

app.listen(8080);
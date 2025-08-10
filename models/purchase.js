const mongoose=require("mongoose");

const purchaseSchema=new mongoose.Schema({
    course:{
        type: mongoose.Types.ObjectId,
        ref: "course"
    },
    
    user:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    }

});

module.exports=mongoose.model("purchase",purchaseSchema);
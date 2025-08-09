const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true
    },

    createdBy:{
         type: mongoose.Schema.ObjectId,
         ref: admin
    }
});

module.exports=mongoose.model("course",courseSchema);
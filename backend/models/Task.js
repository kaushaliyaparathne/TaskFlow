const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema({


    title:{
        type:String,
        required:true
    },


    description:String,


    status:{
        type:String,
        default:"Pending"
    },


    priority:{
        type:String,
        default:"Medium"
    },


    dueDate:String,


    dueTime:String,


    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    createdAt:{
        type:Date,
        default:Date.now
    }


});


module.exports = mongoose.model(
    "Task",
    taskSchema
);
const dns = require("dns");
dns.setServers(["8.8.8.8"]);


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();



const app = express();


// Middleware
app.use(cors());
app.use(express.json());



// Import Routes
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");



// API Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);



// MongoDB Connection

mongoose.connect(process.env.MONGO_URL)
.then(()=>{

    console.log("MongoDB Connected");

})
.catch((error)=>{

    console.log(
        "MongoDB Error:",
        error.message
    );

});




// Test API

app.get("/",(req,res)=>{

    res.send(
        "Task Management Backend Running"
    );

});




// Start Server

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});
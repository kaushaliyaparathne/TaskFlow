const express = require("express");
const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");




// =========================
// GET ALL USERS
// =========================

router.get("/", async(req,res)=>{

    try{


        const users = await User.find({})
        .select("-password")
        .sort({
            name:1
        });



        res.status(200).json(users);



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});









// =========================
// REGISTER USER
// =========================

router.post("/register", async(req,res)=>{


    try{


        const {
            name,
            email,
            password
        } = req.body;




        if(!name || !email || !password){

            return res.status(400).json({

                message:"All fields are required"

            });

        }






        const existingUser = await User.findOne({

            email:email.toLowerCase()

        });






        if(existingUser){


            return res.status(400).json({

                message:"User already exists"

            });


        }







        const hashedPassword = await bcrypt.hash(

            password,

            10

        );








        const newUser = new User({

            name:name,

            email:email.toLowerCase(),

            password:hashedPassword,

            role:"user"

        });







        await newUser.save();






        res.status(201).json({

            message:"Register Success"

        });






    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});











// =========================
// LOGIN USER / ADMIN
// =========================

router.post("/login", async(req,res)=>{


    try{


        const {

            email,

            password

        } = req.body;








        if(!email || !password){


            return res.status(400).json({

                message:"Email and Password required"

            });


        }







        const user = await User.findOne({

            email:email.toLowerCase()

        });







        if(!user){


            return res.status(404).json({

                message:"User not found"

            });


        }








        const checkPassword = await bcrypt.compare(

            password,

            user.password

        );








        if(!checkPassword){


            return res.status(400).json({

                message:"Invalid Password"

            });


        }








        const token = jwt.sign(

            {

                id:user._id,

                role:user.role || "user"

            },


            process.env.JWT_SECRET || "secretkey",


            {

                expiresIn:"1d"

            }


        );









        res.status(200).json({


            token,



            user:{


                id:user._id,

                name:user.name,

                email:user.email,

                role:user.role || "user"


            }


        });








    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});











// =========================
// DELETE USER (ADMIN)
// =========================

router.delete("/:id", async(req,res)=>{


    try{


        await User.findByIdAndDelete(

            req.params.id

        );


        res.json({

            message:"User deleted"

        });



    }catch(error){


        res.status(500).json({

            message:error.message

        });


    }


});







module.exports = router;
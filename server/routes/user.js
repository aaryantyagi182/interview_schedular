const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model("User");

router.post("/addUser",(req,res)=>{
    const {name,email}=req.body;
    const user =new User({
        name,
        email
    })

    user.save()
    .then((user)=>{
        res.json({message:"saved successfully"});
    })
    .catch((err)=>{
        console.log(err);
    })
})

router.get("/getEmails",(req,res)=>{
    let output=[];
    User.find({},{_id:0,email:true,name:true})
    .then(users=>{
        res.json(users);
    })
    .catch((err)=>{
        console.log(err);
    })
})

module.exports=router;
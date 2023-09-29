const express = require('express')
const router = express.Router()
const User = require('../model/user')


router.post('/register', async (req, res) => {
    const { name, email, password, confirmpassword, street, appartment, city, zip, country, phone, isAdmin } = req.body
    if (!name || !email || !password || !confirmpassword || !street || !city || !appartment || !zip || !country || !phone) {
        return res.status(400).json({ error: "Please Enter All Fields" })
    }
    if (password !== confirmpassword) {
        return res.status(400).json({ error: "Please Enter Same Password" })
    }
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(500).json({ error: "User Already Exists" })
        }
        else {
            const user = new User({
                name,
                email,
                password,
                confirmpassword,
                street,
                appartment,
                city,
                zip,
                country,
                phone,
                isAdmin
            })
            await user.save()
        }
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: "Please Enter All Fields" })
    }
    try {
        const userLogin = await User.findOne({ email: email })
        if (userLogin) {
            if (userLogin.password === password) {
                const token = await userLogin.genrateAuthToken();
                console.log(token)
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 2589200000),
                    httpOnly: true
                })
                return res.status(200).json({ message: "Login Successfull" })
            }
            else {
                return res.status(500).json({ error: "Invalid Credentials" })
            }
        }
        else {
            return res.status(500).json({ error: "Authorization error" })
        }
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/',async(req,res)=>{
    const user = await  User.find()
    if(!user){
        return res.status(500).json({error:"User not Found"})
    }
    else{
        res.send(user)
    }
})


router.get('/:id',async(req,res)=>{
    const user = await  User.findById(req.params.id)
    if(!user){
        return res.status(500).json({error:"User not Found"})
    }
    else{
        res.send(user)
    }
})

router.put('/:id',async(req,res)=>{
    const user = await User.findByIdAndUpdate(req.params.id,{
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        street:req.body.street,
        appartment:req.body.appartment,
        city:req.body.city,
        zip:req.body.zip,
        country:req.body.country,
        phone:req.body.phone,
    },
    {new : true})

    if(!user){
        return res.status(500).json({error:"User not Found"})
    }
    else{
         res.status(201).json({message:"Information Updated"})
    }
})

router.delete('/:id',async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        return res.status(500).json({error:"User not Found"})
    }
    else{
         res.status(201).json({message:"User Deleted"})
    }
})

router.get(`/get/count`, async (req, res) =>{
    const userCount = await User.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})

module.exports = router


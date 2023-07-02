const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env


exports.registerUser = async(req,res,next)=>{
    try{
        const {email,password} = req.body

        // Check Fields Available
        if(!(email&&password)){
            return res.status(400).json({
                success: false,
                message: "All fileds are required"
            })
        }

        // Check user already exists
        const userExists = await User.findOne({email})
        if(userExists){
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }

        // Encrypt Password
        const encryptPassword = await bcrypt.hash(password,10);

        // Save new user in DB
        const user = await User.create({
            email: email,
            password: encryptPassword
        })

        // Token Generation
        const token = jwt.sign(
            {
                userId: user._id,
                email
            },
            SECRET_KEY
        ) 

        // user.token = token;
        user.password = undefined;

        res.status(200).json({
            success: true,
            message: 'User Signup Success',
            user,
            token
        });
        
    }

    catch(err){
        res.status(500).json({
            success:false,
            message: "Server Error",
            error: err.message
        })
    }
}

exports.loginUser = async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        
        // Check fields
        if(!(email && password)){
            return res.status(400).json({
                success: false,
                message: 'Please enter all fields'
            })
        }
        
        // Grab User from database
        const user = await User.findOne({email});

        // Check user and compare password
        if(user && await bcrypt.compare(password,user.password)){

            // Generate token
            const token = jwt.sign(
                {userId: user._id,email},
                SECRET_KEY
            )

            // user.token = token;
            user.password = undefined;

            return res.status(200).json({
                success:true,
                user, 
                token
            })
        }

        res.status(401).json({
            success: false,
            message: "Invalid email or password"
        })

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message
        })
    }
}
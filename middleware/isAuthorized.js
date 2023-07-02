const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = process.env

exports.isAuthorized = async(req,res,next)=>{
    try{
        const token =  req.header('Authorization').replace('Bearer ',"")
        console.log("Token: ", token)
    
        if(!token){
            return res.status(401).send({
                success: false,
                message: "Unauthorize user "
            })
        }

        const decode = jwt.verify(token,SECRET_KEY)
        req.user = decode.userId


        next();
    }

    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        })
    }
}



// const token = req.cookies.token || req.header('Authorization').replace("Bearer ",'')
    
//         if(!token){
//             return next(new Error('Login first to access this page...'))
//         }
    
//         const decode = jwt.verify(token,process.env.JWT_SECRET)
    
//         // Attach User to request object
//         req.user = await User.findById(decode.id).select("+password")
//         console.log("User Logged In..")
//         next();
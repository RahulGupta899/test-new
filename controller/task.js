const Task = require('../models/Task')

exports.createTask = async(req,res)=>{

    try{
        const {title,description,date} = req.body;
        const user = req.user
        
        // Check all fields
        if(!(title && description && date)){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // Check Task Already added
        const taskInfo = await Task.findOne({title})

        if(taskInfo){
            return res.status(401).json({
                success: false,
                message: 'Task already added'
            })
        }

        // Save Task in DB
        const task = await Task.create({
            title,
            description,
            date,
            user
        })

        res.status(200).json({
            success: true,
            message: 'Task added successfully',
            task
        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        })
    }
    
    







}

exports.getAllTasks = async(req,res)=>{
    try{
        const user = req.user;
        const tasksList = await Task.find({user}).lean();

        res.status(200).json({
            success: true,
            message: 'All Tasks',
            user: req.user,
            tasksList
        })
    }
    catch(err){
        res.status(500).json({
            success: true,
            message: 'Server Error',
            error: err.message
        })
    }
}

exports.deleteSingleTask = async(req,res)=>{
    try{
        const {_id} = req.body
        console.log(_id);
        const task = await Task.findByIdAndDelete({_id})

        res.status(200).json({
            success: true,
            message: 'Task deleted successfully from DB',
            task
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: err.message
        })
    }
}

exports.getSingleTask = async(req,res)=>{
    try{
        const {id} = req.body
        const task = await Task.findById({_id:id})
        res.status(200).json({
            success: true,
            message: 'Single Task',
            task
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }    
}

exports.updateSingleTask = async(req,res)=>{
    try{

        const {id,title,description,date,status} = req.body

        // Check all fields
        if(!(title && description && date)){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        // Check Description Length
        if(description.length<30){
            return res.status(400).json({
                success: false,
                message: "Description should be atleast 30 characters"
            })
        }

        // Update the Task
        const task = await Task.findByIdAndUpdate({_id:id},{title,description,date,status})

        res.status(200).json({
            success: true,
            message: "Data Updated",
            task
        })

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}
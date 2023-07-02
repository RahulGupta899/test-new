require('dotenv').config()
const connectDB = require('./config/database')
const app = require('./app')
const {PORT} = process.env


// CONNECT DATABASE
connectDB();


// HEALTH CHECK ROUTE
app.get('/',(req,res)=>{
    try{
        res.status(200).json({
            success: true,
            message: 'Server is responding',
            uptime: process.uptime(),
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
})


// START SERVER
app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING AT PORT ${PORT}...`)
})
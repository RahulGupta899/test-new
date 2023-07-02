const mongoose = require('mongoose')
const {MONGODB_ATLAS_URL} = process.env
mongoose.set('strictQuery', false);        

const connectDB = function(){
    mongoose.connect(MONGODB_ATLAS_URL)
    .then(()=>{
        console.log(`DATABASE CONNECTED SUCCESSFULLY...`)
    })
    .catch((err)=>{
        console.log("DATABASE CONNECTION FAILED...")
        console.log("Error: ", err.message)
    })
}

module.exports = connectDB;

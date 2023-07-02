const express = require('express')
const cors = require('cors')
const app = express()


///////////////////////
// MIDDLEWARES
//////////////////////
app.use(express.json());
app.use(cors({origin: "*"}))


//////////////////////
// ROUTERS
/////////////////////
const userRoute = require('./router/user')
const taskRoute = require('./router/task')


/////////////////////////
// ROUTER MIDDLEWARES
/////////////////////////
app.use('/api',userRoute)
app.use('/api',taskRoute)


module.exports = app;
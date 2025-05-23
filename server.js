const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser');

//Load env vars
dotenv.config({path:'./config/config.env'});


//Route files
const menuitems = require('./routes/menuitems');
const orderitems =  require('./routes/orderitems');
const users =  require('./routes/users');
const auth = require('./routes/auth');


//connect to database
connectDB();


const app = express();

//Body parser
 app.use(express.json());


 //Cookie parser
 app.use(cookieParser());
//Mount routes
app.use('/api/v1/menuitems', menuitems);
app.use('/api/v1/orderitems',orderitems);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);


const PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log('Server running in ' , process.env.NODE_ENV,  'mode on port', PORT ))

//Handle unhandled promise rejections
process.on(`unhandledRejection`, (err,promise)=>{
    console.log(`Error: ${err.message}`);

    //Close server & exit process
    server.close(()=>process.exit(1));
});
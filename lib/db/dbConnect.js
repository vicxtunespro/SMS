const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const dbConnect = async () => {
    const connect = await mongoose.connect(process.env.DBCONNECT)
     if(connect){
        console.log("DB Connection sucessful")
     }else{
        console.log("An error occured")
     }
}

module.exports = dbConnect;
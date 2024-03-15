const mongoose = require('mongoose');

const connectDB = async(req,res) =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Successfully connnected to MONGO DB on ${mongoose.connection.host}`);
    }
    catch(error){
        console.log("Unable to connect to databse");
    }
}

module.exports = connectDB;
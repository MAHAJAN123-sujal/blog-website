const userModel = require('../models/userModel');
const bcrypt = require('bcrypt')
exports.registerController = async(req,res) =>{
    try{
        const {username, email, password} = req.body

        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message:'Please fill all fields'
            })
        }

        // checking if user exists
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:'User already exists'
            })
        }
        
        // hashing password
        const hashedPassword = await bcrypt.hash(password,10);

        // on passing all conditions => saving the user
        const user = new userModel({username,email,password:hashedPassword})
        await user.save();
        return res.status(201).send({
            success:true,
            message:'New User created',
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Registerion Failed',
            error
        })
    }
}

exports.loginController = async(req,res) =>{
    try{
        const {email,password} = req.body
        // for validation
        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:'Enter Username or password'
            })
        }

        // checking if user is registered
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(301).send({
                success:false,
                message:'Invalid User'
            })
        }
        // checking for the password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(307).send({
                success:false,
                message:'Password incorrect'
            })
        }
        return res.status(200).send({
            success:true,
            message:'Login successfully',
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(501).send({
            success:false,
            message:'Unable to Login',
            error
        })
    }
}

exports.getAllUsers = async(req,res) =>{
    try{
        const users = await userModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success:true,
            message:'All users Data',
            users
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Unable to fetch all the users',
            error
        })
    }
}

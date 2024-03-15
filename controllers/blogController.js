const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');

exports.getSingleBlogController = async(req,res) =>{
    try{
        const {id} = req.params;
        const blog = await blogModel.findById(id);

        if(!blog){
            return res.status(401).send({
                success:false,
                message:'Requested Blog not found'
            })
        }

        return res.status(201).send({
            success:true,
            message:'requested blog found',
            blog
        })
    } 
    catch(error){
        console.log(error);
        res.status(501).send({
            success:false,
            message:'Unable to fetch blog',
            error
        })
    }
}

exports.getAllBlogs = async(req,res) =>{
    try{
        const blogs = await blogModel.find({})
        if(!blogs){
            return res.status(200).send({
                success:false,
                message:'No Blogs found'
            })
        }
        return res.status(201).send({
            success:true,
            blogCount: blogs.length,
            message:'All Blogs List',
            blogs
        })
    } 
    catch(error){
        console.log(error);
        res.status(501).send({
            success:false,
            message:'Unable to fetch all blogs',
            error
        })
    }
}

exports.createBlogController = async(req,res) =>{
    try{
        const {title,description,image,user} = req.body
        
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                message:'Provide all firld details'
            })
        }

        const existingUser = await userModel.findById(user);
        // validation for the resgisterd user

        if(!existingUser){
            return res.status(301).send({
                success:false,
                message:'Unable to find User'
            })
        }

        const newBlog = new blogModel({title,description,image,user});

        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();

        await newBlog.save();
        return res.status(201).send({
            success:true,
            message:'New Blog created successfully',
            newBlog
        })
    } 
    catch(error){
        res.status(501).send({
            success:false,
            message:'Unable to create blog',
            error
        })
    }
}

exports.updateBlogController = async(req,res) =>{
    try{
        const {id} = req.params;
        const {title,description,image} = req.body;

        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(201).send({
            success:true,
            message:'Blog Updated Successfully',
            blog
        })
    } 
    catch(error){
        console.log(error);
        res.status(501).send({
            success:false,
            message:'Unable to update blog',
            error
        })
    }
}


exports.deleteBlogController = async(req,res) =>{
    try{
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:'Blog Deleted Successfully'
        })
    } 
    catch(error){
        console.log(error);
        res.status(501).send({
            success:false,
            message:'Unable to delete blog',
            error
        })
    }
}


exports.getUserBlogController = async(req,res) =>{
    try{
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(401).send({
                success:false,
                meassage:'No blogs for this id'
            })
        }

        return res.status(201).send({
            success:true,
            blogCount:userBlog.length,
            message:'Blogs from user id',
            userBlog
        })
    }
    catch(error){
        console.log(error);
        return res.status(401).send({
            success:false,
            message:'Unable to get user blogs',
            error
        })
    }
}
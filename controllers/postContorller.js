const Post = require('../models/postModel')

exports.getALlPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            staus: 'success',
            results: posts.length,
            data: {
                posts
            }
        })
    } catch (error) {
        res.status(400).json({
            staus: 'fail'
        })
    }
}

exports.getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            staus: 'success',
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            staus: 'fail'
        })
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body)
        res.status(200).json({
            staus: 'success',
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            staus: 'fail'
        })
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            staus: 'success',
            data: {
                post
            }
        })
    } catch (error) {
        res.status(400).json({
            staus: 'fail'
        })
    }
}

exports.deltePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        res.status(200).json({
            staus: 'success'
        })
    } catch (error) {
        res.status(400).json({
            staus: 'fail'
        })
    }
}
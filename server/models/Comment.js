const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)
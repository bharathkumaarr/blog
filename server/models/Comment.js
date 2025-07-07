const commentSchema = new mongoose.Schema({
    content: {type: String},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

module.exports = mongoose.model('Comment', commentSchema)
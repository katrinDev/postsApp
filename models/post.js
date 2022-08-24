const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    text: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    }
}, { timestamps: true });//схема

const Post = mongoose.model('Post', postSchema);// модель

module.exports = Post;
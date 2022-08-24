const Post = require('../models/post');

const handleError = (res, error) => {
    res.status(500).send(error.message);
}

//создаем отдельный контроллер для каждого типа запроса
const getPost = (req, res) => {
    Post
    .findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch( error => handleError(res, error));
};//uses received id to give just one specific post

const deletePost = (req, res) => {
    Post
       .findByIdAndDelete(req.params.id)
       .then(() => res.status(200).json(req.params.id))
       .catch( error => handleError(res, error));
};


const editPost = (req, res) => {
    const { title, author, text } = req.body;
    const {id} = req.params;
    Post
        .findByIdAndUpdate(id, {title, author, text}, {new: true})
        .then((post) => res.status(200).json(post))
        .catch( error => handleError(res, error));
};

const getPosts = (req, res) => {
    Post
        .find()
        .sort({createdAt: -1})
        .then((posts) => res.status(200).json(posts))
        .catch( error => handleError(res, error));    
};

const addPost = (req, res) => {
    const {title, text, author} = req.body;
    const post = new Post({title, text, author});
    post
        .save()
        .then((post) => res.status(200).json(post))//отправили созданный документ(объект) в бд по модели
        .catch( error => handleError(res, error));
};

module.exports = {
    getPost,
    deletePost,
    editPost,
    getPosts,
    addPost
};


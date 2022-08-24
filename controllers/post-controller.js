const Post = require('../models/post');
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
    console.log(error.message);
    res.render(createPath('error'), {title: "Error"});
}


//создаем отдельный контроллер для каждого типа запроса
const getPost = (req, res) => {
    const title = 'Post';
    Post
    .findById(req.params.id)
    .then( post => res.render(createPath('post'), {post, title}))
    .catch( error => handleError(res, error));
};//uses received id to give just one specific post

const deletePost = (req, res) => {
    const title = 'Post';
    Post
       .findByIdAndDelete(req.params.id)
       .then(result => {res.sendStatus(200)})
       .catch( error => handleError(res, error));
};

//в этом отправленном при нажатии на кнопку гете мы обязаны передать страницу редактирования 
const getEditPost = (req, res) => {
    Post
        .findById(req.params.id)
        .then(post => res.render(createPath('edit-post'), { post, title: 'Edit Post'}))//ищем и передаем инфу конкретного редактируемого документа
        .catch( error => handleError(res, error));
};

const editPost = (req, res) => {
    const { title, author, text } = req.body;
    const {id} = req.params;
    Post
        .findByIdAndUpdate(id, {title, author, text})
        .then(result => res.redirect(`/posts/${id}`))
        .catch( error => handleError(res, error));
};

const getPosts = (req, res) => {
    const title = 'Posts';
    Post
        .find()
        .sort({createdAt: -1})
        .then(posts => res.render(createPath('posts'), {posts, title}))
        .catch( error => handleError(res, error));    
};

const getAddPost = (req, res) => {
    const title = 'Add post';
    res.render(createPath("add-post"), {title} );
};

const addPost = (req, res) => {
    const {title, text, author} = req.body;
    const post = new Post({title, text, author});
    post
        .save()
        .then((result) => res.redirect('/posts'))//отправили созданный документ(объект) в бд по модели
        .catch( error => handleError(res, error));
};

module.exports = {
    getPost,
    deletePost,
    getEditPost,
    editPost,
    getPosts,
    getAddPost,
    addPost
};


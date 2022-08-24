const express = require('express');

const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');//чтобы юзать PUT

const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

const db = 'mongodb+srv://Katrin:Kpoloz19992002@cluster0.tpli7ug.mongodb.net/node-blog?retryWrites=true&w=majority';//по этой ссылке происходит коннект и там же зашифрован адрес бд (node-blog)!!

mongoose
        .connect(db)
        .then((res) => console.log('Connected to DB'))
        .catch((err) => console.log(err.message));


app.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

app.use(express.urlencoded({ extended: false}));// для post-запросов, встроенный в express парсер входящих данных

app.use(express.static('styles'));//разрешаем доступ к файлу со статичными данными

app.use(methodOverride('_method'));//передаем строку-флаг, на которую будем реагировать для put



app.get('/', (req, res) => {
    const title = 'Home';
    res.render(createPath('index'), {title} );
});

app.get('/about-us', (req, res) => {
    res.redirect("/contacts");
});

app.use(postRoutes);
app.use(contactRoutes);
app.use(postApiRoutes);

app.use((req, res) => {
    const title = 'Error page';
    res
        .status(404)
        .render(createPath('error'), {title} );
});


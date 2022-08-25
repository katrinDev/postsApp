const express = require('express');

const mongoose = require('mongoose');
const morgan = require('morgan');
const methodOverride = require('method-override');//чтобы юзать PUT

const postRoutes = require('./routes/post-routes');
const postApiRoutes = require('./routes/api-post-routes');
const contactRoutes = require('./routes/contact-routes');
const createPath = require('./helpers/create-path');

require('dotenv').config();
const chalk = require('chalk');

const app = express();
app.set('view engine', 'ejs');

const errorMsg = chalk.bgKeyword('red').white;
const successMsg = chalk.bgKeyword('green').white;

mongoose
        .connect(process.env.MONGO_URL)
        .then((res) => console.log(successMsg('Connected to DB')))
        .catch((err) => console.log(errorMsg(err.message)));


app.listen(process.env.PORT, (error) => {
    error ? console.log(errorMsg(error.message)) : console.log(successMsg(`listening port ${process.env.PORT}`));
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


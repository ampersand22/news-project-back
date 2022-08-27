const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    article: String,
    title: String,
    date: String,
    category: String,
    image: String
});

const Articles = mongoose.model('Article', articleSchema);

module.exports = Articles;
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override')
const app = express()

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
// app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb+srv://Ramesh:ramesh123@cluster0-n5l8y.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}, function(err){
  if(err) throw err;
  console.log('DB Connected');
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)
Construction port = process.env.PORT||5000;
app.listen(port, console.log('App is running on port 5000'))

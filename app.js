const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blogs_data = require('./models/blogsDB');
const _ = require('ejs');

// Express app
const app = express();

// Connect into mongoDB
const dbURI = 'mongodb+srv://<project_name>:<password>@ironin.z5tsj0q.mongodb.net/<cluster_name>?retryWrites=true&w=majority';
mongoose.set('strictQuery' , false);//to supress the deprecation warning.
mongoose.connect(dbURI , {useNewUrlParser : true, useUnifiedTopology : true})
    .then((result) => app.listen(8080))
    .catch((err) => console.log(err));


// register view engine
app.set('views' , './views_app');
app.set('view engine' , 'ejs');

//static files
app.use(express.static('./views_app/public'));//allowing css file to be displayed from head.ejs


// Listen for request
// app.listen(8080);

// middleware 3rd parties & static files.
app.use(express.static('./views_app/public'));//allowing css file to be displayed from head.ejs
app.use(express.urlencoded({ extended : true }));//app.post middleware
app.use(morgan('dev'));

app.get('/' , (req, res) => {
    
    res.redirect('/blogs')
    
})

app.get('/about', (req, res) => {
    res.render(
        'about', 
        {
            page_title : "I-Ronin About",
            headings_title : "About I-Ronin page"
        }
    );
})

app.get('/blogs/create' , (req, res) => {
    
    res.render(
        'create', 
        {
            page_title : "I-Ronin Create New Blog",
            headings_title : "Create New I-Ronin Blog"
        }
    )
    
})

//blog routes
app.get('/blogs', (req, res) => {
    Blogs_data.find().sort({createdAt:-1})
    .then((result) => {
        res.render('index' , 
        {
         ronin_blogs: result,
         page_title: 'Home' ,
         headings_title: 'Ronin Blogs'
        });
    })
    .catch((err) => {
        console.log(err);
    })
})

//post blog handler
app.post('/blogs' , (req, res) => {
    // console.log(req.body);
    const ronin_blogs = new Blogs_data(req.body);
    
    ronin_blogs.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err) => {
        console.log(err);
    })
})

//routes parameter
app.get('/blogs/:id', (req, res) => {
    const identity = req.params.id
    console.log(identity);
    Blogs_data.findById(identity)
    .then((result) => {
        res.render(
            'blog_detail' , 
            {
                ronin_blogs : result,
                page_title : "A Ronin's Blog",
                headings_title : `Ronin's blog`
            }
        );
    })
    .catch((err) => {
        console.log(err);
    });
})

app.get('/blogs/create' , (req, res) => {
    
    res.render(
        'create', 
        {
            page_title : "I-Ronin Create New Blog",
            headings_title : "Create New I-Ronin Blog"
        }
    )
    
})

app.use((req,res) => {
    res.status(404).render('404', {page_title : "Error:404"});
})


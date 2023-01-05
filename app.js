const express = require('express');
const _ = require('ejs')
// const port = require ('./server')

// Express app
const app = express();

// register view engine
app.set('views' , './views_app');
app.set('view engine' , 'ejs');

//static files
app.use(express.static('./views_app/public'));//allowing css file to be displayed from head.ejs


// Listen for request
app.listen(8080);

app.get('/' , (req, res) => {
    
    const blogs = [
        {title : "Yoshimitsuru Finds Cabbage" , snippet : "How do he get it anyway?"},
        {title : "jinajinjin Discovering Wonder", snippet : "Did he never Wandering?"},
        {title : "Howrangi Lost in utan" , snippet : "What? inside that ape?"}
    ]
    
    res.render(
        'index', 
        {
            page_title : "I-Ronin Home", 
            headings_title : "Ronin Blogs",
            blogs,
            
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

app.get('/about', (req, res) => {
    res.render(
        'about', 
        {
            page_title : "I-Ronin About",
            headings_title : "About I-Ronin page"
        }
    );
})

// app.post((req, res) => {
//     res.render('head', express.static(__dirname + './views_app/partial_views_app/styling.css'))
// }) //try to figure out inputing css file

// app.get('/about-us' , (req, res) => {
//     res.status(304).redirect('/about');
// })// testing purpose

app.use((req,res) => {
    res.status(404).render('404', {page_title : "Error:404"});
})


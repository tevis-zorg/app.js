const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ronin_blog_schema = new Schema({
    user_name : {
        type : String,
        require : true
    },
    title : {
        type : String,
        require : true
    },
    snippet : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    }
}, { timestamps : true  });//create new instance of the schema objects

const Blogs_data = mongoose.model("BlogsDB" , ronin_blog_schema);
module.exports = Blogs_data;
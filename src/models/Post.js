const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
 
  emailOfPostCreator: String,
  enrollmentOfPostCreator: String,
  departmentOfPostCreator: String, 
  yearOfPostCreator: String, 

    nameOfPostCreator:{
        type:String,
        required:true
      },
      caption:{
        type:String,
        required:true
      },
      imageUrl: String,

} , { timestamps: true } )

const posts = mongoose.model('post' ,  postSchema);

module.exports= posts
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/College")
.then(()=>{
    console.log("connection with database established");
})
.catch((err)=>{
    console.log(err);
})
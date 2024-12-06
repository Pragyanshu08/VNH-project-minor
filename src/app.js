const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
require('./db/conn');
const axios = require('axios');
const fs= require('fs');

const Register = require('./models/registers');
const posts = require('./models/Post');
const upload = require('./upload')
const bycrypt = require('bcryptjs');

const staticpath = path.join(__dirname , '../public');
app.use(express.static(staticpath));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



app.set("view engine" , "ejs");
app.use(express.urlencoded({ extended: true }));
app.set('views' , path.join(__dirname , '../templates/views'))



const session = require('express-session');

app.use(
    session({
        secret: 'pragyanshuIsGoodBoy',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 30 * 60 * 1000, }, 
    })
);






app.get('/' , (req , res)=>{
   res.render("index");
});

                                           //backend logic for registration

app.get('/registers' , (req , res)=>{
    res.render("registers");
} )

app.post('/registers' , async(req , res)=>{
    try{
       const password = req.body.password;
       const cpassword = req.body.confirmPassword;

       const existingUser = await Register.findOne({ email:req.body.email });
       if (existingUser) {
           return res.status(400).send("<h1>Email is already registered. Please use a different email.<h1>");
       }


       if(password===cpassword){

           const registerStudent = new Register({
              name:req.body.name,
              enrollment:req.body.enrollment,
              email:req.body.email,
              department:req.body.department,
              year:req.body.year,
              password:req.body.password,
              confirmPassword:req.body.confirmPassword
           })

          const registerdata = await registerStudent.save();
         return  res.render("thankyou" , {name: req.body.name})

       }
       else{
        res.send("pass not matching");
       }

    }
    catch(err){
        res.status(400).send(err);
    }
})
  
                                            // backend logic for login form

app.get('/login' , async(req , res)=>{
    console.log("Login route hit");
    try {
        if (req.session.user) {
            // Fetch all posts from the database 
            const allPosts = await posts.find().sort({ createdAt: -1 });;
            
            

            return res.render('login', {
                name: req.session.user.name,
                email: req.session.user.email,
                enrollment: req.session.user.enrollment,
                quote: req.session.quote,
                department: req.session.user.department,
                year:req.session.user.year,
                posts: allPosts, // Pass posts to the view
            });
        } else {
            
            return res.render('login', {
                posts: [] 
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to load posts.");
    }
    
} )

app.post('/login', async(req , res)=>{
   try{
      const {email , password }= req.body;
     

      const registeredStudent = await Register.findOne({ email:email });
      
      if(registeredStudent){

        const matching = await bycrypt.compare(password , registeredStudent.password);
        if(matching){
             

            const response = await axios.get('https://zenquotes.io/api/quotes');
            const data = response.data;
            
            const randomIndex = Math.floor(Math.random() * data.length);
            const quote = data[randomIndex].q;
           
            req.session.quote = quote;
          
            req.session.user = {
                name: registeredStudent.name,
                email: registeredStudent.email,
                enrollment: registeredStudent.enrollment,
                department:registeredStudent.department,
                year:registeredStudent.year
            };



            return res.redirect('/login');
        }
        else{
            res.send('<h1>password is wrong!<h1>');
        }
      }
      else{
         res.send('<h1>email not registered <h1>');
      }

      
   }
   catch{
     res.status(400).send("invalid email")
   }
})


                                            // backend logic for contact us form


const sendMail = require('./sendmail');

app.post('/sendmail', async (req, res) => {

    const { name, to, phone, from, subject, msg } = req.body;

    const result = await sendMail({ name, to, phone, from, subject, msg });

    if (result.success) {
        res.render('emailSent' , ({name}));
    } else {
        res.status(500).send("Failed to send email");
    }
});

app.post('/createPost', upload.single('image'), async (req, res) => {
    try {
        const { nameOfPostCreator, caption } = req.body;
        const image = req.file;

        const user = req.session.user;

        if (image) {

            const imageUrl = `/uploads/${image.filename}`;
            const newPost = new posts({
                nameOfPostCreator: user.name,  
                emailOfPostCreator: user.email, 
                enrollmentOfPostCreator: user.enrollment,
                departmentOfPostCreator:user.department,
                yearOfPostCreator: user.year,
                caption,
                imageUrl,
            });

            await newPost.save();
        }

        return res.redirect('/login');              //back to login , so that post can be seen
    } catch (err) {
        console.error(err);
        res.status(400).send("Failed to create post");
    }
});



app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Failed to logout.');
        }
        res.redirect('/'); 
    });
});





app.get('*' , (req, res)=>{
    res.render('error404')
})

app.listen(port , ()=>{
   console.log(`listening at port : ${port}`);
});
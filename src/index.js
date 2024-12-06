const express = require('express');
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');
const exp = require('constants');

const app = express();
const server = http.Server(app);
const port = 500;

app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , '../public/index.html')));

app.get('/' , (req , res)=>{
    res.sendFile(path.join(__dirname , '../public/index.html'));
})

app.post('/sendmail' , (req , res)=>{
    const {name ,to ,phone,   from ,subject , msg} = req.body;

    const Transporter = nodemailer.createTransport({
        service : 'gmail' , 
        auth:{
            user:"yashtiwari4000@gmail.com",
            pass : 'lepwdcjqbnjwbkzt'
        }
    })

    const mailOptions = {
        from :from , 
        to : to,
        subject: subject,
        text:`message from ${name}(${phone}): ${msg}`
    }

    Transporter.sendMail(mailOptions , (err )=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("email send");
            res.redirect('/');
        }
        
    })

 })

 

server.listen(port , ()=>{
    console.log("starting server..");
})
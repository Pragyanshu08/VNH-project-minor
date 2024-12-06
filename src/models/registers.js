const mongoose = require('mongoose');
const { type } = require('os');
const bycrypt = require('bcryptjs');
const employeeSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    enrollment:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:true,
      unique:true
    },
    department:{
        type:String,
        required:true,
    },
    year:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword:{
        type:String,
        required:true,
    }
})

employeeSchema.pre('save' , async function (next) {
  
  if(this.isModified('password')){
    this.password= await bycrypt.hash(this.password , 10);
    console.log(this.password);
    this.confirmPassword = undefined;
  }

  next();
} )

const Register = new  mongoose.model("Register" , employeeSchema )

module.exports = Register;
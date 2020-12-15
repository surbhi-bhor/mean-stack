 //create a user model in this file
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const fs = require("fs");
const emailService = require("./email")

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },   
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String    
  }
  
});

//-------------------------------------------------------------------------------------------------------------------
// HASHING THE PASSWORD
userSchema.pre(
  'save',
  async function(next) {
    const User = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
);

userSchema.post('save', async function(doc,next){
  const footer = await fs.readFileSync(`${__dirname}/welcome.html`, 'utf8');
  const mailData = {
    from: 'surbhidilipbhor@gmail.com',
    to: `${doc.email}`,
    subject: 'Welcome to Fly High!',
    html: `<h1> Hello ${doc.name},${footer}`
  };
  emailService.sendEmail(mailData);
  next();
})

/*-----------------------------------------------------------
-----------------------------------------------------------*/

// to make sure that the user trying to log in has the correct credentials
//static method to login user
userSchema.statics.login=async function(email,password){
  const user=await this.findOne({email});
  if(user){
    const auth=await bcrypt.compare(password,user.password);
    if(auth){
      return user;
    }
    throw Error('incorrect password');
    
  }
  throw Error('incorrect email');
}

//--------------------------------------------------------------------------------------------------------------------------
module.exports = mongoose.model("User", userSchema);
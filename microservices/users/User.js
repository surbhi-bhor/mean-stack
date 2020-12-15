 //create a user model in this file
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

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
//load express
const express=require('express');
const app=express();

//load cors
const cors = require('cors')

//load cookie parser
const cookieParser=require('cookie-parser');

//webtoken
const jwt=require('jsonwebtoken');

//middleware
const bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())
//load mongoose
const mongoose=require('mongoose');

//---------------------------------------------------------------------------------------------------------------------------------------------

//connect to database
mongoose.connect("mongodb+srv://surbhi:12345@flight.paxk2.mongodb.net/flightUser",{useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex: true})
.then(()=> console.log("Connected to database-users"))
.catch((err)=> console.log(err));
// load model
require("./User");
const User = mongoose.model("User")

//---------------------------------------------------------------------------------------------------------------------------------------------
//handling errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered.Please recheck your email id';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'Your password is incorrect';
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'This email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
       Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }  
    return errors;
  }

//---------------------------------------------------------------------------------------------------------------------------------------------
// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'Flight booking secret', {
        expiresIn: maxAge
    });
}
//---------------------------------------------------------------------------------------------------------------------------------------------
// 1] POST METHOD FOR USER SIGNUP ALONG WITH JWT
app.post("/user/signup", async(req,res) => {
    var newUserObj = {
        
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        email: req.body.email,
        password: req.body.password,
        userType: "user"
    }
    //var userAdd = new User(newUserObj)
    try{
        const user=await User.create(newUserObj);
       const token=createToken(user._id);
       //res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
       res.status(201).json({userId: user._id, token: token, userType: user.userType});
       console.log("New user created with cookie");
    }
    catch(err){
        res.status(400).json(handleErrors(err));
    }
    
});

//---------------------------------------------------------------------------------------------------------------------------------------------
// 2] POST METHOD FOR USER LOGIN ALONG WITH JWT

app.post('/user/login',async(req,res)=>{
    const {email,password}=req.body;
  
    //new login post for jwt
    try{
      const user=await User.login(email,password);
      //console.log(user);
      const token=createToken(user._id);
      //res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000});
      res.status(200).json({userId :user._id,token: token, userType: user.userType});
      console.log("Registered user");
    }
    catch(err){
      const errors=handleErrors(err);
      res.status(400).json({errors});
      console.log(" User Not Registered");
    }
  });

//---------------------------------------------------------------------------------------------------------------------------------------------

// 3] retrieve all users
app.get("/users", (req,res)=> {
    User.find().then((users)=>{
        res.json(users)
        
    }).catch ((err) => {
        if(err){
            throw err;
        }
    })
})

//---------------------------------------------------------------------------------------------------------------------------------------------

// 4] retrieve user by the name

app.get("/username/:name",(req,res) => {
    User.find({name: req.params.name}).then((user)=> {
        if(user){
            res.json(user);
        }else {
            res.sendStatus(404);
        }
    }).catch(err =>{
        if(err){
            throw err;
        }
    })
} )  
//---------------------------------------------------------------------------------------------------------------------------------------------

// 5] Retrieve user by its id
app.get("/user/:id",(req,res) => {
    User.findById(req.params.id).then((user)=> {
        if(user){
            res.json(user);
        }else {
            res.send('Invalid ID');
        }
    }).catch(err =>{ 
        if(err){
            throw err;
        }
    })
} )
// 
//---------------------------------------------------------------------------------------------------------------------------------------------

// 6] Updating users
app.put('/user/:name', (req,res) => {
    User.updateOne({name: req.params.name}, req.body).then((response) => {
    User.findOne({name: req.params.name}).then(function(user){
        res.send(user); 
        
    })
        //res.send("User updated successfully");
      
}).catch(err => {
    if(err){
      throw err;
    }
  })
});

//---------------------------------------------------------------------------------------------------------------------------------------------

//listen to the port
app.listen(5555, () => {
    console.log("Up and running this is our user service");
})







//---------------------------------------------------------------------------------------------------------------------------------------------


// 1] create functionality

// app.post("/user", (req,res)=> {
//     var newUser = {
//         name: req.body.name,
//         age: req.body.age,
//         gender: req.body.gender,
//     //-------------------------------
//        // userType: req.body.userType,
//         email: req.body.email,
//         password: req.body.password
        
//     }
// //create new user
// var user = new User(newUser)
// user.save().then(()=> {
//     console.log("New User added");
// }).catch ((err) => {
//     if(err){
//         throw err;
//     }
// })
// res.send("New User added successfully")
// }) 

//---------------------------------------------------------------------------------------------------------------------------------------------

// // 5] removing users
// app.delete('/user/:name', (req, res) => {
//     User.deleteOne({name: req.params.name}).then((response) => {
//       res.send("User removed successfully");
//       console.log(response);
//     }).catch(err => {
//       if(err){
//         throw err;
//       }
//     })
//   });
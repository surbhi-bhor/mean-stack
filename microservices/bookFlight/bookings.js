//load express
const express = require("express");
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//load cors
const cors = require('cors')
app.use(cors({origin: 'http://localhost:4200'}))

//load mongoose
const mongoose = require("mongoose");



//connect to database
mongoose.connect("mongodb+srv://surbhi:12345@flight.paxk2.mongodb.net/flightBooking?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology:true})
.then(()=> console.log("Connected to database- bookings"))
.catch((err)=> console.log(err));

 require("./Booking");
 const Booking = mongoose.model("Booking")

// ---------------------------------------------------------------------------------------------------------------------------------------------

// 1] create functionality
var BookingID = 1;
var seatNo= 45;
app.post("/booking/:flightCode/:UserID", (req, res)=>{
  let flightCode = req.params.flightCode;
  console.log(req.body.user.email);
  var newBooking = {
    UserID: mongoose.Types.ObjectId(req.params.UserID),
    flight: {
      flightCode: flightCode,
      airline: req.body.flight.airline,
      source: req.body.flight.source,
      destination: req.body.flight.destination,
      fare: req.body.flight.fare,
    },
    user:{
      email: req.body.user.email,
      phoneNo: req.body.user.phoneNo,
      name: req.body.user.name,
      age: req.body.user.age
    },
    // flight:{
    //   flightCode: flightCode,
    //   airline: '',
    //   source: '',
    //   destination: '',
    //   fare: '',
    // },
    BookingID: BookingID,
    seatNo: seatNo
  }

  // axios.get("http://localhost:4545/flightCode/"+flightCode).then((flight) => {
  //   // let fly = flight.data[0];
  //   //console.log(fly);
  //   const fly = flight.data;
  //   newBooking = {
  //     UserID: req.params.UserID,
  //     flight:{
  //       flightCode: flightCode,
  //       airline: fly.airline,
  //       source: fly.source,
  //       destination: fly.destination,
  //       fare: fly.fare,
  //     },
  //    BookingID:BookingID
  //   }
    
    var booking1 = new Booking(newBooking);
    booking1.save().then(() =>{
      res.status(200).json({BookingID: BookingID});
    //res.send("BookingId is :"+BookingID);
    BookingID++;
    seatNo++;
    //console.log(bookingId);    
      
    });
}); 

// ---------------------------------------------------------------------------------------------------------------------------------------------

// 2] retrieve all bookings
app.get("/bookings", (req,res)=> {
    Booking.find().then((bookings)=>{
        res.json(bookings)
        
    }).catch ((err) => {
        if(err){
            throw err;
        }
    })
})


// ---------------------------------------------------------------------------------------------------------------------------------------------

// 3] retrieve booking made by the user
app.get('/booked/allbookings/:UserID', (req, res) => {
    var objectId = mongoose.Types.ObjectId(req.params.UserID);
    var myArr = [];
    Booking.find({UserID:objectId}).then((response)=>{
      //console.log(response);
      for(let i of response){
        let bookingObj = {
          flight: i.flight,
          BookingID: i.BookingID,
          user: i.user,
          seatNo: i.seatNo
        }
        myArr.push(bookingObj);
      }
      console.log(myArr);
      res.send(myArr);
    }).catch((err) => {
      if(err){
        throw err;
      }
    });
  });

// ---------------------------------------------------------------------------------------------------------------------------------------------
// get booking by id [for summary]
app.get('/booking/:id',(req,res)=>{
  Booking.findById(req.params.id).then((booking)=>{
    res.json(booking);
  })
});

// ---------------------------------------------------------------------------------------------------------------------------------------------

//Cancel Booking
app.delete("/booking/cancel/:BookingID",(req,res) => {
    Booking.deleteOne({BookingID: req.params.BookingID}).then((response) => {
        //console.log(response);
        res.send(response);
        console.log("Cancelled");
    })
});

// ---------------------------------------------------------------------------------------------------------------------------------------------

//listen to the port
app.listen(9999, () => {
    console.log("Up and running this is our Bookings service");
})
















//  [METHODS USING ID]

// ---------------------------------------------------------------------------------------------------------------------------------------------
// POST METHOD USING ID
// app.post("/booking", (req,res)=> {
//     var newBooking = {
//         UserID: mongoose.Types.ObjectId(req.body.UserID),
//         FlightID: mongoose.Types.ObjectId(req.body.FlightID)
//     }

// //create new user
// var booking = new Booking(newBooking)
// booking.save().then(()=> {
//     res.send("Booking made with success!!")
//     //console.log("New Booking made");
// }).catch ((err) => {
//     if(err){
//         throw err;
//     }
// })
// console.log("New booking made successfully")
// })

// ---------------------------------------------------------------------------------------------------------------------------------------------

// retrieve booked FLIGHTS BY ID along with specific fields
// app.get("/booking/:id",(req,res) => {

//     Booking.findById( req.params.id).then((booking)=> {
//         if(booking){
//         axios.get('http://localhost:5555/user/'+ booking.UserID).then((response)=> {
//         var bookingObj = {userName : response.data.name, flightCode:'', source: '', destination: '', airline:'', fare: ''}
//         axios.get('http://localhost:4545/flight/' + booking.FlightID).then((response)=> {
//             bookingObj.flightCode = response.data.flightCode
//             bookingObj.source = response.data.source
//             bookingObj.destination = response.data.destination
//             bookingObj.airline = response.data.airline
//             bookingObj.fare = response.data.fare
//             res.json(bookingObj)
//         })
//     })
    
//     }else {
//             res.send("Invalid Booking");
//         }
//     })
// } )
//---------------------------------------------------------------------------------------------------------------------------------------------

// Retrieve all the flights booked by particular user USING ID

// app.get('/booking/allbooking/:UserID', (req, res) => {
//     var objectId = mongoose.Types.ObjectId(req.params.UserID);
  
//     Booking.find({UserID:objectId}).then((response)=>{
//         res.send(response);
//       console.log(response);
        
//       // console.log(response.data);
//     }).catch((err) => {
//       if(err){
//         throw err;
//       }
//     });
//    });
//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//load cors
const cors = require('cors')
app.use(cors({ origin: 'http://localhost:4200'}))
//load mongoose
const mongoose = require("mongoose");
//---------------------------------------------------------------------------------------------------------------------------------------------
//connect to database
mongoose.connect("mongodb+srv://surbhi:12345@flight.paxk2.mongodb.net/flightData",{useNewUrlParser: true, useUnifiedTopology:true})
.then(()=> console.log("Connected to database"))
.catch((err)=> console.log(err));
//load its model
require("./Flight");
const Flight = mongoose.model("Flight")

//---------------------------------------------------------------------------------------------------------------------------------------------

//render home page
app.get('/', (req,res)=>{
    res.send("This is search service");
})
//---------------------------------------------------------------------------------------------------------------------------------------------

//create functionality
app.post("/flight", (req,res)=> {
    var newFlight = {
        flightCode: req.body.flightCode,
        airline: req.body.airline,
        source: req.body.source,
        destination: req.body.destination,
        fare: req.body.fare
    }

//create new flight
    var flight = new Flight(newFlight)
    flight.save().then((data)=> {
        res.json(data)
        console.log("New Flight added");
    }).catch ((err) => {
        if(err){
            throw err;
        }
    })
    res.send("New flight added successfully")
}) 
//---------------------------------------------------------------------------------------------------------------------------------------------

// 2] retrieve all flights
app.get("/flights", (req,res)=> {
    Flight.find().then((flights)=>{
        res.json(flights)
        //console.log(flights);
    })
})
//---------------------------------------------------------------------------------------------------------------------------------------------

// 3] retrieve flight by the code
app.get("/flightCode/:flightCode",(req,res) => {
    Flight.find({flightCode: req.params.flightCode}).then((flight)=> {
        if(flight){
            res.send(flight);
        }
        else {
            res.sendStatus(404);
        }
    }).catch(err =>{
        if(err){
            throw err;
        }
    })
} )

//---------------------------------------------------------------------------------------------------------------------------------------------

// 4] Retrieve flight by their id 

app.get("/flight/:id",(req,res) => {
    Flight.findById( req.params.id).then((flight)=> {
        if(flight){
            res.json(flight);
        }
        else {
            res.sendStatus(404);
        }
    }).catch(err =>{
        if(err){
            throw err;
        }
    })
} )

//---------------------------------------------------------------------------------------------------------------------------------------------

// 5] Retrieve flight by source and destination
app.get("/flight/:source/:destination",(req,res) => {
    let source = req.params.source.toLowerCase();
    let destination = req.params.destination.toLowerCase();

    Flight.find({source: source, destination: destination}).then((flight)=> {
        
            res.json(flight);
            console.log(flight);
        
    }).catch(err =>{
        if(err){
            throw err;
        }
    })
} )

//---------------------------------------------------------------------------------------------------------------------------------------------

// 6] removing flights
app.delete('/flight/:flightCode', (req, res) => {
    Flight.findOneAndRemove({flightCode: req.params.flightCode}).then((response) => {
        
        res.send(response)
        console.log(` flight deleted` );
      //res.send("Flight removed successfully");
      //console.log(flight);
    }).catch(err => {
      if(err){
        throw err;
      }
    })
  });

// app.delete('/flight/:id', (req, res) => {
//     Flight.deleteOne({id:req.params.id}).then((response) => {
//       res.send("Flight removed successfully");
//       //console.log(flight);
//     }).catch(err => {
//       if(err){
//         throw err;
//       }
//     })
//   });

//---------------------------------------------------------------------------------------------------------------------------------------------

// 7] Updating flights
// app.put('/flight/:flightCode', (req,res) => {
//     Flight.updateOne({flightCode: req.params.flightCode}, req.body).then((response) => {
//     Flight.findOne({flightCode: req.params.flightCode}).then(function(flight){
//         res.send(flight); 
//     })
//         //res.send("Flight updated successfully");
      
// }).catch(err => {
//     if(err){
//       throw err;
//     }
//   })
// });

// app.put('/flight/:id', (req,res) => {
//     Flight.findByIdAndUpdate( req.params.id).then((response) => {
//          res.send(response.data)
//          console.log("Flight updated sucessfully");
//         //res.send("Flight updated successfully");
      
// }).catch(err => {
//     if(err){
//       throw err;
//     }
//   })
// });

app.put('/flight/:id', (req, res) => {

    var newFlight = {
      airline: req.body.airline,
      flightCode: req.body.flightCode,
      source: req.body.source,
      destination: req.body.destination,
      fare: req.body.fare
    }
    Flight.findByIdAndUpdate(req.params.id, 
      {"$set": newFlight}, {new: true}).then((response) => {
      console.log(`flight updated`);
    
  res.send(response.data);
    }).catch(err => {
      if(err){
        throw err;
      }
    })
  });

//---------------------------------------------------------------------------------------------------------------------------------------------
//listen to the port
app.listen(4545, () => {
    console.log("Up and running this is our flight search service");
})
//load express
const express = require("express");
const app = express();
const axios = require("axios");

const bodyParser = require("body-parser");
const { response } = require("express");
app.use(bodyParser.json());

//load cors
const cors = require('cors')
app.use(cors({ origin: 'http://localhost:4200'}))

//---------------------------------------------------------------------------------------------------------------------------------------------
// Get all the flights in db
app.get('/admin/flight', (req,res)=> {
    
    axios.get('http://localhost:4545/flights').then((response)=> {
        
        res.json(response.data)
       // res.json("Listed all the flights");
    }).catch ((err) => {
        if(err){
            throw err;
        }
    })
})

//---------------------------------------------------------------------------------------------------------------------------------------------

// 1] List the flights from flight microservice
app.get('/admin/flight/:flightCode', (req,res)=> {
    
    axios.get('http://localhost:4545/flightCode/'+ req.params.flightCode).then((response)=> {
        
        res.json(response.data)
       // res.json("Listed all the flights");
    }).catch ((err) => {
        if(err){
            throw err;
        }
    })
})

// app.get('/admin/flight/:id', (req,res)=> {
    
//     axios.get('http://localhost:4545/flight/'+ req.params.id).then((response)=> {
        
//         res.json(response.data)
//        // res.json("Listed all the flights");
//     }).catch ((err) => {
//         if(err){
//             throw err;
//         }
//     })
// })
//---------------------------------------------------------------------------------------------------------------------------------------------

// 2] Add new flight in flight microservice
app.post('/admin/flight', (req,res)=> {

    var newFlight = {
        flightCode: req.body.flightCode,
        airline: req.body.airline,
        source: req.body.source,
        destination: req.body.destination,
        fare: req.body.fare 
    }
    axios.post('http://localhost:4545/flight', newFlight).then((response)=> {
        res.json(response.data)
         //console.log(response.data);
         //res.send("New flight added successfully");
    }).catch ((err) => {
        if(err){
            throw err;
        }
    })
})

//---------------------------------------------------------------------------------------------------------------------------------------------

// 3] delete flights from flight microservice
app.delete('/admin/flight/:flightCode', (req,res)=> {
    axios.delete('http://localhost:4545/flight/'+ req.params.flightCode).then((response)=> {
        console.log(req.params.flightCode);
        res.send(response.data);
        //console.log(response.data);
        //res.json("Deleted the required flight");
    }).catch ((err) => {
        if(err){
            throw err;
        }
    })
})

// app.delete('/admin/flight/:id', (req,res)=> {
//     axios.delete('http://localhost:4545/flight/'+ req.params.id).then((response)=> {
//         console.log(response.data);
//         res.json("Deleted the required flight");
//     }).catch ((err) => {
//         if(err){
//             throw err;
//         }
//     })
// })

//---------------------------------------------------------------------------------------------------------------------------------------------

// 4] Update flights from flight microservice
// app.put('/admin/flight/:flightCode', (req,res)=> {
//     axios.put('http://localhost:4545/flight/'+ req.params.flightCode , req.body).then((response)=> {
//         console.log(response.data);
        
//         res.json("Updated the required flight");
//     }).catch ((err) => {
//         if(err){
//             throw err;
//         }
//     })
// })

app.put('/admin/flight/:id', (req,res)=> {
    axios.put('http://localhost:4545/flight/'+ req.params.id , req.body).then((response)=> {
        console.log("Flight Updated!");
        
        res.send(response.data);
    }).catch ((err) => {
        if(err){
            throw err;
        }
    })
})

//---------------------------------------------------------------------------------------------------------------------------------------------

//listen to the port
app.listen(7777, () => {
    console.log("Up and running this is our admin service");
})
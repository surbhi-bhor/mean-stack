//load express
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//load swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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

//         SWAGGER DOCUMENTATION

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Flight API",
        description: "Flight API Information",
        contact: {
          name: "Surbhi"
        },
        servers: ["http://localhost:4545"]
      }
    },
    // ['.routes/*.js']
    apis: ["flights.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-flight", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.use(express.json());
/**
 * @swagger
 * definitions:
 *  Flight:
 *   type: object
 *   properties:
 *    flightCode:
 *      type: string
 *      description: code of the flight
 *      example: 'SC101'
 *    airline:
 *      type: string
 *      description: name of the airline
 *      example: 'SpiceJet'
 *    source:
 *      type: string
 *      description: source
 *      example: 'mumbai'
 *    destination:
 *      type: string
 *      description: Destination
 *      example: 'delhi'
 *    fare:
 *      type: number
 *      description: fare of the flight
 *      example: 2000
 *    
 */



//---------------------------------------------------------------------------------------------------------------------------------------------

// 1] create functionality
/**
 * @swagger
 * /flight:
 *   post:
 *     tags:
 *       - Flights
 *     description: Creates a new flight
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: flight
 *         description: Flight object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Flight'
 *     responses:
 *       200:
 *         description: Successfully created
 */

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
        console.log("New Flight added");
        res.status(200).send(data)
        //res.json(data)        
    }).catch ((err) => {
        if(err){
            throw err;
        }
    })
    //res.send("New flight added successfully")
}) 
//---------------------------------------------------------------------------------------------------------------------------------------------

// 2] RETRIEVE ALL FLIGHTS
/**
 * @swagger
 * /flights:
 *  get:
 *    tags:
 *       - Flights
 *    description: Used to get all flights in database
 *    responses:
 *      '200':
 *        description: Successfully fetched flight
 *      '500':
 *        description: Server error
 */
app.get("/flights", (req,res)=> {
    Flight.find().then((flights)=>{
        res.json(flights)
        //console.log(flights);
    })
})
//---------------------------------------------------------------------------------------------------------------------------------------------

// 3] retrieve flight by the code
/**
 * @swagger
 * /flightCode/{flightCode}:
 *  get:
 *    tags:
 *       - Flights
 *    summary: Fetch a flight.
 *    description: Used to fetch a single flight
 *    responses:
 *      '200':
 *        description: Successfully fetched flight
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: flightCode
 *         required: true
 *         schema:
 *           type: String
 *         description: The flight code
 */
app.get("/flightCode/:flightCode",(req,res) => {
    Flight.findOne({flightCode: req.params.flightCode}).then((flight)=> {
        if(flight){
            res.send(flight);
        }
        else {
            res.sendStatus(404);
        }
    })
    // .catch(err =>{
    //     if(err){
    //         throw err;
    //     }
    // })
} )

//---------------------------------------------------------------------------------------------------------------------------------------------

// 4] Retrieve flight by their id 
/**
 * @swagger
 * /flight/{id}:
 *  get:
 *    tags:
 *       - Flights
 *    summary: Fetch a flight.
 *    description: Used to fetch a single flight
 *    responses:
 *      '200':
 *        description: Successfully fetched flight
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The flight ID
 */

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
/**
 * @swagger
 * /flight/{source}/{destination}:
 *  get:
 *    tags:
 *       - Flights
 *    summary: Search flights
 *    description: Used to search flights
 *    responses:
 *      '200':
 *        description: Successfully searched flights
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: source
 *         required: true
 *         schema:
 *           type: String
 *         description: Source
 * 
 *       - in: path
 *         name: destination
 *         required: true
 *         schema:
 *           type: String
 *         description: Destination
 *       
 */
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
/**
 * @swagger
 * /flight/{flightCode}:
 *  delete:
 *    tags:
 *       - Flights
 *    summary: Delete a flight.
 *    description: Used to delete a flight
 *    responses:
 *      '200':
 *        description: Successfully deleted flight
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: flightCode
 *         required: true
 *         schema:
 *           type: String
 *         description: The flight ID
 */
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

//---------------------------------------------------------------------------------------------------------------------------------------------
// 7]  UPDATING FLIGHT
/**
 * @swagger
 * /flight/{id}:
 *   put:
 *     tags:
 *       - Flights
 *     description: Creates a new flight
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: flight object id
 *         in: path
 *         required: true
 *         schema:
 *          type: string
 *          description: user's object id
 *       - name: flight
 *         description: Flight object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Flight'
 *     responses:
 *       200:
 *         description: Flight Successfully updated
 *       400:
 *         description: Server Error
 */

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

module.exports=app;
















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
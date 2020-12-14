//load express
const express = require("express");
const app = express();
const axios = require("axios");

const bodyParser = require("body-parser");
const { response } = require("express");
app.use(bodyParser.json());

//load swagger
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//load cors
const cors = require('cors')
app.use(cors({ origin: 'http://localhost:4200'}))

// ---------------------------------------------------------------------------------------------------------------------------------------------
//                 SWAGGER DOCUMENTATION
// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Admin API",
        description: "Admin API Information",
        contact: {
          name: "Surbhi"
        },
        servers: ["http://localhost:7777"]
      }
    },
    // ['.routes/*.js']
    apis: ["admin.js"]
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-admin", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
// 1] Get all the flights in db
/**
 * @swagger
 * /admin/flight:
 *  get:
 *    tags:
 *       - Admin
 *    description: Used to get all flights in database
 *    responses:
 *      '200':
 *        description: Listed all the flights available in flightData Db
 */
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

// 2] List the flights from flight microservice by its code
/**
 * @swagger
 * /admin/flight/{flightCode}:
 *  get:
 *    tags:
 *       - Admin
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

//---------------------------------------------------------------------------------------------------------------------------------------------

// 3] Add new flight in flight microservice
/**
 * @swagger
 * /admin/flight:
 *   post:
 *     tags:
 *       - Admin
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

// 4] delete flights from flight microservice
/**
 * @swagger
 * /admin/flight/{flightCode}:
 *  delete:
 *    tags:
 *       - Admin
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
 *         description: The flight code
 */

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



//---------------------------------------------------------------------------------------------------------------------------------------------

// 5] Update flights from flight microservice
/**
 * @swagger
 * /admin/flight/{id}:
 *   put:
 *     tags:
 *       - Admin
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

module.exports = app;









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
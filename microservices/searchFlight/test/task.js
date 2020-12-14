let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../flights");

//Assertion style
chai.should();

chai.use(chaiHttp);

describe('Flights API', () => {
    /**
     * Test GET route
     */
    describe("GET /flights", () =>{
        it("it should get all the flights", (done) => {
            chai.request(server)
                .get("/flights")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(11);
                done();
                });
        });
    });

    /**
     * Test GET BY FLIGHTCODE route
     */
    
    describe("GET /flightCode/:flightCode", () =>{
        it("it should get the flight by flightcode", (done) => {
            const flightCode = "SC105";
            chai.request(server)
                .get("/flightCode/" + flightCode)
                .end((err, response) => {
                   // console.log(response);
                     //response.should.have.status(200);
                     response.body.should.be.a('object');
                     response.body.should.have.property('flightCode');
                     response.body.should.have.property('airline');
                     response.body.should.have.property('source');
                     response.body.should.have.property('destination');
                     response.body.should.have.property('fare');
                done();
                });
        });
    });

    /**
     * Test POST route
     */
    describe("POST /flight", () =>{
        it("it should post the flight ", (done) => {
            const flight={
                flightCode: "SC208",
                airline: "SpiceJet",
                source: "bangalore",
                destination: "mumbai",
                fare: 4545
            }
            chai.request(server)
                .post("/flight" )
                .send(flight)
                .end((err, response) => {
                   // console.log(response);
                     response.should.have.status(200);
                     response.body.should.be.a('object');
                     response.body.should.have.property('flightCode').eq("SC208");
                     response.body.should.have.property('airline');
                     response.body.should.have.property('source');
                     response.body.should.have.property('destination');
                     response.body.should.have.property('fare');
                done();
                });
        });
    });

    /**
     * Test GET BY ID route
     */
    describe("GET /flight/:id", () =>{
        it("it should get the flight by id", (done) => {
            const id = "5fc25cbb5e645b3a689afce6";
            chai.request(server)
                .get("/flight/" + id)
                .end((err, response) => {
                    //console.log(response);
                    // response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                });
        });
    });

    /**
     * Test GET BY SOURCE AND DESTINATION route
     */
    describe("GET /flight/:source/:destination", () =>{
        it("it should get the flight by source and destination", (done) => {
            const source = "bangalore";
            const destination = "mumbai";
            chai.request(server)
                .get("/flight/" + source + '/' + destination)
                .end((err, response) => {
                    //console.log(response);
                    // response.should.have.status(200);
                    response.body.should.be.a('object');
                done();
                });
        });
    });

    /**
     * Test PUT route
     */
    describe("PUT /flight/:id", () =>{
        it("it should put the flight ", (done) => {
            const id = "5fd6e3e7907dcf45bce4afb8";
            const flight={
                flightCode: "SC101",
                airline: "SpiceJet",
                source: "mumbai",
                destination: "delhi",
                fare: 4545
            }
            chai.request(server)
                .put("/flight/" +id )
                .send(flight)
                .end((err, response) => {
                    //console.log(response.data);
                     response.body.should.be.a('object');                    
                done();
                });
        });
    });


    /**
     * Test DELETE route
     */
    describe("DELETE /flight/:flightCode", () => {
        it("It should DELETE an existing flight", (done) => {
            const flightCode = "SC208";
            chai.request(server)                
                .delete("/flight/" + flightCode)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });
      });
      
    


    
    
    


} )

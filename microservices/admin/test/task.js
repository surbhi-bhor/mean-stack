let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../admin");

//Assertion style
chai.should();

chai.use(chaiHttp);

describe('Admin API', () => {
    /**
     * Test GET route
     */
    describe("GET /admin/flight", () =>{
        it("it should get all the flights", (done) => {
            chai.request(server)
                .get("/admin/flight")
                .end((err, response) => {
                    //response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(16);
                done();
                });
        });
    });

    /**
     * Test GET BY FLIGHTCODE route
     */
    
    describe("GET /admin/flightCode/:flightCode", () =>{
        it("it should get the flight by flightcode", (done) => {
            const flightCode = "SC101";
            chai.request(server)
                .get("/admin/flightCode/" + flightCode)
                .end((err, response) => {
                   // console.log(response);
                     //response.should.have.status(200);
                     response.body.should.be.a('object');                   
                done();
                });
        });
    });

    /**
     * Test POST route
     */
    describe("POST /admin/flight", () =>{
        it("it should post the flight ", (done) => {
            const flight={
                flightCode: "SC208",
                airline: "SpiceJet",
                source: "bangalore",
                destination: "mumbai",
                fare: 4545
            }
            chai.request(server)
                .post("/admin/flight" )
                .send(flight)
                .end((err, response) => {
                   // console.log(response);
                    // response.should.have.status(200);
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
     * Test PUT route
     */
    describe("PUT /admin/flight/:id", () =>{
        it("it should put the flight ", (done) => {
            const id = "5fd8b4db5e4e562d9c40adfa";
            const flight={
                flightCode: "SC101",
                airline: "SpiceJet",
                source: "mumbai",
                destination: "delhi",
                fare: 4545
            }
            chai.request(server)
                .put("/admin/flight/" +id )
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
    describe("DELETE /admin/flight/:flightCode", () => {
        it("It should DELETE an existing flight", (done) => {
            const flightCode = "SC208";
            chai.request(server)                
                .delete("/admin/flight/" + flightCode)
                .end((err, response) => {
                    //response.should.have.status(200);
                done();
                });
        });
      });
      

} )

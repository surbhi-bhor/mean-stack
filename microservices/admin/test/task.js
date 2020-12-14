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
                    response.body.length.should.be.eq(12);
                done();
                });
        });
    });

    /**
     * Test GET BY FLIGHTCODE route
     */
    
    describe("GET /admin/flightCode/:flightCode", () =>{
        it("it should get the flight by flightcode", (done) => {
            const flightCode = "SC105";
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
                flightCode: "SC1008",
                airline: "SpiceJet",
                source: "hyderabad",
                destination: "mumbai",
                fare: 9000
            }
            chai.request(server)
                .post("/admin/flight" )
                .send(flight)
                .end((err, response) => {
                   // console.log(response);
                    // response.should.have.status(200);
                     response.body.should.be.a('object');
                     response.body.should.have.property('flightCode').eq("SC1008");
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
            const id = "5fc25cbb5e645b3a689afce8";
            const flight={
                flightCode: "SC203",
                airline: "SpiceJet",
                source: "bangalore",
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
            const flightCode = "SC1008";
            chai.request(server)                
                .delete("/admin/flight/" + flightCode)
                .end((err, response) => {
                    //response.should.have.status(200);
                done();
                });
        });
      });
      

} )

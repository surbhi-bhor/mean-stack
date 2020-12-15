let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../bookings");

//Assertion style
chai.should();

chai.use(chaiHttp);

describe('Bookings API', () => {
    /**
     * Test GET route
     */
    describe("GET /bookings", () =>{
        it("it should get all the bookings", (done) => {
            chai.request(server)
                .get("/bookings")
                .end((err, response) => {
                    //response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(5);
                done();
                });
        });
    });

    /**
     * Test GET  ALL BOOKINGS BY USER ID  route
     */
    
    describe("GET /booked/allbookings/:UserID", () =>{
        it("it should get the flight by user id", (done) => {
            const UserID = "5fd474ecda3f872f103bb60e";
            chai.request(server)
                .get("/booked/allbookings/" + UserID)
                .end((err, response) => {
                     // console.log(response);
                     //response.should.have.status(200);
                      response.body.should.be.a('array');
                    //  response.body.should.have.property('flightCode');
                    //  response.body.should.have.property('airline');
                    //  response.body.should.have.property('source');
                    //  response.body.should.have.property('destination');
                    //  response.body.should.have.property('fare');
                     
                done();
                });
        });
    });

     
    


} )

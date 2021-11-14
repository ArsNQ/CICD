let chai=require('chai');
let chaiHttp=require('chai-http');
let baseUrl="http://localhost:8080/places";

//Assertion
chai.should();
chai.use(chaiHttp);

//Dataset
let dset={
    radius:"300",
    ll:"50.639508, 3.064783"
}

describe('Task APIs',()=>{

    describe("Test GET route /places/explore",()=>{
        it("It should return all recommended point of interest", (done)=>{
            chai.request(baseUrl)
            .get("/explore")
            .query(dset)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data[0].type.should.eq("Recommended Places");
                if(err){
                    res.status(403).json({
                        success: false,
                        message: err
                    });
                }
            done();
            });
        });
    });

    describe("Test GET route /places/autocomplete",()=>{
        it("It should return proposal",(done)=>{
            chai.request(baseUrl)
            .get("/autocomplete")
            .query({input:"lil"})
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data.status.should.be.eq("OK");
                if(err){
                    res.status(403).json({
                        success: false,
                        message: err
                    });
                }
            done();
            });
        });
    });

    describe("Test GET route /places/getLocalisationPlace",()=>{
        it("It should return place by id",(done)=>{
            chai.request(baseUrl)
            .get("/getLocalisationPlace")
             .query({
                 place_id:"ChIJEW4ls3nVwkcRYGNkgT7xCgQ",
                key:"AIzaSyDdx1I24HM4fZFbXydMRN4t3NK7A_uTdro"
            })
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data[0].address_components[0].long_name.should.be.eq("Lille");
            done();
            });
        });
    });

    describe("Test GET route /places/drink",()=>{
        it('It should return list of available bars',(done)=>{
            chai.request(baseUrl)
            .get("/drink")
            .query(dset)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data[0].type.should.eq("Recommended Places");
                if(err){
                    res.status(403).json({
                        success: false,
                        message: err
                    });
                }
            done();
            });
        });
    });

    describe("Test GET route /places/enjoy",()=>{
        it('It should return list of activities and event',(done)=>{
            chai.request(baseUrl)
            .get("/enjoy")
            .query(dset)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data[0].type.should.eq("Recommended Places");
                if(err){
                    res.status(403).json({
                        success: false,
                        message: err
                    });
                }
            done();
            });
        });
    });

    describe("Test GET route /places/shopping",()=>{
        it('It should return list of store',(done)=>{
            chai.request(baseUrl)
            .get("/shopping")
            .query(dset)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data[0].type.should.eq("Recommended Places");
                if(err){
                    res.status(403).json({
                        success: false,
                        message: err
                    });
                }
            done();
            });
        });
    });

    describe("Test GET route /places/travel",()=>{
        it('It should return list of available transports',(done)=>{
            chai.request(baseUrl)
            .get("/travel")
            .query(dset)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data[0].type.should.eq("Recommended Places");
                if(err){
                    res.status(403).json({
                        success: false,
                        message: err
                    });
                }
            done();
            });
        });
    });

    describe("Test GET route /places/sleep",()=>{
        it('It should return list of available accomodations',(done)=>{
            chai.request(baseUrl)
            .get("/sleep")
            .query(dset)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data[0].type.should.eq("Recommended Places");
                if(err){
                    res.status(403).json({
                        success: false,
                        message: err
                    });
                }
            done();
            });
        });
    });

    describe("Test GET route /places/eat",()=>{
        it('It should return list of available restaurants',(done)=>{
            chai.request(baseUrl)
            .get("/eat")
            .query(dset)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.data[0].type.should.eq("Recommended Places");
                if(err){
                    res.status(403).json({
                        success: false,
                        message: err
                    });
                }
            done();
            });
        });
    });
});
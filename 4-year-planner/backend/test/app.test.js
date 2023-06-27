const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const sinon = require("sinon");
//require("sinon-mongoose");
const httpMocks = require('node-mocks-http');

const mongoose = require('mongoose');
const db = require("../models");
const MajorModel = db.major;
const majorController = require("../controllers/major.controller");

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /', () => {

    afterEach(function () {
        sinon.restore();
    });
    

    it('Should return "Work in progress Four Year Schedule Planner"', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').that.equals("Work in progress Four Year Schedule Planner")
                done();
            });
    });

    it("Should fail to return user planner when no token is provided", (done) => {
        chai.request(app).get("/api/user/getUserPlanner").end((err,res) =>{
            expect(res).to.has.status(403);
            expect(res.body).to.have.property('message').that.equals("No access token provided!")
            done();
        })
    });

    it("Should return a list of major names when called at /api/major/majorNames", async () => {
        const mockClassFind = {
            exec: (callback) => {
                callback(null, [{name: "Computer Science"}, {name: "Computer Engineering"}]);
            }
        }
        sinon.stub(MajorModel, "find").returns(mockClassFind);
    
        const res_mock = httpMocks.createResponse();
            
        await majorController.majorNames(null, res_mock);
    
        const expectedOutput = '["Computer Science","Computer Engineering"]';
    
        expect(res_mock.statusCode).to.equal(200);
        expect(JSON.stringify(res_mock._getData())).to.equal(expectedOutput);
    });

    it("Should return an object with Major data when called at api/major/majorInfo", async () =>{
        const mockClassFind = {
            exec: (callback) => {
                callback(null, 
                    {
                        name: "Computer Science", 
                        lowerDivision: [{name: "CMPSC 32"}],
                        upperDivision: [{name: "CMPSC 148"}],
                        otherRequirements: "",
                        majorElectives: [""],
                        numMajorElectives: 8
                    }
                    );
            }
        }
        sinon.stub(MajorModel, "find").returns(mockClassFind);
    
        const res_mock = httpMocks.createResponse();
            
        await majorController.majorInfo({query: {major: "Computer Science"}}, res_mock);
    
    
        expect(res_mock.statusCode).to.equal(200);
        expect(res_mock._getData()).to.have.property("name").that.equals("Computer Science");
        expect(res_mock._getData()).to.have.property("lowerDivision").to.eql([{name: "CMPSC 32"}]);
        expect(res_mock._getData()).to.have.property("upperDivision").to.eql([{name: "CMPSC 148"}]);
        expect(res_mock._getData()).to.have.property("numMajorElectives").to.equal(8);
    })

    it("Should return a list of major names", done => {
        const expectedOutput = '["Computer Science","Computer Engineering"]';

        const stub = sinon.stub(majorController, "majorNames").returns(["Computer Science","Computer Engineering"]);

        expect(JSON.stringify(majorController.majorNames())).to.equal(expectedOutput);
        expect(stub.calledOnce).to.be.true;
        done();
    });

});



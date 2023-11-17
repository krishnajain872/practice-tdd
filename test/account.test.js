const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
require("dotenv").config();
chai.use(chaiHttp);
const app = require("../index");
const { faker } = require("@faker-js/faker");

const { BASE_API_URL: api_url } = process.env;
// , API_AUTH_TOKEN: token

// API ENDPOINTS
const endpoint_account = `${api_url}/accounts`;
const endpoint_login = `${api_url}/users/login`;

const login = require("./authentication.test");

const accountTypes = ["saving", "current"];
const accountType =
  accountTypes[Math.floor(Math.random() * accountTypes.length)];
const account_data = {
  account_type: accountType,
  balance: String(faker.number.int({ min: 10, max: 1000 })),
  mobile: login.mobile,
};

const not_found_data = {
  account_type: accountType,
  balance: String(faker.number.int({ min: 10, max: 1000 })),
  mobile: faker.number.int({ min: 1000000000, max: 9999999999 }),
};

// ACCOUNT Testcases
const token = chai
  .request(app)
  .post(endpoint_login)
  .send(login)
  .set("Content-Type", "application/json")
  .type("form")
  .end((err, res) => {
    console.log("THIS IS RESPONSE OF CHAI TOKEN ===>>>\n ", res.body);
    // return res.body.
  });
const auth = `Bearer ${token}`;
console.log("AUTH TOKEN ===>>> token -: ", auth);

console.log("ACOUNT DATA PAYALOAD==>", account_data);
describe("POST / Describe the Account test case ", () => {
  it("should send code 201 for account create successfully", (done) => {
    chai
      .request(app)
      .post(endpoint_account)
      .set("Content-Type", "application/json")
      .set("Authorization", auth)
      .send(account_data)
      .type("form")
      .end((err, res) => {
        console.log("THIS ACCOUNT RESPOSNSE", res.body);
        expect(res.statusCode).eq(201);
        expect(res.body.code).eq(201);
        done();
      });
  });
  it("should send code 409 for account  already exist in db", (done) => {
    chai
      .request(app)
      .post(endpoint_account)
      .set("Content-Type", "application/json")
      .set("Authorization", auth)
      .send(account_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(409);
        expect(res.body.code).eq(409);
        done();
      });
  });

  it("should send code 401 if unAuthorized  ", (done) => {
    chai
      .request(app)
      .post(endpoint_account)
      .set("Content-Type", "application/json")
      .send(account_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(401);
        expect(res.body.code).eq(401);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
  it("should send code 404 if user not found ", (done) => {
    chai
      .request(app)
      .post(endpoint_account)
      .set("Content-Type", "application/json")
      .set("Authorization", auth)
      .send(not_found_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(404);
        expect(res.body.code).eq(404);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
});

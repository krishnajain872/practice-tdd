const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
require("dotenv").config();
chai.use(chaiHttp);
const app = require("../index");
const { faker } = require("@faker-js/faker");
const { BASE_API_URL: api_url } = process.env;
const { userRegistration } = require("../services/user.services");

const { userFakeData } = require("../helpers/fakeuser.helper");
const payload = userFakeData();
let data;
let account_data;
let auth;

// , API_AUTH_TOKEN: token
// API ENDPOINTS
const endpoint_account = `${api_url}/accounts`;

const accountTypes = ["saving", "current"];
const accountType =
  accountTypes[Math.floor(Math.random() * accountTypes.length)];

const not_found_data = {
  account_type: accountType,
  balance: String(faker.number.int({ min: 10, max: 1000 })),
  mobile: faker.number.int({ min: 1000000000, max: 9999999999 }),
};

// ACCOUNT Testcases;

describe("ACCOUNT => POST / Describe the Account test case ", () => {
  before(async () => {
    data = await userRegistration(payload);
    account_data = {
      account_type: accountType,
      balance: String(faker.number.int({ min: 10, max: 1000 })),
      mobile: data.data.payload.dataValues.mobile,
    };
    const token = data.data.payload.dataValues.accessToken;
    auth = `Bearer ${token}`;
  });

  it("should send code 201 for account create successfully", (done) => {
    chai
      .request(app)
      .post(endpoint_account)
      .set("Content-Type", "application/json")
      .set("Authorization", auth)
      .send(account_data)
      .type("form")
      .end((err, res) => {
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

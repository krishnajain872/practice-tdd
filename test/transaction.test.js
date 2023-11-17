const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
require("dotenv").config();
chai.use(chaiHttp);
const app = require("../index");
const { faker } = require("@faker-js/faker");
const {
  BASE_API_URL: api_url,
  API_AUTH_TOKEN: token,
  ACCOUNT_ID: id,
} = process.env;

const withdrawal_endpoint = `${api_url}/transactions/withdrawal`;
const deposit_endpoint = `${api_url}/transactions/deposit`;

const auth = `Bearer ${token}`;

const data = {
  amount: faker.number.int({ min: 10, max: 1000 }),
  account_id: id,
};
const data_Insuficient = {
  amount: faker.number.int({ min: 10000, max: 100000 }),
  account_id: id,
};
const invalid_data = {
  amount: faker.number.int({ min: -21, max: 0 }),
  account_id: id,
};
const not_found_data = {
  amount: faker.number.int({ min: 10, max: 1000 }),
  account_id: "0590afa6-e53a-47b4-abb3-621a9bc4a922",
};

describe("patch / Describe the deposit account balance test case ", () => {
  it("should send code 200 balance updated successfully", (done) => {
    chai
      .request(app)
      .patch(deposit_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.code).to.equal(200);
        expect(res.body.success).to.equal(true);
        done();
      });
  });

  it("should send code 401 if unAuthorized  ", (done) => {
    chai
      .request(app)
      .patch(deposit_endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.code).to.equal(401);
        expect(res.body.success).to.equal(false);
        done();
      });
  });
  it("should send code 404 if account not found ", (done) => {
    chai
      .request(app)
      .patch(deposit_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(not_found_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body.code).to.equal(404);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });

  it("should send code 400 for bad payload request ", (done) => {
    chai
      .request(app)
      .patch(deposit_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.code).to.equal(400);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
});

describe("patch / Describe the withdrawal account balance test case ", () => {
  it("should send code 200 balance updated successfully", (done) => {
    chai
      .request(app)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body.code).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.payload.history.is_sucessful).to.equal(true);
        done();
      });
  });

  it("should send code 401 if unAuthorized  ", (done) => {
    chai
      .request(app)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.code).to.equal(401);
        expect(res.body.success).to.equal(false);
        done();
      });
  });
  it("should send code 404 if user not found ", (done) => {
    chai
      .request(app)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.code).to.equal(400);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
  it("should send code 422 if INSUFICIENT BALANCE ", (done) => {
    chai
      .request(app)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(data_Insuficient)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(422);
        expect(res.body.code).eq(422);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
  it("should send code 400 if user not found ", (done) => {
    chai
      .request(app)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(400);
        expect(res.body.code).eq(400);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
});

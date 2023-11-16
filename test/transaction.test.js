const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { date } = require("joi");
require("dotenv").config;
chai.use(chaiHttp);

const {
  BASE_API_URL: api_url,
  API_AUTH_TOKEN: token,
  ACCOUNT_ID: id,
} = process.env;

const withdrawal_endpoint = `/transactions/withdrawal`;
const deposit_endpoint = `/transactions/deposit`;

const auth = `Bearer ${token}`;

const data = {
  amount: 25979,
  account_id: id,
};
const data_Insuficient = {
  amount: 259712312131,
  account_id: id,
};

const invalid_data = {
  amount: -25979,
  account_id: id,
};

describe("patch / Describe the withdrawal account balance test case ", () => {
  it("should send code 200 balance updated successfully", () => {
    chai
      .request(api_url)
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
        expect(res.body.data.payload.history).to.have.keys("balance");
      });
  });

  it("should send code 401 if unAuthorized  ", () => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.code).to.equal(401);
        expect(res.body.success).to.equal(false);
      });
  });

  it("should send code 500 internal server errors", () => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(data)
      .type("form")
      .end((err, res) => {
        if (err) {
          expect(res.status).to.equal(500);
          expect(res.body.code).to.equal(500);
          expect(res.body).to.have.property("success").equal(false);
        }
      });
  });
  it("should send code 404 if user not found ", () => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.code).to.equal(400);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
  it("should send code 422 if INSUFICIENT BALANCE ", () => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(data_Insuficient)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(422);
        expect(res.body.code).eq(422);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
  it("should send code 400 if user not found ", () => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(400);
        expect(res.body.code).eq(400);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
});

describe("patch / Describe the deposit account balance test case ", () => {
  it("should send code 200 balance updated successfully", () => {
    chai
      .request(api_url)
      .patch(deposit_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send()
      .type("form")
      .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.equal(200);
        expect(res.body.code).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.payload.history.is_sucessful).to.equal(true);
        expect(res.body.data.payload).to.have.keys("balance");
      });
  });

  it("should send code 401 if unAuthorized  ", () => {
    chai
      .request(api_url)
      .patch(deposit_endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.code).to.equal(401);
        expect(res.body.success).to.equal(false);
      });
  });

  it("should send code 500 internal server errors", () => {
    chai
      .request(api_url)
      .patch(deposit_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(data)
      .type("form")
      .end((err, res) => {
        if (err) {
          expect(res.status).to.equal(500);
          expect(res.body.code).to.equal(500);
          expect(res.body).to.have.property("success").equal(false);
        }
      });
  });

  it("should send code 404 if account not found ", () => {
    chai
      .request(api_url)
      .patch(deposit_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.code).to.equal(404);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
 
  it("should send code 400 for bad payload request ", () => {
    chai
      .request(api_url)
      .patch(deposit_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body.code).to.equal(400);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
});

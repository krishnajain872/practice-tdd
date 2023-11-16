const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
require("dotenv").config;
chai.use(chaiHttp);

const {
  BASE_API_URL: api_url,
  API_AUTH_TOKEN: token,
  ACCOUNT_ID: id,
} = process.env;

const withdrawal_endpoint = `/transactions/withdrawal`;

const auth = `Bearer ${token}`;

const withdrawal_data = {
  amount: 25979.8,
  account_id: id,
};

const invalid_withdrawal_data = {
  amount: -25979.8,
  account_id: id,
};

describe("patch / Describe the withdrawal account balance test case ", () => {
  it("should send code 200 balance updated successfully", () => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(withdrawal_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(200);
        expect(res.body.code).eq(200);
        expect(res.body.success).eq(true);
      });
  });

  it("should send code 401 if unAuthorized  ", () => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .send(withdrawal_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(401);
        expect(res.body.code).eq(401);
        expect(res.body).to.have.property("success").equal(false);
      });
  });

  it("should send code 500 internal server errors", () => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(withdrawal_data)
      .type("form")
      .end((err, res) => {
        if (err) {
          expect(res.status).eq(500);
        }
      });
  });
  it("should send code 404 if user not found ", () => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_withdrawal_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(404);
        expect(res.body.code).eq(404);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
  it("should send code 422 if INSUFICIENT BALANCE ", () => {
    chai
      .request(api_url)
      .patch(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_withdrawal_data)
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
      .send(invalid_withdrawal_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(400);
        expect(res.body.code).eq(400);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
});

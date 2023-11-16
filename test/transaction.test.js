const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
require("dotenv").config();
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
  it("should send code 200 balance updated successfully", (done) => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(withdrawal_data)
      .type("form")
      .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.equal(200);
        expect(res.body.code).to.equal(200);
        expect(res.body.success).to.equal(true);
        expect(res.body.data.payload.history.is_sucessful).to.equal(true);
        expect(res.body.data.payload.history).to.have.keys("balance");
      });
  });

  it("should send code 401 if unAuthorized  ", (done) => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .send(withdrawal_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.code).to.equal(401);
        expect(res.body.success).to.equal(false);
      });
  });

  it("should send code 500 internal server errors", (done) => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(withdrawal_data)
      .type("form")
      .end((err, res) => {
        if (err) {
          expect(res.status).to.equal(500);
          expect(res.body.code).to.equal(500);
          expect(res.body).to.have.property("success").equal(false);
        }
      });
  });
  it("should send code 404 if user not found ", (done) => {
    chai
      .request(api_url)
      .patch(withdrawal_endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(invalid_withdrawal_data)
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
        done();
      });
  });
  it("should send code 400 if user not found ", (done) => {
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
        done();
      });
  });
});

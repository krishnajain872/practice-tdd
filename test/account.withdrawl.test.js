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
const endpoint = `/account/transaction/withdrawl-balance/${id}`;
const endpoint_404 = `/account/transaction/withdrawl-balance/b21d2050-7afa-11ee-a87a-8132b6f0f497`;

const auth = `Bearer ${token}`;

console.log(id);
const data = {
  amount: 25979.8,
  type: "deposite",
};

const invalid_data = {
  amount: -25979.8,
  type: "deposite",
};
const unProccebleData = {
  amount: 1000000,
  type: "deposite",
};

describe("patch / Describe the update account balance test case ", () => {
  let request;

  before(() => {
    request = chai.request(api_url);
  });

  it("should send code 200 balance updated successfully", () => {
    request
      .patch(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(data)
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

  it("should send code 401 if unAuthorized  ", () => {
    request
      .patch(endpoint)
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
    request
      .patch(endpoint)
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
    request
      .patch(endpoint_404)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(data)
      .type("form")
      .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.equal(404);
        expect(res.body.code).to.equal(404);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
  it("should send code 422 for insuficient balance ", () => {
    request
      .patch(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(unProccebleData)
      .type("form")
      .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.equal(422);
        expect(res.body.code).to.equal(422);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
  it("should send code 400 for insuficient balance ", () => {
    request
      .patch(endpoint)
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

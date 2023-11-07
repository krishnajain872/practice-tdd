const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { User, USERS } = require("../helpers/fakeUser");
require("dotenv").config();
chai.use(chaiHttp);

const { BASE_API_URL: api_url, API_AUTH_TOKEN: token } = process.env;
const endpoint = "/account/transaction/withdrawl-balance/:account_id";

const auth = `Bearer ${token}`;

const id = "5b069ef0-7af9-11ee-9941-a13d98c3f1fe";
const data = {
  amount: 25979.8,
  type: "deposite",
};

const invalid_data = {
  amount: -25979.8,
  type: "deposite",
};
const unProccebleData = {
  amount: 10000000000000,
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
      .query({ account_id: id })
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
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
        }
      });
  });

  it("should send code 404 if user not found ", () => {
    request
      .patch(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", auth)
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
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
        expect(res.statusCode).to.equal(422)
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
        expect(res.statusCode).to.equal(400)
      });
  });
});

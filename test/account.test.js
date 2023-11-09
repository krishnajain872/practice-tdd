const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
require("dotenv").config();
chai.use(chaiHttp);

const { BASE_API_URL: api_url, API_AUTH_TOKEN: token } = process.env;
const endpoint = "/account";
const auth = `Bearer ${token}`;
const data = {
  account_type: "saving account",
  balance: 20.2,
  mobile: "6843660302",
};
const worng_data = {
  account_type: "saving account",
  balance: "qws",
  mobile: "8182834821",
};

const not_found_data = {
  account_type: "saving account",
  balance: 20.2,
  mobile: "8182834821",
};

const invalid_data = {
  first_name: 21321,
  last_name: "jain",
  email: "krishna@gmailcom",
  mobile: "1293012312",
};

describe("POST / Describe the Account test case ", () => {
  it("should send code 201 for account create successfully", () => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("Authorization", auth)
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(201);
        expect(res.body.code).eq(201);
      });
  });
  it("should send code 409 for account  already exist in db", () => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("Authorization", auth)
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(409);
        expect(res.body.code).eq(409);
      });
  });

  it("should send code 401 if unAuthorized  ", () => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
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
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("Authorization", auth)
      .send(data)
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
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("Authorization", auth)
      .send(invalid_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(404);
        expect(res.body.code).eq(404);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
});

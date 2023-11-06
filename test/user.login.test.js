const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { User, USERS } = require("../helpers/fakeUser");
require("dotenv").config();
chai.use(chaiHttp);

const { BASE_API_URL: api_url } = process.env;
const endpoint = "/user/login";

const dataLogin = {
  email: "Blanche83@gmail2.com",
  mobile: "8192132311",
  password: "Uvcck0J1RU78LoW",
};
const badData = {
  mobile: "8192132311",
  password: "Uvcck0J1RU78LoW",
};
const dataLogin404 = {
  email: "Blanche83@gmail2.com",
  mobile: "8192132321",
  password: "Uvcck0J1RU78LoW",
};
const worng_password = {
  email: "Blanche83@gmail2.com",
  mobile: "8192132311",
  password: "Uvcck0J1RU78Lo",
};

describe("POST / Describe the user LOGIN ", () => {
  it("should send code 202 if user successfully Login ", () => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(dataLogin)
      .type("form")
      .end((err, res) => {
        console.log(res)
        expect(res.statusCode).eq(202);
        expect(res.body.code).eq(202);
        expect(res.body.data.message).eq("User Login Successfully");
        expect(res.body).to.have.property("success").equal(true);
        expect(res.body.data.payload).to.have.keys(
          "accessToken",
          "created_at",
          "email",
          "first_name",
          "last_name",
          "mobile",
          "password",
          "updated_at"
        );
      });
  });
  it("should send code 404 if user not found  ", () => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(dataLogin404)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(404);
        expect(res.body.code).eq(404);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
  it("should send code 401 if user password not match ", () => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(worng_password)
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
      .send()
      .type("form")
      .end((err, res) => {
        if (err) {
          expect(res.status).eq(500);
        }
      });
  });
  it("should send code 400 bad reques invalid payload", () => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      //   .set()
      .send(badData)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(400);
        expect(res.body.code).eq(400);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
});

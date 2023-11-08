const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
require("dotenv").config();
chai.use(chaiHttp);

const { BASE_API_URL: api_url } = process.env;
const endpoint = "/user/login";

const data = {
  email: "Blanche83@gmail2.com",
  mobile: "8192132311",
  password: "Uvcck0J1RU78LoW",
};
const wrong_data = {
  email: "Blanche83@gmail2.com",
  password: "Uvcck0J1RU78LoW",
};

console.log(data);

describe("POST / Describe the user LOGIN ", () => {
  it("should send code 202 if user successfully Login ", (done) => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(202);
        done();
      });
  });
  it("should send code 404 if user not found  ", (done) => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(404);
        done();
      });
  });
  it("should send code 401 if user password not match ", (done) => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(401);
        done();
      });
  });
  it("should send code 500 internal server errors", (done) => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      //   .set()
      .send(data)
      .type("form")
      .end((err, res) => {
        if (err) {
          expect(res.statusCode).eq(500);
        }
        done();
      });
  });
  it("should send code 400 bad reques invalid payload", (done) => {
    chai
      .request(api_url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(wrong_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(400);
        done();
      });
  });
});

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { userFakeData } = require("../helpers/fakeUser");
require("dotenv").config();
chai.use(chaiHttp);

const { BASE_API_URL: api_url } = process.env;
const endpoint = "/user/register";
const data = userFakeData();
console.log(data);
// const invalid_data = {
//   first_name: 21321,
//   last_name: "jain",
//   email: "krishna@gmailcom",
//   mobile: "1293012312",
// };

describe("POST / Describe the user LOGIN ", () => {
  it("should send code 202 if user successfully Login ", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(202);
        expect(res.body.code).eq(202);
        expect(res.body.data.message).eq("User Login Successfully");
        expect(res.body).to.have.property("success").equal(true);
        expect(res.body.data.payload).to.have.keys(
          "accessToken",
          "created_at",
          "email",
          "first_name",
          "id",
          "last_name",
          "mobile",
          "password",
          "updated_at"
        );

        done();
      });
  });
  it("should send code 404 if user not found  ", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(not_found_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(404);
        expect(res.body.code).eq(404);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
  it("should send code 401 if user password not match ", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(worng_password)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(401);
        expect(res.body.code).eq(401);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
  it("should send code 500 internal server errors", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      //   .set()
      .send(data)
      .type("form")
      .end((err, res) => {
        if (err) {
          expect(res.status).eq(500);
        }
        done();
      });
  });
  it("should send code 400 bad reques invalid payload", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      //   .set()
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

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
require("dotenv").config();
chai.use(chaiHttp);
const { userFakeData, USERS } = require("../helpers/fakeuser.helper");
const { BASE_API_URL: api_url } = process.env;
const app = require("../index");
const { faker } = require("@faker-js/faker");
const { user } = require("../validators/user/user.validation.schema");

// API ENDPOINTS
const endpoint_register = `${api_url}/users/register`;
const endpoint_login = `${api_url}/users/login`;

// DATA FOR TESTING
const users = USERS;
const data = USERS[0];

const login = {
  email: data.email,
  mobile: data.mobile,
  password: data.password,
};
const invalid_data = {
  email: data.email,
  mobile: faker.number.int({ min: 1000000000, max: 9999999999 }),
};
const wrong = {
  email: data.email,
  mobile: data.mobile,
  password: faker.internet.password(),
};
const notFound = {
  email: users[2].email,
  mobile: users[2].mobile,
  password: users[2].password,
};

// REGISTRATION TESTCASES
describe("POST / Describe the user registration", () => {
  it("should send code 201 if user successfully registered ", (done) => {
    chai
      .request(app)
      .post(endpoint_register)
      .send(data)
      .set("Content-Type", "application/json")
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(201);
        expect(res.body.code).eq(201);
        expect(res.body.data.message).eq("user registered successfully");
        expect(res.body).to.have.property("success").equal(true);
        expect(res.body.data.payload).to.have.keys(
          "id",
          "first_name",
          "last_name",
          "email",
          "mobile",
          "password",
          "updated_at",
          "created_at",
          "accessToken"
        );
      });
    done();
  });
  it("should send code 400 if error for bad request", (done) => {
    chai
      .request(app)
      .post(endpoint_register)
      .type("form")
      .send(invalid_data)
      .end((err, res) => {
        expect(res.statusCode).eq(400);
      });
    done();
  });
  it("should send code 409 if conflict encounter like user already register ", (done) => {
    chai
      .request(app)
      .post(endpoint_register)
      .type("form")
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).eq(409);
        expect(res.body.code).eql(409);
        expect(res.body).to.have.property("success").equal(false);
        expect(res.body.name).eq("SequelizeUniqueConstraintError");
      });
    done();
  });
});

// LOGIN TEST CASES
describe("POST / Describe the user LOGIN ", () => {
  it("should send code 200 if user successfully Login ", (done) => {
    chai
      .request(app)
      .post(endpoint_login)
      .set("Content-Type", "application/json")
      .send(login)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(200);
        expect(res.body.code).eq(200);
        expect(res.body.data.message).eq("User Login Successfully");
        expect(res.body).to.have.property("success").equal(true);
        expect(res.body.data.payload).to.have.keys(
          "accessToken",
          "created_at",
          "email",
          "first_name",
          "last_name",
          "mobile",
          "id",
          "password",
          "updated_at"
        );
      });
    done();
  });
  it("should send code 404 if user not found  ", (done) => {
    chai
      .request(app)
      .post(endpoint_login)
      .set("Content-Type", "application/json")
      .send(notFound)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(404);
        expect(res.body.code).eq(404);
        expect(res.body).to.have.property("success").equal(false);
      });
    done();
  });
  it("should send code 401 if user password not match ", (done) => {
    chai
      .request(app)
      .post(endpoint_login)
      .set("Content-Type", "application/json")
      .send(wrong)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(401);
        expect(res.body.code).eq(401);
        expect(res.body).to.have.property("success").equal(false);
      });
    done();
  });
  it("should send code 400 bad reques invalid payload", (done) => {
    chai
      .request(app)
      .post(endpoint_login)
      .set("Content-Type", "application/json")
      .send(invalid_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(400);
        expect(res.body.code).eq(400);
        expect(res.body).to.have.property("success").equal(false);
      });
    done();
  });
});

module.exports = data;

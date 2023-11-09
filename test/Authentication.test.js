const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
require("dotenv").config();
chai.use(chaiHttp);
const { userFakeData } = require("../helpers/fakeuser.helper");
const { BASE_API_URL: api_url } = process.env;
const endpoint_register = "/user/register";
const endpoint_login = "/user/login";

const data = userFakeData();

describe("POST / Describe the user registration", () => {
  it("should send code 201 if user successfully registered ", () => {
    chai
      .request(api_url)
      .post(endpoint_register)
      .set("Content-Type", "application/json")
      .send(data)
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
  });
  it("should send code 400 if error for bad request", () => {
    chai
      .request(api_url)
      .post(endpoint_register)
      .type("form")
      .send(invalid_data)
      .end((err, res) => {
        expect(res.statusCode).eq(400);
      });
  });
  it("should send code 409 if conflict encounter like user already register ", () => {
    chai
      .request(api_url)
      .post(endpoint_register)
      .type("form")
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).eq(409);
        expect(res.body.code).eql(409);
        expect(res.body).to.have.property("success").equal(false);
        expect(res.body.name).eq("SequelizeUniqueConstraintError");
      });
  });

  it("should send code 500 if internal server error ", () => {
    chai
      .request(api_url)
      .post(endpoint_register)
      .type("form")
      .send(data)
      .end((err, res) => {
        if (err) {
          expect(res.status).eq(500);
        }
      });
  });
});

const login = {
  email: data.email,
  mobile: data.mobile,
  password: data.password,
};
console.log("LOGIN DATA \n", login);
console.log("DATA \n", data);

const invalid_data = {
  email: data.email,
  mobile: "9291828737",
  password: data.password,
};
const wrong = {
  email: data.email,
  mobile: data.mobile,
  password: "G&(BQDQEW(D",
};

describe("POST / Describe the user LOGIN ", () => {
  it("should send code 200 if user successfully Login ", () => {
    chai
      .request(api_url)
      .post(endpoint_login)
      .set("Content-Type", "application/json")
      .send(login)
      .type("form")
      .end((err, res) => {
        console.log(res.body);
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
  });
  it("should send code 404 if user not found  ", () => {
    chai
      .request(api_url)
      .post(endpoint_login)
      .set("Content-Type", "application/json")
      .send(invalid_data)
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
      .post(endpoint_login)
      .set("Content-Type", "application/json")
      .send(wrong)
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
      .post(endpoint_login)
      .set("Content-Type", "application/json")
      .send(login)
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
      .post(endpoint_login)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(400);
        expect(res.body.code).eq(400);
        expect(res.body).to.have.property("success").equal(false);
      });
  });
});

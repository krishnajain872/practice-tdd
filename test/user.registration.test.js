const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { User } = require("./../helpers/fakeUser");
require("dotenv").config();
chai.use(chaiHttp);
const userFakeData = require("./../helpers/fakeUser")(User)
const { BASE_API_URL: api_url } = process.env;

const data = userFakeData();
console.log(data);
const invalid_data = {
  first_name: 21321,
  last_name: "jain",
  email: "krishna@gmailcom",
  mobile: "1293012312",
};

describe("POST / Describe the user registration", () => {
  it("should send code 201 if user successfully registered ", () => {
    chai
      .request(url)
      .post(endpoint)
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
        done();
      });
  });
  it("should send code 400 if error for bad request", () => {
    chai
      .request(url)
      .post(endpoint)
      .type("form")
      .send(invalid_data)
      .end((err, res) => {
        expect(res.statusCode).eq(400);
      });
  });
  it("should send code 409 if conflict encounter like user already register ", () => {
    chai
      .request(url)
      .post(endpoint)
      .type("form")
      .send(data)
      .end((err, res) => {
        expect(res.statusCode).eq(409);
        expect(res.body.code).eql(409);
        expect(res.body).to.have.property("success").equal(false);
        expect(res.body.name).eq("SequelizeUniqueConstraintError");
        done();
      });
  });

  it("should send code 500 if internal server error ", () => {
    chai
      .request(url)
      .post(endpoint)
      .type("form")
      .send(data)
      .end((err, res) => {
        if (err) {
          expect(res.status).eq(500);
        }
      });
  });
});

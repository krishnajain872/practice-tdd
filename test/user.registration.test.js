const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
require("dotenv").config();
chai.use(chaiHttp);

const { BASE_API_URL: api_url } = process.env;

const url = api_url;
const endpoint = "/user/register";

const data = {
  first_name: "krishna",
  last_name: "jain",
  email: "krishna@gmail.com",
  mobile: "9282828928",
  password: "3ye89423ye088239",
};
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

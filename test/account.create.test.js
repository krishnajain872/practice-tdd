const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { userFakeData } = require("../helpers/fakeUser");

chai.use(chaiHttp);

const url = "http://localhost:3000";
const endpoint = "/api/staging/user/account";

const data = {
  email: "Blanche83@gmail2.com",
  mobile: "8192132312",
  password: "Uvcck0J1RU78LoW",
};
const worng_password = {
  email: "Blanche83@gmail2.com",
  mobile: "8192132312",
  password: "Uvcck0J1RU7",
};

const not_found_data = {
  email: "Blanche83@gmail2.com",
  mobile: "9129394995",
  password: "Uvcck0J1RU78LoW",
};

const invalid_data = {
  first_name: 21321,
  last_name: "jain",
  email: "krishna@gmailcom",
  mobile: "1293012312",
};

describe("POST / Describe the Account test case ", () => {
  it("should send code 201 for account create successfully", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(201);
        expect(res.body.code).eq(201);
        done();
      });
  });
  it("should send code 409 for account  already exist in db", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(409);
        expect(res.body.code).eq(409);
        done();
      });
  });

  it("should send code 401 if unAuthorized  ", (done) => {
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
  it("should send code 403 if unAuthorized ", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(worng_password)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(403);
        expect(res.body.code).eq(403);
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
  it("should send code 404 if account ", (done) => {
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

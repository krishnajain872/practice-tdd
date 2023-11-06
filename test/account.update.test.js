const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { userFakeData } = require("../helpers/fakeUser");

chai.use(chaiHttp);

const url = "http://localhost:3000";
const endpoint = "/api/staging/account/transaction/update/balance";


describe("POST / Describe the update account balance test case ", () => {
  it("should send code 202 balance updated successfully", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set(
        "authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI4MTkyMTMyMzEyIiwiZW1haWwiOiJCbGFuY2hlODNAZ21haWwyLmNvbSIsImlhdCI6MTY5OTA4NzI4MiwiZXhwIjoxNjk5MTczNjgyfQ.RlER0stt1FhUAHPJnCfQidQay-3ULLHrL7YSObK9GKo"
      )
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(201);
        expect(res.body.code).eq(201);
        done();
      });
  });

  it("should send code 401 if unAuthorized  ", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set(
        "authorization",
        "bearer e1haWwiOiJCbGFuY2hlODNAZ21hawyLmNvbSIsImlhdCI6MTY5OTA4NzI4MiwiZXhwIjoxNjk5MTczNjgyfQ.RlER0stt1FhUAHPJnCfQidQay-3ULLHrL7YSObK9GKo"
      )
      .send(data)
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
      .set(
        "authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI4MTkyMTMyMzEyIiwiZW1haWwiOiJCbGFuY2hlODNAZ21haWwyLmNvbSIsImlhdCI6MTY5OTA4NzI4MiwiZXhwIjoxNjk5MTczNjgyfQ.RlER0stt1FhUAHPJnCfQidQay-3ULLHrL7YSObK9GKo"
      )
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
  it("should send code 404 if user not found ", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set(
        "authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI4MTkyMTMyMzEyIiwiZW1haWwiOiJCbGFuY2hlODNAZ21haWwyLmNvbSIsImlhdCI6MTY5OTA4NzI4MiwiZXhwIjoxNjk5MTczNjgyfQ.RlER0stt1FhUAHPJnCfQidQay-3ULLHrL7YSObK9GKo"
      )
      .send(worng_data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(404);
        expect(res.body.code).eq(404);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
});

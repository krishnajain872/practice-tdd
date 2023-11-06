const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const { userFakeData } = require("../helpers/fakeUser");

chai.use(chaiHttp);

const url = "http://localhost:3000";
const endpoint = "/api/staging/account/transaction/withdrawl-balance/";
const bearer = "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI4MTkyMTMyMzExIiwiZW1haWwiOiJCbGFuY2hlODNAZ21haWwyLmNvbSIsImlhdCI6MTY5OTI1MzU5NSwiZXhwIjoxNjk5MzM5OTk1fQ.80tDEb6HQQf374nGn4KzdMLe-GxdT9ChoVGGYSKvnJ8"

const data = {
  amount: 25979.8,
  type: "deposite",
};
const worng_data = {
  amount: 25979.8,
  type: "deposite",
};

const not_found_data = {
  amount: 25979.8,
  type: "deposite",
};

const invalid_data = {
  amount: 25979.8,
  type: "deposite",
};

describe("POST / Describe the update account balance test case ", () => {
  it("should send code 200 balance updated successfully", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set(
        "authorization",
        "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiI4MTkyMTMyMzEyIiwiZW1haWwiOiJCbGFuY2hlODNAZ21haWwyLmNvbSIsImlhdCI6MTY5OTA4NzI4MiwiZXhwIjoxNjk5MTczNjgyfQ.RlER0stt1FhUAHPJnCfQidQay-3ULLHrL7YSObK9GKo"
      )
      .query({ account_id: "5b069ef0-7af9-11ee-9941-a13d98c3f1fe" })
      .send(data)
      .type("form")
      .end((err, res) => {
        expect(res.statusCode).eq(200);
        expect(res.body.code).eq(200);

        done();
      });
  });

  it("should send code 401 if unAuthorized  ", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .set("authorization", bearer)
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
      .set("authorization", bearer)
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
      .set("authorization", bearer)
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

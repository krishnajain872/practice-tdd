const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const url = "http://localhost:3000";
const endpoint = "/api/staging/user/register";

const data = {
  first_name: "krishna",
  last_name: "jain",
  email: "krishna@gmail.com",
  mobile: 1293012312,
};
const invalid_data = {
  first_name: 21321,
  last_name: "jain",
  email: "krishna@gmailcom",
  mobile: "1293012312",
};

describe("POST / Describe the user registration", () => {
  // check the validation of the user data using validator
  // it("should send code 200 if user data is validated ", async () => {
  //   await chai
  //     .request(url)
  //     .post(endpoint)
  //     .set("Content-Type", "application/json")
  //     .send(data)
  //     .type("form")
  //     .end((err, res) => {
  //       expect(res.statusCode).to.be.equal(200);
  //       done();
  //     });
  // });

  it("should send code 201 if user successfully registered ", async () => {
    await chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")
      .end((err, res) => {
        // console.log(res);
        expect(res.statusCode).eq(201);
        expect(res.body.code).eq(201);
        expect(res.body.data.message).eq("user registered successfully");
        expect(res.body).to.have.property("success").equal(true);
        expect(res.body.data.payload).to.have.keys(
          "first_name",
          "last_name",
          "email",
          "mobile"
        );
      });
  });
  it("should send code 400 if error for bad request", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .type("form")
      .send(invalid_data)
      .end((err, res) => {
        expect(res.statusCode).eq(400);
        expect(res.body.code).eql(400);
        expect(res.body).to.have.property("success").equal(false);
        done();
      });
  });
});

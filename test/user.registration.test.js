const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const url = "http://localhost:3000";
const endpoint = "/api/staging/user/register";

describe("POST / Describe the user registration", () => {
  it("should send code 400 if error for bad request", (done) => {
    chai
      .request(url)
      .post(endpoint)
      .type("form")
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should send code 201 if user registered successfully", async () => {
    const data = {
      first_name: "krishna",
      last_name: "jain",
    };

    const res = await chai
      .request(url)
      .post(endpoint)
      .set("Content-Type", "application/json")
      .send(data)
      .type("form")

    expect(res).to.have.status(201);
  });


  
});

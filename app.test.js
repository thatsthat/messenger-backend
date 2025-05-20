const app = require("./app");

const request = require("supertest");
const express = require("express");
const testApp = express();

testApp.use(express.urlencoded({ extended: false }));
testApp.use("/", app);

var token = [];

beforeAll(async () => {
  const response = await request(testApp)
    .post("/login")
    .set("Content-Type", "application/json")
    .send({
      email: "a@b.com",
      password: "12345",
    });
  token = response.body.token;
});

test.skip("Message is saved", function (done) {
  request(testApp)
    .post("/private/24")
    .auth(token, { type: "bearer" })
    .set("Content-Type", "application/json")
    .send({ content: "Hola Hola Hola4" })
    .expect("Content-Type", /json/)
    .expect({ message: "Message sent" })
    .expect(200, done);
});

test.skip("Messages are listed", function (done) {
  request(testApp)
    .get("/private/24")
    .auth(token, { type: "bearer" })
    .set("Content-Type", "application/json")
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveLength(9);
    });
  return done();
});

test("Users are listed", function (done) {
  request(testApp)
    .get("/private/user-list")
    .auth(token, { type: "bearer" })
    .set("Content-Type", "application/json")
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveLength(1);
    });
  return done();
});

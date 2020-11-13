const request = require("supertest");
const app = require("../index");

describe("GET /", () => {
    it("respond with Overseer is running", (done) => {
        request(app).get("/").expect("Overseer is running", done);
    })
});
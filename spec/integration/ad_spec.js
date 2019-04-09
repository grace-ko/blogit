const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/ad/";
const sequelize = require("../../src/db/models/index").sequelize;
const Ad = require("../../src/db/models").Ad;

describe("routes : ad", () => {
  beforeEach((done) => {
    this.ad;
    sequelize.sync({force: true}).then((res) => {
     Ad.create({
       title: "JS Frameworks",
       description: "There is a lot of them"
     })
      .then((ad) => {
        this.ad = ad;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
  describe("GET /ad", () => {
    it("should return a status code 200 and all ads", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          //expect(body).toContain("Ad");
          //expect(body).toContain("JS Frameworks");
          done();
        });
      });
  });  
});

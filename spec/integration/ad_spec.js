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
          expect(body).toContain("Ad");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });
  });
  describe("GET /ad/new", () => {
    it("should render a new ad form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Ad");
        done();
      });
    });
  });
  describe("POST /ad/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "blink-182 songs",
        description: "What's your favorite blink-182 song?"
      }
    };
    it("should create a new ad and redirect", (done) => {
      request.post(options,
        (err, res, body) => {
          Ad.findOne({where: {title: "blink-182 songs"}})
          .then((ad) => {
            expect(res.statusCode).toBe(303);
            expect(ad.title).toBe("blink-182 songs");
            expect(ad.description).toBe("What's your favorite blink-182 song?");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
    describe("GET /ad/:id", () => {
      it("should render a view with the selected ad", (done) => {
        request.get(`${base}${this.ad.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Delete");
          done();
        });
      });
    });
    describe("POST /ad/:id/destroy", () => {
      it("should delete the ad with the associated ID", (done) => {
        Ad.findAll()
        .then((ad) => {
          const adCountBeforeDelete = ad.length;
          expect(adCountBeforeDelete).toBe(1);
          request.post(`${base}${this.ad.id}/destroy`, (err, res, body) => {
            Ad.findAll()
            .then((ad) => {
              expect(err).toBeNull();
              expect(ad.length).toBe(adCountBeforeDelete - 1);
              done();
            })
          });
        });
      });
    });
  });
});

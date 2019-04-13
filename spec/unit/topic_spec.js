const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
describe("Topic", () => {
  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
  describe("#create()", () => {
    it("should create a topic object with a title and description", (done) => {
      Topic.create({
        title: "Pros of Cryosleep during the long journey",
        description: "1. Not having to answer the 'are we there yet?' question.",
      })
      .then((topic) => {
        expect(topic.title).toBe("Pros of Cryosleep during the long journey");
        expect(topic.description).toBe("1. Not having to answer the 'are we there yet?' question.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });
  describe("#getPosts()", () => {
    it("should associate a topic and a post together", (done) => {
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      })
      .then((newTopic) => {
        expect(this.post.topicId).toBe(this.topic.id);
        this.post.setTopic(newTopic)
        .then((post) => {
          expect(post.topicId).toBe(newTopic.id);
          done();
        });
      })
    });
  });
});

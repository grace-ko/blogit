const Ad = require("./models").Ad;

module.exports = {
  getAllAds(callback){
    return Ad.findAll()
    .then((ad) => {
      callback(null, ad);
    })
    .catch((err) => {
      callback(err);
    })
  }
}

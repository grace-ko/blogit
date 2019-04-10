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
  },
  addAd(newAd, callback){
   return Ad.create({
     title: newAd.title,
     description: newAd.description
   })
   .then((ad) => {
     callback(null, ad);
   })
   .catch((err) => {
     callback(err);
   })
 },
 getAd(id, callback){
    return Ad.findByPk(id)
    .then((ad) => {
      callback(null, ad);
    })
    .catch((err) => {
      callback(err);
    })
  },
  deleteAd (id, callback){
    return Ad.destroy({
      where: {id}
    })
    .then((ad) => {
      callback(null, ad);
    })
    .catch((err) => {
      callback(err);
    })
  }
}

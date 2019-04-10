const adQueries = require("../db/queries.ad.js");
module.exports = {
  index(req, res, next){
    adQueries.getAllAds((err, ad) => {
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("ad/index", {ad});
      }
    })
  },
  new(req, res, next){
    res.render("ad/new");
  },
  create(req, res, next){
    let newAd = {
      title: req.body.title,
      description: req.body.description
    };
    adQueries.addAd(newAd, (err, ad) => {
      if(err){
        res.redirect(500, "/ad/new");
      } else {
        res.redirect(303, `/ad/${ad.id}`);
      }
    });
  },
  show(req, res, next){
    adQueries.getAd(req.params.id, (err, ad) => {
      if(err || ad == null){
        res.redirect(404, "/");
      } else {
        res.render("ad/show", {ad});
      }
    });
  },
  destroy(req, res, next){
    adQueries.deleteAd (req.params.id, (err, ad) => {
      if(err){
        res.redirect(500, `/ad/${ad.id}`)
      } else {
        res.redirect(303, "/ad")
      }
    });
  },
  edit(req, res, next){
    adQueries.getAd(req.params.id, (err, ad) => {
      if(err || ad == null){
        res.redirect(404, "/");
      } else {
        res.render("ad/edit", {ad});
      }
    });
  },
  update(req, res, next){
    adQueries.updateAd(req.params.id, req.body, (err, ad) => {
      if(err || ad == null){
        res.redirect(404, `/ad/${req.params.id}/edit`);
      } else {
        res.redirect(`/ad/${ad.id}`);
      }
    });
  }
}

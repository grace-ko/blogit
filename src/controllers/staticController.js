module.exports = {
  index(req, res, next){
    res.render("static/index", {title: "Welcome to Blogit"});
  },
  about(req, res, next){
    res.render("static/partials/about", {title: "Welcome to Blogit"});
  }
}

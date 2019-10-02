var express = require("express");
var router = express.Router();
var drinks = [
    {
      title: "milk",
      color: "white"
    },
    {
      title: "black tea",
      color: "red"
    }
  ];
  router.post("/add-drink", function(req, res, next) {
    drinks.push(req.body);
    res.redirect("/drinks");
  });
  router.get("/", function(req, res) {
    var response = {
      drinks: drinks
    };
    res.render("drinks", response);
  });
  module.exports = router;
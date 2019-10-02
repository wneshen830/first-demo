var express = require("express");
var router = express.Router();
var foods = [
    {
      title: "pizza",
      price: 450
    },
    {
      title: "noodles",
      price: 100
    }
  ];
  
  router.post("/add-food", function(req, res, next) {
    foods.push(req.body);
    res.redirect("/foods");
  });
  router.get("/", function(req, res) {
    var response = {
        foods: foods
      };
    res.render("foods", response);
  });

  module.exports = router;

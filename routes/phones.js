var express = require("express");
var router = express.Router();
var phones = [
    {
      title: "Iphone",
      system: "IOS"
    },
    {
      title: "samsung",
      system: "android"
    }
  ];
  router.post("/add-phone", function(req, res, next) {
    phones.push(req.body);
    res.redirect("/phones");
  });
  router.get("/", function(req, res) {
    var response = {
      phones: phones
    };
    res.render("phones", response);
  });
  module.exports = router;
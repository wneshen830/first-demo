var express = require("express");
var router = express.Router();
var users = [
  {
    name: "vincent",
    sex: "M"
  },
  { 
    name: "May", 
    sex: "F"   
  }
];
router.post("/add-user", function(req, res, next) {
  users.push(req.body);
  console.log(req.body)
  res.redirect("/users");
});

router.get("/", function(req, res, next) {
  var response = {
    users: users
  };

  res.render("users", response);
});

module.exports = router;

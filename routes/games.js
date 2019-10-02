var express = require("express");
var router = express.Router();
var games = [
  {
    title: "MHW",
    date: "2019/09/14"
  },
  {
    title: "borderlands3",
    date: "2019/09/13"
  }
];

router.post("/add-game", function(req, res, next) {
  games.push(req.body);
  res.redirect("/games");
});
router.get("/", function(req, res) {
  var response = {
    games: games
  };
  res.render("games", response);
});
module.exports = router;

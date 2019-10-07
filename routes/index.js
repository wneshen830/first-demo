var express = require("express");
var router = express.Router();
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://postgres:root@localhost:5432/local");

/* GET home page.*/

router.post("/add-stock", function(req, res) {
  console.log(req.body);
  db.query("insert into stock(name,quantity)values($1, $2) ", [
    req.body.name,
    req.body.quantity
  ])

    .then(() => {
      res.redirect("/stocks");
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
});

router.get("/stocks", (req, res, next) => {
  
  if (req.query.searchstocks !== "" && req.query.searchstocks !== null  && req.query.searchstocks !== undefined) {//logic
    console.log("if")
    console.log(req.query.searchstocks)
    let query = req.query.pick === "Name"? 'select * from stock where name = $1': 'select * from stock where quantity = $1'
    db.query(query, [req.query.searchstocks])
    .then(data => {
      var stocks = data;
      console.log("stock:", stocks);
      res.render("index", { stocks: stocks });
    })
    .catch(error => {
      console.log("ERROR:", error);
    })
  } 
  else { //origin
    console.log("else")
    db.query("SELECT * FROM stock")
    .then(data => {
      var stocks = data;
      console.log("stock:", stocks);
      res.render("index", { stocks: stocks });
    })
    .catch(error => {
      console.log("ERROR:", error);
    });
  }
});

router.post("/deletestocks/:stock_id", function(req, res) {
  console.log(req.params);
  db.query("DELETE FROM stock WHERE stock_id = $1", [req.params.stock_id]).then(
    () => {
      res.redirect("/stocks");
    }
  );
});

router.get("/stocks/:stock_id", function(req, res, next) {
  console.log("編輯!");
  db.query("SELECT * FROM stock WHERE stock_id =$1", [req.params.stock_id])
  .then(function(data) {
    console.log("查詢成功!");
    console.log(data);
    res.render("edit", {
      title: "Edit stock",
      stock_id: data[0].stock_id,
      name: data[0].name,
      quantity: data[0].quantity
    });
  });
});

router.post("/updatestocks/:stock_id", function(req, res, next) {
  console.log(req.params);
  console.log(req.body);
  
  db.query("UPDATE stock SET name = $1, quantity = $2 WHERE stock_id = $3 ", [req.body.name,req.body.quantity,req.params.stock_id])
  .then(function() {
    res.redirect("/stocks");
  });

});

router.get("/stock/:stock_id",function(req, res, next){
console.log(router.get);
db.query('select * from stock where name = $1 or quantity = $2',[req.body.name, req.body.quantity])
.then(() => {
  res.render("/stock", { stocks: req.stocks });
})
  })

module.exports = router;

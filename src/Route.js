(function () {
  module.exports = function (_g) {
    var app = _g.app;
    var mysql = _g.mysql;
    const config = _g.config;
    const port = 7727;
    const crud = require("./Crud")(_g).route();

    function route() {
      app.get("/", function (req, res) {
        res.render("index.html", {});
      });

      app.get("/packagedetail", function (req, res) {
        res.render("packagedetail.html", {});
      });

      app.get("/estimate", function (req, res) {
        res.render("estimate.html", {});
      });

      app.get("/request", function (req, res) {
        res.render("request.html", {});
      });

      app.get("/history", function (req, res) {
        res.render("history.html", {});
      });

      app.get("/review", function (req, res) {
        res.render("review.html", {});
      });

      app.get("/home", function (req, res) {
        res.render("home.html", {});
      });

      //test req start
      app.get("/test/req_create", (req, res) => {
        res.render("test_req_create.html", {});
      });

      app.get("/test/req_list", (req, res) => {
        let uid = req.query.uid;
        let qry = `select * from request`;
        if (uid != null) {
          qry = qry + ` where uid=${uid}`;
        }
        let conn = mysql.createConnection(config);
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err) {
            for (var i = 0; i < rows.length; i++) {
              rows[i].info2 = JSON.parse(decodeURIComponent(rows[i].info));
            }
            res.render("test_req_list.html", { rows: rows });
          } else {
            res.send("fail");
          }
        });
        conn.end();
      });

      app.get("/test/req_detail", (req, res) => {
        var id = req.query.id;
        if (id == null) {
          res.send("fail");
          return;
        }

        let qry = `select * from request where id = ${id}`;
        let conn = mysql.createConnection(config);
        conn.connect();
        conn.query(qry, (err, rows, fields) => {
          if (!err && rows.length == 1) {
            rows[0].info2 = JSON.parse(decodeURIComponent(rows[0].info));
            res.render("test_req_detail.html", { row: rows[0] });
          } else {
            res.send("fail");
          }
        });
        conn.end();
      });
      //test req end

      //1. enetry point
      app.listen(port, function () {
        preLoad();
        console.log(`pday server listen on *:${port}`);
      });
    }

    function preLoad() {
      //to-do
    }

    var publicReturn = { route: route };
    return publicReturn;
  };
})();

(function () {
  module.exports = function (_g) {
    var app = _g.app;
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
